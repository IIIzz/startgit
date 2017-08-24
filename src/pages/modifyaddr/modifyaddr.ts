import { Component, DoCheck } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { MyAdressPage } from "../my-adress/my-adress";

/**
 * Generated class for the ModifyaddrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modifyaddr',
  templateUrl: 'modifyaddr.html',
})
export class ModifyaddrPage implements DoCheck{


  sheng: any;
  sheng_value = 'A';
  sheng_value_old;
  city_value ='A';
  city_value_old;
  subCity_value = 'A';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public alertCtrl: AlertController,
              public events: Events
  ) {
    let addr = this.navParams.get('addrInfo');
      this.addrInfo = addr;
      console.log('addrInfo:'+JSON.stringify(this.addrInfo));

   //调用后台省
    this.accoutService.getSheng().subscribe(
      val => {
        console.log('shengResult:'+JSON.stringify(val));
        if(val.result == 'ok'){
          this.shengList = val.data;
        }
        console.log('shengList'+JSON.stringify(this.shengList));
           this.modify_address = this.addrInfo.receiver_address;
           console.log('modify_address:' + this.modify_address);
           this.array = this.modify_address.split(" ");
           console.log('array:'+ this.array);
           this.sheng = this.array[0];
           this.subCity = this.array[2];
           this.shengList.forEach(element => {
            if(element.name == this.sheng){
           this.sheng_value = element.code;
            }
            });
           this.city = this.array[1];
      }
    );

  }
  ionViewWillEnter(){
    
  }
  ionViewDidLoad() {

  }
  

  ngDoCheck(): void {
//    console.log('sheng_value:'+this.sheng_value);
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
          if(this.city != null){
            this.cityList.forEach(element => {
        if(element.name == this.city){
           this.city_value = element.code;
        }
      });
          }
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
            if(this.subCity != null){
            this.subCityList.forEach(element => {
        if(element.name == this.subCity){
           this.subCity_value = element.code;
        }
      });
          }
        }
      );   
    }

  }


modify_api(){
 
 if(
       this.addrInfo.receiver_name.trim() == ""|| 
       this.addrInfo.receiver_phone.trim() == "" ||
       this.sheng_value == 'A' || this.city_value == 'A' || this.subCity_value == 'A'||
       this.addrInfo.receiver_address_detail.trim() == ""
      
      ){
     let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'请完整填写信息',
              buttons:['好']
            });
            alert.present();
            return;
    }
          //////////
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
     let obj = {
               id:                      this.addrInfo.id,
               receiver_name:           this.addrInfo.receiver_name,
               receiver_phone:          this.addrInfo.receiver_phone,
               receiver_address_code:   this.addrInfo.receiver_address_code,
               receiver_address:        this.sheng + " "+ this.city + " " + this.subCity, 
               receiver_address_detail: this.addrInfo.receiver_address_detail 
     }
     this.requestParam.collectOBJ(obj).then(
   (val_levl1) => {
          console.log('val_levl1:'+JSON.stringify(val_levl1));                 
          
        this.accoutService.modifyShippintAddress(val_levl1).subscribe(
      val => {
        this.modifyResult = val;
        console.log('modifyResult:'+JSON.stringify(this.modifyResult));
        //alert isSuccess
        if(this.modifyResult.result == 'ok'){
           let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'修改成功',
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
        }else if(this.modifyResult.result == 'err'){
 /*         let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'修改失败，请重试',
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



