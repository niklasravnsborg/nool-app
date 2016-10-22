import { Component } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { NavController, AlertController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	messages: FirebaseListObservable<any>;

	constructor(public navCtrl: NavController, public af: AngularFire, public auth: FirebaseAuth, private alertCtrl: AlertController) {}

	ngOnInit() {
		this.auth.subscribe((data) => {
			if (data) {
				this.messages = this.af.database.list('/messages');
			}
		})
	}

}
