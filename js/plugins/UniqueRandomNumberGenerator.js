/*:
 * @target MZ
 * @plugindesc Unique Number Generator for RPG Maker MZ
 * @author Bloodkin

 * @param minNumber
 * @text Minimum Number
 * @type number
 * @default 1

 * @param maxNumber
 * @text Maximum Number
 * @type number
 * @default 10

 * @param variableId
 * @text Variable ID
 * @type variable
 * @default 1

 * @command GenerateUniqueNumber
 * @text Generate Unique Number
 * @desc Generates a unique number within the specified range.

 * @command ResetNumbers
 * @text Reset Number List
 * @desc Resets the list of generated numbers.
 */
(() => {
    const pluginName = 'UniqueRandomNumberGenerator';
    const parameters = PluginManager.parameters(pluginName);
    const minNumber = parseInt(parameters['minNumber'], 10);
    const maxNumber = parseInt(parameters['maxNumber'], 10);
    const variableId = parseInt(parameters['variableId'], 10);

    let generatedNumbers = [];

    function isGenerationPossible() {
        return generatedNumbers.length < (maxNumber - minNumber + 1);
    }

    PluginManager.registerCommand(pluginName, 'GenerateUniqueNumber', args => {
        if (!isGenerationPossible()) {
            // Reset the list when all possible numbers have been generated
            generatedNumbers = [];
        }

        let uniqueNumber;
        do {
            uniqueNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        } while (generatedNumbers.includes(uniqueNumber));

        generatedNumbers.push(uniqueNumber);
        $gameVariables.setValue(variableId, uniqueNumber); // Store in the specified game variable
    });

    PluginManager.registerCommand(pluginName, 'ResetNumbers', args => {
        generatedNumbers = [];
    });
})();
