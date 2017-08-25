import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  shop:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop = this.navParams.get('order_detail');
    console.log('shop'+JSON.stringify(this.shop));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
