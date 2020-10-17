import ItemService from "./ItemService";
import PlayerService from "./PlayerService";
import RaceService from "./RaceService";

export function createItemService(): ItemService {
  return new ItemService();
}

export function createRaceService(): RaceService {
  return new RaceService();
}

export function createPlayerService(): PlayerService {
  return new PlayerService(createRaceService(), createItemService());
}
