import { Injectable } from '@angular/core';
import { Cruds } from './utils/cruds';
import { IPost } from '../models'


@Injectable({ providedIn: 'root' })
export class StorePosts extends Cruds<IPost> {
  override baseUrl = 'https://jsonplaceholder.typicode.com/posts';
}

