import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestParam} from '../../providers/param.before.request'
import { AccountService } from '../../providers/account.service';
/**
 * Generated class for the OrderindexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderindex',
  templateUrl: 'orderindex.html',
})
export class OrderindexPage {
  ownindex:any;
  ownindex_price:any;
  ownindex_sum:any;
  day_flay:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public requestParam:RequestParam,
              public accountService:AccountService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderindexPage');
  }

  ionViewWillEnter(){
    this.day_flay=0;
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_ownindex(val).subscribe(
        valindex=>{
          this.ownindex=valindex.data;
          this.ownindex_sum = this.ownindex.count;
          this.ownindex_price =this.ownindex.total_money;
          if(this.ownindex_price == null){
            this.ownindex_price=0.00
          }else{
            this.ownindex_price =this.ownindex.total_money;
          }
          console.log('find_ownindex   '+JSON.stringify(this.ownindex));
        }
      )
    })
  }
  //查一周销售记录
  weekday(){
    this.day_flay=0;
    let day = {
      day:7,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_ownindex(val).subscribe(
        valindex=>{

          this.ownindex=valindex.data;
          this.ownindex_price =this.ownindex.total_money;
          this.ownindex_sum = this.ownindex.count;
          console.log('find_ownindex:   '+JSON.stringify(this.ownindex));
        }
      )
    })
  }
//查一月销售记录
  month(){
    this.day_flay=1;
    let day = {
      day:30,
    }
    this.requestParam.collectOBJ(day).then((val)=>{
      this.accountService.find_ownindex(val).subscribe(
        valindex=>{

          this.ownindex=valindex.data;
          this.ownindex_price =this.ownindex.total_money;
          this.ownindex_sum = this.ownindex.count;
          console.log('find_ownindex'+JSON.stringify(this.ownindex));
        }
      )
    })
  }

}
