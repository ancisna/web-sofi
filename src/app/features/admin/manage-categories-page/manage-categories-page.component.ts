import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { Divider } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ArticleCategoryService } from '@core/services/article-category.service';
import { ArticleCategory } from '@core/models/article-category.model';

@Component({
  selector: 'manage-categories-page',
  standalone: true,
  imports: [FormsModule, Button, InputText, Textarea, Toast, Divider],
  templateUrl: './manage-categories-page.component.html',
  styleUrl: './manage-categories-page.component.css',
})
export class ManageCategoriesPageComponent implements OnInit {
  private categoryService = inject(ArticleCategoryService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  categories: ArticleCategory[] = [];
  showForm = false;
  saving = false;
  editingId: string | null = null;

  form = { name: '', slug: '', description: '', color: '#e0b7c5' };

  async ngOnInit() {
    this.categories = await this.categoryService.getAll();
  }

  generateSlug(): void {
    this.form.slug = this.form.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  openNew(): void {
    this.editingId = null;
    this.form = { name: '', slug: '', description: '', color: '#e0b7c5' };
    this.showForm = true;
  }

  openEdit(cat: ArticleCategory): void {
    this.editingId = cat.id;
    this.form = {
      name: cat.name,
      slug: cat.slug,
      description: cat.description ?? '',
      color: cat.color ?? '#e0b7c5',
    };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingId = null;
  }

  async save(): Promise<void> {
    if (!this.form.name.trim() || !this.form.slug.trim()) return;
    this.saving = true;
    try {
      if (this.editingId) {
        await this.categoryService.update(this.editingId, {
          name: this.form.name,
          slug: this.form.slug,
          description: this.form.description,
          color: this.form.color,
        });
        this.messageService.add({ severity: 'success', summary: 'Categoría actualizada' });
      } else {
        await this.categoryService.create(this.form);
        this.messageService.add({ severity: 'success', summary: 'Categoría creada' });
      }
      this.categories = await this.categoryService.getAll();
      this.cancelForm();
    } finally {
      this.saving = false;
    }
  }

  deleteCategory(cat: ArticleCategory): void {
    this.confirmationService.confirm({
      header: 'Eliminar categoría',
      message: `¿Seguro que quieres eliminar "${cat.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        await this.categoryService.delete(cat.id);
        this.categories = await this.categoryService.getAll();
        this.messageService.add({ severity: 'success', summary: 'Categoría eliminada' });
      },
    });
  }
}
