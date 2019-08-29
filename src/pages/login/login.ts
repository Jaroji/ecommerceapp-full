import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { MenuPage } from '../menu/menu';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  //pengganti datamodel
  userData = {"username":"","password":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,public toastCtrl: ToastController) {
    //membaca local storage, jika data login sudah tersimpan, maka user tidak perlu login lagi dan langsung di direct ke homepage
    const data = JSON.parse(localStorage.getItem('userData'));
    if(data!=null){
      navCtrl.push(MenuPage);
    }
  }

  //methode yang menangani proses login 
  //di dalamnya dilakukan pencocokan username dan password 
  //yang ada didatabase
  signIn(){
    this.authService.postData(this.userData,'login').then((result)=>{
      this.responseData = result;
      console.log(this.responseData[0].username);
        //pencocokan username dan database
        if(this.responseData[0].username==this.userData.username && this.responseData[0].password==this.userData.password){
          //jika cocok, simpan data login ke localstorage dan direct ke HomePage
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          //this.navCtrl.push(HomePage);
          this.navCtrl.setRoot(MenuPage);
        } else {
          //jika tidak cocok, munculkan toast pesan ke user
          this.showToast('bottom','User account tidak valid');
        }
      
    })
  }

  showRegisterForm(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
