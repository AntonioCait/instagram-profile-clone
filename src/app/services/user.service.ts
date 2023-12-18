import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface for User data
 */
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * Interface for Post data
 */
export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * Interface for Photo data
 */
export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * UserService is a service that provides methods to fetch User, Post and Photo data.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a User by their ID.
   * @param {number} id - The ID of the User.
   * @returns {Observable<IUser>} An Observable that contains the User data.
   */
  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${id}`);
  }

  /**
   * Fetches all Posts by a User by their ID.
   * @param {number} id - The ID of the User.
   * @returns {Observable<IPost[]>} An Observable that contains an array of Post data.
   */
  getUserPosts(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.baseUrl}/posts?userId=${id}`);
  }

  /**
   * Fetches all Photos by a User by their ID.
   * @param {number} id - The ID of the User.
   * @returns {Observable<IPhoto[]>} An Observable that contains an array of Photo data.
   */
  getUserPhotos(id: number): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>(`${this.baseUrl}/photos?albumId=${id}`);
  }
}
