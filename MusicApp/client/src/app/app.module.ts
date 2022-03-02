import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { CoreModule } from './modules/core.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SharedModule } from './modules/shared.module';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberEditComponent

  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true//In order to tell ng that there are more interceptors
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true//In order to tell ng that there are more interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
