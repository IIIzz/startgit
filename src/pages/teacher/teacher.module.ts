import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherPage } from './teacher';
import{PromotionPage} from'../promotion/promotion';
import{StudyPage}from'../study/study';
import{WechatcardPage}from'../wechatcard/wechatcard'

@NgModule({
  declarations: [
    TeacherPage,
    PromotionPage,
    StudyPage,
    WechatcardPage
  ],
   entryComponents: [
     TeacherPage,
      PromotionPage,
      StudyPage,
      WechatcardPage
    ],
  imports: [
    IonicPageModule.forChild(TeacherPage),
  ],
  exports: [
    TeacherPage

  ]
})
export class TeacherPageModule {}
