import { Directive } from '@angular/core'
import { AsyncValidator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { CommonService } from '../../services/common/common.service';
import { NavigationDataService } from '../../services/common/navigation-data.service';
import { DuplicateCheck } from '../../models/common/duplicate-check.model';
@Directive({
    selector: '[subgradeCheck]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: EmployeeSubGradeExistingCheckAsyncValidator,
        multi: true
    }, CommonService]
})
export class EmployeeSubGradeExistingCheckAsyncValidator implements AsyncValidator {
    duplicatecheck: DuplicateCheck = { ItemName: null, TableName: null, value: null }
    constructor(private _commonService: CommonService,
        private _navigationDataService: NavigationDataService) { }
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        debugger
        this.duplicatecheck.TableName = "EmployeeSubGrade"
        this.duplicatecheck.ItemName = "subgradeId"
        this.duplicatecheck.value = control.value
        if (this._navigationDataService.IsUpdate) {
            this._navigationDataService.IsUpdate = false;
            return null;
        }
        else if (control.value == this._navigationDataService.PreviousData) {
            return null;
        }
        else if (this._navigationDataService.IsUpdate) {
            this._navigationDataService.IsUpdate = false;
            return new Observable(obj => {
                return null
            })
        }
        else if (control.value == this._navigationDataService.PreviousData) {
            return new Observable(obj => {
                return null
            })
        }
        else {
            return control.valueChanges
                .pipe(
                    debounceTime(1000),
                    distinctUntilChanged(),
                    switchMap(value => this._commonService.getDuplicateById(this.duplicatecheck)),
                    map((unique: boolean) => (
                        unique == false ? null : { 'exists': true })
                    ),
                    first()
                ); // important to make observable finite
        }
    }
}