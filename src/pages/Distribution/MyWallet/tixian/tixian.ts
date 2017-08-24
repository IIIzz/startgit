import { Component, DoCheck } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestParam } from "../../../../providers/param.before.request";
import { AccountService } from "../../../../providers/account.service";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-tixian',
  templateUrl: 'tixian.html',
})
export class TixianPage implements DoCheck{
  ngDoCheck(): void {
    let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
    console.log('hello,change');
    if(this.user_apply_money == null){
      this.isDisabled = true;
      this.shouxufei = null;
      this.shuifei = null;
    }else{
      console.log('zhengze');
       if(!this.user_apply_money.match(reg) || this.user_apply_money == '0'||this.user_apply_money == '0.'||this.user_apply_money == '0.0'||this.user_apply_money == '0.00'){
           this.isDisabled = true;
           this.shouxufei = null;
           this.shuifei = null;
       }else{
         this.isDisabled = false;
         this.shouxufei = (this.apply_cash_out_service_rate / 100 * parseFloat(this.user_apply_money)).toFixed(2);
         this.shuifei = (this.apply_cash_out_tax_rate / 100 * parseFloat(this.user_apply_money)).toFixed(2);
       }  
    }
}
  user_bankcard_no: any;
  user_bank_name:any;
  user_bank_address:any;
  user_apply_money:string;
  isDisabled:boolean = true;
  shouxufei:any =null;
  shuifei:any = null;
  apply_cash_out_service_rate:any; //手续费百分比
  apply_cash_out_tax_rate:any;//税费百分比
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public alertCtrl: AlertController,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public toastCtrl: ToastController
  ) {
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter TixianPage');
    this.requestParam.collect().then((val)=>{
      this.accoutService.find_system(val).subscribe((val_shui)=>{
        console.log('税收说明:'+JSON.stringify(val_shui));
        this.apply_cash_out_service_rate = val_shui.data.apply_cash_out_service_rate;
        this.apply_cash_out_tax_rate = val_shui.data.apply_cash_out_tax_rate;
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TixianPage');
    this.storage.get('user_info_bank').then((val)=>{
      this.user_bankcard_no = val.bankcard_a;
      this.user_bank_name = val.bankcard_name;
      this.user_bank_address = val.bankcard_address;
      console.log('val:'+JSON.stringify(val));
    });
  }
  ionViewDidEnter(){
   console.log('ionViewDidEnter TixianPage'); 
  }
  ionViewWillLeave(){
 console.log('ionViewWillLeave TixianPage'); 
  }
  ionViewDidLeave(){
console.log('ionViewDidLeave TixianPage'); 
  }
  ionViewWillUnload(){
console.log('ionViewWillUnload TixianPage'); 
  }
  ionionViewCanEnter(){
console.log('ionionViewCanEnter TixianPage'); 
  }
  ionViewCanLeave(){
console.log('ionViewCanLeave TixianPage'); 
  }
tixian(){
//  let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
/*  if(this.user_apply_money == null){
   let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'请输入金额',
              buttons:[{
               text: '好',
               handler:() =>{
               }
              }
            ]
            });
            alert.present();
            return; 
  }*/
 /*   if(!this.user_apply_money.match(reg) || this.user_apply_money == '0'){
      let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'请输入正确金额',
              buttons:[{
               text: '好',
               handler:() =>{
               }
              }
            ]
            });
            alert.present();
            return;
  }*/
  let confirm = this.alertCtrl.create({
      title: '是否确认提现？',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.sure_tixian();
            
          }
        }
      ]
    });
    confirm.present();
}
sure_tixian(){
 /* console.log('money:'+this.user_apply_money);
    this.requestParam.collect().then(
   (val_levl1) => {
        this.accoutService.getUserBalances(val_levl1).subscribe(
      val_xianjin => {
        console.log('xianjin:'+JSON.stringify(val_xianjin));
        console.log('balances:'+val_xianjin.data.balances);
        console.log('user_money:'+this.user_apply_money);
        if(val_xianjin.data.balances < parseFloat(this.user_apply_money)){
          console.log('hello if');
         let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'现金余额不足',
              buttons:[{
               text: '好',
              }
            ]
            });
            alert.present();
            return;
        } */
        let obj = {
          user_bankcard_no: this.user_bankcard_no,
          user_bank_name: this.user_bank_name,
          user_bank_address: this.user_bank_address,
          user_apply_money: this.user_apply_money
        }
        this.requestParam.collectOBJ(obj).then((params)=>{
          this.accoutService.cash_out(params).subscribe((val)=>{
            console.log('提现返回结果:'+ JSON.stringify(val));
            if(val.result == 'ok'){
             let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'申请提现成功，请等待处理',
              buttons:[{
               text: '好',
              }
            ]
            });
            alert.present();
            return; 
            }else{
              if(val.message == '提现金额低于提现基础额度'){
              let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'提现金额低于提现基础额度',
              buttons:[{
               text: '好',
              }
            ]
            });
            alert.present();
            return;  
              }else if(val.message == '现金账户余额不足'){
               let alert = this.alertCtrl.create({
              title:'提示',
              subTitle:'现金账户余额不足',
              buttons:[{
               text: '好',
              }
            ]
            });
            alert.present();
            return;   
              }
            }
          });
        });
        ///////////
  //    }
//    )
 //     }
 //     );

}

/*keyup(){
  console.log('hello keyup');
if(this.user_apply_money != null){
  let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
  if(!this.user_apply_money.match(reg) || this.user_apply_money == '0'){
    this.isDisabled = true;
    this.user_apply_money = null;
  }else{
    this.isDisabled = false;
  }
}
}
*/


guize(){
   let alert = this.alertCtrl.create({
      title: '提现规则',
      subTitle: '1 默认提现账户为绑定的银行卡,如需提现至其他银行卡，请先修改银行卡信息。\n 2 提现交易操作时间为30天，请耐心等待。',
      buttons: ['好']
    });
    alert.present();
  }

feiyong(){
  let alert = this.alertCtrl.create({
      title: '费用说明',
      subTitle: '手续费为5%，税费为10%。',
      buttons: ['好']
    });
    alert.present();
}
}
