import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThisEnvironment } from '../environments/environment.injectable';
import { CountComponent } from './count/count.component';
import { PrintComponent } from './print/print.component';
import { SampleComponent } from './sample/sample.component';
import { SettingsComponent } from './settings/settings.component';
import { MultipleLabelsComponent } from './multiple-labels/multiple-labels.component';
import { DepositsComponent } from './deposits/deposits.component';
import { GraphsComponent } from './graphs/graphs.component';
import { ImportedFilesComponent } from './imported-files/imported-files.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SampleComponent
  },
  {
    path: 'dashboard',
    component: SidebarComponent,
    children: [
      {
        path: '', // child route path
        component: GraphsComponent, // child route component that the router renders
      },
      {
        path: 'graphs', // child route path
        component: GraphsComponent, // child route component that the router renders
      },
      {
        path: 'imports',
        component: ImportedFilesComponent
      },
      {
        path: 'deposits',
        component: DepositsComponent
      },
    ],
  },
  {
    path: 'sample',
    pathMatch: 'full',
    component: SampleComponent
  },
  {
    path: 'print',
    pathMatch: 'full',
    component: PrintComponent
  },
  {
    path: 'count',
    pathMatch: 'full',
    component: CountComponent
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent
  },
  {
    path: 'multiple',
    pathMatch: 'full',
    component: MultipleLabelsComponent
  }
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
    { provide: 'APP_ENVIRONMENT', useClass: ThisEnvironment },
  ]
})
export class AppRoutingModule {
}
