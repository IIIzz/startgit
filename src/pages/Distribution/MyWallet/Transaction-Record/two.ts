/**
 * Created by zabulon on 17-7-5.
 */
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular'
import {ActionSheetController} from'ionic-angular'
import { RequestParam } from "../../../../providers/param.before.request";
import { AccountService } from "../../../../providers/account.service";

@Component({
  selector: 'page-home',
  templateUrl:'two.html'
})
export class twoPage {
  flag:boolean;
  recordList:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionsheetCtrl: ActionSheetController,
              public requestParam:RequestParam,
              public accountService:AccountService
            ) {
  }

   ionViewWillEnter(){
     this.requestParam.collect().then((val_params)=>{
          this.accountService.find_transaction_record(val_params).subscribe((val)=>{
 //           console.log('结果'+JSON.stringify(val));
              this.recordList = val.data;
              if(this.recordList == ""){
                this.flag =true;
              }else{
                this.flag = false;
              }
              this.recordList.reverse();
              console.log('recordList:'+JSON.stringify(this.recordList));
          });
     });
   }

    //下拉刷新
   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.ionViewWillEnter();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  bb() {

    /*let actionSheet = this.actionsheetCtrl.create({
     buttons: [
     {
     text: '现金记录',
     role: 'destructive',
     handler: () => {
     console.log('Delete clicked');
     }
     },
     {
     text: '积分记录',
     handler: () => {
     console.log('Share clicked');
     }
     },
     {
     text: '购货款记录',
     handler: () => {
     console.log('Play clicked');
     }
     },
     ]
     });
     actionSheet.present();
     }*/

  }
}
