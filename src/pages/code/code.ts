import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";

import { AlertController } from'ionic-angular'
import {ShowcodePage} from "../showcode/showcode";
import { ActionSheetController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {

  testCheckboxOpen: boolean;
  testCheckboxResult;
  getlink:any;
  clink:any;
base64Image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public requestParam: RequestParam,
              private accoutService: AccountService,
              public actionSheetCtrl: ActionSheetController,
              private clipboard: Clipboard,
              public toastCtrl: ToastController,
              private storage: Storage
            ) {

  }
ionViewWillEnter(){
  
 this.storage.get('user_logo').then(val=>{
   console.log('touxiang:'+val);
   this.base64Image = val;
 });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
  }

linkto() {
/*   let actionSheet = this.actionSheetCtrl.create({
      title: '分享链接',
      buttons: [
        {
          text: '微信好友',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
*/
  let confirm = this.alertCtrl.create({
    title: '复制链接',
    message: '复制链接发送给好友',
    buttons: [
      {
        text: '取消',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: '确定',
        handler: () => {
          console.log('Agree clicked');
          this.requestParam.collect().then((val=>{
            this.accoutService.getQR(val).subscribe(
              vallink=>{
                this.getlink=vallink;
                console.log(JSON.stringify(this.getlink));
                if(this.getlink.result == 'ok'){
                  this.clink=this.getlink.data.url;
                  console.log(JSON.stringify(this.clink));
                  this.clipboard.copy(this.clink);
                  this.clipboard.paste().then(
                  (resolve: string) => {
                  let toast = this.toastCtrl.create({
                       message: '复制成功',
                       duration: 2000
                  });
                  toast.present();
                  },
                  (reject: string) => {
                //  alert('Error: ' + reject);
                  }
                );
                }

              }
            )
          }))
        }
      }
    ]
  });
  confirm.present();
}


er(){
    try{
      this.navCtrl.push(ShowcodePage);}

  catch(err){console.log('err:'+JSON.stringify(err));}
}
}

