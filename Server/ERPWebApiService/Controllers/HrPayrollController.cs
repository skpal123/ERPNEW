using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using ERP.DataService.Model;
using ERP.DataService.Model.Model;
using ERPWebApiService.Authentication;
using ERPWebApiService.DataConnection;
using ERPWebApiService.Exceptions;
using ViewModel.Model;
using ViewModel.Model.HrPayroll;

namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/HrPayrollService")]
    public class HrPayrollController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("Designation")]
        [HttpPost]
        public HttpResponseMessage CreateDesignation(DesignationInfo desigantionInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designation = new Designation()
                {
                    Id = Guid.NewGuid().ToString(),
                    DesignationId = desigantionInfo.DesignationId,
                    DesignationName = desigantionInfo.DesignationName,
                    Description = desigantionInfo.Description
                };
                ERPContext.Designations.Add(designation);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, designation);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Designation/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateDesignation(string id,DesignationInfo desigantionInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oDesignation = ERPContext.Designations.FirstOrDefault(x => x.Id == desigantionInfo.Id);
                if (oDesignation != null)
                {
                    var designation = new Designation()
                    {
                        Id = oDesignation.Id,
                        DesignationId = desigantionInfo.DesignationId,
                        DesignationName = desigantionInfo.DesignationName,
                        Description = desigantionInfo.Description
                    };
                    ERPContext.Designations.AddOrUpdate(designation);
                    ERPContext.SaveChanges();
                }
               
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Designations")]
        [HttpGet]
        public HttpResponseMessage GetDesignationList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.Designations.Select(x => new DesignationInfo()
                {
                    Id = x.Id,
                    DesignationId = x.DesignationId,
                    DesignationName = x.DesignationName,
                    Description = x.Description
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Designation/{id}")]
        [HttpGet]
        public HttpResponseMessage GetDesignationById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.Designations.Where(x=>x.Id==id).Select(x => new DesignationInfo()
                {
                    Id = x.Id,
                    DesignationId = x.DesignationId,
                    DesignationName = x.DesignationName,
                    Description = x.Description
                }).ToList().FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Designation/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteDesigantion(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Designation where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grade")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeGrade(EmployeeGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var grade = new EmployeeGrade()
                {
                    Id = Guid.NewGuid().ToString(),
                    GradeId = employeeGradeInfo.GradeId,
                    GradeName = employeeGradeInfo.GradeName,
                };
                ERPContext.EmployeeGrades.Add(grade);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, grade);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grade/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeGrade(string id, EmployeeGradeInfo gradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oGrade = ERPContext.EmployeeGrades.FirstOrDefault(x => x.Id == gradeInfo.Id);
                if (oGrade != null)
                {
                    var grade = new EmployeeGrade()
                    {
                        Id = oGrade.Id,
                        GradeId = gradeInfo.GradeId,
                        GradeName = gradeInfo.GradeName,
                    };
                    ERPContext.EmployeeGrades.AddOrUpdate(grade);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grades")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeGradeList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.EmployeeGrades.Select(x => new EmployeeGradeInfo()
                {
                    Id = x.Id,
                    GradeId = x.GradeId,
                    GradeName = x.GradeName,
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grade/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeGradeById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.EmployeeGrades.Where(x => x.Id == id).Select(x => new EmployeeGradeInfo()
                {
                    Id = x.Id,
                    GradeId = x.GradeId,
                    GradeName = x.GradeName,
                }).ToList().FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Grade/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteGrade(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from EmployeeGrade where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrade")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeSubGrade(EmployeeSubGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var subgrade = new EmployeeSubGrade()
                {
                    Id = Guid.NewGuid().ToString(),
                    SubGradeId = employeeGradeInfo.SubGradeId,
                    Grade_Id = employeeGradeInfo.Grade_Id,
                    SubGradeName = employeeGradeInfo.SubGradeName,
                    EeectiveDate = employeeGradeInfo.EeectiveDate
                };
                ERPContext.EmployeeSubGrades.Add(subgrade);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrade/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeSubGrade(string id, EmployeeSubGradeInfo employeeGradeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oSubGrade = ERPContext.EmployeeSubGrades.FirstOrDefault(x => x.Id == employeeGradeInfo.Id);
                if (oSubGrade != null)
                {
                    var subgrade = new EmployeeSubGrade()
                    {
                        Id = oSubGrade.Id,
                        SubGradeId = employeeGradeInfo.SubGradeId,
                        Grade_Id = employeeGradeInfo.Grade_Id,
                        SubGradeName = employeeGradeInfo.SubGradeName,
                        EeectiveDate = employeeGradeInfo.EeectiveDate
                    };
                    ERPContext.EmployeeSubGrades.AddOrUpdate(subgrade);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrades")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSubGradeList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                List<EmployeeSubGradeInfo> employeeSubGradeInfos = new List<EmployeeSubGradeInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select b.Id,b.SubGradeId,b.SubGradeName,b.Grade_Id,b.EeectiveDate,a.GradeName from EmployeeGrade
                                                    a inner join EmployeeSubGrade b on a.Id=b.Grade_Id", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        EmployeeSubGradeInfo employeeSubGradeInfo = new EmployeeSubGradeInfo();
                        employeeSubGradeInfo.Id = (rdr["Id"].ToString());
                        employeeSubGradeInfo.SubGradeId = rdr["SubGradeId"] != DBNull.Value ? rdr["SubGradeId"].ToString() : null;
                        employeeSubGradeInfo.SubGradeName = rdr["SubGradeName"] != DBNull.Value ? rdr["SubGradeName"].ToString() : null;
                        employeeSubGradeInfo.Grade_Id = rdr["Grade_Id"] != DBNull.Value ? rdr["Grade_Id"].ToString() : null;
                        employeeSubGradeInfo.GradeName = rdr["GradeName"] != DBNull.Value ? rdr["GradeName"].ToString() : null;
                        if (rdr["EeectiveDate"] != DBNull.Value)
                        {
                            employeeSubGradeInfo.EeectiveDate = Convert.ToDateTime(rdr["EeectiveDate"]);
                        }
                        employeeSubGradeInfos.Add(employeeSubGradeInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, employeeSubGradeInfos);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrade/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSubGradeById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var subgrade = ERPContext.EmployeeSubGrades.Where(x => x.Id == id).Select(x => new EmployeeSubGradeInfo()
                {
                    Id = x.Id,
                    SubGradeId = x.SubGradeId,
                    Grade_Id = x.Grade_Id,
                    SubGradeName = x.SubGradeName,
                    EeectiveDate = x.EeectiveDate
                }).FirstOrDefault();
                if (subgrade!=null)
                {
                    var grade = ERPContext.EmployeeGrades.FirstOrDefault(x => x.Id == subgrade.Grade_Id);
                    subgrade.GradeName = grade!=null?grade.GradeName:null;
                }
                return Request.CreateResponse(HttpStatusCode.OK, subgrade);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubGrade/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSubGrade(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from EmployeeSubGrade where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItem")]
        [HttpPost]
        public HttpResponseMessage CreateEmployeeSalaryItem(SalaryItemInfo salaryItemInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItem = new SalaryItem()
                {
                    Id = Guid.NewGuid().ToString(),
                    ItemId = salaryItemInfo.ItemId,
                    ItemName = salaryItemInfo.ItemName,
                    IsBasic = salaryItemInfo.IsBasic,
                    IsDaily = salaryItemInfo.IsBasic,
                    IsDefault = salaryItemInfo.IsDefault,
                    IsLeave = salaryItemInfo.IsLeave,
                    IsLoan = salaryItemInfo.IsLoan,
                    IsPension = salaryItemInfo.IsPension,
                    IsTax = salaryItemInfo.IsTax,
                    OperatorString = salaryItemInfo.OperatorString,
                    InheritedItem = salaryItemInfo.InheritedItem,
                    Percentage = salaryItemInfo.Percentage??0,
                    ItemType = salaryItemInfo.ItemType,
                    ItemTypeName = salaryItemInfo.ItemTypeName,
                    DefaultAmount = salaryItemInfo.DefaultAmount??0
                };
                ERPContext.SalaryItems.Add(salaryItem);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, salaryItem);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItem/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEmployeeSalaryItem(string id, SalaryItemInfo salaryItemInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oSalaryItem = ERPContext.SalaryItems.FirstOrDefault(x => x.Id == salaryItemInfo.Id);
                if (oSalaryItem != null)
                {
                    var salaryItem = new SalaryItem()
                    {
                        Id = oSalaryItem.Id,
                        ItemId = salaryItemInfo.ItemId,
                        ItemName = salaryItemInfo.ItemName,
                        IsBasic = salaryItemInfo.IsBasic,
                        IsDaily = salaryItemInfo.IsBasic,
                        IsDefault = salaryItemInfo.IsDefault,
                        IsLeave = salaryItemInfo.IsLeave,
                        IsLoan = salaryItemInfo.IsLoan,
                        IsPension = salaryItemInfo.IsPension,
                        OperatorString = salaryItemInfo.OperatorString,
                        InheritedItem = salaryItemInfo.InheritedItem,
                        Percentage = salaryItemInfo.Percentage??0,
                        IsTax = salaryItemInfo.IsTax,
                        ItemType = salaryItemInfo.ItemType,
                        ItemTypeName = salaryItemInfo.ItemTypeName,
                        DefaultAmount = salaryItemInfo.DefaultAmount??0
                    };
                    ERPContext.SalaryItems.AddOrUpdate(salaryItem);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItems")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSalaryItemList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItemList = ERPContext.SalaryItems.Select(x => new SalaryItemInfo()
                {
                    Id = x.Id,
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    IsBasic = x.IsBasic,
                    IsDaily = x.IsBasic,
                    IsDefault = x.IsDefault,
                    IsLeave = x.IsLeave,
                    IsLoan = x.IsLoan,
                    IsPension = x.IsPension,
                    IsTax = x.IsTax,
                    ItemType = x.ItemType,
                    OperatorString = x.OperatorString,
                    InheritedItem = x.InheritedItem,
                    Percentage = x.Percentage,
                    ItemTypeName = x.ItemTypeName,
                    DefaultAmount = x.DefaultAmount
                }).OrderByDescending(m=>m.IsBasic).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, salaryItemList);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItem/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeSalaryItemById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var salaryItem = ERPContext.SalaryItems.Where(x => x.Id == id).Select(x => new SalaryItemInfo()
                {
                    Id = x.Id,
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    IsBasic = x.IsBasic,
                    IsDaily = x.IsBasic,
                    IsDefault = x.IsDefault,
                    IsLeave = x.IsLeave,
                    IsLoan = x.IsLoan,
                    IsPension = x.IsPension,
                    OperatorString = x.OperatorString,
                    InheritedItem = x.InheritedItem,
                    Percentage = x.Percentage,
                    IsTax = x.IsTax,
                    ItemType = x.ItemType,
                    ItemTypeName = x.ItemTypeName,
                    DefaultAmount = x.DefaultAmount
                }).FirstOrDefault();
                if (salaryItem != null)
                {
                    var salaryItem2 = ERPContext.SalaryItems.FirstOrDefault(x => x.Id == salaryItem.InheritedItem);
                    salaryItem.InheritedItemName = salaryItem2 != null ? salaryItem2.ItemName : null;
                }
                return Request.CreateResponse(HttpStatusCode.OK, salaryItem);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SalaryItem/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSalaryItem(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from SalaryItem where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Department")]
        [HttpPost]
        public HttpResponseMessage CreateDepartment(DepartmentInfo departmentInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var department = new Department()
                {
                    Id = Guid.NewGuid().ToString(),
                    DepartmentId = departmentInfo.DepartmentId,
                    DepartmentName = departmentInfo.DepartmentName,
                    Description = departmentInfo.Description
                };
                ERPContext.Departments.Add(department);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, department);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Department/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateDepartment(string id, DepartmentInfo departmentInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oDepartment = ERPContext.Departments.FirstOrDefault(x => x.Id == departmentInfo.Id);
                if (oDepartment != null)
                {
                    var department = new Department()
                    {
                        Id = oDepartment.Id,
                        DepartmentId = departmentInfo.DepartmentId,
                        DepartmentName = departmentInfo.DepartmentName,
                        Description = departmentInfo.Description
                    };
                    ERPContext.Departments.AddOrUpdate(department);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Departments")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeDepartmentList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var designations = ERPContext.Departments.Select(x => new DesignationInfo()
                {
                    Id = x.Id,
                    DesignationId = x.DepartmentId,
                    DesignationName = x.DepartmentName,
                    Description = x.Description
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, designations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Department/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeDepartmentById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var departments = ERPContext.Departments.Where(x => x.Id == id).Select(x => new DepartmentInfo()
                {
                    Id = x.Id,
                    DepartmentId = x.DepartmentId,
                    DepartmentName = x.DepartmentName,
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, departments);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Department/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteDepartment(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Department where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Occupation")]
        [HttpPost]
        public HttpResponseMessage CreateOccupation(OccupationInfo occupationInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var occupation = new Occupation()
                {
                    Id = Guid.NewGuid().ToString(),
                    OccupationId = occupationInfo.OccupationId,
                    OccupationName = occupationInfo.OccupationName,
                };
                ERPContext.Occupations.Add(occupation);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, occupation);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Occupation/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateOccupation(string id, OccupationInfo occupationInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oOccupation = ERPContext.Occupations.FirstOrDefault(x => x.Id == occupationInfo.Id);
                if (oOccupation != null)
                {
                    var occupation = new Occupation()
                    {
                        Id = oOccupation.Id,
                        OccupationId = occupationInfo.OccupationId,
                        OccupationName = occupationInfo.OccupationName,
                    };
                    ERPContext.Occupations.AddOrUpdate(occupation);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Occupations")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeOccupationList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var occupations = ERPContext.Occupations.Select(x => new OccupationInfo()
                {
                    Id = x.Id,
                    OccupationId = x.OccupationId,
                    OccupationName = x.OccupationName,
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, occupations);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Occupation/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeOccupationById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var occupation = ERPContext.Occupations.Where(x => x.Id == id).Select(x => new OccupationInfo()
                {
                    Id = x.Id,
                    OccupationId = x.OccupationId,
                    OccupationName = x.OccupationName,
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, occupation);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Occupation/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteOccupation(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Occupation where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EducationLevel")]
        [HttpPost]
        public HttpResponseMessage CreateEducationLevel(EducationLevelInfo educationLevelInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var educationLevel = new EducationLevel()
                {
                    Id = Guid.NewGuid().ToString(),
                    LevelId = educationLevelInfo.LevelId,
                    LevelName = educationLevelInfo.LevelName,
                };
                ERPContext.EducationLevels.Add(educationLevel);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, educationLevel);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EducationLevel/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateEducationLevel(string id, EducationLevelInfo educationLevelInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oEducationLevel = ERPContext.EducationLevels.FirstOrDefault(x => x.Id == educationLevelInfo.Id);
                if (oEducationLevel != null)
                {
                    var educationLevel = new EducationLevel()
                    {
                        Id = oEducationLevel.Id,
                        LevelId = educationLevelInfo.LevelId,
                        LevelName = educationLevelInfo.LevelName,
                    };
                    ERPContext.EducationLevels.AddOrUpdate(educationLevel);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EducationLevels")]
        [HttpGet]
        public HttpResponseMessage GetEducationLevelList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var educationLevels = ERPContext.EducationLevels.Select(x => new EducationLevelInfo()
                {
                    Id = x.Id,
                    LevelId = x.LevelId,
                    LevelName = x.LevelName,
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, educationLevels);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EducationLevel/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeEducationLevelById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var educationLevel = ERPContext.EducationLevels.Where(x => x.Id == id).Select(x => new EducationLevelInfo()
                {
                    Id = x.Id,
                    LevelId = x.LevelId,
                    LevelName = x.LevelName,
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, educationLevel);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("EducationLevel/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteEducationLevel(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from EducationLevel where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LeaveType")]
        [HttpPost]
        public HttpResponseMessage CreateEducationLevel(LeaveTypeInfo leaveTypeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var leaveType = new LeaveType()
                    {
                        Id = Guid.NewGuid().ToString(),
                        LeaveTypeId = leaveTypeInfo.LeaveTypeId,
                        LeaveTypeName = leaveTypeInfo.LeaveTypeName,
                    };
                    ERPContext.LeaveTypes.AddOrUpdate(leaveType);
                    ERPContext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, leaveType);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LeaveType/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateLeaveType(string id, LeaveTypeInfo leaveTypeInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var oLeaveType = ERPContext.LeaveTypes.FirstOrDefault(x => x.Id == leaveTypeInfo.Id);
                if (oLeaveType != null)
                {
                    var leaveType = new LeaveType()
                    {
                        Id = oLeaveType.Id,
                        LeaveTypeId = leaveTypeInfo.LeaveTypeId,
                        LeaveTypeName = leaveTypeInfo.LeaveTypeName,
                    };
                    ERPContext.LeaveTypes.AddOrUpdate(leaveType);
                    ERPContext.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LeaveTypes")]
        [HttpGet]
        public HttpResponseMessage GetLeaveTypeList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var educationLevels = ERPContext.LeaveTypes.Select(x => new LeaveTypeInfo()
                {
                    Id = x.Id,
                    LeaveTypeId = x.LeaveTypeId,
                    LeaveTypeName = x.LeaveTypeName,
                    IsPaid = x.IsPaid
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, educationLevels);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LeaveType/{id}")]
        [HttpGet]
        public HttpResponseMessage GetEmployeeLeaveTypeById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                var educationLevel = ERPContext.LeaveTypes.Where(x => x.Id == id).Select(x => new LeaveTypeInfo()
                {
                    Id = x.Id,
                    LeaveTypeId = x.LeaveTypeId,
                    LeaveTypeName = x.LeaveTypeName,
                    IsPaid = x.IsPaid
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, educationLevel);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LeaveType/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteLeaveType(string id)
        {
            try
            {
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from LeaveType where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GradeStepSalaryItem")]
        [HttpPost]
        public HttpResponseMessage CreateGradeStepSalaryItem(List<GradeStepSalaryItemInfo> gradeStepSalaryItemInfos )
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                string id = Guid.Empty.ToString();
                DataTable dt=new DataTable();
                dt.Columns.Add("Id", typeof(string));
                dt.Columns.Add("SalaryItemId", typeof(string));
                dt.Columns.Add("SalaryItem_Id", typeof(string));
                dt.Columns.Add("SalaryAmount", typeof(double));
                dt.Columns.Add("HasComparator", typeof(bool));
                dt.Columns.Add("Grade_id", typeof(string));
                dt.Columns.Add("GradeStep_id", typeof(string));
                dt.Columns.Add("SingleItemAmount", typeof(decimal));
                dt.Columns.Add("Salary_id", typeof(string));
                dt.Columns.Add("InheritedItem_Id", typeof(string));
                dt.Columns.Add("Percentage", typeof(double));
                dt.Columns.Add("ComparatorString", typeof(string));
                foreach (var gradeStepInfo in gradeStepSalaryItemInfos)
                {
                    id = gradeStepInfo.Id ?? Guid.NewGuid().ToString();
                    dt.Rows.Add(id, gradeStepInfo.SalaryItemId, gradeStepInfo.SalaryItem_Id, gradeStepInfo.SalaryAmount,
                        gradeStepInfo.HasComparator,
                        gradeStepInfo.Grade_id, gradeStepInfo.GradeStep_id, gradeStepInfo.SingleItemAmount,
                        gradeStepInfo.Salary_id, gradeStepInfo.InheritedItem_Id,
                        gradeStepInfo.Percentage,gradeStepInfo.ComparatorString);
                }
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@TypeGradeStepSalaryItem", dt);
                DatabaseCommand.ExcuteObjectNonQuery("proc_SaveGradeStepSalaryItemTransaction", paramlist, "procedure");
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
       
        [Route("gradeStepSalaryItemByGradeId/{gradeId}")]
        [HttpGet]
        public HttpResponseMessage GetGradeStepSalaryItemByGradeId(string gradeId)
        {
            try
            {
                var gradeStepSalaryItems=(from gradeStepSal in ERPContext.GradeStepSalaryItems 
                    join salItem in ERPContext.SalaryItems on gradeStepSal.SalaryItem_Id equals salItem.Id
                    where gradeStepSal.Grade_id == gradeId
                    select new GradeStepSalaryItemInfo()
                    {
                        Id = gradeStepSal.Id,
                        Grade_id = gradeStepSal.Grade_id,
                        GradeStep_id = gradeStepSal.GradeStep_id,
                        SalaryItemId = gradeStepSal.SalaryItemId,
                        SalaryItem_Id = gradeStepSal.SalaryItem_Id,
                        SingleItemAmount = gradeStepSal.SingleItemAmount,
                        SalaryAmount = gradeStepSal.SalaryAmount,
                        HasComparator = gradeStepSal.HasComparator,
                        InheritedItem_Id = gradeStepSal.InheritedItem_Id,
                        ComparatorString = gradeStepSal.ComparatorString,
                        Percentage = gradeStepSal.Percentage,
                        Salary_id = gradeStepSal.Salary_id,
                        IsBasic = salItem.IsBasic
                    }).OrderByDescending(y=>y.IsBasic).ToList();
              return Request.CreateResponse(HttpStatusCode.OK, gradeStepSalaryItems);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("gradeStepSalaryItemBySubgradeId/{subGradeId}")]
        [HttpGet]
        public HttpResponseMessage GradeStepSalaryItemBySubgradeId(string subGradeId)
        {
            try
            {
                var gradeStepSalaryItems = (from gradeStepSal in ERPContext.GradeStepSalaryItems
                                            join salItem in ERPContext.SalaryItems on gradeStepSal.SalaryItem_Id equals salItem.Id
                                            where gradeStepSal.GradeStep_id == subGradeId
                                            select new GradeStepSalaryItemInfo()
                                            {
                                                Id = gradeStepSal.Id,
                                                Grade_id = gradeStepSal.Grade_id,
                                                GradeStep_id = gradeStepSal.GradeStep_id,
                                                SalaryItemId = gradeStepSal.SalaryItemId,
                                                SalaryItem_Id = gradeStepSal.SalaryItem_Id,
                                                SingleItemAmount = gradeStepSal.SingleItemAmount,
                                                SalaryAmount = gradeStepSal.SalaryAmount,
                                                HasComparator = gradeStepSal.HasComparator,
                                                InheritedItem_Id = gradeStepSal.InheritedItem_Id,
                                                ComparatorString = gradeStepSal.ComparatorString,
                                                Percentage = gradeStepSal.Percentage,
                                                Salary_id = gradeStepSal.Salary_id,
                                                IsBasic = salItem.IsBasic
                                            }).OrderByDescending(y => y.IsBasic).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, gradeStepSalaryItems);
            }
            catch (InvalidSessionFailure ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
	}
}