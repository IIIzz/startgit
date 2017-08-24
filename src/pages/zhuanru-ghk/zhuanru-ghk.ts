import { Component, DoCheck } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";

@Component({
  selector: 'page-zhuanru-ghk',
  templateUrl: 'zhuanru-ghk.html',
})
export class ZhuanruGhkPage implements DoCheck{
  ngDoCheck(): void {
    let reg:string ="^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$";
    console.log('hello,change');
    if(this.money == null){
      this.isDisabled = true;
    }else{
       if(!this.money.match(reg) || this.money == '0'||this.money == '0.'||this.money == '0.0'||this.money == '0.00'){
           this.isDisabled = true;
       }else{
         this.isDisabled = false;
       }  
    }
  }

  money:any;
  isDisabled:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService:AccountService,
              public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZhuanruGhkPage');
  }
  //是否确定
  isSure(){
    let confirm = this.alertCtrl.create({
      title: '是否确认转入？',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.sure_zhuanru();
            
          }
        }
      ]
    });
    confirm.present();
  }
  sure_zhuanru(){
    let obj = {
      money_need_pay: this.money
    };
    this.requestParam.collectOBJ(obj).then(
      (params)=>{
        this.accoutService.zhuanru_ghk(params).subscribe(
          (val)=>{
            console.log( 'zhuanruResult:' + JSON.stringify(val));
            if(val.result == 'ok'){
              let alert = this.alertCtrl.create({
                title:'提示',
                subTitle:'转入成功',
                buttons:[{
                 text: '好',
                }
              ]
              });
              alert.present();
              return; 
            }else{
              let alert = this.alertCtrl.create({
                title:'提示',
                subTitle:'转入失败，请稍后再试',
                buttons:[{
                 text: '好',
                }
              ]
              });
              alert.present();
              return;  
            }
          });
      });
  }

}
