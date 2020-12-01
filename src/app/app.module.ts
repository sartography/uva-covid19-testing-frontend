import {APP_BASE_HREF, PlatformLocation} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormlyModule} from '@ngx-formly/core';
import {QRCodeSVGModule} from 'ngx-qrcode-svg';
import {ThisEnvironment} from '../environments/environment.injectable';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarcodeSvgDirective} from './barcode-svg/barcode-svg.directive';
import {CountComponent} from './count/count.component';
import {FooterComponent} from './footer/footer.component';
import {CircleQRcodeDoubleComponent} from './label-layout/formats/circle-qrcode-double/circle-qrcode-double.component';
import {CircleQRcodeSingleComponent} from './label-layout/formats/circle-qrcode-single/circle-qrcode-single.component';
import {RectangleCode128Component} from './label-layout/formats/rectangle-code128/rectangle-code128.component';
import {RectangleDatamatrixComponent} from './label-layout/formats/rectangle-datamatrix/rectangle-datamatrix.component';
import {LabelLayoutComponent} from './label-layout/label-layout.component';
import {LoadingComponent} from './loading/loading.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PrintLayoutComponent} from './print-layout/print-layout.component';
import {PrintComponent} from './print/print.component';
import {SampleComponent} from './sample/sample.component';
import {ApiService} from './services/api.service';
import {CacheService} from './services/cache.service';
import {SettingsService} from './services/settings.service';
import {SettingsComponent} from './settings/settings.component';
import { MultipleLabelsComponent } from './multiple-labels/multiple-labels.component';

/**
 * This function is used internal to get a string instance of the `<base href="" />` value from `index.html`.
 * This is an exported function, instead of a private function or inline lambda, to prevent this error:
 *
 * `Error encountered resolving symbol values statically.`
 * `Function calls are not supported.`
 * `Consider replacing the function or lambda with a reference to an exported function.`
 *
 * @param platformLocation an Angular service used to interact with a browser's URL
 * @return a string instance of the `<base href="" />` value from `index.html`
 */
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  declarations: [
    AppComponent,
    BarcodeSvgDirective,
    CircleQRcodeDoubleComponent,
    CircleQRcodeSingleComponent,
    CountComponent,
    FooterComponent,
    LabelLayoutComponent,
    LoadingComponent,
    MultipleLabelsComponent,
    NavbarComponent,
    PrintComponent,
    PrintLayoutComponent,
    RectangleCode128Component,
    RectangleDatamatrixComponent,
    SampleComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormlyModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    QRCodeSVGModule,
    ReactiveFormsModule,
    AppRoutingModule, // <-- This line MUST be last (https://angular.io/guide/router#module-import-order-matters)
  ],
  providers: [
    ApiService,
    CacheService,
    SettingsService,
    {provide: 'APP_ENVIRONMENT', useClass: ThisEnvironment},
    {provide: APP_BASE_HREF, useFactory: getBaseHref, deps: [PlatformLocation]},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
