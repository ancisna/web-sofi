import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { Divider } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ArticleService } from '@core/services/article.service';
import { ArticleCategoryService } from '@core/services/article-category.service';
import { AuthService } from '@core/services/auth.service';
import { ArticleCategory } from '@core/models/article-category.model';
import { TiptapEditorComponent } from '@shared/ui/tiptap-editor/tiptap-editor.component';

@Component({
  selector: 'article-form-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, Textarea, Select, Divider, Toast, RouterLink, TooltipModule, TiptapEditorComponent],
  templateUrl: './article-form-page.component.html',
  styleUrl: './article-form-page.component.css',
})
export class ArticleFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticleService);
  private categoryService = inject(ArticleCategoryService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = !!this.id;
  saving = false;

  categories: ArticleCategory[] = [];

  form = {
    title: '',
    slug: '',
    excerpt: '',
    content: null as any,
    coverImage: '',
    categoryId: null as string | null,
    seoTitle: '',
    seoDescription: '',
  };

  async ngOnInit() {
    this.categories = await this.categoryService.getAll();

    if (this.isEditMode && this.id) {
      const existing = await this.articleService.getById(this.id);
      if (existing) {
        this.form = {
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt ?? '',
          content: existing.content,
          coverImage: existing.coverImage ?? '',
          categoryId: existing.categoryId,
          seoTitle: existing.seoTitle ?? '',
          seoDescription: existing.seoDescription ?? '',
        };
      }
    }
  }

  generateSlug(): void {
    this.form.slug = this.form.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  isFormValid(): boolean {
    return this.form.title.trim().length > 0 && this.form.slug.trim().length > 0;
  }

  async save(): Promise<void> {
    if (!this.isFormValid()) return;
    this.saving = true;
    try {
      const payload = {
        title: this.form.title,
        slug: this.form.slug,
        excerpt: this.form.excerpt || null,
        content: this.form.content,
        coverImage: this.form.coverImage || null,
        categoryId: this.form.categoryId,
        seoTitle: this.form.seoTitle || null,
        seoDescription: this.form.seoDescription || null,
      };

      if (this.isEditMode && this.id) {
        await this.articleService.update(this.id, payload);
        this.messageService.add({ severity: 'success', summary: 'Artículo actualizado' });
      } else {
        const user = this.authService.user();
        if (!user) return;
        await this.articleService.create(payload, user.id);
        this.messageService.add({ severity: 'success', summary: 'Artículo creado' });
      }
      setTimeout(() => this.router.navigate(['/dashboard/articles']), 1000);
    } finally {
      this.saving = false;
    }
  }
}
