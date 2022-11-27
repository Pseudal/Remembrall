import { ModCallback } from "isaac-typescript-definitions";
import { printConsole, VectorZero } from "isaacscript-common";
import { SetAnimName } from "./Script/AnimElseIf";
const MOD_NAME = "remembrall";
let RoomArray = [];
let Icon = Sprite();
Icon.Load("gfx/ui/RA_icons.anm2", true)

main();
function DisplayIcon() {
  let posY = 300
  if(RoomArray.length > 0) {
    for (let index = 0; index < RoomArray.length; index++) {
      const ThisRoom = RoomArray[index];
      if((ThisRoom.Type !== 1) && (ThisRoom.Spawned == false)){
        ThisRoom.Spawned = true;

        Icon.SetFrame(ThisRoom.Animation, 1)
        Icon.Color = Color(1, 1, 1, 0.5)
        Icon.Render(Vector(150, 150), Vector(0, 0), Vector(0, 0))


        // if(index%2 == 1) {
        //   let Icon = Isaac.Spawn(1000, 8752, 0, Isaac.ScreenToWorld(Vector(935,posY)), VectorZero, undefined)
        //   Icon.SetSpriteFrame(ThisRoom.Animation, 0)
        //   Icon.SpriteScale = Vector(1.5,1.5)
        //   posY += 35
        // }else{
        //   let Icon = Isaac.Spawn(1000, 8752, 0, Isaac.ScreenToWorld(Vector(900,posY)), VectorZero, undefined)
        //   Icon.SetSpriteFrame(ThisRoom.Animation, 0)
        //   Icon.SpriteScale = Vector(1.5,1.5)
        // }
        // let Icon = Isaac.Spawn(1000, 8752, 0, Isaac.WorldToScreen(Vector(900,300)), VectorZero, undefined)

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
      printConsole(`${Room.Data.Type}`)
      let RoomObj = {room: Room, Visited: false, Spawned: false, Animation: undefined}
      RoomObj.Animation = SetAnimName(Room.Data.Type)
      if(RoomObj.Animation == 0){
        continue;
      }
      SpecialRooms.push(RoomObj)
    }
  }
  RoomArray = SpecialRooms
}

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(MOD_NAME, 1);

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, GetAllRooms);
  mod.AddCallback(ModCallback.POST_RENDER, DisplayIcon);
  mod.AddCallback(ModCallback.POST_NEW_ROOM, ()=>{RoomArray.forEach(element => {
    element.Spawned = false
  });});

  // Print a message to the "log.txt" file.
}
