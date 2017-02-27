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
	courses = [];
	messagesToday = [];
	messagesTomorrow = [];
	todayDate    = new Date();
	tomorrowDate = new Date();
	todayDateString    = '';
	tomorrowDateString = '';

	constructor(public nav: NavController, public af: AngularFire, public auth: FirebaseAuth, private alertCtrl: AlertController) {

		this.tomorrowDate.setDate(this.todayDate.getDate() + 1);
		this.todayDateString    = this.todayDate.toLocaleDateString();
		this.tomorrowDateString = this.tomorrowDate.toLocaleDateString();

	}

	ngOnInit() {

		this.af.database.object(`/courses`).subscribe(courses => {
			this.courses = courses;
		});

		this.af.database.list('/messages', { preserveSnapshot: true }).subscribe(messages => {
			for (let message of messages) {

				var object = message.val(),
				    teacher = '';

				if (this.courses[object.course]) {
					teacher = this.courses[object.course]['teacher'];
				}

				object['$key'] = message.key;
				object['teacher'] = teacher;

				var messageDateString = new Date(object.date).toLocaleDateString();

				if (messageDateString == this.todayDateString) {
					this.messagesToday.push(object);
				} else if (messageDateString == this.tomorrowDateString) {
					this.messagesTomorrow.push(object);
				}

			}

			console.log(this.messagesTomorrow);

		});
	}

	logout() {
		this.auth.logout();
	}

}
