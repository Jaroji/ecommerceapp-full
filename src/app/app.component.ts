import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { timer } from 'rxjs/observable/timer';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  showSplash = true; // <-- show animation

  constructor(platform: Platform, fcm:FCM,statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      //Notifications
	    fcm.subscribeToTopic('all');
	    fcm.getToken().then(token=>{
		    console.log(token);
	    });
      
      fcm.onNotification().subscribe(data=>{
		    if(data.wasTapped){
			    console.log("Received in background");
		    } else {
			    console.log("Received in foreground");
		    };
	    });
  
      fcm.onTokenRefresh().subscribe(token=>{
		    console.log(token);
	    }); 

	    //end notifications.
    });
  }
}

