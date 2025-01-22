import { Injectable } from '@angular/core';

@Injectable()
export class tokenInterceptorInterceptor  {

  /**constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;

    // Check if the token is not null before adding Authorization header
    if (token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      return next.handle(authReq);
    }

    // If no token, proceed with the original request
    return next.handle(request);
  }
      **/  
}