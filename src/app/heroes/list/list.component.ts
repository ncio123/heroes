import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { HeroesService } from 'src/app/shared/services/heroes.service';
import { HeroModel } from 'src/app/shared/models/hero.model';
import { Title, Meta } from '@angular/platform-browser';
import { HERO } from 'src/environments/environment';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {
  private _activatedRouteQueryParamFilterSubscription$: Subscription
  private _HeroesBehaviorSubject$: BehaviorSubject<HeroModel[]> = new BehaviorSubject(null)
  Heroes$: Observable<HeroModel[]> = this._HeroesBehaviorSubject$.asObservable()

  constructor(
    private _heroesService: HeroesService,
    private _title: Title,
    private _meta: Meta,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startActivatedRouteQueryParamFilterSubscription()
  }

  ngOnDestroy(): void {
    this._HeroesBehaviorSubject$.unsubscribe()
    this._activatedRouteQueryParamFilterSubscription$.unsubscribe()
  }

  private startActivatedRouteQueryParamFilterSubscription(): void {
    this._activatedRouteQueryParamFilterSubscription$ = this._activatedRoute.queryParamMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('filter'))
    ).subscribe((filter: string) => this.list(filter))
  }

  list(filter: string = null): void {
    const random: boolean = filter ? false : true
    this._heroesService.list(filter, random)
      .subscribe(
        (Heroes: HeroModel[]) => {
          this._title.setTitle(`${(<{ [key: string]: string }>HERO.CONFIGURATION.LIST).TITLE} / ${HERO.CONFIGURATION.TITLE}`)

          this._meta.updateTag({
            name: 'description',
            content: Heroes.reduce((description: string, heroe: HeroModel) => `${heroe.name}, ${description} `, '')
          })

          this._meta.updateTag({
            name: 'keywords',
            content: Heroes.reduce((keywords: string, heroe: HeroModel) => `${heroe.name},${keywords} `, '')
          })

          this._HeroesBehaviorSubject$.next(Heroes)
        }
      )
  }

  trackByFunction(heroeModel: HeroModel): number {
    return heroeModel.id
  }
}
