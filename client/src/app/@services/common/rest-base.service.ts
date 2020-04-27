import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RestInterface} from './rest-interface';
import {CommonService} from './common.service';

export class RestBaseService implements RestInterface {

    constructor(protected http: HttpClient, protected apiURL: string) {
    }

    ping(): Observable<HttpResponse<any>> {
        return this.http.options(this.apiURL, CommonService.HTTP_OPTIONS);
    }

    copy(code) {
        return this.http.get(this.apiURL + '/' + code + '/copy', CommonService.HTTP_OPTIONS);
    }

    clone(code) {
        return this.http.get(this.apiURL + '/' + code + '/clone', CommonService.HTTP_OPTIONS);
    }

    getAll() {
        return this.http.get(this.apiURL, CommonService.HTTP_OPTIONS);
    }

    update(code, object) {
        const url = this.apiURL + '/' + code;
        return this.http.put(url, object, CommonService.HTTP_OPTIONS);
    }

    /**
     * @param arr|object
     * @returns {Observable<HttpResponse<any>>}
     */
    create(arr) {
        return this.http.post(this.apiURL, arr, CommonService.HTTP_OPTIONS);
    }

    destroy(code, revision_no = null) {

        let url = this.apiURL + '/' + code;

        if (revision_no !== undefined && revision_no !== null) {
            url = url + '/' + revision_no;
        }

        return this.http.delete(url, CommonService.HTTP_OPTIONS);
    }


    get(code, revision_no = null) {

        let url = this.apiURL + '/' + code;

        if (revision_no !== undefined && revision_no !== null) {
            url = url + '/' + revision_no;
        }

        return this.http.get(url, CommonService.HTTP_OPTIONS);
    }
}
