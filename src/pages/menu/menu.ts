import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, NavParams, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import { CategoryPage } from '../category/category';
import { FavoritePage } from '../favorite/favorite';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;
  
  userDetails: any;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":"","image":""};

  constructor(public platform: Platform, public statusBar: StatusBar, public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController, public databaseProvider: DatabaseProvider) {
    this.initializeApp(); 
    //mengambil data dari localstorage
     const data = JSON.parse(localStorage.getItem('userData')); 
     this.userDetails = data;
     if(this.userDetails!=null){
       this.userData.username = this.userDetails[0].username; 
       this.userData.password = this.userDetails[0].password;
       this.userData.email = this.userDetails[0].email; 
       this.userData.phone = this.userDetails[0].phone;
       this.userData.affiliation = this.userDetails[0].affiliation;
       this.userData.position = this.userDetails[0].position; 
       this.userData.image = this.userDetails[0].image;
     }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Favorite Products', component: FavoritePage },
      { title: 'Manage Category', component: CategoryPage },
      { title: 'About Developer', component: AboutPage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.nav.push(HomePage,{menuAccount: this.userData});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.databaseProvider.createDatabase()
      .then(() => {
        console.log("Success load database.");
      })
      .catch(() => {
        console.log("Failed load database.");
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {menuAccount: this.userData});
  }

  logout(){
    let confirm = this.alerCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you really to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present()
  }
}
