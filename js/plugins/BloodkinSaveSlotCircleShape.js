/*:
 * @target MZ
 * @plugindesc Customizes the save slots to be drawn as circles instead of rectangles.
 * @author Bloodkin
 * 
 * @help This plugin customizes the appearance of save slots by drawing them as circles
 * instead of rectangles. The circles will contain the same information as before.
 * 
 * No plugin commands are required for this plugin.
 */

(() => {
    // Override the drawItem method to draw circles
    const _Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
    Window_SavefileList.prototype.drawItem = function(index) {
        const rect = this.itemRect(index);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const radius = Math.min(rect.width, rect.height) / 2;

        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);

        // Draw the circle
        this.contents.drawCircle(centerX, centerY, radius);

        this.changePaintOpacity(this.isEnabled(index));
        this.drawFileId(index, rect.x, rect.y);
        this.changePaintOpacity(true);

        const info = this.savefileInfo(index);
        if (info) {
            this.changePaintOpacity(this.isEnabled(index));
            this.drawContents(info, rect);
            this.changePaintOpacity(true);
        }
    };

    // Add a method to draw circles in the bitmap
    Bitmap.prototype.drawCircle = function(x, y, radius) {
        const context = this._context;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
        this._baseTexture.update(); // Refresh the texture after drawing
    };
})();
