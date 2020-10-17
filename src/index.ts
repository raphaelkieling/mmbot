import Discord from "discord.js";
import config from "./config";
import extractor from "./utils/extractor";
import database from "./database";
import initListeners from "./listeners";
import resolveCommands from "./commands";

const client = new Discord.Client();

const finalCommands = resolveCommands(client);
initListeners(client);

client.login(config.MMBOT_TOKEN);
client.on("ready", () => console.log("Bot running"));

client.on("message", async (message) => {
  if (message.author.bot) return;
  const prefix = config.PREFIX;
  const extractorResult = extractor(prefix, message.content);
  if (!extractorResult) return;

  const currentCommand = finalCommands[extractorResult.command];
  await currentCommand?.execute.apply(currentCommand, [
    message,
    ...extractorResult.args,
  ]);
});

database.start();
