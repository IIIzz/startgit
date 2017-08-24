import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import {ShoppingPage} from "../shop/shopping/shopping";
import {PacksPage} from "../packs/packs";
import { Storage } from '@ionic/storage';
import { AccountService } from "../../providers/account.service";
import { LogInPage } from "../log-in/log-in";
import {RequestParam} from "../../providers/param.before.request";
/**
 * Generated class for the BuyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
user_role:any;
phone:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
      public storage: Storage, public alertCtrl: AlertController,public toastCtrl: ToastController,
     public alerCtrl: AlertController, public appCtrl: App,private accoutService:AccountService,
              public requestprame:RequestParam,
) {

    this.storage.get('role_level_id').then(
      val => {
        this.user_role = val;
        console.log('user_role'+this.user_role)
      }
    );

    this.storage.get('phone').then((user_phone)=>{
      this.phone=user_phone;
      console.log('手2机号码'+JSON.stringify(user_phone));
    })

  }
  ionViewWillEnter(){

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
    console.log('ionViewDidLoad BuyPage');
  }
  buy_item(position:string){

   if(this.user_role == 0){
      let toast = this.toastCtrl.create({
        message: '请先完善个人信息',
        duration: 2000,
        position: position
      });

      toast.present(toast);
    }
    else{
      this.navCtrl.push(ShoppingPage);
    }
    //this.navCtrl.push(ShoppingPage);
  }
  buy_packs(position:string){
    if(this.user_role == 0){
      let toast = this.toastCtrl.create({
        message: '请先完善个人信息',
        duration: 2000,
        position: position
      });
      toast.present(toast);
    }
    else{
      this.navCtrl.push(PacksPage);
    }
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
}
