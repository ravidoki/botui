import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

  export class WhiteSpaceValidator {  
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {  
        const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }  
}  