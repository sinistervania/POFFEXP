/*:
 * @target MZ
 * @plugindesc Customize the Message Window position, size, and appearance.
 * @author Bloodkin
 * @help 
 * This plugin allows customization of the Message Window in RPG Maker MZ. 
 * You can adjust the window's position, size, visible rows, and line height.
 *
 * Modify the configuration values in the plugin script as needed.
 */

/*:
 * @target MZ
 * @plugindesc Customize the Message Window position, size, and appearance with compatibility handling.
 * @author Bloodkin
 * @help 
 * This plugin customizes the Message Window in RPG Maker MZ. 
 * Place this plugin below others to avoid conflicts.
 *
 * Modify the configuration values in the plugin script as needed.
 */

(() => {
    const config = {
        x: 20,                // X position of the Message Window
        y: Graphics.boxHeight - 180, // Y position of the Message Window
        width: Graphics.boxWidth / 2, // Width of the Message Window
        height: 160,          // Height of the Message Window
        visibleRows: 4,       // Number of visible rows in the Message Window
        lineHeight: 36        // Line height for the text
    };

    // Alias the existing windowRect method
    const _Window_Message_windowRect = Window_Message.prototype.windowRect;
    Window_Message.prototype.windowRect = function() {
        const rect = _Window_Message_windowRect ? _Window_Message_windowRect.call(this) : null;
        return new Rectangle(config.x, config.y, config.width, config.height);
    };

    // Alias the existing numVisibleRows method
    const _Window_Message_numVisibleRows = Window_Message.prototype.numVisibleRows;
    Window_Message.prototype.numVisibleRows = function() {
        return config.visibleRows;
    };

    // Alias the existing lineHeight method
    const _Window_Base_lineHeight = Window_Base.prototype.lineHeight;
    Window_Base.prototype.lineHeight = function() {
        return config.lineHeight;
    };
})();