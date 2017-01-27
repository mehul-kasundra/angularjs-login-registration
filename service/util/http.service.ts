/**
 * Created by WebPlanex Infotech Pvt. Ltd.
 * email : info@webplanex.com
 *
 * Description : HTTPService which will be responsible for making HTTP requests
 */

import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Constants} from "../../library/constants";
import {Observable} from "rxjs";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class HttpService {

  /**
   * Constructor to inject NG2's HTTP Client
   * @param http
   * @param authHttp
   */
  constructor(private http: Http, private authHttp: AuthHttp) {

  }

  /**
   * Method to execute a POST request with JSON Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public postJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.post(url, JSON.stringify(data), {headers: this.getHeaders()}).map(HttpService.extractData).catch(HttpService.handleError);
  }

  /**
   * Method to execute a POST request with Form Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public postForm(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.post(url, JSON.stringify(data)).map(HttpService.extractData).catch(HttpService.handleError);
  }

  /**
   * Method to execute a GET request
   * @param url
   * @returns {Observable<any>}
   */
  public get(url: string): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.http.get(url).map(HttpService.extractData).catch(HttpService.handleError);
  }

  /* Authenticated HTTP Calls*/

  /**
   * Method to execute an Authenticated POST request with JSON Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public authPostJSON(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.authHttp.post(url, JSON.stringify(data), {headers: this.getHeaders()}).map(HttpService.extractData).catch(HttpService.handleError);
  }

  /**
   * Method to execute an Authenticated POST request with Form Data
   * @param url
   * @param data
   * @returns {Observable<any>}
   */
  public authPostForm(url: string, data: any): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.authHttp.post(url, JSON.stringify(data)).map(HttpService.extractData).catch(HttpService.handleError);
  }


  /**
   * Method to execute an Authenticated GET request
   * @param url
   * @returns {Observable<any>}
   */
  public authGet(url: string): Observable<any> {
    url = Constants.BASE_URL + url;
    return this.authHttp.get(url).map(HttpService.extractData).catch(HttpService.handleError);
  }

  /**
   * Method to extract data from API response
   * @param res
   * @returns {Response}
   */
  private static extractData(res: Response) {
    return res.json();
  }

  /**
   * Method to handle http errors and sends Observable error to be handled at calling level
   * @param error
   * @returns {any}
   */
  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  /**
   * Returns header for HTTP Requests
   * @returns {Headers}
   */
  private getHeaders():Headers{
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }

}
