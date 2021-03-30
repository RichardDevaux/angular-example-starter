import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrisephotoModule } from './features/photo/pages/prisephoto/prisephoto.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrisephotoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
