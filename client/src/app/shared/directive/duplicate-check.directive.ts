import {Validator,NG_VALIDATORS,AbstractControl, ValidationErrors, AsyncValidator} from '@angular/forms'
import {Input,Directive} from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../../services/common/common.service';
import { DuplicateCheck } from '../../models/common/duplicate-check.model';
@Directive({
    selector:'[DuplicateCheck]',
    providers:[{
            provide:NG_VALIDATORS,
            useExisting:DuplicateCheckDirective,
            multi:true 
        }]
})
export class DuplicateCheckDirective implements AsyncValidator{
    @Input() data:string;
    duplicatecheck:DuplicateCheck={ItemName:null,TableName:null,value:null}
    constructor(private _commonService:CommonService)
    {}
    validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
        debugger
        this.duplicatecheck.TableName="tblCustomer"
        this.duplicatecheck.ItemName="customerId"
        this.duplicatecheck.value=control.value
        let index=this.data.indexOf('-');
        if(index!=0){
            let array=this.data.split('-')
            this._commonService.getDuplicateById(this.duplicatecheck).pipe(
                map(response=>{
                   return response==true?{'emailExists':true}:null
                })
            )
        }
        else{
            return null
        }
    }
}