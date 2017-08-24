import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam } from "../../../../providers/param.before.request";
import { AccountService } from "../../../../providers/account.service";
import {onePage} from "../Chongzhi/one";
import { Storage } from '@ionic/storage';
import { TixianPage } from "../tixian/tixian";
import { ZhuanruGhkPage } from "../../../zhuanru-ghk/zhuanru-ghk";

@Component({
  selector: 'page-user-wallet',
  templateUrl: 'user-wallet.html',
})
export class UserWalletPage {
  params:any;
  xianjin:any;
  ghk:any;
  points:any;
  xianjin_value:any;
  ghk_value:any;
  points_value:any;
  role:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public storage:Storage,
            ) {
  }
ionViewWillEnter(){
      this.getUserBalances();
      this.getUserGhk();
      this.getUserPoints();
  this.getrole();
}
  getrole(){
    this.storage.get('user_role').then(
      val => {
        this.role = val;
        console.log('user_role'+this.role)
      }
    );
  }
  //现金账户
 getUserBalances(){
   this.requestParam.collect().then(
   (val_levl1) => {
        this.accoutService.getUserBalances(val_levl1).subscribe(
      val => {
        this.xianjin = val;
        console.log('xianjin:'+JSON.stringify(this.xianjin));
       this.xianjin_value = this.xianjin.data.balances;
      }
    )
      }
      );
  }
  //购货款
  getUserGhk(){
    this.requestParam.collect().then(
      (val_levl1) => {
        this.accoutService.getUserGhk(val_levl1).subscribe(
      val => {
        this.ghk = val;
        console.log('ghk:'+JSON.stringify(this.ghk));
        this.ghk_value = this.ghk.data.virtual_money_a;
      }
    )
      }
    );
  }
  //积分
  getUserPoints(){
this.requestParam.collect().then(
      (val_levl1) => {
        this.accoutService.getUserPoints(val_levl1).subscribe(
      val => {
        this.points = val;
        console.log('points:'+JSON.stringify(this.points));
        this.points_value = this.points.data.points;
      }
    )
      }
    );
  }

  cz(){
    this.navCtrl.push(onePage,{
      czInfo:'xianjin',
    });
}

czg(){
    this.navCtrl.push(onePage,{
      czgInfo:'ghk'
    });
}
tixian(){
  this.navCtrl.push(TixianPage);
}
zhuanru(){
  this.navCtrl.push(ZhuanruGhkPage);
}
   //下拉刷新
   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      let p1 = this.getUserBalances();
      let p2 = this.getUserGhk();
      let p3 = this.getUserPoints();
      Promise.all([p1,p2,p3]).then(()=>{
      refresher.complete();
      });
    }, 2000);
  }
}
