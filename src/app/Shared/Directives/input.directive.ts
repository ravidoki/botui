// import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// @Directive({
//   selector: 'inputDirective'
// })
// export class InputDirective {
//   @Input()inputType = '^[0-9]+$';

//   constructor(private _el: ElementRef) { }

//   @HostListener('keypress', ['$event'])
//   onKeyPress(event) {
//     return new RegExp(this.inputType).test(event.key);
//   }
//   // block from even copy paste special characters
//   @HostListener('paste', ['$event'])
//   blockPaste(event: ClipboardEvent) {
//     this.validateFields(event);
//   }
//   validateFields(event: ClipboardEvent) {
//     event.preventDefault();
//     const pasteData = event.clipboardData.getData('text/plain').replace(this.inputType, '');
//     document.execCommand('insertHTML', false, pasteData);
//   }
// }

