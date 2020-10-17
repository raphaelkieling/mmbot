export interface IExtractorReturn {
  args: string[];
  command: string;
}

export default (prefix: string, message: string): IExtractorReturn | null => {
  if (!message.startsWith(prefix)) return null;

  const commandBody = message.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  return { args, command };
};
