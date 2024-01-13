import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import fs from "fs";
import path from "path";

// "Inspired" by react-script's behaviour
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/paths.js

// Require NODE_ENV to be set
const { NODE_ENV } = process.env;
// if (!NODE_ENV) {
//   throw new Error("NODE_ENV envar is required but was not set.");
// }

// Get the full path of the file to read instead of relying on the relative path resolution
const cwd = fs.realpathSync(process.cwd());

// Create array of file paths to evaluate
const envFiles: string[] = [
  path.resolve(cwd, `.env.${NODE_ENV}.local`),
  path.resolve(cwd, `.env.${NODE_ENV}`),
  NODE_ENV !== "test" ? path.resolve(cwd, ".env.local") : "",  
  path.resolve(cwd, ".env"),
].filter(Boolean);

// Load each file, and use variable expansion
envFiles.forEach((filePath) => {
  // Check to ensure the .env file actually exists
  if (fs.existsSync(filePath)) {
    dotenvExpand.expand(
      dotenv.config({
        path: filePath,
      })
    );
  }
});
