import { Router } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
    res.json({ count: workouts.length, data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: String(error) });
  }
});

export default workoutsRouter;