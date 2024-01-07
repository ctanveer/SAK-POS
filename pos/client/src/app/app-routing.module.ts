import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderStationComponent } from './pages/order-station/order-station.component';
import { TableSetterPageComponent } from './pages/table-setter-page/table-setter-page.component';

const routes: Routes = [
  { path: 'order', component: OrderStationComponent, pathMatch: 'full' },
  { path: 'table-setter', component: TableSetterPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/order'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
