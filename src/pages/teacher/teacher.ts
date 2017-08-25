import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ToastController } from 'ionic-angular';
import {WalletPage} from "../Distribution/Distribution";
import {CodePage} from "../code/code";
import {PromotionPage} from "../promotion/promotion";
import {StudyPage} from "../study/study";
import { AccountService } from "../../providers/account.service";
import { LogInPage } from "../log-in/log-in";
import { Storage } from '@ionic/storage';
import {RequestParam} from "../../providers/param.before.request";
import { BbsPage } from "./bbs/bbs";
import { TeachGardenPage } from "./teach-garden/teach-garden";

@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class TeacherPage {
flag_show:any;
phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private accoutService:AccountService,
              private storage: Storage,public alerCtrl: AlertController, public appCtrl: App,public toastCtrl: ToastController,
              public requestprame:RequestParam,
  ) {
    this.storage.get('phone').then((user_phone)=>{
      this.phone=user_phone;
      console.log('手机3号码'+JSON.stringify(user_phone));
    })
  }

  ionViewWillEnter(){
     //  setInterval(()=>{

    let phone ={
      phone:this.phone,
    }
    //  setInterval(()=>{
    this.requestprame.collectOBJ(phone).then((val_use)=>{

      this.accoutService.is_black_list(val_use).subscribe((val)=>{
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherPage');
  }

  qiqi(){
    this.navCtrl.push(WalletPage)
  }
  code(){
    this.navCtrl.push(CodePage)
  }
  study(){
    this.navCtrl.push(StudyPage);
  }
  promotion(){
    this.navCtrl.push(PromotionPage);
  }
  show(){
    this.flag_show=1;
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
  toBBS(){
    this.navCtrl.push(BbsPage);
  }
  toTeach(){
    this.navCtrl.push(TeachGardenPage);
  }
}
