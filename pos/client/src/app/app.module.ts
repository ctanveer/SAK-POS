import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TableEditorComponent } from './pages/table-editor/table-editor.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { AuthRedirectPageComponent } from './pages/auth-redirect-page/auth-redirect-page.component';
import { SplashLogoComponent } from './components/splash-logo/splash-logo.component';
import { AuthInterceptor } from './interceptors/auth-interceptor/auth-interceptor.service';
import { ErrorInterceptor } from './interceptors/error-interceptor/error-interceptor.service';
import { TokenInterceptor } from './interceptors/token-interceptor/token-interceptor.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { OrderPageComponent } from './pages/order-page/order-page.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    TableEditorComponent,
    PageContainerComponent,
    TablesPageComponent,
    EditorPageComponent,
    OrderHistoryPageComponent,
    AuthRedirectPageComponent,
    SplashLogoComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzMenuModule,
    NzFormModule,
    NzSelectModule,
    NzSliderModule,
    NzInputNumberModule,
    NzMessageModule,
    NzDrawerModule,
    NzDividerModule,
    NzIconModule,
    NzInputModule,
    NzCardModule,
    NzTabsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
