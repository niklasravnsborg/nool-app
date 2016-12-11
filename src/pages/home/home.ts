import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	messages: FirebaseListObservable<any>;

	constructor(public nav: NavController, public af: AngularFire, public auth: FirebaseAuth, private alertCtrl: AlertController) {}

	ngOnInit() {
		this.messages = this.af.database.list('/messages');
	}

	logout() {
		this.messages = null;
		this.auth.logout();
	}

}
