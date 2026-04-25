-- Upgrade courses table with more metadata
ALTER TABLE courses ADD COLUMN IF NOT EXISTS education_level VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_name VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS department VARCHAR(255);

-- Fix lessons table if it was created with an old schema
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='section_id') THEN
        ALTER TABLE lessons ADD COLUMN section_id INTEGER REFERENCES course_sections(id) ON DELETE CASCADE;
    END IF;
END $$;
