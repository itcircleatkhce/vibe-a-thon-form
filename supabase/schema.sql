-- Vibe-a-thon Registration Table Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Section 1: Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  department TEXT NOT NULL,
  semester TEXT NOT NULL,
  
  -- Section 2: Tools & Expertise
  primary_skillset TEXT NOT NULL,
  git_proficiency TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  
  -- Section 3: Analytical Questions
  why_join TEXT NOT NULL,
  shipping_experience TEXT NOT NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anonymous users (for registration)
CREATE POLICY "Allow anonymous inserts" ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy to allow authenticated users to read all registrations (for admin)
CREATE POLICY "Allow authenticated to read" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE registrations IS 'Vibe-a-thon event registration submissions';
COMMENT ON COLUMN registrations.full_name IS 'Participant full name';
COMMENT ON COLUMN registrations.email IS 'Participant email address (unique)';
COMMENT ON COLUMN registrations.phone IS 'Participant phone number';
COMMENT ON COLUMN registrations.college IS 'College/University name';
COMMENT ON COLUMN registrations.department IS 'Academic department';
COMMENT ON COLUMN registrations.semester IS 'Current semester';
COMMENT ON COLUMN registrations.primary_skillset IS 'Primary area of expertise';
COMMENT ON COLUMN registrations.git_proficiency IS 'Git/GitHub proficiency level';
COMMENT ON COLUMN registrations.technologies IS 'Array of familiar technologies';
COMMENT ON COLUMN registrations.why_join IS 'Motivation for joining the bootcamp';
COMMENT ON COLUMN registrations.shipping_experience IS 'Product shipping experience level';
