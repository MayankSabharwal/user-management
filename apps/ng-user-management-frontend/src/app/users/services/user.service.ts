import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3001/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> { return this.http.get<User[]>(this.api); }
  addUser(user: User): Observable<User> { return this.http.post<User>(this.api, user); }
  updateUser(user: User): Observable<User> { return this.http.put<User>(`${this.api}/${user.id}`, user); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
