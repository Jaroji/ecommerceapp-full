import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { CrudProvider } from '../../providers/crud/crud';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  responseData : any;
  userDetails: any;
  public base64Image: string;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":"","image":""};

  constructor(public navCtrl: NavController, public camera:Camera, public navParams: NavParams, private user: CrudProvider, private toastController: ToastController) {
    //mengambil data dari localstorage
    this.userData = this.navParams.get("menuAccount");
    this.userData.image = "data:image/jpeg;base64,"+ this.userData.image;
  }


  updateProfile(){
    if(!this.userData.username || !this.userData.password || !this.userData.position || !this.userData.phone || !this.userData.email || !this.userData.affiliation){
      this.showToast("Please fill user profile completely!");
      return null;
    }
    //this.userData.datemodified = Date.now();
    //memanggil method postData yang ada di Provider user:CrudProvider
    let headers = new Headers();
    this.user.postData(this.userData,'user',).then((result)=>{
      this.responseData = result;
      console.log(result);
      if(this.responseData.affectedRows>=1){
          //Jika simpan data berhasil maka munculkan pesan toast
          this.showToast('Update data user berhasil')  
      }
    });
  }

  takePhoto() {
    const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 400,
        targetHeight: 400,
        saveToPhotoAlbum: false
    };
    
    this.camera.getPicture(options).then(
        imageData => {
          this.base64Image = "data:image/jpeg;base64," + imageData;
          this.userData.image = imageData;
       },
       err => {
         console.log(err);
       }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  //Helper
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
