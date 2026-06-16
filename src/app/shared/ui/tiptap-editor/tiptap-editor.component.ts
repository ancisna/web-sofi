import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';

@Component({
  selector: 'app-tiptap-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TiptapEditorComponent), multi: true }],
})
export class TiptapEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorEl', { static: true }) editorEl!: ElementRef;
  @Input() placeholder = 'Escribe aquí el contenido del artículo...';

  editor!: Editor;
  showImageInput = signal(false);
  imageUrlDraft = signal('');

  private savedFrom = 0;
  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.editor = new Editor({
      element: this.editorEl.nativeElement,
      extensions: [
        StarterKit,
        Underline.configure(),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: this.placeholder }),
        Image.configure({ inline: false, allowBase64: false }),
      ],
      onUpdate: ({ editor }) => {
        this.onChange(editor.getJSON());
        this.onTouched();
      },
    });
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }

  writeValue(value: any): void {
    if (this.editor && value) {
      this.editor.commands.setContent(value, { emitUpdate: false });
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  focusEditor(): void {
    this.editor?.commands.focus();
  }

  is(type: string, attrs?: Record<string, any>): boolean {
    return this.editor?.isActive(type, attrs) ?? false;
  }

  toggleImageInput(): void {
    if (!this.showImageInput()) {
      this.savedFrom = this.editor.state.selection.from;
    }
    this.showImageInput.update(v => !v);
    this.imageUrlDraft.set('');
  }

  insertImage(): void {
    const url = this.imageUrlDraft().trim();
    if (url) {
      this.editor
        .chain()
        .focus()
        .setTextSelection(this.savedFrom)
        .setImage({ src: url })
        .run();
    }
    this.showImageInput.set(false);
    this.imageUrlDraft.set('');
  }
}
