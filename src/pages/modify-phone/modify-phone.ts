import { Component, DoCheck } from '@angular/core';
import { NavController, NavParams, ToastController,AlertController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { Storage } from '@ionic/storage';
import { PersonInfoPage } from "../person-info/person-info";


@Component({
  selector: 'page-modify-phone',
  templateUrl: 'modify-phone.html',
})
export class ModifyPhonePage implements DoCheck{
  ngDoCheck(): void {
  if(this.second == 0){
    clearInterval(this.count);
  }
  }

  phone:string;
  second:any;
  count:any;
  password:any;
  pwd_myinput:any;
  verify_code:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,private accoutService: AccountService,
              public toastCtrl: ToastController, private storage: Storage,public alertCtrl: AlertController,
  ) {
  }
 ionViewWillEnter(){
   this.storage.get('password').then((val)=>{
     console.log('pwd:'+val);
     this.password = val;
   });
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPhonePage');
  }
startTime(position: string){
  if(this.phone == null || this.phone.trim() == ""){
    let toast = this.toastCtrl.create({
             message: '请先输入手机号',
             duration: 1000,
             position: position,
           });
           toast.present(); 
           return;
  }
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
  modify_phone(position:string){
    if(this.phone == null || this.phone.trim() == ""||
       this.verify_code == null || this.verify_code.trim() == ""||
       this.pwd_myinput == null || this.pwd_myinput.trim() == ""
    ){
         let toast = this.toastCtrl.create({
             message: '请完整填写信息',
             duration: 1000,
             position: position,
           });
           toast.present(); 
           return; 
    }
    if(this.pwd_myinput != this.password){
     let toast = this.toastCtrl.create({
             message: '登录密码不正确',
             duration: 1000,
             position: position,
           });
           toast.present(); 
           return;  
    }
    let obj={
        phone:this.phone,
        captcha:this.verify_code
    }
    this.requestParam.collectOBJ(obj).then((val_params)=>{
      this.accoutService.modify_user_phone(val_params).subscribe((val)=>{
        console.log('修改手机号结果'+JSON.stringify(val));
        if(val.result == 'error'){
            if(val.msg == 'mismatch captcha'){
             let toast = this.toastCtrl.create({
             message: '验证码错误',
             duration: 1000,
             position: position,
           });
           toast.present(); 
           return;  
            }
        }
        if(val.result == 'err'){
           if(val.message == '手机号码已绑定'){
           let toast = this.toastCtrl.create({
             message: '手机号码已绑定',
             duration: 1000,
             position: position,
           });
           toast.present(); 
           return; 
           }
          }
        if(val.result == 'ok'){
        let confirm = this.alertCtrl.create({
             title: '提示',
              buttons: [
             {
               text: '手机号修改成功',
               handler: () => {
                this.storage.set('phone',this.phone).then(()=>{
               this.navCtrl.push(PersonInfoPage);
                });
             }
           }
      ]
    });
    confirm.present()
        }
        
      });
    });
  }
}
