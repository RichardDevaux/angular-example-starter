import { Component, OnInit } from '@angular/core';
import { FichiertemporaireService } from '../../services/fichiertemporaire.service';
import { UnePhotoTemporaire } from '../../services/requests.model';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';


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

  constructor(private yvidia: FichiertemporaireService, private snackBar: MatSnackBar) { }

  errors: string[] = [];
  file: File | null = null;

  ngOnInit(): void {
  }

  onFileInput(files: FileList | null): void {

    const loading = this.snackBar.open(`Envoi en cours...`);

    if (files) {

      const monJson: UnePhotoTemporaire = {
        nomFichier: files[0].name,
        dateCreation: new Date(),
        numeroLicence: 'A00J1D2',
        contenuContentType: 'image/jpeg',
        contenu: '',
        apercu: '',
        uuid: uuidv4()
      };

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const imageSmall = new Image();
        const imageBig = new Image();
        let maphotoBase64 = '';
        let mavignetteBase64 = '';

        imageSmall.src = e.target.result;
        imageSmall.onload = rs => {

          imageBig.src = e.target.result;
          imageBig.onload = rt => {

            maphotoBase64 = this.imageToDataUrl(imageBig, 4000, 3000);
            mavignetteBase64 = this.imageToDataUrl(imageSmall, 800, 600);

            monJson.contenu = maphotoBase64;
            monJson.apercu = mavignetteBase64;

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
          };
        };
      };

      reader.readAsDataURL(files[0]);
    }
  }

  imageToDataUrl(img: HTMLImageElement, widthImg: number, heightImg: number): string {

    let imageRetour = '';

    const maxWidth = widthImg;
    const maxHeight = heightImg;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    if (width !== img.width || height !== img.height) {
      imageRetour = this.compressImage(img.src, width, height);
    } else {
      imageRetour = img.src;
    }

    imageRetour = imageRetour.split(',')[1];

    return imageRetour;

  }

  base64ToDataUri(base64: any): string {
    return `data:image/jpg;base64,${base64}`;
  }

  compressImage(src: string, newX: number, newY: number): string {

    let imgCompressed = '';

    const img = new Image();
    img.src = src;
    const elem = document.createElement('canvas');
    elem.width = newX;
    elem.height = newY;
    const ctx = elem.getContext('2d');
    if (ctx != null) {
      ctx.drawImage(img, 0, 0, newX, newY);
      elem.addEventListener('load', () => {

      });
      imgCompressed = elem.toDataURL('image/jpeg');


    }

    return imgCompressed;
  }

}
