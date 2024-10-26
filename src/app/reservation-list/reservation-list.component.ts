import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private reservationService: ReservationService) {}
  reservations: Reservation[] = [];

  ngOnInit(): void {
      this.reservationService.getReservations().subscribe(reservations => {
        this.reservations = reservations
      })
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      alert('The reservation was deleted successfully')
    });
  }
}
