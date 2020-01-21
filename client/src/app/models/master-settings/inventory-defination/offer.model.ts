import { ProductOfferMap } from './product-offer-map.model';
import { OfferSetupValidation } from '../../validation/inventory/offer-setup-validation.model';

export class Offer{
    public Id ?:string
    public OfferId ?:string
    public OfferName ?:string
    public OfferType ?:string
    public CreateDate ?:Date
    public ExpiredDate ?:Date
    public EffectiveDate ?:Date
    public IsSingle ?:boolean
    public DiscountRate ?:number
    public IsOneToMany?:boolean;
    public IsManyToOne?:boolean;
    public IsManyToMany?:boolean;
    public ProductMaster?:ProductOfferMap
    public OfferValidation?:OfferSetupValidation[]
}