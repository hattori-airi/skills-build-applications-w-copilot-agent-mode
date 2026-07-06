import { Router } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .populate('workout', 'title category intensity')
      .sort({ date: -1 })
      .lean();
    res.json({ count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: String(error) });
  }
});

export default activitiesRouter;