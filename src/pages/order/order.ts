import { Component, DoCheck, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Navbar } from 'ionic-angular';
import {AccountService} from '../../providers/account.service';
import {RequestParam} from '../../providers/param.before.request'
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import {TabsPage} from "../tabs/tabs";
import {EvaluationPage} from "../evaluation/evaluation";

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage implements DoCheck{
  @ViewChild(Navbar) navBar: Navbar;
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

  [x: string]: any;
  ngDoCheck(): void {
    if(this.segmentModel != this.old_segmentModel){
      this.old_segmentModel = this.segmentModel;
   let obj={
      order_status:this.segmentModel
    }
    if(this.segmentModel == 6){ //历史订单
       this.request.collect().then((val_params)=>{
         this.account.selectorder(val_params).subscribe((val)=>{
           console.log('历史订单返回结果'+JSON.stringify(val));
            this.lishidingdanList = val.data;
            if(this.lishidingdanList == ""){
              this.flag_lishidingdan =true;
            }
            this.lishidingdanList.reverse();
            console.log('历史订单:'+JSON.stringify(this.lishidingdanList));
         });
       });
    }else{
    this.request.collectOBJ(obj).then((val=>{
      this.account.findorderstatus(val).subscribe(
        valstatus=>{
          this.order_status_check=valstatus;
          if(this.segmentModel == 0){
            if(this.order_status_check.result == 'ok'){
              this.daifukuanList = this.order_status_check.data;
              if(this.daifukuanList == ""){
                  this.flag_daifukuan = true;
              }
              console.log('待付款'+JSON.stringify(this.daifukuanList));
              this.daifukuanList.reverse();
            }
          }
          if(this.segmentModel == 2){
            if(this.order_status_check.result == 'ok'){
              this.daifahuoList = this.order_status_check.data;
              if(this.daifahuoList == ""){
                this.flag_daifahuo = true;
              }
//              console.log('带发货列表:'+JSON.stringify(this.daifahuoList));
              this.daifahuoList.reverse();
            }
          }
          if(this.segmentModel == 3){
            if(this.order_status_check.result == 'ok'){
              this.daishouhuoList = this.order_status_check.data;
              if(this.daishouhuoList == ""){
                this.flag_daishouhuo = true;
              }
              console.log('待收货'+JSON.stringify(this.daishouhuoList));
              this.daishouhuoList.reverse();
            }
          }
          if(this.segmentModel == 4){
            if(this.order_status_check.result == 'ok'){
              this.daipingjiaList = this.order_status_check.data;
              this.daipingjiaList.reverse();
            }
          }

        }
      )

    }))

    }

    }
  }

  segmentModel:any;
  old_segmentModel:any;
  selectorders:any;
  order_status_check:any;
  segmentOne=0;
  cancleor:any;
  daifukuanList:any;
  daifahuoList:any;
  daishouhuoList:any;
  daipingjiaList:any;
  lishidingdanList:any;
  xiangqing_flag:boolean = false;
  order_id:any;
 flag_daifukuan:boolean;
 flag_daifahuo:boolean;
 flag_daishouhuo:boolean;
 flag_lishidingdan:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public account :AccountService,public request:RequestParam,
              public loadingCtrl:LoadingController,
               private theInAppBrowser: InAppBrowser,
               public alerCtrl: AlertController,
               public changeref:ChangeDetectorRef,
            ) {
    if(this.segmentModel == null){
      this.segmentModel = '2';
       this.findOrderByStatus(2);
    }
  }

  ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{
     this.navCtrl.push(TabsPage,{
       flag: 3
     });
    }
  }
  //根据状态查询订单详情
  findOrderByStatus(status:number){
    let obj = {
      order_status: status
    }
    this.request.collectOBJ(obj).then((val)=>{
      this.account.findorderstatus(val).subscribe(
        (val_order_status)=>{
          console.log('根据状态查订单返回结果:'+JSON.stringify(val_order_status));
           this.order_status_check = val_order_status;
          if(status == 0){
            if(this.order_status_check.result == 'ok'){
              this.daifukuanList = this.order_status_check.data;
              if(this.daifukuanList == ""){
                this.flag_daifukuan = true;
              }
              console.log('待付款'+JSON.stringify(this.daifukuanList));
              this.daifukuanList.reverse();

            }
          }
          if(status == 2){
            if(this.order_status_check.result == 'ok'){
              this.daifahuoList = this.order_status_check.data;
              if(this.daifahuoList == ""){
                this.flag_daifahuo =true;
              }
              console.log('待发货'+JSON.stringify(this.daifahuoList));
              this.daifahuoList.reverse();
            }
          }
          if(status == 3){
            if(this.order_status_check.result == 'ok'){
              this.daishouhuoList = this.order_status_check.data;
              if(this.daishouhuoList == ""){
                this.flag_daishouhuo == true;
              }
               console.log('待收货'+JSON.stringify(this.daishouhuoList));
              this.daishouhuoList.reverse();
            }
          }
          if(status == 4){
            if(this.order_status_check.result == 'ok'){
              this.daipingjiaList = this.order_status_check.data;
              this.daipingjiaList.reverse();
            }
          }
      })

    });
  }

  cancleorder(orderId:any){
    let obj = {
      order_id: orderId
    }
        let confirm = this.alerCtrl.create({
      title: '确定取消订单？',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
                this.request.collectOBJ(obj).then((val=>{
      this.account.cancleod(val).subscribe(
        valod=>{
          this.cancleor=valod;
          this.segmentModel = 0;
          this.findOrderByStatus(this.segmentModel);
        }
      )
    }))
          }
        }
      ]
    });
    confirm.present();

  }
//待付款里面的支付订单
  zhifu_dingdan(order_id:any){
    console.log("hello zhifu_dingdan");
        let obj = {
      order_id: order_id
    }
    this.request.collectOBJ(obj).then(
      (val_params)=>{
    this.account.get_order_pay_url(val_params).subscribe(
      (val) => {
        console.log('zhifuResult:'+JSON.stringify(val));
        let target = "_blank";
        /*  let loader = this.loadingCtrl.create({
            content: "正在处理...",
            duration: 2000
            });
            loader.present();
       */
         let ref = this.theInAppBrowser.create(val.pay_url,target,this.options);
         let p1 = ref.on("loadstart").subscribe(
           (event)=>{
             console.log('returned_url:'+JSON.stringify(event.url));
             if(event.url == 'http://localhost:8088/return'){
             ref.close();
           }
         },err =>{

         }
        );
        Promise.all([p1]).then(
          ()=>{
            this.navCtrl.push(OrderPage);
        });


      }
    )

    });
  }
  //下拉刷新
   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      if(this.segmentModel == 0){
        this.findOrderByStatus(0);
      }else if(this.segmentModel == 2){
        this.findOrderByStatus(2);
      }else if(this.segmentModel == 3){
        this.findOrderByStatus(3);
      }else if(this.segmentModel == 4){
        this.findOrderByStatus(4);
      }
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  pingjia(){
    this.navCtrl.push(EvaluationPage);
  }
  confirm_receipt(order_id:any){
    let confirm = this.alerCtrl.create({
      title: '是否确认收货？',
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
    this.request.collectOBJ(obj).then((val_params)=>{
        this.account.confirm_receipt(val_params).subscribe((val)=>{
          console.log('确认收货返回结果:'+JSON.stringify(val));
          this.findOrderByStatus(3);
        });
    });

          }
        }
      ]
    });
    confirm.present();

  }
  xiangqing(order_id:any){
    console.log('hello xiangqing'+this.xiangqing_flag);
    this.xiangqing_flag = !this.xiangqing_flag;
    this.order_id = order_id;
    
  }
}
