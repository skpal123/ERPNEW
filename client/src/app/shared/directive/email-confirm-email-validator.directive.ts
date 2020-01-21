import {Input,Directive}from '@angular/core'
import {Validator,AbstractControl,NG_VALIDATORS}from '@angular/forms'
@Directive({
selector:'[emailConfirmEmailCheckValidator]',
providers:[{
    provide:NG_VALIDATORS,
    useExisting:EmailConfirmEmailRequiredValidator,
    multi:true
}]
})
export class EmailConfirmEmailRequiredValidator implements Validator{
@Input()emailConfirmEmailCheckValidator:string
validate(control:AbstractControl):{[key:string]:any}|null{
    const emailControl=control.parent.get(this.emailConfirmEmailCheckValidator);
    if(emailControl&&emailControl.value===control.value){
       null
    }
    else{
        return {'notEqual':true}  
    }
}
}