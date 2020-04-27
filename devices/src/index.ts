import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../.env') });
import { logger } from 'config/logger';

import { Device ,CreateOnOffDevice} from './config';
const devices:Array<Device> = [
    {
      name:"Light Bulb",
      key: "lightbulb",
      status:false
    },
    {
      name:"Coffee Make",
      key: "coffee_maker",
      status:false
    },
    {
      name:"Roller Shade",
      key: "roller_shade",
      status:false
    },
    {
      name:"Wireless Audio",
      key: "wireless_audio",
      status:false
    },
  ]


  devices.forEach((device:Device) => {
      new CreateOnOffDevice(device);
  });
