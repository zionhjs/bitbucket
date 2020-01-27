import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  editRestaurant: any;
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.editRestaurant = { name: '', cuisine: '' };
    this.getRestaurant();
  }

  getRestaurant() {
    this._route.params.subscribe((params) => {  //refreshes every time when different params in the /edit/:id url
      let tempObservable = this._httpService.getRestaurant(params['id']);
      tempObservable.subscribe((data: any) => {
        this.editRestaurant = data;
        console.log('get the editing restaurant:', data)
      })
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
