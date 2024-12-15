/*:
 * @target MZ
 * @plugindesc Plays a sound effect whenever a message window appears.
 * @help This plugin will play the "Book2" sound effect every time a message window is opened.
 */

(() => {
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;

    Window_Message.prototype.startMessage = function() {
        // Play the sound effect when the message starts
        AudioManager.playSe({
            name: "Book2",  // Sound effect filename (without extension)
            volume: 50,     // Volume (0-100)
            pitch: 150,     // Pitch (50-150)
            pan: 0          // Pan (-100 to 100)
        });

        // Call the original method
        _Window_Message_startMessage.call(this);
    };
})();
