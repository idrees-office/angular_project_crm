import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export class permissionGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): any {
     if (this.authService.hasPermission('ViewLeads')) {
       return true;
     } else {
       this.router.navigate(['/authentication/error']);
       return false;
     }
    // throw new Error('Method not implemented.');
  
}
}

