import { Message } from "discord.js";
import { IPlayer } from "../database/models/Player";
import PlayerService from "../service/PlayerService";
import ICommand from "./ICommand";

class AttackCommand implements ICommand {
  playerService = new PlayerService();

  private getUser({ discordId, serverId }): Promise<IPlayer> {
    return this.playerService.getUserByDiscordId({ discordId, serverId });
  }

  async execute(message: Message) {
    const guild = message.client.guilds.cache.get(message.guild.id)

    const attacker = await this.getUser({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    console.log(guild.members.fetch())
  }
}

export default AttackCommand;
