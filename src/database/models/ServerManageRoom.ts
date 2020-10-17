import mongoose, { Schema, Document } from "mongoose";

export type RoomTypes = "DEFAULT_BOT_ROOM";

export interface IServerManageRoom extends Document {
  serverId: string;
  roomId: string;
  type: RoomTypes;
}

const ServerManageRoomSchema: Schema = new Schema({
  serverId: { type: String, required: true },
  roomId: { type: String, required: true },
  type: {
    type: String,
    enum: ["DEFAULT_BOT_ROOM"],
  },
});

export default mongoose.model<IServerManageRoom>(
  "ServerManageRoom",
  ServerManageRoomSchema
);
