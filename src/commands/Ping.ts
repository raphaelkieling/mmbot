import { Message } from "discord.js";
import ICommand from "./ICommand";

class PingCommand implements ICommand {
  execute(message: Message) {
    message.reply("Pong my friend!");
  }
}

export default PingCommand;
