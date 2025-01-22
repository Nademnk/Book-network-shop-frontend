import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';

export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService); // Use 'inject' instead of 'Inject'
  const router = inject(Router);

  const isValid = tokenService.isTokenNotValid();

  if (isValid) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
