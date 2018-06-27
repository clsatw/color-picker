import { Injectable } from '@angular/core';

import { distinct, map, throttleTime, pluck } from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MqttProvider {
  device_id = '630206';
  aRestApiKey = '1obqzch8x3e7e626';
  constructor(private http: HttpClient) {
  }

  callArest(fnName: string): Observable<any> {
    console.log('fnName: ', fnName);
    // this.msg = fnName; // for css
    return this.http.get(`https://pro.arest.io/${this.device_id}/${fnName}?key=${this.aRestApiKey}`);
  }

  callArestWithParam(fnName: string, hexCol: number) {
    console.log('params: ', hexCol);
    return this.http.get(`https://pro.arest.io/${this.device_id}/ledColor?key=${this.aRestApiKey}&params=${hexCol}`)
      // .map(res => res.json())
      .subscribe(console.dir);
  }

/*
  callArestWithParam(fnName: string, r: string, g: string, b: string) {
    console.log('params: ', b);
    return this.http.get(`https://pro.arest.io/${this.device_id}/led?key=${this.aRestApiKey}&params=${r},${g},${b}`)
      // .map(res => res.json())
      .subscribe(console.dir);
  }
*/

  gpioCtrl(pin: string, state) {
    // this.http.get(`https://pro.arest.io/${this.device_id}/mode/pin/o?key=${this.aRestApiKey}`)
    //  .subscribe();
    return this.http.get(`https://pro.arest.io/${this.device_id}/digital/pin/state?key=${this.aRestApiKey}`)
      // .map(res => res.json())
      .subscribe();
  }

  init() {
    // const reedSwitch$ = subject.asObservable();
    /*
    subjec$
      .throttleTime(3000)
      .subscribe(
      (e) => this.txtMsg.sendTextTextMsg('0922719061', 'Intruder!')
      );
    */
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
/*
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
*/
}
