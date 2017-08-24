import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';



@Injectable()
export class AccountService {

 //private accountsUrl = 'http://192.168.31.81:8082';  // URL to web api
 private accountsUrl = 'http://139.224.17.189:8082';  // URL to web api
//private accountsUrl = 'http://221.2.171.76:8082';  // URL to web api




  constructor(public http: Http) { }
  //login auth
  toAuth(phone:string, pwd:string, time:any ,noice:any, appid:string, sign:any):Observable<any>{
//      let params = new URLSearchParams();
      let url = this.accountsUrl + '/user/login/pwd';
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      let obj = {
       phone: phone,
       pwd:  pwd,
       time: time,
       noice: noice,
       appid: appid,
       sign: sign
     }
      console.log('obj1111:'+JSON.stringify(obj));
      return this.http.post(url,obj,options).map(res => res.json());
  }
  //get user balances
  getUserBalances(params:any):Observable<any>{
    let url = this.accountsUrl + '/get/user/balances';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //get user ghk
  getUserGhk(params:any):Observable<any>{
    let url = this.accountsUrl + '/get/user/ghk';
   let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //get_user_points
  getUserPoints(params:any):Observable<any>{
    let url = this.accountsUrl + '/get/user/points';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //modify_user_logo    basic_params+logo
  modifyUserLogo(params:any):Observable<any>{
    let url = this.accountsUrl + '/modify/user/logo';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //modify_user_phone   basic_params+phone
  modifyUserPhone(params:any):Observable<any>{
     let url = this.accountsUrl + '/modify/user/phone';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //modify_user_password  basic_params+old_password, new_password
  modifyUserPassword(params:any):Observable<any>{
   let url = this.accountsUrl + '/modify/user/password';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //modify_user basic_params+email, nickname, sex, birthday, qq, weixin, weixin_nickname, address_detail, introduction
  modifyUser(params:any):Observable<any>{
    let url = this.accountsUrl + '/modify/user';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //find_next_level  basic_params
  findNextLevel(params:any):Observable<any>{
     let url = this.accountsUrl + '/find/next/level';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //modify_shipping_address  basic_params + id, receiver_name, receiver_phone, receiver_address_code,
  //   receiver_address, receiver_address_detail
  modifyShippintAddress(params:any):Observable<any>{
   let url = this.accountsUrl + '/modify/shipping/address';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //find_shipping_address  basic_params
  findShippingAddress(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/shipping/address';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //delete_shipping_address  basic_param+id
  deleteShippingAddress(params:any):Observable<any>{
    let url = this.accountsUrl + '/delete/shipping/address';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //add_shipping_address basic   receiver_name, receiver_phone, receiver_address_code,
  //   receiver_address, receiver_address_detail
  addShippingAddress(params:any):Observable<any>{
      let url = this.accountsUrl + '/add/shipping/address';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //get QR
  getQR(params:any):Observable<any>{
    let url = this.accountsUrl + '/get/qrcode';
     let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //省市联动
  getSheng():Observable<any>{
   let url = this.accountsUrl + '/city/getsheng';
     let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,options).map(res => res.json());
  }
  getCity(params:any):Observable<any>{
     console.log('params:'+JSON.stringify(params));
   let url = this.accountsUrl + '/city/getcity';
     let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  getSubCity(params:any):Observable<any>{
     console.log('params:'+JSON.stringify(params));
   let url = this.accountsUrl + '/city/getsubcity';
     let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //充值，测试
  toChongzhi(params:any):Observable<any>{
 //   let url = "http://221.2.171.76:8088/pay/refill/balance";
    let url = this.accountsUrl+'pay/refill/balance';

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //现金账户充值
  to_money(params:any,zhanghu:any):Observable<any>{
    console.log('zhanghu:'+zhanghu);
    let url = null;
    if(zhanghu == 'xianjin'){
      url = this.accountsUrl+'/refill/balance';
    }else if(zhanghu == 'ghk'){
      url = this.accountsUrl+'/refill/ghk';
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //参能量充值
  to_shen(params:any):Observable<any>{
    let url = this.accountsUrl+'pay/refill/balance';
   // let url = "http://221.2.171.76:8088/pay/refill/balance";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //修改登陆密码
  change(params:any):Observable<any>{
    let url =this.accountsUrl+ '/modify/user/password';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res=>res.json());
  }
  //根据用户id查用户
  checkuser(params:any):Observable<any>{
    let url =this.accountsUrl+ '/find/user/id';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res=>res.json());
  }
   //修改用户logo  modify_user_logo
  modify_user_logo(params:any):Observable<any>{
    let url = this.accountsUrl + '/modify/user/logov2';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //查找所有自提点
  findShopAll(params:any):Observable<any>{
    let url =this.accountsUrl+ '/find/shop/all';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res=>res.json());
  }
  //根据用户ID查订单
  selectorder(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/orderv2/id';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //根据订单状态查订单
  findorderstatus(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/orderv2/status';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //取消订单
  cancleod(params:any):Observable<any>{
    let url = this.accountsUrl + '/cancel/orderv2';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //查询所有产品
  chick(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/itemv2/all';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //根据ID查产品
  chickID(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/itemv2/id';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //根据名字查产品
  chickname(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/itemv2/name';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //订单提交
  sendorder(params:any,zhifu_fangshi:any):Observable<any>{
    let url = null;
    if(zhifu_fangshi == 'bank'){
    console.log('zhifu'+zhifu_fangshi);
      url = this.accountsUrl + '/add/orderv2';
    }else if(zhifu_fangshi == 'energy'){
      url = this.accountsUrl + '/add/orderv2/pay/ghk';
    }else if(zhifu_fangshi == 'xianjin'){
      url = this.accountsUrl + '/add/orderv2/pay/balance';
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  // get_order_pay_url待支付订单获取支付链接
  get_order_pay_url(params:any):Observable<any>{
   let url = this.accountsUrl + '/get/order/pay/url';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //上级伙伴
  bigparter(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/parent/node';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }

  //添加银行卡，身份证，开户银行
  information(params:any):Observable<any>{
    let url = this.accountsUrl + '/bind/bankcard/idcard';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }

  //查找交易记录
  find_transaction_record(params:any):Observable<any>{
    let url = this.accountsUrl + '/get/user/trade/info';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //提现
  cash_out(params:any):Observable<any>{
    let url = this.accountsUrl + '/cash/out';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //查看下级业绩
  find_up_Performance(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/child/performance';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //查找所有下级业绩
  find_all_Performance(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/all/child/performance';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //查找自己的业绩
  find_ownindex(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/performance';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //手续费
  find_system(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/system';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //获取手机验证码
  phone_verify_code(params:any):Observable<any>{
    let url = this.accountsUrl + '/sms/send/captcha';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //修改手机号
  modify_user_phone(params:any):Observable<any>{
    let url = this.accountsUrl + '/modify/user/phone';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //忘记密码
   forget_password(params:any):Observable<any>{
    let url = this.accountsUrl + '/forget/password';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //是否为黑名单
  is_black_list(params:any):Observable<any>{
    let url = this.accountsUrl + '/is/black/list';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //确认收货
   confirm_receipt(params:any):Observable<any>{
    let url = this.accountsUrl + '/confirm/receipt';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //礼包
  find_gifts(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/gifts';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //礼包详情
  find_gifts_id(params:any):Observable<any>{
    let url = this.accountsUrl + '/find/itemv2/gifts/id';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //店铺自提
    shopship(params:any):Observable<any>{
    let url = this.accountsUrl + '/shop/find/orderv2';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //店铺待补货 状态2
  waitship(params:any):Observable<any>{
    let url = this.accountsUrl + '/shop/find/replenish';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
  //店铺已补货 状态3
  readyship(params:any):Observable<any>{
    let url = this.accountsUrl + '/shop/find/replenish';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }

  //现金账户支付礼包  购货款支付礼品 银行卡支付礼品
  gifts_pay(params:any,zhifu_fangshi:any):Observable<any>{
    let url =null;
    if(zhifu_fangshi == 'xianjin'){
       url = this.accountsUrl + '/gift/orderv2/pay/balance';
    }
    if(zhifu_fangshi == 'energy'){
       url = this.accountsUrl + '/gift/orderv2/pay/ghk';
    }
    if(zhifu_fangshi == 'bank'){
       url = this.accountsUrl + '/gift/orderv2';
      }
    if(zhifu_fangshi == 'points'){
      url = this.accountsUrl + '/gift/orderv2/pay/points';
    }
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
  }
    //购货款转入金额
  zhuanru_ghk(params:any):Observable<any>{
    let url = this.accountsUrl + '/balances/to/ghk';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url,params,options).map(res => res.json());
    }



  /*  getAccounts(): Observable<Account[]> {
      return this.http.post().map(res => res.json());
  }*/

/*  getAccount(phone:string): Observable<Account> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    const url = `${this.accountsUrl}?phone = ${phone} `;
      return this.http.get(url, options).map(res => res.json())
  }*/

/*  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/
}


