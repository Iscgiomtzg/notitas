import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './components/boards/boards.component';
import { ComponentsComponent } from './components/components.component';
import { RFormsComponent } from './components/forms/rforms/rforms.component';
import { TDFormsComponent } from './components/forms/tdforms/tdforms.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'component',
    component: ComponentsComponent,
    children: [
      { path: 'board/:id', component: BoardsComponent },
      { path: 'reactive-forms', component: RFormsComponent},
      { path: 'template-driven-forms', component: TDFormsComponent},
    ],
  },
  { path: '',   redirectTo: '/component', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
