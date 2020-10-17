import { Client } from "discord.js";
import ItemService from "./ItemService";
import PlayerService from "./PlayerService";
import RaceService from "./RaceService";
import ServerManageRoomService from "./ServerManageRoomService";

export function createItemService(): ItemService {
  return new ItemService();
}

export function createRaceService(): RaceService {
  return new RaceService();
}

export function createServerManagerRoomService(): ServerManageRoomService {
  return new ServerManageRoomService();
}

export function createPlayerService(client: Client): PlayerService {
  return new PlayerService(createRaceService(), createItemService(), client);
}
