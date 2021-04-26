import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrisedephotosRoutingModule } from './prisedephotos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PhotosSentComponent } from './components/photos-slide/photos-slide.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({

  imports: [
    CommonModule,
    PrisedephotosRoutingModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    MainComponent,
    PhotosSentComponent
  ]

})

export class PrisedephotosModule { }
