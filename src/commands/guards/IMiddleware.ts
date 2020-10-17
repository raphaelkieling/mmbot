import { Message } from "discord.js";

type IMiddleware = (message: Message) => boolean | Promise<boolean>;

export default IMiddleware;
