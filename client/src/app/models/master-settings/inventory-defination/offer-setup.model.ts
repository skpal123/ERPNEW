import { MultiSelectDropdown } from "../../common/multiselect.dropdown.model";

export class OfferSetup{
    public Id ?:string
    public OfferId ?:string
    public OfferName ?:string
    public OfferType ?:string
    public IsSingle ?:boolean
    public Product_Id ?:string
    public ProductName ?:string
    public FreeProduct_Id ?:string
    public FreeProductList?:MultiSelectDropdown[]
    public ProductList?:MultiSelectDropdown[]
    public DiscountRate ?:number
    public BundleSize?:number
    public IsOneToMany?:boolean;
    public IsManyToOne?:boolean;
    public ViewFreeProduct?:string;
}