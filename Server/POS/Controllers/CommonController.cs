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
using ViewModel.Model;
using ViewModel.Validation;

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
                    IsEmail=x.IsEmail
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
                if (formInfoList.Any())
                {
                    foreach (FormInfoView forminfo in formInfoList)
                    {
                        dt.Rows.Add(forminfo.Name, forminfo.IsEnable, forminfo.IsValidationActive, forminfo.FormName,
                            forminfo.IsMinLength, forminfo.IsMaxLength, forminfo.IsEmail);
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
                    Type = x.Type
                }).ToList();
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
                if (userFormControls.Any())
                {                
                    foreach (UserFormControlInfo forminfo in userFormControls)
                    {
                        dt.Rows.Add(forminfo.Name, forminfo.LabelName, forminfo.Autocomplete, forminfo.Editable,
                            forminfo.IsEnable, forminfo.FormName, forminfo.Type, forminfo.IsCheckbox);
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
                    StringLength = codeFormaterInfo.StringLength
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
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
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
                    StringLength = codeFormaterInfo.StringLength
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
                    StringLength = x.StringLength
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
                    StringLength = x.StringLength
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
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
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
    }
}
