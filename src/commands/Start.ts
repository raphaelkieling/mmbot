import { differenceInDays, parseISO } from "date-fns";
import { Message } from "discord.js";
import config from "../config";
import { IPlayer } from "../database/models/Player";
import PlayerService from "../service/PlayerService";
import RaceService from "../service/RaceService";
import ICommand from "./ICommand";

class StartCommand implements ICommand {
  constructor(
    private playerService: PlayerService,
    private raceService: RaceService
  ) {}

  async withoutRace(message: Message) {
    const races = await this.raceService.getAll();
    const raceKeys = races.map((item) => item.key);
    message.reply(`
Hey, you need specify a race.
Example: \`${config.PREFIX}start [${raceKeys.join("|")}]\`

**Information about the races**:
${races
  .map(
    (item) => `${item.name} :dagger: ${item.strength} :shield: ${item.shield}`
  )
  .join("\n")}
    `);
  }

  private getUser({ discordId, serverId }): Promise<IPlayer> {
    return this.playerService.getUserByDiscordId({ discordId, serverId });
  }

  private userAlreadyExist(message: Message, player: IPlayer) {
    const daysCreated = differenceInDays(new Date(), player.createdAt);

    message.reply(`
Hey, you already started! Days that have passed: ${daysCreated}
    `);
  }

  async execute(message: Message, race: string) {
    const user = await this.getUser({
      serverId: message.guild.id,
      discordId: message.author.id,
    });

    if (user) {
      return this.userAlreadyExist(message, user);
    }

    if (!race) {
      return this.withoutRace(message);
    }

    await this.playerService.createNewPlayer({
      serverId: message.guild.id,
      discordId: message.author.id,
      raceKey: race,
    });

    message.reply(
      "Now you are a new adventurer! Remember to get your daily rewards every day!"
    );
  }
}

export default StartCommand;
