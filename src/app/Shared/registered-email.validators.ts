import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ProfileDetails } from '../models/UserLogin';

export function registeredEmailValidator(profile: ProfileDetails): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!(control.value === profile?.emailId || control.value === profile?.phoneNumber)) {
      return { pattern: true };
    }
    return null;
  };
}