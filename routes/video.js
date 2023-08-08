import express from 'express';

import {
  addVideo,
  addView,
  getVideo,
  random,
  sub,
  trend,
  search,
  getByTag,
} from '../controllers/video.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.patch('/:id', verifyToken, addVideo);
router.delete('/:id', verifyToken, addVideo);
router.get('/find/:id', getVideo);
router.patch('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/sub', verifyToken, sub);
router.get('/tags', getByTag);
router.get('/search', search);

export default router;
