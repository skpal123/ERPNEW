import {Input,Directive}from '@angular/core'
import {Validator,AbstractControl,NG_VALIDATORS}from '@angular/forms';
@Directive({
selector:'[selectListValidator]',
providers:[{
    provide:NG_VALIDATORS,
    useExisting:SelectListRequiredValidator,
    multi:true
}]
})
export class SelectListRequiredValidator implements Validator{
@Input()selectListValidator:string
validate(control:AbstractControl):{[key:string]:any}|null{
    debugger
    return control.value===this.selectListValidator?{'defaultSelected':true}:null
  }
}