import mongoose, { Schema, Document } from "mongoose";
import emitter from "../../listeners/emitter";
import { IRace } from "./Race";

export const playerListeners = {
  CHECK_EXP: "PLAYER:CHECK-EXP",
};

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

const PlayerSchema: Schema<IPlayer> = new Schema({
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

PlayerSchema.post("updateOne", async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (!docToUpdate) return;
  emitter.emit(playerListeners.CHECK_EXP, docToUpdate);
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);
