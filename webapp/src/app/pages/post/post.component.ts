import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeoService } from '../../services/seo.service';
import { TransferStateService } from '../../services/transfer-state.service';
import { StorePosts } from '../../store/posts';
import { IPost } from '../../models';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.css' ]
})
export class PostComponent implements OnInit {

  post!: IPost;

  constructor(
    private seo: SeoService,
    private ssr: TransferStateService,
    private route: ActivatedRoute,
    private storePosts: StorePosts
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) throw new Error('id missing');

    this.post = await this.ssr.transferData(`post`, () => {
      return this.storePosts.get(id)
    });
    
    this.seo.setMeta({
      title: this.post.title,
      description: this.post.body,
    });
  }

}
