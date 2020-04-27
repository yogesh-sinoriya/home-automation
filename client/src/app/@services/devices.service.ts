import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestBaseService} from './common/rest-base.service';
import {CommonService} from './common/common.service';

@Injectable({
    providedIn: 'root'
  })
export class DeviceService extends RestBaseService {

    static apiURL = environment.apiURL + '/devices';

    constructor(protected http: HttpClient) {
        super(http, DeviceService.apiURL);
    }

    toggleDevice(id){
        return this.http.get(this.apiURL+'/_toggleDevice/'+id,CommonService.HTTP_OPTIONS);
    }
}
