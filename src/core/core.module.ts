import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TemplateComponent } from './template/template.component';
import { AboutComponent } from './feature-components/about/about.component';
import { FeedbackComponent } from './feature-components/feedback/feedback.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BlogComponent } from './feature-components/blog/blog.component';
import { ProductComponent } from './feature-components/product/product.component';
import { ProductDetailsComponent } from './feature-components/product-details/product-details.component';
import { BlogDetailsComponent } from './feature-components/blog-details/blog-details.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TemplateComponent,
    AboutComponent,
    FeedbackComponent,
    CarouselComponent,
    BlogComponent,
    ProductComponent,
    ProductDetailsComponent,
    BlogDetailsComponent 
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class CoreModule { }
