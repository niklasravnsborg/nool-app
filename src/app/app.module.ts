import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import * as firebase from 'firebase';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

export const firebaseConfig = {
	apiKey: "AIzaSyB6BmmDaCCC0UEWQ_yqfvojXIeOFOxM3J0",
	authDomain: "nool-b1267.firebaseapp.com",
	databaseURL: "https://nool-b1267.firebaseio.com",
	storageBucket: "nool-b1267.appspot.com",
	messagingSenderId: "959259960220"
};

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage
	],
	imports: [
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
