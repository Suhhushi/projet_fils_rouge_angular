import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private isAdmin = false;

  setAdminStatus(status: boolean): void {
    this.isAdmin = status;
  }

  getAdminStatus(): boolean {
    return this.isAdmin;
  }
}
