import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TRELLO_API } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'https://api.trello.com/1';
  private members = '/members/me/boards/';
  private boards = '/boards/';
  private lists = '/lists';
  private cards = '/cards'
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  public getBoards() {
    const options = {
      params: new HttpParams({
        fromString: `fields=name,url&key=${TRELLO_API.key}&token=${TRELLO_API.token}`
      })
    };

    return this.http.get(`${this.apiUrl}${this.members}`, options).pipe(retry(3), catchError(this.error));
  }

  public getBoard(id: number): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}`
      }),
      headers: this.headers
    };
    return this.http.get(this.apiUrl + this.boards + id.toString(), options).pipe(retry(3), catchError(this.error));
  }

  public getListOfBoard(id: number): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}`
      }),
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get(this.apiUrl + this.boards + id.toString() + this.lists, options);
  }

  public getCardInList(id: string): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}`
      })
    };
    return this.http.get(this.apiUrl + this.lists + '/' + id + this.cards, options);
  }

  public createCard(idList: string, name: string, desc: string): Observable<any> {
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}&idList=${idList}&name=${name}&desc=${desc}`
      })
    };
    return this.http.post(this.apiUrl + this.cards, null, options);
  }

  public editCard(cardId: string, name: string, desc: string): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}&name=${name}&desc=${desc}`
      }),
      headers: this.headers
    };
    return this.http.put(this.apiUrl + this.cards + '/' + cardId, null, options);
  }

  public deleteCard(cardId: string): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}`
      })
    };
    return this.http.delete(this.apiUrl + this.cards + '/' + cardId, options);
  }

  public createBoard(name: string, desc: string): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}&name=${name}&desc=${desc}`
      })
    };
    return this.http.post(this.apiUrl + this.boards, null, options);
  }

  public createListOnBoard(id: string, name: string): Observable<any>{
    const options = {
      params: new HttpParams({
        fromString: `key=${TRELLO_API.key}&token=${TRELLO_API.token}&name=${name}`
      })
    };
    return this.http.post(this.apiUrl + this.boards + id + this.lists, null, options);
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = 'Uknown Error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
