import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { PackgeconfirmPage } from "../packgeconfirm/packgeconfirm";

@Component({
  selector: 'page-packs-details',
  templateUrl: 'packs-details.html',
})
export class PacksDetailsPage {
  pack;
  pack_id;
  pack_price;
  detail:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,  
              public requestParam: RequestParam,
              private accoutService:AccountService) {
    
    
  }
  ionViewWillEnter(){
    this.pack = this.navParams.get('pack_detail');
    console.log('pack:'+JSON.stringify(this.pack));
    this.pack_id = this.pack.gifts_id;
    this.pack_price = this.pack.gifts_price;
    let obj = {
      gifts_id: this.pack_id
    }
    this.requestParam.collectOBJ(obj).then((val_params)=>{
      this.accoutService.find_gifts_id(val_params).subscribe(val=>{
        this.detail = val.data;
        console.log('礼包详情返回结果:'+JSON.stringify(this.detail));
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PacksDetailsPage');
  }
  libao_buy(pack:any){
    this.navCtrl.push(PackgeconfirmPage,{
      pack_buy:pack
    });
  }

}
