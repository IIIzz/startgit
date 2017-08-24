import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ShowcodePage} from "../showcode/showcode";
import {WechatcardPage} from "../wechatcard/wechatcard";

/**
 * Generated class for the PromotionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');
  }

  parters(){
this.navCtrl.push(ShowcodePage);
  }
  wechatcard(){
    this.navCtrl.push(WechatcardPage);
  }
}
