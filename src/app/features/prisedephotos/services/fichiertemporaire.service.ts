import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@core/environment';
import { APIData } from '@core/api';
import { UnePhotoTemporaire } from './requests.model';

@Injectable({
  providedIn: 'root'
})
export class FichiertemporaireService {

  constructor(
    private http: HttpClient
  ) { }

  postFichierTemporaire(body: string): Observable<APIData<UnePhotoTemporaire>> {
    return this.http.post<APIData<UnePhotoTemporaire>>(`${environment.urlApi}/api/v2/account/login`, body).pipe(
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
