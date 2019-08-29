import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  responseData : any;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,public toastCtrl: ToastController) {
  
  }

  //methode untuk menangani proses signup/register 
  signUp(){
    //memanggil method postData yang ada di Provider authService
    this.authService.postData(this.userData,'signup').then((result)=>{
      this.responseData = result;
      console.log(result);
      if(this.responseData.affectedRows>=1){
          //Jika simpan data berhasil maka munculkan pesan toast
          this.showToast('bottom','Great!, Signup successfull...')
          //untuk memberikan jeda 2 detik, sebelum kembail ke LoginPage
          setTimeout(() => this.backToLogin(), 2000);
         
        
      }
    })
  }

  backToLogin(){
    this.navCtrl.push(LoginPage);
  }

  showRegisterForm(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }
}
