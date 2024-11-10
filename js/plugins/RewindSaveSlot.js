/*:
 * @target MZ
 * @plugindesc Adds a Rewind Save Slot mechanic that is not accessible from the normal load menu or continue button, and provides a command to delete the rewind save slot.
 * @author Bloodkin
 * 
 * @command saveRewind
 * @text Save Rewind Slot
 * @desc Save the current game state to the Rewind Save Slot.
 * 
 * @command loadRewind
 * @text Load Rewind Slot
 * @desc Load the game state from the Rewind Save Slot.
 * 
 * @command deleteRewind
 * @text Delete Rewind Slot
 * @desc Delete the Rewind Save Slot.
 * 
 * @help
 * Plugin Commands:
 * - Save Rewind Slot: Saves the game to the Rewind Save Slot.
 * - Load Rewind Slot: Loads the game from the Rewind Save Slot.
 * - Delete Rewind Slot: Deletes the Rewind Save Slot.
 */

(() => {
    const pluginName = 'RewindSaveSlot';
    const rewindSaveSlotId = 20; // Define an ID for the rewind save slot, higher than the normal range of slots

    // Plugin commands
    PluginManager.registerCommand(pluginName, 'saveRewind', () => {
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(rewindSaveSlotId)) {
            console.log('Rewind save slot saved successfully.');
        } else {
            console.error('Failed to save rewind save slot.');
        }
    });

    PluginManager.registerCommand(pluginName, 'loadRewind', () => {
        if (StorageManager.exists(rewindSaveSlotId)) {
            if (DataManager.loadGame(rewindSaveSlotId)) {
                $gameSystem.onAfterLoad();
                SceneManager.goto(Scene_Map);
                $gameMessage.add('Loaded from rewind save slot.');
            } else {
                console.error('Failed to load rewind save slot.');
            }
        } else {
            console.error('Rewind save slot does not exist.');
        }
    });

    PluginManager.registerCommand(pluginName, 'deleteRewind', () => {
        if (StorageManager.exists(rewindSaveSlotId)) {
            StorageManager.remove(rewindSaveSlotId);
            console.log('Rewind save slot deleted successfully.');
        } else {
            console.error('Rewind save slot does not exist.');
        }
    });

    // Override Scene_Load to exclude the rewind save slot
    const _Scene_Load_makeSavefileList = Scene_Load.prototype.makeSavefileList;
    Scene_Load.prototype.makeSavefileList = function() {
        _Scene_Load_makeSavefileList.call(this);
        this._list = this._list.filter(savefileId => savefileId !== rewindSaveSlotId);
    };

    // Override Scene_Title to exclude the rewind save slot from Continue
    const _Scene_Title_commandContinue = Scene_Title.prototype.commandContinue;
    Scene_Title.prototype.commandContinue = function() {
        DataManager.loadGlobalInfo();
        if (DataManager.isAnySavefileExists()) {
            const savefileId = DataManager.latestSavefileId();
            if (savefileId !== rewindSaveSlotId && StorageManager.exists(savefileId)) {
                this._continueEnabled = true;
                DataManager.loadGame(savefileId).then(() => {
                    SceneManager.goto(Scene_Map);
                });
            } else {
                this._continueEnabled = false;
                SoundManager.playBuzzer();
            }
        } else {
            this._continueEnabled = false;
            SoundManager.playBuzzer();
        }
    };

    // Ensure the latest savefile ID is not the rewind save slot
    const _DataManager_latestSavefileId = DataManager.latestSavefileId;
    DataManager.latestSavefileId = function() {
        const globalInfo = this.loadGlobalInfo();
        if (!globalInfo) return 1;
        let latestId = 1;
        let latestTimestamp = 0;
        for (let i = 1; i < globalInfo.length; i++) {
            if (globalInfo[i] && i !== rewindSaveSlotId && globalInfo[i].timestamp > latestTimestamp) {
                latestTimestamp = globalInfo[i].timestamp;
                latestId = i;
            }
        }
        return latestId;
    };
})();