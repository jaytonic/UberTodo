import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalsToOtherControl(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentControlValue = control.value;
    const otherControleValue = control.root.get(otherControlName)?.value;
    if(currentControlValue !== otherControleValue){
        return {
            equalsToOtherControl: false
        }
    }
    return null;
  };
}
