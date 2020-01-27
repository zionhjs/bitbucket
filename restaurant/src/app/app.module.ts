import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//http
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//components
import { CreateComponent } from './create/create.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
import { NewreviewComponent } from './newreview/newreview.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    PagenotfoundComponent,
    RestaurantsComponent,
    EditComponent,
    ReviewComponent,
    NewreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // <-- register FormsModule with our app.
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
