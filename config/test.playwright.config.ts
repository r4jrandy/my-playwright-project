import { baseConfig } from "../playwright.config";
import { defineConfig } from "@playwright/test";
import { EnvConfig } from "../tests/helpers/config-fixtures";
import path from "path";

export default defineConfig<EnvConfig>({
    ...baseConfig,
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: process.env.ENV_NAME || "dev",
        baseUrl: process.env.BASE_URL || "https://katalon-demo-cura.herokuapp.com/",
        testUsername: process.env.TEST_USERNAME || process.env.USERNAME || "John Doe",
        testPassword: process.env.TEST_PASSWORD || process.env.PASSWORD || "ThisIsNotAPassword",
        baseURL: process.env.BASE_URL || "https://katalon-demo-cura.herokuapp.com/",
        username: process.env.TEST_USERNAME || process.env.USERNAME || "John Doe",
        password: process.env.TEST_PASSWORD || process.env.PASSWORD || "ThisIsNotAPassword",
        dbConfig: {
            server: process.env.DB_SERVER || 'localhost',
            database: process.env.DB_DATABASE || 'testdb',
            connectionString: process.env.DB_CONNECTION_STRING || 'Server=localhost;Database=testdb;User Id=myUsername;Password=myPassword;',
        },
    },


});
