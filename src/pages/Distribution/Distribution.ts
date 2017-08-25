import { NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular'
import { Component } from '@angular/core';
import {onePage} from "./MyWallet/Chongzhi/one";
import {twoPage} from "./MyWallet/Transaction-Record/two";
import {UserWalletPage} from "./MyWallet/user-wallet/user-wallet";
import {PersonInfoPage} from '../person-info/person-info';
import {MyAdressPage} from "../my-adress/my-adress";
import {CodePage} from "../code/code";

import {OrderPage} from "../order/order";
import {ReturnPage} from "./return/return";
import {ParterPage} from "../parter/parter";

import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";

import { Storage } from '@ionic/storage';
import {AllindexPage} from "../allindex/allindex";
import {ParterindexPage} from "../parterindex/parterindex";
import {OrderindexPage} from "../orderindex/orderindex";
import { LogInPage } from "../log-in/log-in";
import {ShopshipPage} from "../shopship/shopship";
import {SendshipPage} from "../sendship/sendship";
import {WaitshipPage} from "../waitship/waitship";
import { SystemFeedbackPage } from "./system-feedback/system-feedback";





@Component({
  templateUrl: 'Distribution.html',
})
export class WalletPage {
  value='';
  onEnter (value:string){
    this.value= value;
  }
  myInput:string;
  base64Image:any;
  user_role_level:any;
  nick_name:any;
  shops_level:any;
  parter_index:any;
  all_index_money:any;
  allparter_money:any;
  ownindex:any;
  all_index:any;
  ownindex_money:any;
  phone:any;
  role:any;

  constructor(public Walletpage: NavController,public navParams:NavParams,
              public requestParam: RequestParam,
            private accoutService:AccountService,
              private storage: Storage,public alerCtrl: AlertController, public appCtrl: App,
            public toastCtrl: ToastController) {
    this.storage.get('phone').then((user_phone)=>{
      this.phone=user_phone;
      console.log('手机号码'+JSON.stringify(user_phone));
    })
  }
  ionViewWillEnter(){
 //  setInterval(()=>{

       let phone ={
         phone:this.phone,
       }
    this.requestParam.collectOBJ(phone).then((val_phone)=>{
      this.accoutService.is_black_list(val_phone).subscribe((val)=>{
        console.log('黑名单返回结果: '+JSON.stringify(val));
        if(val.flag == 0){

          let confirm = this.alerCtrl.create({
            title: '您的账号被封了',
            buttons: [
              {
                text: '确定',
                handler: () => {
                  console.log('Disagree clicked');
                  this.logOut();
                }
              }
            ]
          });
          confirm.present()
        }
      });

    })

 //  },10000);
   console.log('ionViewWillEnter --- distribution');
   this.storage.get('user_logo').then(val=>{
   console.log('touxiang:'+val);
   this.base64Image = val;
 });
//获取用户的身份信息
    this.storage.get('user_role').then((val)=>{
      this.role=val;
      console.log('等级'+JSON.stringify(this.role))
    })
    this.storage.get('role_level_id').then(val=>{
      console.log('touxiang:'+val);
      this.user_role_level = val;
    });

    this.storage.get('user_nack').then(val=>{
      console.log('touxiang:'+val);
      this.nick_name = val;
    });

    this.storage.get('shop_name').then((val)=>{
      this.shops_level=val;
    });

    this.parterindex();
    this.index();
    this.myindex();
/*  this.requestParam.collect().then(
     (params)=>{
      this.accoutService.checkuser(params).subscribe((val)=>{
        let accountInfo = val.data;
        console.log('accountInfo'+JSON.stringify(accountInfo));
        this.base64Image = accountInfo.logo;
      });
   });
*/
}
//自己的指数
myindex(){
  let day = {
    day:7,
  }
  this.requestParam.collectOBJ(day).then((val)=>{
    this.accoutService.find_ownindex(val).subscribe(
      valindex=>{
        this.ownindex=valindex;
        console.log('自己:   '+JSON.stringify(this.ownindex));
        if(this.ownindex.data.total_money==null){
         // this.ownindex.data
          this.ownindex_money=0.00.toFixed(2);
        }
        else{
          this.ownindex_money=this.ownindex.data.total_money;
        }
      }
    )
  })
}
//总指数
  index(){
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accoutService.find_all_Performance(val).subscribe(
        valindex=>{
          //this.all_index=valindex.data.total_money;
          this.all_index=valindex;
          if(this.all_index.data.total_money==null){
            // this.ownindex.data
            this.all_index_money=0.00.toFixed(2);
          }
          else{
            this.all_index_money=this.all_index.data.total_money;
          }

          console.log('所有'+JSON.stringify(this.all_index));
        }
      )
    })
  }
  //伙伴指数
parterindex(){
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accoutService.find_up_Performance(val).subscribe(
        valindex=>{
          this.parter_index=valindex;
          console.log('伙伴  '+JSON.stringify(this.parter_index));

          let allprice=0.00;
if(this.parter_index.data.length > 0){
  for(let i=0 ;i<this.parter_index.data.length;i++){
    allprice=allprice+parseFloat(this.parter_index.data[i].total_money);
    console.log('allparter'+JSON.stringify(allprice));
    this.allparter_money=allprice.toFixed(2);
  }
}
else {
  this.allparter_money=0.00.toFixed(2);
}

        }
      )
    })

}
  //下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      let p1 = this.parterindex();
      let p2 = this.index();
      let p3 = this.myindex();
      Promise.all([p1,p2,p3]).then(()=>{
        refresher.complete();
      });
    }, 2000);
  }

  one(){
  this.Walletpage.push(onePage);
  }
  two(){
  this.Walletpage.push(twoPage);
  }
  three(){
   this.Walletpage.push(UserWalletPage);
  }
 Ad(){
    this.Walletpage.push(MyAdressPage);
 }

 toPersonInfo(){
  this.Walletpage.push(PersonInfoPage);
 }
 inv(){
   this.Walletpage.push(CodePage);
 }

 dingdan(){
   this.Walletpage.push(OrderPage);
 }

 xt(){
   this.Walletpage.push(ReturnPage);
 }
 parter(){
   this.Walletpage.push(ParterPage);
 }
  orderindex(){
   this.Walletpage.push(OrderindexPage);
  }
  paterindex(){
    this.Walletpage.push(ParterindexPage);
  }
  allindex(){
    this.Walletpage.push(AllindexPage);
  }
  setting(){
    this.Walletpage.push(PersonInfoPage);
  }
   logOut(){
   console.log('see you');
    let p1=this.storage.remove('token');
    let p2 =this.storage.remove('phone');
    let p3=this.storage.remove('password');
    let p4=this.storage.remove('user_role');
    let p5= this.storage.remove('discount');
    let p6 =this.storage.remove('user_nack');
    let p7 =this.storage.remove('user_info_bank_id');
    let p8 =this.storage.remove('user_logo');
    let p9 =this.storage.remove('shop_name');
    let p10 =this.storage.remove('user_info');

    Promise.all([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]).then(()=>{
      this.appCtrl.getRootNav().setRoot(LogInPage);
    })

  }
  qidai(position: string){
    let toast = this.toastCtrl.create({
      message: '敬请期待',
      duration: 1000,
      position: position
    });

    toast.present(toast);
  }

ziti(){
    this.Walletpage.push(ShopshipPage);
}
  daibuhuo(){
  this.Walletpage.push(WaitshipPage);
  }

  yibuhuo(){
this.Walletpage.push(SendshipPage);
  }
  toSystemFeedback(){
    this.Walletpage.push(SystemFeedbackPage);
  }
}


