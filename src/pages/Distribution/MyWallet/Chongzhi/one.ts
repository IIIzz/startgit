import { Component, DoCheck } from '@angular/core';
import {Platform,ActionSheetController,LoadingController} from'ionic-angular'
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AccountService } from "../../../../providers/account.service";
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { UserWalletPage } from "../user-wallet/user-wallet";
import { Storage } from '@ionic/storage';
import {RequestParam} from'../../../../providers/param.before.request';
@Component({
  selector: 'page-one',
  templateUrl:'one.html'
})
export class onePage implements DoCheck{
  ngDoCheck(): void {
    let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
    if(this.refill_money == null || this.chongzhi_zhanghu == null){
      this.isDisabled = true;
    }else{
       if(!this.refill_money.match(reg) || this.refill_money == '0'){
         this.isDisabled =true;
       }else if(parseFloat(this.refill_money) < 1){
         this.isDisabled =true;
       }else{
         this.isDisabled =false;
       }
    }
  }
  options: InAppBrowserOptions = {
    location : 'no',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};
  money:any;
  phone:any;
  czInfo:any;
  czgInfo:any;
  chongzhi_zhanghu:any;
  refill_money:string;
  user_role_:any;
  isDisabled:boolean = true;


  constructor(
     public nav:NavController,
     public navparams:NavParams,
     public storage :Storage,
     public platform:Platform,
     public actionsheetCtrl:ActionSheetController,
     private accoutService:AccountService,
     private theInAppBrowser: InAppBrowser,
     public loadingCtrl:LoadingController,
     public alertCtrl: AlertController,
     public  request:RequestParam,

   ){
   }
  ionViewWillEnter(){
     this.getPhone();
     let moneynum =this.navparams.get('czInfo');
     this.czInfo = moneynum;
     let ghk =this.navparams.get('czgInfo');
     this.czgInfo =ghk;
     if(this.czInfo != null){
       this.chongzhi_zhanghu = this.czInfo;
       console.log(this.chongzhi_zhanghu);
     }else if(this.czgInfo != null){
       this.chongzhi_zhanghu = this.czgInfo;
       console.log(this.chongzhi_zhanghu);
     }
    this.getrole();
  }

  getrole(){
    this.storage.get('user_role').then(
      val => {
        this.user_role_ = val;
        console.log('user_role'+this.user_role_)
      }
    )
  }
  getPhone(){
        this.storage.get('phone').then((val=>{
          this.phone=val;
          this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
        }));
}

  chongzhi() {
/*    if (this.chongzhi_zhanghu == null) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '请选择充值账户',
        buttons: ['好'],
      });
      alert.present();
      return;
    }
*/
/*    if (this.refill_money == null) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '请输入充值金额',
        buttons: ['好'],
      });
      alert.present();
      return;
    }
*/
    //根据账户添加账户信息进入obj
      let obj =null;
      if(this.chongzhi_zhanghu == 'xianjin'){
        obj = {
          refill_money: this.refill_money,
        }
      }else if(this.chongzhi_zhanghu == 'ghk'){
        obj = {
          money_need_pay: this.refill_money,
        }
      }
      this.request.collectOBJ(obj).then((val=>{
        
        this.accoutService.to_money(val,this.chongzhi_zhanghu).subscribe(
          (valmoney) => {
            console.log('chongzhiresult:' + JSON.stringify(valmoney));
            let target = "_blank";
            let ref = this.theInAppBrowser.create(valmoney.pay_url, target, this.options);
            ref.on("loadstart").subscribe(
              (event) => {
                console.log('returned_url:' + JSON.stringify(event.url));
                if (event.url == 'http://localhost:8088/return') {
                  ref.close();
                  this.nav.push(UserWalletPage);
                }
              }, err => {

              }
            );

          }
        )
      }))
  }
/*  keyup(){
    console.log('hello keyup');
    if(this.refill_money != null){
  let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
  if(!this.refill_money.match(reg) || this.refill_money == '0'){
    this.isDisabled = true;
    this.refill_money = null;
  }else{
    this.isDisabled = false;
  }
}
  }*/
}
