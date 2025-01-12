/*:
 * @target MZ
 * @plugindesc Custom Enemy AI Behavior for VisuStella Event Movement Core
 * @author Bloodkin
 * @help BloodkinCustomEnemyAI.js
 * 
 * This plugin allows custom enemy behavior for RPG Maker MZ, integrating
 * with VisuStella Event Movement Core to provide unique chase behaviors.
 * 
 * Example:
 * Place <WolfAI> in the enemy event's note box to enable custom wolf behavior.
 * 
 * Behavior:
 * - Wolf pounces up to 3 tiles depending on player distance.
 * - Waits 2 seconds after pounce before resuming chase.
 * - Plays animation 416 before pounce, and animation 417 upon landing.
 * - Flips a switch if the wolf lands on the player's tile.
 * 
 * @param PounceSwitchID
 * @text Pounce Success Switch ID
 * @desc The ID of the switch to turn ON if the wolf lands on the player.
 * @type switch
 * @default 1
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinCustomEnemyAI');
    const pounceSwitchID = Number(parameters['PounceSuccessSwitchID'] || 1);

    // Hook into Game_Event initialization to detect custom AI
    const _Game_Event_start = Game_Event.prototype.start;
    Game_Event.prototype.start = function() {
        _Game_Event_start.call(this);
        if (this.event().meta.WolfAI) {
            this._customAIWolf = true;
            this._pounceCooldown = 0;
            this._waitCount = 0;
            this._alerted = false;  
            console.log(`Wolf Event ${this.eventId()} initialized with AI.`);
        }
    };

    // Hook into VisuStella chase logic
    const _Game_Event_chaseCharacter = Game_Event.prototype.chaseCharacter;
    Game_Event.prototype.chaseCharacter = function(character) {
        _Game_Event_chaseCharacter.call(this, character);
        if (this.event().meta.WolfAI && this.canSeePlayer()) {
            console.log(`Event ${this.eventId()} detected player during chase.`);
            this._alerted = true;
        }
    };

    // Override alert setter if VisuStella exposes setAlerted
    if (Game_Event.prototype.setAlerted) {
        const _Game_Event_setAlerted = Game_Event.prototype.setAlerted;
        Game_Event.prototype.setAlerted = function(value) {
            _Game_Event_setAlerted.call(this, value);
            if (this.event().meta.WolfAI) {
                this._alerted = value;
                console.log(`Event ${this.eventId()} alert state set to: ${value}`);
            }
        };
    }

    // Real-time player vision detection
    Game_Event.prototype.canSeePlayer = function() {
        const dx = $gamePlayer.x - this.x;
        const dy = $gamePlayer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const alertRange = 6;  // Slightly larger detection radius

        if (distance <= alertRange) {
            const direction = this.directionToPlayer(dx, dy);
            const eventAngle = this.eventDirectionAngle();
            const fov = 160;  // Slightly wider FOV

            let angleDiff = (direction - eventAngle + 360) % 360;
            if (angleDiff > 180) angleDiff = 360 - angleDiff;

            if (angleDiff <= fov / 2) {
                return true;
            }
        }
        return false;
    };

    // Calculate direction to player
    Game_Event.prototype.directionToPlayer = function(dx, dy) {
        return Math.atan2(-dy, dx) * (180 / Math.PI);
    };

    Game_Event.prototype.eventDirectionAngle = function() {
        switch (this.direction()) {
            case 8: return 270; // Up
            case 6: return 0;   // Right
            case 2: return 90;  // Down
            case 4: return 180; // Left
        }
        return 0;
    };

    // Update AI during event processing
    const _Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        if (this._customAIWolf) {
            if (this._waitCount > 0) {
                this._waitCount--;
            } else if (this._alerted) {
                this.updateWolfAI();
            } else if (this.canSeePlayer()) {
                console.log(`Event ${this.eventId()} spotted player in routine.`);
                this._alerted = true;
            }
        }
        if (this._pounceCooldown > 0) {
            this._pounceCooldown--;
        }
    };

    // Wolf AI behavior during alert
    Game_Event.prototype.updateWolfAI = function() {
        if (this._pounceCooldown > 0 || this._waitCount > 0) return;

        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const distance = Math.abs(dx) + Math.abs(dy);

        if (distance <= 5) {
            if (distance <= 3 && !this._pounceCooldown) {
                console.log(`Event ${this.eventId()} preparing to pounce.`);
                this.preparePounce(dx, dy, distance);
            }
        }
    };

    Game_Event.prototype.preparePounce = function(dx, dy, distance) {
        this.requestAnimation(416);
        this._waitCount = 120;
        setTimeout(() => {
            this.executePounce(dx, dy, distance);
        }, 2000);
    };

    Game_Event.prototype.executePounce = function(dx, dy, distance) {
        const pounceTiles = Math.min(distance, 3);
        const targetX = this.x + Math.sign(dx) * pounceTiles;
        const targetY = this.y + Math.sign(dy) * pounceTiles;

        this.jump(targetX - this.x, targetY - this.y);
        this._waitCount = 120;
        this._pounceCooldown = 180;

        this.requestAnimation(417);
        this.checkPounceSuccess(targetX, targetY);
    };

    Game_Event.prototype.checkPounceSuccess = function(targetX, targetY) {
        if (targetX === $gamePlayer.x && targetY === $gamePlayer.y) {
            $gameSwitches.setValue(pounceSwitchID, true);
        }
    };
})();
