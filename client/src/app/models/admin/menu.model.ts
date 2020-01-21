import { Submenu } from "./submenu.model";

export class Menu {
   public Id?:string;
   public Name:string;
   public RouterPath:string;
   public SideMenuRouterPath:string;
   public ImagePath:string;  
   public MenuSqenceId?:number;
   public ModuleSeqId?:number;
   public SubMenus:Submenu[]
}
