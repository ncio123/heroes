import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'lazysizes';

import { HeroListComponent } from 'src/app/heroes/list/list.component';
import { HeroListRoutingModule } from 'src/app/heroes/list/list-routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [HeroListComponent],
  imports: [
    CommonModule,
    PipesModule,
    HeroListRoutingModule
  ],
  exports: [
    HeroListComponent
  ]
})
export class HeroListModule { }