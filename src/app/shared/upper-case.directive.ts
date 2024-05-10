import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[uppercase]'
})

export class UpperCaseDirective {
  public ref = inject(ElementRef);

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.ref.nativeElement.value = value.toUpperCase();
  }
}