import config from "../config";
import Player, { IPlayer } from "../database/models/Player";
import ItemService from "./ItemService";
import RaceService from "./RaceService";

export default class PlayerService {
  constructor(
    private raceService: RaceService,
    private itemService: ItemService
  ) {}

  async createNewPlayer({ serverId, discordId, raceKey }) {
    const raceFounded = await this.raceService.getByRaceKey(raceKey);

    const createdPlayer = await Player.create({
      discordId,
      serverId,
      level: 0,
      currentExp: 0,
      createdAt: new Date(),
      race: raceFounded.id,
      gold: 300,
      dieCount: 0,
      currentLife: 100,
      maxLife: 100,
    });

    return createdPlayer;
  }

  getUserByDiscordId({ discordId, serverId }): Promise<IPlayer> {
    return Player.findOne({ discordId, serverId }).populate("race").exec();
  }

  private roll(min = 0, maxValue = 100): number {
    return Math.random() * (maxValue - min) + min;
  }

  async doMine({ discordId, serverId }) {
    const items = await this.itemService.getAllOres();
    const diceValue = this.roll();
    const bestChange = items.reduce((acc, curr) => {
      if (curr.attributes["chance_percent"] >= diceValue) {
        return curr;
      } else {
        return acc;
      }
    }, items[0]);

    if (!bestChange) return null;

    const gold = this.roll
      .apply(this, bestChange.attributes["gold"])
      .toFixed(2);
    const exp = this.roll.apply(this, bestChange.attributes["exp"]).toFixed(2);

    await Player.updateOne(
      { discordId, serverId },
      {
        $inc: {
          gold: gold,
          currentExp: exp,
        },
      }
    );

    return {
      gold,
      exp,
      item: bestChange,
    };
  }

  erasePlayer({ discordId, serverId }) {
    return Player.deleteOne({ discordId, serverId }).exec();
  }
}
