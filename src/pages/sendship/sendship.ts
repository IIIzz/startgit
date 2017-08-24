import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
/**
 * Generated class for the SendshipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sendship',
  templateUrl: 'sendship.html',
})
export class SendshipPage {
  ready_ship:any;
  ready_role:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendshipPage');
  }
  ionViewWillEnter(){
    this.orreadyship();

  }
  orreadyship(){
    let status ={
      status:3,
    }
    this.requestParam.collectOBJ(status).then((val)=>{
      this.accoutService.readyship(val).subscribe(
        (ready_val)=>{
          this.ready_ship=ready_val.data;
          this.ready_role=this.ready_ship.length;
          console.log('已补货订单'+JSON.stringify(this.ready_ship))
        }
      )
    })

  }
}
