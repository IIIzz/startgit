import { Component ,ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform,ToastController ,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {LogInPage } from '../pages/log-in/log-in';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;

    constructor(public storage: Storage,platform:Platform,statusBar: StatusBar, splashScreen: SplashScreen, public toastCtrl: ToastController) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.storage.set('appid', '0000-0000-0001');
        this.storage.set('appkey', '1111-1111-1110');
        this.storage.get('token').then(
          (val) => {
            console.log('Your token is', val);
            if (val === null) {
              this.rootPage = LogInPage;
            }
            else {
              this.rootPage = TabsPage;
            }
          });

      });

    }

}

