import { Message } from "discord.js";
import config from "../config";
import ServerManageRoomService from "../service/ServerManageRoomService";
import ICommand from "./ICommand";

class SetBotRoomCommand implements ICommand {
  constructor(private serverManageRoomService: ServerManageRoomService) {}

  async execute(message: Message) {
    await this.serverManageRoomService.setBotRoomByServerId(
      message.guild.id,
      message.channel.id
    );

    message.reply(
      `This channel now is for your bot. For remove use \`${config.PREFIX}unset-bot-room\``
    );
  }
}

export default SetBotRoomCommand;
