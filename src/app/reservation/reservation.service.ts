import { Inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor(
    //@Inject(String) private apiUrl: string,
    private http: HttpClient
  ) {
    // this.apiUrl = "http://localhost:3000/"
  }
  //CRUD
  getReservations(): Observable<Reservation[]> {
    const res = this.http.get<Reservation[]>(
      'http://localhost:3000/reservations'
    );
    return res;
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(
      'http://localhost:3000/reservations/' + id
    );
  }

  addReservation(reservation: Reservation): Observable<void> {
    reservation.id = Date.now().toString();
    return this.http.post<void>("http://localhost:3000/reservations", reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>("http://localhost:3000/reservations/"+id)
  }

  updateReservation(id: string, reservation: Reservation): Observable<void> {
    return this.http.put<void>("http://localhost:3000/reservations/" + id, reservation);
  }
}
