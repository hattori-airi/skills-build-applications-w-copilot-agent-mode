import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    goals: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const User = models.User || model('User', userSchema);

export default User;