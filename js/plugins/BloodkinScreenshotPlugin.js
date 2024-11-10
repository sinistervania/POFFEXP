/*:
 * @target MZ
 * @plugindesc Takes a screenshot of the game window, saving it as a PNG in img/pictures.
 * @help BloodkinScreenshotPlugin
 * 
 * This plugin takes a screenshot of the game window and saves it in
 * 'img/pictures/SS.png'. If 'SS.png' already exists, it deletes
 * the existing file and saves a new screenshot.
 * 
 * Plugin Commands:
 * - TakeScreenshot: Captures the current game window and saves it as SS.png.
 * - MakeTransparentScreenshot: Replaces SS.png with a small transparent image.
 *
 * @command TakeScreenshot
 * @text Take Screenshot
 * @desc Takes a screenshot of the game window and saves it in img/pictures/SS.png
 * 
 * @command MakeTransparentScreenshot
 * @text Make Transparent Screenshot
 * @desc Replaces SS.png with a small transparent image in img/pictures.
 */
(() => {
    const fs = require('fs');
    const path = require('path');
    
    // Constants
    const MAX_DIMENSION = 8192; // Maximum WebGL texture size for most GPUs
    
    // Directory and file path setup
    const screenshotDir = path.join(path.dirname(process.mainModule.filename), 'img', 'pictures');
    const screenshotPath = path.join(screenshotDir, 'SS.png');
    
    // Make transparent image function (very small file size)
    function makeTransparentScreenshot() {
        try {
            // Create a tiny 1x1 transparent canvas
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, 1, 1);
            
            const pngData = canvas.toDataURL('image/png')
                .replace(/^data:image\/png;base64,/, '');
            
            fs.writeFileSync(screenshotPath, pngData, 'base64');
            console.log("Tiny transparent screenshot created at " + screenshotPath);
        } catch (error) {
            console.error("Failed to create transparent screenshot:", error);
            throw error;
        }
    }

    // Check for image on boot and create if it doesn't exist
    if (!fs.existsSync(screenshotPath)) {
        makeTransparentScreenshot();
    }

    // Scale dimensions to fit within limits while maintaining aspect ratio
    function calculateScaledDimensions(width, height) {
        if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
            return { width, height };
        }
        
        const ratio = width / height;
        if (width > height) {
            return {
                width: MAX_DIMENSION,
                height: Math.floor(MAX_DIMENSION / ratio)
            };
        } else {
            return {
                width: Math.floor(MAX_DIMENSION * ratio),
                height: MAX_DIMENSION
            };
        }
    }

    // Create a scaled canvas
    function createScaledCanvas(sourceCanvas, targetWidth, targetHeight) {
        const scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = targetWidth;
        scaledCanvas.height = targetHeight;
        
        const ctx = scaledCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);
        
        return scaledCanvas;
    }

    // Capture screenshot function with error handling
    function takeScreenshot() {
        try {
            // Delete the existing file if it exists
            if (fs.existsSync(screenshotPath)) {
                fs.unlinkSync(screenshotPath);
            }

            // Get the renderer and stage
            const renderer = Graphics.app.renderer;
            const stage = Graphics.app.stage;

            // Calculate scaled dimensions
            const scaledDims = calculateScaledDimensions(Graphics.width, Graphics.height);

            // Create a temporary render texture
            const renderTexture = PIXI.RenderTexture.create({
                width: scaledDims.width,
                height: scaledDims.height
            });

            // Render the stage to the texture
            renderer.render(stage, renderTexture);

            // Extract as canvas
            const canvas = renderer.plugins.extract.canvas(renderTexture);
            
            // Scale if necessary
            const finalCanvas = (scaledDims.width !== Graphics.width || scaledDims.height !== Graphics.height) 
                ? createScaledCanvas(canvas, scaledDims.width, scaledDims.height)
                : canvas;

            // Convert to PNG
            const pngData = finalCanvas.toDataURL('image/png')
                .replace(/^data:image\/png;base64,/, '');

            // Save the file
            fs.writeFileSync(screenshotPath, pngData, 'base64');
            
            // Cleanup
            renderTexture.destroy(true);
            
            console.log("Screenshot saved successfully to " + screenshotPath);
        } catch (error) {
            console.error("Failed to take screenshot:", error);
            throw error; // Re-throw to trigger RPG Maker's error handler
        }
    }

    // Register plugin commands
    PluginManager.registerCommand('BloodkinScreenshotPlugin', 'TakeScreenshot', () => {
        takeScreenshot();
    });

    PluginManager.registerCommand('BloodkinScreenshotPlugin', 'MakeTransparentScreenshot', () => {
        makeTransparentScreenshot();
    });
})();