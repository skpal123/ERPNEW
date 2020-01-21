import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../../models/master-settings/hr-payroll/designation.model';
import { Grade } from '../../models/master-settings/hr-payroll/grade.model';
import { SubGrade } from '../../models/master-settings/hr-payroll/sub-grade.model';
import { SalaryItem } from '../../models/master-settings/hr-payroll/salary-item.model';
import { Department } from '../../models/master-settings/hr-payroll/department.model';
import { Occupation } from '../../models/master-settings/hr-payroll/occupation.model';
import { EducationLevel } from '../../models/master-settings/hr-payroll/education-level.model';
import { LeaveType } from '../../models/master-settings/hr-payroll/leave-type.model';
import { GradeSubGradeSalaryItem } from '../../models/master-settings/hr-payroll/grade-sub-grade-salaryitem.model';

@Injectable({
  providedIn: 'root'
})
export class HrPayrollDefinationServiceService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  public getDesignationList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Designations';
    return this._httpClient.get<Designation[]>(url)
  }
  public getDesignationById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Designation/'+id;
    return this._httpClient.get<Designation>(url)
  }
  public CreateDesignation(designation:Designation){
    var url=this._defaultRoute.hrPayrollService+'Designation';
    return this._httpClient.post<Designation>(url,designation)

  }
  public UpdateDesignation(designation:Designation){
    var url=this._defaultRoute.hrPayrollService+'Designation/'+designation.Id;
    return this._httpClient.put(url,designation)
  }
  public DeleteDesignation(id:string){
    var url=this._defaultRoute.hrPayrollService+'Designation/'+id;
    return this._httpClient.delete(url)
  }
  public getGradeList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Grades';
    return this._httpClient.get<Designation[]>(url)
  }
  public getGradeById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Grade/'+id;
    return this._httpClient.get<Designation>(url)
  }
  public CreateGrade(grade:Grade){
    var url=this._defaultRoute.hrPayrollService+'Grade';
    return this._httpClient.post<Designation>(url,grade)

  }
  public UpdateGrade(grade:Grade){
    var url=this._defaultRoute.hrPayrollService+'Grade/'+grade.Id;
    return this._httpClient.put(url,grade)
  }
  public DeleteGrade(id:string){
    var url=this._defaultRoute.hrPayrollService+'Grade/'+id;
    return this._httpClient.delete(url)
  }
  public getSubGradeList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'SubGrades';
    return this._httpClient.get<SubGrade[]>(url)
  }
  public getSubGradeById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+id;
    return this._httpClient.get<SubGrade>(url)
  }
  public CreateSubGrade(subgrade:SubGrade){
    var url=this._defaultRoute.hrPayrollService+'SubGrade';
    return this._httpClient.post<SubGrade>(url,subgrade)

  }
  public UpdateSubGrade(subgrade:SubGrade){
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+subgrade.Id;
    return this._httpClient.put(url,subgrade)
  }
  public DeleteSubGrade(id:string){
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+id;
    return this._httpClient.delete(url)
  }
  public getSalaryItemList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'SalaryItems';
    return this._httpClient.get<SalaryItem[]>(url)
  }
  public getSalaryItemById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+id;
    return this._httpClient.get<SalaryItem>(url)
  }
  public CreateSalaryItem(slaryItem:SalaryItem){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem';
    return this._httpClient.post<SalaryItem>(url,slaryItem)

  }
  public UpdateSalaryItem(slaryItem:SalaryItem){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+slaryItem.Id;
    return this._httpClient.put(url,slaryItem)
  }
  public DeleteSalaryItem(id:string){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+id;
    return this._httpClient.delete(url)
  }
  public getDepartmentList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Departments';
    return this._httpClient.get<Department[]>(url)
  }
  public getDepartmentById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Department/'+id;
    return this._httpClient.get<Department>(url)
  }
  public CreateDepartment(department:Department){
    var url=this._defaultRoute.hrPayrollService+'Department';
    return this._httpClient.post<Department>(url,department)

  }
  public UpdateDepartment(department:Department){
    var url=this._defaultRoute.hrPayrollService+'Department/'+department.Id;
    return this._httpClient.put(url,department)
  }
  public DeleteDepartment(id:string){
    var url=this._defaultRoute.hrPayrollService+'Department/'+id;
    return this._httpClient.delete(url)
  }
  public getOccupationList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Occupations';
    return this._httpClient.get<Occupation[]>(url)
  }
  public getOccupationById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Occupation/'+id;
    return this._httpClient.get<Occupation>(url)
  }
  public CreateOccupation(occupation:Occupation){
    var url=this._defaultRoute.hrPayrollService+'Occupation';
    return this._httpClient.post<Occupation>(url,occupation)

  }
  public UpdateOccupation(occupation:Occupation){
    var url=this._defaultRoute.hrPayrollService+'Occupation/'+occupation.Id;
    return this._httpClient.put(url,occupation)
  }
  public DeleteOccupation(id:string){
    var url=this._defaultRoute.hrPayrollService+'Occupation/'+id;
    return this._httpClient.delete(url)
  }
  public getEducationLevelList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'EducationLevels';
    return this._httpClient.get<EducationLevel[]>(url)
  }
  public getEducationLevelById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'EducationLevel/'+id;
    return this._httpClient.get<EducationLevel>(url)
  }
  public CreateEducationLevel(oducationLevel:EducationLevel){
    var url=this._defaultRoute.hrPayrollService+'EducationLevel';
    return this._httpClient.post<EducationLevel>(url,oducationLevel)

  }
  public UpdateEducationLevel(oducationLevel:EducationLevel){
    var url=this._defaultRoute.hrPayrollService+'EducationLevel/'+oducationLevel.Id;
    return this._httpClient.put(url,oducationLevel)
  }
  public DeleteEducationLevel(id:string){
    var url=this._defaultRoute.hrPayrollService+'EducationLevel/'+id;
    return this._httpClient.delete(url)
  }
  public getLeaveTypeList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'LeaveTypes';
    return this._httpClient.get<LeaveType[]>(url)
  }
  public getLeaveTypeById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'LeaveType/'+id;
    return this._httpClient.get<LeaveType>(url)
  }
  public CreateLeaveType(leaveType:LeaveType){
    var url=this._defaultRoute.hrPayrollService+'LeaveType';
    return this._httpClient.post<LeaveType>(url,leaveType)

  }
  public UpdateLeaveType(leaveType:LeaveType){
    var url=this._defaultRoute.hrPayrollService+'LeaveType/'+leaveType.Id;
    return this._httpClient.put(url,leaveType)
  }
  public DeleteLeaveType(id:string){
    var url=this._defaultRoute.hrPayrollService+'LeaveType/'+id;
    return this._httpClient.delete(url)
  }
  public CreateGradeStepSalaryItem(gradeSubGradeSalaryItem:GradeSubGradeSalaryItem[]){
    var url=this._defaultRoute.hrPayrollService+'GradeStepSalaryItem';
    return this._httpClient.post<boolean>(url,gradeSubGradeSalaryItem)

  }
  public GetGradeStepSalaryItemByGradeId(gradeId:string){
    var url=this._defaultRoute.hrPayrollService+'gradeStepSalaryItemByGradeId/'+gradeId;
    return this._httpClient.get<GradeSubGradeSalaryItem[]>(url)
  }
  public GradeStepSalaryItemBySubgradeId(subGradeId:string){
    var url=this._defaultRoute.hrPayrollService+'gradeStepSalaryItemBySubgradeId/'+subGradeId;
    return this._httpClient.get<GradeSubGradeSalaryItem[]>(url)
  }
}