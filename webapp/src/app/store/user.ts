import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models'
import { wait } from './utils/wait';


@Injectable({ providedIn: 'root' })
export class StoreUser {
  loading: boolean = false;
  user?: IUser;

  constructor(
    private http: HttpClient
  ) {}

  async login(username: string, password: string): Promise<IUser> {
    this.loading = true;
    await wait();
    this.user = {
      id: Number((+new Date()).toString().slice(0, 3)), 
      name: username,
    }
    this.loading = false;
    return this.user;
  }

  async logout() {
    this.user = undefined
  }

}
