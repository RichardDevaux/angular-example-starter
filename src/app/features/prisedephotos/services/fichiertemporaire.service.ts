import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
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

  tokenPds = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMDBqMWQyIiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9VU0VSIiwiZXhwIjoxNjE5NTEzODMxfQ.6qffTubsGOgUybB7pAtrLzYI2ged53YFS8jhY2nGc_gHNC6drdGgQEozFwJcxnR7l2L9XsH5dKX41IQIhqye_A';

  httpOptions: any = {
    reportProgress: true,
    observe: 'events',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenPds}`,
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
        Authorization: `Bearer ${this.tokenPds}`,
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

  // postFichierTemporaire(body: UnePhotoTemporaire): Observable<HttpEvent<any>> {
  //   return this.http.post<HttpEvent<any>>(`${environment.urlApi}fichiertemporaire`, JSON.stringify(body), this.httpOptions);
  // }

  postFichierTemporaire(body: UnePhotoTemporaire): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}fichiertemporaire`, JSON.stringify(body), this.httpOptions);
  }

  /*
  return new Promise<Client>((resolve, reject) => {
    this.http.post<Client>(`${environment.urlApi}/api/fichiertemporaire`, body)
      .subscribe((response: Client) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
  });

}*/

}
