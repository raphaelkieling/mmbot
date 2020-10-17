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
import { Message } from "discord.js";

const playerService = createPlayerService();
const raceService = createRaceService();

/**
 * Run the guard middlewares to validate if the user can continue
 *
 * @param middlewares
 * @param command
 */
function runGuards(middlewares: IMiddleware[], command: ICommand): ICommand {
  return {
    async execute(message: Message) {
      for (const middleware of middlewares) {
        const canContinue = await middleware(message);
        if (!canContinue) throw new Error("Guard blocked");
      }

      // Final command
      command.execute(message);
    },
  };
}

export default {
  ping: new PingCommand(),
  help: new HelpCommand(),
  start: runGuards([], new StartCommand(playerService, raceService)),
  reset: runGuards([], new ResetCommand(playerService)),
  mine: runGuards([], new MineCommand(playerService)),
  status: runGuards([], new StatusCommand(playerService)),
} as Record<string, ICommand>;
