import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountService} from "../../providers/account.service";
import { RequestParam} from "../../providers/param.before.request"

/**
 * Generated class for the WritePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
})
export class WritePage {

curret_item:any;
addshopcart:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public account:AccountService,public request:RequestParam) {

    this.curret_item=this.navParams.get('item')

    console.log('详细信息'+JSON.stringify(this.curret_item))
this.addshopcart =this.navParams.data;
    console.log('过滤'+JSON.stringify(this.navParams.data))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritePage');
  }




}
