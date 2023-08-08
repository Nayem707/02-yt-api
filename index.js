dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/video.js';
import commentRoutes from './routes/comment.js';
import cockieParser from 'cookie-parser';

const app = express();

//DB CONNECT
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('db connectd');
    })
    .catch((err) => {
      throw err;
    });
};
//PACKAGE
app.use(cockieParser());
app.use(express.json());

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use('/', (req, res) => {
  res.send('Home Route!');
});

//ERROR HANDLE
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const massage = err.massage || 'Opps! Wrong';
  return res.status(status).json({
    succsess: false,
    status,
    massage, //this line property not working that!
  });
});

//SERVER RUN
app.listen(8800, () => {
  connect();
  console.log('server runing 8800');
});
