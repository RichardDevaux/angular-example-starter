import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrisedephotosRoutingModule } from './prisedephotos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { PhotosSentComponent } from './components/photos-slide/photos-slide.component';

@NgModule({

  imports: [
    CommonModule,
    PrisedephotosRoutingModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  declarations: [MainComponent]
  // ,exports: [
  //   PhotosSentComponent
  // ]
})

export class PrisedephotosModule { }
