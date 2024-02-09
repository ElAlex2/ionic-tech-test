import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SeriesService } from 'src/app/services/series-service.service';
import { Show } from 'src/app/services/types';

@Component({
  selector: 'app-series-favorites',
  templateUrl: './series-favorites.page.html',
  styleUrls: ['./series-favorites.page.scss']
})
export class SeriesFavoritesPage implements OnInit {

  isLoading!: HTMLIonLoadingElement;
  series: Show[] = [];

  constructor(private seriesService: SeriesService, private loadingController: LoadingController, private navCtrl: NavController) { }

  private async handleLoader() {
    this.isLoading = await this.loadingController.create({
      message: 'Loading, please wait...',
      spinner: 'circular'
    });
    await this.isLoading?.present();
    return true;
  }

  async ngOnInit() {
    await this.handleLoader();
    this.series = this.seriesService.getFavorites();
    this.isLoading?.dismiss();    
  }

  async ionViewWillEnter() {    
    this.series = this.seriesService.getFavorites();
    this.isLoading?.dismiss();
  }

  showDetails(id: number) {
    this.navCtrl.navigateForward(`/series/${id}`);
  }

  async deleteTvShow(id: number) {
    this.seriesService.deleteSeriesFavorites(id);
    await this.ionViewWillEnter();
  }

}
