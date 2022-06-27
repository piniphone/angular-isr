import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";


@Injectable({ providedIn: null }) //para poder inyectar http...
export class Cruds<T> {

  baseUrl!: string;
  loading: boolean = false;
  loadingItem: boolean = false;
  items: T[] = [];
  item?: T;

  constructor(
    protected http: HttpClient
  ) {}

  // busqueda(s)
  async search(force: boolean = false): Promise<T[]> {
    if (this.items.length && force === false) return this.items;
    this.items = await this.apiSearch();
    return this.items;
  }
  async searchMore(): Promise<T[]> {
    this.items = [...this.items, ...await this.apiSearch()];
    return this.items;
  }

  // crud
  create(data: T): Promise<T> {
    return lastValueFrom(this.http.post<T>(this.baseUrl, data));
  }
  async get(id: string | number, cacheIt: boolean = false): Promise<T> {
    this.loadingItem = true;
    const item = await lastValueFrom(this.http.get<T>(`${this.baseUrl}/${id}`, {params: {_delay: 2000, ts: +new Date()}}))
    if (cacheIt) this.item = item;
    this.loadingItem = false;
    return item;
  }
  update(id: string | number, data: T): Promise<T> {
    return lastValueFrom(this.http.put<T>(`${this.baseUrl}/${id}`, data));
  }
  delete(id: string | number): Promise<T> {
    return lastValueFrom(this.http.delete<T>(`${this.baseUrl}/${id}`));
  }

  // resets
  reset(): void {
    this.loading = false;
    this.items = [];
  }
  resetItem(): void {
    this.item = undefined;
  }

  private async apiSearch(): Promise<T[]> {
    this.loading = true;
    const results = await lastValueFrom(this.http.get<T[]>(this.baseUrl, {params: {_delay: 2000, ts: +new Date()}}));
    this.loading = false;
    return results;
  }

}