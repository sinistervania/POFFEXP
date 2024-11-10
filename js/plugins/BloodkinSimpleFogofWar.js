/*:
* @target MZ
* @plugindesc Simple Fog of War Plugin with Switch Control
* @author Your Name
* @help Simple Fog of War - v1.0.0
*
* This plugin provides a basic fog of war feature that can be toggled with a switch.
*/

(() => {
    const fogSwitchId = 6; // Replace with the ID of the switch you'll use to control the fog

    class FogOfWarSprite extends Sprite {
        constructor() {
            super();
            this.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this.redraw();
        }

        redraw() {
            this.bitmap.fillAll('black');
            const radius = 100; // Radius of the clear area
            const x = $gamePlayer.screenX() - radius;
            const y = $gamePlayer.screenY() - radius;
            this.bitmap.clearRect(x, y, radius * 2, radius * 2);
        }

        update() {
            super.update();
            this.redraw(); // Redraw fog every frame
        }
    }

    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        if ($gameSwitches.value(fogSwitchId)) {
            this.createFogOfWar();
        }
    };

    Scene_Map.prototype.createFogOfWar = function() {
        this._fogOfWarSprite = new FogOfWarSprite();
        this.addChild(this._fogOfWarSprite);
    };
})();
