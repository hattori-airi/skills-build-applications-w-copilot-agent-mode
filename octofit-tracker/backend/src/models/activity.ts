import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    date: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;