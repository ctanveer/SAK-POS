import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TableEditorComponent } from './pages/table-editor/table-editor.component';
import { PageContainerComponent } from './pages/page-container/page-container.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { EditorPageComponent } from './pages/editor-page/editor-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { AuthRedirectPageComponent } from './pages/auth-redirect-page/auth-redirect-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';

const routes: Routes = [
  {path: 'homepage', component: HomepageComponent, pathMatch: 'full'},
  {path: 'editor', component: TableEditorComponent, pathMatch: 'full'},
  {path: 'auth-redirect', component: AuthRedirectPageComponent, pathMatch: 'full'},
  {path: 'order', component: OrderPageComponent, pathMatch: 'full'},
  {path: '', component: PageContainerComponent, children: [
    {path: 'tables', component: TablesPageComponent, pathMatch: 'full'},
    {path: 'table-editor', component: EditorPageComponent, pathMatch: 'full'},
    {path: 'order-history', component: OrderHistoryPageComponent, pathMatch: 'full'},
    {path: 'reservations', component: ReservationPageComponent, pathMatch: 'full'},
    {path: '**', redirectTo: '/tables'}
  ]},
  {path: '**', redirectTo: '/tables'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
