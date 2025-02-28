import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { tokenInterceptorInterceptor } from './services/interceptor/token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
   FormsModule,
   CodeInputModule,
   BrowserAnimationsModule,
   LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    AppComponent,
     // Required animations module
   ToastrModule.forRoot({
     timeOut: 3000,
     positionClass: 'toast-top-right',
     preventDuplicates: true,
   })



  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptorInterceptor,
      multi: true
    },
    
  ],
  
})
export class AppModule {
  static default: any;
}



