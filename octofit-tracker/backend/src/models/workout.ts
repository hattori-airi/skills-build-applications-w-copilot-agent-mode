import { Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    intensity: {
      type: String,
      required: true,
      enum: ['low', 'moderate', 'high'],
    },
    targetMuscleGroups: [{ type: String, trim: true }],
    caloriesBurnEstimate: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

const Workout = models.Workout || model('Workout', workoutSchema);

export default Workout;