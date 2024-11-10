//-----------------------------------------------------------------------------
/*:
 * @plugindesc Pre-cache selected images in the "img/SumRndmDde/menu" folder on boot
 * @author Bloodkin
 *
 * @param Images to Preload
 * @desc List of images to preload in the "img/SumRndmDde/menu" folder (comma-separated)
 * @default image1, image2
 *
 * @help
 * This plugin pre-caches selected images in the "img/SumRndmDde/menu" folder
 * during boot to prevent issues during gameplay.
 *
 * ----------------------------------------------------------------------------
 */

(function() {
    var parameters = PluginManager.parameters('BloodkinPreloader');
    var imagesToPreload = String(parameters['Images to Preload'] || '').split(',');

    ImageManager.reserveSpecific = function(filename, folder, hue, reservationId) {
        folder = folder ? folder + '/' : '';
    };

    for (var i = 0; i < imagesToPreload.length; i++) {
        ImageManager.reserveSpecific(imagesToPreload[i].trim(), 'SumRndmDde/menu');
    }
})();
