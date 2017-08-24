import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Md5} from "ts-md5/dist/md5";

@Injectable()
export class RequestParam {
  constructor(
    private storage: Storage,
  ) {
  }
  //只需要传入基本参数时，使用此方法
  collect():Promise <any> {
   //   let appid, appkey, token;
      //sync get three praras
      let p1 = this.storage.get('appid');
      let p2 = this.storage.get('appkey');
      let p3 = this.storage.get('token');
      return Promise.all([p1, p2, p3]).then(function (results) {
      return RequestParam.collectParam(results);
});
}
  //除了基本参数，还需要传入其他一些参数时，使用此方法
   collectOBJ(obj:any):Promise<any>{
  //  let appid ,appkey,token;
    let p1 = this.storage.get('appid');
    let p2 = this.storage.get('appkey');
    let p3 = this.storage.get('token');
    return Promise.all([p1, p2, p3]).then(function (results) {

    obj['appid'] = results[0];
    obj['appkey'] = results[1];
    obj['token'] = results[2];

    return RequestParam.collectParamOBJ(obj);
});
   }
 // collect other params and make final json.
   static collectParam(paras:any):any{
    let time = (new Date).valueOf();
    let noice = Math.round((Math.random() * 10000000));
    let obj={
       appid: paras[0],
       token: paras[2],
       time: time,
       noice: noice,
    };
    let str = [];
     for(let key in obj){
       str.push(key+obj[key]);
     }
      str.sort();
  let sign = Md5.hashStr(str.join("") + paras[1]);
  let json = {
       appid: paras[0],
       token: paras[2],
       time: time,
       noice: noice,
       sign: sign
   }
   return json;
  }
  //collect param which should trans some other params
  static collectParamOBJ(obj:any):any{
    //obj: basic_params and other params
    let time = (new Date).valueOf();
    let noice = Math.round((Math.random() * 10000000));
    obj['time'] = time;
    obj['noice'] = noice;
    let str = [];
    for(let key in obj){
      if(key != 'appkey'){
        str.push(key+obj[key]);
      }
    }
      str.sort();
      let sign = Md5.hashStr(str.join("") + obj['appkey']);
      obj['sign'] = sign;
      delete obj['appkey'];
      return obj;
  }
}
