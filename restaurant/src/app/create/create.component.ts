import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {
  newRestaurant: any;
  editRestaurant: any;
  errors: "";
  errors_: "";
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.newRestaurant = { name: '', cuisine: '' }
  }

  createRestaurant() {
    let tempObservable = this._httpService.createRestaurant(this.newRestaurant);
    tempObservable.subscribe(data => {
      console.log("Created a new restaurant:", data)
      if (data.hasOwnProperty("errors")) {
        //console.log('data:', data)
        if (data.hasOwnProperty("message")) {
          this.errors = data['message']
        } else {
          this.errors = data['errors']
        }
      } else {
        this.newRestaurant = data
        this.newRestaurant = { name: '', cuisine: '', show_delete: true };
        console.log("Re-directing to home");
        this._router.navigate(['/restaurants']);
      }
    })
  }

  updateRestaurant() {
    let tempObservable = this._httpService.updateRestaurant(this.editRestaurant);
    tempObservable.subscribe(data => {
      console.log('updated Restaurant:', data)
      this._router.navigate(['/restaurants'])
    })
  }

}
