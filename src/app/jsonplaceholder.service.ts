import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http:HttpClient) { }
  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/users`)
  }
  
  // add users
  addUsers(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }
  // delete user
  deleteUsers(id:any){
    return this.http.delete(`${this.apiUrl}/users/${id}`)
  }
  // get user id
  getUserById(id:number){
    return this.http.get(`${this.apiUrl}/users/${id}`)
  }
  // edit user
  updateUsers(id:number,data:any){
    return this.http.put(`${this.apiUrl}/users/${id}`,data)
  }
}
