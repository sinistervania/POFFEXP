/*:
 * @target MZ
 * @plugindesc Stores and displays "Day [Variable 30]" with additional time info and location for each save slot.
 * @author Bloodkin
 * 
 * @help This plugin saves the value of Variable 30, 636, and 634 for each save slot
 * and displays it next to the timestamp on the save file list screen. It also
 * displays "AM" or "PM" depending on the state of Switch 952. If Variable 634 equals 0,
 * it displays '00' instead of 0. Additionally, it displays a location name before "Day"
 * based on the state of specific switches.
 * 
 * No plugin commands are required for this plugin.
 */

(() => {
    // Save relevant variable values into the save file's metadata
    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.dayVariable = $gameVariables.value(30);  // Store the value of Variable 30
        info.var636 = $gameVariables.value(636);      // Store the value of Variable 636
        info.var634 = $gameVariables.value(634);      // Store the value of Variable 634
        info.isPM = $gameSwitches.value(952);         // Store the state of Switch 952
        info.location = this.getLocationName();       // Store the location based on switches
        return info;
    };

    // Method to determine the location name based on switches
    DataManager.getLocationName = function() {
        if ($gameSwitches.value(576)) return 'Lotus Castle';
        if ($gameSwitches.value(566)) return 'Blackship';
        if ($gameSwitches.value(567)) return 'Overworld';
        if ($gameSwitches.value(568)) return 'Alcove';
        if ($gameSwitches.value(571)) return 'Sage Forest';
        if ($gameSwitches.value(572)) return 'Castle of White';
        if ($gameSwitches.value(573)) return 'Mountain';
        if ($gameSwitches.value(574)) return 'Spider Forest';
        return ''; // Default to an empty string if no switches are on
    };

    // Display the stored Day, location, and time info in the save file list
    const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
    Window_SavefileList.prototype.drawContents = function(info, rect) {
        const x = rect.x + 10;
        const y = rect.y + 24;
        const width = rect.width - 192;
        let displayText = "Day ?";

        if (info && info.dayVariable !== undefined) {
            const period = info.isPM ? "PM" : "AM";
            const minutes = info.var634 === 0 ? '00' : info.var634; // Display '00' if Variable 634 is 0
            const location = info.location ? info.location + ' ' : '';
            displayText = `${location}\xa0\xa0Day ${info.dayVariable}\xa0\xa0\xa0\xa0\xa0\xa0${info.var636}:${minutes} ${period}`;
        }

        this.drawText(displayText, x, y, width, 'right');
        _Window_SavefileList_drawContents.call(this, info, rect);
    };
})();
