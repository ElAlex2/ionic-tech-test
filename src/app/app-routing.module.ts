import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'series',
    pathMatch: 'full'
  },
  {
    path: 'series',
    loadChildren: () => import('./pages/series/series.module').then( m => m.SeriesPageModule)
  },
  {
    path: 'series/:id',
    loadChildren: () => import('./pages/series-details/series-details.module').then( m => m.SeriesDetailsPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/series-favorites/series-favorites.module').then( m => m.SeriesFavoritesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
