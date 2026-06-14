import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@core/models/article.model';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';
import { TiptapRendererComponent } from '@shared/ui/tiptap-renderer/tiptap-renderer.component';

@Component({
  selector: 'article-detail-page',
  standalone: true,
  imports: [RouterLink, ButtonModule, DateEsPipe, TiptapRendererComponent],
  templateUrl: './article-detail-page.component.html',
  styleUrl: './article-detail-page.component.css',
})
export class ArticleDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);

  article: Article | undefined;
  related: Article[] = [];

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.article = await this.articleService.getBySlug(slug);
    if (this.article?.categoryId) {
      this.related = await this.articleService.getRelated(this.article.categoryId, this.article.id);
    }
  }
}
