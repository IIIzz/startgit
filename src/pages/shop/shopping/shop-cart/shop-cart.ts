import {Component, Injectable} from '@angular/core';
import { AlertController,NavParams } from 'ionic-angular';
import {ViewController } from 'ionic-angular';
//import {ShoppingPage} from '../../shopping/shopping';

@Component({
  selector: 'page-shop-cart',
  templateUrl: 'shop-cart.html',
  //providers:[Product],
})
@Injectable()
export class ShopCartPage {
 // cur_produts:Item[];
  orderInfoCart;

  constructor( public params: NavParams,public viewCtrl: ViewController, public alertCtrl: AlertController,
               ) {

    this.filterOrderInfo(this.params.data);
     console.log('data'+JSON.stringify(this.params.data))

  }
  filterOrderInfo(data) {
    this.orderInfoCart = data.eachP.filter((item) => {
      return (item.sum > 0);
    });
   // console.log("zzzz:"+JSON.stringify(this.orderInfoCart));
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteProduct(pID){
    this.changeOrder(pID,"delete");
  }

  cartRemove(pID){
    this.changeOrder(pID,"remove");
  }

  cartAdd(pID){
    this.changeOrder(pID,"add");
  }

  changeOrder(ID,method){
   // console.log("zalon:"+ID);

    let tSum = 0;
    let tPrice = 0.00;

   //console.log("za:"+JSON.stringify(tSum));

    for(let i=0;i<this.params.data.eachP.length;i++){
     // console.log("zabulon:"+JSON.stringify(this.params.data.eachP));

      if(method=="clear"){
        this.params.data.eachP[i].sum = 0;
        this.params.data.eachP[i].tPrice = 0.00;
      }

      if(this.params.data.eachP[i].productInfo.item_id==ID) {
        if (method == "add") {
          this.params.data.eachP[i].sum = this.params.data.eachP[i].sum + 1;

          //this.ShoppingPage_obj.total_sum =this.params.data.eachP[i].sum;

          console.log("uu:" + JSON.stringify(this.params.data.eachP[i].sum));
        }
        if (method == "remove" && this.params.data.eachP[i].sum > 0) {
          this.params.data.eachP[i].sum = this.params.data.eachP[i].sum - 1;
        }
        if(method=="delete"){
         this.params.data.eachP[i].sum = 0;
        }
        this.params.data.eachP[i].tPrice = this.params.data.eachP[i].sum * this.params.data.eachP[i].productInfo.current_price;
        this.params.data.eachP[i].tPrice = parseFloat(this.params.data.eachP[i].tPrice.toFixed(2));
      }

      tSum = tSum + this.params.data.eachP[i].sum;
      //console.log("uuu:"+JSON.stringify(this.params.data.eachP[i].sum));
      //console.log("wuwuwu:"+tSum);
      tPrice = tPrice + this.params.data.eachP[i].tPrice;
      console.log("sz:"+this.params.data.tPrice);

    }
    this.params.data.tSum = tSum;
   // console.log("s:"+this.params.data.tSum);
    this.params.data.tPrice = parseFloat(tPrice.toFixed(2));
    this.filterOrderInfo(this.params.data);
  }

  clearCart() {
    let confirm = this.alertCtrl.create({
      title: '购物车提示',
      message: '确认清空购物车吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确认',
          handler: () => {
            this.changeOrder(null,"clear");
            this.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }


}
