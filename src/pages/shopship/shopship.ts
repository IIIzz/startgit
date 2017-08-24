import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
/**
 * Generated class for the ShopshipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopship',
  templateUrl: 'shopship.html',
})
export class ShopshipPage {
  shopship_role:any;
  flag_shop:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public alerCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopshipPage');
  }

  ionViewWillEnter(){
    this.find_shopship();
  }

find_shopship(){
  this.requestParam.collect().then((val)=>{
    this.accoutService.shopship(val).subscribe(
      (valshop)=>{
        this.shopship_role=valshop.data;
        this.flag_shop=this.shopship_role.length;
        console.log('店铺自提'+JSON.stringify(this.shopship_role));
      })
  })

}

  doRefresh(refresher){
    setTimeout(() => {
      this.requestParam.collect().then((val)=>{
        this.accoutService.shopship(val).subscribe(
          (valshop)=>{
            this.shopship_role=valshop.data;
            this.flag_shop=this.shopship_role.length;
            console.log('店铺自提'+JSON.stringify(this.shopship_role));
          })
      })

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }
  order_sure(order_id:any){
    let confirm = this.alerCtrl.create({
      title: '是否确认提货？',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            let obj = {
              order_id: order_id
            }
            this.requestParam.collectOBJ(obj).then((val_params)=>{
              this.accoutService.confirm_receipt(val_params).subscribe((val)=>{
                console.log('确认提货返回结果:'+JSON.stringify(val));
                this.requestParam.collect().then((val)=>{
                  this.accoutService.shopship(val).subscribe(
                    (valshop)=>{
                      this.shopship_role=valshop.data;
                      this.flag_shop=this.shopship_role.length;
                      console.log('店铺自提'+JSON.stringify(this.shopship_role));
                    })
                })
              });
            });

          }
        }
      ]
    });
    confirm.present();


  }
}
