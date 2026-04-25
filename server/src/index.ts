import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { query } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const corsOrigin = process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? '*' : "http://localhost:5173");
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

// Serve static files from the client dist directory
const clientDistPath = path.join(__dirname, 'client');
console.log(`Using frontend at: ${clientDistPath}`);
app.use(express.static(clientDistPath));

// Handle SPA routing - deliver index.html for all non-API routes
app.get('*path', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).send('API endpoint not found');
  }
  
  const indexPath = path.join(clientDistPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Ultimate fallback for debugging
    const fallbackMessage = `
      LMS-AI API is running. 
      Frontend not found at: ${indexPath}
      __dirname: ${__dirname}
      CWD: ${process.cwd()}
    `;
    res.status(404).send(fallbackMessage);
  }
});

const initDB = async () => {
  try {
    const schemaFiles = [
      'schema.sql',
      'lms_schema_update.sql',
      'locking_and_submissions.sql'
    ];

    for (const file of schemaFiles) {
      const filePath = path.join(__dirname, 'models', file);
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        await query(sql);
        console.log(`Executed schema file: ${file}`);
      }
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};

io.on('connection', (socket) => {
  socket.on('disconnect', () => console.log('User disconnected'));
});

initDB().then(() => {
  httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
