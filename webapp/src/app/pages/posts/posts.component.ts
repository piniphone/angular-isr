import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { TransferStateService } from 'src/app/services/transfer-state.service';
import { StorePosts } from 'src/app/store/posts';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: [ './posts.component.css' ]
})
export class PostsComponent implements OnInit {

  constructor(
    private seo: SeoService,
    private ssr: TransferStateService,
    public storePosts: StorePosts,
  ) {}

  async ngOnInit() {
    this.storePosts.items = await this.ssr.transferData('posts', () => {
      return this.storePosts.search();
    });
    this.seo.setMeta({
      title: this.storePosts.items.length + ' posts',
      description: this.storePosts.items[0].body,
    });
  }


}
