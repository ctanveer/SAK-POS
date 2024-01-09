import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TableEditorComponent } from './pages/table-editor/table-editor.component';


const routes: Routes = [
  {path: 'homepage', component: HomepageComponent, pathMatch: 'full'},
  {path: 'table-editor', component: TableEditorComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/homepage'}
];

//use a page


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
