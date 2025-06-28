import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './feature-components/blog/blog.component';
import { ProductComponent } from './feature-components/product/product.component';
import { ProductDetailsComponent } from './feature-components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
