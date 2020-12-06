import { ModelAbstract } from 'src/app/shared/models/model-abstract';

export class HeroAppearanceModel extends ModelAbstract<HeroAppearanceModel> {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
}