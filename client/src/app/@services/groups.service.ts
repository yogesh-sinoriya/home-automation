import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestBaseService} from './common/rest-base.service';
import {CommonService} from './common/common.service';

@Injectable({
    providedIn: 'root'
  })
export class GroupService extends RestBaseService {

    static apiURL = environment.apiURL + '/groups';

    constructor(protected http: HttpClient) {
        super(http, GroupService.apiURL);
    }

    withDevices(){
        return this.http.get(this.apiURL+'/_withDevices',CommonService.HTTP_OPTIONS);
    }
}
