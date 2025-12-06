-- Vibe-a-thon Hackathon Registration Schema
-- Run this in your Supabase SQL Editor
-- NOTE: This is separate from the workshop registrations table

-- Teams Table
CREATE TABLE IF NOT EXISTS hackathon_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name TEXT NOT NULL UNIQUE,
  team_code TEXT NOT NULL UNIQUE, -- 6-character code for joining
  idea_title TEXT NOT NULL,
  idea_description TEXT NOT NULL,
  idea_category TEXT NOT NULL,
  created_by_email TEXT NOT NULL,
  member_count INTEGER DEFAULT 1,
  is_complete BOOLEAN DEFAULT FALSE, -- True when team has 2-4 members
  status TEXT DEFAULT 'pending', -- Status field for admin to update (pending, approved, rejected, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hackathon Participants Table
CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  department TEXT NOT NULL,
  semester TEXT NOT NULL,
  
  -- Team Information
  team_id UUID REFERENCES hackathon_teams(id),
  is_team_leader BOOLEAN DEFAULT FALSE,
  
  -- Terms accepted
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hackathon_teams_code ON hackathon_teams(team_code);
CREATE INDEX IF NOT EXISTS idx_hackathon_teams_name ON hackathon_teams(team_name);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_email ON hackathon_registrations(email);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_team ON hackathon_registrations(team_id);

-- Function to generate random team code
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

-- Trigger to auto-generate team code
CREATE OR REPLACE FUNCTION set_team_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.team_code IS NULL OR NEW.team_code = '' THEN
    NEW.team_code := generate_team_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_team_code
  BEFORE INSERT ON hackathon_teams
  FOR EACH ROW
  EXECUTE FUNCTION set_team_code();

-- Trigger to update member_count when registration is added
CREATE OR REPLACE FUNCTION update_team_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.team_id IS NOT NULL THEN
    UPDATE hackathon_teams 
    SET member_count = (
      SELECT COUNT(*) FROM hackathon_registrations WHERE team_id = NEW.team_id
    ),
    is_complete = (
      SELECT COUNT(*) >= 2 FROM hackathon_registrations WHERE team_id = NEW.team_id
    )
    WHERE id = NEW.team_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_member_count
  AFTER INSERT ON hackathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_team_member_count();

-- Trigger to update updated_at timestamp for teams
CREATE OR REPLACE FUNCTION update_hackathon_teams_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hackathon_teams_updated_at
  BEFORE UPDATE ON hackathon_teams
  FOR EACH ROW
  EXECUTE FUNCTION update_hackathon_teams_updated_at();

-- Trigger to update updated_at timestamp for registrations
CREATE TRIGGER update_hackathon_registrations_updated_at
  BEFORE UPDATE ON hackathon_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE hackathon_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for hackathon_teams
CREATE POLICY "Allow anonymous to insert teams" ON hackathon_teams
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous to read teams" ON hackathon_teams
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to update team member count" ON hackathon_teams
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Policies for hackathon_registrations
CREATE POLICY "Allow anonymous to insert registrations" ON hackathon_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous to read registrations" ON hackathon_registrations
  FOR SELECT TO anon USING (true);

-- Comments for documentation
COMMENT ON TABLE hackathon_teams IS 'Hackathon teams with their ideas';
COMMENT ON TABLE hackathon_registrations IS 'Individual hackathon participant registrations';
COMMENT ON COLUMN hackathon_teams.team_code IS 'Unique 6-character code for team joining';
COMMENT ON COLUMN hackathon_teams.is_complete IS 'True when team has minimum 2 members';
COMMENT ON COLUMN hackathon_registrations.is_team_leader IS 'True if this person created the team';
