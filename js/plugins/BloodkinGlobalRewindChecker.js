/*:
 * @target MZ
 * @plugindesc Allows control over a global variable 'JustRewinded' with JSON file persistence across sessions and saves. Compatible with Conditional Branches in events.
 * @param JustRewindedSwitchID
 * @type switch
 * @desc The ID of the switch that mirrors the JustRewinded variable, allowing use in Conditional Branches.
 * @default 1
 * 
 * @command SetJustRewinded
 * @text Set JustRewinded
 * @desc Change the value of JustRewinded in memory, then save to the JSON file.
 *
 * @arg value
 * @type boolean
 * @desc The new value for JustRewinded.
 * @default false
 * 
 * @command GetJustRewinded
 * @text Get JustRewinded
 * @desc Outputs the current value of JustRewinded to the console.
 * 
 * @command DirectSetJustRewinded
 * @text Direct Set JustRewinded
 * @desc Directly changes the value of JustRewinded in the JSON file without affecting in-game variable.
 *
 * @arg value
 * @type boolean
 * @desc The new value for JustRewinded in the JSON file.
 * @default false
 * 
 * @command ApplyJsonValueToSwitch
 * @text Apply JSON Value to Switch
 * @desc Reads JustRewinded value from JSON file and applies it to the in-game switch.
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinGlobalRewindChecker');
    const switchID = Number(parameters['JustRewindedSwitchID']);
    const path = require('path');
    const fs = require('fs');
    
    // Define the file path to data/plugin/JustRewindedData.json
    const dataDir = path.join(path.dirname(process.mainModule.filename), 'data', 'plugin');
    const filePath = path.join(dataDir, 'JustRewindedData.json');

    // Ensure the plugin directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Helper function to update the switch status in-game
    function updateSwitch() {
        if ($gameSwitches && switchID > 0) {
            $gameSwitches.setValue(switchID, $gameSystem._justRewinded);
            console.log(`Switch ${switchID} set to: ${$gameSystem._justRewinded}`); // Debugging statement
        }
    }

    // Save JustRewinded to JSON file
    function saveJustRewindedToFile() {
        const data = { JustRewinded: $gameSystem._justRewinded };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`JustRewinded saved to JSON file: ${$gameSystem._justRewinded}`); // Debugging statement
    }

    // Directly set the value of JustRewinded in the JSON file
    function directSetJustRewinded(value) {
        const data = { JustRewinded: value };
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`JustRewinded directly set in JSON file to: ${value}`); // Debugging statement
    }

    // Load JustRewinded from JSON file or create it if it doesn’t exist
    function loadOrCreateJustRewindedFile() {
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            $gameSystem._justRewinded = data.JustRewinded;
            console.log(`JustRewinded loaded from JSON file: ${$gameSystem._justRewinded}`); // Debugging statement
        } else {
            $gameSystem._justRewinded = false; // Default value if file does not exist
            saveJustRewindedToFile(); // Generate the file with the default value
            console.log(`JSON file not found. Created new file with JustRewinded: ${$gameSystem._justRewinded}`);
        }
        updateSwitch(); // Update switch after loading or creation
    }

    // Apply JSON value to the in-game switch
    function applyJsonValueToSwitch() {
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const jsonValue = data.JustRewinded;
            $gameSwitches.setValue(switchID, jsonValue);
            console.log(`Applied JSON JustRewinded value to switch ${switchID}: ${jsonValue}`); // Debugging statement
        } else {
            console.log("JSON file not found. Cannot apply value to switch.");
        }
    }

    // Plugin Commands
    PluginManager.registerCommand('BloodkinGlobalRewindChecker', 'SetJustRewinded', args => {
        $gameSystem._justRewinded = args.value === 'true';
        updateSwitch();
        saveJustRewindedToFile();
    });

    PluginManager.registerCommand('BloodkinGlobalRewindChecker', 'GetJustRewinded', () => {
        console.log(`JustRewinded is currently: ${$gameSystem._justRewinded}`);
    });

    PluginManager.registerCommand('BloodkinGlobalRewindChecker', 'DirectSetJustRewinded', args => {
        const value = args.value === 'true';
        directSetJustRewinded(value);
    });

    PluginManager.registerCommand('BloodkinGlobalRewindChecker', 'ApplyJsonValueToSwitch', () => {
        applyJsonValueToSwitch();
    });

    // Initialize JustRewinded on game start/load
    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        loadOrCreateJustRewindedFile(); // Load or create the file on game start
    };

    // Accessor for external script calls
    window.JustRewinded = () => $gameSystem._justRewinded;
})();
