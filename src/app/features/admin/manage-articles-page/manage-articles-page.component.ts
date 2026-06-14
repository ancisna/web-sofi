import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { ArticleService } from '@core/services/article.service';
import { Article } from '@core/models/article.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DateEsPipe } from '@shared/pipes/date-es.pipe';

@Component({
  selector: 'manage-articles-page',
  standalone: true,
  imports: [Button, RouterLink, FormsModule, ToggleSwitch, Toast, DateEsPipe],
  templateUrl: './manage-articles-page.component.html',
  styleUrl: './manage-articles-page.component.css',
})
export class ManageArticlesPageComponent implements OnInit {
  private articleService = inject(ArticleService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  articles: Article[] = [];

  async ngOnInit() {
    this.articles = await this.articleService.getAll();
  }

  async togglePublish(article: Article): Promise<void> {
    if (article.status === 'published') {
      await this.articleService.unpublish(article.id);
      article.status = 'draft';
      this.messageService.add({ severity: 'info', summary: 'Artículo despublicado' });
    } else {
      await this.articleService.publish(article.id);
      article.status = 'published';
      this.messageService.add({ severity: 'success', summary: 'Artículo publicado' });
    }
  }

  deleteArticle(article: Article): void {
    this.confirmationService.confirm({
      header: 'Eliminar artículo',
      message: `¿Seguro que quieres eliminar "${article.title}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        await this.articleService.delete(article.id);
        this.articles = await this.articleService.getAll();
        this.messageService.add({ severity: 'success', summary: 'Artículo eliminado' });
      },
    });
  }
}
