export function ModConfig(configRA) {
  if (ModConfigMenu !== undefined) {
    ModConfigMenu.RemoveCategory("RemembrAll!");

    ModConfigMenu.AddSpace("RemembrAll!", "About");
    ModConfigMenu.AddText("RemembrAll!","About",() => "RemembrAll!",);
    ModConfigMenu.AddSpace("RemembrAll!", "About");
    ModConfigMenu.AddText("RemembrAll!", "About", () => `Version 0.5`);

    ModConfigMenu.AddSpace("RemembrAll!", "About");
    ModConfigMenu.AddText("RemembrAll!", "About", () => "Mod made by Tidloas with love");
    ModConfigMenu.AddSpace("RemembrAll!", "About");

    ModConfigMenu.AddSetting("RemembrAll!", `Mains`, {
      CurrentSetting: (): number => configRA.spoil,
      Maximum: 2,
      Minimum: 0,
      Display() {
        let onOff = "Spoil";
        if (configRA.spoil == 1) {
          onOff = "No spoil";
        }
        if (configRA.spoil == 2) {
          onOff = "Real no spoil";
        }
        return `Mode: ${onOff}`;
      },
      Info: [`spoil: all icons are displayed, NoSpoil: all icons but "hidden", RealNoSpoil: Hidden until discovered`],
      OnChange: (currentValue: number | boolean | undefined): void => {
        configRA.spoil = currentValue as number;
      },
      Type: ModConfigMenuOptionType.NUMBER,
    });

    // ModConfigMenu.AddSetting("RemembrAll!", `Mains`, {
    //   Type: ModConfigMenuOptionType.BOOLEAN,
    //   CurrentSetting() {
    //     return configRA.Player;
    //   },
    //   Display() {
    //     let onOff = "Disabled";
    //     if (configRA.Player == true) {
    //       onOff = "Enabled";
    //     }
    //     return `Player: ${onOff}`;
    //   },
    //   OnChange(IsOn) {
    //     configRA.Player = IsOn as boolean;
    //   },
    //   Info: [`displays the player's hitbox`],
    // });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("RemembrAll!", `${type}`, {
        Type: ModConfigMenuOptionType.BOOLEAN,
        CurrentSetting() {
          return configRA[entity];
        },
        Display() {
          let onOff = "Disabled";
          if (configRA[entity] == true) {
            onOff = "Enabled";
          }
          return `${name}: ${onOff}`;
        },
        OnChange(IsOn) {
          configRA[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("HideVisited", "Mains", "Hide Visited", "Hides the icons of the visited rooms, instead of changing the opacity");
    addItem("Disable", "Mains", "Disable icons", "Hide icons");
    addItem("Fortune", "Mains", "Fortune", "Displays a fortune with the objectives/rooms missed");
    addItem("Knife", "Rooms", "Knife", "Enable Knife Room detection");
    addItem("Shop", "Rooms", "Shop", "Enable Shop Room detection");
    addItem("Treasure", "Rooms", "Treasure", "Enable Treasure Room detection");
    addItem("Mini", "Rooms", "MiniBoss", "Enable MiniBoss Room detection");
    addItem("Secret", "Rooms", "Secret", "Enable Secret Room detection");
    addItem("SuperSecret", "Rooms", "SuperSecret", "Enable SuperSecret Room detection");
    addItem("Arcade", "Rooms", "Arcade", "Enable Arcade Room detection");
    addItem("Curse", "Rooms", "Curse", "Enable Curse Room detection");
    addItem("Ambush", "Rooms", "Ambush", "Enable Ambush Room detection");
    addItem("Library", "Rooms", "Library", "Enable Library Room detection");
    addItem("Chests", "Rooms", "Chests", "Enable Chests Room detection");
    addItem("Dice", "Rooms", "Dice", "Enable Dice Room detection");
    addItem("Planetarium", "Rooms", "Planetarium", "Enable Planetarium Room detection");
    addItem("Sacrifice", "Rooms", "Sacrifice", "Enable Sacrifice Room detection");
    addItem("Ultra", "Rooms", "UltraSecret", "Enable UltraSecret Room detection");
    addItem("Tainted", "Rooms", "Tainted", "Enable Tainted Room detection");

    ModConfigMenu.AddSpace("RemembrAll!", "ChangeLog");
    ModConfigMenu.AddText("RemembrAll!", "ChangeLog", () => "Hello World");
  }
}
