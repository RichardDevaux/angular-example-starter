import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionphotoPage } from './pages/selectionphoto/selectionphoto.page';

const routes: Routes = [
  { path: '', component: SelectionphotoPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrisedephotosRoutingModule { }
