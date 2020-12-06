import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from 'src/app/heroes/heroes.component';

const routes: Routes = [{
  path: ':heroId',
  loadChildren: () => import('src/app/heroes/detail/detail.module').then(m => m.HeroDetailModule),
}, {
  path: '',
  component: HeroesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
