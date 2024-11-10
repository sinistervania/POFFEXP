Scene_Battle.prototype.createSkillWindow = function() {
    const rect = this.skillWindowRect();
    this._skillWindow = new Window_BattleSkill(rect);
    this._skillWindow.setHelpWindow(this._helpWindow);
    this._skillWindow.setHandler("ok", this.onSkillOk.bind(this));
    this._skillWindow.setHandler("cancel", this.onSkillCancel.bind(this));
    this.addWindow(this._skillWindow);
};

Scene_Battle.prototype.skillWindowRect = function() {
    const ww = Graphics.boxWidth - 150; //width
    const wh = this.windowAreaHeight();
    const wx = 150; // x value
    const wy = Graphics.boxHeight - wh; //y value
    return new Rectangle(wx, wy, ww, wh);
};
