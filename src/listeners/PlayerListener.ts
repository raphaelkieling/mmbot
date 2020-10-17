import { Client } from "discord.js";
import { IPlayer, playerListeners } from "../database/models/Player";
import { createPlayerService } from "../service/factory";
import emitter from "./emitter";

export default (client: Client) => {
  const playerService = createPlayerService(client);

  emitter.on(playerListeners.LEVEL_UP, async (player: IPlayer) => {
    const levelByExp = await playerService.getCurrentLevelByExp(
      player.currentExp
    );

    await player.updateOne({ level: levelByExp.id });
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
