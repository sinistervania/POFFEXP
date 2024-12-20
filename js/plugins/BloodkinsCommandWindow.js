Scene_Battle.prototype.createActorCommandWindow = function() {
    const rect = this.actorCommandWindowRect();
    const commandWindow = new Window_ActorCommand(rect);
    commandWindow.y = Graphics.boxHeight -400; // Y value
    commandWindow.setHandler("attack", this.commandAttack.bind(this));
    commandWindow.setHandler("skill", this.commandSkill.bind(this));
    commandWindow.setHandler("guard", this.commandGuard.bind(this));
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("cancel", this.commandCancel.bind(this));
    this.addWindow(commandWindow);
    this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.actorCommandWindowRect = function() {
    const ww = 150; //width
    const wh = this.windowAreaHeight() -50; // height
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 1; // X value
    const wy = Graphics.boxHeight + 0;
    return new Rectangle(wx, wy, ww, wh);
};