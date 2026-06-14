import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

@Component({
  selector: 'app-tiptap-editor',
  standalone: true,
  imports: [],
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TiptapEditorComponent), multi: true }],
})
export class TiptapEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorEl', { static: true }) editorEl!: ElementRef;
  @Input() placeholder = 'Escribe aquí el contenido del artículo...';

  editor!: Editor;
  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.editor = new Editor({
      element: this.editorEl.nativeElement,
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: this.placeholder }),
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

  is(type: string, attrs?: Record<string, any>): boolean {
    return this.editor?.isActive(type, attrs) ?? false;
  }

  run(command: () => void) { command(); }
}
