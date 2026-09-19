import dotenv from "dotenv";
import path from "path";

const environmentName = process.env.ENV_NAME || "dev";
const environmentFile = path.resolve(__dirname, `../.env.${environmentName}`);
const defaultFile = path.resolve(__dirname, "../.env");

dotenv.config({ path: environmentFile });
dotenv.config({ path: defaultFile, override: false });

export { environmentName };