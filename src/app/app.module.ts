import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LogInPage} from '../pages/log-in/log-in'
import { ForgetpwdPage } from '../pages/forgetpwd/forgetpwd';      //忘记密码
//待整理pages
import { PhoneloginPage } from '../pages/phonelogin/phonelogin';   //验证码登录是否需要
//tabs四大模块，四个页面下面的子页面，分别写到对应的模块下面。不要写在这个文件下
import { ShopPageModule } from "../pages/shop/shop.module";
import { ShoppingPageModule } from "../pages/shop/shopping/shopping.module";
import { TeacherPageModule } from "../pages/teacher/teacher.module";
import { WalletPageModule } from "../pages/Distribution/Distribution.module";
//providers 全部写在这里
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RequestParam } from '../providers/param.before.request';
import { AccountService } from "../providers/account.service";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Api } from '../providers/providers';    //这个没用到，但删除后报错
import { Clipboard } from '@ionic-native/clipboard';
//other modules
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {FormsModule} from "@angular/forms";
import { MultiPickerModule } from 'ion-multi-picker';
//视频播放器

import { BarcodeScanner  } from '@ionic-native/barcode-scanner';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4a09fd7a'
  }
};

@NgModule({
  declarations: [
    MyApp,
  LogInPage,
    TabsPage,
    ForgetpwdPage,
    PhoneloginPage,
  ],
  imports: [
    ShopPageModule, //首页模块
    ShoppingPageModule, // 订货模块
    TeacherPageModule,  //发现模块
    WalletPageModule, //我的模块
    FormsModule,
    BrowserModule,
    HttpModule,
    MultiPickerModule,
    IonicModule.forRoot(MyApp,{
    //   tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs,也可以在tabs界面上添加语句，这里选了后者
         }) ,
    IonicStorageModule.forRoot(),
 CloudModule.forRoot(cloudSettings),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogInPage,
    TabsPage,
    ForgetpwdPage,
    PhoneloginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestParam,
    AccountService,
    InAppBrowser,
    Api,
    Clipboard,
    BarcodeScanner
  ]
})
export class AppModule {}
