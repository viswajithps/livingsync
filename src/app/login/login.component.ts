import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  enteredemail: string = '';
  enteredpassword: string = '';
  rememberMe: boolean = false;

  // constructor() { }
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Email:', this.enteredemail);  // Check initial value
    console.log('Password:', this.enteredpassword);  // Check initial value
  }

  // Called on form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Process login (e.g., call an authentication service)
      console.log('Login successful');
      console.log('Email:', this.enteredemail);
      console.log('Password:', this.enteredpassword);
      console.log('Remember me:', this.rememberMe);
      if(this.enteredemail==='Admin'&&this.enteredpassword==='Admin@123'){
        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['/home']);
      }

      // Clear form
      form.reset();
      
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }
  }

}
