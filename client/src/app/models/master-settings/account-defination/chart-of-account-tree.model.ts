export class ChartOfAccountTree{
    public Id?:string;
    public AccountDescription?:string;
    public AutoAccountCode?:string;
    public ManualAccountCode?:string;
    public AccountType?:string;
    public AccountId?:string;
    public ParentGroupId?:number
    public ParentLevelId?:number;
    public ChildGroupId?:number;
    public ParentAccId?:number;
    public ChildAccId?:number;
    public ChildLevelId?:number;
    public ParentAccount_Id?:string;
    public ChildAccount_Id?:string;
    public Children?:ChartOfAccountTree[];
    public Status?:boolean;
    public IsLeaf?:boolean;
    public IsClicked?:boolean;
}