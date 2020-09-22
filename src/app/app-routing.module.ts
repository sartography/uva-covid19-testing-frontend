import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThisEnvironment} from '../environments/environment.injectable';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 84],
    })
  ],
  exports: [RouterModule],
  providers: [
    {provide: 'APP_ENVIRONMENT', useClass: ThisEnvironment},
  ]
})
export class AppRoutingModule {
}
