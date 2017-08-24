import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam } from "../../providers/param.before.request";
import { AccountService } from "../../providers/account.service";
import { Storage } from '@ionic/storage';

import {ActionSheetController,AlertController} from 'ionic-angular';

import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the ShowcodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-showcode',
  templateUrl: 'showcode.html',
  providers:[PhotoLibrary,FileTransfer,File]
})
export class ShowcodePage {
  QR: any;
  image: any;
  phone: string;
  shops_level:any;
  base64Image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam: RequestParam,
              private accoutService: AccountService,
              private storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              private photoLibrary: PhotoLibrary,
              public alertCtrl: AlertController) {
  }

ionViewWillEnter(){
    this.getQR();
    this.getPhone();
    this.shop_level();
    this.storage.get('user_logo').then(val=>{
   console.log('touxiang:'+val);
   this.base64Image = val;
 });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowcodePage');
  }

  getQR() {
    //collect basic_params then api
    this.requestParam.collect().then(
      (val_levl1) => {
        console.log('val_levl1:' + JSON.stringify(val_levl1));
        this.accoutService.getQR(val_levl1).subscribe(
          val => {
            this.QR = val;
            console.log('QR:' + JSON.stringify(this.QR));

            if (this.QR.result == 'ok')
              this.image = this.QR.data.qrcode;
            console.log('image:' + JSON.stringify(this.image));
          }
        )
      }
    );
  }

  shop_level(){
    this.storage.get('shop_name').then(
      val=>{
        this.shops_level=val;
        console.log('shops_levels'+JSON.stringify(this.shops_level))
      }
    )

  }
  getPhone() {
    this.storage.get('phone').then(
      val => {
        this.phone = val;
        this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
      }
    );
  }

  saveimg(){
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.saveImage(this.image,'fenxiao').then((val)=>{
        console.log(JSON.stringify(this.image));
        let alert = this.alertCtrl.create({
        //  title: '',
          subTitle: '保存成功，您可以到相册中找到它',
          buttons: ['好']
        });
        alert.present();
      });

    })
      .catch(err => console.log('permissions weren\'t granted'));
  }



}
