export function ModConfig(configHB) {
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
      CurrentSetting: (): number => configHB.Mode,
      Maximum: 2,
      Minimum: 1,
      Display() {
        let onOff = "All projectile";
        if (configHB.Mode == 2) {
          onOff = "Only curved";
        }
        return `Mode: ${onOff}`;
      },
      Info: [],
      OnChange: (currentValue: number | boolean | undefined): void => {
        configHB.Mode = currentValue as number;
      },
      Type: ModConfigMenuOptionType.NUMBER,
    });

    ModConfigMenu.AddSetting("RemembrAll!", `Mains`, {
      Type: ModConfigMenuOptionType.BOOLEAN,
      CurrentSetting() {
        return configHB.Player;
      },
      Display() {
        let onOff = "Disabled";
        if (configHB.Player == true) {
          onOff = "Enabled";
        }
        return `Player: ${onOff}`;
      },
      OnChange(IsOn) {
        configHB.Player = IsOn as boolean;
      },
      Info: [`displays the player's hitbox`],
    });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("RemembrAll!", `${type}`, {
        Type: ModConfigMenuOptionType.BOOLEAN,
        CurrentSetting() {
          return configHB[entity];
        },
        Display() {
          let onOff = "Disabled";
          if (configHB[entity] == true) {
            onOff = "Enabled";
          }
          return `${name}: ${onOff}`;
        },
        OnChange(IsOn) {
          configHB[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("CDPriority", "Mains", "ComingDown! priority", "If you have 'Coming down!' should the mod prioritize the coming down effect? ");
    addItem("ChangeColor", "Mains", "Change Color", "The colors of the projectiles change according to the height. Green if too high to hit you. ");


    ModConfigMenu.AddSpace("RemembrAll!", "ChangeLog");
    ModConfigMenu.AddText("RemembrAll!", "ChangeLog", () => "Hello World");
  }
}
