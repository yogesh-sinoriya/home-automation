import * as socketio from "socket.io";
import { Server } from "http";
import { BehaviorSubject } from "rxjs";
import { Map } from "core-js";
import { Models } from "./provider";

export class Response{
    status:Number; result:any;
}
export class SocketManager{
    IO:socketio.Server;
    clients:Map<string, socketio.Socket>;
    private PORT:Number = 8885;
    private socketOptions:any = {
        pingInterval: 15000,
        pingTimeout: 5000,
        cookie: false,
      }
    constructor(){
        this.clients = new Map();
        this.IO = socketio(this.socketOptions);
        this.IO.listen(this.PORT);
        this.IO.on("connection", (socket: socketio.Socket) => {
            console.info(`Client connected:${socket.id}`);
            socket.on("register-onoff-device", async (data:any, callback:Function) => {
                socket.id = data.key;
                if (!this.clients.has(socket.id)) {
                    this.clients.set(socket.id, socket);
                    console.log("REGISTER Device: ", data);
                    await Models.devices.update({key:data.key},{status:data.status},{multi:true});
                    socket.emit("onping", "$PING");
                    callback(data);
                } else {
                  console.log("Duplicat Client found, ", data);
                  socket.disconnect();
                }
              });


            socket.on("onpong", (data:Response) => {
                console.log(socket.id+"|got : ", data);
                setTimeout(() => {
                    if (this.clients.has(socket.id)) {
                    socket.emit("onping", "$PING");
                    console.log(socket.id+"| sent: ", "$PING");
                    }
                }, 15000);
            });
        
        
            socket.on("disconnect", async () => {
                this.clients.delete(socket.id)
                console.info(`Client gone [id=${socket.id}]`);
                await Models.devices.update({key:socket.id},{status:false},{multi:true});
            });
        });
    }

    send(key:string, event:string, data:any):Promise<any>{
        return new Promise((resolve,reject)=>{
         this.clients.get(key).emit(event,data,(res:Response)=>{
             return resolve(res);
         })
        })
     }

    async subscribeDevice(key:string, event:string):Promise<BehaviorSubject<Response>>{
        const subcriber = new BehaviorSubject({status:200, result:{message:`${event} subscribed`}})
        this.clients.get(key).on(event,(data:any)=>{
            subcriber.next(data);
        })
        return subcriber;
    }
}
