/*:
 * @target MZ
 * @plugindesc Manages action points and displays names and state icons of targets in the help window during battle.
 * @author Bloodkin
 *
 * @param actor1VariableId
 * @text Actor 1 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 1.
 * @default 1
 * 
 * @param actor2VariableId
 * @text Actor 2 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 2.
 * @default 1
 * 
 * @param actor3VariableId
 * @text Actor 3 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 3.
 * @default 1
 * 
 * @param actor4VariableId
 * @text Actor 4 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 4.
 * @default 1
 * 
 * @param actor5VariableId
 * @text Actor 5 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 5.
 * @default 1
 * 
 * @param actor6VariableId
 * @text Actor 6 Variable ID
 * @type variable
 * @desc Variable to store action times for actor 6.
 * @default 1
 */

(() => {
    const parameters = PluginManager.parameters('APUITrackerAndEnemyNameDisplay');
    const actorVariableIds = [1, 2, 3, 4, 5, 6].map(id => Number(parameters[`actor${id}VariableId`] || 1));
    let deductionCounts = {};

    const getActionPointsVariableId = actorId => actorVariableIds[actorId - 1] || 0;

    // Deduct points function
    const deductPoints = actorId => {
        const variableId = getActionPointsVariableId(actorId);
        if (variableId > 0) {
            const currentPoints = $gameVariables.value(variableId);
            if (currentPoints > 0) {
                $gameVariables.setValue(variableId, currentPoints - 1);
                deductionCounts[actorId] = (deductionCounts[actorId] || 0) + 1;
            }
        }
    };

    // Refund points function
    const refundPoints = actorId => {
        const variableId = getActionPointsVariableId(actorId);
        if (variableId > 0 && deductionCounts[actorId] > 0) {
            const currentPoints = $gameVariables.value(variableId);
            const maxPoints = $gameVariables.value(343); // Assuming 343 is your cap variable
            $gameVariables.setValue(variableId, Math.min(currentPoints + 1, maxPoints));
            deductionCounts[actorId]--;
        }
    };

    // Setup for the target display functionality
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this._enemyWindow.setHelpWindow(this._helpWindow);
        this._helpWindow.height = 100;
        this._helpWindow.createContents(); // Re-create contents after resizing
    };

    const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_select.call(this, index);
        this.updateHelp(); // Update help when an enemy is selected
    };

    const _Window_BattleEnemy_deselect = Window_BattleEnemy.prototype.deselect;
    Window_BattleEnemy.prototype.deselect = function() {
        _Window_BattleEnemy_deselect.call(this);
        if (this._helpWindow) {
            this._helpWindow.clear(); // Clear help window on deselect
        }
    };

    Window_BattleEnemy.prototype.updateHelp = function() {
        if (this._helpWindow && this.enemy()) {
            this._helpWindow.contents.clear(); // Clear existing contents
            const enemy = this.enemy();
            const enemyName = enemy.name();
            const textWidth = this._helpWindow.contents.measureTextWidth(enemyName);
            const padding = (this._helpWindow.width - textWidth) / 2;
            this._helpWindow.drawText(enemyName, padding, 0, textWidth, 'center'); // Draw enemy name centered
            const iconsX = padding + textWidth + 4; // Position icons after the name
            this.drawActorIcons(enemy, iconsX, 0); // Draw state icons
        }
    };

    Window_BattleEnemy.prototype.drawActorIcons = function(actor, x, y) {
        const iconWidth = ImageManager.iconWidth;
        let icons = actor.states().map(state => state.iconIndex).filter(iconIndex => iconIndex > 0);
        for (let i = 0; i < icons.length; i++) {
            this._helpWindow.drawIcon(icons[i], x + i * iconWidth, y); // Draw each icon
        }
    };

    // Command cancel override
    const originalCommandCancel = Scene_Battle.prototype.commandCancel;
    Scene_Battle.prototype.commandCancel = function() {
        const actor = BattleManager.actor();
        if (actor && deductionCounts[actor.actorId()] > 0) {
            refundPoints(actor.actorId());
        }
        if (this._helpWindow) {
            this._helpWindow.clear(); // Clear help window
        }
        originalCommandCancel.call(this);
    };
})();
