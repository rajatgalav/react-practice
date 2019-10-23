import {getRequest} from './index';
import {LOGIN} from './actionTypes';

export function login(url){
    return {
        type: LOGIN,
        payload: {
            request: {
              method: 'GET',
              url,
            //   cancelToken,
              withCredentials: true,
              credentials: 'same-origin',
              /*  headers: {
                 userLoginId: 'shashank.jha@thepsi.com',
               } */
            },
          }
    }
}