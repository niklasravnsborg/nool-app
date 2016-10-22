import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import * as firebase from 'firebase';
import {AngularFire} from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
	rootPage = LoginPage;

	constructor(platform: Platform) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}
}
