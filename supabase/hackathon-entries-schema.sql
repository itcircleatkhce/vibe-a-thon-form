-- New Hackathon Entries Table
-- This table stores both team and individual registrations
-- For teams: All members are stored in the members JSONB array
-- For individuals: members array contains single person

-- Drop old tables if migrating (be careful in production!)
-- DROP TABLE IF EXISTS hackathon_registrations;
-- DROP TABLE IF EXISTS hackathon_teams;

-- Create the new unified hackathon_entries table
CREATE TABLE IF NOT EXISTS hackathon_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Entry type: 'team' or 'individual'
  entry_type TEXT NOT NULL CHECK (entry_type IN ('team', 'individual')),
  
  -- Team information (for team entries)
  team_name TEXT,
  team_code TEXT UNIQUE,
  
  -- Idea/Project details
  idea_title TEXT NOT NULL,
  idea_description TEXT NOT NULL,
  idea_category TEXT NOT NULL,
  
  -- Members array - stores all team members or single individual
  -- Each member: { full_name, email, phone, college, department, semester, is_leader }
  members JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Status for admin management
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'waitlist')),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_hackathon_entries_entry_type ON hackathon_entries(entry_type);
CREATE INDEX IF NOT EXISTS idx_hackathon_entries_team_code ON hackathon_entries(team_code);
CREATE INDEX IF NOT EXISTS idx_hackathon_entries_status ON hackathon_entries(status);
CREATE INDEX IF NOT EXISTS idx_hackathon_entries_created_at ON hackathon_entries(created_at);

-- Create a GIN index for searching within members JSONB
CREATE INDEX IF NOT EXISTS idx_hackathon_entries_members ON hackathon_entries USING GIN (members);

-- Function to generate unique team code
CREATE OR REPLACE FUNCTION generate_team_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate team_code for team entries
CREATE OR REPLACE FUNCTION set_team_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.entry_type = 'team' AND (NEW.team_code IS NULL OR NEW.team_code = '') THEN
    LOOP
      NEW.team_code := generate_team_code();
      EXIT WHEN NOT EXISTS (SELECT 1 FROM hackathon_entries WHERE team_code = NEW.team_code);
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_team_code
  BEFORE INSERT ON hackathon_entries
  FOR EACH ROW
  EXECUTE FUNCTION set_team_code();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
  BEFORE UPDATE ON hackathon_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security (optional, configure as needed)
ALTER TABLE hackathon_entries ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anyone (for registration)
CREATE POLICY "Allow public inserts" ON hackathon_entries
  FOR INSERT WITH CHECK (true);

-- Policy to allow reads (adjust as needed)
CREATE POLICY "Allow public reads" ON hackathon_entries
  FOR SELECT USING (true);

-- Policy to allow updates (for admin status changes)
CREATE POLICY "Allow updates" ON hackathon_entries
  FOR UPDATE USING (true);

-- Example member structure:
-- {
--   "full_name": "John Doe",
--   "email": "john@example.com",
--   "phone": "9841234567",
--   "college": "Khwopa College of Engineering",
--   "department": "Computer Engineering",
--   "semester": "6th",
--   "is_leader": true
-- }

-- Sample insert for a team:
-- INSERT INTO hackathon_entries (entry_type, team_name, idea_title, idea_description, idea_category, members)
-- VALUES (
--   'team',
--   'Code Crushers',
--   'Smart Traffic Management',
--   'AI-powered traffic light system that reduces congestion',
--   'AI/ML',
--   '[
--     {"full_name": "Alice", "email": "alice@test.com", "phone": "9841111111", "college": "KhCE", "department": "Computer", "semester": "6th", "is_leader": true},
--     {"full_name": "Bob", "email": "bob@test.com", "phone": "9841111112", "college": "KhCE", "department": "Computer", "semester": "6th", "is_leader": false}
--   ]'::jsonb
-- );

-- Sample insert for individual:
-- INSERT INTO hackathon_entries (entry_type, idea_title, idea_description, idea_category, members)
-- VALUES (
--   'individual',
--   'Personal Project',
--   'A cool solo project',
--   'Web Development',
--   '[{"full_name": "Solo Dev", "email": "solo@test.com", "phone": "9841111113", "college": "KhCE", "department": "IT", "semester": "4th", "is_leader": true}]'::jsonb
-- );
