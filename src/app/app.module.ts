import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* componete navbar */
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    /* our own module */
    AngularMaterialModule,
   HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
