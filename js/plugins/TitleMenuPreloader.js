/*:
 * @target MZ
 * @plugindesc Preloads parallax images for the title menu to ensure smooth transitions.
 * @author Bloodkin
 *
 * @command preloadParallaxes
 * @text Preload Parallaxes
 * @desc Preloads specified parallax images for the title menu.
 */

(() => {
    const pluginName = "TitleMenuPreloader";

    PluginManager.registerCommand(pluginName, "preloadParallaxes", args => {
        const parallaxes = [
            'TitleMidnightUpdatedHour12Min12', 'TitleHour10Min2', 'TitleHour10Min3', 
            'TitleHour10Min4', 'TitleHour10Min8', 'TitleHour10Min9', 'TitleHour10Min10', 
            'TitleHour10Min11', 'TitleHour10Min11.5', 'TitleHour10Min5-7', 
            'TitleHour8.5Min1', 'TitleHour8.5Min2', 'TitleHour8.5Min3', 'TitleHour8.5Min4', 
            'TitleHour8.5Min8', 'TitleHour8.5Min9', 'TitleHour8.5Min10', 'TitleHour8.5Min5-7',
            'TitleHour8.5Min11', 'TitleHour8.5Min11.5', 'TitleHour8Min1', 
            'TitleHour8Min2', 'TitleHour8Min3', 'TitleHour8Min4', 'TitleHour8Min5-7', 'TitleHour8Min8', 
            'TitleHour8Min9', 'TitleHour8Min10', 'TitleHour8Min11', 'TitleHour8Min11.5', 
            'TitleHour9.5Min1', 'TitleHour9.5Min2', 'TitleHour9.5Min3', 'TitleHour9.5Min4', 
            'Title9.5Min5-7', 'TitleHour9.5Min8', 'TitleHour9.5Min9', 'TitleHour9.5Min10', 
            'TitleHour9.5Min11', 'TitleHour9.5Min11.5', 'TitleHour9Min1', 
            'TitleHour9Min2', 'TitleHour9Min3', 'TitleHour9Min4', 'TitleHour9Min8', 
            'TitleHour9Min9', 'TitleHour9Min10', 'TitleHour9Min11', 'TitleHour9Min11.5', 
            'TitleHour9Min5-7', 'TitleNightHour11Min2', 'TitleNightHour11Min4', 
            'TitleNightHour11Min9', 'TitleNightHour11Min10', 'TitleNightHour11Min11', 
            'TitleHour10Min1'
        ];
         // Add your parallax filenames here
        parallaxes.forEach(parallax => {
            const bitmap = ImageManager.loadParallax(parallax);
            bitmap.addLoadListener(() => {
                console.log(parallax + ' loaded');
            });
        });
    });

    // You can also add an automatic preloading on game start by adding code here
})();
