import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriesFavoritesPageRoutingModule } from './series-favorites-routing.module';

import { SeriesFavoritesPage } from './series-favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriesFavoritesPageRoutingModule
  ],
  declarations: [SeriesFavoritesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeriesFavoritesPageModule {}
