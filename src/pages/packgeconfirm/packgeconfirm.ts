import { Component, DoCheck} from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import {OrderPage} from "../order/order";
import { AlertController, ViewController } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { PacksPage } from "../packs/packs";



@Component({
  selector: 'page-packgeconfirm',
  templateUrl: 'packgeconfirm.html',
})
export class PackgeconfirmPage implements DoCheck{

  pack:any;
  gifts_name:any;
  gifts_price:any;
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alert: AlertController,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              private theInAppBrowser: InAppBrowser,
              public loadingCtrl:LoadingController,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public storage:Storage,
              ) {

  }
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
  ionViewWillEnter(){
    this.pack = this.navParams.get('pack_buy');
    console.log('礼包信息'+JSON.stringify(this.pack));
    this.gifts_name = this.pack.gifts_name;
    this.gifts_price = this.pack.gifts_price;
    this.shouhuoAddress();
    this.findShopAll();
    this.findlevel();

  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad PackgeconfirmPage');

  }
  findlevel(){
    this.storage.get('user_role').then(val=>{
      console.log('user_等级:'+val);
      this.find_level = val;
    });

  }
    shouhuoAddress(){
     this.requestParam.collect().then(
   (val_levl1) => {
        this.accoutService.findShippingAddress(val_levl1).subscribe(
      val => {
        console.log('addressResult:'+JSON.stringify(val));
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
  cancel(){
    this.navCtrl.pop();
  }
    submitOrder(){
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
      title: '您的订单总价值：'+this.gifts_price,
      buttons: [
        {
          text: '确认支付',
          role: 'destructive',
          handler: () => {
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
             gifts_id:this.pack.gifts_id,
             receive_type: 0,   // a json data;
              receiver_info:{
                      receiver_name: receiver_name,
                      receiver_phone:receiver_phone,
                      receiver_address_code:receiver_address_code,
                      receiver_address:receiver_address,
                      receiver_address_detail: receiver_address_detail
              }

            }
          }else if(this.sh_value == 'A01'){//选取自提点
              let name =null;
              let phone = null;
              let logo =null;
              let address_code = null;
              let address_detail =null;
              let nickname = null;
              let qq = null;
              let weixin =null;
              let id =null;
            this.shopList.forEach(element => {
              if(element.address_code == this.ztd_value){
                id =element.id;
                name = element.name;
                phone = element.phone;
                logo = element.logo;
                address_code = element.address_code;
                address_detail = element.address_detail;
                nickname = element.nickname;
                qq = element.qq;
                weixin = element.weixin;
              }
            });
             init_order_data_to_api ={
              gifts_id:this.pack.gifts_id,
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
    this.accoutService.gifts_pay(val,this.zhifu_fangshi).subscribe(
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
                this.alert_which_go();
          }else if(this.zhifu_fangshi == 'energy'){
                this.alert_which_go();
          }else if(this.zhifu_fangshi == 'points'){
                this.alert_which_go();
          }
        }else if(this.sendorder.result == 'err'){
          if(this.zhifu_fangshi == 'xianjin'){
            if(this.sendorder.message == '现金账户余额不足'){
              let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'现金参能量不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
            }
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
          }else if( this.zhifu_fangshi == 'points'){
              if(this.sendorder.message == '积分账户余额不足'){
                let alert = this.alertCtrl.create({
                   title:'提示',
                   subTitle:'学习参能量不足',
                   buttons:['好'],
                  });
                alert.present();
                return;
              }
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
    //跳转到哪里
    alert_which_go(){
      let confirm = this.alertCtrl.create({
      title: '订货成功，是否继续订货？',
      buttons: [
        {
          text: '继续订货',
          handler: () => {
           this.navCtrl.push(PacksPage);
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
