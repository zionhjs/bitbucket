import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
import { NewreviewComponent } from './newreview/newreview.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'restaurants', children: [
      { path: '', component: RestaurantsComponent },
      { path: 'new', component: CreateComponent },
      //{ path: ':id/edit', component: EditComponent },
      { path: ':id', component: ReviewComponent },
      { path: ':id/review', component: NewreviewComponent }
    ]
  },
  {
    path: 'restaurants', component: RestaurantsComponent, children: [
      { path: ':id/edit', component: EditComponent },
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
