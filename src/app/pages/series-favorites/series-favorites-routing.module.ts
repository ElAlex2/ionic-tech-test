import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesFavoritesPage } from './series-favorites.page';

const routes: Routes = [
  {
    path: '',
    component: SeriesFavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesFavoritesPageRoutingModule {}
