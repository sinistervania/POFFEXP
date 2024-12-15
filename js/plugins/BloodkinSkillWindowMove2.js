//=============================================================================
// BloodkinSkillWindowMove2.js
//=============================================================================
/*:
 * @target MZ
 * @author Bloodkin
 * @pluginname BloodkinSkillWindowMove2
 */

/*:
 * @author Bloodkin
 * @help 
 * BloodkinSkillWindowMove2.js
 * Modify the x, y, width, and height values in the script to 
 * change the skill window and actor command window position and size.
 */

Scene_Battle.prototype.createSkillWindow = function() {
    const rect = this.skillWindowRect();
    this._skillWindow = new Window_BattleSkill(rect);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
    this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
    this._skillWindow.padding = 8; // Window padding
    this.addWindow(this._skillWindow);
};

Scene_Battle.prototype.skillWindowRect = function() {
    // Modify these values to change the skill window position and size
    const wx = 919;       // x position
    const wy = 836;       // y position
    const ww = Graphics.boxWidth - 920;  // width
    const wh = 204;       // height
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createActorCommandWindow = function() {
    const rect = this.actorCommandWindowRect();
    const commandWindow = new Window_ActorCommand(rect);
    commandWindow.setHandler("attack", this.commandAttack.bind(this));
    commandWindow.setHandler("skill", this.commandSkill.bind(this));
    commandWindow.setHandler("guard", this.commandGuard.bind(this));
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("cancel", this.commandCancel.bind(this));
    commandWindow.padding = 10; // Window padding
    this.addWindow(commandWindow);
    this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
    // Modify these values to change the actor command window position and size
    const wx = 556;       // x position
    const wy = 836;       // y position
    const ww = 160;       // width
    const wh = 206;       // height
    return new Rectangle(wx, wy, ww, wh);
};

// Override the base Window_Selectable settings
Window_Selectable.prototype.lineHeight = function() {
    return 46;
};

Window_Selectable.prototype.itemPadding = function() {
    return 1;
};

Window_Selectable.prototype.itemHeight = function() {
    return this.lineHeight();
};
//This is being overritten by the game engine which is currently 40
Window_Base.prototype.fontSize = function() {
    return 40;
};

