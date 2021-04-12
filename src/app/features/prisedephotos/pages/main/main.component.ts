import { Component, OnInit } from '@angular/core';
import { FichiertemporaireService } from '../../services/fichiertemporaire.service';
import { UnePhotoTemporaire } from '../../services/requests.model';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  template: `<label for="NewPhoto" class="label-file" style="color: chocolate; " id='libellenouvellephoto' >Sélectionner une photo à envoyer </label>
  <input type="file"
          id="NewPhoto"
          #fileInput class="input-file"
          alt="clic"
          accept="image/png, image/jpeg"
          (change)="onFileInput(fileInput.files)"
          style="color:cadetblue;">
  `, styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  errors: string[] = [];
  file: File | null = null;

  constructor(private yvidia: FichiertemporaireService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileInput(files: FileList | null): void {

    const loading = this.snackBar.open(`Envoi en cours...`);

    if (files) {

      const monJson: UnePhotoTemporaire = {
        nomFichier: files[0].name,
        dateCreation: new Date(),
        numeroLicence: '???',
        contenuContentType: 'image/jpeg',
        contenu: '',
        apercu: '',
        uuid: uuidv4()
      };

      this.file = files.item(0);
      // tslint:disable-next-line: deprecation
      this.yvidia.postFichierTemporaire(monJson).subscribe(
        {
          next: ({ error }) => {

            loading.dismiss();

            if (!error) {

              this.snackBar.open(`Envoi réussi`, `OK`, { duration: 2000 });

            } else {
              this.errors = error.errors ?? [error.message];
            }

          },
          error: () => {

            loading.dismiss();

            this.errors = [`Pas de connexion Internet`];

          },
        });
    }
  }

}
