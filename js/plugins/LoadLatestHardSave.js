/*:
 * @target MZ
 * @plugindesc Adds functionality to cache and load the latest save file excluding a specific slot.
 * @author Bloodkin
 * @help This plugin caches the latest save file ID excluding a specified slot and provides plugin commands to load it.
 * @command cacheLatestSave
 * @text Cache Latest Save
 * @desc Cache the latest save file excluding slot 20.
 * @command loadCachedSave
 * @text Load Cached Save
 * @desc Load the cached latest save file.
 */

(() => {
    const pluginName = 'LoadLatestHardSave';
    const rewindSaveSlotId = 20;

    // Extend ConfigManager to store the cached save file ID
    ConfigManager.cachedSavefileId = null;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.cachedSavefileId = this.cachedSavefileId;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.cachedSavefileId = config.cachedSavefileId !== undefined ? config.cachedSavefileId : null;
    };

    PluginManager.registerCommand(pluginName, 'cacheLatestSave', () => {
        DataManager.loadGlobalInfo();
        if (DataManager.isGlobalInfoLoaded()) {
            const globalInfo = DataManager._globalInfo;
            let latestId = 1;
            let latestTimestamp = 0;

            for (let i = 1; i < globalInfo.length; i++) {
                if (globalInfo[i] && i !== rewindSaveSlotId && globalInfo[i].timestamp > latestTimestamp) {
                    latestTimestamp = globalInfo[i].timestamp;
                    latestId = i;
                }
            }
            ConfigManager.cachedSavefileId = latestId;
            ConfigManager.save();
            console.log(`Cached savefileId: ${ConfigManager.cachedSavefileId}`);
        } else {
            console.error("Failed to load global save file information.");
        }
    });

    PluginManager.registerCommand(pluginName, 'loadCachedSave', () => {
        const cachedSavefileId = ConfigManager.cachedSavefileId;
        if (cachedSavefileId !== null) {
            if (StorageManager.exists(cachedSavefileId)) {
                DataManager.loadGame(cachedSavefileId).then(() => {
                    SceneManager.goto(Scene_Map);
                    $gameSystem.onAfterLoad();
                    console.log(`Loaded cached savefileId: ${cachedSavefileId}`);
                }).catch(() => {
                    console.error(`Failed to load cached save file with ID: ${cachedSavefileId}`);
                });
            } else {
                console.error(`Cached save file with ID: ${cachedSavefileId} does not exist.`);
            }
        } else {
            console.error("No cached save file ID found.");
        }
    });
})();
