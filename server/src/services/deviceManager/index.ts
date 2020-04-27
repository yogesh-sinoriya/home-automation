import { SocketManager } from "config/socket";

class Device {
    name: string;
    key: string;
    status: boolean;
}

export class DeviceManager{
    private socket:SocketManager;
    constructor(socket:SocketManager) {
        this.socket = socket;
    }

    async turnOn(key:string):Promise<Device>{
      return await this.socket.send(key, 'turn-on', {})
    }

    async turnOff(key:string):Promise<Device>{
      return await this.socket.send(key, 'turn-off', {})
    }

    async toggleOnOff(key:string):Promise<Device>{
      return await this.socket.send(key, 'toggle-on-off', {})
    }

    async getDeviceByKey(key:string):Promise<Device>{
      return await this.socket.send(key, 'get-device', {})
    }
}

