import { Message } from "discord.js";
import PlayerService from "../service/PlayerService";
import ICommand from "./ICommand";

class MineCommand implements ICommand {
  constructor(private playerService: PlayerService) {}

  async execute(message: Message) {
    const result = await this.playerService.doMine({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    message.reply(
      `:pick: | You mined a ${result.item.name}, earned ${result.exp} EXP and ${result.gold} golds.`
    );
  }
}

export default MineCommand;
