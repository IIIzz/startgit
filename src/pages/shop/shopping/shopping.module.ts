/**
 * Created by zabulon on 17-8-17.
 */
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPage } from "./shopping";
import { ShopCartPage } from "../../shop/shopping/shop-cart/shop-cart";
import { ConfirmOrderPage } from "../../shop/shopping/confirm-order/confirm-order";
import { WritePage } from "../../write/write";
import { PacksPage } from "../../packs/packs";
import { PackgeconfirmPage } from "../../packgeconfirm/packgeconfirm";
import { PacksDetailsPage } from "../../packs-details/packs-details";


@NgModule({
  declarations: [
    ShoppingPage,   //tab:shopping
    ShopCartPage,
    ConfirmOrderPage,
    WritePage,
    PacksPage,
    ShoppingPage,
    PackgeconfirmPage,
    PacksDetailsPage
  ],
  entryComponents: [
    ShopCartPage,
    ConfirmOrderPage,
    WritePage,
    PacksPage,
    ShoppingPage,
    PackgeconfirmPage,
    PacksDetailsPage
  ],

  imports: [
    IonicPageModule.forChild(ShoppingPage),
  ],
  exports: [
    ShoppingPage
  ]
})
export class ShoppingPageModule {}
