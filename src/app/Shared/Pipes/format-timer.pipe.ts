import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimerPipe implements PipeTransform {

  transform(value: number): string {
    console.log(value);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

}
