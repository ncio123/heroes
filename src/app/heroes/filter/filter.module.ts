import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroFilterComponent } from 'src/app/heroes/filter/filter.component';

@NgModule({
  declarations: [HeroFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HeroFilterComponent
  ]
})
export class HeroFilterModule { }
