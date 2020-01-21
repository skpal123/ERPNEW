using System.Security.Cryptography.X509Certificates;
using ERP.DataService.Model;
using ERP.DataService.Model.Model;
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
using ERPWebApiService.Exceptions;
using ERPWebApiService.ExrensionMethod;
using ViewModel.Model;
using ViewModel.Model.Common;
using ViewModel.Model.Validation.Accounts;
using ViewModel.Model.Validation.HrPayroll;
using ViewModel.Model.Validation.Inventory;

namespace ERPWebApiService.Controllers
{

    [RoutePrefix("api/CommonService")]
    public class CommonController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        
        [Route("getFormInfo/{formName}")]
        [HttpGet]
        public HttpResponseMessage GetFormInfo(string formName)
        {
            try
            {
                var formInfoList = ERPContext.FormInfos.Where(x => x.FormName == formName).Select(x => new FormInfoView()
                {
                    Id=x.Id,
                    Name=x.Name,
                    FormName=x.FormName,
                    IsEnable=x.IsEnable,
                    IsValidationActive=x.IsValidationActive,
                    IsMinLength=x.IsMinLength,
                    IsMaxLength=x.IsMaxLength,
                    IsEmail=x.IsEmail,
                    IsAutoCode = x.IsAutoCode,
                    IsReadOnly = x.IsReadOnly
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, formInfoList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("formInfo/{formName}")]
        [HttpPut]
        public HttpResponseMessage CreateFormInfo(string formName, List<FormInfoView> formInfoList)
        {
            try
            {
                DataTable dt=new DataTable();
                dt.Columns.Add("Name", typeof(string));
                dt.Columns.Add("IsEnable", typeof(Boolean));
                dt.Columns.Add("IsValidationActive", typeof(Boolean));
                dt.Columns.Add("FormName", typeof(string));
                dt.Columns.Add("IsMinLength", typeof(Boolean));
                dt.Columns.Add("IsMaxLength", typeof(Boolean));
                dt.Columns.Add("IsEmail", typeof(Boolean));
                dt.Columns.Add("IsAutoCode", typeof(Boolean));
                dt.Columns.Add("IsReadOnly", typeof(Boolean));
                if (formInfoList.Any())
                {
                    foreach (FormInfoView forminfo in formInfoList)
                    {
                        dt.Rows.Add(forminfo.Name, forminfo.IsEnable, forminfo.IsValidationActive, forminfo.FormName,
                            forminfo.IsMinLength, forminfo.IsMaxLength, forminfo.IsEmail,forminfo.IsAutoCode,forminfo.IsReadOnly);
                    }
                    Dictionary<string, object> paramlist = new Dictionary<string, object>();
                    paramlist.Add("@TypeFormInfo", dt);
                    DatabaseCommand.ExcuteObjectNonQuery("proc_saveFormInfo", paramlist, "procedure");
                }               
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("getFormControl/{formName}")]
        [HttpGet]
        public HttpResponseMessage GetFormControlByFormName(string formName)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var userControlList = ERPContext.UserFormControls.Where(x => x.FormName == formName).Select(x => new UserFormControlInfo
                {
                    Id = x.Id,
                    Name = x.Name,
                    LabelName = x.LabelName,
                    Editable = x.Editable,
                    Autocomplete = x.Autocomplete,
                    IsEnable = x.IsEnable,
                    FormName = x.FormName,
                    IsCheckbox = x.IsCheckbox,
                    Type = x.Type,
                    OrderNo = x.OrderNo,
                    IsReadOnly = x.IsReadOnly
                }).OrderBy(m=>m.OrderNo).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, userControlList);
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
        [Route("duplicateCheck")]
        [HttpPost]
        public HttpResponseMessage CheckDuplicateCodeById(DuplicateCheck duplicateCheck)
        {
            try
            {
                
                //var userSession = AuthorizationHelper.GetSession();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("proc_checkDuplicateCode", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@tableName", duplicateCheck.TableName);
                    cmd.Parameters.AddWithValue("@columnName",duplicateCheck.ItemName );
                    cmd.Parameters.AddWithValue("@value", "'" + duplicateCheck.Value + "'");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    int rowCount = Convert.ToInt32(cmd.ExecuteScalar().ToString());
                    if (rowCount > 0)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, true);  
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, false); 
                    }

                }
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
        [Route("saveColumnInfo/{formName}")]
        [HttpPut]
        public HttpResponseMessage CreateUserControlFormInfo(string formName, List<UserFormControlInfo> userFormControls)
        {
            try
            {
                DataTable dt=new DataTable();
                dt.Columns.Add("Name", typeof(string));
                dt.Columns.Add("LabelName", typeof(string));
                dt.Columns.Add("Autocomplete", typeof(Boolean));
                dt.Columns.Add("Editable", typeof(Boolean));
                dt.Columns.Add("IsEnable", typeof(Boolean));
                dt.Columns.Add("FormName", typeof(string));
                dt.Columns.Add("Type", typeof(string));
                dt.Columns.Add("IsCheckbox", typeof(Boolean));
                dt.Columns.Add("OrderNo", typeof(int));
                dt.Columns.Add("IsReadOnly", typeof(int));
                if (userFormControls.Any())
                {                
                    foreach (UserFormControlInfo forminfo in userFormControls)
                    {
                        dt.Rows.Add(forminfo.Name, forminfo.LabelName, forminfo.Autocomplete, forminfo.Editable,
                            forminfo.IsEnable, forminfo.FormName, forminfo.Type, forminfo.IsCheckbox,forminfo.OrderNo,forminfo.IsReadOnly);
                    }  Dictionary<string, object> paramlist = new Dictionary<string, object>();
                     paramlist.Add("@TypeUserFormControl", dt);
                     DatabaseCommand.ExcuteObjectNonQuery("proc_saveUserFormControl", paramlist, "procedure");
                   
                }
                
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [Route("manufactureValidation")]
        [HttpGet]
        public HttpResponseMessage GetManufactureValidation()
        {
            try
            {
                List<ManufactureValidation> manufactureValidationList = new List<ManufactureValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "manufacture");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        ManufactureValidation manufactureValidation = new ManufactureValidation();
                        manufactureValidation.ManufactureId = Convert.ToBoolean(rdr["ManufactureId"]);
                        manufactureValidation.ManufactureName = Convert.ToBoolean(rdr["ManufactureName"]);
                        manufactureValidation.Address = Convert.ToBoolean(rdr["Address"]);
                        manufactureValidationList.Add(manufactureValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, manufactureValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("itemValidation")]
        [HttpGet]
        public HttpResponseMessage GetItemValidation()
        {
            try
            {
                List<InventoryItemValidation> formValidationList = new List<InventoryItemValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "itementry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        InventoryItemValidation fromValidation = new InventoryItemValidation();
                        fromValidation.ItemCode = Convert.ToBoolean(rdr["ItemCode"]);
                        fromValidation.ItemId = Convert.ToBoolean(rdr["ItemId"]);
                        fromValidation.ItemName = Convert.ToBoolean(rdr["ItemName"]);
                        fromValidation.Category_Id = Convert.ToBoolean(rdr["Category_Id"]);
                        fromValidation.SubCategory_Id = Convert.ToBoolean(rdr["SubCategory_Id"]);
                        fromValidation.UnitId = Convert.ToBoolean(rdr["UnitId"]);
                        fromValidation.Ledger_Id = Convert.ToBoolean(rdr["Ledger_Id"]);
                        fromValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("itemPurchaseSalesValidation/{formName}")]
        [HttpGet]
        public HttpResponseMessage ItemPurchaseValidation(string formName)
        {
            try
            {
                List<ItemPurchaseValidation> itemPurchaseValidations = new List<ItemPurchaseValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", formName);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        ItemPurchaseValidation itemPurchaseValidation = new ItemPurchaseValidation();
                        itemPurchaseValidation.UnitSale = Convert.ToBoolean(rdr["UnitSale"]);
                        itemPurchaseValidation.Quantity = Convert.ToBoolean(rdr["Quantity"]);
                        itemPurchaseValidation.InStock = Convert.ToBoolean(rdr["InStock"]);
                        itemPurchaseValidation.Reason = Convert.ToBoolean(rdr["Reason"]);
                        itemPurchaseValidation.TransactionId = Convert.ToBoolean(rdr["TransactionId"]);
                        itemPurchaseValidation.UnitCost = Convert.ToBoolean(rdr["UnitCost"]);
                        itemPurchaseValidation.DiscountAmount = Convert.ToBoolean(rdr["DiscountAmount"]);
                        itemPurchaseValidation.Vat = Convert.ToBoolean(rdr["Vat"]);
                        itemPurchaseValidation.Tax = Convert.ToBoolean(rdr["Tax"]);
                        itemPurchaseValidation.SerialNo = Convert.ToBoolean(rdr["SerialNo"]);
                        itemPurchaseValidation.TransactionDate = Convert.ToBoolean(rdr["TransactionDate"]);
                        itemPurchaseValidation.Comments = Convert.ToBoolean(rdr["Comments"]);
                        itemPurchaseValidation.GrvNo = Convert.ToBoolean(rdr["GrvNo"]);
                        itemPurchaseValidation.InvoiceNo = Convert.ToBoolean(rdr["InvoiceNo"]);
                        itemPurchaseValidation.ChalanNo = Convert.ToBoolean(rdr["ChalanNo"]);
                        itemPurchaseValidation.Item_Id = Convert.ToBoolean(rdr["Item_Id"]);
                        itemPurchaseValidation.Location_Id = Convert.ToBoolean(rdr["Location_Id"]);
                        itemPurchaseValidation.Supplier_Id = Convert.ToBoolean(rdr["Supplier_Id"]);
                        itemPurchaseValidation.Customer_Id = Convert.ToBoolean(rdr["Customer_Id"]);
                        itemPurchaseValidation.Party_Id = Convert.ToBoolean(rdr["Party_Id"]);
                        itemPurchaseValidation.GrvDate = Convert.ToBoolean(rdr["GrvDate"]);
                        itemPurchaseValidation.Approver_Id = Convert.ToBoolean(rdr["Approver_Id"]);
                        itemPurchaseValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        itemPurchaseValidation.Ledger_Id = Convert.ToBoolean(rdr["Ledger_Id"]);
                        itemPurchaseValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        itemPurchaseValidation.PaymentMode = Convert.ToBoolean(rdr["PaymentMode"]);
                        itemPurchaseValidation.QuantityGroup = Convert.ToBoolean(rdr["QuantityGroup"]);
                        itemPurchaseValidation.DiscountRateTransaction = Convert.ToBoolean(rdr["DiscountRateTransaction"]);
                        itemPurchaseValidation.DiscountRateGroup = Convert.ToBoolean(rdr["DiscountRateGroup"]);
                        itemPurchaseValidation.TotalAmountTransaction = Convert.ToBoolean(rdr["TotalAmountTransaction"]);
                        itemPurchaseValidation.PaidAmount = Convert.ToBoolean(rdr["PaidAmount"]);
                        itemPurchaseValidation.NetPayableAmount = Convert.ToBoolean(rdr["NetPayableAmount"]);
                        itemPurchaseValidation.TotalAmountGroup = Convert.ToBoolean(rdr["TotalAmountGroup"]);
                        itemPurchaseValidation.LotNo = Convert.ToBoolean(rdr["LotNo"]);
                        itemPurchaseValidation.DiscountAmountGroup = Convert.ToBoolean(rdr["DiscountAmountGroup"]);
                        itemPurchaseValidations.Add(itemPurchaseValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, itemPurchaseValidations);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("CodeFormater")]
        [HttpPost]
        public HttpResponseMessage CreateCodeFormater(CodeFormaterInfo codeFormaterInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var codeformater = new CodeFormater()
                {
                    Name = codeFormaterInfo.Name,
                    ItemName =codeFormaterInfo.ItemName,
                    ItemLength = codeFormaterInfo.ItemLength,
                    IsSerial = codeFormaterInfo.IsSerial,
                    IsTodaysDate = codeFormaterInfo.IsTodaysDate,
                    IsSymbol = codeFormaterInfo.IsSymbol,
                    SymbolName = codeFormaterInfo.SymbolName,
                    StartPossition = codeFormaterInfo.StartPossition,
                    LastNumber = codeFormaterInfo.LastNumber,
                    Prefix = codeFormaterInfo.Prefix,
                    StringLength = codeFormaterInfo.StringLength,
                    MiddleSymbol = codeFormaterInfo.MiddleSymbol
                };
                ERPContext.CodeFormaters.Add(codeformater);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, codeformater);
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
        [Route("CodeFormater/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateCodeFormater(int id,CodeFormaterInfo codeFormaterInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id.ToString());
                DatabaseCommand.ExcuteNonQuery(@"delete from tblcodeformater where id=@id;", paramlist, null);
                var codeformater = new CodeFormater()
                {
                    Name = codeFormaterInfo.Name,
                    ItemName = codeFormaterInfo.ItemName,
                    ItemLength = codeFormaterInfo.ItemLength,
                    IsSerial = codeFormaterInfo.IsSerial,
                    IsTodaysDate = codeFormaterInfo.IsTodaysDate,
                    IsSymbol = codeFormaterInfo.IsSymbol,
                    SymbolName = codeFormaterInfo.SymbolName,
                    StartPossition = codeFormaterInfo.StartPossition,
                    LastNumber = codeFormaterInfo.LastNumber,
                    Prefix = codeFormaterInfo.Prefix,
                    StringLength = codeFormaterInfo.StringLength,
                    MiddleSymbol = codeFormaterInfo.MiddleSymbol
                };
                ERPContext.CodeFormaters.Add(codeformater);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, codeformater);
                return Request.CreateResponse(HttpStatusCode.OK, false);
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
        [Route("CodeFormaters")]
        [HttpGet]
        public HttpResponseMessage GetCodeFormaterList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var codeformaterList =ERPContext.CodeFormaters.Select(x=> new CodeFormaterInfo()
                {
                    Id = x.Id,
                    Name = x.Name,
                    ItemName = x.ItemName,
                    ItemLength = x.ItemLength,
                    IsSerial = x.IsSerial,
                    IsTodaysDate = x.IsTodaysDate,
                    IsSymbol = x.IsSymbol,
                    SymbolName = x.SymbolName,
                    StartPossition = x.StartPossition,
                    LastNumber = x.LastNumber,
                    Prefix = x.Prefix,
                    StringLength = x.StringLength,
                    MiddleSymbol = x.MiddleSymbol,
                }).ToList();               
                return Request.CreateResponse(HttpStatusCode.OK, codeformaterList);
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
        [Route("CodeFormater/{id}")]
        [HttpGet]
        public HttpResponseMessage GetCodeFormaterById(int id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var codeformater = ERPContext.CodeFormaters.Where(x=>x.Id==id).Select(x => new CodeFormaterInfo()
                {
                    Id = x.Id,
                    Name = x.Name,
                    ItemName = x.ItemName,
                    ItemLength = x.ItemLength,
                    IsSerial = x.IsSerial,
                    IsTodaysDate = x.IsTodaysDate,
                    IsSymbol = x.IsSymbol,
                    SymbolName = x.SymbolName,
                    StartPossition = x.StartPossition,
                    LastNumber = x.LastNumber,
                    Prefix = x.Prefix,
                    StringLength = x.StringLength,
                    MiddleSymbol = x.MiddleSymbol
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, codeformater);
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
        [Route("CodeFormater/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCodeFormaterById(string id)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery(@"delete from tblcodeformater where id=@id;", paramlist, null);
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
        [Route("getAutoCode/{productName}")]
        [HttpGet]
        public HttpResponseMessage GetAutoCodeByProductName(string productName)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                string code= DatabaseCommand.GetAutoGeneratedCode(productName,null);
                return Request.CreateResponse(HttpStatusCode.OK, code);
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
        [Route("resetCode/{productName}")]
        [HttpGet]
        public HttpResponseMessage ResetCodeByProductName(string productName)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@name", productName);
                DatabaseCommand.ExcuteNonQuery(@"Update tblcodeformater set LastNumber=LastNumber-1 where Name=@name;", paramlist, null);
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
        [Route("unitValidation")]
        [HttpGet]
        public HttpResponseMessage GetUnitValidation()
        {
            try
            {
                List<UnitValidation> formValidationList = new List<UnitValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "unit-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        UnitValidation fromValidation = new UnitValidation();
                        fromValidation.UnitName = Convert.ToBoolean(rdr["UnitName"]);
                        fromValidation.Description = Convert.ToBoolean(rdr["Description"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("categoryValidation")]
        [HttpGet]
        public HttpResponseMessage GetCategoryValidation()
        {
            try
            {
                List<CategoryValidation> formValidationList = new List<CategoryValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "category-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CategoryValidation fromValidation = new CategoryValidation();
                        fromValidation.CategoryId = Convert.ToBoolean(rdr["CategoryId"]);
                        fromValidation.CategoryName = Convert.ToBoolean(rdr["CategoryName"]);                      
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategoryValidation")]
        [HttpGet]
        public HttpResponseMessage GetSubCategoryValidation()
        {
            try
            {
                List<SubcategoryValidation> formValidationList = new List<SubcategoryValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "subcategory-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SubcategoryValidation fromValidation = new SubcategoryValidation();
                        fromValidation.SubCategoryId = Convert.ToBoolean(rdr["SubCategoryId"]);
                        fromValidation.SubCategoryName = Convert.ToBoolean(rdr["SubCategoryName"]);
                        fromValidation.Category_Id = Convert.ToBoolean(rdr["Category_Id"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("customerValidation")]
        [HttpGet]
        public HttpResponseMessage GetCustomerValidation()
        {
            try
            {
                List<CustomerValidation> formValidationList = new List<CustomerValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "customer-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CustomerValidation fromValidation = new CustomerValidation();
                        fromValidation.CustomerId = Convert.ToBoolean(rdr["CustomerId"]);
                        fromValidation.CustomerName = Convert.ToBoolean(rdr["CustomerName"]);
                        fromValidation.Email = Convert.ToBoolean(rdr["Email"]);
                        fromValidation.PhoneNo = Convert.ToBoolean(rdr["PhoneNo"]);
                        fromValidation.Address = Convert.ToBoolean(rdr["Address"]);
                        fromValidation.Ledger_Id = Convert.ToBoolean(rdr["Ledger_Id"]);
                        fromValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("supplierValidation")]
        [HttpGet]
        public HttpResponseMessage GetSupplierValidation()
        {
            try
            {
                List<SupplierValidation> formValidationList = new List<SupplierValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "supplier-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SupplierValidation fromValidation = new SupplierValidation();
                        fromValidation.SupplierId = Convert.ToBoolean(rdr["SupplierId"]);
                        fromValidation.SupplierName = Convert.ToBoolean(rdr["SupplierName"]);
                        fromValidation.ContactPerson = Convert.ToBoolean(rdr["ContactPerson"]);
                        fromValidation.PhoneNo = Convert.ToBoolean(rdr["PhoneNo"]);
                        fromValidation.Address = Convert.ToBoolean(rdr["Address"]);
                        fromValidation.Email = Convert.ToBoolean(rdr["Email"]);
                        fromValidation.Ledger_Id = Convert.ToBoolean(rdr["Ledger_Id"]);
                        fromValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("customerTransactionValidation")]
        [HttpGet]
        public HttpResponseMessage GetCustomerTransactionValidation()
        {
            try
            {
                List<CustomerTransactionValidation> formValidationList = new List<CustomerTransactionValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "customer-transaction");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CustomerTransactionValidation fromValidation = new CustomerTransactionValidation();
                        fromValidation.Customer_Id = Convert.ToBoolean(rdr["Customer_Id"]);
                        fromValidation.PaymentType = Convert.ToBoolean(rdr["PaymentType"]);
                        fromValidation.PaymentMethod = Convert.ToBoolean(rdr["PaymentMethod"]);
                        fromValidation.PaymentDate = Convert.ToBoolean(rdr["PaymentDate"]);
                        fromValidation.PaymentMode = Convert.ToBoolean(rdr["PaymentMode"]);
                        fromValidation.TotalDueAdvanceAmount = Convert.ToBoolean(rdr["TotalDueAdvanceAmount"]);
                        fromValidation.Ledger_Id = Convert.ToBoolean(rdr["Ledger_Id"]);
                        fromValidation.PayAmount = Convert.ToBoolean(rdr["PayAmount"]);
                        fromValidation.SubLedger_Id = Convert.ToBoolean(rdr["SubLedger_Id"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("locationValidation")]
        [HttpGet]
        public HttpResponseMessage GetLocationValidation()
        {
            try
            {
                List<LocationValidation> formValidationList = new List<LocationValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "location-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        LocationValidation fromValidation = new LocationValidation();
                        fromValidation.LocationId = Convert.ToBoolean(rdr["LocationId"]);
                        fromValidation.LocationName = Convert.ToBoolean(rdr["LocationName"]);
                        fromValidation.Description = Convert.ToBoolean(rdr["Description"]);                    
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("designationValidation")]
        [HttpGet]
        public HttpResponseMessage GetDesignationValidation()
        {
            try
            {
                List<DesignationValidation> formValidationList = new List<DesignationValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "designation-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        DesignationValidation fromValidation = new DesignationValidation();
                        fromValidation.DesignationId = Convert.ToBoolean(rdr["DesignationId"]);
                        fromValidation.DesignationName = Convert.ToBoolean(rdr["DesignationName"]);
                        fromValidation.Description = Convert.ToBoolean(rdr["Description"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("gradeValidation")]
        [HttpGet]
        public HttpResponseMessage GetGradeValidation()
        {
            try
            {
                List<GradeValidation> formValidationList = new List<GradeValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "grade-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        GradeValidation fromValidation = new GradeValidation();
                        fromValidation.GradeId = Convert.ToBoolean(rdr["GradeId"]);
                        fromValidation.GradeName = Convert.ToBoolean(rdr["GradeName"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subGradeValidation")]
        [HttpGet]
        public HttpResponseMessage GetSubGradeValidation()
        {
            try
            {
                List<SubGradeValidation> formValidationList = new List<SubGradeValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "subgrade-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SubGradeValidation fromValidation = new SubGradeValidation();
                        fromValidation.SubGradeId = Convert.ToBoolean(rdr["SubGradeId"]);
                        fromValidation.SubGradeName = Convert.ToBoolean(rdr["SubGradeName"]);
                        fromValidation.Grade_Id = Convert.ToBoolean(rdr["Grade_Id"]);
                        fromValidation.EeectiveDate = Convert.ToBoolean(rdr["EeectiveDate"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("salaryItemValidation")]
        [HttpGet]
        public HttpResponseMessage GetSalaryItemValidation()
        {
            try
            {
                List<SalaryItemValidation> formValidationList = new List<SalaryItemValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "salary-item-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SalaryItemValidation fromValidation = new SalaryItemValidation();
                        fromValidation.ItemId = Convert.ToBoolean(rdr["ItemId"]);
                        fromValidation.ItemName = Convert.ToBoolean(rdr["ItemName"]);
                        fromValidation.ItemType = Convert.ToBoolean(rdr["ItemType"]);
                        fromValidation.ItemTypeName = Convert.ToBoolean(rdr["ItemTypeName"]);
                        fromValidation.IsDefault = Convert.ToBoolean(rdr["IsDefault"]);
                        fromValidation.IsBasic = Convert.ToBoolean(rdr["IsBasic"]);
                        fromValidation.IsDaily = Convert.ToBoolean(rdr["IsDaily"]);
                        fromValidation.IsLeave = Convert.ToBoolean(rdr["IsLeave"]);
                        fromValidation.IsPension = Convert.ToBoolean(rdr["IsPension"]);
                        fromValidation.Percentage = Convert.ToBoolean(rdr["Percentage"]);
                        fromValidation.InheritedItem = Convert.ToBoolean(rdr["InheritedItem"]);
                        fromValidation.IsPension = Convert.ToBoolean(rdr["IsPension"]);
                        fromValidation.IsTax = Convert.ToBoolean(rdr["IsTax"]);
                        fromValidation.IsLoan = Convert.ToBoolean(rdr["IsLoan"]);
                        fromValidation.DefaultAmount = Convert.ToBoolean(rdr["DefaultAmount"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("departmentValidation")]
        [HttpGet]
        public HttpResponseMessage GetDepartmentValidation()
        {
            try
            {
                List<DepartmentValidation> formValidationList = new List<DepartmentValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "department-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        DepartmentValidation fromValidation = new DepartmentValidation();
                        fromValidation.DepartmentId = Convert.ToBoolean(rdr["DepartmentId"]);
                        fromValidation.DepartmentName = Convert.ToBoolean(rdr["DepartmentName"]);
                        fromValidation.Description = Convert.ToBoolean(rdr["Description"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("leaveTypeValidation")]
        [HttpGet]
        public HttpResponseMessage GetLeaveTypeValidation()
        {
            try
            {
                List<LeaveTypeValidation> formValidationList = new List<LeaveTypeValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "leave-type-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        LeaveTypeValidation fromValidation = new LeaveTypeValidation();
                        fromValidation.LeaveTypeId = Convert.ToBoolean(rdr["LeaveTypeId"]);
                        fromValidation.LeaveTypeName = Convert.ToBoolean(rdr["LeaveTypeName"]);
                        fromValidation.IsPaid = Convert.ToBoolean(rdr["IsPaid"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("occupationValidation")]
        [HttpGet]
        public HttpResponseMessage GetOccupationValidation()
        {
            try
            {
                List<OccupationValidation> formValidationList = new List<OccupationValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "occupation-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        OccupationValidation fromValidation = new OccupationValidation();
                        fromValidation.OccupationId = Convert.ToBoolean(rdr["OccupationId"]);
                        fromValidation.OccupationName = Convert.ToBoolean(rdr["OccupationName"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("educationLevelValidation")]
        [HttpGet]
        public HttpResponseMessage GetEducationLevelValidation()
        {
            try
            {
                List<EducationLevelValidation> formValidationList = new List<EducationLevelValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "education-level-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        EducationLevelValidation fromValidation = new EducationLevelValidation();
                        fromValidation.LevelId = Convert.ToBoolean(rdr["LevelId"]);
                        fromValidation.LevelName = Convert.ToBoolean(rdr["LevelName"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subledgerValidation")]
        [HttpGet]
        public HttpResponseMessage SubledgerValidation()
        {
            try
            {
                List<SubledgerValidation> formValidationList = new List<SubledgerValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "subledger-entry-form");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SubledgerValidation fromValidation = new SubledgerValidation();
                        fromValidation.SublederCode = Convert.ToBoolean(rdr["SublederCode"]);
                        fromValidation.Description = Convert.ToBoolean(rdr["Description"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("offerValidation")]
        [HttpGet]
        public HttpResponseMessage OfferValidation()
        {
            try
            {
                List<OfferValidation> formValidationList = new List<OfferValidation>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("sp_get_formControlNameByFormName", con);
                    cmd.Parameters.AddWithValue("@formName", "offer-entry");
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        OfferValidation fromValidation = new OfferValidation();
                        fromValidation.CreatedDate = Convert.ToBoolean(rdr["CreatedDate"]);
                        fromValidation.EffectiveDate = Convert.ToBoolean(rdr["EffectiveDate"]);
                        fromValidation.ExpiredDate = Convert.ToBoolean(rdr["ExpiredDate"]);
                        fromValidation.IsManyToMany = Convert.ToBoolean(rdr["IsManyToMany"]);
                        fromValidation.IsManyToOne = Convert.ToBoolean(rdr["IsManyToOne"]);
                        fromValidation.IsOneToMany = Convert.ToBoolean(rdr["IsOneToMany"]);
                        fromValidation.IsSingle = Convert.ToBoolean(rdr["IsSingle"]);
                        fromValidation.OfferId = Convert.ToBoolean(rdr["OfferId"]);
                        fromValidation.OfferName = Convert.ToBoolean(rdr["OfferName"]);
                        fromValidation.OfferType = Convert.ToBoolean(rdr["OfferType"]);
                        fromValidation.DiscountRate = Convert.ToBoolean(rdr["DiscountRate"]);
                        formValidationList.Add(fromValidation);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, formValidationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
