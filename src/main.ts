import { ModCallback } from "isaac-typescript-definitions";
import { printConsole } from "isaacscript-common";
import * as json from "json";
import { SetAnimName } from "./Script/AnimElseIf";
import { configRA } from "./Script/Config";
import { ModConfig } from "./Script/MCM";

let RoomArray = [];
let fortuneSpawned = 0;
let Icon = Sprite();
let ArrayCheck = [];
Icon.Load("gfx/ui/RA_icons.anm2", true);
Icon.Scale = Vector(1.5, 1.5);

main();
function DisplayIcon() {
  let posX = configRA.Position;
  let posY = 200;
  let Rooms = [];
  let Hud = Options.HUDOffset;

  if (configRA.Disable == true) {
    return;
  }
  if (posX < 50 && Isaac.GetPlayer().HasTrinket(0) == false) {
    posX = 50;
  }
  if (configRA.spoil == 2) {
    for (let index = 0; index < RoomArray.length; index++) {
      const ThisRoom = RoomArray[index];
      if (
        ThisRoom.Room.DisplayFlags == 5 ||
        ThisRoom.Room.DisplayFlags == 3 ||
        ThisRoom.Room.Type == 1
      ) {
        Rooms.push(ThisRoom);
      }
    }
  } else {
    Rooms = RoomArray;
  }
  if (Rooms.length > 0) {
    for (let index = 0; index < Rooms.length; index++) {
      const ThisRoom = Rooms[index];
      if (
        ThisRoom.Type !== 1 ||
        (ThisRoom.Type == 1 &&
          (ThisRoom.Room.Data.Subtype == 34 ||
            ThisRoom.Room.Data.Subtype == 10))
      ) {
        if (
          (ThisRoom.Room.DisplayFlags !== 5 && ThisRoom.Room.DisplayFlags !== 7 && ThisRoom.Room.DisplayFlags !== 3) &&
          configRA.spoil == 1 &&
          ThisRoom.Type !== 1
        ) {
          Icon.SetFrame("CurseI", 1);
        } else {
          Icon.SetFrame(ThisRoom.Animation, 1);
        }
        Icon.Color = Color(1, 1, 1, ThisRoom.Opacity);
        if (configRA.Old == false) {
          if (configRA.PositionTop == false) {
            Icon.Render(
              Vector(posX, Isaac.GetScreenHeight() - 20),
              Vector(0, 0),
              Vector(0, 0),
            );
          } else {
            Icon.Render(Vector(posX, 0), Vector(0, 0), Vector(0, 0));
          }
          posX += 15;
        } else {
          if (index % 2 == 1) {
            Icon.Render(
              Vector(Hud * 20 + 15, posY + Hud * 12),
              Vector(0, 0),
              Vector(0, 0),
            );
            posY += 15;
          } else {
            Icon.Render(
              Vector(Hud * 20, posY + Hud * 12),
              Vector(0, 0),
              Vector(0, 0),
            );
          }
        }
      }
    }
  }
}

function CheckRoom() {
  CheckTrapdoor();
  //  CheckKnife();
  if (RoomArray.length > 0) {
    for (let index = 0; index < RoomArray.length; index++) {
      const e = RoomArray[index];
      if (e.Room.VisitedCount > 0 && e.Type !== 1) {
        if (configRA.HideVisited == false) {
          e.Opacity = 0.25;
        } else {
          RoomArray.splice(index, 1);
        }
      } else {
        if (
          Isaac.GetPlayer().HasCollectible(626) == true &&
          e.Room.Data.Subtype == 34
        ) {
          if (configRA.HideVisited == false) {
            e.Opacity = 0.25;
          } else {
            RoomArray.splice(index, 1);
          }
        }
        if (
          Isaac.GetPlayer().HasCollectible(627) == true &&
          e.Room.Data.Subtype == 10
        ) {
          if (configRA.HideVisited == false) {
            e.Opacity = 0.25;
          } else {
            RoomArray.splice(index, 1);
          }
        }
      }
    }
  }
}

function CheckTrapdoor() {
  if(configRA.Fortune == true){
    let room = Game().GetRoom();
    let num = room.GetGridSize();
    if (num > 0) {
      for (let index = 0; index < num; index++) {
        if (room.GetGridEntity(index) !== undefined) {
          let element = room.GetGridEntity(index);
          if (element.GetSaveState().Type == 17 && fortuneSpawned == 0) {
            let knife = 0;

            // if
            // (
            //   (
            //     Isaac.GetPlayer().HasCollectible(626) == false &&
            //     (
            //       (Game().GetLevel().GetStage() == 2 &&
            //       (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
            //       ||
            //       ((Game().GetLevel().GetStage() == 1 && Game().GetLevel().GetCurses () == 2) &&
            //       (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
            //     )
            //   )
            //   ||
            //   (
            //     Isaac.GetPlayer().HasCollectible(627) == false &&
            //     (
            //       (Game().GetLevel().GetStage() == 4 &&
            //       (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
            //       ||
            //       ((Game().GetLevel().GetStage() == 3 && Game().GetLevel().GetCurses () == 2) &&
            //       (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
            //     )
            //   )
            // )
            // {
            //   knife = 1;
            // }
            if(
                (Game().GetLevel().GetStage() == 2 &&
                (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
                ||
                ((Game().GetLevel().GetStage() == 1 && Game().GetLevel().GetCurses () == 2) &&
                (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
              ){
                if(Isaac.GetPlayer().HasCollectible(626) == false){
                  knife = 1;
                }
              }
            if(
                (Game().GetLevel().GetStage() == 4 &&
                (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
                ||
                ((Game().GetLevel().GetStage() == 3 && Game().GetLevel().GetCurses () == 2) &&
                (Game().GetLevel().GetStageType() == 4) || (Game().GetLevel().GetStageType() == 5))
              ){
              if(Isaac.GetPlayer().HasCollectible(627) == false){
                knife = 1;
              }
            }

            if (configRA.spoil == 2) {
              let count = 0;
              RoomArray.forEach((element) => {
                if (
                  (element.Room.DisplayFlags == 5 ||
                    element.Room.DisplayFlags == 3) &&
                  element.Room.VisitedCount == 0
                ) {
                  count += 1;
                }
              });
              if (count > 0) {
                if (knife == 1 && configRA.Knife == true)
                  Game()
                    .GetHUD()
                    .ShowFortuneText(
                      "RemembrAll",
                      `${count} rooms not visited,`,
                      "A piece of knife was left behind",
                    );
                else
                  Game()
                    .GetHUD()
                    .ShowFortuneText("RemembrAll", `${count} rooms not visited`);
              } else {
                if (knife == 1 && configRA.Knife == true)
                  Game()
                    .GetHUD()
                    .ShowFortuneText(
                      "RemembrAll",
                      `Unknown`,
                      "A piece of knife was left behind",
                    );
                else
                  Game()
                    .GetHUD()
                    .ShowFortuneText("RemembrAll", `Unknown`);
              }
            } else {
              let count = 0;
              RoomArray.forEach((element) => {
                if (element.Room.VisitedCount == 0) {
                  count += 1;
                }
              });
              if (count !== 0) {
                if (knife == 1 && configRA.Knife == true)
                  Game()
                    .GetHUD()
                    .ShowFortuneText(
                      "RemembrAll",
                      `${count} rooms not visited`,
                      "A piece of knife was left behind",
                    );
                else
                  Game()
                    .GetHUD()
                    .ShowFortuneText("RemembrAll", `${count} rooms not visited`);
              } else {
                if (knife == 1 && configRA.Knife == true)
                  Game()
                    .GetHUD()
                    .ShowFortuneText(
                      "RemembrAll",
                      `All special rooms have been visited`,
                      "A piece of knife was left behind",
                    );
                else
                  Game()
                    .GetHUD()
                    .ShowFortuneText(
                      "RemembrAll",
                      `All rooms have been visited`,
                    );
              }
            }
            fortuneSpawned = 1;
          }
        }
      }
    }
  }
}

//!AwardSeed
function GetAllRooms() {
  let GetRooms = Game().GetLevel().GetRooms();
  let SpecialRooms = [];
  for (let index = 0; index < GetRooms.Size; index++) {
    const Room = GetRooms.Get(index);

    if (
      Room.Data.Type !== 1 ||
      (Room.Data.Type == 1 &&
        (Room.Data.Subtype == 34 || Room.Data.Subtype == 10))
    ) {
      ArrayCheck = SpecialRooms;
      if (
        SpecialRooms.length > 0 &&
        CheckSafeIndex(Room, SpecialRooms) == true
      ) {
        continue;
      }
      // printConsole(
      //   `${Room.Data.Variant} `,
      // );

      let RoomObj = {
        Room: Room,
        Visited: false,
        Spawned: false,
        Animation: undefined,
        Type: Room.Data.Type,
        Opacity: 0.75,
      };
      RoomObj.Animation = SetAnimName(
        Room.Data.Type,
        Room.Data.Variant,
        Room.Data.Subtype,
        configRA
      );
      if (RoomObj.Animation == 0) {
        continue;
      }
      SpecialRooms.push(RoomObj);
    }
  }
  RoomArray = SpecialRooms.sort((a, b) =>
    a.Room.Data.Type < b.Room.Data.Type ? -1 : 1,
  );
}

function CheckSafeIndex(room: RoomDescriptor, test) {
  for (let index = 0; index < ArrayCheck.length; index++) {
    const element = ArrayCheck[index];
    if (room.SafeGridIndex == element.Room.SafeGridIndex) {
      return true;
    }
  }
  return false;
}

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod("remembrall", 1);

  function postGameStarted() {
    if (mod.HasData()) {
      const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
        string,
        any
      >;

      for (const [k, v] of pairs(loadedFromSave)) {
        configRA[k] = v;
      }
    }
  }

  function preGameExit() {
    mod.SaveData(json.encode(configRA));
  }

  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit);
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  if (ModConfigMenu !== undefined) {
    ModConfig(configRA);
  }
  // //! END MOD CONFIG MENU

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, GetAllRooms);
  mod.AddCallback(ModCallback.POST_RENDER, DisplayIcon);
  mod.AddCallback(ModCallback.POST_UPDATE, CheckRoom);
  mod.AddCallback(ModCallback.POST_NEW_ROOM, () => {
    fortuneSpawned = 0;

  });
  // mod.AddCallback(ModCallback.POST_NEW_ROOM, () => {
  //   let GetRooms = Game().GetLevel().GetRooms();
  //   let SpecialRooms = [];
  //   for (let index = 0; index < GetRooms.Size; index++) {
  //     const Room = GetRooms.Get(index);
  //     if (Room.Data.Type !== 1) {
         // printConsole(
       //   `${Room.Data.Type} ${Room.Data.Subtype} ${Room.DisplayFlags} ${Room.Data.Variant} `,
        // );
  //       printConsole(`${Game().GetLevel().GetCurses()}`)
  //     }
  //     if (Isaac.GetPlayer().HasCollectible(626) == false) {
  // printConsole(
       //   `${Room.Data.Type} ${Room.Data.Subtype} ${Room.DisplayFlags} ${Room.Data.Variant} `,
       // );
  //       printConsole(`true`)
  //     }
  //   }
     // printConsole(
    //   `${Game().GetLevel().GetCurrentRoomDesc().Data.Type} ${
     //     Game().GetLevel().GetCurrentRoomDesc().Data.Subtype
   //   }`,
     // );
  // });
  // mod.AddCallback(ModCallback.POST_NEW_ROOM, () => {
   //   let thisRoom = Game().GetLevel().GetCurrentRoomDesc()
   //   printConsole(`${thisRoom.DisplayFlags}`)
   //   });
 // Print a message to the "log.txt" file.
}
