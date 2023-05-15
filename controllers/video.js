import { createError } from '../error.js';
import Video from '../model/Video.js';
import User from '../model/Users.js';

//Add/POST Video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

//Update/PUT Video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'video not found!'));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'you can update only videos!'));
    }
  } catch (error) {
    next(error);
  }
};

//Delete/DELETE Video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'video not found!'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('video has been deleted');
    } else {
      return next(createError(403, 'you can delete only videos!'));
    }
  } catch (error) {
    next(error);
  }
};

//Get/GET A Video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

//add/PUT a view
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('view increased!');
  } catch (error) {
    next(error);
  }
};

//Get A random
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

//Get A trend
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

//Get A sub
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subChannels = user.subscribedUsers;

    const list = await Promise.all(
      subChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

//Get A Tags
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(',');

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

//Get A Search
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
