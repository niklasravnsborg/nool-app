import { Component } from '@angular/core';
import { AngularFire, AngularFireModule, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component.ts';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-subscriptions',
	templateUrl: 'subscriptions.html'
})
export class SubscriptionsPage {

	authId = '';
	subscriptionsList = [];
	courses: FirebaseListObservable<any>;
	subscriptions: FirebaseObjectObservable<any>;

	constructor(public nav: NavController, public af: AngularFire) {}

	ngOnInit() {
		console.log('init');
		this.af.auth.subscribe(auth => {
			this.authId = auth.uid;
		});

		this.subscriptions = this.af.database.object(`/users/${this.authId}/subscriptions`, { preserveSnapshot: true });

		this.subscriptions.subscribe(list => {
			this.subscriptionsList = list.val();
		});

		this.courses = this.af.database.list(`/courses`);
	}

	subscribe(course) {
		this.subscriptions.update({[course]: true});
	}

	unsubscribe(course) {
		this.af.database.object(`/users/${this.authId}/subscriptions/${course}`).remove();
	}

	logout() {
		this.nav.setRoot(LoginPage);
		this.af.auth.logout();
	}

}
