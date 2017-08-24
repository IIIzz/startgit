import { Component,ViewChild } from '@angular/core';
import { ModalController , NavController,App} from 'ionic-angular';
import { ConfirmOrderPage } from './confirm-order/confirm-order';
import { AlertController,ToastController,Navbar } from 'ionic-angular';
import {ShopCartPage} from './shop-cart/shop-cart';
import {WritePage} from "../../write/write";
import { AccountService} from "../../../providers/account.service";
import { RequestParam} from "../../../providers/param.before.request";
import { Storage } from '@ionic/storage';
import { TabsPage } from "../../tabs/tabs";
import {PacksPage} from "../../packs/packs";
import {LogInPage} from "../../log-in/log-in";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',

})
export class ShoppingPage {
  @ViewChild(Navbar) navBar: Navbar;
  imgUrl : any;
  imgName :any;
  about :any;
  isALlProduct : boolean = true;
  bigImg : boolean;
  ProductInfo:any;
  products:any;
 prod:any;
filtered_product:any;
page:any=1;
  count:any=50;
  item_id:any='65df720d-1ac3-40d9-86c8-67066353d31f';
  item_name:any='衣服';
  getShop:any;
  prods:any;
   checkid:any;
   checkname:any;
checkk:{imgInfo:any};
imagea:{imginfo:any};
tSum:any;
tPrice:any;
slides:any;
pro:any;
user_info:any;
user_role:any;
discount_user:any;
role_level:any;
phone:any;
  currt_user:any;//get user's role and grade params;

  constructor(public cartPage:  ModalController,public nav: NavController,
              public alertCtrl: AlertController,public toastCtrl: ToastController,
              public account:  AccountService,public request:RequestParam,
              public storage: Storage,public navCtrl: NavController,
              public appCtrl: App,
              //public ProductInfo:{orderId:any,eachP:any,tSum:any,tPrice:any,oldPrice:any,sale:any}
  ) {
    //异步给一个初始化值
    this.ProductInfo = {orderId:"000000",eachP:[],tSum:0,tPrice:0.00,oldPrice:0.00,sale:0.00};
    //  this.user_role=0;
    //  this.discount_user=0;

    this.shoplist();
    this.shopid();
    this.shopname();

    this.storage.get('role_level_id').then(
      val => {
        this.role_level = val;
        console.log('user_role'+this.user_role)
      }
    );


    this.storage.get('user_role').then(
      val => {
        this.user_role = val;
        console.log('user_role'+this.user_role)
      }
    );

    this.storage.get('discount').then(
      val => {
        this.discount_user = val;
        console.log('discount_user'+this.discount_user);
      }
    );


    this.storage.get('phone').then((user_phone)=>{
      this.phone=user_phone;
      console.log('手2机号码'+JSON.stringify(user_phone));
    })
    /*   this.currt_user={role: 1,  // 1 is city member,0 is other member;
     level: 60,// debeate 60%;
     }*/
    //  this.initializeItems();
    console.log("arrssssss:"+JSON.stringify(this.prod));
  }
  ionViewWillEnter(){

    let phone ={
      phone:this.phone,
    }
    //  setInterval(()=>{
    this.request.collectOBJ(phone).then((val_use)=>{
      this.account.is_black_list(val_use).subscribe((val)=>{
        console.log('黑名单返回结果: '+JSON.stringify(val));
        if(val.flag == 0){

          let confirm = this.alertCtrl.create({
            title: '您的账号被封了',
            buttons: [
              {
                text: '确定',
                handler: () => {
                  console.log('Disagree clicked');
                  this.logOut();
                }
              }
            ]
          });
          confirm.present()
        }
      });
    })
    //  },10000);
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad MyAdressPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
     this.navCtrl.push(TabsPage,{
       flag : 1
     });
    }
  }

  logOut(){
    console.log('see you');
    let p1=this.storage.remove('token');
    let p2 =this.storage.remove('phone');
    let p3=this.storage.remove('password');
    let p4=this.storage.remove('user_role');
    let p5= this.storage.remove('discount');
    let p6 =this.storage.remove('user_nack');
    let p7 =this.storage.remove('user_info_bank_id');
    let p8 =this.storage.remove('user_logo');
    let p9 =this.storage.remove('shop_name');
    let p10 =this.storage.remove('user_info');

    Promise.all([p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]).then(()=>{
      this.appCtrl.getRootNav().setRoot(LogInPage);
    })

  }

  /*initializeItems(){
    console.log("400:"+JSON.stringify(this.filtered_product));
   this.filtered_product= this.prod

  }*/



  shopid(){
  // let obj ={
  //   item_id:this.item_id,
  // }
  // this.request.collectOBJ(obj).then((val=>{
  //   this.account.chickID(val).subscribe(
  //     valID=>{
  //       this.checkid=valID;
  //       console.log(JSON.stringify(this.checkid))
  //     }
  //   )
  //
  // }))
  }

  shopname()
  {
   // let obj ={
   //   item_name : this.item_name,
   //   page: this.page,
   //   count:this.count,
   // }
   // this.request.collectOBJ(obj).then((val=>{
   //   this.account.chickname(val).subscribe(
   //     valname=>{
   //       this.checkname=valname;
   //       console.log(JSON.stringify(this.checkname))
   //     }
   //   )
   // }))
  }

shoplist(){
  let obj ={
    page:this.page,
    count:this.count,
  }
  this.request.collectOBJ(obj).then((val=>{
    this.account.chick(val).subscribe(
      valcheck=>{
        this.prods=valcheck.data.item;//tSum:0

        this.pro=this.prods;
        console.log('商品'+JSON.stringify(this.prods))
       this.initOrder();

   //this.checkk={imgInfo:arr}
       // console.log('lal'+JSON.stringify(this.checkk))*/
       //this.imagea=valcheck.data.item[0].images;*/
      }
    )
  }))


}


  initOrder(){
    let arr = [];
    console.log("arrsss:"+JSON.stringify(this.prods));
     for (let i=0;i<this.prods.length;i++){

//show item on every row with sum and tprice
        this.products={productInfo:this.prods[i],sum:0,tPrice:0.00,oldPrice:0.00}
          arr.push(this.products);
        console.log('order'+JSON.stringify(this.products));
      }
    this.ProductInfo = {orderId:"000000",eachP:arr,tSum:0,tPrice:0.00,oldPrice:0.00,sale:0.00};

    console.log("tSum:"+JSON.stringify(this.ProductInfo.tSum));
  }

  scrollType($event){
    $event.target.scrollTop;

  }

  showdelet(item:any){

  this.nav.push(WritePage,{
     item:item,

  })

  }

  hideBigImg() {
   this.bigImg = false;
  }

  searchProd(ev:any) {
    var val = ev.target.value;
    //this.initializeItems();
    // set val to the value of the searchbar

    if (val && val.trim() != '') {
      for (let i=0;i<this.pro.length;i++){
        this.pro=this.pro.filter((i)=> {
          console.log("prodssss:"+JSON.stringify(this.pro));
          return (i.item_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    else{
      // this.initializeItems();
      this.pro=this.prods;
      return this.pro;
    }

  }




  presentCartPage() {

    if(this.ProductInfo.tSum==0){
      let toast = this.toastCtrl.create({
        message: '购物车为空',
        duration: 1000,
        position: "middle"
      });
      toast.present(toast);
    }else{
      let modal = this.cartPage.create(ShopCartPage,this.ProductInfo);
      modal.present();
    }
  }

  openConfirmOrder(position:string) {
    if(this.ProductInfo.tPrice==0){
      let toast = this.toastCtrl.create({
        message: '购物车为空',
        duration: 1000,
        position: "middle"
      });
      toast.present(toast);
    }else{
      if(this.role_level == 0){
        let toast = this.toastCtrl.create({
          message: '请先完善个人信息',
          duration: 2000,
          position: position
        });

        toast.present(toast);
      }
      else {
        this.nav.push(ConfirmOrderPage, this.ProductInfo);
      }

    }
  }

  buy_packs(position:string){
    if(this.role_level == 0){
      let toast = this.toastCtrl.create({
        message: '请先完善个人信息',
        duration: 2000,
        position: position
      });
      toast.present(toast);
    }
    else{
      this.navCtrl.push(PacksPage);
    }
  }


  cartRemove(pID){
    this.changeOrder(pID,"remove");
  }

  cartAdd(e,id){
    console.log('www'+id)
    setTimeout(this.changeOrder(id,"add"),500);
  }

  changeOrder(ID:any,method:string){


   let tSum = 0;
   let tPrice=0.00;
   let sale =0.00;
    let oldPrice=0.00;


    for(let i=0;i<this.ProductInfo.eachP.length;i++)
    {
      console.log("length:"+this.ProductInfo.eachP.length);
      //console.log("l:"+JSON.stringify(this.ProductInfo.eachP));
     // console.log("arr4:"+JSON.stringify(this.ProductInfo.eachP[i].productInfo));
      if(this.ProductInfo.eachP[i].productInfo.item_id==ID){
        if(method=="add"){
          this.ProductInfo.eachP[i].sum = this.ProductInfo.eachP[i].sum + 1;
          console.log('ssss'+JSON.stringify(this.ProductInfo.eachP[i].sum))
        }
        if(method=="remove" && this.ProductInfo.eachP[i].sum>0){
          this.ProductInfo.eachP[i].sum = this.ProductInfo.eachP[i].sum - 1;
        }

//根据用户身份
        console.log('role_me'+this.user_role);
      if(this.user_role == 1){
         //用户等级来算折扣
        console.log('i am here')
         this.ProductInfo.eachP[i].tPrice = this.ProductInfo.eachP[i].sum * this.ProductInfo.eachP[i].productInfo.current_price*(this.discount_user);
         this.ProductInfo.eachP[i].tPrice = parseFloat(this.ProductInfo.eachP[i].tPrice.toFixed(2));
      }
        else{
          this.ProductInfo.eachP[i].tPrice = this.ProductInfo.eachP[i].sum * this.ProductInfo.eachP[i].productInfo.current_price;
          this.ProductInfo.eachP[i].tPrice = parseFloat(this.ProductInfo.eachP[i].tPrice.toFixed(2));
        }
        //this.ProductInfo.eachP[i].tPrice = this.ProductInfo.eachP[i].sum * this.ProductInfo.eachP[i].productInfo.current_price;
      //  this.ProductInfo.eachP[i].tPrice = parseFloat(this.ProductInfo.eachP[i].tPrice.toFixed(2));
//原价
        this.ProductInfo.eachP[i].oldPrice=this.ProductInfo.eachP[i].sum*this.ProductInfo.eachP[i].productInfo.current_price;
        this.ProductInfo.eachP[i].oldPrice=parseFloat(this.ProductInfo.eachP[i].oldPrice.toFixed(2));

        this.ProductInfo.eachP[i].sale=this.ProductInfo.eachP[i].oldPrice-this.ProductInfo.eachP[i].tPrice;
        this.ProductInfo.eachP[i].sale=parseFloat(this.ProductInfo.eachP[i].sale.toFixed(2));
        console.log('sale1'+this.ProductInfo.eachP[i].sale)
      }
      //数量
      tSum = tSum + this.ProductInfo.eachP[i].sum;
      //折扣后的价格
      tPrice = tPrice + this.ProductInfo.eachP[i].tPrice;
      console.log('total_sum: '+JSON.stringify(tSum)+'   tproce:   '+JSON.stringify(tPrice) );
      //折扣前的价格
      oldPrice=oldPrice+this.ProductInfo.eachP[i].oldPrice;

       //sale=sale + this.ProductInfo.eachP[i].sale;
       console.log('salesale'+sale);
   }
//总数量
    this.ProductInfo.tSum = tSum;
    console.log('tsum1:   '+JSON.stringify(this.ProductInfo.tSum));

  //  this.ProductInfo.tPrice = parseFloat(tPrice).toFixed(2);
    //判断tPrice类型 if(typeof=类型)

//现价
    this.ProductInfo.tPrice = tPrice.toFixed(2);
    console.log('tprice1  '+JSON.stringify(this.ProductInfo.tPrice));
//原价
    this.ProductInfo.oldPrice=parseFloat(oldPrice.toFixed(2));

    //折扣的钱
   // this.ProductInfo.sale=sale.toFixed(2);
    this.ProductInfo.sale=this.ProductInfo.oldPrice - this.ProductInfo.tPrice;
    this.ProductInfo.sale=this.ProductInfo.sale.toFixed(2);
    console.log('sale'+this.ProductInfo.sale)

//return this.ProductInfo;
  }
//

}
