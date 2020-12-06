import { ModelAbstract } from 'src/app/shared/models/model-abstract';

export class HeroWorkModel extends ModelAbstract<HeroWorkModel> {
    occupation: string;
    base: string;
}