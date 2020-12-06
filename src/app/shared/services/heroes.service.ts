import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, filter, retry } from 'rxjs/operators';

import { HERO } from 'src/environments/environment';
import { HeroModel } from 'src/app/shared/models/hero.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

export const NUMBER_HEROES_FOR_LIST: number = 20
const HEROE_KEY = makeStateKey('heroe');
const HEROES_KEY = makeStateKey('heroes');
const HEROES_RANDOM_IDS_KEY = makeStateKey('heroesIds');

@Injectable({ providedIn: 'root' })
export class HeroesService {
    private _heroesIds: number[] = []
    private _hero: HeroModel = null
    private _heroes: HeroModel[] = []

    constructor(
        private _httpClient: HttpClient,
        private _transferState: TransferState,
        @Inject(PLATFORM_ID) private _platform: Object
    ) {
        this.readTransferState()
    }

    private readTransferState(): void {
        if (isPlatformBrowser(this._platform)) {
            let hero: HeroModel = new HeroModel()
            hero.setData(this._transferState.get<HeroModel>(HEROE_KEY, null))
            this._hero = hero;
            this._heroes = this._map(this._transferState.get<HeroModel[]>(HEROES_KEY, []));
            this._heroesIds = this._transferState.get<number[]>(HEROES_RANDOM_IDS_KEY, [])
        }
    }

    private existsSuperHeroe(): boolean {
        return this._hero && this._hero.id ? true : false
    }

    private existsSuperHeroes(): boolean {
        return !!this._heroes.length
    }

    private _map(heroes: HeroModel[]): HeroModel[] {
        return heroes.map((_hero: HeroModel) => {
            let hero: HeroModel = new HeroModel()
            hero.setData(_hero)
            return hero
        })
    }

    private _filter(filter: string): HeroModel[] {
        filter = filter.toString().toUpperCase()

        return this._heroes.filter((hero: HeroModel) =>
            hero.id.toString().toUpperCase().includes(filter)
            || hero.name.toString().toUpperCase().includes(filter)
            || hero.biography.fullName.toString().toUpperCase().includes(filter)
        )
    }

    private _random(length: number): HeroModel[] {
        let heroes: HeroModel[] = []
        length = this._heroes.length < length ? this._heroes.length : length

        if (!this._heroesIds.length) {
            while (heroes.length < length) {
                let randomNumber: number = Math.floor(Math.random() * this._heroes.length)

                if (!this._heroesIds.includes(randomNumber)) {
                    this._heroesIds.push(randomNumber)
                    heroes.push(this._heroes[randomNumber])
                }
            }

            if (isPlatformServer(this._platform))
                this._transferState.set<number[]>(HEROES_RANDOM_IDS_KEY, this._heroesIds)
        } else
            this._heroesIds.forEach((id: number) => heroes.push(this._heroes[id]))

        return heroes
    }

    list(filter: string = null, random: boolean = true, length: number = NUMBER_HEROES_FOR_LIST): Observable<HeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._heroes).pipe(
                map((heroes: HeroModel[]) => {
                    heroes = filter ? this._filter(filter) : heroes
                    return heroes
                }),
                map((heroes: HeroModel[]) => random ? this._random(length) : heroes.slice(0, length))
            )

        return this._httpClient.get<HeroModel[]>((<{ [key: string]: string }>HERO.RESOURCE).LIST)
            .pipe(
                retry(3),
                map((heroes: HeroModel[]) => this._map(heroes)),
                tap((heroes: HeroModel[]) => this._heroes = heroes),
                tap((heroes: HeroModel[]) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<HeroModel[]>(HEROES_KEY, heroes)
                }),
                map((heroes: HeroModel[]) => {
                    heroes = filter ? this._filter(filter) : heroes
                    return heroes
                }),
                map((heroes: HeroModel[]) => random ? this._random(length) : heroes.slice(0, length))
            )
    }

    detail(id: number): Observable<HeroModel> {
        if (this.existsSuperHeroes())
            return of(this._heroes.find((hero: HeroModel) => hero.id == id))
        else if (this.existsSuperHeroe())
            return of(this._hero).pipe(
                filter((hero: HeroModel) => this._hero.id == id)
            )

        const RESOURCE: string = (<{ [key: string]: string }>HERO.RESOURCE).ID.replace('#{ID}', id.toString())
        return this._httpClient.get<HeroModel>(RESOURCE)
            .pipe(
                retry(3),
                map((_hero: HeroModel) => {
                    let hero = new HeroModel()
                    hero.setData(_hero)
                    return hero
                }),
                tap((hero: HeroModel) => this._hero = hero),
                tap((hero: HeroModel) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<HeroModel>(HEROE_KEY, hero)
                })
            )
    }
}