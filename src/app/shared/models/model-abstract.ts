import { ModelInterface } from 'src/app/shared/models/interfaces';

export abstract class ModelAbstract<T> implements ModelInterface<T> {
    setData(data: T): void {
        if (data)
            Object.assign(this, data)
    }
}