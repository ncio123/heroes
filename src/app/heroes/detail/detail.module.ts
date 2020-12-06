import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'lazysizes';

import { HeroDetailComponent } from 'src/app/heroes/detail/detail.component';
import { HeroDetailRoutingModule } from 'src/app/heroes/detail/detail-routing.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

@NgModule({
  declarations: [HeroDetailComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    HeroDetailRoutingModule
  ],
  exports: [
    HeroDetailComponent
  ]
})
export class HeroDetailModule { }