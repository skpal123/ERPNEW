import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor() { }
  toJSONDate(date:Date){
      var date2 = '\/Date(' +  date.getTime() + '-0000)\/';
      return date2;
  }
}
