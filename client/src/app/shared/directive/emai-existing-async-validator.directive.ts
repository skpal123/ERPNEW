import {Input,Directive}from '@angular/core'
import {AsyncValidator,AbstractControl,NG_VALIDATORS, NG_ASYNC_VALIDATORS, ValidationErrors}from '@angular/forms'
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { CustomValidationServiceService } from '../../services/common/custom-validation-service.service';
@Directive({
selector:'[emailExistingValidator]',
providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:EmailExistingCheckAsyncValidator,
    multi:true
},CustomValidationServiceService]
})
export class EmailExistingCheckAsyncValidator implements AsyncValidator{
    constructor(private _customValidationService:CustomValidationServiceService){}
validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
    debugger
    return control.valueChanges
    .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(value => this._customValidationService.checkEmailDuplicate(control.value)),
        map((unique: boolean) => (
            unique == false ? null : {'emailExists':true})
        ),
        first()
    ); // important to make observable finite
}
}