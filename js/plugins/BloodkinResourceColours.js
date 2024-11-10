/*:
 * @target MZ
 * @plugindesc Allows customization of MP and TP cost colors in the command and message windows.
 * @author ChatGPT
 *
 * @param MP Cost Color
 * @desc The color index for MP costs.
 * @default 17
 *
 * @param TP Cost Color
 * @desc The color index for TP costs.
 * @default 1
 *
 * @help This plugin allows you to customize the color of MP and TP costs.
 * Use the parameters to set the color index as per your Window.png file.
 */

(() => {
  const pluginName = "CustomCostColors";

  let parameters = PluginManager.parameters(pluginName);
  let mpCostColorIndex = Number(parameters['MP Cost Color'] || 17);
  let tpCostColorIndex = Number(parameters['TP Cost Color'] || 1);

  const _ColorManager_mpCostColor = ColorManager.mpCostColor;
  ColorManager.mpCostColor = function() {
    return this.textColor(mpCostColorIndex);
  };

  const _ColorManager_tpCostColor = ColorManager.tpCostColor;
  ColorManager.tpCostColor = function() {
    return this.textColor(tpCostColorIndex);
  };
})();
