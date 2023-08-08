import express from 'express';
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from '../controllers/users.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//update a user
router.patch('/:id', verifyToken, update);

//delet a user
router.delete('/:id', verifyToken, deleteUser);

//get a user
router.get('/find/:id', verifyToken, getUser);

//subscribe a user
router.patch('/sub/:id', verifyToken, subscribe);

//unsbuscribe a user
router.patch('/unsub/:id', verifyToken, unsubscribe);

//like a video
router.patch('/like/:videoId', verifyToken, like);

//dislike a video
router.patch('/dislike/:videoId', verifyToken, dislike);

export default router;
