import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the PhoneloginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-phonelogin',
  templateUrl: 'phonelogin.html',
})
export class PhoneloginPage {
  phone: String;
  code: String;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneloginPage');
  }
  getCode(){
    console.log('process phoneLogin');

    if(this.phone == null){
      let alert = this.alertCtrl.create({
          title:'提示',
          subTitle:'请先输入您的手机号',
          buttons:['好'],
        });
        alert.present();
        return;
    }
  }
  doLogin(){
    if(this.phone != null && this.code != null ){
      let testAccount = {
              status: 'success',
              user:{
                  phone: this.phone,
                  password: null,
              }
          }
      this.storage.set('account',testAccount);
     // console.log('账户'+JSON.stringify(testAccount))
       this.navCtrl.setRoot(TabsPage);
    }else{
     let alert = this.alertCtrl.create({
          title:'提示',
          subTitle:'手机号或验证码不能为空',
          buttons:['好'],
        });
        alert.present();
        return;
    }
  }

}
