import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import { HttpClientInterceptor } from './http-client-interceptor';
import { PostComponent } from './post/post.component';
import {AuthGuard} from './auth.guard';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { UpdateAnswerComponent } from './update-answer/update-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    DeletePostComponent,
    UpdatePostComponent,
    UpdateAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register-success', component: RegisterSuccessComponent},
      {path: '', component: HomeComponent},
      {path: 'post/:id', component: PostComponent},
      {path: 'addPost', component: AddPostComponent, canActivate: [AuthGuard]},
      {path: 'delete-post/:id', component: DeletePostComponent, canActivate: [AuthGuard]},
      {path: 'update-post/:id', component: UpdatePostComponent, canActivate: [AuthGuard]},
      {path: 'update-answer/:id/:post', component: UpdateAnswerComponent, canActivate: [AuthGuard]}
    ]),
    HttpClientModule,
    Ng2Webstorage.forRoot(),
    EditorModule,


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
