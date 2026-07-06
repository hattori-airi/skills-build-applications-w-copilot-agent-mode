import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema(
  {
    period: {
      type: String,
      required: true,
      enum: ['weekly', 'monthly', 'allTime'],
    },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    entries: { type: [leaderboardEntrySchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Leaderboard = models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default Leaderboard;