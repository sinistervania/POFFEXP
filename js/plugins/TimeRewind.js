/*:
 * @target MZ
 * @plugindesc A plugin to save and load game state snapshots. Author: bloodkin
 * @help This plugin provides commands to save and load game states with snapshots and restore the turn count.
 *
 * @command saveSnapshot
 * @text Save Game with Snapshot
 * @desc Saves the current game state along with a snapshot of important data.
 *
 * @command loadSnapshot
 * @text Load Game with Snapshot
 * @desc Loads the game state along with the previously saved snapshot.
 */

(() => {
    const pluginName = "TimeRewind";

    function takeGameStateSnapshot() {
        const snapshot = {
            party: [],
            enemies: [],
            turnCount: BattleManager._turnCount, // Battle turn number
            variable28: $gameVariables.value(28), // Variable 28
            variable592: $gameVariables.value(592) // Variable 592
        };

        // Capture party data
        $gameParty.members().forEach(actor => {
            snapshot.party.push({
                actorId: actor.actorId(),
                hp: actor.hp,
                mp: actor.mp,
                tp: actor.tp,
                states: actor._states.slice(),
                stateTurns: actor._stateTurns ? Object.assign({}, actor._stateTurns) : {},
                skills: actor._skills.slice() // Capture skills
            });
        });

        // Capture enemy data
        $gameTroop.members().forEach(enemy => {
            snapshot.enemies.push({
                enemyId: enemy.enemyId(),
                hp: enemy.hp,
                mp: enemy.mp,
                tp: enemy.tp,
                states: enemy._states.slice(),
                stateTurns: enemy._stateTurns ? Object.assign({}, enemy._stateTurns) : {}
            });
        });

        return snapshot;
    }

    function restoreGameStateFromSnapshot(snapshot) {
        if (snapshot) {
            // Restore party data
            snapshot.party.forEach(data => {
                const actor = $gameActors.actor(data.actorId);
                if (actor) {
                    actor.setHp(data.hp);
                    actor.setMp(data.mp);
                    actor.setTp(data.tp);
                    actor._states = data.states.slice();
                    actor._stateTurns = Object.assign({}, data.stateTurns);
                    actor._skills = data.skills.slice(); // Restore skills
                }
            });

            // Restore enemy data
            snapshot.enemies.forEach((data, index) => {
                const enemy = $gameTroop.members()[index];
                if (enemy) {
                    enemy.setHp(data.hp);
                    enemy.setMp(data.mp);
                    enemy.setTp(data.tp);
                    enemy._states = data.states.slice();
                    enemy._stateTurns = Object.assign({}, data.stateTurns);
                }
            });

            // Restore battle turn number
            BattleManager._turnCount = snapshot.turnCount;

            // Restore variables
            $gameVariables.setValue(28, snapshot.variable28);
            $gameVariables.setValue(592, snapshot.variable592);

            // Force party leader to cast skill 964 if variable 592 is 0
            if ($gameVariables.value(592) === 0) {
                const partyLeader = $gameParty.leader();
                if (partyLeader && partyLeader.isAlive()) {
                    const action = new Game_Action(partyLeader);
                    action.setSkill(964);
                    if (partyLeader.canUse(action.item())) {
                        action.apply(partyLeader);
                    }
                }
            }
        }
    }

    PluginManager.registerCommand(pluginName, "saveSnapshot", () => {
        const gameStateSnapshot = takeGameStateSnapshot();
        $gameSystem._snapshot = gameStateSnapshot;
        console.log("Game and snapshot saved successfully.");
    });

    PluginManager.registerCommand(pluginName, "loadSnapshot", () => {
        if ($gameSystem._snapshot) {
            const snapshot = $gameSystem._snapshot;
            restoreGameStateFromSnapshot(snapshot);

            if ($gameParty.inBattle()) {
                SceneManager.goto(Scene_Battle);  // Go to battle scene if in battle
            } else {
                SceneManager.goto(Scene_Map);  // Otherwise, go to map scene
            }
            $gameSystem.onAfterLoad();

            // Delay the HUD refresh to ensure game state is fully restored
            setTimeout(() => {
                initializeHUDComponents();
            }, 500); // Increased delay to 500ms to ensure all game objects are initialized
        } else {
            console.log("No snapshot found.");
        }
    });

    function initializeHUDComponents() {
        if (typeof $gameHud !== 'undefined' && $gameHud) {
            $gameHud._components.forEach(component => {
                if (component._dynamicValue) {
                    const dynamicValue = component._dynamicValue;
                    dynamicValue._func = function () {
                        try {
                            const result = eval(dynamicValue._code);
                            return result != null ? result : ''; // Return an empty string if result is null
                        } catch (e) {
                            return ''; // Return an empty string if there's an error
                        }
                    };
                }
            });
            $gameHud.refresh();
        }
    }

    function overrideDynamicValueEval() {
        if (typeof UltraDynamicValue_CodeComponent !== 'undefined') {
            UltraDynamicValue_CodeComponent.prototype._evalFunc = function () {
                try {
                    const result = eval(this._code);
                    return result != null ? result : ''; // Return an empty string if result is null
                } catch (e) {
                    return ''; // Return an empty string if there's an error
                }
            };
        } else {
            setTimeout(overrideDynamicValueEval, 100); // Retry after 100ms
        }
    }

    overrideDynamicValueEval();
})();
