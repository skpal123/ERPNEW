import { MultiSelectDropdown } from "../../common/multiselect.dropdown.model";
export class ProductOfferMap{
    public Id ?:string
    public Offer_Id?:string
    public Product_Id ?:string
    public ProductName ?:string
    public FreeProduct_Id ?:string
    public FreeProductList?:MultiSelectDropdown[]
    public ProductList?:MultiSelectDropdown[]
    public BundleSize?:number
    public ViewFreeProduct?:string;
}