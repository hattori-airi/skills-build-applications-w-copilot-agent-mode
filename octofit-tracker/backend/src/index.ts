import express from 'express';
import activitiesRouter from './api/activities';
import leaderboardRouter from './api/leaderboard';
import teamsRouter from './api/teams';
import usersRouter from './api/users';
import workoutsRouter from './api/workouts';
import './config/database';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
