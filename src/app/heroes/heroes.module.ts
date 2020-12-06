import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from 'src/app/heroes/heroes';
import { HeroesComponent } from 'src/app/heroes/heroes.component';
import { HeroListModule } from 'src/app/heroes/list/list.module';
import { HeroFilterModule } from 'src/app/heroes/filter/filter.module';

@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    HeroListModule,
    HeroFilterModule
  ]
})
export class HeroesModule { }
