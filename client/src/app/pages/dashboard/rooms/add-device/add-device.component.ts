import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DeviceObject, TypeObject, GroupObject } from '../../../../@models';
import { TypeService } from '../../../../@services/types.service';
import { GroupService } from '../../../../@services/groups.service';
import { CommonService } from '../../../../@services/common/common.service';
import { DeviceService } from '../../../../@services/devices.service';
import { ToastrService } from '../../../../@services/toastr.service';

@Component({
  selector: 'ngx-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit{

  device: DeviceObject = {
    _id:null,
    key:null,
    name:null,
    type:null,
    group:null,
  };

  update:boolean = false;

  types: Array<TypeObject>=[];
  groups: Array<TypeObject>=[];

  constructor(
    protected ref: NbDialogRef<AddDeviceComponent>,
    private toastrService:ToastrService,
    private deviceService:DeviceService,
    private typeService:TypeService,
    private groupService:GroupService,
    ) {}

  ngOnInit(){
    this.typeService.getAll().subscribe(res=>{
      const responseObj = CommonService.analyzeResponse(res);
      this.types = responseObj.result;
    })
    this.groupService.getAll().subscribe(res=>{
      const responseObj = CommonService.analyzeResponse(res);
      this.groups = responseObj.result;
    })
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if(this.update){
      this.deviceService.update(this.device._id,this.device).subscribe(res=>{
        const responseObj = CommonService.analyzeResponse(res);
        this.ref.close(this.device);
      },err=>{
      })
    }else{
      this.deviceService.create(this.device).subscribe(res=>{
        const responseObj = CommonService.analyzeResponse(res);
        this.ref.close(this.device);
      },err=>{
      })
    }
    
  }

}
