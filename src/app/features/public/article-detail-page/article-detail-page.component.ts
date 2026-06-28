import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@core/models/article.model';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { TiptapRendererComponent } from '@shared/ui/tiptap-renderer/tiptap-renderer.component';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'article-detail-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, DateEsPipe, TiptapRendererComponent, Skeleton],
  templateUrl: './article-detail-page.component.html',
  styleUrl: './article-detail-page.component.css',
})
export class ArticleDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private seo = inject(SeoService);

  article: Article | undefined;
  related: Article[] = [];
  loading = true;

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.article = await this.articleService.getBySlug(slug);
    if (this.article) {
      this.seo.set({
        title: this.article.title,
        description: this.article.excerpt ?? this.article.title,
        image: this.article.coverImage ?? undefined,
        url: `https://sofiareyespsicologa.com/articles/${slug}`,
        type: 'article',
      });
      this.articleService.incrementViews(this.article.id);
      if (this.article.categoryId) {
        this.related = await this.articleService.getRelated(this.article.categoryId, this.article.id);
      }
    }
    this.loading = false;
  }
}
