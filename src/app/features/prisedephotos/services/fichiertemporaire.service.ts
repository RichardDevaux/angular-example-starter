import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@core/environment';
import { APIData } from '@core/api';
import { UnePhotoTemporaire } from './requests.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichiertemporaireService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  postFichier(body: UnePhotoTemporaire): void {

    const req = new HttpRequest('POST', `${environment.urlApi}/api/fichiertemporaire`, body, {
      reportProgress: true
    });

  }



  postFichierTemporaire(body: UnePhotoTemporaire): Observable<APIData<boolean>> {
    return this.http.post<APIData<boolean>>(`${environment.urlApi}/api/fichiertemporaire`, body, this.httpOptions).pipe(
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
