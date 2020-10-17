import { Message } from "discord.js";
import PlayerService from "../service/PlayerService";
import ICommand from "./ICommand";

class MineCommand implements ICommand {
  playerService = new PlayerService();

  async execute(message: Message) {
    const result = await this.playerService.doMine({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    message.client.channels.cache
      .get(message.channel.id)
      .send(
        `:pick: | You mined a ${result.item.name}, earned ${result.exp} EXP and ${result.gold} golds.`
      );
  }
}

export default MineCommand;
