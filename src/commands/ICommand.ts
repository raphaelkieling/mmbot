import discord from "discord.js";

export default interface ICommand {
  execute(message: discord.Message, ...args: string[]): Promise<any> | void;
}
