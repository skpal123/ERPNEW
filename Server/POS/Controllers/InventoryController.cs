using System.Data;
using ERP.DataService.Model.Model;
using ERPWebApiService.Autentication;
using ERPWebApiService.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModel.Model;
using System.Data.Entity.Migrations;
using ERP.DataService.Model;
using ERPWebApiService.DataConnection;
using System.Data.SqlClient;
namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/InventoryService")]
    public class InventoryController : ApiController
    {
        public ActionLogger actionLogger = new ActionLogger();
        SumonERPContext ERPContext = new SumonERPContext();
        // GET api/<controller>
        [Route("units")]
        [HttpGet]
        public HttpResponseMessage GetUnitList()
        {
            try
            {
                var unitList = ERPContext.Units.Select(x => new UnitInfo
                {
                    Id = x.Id,
                    UnitName = x.UnitName,
                    Description = x.Description
                }).OrderBy(x => x.UnitName).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, unitList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("unit")]
        [HttpPost]
        public HttpResponseMessage CreateUnit(UnitInfo unitInfo)
        {
            try
            {
                var unit = new Unit()
                {
                    Id = Guid.NewGuid(),
                    UnitName = unitInfo.UnitName,
                    Description = unitInfo.Description
                };
                ERPContext.Units.Add(unit);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, unit);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("unit/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateUnit(string id, UnitInfo unitInfo)
        {
            try
            {
                var oUnit = ERPContext.Units.FirstOrDefault(x => x.Id == unitInfo.Id);
                if (oUnit != null)
                {
                    var unit = new ERP.DataService.Model.Model.Unit()
                    {
                        Id = oUnit.Id,
                        UnitName = unitInfo.UnitName,
                        Description = unitInfo.Description
                    };
                    ERPContext.Units.AddOrUpdate(unit);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("unit/{id}")]
        [HttpGet]
        public HttpResponseMessage GetUnitById(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var unitInfo = ERPContext.Units.Where(x => x.Id == Id).Select(x => new UnitInfo()
                {
                    Id = x.Id,
                    UnitName = x.UnitName,
                    Description = x.Description
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, unitInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("unit/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUnit(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", Id.ToString());
                DatabaseCommand.ExcuteNonQuery("delete from tblUnit where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("locations")]
        [HttpGet]
        public HttpResponseMessage GetLocationList()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var locationList = ERPContext.Locations.Select(x => new InventoryLocationInfo
                {
                    Id = x.Id,
                    LocationId = x.LocationId,
                    LocationName = x.LocationName,
                    Description = x.Description
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, locationList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("location")]
        [HttpPost]
        public HttpResponseMessage CreateInventoryLocation(InventoryLocationInfo inventoryLocationInfo)
        {
            try
            {
                var location = new Location()
                {
                    Id = Guid.NewGuid(),
                    LocationId = inventoryLocationInfo.LocationId,
                    LocationName = inventoryLocationInfo.LocationName,
                    Description = inventoryLocationInfo.Description
                };
                ERPContext.Locations.Add(location);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, location);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("location/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateLocation(string id, InventoryLocationInfo inventoryLocationInfo)
        {
            try
            {
                var oLocation = ERPContext.Locations.FirstOrDefault(x => x.Id == inventoryLocationInfo.Id);
                if (oLocation != null)
                {
                    var location = new Location
                    {
                        Id = oLocation.Id,
                        LocationId = inventoryLocationInfo.LocationId,
                        LocationName = inventoryLocationInfo.LocationName,
                        Description = inventoryLocationInfo.Description
                    };
                    ERPContext.Locations.AddOrUpdate(location);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("location/{id}")]
        [HttpGet]
        public HttpResponseMessage GetLocationById(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var locationInfo = ERPContext.Locations.Where(x => x.Id == Id).Select(x => new InventoryLocationInfo()
                {
                    Id = x.Id,
                    LocationId = x.LocationId,
                    LocationName = x.LocationName,
                    Description = x.Description
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, locationInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("location/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteLocation(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblItemLocation where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("categories")]
        [HttpGet]
        public HttpResponseMessage GetCategoryList()
        {
            try
            {
                var categoryList = ERPContext.Categorys.Select(x => new CategoryInfo
                {
                    Id = x.Id,
                    CategoryId = x.CategoryId,
                    CategoryName = x.CategoryName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, categoryList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("category")]
        [HttpPost]
        public HttpResponseMessage CreateCategory(CategoryInfo categoryInfo)
        {
            try
            {
                var category = new Category()
                {
                    Id = Guid.NewGuid(),
                    CategoryId = categoryInfo.CategoryId,
                    CategoryName = categoryInfo.CategoryName
                };
                ERPContext.Categorys.Add(category);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, category);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("category/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateCategory(string id, CategoryInfo categoryInfo)
        {
            try
            {
                var oCategory = ERPContext.Categorys.FirstOrDefault(x => x.Id == categoryInfo.Id);
                if (oCategory != null)
                {
                    var category = new Category
                    {
                        Id = oCategory.Id,
                        CategoryId = categoryInfo.CategoryId,
                        CategoryName = categoryInfo.CategoryName,
                    };
                    ERPContext.Categorys.AddOrUpdate(category);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("category/{id}")]
        [HttpGet]
        public HttpResponseMessage GetCategoryById(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var categoryInfo = ERPContext.Categorys.Where(x => x.Id == Id).Select(x => new CategoryInfo()
                {
                    Id = x.Id,
                    CategoryId = x.CategoryId,
                    CategoryName = x.CategoryName,
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, categoryInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("category/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCategory(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblcategory where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategories")]
        [HttpGet]
        public HttpResponseMessage GetSubCategoryList()
        {
            try
            {
                var categoryList = ERPContext.Subcategorys.Select(x => new SubCategoryInfo
                {
                    Id = x.Id,
                    SubCategoryId = x.SubCategoryId,
                    SubCategoryName = x.SubCategoryName,
                    CategoryName = ERPContext.Categorys.FirstOrDefault(y => y.Id == x.Category_Id).CategoryName
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, categoryList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategory")]
        [HttpPost]
        public HttpResponseMessage CreateSubCategory(SubCategoryInfo subCategoryInfo)
        {
            try
            {
                var subcategory = new Subcategory()
                {
                    Id = Guid.NewGuid(),
                    SubCategoryId = subCategoryInfo.SubCategoryId,
                    SubCategoryName = subCategoryInfo.SubCategoryName,
                    Category_Id = subCategoryInfo.Category_Id
                };
                ERPContext.Subcategorys.Add(subcategory);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, subcategory);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategory/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateSubCategory(string id, SubCategoryInfo subcategoryInfo)
        {
            try
            {
                var osubCategory = ERPContext.Subcategorys.FirstOrDefault(x => x.Id == subcategoryInfo.Id);
                if (osubCategory != null)
                {
                    var subcategory = new Subcategory
                    {
                        Id = osubCategory.Id,
                        SubCategoryId = subcategoryInfo.SubCategoryId,
                        SubCategoryName = subcategoryInfo.SubCategoryName,
                        Category_Id = subcategoryInfo.Category_Id
                    };
                    ERPContext.Subcategorys.AddOrUpdate(subcategory);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategory/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSubCategoryById(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var subcategoryInfo = ERPContext.Subcategorys.Where(x => x.Id == Id).Select(x => new SubCategoryInfo()
                {
                    Id = x.Id,
                    CategoryName = ERPContext.Categorys.FirstOrDefault(y => y.Id == x.Category_Id).CategoryName,
                    SubCategoryId = x.SubCategoryId,
                    SubCategoryName = x.SubCategoryName,
                    Category_Id = x.Category_Id
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, subcategoryInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("subcategory/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSubCategory(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblSubCategory where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("InventoryItems")]
        [HttpGet]
        public HttpResponseMessage GetInventoryItemList()
        {
            try
            {
                var inventoryItemist = (from item in ERPContext.InventoryItems
                                        join category in ERPContext.Categorys on item.Category_Id equals category.Id
                                        join subcategory in ERPContext.Subcategorys on item.SubCategory_Id equals subcategory.Id
                                        join unit in ERPContext.Units on item.UnitId equals unit.Id
                                        select new ItemListInfo()
                                        {
                                            Id = item.Id,
                                            ItemName = item.ItemName,
                                            ItemCode = item.ItemCode,
                                            ItemId = item.ItemId,
                                            UnitName = unit.UnitName,
                                            CategoryName = category.CategoryName,
                                            SubCategoryName = subcategory.SubCategoryName
                                        }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, inventoryItemist);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("InventoryItem")]
        [HttpPost]
        public HttpResponseMessage CreateInventoryItem(InventoryItemInfo inventoryItemInfo)
        {
            try
            {
                var inventoryItem = new InventoryItem()
                {
                    Id = Guid.NewGuid(),
                    ItemId = inventoryItemInfo.ItemId,
                    ItemCode = inventoryItemInfo.ItemCode,
                    ItemName = inventoryItemInfo.ItemName,
                    Category_Id = inventoryItemInfo.Category_Id,
                    SubCategory_Id = inventoryItemInfo.SubCategory_Id,
                    UnitId = inventoryItemInfo.UnitId,
                    Ledger_Id = inventoryItemInfo.Ledger_Id,
                    SubLedger_Id = inventoryItemInfo.SubLedger_Id,
                };
                ERPContext.InventoryItems.Add(inventoryItem);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, inventoryItem);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("InventoryItem/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateInventoryItem(string id, InventoryItemInfo inventoryItemInfo)
        {
            try
            {
                var oitem = ERPContext.InventoryItems.FirstOrDefault(x => x.Id == inventoryItemInfo.Id);
                if (oitem != null)
                {
                    var inventoryItem = new InventoryItem()
                    {
                        Id = oitem.Id,
                        ItemId = inventoryItemInfo.ItemId,
                        ItemCode = inventoryItemInfo.ItemCode,
                        ItemName = inventoryItemInfo.ItemName,
                        Category_Id = inventoryItemInfo.Category_Id,
                        SubCategory_Id = inventoryItemInfo.SubCategory_Id,
                        UnitId = inventoryItemInfo.UnitId,
                        Ledger_Id = inventoryItemInfo.Ledger_Id,
                        SubLedger_Id = inventoryItemInfo.SubLedger_Id,
                    };
                    ERPContext.InventoryItems.AddOrUpdate(inventoryItem);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("InventoryItem/{id}")]
        [HttpGet]
        public HttpResponseMessage GetInventoryItemById(string id)
        {
            try
            {
                InventoryItemInfo inventoryItemInfo = new InventoryItemInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select i.*,ca.CategoryName,subca.SubCategoryName,ac.AccountDescription+'-'+ac.ManualAccountCode LedgerName,
                    subl.Description+'-'+subl.SubledgerCode SubledgerName,u.UnitName from tblInventoryItem i
                    left join tblCategory ca on i.Category_Id=ca.Id
                    left join tblSubCategory subca on subca.Id=i.SubCategory_Id
                    left join tblAccount ac on ac.Id=i.Ledger_Id
                    left join tblUnit u on u.Id=i.UnitId
                    left join tblSubledger subl on subl.Id=i.SubLedger_Id
                    where i.Id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        inventoryItemInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        inventoryItemInfo.ItemId = rdr["ItemId"] != DBNull.Value ? rdr["ItemId"].ToString() : null;
                        inventoryItemInfo.ItemCode = rdr["ItemCode"] != DBNull.Value ? rdr["ItemCode"].ToString() : null;
                        inventoryItemInfo.ItemName = rdr["ItemName"] != DBNull.Value ? rdr["ItemName"].ToString() : null;
                        inventoryItemInfo.CategoryName = rdr["CategoryName"] != DBNull.Value ? rdr["CategoryName"].ToString() : null;
                        inventoryItemInfo.SubCategoryName = rdr["SubCategoryName"] != DBNull.Value ? rdr["SubCategoryName"].ToString() : null;
                        inventoryItemInfo.SubLedgerName = rdr["SubledgerName"] != DBNull.Value ? rdr["SubledgerName"].ToString() : null;
                        inventoryItemInfo.LedgerName = rdr["LedgerName"] != DBNull.Value ? rdr["LedgerName"].ToString() : null;
                        inventoryItemInfo.UnitName = rdr["UnitName"] != DBNull.Value ? rdr["UnitName"].ToString() : null;
                        if (rdr["Category_Id"] != DBNull.Value)
                        {
                            inventoryItemInfo.Category_Id = Guid.Parse(rdr["Category_Id"].ToString());
                        }
                        if (rdr["SubCategory_Id"] != DBNull.Value)
                        {
                            inventoryItemInfo.SubCategory_Id = Guid.Parse(rdr["SubCategory_Id"].ToString());
                        }
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            inventoryItemInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            inventoryItemInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                        if (rdr["UnitId"] != DBNull.Value)
                        {
                            inventoryItemInfo.UnitId = Guid.Parse(rdr["UnitId"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, inventoryItemInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("InventoryItem/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteInventoryItem(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblInventoryItem where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Partys")]
        [HttpGet]
        public HttpResponseMessage GetPartyList()
        {
            try
            {
                List<PartyInfo> partyList = new List<PartyInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select p.*,ac.AccountDescription,sl.Description from tblparty p
                    left join tblAccount ac on p.Ledger_Id=ac.id
                    left join tblSubledger sl on p.SubLedger_Id=sl.Id", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PartyInfo partyInfo = new PartyInfo();
                        partyInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        partyInfo.PartyId = rdr["PartyId"] != DBNull.Value ? rdr["PartyId"].ToString() : null;
                        partyInfo.PartyName = rdr["PartyName"] != DBNull.Value ? rdr["PartyName"].ToString() : null;
                        partyInfo.ContactPerson = rdr["ContactPerson"] != DBNull.Value ? rdr["ContactPerson"].ToString() : null;
                        partyInfo.PhoneNo = rdr["PnoneNo"] != DBNull.Value ? rdr["PnoneNo"].ToString() : null;
                        partyInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        partyInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        partyInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value ? rdr["AccountDescription"].ToString() : null;
                        partyInfo.SubLedgerName = rdr["Description"] != DBNull.Value ? rdr["Description"].ToString() : null;
                        partyList.Add(partyInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, partyList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Party")]
        [HttpPost]
        public HttpResponseMessage CreateParty(PartyInfo partyInfo)
        {
            try
            {
                var party = new Party()
                {
                    Id = Guid.NewGuid(),
                    PartyId = partyInfo.PartyId,
                    PartyName = partyInfo.PartyName,
                    PnoneNo = partyInfo.PhoneNo,
                    ContactPerson = partyInfo.ContactPerson,
                    Email = partyInfo.Email,
                    Address = partyInfo.Address,
                    Ledger_Id = partyInfo.Ledger_Id,
                    SubLedger_Id = partyInfo.SubLedger_Id,
                };
                ERPContext.Partys.Add(party);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, party);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Party/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateParty(string id, PartyInfo partyInfo)
        {
            try
            {
                var oParty = ERPContext.Partys.FirstOrDefault(x => x.Id == partyInfo.Id);
                if (oParty != null)
                {
                    var party = new Party()
                    {
                        Id = oParty.Id,
                        PartyId = partyInfo.PartyId,
                        PartyName = partyInfo.PartyName,
                        PnoneNo = partyInfo.PhoneNo,
                        ContactPerson = partyInfo.ContactPerson,
                        Email = partyInfo.Email,
                        Address = partyInfo.Address,
                        Ledger_Id = partyInfo.Ledger_Id,
                        SubLedger_Id = partyInfo.SubLedger_Id,
                    };
                    ERPContext.Partys.AddOrUpdate(party);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Party/{id}")]
        [HttpGet]
        public HttpResponseMessage GetPartyById(string id)
        {
            try
            {
                PartyInfo partyInfo = new PartyInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select p.*,ac.AccountDescription,sl.Description from tblparty p
                    left join tblAccount ac on p.Ledger_Id=ac.id
                    left join tblSubledger sl on p.SubLedger_Id=sl.Id where p.id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        partyInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        partyInfo.PartyId = rdr["PartyId"] != DBNull.Value ? rdr["PartyId"].ToString() : null;
                        partyInfo.PartyName = rdr["PartyName"] != DBNull.Value ? rdr["PartyName"].ToString() : null;
                        partyInfo.ContactPerson = rdr["ContactPerson"] != DBNull.Value ? rdr["ContactPerson"].ToString() : null;
                        partyInfo.PhoneNo = rdr["PnoneNo"] != DBNull.Value ? rdr["PnoneNo"].ToString() : null;
                        partyInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        partyInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        partyInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value ? rdr["AccountDescription"].ToString() : null;
                        partyInfo.SubLedgerName = rdr["Description"] != DBNull.Value ? rdr["Description"].ToString() : null;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            partyInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            partyInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, partyInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Party/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteParty(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblparty where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Suppliers")]
        [HttpGet]
        public HttpResponseMessage GetSupplierList()
        {
            try
            {
                List<SupplierInfo> supplierInfoList = new List<SupplierInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select p.*,ac.AccountDescription,sl.Description from tblSupplier p
                    left join tblAccount ac on p.Ledger_Id=ac.id
                    left join tblSubledger sl on p.SubLedger_Id=sl.Id", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SupplierInfo supplierInfo = new SupplierInfo();
                        supplierInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        supplierInfo.SupplierId = rdr["SupplierId"] != DBNull.Value ? rdr["SupplierId"].ToString() : null;
                        supplierInfo.SupplierName = rdr["SupplierName"] != DBNull.Value ? rdr["SupplierName"].ToString() : null;
                        supplierInfo.ContactPerson = rdr["ContactPerson"] != DBNull.Value ? rdr["ContactPerson"].ToString() : null;
                        supplierInfo.PhoneNo = rdr["PnoneNo"] != DBNull.Value ? rdr["PnoneNo"].ToString() : null;
                        supplierInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        supplierInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        supplierInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value ? rdr["AccountDescription"].ToString() : null;
                        supplierInfo.SubLedgerName = rdr["Description"] != DBNull.Value ? rdr["Description"].ToString() : null;
                        supplierInfoList.Add(supplierInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, supplierInfoList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Supplier")]
        [HttpPost]
        public HttpResponseMessage CreateSupplier(SupplierInfo supplierInfo)
        {
            try
            {
                var supplier = new Supplier()
                {
                    Id = Guid.NewGuid(),
                    SupplierId = supplierInfo.SupplierId,
                    SupplierName = supplierInfo.SupplierName,
                    PnoneNo = supplierInfo.PhoneNo,
                    ContactPerson = supplierInfo.ContactPerson,
                    Email = supplierInfo.Email,
                    Address = supplierInfo.Address,
                    Ledger_Id = supplierInfo.Ledger_Id,
                    SubLedger_Id = supplierInfo.SubLedger_Id,
                };
                ERPContext.Suppliers.Add(supplier);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, supplier);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Supplier/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateSupplier(string id, SupplierInfo supplierInfo)
        {
            try
            {
                var oSupplier = ERPContext.Suppliers.FirstOrDefault(x => x.Id == supplierInfo.Id);
                if (oSupplier != null)
                {
                    var supplier = new Supplier()
                    {
                        Id = oSupplier.Id,
                        SupplierId = supplierInfo.SupplierId,
                        SupplierName = supplierInfo.SupplierName,
                        PnoneNo = supplierInfo.PhoneNo,
                        ContactPerson = supplierInfo.ContactPerson,
                        Email = supplierInfo.Email,
                        Address = supplierInfo.Address,
                        Ledger_Id = supplierInfo.Ledger_Id,
                        SubLedger_Id = supplierInfo.SubLedger_Id
                    };
                    ERPContext.Suppliers.AddOrUpdate(supplier);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Supplier/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSupplierById(string id)
        {
            try
            {
                SupplierInfo supplierInfo = new SupplierInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select p.*,ac.AccountDescription,sl.Description from tblSupplier p
                    left join tblAccount ac on p.Ledger_Id=ac.id
                    left join tblSubledger sl on p.SubLedger_Id=sl.Id where p.id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        supplierInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        supplierInfo.SupplierId = rdr["SupplierId"] != DBNull.Value ? rdr["SupplierId"].ToString() : null;
                        supplierInfo.SupplierName = rdr["SupplierName"] != DBNull.Value ? rdr["SupplierName"].ToString() : null;
                        supplierInfo.ContactPerson = rdr["ContactPerson"] != DBNull.Value ? rdr["ContactPerson"].ToString() : null;
                        supplierInfo.PhoneNo = rdr["PnoneNo"] != DBNull.Value ? rdr["PnoneNo"].ToString() : null;
                        supplierInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        supplierInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        supplierInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value ? rdr["AccountDescription"].ToString() : null;
                        supplierInfo.SubLedgerName = rdr["Description"] != DBNull.Value ? rdr["Description"].ToString() : null;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            supplierInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            supplierInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, supplierInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Supplier/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSupplier(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblSupplier where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Manufactures")]
        [HttpGet]
        public HttpResponseMessage GetManufactureList()
        {
            try
            {
                var manufactureList = ERPContext.Manufactures.Select(x => new ManufactureInfo()
                {
                    Id = x.Id,
                    ManufactureId = x.ManufactureId,
                    ManufactureName = x.ManufactureName,
                    Address = x.Address,
                    Country_Id = x.Country_Id
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, manufactureList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Manufacture")]
        [HttpPost]
        public HttpResponseMessage CreateManufacture(ManufactureInfo manufactureInfo)
        {
            try
            {
                var manufacture = new Manufacture()
                {
                    Id = Guid.NewGuid(),
                    ManufactureId = manufactureInfo.ManufactureId,
                    ManufactureName = manufactureInfo.ManufactureName,
                    Address = manufactureInfo.Address,
                    Country_Id = manufactureInfo.Country_Id,
                };
                manufacture.ManufactureId = DatabaseCommand.GetAutoGeneratedCode("manufacture", null);
                ERPContext.Manufactures.Add(manufacture);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, manufacture);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Manufacture/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateManufacture(string id, ManufactureInfo manufactureInfo)
        {
            try
            {
                var oManufacture = ERPContext.Manufactures.FirstOrDefault(x => x.Id == manufactureInfo.Id);
                if (oManufacture != null)
                {
                    var manufacture = new Manufacture()
                    {
                        Id = oManufacture.Id,
                        ManufactureId = manufactureInfo.ManufactureId,
                        ManufactureName = manufactureInfo.ManufactureName,
                        Address = manufactureInfo.Address,
                        Country_Id = manufactureInfo.Country_Id,
                    };
                    ERPContext.Manufactures.AddOrUpdate(manufacture);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Manufacture/{id}")]
        [HttpGet]
        public HttpResponseMessage GetManufactureId(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var manufacture = ERPContext.Manufactures.Where(x => x.Id == Id).Select(x => new ManufactureInfo()
                {
                    Id = x.Id,
                    ManufactureId = x.ManufactureId,
                    ManufactureName = x.ManufactureName,
                    Address = x.Address,
                    Country_Id = x.Country_Id
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, manufacture);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Manufacture/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteManufacture(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from Manufactures where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customers")]
        [HttpGet]
        public HttpResponseMessage GetCustomerList()
        {
            try
            {
                List<CustomerInfo> customerList = new List<CustomerInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select c.Id,c.CustomerId,c.CustomerName,c.PhoneNo,c.Email,c.Address,a.AccountDescription,s.Description from tblCustomer c
                                                    left join tblAccount a on c.Ledger_Id=a.id
                                                    left join tblSubledger s on c.SubLedger_Id=s.Id", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        CustomerInfo customerInfo = new CustomerInfo();
                        customerInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        customerInfo.CustomerId = rdr["CustomerId"] != DBNull.Value ? rdr["CustomerId"].ToString() : null;
                        customerInfo.CustomerName = rdr["CustomerName"] != DBNull.Value ? rdr["CustomerName"].ToString() : null;
                        customerInfo.PhoneNo = rdr["PhoneNo"] != DBNull.Value ? rdr["PhoneNo"].ToString() : null;
                        customerInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        customerInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        customerInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value ? rdr["AccountDescription"].ToString() : null;
                        customerInfo.SubLedgerName = rdr["Description"] != DBNull.Value ? rdr["Description"].ToString() : null;
                        customerList.Add(customerInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, customerList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer")]
        [HttpPost]
        public HttpResponseMessage CreateCustomer(CustomerInfo customerInfo)
        {
            try
            {
                var customer = new Customer()
                {
                    Id = Guid.NewGuid(),
                    CustomerId = customerInfo.CustomerId,
                    CustomerName = customerInfo.CustomerName,
                    PhoneNo = customerInfo.PhoneNo,
                    Address = customerInfo.Address,
                    Email = customerInfo.Email,
                    Ledger_Id = customerInfo.Ledger_Id,
                    SubLedger_Id = customerInfo.SubLedger_Id
                };
                //customer.CustomerId = DatabaseCommand.GetAutoGeneratedCode("manufacture", null);
                ERPContext.Customers.Add(customer);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, customer);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateCustomer(string id, CustomerInfo customerInfo)
        {
            try
            {
                var oCustomer = ERPContext.Customers.FirstOrDefault(x => x.Id == customerInfo.Id);
                if (oCustomer != null)
                {
                    var customer = new Customer()
                    {
                        Id = oCustomer.Id,
                        CustomerId = customerInfo.CustomerId,
                        CustomerName = customerInfo.CustomerName,
                        PhoneNo = customerInfo.PhoneNo,
                        Address = customerInfo.Address,
                        Email = customerInfo.Email,
                        Ledger_Id = customerInfo.Ledger_Id,
                        SubLedger_Id = customerInfo.SubLedger_Id
                    };
                    ERPContext.Customers.AddOrUpdate(customer);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer/{id}")]
        [HttpGet]
        public HttpResponseMessage GetCustomerById(string id)
        {
            try
            {
                CustomerInfo customerInfo = new CustomerInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select c.*,a.AccountDescription,s.Description from tblCustomer c
                                                    left join tblAccount a on c.Ledger_Id=a.id
                                                    left join tblSubledger s on c.SubLedger_Id=s.Id where c.id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        customerInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        customerInfo.CustomerId = rdr["CustomerId"] != DBNull.Value
                            ? rdr["CustomerId"].ToString()
                            : null;
                        customerInfo.CustomerName = rdr["CustomerName"] != DBNull.Value
                            ? rdr["CustomerName"].ToString()
                            : null;
                        customerInfo.PhoneNo = rdr["PhoneNo"] != DBNull.Value ? rdr["PhoneNo"].ToString() : null;
                        customerInfo.Email = rdr["Email"] != DBNull.Value ? rdr["Email"].ToString() : null;
                        customerInfo.Address = rdr["Address"] != DBNull.Value ? rdr["Address"].ToString() : null;
                        customerInfo.LedgerName = rdr["AccountDescription"] != DBNull.Value
                            ? rdr["AccountDescription"].ToString()
                            : null;
                        customerInfo.SubLedgerName = rdr["Description"] != DBNull.Value
                            ? rdr["Description"].ToString()
                            : null;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            customerInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            customerInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, customerInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCustomer(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblCustomer where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GroupItems/{transactionType}")]
        [HttpGet]
        public HttpResponseMessage GetGroupItemList(string transactionType)
        {
            try
            {
                List<InventoryGroupListInfo> inventoryGroupList = new List<InventoryGroupListInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select g.Id, g.TransactionId,g.TransactionType,g.Quantity,g.TotalAmount,
                    g.DiscountRate,g.DiscountAmount,g.vat,g.Tax,g.NetPaidAmount,
                    g.ChalanNo,g.InvoiceNo,g.Comments,g.TransactionDate,g.GrvNo,g.GrvDate,
                    s.SupplierName,p.PartyName,c.CustomerName from tblgroupitem g
                    left join tblSupplier  s on g.Supplier_Id=s.Id
                    left join tblCustomer c on g.Customer_Id=c.id
                    left join tblParty p on g.Party_Id=p.Id where TransactionType=@transactionType", con);
                    con.Open();
                    cmd.Parameters.AddWithValue("@transactionType", transactionType);
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        InventoryGroupListInfo inventoryGroup = new InventoryGroupListInfo();
                        inventoryGroup.Id = Guid.Parse(rdr["Id"].ToString());
                        inventoryGroup.TransactionId = rdr["TransactionId"] != DBNull.Value ? rdr["TransactionId"].ToString() : null;
                        inventoryGroup.TransactionType = rdr["TransactionType"] != DBNull.Value ? rdr["TransactionType"].ToString() : null;
                        inventoryGroup.Quantity = rdr["Quantity"] != DBNull.Value ? Convert.ToInt32(rdr["Quantity"].ToString()) : 0;
                        inventoryGroup.TotalAmount = rdr["TotalAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["TotalAmount"].ToString()) : 0;
                        inventoryGroup.DiscountRate = rdr["DiscountRate"] != DBNull.Value ? Convert.ToDecimal(rdr["DiscountRate"].ToString()) : 0;
                        inventoryGroup.DiscountAmount = rdr["DiscountAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["DiscountAmount"].ToString()) : 0;
                        inventoryGroup.Vat = rdr["Vat"] != DBNull.Value ? Convert.ToDecimal(rdr["Vat"].ToString()) : 0;
                        inventoryGroup.Tax = rdr["Tax"] != DBNull.Value ? Convert.ToDecimal(rdr["Tax"].ToString()) : 0;
                        inventoryGroup.NetPaidAmount = rdr["NetPaidAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["NetPaidAmount"].ToString()) : 0;
                        inventoryGroup.ChalanNo = rdr["ChalanNo"] != DBNull.Value ? rdr["ChalanNo"].ToString() : null;
                        inventoryGroup.InvoiceNo = rdr["InvoiceNo"] != DBNull.Value ? rdr["InvoiceNo"].ToString() : null;
                        inventoryGroup.Comments = rdr["Comments"] != DBNull.Value ? rdr["Comments"].ToString() : null;
                        inventoryGroup.GrvNo = rdr["GrvNo"] != DBNull.Value ? rdr["GrvNo"].ToString() : null;
                        inventoryGroup.SupplierName = rdr["SupplierName"] != DBNull.Value ? rdr["SupplierName"].ToString() : null;
                        inventoryGroup.PartyName = rdr["PartyName"] != DBNull.Value ? rdr["PartyName"].ToString() : null;
                        inventoryGroup.CustomerName = rdr["CustomerName"] != DBNull.Value ? rdr["CustomerName"].ToString() : null;
                        if (rdr["TransactionDate"] != DBNull.Value)
                        {
                            inventoryGroup.TransactionDate = Convert.ToDateTime(rdr["TransactionDate"]);
                        }
                        if (rdr["GrvDate"] != DBNull.Value)
                        {
                            inventoryGroup.GrvDate = Convert.ToDateTime(rdr["GrvDate"]);
                        }
                        inventoryGroupList.Add(inventoryGroup);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK, inventoryGroupList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GroupItem")]
        [HttpPost]
        public HttpResponseMessage CreateGroupItem(GroupItemInfo groupItemInfo)
        {
            try
            {
                DataTable dt = new DataTable();
                var groupItem = new GroupItem()
                {
                    Id = Guid.NewGuid(),
                    TransactionId = groupItemInfo.TransactionId,
                    TransactionType = groupItemInfo.TransactionType,
                    Reason = groupItemInfo.Reason,
                    TransactionDate = groupItemInfo.TransactionDate,
                    Quantity = groupItemInfo.Quantity,
                    TotalAmount = groupItemInfo.TotalAmount,
                    Vat = groupItemInfo.Vat,
                    Tax = groupItemInfo.Tax,
                    DiscountRate = groupItemInfo.DiscountRate,
                    DiscountAmount = groupItemInfo.DiscountAmount,
                    NetPaidAmount = groupItemInfo.NetPaidAmount,
                    PaymentMode = groupItemInfo.PaymentMode,
                    Ledger_Id = groupItemInfo.Ledger_Id,
                    SubLedger_Id = groupItemInfo.SubLedger_Id,
                    Comments = groupItemInfo.Comments,
                    GrvNo = groupItemInfo.GrvNo,
                    GrvDate = groupItemInfo.GrvDate,
                    InvoiceNo = groupItemInfo.InvoiceNo,
                    ChalanNo = groupItemInfo.ChalanNo,
                    Supplier_Id = groupItemInfo.Supplier_Id,
                    Approver_Id = groupItemInfo.Approver_Id,
                    LotNo = groupItemInfo.LotNo
                };
                ERPContext.GroupItems.Add(groupItem);
                ERPContext.SaveChanges();
                dt.Columns.Add("Id", typeof(Guid));
                dt.Columns.Add("TransactionId", typeof(string));
                dt.Columns.Add("Reason", typeof(string));
                dt.Columns.Add("TransactionType", typeof(string));
                dt.Columns.Add("Quantity", typeof(Int32));
                dt.Columns.Add("UnitCost", typeof(decimal));
                dt.Columns.Add("UnitSale", typeof(decimal));
                dt.Columns.Add("Vat", typeof(decimal));
                dt.Columns.Add("Tax", typeof(decimal));
                dt.Columns.Add("DiscountAmount", typeof(decimal));
                dt.Columns.Add("SerialNo", typeof(Int32));
                dt.Columns.Add("DiscountRate", typeof(decimal));
                dt.Columns.Add("LotNo", typeof(string));
                dt.Columns.Add("TransactionDate", typeof(DateTime));
                dt.Columns.Add("Group_Id", typeof(Guid));
                dt.Columns.Add("Item_Id", typeof(Guid));
                dt.Columns.Add("Location_Id", typeof(Guid));
                if (groupItemInfo.ItemTransactionList.Any())
                {
                    foreach (var item in groupItemInfo.ItemTransactionList)
                    {
                        dt.Rows.Add(Guid.NewGuid(), item.TransactionId, item.Reason, item.TransactionType, item.Quantity, item.UnitCost,
                            item.UnitSale, item.Vat, item.Tax, item.DiscountAmount, item.SerialNo, item.DiscountRate, item.LotNo,
                            item.TransactionDate, groupItem.Id, item.Item_Id, item.Location_Id);
                    }
                }
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@typeItemTransaction", dt);
                DatabaseCommand.ExcuteObjectNonQuery("proc_SaveItemTransaction", paramlist, "procedure");
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GroupItem/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateGroupItem(string id, GroupItemInfo groupItemInfo)
        {
            try
            {
                var oGroupItem = ERPContext.GroupItems.FirstOrDefault(x => x.Id == groupItemInfo.Id);
                if (oGroupItem != null)
                {
                    DataTable dt = new DataTable();
                    var groupItem = new GroupItem()
                    {
                        Id = oGroupItem.Id,
                        TransactionId = groupItemInfo.TransactionId,
                        TransactionType = groupItemInfo.TransactionType,
                        Reason = groupItemInfo.Reason,
                        TransactionDate = groupItemInfo.TransactionDate,
                        Quantity = groupItemInfo.Quantity,
                        TotalAmount = groupItemInfo.TotalAmount,
                        Vat = groupItemInfo.Vat,
                        Tax = groupItemInfo.Tax,
                        DiscountRate = groupItemInfo.DiscountRate,
                        DiscountAmount = groupItemInfo.DiscountAmount,
                        NetPaidAmount = groupItemInfo.NetPaidAmount,
                        PaymentMode = groupItemInfo.PaymentMode,
                        Ledger_Id = groupItemInfo.Ledger_Id,
                        SubLedger_Id = groupItemInfo.SubLedger_Id,
                        Comments = groupItemInfo.Comments,
                        GrvNo = groupItemInfo.GrvNo,
                        GrvDate = groupItemInfo.GrvDate,
                        InvoiceNo = groupItemInfo.InvoiceNo,
                        ChalanNo = groupItemInfo.ChalanNo,
                        Supplier_Id = groupItemInfo.Supplier_Id,
                        Approver_Id = groupItemInfo.Approver_Id,
                        LotNo = groupItemInfo.LotNo
                    };
                    ERPContext.GroupItems.AddOrUpdate(groupItem);
                    ERPContext.SaveChanges();
                    dt.Columns.Add("Id", typeof(Guid));
                    dt.Columns.Add("TransactionId", typeof(string));
                    dt.Columns.Add("Reason", typeof(string));
                    dt.Columns.Add("TransactionType", typeof(string));
                    dt.Columns.Add("Quantity", typeof(Int32));
                    dt.Columns.Add("UnitCost", typeof(decimal));
                    dt.Columns.Add("UnitSale", typeof(decimal));
                    dt.Columns.Add("Vat", typeof(decimal));
                    dt.Columns.Add("Tax", typeof(decimal));
                    dt.Columns.Add("DiscountAmount", typeof(decimal));
                    dt.Columns.Add("SerialNo]", typeof(Int32));
                    dt.Columns.Add("DiscountRate", typeof(decimal));
                    dt.Columns.Add("LotNo", typeof(string));
                    dt.Columns.Add("TransactionDate", typeof(DateTime));
                    dt.Columns.Add("Group_Id", typeof(Guid));
                    dt.Columns.Add("Item_Id", typeof(Guid));
                    dt.Columns.Add("Location_Id", typeof(Guid));
                    if (groupItemInfo.ItemTransactionList.Any())
                    {
                        foreach (var item in groupItemInfo.ItemTransactionList)
                        {
                            dt.Rows.Add(Guid.NewGuid(), item.TransactionId, item.Reason, item.TransactionType, item.Quantity, item.UnitCost,
                                item.UnitSale, item.Vat, item.Tax, item.DiscountAmount, item.SerialNo, item.DiscountRate, item.LotNo,
                                item.TransactionDate, oGroupItem.Id, item.Item_Id, item.Location_Id);
                        }
                    }
                    Dictionary<string, object> paramlist = new Dictionary<string, object>();
                    paramlist.Add("@typeItemTransaction", dt);
                    DatabaseCommand.ExcuteObjectNonQuery("proc_SaveItemTransaction", paramlist, "procedure");
                }

                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GroupItem/{id}")]
        [HttpGet]
        public HttpResponseMessage GetGroupItemId(string id)
        {
            try
            {
                var Id = Guid.Parse(id);
                var manufacture = ERPContext.GroupItems.Where(x => x.Id == Id).Select(x => new GroupItemInfo()
                {
                    Id = x.Id,
                    TransactionId = x.TransactionId,
                    TransactionType = x.TransactionType,
                    Reason = x.Reason,
                    TransactionDate = x.TransactionDate,
                    Quantity = x.Quantity,
                    TotalAmount = x.TotalAmount,
                    Vat = x.Vat,
                    Tax = x.Tax,
                    DiscountRate = x.DiscountRate,
                    DiscountAmount = x.DiscountAmount,
                    NetPaidAmount = x.NetPaidAmount,
                    PaymentMode = x.PaymentMode,
                    Ledger_Id = x.Ledger_Id,
                    LedgerName = ERPContext.Accounts.FirstOrDefault(y => y.Id == x.Ledger_Id) != null ? ERPContext.Accounts.FirstOrDefault(y => y.Id == x.Ledger_Id).AccountDescription : null,
                    SubLedger_Id = x.SubLedger_Id,
                    SubLedgerName = ERPContext.Subledgers.FirstOrDefault(y => y.Id == x.SubLedger_Id) != null ? ERPContext.Subledgers.FirstOrDefault(y => y.Id == x.Supplier_Id).Description : null,
                    Comments = x.Comments,
                    GrvNo = x.GrvNo,
                    GrvDate = x.GrvDate,
                    InvoiceNo = x.InvoiceNo,
                    ChalanNo = x.ChalanNo,
                    Supplier_Id = x.Supplier_Id,
                    SupplierName = ERPContext.Suppliers.FirstOrDefault(y => y.Id == x.Supplier_Id) != null ? ERPContext.Suppliers.FirstOrDefault(y => y.Id == x.Supplier_Id).SupplierName : null,
                    Approver_Id = x.Approver_Id,
                    ItemTransactionList = ERPContext.ItemTransactions.Where(y => y.Group_Id == x.Id).Select(y => new ItemTransactionInfo()
                    {
                        Id = y.Id,
                        TransactionId = y.TransactionId,
                        Reason = y.Reason,
                        TransactionType = y.TransactionType,
                        Quantity = y.Quantity,
                        UnitCost = y.UnitCost,
                        UnitSale = y.UnitSale,
                        Vat = y.Vat,
                        Tax = y.Tax,
                        DiscountAmount = y.DiscountAmount,
                        SerialNo = y.SerialNo,
                        DiscountRate = y.DiscountRate,
                        LotNo = y.LotNo,
                        TransactionDate = y.TransactionDate,
                        Group_Id = y.Group_Id,
                        Item_Id = y.Item_Id,
                        ItemName = ERPContext.InventoryItems.FirstOrDefault(m => m.Id == y.Item_Id) != null ? ERPContext.InventoryItems.FirstOrDefault(m => m.Id == y.Item_Id).ItemName : null,
                        Location_Id = y.Location_Id,
                        LocationName = ERPContext.Locations.FirstOrDefault(m => m.Id == y.Location_Id) != null ? ERPContext.Locations.FirstOrDefault(m => m.Id == y.Location_Id).LocationName : null,
                    }).ToList()
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, manufacture);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("GroupItem/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteGroupItem(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery(@"delete from tblgroupItem where id=@id;
                delete from tblItemTransaction where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("settingSellPrice")]
        [HttpPost]
        public HttpResponseMessage SaveSellSettingPrice(List<SettingSellPriceInfo> sellPriceInfos)
        {
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("Id", typeof(Guid));
                dt.Columns.Add("ItemCode", typeof(string));
                dt.Columns.Add("ItemId", typeof(string));
                dt.Columns.Add("PurchaseDate", typeof(DateTime));
                dt.Columns.Add("PreviousAmount", typeof(decimal));
                dt.Columns.Add("Amount", typeof(decimal));
                dt.Columns.Add("Item_Id", typeof(Guid));
                if (sellPriceInfos.Any())
                {
                    foreach (var sellPrice in sellPriceInfos)
                    {
                        dt.Rows.Add(Guid.NewGuid(), sellPrice.ItemCode, sellPrice.ItemId, sellPrice.PurchaseDate, sellPrice.PreviousAmount, sellPrice.Amount, sellPrice.Item_Id);
                    }
                }
                Dictionary<string, object> paramlist = new Dictionary<string, object>();
                paramlist.Add("@TypeSettingSellPrice", dt);
                DatabaseCommand.ExcuteObjectNonQuery("proc_SaveSettingSellPriceType", paramlist, "procedure");
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("settingSellPrice/{methodType}")]
        [HttpGet]
        public HttpResponseMessage GetSellSettingPrice(string methodType)
        {
            try
            {
                List<SettingSellPriceInfo> settingSellPriceInfos = new List<SettingSellPriceInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("proc_GetSettingSellPrice", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@methodType", methodType);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SettingSellPriceInfo settingSellPrice = new SettingSellPriceInfo();
                        settingSellPrice.Id = rdr["Id"] != DBNull.Value ? Guid.Parse(rdr["Id"].ToString()) : Guid.Empty;
                        settingSellPrice.ItemId = rdr["ItemId"] != DBNull.Value ? rdr["ItemId"].ToString() : null;
                        settingSellPrice.ItemCode = rdr["ItemCode"] != DBNull.Value ? rdr["ItemCode"].ToString() : null;
                        settingSellPrice.ItemName = rdr["ItemName"] != DBNull.Value ? rdr["ItemName"].ToString() : null;
                        settingSellPrice.Amount = rdr["Amount"] != DBNull.Value ? Convert.ToInt32(rdr["Amount"]) : 0;
                        settingSellPrice.PreviousAmount = settingSellPrice.Amount;
                        if (rdr["PurchaseDate"] != DBNull.Value)
                        {
                            settingSellPrice.PurchaseDate = Convert.ToDateTime(rdr["PurchaseDate"].ToString());
                        }
                        if (rdr["Item_Id"] != DBNull.Value)
                        {
                            settingSellPrice.Item_Id = Guid.Parse(rdr["Item_Id"].ToString());
                        }
                        settingSellPriceInfos.Add(settingSellPrice);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.Created, settingSellPriceInfos);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("getItemStock/{itemId}/{locationId}")]
        [HttpGet]
        public HttpResponseMessage GetItemStock(string itemId, string locationId)
        {
            try
            {
                Guid item_id;
                var isItemId = Guid.TryParse(itemId, out item_id);
                Guid location_id;
                var isLocationId = Guid.TryParse(locationId, out location_id);
                if (isItemId && isLocationId)
                {
                    using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                    {
                        SqlCommand cmd = new SqlCommand("select dbo.func_get_item_stock(@item_id,@location_id)", con);
                        cmd.Parameters.AddWithValue("@item_id", item_id);
                        cmd.Parameters.AddWithValue("@location_id", location_id);
                        con.Open();
                        return Request.CreateResponse(HttpStatusCode.OK, cmd.ExecuteScalar());
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.Created, 0);
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction")]
        [HttpPost]
        public HttpResponseMessage CreateCustomerTransaction(PartyTransactionInfo partyTransactionInfo)
        {
            try
            {
                var partyTransaction = new PartyTransaction()
                {
                    Id = Guid.NewGuid(),
                    ChalanNo = partyTransactionInfo.ChalanNo,
                    InvoiceNo = partyTransactionInfo.InvoiceNo,
                    OrderNo = partyTransactionInfo.OrderNo,
                    Customer_Id = partyTransactionInfo.Customer_Id,
                    Group_Id = partyTransactionInfo.Group_Id,
                    PaymentMode = partyTransactionInfo.PaymentMode,
                    PaymentDate = partyTransactionInfo.PaymentDate,
                    Ledger_Id = partyTransactionInfo.Ledger_Id,
                    SubLedger_Id = partyTransactionInfo.SubLedger_Id,
                    PaidAmount = partyTransactionInfo.PaidAmount,
                };
                //customer.CustomerId = DatabaseCommand.GetAutoGeneratedCode("manufacture", null);
                ERPContext.PartyTransactions.Add(partyTransaction);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, partyTransaction);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateCustomerTransaction(string id, PartyTransactionInfo partyTransactionInfo)
        {
            try
            {
                var oPartyTransaction = ERPContext.PartyTransactions.FirstOrDefault(x => x.Id == partyTransactionInfo.Id);
                if (oPartyTransaction != null)
                {
                    var partyTransaction = new PartyTransaction()
                    {
                        Id = oPartyTransaction.Id,
                        ChalanNo = partyTransactionInfo.ChalanNo,
                        InvoiceNo = partyTransactionInfo.InvoiceNo,
                        OrderNo = partyTransactionInfo.OrderNo,
                        Group_Id = partyTransactionInfo.Group_Id,
                        Customer_Id = partyTransactionInfo.Customer_Id,
                        PaymentMode = partyTransactionInfo.PaymentMode,
                        PaymentDate = partyTransactionInfo.PaymentDate,
                        Ledger_Id = partyTransactionInfo.Ledger_Id,
                        SubLedger_Id = partyTransactionInfo.SubLedger_Id,
                        PaidAmount = partyTransactionInfo.PaidAmount,
                    };
                    ERPContext.PartyTransactions.AddOrUpdate(partyTransaction);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransactions/{startDate}/{endDate}/{customerId}")]
        [HttpGet]
        public HttpResponseMessage GetCustomerTransacions(string startDate, string endDate, string customerId)
        {
            try
            {
                DateTime? convertedStartDate = startDate.GetDateTime();
                DateTime? convertedEndDate = endDate.GetDateTime();
                Guid CustomerId = Guid.Empty;
                bool isCustomerId = Guid.TryParse(customerId, out CustomerId);
                List<PartyTransactionInfo> customerInfoList = new List<PartyTransactionInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("proc_getPartyTransaction", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StartDate", convertedStartDate);
                    cmd.Parameters.AddWithValue("@EndDate", convertedEndDate);
                    cmd.Parameters.AddWithValue("@customer_id", isCustomerId == true ? CustomerId.ToString() : null);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        PartyTransactionInfo partyTransactionInfo = new PartyTransactionInfo();
                        partyTransactionInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        partyTransactionInfo.ChalanNo = rdr["ChalanNo"] != DBNull.Value
                            ? rdr["ChalanNo"].ToString()
                            : null;
                        partyTransactionInfo.OrderNo = rdr["OrderNo"] != DBNull.Value
                            ? rdr["OrderNo"].ToString()
                            : null;
                        if (rdr["PhoneNo"] != DBNull.Value)
                        {
                            partyTransactionInfo.Group_Id = Guid.Parse(rdr["PhoneNo"].ToString());
                        }
                        if (rdr["PaymentDate"] != DBNull.Value)
                        {
                            partyTransactionInfo.PaymentDate = Convert.ToDateTime(rdr["PhoneNo"].ToString());
                        }
                        partyTransactionInfo.PaidAmount = rdr["PaidAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["PaymentMode"]) : 0;
                        partyTransactionInfo.PaymentMode = rdr["PaymentMode"] != DBNull.Value ? Convert.ToInt32(rdr["PaymentMode"]) : 0;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            partyTransactionInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            partyTransactionInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                        customerInfoList.Add(partyTransactionInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, customerInfoList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction/{id}")]
        [HttpGet]
        public HttpResponseMessage GetCustomerTransacionsById(string id)
        {
            try
            {
                DateTime? convertedStartDate = DateTime.Now;
                DateTime? convertedEndDate = DateTime.Now;
                PartyTransactionInfo partyTransactionInfo = new PartyTransactionInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select pt.Id,ChalanNo,InvoiceNo,OrderNo,Group_Id,PaymentMode,paymentDate,PaidAmount,AccountDescription LedgerName,sl.Description SubledgerName from tblpartytransaction pt
                                                    left join tblAccount ac on pt.Ledger_Id= ac.id
                                                    left join tblSubledger sl on pt.subledger_id=sl.Id
                                                    where pt.id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        partyTransactionInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        partyTransactionInfo.ChalanNo = rdr["ChalanNo"] != DBNull.Value
                            ? rdr["ChalanNo"].ToString()
                            : null;
                        partyTransactionInfo.OrderNo = rdr["OrderNo"] != DBNull.Value
                            ? rdr["OrderNo"].ToString()
                            : null;
                        if (rdr["PhoneNo"] != DBNull.Value)
                        {
                            partyTransactionInfo.Group_Id = Guid.Parse(rdr["PhoneNo"].ToString());
                        }
                        if (rdr["PaymentDate"] != DBNull.Value)
                        {
                            partyTransactionInfo.PaymentDate = Convert.ToDateTime(rdr["PhoneNo"].ToString());
                        }
                        partyTransactionInfo.LedgerName = rdr["LedgerName"] != DBNull.Value ? rdr["LedgerName"].ToString() : null;
                        partyTransactionInfo.PaidAmount = rdr["PaidAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["PaymentMode"]) : 0;
                        partyTransactionInfo.PaymentMode = rdr["PaymentMode"] != DBNull.Value ? Convert.ToInt32(rdr["PaymentMode"]) : 0;
                        partyTransactionInfo.SubLedgerName = rdr["SubLedgerName"] != DBNull.Value ? rdr["SubLedgerName"].ToString() : null;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            partyTransactionInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            partyTransactionInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, partyTransactionInfo);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteCustomerTransaction(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblCustomer where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction")]
        [HttpPost]
        public HttpResponseMessage CreateSupplierTransaction(SupplierTransactionInfo supplierTransactionInfo)
        {
            try
            {
                var supplierTransaction = new SupplierTransaction()
                {
                    Id = Guid.NewGuid(),
                    ChalanNo = supplierTransactionInfo.ChalanNo,
                    InvoiceNo = supplierTransactionInfo.InvoiceNo,
                    OrderNo = supplierTransactionInfo.OrderNo,
                    Supplier_Id = supplierTransactionInfo.Supplier_Id,
                    Group_Id = supplierTransactionInfo.Group_Id,
                    PaymentMode = supplierTransactionInfo.PaymentMode,
                    PaymentDate = supplierTransactionInfo.PaymentDate,
                    Ledger_Id = supplierTransactionInfo.Ledger_Id,
                    SubLedger_Id = supplierTransactionInfo.SubLedger_Id,
                    PaidAmount = supplierTransactionInfo.PaidAmount,
                };
                //customer.CustomerId = DatabaseCommand.GetAutoGeneratedCode("manufacture", null);
                ERPContext.SupplierTransactions.Add(supplierTransaction);
                ERPContext.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.Created, supplierTransaction);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateSupplierTransaction(string id, SupplierTransactionInfo supplierTransactionInfo)
        {
            try
            {
                var oPartyTransaction = ERPContext.PartyTransactions.FirstOrDefault(x => x.Id == supplierTransactionInfo.Id);
                if (oPartyTransaction != null)
                {
                    var supplierTransaction = new SupplierTransaction()
                    {
                        Id = oPartyTransaction.Id,
                        ChalanNo = supplierTransactionInfo.ChalanNo,
                        InvoiceNo = supplierTransactionInfo.InvoiceNo,
                        OrderNo = supplierTransactionInfo.OrderNo,
                        Group_Id = supplierTransactionInfo.Group_Id,
                        Supplier_Id = supplierTransactionInfo.Supplier_Id,
                        PaymentMode = supplierTransactionInfo.PaymentMode,
                        PaymentDate = supplierTransactionInfo.PaymentDate,
                        Ledger_Id = supplierTransactionInfo.Ledger_Id,
                        SubLedger_Id = supplierTransactionInfo.SubLedger_Id,
                        PaidAmount = supplierTransactionInfo.PaidAmount,
                    };
                    ERPContext.SupplierTransactions.AddOrUpdate(supplierTransaction);
                    ERPContext.SaveChanges();
                }
                return Request.CreateResponse(HttpStatusCode.Created, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransactions/{startDate}/{endDate}/{supplierId}")]
        [HttpGet]
        public HttpResponseMessage GetSupplierTransacions(string startDate, string endDate, string supplierId)
        {
            try
            {
                DateTime? convertedStartDate = startDate.GetDateTime();
                DateTime? convertedEndDate = endDate.GetDateTime();
                Guid SupplierId = Guid.Empty;
                bool isSupplierId = Guid.TryParse(supplierId, out SupplierId);
                List<SupplierTransactionInfo> supplierInfoList = new List<SupplierTransactionInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("proc_getSupplierTransaction", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@StartDate", convertedStartDate);
                    cmd.Parameters.AddWithValue("@EndDate", convertedEndDate);
                    cmd.Parameters.AddWithValue("@supplier_id", isSupplierId == true ? SupplierId.ToString() : null);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        SupplierTransactionInfo supplierTransactionInfo = new SupplierTransactionInfo();
                        supplierTransactionInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        supplierTransactionInfo.ChalanNo = rdr["ChalanNo"] != DBNull.Value
                            ? rdr["ChalanNo"].ToString()
                            : null;
                        supplierTransactionInfo.OrderNo = rdr["OrderNo"] != DBNull.Value
                            ? rdr["OrderNo"].ToString()
                            : null;
                        if (rdr["PhoneNo"] != DBNull.Value)
                        {
                            supplierTransactionInfo.Group_Id = Guid.Parse(rdr["PhoneNo"].ToString());
                        }
                        if (rdr["PaymentDate"] != DBNull.Value)
                        {
                            supplierTransactionInfo.PaymentDate = Convert.ToDateTime(rdr["PhoneNo"].ToString());
                        }
                        supplierTransactionInfo.PaidAmount = rdr["PaidAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["PaymentMode"]) : 0;
                        supplierTransactionInfo.PaymentMode = rdr["PaymentMode"] != DBNull.Value ? Convert.ToInt32(rdr["PaymentMode"]) : 0;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            supplierTransactionInfo.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            supplierTransactionInfo.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                        supplierInfoList.Add(supplierTransactionInfo);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, supplierInfoList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("PartyTransaction/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSupplierTransacionsById(string id)
        {
            try
            {
                SupplierTransactionInfo supplierTransaction = new SupplierTransactionInfo();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select pt.Id,ChalanNo,InvoiceNo,OrderNo,Group_Id,PaymentMode,paymentDate,PaidAmount,AccountDescription LedgerName,sl.Description SubledgerName from tblpartytransaction pt
                                                    left join tblAccount ac on pt.Ledger_Id= ac.id
                                                    left join tblSubledger sl on pt.subledger_id=sl.Id
                                                    where pt.id=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        supplierTransaction.Id = Guid.Parse(rdr["Id"].ToString());
                        supplierTransaction.ChalanNo = rdr["ChalanNo"] != DBNull.Value
                            ? rdr["ChalanNo"].ToString()
                            : null;
                        supplierTransaction.OrderNo = rdr["OrderNo"] != DBNull.Value
                            ? rdr["OrderNo"].ToString()
                            : null;
                        if (rdr["PhoneNo"] != DBNull.Value)
                        {
                            supplierTransaction.Group_Id = Guid.Parse(rdr["PhoneNo"].ToString());
                        }
                        if (rdr["PaymentDate"] != DBNull.Value)
                        {
                            supplierTransaction.PaymentDate = Convert.ToDateTime(rdr["PhoneNo"].ToString());
                        }
                        //supplierTransaction.l = rdr["LedgerName"] != DBNull.Value ? rdr["LedgerName"].ToString() : null;
                        supplierTransaction.PaidAmount = rdr["PaidAmount"] != DBNull.Value ? Convert.ToDecimal(rdr["PaymentMode"]) : 0;
                        supplierTransaction.PaymentMode = rdr["PaymentMode"] != DBNull.Value ? Convert.ToInt32(rdr["PaymentMode"]) : 0;
                        //supplierTransaction.SubLedgerName = rdr["SubLedgerName"] != DBNull.Value ? rdr["SubLedgerName"].ToString() : null;
                        if (rdr["Ledger_Id"] != DBNull.Value)
                        {
                            supplierTransaction.Ledger_Id = Guid.Parse(rdr["Ledger_Id"].ToString());
                        }
                        if (rdr["SubLedger_Id"] != DBNull.Value)
                        {
                            supplierTransaction.SubLedger_Id = Guid.Parse(rdr["SubLedger_Id"].ToString());
                        }
                        if (rdr["Supplier_Id"] != DBNull.Value)
                        {
                            supplierTransaction.Supplier_Id = Guid.Parse(rdr["Supplier_Id"].ToString());
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, supplierTransaction);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [Route("Customer/{id}")]
        [HttpDelete]
        public HttpResponseMessage DeleteSupplierTransaction(string id)
        {
            try
            {
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@id", id);
                DatabaseCommand.ExcuteNonQuery("delete from tblSupplierTransaction where id=@id", paramlist, null);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}