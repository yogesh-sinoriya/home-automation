import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RestBaseService} from './common/rest-base.service';
import {CommonService} from './common/common.service';

@Injectable({
    providedIn: 'root'
  })
export class TypeService extends RestBaseService {

    static apiURL = environment.apiURL + '/types';

    constructor(protected http: HttpClient) {
        super(http, TypeService.apiURL);
    }
}
