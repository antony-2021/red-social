import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class Auth2Guard implements CanActivate{

    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        this.authService.isLoggedIn || this.router.navigate(["login"]);

        return true;
    }
    
}
