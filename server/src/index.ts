import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { query } from './config/db';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import courseRoutes from './routes/courseRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import uploadRoutes from './routes/uploadRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('LMS-AI API is running...');
});

// Database initialization
const initDB = async () => {
  try {
    // Add locking to sections
    await query('ALTER TABLE course_sections ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT true');

    // Track lesson completion per student
    await query(`
      CREATE TABLE IF NOT EXISTS lesson_completions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
          completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, lesson_id)
      )
    `);

    // Submissions table linked to lessons
    await query(`
      CREATE TABLE IF NOT EXISTS submissions (
          id SERIAL PRIMARY KEY,
          lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
          student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          file_url VARCHAR(500),
          content TEXT,
          grade VARCHAR(50),
          feedback TEXT,
          submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(lesson_id, student_id)
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    // Broadcast message to all clients
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

initDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
