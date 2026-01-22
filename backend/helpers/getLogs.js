import fs from "fs";
import path from "path";

export const getLogs = () => {
  const logsPath = path.join(process.cwd(), "logs");
  if (!fs.existsSync(logsPath)) return [];

  const files = fs.readdirSync(logsPath).filter(file => file.endsWith(".log"));

  return files.map(file => {
    const content = fs.readFileSync(path.join(logsPath, file), "utf-8");
    return { file, content };
  });
};