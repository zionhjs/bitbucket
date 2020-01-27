import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.sass']
})
export class ReviewComponent implements OnInit {
  reviewRestaurant: any;
  reviews: any;
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.reviewRestaurant = { name: '', cuisine: '', reviews: [] }
    this.getRestaurant()
  }
  getRestaurant() {
    this._route.params.subscribe((params) => {  //refreshes every time when different params in the /edit/:id url
      let tempObservable = this._httpService.getRestaurant(params['id']);
      tempObservable.subscribe((data: any) => {
        console.log('data', data)
        this.reviews = data["reviews"];

        //console.log('old_reviews', this.reviews)

        //bubble sort
        for (var i = 0; i < this.reviews.length - 1; i++) {
          var done = true
          for (var j = 0; j < this.reviews.length - 1 - i; j++) {
            if (this.reviews[j]["stars"] <= this.reviews[j + 1]["stars"]) {
              var temp_review = this.reviews[j];
              this.reviews[j] = this.reviews[j + 1]
              this.reviews[j + 1] = temp_review;
              done = false;
            }
          }
          if (done) {
            break;
          }
        }
        //console.log('new_reviews', this.reviews);
        this.reviewRestaurant = data;
      })
    })
  }

}
