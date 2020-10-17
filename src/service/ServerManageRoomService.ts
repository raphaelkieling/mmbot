import ServerManageRoom, {
  IServerManageRoom,
  RoomTypes,
} from "../database/models/ServerManageRoom";

export default class ServerManageRoomService {
  getByServerIdAndType(serverId: string, type: RoomTypes) {
    return ServerManageRoom.findOne({ serverId, type }).exec();
  }

  setBotRoomByServerId(serverId: string, roomId: string) {
    return ServerManageRoom.updateOne(
      {
        serverId,
        type: "DEFAULT_BOT_ROOM",
      },
      { serverId, roomId, type: "DEFAULT_BOT_ROOM" },
      { upsert: true }
    );
  }
}
