# Home Automation

Basic home automation example.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation with NVM

Just go on [official nvm website](https://github.com/nvm-sh/nvm) and follow the instruction.
Also, be sure to have `git` available in your PATH, `nvm` might need it (You can find git [here](https://git-scm.com/)).


- #### Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.18.1

    $ npm --version
    6.13.4

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Install

    $ git clone https://github.com/yogesh-sinoriya/home-automation.git

## Setup Frontend Service

    $ cd client
    $ npm install
    $ ng build --prod
   
## Setup Backend-End Service

    $ cd server
    $ npm install
    $ npm run build
    $ npm start

## Setup IoT Devices Service

    $ cd devices
    $ npm install
    $ npm run build
    $ npm start

## Configure Iot Devices

Open `devices/src/index.ts` then edit it with your settings before build. You will need:
```
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
    ...... as many you want (Ican may not be exist, You have to create/add at client side)
  ]
```
