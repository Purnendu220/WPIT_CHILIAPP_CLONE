import { PipeTransform, Injectable, Pipe } from "@angular/core";


@Pipe({
    name: 'arrayFilter'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.mediaType ==='Image');
    }
}