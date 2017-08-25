import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, } from 'ionic-angular';
//import { TabsPage } from "../../tabs/tabs";



@Component({
  selector: 'page-system-feedback',
  templateUrl: 'system-feedback.html',
})
export class SystemFeedbackPage {

  feedback_content:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SystemFeedbackPage');
  }
  btn_color(index:any){
    var btn = null;
    console.log('btn:'+index);
    if(index == 1){
      console.log('hello1');
      btn = document.getElementById('b1');
      let btn2 = document.getElementById('b2');
      let btn3 = document.getElementById('b3');
      btn2.style.backgroundColor = 'white';
      btn3.style.backgroundColor = 'white';
      btn2.style.color = 'black';
      btn3.style.color = 'black';
    }else if(index == 2){
      btn = document.getElementById('b2'); 
      let btn1 = document.getElementById('b1');
      let btn3 = document.getElementById('b3');
      btn1.style.backgroundColor = 'white';
      btn3.style.backgroundColor = 'white';
      btn1.style.color = 'black';
      btn3.style.color = 'black'; 
    }else if(index == 3){
      btn = document.getElementById('b3');
      let btn2 = document.getElementById('b2');
      let btn1 = document.getElementById('b1');
      btn2.style.backgroundColor = 'white';
      btn1.style.backgroundColor = 'white';
      btn2.style.color = 'black';
      btn1.style.color = 'black';
    }
    btn.style.backgroundColor = '#ffab3d';
    btn.style.color = 'white';
  }
  toFeedback(position:any){
    console.log(this.feedback_content);
 //   console.log(this.feedback_content.trim().length);
    if(this.feedback_content == null || this.feedback_content.trim().length < 5){
      let toast = this.toastCtrl.create({
        message: '不能少于5个字哦～',
        duration: 1000,
        position: position,
      });
      toast.present();
      return;
    }else{
      let toast = this.toastCtrl.create({
        message: '提交成功',
        duration: 1000,
        position: position,
      });
      toast.present();
      this.feedback_content = null;
      // this.navCtrl.push(TabsPage,{
      //   flag: 3
      // });
    }
    
  }
}
