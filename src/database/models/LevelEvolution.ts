import mongoose, { Schema, Document } from "mongoose";

export interface ILevelEvolution extends Document {
  level: number;
  expRequired: string;
}

const LevelEvolutionSchema: Schema = new Schema({
  level: { type: String, required: true },
  expRequired: { type: String, required: true },
});

export default mongoose.model<ILevelEvolution>(
  "LevelEvolution",
  LevelEvolutionSchema
);
