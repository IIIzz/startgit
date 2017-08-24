import { Component, ViewChild } from '@angular/core';
import {NavController, NavParams, AlertController, Platform, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LogInPage} from '../log-in/log-in';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {ChangePage} from "../change/change";
import { App, ViewController ,Navbar} from 'ionic-angular';
import {InfomationPage} from "../infomation/infomation";
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import {TabsPage} from "../tabs/tabs";
import { ModifyPhonePage } from "../modify-phone/modify-phone";


@Component({
  selector: 'page-person-info',
  templateUrl: 'person-info.html',
  providers:[Camera,File,FileTransfer]
})
export class PersonInfoPage {
  @ViewChild(Navbar) navBar: Navbar;
  flag;
  phone;
  password;
  shops_level:any;
  nickname:any;
  IdCard:any ;
  BankInfomation:any;
  BankCard:any ;
  base64Image:string;
  bankcard:any;
  idcard:any;
  realName:any;
  shop_name:any;
  user_info:any;



 constructor( public platform: Platform,
    public actionsheetCtrl: ActionSheetController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams,
              public alerCtrl: AlertController,private camera: Camera,
              public viewCtrl: ViewController,
              public appCtrl: App,
              public requestParam: RequestParam,
              private accoutService:AccountService,

            ) {

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAdressPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.push(TabsPage,{
        flag : 3
      });
    }
  }
ionViewWillEnter(){
  this.IdCard=null;
  this.BankCard=null;
  this.realName=null;

this.shop_leverl();

 console.log('ionViewWillEnter');
let p1 = this.storage.get('user_logo').then((val)=>{

   console.log('user_logo'+val);
    this.base64Image = val;
 });
 let p2 =this.storage.get('user_nack').then((val)=>{
   this.nickname=val;
 });
 let p3 = this.storage.get('phone').then((val)=>{
   this.phone=val;
   this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
 });

  let p4 = this.storage.get('shop_name').then((val)=>{
    this.shops_level=val;
  });

   this.storage.get('user_info_bank').then((val)=>{
    console.log('user_val111'+JSON.stringify(val));
    this.realName=val.name;
    if(this.realName != null){
      this.realName = '*'+this.realName.substr(1);
    }
    this.BankCard=val.bankcard_a;
    if (this.BankCard != null){
      this.BankCard = this.BankCard.substr(0, 6) + '*********' + this.BankCard.substr(15);
    }

    console.log('BAnkcard'+JSON.stringify(this.BankCard));

    this.IdCard=val.idcard;
    if(this.IdCard!= null ){
      this.IdCard = this.IdCard.substr(0, 6) + '********' + this.IdCard.substr(13);
    }
    console.log('shop_val'+JSON.stringify(val))
    //this.BankCard=val.bankcard;
    // this.IdCard=val.idcard;
  });



  Promise.all([p1,p2,p3,p4]);


/*
 this.requestParam.collect().then(
     (params)=>{
      this.accoutService.checkuser(params).subscribe((val)=>{
        let accountInfo = val.data;
        console.log('accountInfo'+JSON.stringify(accountInfo));
        this.phone = accountInfo.phone;
        this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
        this.nickname = accountInfo.nickname;
        this.base64Image = accountInfo.logo;
        console.log('logo'+this.base64Image);
        this.shops_level = accountInfo.role_level_name;
        //以下添加银行卡身份证的获取
      });
   });
*/
}
shop_leverl(){

  this.requestParam.collect().then((val=>{
    this.accoutService.checkuser(val).subscribe(
      valuser=>{
        console.log('获得的用户信息结果：'+JSON.stringify(valuser));
        this.user_info=valuser;
        this.shop_name=this.user_info.data.role_level_name;
          this.shops_level=this.shop_name;
      }
    )
  }))

}

  sureOut(){
   let confirm = this.alerCtrl.create({
      title: '确定退出当前帐号？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
            this.logOut();
          }
        }
      ]
    });
    confirm.present()
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
  //修改登录密码
  pwdManager(){
    this.navCtrl.push(ChangePage);
  }
  //修改头像
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '更换头像',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            let options: CameraOptions = {
                quality: 50,
                destinationType: this.camera.DestinationType.DATA_URL,
                allowEdit: true,//选择图片前是否允许编辑
                targetWidth: 100,//缩放图像的宽度（像素）
                targetHeight: 100,//缩放图像的高度（像素）
                saveToPhotoAlbum: false,//是否保存到相册
                sourceType: this.camera.PictureSourceType.CAMERA,
                correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
          }
              this.camera.getPicture(options).then((imageData) => {
              this.base64Image = 'data:image/jpeg;base64,' + imageData;
              let obj = {
                logo: this.base64Image
              }
              this.modify_logo_api(obj);
          }, (err) => {
        // Handle error
          });
          }
        },

        {
          text: '从相册选择',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            let options: CameraOptions = {
                quality: 50,//保存的图像质量，范围为0 - 100
                targetWidth: 100,//缩放图像的宽度（像素）
                targetHeight: 100,//缩放图像的高度（像素）
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
                allowEdit: true,//选择图片前是否允许编辑
                correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
            }
            this.camera.getPicture(options).then((imageData) => {
              this.base64Image = 'data:image/jpeg;base64,' + imageData;
              let obj = {
                logo: this.base64Image
              }
              this.modify_logo_api(obj);
          }, (err) => {
        // Handle error
          });

        }},
        {
          text: '取消',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  //传给后台修改头像logo
   modify_logo_api(obj:any){
    this.requestParam.collectOBJ(obj).then(
      (params)=>{
        this.accoutService.modify_user_logo(params).subscribe(
          (val)=>{
              console.log('修改头像是否成功:'+JSON.stringify(val));
              if(val.result == 'ok'){
                this.storage.set('user_logo',this.base64Image);
              }
          });
    });
  }



  wanshan(){
    this.navCtrl.push(InfomationPage);
  }
  changeBankCard(){
    this.navCtrl.push(InfomationPage);
  }
  modify_phone(){
    this.navCtrl.push(ModifyPhonePage);
  }
}
