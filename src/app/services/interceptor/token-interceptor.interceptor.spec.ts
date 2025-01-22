import { TestBed } from '@angular/core/testing';

import { tokenInterceptorInterceptor } from './token-interceptor.interceptor';

describe('tokenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      tokenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: tokenInterceptorInterceptor = TestBed.inject(tokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});