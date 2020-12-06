import { ModelAbstract } from 'src/app/shared/models/model-abstract';

export class HeroPowerstatsModel extends ModelAbstract<HeroPowerstatsModel> {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
}