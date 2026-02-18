import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRedAddress]',
  standalone: true,
})
export class RedAddressDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ef4444');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600');
  }
}
