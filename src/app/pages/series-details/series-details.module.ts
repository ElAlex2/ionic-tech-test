import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriesDetailsPageRoutingModule } from './series-details-routing.module';

import { SeriesDetailsPage } from './series-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriesDetailsPageRoutingModule
  ],
  declarations: [SeriesDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SeriesDetailsPageModule {}
