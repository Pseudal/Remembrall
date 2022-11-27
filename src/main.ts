import { ModCallback } from "isaac-typescript-definitions";
import { printConsole, VectorZero } from "isaacscript-common";
import { SetAnimName } from "./Script/AnimElseIf";
import { configRA } from "./Script/Config";
const MOD_NAME = "remembrall";
let RoomArray = [];
let Icon = Sprite();
Icon.Load("gfx/ui/RA_icons.anm2", true)
Icon.Scale = Vector(1.5,1.5)
main();
function DisplayIcon() {
  let posY = 200
  if(RoomArray.length > 0) {

      for (let index = 0; index < RoomArray.length; index++) {
        const ThisRoom = RoomArray[index];
        if((ThisRoom.Type !== 1)){
          if(index%2 == 1) {
            if((((ThisRoom.Type !== 7 && ThisRoom.Type !== 8 && ThisRoom.Type !== 29) && ThisRoom.Room.DisplayFlags !== 5) || ((ThisRoom.Type == 7 || ThisRoom.Type == 8 && ThisRoom.Type !== 29) && ThisRoom.Room.DisplayFlags !== 3)) && (configRA.spoil == 1 || configRA.spoil == 2)){
              Icon.SetFrame("CurseI", 1)
            }else{
              Icon.SetFrame(ThisRoom.Animation, 1)
            }
            Icon.Color = Color(1, 1, 1, 0.75)
            Icon.Render(Vector(1, posY), Vector(0, 0), Vector(0, 0))
            posY += 15
          }else{
            if((((ThisRoom.Type !== 7 && ThisRoom.Type !== 8 && ThisRoom.Type !== 29) && ThisRoom.Room.DisplayFlags !== 5) || ((ThisRoom.Type == 7 || ThisRoom.Type == 8 && ThisRoom.Type !== 29) && ThisRoom.Room.DisplayFlags !== 3)) && (configRA.spoil == 1 || configRA.spoil == 2) ){
              Icon.SetFrame("CurseI", 1)
            }else{
              Icon.SetFrame(ThisRoom.Animation, 1)
            }
            Icon.Color = Color(1, 1, 1, 0.75)
            Icon.Render(Vector(16, posY), Vector(0, 0), Vector(0, 0))
          }
        }
      }

    }
  }


function CheckRoom() {
  if(RoomArray.length > 0) {ù
    for (let index = 0; index < RoomArray.length; index++) {
      const e = RoomArray[index];
      if(e.Room.VisitedCount > 0) {
        RoomArray.splice(index, 1);
      }
    }
  }
}

function GetAllRooms() {
  let GetRooms = Game().GetLevel().GetRooms()
  let SpecialRooms = []
  for (let index = 0; index < GetRooms.Size; index++) {
    const Room = GetRooms.Get(index)
    if(Room.Data.Type !== 1 ){
      printConsole(`${Room.Data.Type} ${Room.DisplayFlags}`)
      let RoomObj = {Room: Room, Visited: false, Spawned: false, Animation: undefined, Type: Room.Data.Type}
      RoomObj.Animation = SetAnimName(Room.Data.Type)
      if(RoomObj.Animation == 0){
        continue;
      }
      SpecialRooms.push(RoomObj)
    }
  }
  RoomArray = SpecialRooms.sort((a, b) => (a.Room.Data.Type < b.Room.Data.Type ? -1 : 1));
}

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(MOD_NAME, 1);

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, GetAllRooms);
  mod.AddCallback(ModCallback.POST_RENDER, DisplayIcon);
  mod.AddCallback(ModCallback.POST_UPDATE, CheckRoom);

  // Print a message to the "log.txt" file.
}
