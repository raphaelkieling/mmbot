import { Message } from "discord.js";
import config from "../config";
import ICommand from "./ICommand";

class HelpCommand implements ICommand {
  async execute(message: Message) {
    message.reply(`
**${config.PREFIX}start:** Start your player on this server
**${config.PREFIX}help:** Check the commands
**${config.PREFIX}reset:** Erase your account in this server
    `);
  }
}

export default HelpCommand;
