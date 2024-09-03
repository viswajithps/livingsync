import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

export interface Photo {
  url: string;
  caption: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  @Input() photos: Photo[] = [
    {url:'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',caption:"First"},
    {url:"https://images.pexels.com/photos/1306791/pexels-photo-1306791.jpeg?auto=compress&cs=tinysrgb&w=600",caption:"Second"},
    {url:"https://images.unsplash.com/photo-1632054554177-a708126072c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5pZ2h0JTIwY2x1YnxlbnwwfHwwfHx8Mg%3D%3D",caption:"Third"},
    {url:"https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=600",caption:"Fourth"},
   {url:"https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg?auto=compress&cs=tinysrgb&w=600",caption:"Fifth"},
   {url:"https://th.bing.com/th/id/OIP.KV7-L5GX5gkG2TAmT9OcOgHaE8?w=263&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",caption:"Sixth"},
   {url:"https://th.bing.com/th/id/OIP.kBwvBKH-J2LZh0HImKaTAAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",caption:"Seventh"} 
  ]; // Array of photo objects

  currentIndex: number = 0;
  autoPlayInterval: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Move to the next photo
  nextPhoto(): void {
    if (this.photos.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }
  }

  // Move to the previous photo
  prevPhoto(): void {
    if (this.photos.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    }
  }

  // Start automatic slideshow
  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextPhoto();
    }, 3000); // Change photo every 3 seconds
  }

  // Stop automatic slideshow
  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  selectPhoto(index: number): void {
    this.currentIndex = index;
  }

}
