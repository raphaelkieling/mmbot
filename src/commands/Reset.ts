import { Message } from "discord.js";
import config from "../config";
import PlayerService from "../service/PlayerService";
import ICommand from "./ICommand";

class ResetCommand implements ICommand {
  constructor(private playerService: PlayerService) {}

  async execute(message: Message, confirm: string) {
    const defaultMessageToConfirm = "i-really-want-that";

    if (!confirm || confirm !== defaultMessageToConfirm) {
      return message.reply(`
For reset you account you need type \`${config.PREFIX}reset ${defaultMessageToConfirm}\`
`);
    }

    await this.playerService.erasePlayer({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    message.reply("Account erased, you need start again if you want play!");
  }
}

export default ResetCommand;
