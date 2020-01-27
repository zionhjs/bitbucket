import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.component.html',
  styleUrls: ['./newreview.component.sass']
})
export class NewreviewComponent implements OnInit {
  reviewRestaurant: any
  newReview: any;
  errors: "";
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.newReview = { customer: '', stars: 1, description: '', restaurant_id: '' };
    this.reviewRestaurant = { _id: '', name: '', cuisine: '' };
    this.getRestaurant()
  }

  getRestaurant() {
    this._route.params.subscribe((params) => {  //refreshes every time when different params in the /edit/:id url
      let tempObservable = this._httpService.getRestaurant(params['id']);
      tempObservable.subscribe((data: any) => {
        this.reviewRestaurant = data;
        this.newReview.restaurant_id = this.reviewRestaurant._id;
        console.log('now our newReview is:', this.newReview);
        //console.log('get the reviewing restaurant:', data)
      })
    })
  }

  createReview() {
    let tempObservable = this._httpService.createReview(this.newReview);
    tempObservable.subscribe(data => {
      //console.log("Created a new Review:", data)
      if (data.hasOwnProperty("errors")) {
        console.log('data:', data)
        this.errors = data['message']
        console.log('this.error:', this.errors)
      } else {
        this.newReview = { name: '' }
        console.log("Re-directing to home")
        this._router.navigate(['/restaurants', this.reviewRestaurant._id])
      }
    })
  }

}
