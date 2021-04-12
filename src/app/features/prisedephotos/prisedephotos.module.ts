import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrisedephotosRoutingModule } from './prisedephotos-routing.module';
import { MainComponent } from './pages/main/main.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({

  imports: [
    CommonModule,
    PrisedephotosRoutingModule,
    MatSnackBarModule
  ],
  declarations: [MainComponent]
})
export class PrisedephotosModule { }
