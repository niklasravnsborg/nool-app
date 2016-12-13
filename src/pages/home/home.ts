import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	date = 'today';
	today = new Date();
	messagesToday = [];
	messagesTomorrow = [];
	todayDate    = new Date();
	tomorrowDate = new Date();
	todayDateString    = '';
	tomorrowDateString = '';
	messages: FirebaseListObservable<any>;


	constructor(public nav: NavController, public af: AngularFire, public auth: FirebaseAuth, private alertCtrl: AlertController) {

		this.tomorrowDate.setDate(this.todayDate.getDate() + 1);
		this.todayDateString    = this.todayDate.toLocaleDateString();
		this.tomorrowDateString = this.tomorrowDate.toLocaleDateString();

	}

	ngOnInit() {
		this.messages = this.af.database.list('/messages');
		this.messages.subscribe(messages => {

			this.messagesToday = [];
			this.messagesTomorrow = [];

			for (let message of messages) {

				var messageDateString  = new Date(message.date).toLocaleDateString();

				if (messageDateString == this.todayDateString) {
					this.messagesToday.push(message);
				} else if (messageDateString == this.tomorrowDateString) {
					this.messagesTomorrow.push(message);
				}

			}

		});
	}

	logout() {
		this.messages = null;
		this.auth.logout();
	}

}
