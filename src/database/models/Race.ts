import mongoose, { Schema, Document } from "mongoose";

export interface IRace extends Document {
  name: string;
  key: string;
  strength: number;
  shield: number;
}

const RaceSchema: Schema = new Schema({
  name: { type: String },
  key: { type: String },
  strength: { type: Number },
  shield: { type: Number },
});

export default mongoose.model<IRace>("Race", RaceSchema);
