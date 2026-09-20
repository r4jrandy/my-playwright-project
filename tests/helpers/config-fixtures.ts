import {test as base, expect} from '@playwright/test';

export type EnvConfig = {
    envName: string;
    baseUrl: string;
    testUsername: string;
    testPassword: string;
    baseURL: string;
    username: string;
    password: string;
    dbConfig: {};
};

export const test = base.extend<EnvConfig>({
    envName: [process.env.ENV_NAME || 'dev', {option: true}],
    baseUrl: [process.env.BASE_URL || 'https://katalon-demo-cura.herokuapp.com/', {option: true}],
    username: [process.env.USERNAME || 'John Doe', {option: true}],
    password: [process.env.PASSWORD || 'ThisIsNotAPassword', {option: true}],
    dbConfig: [{}, {option: true}],
});
