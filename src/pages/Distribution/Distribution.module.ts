import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletPage } from './Distribution';
import { PersonInfoPage } from '../person-info/person-info';
import { onePage } from "./MyWallet/Chongzhi/one";
import { twoPage } from "./MyWallet/Transaction-Record/two";
import { UserWalletPage } from "./MyWallet/user-wallet/user-wallet";
import { OrderPage } from "../order/order";
import { MyAdressPage } from "../my-adress/my-adress";
import { CodePage } from "../code/code";
import { ParterPage } from "../parter/parter";
import { ReturnPage } from "./return/return";
import { InfomationPage } from "../infomation/infomation";
import { ChangePage } from "../change/change";
import { AdPage } from "../ad/ad";
import { ModifyaddrPage } from "../modifyaddr/modifyaddr";
import { ShowcodePage } from "../showcode/showcode";
import {ChangebankPage} from '../changebank/changebank';
import { TixianPage } from "./MyWallet/tixian/tixian";
import {OrderindexPage} from '../orderindex/orderindex';
import {ParterindexPage} from '../parterindex/parterindex';
import {AllindexPage} from '../allindex/allindex';
import {EvaluationPage} from '../evaluation/evaluation';
import { ModifyPhonePage } from "../modify-phone/modify-phone";
import {ShopshipPage} from "../shopship/shopship";
import {WaitshipPage} from "../waitship/waitship";
import {SendshipPage} from "../sendship/sendship";
import { ZhuanruGhkPage } from "../zhuanru-ghk/zhuanru-ghk";
@NgModule({
  declarations: [
    WalletPage,   //tab : mine
    //mine
    PersonInfoPage,
    onePage, // chongzhi recharge
    TixianPage, // tixian
    ZhuanruGhkPage,
    twoPage, // transaction record
    UserWalletPage,//three account
    OrderPage,
    MyAdressPage,
    CodePage, //invit partner
    ParterPage, //fenxiao partner
    ReturnPage, //contact us
    //in person_info
    InfomationPage, //modify info in person_info
    ChangePage, //modify password in person_info
    ModifyPhonePage,
    //in address
    AdPage,
    ModifyaddrPage,
    //in code
    ShowcodePage,
    ChangebankPage,
    OrderindexPage,
    ParterindexPage,
    AllindexPage,
    EvaluationPage,
    ShopshipPage,
    WaitshipPage,
    SendshipPage

  ],
  entryComponents: [
   PersonInfoPage,
   onePage,
   TixianPage,
   ZhuanruGhkPage,
   twoPage,
   UserWalletPage,
   OrderPage,
   MyAdressPage,
   CodePage,
   ParterPage,
   ReturnPage,
   InfomationPage,
   ChangePage,
   AdPage,
   ModifyaddrPage,
   ShowcodePage,
   ChangebankPage,
   OrderindexPage,
   ParterindexPage,
   AllindexPage,
   EvaluationPage,
   ModifyPhonePage,
   ShopshipPage,
   WaitshipPage,
   SendshipPage
  ],

  imports: [
    IonicPageModule.forChild(WalletPage),
  ],
  exports: [
    WalletPage
  ]
})
export class WalletPageModule {}
