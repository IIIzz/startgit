import { Component, DoCheck } from '@angular/core';
import {App, NavController, NavParams,ToastController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import {PersonInfoPage} from "../person-info/person-info";

@Component({
  selector: 'page-infomation',
  templateUrl: 'infomation.html',
})
export class InfomationPage implements DoCheck{
  ngDoCheck(): void {
    if(this.second == 0){
    clearInterval(this.count);
  }
  }
  bankcard: string;
  idcard:string;
bankcard_address:string;
  bankcard_name:string;
  user_infomation:any;
  real_name:string;
  second:number = null;
  count:any;
  verify_code:any;
  phone:any;
  user_info:any;
  user_role_level_id:any;
  shop_name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
              public requestParam: RequestParam,
              private accoutService: AccountService,public toastCtrl: ToastController,
              public appCtrl: App,) {

  }

  ionViewWillEnter(){
    this.storage.get('phone').then((val)=>{
        console.log('phoneResult:'+val);
        this.phone = val;
    });
    this.storage.get('user_info_bank').then((val)=>{
      console.log('用户姓名银行卡身份证'+JSON.stringify(val));
      if(val.bankcard_name !=null){
        this.bankcard_name = val.bankcard_name;
      }
      if(val.bankcard_a !=null){
        this.bankcard = val.bankcard_a;
      }
      if(val.bankcard_address != null){
        this.bankcard_address = val.bankcard_address;
      }
      if(val.idcard != null){
        this.idcard = val.idcard;
      }
      if(val.name != null){
        this.real_name = val.name;
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfomationPage');
  }


  infomation(position: string){
    if(this.real_name == null || this.real_name.trim()==""||
       this.bankcard == null || this.bankcard.trim()==""||
       this.bankcard_name == null || this.bankcard_name.trim()==""||
       this.idcard == null || this.idcard.trim()==""
    ){
      let toast = this.toastCtrl.create({
             message: '请完整填写信息',
             duration: 1000,
             position: position,
           });
           toast.present();
           return;
    }
    if(this.verify_code == null){
     let toast = this.toastCtrl.create({
             message: '请先输入验证码',
             duration: 1000,
             position: position,
           });
           toast.present();
           return;
    }

    let user_info_bank_id={
      bankcard_name: this.bankcard_name,
      bankcard_a:this.bankcard,
      bankcard_address:this.bankcard_address,
      idcard: this.idcard,
      name:this.real_name,
    }
    let obj={
      bankcard_name: this.bankcard_name,
      bankcard_a:this.bankcard,
      bankcard_address:this.bankcard_address,
      idcard: this.idcard,
      name:this.real_name,
      phone:this.phone,
      captcha:this.verify_code,
    }

  console.log('user_info'+JSON.stringify(user_info_bank_id));

this.requestParam.collectOBJ(obj).then((val)=>{
     this.accoutService.information(val).subscribe(
       valinfomation=>{
         this.user_infomation=valinfomation;
         console.log('修改关键信息返回结果'+JSON.stringify(valinfomation));
         if(this.user_infomation.msg == 'mismatch captcha'){
           let toast = this.toastCtrl.create({
             message: '验证码不正确',
             duration: 1000,
             position: position,
           });
           toast.present();
           return;
         }
         if(this.user_infomation.result=='err'){

           let toast = this.toastCtrl.create({
             message: '请输入正确的信息',
             duration: 1000,
             position: position,
           });
           toast.present();
           return;
         }
         else {
           this.requestParam.collect().then((val=> {
             this.accoutService.checkuser(val).subscribe(
               valuser=>{
                 this.user_info=valuser;
                 this.user_role_level_id=this.user_info.data.role_level_id;
                 this.shop_name=this.user_info.data.role_level_name;

                 this.storage.set('role_level_id',this.user_role_level_id);
                 this.storage.set('shop_name',this.shop_name);
               }
             )
           }))


          let p = this.storage.set('user_info_bank',user_info_bank_id);
          Promise.all([p]).then(()=>{

           this.navCtrl.push(PersonInfoPage);
          });
         }

         console.log('信息'+JSON.stringify(this.user_infomation));
       }


     )
})
  }
startTime(){
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
