using ERP.DataService.Model;
using ERP.DataService.Model.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ViewModel.Model;
using ERPWebApiService.Autentication;
using ERPWebApiService.Exceptions;
using System.Data.Entity.Migrations;
using ERPWebApiService.DataConnection;
namespace ERPWebApiService.Controllers
{
    [RoutePrefix("api/FinanceService")]
    public class FinanceController : ApiController
    {
        SumonERPContext ERPContext = new SumonERPContext();
        [Route("getChartOfAccountList")]
        [HttpGet]
        public HttpResponseMessage getChartParentChildAccountList()
        {
            try
            {
               // var userSession=AuthorizationHelper.GetSession();
                var accountDetails = new AccountDetails();
                List<AccountParentChildRelationInfo> ChartOfAccountListTree = new List<AccountParentChildRelationInfo>();
                List<AccountParentChildRelationInfo> ChartOfAccountListTree2 = new List<AccountParentChildRelationInfo>();
                var accountList = (from acc in ERPContext.Accounts
                                   join pcr in ERPContext.AccountParentChildRelations on acc.Id equals pcr.ChildAccount_Id
                                   select new AccountParentChildRelationInfo()
                                   {
                                       Id = pcr.Id,
                                       AccountId = acc.Id,
                                       AccountDescription = acc.AccountDescription,
                                       AutoAccountCode = acc.AutoAccountCode,
                                       ManualAccountCode = acc.ManualAccountCode,
                                       IsLeaf=acc.IsLeaf,
                                      // HasSubleder=acc.HasSubLedger,
                                       AccountType=acc.AccountType,
                                       ParentGroupId = pcr.ParentGroupId,
                                       ParentLevelId = pcr.ParentLevelId,
                                       ParentAccount_Id = pcr.ParentAccount_Id,
                                       ChildAccId = pcr.ChildAccId,
                                       ParentAccId = pcr.ParentAccId,
                                       ChildGroupId = pcr.ChildGroupId,
                                       ChildLevelId = pcr.ChildLevelId,
                                       ChildAccount_Id = pcr.ChildAccount_Id                                     
                                   }).ToList();
                ChartOfAccountListTree = (from acc in ERPContext.Accounts
                                          where acc.LevelId == 1 && acc.AccId == 1
                                          orderby acc.GroupId
                                          select new AccountParentChildRelationInfo()
                                          {
                                              AccountId = acc.Id,
                                              AccountDescription = acc.AccountDescription,
                                              AutoAccountCode = acc.AutoAccountCode,
                                              ManualAccountCode = acc.ManualAccountCode,
                                              ChildGroupId=acc.GroupId,
                                              ChildLevelId=acc.LevelId,
                                              ChildAccId=acc.AccId,
                                              IsLeaf=acc.IsLeaf,
                                             // HasSubleder=acc.HasSubLedger
                                          }).ToList();
                foreach (var account in ChartOfAccountListTree)
                {
                    AccountParentChildRelationInfo ChartOfAccount = new AccountParentChildRelationInfo();
                    ChartOfAccount.AccountId = account.AccountId;
                    ChartOfAccount.AccountDescription = account.AccountDescription;
                    ChartOfAccount.Id = account.Id;
                    ChartOfAccount.ChildGroupId = account.ChildGroupId;
                    ChartOfAccount.ChildLevelId = account.ChildLevelId;
                    ChartOfAccount.ChildAccId = account.ChildAccId;
                    ChartOfAccount.IsLeaf = account.IsLeaf;
                    //ChartOfAccount.HasSubleder = account.HasSubleder;
                    ChartOfAccount.Children = genterateAccountTree(accountList, account.AccountId);
                    ChartOfAccountListTree2.Add(ChartOfAccount);
                }
                accountDetails.AccountParentChildRelationInfoList = ChartOfAccountListTree2;
                accountDetails.AccountList = accountList;
                return Request.CreateResponse(HttpStatusCode.OK, accountDetails);
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
        private List<AccountParentChildRelationInfo> genterateAccountTree(List<AccountParentChildRelationInfo> accoountList, Guid? accountId)
        {
            var accountList2 =
                accoountList.Where(y => y.ParentAccount_Id == accountId).Select(x => new AccountParentChildRelationInfo()
                {
                    Id = x.Id,
                    AccountId = x.AccountId,
                    AccountDescription = x.AccountDescription,
                    AutoAccountCode = x.AutoAccountCode,
                    ManualAccountCode = x.ManualAccountCode,
                    ParentGroupId = x.ParentGroupId,
                    ParentLevelId = x.ParentLevelId,
                    ParentAccount_Id = x.ParentAccount_Id,
                    ChildAccId = x.ChildAccId,
                    ParentAccId = x.ParentAccId,
                    ChildGroupId = x.ChildGroupId,
                    ChildLevelId = x.ChildLevelId,
                    ChildAccount_Id = x.ChildAccount_Id,
                    IsLeaf=x.IsLeaf,
                   // HasSubleder=x.HasSubleder,
                    Children = genterateAccountTree(accoountList, x.ChildAccount_Id)
                }).ToList();
            return accountList2;
        }
        [Route("createChartOfAccount")]
        [HttpPost]
        public HttpResponseMessage CreateChartOfAccount(AccountInfo accountInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                    var chartOfAccount = new Account()
                    {
                        Id=Guid.NewGuid(),
                        AccId=accountInfo.AccId,
                        GroupId=accountInfo.GroupId,
                        LevelId=accountInfo.LevelId,
                        AccountType=accountInfo.AccountType,
                        AccountDescription=accountInfo.AccountDescription,
                        AutoAccountCode=accountInfo.AutoAccountCode,
                        ManualAccountCode=accountInfo.ManualAccountCode,
                        IsLeaf=true,
                        IsProfitLoss=accountInfo.IsProfitLoss,
                        IsReciptsPayment=accountInfo.IsProfitLoss,
                        IsSale=accountInfo.IsSale
                        //BranchId=userSession.SelectedBranchId
                    };
                    ERPContext.Accounts.AddOrUpdate(chartOfAccount);
                    ERPContext.SaveChanges();
                    var parentAccount = ERPContext.Accounts.FirstOrDefault(x => x.Id == accountInfo.ParentAccountId);
                    var childParentRelation=new AccountParentChildRelation(){
                        Id=Guid.NewGuid(),
                        ParentAccId=parentAccount.AccId,
                        ParentGroupId=parentAccount.GroupId,
                        ParentLevelId=parentAccount.LevelId,
                        ChildAccId=chartOfAccount.AccId,
                        ChildGroupId=chartOfAccount.GroupId,
                        ChildLevelId=chartOfAccount.LevelId,
                        ParentAccount_Id=parentAccount.Id,
                        ChildAccount_Id=chartOfAccount.Id
                        //Branch_Id=userSession.SelectedBranchId
                    };
                    ERPContext.AccountParentChildRelations.AddOrUpdate(childParentRelation);
                    ERPContext.SaveChanges();
                    ERPContext.Database.ExecuteSqlCommand("update tblaccount set Isleaf=0 where id='" + parentAccount.Id + "'");
                //}
                
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
        [Route("createChartOfAccount/{id}")]
        [HttpPost]
        public HttpResponseMessage CreateChartOfAccount(string id,AccountInfo accountInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                //if (userSession != null)
                //{
                    var parseId = Guid.Parse(id);
                    var oChartOfAccount = ERPContext.Accounts.FirstOrDefault(x => x.Id == parseId);
                    var chartOfAccount = new Account()
                    {
                        Id = oChartOfAccount.Id,
                        AccountType = accountInfo.AccountType,
                        AccountDescription = accountInfo.AccountDescription,
                        AutoAccountCode = accountInfo.AutoAccountCode,
                        ManualAccountCode = accountInfo.ManualAccountCode,
                        AccId=oChartOfAccount.AccId,
                        GroupId=oChartOfAccount.GroupId,
                        LevelId=oChartOfAccount.LevelId,
                        CloseingStatus=oChartOfAccount.CloseingStatus,
                        IsLeaf=oChartOfAccount.IsLeaf,
                        IsProfitLoss=oChartOfAccount.IsProfitLoss,
                        HasSubLedger=oChartOfAccount.HasSubLedger,
                        IsReciptsPayment=oChartOfAccount.IsReciptsPayment,
                        IsSale=oChartOfAccount.IsSale
                    };
                    ERPContext.Accounts.AddOrUpdate(chartOfAccount);
                    ERPContext.SaveChanges();
                //}

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
        [Route("getVoucherList")]
        [HttpGet]
        public HttpResponseMessage GetVoucherListByDateInterval()
        {
            try
            {

                var date = 1551627350005;
                var a = new DateTime(1551627350005);
               // var userSession = AuthorizationHelper.GetSession();
                var voucherList = ERPContext.Vouchers.Select(x => new VoucherInfo()
                {
                    Id=x.Id,
                    VoucherType=x.Vouchertype,
                    VoucherNo=x.Voucherno,
                    VoucherDate=x.Voucherdate,
                    VoucherStatus=x.Voucherstatus,
                    ChequeNo=x.Chequeno,
                    ChequeDate=x.Chequedate,
                    BranchID=x.BranchID,
                    Bankname=x.Bankname,
                    BankAccountNo=x.BankAccountNo,
                    ApprovedBy=x.ApprovedBy,
                    CheckedBy=x.CheckedBy,
                    IsAutoGenerated=x.IsAutoGenerated,
                    Particulars=x.Particulars,
                    PostingStatus=x.PostingStatus,
                    Amount=x.TotalAmount                 
                }).ToList();

                return Request.CreateResponse(HttpStatusCode.OK, voucherList);
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
        [Route("getVoucheryid/{voucherId}")]
        [HttpGet]
        public HttpResponseMessage GetVoucherById(string voucherId)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var voucherid = Guid.Parse(voucherId);
                var voucherInfo = ERPContext.Vouchers.Where(x=>x.Id==voucherid).Select(x => new VoucherInfo()
                {
                    Id = x.Id,
                    VoucherType = x.Vouchertype,
                    VoucherNo = x.Voucherno,
                    VoucherDate = x.Voucherdate,
                    VoucherStatus = x.Voucherstatus,
                    ChequeNo = x.Chequeno,
                    ChequeDate = x.Chequedate,
                    BranchID = x.BranchID,
                    Bankname = x.Bankname,
                    BankAccountNo = x.BankAccountNo,
                    ApprovedBy = x.ApprovedBy,
                    CheckedBy = x.CheckedBy,
                    IsAutoGenerated = x.IsAutoGenerated,
                    Particulars = x.Particulars,
                    PostingStatus = x.PostingStatus,
                    Amount = x.TotalAmount,
                }).FirstOrDefault();
                List<VoucherDetailInfo> VoucherDetailList = new List<VoucherDetailInfo>();
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(@"select vd.id,vd.[Lineno],isnull(vd.Amount,0) Amount,isnull(vd.vat,0)Vat,isnull(vd.tax,0)Tax,ac.AccountDescription+'-'+ac.ManualAccountCode AccountDescription,vd.Account_Id from tblAccount ac 
                                                inner join tblVoucherDetails vd on ac.id=vd.Account_Id where vd.voucher_id=@voucherId order by [Lineno]", con);
                    cmd.Parameters.AddWithValue("@voucherId", voucherId);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        VoucherDetailInfo voucherDetailInfo = new VoucherDetailInfo();
                        voucherDetailInfo.Id = Guid.Parse(rdr["Id"].ToString());
                        voucherDetailInfo.Lineno = Convert.ToInt32(rdr["Lineno"].ToString());
                        voucherDetailInfo.Amount = Convert.ToDouble(rdr["Amount"].ToString());
                        voucherDetailInfo.Vat = Convert.ToDouble(rdr["Vat"].ToString());
                        voucherDetailInfo.Tax = Convert.ToDouble(rdr["Tax"].ToString());
                        voucherDetailInfo.AccountDescription = rdr["AccountDescription"].ToString();
                        voucherDetailInfo.AccountId =Guid.Parse( rdr["Account_Id"].ToString());
                        voucherDetailInfo.SubLedgerTransactions = GetSubledgerTransactionListByVoucherDetailsId(voucherDetailInfo.Id);
                        VoucherDetailList.Add(voucherDetailInfo);
                    }
                }
                voucherInfo.VoucherDetailsList = VoucherDetailList;
                return Request.CreateResponse(HttpStatusCode.OK, voucherInfo);
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
        [Route("deleteVoucher/{voucherId}")]
        [HttpDelete]
        public HttpResponseMessage DeleteVoucher(string voucherId)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                Dictionary<string, string> paramlist = new Dictionary<string, string>();
                paramlist.Add("@voucherid", voucherId);
                DatabaseCommand.ExcuteNonQuery(@"delete from tblvoucher where id=@voucherid
                                                delete from tblVoucherDetails where voucher_id=@voucherid;
                                                delete from tblSubledgerTransaction where voucher_id=@voucherid", paramlist, null);
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
        [Route("createVoucher")]
        [HttpPost]
        public HttpResponseMessage CreateVoucher(VoucherInfo voucherInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var voucher = new Voucher()
                {
                    Id=Guid.NewGuid(),
                    Voucherdate=voucherInfo.VoucherDate,
                    Voucherno=voucherInfo.VoucherNo,
                    Vouchertype=voucherInfo.VoucherType,
                    TotalAmount=voucherInfo.Amount,
                    Voucherstatus=false,
                    Chequedate=voucherInfo.ChequeDate,
                    Chequeno=voucherInfo.ChequeNo
                };
                ERPContext.Vouchers.Add(voucher);
                ERPContext.SaveChanges();
                Dictionary<string,string> paramlist=new Dictionary<string,string>();
                paramlist.Add("@voucherid",voucher.Id.ToString());
                paramlist.Add("@voucherDate",voucher.Voucherdate.ToString());
                paramlist.Add("@branch_id",null);
                DatabaseCommand.ExcuteNonQuery("proc_generate_voucher_no", paramlist, "procedure");
                var oVoucher=ERPContext.Vouchers.FirstOrDefault(x=>x.Id==voucher.Id);
                foreach (var vd in voucherInfo.VoucherDetailsList)
                {
                    var account = ERPContext.Accounts.FirstOrDefault(x => x.Id == vd.AccountId);
                    var voucherDetail = new VoucherDetails()
                    {
                        Id=Guid.NewGuid(),
                        Lineno=vd.Lineno,
                        Account_Id=vd.AccountId,
                        AccId=account.AccId,
                        LevelId=account.LevelId,
                        GroupId=account.GroupId,
                        Amount=vd.Amount,
                        Vat=vd.Vat,
                        Tax=vd.Tax,
                        Voucher_Id = oVoucher.Id,
                        VoucherNo=oVoucher.Voucherno,
                    };
                    ERPContext.VoucherDetailList.Add(voucherDetail);
                    ERPContext.SaveChanges();
                    foreach (var subledgerTransactionInfo in vd.SubLedgerTransactions)
                    {
                        var subledgerTransaction = new SubledgerTransaction() 
                        { 
                            Id=Guid.NewGuid(),
                            Amount=subledgerTransactionInfo.Amount,
                            Account_Id=account.Id,
                            Subledger_Id=subledgerTransactionInfo.SubLedger_Id,
                            Voucher_Id=oVoucher.Id,
                            Voucher_Detail_Id = voucherDetail.Id
                        };
                        ERPContext.SubledgerTransactions.Add(subledgerTransaction);
                        ERPContext.SaveChanges();
                    }
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
        [Route("updateVoucher/{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateVoucher(Guid id, VoucherInfo voucherInfo)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var ovoucher = ERPContext.Vouchers.FirstOrDefault(x => x.Id == voucherInfo.Id);
                if (ovoucher != null)
                {
                    var voucher = new Voucher()
                    {
                        Id = ovoucher.Id,
                        Voucherdate = voucherInfo.VoucherDate,
                        Voucherno = voucherInfo.VoucherNo,
                        Vouchertype = voucherInfo.VoucherType,
                        TotalAmount=voucherInfo.Amount,
                        Voucherstatus = false,
                        Chequedate = voucherInfo.ChequeDate,
                        Chequeno = voucherInfo.ChequeNo
                    };
                    ERPContext.Vouchers.AddOrUpdate(voucher);
                    ERPContext.SaveChanges();
                    Dictionary<string, string> paramlist = new Dictionary<string, string>();
                    paramlist.Add("@voucherid", voucher.Id.ToString());
                    DatabaseCommand.ExcuteNonQuery("delete from tblVoucherDetails where voucher_id=@voucherid;delete from tblSubledgerTransaction where voucher_id=@voucherid", paramlist, null);
                    var oVoucher = ERPContext.Vouchers.FirstOrDefault(x => x.Id == voucher.Id);
                    foreach (var vd in voucherInfo.VoucherDetailsList)
                    {
                        var account = ERPContext.Accounts.FirstOrDefault(x => x.Id == vd.AccountId);
                        var voucherDetail = new VoucherDetails()
                        {
                            Id = Guid.NewGuid(),
                            Lineno = vd.Lineno,
                            Account_Id = vd.AccountId,
                            AccId = account.AccId,
                            LevelId = account.LevelId,
                            GroupId = account.GroupId,
                            Amount = vd.Amount,
                            Vat = vd.Vat,
                            Tax = vd.Tax,
                            Voucher_Id = oVoucher.Id,
                            VoucherNo = oVoucher.Voucherno,
                        };
                        ERPContext.VoucherDetailList.AddOrUpdate(voucherDetail);
                        ERPContext.SaveChanges();
                        foreach (var subledgerTransactionInfo in vd.SubLedgerTransactions)
                        {
                            var subledgerTransaction = new SubledgerTransaction()
                            {
                                Id = Guid.NewGuid(),
                                Amount = subledgerTransactionInfo.Amount,
                                Account_Id = account.Id,
                                Subledger_Id = subledgerTransactionInfo.SubLedger_Id,
                                Voucher_Id = oVoucher.Id,
                                Voucher_Detail_Id = voucherDetail.Id
                            };
                            ERPContext.SubledgerTransactions.Add(subledgerTransaction);
                            ERPContext.SaveChanges();
                        }
                    }
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
        private List<SubLedgerTransactionInfo> GetSubledgerTransactionListByVoucherDetailsId(Guid deatilsId)
        {
            List<SubLedgerTransactionInfo> subledgerTransactionList = new List<SubLedgerTransactionInfo>();
            using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
            {
                SqlCommand cmd = new SqlCommand(@"select st.id,st.Account_Id,s.Description+'-'+s.SubledgerCode Description,st.Subledger_Id,st.Amount  from tblSubledgerTransaction st
                                                inner join tblSubledger s on s.Id=st.Subledger_Id where Voucher_Detail_Id=@vdId", con);
                cmd.Parameters.AddWithValue("@vdId", deatilsId);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    SubLedgerTransactionInfo subLedgerTransactionInfo = new SubLedgerTransactionInfo();
                    subLedgerTransactionInfo.Id = Guid.Parse(rdr["Id"].ToString());
                    subLedgerTransactionInfo.Account_Id = Guid.Parse(rdr["Account_Id"].ToString());
                    subLedgerTransactionInfo.SubLedger_Id = Guid.Parse(rdr["Subledger_Id"].ToString());
                    subLedgerTransactionInfo.Amount = Convert.ToDecimal(rdr["Amount"].ToString());
                    subLedgerTransactionInfo.SubledgerDescription = rdr["Description"].ToString();
                    subledgerTransactionList.Add(subLedgerTransactionInfo);
                }
            }
            return subledgerTransactionList;
        }
        [Route("getChildAccount")]
        [HttpGet]
        public HttpResponseMessage GetAllChildAccount()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var accountList = ERPContext.Accounts.Where(x=>x.IsLeaf==true && x.LevelId!=1).Select(x => new AccountInfo()
                {
                    Id=x.Id,
                    AccountDescription=x.AccountDescription,
                    AutoAccountCode=x.AutoAccountCode,
                    ManualAccountCode=x.ManualAccountCode,
                    HasSubLedger=x.HasSubLedger,
                    AccountType=x.AccountType
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, accountList);
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
        [Route("getAccountListForopening")]
        [HttpGet]
        public HttpResponseMessage GetAllChildAccountForOpening()
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                var accountList = ERPContext.Accounts.Where(x => x.IsLeaf == true && x.LevelId != 1).Select(x => new AccountOpeningTableView()
                {
                    AccountDescription =x.AutoAccountCode+"-"+ x.AccountDescription,
                    Group = x.GroupId.ToString(),
                    DebitAmount = 0,
                    CreditAmount = 0,
                    AccountType=x.AccountType,
                    AccountId=x.Id
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, accountList);
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
        [Route("getMaxAccid/{levelId}/{groupId}")]
        [HttpGet]
        public HttpResponseMessage GetMaxAccidByLevelAndGroupId(int levelId,int groupId)
        {
            try
            {
                //var userSession = AuthorizationHelper.GetSession();
                int MaxAccId=0;
                using (SqlConnection con = new SqlConnection(ConnectionString.getConnectionString()))
                {
                    SqlCommand cmd=new SqlCommand(@"select isnull(max(accid),0) from tblaccount where groupId=@groupId and LevelId=@levelId",con);
                    cmd.Parameters.AddWithValue("@levelId",levelId);
                    cmd.Parameters.AddWithValue("@groupId",groupId);
                    //cmd.Parameters.AddWithValue("@branchId",groupId);
                    con.Open();
                    MaxAccId = Convert.ToInt32(cmd.ExecuteScalar());
                }
                return Request.CreateResponse(HttpStatusCode.OK, MaxAccId);
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
        
        [Route("addSubledger")]
        [HttpPost]
        public HttpResponseMessage AddSubledger(SubledgerInfo subledgerInfo)
        {
            try
            {
                if (subledgerInfo != null)
                {
                    var subledger = new Subledger()
                    {
                        Id=Guid.NewGuid(),
                        SubledgerCode=subledgerInfo.SublederCode,
                        Description=subledgerInfo.Description,
                        Account_Id=subledgerInfo.AccountId
                    };
                    ERPContext.Subledgers.Add(subledger);
                    ERPContext.SaveChanges();
                    ERPContext.Database.ExecuteSqlCommand("update tblAccount set hasSubledger=1 where id='" + subledgerInfo.AccountId + "'");
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
        [Route("addSubledger/{id}")]
        [HttpPut]
        public HttpResponseMessage AddSubledger(string id,SubledgerInfo subledgerInfo)
        {
            try
            {
                var oSubledger = ERPContext.Subledgers.FirstOrDefault(x => x.Id == subledgerInfo.Id);
                if (oSubledger != null)
                {
                    var subledger = new Subledger()
                    {
                        Id = oSubledger.Id,
                        SubledgerCode = subledgerInfo.SublederCode,
                        Description = subledgerInfo.Description,
                        Account_Id = subledgerInfo.AccountId
                    };
                    ERPContext.Subledgers.AddOrUpdate(subledger);
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
        [Route("getSubledgerList/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSubledgerList(string id)
        {
            try
            {
                var accountId = Guid.Parse(id);
                var subledgerList = ERPContext.Subledgers.Where(x=>x.Account_Id==accountId).Select(x => new SubledgerInfo
                {
                    Id = x.Id,
                    Description = x.Description,
                    AccountId = x.Account_Id,
                    SublederCode = x.SubledgerCode
                }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, subledgerList);
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
        [Route("getSubledgerById/{id}")]
        [HttpGet]
        public HttpResponseMessage GetSubledgerById(string id)
        {
            try
            {
                var sublederId = Guid.Parse(id);
                var subledger = ERPContext.Subledgers.Where(x=>x.Id==sublederId).Select(x => new SubledgerInfo
                {
                    Id = x.Id,
                    Description = x.Description,
                    AccountId = x.Account_Id,
                    SublederCode = x.SubledgerCode
                }).FirstOrDefault();
                return Request.CreateResponse(HttpStatusCode.OK, subledger);
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
        [Route("deleteSubledger/{id}")]
        [HttpGet]
        public HttpResponseMessage DeleteSubledeId(string id)
        {
            try
            {
                ERPContext.Database.ExecuteSqlCommand("delete from tblSubledger where id='" + id + "'");
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
