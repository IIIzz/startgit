import { Component,DoCheck } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { MyAdressPage } from "../my-adress/my-adress";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-ad',
  templateUrl: 'ad.html',
})
export class AdPage implements DoCheck{

  sheng_value = 'A';
  sheng_value_old;
  city_value ='A';
  city_value_old;
  subCity_value = 'A';
  sheng: any= null;
  old_sheng:any=null;
  city:any=null;
  old_city:any=null;
  subCity:any;
  receiver_name:string;
  receiver_phone:string;
  receiver_address_code:string;
  receiver_address:string;
  receiver_address_detail:string;
  simpleColumns:any[];
  cityColumns:any[];
  subCityColumns:any[];
  cancelText1:any;
  doneText1:any;
  addResult:any;
  addrInfo:any;
  modifyResult:any;
  shengList:any;
  cityList:any;
  subCityList:any;
  code:any;         //sheng code
  citycode:any;
  modify_sheng;
  modify_city;
  modify_subCity;
  modify_address:string;
  array:string[];
x:any;
y:any;
x2:any;
y2:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public alertCtrl: AlertController,
              public events: Events
  ) {

  }
  ionViewWillEnter(){
  //调用后台省
    this.accoutService.getSheng().subscribe(
      val => {
        if(val.result == 'ok'){
          this.shengList = val.data;
        }
        console.log('shengList'+JSON.stringify(this.shengList));
      }
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdPage');
  }


  ngDoCheck(): void {
    if(this.sheng_value != this.sheng_value_old){
       //将定义的old_sheng 变为当前省,这步需要先操作？
       this.sheng_value_old = this.sheng_value;
       this.city_value = 'A';
       this.subCity_value = 'A';
       let params = {shengcode: this.sheng_value};
      this.accoutService.getCity(params).subscribe(
        val => {
          console.log('getCityResult:'+JSON.stringify(val));
          this.cityList = null;
          this.cityList = val.data;
          console.log('cityList:'+ JSON.stringify(this.cityList));
        }
      )
    }
    if(this.city_value != this.city_value_old){
         this.city_value_old = this.city_value;
         this.subCity_value = 'A';
      let params = {shicode: this.city_value};
      this.accoutService.getSubCity(params).subscribe(
        val => {
          this.subCityList = null;
          this.subCityList = val.data;
          console.log('subCityList:'+JSON.stringify(this.subCityList));
        }
      );
    }
  }
//提交按钮
qd(){
//    console.log('name:'+ this.receiver_name);
//    console.log('phone:'+ this.receiver_phone);
//    console.log('sheng:'+ this.sheng);
//    console.log('shi:'+ this.city);
//    console.log('xian:'+ this.subCity);
//    console.log('address_detail:'+ this.receiver_address_detail);
    if(this.receiver_name == null ||this.receiver_name.trim() == ""||
       this.receiver_phone == null || this.receiver_phone.trim() == "" ||
        this.sheng_value == 'A' || this.city_value == 'A' || this.subCity_value == 'A'||
       this.receiver_address_detail == null || this.receiver_address_detail.trim() == ""
      ){
     let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'请完整填写信息',
              buttons:['好']
            });
            alert.present();
            return;
    }
        this.shengList.forEach(element => {
        if(this.sheng_value == element.code){
          this.sheng = element.name;
            }
            });
    this.cityList.forEach(element => {
        if(this.city_value == element.code){
           this.city = element.name;
        }
      });
    this.subCityList.forEach(element => {
        if(this.subCity_value == element.code){
           this.subCity = element.name;
        }
      });
      console.log('sheng:'+this.sheng);
      console.log('city:'+this.city);
      console.log('subcity:'+this.subCity);
     let obj = {
               receiver_name:this.receiver_name,
               receiver_phone:this.receiver_phone,
               receiver_address_code:this.subCity_value,
               receiver_address:this.sheng + " "+ this.city + " " + this.subCity,
               receiver_address_detail:this.receiver_address_detail
     }
     this.requestParam.collectOBJ(obj).then(
   (val_levl1) => {
          console.log('val_levl1:'+JSON.stringify(val_levl1));

        this.accoutService.addShippingAddress(val_levl1).subscribe(
      val => {
        this.addResult = val;
        console.log('addResult:'+JSON.stringify(this.addResult));
        //alert isSuccess
        if(this.addResult.result == 'ok'){
           let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'添加成功',
              buttons:[{
               text: '好',
               handler:() =>{
                 this.navCtrl.push(MyAdressPage);
               }
              }
            ]

            });
            alert.present();
            return;
        }else if(this.addResult.result == 'err'){
 /*         let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'添加失败，请重试',
              buttons:['好']
          }
          );*/
        }
      }
        )
      }
      );

}

}
