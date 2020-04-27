import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { GroupService } from '../../@services/groups.service';
import { CommonService } from '../../@services/common/common.service';
import { DeviceService } from '../../@services/devices.service';
import { DeviceObject } from '../../@models';
import { ToastrService } from '../../@services/toastr.service';
import { AddDeviceComponent } from './rooms/add-device/add-device.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy, OnInit {

  private alive = true;
  public room:string;
  solarValue: number;
  statusCards: Array<any> = [];

  statusCardsByRooms: any = { };


  constructor(private themeService: NbThemeService,
              private toastrService: ToastrService,
              private dialogService: NbDialogService,
              private deviceService: DeviceService,
              private groupDevice: GroupService,
              private solarService: SolarData) {

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnInit(){
    this.loadGroups();
  }

  selectedRoom(room:string){
    this.room = room;
    this.loadGroups();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadGroups(){
    this.groupDevice.withDevices().subscribe(res=>{
      const responseObj = CommonService.analyzeResponse(res);
      const groups:Array<any> = responseObj.result;
      groups.forEach((group:any)=>{
        this.statusCardsByRooms[group.slug] = [];
        const devices:Array<any> = group.devices;
        devices.forEach((device:any)=>{
          // console.log(device);
          device.class = device.type;
          device.type =  device.type._id;
          this.statusCardsByRooms[group.slug].push(device)
        })
      })
      this.statusCards = this.statusCardsByRooms[this.room];
  })
  }
  getIconByType(type:any){
    switch (type.slug) {
      case 'lightbulb':
        return 'nb-lightbulb'
        break;
      case 'roller_shades':
        return 'nb-roller-shades'
        break;
      case 'wireless_audio':
        return 'nb-audio'
        break;
      case 'coffee_maker':
        return 'nb-coffee-maker'
        break;
      default:
        break;
    }
  }
  getPrimaryByType(type:any){
    switch (type.slug) {
      case 'lightbulb':
        return 'primary'
        break;
      case 'roller_shades':
        return 'success'
        break;
      case 'wireless_audio':
        return 'info'
        break;
      case 'coffee_maker':
        return 'warning'
        break;
      default:
        return 'success'
        break;
    }
  }

  toggleDevice(device:DeviceObject){
    this.deviceService.toggleDevice(device._id).subscribe(res=>{
      const response = CommonService.analyzeResponse(res);
      response.result.device.class = response.result.device.type;
      response.result.device.type =  response.result.device.type._id;
      this.statusCards = this.statusCards.map(d=>{
        return d._id == device._id ? response.result.device : d;
      })
    },err=>{
      this.loadGroups();
    })
   
  }

  updateDevice(device){
    this.dialogService.open(AddDeviceComponent,{context:{ device:device, update:true}})
      .onClose.subscribe((device:DeviceObject)=>{
        if(device){
          this.loadGroups();
        }
      });
  }
}
