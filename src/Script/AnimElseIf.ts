import { printConsole } from "isaacscript-common";
declare const TaintedTreasure: unknown | undefined;
export function SetAnimName(Type, Variant, Subtype, config){
  //printConsole(`${Type}`)
  if(Type == 2){
    if(config.Shop == false){
      return(0)
    }
    return("IconShop")
  }
  else if(Type == 4){
    if(config.Treasure == false){
      return(0)
    }
    return("IconTreasureRoom")
  }
  else if(Type == 6){
    if(config.Mini == false){
      return(0)
    }
    return("IconMiniboss")
  }
  else if(Type == 7){
    if(config.Secret == false){
      return(0)
    }
    return("IconSecretRoom")
  }
  else if(Type == 8){
    if(config.SuperSecret == false){
      return(0)
    }
    return("IconSuperSecretRoom")
  }
  else if(Type == 9){
    if(config.Arcade == false){
      return(0)
    }
    return("IconArcade")
  }
  else if(Type == 10){
    if(config.Curse == false){
      return(0)
    }
    return("IconCurseRoom")
  }
  else if(Type == 11){//NeedIcon
    if(config.Ambush == false){
      return(0)
    }
    if(Subtype == 1){
      return("IconBossAmbushRoom")
    }
    return("IconAmbushRoom")
  }
  else if(Type == 12){
    if(config.Library == false){
      return(0)
    }
    return("IconLibrary")
  }
  else if(Type == 13){
    if(config.Sacrifice == false){
      return(0)
    }else{
      return("IconSacrificeRoom")
    }

  }
  else if(Type == 14){
    return("IconDevilRoom")
  }
  else if(Type == 15){
    return("IconAngelRoom")
  }
  else if(Type == 16){//needIcon
    return("IconLadder")
  }
  else if(Type == 20){
    if(config.Chest == false){
      return(0)
    }
    return("IconChestRoom")
  }
  if(TaintedTreasure !== undefined){
    if(Type == 21 && ( Variant > 12000 && Variant < TaintedTreasure.maxvariant)){
      if(config.Tainted == false){
        return(0)
      }
      return("Tainted")
    }
  }
  if(Type == 21){
    if(config.Dice == false){
      return(0)
    }
    return("IconDiceRoom")
  }

  else if(Type == 24){
    if(config.Planetarium == false){
      return(0)
    }
    return("IconPlanetarium")
  }
  else if(Type == 29){
    if(config.Ultra == false){
      return(0)
    }
    return("IconUltraSecretRoom")
  }
  else if(Type == 1 && Subtype == 34){
    if(config.Knife == false){
      return(0)
    }
    return("IconMirrorRoom")
  }
  else if(Type == 1 && Subtype == 10){
    if(config.Knife == false){
      return(0)
    }
    return("IconMinecartRoom")
  }
  else{return(0)}
}