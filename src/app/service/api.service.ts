import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any>{
    return this.http.get<any>(`${environment.url}/products`).pipe(map((data:any) => {
      return data;
    }))
  }
}
