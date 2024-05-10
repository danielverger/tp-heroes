import { Directive, ElementRef, EventEmitter, HostListener, Output, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[uppercase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UpperCaseDirective),
      multi: true
    }
  ]
})

export class UpperCaseDirective implements ControlValueAccessor{
  public ref = inject(ElementRef);
  private onChange!: (value: any) => void;
  private onTouched!: () => void;
  public value!: string;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter()
  
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.ref.nativeElement.value = value.toUpperCase();
    const transformedValue = value.toUpperCase();
    this.onChange && this.onChange(transformedValue);
    this.onTouched && this.onTouched();
  }

  writeValue(value: any): void {
    this.ref.nativeElement.value = value.toUpperCase();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}