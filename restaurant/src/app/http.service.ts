import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _httpClient: HttpClient) { }

  getRestaurants() {
    return this._httpClient.get('/getrestaurants');
  };
  getRestaurant(id: string) {
    return this._httpClient.get(`/getrestaurant/${id}`);
  };
  createRestaurant(data) {
    return this._httpClient.post('/createrestaurant', data);
  };
  updateRestaurant(data) {
    return this._httpClient.put('/updaterestaurant', data)
  };
  removeRestaurant(_id: string) {
    return this._httpClient.delete(`/removerestaurant/${_id}`)
  };
  createReview(data) {
    return this._httpClient.post('/createreview', data)
  }
}
