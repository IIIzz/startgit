import { Component } from '@angular/core';
import {NavController,ToastController} from 'ionic-angular';
import { AlertController, App } from 'ionic-angular'
import {ShoppingPage} from "./shopping/shopping";
import {NoticePage} from "../notice/notice";
import {VideosPage} from "../videos/videos";
import { AccountService } from "../../providers/account.service";
import { LogInPage } from "../log-in/log-in";
import { Storage } from '@ionic/storage';
import {ArticlesPage} from "../articles/articles";
import {RequestParam} from "../../providers/param.before.request";
//import {Product} from '../../mocks/providers/product'

//import {API} from '../../providers/api'
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {
  segmentsArray = ['segmentOne', 'segmentTwo', 'segmentThree'];
  segmentModel: string = this.segmentsArray[0];
  public press: number = 0;
  flag: any;
  role_leve:any;
  phone:any;


  constructor(public alertCtrl: AlertController,
              public nav: NavController,
            public storage: Storage,
     public requestpram:RequestParam,
     public alerCtrl: AlertController, public appCtrl: App,private accoutService:AccountService,public toastCtrl: ToastController) {

    this.flag = 0;
    this.storage.get('phone').then((user_phone)=>{
      this.phone=user_phone;
      console.log('手机号码'+JSON.stringify(user_phone));
    })
  }

  slideData = [{ image: "assets/img/2.jpg" },
    { image: "assets/img/3.jpg" },
    { image: "assets/img/1.jpg" },
    { image: "assets/img/4.jpg" },
    { image: "assets/img/5.jpg" }];

     ionViewWillEnter(){



       let phone ={
         phone:this.phone,
       }
     //  setInterval(()=>{
       this.requestpram.collectOBJ(phone).then((val_use)=>{

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
  swipeEvent(event){
    //向左滑
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 2) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
      }
    }
//向右滑
    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
      }
    }
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: '请登录',
      message: '为保证您能正常购买商品，请先登录！！',
      buttons: [{
        text: 'ok',
        handler: () => {
          location.href = './Button/button.html';
        }
      }]

    });
    alert.present()
  }

  yiyi() {
    this.nav.push(ShoppingPage)

  }

  up() {
    this.flag = 1;
  }

  down() {
    this.flag = 0;
  }

  alert_huancui() {
    this.nav.push(NoticePage);
  }
  article(){
    this.nav.push(ArticlesPage);
  }
  videos(){
    this.nav.push(VideosPage);
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
}
