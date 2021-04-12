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

      /*
      this.file = files.item(0);
      const photoselection = event.target.files;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const SmallImg = new Image();
        const bigImg = new Image();
        let maphotoBase64 = '';
        let mavignetteBase64 = '';

        bigImg.src = reader.result;
        bigImg.onload = function (el) {
          maphotoBase64 = imageToDataUrl(bigImg, 4000, 3000);
          SmallImg.src = reader.result;
          SmallImg.onload = function (el) {
            mavignetteBase64 = imageToDataUrl(SmallImg, 800, 600);
            yvidia.envoiPhoto(event.target.files[0].name, maphotoBase64, mavignetteBase64);
          };
        };
      }, false);
      reader.readAsDataURL(photoselection[0]);
      */

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const imageSmall = new Image();
        const imageBig = new Image();
        const maphotoBase64 = '';
        let mavignetteBase64 = '';

        imageSmall.src = e.target.result;
        imageSmall.onload = rs => {

          /*maphotoBase64 = imageToDataUrl(image, 4000, 3000);*/

          imageBig.src = e.target.result;
          imageBig.onload = rt => {

            mavignetteBase64 = this.imageToDataUrl(imageSmall, 800, 600);
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

    return '';
  }

  /*
 imageToDataUrl(img: string, _width: number, _height: number): string {

  let canvas = document.createElement('canvas'),
    imageResult = document.createElement('img'),
    ctx,
    maxWidth = _width,
    maxHeight = _height,
    width = img.width,
    height = img.height;

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

  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  imageResult.addEventListener('load', () => {

    const retour = '';

  });

  imageResult = canvas.toDataURL('image/jpeg');
  imageResult = imageResult.split(',')[1];

  return imageResult;

}
*/

  base64ToDataUri(base64: any): string {
    return `data:image/jpg;base64,${base64}`;
  }

}
