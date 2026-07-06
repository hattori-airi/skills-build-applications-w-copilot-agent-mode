import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

const Team = models.Team || model('Team', teamSchema);

export default Team;