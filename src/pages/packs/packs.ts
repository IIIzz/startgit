import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { PacksDetailsPage } from "../packs-details/packs-details";
import { PackgeconfirmPage } from "../packgeconfirm/packgeconfirm";
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'page-packs',
  templateUrl: 'packs.html',
})
export class PacksPage {
  @ViewChild(Navbar) navBar: Navbar;
  packList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
  ) {
  }

  ionViewWillEnter(){
    this.requestParam.collect().then((val_params)=>{
      this.accoutService.find_gifts(val_params).subscribe((val)=>{
          console.log('礼包返回结果:'+JSON.stringify(val));
          this.packList = val.data;
          this.packList.reverse();
      });
    });
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksPage');
        this.navBar.backButtonClick = (e:UIEvent)=>{
     this.navCtrl.push(TabsPage,{
       flag : 1
     });
    }
  }
  libao_xiangqing(pack:any){
    console.log('pack-1'+JSON.stringify(pack));
    this.navCtrl.push(PacksDetailsPage,{
       pack_detail:pack
    });
  }
  libao_buy(pack:any){
    this.navCtrl.push(PackgeconfirmPage,{
      pack_buy:pack
    });
  }

}
