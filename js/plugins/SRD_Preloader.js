/*:
 * @target MZ
 * @plugindesc Preloads and caches images used by SRD's Menu Backgrounds plugin to avoid black screens.
 * @author Bloodkin
 * @command preloadImages
 * @text Preload Images
 * @desc Forces preloading of all menu background images defined in the SRD_MenuBackgrounds plugin.
 * 
 * @help This plugin preloads images specified in SRD's Menu Backgrounds plugin
 * to ensure they are loaded and ready before they're needed, thereby preventing black screen issues.
 */

(() => {
    // Register Plugin Commands
    PluginManager.registerCommand('SRD_Preloader', "preloadImages", args => {
        const waitTime = parseInt(args.waitTime) || 1000000; // Default to 1000 milliseconds (1 second)
        console.log("Wait time:", waitTime); // Log the wait time
        SceneManager._scene.preloadSRDMenuBackgrounds().then(() => {
            setTimeout(() => {
                SceneManager.push(Scene_Menu);
            }, waitTime);
        }).catch(error => {
            console.error('Error preloading images:', error);
        });
    });

    Scene_Base.prototype.preloadSRDMenuBackgrounds = function() {
        const params = PluginManager.parameters('SRD_MenuBackgrounds');
        const imageKeys = Object.keys(params).filter(key => key.match(/Background$/) && params[key].trim() && params[key].trim() !== "true" && params[key].trim() !== "false");
        
        // Create a new array to store the promises for individual image loading
        const loadPromises = [];

       // Loop through each image key and load the corresponding image
for (const key of imageKeys) {
    const filename = params[key].trim();
    console.log("Attempting to load:", filename); // Log the filename attempt
    if (filename && filename !== "true" && filename !== "false") {
        const promise = ImageManager.loadBitmap('img/SumRndmDde/menu/', filename);
        if (promise && typeof promise.catch === 'function') {
            loadPromises.push(promise); // Store the promise in the array
        } else {
            console.error("Error loading image:", filename, "Promise is not valid:", promise);
        }
    } else {
        console.error("Invalid filename:", filename); // Log invalid filenames
    }
}

        
        // Return a promise that resolves when all images are loaded
        return Promise.all(loadPromises);
    };

})();
