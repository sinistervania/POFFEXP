/*:
 * @target MZ
 * @plugindesc Changes player character walking animation to use 6 frames instead of 3
 * @author Bloodkin
 * @help
 * This plugin modifies only the player character to use 6 animation frames
 * while walking, instead of the default 3 frames. Other characters/events
 * will continue to use the standard 3-frame animation.
 * 
 * Make sure your player character sprite sheet has 6 frames per direction,
 * arranged in the same order as the default pattern.
 * 
 * Created by Bloodkin
 */

(() => {
    // Store the original pattern creation method
    const _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
    
    Sprite_Character.prototype.initMembers = function() {
        _Sprite_Character_initMembers.call(this);
        this._sixFrameEnabled = false;
    };
    
    // Override the pattern creation for the player character
    const _Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
    
    Sprite_Character.prototype.setCharacter = function(character) {
        _Sprite_Character_setCharacter.call(this, character);
        this._sixFrameEnabled = character === $gamePlayer;
    };
    
    // Override the pattern width calculation
    const _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
    
    Sprite_Character.prototype.patternWidth = function() {
        if (this._sixFrameEnabled) {
            return this.bitmap.width / 6;
        } else {
            return _Sprite_Character_patternWidth.call(this);
        }
    };
    
    // Modify the pattern calculation for 6 frames
    const _Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
    
    Game_CharacterBase.prototype.pattern = function() {
        if (this === $gamePlayer) {
            const frameNum = Math.floor((this._pattern + this._originalPattern) % 6);
            return frameNum;
        } else {
            return _Game_CharacterBase_pattern.call(this);
        }
    };
    
    // Adjust the maximum pattern value for the player
    const _Game_Player_maxPattern = Game_Player.prototype.maxPattern;
    
    Game_Player.prototype.maxPattern = function() {
        return 6;
    };
    
    // Modify the pattern speed for smoother animation
    const _Game_Player_animationWait = Game_Player.prototype.animationWait;
    
    Game_Player.prototype.animationWait = function() {
        return 6; // Adjust this value to control animation speed (lower = faster)
    };

    // Update the reset pattern method
    const _Game_CharacterBase_resetPattern = Game_CharacterBase.prototype.resetPattern;
    
    Game_CharacterBase.prototype.resetPattern = function() {
        if (this === $gamePlayer) {
            this._pattern = 0;
            this._originalPattern = 0;
        } else {
            _Game_CharacterBase_resetPattern.call(this);
        }
    };
})();