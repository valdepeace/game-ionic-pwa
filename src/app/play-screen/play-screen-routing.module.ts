import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayScreenPage } from './play-screen.page';

const routes: Routes = [
  {
    path: '',
    component: PlayScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayScreenPageRoutingModule {}
