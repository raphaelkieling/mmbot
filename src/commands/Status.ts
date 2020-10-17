import { Message } from "discord.js";
import { IPlayer } from "../database/models/Player";
import PlayerService from "../service/PlayerService";
import ICommand from "./ICommand";

class StatusCommand implements ICommand {
  constructor(private playerService: PlayerService) {}

  private getUser({ discordId, serverId }): Promise<IPlayer> {
    return this.playerService.getUserByDiscordId({ discordId, serverId });
  }

  async execute(message: Message) {
    const user = await this.getUser({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    message.reply(`
**Your current status**
:hearts: ${user.currentLife}/${user.maxLife}
:coin: ${user.gold.toFixed(2)} gold
:chart_with_upwards_trend: ${user.currentExp.toFixed(2)} EXP
:gloves: ${user.race.name}
:dagger: ${user.race.strength} 
:shield: ${user.race.shield}
:coffin: ${user.dieCount}
    `);
  }
}

export default StatusCommand;
