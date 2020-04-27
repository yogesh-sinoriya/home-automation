import * as io from 'socket.io-client';

const URL = process.env.SOCKET_URI;
console.log(URL);


export class Device {
    name: string;
    key: string;
    status: boolean;
}

export class Response {
    status: string;
    result:any;
}

export class Conn {
    connected: boolean;
    subscribed: boolean;
}

export class CreateOnOffDevice{
    IO: SocketIOClient.Socket;
    device:Device;
    conn:Conn = {
        connected:false,
        subscribed:false
    };
    constructor(device:Device){
        console.log(device);
        
        this.device = device;
        this.connect();
        this.regiterDeviceToServer();
    }

    connect() {
        console.log('connecting');
        
        this.IO = io.connect(URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
        });

        this.subscribeServer();

    }

    private regiterDeviceToServer(){
        

        console.log("App Started", URL);

        this.IO.on("onping", (data:Response) => {
            console.log("got :", data);
            this.IO.emit("onpong", "$PONG");
            console.log(this.device.key+"| sent:", "$PONG");
        });

        this.IO.on("connect", (data:Response) => {
            console.log("connected");
            this.conn.connected = true;
            this.IO.emit('register-onoff-device',this.device,(res:Response)=>{
                console.log('Register response:', res);
            })
        });

        this.IO.on("reconnection", (data:Response) => {
            console.log("connected");
            this.conn.connected = true;
            this.IO.emit('register-onoff-device',this.device,(res:Response)=>{
                console.log('Register response:', res);
            })
        });

        this.IO.on("disconnect", (data:Response) => {
            this.conn.connected = false;
            console.log("disconnected");
        });
    }

    private subscribeServer(){
        this.IO.on('turn-on',async (data:Response, callback:Function)=>{
            callback(await this.turnOn());
        })

        this.IO.on('turn-off',async (data:Response, callback:Function)=>{
            callback(await this.turnOff());
        })

        this.IO.on('toggle-on-off',async (data:Response, callback:Function)=>{
            callback(await this.toggleOnOff());
        })

        this.IO.on('get-device',async (data:Response, callback:Function)=>{
            callback(await this.getDevice());
        })

        this.IO.on('set-device',async (data:Response, callback:Function)=>{
            callback(await this.setDevice(data.result));
        })
    }

    async turnOn():Promise<Device>{
        let device = await this.getDevice();

        console.log('\nTurning on Name: '+ device.name );
        device.status = true;

        return await this.setDevice(device);
    }

    async turnOff():Promise<Device>{
        let device = await this.getDevice();

        console.log('\nTurning Off Name: '+ device.name );
        device.status = false;

        return await this.setDevice(device);
    }

    async toggleOnOff():Promise<Device>{
        let device = await this.getDevice();

        console.log(`Turning ${device.status?'Off':'on'} Name: ${ device.name }, Key:  ${device.key}` );
        device.status = !device.status;
        return await this.setDevice(device);
    }


    async getDevice():Promise<Device>{
        return this.device;
    }

    private async setDevice(device:Device):Promise<Device>{
        return this.device = device;
    }
}