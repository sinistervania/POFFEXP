(() => {
    // Save the original method
    const _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;

    // Override the method to add debugging
    Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
        // Log the changes to the console
        console.log(`Player image change detected:`);
        console.log(`Character Name: ${characterName}`);
        console.log(`Character Index: ${characterIndex}`);
        
        // Call the original method
        _Game_CharacterBase_setImage.call(this, characterName, characterIndex);
    };
})();
