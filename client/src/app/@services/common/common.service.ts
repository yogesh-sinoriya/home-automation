import {Injectable} from '@angular/core';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const MY_FORMATS_MIN = {
    parse: {
        dateInput: 'll',
    },
    display: {
        dateInput: 'll',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMM YYYY',
    },
};

@Injectable()
export class CommonService {

    static HTTP_NO_AUTH: {
        observe: 'response'
    } = {
        observe: 'response',
    };

    static HTTP_OPTIONS: {
        observe: 'response',
        headers: {Authorization: string}
    } = {
        observe: 'response',
        headers: {
            Authorization: 'Bearer ' + localStorage.accessToken
        }
    };

    static findWithAttr(array, attr, value) {
        for (let i = 0; i < array.length; i += 1) {

            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }


    static analyzeResponse(response):{status:Number;message:string;result:any} {

        // Status 200 - Success
        if (response !== null && response.status === 200) {
            if (response.body !== undefined) {
                return response.body;
            }

            return null;
        } else if (response !== null && response.status === 440) {
            localStorage.clear();
            window.location.href = '/login';
        }

        return null;
    }
}
