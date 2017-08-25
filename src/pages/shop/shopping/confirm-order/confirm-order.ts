import { Component, DoCheck} from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { RequestParam } from "../../../../providers/param.before.request";
import { AccountService } from "../../../../providers/account.service";
import {OrderPage} from "../../../order/order";
import { AlertController,ViewController  } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import {ShopCartPage}from "../shop-cart/shop-cart"
import { Storage } from '@ionic/storage';
import {TabsPage} from "../../../tabs/tabs";


@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
  providers:[ShopCartPage]
})
export class ConfirmOrderPage implements DoCheck {
  ngDoCheck(): void {
    if(this.ztd_value == 'A02'){
      console.log('value:'+this.ztd_value);
    }
    if(this.zhifu_fangshi == 'energy'){
      this.energy_flag =1;
    }
    if(this.zhifu_fangshi != 'energy'){
      this.energy_flag = 0;
    }
  }
  ztd_value:any='A01' ;
  ztd_value_old:any;
  sh_value:any='A01' ;
  wuliu_vaule:any;
  old_wuliu_vaule:any;
  ProductInfo:any;
  addressList:any;
  shopList:any;
  items:any;
  itemsprod:any;
  sendorder:any
  zi_ti_dian:any;
  zhifu_fangshi:any;
  close_flag:any = 0;
  energy_flag:any;
  find_level:any;

    options : InAppBrowserOptions = {
    location : 'no',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
};

  constructor(public navCtrl: NavController, public params: NavParams,public alert: AlertController,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              private theInAppBrowser: InAppBrowser,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public shopcart:ShopCartPage,
              public viewCtrl: ViewController,
              public storage:Storage,
  ) {


  }
 ionViewWillEnter(){
    this.filterOrderInfo(this.params.data);
    this.shouhuoAddress();
    this.findShopAll();
    this.findlevel();

 }

  findlevel(){
    this.storage.get('user_role').then(val=>{
      console.log('user_等级:'+val);
      this.find_level = val;
    });

  }
  filterOrderInfo(data){
    this.ProductInfo = data.eachP.filter((item)=>{
      return (item.sum > 0);

    });
    console.log('prod'+JSON.stringify(this.ProductInfo))
    this.item();
  }

  item(){
    let arr =[];
    for (let i=0;i<this.ProductInfo.length;i++){
//show item on every row with sum and tprice
      this.items={item_id:this.ProductInfo[i].productInfo.item_id,count:this.ProductInfo[i].sum}
        arr.push(this.items);

      this.itemsprod={itemprods:arr}
      console.log('order'+JSON.stringify(this.itemsprod));
    }



  }


  backPage(){

    this.navCtrl.pop();
  }

  submitOrder(){
    console.log('price:'+this.params.data.tPrice);
    console.log("zhifu_fangshi:"+this.zhifu_fangshi);
    if(this.ztd_value == 'A01' && this.sh_value == 'A01'){
      let alert = this.alertCtrl.create({
          title:'提示',
          subTitle:'请选择位置',
          buttons:['好'],
        });
        alert.present();
        return;
    }
    if(this.zhifu_fangshi == null){
     let alert = this.alertCtrl.create({
          title:'提示',
          subTitle:'请选择支付方式',
          buttons:['好'],
        });
        alert.present();
        return;
    }
    let alert = this.alert.create({
      title: '您的订单总价值：'+this.params.data.tPrice,
      //title: this.params.data.tPrice,
      buttons: [
        {
          text: '确认支付',
          role: 'destructive',
          handler: () => {
            console.log('prod'+JSON.stringify(this.itemsprod.itemprods));
            let init_order_data_to_api = null;
          if(this.ztd_value == 'A01'){//选取收货地址
          let id =null;
          let user_id = null;
          let receiver_name =null;
          let receiver_phone = null;
          let receiver_address_code = null;
          let receiver_address =null;
          let receiver_address_detail = null;
          this.addressList.forEach(element => {
            if(element.id == this.sh_value){
              id = element.id;
              user_id = element.user_id;
              receiver_name = element.receiver_name;
              receiver_phone = element.receiver_phone;
              receiver_address_code = element.receiver_address_code;
              receiver_address = element.receiver_address;
              receiver_address_detail = element.receiver_address_detail;
            }
          });
          init_order_data_to_api ={
             items:this.itemsprod.itemprods,//an array for itms.
             receive_type: 0,   // a json data;
              receiver_info:{
                      receiver_name: receiver_name,
                      receiver_phone:receiver_phone,
                      receiver_address_code:receiver_address_code,
                      receiver_address:receiver_address,
                      receiver_address_detail: receiver_address + ' ' + receiver_address_detail
              }

            }
          }else if(this.sh_value == 'A01'){//选取自提点
            let id =null;
              let name =null;
              let phone = null;
              let logo =null;
              let address_code = null;
              let address_detail =null;
              let nickname = null;
              let qq = null;
              let weixin =null;
            this.shopList.forEach(element => {
              if(element.address_code == this.ztd_value){
                id=element.id;
                name = element.name;
                phone = element.phone;
                logo = element.logo;
                address_code = element.address_code;
                address_detail = element.address_detail;
                nickname = element.nickname;
                qq = element.qq;
                weixin = element.weixin;
                console.log('店铺ID'+JSON.stringify(id));
                console.log('店铺name'+JSON.stringify(nickname));
              }
            });
             init_order_data_to_api ={
             items:this.itemsprod.itemprods,//an array for itms.
             receive_type: 1,   // a json data;
             shop_info:{
                     shop_id:id,
                      shop_name: nickname,
                      shop_phone: phone,
                      shop_tel: null,
                      shop_qq: qq,
                      shop_wx: weixin,
                      shop_address_code: address_code,
                      shop_address: address_detail,
                      shop_address_detail:address_detail
              }
            }
          }

  this.requestParam.collectOBJ(init_order_data_to_api).then((val=>{
    console.log('zhifufangshiaaa'+this.zhifu_fangshi);
    this.accoutService.sendorder(val,this.zhifu_fangshi).subscribe(
      valorder=>{
        this.sendorder=valorder;
        console.log('添加订单result:'+JSON.stringify(this.sendorder));
        if(this.sendorder.result == 'ok'){

          if(this.zhifu_fangshi == 'bank'){

          let url = this.sendorder.pay_url;
          let ref = this.theInAppBrowser.create(url,'_blank',this.options);
        let p1 = ref.on("loadstart").subscribe(
           (event)=>{
//            console.log('returned_url:'+JSON.stringify(event.url));
             if(event.url == 'http://localhost:8088/return'){
             ref.close();
               this.shopcart.changeOrder(null,"clear");

           }

         },err =>{

         }
        );
        Promise.all([p1]).then(()=>{
 //         setTimeout("this.navCtrl.push(OrderPage)",5000);
          //订单处理中，需要判断订单号是否已经经过荣宝处理完成，防止同一订单重复发起支付。
          this.navCtrl.push(OrderPage);
        });
          }else if(this.zhifu_fangshi == 'xianjin'){
                this.shopcart.changeOrder(null,"clear");
                this.alert_which_go();
          }else if(this.zhifu_fangshi == 'energy'){
                this.shopcart.changeOrder(null,"clear");
                this.alert_which_go();
          }
        }else if(this.sendorder.result == 'err'){
          if(this.sendorder.flag == '1'){
            let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'请先完善个人信息',
              buttons:['好'],
             });
           alert.present();
           return;
          }
          if(this.zhifu_fangshi == 'xianjin'){
            if(this.sendorder.message == '现金账户余额不足'){
              let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'现金账户余额不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
            }
/*             this.requestParam.collect().then(
              (val_levl1) => {
              this.accoutService.getUserBalances(val_levl1).subscribe(
            val => {
              console.log('xianjin'+JSON.stringify(val));
                if(this.params.data.tPrice > val.data.balances){
                let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'现金账户余额不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
                }
      }
    )
      }
             );*/
          }else if(this.zhifu_fangshi == 'energy'){
              if(this.sendorder.message == '购货款账户余额不足'){
                let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'货款参能量不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
              }
/*              this.requestParam.collect().then(
              (val_levl1) => {
              this.accoutService.getUserGhk(val_levl1).subscribe(
              val => {
                        console.log('energy'+JSON.stringify(val));
              if(this.params.data.tPrice > val.data.virtual_money_a){
               let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'参能量不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
              }
      }
    )
      }
              ); */
          }else{
          let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'提交订单失败，请稍后再试',
              buttons:['好'],
          });
          alert.present();
          return;

          }
        }
      }
    )

    })
  )

          }
      //////////////////
        },{
          text: '取消',
          handler: () => {
            console.log('Archive clicked');
          }
        },
      ]
    });
    alert.present();
  }


  cancel(){
this.navCtrl.pop();
  }
  shouhuoAddress(){
     this.requestParam.collect().then(
   (val_levl1) => {
    //    console.log('val_levl1:'+JSON.stringify(val_levl1));
        this.accoutService.findShippingAddress(val_levl1).subscribe(
      val => {
//        console.log('addressResult:'+JSON.stringify(val));
        if(val.result == 'ok'){
          this.addressList = val.data;
          console.log('addressList'+JSON.stringify(this.addressList));
        }
      }
    )
      }
      );
  }
    //查找所有自提点
    findShopAll(){
      this.requestParam.collect().then(
        (val_levl1) => {
        this.accoutService.findShopAll(val_levl1).subscribe(
      val => {
        console.log('shopResult:'+JSON.stringify(val));
        if(val.result == 'ok'){
          this.shopList = val.data;
          console.log('shopList:'+JSON.stringify(this.shopList));
        }
      }
    )
      }
      );
    }
    //跳转到哪里
    alert_which_go(){
      let confirm = this.alertCtrl.create({
      title: '订货成功，是否继续订货？',
      buttons: [
        {
          text: '继续订货',
          handler: () => {
           this.navCtrl.push(TabsPage,{
             flag : 1});
          }
        },
        {
          text: '查看订单',
          handler: () => {
            this.navCtrl.push(OrderPage);
          }
        }
      ]
    });
    confirm.present()
    }
}
