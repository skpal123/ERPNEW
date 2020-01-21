using ERP.DataService.Model;
using ERPWebApiService.Authentication;
using ERPWebApiService.DataConnection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModel.Model;

namespace ERPWebApiService.Controllers
{
     [RoutePrefix("api/DropdownService")]
    public class DropdownController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        // GET api/<controller>
        [Route("UnitDropdown")]
        [HttpGet]
        public HttpResponseMessage GetUnitList()
        {
            try
            {
                var unitList = ERPContext.Units.Select(x => new SelectListItem
                {                 
                    Value=x.Id,
                    Code = x.UnitName,
                    Text = x.UnitName
                }).ToList();               
                return Request.CreateResponse(HttpStatusCode.OK, unitList);            
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("CategoryDropdown")]
        [HttpGet]
        public HttpResponseMessage GetCategoryDropdownList()
        {
            try
            {
                var datalist = ERPContext.Categorys.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code=x.CategoryId,
                    Text =x.CategoryName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubCategoryDropdown/{id}")]
        [HttpGet]
        public HttpResponseMessage SubCategoryDropdownList(string id)
        {
            try
            {
                List<SelectListItem> datalist = new List<SelectListItem>();
                Guid Id;
                bool IsGuid = Guid.TryParse(id, out Id);
                if (IsGuid)
                {
                    datalist = ERPContext.Subcategorys.Where(x => x.Category_Id == id).Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.SubCategoryId,
                        Text = x.SubCategoryName
                    }).ToList();
                }
                else
                {
                    datalist = ERPContext.Subcategorys.Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.SubCategoryId,
                        Text = x.SubCategoryName
                    }).ToList();
                }
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("ItemDropdown/{id}")]
        [HttpGet]
        public HttpResponseMessage ItemDropdownList(string id)
        {
            try
            {
                List<SelectListItem> datalist = new List<SelectListItem>();
                Guid Id;
                bool IsGuid = Guid.TryParse(id, out Id);
                if (IsGuid)
                {
                    datalist = ERPContext.InventoryItems.Where(x => x.SubCategory_Id == id).Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.ItemId,
                        Text = x.ItemName
                    }).ToList();
                }
                else
                {
                    datalist = ERPContext.InventoryItems.Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.ItemId,
                        Text = x.ItemName
                    }).ToList();
                }
                return Request.CreateResponse(HttpStatusCode.OK, datalist);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("LedgerDropdown")]
        [HttpGet]
        public HttpResponseMessage LedgerDropdownList()
        {
            try
            {
                var datalist = ERPContext.Accounts.Where(x=>x.IsLeaf==true&& x.LevelId!=1).Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code=x.ManualAccountCode,
                    Text = x.AccountDescription
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("SubLedgerDropdown/{id}")]
        [HttpGet]
        public HttpResponseMessage SubLedgerDropdownList(string id)
        {
            try
            {
                List<SelectListItem> datalist = new List<SelectListItem>();
                Guid Id;
                bool IsGuid = Guid.TryParse(id,out Id);
                if (IsGuid)
                {
                    datalist = ERPContext.Subledgers.Where(x => x.Account_Id == id).Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.SubledgerCode,
                        Text = x.Description
                    }).ToList();
                }
                else
                {
                    datalist = ERPContext.Subledgers.Select(x => new SelectListItem
                    {
                        Value = x.Id,
                        Code=x.SubledgerCode,
                        Text = x.Description
                    }).ToList();
                }
               
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("locationDropdown")]
        [HttpGet]
        public HttpResponseMessage LocationDropdownList()
        {
            try
            {
                var datalist = ERPContext.Locations.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.LocationId,
                    Text = x.LocationName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("supplierDropdown")]
        [HttpGet]
        public HttpResponseMessage SupplierDropdownList()
        {
            try
            {
                var datalist = ERPContext.Suppliers.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.SupplierId,
                    Text = x.SupplierName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("customerDropdown")]
        [HttpGet]
        public HttpResponseMessage CustomerDropdownList()
        {
            try
            {
                var datalist = ERPContext.Customers.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.CustomerId,
                    Text = x.CustomerName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("partyDropdown")]
        [HttpGet]
        public HttpResponseMessage PartyDropdownList()
        {
            try
            {
                var datalist = ERPContext.Customers.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.CustomerId,
                    Text = x.CustomerName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("getLedgerByPaymentMode/{paymentMode}")]
        [HttpGet]
        public HttpResponseMessage GetLedgerDropdownListByPamentMode(int paymentMode)
        {
            try
            {
                var datalist = ERPContext.Accounts.Where(x=>x.AccountType==paymentMode).Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.ManualAccountCode,
                    Text = x.AccountDescription
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("designationDropdown")]
        [HttpGet]
        public HttpResponseMessage GetDesignationDropdownList()
        {
            try
            {
                var datalist = ERPContext.Designations.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.DesignationId,
                    Text = x.DesignationName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("gradeDropdown")]
        [HttpGet]
        public HttpResponseMessage GetGradeDropdownList()
        {
            try
            {
                var datalist = ERPContext.EmployeeGrades.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.GradeId,
                    Text = x.GradeName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("departmentDropdown")]
        [HttpGet]
        public HttpResponseMessage GetDepartmentDropdownList()
        {
            try
            {
                var datalist = ERPContext.Departments.Select(x => new SelectListItem
                {
                    Value = x.Id,
                    Code = x.DepartmentId,
                    Text = x.DepartmentName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, datalist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

         [Route("occupationDropdown")]
         [HttpGet]
         public HttpResponseMessage GetOccupationDropdownList()
         {
             try
             {
                 var datalist = ERPContext.Occupations.Select(x => new SelectListItem
                 {
                     Value = x.Id,
                     Code = x.OccupationId,
                     Text = x.OccupationName
                 }).ToList();
                 return Request.CreateResponse(HttpStatusCode.OK, datalist);
             }
             catch (Exception ex)
             {
                 return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
             }

         }
         [Route("educationLevelDropdown")]
         [HttpGet]
         public HttpResponseMessage GetEducationLevelDropdownList()
         {
             try
             {
                 var datalist = ERPContext.EducationLevels.Select(x => new SelectListItem
                 {
                     Value = x.Id,
                     Code = x.LevelId,
                     Text = x.LevelName
                 }).ToList();
                 return Request.CreateResponse(HttpStatusCode.OK, datalist);
             }
             catch (Exception ex)
             {
                 return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
             }

         }
         [Route("salaryItemDropdown")]
         [HttpGet]
         public HttpResponseMessage GetSalaryItemDropdownList()
         {
             try
             {
                 var datalist = ERPContext.SalaryItems.Select(x => new SelectListItem
                 {
                     Value = x.Id,
                     Code = x.ItemId,
                     Text = x.ItemName
                 }).ToList();
                 return Request.CreateResponse(HttpStatusCode.OK, datalist);
             }
             catch (Exception ex)
             {
                 return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
             }

         }
         [Route("itemNames")]
         [HttpGet]
         public HttpResponseMessage GetItemNameDropdownList()
         {
             try
             {
                 var datalist = ERPContext.ItemNames.Select(x => new SelectListItem
                 {
                     Value = x.Id.ToString(),
                     Code = null,
                     Text = x.Name
                 }).ToList();
                 return Request.CreateResponse(HttpStatusCode.OK, datalist);
             }
             catch (Exception ex)
             {
                 return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
             }

         }
    }
}
