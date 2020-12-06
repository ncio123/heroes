import { ModelAbstract } from 'src/app/shared/models/model-abstract';

export class HeroConnectionsModel extends ModelAbstract<HeroConnectionsModel> {
    groupAffiliation: string;
    relatives: string;
}