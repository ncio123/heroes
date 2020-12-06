import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

import { HeroModel } from 'src/app/shared/models/hero.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';
import { HERO } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  private _heroBehaviorSubject$: BehaviorSubject<HeroModel> = new BehaviorSubject(null)
  hero$: Observable<HeroModel> = this._heroBehaviorSubject$.asObservable()

  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _meta: Meta
  ) { }

  ngOnInit(): void {
    this.startSubscribers()
  }

  ngOnDestroy(): void {
    this._heroBehaviorSubject$.unsubscribe()
  }

  private startSubscribers(): void {
    this._activatedRoute.params.pipe(
      filter((params: Params) => params.heroId),
      map((params: Params) => params.heroId)
    ).subscribe((id: number) => this.detail(id))
  }

  detail(id: number): void {
    this._heroesService.detail(id)
      .subscribe(
        (hero: HeroModel) => {
          this._title.setTitle(`${hero.titleSEO} / ${HERO.CONFIGURATION.TITLE}`)
          this._meta.updateTag({
            name: 'description',
            content: hero.descriptionSEO
          })

          this._meta.updateTag({
            name: 'keywords',
            content: hero.keywordsSEO
          })

          this._heroBehaviorSubject$.next(hero)
        }
      )
  }
}