import {Component} from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';


import {TeacherPage} from "../teacher/teacher";
import {WalletPage} from "../Distribution/Distribution";
import {ShopPage} from "../shop/shop";
import {ShoppingPage} from "../shop/shopping/shopping";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  index:any;
  tab1Root = ShopPage;
  tab2Root = ShoppingPage;
  tab3Root = TeacherPage;
  tab4Root = WalletPage;

  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
   let flag = this.navParams.get("flag");
   if(flag != null){
     this.index = flag;
   }
  }
/*toFirstPage(event){
   this.storage.get('account').then((val) => {
       console.log('Your account is', val);
      if(val === null){
        this.navCtrl.push(LogInPage);
      }
      else{
        this.navCtrl.push(TabsPage);
      }
           });
  }*/
}
