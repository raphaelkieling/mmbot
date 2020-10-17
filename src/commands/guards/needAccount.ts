import { Message } from "discord.js";
import config from "../../config";
import { createPlayerService } from "../../service/factory";
import IMiddleware from "./IMiddleware";

const needAccountMiddleware: IMiddleware = async (
  message: Message
): Promise<boolean> => {
  const userService = createPlayerService();
  const userFoudend = await userService.getUserByDiscordId({
    discordId: message.author.id,
    serverId: message.guild.id,
  });

  const hasUser = !!userFoudend;

  if (!hasUser)
    message.reply(
      `Player not founded to do that. User \`${config.PREFIX}start\``
    );

  return hasUser;
};

export default needAccountMiddleware;
