import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../core/core.module').then(m => m.CoreModule)
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top', // This ensures scrolling to the top on route change
  anchorScrolling: 'enabled', // Optional: for scrolling to specific anchors
  onSameUrlNavigation: 'reload' // Optional: for reloading on same URL navigation
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
