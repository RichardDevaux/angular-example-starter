import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FichiertemporaireService {

  constructor() { }

  postFichierTemporaire(body: string) {
    return new Promise<Client>((resolve, reject) => {
      this.http.post<Client>(`${environment.apiUrl}/api/client`, body)
        .subscribe((response: Client) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

}
