import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {

constructor(private router: Router){}
  navigateToFeature(feature: string) {
    // Navigate to the route based on the feature parameter
    this.router.navigate([`/${feature}`]);
 
  }

}
