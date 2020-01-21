import { GradeSubGradeSalItem } from "./grade-subgrade-salitem.model";
import { SalaryItem } from "./salary-item.model";

export class GradeSubGradeSalItemDetails{
    public Grade_Id?:string;
    public SubGrade_Id?:string;
    public GradeName?:string;
    public SubGradeName?:string;
    public GradeSubGradeSalItemList?:GradeSubGradeSalItem[]
    public SalaryItemList?:SalaryItem[]
}