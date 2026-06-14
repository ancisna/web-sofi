import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@core/models/article.model';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';

@Component({
  selector: 'articles-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, DateEsPipe],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css',
})
export class ArticlesPageComponent implements OnInit {
  private articleService = inject(ArticleService);
  articles: Article[] = [];

  async ngOnInit() {
    this.articles = await this.articleService.getPublished();
  }
}
