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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='type') THEN
        ALTER TABLE lessons ADD COLUMN type VARCHAR(50) DEFAULT 'lecture';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='content') THEN
        ALTER TABLE lessons ADD COLUMN content TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='video_url') THEN
        ALTER TABLE lessons ADD COLUMN video_url VARCHAR(255);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='file_url') THEN
        ALTER TABLE lessons ADD COLUMN file_url VARCHAR(500);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='schedule_config') THEN
        ALTER TABLE lessons ADD COLUMN schedule_config JSONB;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='lessons' AND column_name='order_index') THEN
        ALTER TABLE lessons ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;
END $$;
