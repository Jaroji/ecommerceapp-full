import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { IonicStorageModule }from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { DatabaseProvider } from '../providers/database/database';
import { CrudProvider } from '../providers/crud/crud';
import { SQLite } from '@ionic-native/sqlite';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { CategoryPage } from '../pages/category/category';
import { EditCategoryPage } from '../pages/edit-category/edit-category';
import { FavoritePage } from '../pages/favorite/favorite';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { Camera } from '@ionic-native/camera'
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './app.firebaseconfig';

import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    MenuPage,
    EditProductPage,
    CategoryPage,
    EditCategoryPage,
    FavoritePage
  ],
  imports: [
    BrowserModule, HttpModule, 
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    MenuPage,
    EditProductPage,
    CategoryPage,
    EditCategoryPage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    CrudProvider,
    FavoriteProvider,
    AuthServiceProvider,
    Camera,
    AngularFireDatabase,
    FCM
  ]
})
export class AppModule {}
