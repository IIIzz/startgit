import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArticlePage } from "../article/article";

/**
 * Generated class for the ArticlesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlesPage');
  }
  //传入第几篇文章
  article_detail(index:number){
    this.navCtrl.push(ArticlePage,{
      index:index
    });
  }
}
