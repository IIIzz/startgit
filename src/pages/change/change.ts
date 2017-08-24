import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { AccountService } from "../../providers/account.service";
import { RequestParam} from '../../providers/param.before.request';
import { Storage } from '@ionic/storage';
import {LogInPage} from "../log-in/log-in";


@Component({
  selector: 'page-change',
  templateUrl: 'change.html',
})
export class ChangePage {
  old_password:string;
  new_password:string;
  changeResult:any;
  new_password_again:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public requestParam:RequestParam,public accountService:AccountService,
              public alertCtrl:AlertController,public storage:Storage, public appCtrl: App,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePage');
  }

  changem(){
    if(this.old_password == null || this.old_password ==""||
       this.new_password == null || this.new_password ==""||
       this.new_password_again == null || this.new_password_again ==""){
     let alert = this.alertCtrl.create({
        title:'提示',
        subTitle:'请完整填写信息',
        buttons:['好'],
      });
      alert.present();
      return; 
    }
    if(this.new_password != this.new_password_again){
     let alert = this.alertCtrl.create({
        title:'提示',
        subTitle:'新密码两次输入不一致',
        buttons:['好'],
      });
      alert.present();
      return; 
    }


   let obj ={
        old_password:this.old_password,
        new_password:this.new_password,
    }
    //console.log(JSON.stringify(this.new_passward));
  this.requestParam.collectOBJ(obj).then( (val => {
     this.accountService.modifyUserPassword(val).subscribe(
       valon=>{
         this.changeResult=valon;
         console.log(JSON.stringify(this.changeResult));
         if(this.changeResult.result == 'ok'){
           this.storage.set('token',this.changeResult.token);
           this.storage.set('password',this.changeResult.password);
           let alert = this.alertCtrl.create({
             title:'提示',
             subTitle:'更改密码成功',
             buttons:[{
               text: '好',
               handler:() =>{
               //  this.navCtrl.push(WalletPage);

                   console.log('see you');
                   this.storage.remove('token');
                   this.storage.remove('phone');
                   this.storage.remove('password');
                   this.storage.get('token').then((val) => {
                     // console.log('Your token is', val);

                     this.appCtrl.getRootNav().setRoot(LogInPage);

                   })
             },}
             ]
           });
           alert.present();
           return;
         }else if(this.changeResult.result == 'err'){
           if(this.changeResult.message == '原密码不正确'){
            let alert = this.alertCtrl.create({
                title:'提示',
                subTitle:'原密码不正确',
                buttons:['好'],
           });
           alert.present();
           return;  
           }
         }
       }
     )
  }));

}

}
