import { IPlayer, playerListeners } from "../database/models/Player";
import emitter from "./emitter";

emitter.on(playerListeners.CHECK_EXP, (player: IPlayer) => {
  console.log(`Current exp: ${player.currentExp}`);
});
