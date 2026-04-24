import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'; // Added for __dirname fix
import { query } from './config/db.js'; // Added .js
import authRoutes from './routes/authRoutes.js'; // Added .js
import adminRoutes from './routes/adminRoutes.js'; // Added .js
import courseRoutes from './routes/courseRoutes.js'; // Added .js
import assignmentRoutes from './routes/assignmentRoutes.js'; // Added .js
import uploadRoutes from './routes/uploadRoutes.js'; // Added .js
import userRoutes from './routes/userRoutes.js'; // Added .js

dotenv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Good to use env var here
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes - make sure you also add .js inside these route files for their controller imports!
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('LMS-AI API is running...');
});

// ... rest of your initDB and socket logic ...
