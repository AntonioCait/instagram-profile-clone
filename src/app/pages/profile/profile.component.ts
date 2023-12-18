import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user.service';
import { IUser, IPost, IPhoto } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { HighlightsComponent } from './highlights/highlights.component';

/**
 * ProfileComponent is a component that displays a user's profile.
 * It uses the Angular Component decorator to define its selector, template, styles, and other properties.
 * It imports and uses the CommonModule, NgOptimizedImage from Angular, the UserService, IUser, IPost, IPhoto interfaces from the user service, and the Subscription from rxjs.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HighlightsComponent, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  /**
   * The user object that will be displayed in the profile.
   * It can be undefined if the user data has not been fetched yet.
   */
  user: IUser | undefined;

  /**
   * An array of IPost objects that represent the posts of the user.
   */
  userPosts: IPost[] = [];

  /**
   * An array of IPhoto objects that represent the photos of the user.
   */
  userPhotos: IPhoto[] = [];

  /**
   * Subscriptions to the user, photos, and posts data fetches.
   * These are used to unsubscribe from the observables when the component is destroyed.
   */
  userSubscription: Subscription | undefined;
  photosSubscription: Subscription | undefined;
  postsSubscription: Subscription | undefined;

  /**
   * A string that represents a random emoji.
   * This is used to display a random emoji in the user's profile.
   */
  randomEmoji: string = '';

  /**
   * The constructor of the ProfileComponent.
   * It injects the UserService into the component.
   */
  constructor(private userService: UserService) {}

  /**
   * The ngOnInit lifecycle hook.
   * It fetches the user, photos, and posts data when the component is initialized.
   * It also generates a random emoji.
   */
  ngOnInit() {
    this.userSubscription = this.userService
      .getUser(Math.floor(Math.random() * 10) + 1)
      .subscribe({
        next: (user: IUser) => {
          this.user = user;
          console.log('user', user);

          this.photosSubscription = this.userService
            .getUserPhotos(user.id)
            .subscribe({
              next: (photos: IPhoto[]) => {
                this.userPhotos = photos;
                console.log('photos', photos);

                this.postsSubscription = this.userService
                  .getUserPosts(user.id)
                  .subscribe({
                    next: (posts: IPost[]) => {
                      this.userPosts = posts;
                      console.log('posts', posts);
                    },
                    error: (error: any) => {
                      console.error('Error fetching posts:', error);
                    },
                  });
              },
              error: (error: any) => {
                console.error('Error fetching photos:', error);
              },
            });
        },
        error: (error: any) => {
          console.error('Error fetching user:', error);
        },
      });

    this.generateRandomEmoji();
  }

  /**
   * A method that generates a random emoji.
   * It assigns a random emoji to the randomEmoji property.
   */
  generateRandomEmoji() {
    this.randomEmoji = String.fromCodePoint(
      Math.floor(Math.random() * 68) + 128512,
    );
  }

  /**
   * The ngOnDestroy lifecycle hook.
   * It unsubscribes from the user, photos, and posts data fetches when the component is destroyed.
   */
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
    }
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
