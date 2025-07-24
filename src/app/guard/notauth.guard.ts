import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notauthGuard: CanActivateFn = () => {
  let router = inject(Router);
  if (!localStorage.getItem('applicationToken'))
     {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
