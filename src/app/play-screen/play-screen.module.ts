import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayScreenPageRoutingModule } from './play-screen-routing.module';

import { PlayScreenPage } from './play-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayScreenPageRoutingModule
  ],
  declarations: [PlayScreenPage]
})
export class PlayScreenPageModule {

 
}
