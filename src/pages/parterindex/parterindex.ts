import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam} from '../../providers/param.before.request'
import { AccountService } from '../../providers/account.service';
/**
 * Generated class for the ParterindexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-parterindex',
  templateUrl: 'parterindex.html',
})
export class ParterindexPage {
  weekdayindex:any;
  index_parter:any;
  pater_no_index:any;
  day_flay:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam:RequestParam,
              public accountService:AccountService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParterindexPage');
  }
  ionViewWillEnter(){
    this.day_flay=0;
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_up_Performance(val).subscribe(
        valindex=>{
          this.weekdayindex=valindex.data;
          this.index_parter=this.weekdayindex.length;
          this.pater_no_index=this.weekdayindex.count;

          console.log('weekdayindex'+JSON.stringify(this.weekdayindex));
        }
      )
    })
  }
  //查伙伴一周销售记录
  weekday(){
    this.day_flay=0;
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_up_Performance(val).subscribe(
        valindex=>{
          this.weekdayindex=valindex.data;
          this.pater_no_index=this.weekdayindex.total_money;
          console.log('weekdayindex'+JSON.stringify(this.weekdayindex));
        }
      )
    })
  }
//查伙伴一月销售记录
  month(){
    this.day_flay=1;
    let day = {
      day:30,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_up_Performance(val).subscribe(
        valindex=>{
          this.weekdayindex=valindex.data;
          this.pater_no_index=this.weekdayindex.total_money;
          console.log('weekdayindex'+JSON.stringify(this.weekdayindex));
        }
      )
    })
  }

}
