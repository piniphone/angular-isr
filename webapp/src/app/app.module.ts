import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorService } from './http-interceptor.service';

// estos no me funcionan... es para renderizar o no en el server y ahorrar muchisimo procesamiento
// como por ejemplo poner metas y no renderizar más desde el server, que lo haga el cliente lo demás
import { AppShellNoRenderDirective } from './directives/app-shell-no-render.directive';
import { AppShellRenderDirective } from './directives/app-shell-render.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'eforapp' }),
    FormsModule,
    HttpClientModule,
    BrowserTransferStateModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    //console.log(`Running ${platform} with appId=${appId}`);
  }
}
