import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/user';
import { TabsPage } from '../tabs/tabs';
import { ForgetpwdPage } from '../forgetpwd/forgetpwd';
import { RequestParam} from '../../providers/param.before.request'
import { AccountService } from '../../providers/account.service';
import 'rxjs/Rx';
import {Md5} from "ts-md5/dist/md5";

import { BarcodeScanner,BarcodeScannerOptions  } from '@ionic-native/barcode-scanner';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser';

//import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  providers: [User,AccountService]
})
export class LogInPage {
  phone: string;
  password: string;
  private appid_value: string;
  private security: string;
  private authResult:any = {};
  returnCheck:any;
  user_info:any;
  user_role:any;
  discount_user:any;
  shop_name:any;
  user_nickname:any;
  user_logo:any;
  bankcard_a:any;
  bankcard_a_address:any;
  bankcard_name:any;
  Idcard:any;
 user_role_level_id:any;

options : InAppBrowserOptions = {
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

scan_options:BarcodeScannerOptions ={
resultDisplayDuration:0

};
  constructor(
             private accoutService:AccountService,
             private storage: Storage,
             public user: User,
             public navCtrl: NavController,
             public alertCtrl: AlertController,
             public requestParam:RequestParam,
             public accountService:AccountService,
             public loadingCtrl:LoadingController,
	     private barcodeScanner: BarcodeScanner,
	     private theInAppBrowser: InAppBrowser
            ) {

  }
//scan qrcode ,then do login.
  do_scan_login(){
	  this.barcodeScanner.scan(this.scan_options).then((barcodeData) => {
		   // Success! Barcode data is here
		  let re = /user/gi;
		  let new_url = barcodeData.text.replace(re,'user_scan');
          let ref = this.theInAppBrowser.create(new_url,'_blank',this.options);
	  let p1 = ref.on("loadstart").subscribe(
           (event)=>{
//            console.log('returned_url:'+JSON.stringify(event.url));
             if(event.url == 'http://localhost:8087/exit'){
             ref.close();
               //this.shopcart.changeOrder(null,"clear");
     //this.doLogin();

           }

         },err =>{

         }
        );//end of subscribe;
   //Promise.all([p1]).then(()=>{
        //   setTimeout("this.navCtrl.push(OrderPage)",5000);
          //this.navCtrl.push(OrderPage);
    //    });//end of promise;
		  //
	  }, (err) => {
		      // An error occurred
            console.log('scan login err:',err);	
	  }); 
  }//end of do scan login;
  doLogin() {
     if(this.phone == null || this.phone.trim() == "" ||
        this.password == null || this.password.trim() == "") {
        let alert = this.alertCtrl.create({
          title:'提示',
          subTitle:'用户名或密码不能为空',
          buttons:['好'],
        });
        alert.present();
        return;
      }

      //get params
     let time_value = (new Date).valueOf();
     let noice_value = Math.round((Math.random() * 10000000));
     let p1 = this.storage.get('appid').then(
       (val) => this.appid_value = val
     );
     let p2 = this.storage.get('appkey').then(
         (val) => this.security = val
      );
      Promise.all([p1,p2]).then(
        ()=>{
     let obj = {
       phone: this.phone,
       pwd: this.password,
       time: time_value,
       noice: noice_value,
       appid: this.appid_value,
     }
     let str = [];
     for(let key in obj){
       str.push(key+obj[key]);
     }
      str.sort();
  let sign = Md5.hashStr(str.join("") + this.security);
      this.accoutService.toAuth(this.phone, this.password,time_value, noice_value, this.appid_value, sign).subscribe(
         val => {
           this.authResult = val;
           console.log('authResultin:'+JSON.stringify(this.authResult));
         if(this.authResult.result == 'ok'){
           if(this.authResult.flag == 0){
            let alert = this.alertCtrl.create({
               title:'提示',
               subTitle:'您被封号了',
               buttons:['好']
             });
             alert.present();
             return;
           }
           //save some info to storage
          let p1=  this.storage.set('token',this.authResult.token);
          let p2 =   this.storage.set('phone',this.phone);
          let p3= this.storage.set('password',this.password);
           Promise.all([p1,p2,p3]).then(()=>{
             let p = this.checkuser();
             Promise.all([p]).then(()=>{
             this.navCtrl.setRoot(TabsPage);
             });
           });
          }

          if(this.authResult.result=='err'){
             let alert = this.alertCtrl.create({
               title:'提示',
               subTitle:'用户名密码错误',
               buttons:['好']
             });
             alert.present();
             return;

           }

         }
        );
        }
      );

  }
    //获得用户信息
 checkuser(){

    this.requestParam.collect().then((val=>{
      this.accountService.checkuser(val).subscribe(
        valuser=>{
          console.log('获得的用户信息结果：'+JSON.stringify(valuser));
          this.user_info=valuser;
          this.user_role=this.user_info.data.role;
          this.shop_name=this.user_info.data.role_level_name;
          this.user_nickname=this.user_info.data.nickname;
          this.user_logo = this.user_info.data.logo;
          this.user_role_level_id=this.user_info.data.role_level_id;
          console.log('用户等级'+JSON.stringify(this.user_role_level_id));

          if( this.user_info.data.level == null){

            this.discount_user == 1;
          }else{
             this.discount_user=this.user_info.data.level.discount/100;
          }



          let user_info_bank_id={

              bankcard_name: this.bankcard_name=this.user_info.data.bankcard_a_name,
              bankcard_a:this.bankcard_a=this.user_info.data.bankcard_a,
              bankcard_address:this.bankcard_a_address=this.user_info.data.bankcard_a_address,
              idcard: this.Idcard=this.user_info.data.idcard,
              name:this.user_info.data.name
        }

          console.log('user'+JSON.stringify(user_info_bank_id))

          this.storage.set('user_role',this.user_role);
          this.storage.set('discount',this.discount_user);
          this.storage.set('shop_name',this.shop_name);
          this.storage.set('user_nack',this.user_nickname);
          this.storage.set('user_logo',this.user_logo);
          this.storage.set('user_info_bank',user_info_bank_id);
          this.storage.set('role_level_id',this.user_role_level_id);

        }
      )
    }))
  }
  //验证码登录
/*  toPhoneLogin(){
    this.navCtrl.push(PhoneloginPage);
  }
*/
  toForgetPWD(){
    this.navCtrl.push(ForgetpwdPage);
  }




}
