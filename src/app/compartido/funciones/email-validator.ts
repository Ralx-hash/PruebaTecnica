import { AbstractControl, ValidationErrors } from '@angular/forms';

//funcion valiadora personalizada para validar emails con tildes y acentos
//angular tiene un validador de email pero no permite caracteres con tildes
//hay emails con tilded porque los correos se crearon a partir de los nombres
export function emailConTildesValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  
  if (!email) {
    return null; 
  }
  

  const emailPattern = /^[a-zA-ZÀ-ÿ0-9._%+-]+@[a-zA-ZÀ-ÿ0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailPattern.test(email)) {
    return { 'emailInvalido': true };
  }
  
  return null;
}