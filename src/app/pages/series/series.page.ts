import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, NavController } from '@ionic/angular';
import { SeriesService } from 'src/app/services/series-service.service';
import { Show } from 'src/app/services/types';


@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss']
})
export class SeriesPage implements OnInit {

  series: Show[] = [];
  seriesBackup: Show[] = [];
  genres: string[] = [];
  selectedGenres: string[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  isLoading!: HTMLIonLoadingElement;

  constructor(private seriesService: SeriesService, private loadingController: LoadingController, private navCtrl: NavController) { }

  async ngOnInit() {
    await this.loadSeries();
  }

  private async handleLoader() {
    this.isLoading = await this.loadingController.create({
      message: 'Loading, please wait...',
      spinner: 'circular'
    });
    await this.isLoading?.present();
    return true;
  }

  async loadSeries() {
    await this.handleLoader();
    this.seriesService.getSeriesByGenre(this.currentPage).subscribe(data => {
      this.isLoading?.dismiss();
      this.series = data.shows;
      this.seriesBackup = this.series;
      this.genres = data.genres;      
    });
  }

  async loadMore(ev: Event) {    
    this.currentPage++;
    await this.handleLoader();
    this.seriesService.getSeriesByGenre(this.currentPage).subscribe(data => {
      this.isLoading?.dismiss();
      this.series = data.shows;
      this.seriesBackup = this.series;
      this.genres = data.genres;
      (ev as InfiniteScrollCustomEvent).target.complete();
    });    
  }

  async search() {
    await this.handleLoader();
    this.seriesService.getSeriesBySearchTerm(this.searchQuery).subscribe(data => {
      this.isLoading?.dismiss();
      this.series = data.shows;
      this.seriesBackup = this.series;
      this.genres = data.genres;      
    });
  }

  showDetails(id: number) {
    this.navCtrl.navigateForward(`/series/${id}`);
  }

  onGenreChange(ev: CustomEvent) {
    const selectedGenres = ev.detail.value;    
    if(selectedGenres.length > 0) {
      let tmpSeries: Show[] = [];
      this.seriesBackup.forEach(serie => {
        serie.genres.forEach(genre => {
          if (selectedGenres.includes(genre)) {
            tmpSeries.push(serie);
          }
        });

      });
      this.series = tmpSeries;
    } else {
      this.series = this.seriesBackup;
    }
  }

}
