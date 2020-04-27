import { BaseController } from './../../config/abstract';
import { Models, deviceManager, socket } from './../../config/provider';
import { Request } from 'express';
export default class Controller extends BaseController {
  constructor() {
    super('devices');
  }

  async create(req: Request): Promise<any> {
    if(!socket.clients.has(req.body.key)){
      throw {message:"Ivalide Device Key"}
    }
    const DEVICE = await deviceManager.getDeviceByKey(req.body.key);
    if(!DEVICE){
      throw {message:"Ivalide Device Key"}
    }

    const device = await this.model.create({
      name: req.body.name,
      key: req.body.key,
      status: DEVICE.status,
      type: req.body.type,
      group: req.body.group,
    })

    return {
      result: device,
      message:"Device created"
    };
  } 

  async toggleDevice(req:Request){
    const device = await Models.devices.findById(req.params._id).populate([{path:'type'}]);

    if(!socket.clients.has(device.key)){
      device.status = false;
    await device.save();
      throw {message:"Device not available"}
    }
    const res = await deviceManager.toggleOnOff(device.key);
    device.status = res.status;
    await device.save();
    console.log(res, device);
    
    return {
      result:{device}
    }
  }
}
