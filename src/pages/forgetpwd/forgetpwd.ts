import { Component, DoCheck } from '@angular/core';
import { NavController, NavParams, AlertController ,ToastController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { LogInPage } from "../log-in/log-in";

@Component({
  selector: 'page-forgetpwd',
  templateUrl: 'forgetpwd.html',
})
export class ForgetpwdPage implements DoCheck{
  ngDoCheck(): void {
      if(this.second == 0){
    clearInterval(this.count);
  }
  }
   second:any;
   count:any;
   phone: String;
   verify_code:any;
   new_password:any;
   new_password_again:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController,public requestParam: RequestParam,
    private accoutService: AccountService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpwdPage');
  }
startTime(position:string){
    console.log('process phoneLogin');

    if(this.phone == null ||this.phone.trim() == ""){
      let toast = this.toastCtrl.create({
             message: '请先输入您的手机号',
             duration: 1000,
             position: position,
           });
           toast.present();
           return;
    }else{
       let obj = {
       phone: this.phone
       }
      this.accoutService.phone_verify_code(obj).subscribe((val)=>{
       console.log('verify_code:'+JSON.stringify(val));
        });
    this.second = 60;
    this.count = setInterval(()=>{
    this.second--;
   },1000); 
    }
  }
  xiugai_mima(){
    if(this.phone == null || this.phone.trim() == ""||
       this.verify_code == null ||this.verify_code.trim() == ""||
       this.new_password == null ||this.new_password.trim() == ""||
       this.new_password_again == null || this.new_password_again.trim() == ""
    ){
       let alert = this.alertCtrl.create({
               title:'提示',
               subTitle:'请完整填写信息',
               buttons:['好']
             });
             alert.present();
             return;
    }
     if(this.new_password != this.new_password_again){
        let alert = this.alertCtrl.create({
               title:'提示',
               subTitle:'新密码两次填写不一致',
               buttons:['好']
             });
             alert.present();
             return;
     }
     let obj = {
        phone:this.phone,
        captcha:this.verify_code,
        new_password:this.new_password,
     }
      console.log('obj:'+obj);
     this.requestParam.collectOBJ(obj).then((val_params)=>{
        this.accoutService.forget_password(val_params).subscribe((val)=>{
          console.log('忘记密码返回结果'+JSON.stringify(val));
          if(val.result == 'ok'){
             let confirm = this.alertCtrl.create({
             title: '密码修改成功',
              buttons: [
             {
               text: '去登录',
               handler: () => {
               this.navCtrl.push(LogInPage);
             }
           }
      ]
    });
    confirm.present()
          }else{
            let alert = this.alertCtrl.create({
               title:'提示',
               subTitle:'修改失败，请稍后再试',
               buttons:['好']
             });
             alert.present();
             return;
          }
        });
     });
  }
}
