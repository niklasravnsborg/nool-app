import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import * as firebase from 'firebase';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage;

	constructor(platform: Platform, public af: AngularFire) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();

			this.af.auth.subscribe((user) => {
				Splashscreen.hide();
				if (user) {
					this.rootPage = HomePage;
				} else {
					this.rootPage = LoginPage;
				}
			});
		});
	}
}
