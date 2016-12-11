import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-blank',
	template: '<p style="width: 100%; text-align: center; font-size: 22px; margin-top: 20px;">☺️</p>'
})
export class BlankPage implements OnInit {

	constructor(public nav: NavController, public af: AngularFire, public auth: FirebaseAuth) {}

	ngOnInit() {
		this.auth.subscribe((user) => {
			if (user) {
				this.nav.setRoot(HomePage);
			} else {
				this.nav.setRoot(LoginPage);
			}
		});
	}
}
