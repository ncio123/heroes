import { ModelAbstract } from 'src/app/shared/models/model-abstract';

export class HeroBiographyModel extends ModelAbstract<HeroBiographyModel> {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}