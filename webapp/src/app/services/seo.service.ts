import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


export interface SeoConfiguration {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  setMeta(metadata: SeoConfiguration): void {
    if (metadata.title) {
      this.title.setTitle(metadata.title.substring(0, 160));
      this.meta.addTag({property: 'og:title', content: metadata.title});
    }
    if (metadata.description) {
      this.meta.addTag({property: 'og:description', content: metadata.description});
    }
    if (metadata.image) {
      this.meta.addTag({property: 'og:image', content: metadata.image});
    }
    if (metadata.type) {
      this.meta.addTag({property: 'og:type', content: metadata.type});
    }
  }

}



// <!--  Essential META Tags -->
// <meta property="og:title" content="European Travel Destinations">
// <meta property="og:type" content="article" />
// <meta property="og:image" content="http://euro-travel-example.com/thumbnail.jpg">
// <meta property="og:url" content="http://euro-travel-example.com/index.htm">
// <meta name="twitter:card" content="summary_large_image">
// <!--  Non-Essential, But Recommended -->
// <meta property="og:description" content="Offering tour packages for individuals or groups.">
// <meta property="og:site_name" content="European Travel, Inc.">
// <meta name="twitter:image:alt" content="Alt text for image">
// <!--  Non-Essential, But Required for Analytics -->
// <meta property="fb:app_id" content="your_app_id" />
// <meta name="twitter:site" content="@website-username">
