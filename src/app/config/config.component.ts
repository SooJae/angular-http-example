import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { MessageService } from '../message.service';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
  error: any;
  headers: string[];
  config: Config;

  constructor(private configService: ConfigService) {}

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .pipe(
        tap(data => console.log({...data}))
      )
      .subscribe(
        (data: Config) => this.config = { ...data }, // 성공한 경우 실행되는 함수
        error => this.error = error // 에러가 발생한 경우 실행되는 함수
      );
  }

  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }

  showConfig_v2() {
    this.configService.getConfig()
      // Config 타입을 알기 때문에 클래스 프로퍼티로 바로 할당할 수 있습니다.
      .subscribe((data: Config) => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // 반환 형식은 `HttpResponse<Config>` 입니다.
      .subscribe(resp => {
        // 헤더를 확인합니다.
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);


        // `HttpResponse` 객체의 body 프로퍼티는 `Config` 타입입니다.
        this.config = { ... resp.body };
        console.log(this.config);
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}
