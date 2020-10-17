import mongoose, { Schema, Document } from "mongoose";

export interface ILevelEvolution extends Document {
  level: number;
  expRequired: number;
}

const LevelEvolutionSchema: Schema = new Schema({
  level: { type: Number, required: true },
  expRequired: { type: Number, required: true },
});

export default mongoose.model<ILevelEvolution>(
  "LevelEvolution",
  LevelEvolutionSchema
);
