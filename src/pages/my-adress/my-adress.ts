import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Navbar } from 'ionic-angular';
import {AdPage} from "../ad/ad";
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { ModifyaddrPage } from "../modifyaddr/modifyaddr";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-my-adress',
  templateUrl: 'my-adress.html',
})
export class MyAdressPage {

@ViewChild(Navbar) navBar: Navbar;
  addressList:any;
  name:string;
  phone:string;
  detailAddr:string;
  flag:boolean;
  deleteResult:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
               public requestParam: RequestParam,
              private accoutService:AccountService,
              public alerCtrl: AlertController
  ) {

  }
ionViewWillEnter(){
    this.listAddress();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAdressPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
     this.navCtrl.push(TabsPage,{
       flag : 3
     });
    }
  }
listAddress(){
    this.requestParam.collect().then(
   (val_levl1) => {
        this.accoutService.findShippingAddress(val_levl1).subscribe(
      val => {
        console.log('addressResult:'+JSON.stringify(val));
        if(val.result == 'ok'){
          this.addressList = val.data;
          console.log('addressList'+JSON.stringify(this.addressList));
        }
        if(val.data == ""){
          this.flag = true;
        }else{
          this.flag = false;
        }
      }
    )
      }
      );
}

address(){
    this.navCtrl.push(AdPage);
}
modify(addr:any){
  this.navCtrl.push(ModifyaddrPage,{
    addrInfo:addr
  });
}
delete(id:any){
  console.log('id:'+id);
     let confirm = this.alerCtrl.create({
      title: '删除地址',
      subTitle: '确认删除该收货地址吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
            this.toDelete(id);
          }
        }
      ]
    });
    confirm.present()
}

toDelete(id){
  let obj = {
    id : id
  }
    this.requestParam.collectOBJ(obj).then(
   (val_levl1) => {
        this.accoutService.deleteShippingAddress(val_levl1).subscribe(
      val => {
        this.deleteResult = val;
        console.log('deleteResult:'+JSON.stringify(this.deleteResult));
        this.navCtrl.push(MyAdressPage);
      }
        )
      }
      );
}

}
