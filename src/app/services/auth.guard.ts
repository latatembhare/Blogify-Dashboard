import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToastrService)

  if (authService.isLogGuard) {
    return true;
  } else {
    router.navigate(['/login'])
    toaster.warning('You dont have permission to access the page')
    return false;
  }
};
