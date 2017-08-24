import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
/**
 * Generated class for the WaitshipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-waitship',
  templateUrl: 'waitship.html',
})
export class WaitshipPage {
  wait_ship:any;
  wait_flag:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitshipPage');
  }
  ionViewWillEnter(){
    this.waitship();

  }
  waitship(){
    let status ={
      status:2,
    }
    this.requestParam.collectOBJ(status).then((val)=>{
      this.accoutService.waitship(val).subscribe(
        (ready_val)=>{
          this.wait_ship=ready_val.data;
          this.wait_flag=this.wait_ship.length;
          console.log('已补货订单'+JSON.stringify(this.wait_ship))
        }
      )
    })
  }

}
