/*:
 * @target MZ
 * @plugindesc Provides control over the game menu, allowing it to be disabled or enabled via plugin commands.
 * @author Bloodkin
 *
 * @command DisableMenu
 * @text Disable Menu
 * @desc Disables the game menu, preventing it from being accessed.
 *
 * @command EnableMenu
 * @text Enable Menu
 * @desc Enables the game menu, allowing it to be accessed again.
 *
 * @help BloodkinMenuControl.js
 *
 * This plugin provides commands to disable and enable the game menu.
 * This can be useful for creating cutscenes or other events where you
 * do not want the player to access the menu.
 *
 * Use the "DisableMenu" command to disable the menu, and "EnableMenu" to enable it.
 */

(() => {
  window.BloodkinMenuControl = window.BloodkinMenuControl || {};
  window.BloodkinMenuControl.menuDisabled = false;

  const _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
  Scene_Map.prototype.updateScene = function() {
    const originalCallMenu = this.isMenuCalled;
    if (window.BloodkinMenuControl.menuDisabled) {
      this.isMenuCalled = () => false;
    }
    _Scene_Map_updateScene.call(this);
    this.isMenuCalled = originalCallMenu;
  };

  PluginManager.registerCommand('BloodkinMenuControl', 'DisableMenu', args => {
    window.BloodkinMenuControl.menuDisabled = true;
  });

  PluginManager.registerCommand('BloodkinMenuControl', 'EnableMenu', args => {
    window.BloodkinMenuControl.menuDisabled = false;
  });
})();
