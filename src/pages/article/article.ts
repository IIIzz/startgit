import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
      artic_index:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  this.artic_index= this.navParams.get('index');
  console.log('index'+JSON.stringify(this.artic_index));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

}
