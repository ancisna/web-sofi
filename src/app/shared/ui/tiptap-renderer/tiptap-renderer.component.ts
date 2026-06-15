import { Component, Input, OnChanges } from '@angular/core';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

@Component({
  selector: 'app-tiptap-renderer',
  standalone: true,
  imports: [],
  template: `<div class="tiptap-rendered" [innerHTML]="html"></div>`,
  styleUrl: './tiptap-renderer.component.css',
})
export class TiptapRendererComponent implements OnChanges {
  @Input() content: any;
  html = '';

  ngOnChanges() {
    if (!this.content) return;
    try {
      this.html = generateHTML(this.content, [
        StarterKit,
        Underline.configure(),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Link.configure(),
      ]);
    } catch {
      this.html = '';
    }
  }
}
