import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  /*{ path: '', redirectTo: 'photosOdeis', pathMatch: 'full' },*/
  { path: '', loadChildren: () => import('./features/prisedephotos/prisedephotos.module').then((m) => m.PrisedephotosModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
