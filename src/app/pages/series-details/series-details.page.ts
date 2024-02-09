import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from 'src/app/services/series-service.service';
import { Show } from 'src/app/services/types';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.page.html',
  styleUrls: ['./series-details.page.scss']
})
export class SeriesDetailsPage implements OnInit {

  serie: Show;

  constructor(private route: ActivatedRoute, private seriesService: SeriesService, private toast: ToastController) {
    this.serie = <Show>{};
  }

  async presentToast(message: string, duration: number = 2000) {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }
  
  showMessage(message: string) {
    this.presentToast(message);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const seriesId = params['id'];      
      this.seriesService.getSeriesDetails(seriesId).subscribe(serieDetails => {
        this.serie = serieDetails;
      });
    });
  }

  addFavorite() {
    const added = this.seriesService.addSeriesFavorites(this.serie);
    if (added) {
      this.showMessage(`${this.serie.name} added to favorites`);
    } else {
      this.showMessage(`${this.serie.name} is already a favorite`);
    }
  }

}
