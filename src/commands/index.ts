import ICommand from "./ICommand";
import PingCommand from "./Ping";
import HelpCommand from "./Help";
import StartCommand from "./Start";
import ResetCommand from "./Reset";
import MineCommand from "./Mine";
import StatusCommand from "./Status";
import { createPlayerService, createRaceService } from "../service/factory";
import IMiddleware from "./guards/IMiddleware";
import needAccountMiddleware from "./guards/needAccount";
import { Client, Message } from "discord.js";

/**
 * Run the guard middlewares to validate if the user can continue
 *
 * @param middlewares
 * @param command
 */
function runGuards(middlewares: IMiddleware[], command: ICommand): ICommand {
  return {
    async execute(message: Message, ...args:any) {
      for (const middleware of middlewares) {
        const canContinue = await middleware(message);
        if (!canContinue) throw new Error("Guard blocked");
      }

      // Final command
      command.execute(message,...args);
    },
  };
}

export default (client: Client) => {
  const playerService = createPlayerService(client);
  const raceService = createRaceService();

  return {
    ping: new PingCommand(),
    help: new HelpCommand(),
    start: new StartCommand(playerService, raceService),
    reset: runGuards([needAccountMiddleware], new ResetCommand(playerService)),
    mine: runGuards([needAccountMiddleware], new MineCommand(playerService)),
    status: runGuards(
      [needAccountMiddleware],
      new StatusCommand(playerService)
    ),
  } as Record<string, ICommand>;
};
