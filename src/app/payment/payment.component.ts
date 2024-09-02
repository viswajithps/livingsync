import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

interface Payment {
  orderId: string;
  date: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  title = 'Maintenance Fee';
  totalAmount = 12000;
  payments: Payment[] = [
    { orderId: '#15267', date: 'Mar 1, 2023', amount: 100, status: 'Success' },
    { orderId: '#153587', date: 'Jan 26, 2023', amount: 300, status: 'Success' },
    { orderId: '#12436', date: 'Feb 12, 2023', amount: 100,  status: 'Success' },
    { orderId: '#16879', date: 'Feb 12, 2023', amount: 500, status: 'Rejected' },
    { orderId: '#16378', date: 'Feb 28, 2023', amount: 500, status: 'Rejected' },
    { orderId: '#16609', date: 'Mar 13, 2023', amount: 500, status: 'Success' },
    { orderId: '#16907', date: 'Mar 18, 2023', amount: 100,  status: 'Pending' },
  ];

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'success':
        return 'text-success';
      case 'rejected':
        return 'text-danger';
      case 'pending':
        return 'text-warning';
      default:
        return '';
    }
  }

}
