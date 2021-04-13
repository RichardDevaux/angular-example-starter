import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@core/environment';
import { APIData } from '@core/api';
import { UnePhotoTemporaire } from './requests.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichiertemporaireService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMDBqMWQyIiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9VU0VSIiwiZXhwIjoxNjE4Mzk0MzYyfQ.i-Vc1gN6vua_-NX_30HjA37kqg2y4L4hM4Bn96bI7KEvvK2GsDw59FvtKYdSpt4uajNV2zqTPNVzHyXzdwl8QQ',
      Accept: 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  postFichier(body: UnePhotoTemporaire): void {

    fetch(`${environment.urlApi}fichiertemporaire`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMDBqMWQyIiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9VU0VSIiwiZXhwIjoxNjE4Mzk0MzYyfQ.i-Vc1gN6vua_-NX_30HjA37kqg2y4L4hM4Bn96bI7KEvvK2GsDw59FvtKYdSpt4uajNV2zqTPNVzHyXzdwl8QQ',
        /*`Bearer ${this.token}`,*/
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.log('OK');
        /*return response;*/
      }).catch(error => {
        console.error(error);
      });

  }

  postFichierTemporaire(body: UnePhotoTemporaire): Observable<APIData<boolean>> {
    return this.http.post<APIData<boolean>>(`${environment.urlApi}fichiertemporaire`, JSON.stringify(body), this.httpOptions).pipe(
      tap(({ data, error }) => {
        if (!error) {

        }
      }),
    );


    /*
    return new Promise<Client>((resolve, reject) => {
      this.http.post<Client>(`${environment.urlApi}/api/fichiertemporaire`, body)
        .subscribe((response: Client) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
    */
  }

}
