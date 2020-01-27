import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.sass']
})

export class RestaurantsComponent implements OnInit {
  restaurants: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  show_delete(create_at: String) {
    var time_dif = Date.now() - new Date(create_at)
    if (time_dif < 6000) {
      setTimeout(function () {
        this.getRestaurants();
      }, 1000);
      return true;
    } else {
      return false;
    }
  }

  getRestaurants() {
    let tempObservable = this._httpService.getRestaurants();
    tempObservable.subscribe(data => {
      this.restaurants = data;
      console.log('restaurant:', data)
    })
  }

  removeRestaurant(_id: string) {
    console.log('home _id:', _id);
    let tempObservable = this._httpService.removeRestaurant(_id);
    tempObservable.subscribe(data => {
      console.log("Removed restaurant:", data);
      this.getRestaurants();
    })
  }

}



