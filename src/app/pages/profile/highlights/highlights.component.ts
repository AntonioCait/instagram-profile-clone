import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IPhoto } from '../../../services/user.service';
import { Input } from '@angular/core';

/**
 * HighlightsComponent is a component that displays a selection of photos.
 * It uses the Angular Component decorator to define its selector, template, styles, and other properties.
 * It imports and uses the CommonModule and NgOptimizedImage from Angular, and the IPhoto interface from the user service.
 */
@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css',
})
export class HighlightsComponent {
  /**
   * An array of IPhoto objects that are passed to the component as an input.
   * This array is used to display the photos in the component.
   */
  @Input() highlights: IPhoto[] = [];

  /**
   * A getter method that returns a slice of the highlights array.
   * This method is used to get photos from index 7 to 10 from the highlights array.
   * @returns {IPhoto[]} An array of IPhoto objects.
   */
  get photosFrom7To10(): IPhoto[] {
    return this.highlights.slice(7, 10);
  }
}
