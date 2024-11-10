/*:
 * @target MZ
 * @plugindesc Enables the use of variables and item names in Show Choices command.
 * @author ChatGPT
 * @help DynamicChoices.js
 *
 * This plugin allows the use of variables and specific item names in the Show Choices command.
 * Enclose the variable ID in curly braces to use its value as a choice.
 * Use item tags like [item 1] to use the name of item 1.
 *
 * @param itemChoices
 * @text Item Choices
 * @type struct<ItemChoice>[]
 * @desc Define item IDs and their corresponding choice text.
 * @default []
 *
 * Example: {1} will use the value of variable 1.
 * [item 1] will be replaced with the name of item ID 1.
 */

/*~struct~ItemChoice:
 * @param itemId
 * @text Item ID
 * @desc The ID of the item to use in choices.
 * @type item
 *
 * @param choiceText
 * @text Choice Text
 * @desc The text to display for this item in choices.
 * @type text
 */

(() => {
    const pluginName = 'DynamicChoices';
    const parameters = PluginManager.parameters(pluginName);
    const itemChoices = JSON.parse(parameters['itemChoices'] || '[]').map(JSON.parse);

    function getItemChoiceText(itemId) {
        const itemChoice = itemChoices.find(choice => choice.itemId === String(itemId));
        return itemChoice ? itemChoice.choiceText : '';
    }

    const _Game_Message_addChoice = Game_Message.prototype.addChoice;
    Game_Message.prototype.addChoice = function(choice, defaultType) {
        choice = choice.replace(/\{(\d+)\}/g, (_, varId) => {
            return $gameVariables.value(parseInt(varId));
        });
        choice = choice.replace(/\[item (\d+)\]/g, (_, itemId) => {
            return getItemChoiceText(parseInt(itemId));
        });
        _Game_Message_addChoice.call(this, choice, defaultType);
    };
})();
