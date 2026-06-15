import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PageHeroComponent } from '@shared/ui/page-hero/page-hero.component';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private allArticles: Article[] = [];
  articles = signal<Article[]>([]);
  activeCategoryId = signal<string | null>(null);
  activeCategoryName = signal<string | null>(null);

  ngOnInit() {
    this.allArticles = this.route.snapshot.data['articles'] ?? [];
    const categoryId = this.route.snapshot.queryParams['categoryId'] || null;
    this.applyFilter(categoryId);
  }

  private applyFilter(categoryId: string | null): void {
    this.activeCategoryId.set(categoryId);
    if (categoryId) {
      const filtered = this.allArticles.filter(a => a.categoryId === categoryId);
      this.articles.set(filtered);
      this.activeCategoryName.set(filtered[0]?.category?.name ?? null);
    } else {
      this.articles.set([...this.allArticles]);
      this.activeCategoryName.set(null);
    }
  }

  filterByCategory(event: Event, categoryId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.applyFilter(categoryId);
    this.router.navigate(['/articles'], { queryParams: { categoryId }, replaceUrl: true });
  }

  clearFilter(): void {
    this.applyFilter(null);
    this.router.navigate(['/articles'], { replaceUrl: true });
  }
}
