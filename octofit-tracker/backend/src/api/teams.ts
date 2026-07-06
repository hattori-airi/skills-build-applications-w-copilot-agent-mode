import { Router } from 'express';
import Team from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await Team.find()
      .populate('members', 'name email fitnessLevel')
      .sort({ createdAt: -1 })
      .lean();
    res.json({ count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams', details: String(error) });
  }
});

export default teamsRouter;