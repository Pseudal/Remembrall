//import { printConsole } from "isaacscript-common";
declare const TaintedTreasure: unknown | undefined;
export function SetAnimName(Type, Variant){
  if(Type == 2){
    return("IconShop")
  }
  else if(Type == 4){
    return("IconTreasureRoom")
  }
  else if(Type == 6){
    return("IconMiniboss")
  }
  else if(Type == 7){
    return("IconSecretRoom")
  }
  else if(Type == 8){
    return("IconSuperSecretRoom")
  }
  else if(Type == 9){
    return("IconArcade")
  }
  else if(Type == 10){
    return("IconCurseRoom")
  }
  else if(Type == 11){//NeedIcon
    return("IconAmbushRoom")
  }
  else if(Type == 12){
    return("IconLibrary")
  }
  else if(Type == 13){
    return("IconSacrificeRoom")
  }
  else if(Type == 14){
    return("IconDevilRoom")
  }
  else if(Type == 15){
    return("IconAngelRoom")
  }
  else if(Type == 16){//needIcon
    return("IconTreasureRoom")
  }
  else if(Type == 20){
    return("IconChestRoom")
  }
  else if(Type == 21){
    if(TaintedTreasure !== undefined){
      if(Variant > 12000 && Variant < TaintedTreasure.maxvariant)
      return("Tainted")
    }
    return("IconDiceRoom")
  }
  else if(Type == 24){
    return("IconPlanetarium")
  }
  // else if(Type == 29){
  //   return("IconUltraSecretRoom")
  // }
  else{return(0)}
}