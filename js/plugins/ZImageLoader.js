//=============================================================================
// ZImageLoader.js
//=============================================================================

/*:
 * @plugindesc Loads specific images on game boot. Author: Bloodkin
 *
 * @help ZImageLoader.js
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to preload specific images on game boot from the
 * specified directory.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * None
 *
 * ============================================================================
 * Version History
 * ============================================================================
 * 1.0.0 - Initial release
 */

(function() {
    // List of images to preload
    var imageList = [
        'img/SumRndmDde/menu/MenuWinterBG2',
        'img/SumRndmDde/menu/MenuEquipBGMirrored',
        'img/SumRndmDde/menu/MenuShopBGMirrored'
    ];

    // Preload images
    function preloadImages() {
        imageList.forEach(function(imagePath) {
            var bitmap = ImageManager.loadBitmap('', imagePath, 0, true);
            bitmap.addLoadListener(function() {
                if (bitmap.isReady()) {
                    console.log('Image loaded:', imagePath);
                } else {
                    console.error('Failed to load image:', imagePath);
                }
            });
        });
    }

    // Call preloadImages() function on game boot
    var _SceneManager_onSceneStart = SceneManager.onSceneStart;
    SceneManager.onSceneStart = function() {
        _SceneManager_onSceneStart.apply(this, arguments);
        if (this._scene.constructor === Scene_Boot) {
            preloadImages();
        }
    };
})();
