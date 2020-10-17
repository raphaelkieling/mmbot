import { Client } from "discord.js";
import playerListener from "./PlayerListener";

export default (client: Client) => {
  playerListener(client);
};
