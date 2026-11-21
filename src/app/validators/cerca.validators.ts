import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { ReceptesApiService } from '../services/receptes-api.service';

export function termeCercaValidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = String(control.value ?? '');

    if (valor.length === 0) {
      return null;
    }

    const net = valor.trim();

    if (net.length === 0) {
      return { nomesEspais: true };
    }

    if (net.length < 3) {
      return { massaCurt: { minim: 3, actual: net.length } };
    }

    if (/[<>{}]/.test(net)) {
      return { caractersNoPermesos: true };
    }

    return null;
  };
}

export function termeExistentApiValidator(receptesService: ReceptesApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const net = String(control.value ?? '').trim();

    if (net.length < 3) {
      return of(null);
    }

    return timer(350).pipe(
      switchMap(() => receptesService.comprovarTermeTeResultats(net)),
      map((teResultats) => (teResultats ? null : { senseResultatsApi: true })),
      catchError(() => of(null))
    );
  };
}