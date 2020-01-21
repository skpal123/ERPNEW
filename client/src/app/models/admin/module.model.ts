import { Menu } from "./menu.model";

export class Module {
   public Id:string;
   public Name:string;
   public RouterPath:string;
   public SequenceId:number;
   public Menus:Menu[];
}
  