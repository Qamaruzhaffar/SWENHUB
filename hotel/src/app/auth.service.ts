import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  regUser(EmployeeName: string, password: string, EmployeeContact: number, role: string, EmiloyeeEmail: string, eMailingAddress: string, eAccountNumber: string) {
    return this.http.get('/api/reguser/' + EmployeeName + "/" + password + "/" + EmployeeContact + "/" + role + "/" + EmiloyeeEmail + "/" + eMailingAddress + "/" + eAccountNumber);
  }

  authUser(EmployeeName: string, password: string) {
    return this.http.get('/api/authuser/' + EmployeeName + "/" + password);
  }

  setSecureToken(secure_token: string) {
    sessionStorage.setItem("LoggedIn", secure_token)
  }

  getSecureToken() {
    return sessionStorage.getItem("LoggedIn")
  }

  setUserRole(role: string) {
    sessionStorage.setItem("UserRole", role);
  }

  getUserRole() {
    return sessionStorage.getItem("UserRole")
  }
  logout() {
    sessionStorage.removeItem("LoggedIn");
    sessionStorage.removeItem("UserRole");
  }

  isLoggedIn() {     
    return this.getSecureToken() !== null;   
  }      
  isAdmin() {   
    return (this.getUserRole() == "admin");   
  }      
  isUser() {    
    return (this.getUserRole() == "user" || this.getUserRole() == "admin");   
  }

  addroom (roomNum: string, roomStatus: string, BookingId: string) {
    return this.http.post<any[]>('./api/room/', {
      'roomNum': roomNum, 'roomStatus': roomStatus, 'BookingId': BookingId
    });
  }
  getstatus() { return this.http.get<any[]>('./api/room'); }

  upstatus(id: number, roomStatus: string, BookingId: string) {
    return this.http.put<any[]>('./api/uproom/' + id,
      { 'roomStatus': roomStatus, 'BookingId': BookingId });
  }
  
}
