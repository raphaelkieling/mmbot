import mongoose, { Schema, Document } from "mongoose";
import { IRace } from "./Race";

export interface IPlayer extends Document {
  discordId: string;
  serverId: string;
  level: number;
  currentExp: number;
  createdAt: Date;
  gold: number;
  dieCount: number;
  race: IRace["_id"];
  currentLife: number;
  maxLife: number;
}

const PlayerSchema: Schema = new Schema({
  discordId: { type: String, required: true },
  serverId: { type: String, required: true },
  level: { type: Number },
  currentExp: { type: Number },
  gold: { type: Number },
  currentLife: { type: Number },
  maxLife: { type: Number },
  createdAt: { type: Date, required: true },
  dieCount: { type: Number, default: 0 },
  race: { type: Schema.Types.ObjectId, required: true, ref: "Race" },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);
