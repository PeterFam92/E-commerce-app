import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

let router = inject(Router);
  if(localStorage.getItem('applicationToken'))
    {
  return true;
    }
  router.navigate(['/login']);
return false;

};
