import { Client } from "discord.js";
import { IPlayer, playerListeners } from "../database/models/Player";
import {
  createPlayerService,
  createServerManagerRoomService,
} from "../service/factory";
import emitter from "./emitter";

export default (client: Client) => {
  const playerService = createPlayerService(client);
  const serverManageRoomService = createServerManagerRoomService();

  emitter.on(playerListeners.LEVEL_UP, async (player: IPlayer) => {
    const levelByExp = await playerService.getCurrentLevelByExp(
      player.currentExp
    );

    await player.updateOne({ level: levelByExp.id });

    const currentDefaultBootRoom = await serverManageRoomService.getByServerIdAndType(
      player.serverId,
      "DEFAULT_BOT_ROOM"
    );

    client.guilds.cache
      .get(player.serverId)
      .channels.cache.get(currentDefaultBootRoom.roomId)
      .send(`:up: Level UP! Now your level is ${levelByExp.level}.`);
  });

  emitter.on(playerListeners.CHECK_EXP, async (player: IPlayer) => {
    const { level: currentLevel } = await player
      .populate("level")
      .execPopulate();

    const levelByExp = await playerService.getCurrentLevelByExp(
      player.currentExp
    );

    if (levelByExp.level > currentLevel.level) {
      emitter.emit(playerListeners.LEVEL_UP, player);
    }
  });
};
