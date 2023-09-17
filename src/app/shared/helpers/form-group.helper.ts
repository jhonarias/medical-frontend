import { FormArray, FormGroup } from '@angular/forms';

function markFormGroupAsTouched(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls)
    // @ts-ignore
    .map((x) => formGroup.controls[x])
    .forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        markFormGroupAsTouched(control);
      }
    });
}

function updateFormGroupValueAndValidity(formGroup: FormGroup | FormArray) {
  Object.keys(formGroup.controls)
    // @ts-ignore
    .map((x) => formGroup.controls[x])
    .forEach((control) => {
      control.updateValueAndValidity();

      if (control.controls) {
        updateFormGroupValueAndValidity(control);
      }
    });
}

export const formGroupHelper = {
  markFormGroupAsTouched,
  updateFormGroupValueAndValidity,
};
