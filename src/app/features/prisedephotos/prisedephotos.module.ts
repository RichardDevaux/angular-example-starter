import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrisedephotosRoutingModule } from './prisedephotos-routing.module';
import { SelectionphotoPage } from './pages/selectionphoto/selectionphoto.page';

@NgModule({

  imports: [
    CommonModule,
    PrisedephotosRoutingModule
  ],
  declarations: [SelectionphotoPage]
})
export class PrisedephotosModule { }
