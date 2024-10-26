import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //This should match the formControl in the html
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService
        .getReservation(id)
        .subscribe((reservation: Reservation) => {
          if (reservation) {
            this.reservationForm.patchValue(reservation);
          }
        });
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      const id = this.activateRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService
          .updateReservation(id, this.reservationForm.value)
          .subscribe(() => {
            alert('The reservation was updated successfullly');
          });
      } else {
        this.reservationService
          .addReservation(this.reservationForm.value)
          .subscribe(() => {
            alert('The reservation was added successfully');
          });
      }
      this.router.navigate(['/list']);
    }
  }
}
