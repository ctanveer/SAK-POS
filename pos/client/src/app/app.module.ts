import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { RouterLink } from '@angular/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableDetailsComponent } from './components/table-details/table-details.component';
import { OrderStationComponent } from './pages/order-station/order-station.component';
import { TableSetterPageComponent } from './pages/table-setter-page/table-setter-page.component';
import en from '@angular/common/locales/en';
import { OrderPageComponent } from './pages/order-page/order-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableDetailsComponent,
    OrderStationComponent,
    TableSetterPageComponent,
    OrderPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzButtonComponent,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzSliderModule,
    NzInputNumberModule,
    NzIconModule,
    HttpClientModule,
    CoreShapeComponent,
    StageComponent,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
