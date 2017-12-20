import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { OWNERS } from './mock-owners';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OwnerService {

  private ownersUrl = 'http://localhost:4000/owner';

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownersUrl)

  }
  getOwner(_id: String): Observable<Owner> {
    const url = `${this.ownersUrl}/${_id}`;
    return this.http.get<Owner>(url);
  }
  /** PUT: update the hero on the server */
  updateOwner (owner: Owner): Observable<any> {
    console.log(owner);
    return this.http.put(this.ownersUrl, owner, httpOptions);
}

  constructor(private http: HttpClient) { }

}
