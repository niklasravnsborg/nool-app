import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { HomePage } from '../home/home';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	loader: any;
	user = {email: '', password: ''};

	constructor(public af: AngularFire, public nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

	public login() {
		this.showLoading()

		this.af.auth.login(this.user, {
			provider: AuthProviders.Password,
			method: AuthMethods.Password
		}).then((authData) => {
			this.loader.dismiss();
			this.nav.setRoot(HomePage);
		}).catch((error) => {
			this.showError(error);
		});
	}

	showLoading() {
		this.loader = this.loadingCtrl.create({
			content: 'Einen Moment...'
		});
		this.loader.present();
	}

	showError(text) {
		setTimeout(() => {
			this.loader.dismiss();
		});

		let prompt = this.alertCtrl.create({
			title: 'Fail',
			subTitle: text,
			buttons: ['OK']
		});
		prompt.present();
	}
}
