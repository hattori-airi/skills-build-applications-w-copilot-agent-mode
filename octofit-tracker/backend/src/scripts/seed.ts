import mongoose from 'mongoose';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Airi Hattori',
        email: 'airi.hattori@example.com',
        age: 28,
        fitnessLevel: 'intermediate',
        goals: ['Improve stamina', 'Run 10K under 55 minutes'],
      },
      {
        name: 'Kenji Sato',
        email: 'kenji.sato@example.com',
        age: 34,
        fitnessLevel: 'advanced',
        goals: ['Increase VO2 max', 'Maintain sub-20 5K pace'],
      },
      {
        name: 'Mika Tanaka',
        email: 'mika.tanaka@example.com',
        age: 25,
        fitnessLevel: 'beginner',
        goals: ['Build weekly consistency', 'Lose 3kg body fat'],
      },
      {
        name: 'Daichi Mori',
        email: 'daichi.mori@example.com',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Gain lower-body strength', 'Mobility improvement'],
      },
      {
        name: 'Yui Nakamura',
        email: 'yui.nakamura@example.com',
        age: 29,
        fitnessLevel: 'advanced',
        goals: ['Improve recovery score', 'Prepare for sprint triathlon'],
      },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Tempo Run 6K',
        category: 'cardio',
        durationMinutes: 40,
        intensity: 'high',
        targetMuscleGroups: ['legs', 'core'],
        caloriesBurnEstimate: 420,
      },
      {
        title: 'Upper Body Push Session',
        category: 'strength',
        durationMinutes: 50,
        intensity: 'moderate',
        targetMuscleGroups: ['chest', 'shoulders', 'triceps'],
        caloriesBurnEstimate: 330,
      },
      {
        title: 'Mobility and Yoga Flow',
        category: 'mobility',
        durationMinutes: 35,
        intensity: 'low',
        targetMuscleGroups: ['hips', 'hamstrings', 'back'],
        caloriesBurnEstimate: 160,
      },
      {
        title: 'HIIT Circuit Blast',
        category: 'hiit',
        durationMinutes: 30,
        intensity: 'high',
        targetMuscleGroups: ['full body'],
        caloriesBurnEstimate: 390,
      },
      {
        title: 'Cycling Endurance Ride',
        category: 'cardio',
        durationMinutes: 60,
        intensity: 'moderate',
        targetMuscleGroups: ['quads', 'glutes', 'core'],
        caloriesBurnEstimate: 520,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Tokyo Trail Blazers',
        description: 'A team focused on endurance running and recovery discipline.',
        members: [users[0]._id, users[1]._id, users[4]._id],
      },
      {
        name: 'Shibuya Strength Squad',
        description: 'Strength-first team balancing lifting, mobility, and cardio.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        workout: workouts[0]._id,
        date: new Date('2026-07-01T06:30:00.000Z'),
        durationMinutes: 42,
        caloriesBurned: 430,
        notes: 'Held steady pace across all splits.',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        workout: workouts[4]._id,
        date: new Date('2026-07-02T05:50:00.000Z'),
        durationMinutes: 62,
        caloriesBurned: 545,
        notes: 'Strong zone-2 output throughout the session.',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        workout: workouts[2]._id,
        date: new Date('2026-07-02T19:10:00.000Z'),
        durationMinutes: 34,
        caloriesBurned: 155,
        notes: 'Improved hip flexibility and shoulder range.',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        workout: workouts[1]._id,
        date: new Date('2026-07-03T12:20:00.000Z'),
        durationMinutes: 52,
        caloriesBurned: 340,
        notes: 'Progressive overload on bench and shoulder press.',
      },
      {
        user: users[4]._id,
        team: teams[0]._id,
        workout: workouts[3]._id,
        date: new Date('2026-07-04T07:15:00.000Z'),
        durationMinutes: 31,
        caloriesBurned: 405,
        notes: 'Completed all rounds with minimal rest.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: 'weekly',
        team: teams[0]._id,
        entries: [
          { user: users[1]._id, points: 980, rank: 1 },
          { user: users[4]._id, points: 910, rank: 2 },
          { user: users[0]._id, points: 860, rank: 3 },
        ],
        updatedAt: new Date('2026-07-05T09:00:00.000Z'),
      },
      {
        period: 'weekly',
        team: teams[1]._id,
        entries: [
          { user: users[3]._id, points: 790, rank: 1 },
          { user: users[2]._id, points: 640, rank: 2 },
        ],
        updatedAt: new Date('2026-07-05T09:00:00.000Z'),
      },
      {
        period: 'allTime',
        entries: [
          { user: users[1]._id, points: 9120, rank: 1 },
          { user: users[4]._id, points: 8740, rank: 2 },
          { user: users[0]._id, points: 8190, rank: 3 },
          { user: users[3]._id, points: 7550, rank: 4 },
          { user: users[2]._id, points: 6890, rank: 5 },
        ],
        updatedAt: new Date('2026-07-05T09:00:00.000Z'),
      },
    ]);

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Seeded counts:', {
      users: userCount,
      teams: teamCount,
      activities: activityCount,
      leaderboard: leaderboardCount,
      workouts: workoutCount,
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
