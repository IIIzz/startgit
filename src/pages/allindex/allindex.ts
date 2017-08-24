import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam} from '../../providers/param.before.request'
import { AccountService } from '../../providers/account.service';
/**
 * Generated class for the AllindexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-allindex',
  templateUrl: 'allindex.html',
})
export class AllindexPage {
  weekdayall:any;
  weekdayall_count:any;
  weekdatall_total_money:any;
  day_flay:any;
  //monthall:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public requestParam:RequestParam,
              public accountService:AccountService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllindexPage');
  }
  ionViewWillEnter(){
    this.day_flay=0;

    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_all_Performance(val).subscribe(
        valindex=>{
          this.weekdayall=valindex.data;
          this.weekdayall_count=valindex.data.count;
          this.weekdatall_total_money=valindex.data.total_money;

          if(this.weekdatall_total_money == null){
            this.weekdatall_total_money=0.00
          }else{
            this.weekdatall_total_money=valindex.data.total_money;
          }
          console.log('所有'+JSON.stringify(this.weekdayall));
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
      this.accountService.find_all_Performance(val).subscribe(
        valindex=>{
          this.weekdayall=valindex.data;
          console.log('weekdayindex'+JSON.stringify(this.weekdayall));
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
      this.accountService.find_all_Performance(val).subscribe(
        valindex=>{
          this.weekdayall=valindex.data;
          console.log('weekdayindex'+JSON.stringify(this.weekdayall));
        }
      )
    })
  }

}
