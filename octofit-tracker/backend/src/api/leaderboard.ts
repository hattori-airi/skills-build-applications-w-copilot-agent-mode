import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('team', 'name')
      .populate('entries.user', 'name email fitnessLevel')
      .sort({ updatedAt: -1 })
      .lean();
    res.json({ count: leaderboard.length, data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: String(error) });
  }
});

export default leaderboardRouter;