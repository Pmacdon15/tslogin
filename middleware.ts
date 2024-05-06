import cors from 'cors';

const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'] // Use allowedHeaders instead of headers
});

export default corsMiddleware;