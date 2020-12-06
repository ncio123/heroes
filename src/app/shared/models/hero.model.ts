import { ModelAbstract } from 'src/app/shared/models/model-abstract';
import { HeroPowerstatsModel } from 'src/app/shared/models/hero-powerstats.model';
import { HeroAppearanceModel } from 'src/app/shared/models/hero-appearance.model';
import { HeroBiographyModel } from 'src/app/shared/models/hero-biography.model';
import { HeroWorkModel } from 'src/app/shared/models/hero-work.model';
import { HeroConnectionsModel } from 'src/app/shared/models/hero-connections.model';
import { HeroImagesModel } from 'src/app/shared/models/hero-images.model';
import { PositioningSEO } from 'src/app/shared/models/interfaces';

export class HeroModel extends ModelAbstract<HeroModel> implements PositioningSEO {
    id: number;
    name: string;
    slug: string;
    powerstats: HeroPowerstatsModel = new HeroPowerstatsModel();
    appearance: HeroAppearanceModel = new HeroAppearanceModel();
    biography: HeroBiographyModel = new HeroBiographyModel();
    work: HeroWorkModel = new HeroWorkModel();
    connections: HeroConnectionsModel = new HeroConnectionsModel();
    images: HeroImagesModel = new HeroImagesModel();

    get titleSEO(): string {
        return this.name.toUpperCase()
    };
    get descriptionSEO(): string {
        return this.work.occupation
    };
    get keywordsSEO(): string {
        return [
            this.name,
            this.slug,
            this.appearance.gender,
            this.appearance.race,
            this.appearance.eyeColor,
            this.appearance.hairColor,
            this.biography.publisher,
            this.biography.alignment,
        ].join(',')
    };

    imagesLazySizes(): string {
        return this.images.lazySizes()
    }

    setData(data: HeroModel): void {
        if (data) {
            super.setData(data)

            if (data.powerstats) {
                let powerstats = new HeroPowerstatsModel()
                powerstats.setData(data.powerstats)
                this.powerstats = powerstats
            }

            if (data.appearance) {
                let appearance = new HeroAppearanceModel()
                appearance.setData(data.appearance)
                this.appearance = appearance
            }

            if (data.biography) {
                let biography = new HeroBiographyModel()
                biography.setData(data.biography)
                this.biography = biography
            }

            if (data.work) {
                let work = new HeroWorkModel()
                work.setData(data.work)
                this.work = work
            }

            if (data.connections) {
                let connections = new HeroConnectionsModel()
                connections.setData(data.connections)
                this.connections = connections
            }

            if (data.images) {
                let images = new HeroImagesModel()
                images.setData(data.images)
                this.images = images
            }
        }
    }
}