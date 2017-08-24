import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { AccountService} from '../../providers/account.service';
import { RequestParam} from '../../providers/param.before.request';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-parter',
  templateUrl: 'parter.html',
})
export class ParterPage {
returncheck:any;
parterList:any;
returnparcheck:any;
parterup:any;
base64Image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController ,
              public requestParam:RequestParam,public accountService:AccountService,private storage: Storage ) {
  }

  ionViewWillEnter(){
            this.downlistparter();
 this.storage.get('user_logo').then(val=>{
   console.log('touxiang:'+val);
   this.base64Image = val;
 });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParterPage');
  }


   downlistparter(){
    this.requestParam.collect().then(
      (val=>{
        this.accountService.findNextLevel(val).subscribe(
          valcheck=>{
            this.returncheck=valcheck;
            console.log('ss'+JSON.stringify(this.returncheck));

            if(this.returncheck.result == 'err' ){
              let alert = this.alertCtrl.create({
                title:'提示',
                subTitle:'没有下级用户',
                buttons:[{
                  text: '确定',
                  handler:() =>{
                    //this.navCtrl.push(WalletPage);
                  }
                }
                ]
              });
              alert.present();
              return;
            }else{
              this.parterList = this.returncheck.data;
              this.returnparcheck=this.parterList.length;
              console.log('parterList:'+JSON.stringify(this.parterList));
            }
          }

        )

      })
    )
   }
}
