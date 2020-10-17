import Race, { IRace } from "../database/models/Race";

export default class RaceService {
  getByRaceKey(key): Promise<IRace> {
    return Race.findOne({ key }).exec();
  }

  getAll(): Promise<IRace[]> {
    return Race.find().exec();
  }
}
