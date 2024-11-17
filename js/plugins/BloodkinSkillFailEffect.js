/*:
 * @target MZ
 * @plugindesc Plays a sound effect and displays "NOT ENOUGH ENERGY!" in a message window if skill costs are insufficient during selection. The message disappears automatically.
 * @author Bloodkin
 */

(() => {
    const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;

    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        const hasEnoughMp = this._mp >= this.skillMpCost(skill);
        const hasEnoughTp = this._tp >= this.skillTpCost(skill);

        // If resources are insufficient, play the Buzzer3 sound and display a message
        if (!hasEnoughMp || !hasEnoughTp) {
            AudioManager.playSe({ name: "Buzzer3", volume: 90, pitch: 150, pan: 0 });
            console.log(`Insufficient resources for skill: ${skill.name}`);

            // Display the message "NOT ENOUGH ENERGY!" in a message window
            const scene = SceneManager._scene;
            if (scene instanceof Scene_Battle) {
                scene.displayNotEnoughEnergyMessage();
            }
        }

        // Return the original check to avoid interfering with existing selection logic
        return _Game_BattlerBase_canPaySkillCost.call(this, skill);
    };

    // Add a new function to the Scene_Battle class to display the message
    Scene_Battle.prototype.displayNotEnoughEnergyMessage = function() {
        if (!this._notEnoughEnergyWindow) {
            this.createNotEnoughEnergyWindow();
        }

        // Update and show the message window
        this._notEnoughEnergyWindow.drawMessage("NOT ENOUGH ENERGY!");
        this._notEnoughEnergyWindow.open();

        // Set a timer to close the window automatically
        this._notEnoughEnergyWindowTimer = 60; // Duration in frames (60 frames = 1 second)
    };

    Scene_Battle.prototype.createNotEnoughEnergyWindow = function() {
        const rect = this.messageWindowRect();
        this._notEnoughEnergyWindow = new Window_Base(rect);
        this.addChild(this._notEnoughEnergyWindow);
        this._notEnoughEnergyWindow.openness = 0; // Start hidden
        this._notEnoughEnergyWindowTimer = 0; // Timer starts at 0
    };

    Scene_Battle.prototype.messageWindowRect = function() {
        const width = 400;
        const height = 80;
        const x = (Graphics.boxWidth - width) / 2; // Center horizontally
        const y = Graphics.boxHeight - height - 230; // Move up by 400 pixels
        return new Rectangle(x, y, width, height);
    };
    

    Window_Base.prototype.drawMessage = function(message) {
        this.contents.clear();
        const x = 0;
        const y = 0;
        const width = this.contents.width;
        this.drawText(message, x, y, width, "center");
    };

    // Override the update method to handle the message window timer
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);

        if (this._notEnoughEnergyWindow && this._notEnoughEnergyWindowTimer > 0) {
            this._notEnoughEnergyWindowTimer--;
            if (this._notEnoughEnergyWindowTimer === 0) {
                this._notEnoughEnergyWindow.close();
            }
        }
    };
})();
