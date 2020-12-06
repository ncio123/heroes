import { NgModule } from '@angular/core'
import { ImageLazyLoadingDirective } from 'src/app/shared/directives/image-lazy-loading.directive';

@NgModule({
    declarations: [
        ImageLazyLoadingDirective
    ],
    exports: [
        ImageLazyLoadingDirective
    ]
})
export class DirectivesModule { }