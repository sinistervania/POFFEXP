/*:
 * @plugindesc v1.0 Manages player sprite changes based on region and states
 * @author Bloodkin
 * @target MZ
 * 
 * @help SnowSpriteImgManager.js
 * 
 * This plugin automatically changes the player's sprite image based on:
 * - Default: $SnowSpriteHD3
 * - Region 4: $SnowSpriteHD3STEALTH (Stealth mode)
 * - States 71 or 176: $SnowSpriteHD3ARMOR (Armored mode)
 * 
 * No plugin parameters required.
 */

(() => {
    const pluginName = "SnowSpriteImgManager";

    // Store the original Game_Player.prototype.update function
    const _Game_Player_update = Game_Player.prototype.update;

    // Define sprite paths
    const SPRITE_DEFAULT = "$SnowSpriteHD3";        // Default sprite
    const SPRITE_GREATSWORD = "$SnowSpriteHD3_Greatsword4";        // Greatsword sprite
    const SPRITE_GAUNTLETS = "$SnowSpriteHD3_Gauntlets";        // Gauntlets sprite
    const SPRITE_RAPIER = "$SnowSpriteHD3_Rapier3";        // Rapier sprite
    const SPRITE_ARMINGSWORD = "$SnowSpriteHD3_ArmingSword6";        // ArmingSword sprite
    const SPRITE_STEALTH = "$SnowSpriteHD3STEALTH"; // Stealth sprite
    const SPRITE_ARMOR = "$SnowSpriteHD3ARMOR";     // Armored sprite

    // Extend the Game_Player.prototype.update function
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        this.updateCharacterSprite();
    };

    // Add new method to handle sprite updates
    Game_Player.prototype.updateCharacterSprite = function() {
        const newSpriteName = this.determineSpriteName();
        
        // Only change the sprite if it's different from the current one
        if (this._characterName !== newSpriteName) {
            this._characterName = newSpriteName;
        }
    };

    // Add method to determine which sprite should be used
    Game_Player.prototype.determineSpriteName = function() {
        // Check if player is on region 4 (Stealth)
        if (this.regionId() === 4) {
            return SPRITE_STEALTH;
        }
        
        // Check if player has state 71 or 176 (Armor)
        // Access states through the party leader
        if ($gameParty && $gameParty.leader()) {
            const leader = $gameParty.leader();
            //Icebreaker Armor
            if (leader.isStateAffected(71) || leader.isStateAffected(176)) {
                return SPRITE_ARMOR;
            //Greatsword
            } else if (leader.isStateAffected(188)) {
                return SPRITE_GREATSWORD;
            //Gauntlets
            } else if (leader.isStateAffected(78)) {
                return SPRITE_GAUNTLETS;
            }
            //Rapier
            else if (leader.isStateAffected(74)) {
            return SPRITE_RAPIER;
            }
            //ArmingSword
            else if (leader.isStateAffected(35)) {
                return SPRITE_ARMINGSWORD;
                }
        }
        
        // Default sprite
        return SPRITE_DEFAULT;
    };
})();