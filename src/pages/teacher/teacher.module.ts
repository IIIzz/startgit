import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherPage } from './teacher';
import{PromotionPage} from'../promotion/promotion';
import{StudyPage}from'../study/study';
import{WechatcardPage}from'../wechatcard/wechatcard'
import { BbsPage } from "./bbs/bbs";
import { TeachGardenPage } from "./teach-garden/teach-garden";

@NgModule({
  declarations: [
    TeacherPage,
    PromotionPage,
    StudyPage,
    WechatcardPage,
    BbsPage,
    TeachGardenPage,
  ],
   entryComponents: [
     TeacherPage,
      PromotionPage,
      StudyPage,
      WechatcardPage,
      BbsPage,
      TeachGardenPage,
    ],
  imports: [
    IonicPageModule.forChild(TeacherPage),
  ],
  exports: [
    TeacherPage

  ]
})
export class TeacherPageModule {}
