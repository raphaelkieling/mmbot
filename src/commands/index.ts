import ICommand from "./ICommand";
import PingCommand from "./Ping";
import HelpCommand from "./Help";
import StartCommand from "./Start";
import ResetCommand from "./Reset";
import MineCommand from "./Mine";
import StatusCommand from "./Status";
import AttackCommand from "./Attack";

export default {
  ping: new PingCommand(),
  help: new HelpCommand(),
  start: new StartCommand(),
  reset: new ResetCommand(),
  mine: new MineCommand(),
  status: new StatusCommand(),
  attack: new AttackCommand(),
} as Record<string, ICommand>;
