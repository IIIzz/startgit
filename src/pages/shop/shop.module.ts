import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import { NoticePage } from '../notice/notice';
import { ArticlePage } from '../article/article';
import { VideosPage } from '../videos/videos';
import { ArticlesPage } from '../articles/articles';

@NgModule({
  declarations: [
    ShopPage,
    NoticePage,
    ArticlePage,
    VideosPage,
    ArticlesPage
  ],
   entryComponents: [
   NoticePage,
   ArticlePage,
   VideosPage,
   ArticlesPage
   ],

  imports: [
    IonicPageModule.forChild(ShopPage),
  ],
  exports: [
    ShopPage
  ]
})
export class ShopPageModule {}
