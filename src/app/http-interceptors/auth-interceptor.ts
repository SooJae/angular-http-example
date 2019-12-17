import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 서비스에서 인증 토큰을 가져옵니다.
    const authToken = this.auth.getAuthorizationToken();

    /*
    * The verbose way:
    // HTTP 요청을 복제하면서, 원래 헤더에 인증 토큰을 추가한 새 헤더를 적용합니다.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // HTTP 요청을 복제하면서 헤더를 지정하는 로직을 한번에 실행할 수도 있습니다.
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // 수정한 HTTP 요청을 다음 핸들러에 전달합니다.
    return next.handle(authReq);
  }
}
