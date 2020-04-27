﻿import { Injectable } from "@angular/core";
import {
	Router,
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from "@angular/router";
import { AuthService } from '../@services/auth.service';


@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authService.user;
		if (currentUser) {
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(["/auth/login"]);
		return false;
	}
}
