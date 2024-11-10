//=============================================================================
// VisuStella MZ - Event Title Scene
// VisuMZ_4_EventTitleScene.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EventTitleScene = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventTitleScene = VisuMZ.EventTitleScene || {};
VisuMZ.EventTitleScene.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [EventTitleScene]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Event_Title_Scene_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * For those who feel compelled to create their own custom title scene using
 * in-game maps and events, this plugin will replace Scene_Title with a new
 * dedicated map scene to allow such a thing to happen. Customize it however
 * you can within your abilities and utilize the full power of RPG Maker MZ's
 * eventing system. Just don't forget to use an Autorun event to kick things
 * off, alright?
 *
 * Features include all (but not limited to) the following:
 * 
 * * Dedicated map scene to use for custom map title scenes.
 * * Going to the Game End screen to return to the title screen will take the
 *   player back to the dedicated map scene.
 * * Customize which map to use and where on the map to display.
 * * Determine the player's position, visibility, facing direction, and whether
 *   or not followers are shown, too.
 * * Disable or enable movement on the title scene if you want.
 * * Plugin Commands that facilitate the New Game, Continue, and Options
 *   command as seen before in the title screen.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Autosave
 * 
 * - Autosaving is disabled on the event title scene map. This is to prevent
 * any instances of the player loading into an unintended map by accident.
 *
 * ---
 * 
 * Movement Disable
 * 
 * - Through the Plugin Parameters, you can disable input and mouse movement
 * from the player for the dedicated event title scene.
 * 
 * ---
 * 
 * Menu and Debug Disable
 * 
 * - On the dedicated event title scene, calling the Main Menu and debug menu
 * is disabled to prevent errors.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_0_CoreEngine
 * 
 * Those using the VisuStella MZ Core Engine will now have the "Title Picture
 * Buttons" imported into the Event Title Scene. They can be interacted the
 * same way. The picture buttons will appear above all else so keep that in
 * mind for how you position them.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Continue-Related Text Codes ===
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Show Choice Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * <Continue>           Put this text code inside of a Show Choice and it will
 *                      enable that choice if there is a save file available.
 *                      It will disable that choice if there are no saves.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === System-Type Plugin Commands ===
 * 
 * ---
 *
 * System: Start New Game
 * - Leaves the current scene and starts a new game.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * System: Open Load Scene
 * - Leaves the current scene and opens the load game scene.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * System: Open Options Scene
 * - Leaves the current scene and opens the options scene.
 *
 *   Slow Fade Out?:
 *   - Use a slow fade out transition to the next scene?
 *
 * ---
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Continue-Related Script Calls ===
 * 
 * ---
 *
 * DataManager.isAnySavefileExists()
 * 
 * - Use this in a 'Conditional Branch' event command script check.
 * - This will return 'true' if there are save files to load from.
 * - This will return 'false' if there are no save files to load from.
 * - This code is available outside of this plugin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the settings available through the plugin parameters to adjust how
 * the map title scene plays out.
 *
 * ---
 *
 * Title Scene Coordinates
 * 
 *   Map ID:
 *   - Select the map used for the evented title scene.
 * 
 *   Map X:
 *   - Select the X coordinate for the evented title scene.
 * 
 *   Map Y:
 *   - Select the Y coordinate for the evented title scene.
 * 
 *   Face Direction:
 *   - What direction will the player face on the title scene?
 *   - This is assuming the player is visible.
 *
 * ---
 *
 * Player Character
 * 
 *   Transparent?:
 *   - Make the player transparent on the title scene?
 * 
 *   Can Input Move?:
 *   - Can the player move while on the title scene?
 * 
 *   Show Followers?:
 *   - Show player followers on the title scene?
 *   - This is assuming the player is visible.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where single save slots loaded by the VisuMZ Save Core would
 *    not play the map BGM and BGS. Fix made by Olivia.
 * 
 * Version 1.05: February 24, 2022
 * * Bug Fixes!
 * ** Added failsafe to prevent title screen transition change from causing a
 *    crash while utilizing tileset-based sprites. Fix made by Arisu.
 * 
 * Version 1.04: February 3, 2022
 * * Feature Update!
 * ** Autosave no longer triggers from starting a new game with the locked
 *    save style. Update made by Irina.
 * 
 * Version 1.03: December 23, 2021
 * * Feature Update!
 * ** Added an extra save file exist check for the Load Screen Plugin Command
 *    using the Single Save Slot type plugin parameter in Save Core. Update
 *    made by Irina.
 * 
 * Version 1.02: December 16, 2021
 * * Compatibility Update!
 * ** This plugin now works properly with the Save Core's single save slot
 *    style plugin parameters setting. Update made by Irina.
 * ** This plugin now works properly with the Save Core's single locked slot
 *    style plugin parameters setting. Update made by Irina.
 * * Feature Update!
 * ** Autosave no longer triggers from starting a new game. It will be after
 *    the transition is done that any further requests for autosave can be
 *    utilized. Update made by Irina.
 * 
 * Version 1.01: June 25, 2021
 * * Documentation Update!
 * ** Added section for VisuStella compatibility.
 * *** Those using the VisuStella MZ Core Engine will now have the "Title
 *     Picture Buttons" imported into the Event Title Scene. They can be
 *     interacted the same way. The picture buttons will appear above all else
 *     so keep that in mind for how you position them.
 * * Compatibility Update!
 * ** This plugin is now compatible with the VisuMZ Core Engine's Title Picture
 *    Buttons and will have them displayed on the same scene. Update by Arisu.
 * 
 * Version 1.00 Official Release Date: July 9, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command NewGame
 * @text System: Start New Game
 * @desc Leaves the current scene and starts a new game.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LoadScreen
 * @text System: Open Load Scene
 * @desc Leaves the current scene and opens the load game scene.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Options
 * @text System: Open Options Scene
 * @desc Leaves the current scene and opens the options scene.
 *
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @on Slow
 * @off Normal
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventTitleScene
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Coordinates
 * @text Title Scene Coordinates
 *
 * @param MapID:num
 * @text Map ID
 * @parent Coordinates
 * @type number
 * @min 1
 * @max 999
 * @desc Select the map used for the evented title scene.
 * @default 1
 *
 * @param MapX:num
 * @text Map X
 * @parent Coordinates
 * @type number
 * @min 0
 * @max 255
 * @desc Select the X coordinate for the evented title scene.
 * @default 10
 *
 * @param MapY:num
 * @text Map Y
 * @parent Coordinates
 * @type number
 * @min 0
 * @max 255
 * @desc Select the Y coordinate for the evented title scene.
 * @default 10
 *
 * @param FaceDirection:num
 * @text Face Direction
 * @parent Coordinates
 * @type select
 * @option Down Left
 * @value 1
 * @option Down
 * @value 2
 * @option Down Right
 * @value 3
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up Left
 * @value 7
 * @option Up
 * @value 8
 * @option Up Right
 * @value 9
 * @desc What direction will the player face on the title scene?
 * This is assuming the player is visible.
 * @default 2
 * 
 * @param Player
 * @text Player Character
 *
 * @param PlayerTransparent:eval
 * @text Transparent?
 * @parent Player
 * @type boolean
 * @on Transparent
 * @off Opaque
 * @desc Make the player transparent on the title scene?
 * @default true
 *
 * @param CanInputMove:eval
 * @text Can Input Move?
 * @parent Player
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Can the player move while on the title scene?
 * @default false
 *
 * @param ShowFollowers:eval
 * @text Show Followers?
 * @parent Player
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show player followers on the title scene?
 * This is assuming the player is visible.
 * @default false
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x27db13=_0x542a;(function(_0x43f842,_0xd04fae){const _0xd69e6f=_0x542a,_0x467a29=_0x43f842();while(!![]){try{const _0x4d0b0a=-parseInt(_0xd69e6f(0xff))/0x1+-parseInt(_0xd69e6f(0x10c))/0x2+-parseInt(_0xd69e6f(0x116))/0x3*(parseInt(_0xd69e6f(0xd0))/0x4)+-parseInt(_0xd69e6f(0x14b))/0x5*(parseInt(_0xd69e6f(0x109))/0x6)+-parseInt(_0xd69e6f(0x129))/0x7+-parseInt(_0xd69e6f(0xd6))/0x8+parseInt(_0xd69e6f(0x140))/0x9*(parseInt(_0xd69e6f(0xe9))/0xa);if(_0x4d0b0a===_0xd04fae)break;else _0x467a29['push'](_0x467a29['shift']());}catch(_0x573ea1){_0x467a29['push'](_0x467a29['shift']());}}}(_0xf6b7,0xad242));var label=_0x27db13(0x153),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x27db13(0x149)](function(_0x384b9d){const _0x3f2d6b=_0x27db13;return _0x384b9d[_0x3f2d6b(0xd4)]&&_0x384b9d[_0x3f2d6b(0x106)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x27db13(0x121)]=VisuMZ[label][_0x27db13(0x121)]||{},VisuMZ[_0x27db13(0x119)]=function(_0x420e67,_0x19a29a){const _0x5454a4=_0x27db13;for(const _0x565a86 in _0x19a29a){if(_0x5454a4(0xf4)!==_0x5454a4(0xdb)){if(_0x565a86[_0x5454a4(0xed)](/(.*):(.*)/i)){if(_0x5454a4(0x124)===_0x5454a4(0x100)){if(_0x2308ad[_0x5454a4(0xfb)](_0x14f612))return![];if(_0x52f86e[_0x5454a4(0xfb)](_0x523870))return![];return _0x4190e2['EventTitleScene'][_0x5454a4(0x152)][_0x5454a4(0x11a)](this);}else{const _0x3d775a=String(RegExp['$1']),_0x48fad1=String(RegExp['$2'])[_0x5454a4(0xfe)]()[_0x5454a4(0x134)]();let _0x3db2ed,_0x3e4fe7,_0x56b103;switch(_0x48fad1){case _0x5454a4(0xdc):_0x3db2ed=_0x19a29a[_0x565a86]!==''?Number(_0x19a29a[_0x565a86]):0x0;break;case _0x5454a4(0x12e):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7[_0x5454a4(0x147)](_0x4ca5d8=>Number(_0x4ca5d8));break;case'EVAL':_0x3db2ed=_0x19a29a[_0x565a86]!==''?eval(_0x19a29a[_0x565a86]):null;break;case _0x5454a4(0xeb):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7['map'](_0xb4d50b=>eval(_0xb4d50b));break;case'JSON':_0x3db2ed=_0x19a29a[_0x565a86]!==''?JSON['parse'](_0x19a29a[_0x565a86]):'';break;case _0x5454a4(0xe2):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7['map'](_0x3c707f=>JSON[_0x5454a4(0x12c)](_0x3c707f));break;case _0x5454a4(0x13b):_0x3db2ed=_0x19a29a[_0x565a86]!==''?new Function(JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86])):new Function(_0x5454a4(0xe8));break;case _0x5454a4(0x107):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON['parse'](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7[_0x5454a4(0x147)](_0x2905f4=>new Function(JSON['parse'](_0x2905f4)));break;case _0x5454a4(0x14c):_0x3db2ed=_0x19a29a[_0x565a86]!==''?String(_0x19a29a[_0x565a86]):'';break;case _0x5454a4(0x10b):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7[_0x5454a4(0x147)](_0x57a955=>String(_0x57a955));break;case _0x5454a4(0x122):_0x56b103=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):{},_0x3db2ed=VisuMZ[_0x5454a4(0x119)]({},_0x56b103);break;case _0x5454a4(0x143):_0x3e4fe7=_0x19a29a[_0x565a86]!==''?JSON[_0x5454a4(0x12c)](_0x19a29a[_0x565a86]):[],_0x3db2ed=_0x3e4fe7[_0x5454a4(0x147)](_0x4de417=>VisuMZ[_0x5454a4(0x119)]({},JSON['parse'](_0x4de417)));break;default:continue;}_0x420e67[_0x3d775a]=_0x3db2ed;}}}else return![];}return _0x420e67;},(_0x412dd1=>{const _0x105cc3=_0x27db13,_0x57b2ed=_0x412dd1[_0x105cc3(0xe5)];for(const _0x4b0c0b of dependencies){if(_0x105cc3(0x10f)!=='wpWUt'){if(!Imported[_0x4b0c0b]){alert(_0x105cc3(0x159)['format'](_0x57b2ed,_0x4b0c0b)),SceneManager[_0x105cc3(0x113)]();break;}}else _0x53cb72[_0x105cc3(0x155)][_0x105cc3(0x12a)]['call'](this),this[_0x105cc3(0x139)]();}const _0x4a5ead=_0x412dd1[_0x105cc3(0x106)];if(_0x4a5ead[_0x105cc3(0xed)](/\[Version[ ](.*?)\]/i)){const _0x3cf4ec=Number(RegExp['$1']);if(_0x3cf4ec!==VisuMZ[label][_0x105cc3(0xdf)]){if('ogzkM'!=='ZriDm')alert(_0x105cc3(0xe1)[_0x105cc3(0x123)](_0x57b2ed,_0x3cf4ec)),SceneManager[_0x105cc3(0x113)]();else return![];}}if(_0x4a5ead['match'](/\[Tier[ ](\d+)\]/i)){const _0x2fc934=Number(RegExp['$1']);_0x2fc934<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x105cc3(0x123)](_0x57b2ed,_0x2fc934,tier)),SceneManager[_0x105cc3(0x113)]()):_0x105cc3(0x146)!==_0x105cc3(0x146)?_0x49234d['autoplay']():tier=Math[_0x105cc3(0x126)](_0x2fc934,tier);}VisuMZ[_0x105cc3(0x119)](VisuMZ[label]['Settings'],_0x412dd1[_0x105cc3(0xf3)]);})(pluginData),PluginManager[_0x27db13(0xe7)](pluginData[_0x27db13(0xe5)],_0x27db13(0xec),_0x37b846=>{const _0x3ec2cc=_0x27db13;VisuMZ[_0x3ec2cc(0x119)](_0x37b846,_0x37b846);const _0x23309=_0x37b846[_0x3ec2cc(0x101)];_0x23309&&(_0x3ec2cc(0x145)===_0x3ec2cc(0x145)?SceneManager[_0x3ec2cc(0xd1)][_0x3ec2cc(0x103)]():_0x445ed2[_0x3ec2cc(0x120)](_0x3272f9));if(Imported[_0x3ec2cc(0x11e)]&&StorageManager[_0x3ec2cc(0x15a)]()===_0x3ec2cc(0x105))DataManager[_0x3ec2cc(0x108)](),$gameTemp[_0x3ec2cc(0x150)]=!![],SceneManager[_0x3ec2cc(0x120)](Scene_Save);else{if(_0x3ec2cc(0xea)===_0x3ec2cc(0xea))SceneManager[_0x3ec2cc(0x120)](Scene_TitleTransition);else for(const _0x38e41f of _0x3a4300[_0x3ec2cc(0x13e)]){const _0x5ab582=new _0x151477(_0x38e41f);this[_0x3ec2cc(0x154)](_0x5ab582);}}}),PluginManager[_0x27db13(0xe7)](pluginData[_0x27db13(0xe5)],_0x27db13(0x135),_0x300ffc=>{const _0x4ff24b=_0x27db13;VisuMZ['ConvertParams'](_0x300ffc,_0x300ffc);const _0xe1bc81=_0x300ffc[_0x4ff24b(0x101)];_0xe1bc81&&SceneManager[_0x4ff24b(0xd1)][_0x4ff24b(0x103)](),Imported[_0x4ff24b(0x11e)]&&StorageManager['saveStyle']()===_0x4ff24b(0xf6)?DataManager[_0x4ff24b(0xda)]()?_0x4ff24b(0x13c)!==_0x4ff24b(0x14e)?SceneManager['push'](Scene_SingleLoadTransition):(_0x5a67ea['prototype'][_0x4ff24b(0x156)][_0x4ff24b(0x11a)](this),_0x3918b7[_0x4ff24b(0x117)]&&this[_0x4ff24b(0x10e)]()):(SoundManager[_0x4ff24b(0x110)](),SceneManager[_0x4ff24b(0xd1)]['loadFailureConfirmationWindow']()):SceneManager['push'](Scene_Load);}),PluginManager['registerCommand'](pluginData[_0x27db13(0xe5)],_0x27db13(0xfa),_0x5e7152=>{const _0x22fb1e=_0x27db13;VisuMZ['ConvertParams'](_0x5e7152,_0x5e7152);const _0x4b0827=_0x5e7152[_0x22fb1e(0x101)];_0x4b0827&&('EVXrn'===_0x22fb1e(0x11f)?SceneManager['_scene'][_0x22fb1e(0x103)]():(_0x8e1595[_0x22fb1e(0x108)](),_0xb35f55[_0x22fb1e(0x150)]=!![],_0x2469d1['push'](_0x1bbda7))),SceneManager[_0x22fb1e(0x120)](Scene_Options);}),DataManager[_0x27db13(0x128)]=function(){const _0x2ce03a=_0x27db13;this[_0x2ce03a(0x108)]();const _0x32d684=VisuMZ[_0x2ce03a(0x153)]['Settings'][_0x2ce03a(0x111)],_0xe6c54b=VisuMZ[_0x2ce03a(0x153)][_0x2ce03a(0x121)][_0x2ce03a(0xd2)],_0x4fcd3c=VisuMZ[_0x2ce03a(0x153)][_0x2ce03a(0x121)][_0x2ce03a(0x104)],_0x5d8056=VisuMZ['EventTitleScene'][_0x2ce03a(0x121)][_0x2ce03a(0xde)];$gamePlayer['reserveTransfer'](_0x32d684,_0xe6c54b,_0x4fcd3c,_0x5d8056,0x0);},SceneManager[_0x27db13(0x141)]=function(){const _0x454290=_0x27db13;return this['_scene']&&this['_scene'][_0x454290(0xf2)]===Scene_Map;},SceneManager['isSceneTitleMap']=function(){const _0x1504f3=_0x27db13;return this[_0x1504f3(0xd1)]&&this[_0x1504f3(0xd1)]['constructor']===Scene_EventedTitleMap;},VisuMZ[_0x27db13(0x153)][_0x27db13(0x148)]=SceneManager[_0x27db13(0xd7)],SceneManager[_0x27db13(0xd7)]=function(_0x290236){const _0x74093d=_0x27db13;if(_0x290236===Scene_Title||_0x290236===Scene_EventedTitleMap){if('CoADv'===_0x74093d(0x127)){const _0x3a27fe=[0x8,0x8,0x2,0x2,0x4,0x6,0x4,0x6];this[_0x74093d(0xee)]=this['_optionsCoreFailsafeCheck']||0x0,_0x571480===_0x3a27fe[this[_0x74093d(0xee)]]?this[_0x74093d(0xee)]++:this[_0x74093d(0xee)]=0x0,this[_0x74093d(0xee)]===_0x3a27fe['length']&&(_0x403247[_0x74093d(0xcf)]=!![],_0x3e8998[_0x74093d(0x13a)](),_0x412d30['playLoad']());}else DataManager['prepareEventedTitleScreen'](),_0x290236=Scene_EventedTitleMap;}VisuMZ[_0x74093d(0x153)][_0x74093d(0x148)][_0x74093d(0x11a)](this,_0x290236);},VisuMZ['EventTitleScene'][_0x27db13(0x11c)]=SceneManager[_0x27db13(0x120)],SceneManager[_0x27db13(0x120)]=function(_0x1676df){const _0x1a1a71=_0x27db13;(_0x1676df===Scene_Title||_0x1676df===Scene_EventedTitleMap)&&(_0x1a1a71(0x12f)!==_0x1a1a71(0xd3)?(DataManager['prepareEventedTitleScreen'](),_0x1676df=Scene_EventedTitleMap):(_0x2fe4e5[_0x1a1a71(0x110)](),_0x3651a1[_0x1a1a71(0xd1)]['loadFailureConfirmationWindow']())),VisuMZ['EventTitleScene'][_0x1a1a71(0x11c)][_0x1a1a71(0x11a)](this,_0x1676df);},VisuMZ['EventTitleScene']['Game_Player_getInputDirection']=Game_Player['prototype']['getInputDirection'],Game_Player[_0x27db13(0x155)][_0x27db13(0xe3)]=function(){const _0x49041a=_0x27db13;if(!VisuMZ['EventTitleScene'][_0x49041a(0x121)][_0x49041a(0x158)]&&SceneManager['isSceneTitleMap']())return 0x0;return VisuMZ['EventTitleScene'][_0x49041a(0x136)][_0x49041a(0x11a)](this);};function Scene_EventedTitleMap(){const _0x579ee6=_0x27db13;this[_0x579ee6(0x12a)](...arguments);}Scene_EventedTitleMap[_0x27db13(0x155)]=Object[_0x27db13(0x11d)](Scene_Map[_0x27db13(0x155)]),Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0xf2)]=Scene_EventedTitleMap,Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0x12a)]=function(){const _0x27029f=_0x27db13;Scene_Map[_0x27029f(0x155)][_0x27029f(0x12a)][_0x27029f(0x11a)](this),this[_0x27029f(0x139)]();},Scene_EventedTitleMap['prototype'][_0x27db13(0x139)]=function(){const _0x2dc236=_0x27db13;$gamePlayer[_0x2dc236(0xf5)](VisuMZ['EventTitleScene'][_0x2dc236(0x121)][_0x2dc236(0x118)]),VisuMZ[_0x2dc236(0x153)]['Settings'][_0x2dc236(0xf9)]?$gamePlayer[_0x2dc236(0x144)]():$gamePlayer[_0x2dc236(0xd8)]();},Scene_EventedTitleMap['prototype'][_0x27db13(0x132)]=function(){return![];},Scene_EventedTitleMap['prototype'][_0x27db13(0x157)]=function(){const _0x1ef17c=_0x27db13;return VisuMZ[_0x1ef17c(0x153)][_0x1ef17c(0x121)][_0x1ef17c(0x158)];},Scene_EventedTitleMap['prototype']['updateEncounter']=function(){},Scene_EventedTitleMap[_0x27db13(0x155)]['isMenuCalled']=function(){return![];},Scene_EventedTitleMap['prototype'][_0x27db13(0x14f)]=function(){},Scene_EventedTitleMap['prototype']['updateCallDebug']=function(){},Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0x125)]=function(){return![];},Scene_EventedTitleMap['prototype'][_0x27db13(0x156)]=function(){const _0x42e063=_0x27db13;Scene_Map[_0x42e063(0x155)]['start']['call'](this),Imported[_0x42e063(0x117)]&&this[_0x42e063(0x10e)]();},Scene_EventedTitleMap[_0x27db13(0x155)]['createTitleButtons']=function(){const _0x9a0413=_0x27db13;for(const _0x54d57d of Scene_Title[_0x9a0413(0x13e)]){const _0x4731bf=new Sprite_TitlePictureButton(_0x54d57d);this[_0x9a0413(0x154)](_0x4731bf);}},Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0x130)]=function(){const _0x8ec15f=_0x27db13;Scene_Map['prototype']['update']['call'](this),this[_0x8ec15f(0x102)]();},Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0x102)]=function(){const _0x3e9036=_0x27db13;if(ConfigManager['assistMode'])return;if($gameTemp[_0x3e9036(0x151)]())return;if(!Imported[_0x3e9036(0xdd)])return;if(Input[_0x3e9036(0xf0)](_0x3e9036(0xfd)))this[_0x3e9036(0x137)](0x2);if(Input['isTriggered'](_0x3e9036(0x138)))this[_0x3e9036(0x137)](0x4);if(Input['isTriggered']('right'))this[_0x3e9036(0x137)](0x6);if(Input[_0x3e9036(0xf0)]('up'))this['processOptionsCoreFailsafe'](0x8);},Scene_EventedTitleMap[_0x27db13(0x155)][_0x27db13(0x137)]=function(_0x2ecbce){const _0x19becc=_0x27db13,_0x103c5a=[0x8,0x8,0x2,0x2,0x4,0x6,0x4,0x6];this[_0x19becc(0xee)]=this[_0x19becc(0xee)]||0x0;_0x2ecbce===_0x103c5a[this['_optionsCoreFailsafeCheck']]?this[_0x19becc(0xee)]++:_0x19becc(0x10a)!==_0x19becc(0x10a)?_0x5f3f8a['push'](_0xbedbe7):this[_0x19becc(0xee)]=0x0;if(this[_0x19becc(0xee)]===_0x103c5a[_0x19becc(0x13d)]){if(_0x19becc(0xfc)!==_0x19becc(0xfc)){_0x3105ce['ConvertParams'](_0x3dce35,_0x3dcc12);const _0x41abdc=_0x4e6ead[_0x19becc(0x101)];_0x41abdc&&_0x2c7aa4['_scene'][_0x19becc(0x103)](),_0x214158[_0x19becc(0x120)](_0x122303);}else ConfigManager[_0x19becc(0xcf)]=!![],ConfigManager[_0x19becc(0x13a)](),SoundManager[_0x19becc(0x10d)]();}};function Scene_TitleTransition(){const _0x37e900=_0x27db13;this[_0x37e900(0x12a)](...arguments);}Scene_TitleTransition[_0x27db13(0x155)]=Object['create'](Scene_Base[_0x27db13(0x155)]),Scene_TitleTransition[_0x27db13(0x155)][_0x27db13(0xf2)]=Scene_TitleTransition,Scene_TitleTransition[_0x27db13(0x155)][_0x27db13(0x12a)]=function(){const _0xab4de4=_0x27db13;Scene_Base[_0xab4de4(0x155)]['initialize']['call'](this);},Scene_TitleTransition[_0x27db13(0x155)][_0x27db13(0x156)]=function(){const _0x13c867=_0x27db13;Scene_Base[_0x13c867(0x155)][_0x13c867(0x156)][_0x13c867(0x11a)](this),DataManager['setupNewGame'](),SceneManager['goto'](Scene_Map);},VisuMZ['EventTitleScene'][_0x27db13(0x152)]=Scene_Base[_0x27db13(0x155)][_0x27db13(0x132)],Scene_Base[_0x27db13(0x155)][_0x27db13(0x132)]=function(){const _0xa3e97b=_0x27db13;if(SceneManager[_0xa3e97b(0xfb)](Scene_TitleTransition))return![];if(SceneManager['isPreviousScene'](Scene_Save))return![];return VisuMZ[_0xa3e97b(0x153)]['Scene_Base_isAutosaveEnabled'][_0xa3e97b(0x11a)](this);};function _0x542a(_0x4fb578,_0x1c60fd){const _0xf6b7eb=_0xf6b7();return _0x542a=function(_0x542ad5,_0x58d363){_0x542ad5=_0x542ad5-0xcf;let _0x570558=_0xf6b7eb[_0x542ad5];return _0x570558;},_0x542a(_0x4fb578,_0x1c60fd);}function Scene_SingleLoadTransition(){this['initialize'](...arguments);}function _0xf6b7(){const _0x9727a3=['constructor','parameters','XpJks','setTransparent','single','Save','makeCommandList','ShowFollowers','Options','isPreviousScene','FpioA','down','toUpperCase','655471RzWpIr','llMKm','SlowFade','updateOptionsCoreFailsafe','fadeOutAll','MapY','locked','description','ARRAYFUNC','setupNewGame','906bqRXrL','TWuQZ','ARRAYSTR','1275124OqJCKC','playLoad','createTitleButtons','fiGLG','playBuzzer','MapID','onLoadSuccess','exit','Window_ChoiceList_makeCommandList','autoplay','4226637cLHzvv','VisuMZ_0_CoreEngine','PlayerTransparent','ConvertParams','call','OnLoadSuccessJS','SceneManager_push','create','VisuMZ_1_SaveCore','EVXrn','push','Settings','STRUCT','format','nIeHt','isDebugCalled','max','tDCkM','prepareEventedTitleScreen','8569533epoPaA','initialize','enabled','parse','tileset','ARRAYNUM','OwJFP','update','onLoadFailure','isAutosaveEnabled','bind','trim','LoadScreen','Game_Player_getInputDirection','processOptionsCoreFailsafe','left','initMembers','save','FUNC','fxplI','length','pictureButtons','catch','27QFdLHx','isSceneMap','Scene_Map_start','ARRAYSTRUCT','showFollowers','qSFVr','sikuK','map','SceneManager_goto','filter','loadGame','23735AztJqV','STR','SaveCore','gnnwB','callMenu','_pickLockedSaveSlot','isPlaytest','Scene_Base_isAutosaveEnabled','EventTitleScene','addChild','prototype','start','isMapTouchOk','CanInputMove','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','saveStyle','assistMode','4sPGUIT','_scene','MapX','PgVCH','status','SaveConfirm','8033544suSMVZ','goto','hideFollowers','Sprite_Character_setTileBitmap','isAnySavefileExists','uQadS','NUM','VisuMZ_1_OptionsCore','FaceDirection','version','setTileBitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ARRAYJSON','getInputDirection','loadFailureConfirmationWindow','name','OnLoadFailureJS','registerCommand','return\x200','21187690tqxUFP','AuFam','ARRAYEVAL','NewGame','match','_optionsCoreFailsafeCheck','enableContinueTextTag','isTriggered','replace'];_0xf6b7=function(){return _0x9727a3;};return _0xf6b7();}Scene_SingleLoadTransition[_0x27db13(0x155)]=Object['create'](Scene_Base[_0x27db13(0x155)]),Scene_SingleLoadTransition[_0x27db13(0x155)][_0x27db13(0xf2)]=Scene_SingleLoadTransition,Scene_SingleLoadTransition[_0x27db13(0x155)][_0x27db13(0x12a)]=function(){const _0x17242b=_0x27db13;Scene_Base[_0x17242b(0x155)]['initialize'][_0x17242b(0x11a)](this);},Scene_SingleLoadTransition['prototype']['start']=function(){const _0x3c0258=_0x27db13;Scene_Base[_0x3c0258(0x155)][_0x3c0258(0x156)][_0x3c0258(0x11a)](this),DataManager[_0x3c0258(0x14a)](0x0)['then'](()=>this[_0x3c0258(0x112)]())[_0x3c0258(0x13f)](()=>this[_0x3c0258(0x131)]());},Scene_SingleLoadTransition[_0x27db13(0x155)][_0x27db13(0x112)]=function(){const _0x58f049=_0x27db13;SoundManager['playLoad'](),this['fadeOutAll'](),Scene_Load[_0x58f049(0x155)]['reloadMapIfUpdated'](),SceneManager[_0x58f049(0xd7)](Scene_Map),VisuMZ[_0x58f049(0x14d)]['Settings'][_0x58f049(0xf7)][_0x58f049(0x11b)]['call'](this);},Scene_SingleLoadTransition['prototype']['onSaveCoreLoadFailure']=function(){const _0x3b6b5f=_0x27db13;SoundManager[_0x3b6b5f(0x110)](),VisuMZ['SaveCore'][_0x3b6b5f(0x121)][_0x3b6b5f(0xf7)][_0x3b6b5f(0xe6)]['call'](this),this['loadFailureConfirmationWindow']();},Scene_SingleLoadTransition[_0x27db13(0x155)]['onLoadFailure']=function(){const _0x4cb32f=_0x27db13;SoundManager[_0x4cb32f(0x110)](),VisuMZ[_0x4cb32f(0x14d)][_0x4cb32f(0x121)][_0x4cb32f(0xf7)][_0x4cb32f(0xe6)][_0x4cb32f(0x11a)](this),this[_0x4cb32f(0xe4)]();const _0x1b2d8a=VisuMZ[_0x4cb32f(0x14d)][_0x4cb32f(0x121)][_0x4cb32f(0xd5)]['Duration'];setTimeout(this['popScene'][_0x4cb32f(0x133)](this),_0x1b2d8a);},VisuMZ[_0x27db13(0x153)][_0x27db13(0x142)]=Scene_Map[_0x27db13(0x155)][_0x27db13(0x156)],Scene_Map['prototype']['start']=function(){const _0x172d00=_0x27db13;VisuMZ[_0x172d00(0x153)][_0x172d00(0x142)]['call'](this),SceneManager['isPreviousScene'](Scene_SingleLoadTransition)&&('NdKFk'!=='SWUov'?$gameMap[_0x172d00(0x115)]():this[_0x172d00(0xee)]=0x0);},VisuMZ[_0x27db13(0x153)][_0x27db13(0xd9)]=Sprite_Character[_0x27db13(0x155)]['setTileBitmap'],Sprite_Character['prototype'][_0x27db13(0xe0)]=function(){const _0x10e691=_0x27db13;if(!$gameMap[_0x10e691(0x12d)]())return;VisuMZ[_0x10e691(0x153)][_0x10e691(0xd9)][_0x10e691(0x11a)](this);},VisuMZ['EventTitleScene'][_0x27db13(0x114)]=Window_ChoiceList[_0x27db13(0x155)][_0x27db13(0xf8)],Window_ChoiceList['prototype']['makeCommandList']=function(){const _0x19406f=_0x27db13;VisuMZ[_0x19406f(0x153)][_0x19406f(0x114)][_0x19406f(0x11a)](this),this[_0x19406f(0xef)]();},Window_ChoiceList[_0x27db13(0x155)]['enableContinueTextTag']=function(){const _0x5c1912=_0x27db13;for(const _0x4baf9b of this['_list']){if(!_0x4baf9b)continue;if(!_0x4baf9b[_0x5c1912(0xe5)]['match'](/<CONTINUE>/i))continue;_0x4baf9b[_0x5c1912(0xe5)]=_0x4baf9b[_0x5c1912(0xe5)][_0x5c1912(0xf1)](/<CONTINUE>/gi,'')[_0x5c1912(0x134)](),_0x4baf9b[_0x5c1912(0x12b)]=DataManager['isAnySavefileExists']();}};