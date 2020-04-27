import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../.env') });

import { WebServer } from './managers/webserver.manager';
const webserver = new WebServer();
const app = webserver.getApp();
export { app };
