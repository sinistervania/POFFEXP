//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.08] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   - Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 *   - The "NEW!" text will not appear on auto save slots. This is intentional.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.08: December 16, 2021
 * * Bug Fixes!
 * ** Fixed default Plugin Parameters where the Autosave option was not
 *    properly working without the Options Core. Fix made by Olivia.
 * * Documentation Update!
 * ** Added further documentation on "Plugin Parameters: Style Settings"
 * ** Removal of "Start Enabled?" setting.
 * *** The "NEW!" text will not appear on auto save slots. This is intentional.
 * * Feature Update!
 * ** Plugin Parameter > Auto Save Settings > Start Enabled? is now removed.
 * *** This is due to it going against what RPG Maker MZ is supposed to behave
 *     like, causing potential misunderstandings when other autosave related
 *     features are utilized. Update made by Olivia.
 * 
 * Version 1.07: October 14, 2021
 * * Bug Fixes!
 * ** Fixed bugs caused by Core Engine's digit grouping that would make dates
 *    appear incorrectly. Fix made by Olivia.
 * 
 * Version 1.06: July 16, 2021
 * * Compatibility Update!
 * ** Compatibility update with Party System's max member change to fit a non-
 *    default amount of party members inside of the window. Update by Irina.
 * 
 * Version 1.05: May 14, 2021
 * * Feature Update!
 * ** Confirmation windows now have rounded coordinates to prevent distortions.
 *    Update made by Arisu.
 * 
 * Version 1.04: March 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug where using the Plugin Command to save the current slot would
 *    not reload properly if the audio file BGM was not synched. Fix made by
 *    Arisu.
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
 * @default 
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:eval":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
/* ----------------------------------------------------------------------------
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x525f01=_0x31fd;function _0x56f1(){const _0x3e2985=['determineAutosaveBypass','onLoadFailure','onMapLoaded','HaWgz','battle','drawVerticalStyleFileData','ADJrj','commandContinue','callMenu','blt','openAutosaveConfirmationWindow','ConfirmRect','textColor','startNewGameLockedSave','Scene_Base_onAutosaveSuccess','drawSvBattlerSprites','updatePosition','commandNewGame','RilFf','latestSave','MAX_BATTLE_MEMBERS','dimColor2','NUM','GlobalSwitches','closeAutosaveConfirmationWindow','Scene_Title_commandNewGame','LargeFileDataJS','#%1','getMinutes','saveDescription','drawTextEx','setWordWrap','AutosaveOption','drawListStyleContents','Scene_Menu_create','update','openness','onSaveSuccess','globalVariables','smoothSelect','format','wrkJc','VertContentsJS','AddOption','ExtensionFmt','terminate','Scene_Title_commandContinue','svActorHorzCells','file0','getHours','nUypS','fadeIn','version','getMonth','variables','description','_stored_latestSavefile','drawActorFaces','Scene_Boot_onDatabaseLoaded','VertRows','vSFPE','catch','setupNewGame','drawTimestamp','_saveConfirmWindow','parameters','LocalMode','indexToSavefileId','wGpeK','resetFontSettings','saveFailure','process_VisuMZ_SaveCore_Switches_Variables','onSaveCoreSaveSuccess','setFadeSpeed','loadGame','forageKey','savefileIdToIndex','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','parse','MaxSaveFiles','getTimestamp','Scene_Map_onMapLoaded','onDatabaseLoaded','drawListStyleFileData','number','DataManager_makeSavefileInfo','LargeRows','isPreviousScene','face','svbattler','autosaveEnabled','OnSaveFailureJS','isAutosaveEnabled','SaveMenuStyle','playtime','Game_Variables_setValue','Scene_Base_onAutosaveFailure','setGlobalValue','PbBbJ','innerHeight','_colorCache','pzqtp','left','getSavePicture','includes','addGeneralOptions','bind','getColorDataFromPluginParameters','current','saveGame','drawTitle','ConfigManager_makeData','ARRAYJSON','textSizeEx','savefileId','OClwj','gameId','saveConfirmationWindowRect','rblIS','vertical','VocabLoadFailure','SavePicture','menuStyle','Autosave','OnAutosaveSuccessJS','length','drawActors','drawCurrencyValue','then','KNkII','vpFwU','drawVerticalStyleContents','Scene_Title_initialize','transfer','TestKey','euGli','actorName','ARRAYSTRUCT','AfterTransfer','isBattleTest','addSaveCoreAutosaveCommand','push','onAutosaveFailure','drawCurrency','single','commandSave','hrthA','contents','createSaveConfirmationWindow','SaveDescription','padStart','windowPadding','large','Game_System_initialize','FJCEt','Window_Options_addGeneralOptions','AutosaveMaxCount','2436840KREkwa','makeSavefileInfo','wnEkN','loadFailureConfirmationWindow','drawLatestMarker','Game_Switches_setValue','floor','opacity','itemRect','2108435pnqXMp','Text','ARRAYEVAL','drawCharacter','drawItem','70SSEXux','BWcPu','setMode','_savefileId','{{%1}}','saveCurrentSlot','onSaveCoreLoadSuccess','drawBoxStyleContents','switches','VocabSaveFailure','Scene_Title_terminate','right','executeSave','LatestText','Game_Variables_value','useDigitGrouping','onTransferEnd','create','drawLargeStyleContents','GlobalVariables','AutosaveRequest','max','RemoveSaveCoreCache','ListContentsJS','IMmET','reloadMapIfUpdated','onAfterLoad','AfterBattle','EVAL','split','drawDescription','autosaveType','height','getScreenPosition','fadeOut','map','makeSavename','98XBthqw','goto','picture','helpWindowText','vFKFv','HZnHh','createContents','activate','commandNewGameSaveCoreLocked','_saveCorePluginCommandSave','call','globalValue','ParseTextCodes','isAutosaveCompatible','ScreenPosition','_processingAutosave','exitMenu','iboqr','Duration','SaveCore','contentsBack','onAutosaveSuccess','FUNC','_success','registerCommand','setValue','drawCenteredPicture','Scene_Save_executeSave','constructor','removeChild','isEnabled','saveMenuSpriteWidth','addLoadListener','loadPicture','svbattlers','ceil','makeData','globalSwitches','drawLargeStyleFileData','playSave','initialize','currencyUnit','enableAutosave','KeyFmt','actorStyle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','SaveConfirm','inBattle','Scene_Map_onTransferEnd','savefileInfo','Enable','AdjustRect','wNvoa','_loadSuccess','isEventTest','YtiMM','clear','autosaveSuccess','57002wuoPiZ','_active','2524ALDqOV','commandSaveLocked','createAutosaveConfirmationWindow','ListCols','addSaveCoreCommands','drawBoxStyleFileData','AutosaveConfirm','playBuzzer','requestAutosave','resetWordWrap','AbIYg','isSaveConfirmWindowEnabled','8655QCxfmd','filter','Game_System_savefileId','latestSavefile','TIDIw','onSaveCoreLoadFailure','changeTextColor','LatestColor','open','autosaveOption','AfterExitMenu','isAutosaveConfirmWindowEnabled','playLoad','OnSaveSuccessJS','MVJsO','3143894nXmzJg','ConfigManager_applyData','SsGss','Scene_Menu_commandSave','replace','_autosaveConfirmWindow','_fadeSpeed','LargeCols','filePath','saveStyle','LREfo','autosaveConfirmationWindowRect','AutosaveEnable','onSaveFailure','HGapH','initSaveCore','name','DataManager_createGameObjects','Window_SavefileList_setMode','itemPadding','onLoadSuccess','_pickLockedSaveSlot','_scene','battlerName','value','prototype','RequestsRequireSaveEnable','SaveMenu','_commandWindow','addChild','timestamp','innerWidth','match','SpriteWidth','AutosaveExecute','BoxCols','forceAutosave','6650736bKsaDM','eEgPS','partyMemberName','VocabSaveSuccess','VisuMZ_0_CoreEngine','Filename','BoxFileDataJS','drawPlaytime','Scene_Options_maxCommands','gradientFillRect','Default','closeSaveConfirmationWindow','numVisibleRows','OnLoadFailureJS','ConvertParams','11628ryFwxG','autosave','exit','commandContinueSaveCoreSingle','trim','drawActorSprites','process_VisuMZ_SaveCore_Settings','NMADy','_bypassAutosave','GbvCJ','drawSvActor','advanced','addCommand','setSetSuccess','ARRAYFUNC','toUpperCase','yocpt','Scene_Save_helpWindowText','popScene','drawFileData','calcWindowHeight','uzfnE','JiEJO','drawBackground','getFullYear','applyData','MunYQ','1TIaPoh','return\x200','faceWidth','loadFailure','onBeforeSave','isNwjs','fileDirectoryPath','saveMenuSvBattlerWidth','activateListWindow','wCUWH','round','width','changePaintOpacity','dimColor1','center','characters','ListRows','_listWindow','saveSuccess','BoxRows','gold','Settings','rNTxn','_SaveCoreSettings','savePicture','maxCommands','getSaveDescription','OnAutosaveFailureJS','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','setSavefileId','contentsOpacity','min','isLocalMode','drawContents','box','locked','pickLockedSaveSlot','LargeContentsJS','OnLoadSuccessJS','optAutosave','drawPicture','save','BoxContentsJS','svActorVertCells','fadeOutAll','isSaveEnabled','STRUCT','both','faces','refresh','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','465992uEqLPL','MakeSavefileInfoJS','AutosaveType','Save','maxBattleMembers','close','drawText','forageTestKey','setSavePicture','shouldAutosave','setSaveDescription','isGlobal','openSaveConfirmationWindow','executeAutosave','Scene_Load_onLoadSuccess'];_0x56f1=function(){return _0x3e2985;};return _0x56f1();}(function(_0x4a2c06,_0x327e05){const _0x1b0d03=_0x31fd,_0x1417be=_0x4a2c06();while(!![]){try{const _0x3b4b56=parseInt(_0x1b0d03(0x20f))/0x1*(parseInt(_0x1b0d03(0x1c0))/0x2)+parseInt(_0x1b0d03(0x1b1))/0x3*(parseInt(_0x1b0d03(0x1a5))/0x4)+parseInt(_0x1b0d03(0x2f7))/0x5+parseInt(_0x1b0d03(0x1e5))/0x6+-parseInt(_0x1b0d03(0x321))/0x7*(parseInt(_0x1b0d03(0x242))/0x8)+-parseInt(_0x1b0d03(0x2ee))/0x9*(-parseInt(_0x1b0d03(0x2fc))/0xa)+parseInt(_0x1b0d03(0x1a3))/0xb*(-parseInt(_0x1b0d03(0x1f4))/0xc);if(_0x3b4b56===_0x327e05)break;else _0x1417be['push'](_0x1417be['shift']());}catch(_0x451872){_0x1417be['push'](_0x1417be['shift']());}}}(_0x56f1,0xef809));var label=_0x525f01(0x334),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x525f01(0x1b2)](function(_0x39d910){const _0x59ae54=_0x525f01;return _0x39d910['status']&&_0x39d910[_0x59ae54(0x288)]['includes']('['+label+']');})[0x0];function _0x31fd(_0x3cd4f5,_0x48553e){const _0x56f1e0=_0x56f1();return _0x31fd=function(_0x31fdfa,_0x166c7a){_0x31fdfa=_0x31fdfa-0x19e;let _0x55062c=_0x56f1e0[_0x31fdfa];return _0x55062c;},_0x31fd(_0x3cd4f5,_0x48553e);}VisuMZ[label][_0x525f01(0x224)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x3bd4ca,_0x49e082){const _0x5748c9=_0x525f01;for(const _0xe274be in _0x49e082){if(_0xe274be[_0x5748c9(0x1e0)](/(.*):(.*)/i)){const _0x1a2860=String(RegExp['$1']),_0x3bcfdf=String(RegExp['$2'])[_0x5748c9(0x203)]()[_0x5748c9(0x1f8)]();let _0x173690,_0x5a2d37,_0x5bae89;switch(_0x3bcfdf){case _0x5748c9(0x267):_0x173690=_0x49e082[_0xe274be]!==''?Number(_0x49e082[_0xe274be]):0x0;break;case'ARRAYNUM':_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON[_0x5748c9(0x29f)](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37[_0x5748c9(0x31f)](_0x323b1c=>Number(_0x323b1c));break;case _0x5748c9(0x318):_0x173690=_0x49e082[_0xe274be]!==''?eval(_0x49e082[_0xe274be]):null;break;case _0x5748c9(0x2f9):_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON['parse'](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37['map'](_0x1b5dc8=>eval(_0x1b5dc8));break;case'JSON':_0x173690=_0x49e082[_0xe274be]!==''?JSON[_0x5748c9(0x29f)](_0x49e082[_0xe274be]):'';break;case _0x5748c9(0x2c1):_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON[_0x5748c9(0x29f)](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37[_0x5748c9(0x31f)](_0x39d273=>JSON[_0x5748c9(0x29f)](_0x39d273));break;case _0x5748c9(0x337):_0x173690=_0x49e082[_0xe274be]!==''?new Function(JSON[_0x5748c9(0x29f)](_0x49e082[_0xe274be])):new Function(_0x5748c9(0x210));break;case _0x5748c9(0x202):_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON[_0x5748c9(0x29f)](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37[_0x5748c9(0x31f)](_0x4752f1=>new Function(JSON[_0x5748c9(0x29f)](_0x4752f1)));break;case'STR':_0x173690=_0x49e082[_0xe274be]!==''?String(_0x49e082[_0xe274be]):'';break;case'ARRAYSTR':_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON['parse'](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37[_0x5748c9(0x31f)](_0x1140d4=>String(_0x1140d4));break;case _0x5748c9(0x23d):_0x5bae89=_0x49e082[_0xe274be]!==''?JSON['parse'](_0x49e082[_0xe274be]):{},_0x3bd4ca[_0x1a2860]={},VisuMZ[_0x5748c9(0x1f3)](_0x3bd4ca[_0x1a2860],_0x5bae89);continue;case _0x5748c9(0x2da):_0x5a2d37=_0x49e082[_0xe274be]!==''?JSON['parse'](_0x49e082[_0xe274be]):[],_0x173690=_0x5a2d37[_0x5748c9(0x31f)](_0x3fe647=>VisuMZ[_0x5748c9(0x1f3)]({},JSON[_0x5748c9(0x29f)](_0x3fe647)));break;default:continue;}_0x3bd4ca[_0x1a2860]=_0x173690;}}return _0x3bd4ca;},(_0x47287f=>{const _0x30d399=_0x525f01,_0x90ae6f=_0x47287f[_0x30d399(0x1d0)];for(const _0x1d5761 of dependencies){if(!Imported[_0x1d5761]){alert(_0x30d399(0x29e)[_0x30d399(0x279)](_0x90ae6f,_0x1d5761)),SceneManager[_0x30d399(0x1f6)]();break;}}const _0x25558b=_0x47287f['description'];if(_0x25558b[_0x30d399(0x1e0)](/\[Version[ ](.*?)\]/i)){if(_0x30d399(0x27a)!=='mHNRq'){const _0x4d3d6a=Number(RegExp['$1']);_0x4d3d6a!==VisuMZ[label][_0x30d399(0x285)]&&(alert(_0x30d399(0x241)['format'](_0x90ae6f,_0x4d3d6a)),SceneManager['exit']());}else{const _0x3cf5e5=_0x8bc26d[_0x30d399(0x1ff)][_0x30d399(0x2c5)],_0x54c54a=_0x3d0352[_0x30d399(0x334)][_0x30d399(0x224)][_0x30d399(0x245)][_0x30d399(0x34c)];return _0x54c54a[_0x30d399(0x279)](_0x3cf5e5,_0x4492e1);}}if(_0x25558b['match'](/\[Tier[ ](\d+)\]/i)){if(_0x30d399(0x254)==='CAJqz')_0x5b655a[_0x30d399(0x334)][_0x30d399(0x33c)][_0x30d399(0x32b)](this,_0x4a8daa);else{const _0x38a3fc=Number(RegExp['$1']);_0x38a3fc<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x90ae6f,_0x38a3fc,tier)),SceneManager[_0x30d399(0x1f6)]()):tier=Math[_0x30d399(0x311)](_0x38a3fc,tier);}}VisuMZ['ConvertParams'](VisuMZ[label][_0x30d399(0x224)],_0x47287f[_0x30d399(0x292)]);})(pluginData),PluginManager[_0x525f01(0x339)](pluginData[_0x525f01(0x1d0)],_0x525f01(0x1cc),_0x2d6693=>{const _0x9a12f0=_0x525f01;if(!DataManager[_0x9a12f0(0x32e)]())return;VisuMZ['ConvertParams'](_0x2d6693,_0x2d6693);if($gameSystem)$gameSystem[_0x9a12f0(0x34b)](_0x2d6693[_0x9a12f0(0x353)]);}),PluginManager['registerCommand'](pluginData[_0x525f01(0x1d0)],_0x525f01(0x310),_0x4aa6d9=>{const _0x442b3b=_0x525f01;if(!DataManager[_0x442b3b(0x32e)]()||$gameParty[_0x442b3b(0x350)]())return;SceneManager[_0x442b3b(0x1d6)]['requestAutosave']();}),PluginManager[_0x525f01(0x339)](pluginData[_0x525f01(0x1d0)],_0x525f01(0x1e2),_0x29f706=>{const _0x48f7f9=_0x525f01;if(!DataManager[_0x48f7f9(0x32e)]()||$gameParty[_0x48f7f9(0x350)]())return;SceneManager[_0x48f7f9(0x1d6)][_0x48f7f9(0x24f)]();}),PluginManager[_0x525f01(0x339)](pluginData['name'],'AutosaveForce',_0x338d53=>{const _0x3324bd=_0x525f01;if(!DataManager[_0x3324bd(0x32e)]()||$gameParty[_0x3324bd(0x350)]())return;SceneManager[_0x3324bd(0x1d6)]['forceAutosave']();}),PluginManager[_0x525f01(0x339)](pluginData['name'],'SaveCurrentSlot',_0x12a290=>{const _0x592468=_0x525f01;SceneManager[_0x592468(0x1d6)][_0x592468(0x301)]();}),PluginManager[_0x525f01(0x339)](pluginData[_0x525f01(0x1d0)],_0x525f01(0x2e6),_0x2b9af3=>{const _0xac0698=_0x525f01;VisuMZ[_0xac0698(0x1f3)](_0x2b9af3,_0x2b9af3);if($gameSystem)$gameSystem[_0xac0698(0x24c)](_0x2b9af3[_0xac0698(0x2f8)]);}),PluginManager[_0x525f01(0x339)](pluginData[_0x525f01(0x1d0)],_0x525f01(0x2ca),_0x58bfd1=>{const _0x36ad4e=_0x525f01;VisuMZ[_0x36ad4e(0x1f3)](_0x58bfd1,_0x58bfd1);if($gameSystem)$gameSystem[_0x36ad4e(0x24a)](_0x58bfd1[_0x36ad4e(0x1ea)]);}),VisuMZ[_0x525f01(0x334)][_0x525f01(0x28b)]=Scene_Boot[_0x525f01(0x1d9)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x525f01(0x2a3)]=function(){const _0x5eeb69=_0x525f01;VisuMZ[_0x5eeb69(0x334)][_0x5eeb69(0x28b)]['call'](this),this[_0x5eeb69(0x1fa)](),this['process_VisuMZ_SaveCore_Switches_Variables']();},Scene_Boot[_0x525f01(0x1d9)][_0x525f01(0x1fa)]=function(){const _0xe3e2a6=_0x525f01;StorageManager[_0xe3e2a6(0x1c9)]()===_0xe3e2a6(0x2e1)&&($dataSystem[_0xe3e2a6(0x236)]=!![]);},VisuMZ['GlobalSwitches']=[],VisuMZ[_0x525f01(0x30f)]=[],Scene_Boot[_0x525f01(0x1d9)][_0x525f01(0x298)]=function(){const _0x57d30d=_0x525f01;for(let _0x1d19ea=0x1;_0x1d19ea<$dataSystem[_0x57d30d(0x304)][_0x57d30d(0x2ce)];_0x1d19ea++){if($dataSystem[_0x57d30d(0x304)][_0x1d19ea][_0x57d30d(0x1e0)](/<GLOBAL>/i))VisuMZ['GlobalSwitches'][_0x57d30d(0x2de)](_0x1d19ea);}for(let _0x2404ba=0x1;_0x2404ba<$dataSystem[_0x57d30d(0x287)]['length'];_0x2404ba++){if($dataSystem[_0x57d30d(0x287)][_0x2404ba][_0x57d30d(0x1e0)](/<GLOBAL>/i))VisuMZ[_0x57d30d(0x30f)][_0x57d30d(0x2de)](_0x2404ba);}},VisuMZ[_0x525f01(0x334)]['DataManager_createGameObjects']=DataManager['createGameObjects'],DataManager['createGameObjects']=function(){const _0x127107=_0x525f01;VisuMZ['SaveCore'][_0x127107(0x1d1)][_0x127107(0x32b)](this),Scene_File[_0x127107(0x265)]=$gameParty[_0x127107(0x246)]();},DataManager[_0x525f01(0x32e)]=function(){const _0x1f1d6e=_0x525f01;return!DataManager[_0x1f1d6e(0x2dc)]()&&!DataManager[_0x1f1d6e(0x19f)]()&&$dataSystem[_0x1f1d6e(0x236)];},DataManager['maxSavefiles']=function(){const _0x2209f3=_0x525f01;if(StorageManager[_0x2209f3(0x1c9)]()===_0x2209f3(0x2e1))return 0x1;let _0x671b4=VisuMZ[_0x2209f3(0x334)][_0x2209f3(0x224)][_0x2209f3(0x245)][_0x2209f3(0x2ed)]?0x0:0x1;return VisuMZ['SaveCore'][_0x2209f3(0x224)][_0x2209f3(0x245)][_0x2209f3(0x2a0)]+_0x671b4;},DataManager[_0x525f01(0x320)]=function(_0x4052b0){const _0x548e40=_0x525f01,_0x11d30b=VisuMZ['SaveCore'][_0x548e40(0x224)][_0x548e40(0x245)]['FilenameFmt'];return _0x11d30b[_0x548e40(0x279)](_0x4052b0);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x2a6)]=DataManager[_0x525f01(0x2ef)],DataManager['makeSavefileInfo']=function(){const _0x52846e=_0x525f01,_0x1c5d57=VisuMZ[_0x52846e(0x334)][_0x52846e(0x2a6)]['call'](this);return VisuMZ[_0x52846e(0x334)]['Settings'][_0x52846e(0x1db)][_0x52846e(0x243)][_0x52846e(0x32b)](this,_0x1c5d57);},ConfigManager[_0x525f01(0x1f5)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x271)][_0x525f01(0x1ef)],ConfigManager[_0x525f01(0x346)]=[],ConfigManager[_0x525f01(0x277)]=[],VisuMZ[_0x525f01(0x334)]['ConfigManager_makeData']=ConfigManager[_0x525f01(0x345)],ConfigManager[_0x525f01(0x345)]=function(){const _0x1cdec8=_0x525f01,_0x2825fa=VisuMZ[_0x1cdec8(0x334)][_0x1cdec8(0x2c0)][_0x1cdec8(0x32b)](this);return _0x2825fa['autosave']=this[_0x1cdec8(0x1f5)]||VisuMZ[_0x1cdec8(0x334)][_0x1cdec8(0x224)][_0x1cdec8(0x271)]['Default'],_0x2825fa[_0x1cdec8(0x346)]=this[_0x1cdec8(0x346)]||[],_0x2825fa[_0x1cdec8(0x277)]=this['globalVariables']||[],_0x2825fa;},VisuMZ[_0x525f01(0x334)][_0x525f01(0x1c1)]=ConfigManager[_0x525f01(0x20d)],ConfigManager[_0x525f01(0x20d)]=function(_0x2d0518){const _0x52490f=_0x525f01;VisuMZ['SaveCore'][_0x52490f(0x1c1)][_0x52490f(0x32b)](this,_0x2d0518),this[_0x52490f(0x1f5)]=_0x2d0518[_0x52490f(0x1f5)]!==undefined?_0x2d0518['autosave']:VisuMZ['SaveCore']['Settings'][_0x52490f(0x271)]['Default'],this[_0x52490f(0x346)]=_0x2d0518[_0x52490f(0x346)]||[],this[_0x52490f(0x277)]=_0x2d0518[_0x52490f(0x277)]||[];},StorageManager[_0x525f01(0x22f)]=function(){const _0x4d2b1b=_0x525f01;if(Utils[_0x4d2b1b(0x214)]()){if(_0x4d2b1b(0x2d3)===_0x4d2b1b(0x2d3))return VisuMZ[_0x4d2b1b(0x334)][_0x4d2b1b(0x224)][_0x4d2b1b(0x245)][_0x4d2b1b(0x293)];else{_0x391c08[_0x4d2b1b(0x334)][_0x4d2b1b(0x306)][_0x4d2b1b(0x32b)](this);if(this[_0x4d2b1b(0x19e)])_0x50d947[_0x4d2b1b(0x316)]();}}else return![];},StorageManager[_0x525f01(0x1c8)]=function(_0x45a085){const _0x2b3db4=_0x525f01,_0x201705=this[_0x2b3db4(0x215)](),_0x3f9156=VisuMZ[_0x2b3db4(0x334)][_0x2b3db4(0x224)]['Save'][_0x2b3db4(0x27d)];return _0x201705+_0x3f9156['format'](_0x45a085);},StorageManager[_0x525f01(0x29c)]=function(_0x45ce63){const _0x7b14ea=_0x525f01,_0x2e0280=$dataSystem[_0x7b14ea(0x1ff)][_0x7b14ea(0x2c5)],_0x4c5d34=VisuMZ[_0x7b14ea(0x334)][_0x7b14ea(0x224)][_0x7b14ea(0x245)][_0x7b14ea(0x34c)];return _0x4c5d34[_0x7b14ea(0x279)](_0x2e0280,_0x45ce63);},StorageManager[_0x525f01(0x249)]=function(){const _0x74dade=_0x525f01;return VisuMZ[_0x74dade(0x334)][_0x74dade(0x224)][_0x74dade(0x245)][_0x74dade(0x2d7)];},StorageManager[_0x525f01(0x1c9)]=function(){const _0x207932=_0x525f01;return VisuMZ['SaveCore'][_0x207932(0x224)][_0x207932(0x245)]['SaveStyle'];},StorageManager[_0x525f01(0x31b)]=function(){const _0x437764=_0x525f01;return this['saveStyle']()===_0x437764(0x2e1)?_0x437764(0x281):VisuMZ[_0x437764(0x334)]['Settings'][_0x437764(0x2cc)][_0x437764(0x244)];},TextManager['pickLockedSaveSlot']=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x245)]['VocabLockedSaveSlot'],TextManager['saveSuccess']=VisuMZ['SaveCore'][_0x525f01(0x224)][_0x525f01(0x34f)][_0x525f01(0x1e8)],TextManager[_0x525f01(0x297)]=VisuMZ['SaveCore'][_0x525f01(0x224)][_0x525f01(0x34f)][_0x525f01(0x305)],TextManager[_0x525f01(0x212)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x34f)][_0x525f01(0x2c9)],TextManager[_0x525f01(0x1ba)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x271)]['Name'],TextManager[_0x525f01(0x1a2)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x1ab)]['VocabAutosaveSuccess'],TextManager['autosaveFailure']=VisuMZ[_0x525f01(0x334)]['Settings'][_0x525f01(0x1ab)]['VocabAutosaveFailure'],TextManager[_0x525f01(0x264)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x1db)][_0x525f01(0x309)],ColorManager['latestSavefile']=function(){const _0x42cf46=_0x525f01,_0x16ff04=_0x42cf46(0x289);this[_0x42cf46(0x2b5)]=this[_0x42cf46(0x2b5)]||{};if(this[_0x42cf46(0x2b5)][_0x16ff04])return this[_0x42cf46(0x2b5)][_0x16ff04];const _0x51bec0=VisuMZ[_0x42cf46(0x334)]['Settings']['SaveMenu'][_0x42cf46(0x1b8)];return this[_0x42cf46(0x2bc)](_0x16ff04,_0x51bec0);},ColorManager[_0x525f01(0x2bc)]=function(_0x229e5b,_0xa27531){const _0x38decc=_0x525f01;_0xa27531=String(_0xa27531),this[_0x38decc(0x2b5)]=this['_colorCache']||{};if(_0xa27531[_0x38decc(0x1e0)](/#(.*)/i))_0x38decc(0x332)!==_0x38decc(0x2e3)?this[_0x38decc(0x2b5)][_0x229e5b]=_0x38decc(0x26c)[_0x38decc(0x279)](String(RegExp['$1'])):this[_0x38decc(0x29a)](-0x10);else{if(_0x38decc(0x1a0)!==_0x38decc(0x2c4))this['_colorCache'][_0x229e5b]=this[_0x38decc(0x25d)](Number(_0xa27531));else{const _0x4fde9a=_0x974ef7[_0x38decc(0x334)]['DataManager_makeSavefileInfo']['call'](this);return _0x1ee403[_0x38decc(0x334)][_0x38decc(0x224)][_0x38decc(0x1db)][_0x38decc(0x243)][_0x38decc(0x32b)](this,_0x4fde9a);}}return this['_colorCache'][_0x229e5b];},VisuMZ[_0x525f01(0x334)][_0x525f01(0x2ea)]=Game_System[_0x525f01(0x1d9)]['initialize'],Game_System[_0x525f01(0x1d9)][_0x525f01(0x349)]=function(){const _0x5f27ce=_0x525f01;VisuMZ[_0x5f27ce(0x334)]['Game_System_initialize'][_0x5f27ce(0x32b)](this),this[_0x5f27ce(0x1cf)]();},Game_System[_0x525f01(0x1d9)]['initSaveCore']=function(){const _0x25f7ec=_0x525f01;this[_0x25f7ec(0x226)]={'autosaveEnabled':!![],'saveDescription':'','savePicture':''};},Game_System['prototype']['isAutosaveEnabled']=function(){const _0x153dff=_0x525f01;if(!$dataSystem[_0x153dff(0x236)])return![];if(this[_0x153dff(0x226)]===undefined)this[_0x153dff(0x1cf)]();if(this[_0x153dff(0x226)]['autosaveEnabled']===undefined)this[_0x153dff(0x1cf)]();return this['_SaveCoreSettings'][_0x153dff(0x2ab)];},Game_System['prototype'][_0x525f01(0x34b)]=function(_0x56d4ec){const _0x5acf96=_0x525f01;if(!$dataSystem['optAutosave'])return;if(this['_SaveCoreSettings']===undefined)this['initSaveCore']();if(this[_0x5acf96(0x226)][_0x5acf96(0x2ab)]===undefined)this[_0x5acf96(0x1cf)]();this[_0x5acf96(0x226)][_0x5acf96(0x2ab)]=_0x56d4ec;},Game_System[_0x525f01(0x1d9)][_0x525f01(0x229)]=function(){const _0x336ca0=_0x525f01;if(this[_0x336ca0(0x226)]===undefined)this[_0x336ca0(0x1cf)]();if(this[_0x336ca0(0x226)][_0x336ca0(0x26e)]===undefined)this['initSaveCore']();return this[_0x336ca0(0x226)][_0x336ca0(0x26e)];},Game_System[_0x525f01(0x1d9)]['setSaveDescription']=function(_0x5bc795){const _0x3cd567=_0x525f01;if(this[_0x3cd567(0x226)]===undefined)this[_0x3cd567(0x1cf)]();if(this[_0x3cd567(0x226)][_0x3cd567(0x26e)]===undefined)this['initSaveCore']();this[_0x3cd567(0x226)][_0x3cd567(0x26e)]=VisuMZ[_0x3cd567(0x334)][_0x3cd567(0x32d)](_0x5bc795);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x32d)]=function(_0x15ceb2){const _0x2b97c0=_0x525f01;while(_0x15ceb2['match'](/\\V\[(\d+)\]/gi)){_0x15ceb2=_0x15ceb2[_0x2b97c0(0x1c4)](/\\V\[(\d+)\]/gi,(_0x4bf9f0,_0xb74dac)=>$gameVariables[_0x2b97c0(0x1d8)](parseInt(_0xb74dac)));}while(_0x15ceb2[_0x2b97c0(0x1e0)](/\\N\[(\d+)\]/gi)){_0x15ceb2=_0x15ceb2[_0x2b97c0(0x1c4)](/\\N\[(\d+)\]/gi,(_0x4dcdb5,_0x3cdaae)=>Window_Base[_0x2b97c0(0x1d9)][_0x2b97c0(0x2d9)](parseInt(_0x3cdaae)));}while(_0x15ceb2[_0x2b97c0(0x1e0)](/\\P\[(\d+)\]/gi)){_0x2b97c0(0x2d2)!==_0x2b97c0(0x2d2)?(_0x57eb32(_0x2b97c0(0x34e)[_0x2b97c0(0x279)](_0x432f09,_0x2180ab,_0x3ab5a0)),_0x51a2be[_0x2b97c0(0x1f6)]()):_0x15ceb2=_0x15ceb2[_0x2b97c0(0x1c4)](/\\P\[(\d+)\]/gi,(_0x2164e0,_0x43beb4)=>Window_Base[_0x2b97c0(0x1d9)][_0x2b97c0(0x1e7)](parseInt(_0x43beb4)));}return _0x15ceb2;},Game_System['prototype'][_0x525f01(0x2b8)]=function(){const _0xaef3dd=_0x525f01;if(this[_0xaef3dd(0x226)]===undefined)this[_0xaef3dd(0x1cf)]();if(this[_0xaef3dd(0x226)]['savePicture']===undefined)this[_0xaef3dd(0x1cf)]();return this[_0xaef3dd(0x226)][_0xaef3dd(0x227)];},Game_System['prototype'][_0x525f01(0x24a)]=function(_0x4c7eb3){const _0x196139=_0x525f01;if(this[_0x196139(0x226)]===undefined)this[_0x196139(0x1cf)]();if(this[_0x196139(0x226)][_0x196139(0x227)]===undefined)this[_0x196139(0x1cf)]();this['_SaveCoreSettings'][_0x196139(0x227)]=_0x4c7eb3;},VisuMZ[_0x525f01(0x334)][_0x525f01(0x1b3)]=Game_System[_0x525f01(0x1d9)][_0x525f01(0x2c3)],Game_System[_0x525f01(0x1d9)]['savefileId']=function(){const _0x4f3ae4=_0x525f01,_0x24d39d=StorageManager['saveStyle']();switch(_0x24d39d){case _0x4f3ae4(0x232):return VisuMZ['SaveCore'][_0x4f3ae4(0x1b3)][_0x4f3ae4(0x32b)](this)||0x1;break;case _0x4f3ae4(0x2e1):return 0x0;break;default:return VisuMZ[_0x4f3ae4(0x334)][_0x4f3ae4(0x1b3)][_0x4f3ae4(0x32b)](this);break;}},Game_Switches[_0x525f01(0x1d9)][_0x525f01(0x24d)]=function(_0x43f2fd){const _0x35288a=_0x525f01;return $dataSystem[_0x35288a(0x304)][_0x43f2fd]&&VisuMZ[_0x35288a(0x268)][_0x35288a(0x2b9)](_0x43f2fd);},VisuMZ[_0x525f01(0x334)]['Game_Switches_value']=Game_Switches[_0x525f01(0x1d9)][_0x525f01(0x1d8)],Game_Switches[_0x525f01(0x1d9)]['value']=function(_0xaca66c){const _0x51b82c=_0x525f01;if(this[_0x51b82c(0x24d)](_0xaca66c))return this['globalValue'](_0xaca66c);else{if(_0x51b82c(0x1fd)!==_0x51b82c(0x295))return VisuMZ['SaveCore']['Game_Switches_value'][_0x51b82c(0x32b)](this,_0xaca66c);else this[_0x51b82c(0x217)]();}},Game_Switches['prototype'][_0x525f01(0x32c)]=function(_0x27a672){const _0x539fa8=_0x525f01;return ConfigManager[_0x539fa8(0x346)]=ConfigManager[_0x539fa8(0x346)]||[],!!ConfigManager[_0x539fa8(0x346)][_0x27a672];},VisuMZ[_0x525f01(0x334)]['Game_Switches_setValue']=Game_Switches['prototype']['setValue'],Game_Switches[_0x525f01(0x1d9)][_0x525f01(0x33a)]=function(_0x4ecab2,_0x11f4e4){const _0x1c923a=_0x525f01;if(this[_0x1c923a(0x24d)](_0x4ecab2))this[_0x1c923a(0x2b2)](_0x4ecab2,_0x11f4e4);VisuMZ[_0x1c923a(0x334)][_0x1c923a(0x2f3)][_0x1c923a(0x32b)](this,_0x4ecab2,_0x11f4e4);},Game_Switches['prototype']['setGlobalValue']=function(_0x1403d4,_0x178602){const _0x2f0ec4=_0x525f01;if(_0x1403d4>0x0&&_0x1403d4<$dataSystem[_0x2f0ec4(0x304)][_0x2f0ec4(0x2ce)]){if(_0x2f0ec4(0x204)!==_0x2f0ec4(0x204))return _0x216e7b[_0x2f0ec4(0x334)]['Game_Switches_value'][_0x2f0ec4(0x32b)](this,_0x511e71);else ConfigManager['globalSwitches']=ConfigManager[_0x2f0ec4(0x346)]||[],ConfigManager[_0x2f0ec4(0x346)][_0x1403d4]=_0x178602,ConfigManager[_0x2f0ec4(0x238)]();}},Game_Variables['prototype'][_0x525f01(0x24d)]=function(_0x2e11fe){const _0x30f273=_0x525f01;return $dataSystem[_0x30f273(0x287)][_0x2e11fe]&&VisuMZ['GlobalVariables']['includes'](_0x2e11fe);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x30a)]=Game_Variables[_0x525f01(0x1d9)]['value'],Game_Variables[_0x525f01(0x1d9)][_0x525f01(0x1d8)]=function(_0x2d6b6e){const _0x4b11c3=_0x525f01;if(this['isGlobal'](_0x2d6b6e)){if(_0x4b11c3(0x209)!==_0x4b11c3(0x209))this['_fadeSpeed']=0x0,_0x5442dd[_0x4b11c3(0x1d9)]['initialize'][_0x4b11c3(0x32b)](this,_0x5ecebe),this[_0x4b11c3(0x2f5)]=0x0,this[_0x4b11c3(0x22d)]=0x0;else return this[_0x4b11c3(0x32c)](_0x2d6b6e);}else{if(_0x4b11c3(0x225)!=='IfxBG')return VisuMZ[_0x4b11c3(0x334)]['Game_Variables_value']['call'](this,_0x2d6b6e);else this[_0x4b11c3(0x2b5)][_0x8a7249]=_0x4b11c3(0x26c)[_0x4b11c3(0x279)](_0x33fb3e(_0xc82d70['$1']));}},Game_Variables['prototype'][_0x525f01(0x32c)]=function(_0x112f78){const _0x201a9a=_0x525f01;return ConfigManager[_0x201a9a(0x277)]=ConfigManager[_0x201a9a(0x277)]||[],ConfigManager['globalVariables'][_0x112f78]===undefined&&(_0x201a9a(0x283)===_0x201a9a(0x1e6)?(_0x44ece7['playBuzzer'](),_0x2b8f3f[_0x201a9a(0x334)][_0x201a9a(0x224)][_0x201a9a(0x245)][_0x201a9a(0x1f2)]['call'](this),this[_0x201a9a(0x2f1)]()):ConfigManager[_0x201a9a(0x277)][_0x112f78]=0x0),ConfigManager[_0x201a9a(0x277)][_0x112f78];},VisuMZ[_0x525f01(0x334)]['Game_Variables_setValue']=Game_Variables[_0x525f01(0x1d9)][_0x525f01(0x33a)],Game_Variables[_0x525f01(0x1d9)]['setValue']=function(_0xbc5f31,_0x474856){const _0x512659=_0x525f01;if(this[_0x512659(0x24d)](_0xbc5f31))this['setGlobalValue'](_0xbc5f31,_0x474856);VisuMZ['SaveCore'][_0x512659(0x2b0)]['call'](this,_0xbc5f31,_0x474856);},Game_Variables[_0x525f01(0x1d9)][_0x525f01(0x2b2)]=function(_0x4b8990,_0x530983){const _0x30f63b=_0x525f01;if(_0x4b8990>0x0&&_0x4b8990<$dataSystem[_0x30f63b(0x287)]['length']){ConfigManager[_0x30f63b(0x277)]=ConfigManager[_0x30f63b(0x277)]||[];if(typeof _0x530983===_0x30f63b(0x2a5))_0x530983=Math[_0x30f63b(0x2f4)](_0x530983);ConfigManager['globalVariables'][_0x4b8990]=_0x530983,ConfigManager['save']();}},Game_Party[_0x525f01(0x1d9)]['svbattlersForSaveFile']=function(){const _0x3c6cc7=_0x525f01;return this['battleMembers']()['map'](_0x4a8ccc=>_0x4a8ccc[_0x3c6cc7(0x1d7)]());},Scene_Base['prototype']['determineAutosaveBypass']=function(_0x512606){const _0x1c604a=_0x525f01,_0x5116bb=VisuMZ[_0x1c604a(0x334)][_0x1c604a(0x224)][_0x1c604a(0x2cc)];switch(_0x512606){case _0x1c604a(0x255):this[_0x1c604a(0x1fc)]=!_0x5116bb[_0x1c604a(0x317)];break;case'transfer':if(!this[_0x1c604a(0x24b)]())return;this[_0x1c604a(0x1fc)]=!_0x5116bb[_0x1c604a(0x2db)];break;case _0x1c604a(0x259):this[_0x1c604a(0x1fc)]=!_0x5116bb['AfterMenuCall'];break;case _0x1c604a(0x331):this[_0x1c604a(0x1fc)]=!_0x5116bb[_0x1c604a(0x1bb)];break;}},VisuMZ[_0x525f01(0x334)]['Scene_Base_requestAutosave']=Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1ad)],Scene_Base[_0x525f01(0x1d9)]['requestAutosave']=function(){const _0x53a46d=_0x525f01;!this[_0x53a46d(0x1fc)]&&VisuMZ[_0x53a46d(0x334)]['Scene_Base_requestAutosave'][_0x53a46d(0x32b)](this),this[_0x53a46d(0x1fc)]=![];},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x2ad)]=function(){const _0x5a99f2=_0x525f01;return!DataManager[_0x5a99f2(0x2dc)]()&&!DataManager[_0x5a99f2(0x19f)]()&&$gameSystem[_0x5a99f2(0x2ad)]()&&(VisuMZ[_0x5a99f2(0x334)][_0x5a99f2(0x224)][_0x5a99f2(0x2cc)][_0x5a99f2(0x1da)]?$gameSystem[_0x5a99f2(0x23c)]():!![]);},Scene_Base[_0x525f01(0x1d9)]['executeAutosave']=function(){const _0x18e7eb=_0x525f01;if(!ConfigManager[_0x18e7eb(0x1f5)])return;this[_0x18e7eb(0x1e4)]();},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1e4)]=function(){const _0x29360e=_0x525f01;$gameSystem[_0x29360e(0x213)](),this[_0x29360e(0x330)]=![];const _0x2a3470=StorageManager[_0x29360e(0x31b)]();if([_0x29360e(0x281),_0x29360e(0x23e)][_0x29360e(0x2b9)](_0x2a3470)){if(_0x29360e(0x20e)==='MunYQ')DataManager[_0x29360e(0x2be)](0x0)['then'](()=>this[_0x29360e(0x336)]())[_0x29360e(0x28e)](()=>this[_0x29360e(0x2df)]());else{if(_0x3ede93[_0x29360e(0x32a)])return;const _0x1548c1=_0x2606b0[_0x29360e(0x2c3)]();if(_0x4e71dd[_0x29360e(0x1c9)]()!=='single'&&_0x1548c1<=0x0)return;this['_active']=![],_0x2f9780['setSavefileId'](_0x1548c1),_0x196222['onBeforeSave'](),_0xf421b0['_saveCorePluginCommandSave']=!![],_0x41be6c[_0x29360e(0x2be)](_0x1548c1)[_0x29360e(0x2d1)](()=>this[_0x29360e(0x276)]())[_0x29360e(0x28e)](()=>this[_0x29360e(0x1cd)]()),_0x2ec09c[_0x29360e(0x32a)]=_0x8ce986;}}if([_0x29360e(0x2bd),_0x29360e(0x23e)][_0x29360e(0x2b9)](_0x2a3470)){if(_0x29360e(0x1bf)!=='JkqPT'){const _0x238823=$gameSystem['savefileId']();_0x238823>0x0&&DataManager[_0x29360e(0x2be)](_0x238823)[_0x29360e(0x2d1)](()=>this[_0x29360e(0x336)]())[_0x29360e(0x28e)](()=>this[_0x29360e(0x2df)]());}else return _0x52a7b5[_0x29360e(0x287)][_0x1628b2]&&_0x1b4902[_0x29360e(0x30f)][_0x29360e(0x2b9)](_0xbf83f4);}this['_processingAutosave']=![];},VisuMZ[_0x525f01(0x334)][_0x525f01(0x25f)]=Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x336)],Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x336)]=function(){const _0x1828bd=_0x525f01;if(this[_0x1828bd(0x330)])return;VisuMZ[_0x1828bd(0x334)][_0x1828bd(0x25f)]['call'](this),VisuMZ[_0x1828bd(0x334)][_0x1828bd(0x224)][_0x1828bd(0x2cc)][_0x1828bd(0x2cd)][_0x1828bd(0x32b)](this),this[_0x1828bd(0x25b)](!![]),this['_processingAutosave']=!![];},VisuMZ['SaveCore'][_0x525f01(0x2b1)]=Scene_Base[_0x525f01(0x1d9)]['onAutosaveFailure'],Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x2df)]=function(){const _0x14dcda=_0x525f01;if(this[_0x14dcda(0x330)])return;VisuMZ['SaveCore'][_0x14dcda(0x2b1)][_0x14dcda(0x32b)](this),VisuMZ[_0x14dcda(0x334)][_0x14dcda(0x224)][_0x14dcda(0x2cc)][_0x14dcda(0x22a)][_0x14dcda(0x32b)](this),this[_0x14dcda(0x25b)](![]);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x2e5)]=function(){const _0x4d1b50=_0x525f01;if(this[_0x4d1b50(0x291)])return;const _0x2ea253=this['saveConfirmationWindowRect']();this[_0x4d1b50(0x291)]=new Window_Base(_0x2ea253),this[_0x4d1b50(0x291)][_0x4d1b50(0x275)]=0x0;},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x2c6)]=function(){const _0x43e864=_0x525f01;return VisuMZ[_0x43e864(0x334)][_0x43e864(0x224)]['SaveConfirm'][_0x43e864(0x25c)][_0x43e864(0x32b)](this);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1b0)]=function(){const _0x42d8c6=_0x525f01;return VisuMZ['SaveCore'][_0x42d8c6(0x224)]['SaveConfirm']['Enable'];},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x24e)]=function(_0x46beae,_0x215975){const _0x594823=_0x525f01;if(!this[_0x594823(0x1b0)]())return this['closeSaveConfirmationWindow'](_0x46beae);if(!this[_0x594823(0x291)])this['createSaveConfirmationWindow']();const _0x1146a5=this[_0x594823(0x291)];this['removeChild'](_0x1146a5),this['addChild'](_0x1146a5),_0x1146a5[_0x594823(0x1b9)](),_0x1146a5[_0x594823(0x296)](),_0x1146a5[_0x594823(0x2e4)][_0x594823(0x1a1)]();let _0x177a0f='';_0x215975?_0x177a0f=TextManager[_0x594823(0x212)]:_0x177a0f=_0x46beae?TextManager[_0x594823(0x221)]:TextManager[_0x594823(0x297)];const _0x54e28e=_0x1146a5[_0x594823(0x2c2)](_0x177a0f)[_0x594823(0x21a)],_0x4a7194=(_0x1146a5[_0x594823(0x1df)]-_0x54e28e)/0x2;_0x1146a5[_0x594823(0x26f)](_0x177a0f,_0x4a7194,0x0,_0x54e28e);const _0x1b0984=VisuMZ['SaveCore'][_0x594823(0x224)][_0x594823(0x34f)][_0x594823(0x333)];setTimeout(this[_0x594823(0x1f0)]['bind'](this,_0x46beae),_0x1b0984);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x2f1)]=function(){const _0x1be8d=_0x525f01;this[_0x1be8d(0x24e)](![],!![]);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1f0)]=function(_0x5da721){const _0x4cf40b=_0x525f01;if(this['_saveConfirmWindow'])this[_0x4cf40b(0x291)]['close']();},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1a7)]=function(){const _0x4e72de=_0x525f01;if(this[_0x4e72de(0x1c5)])return;const _0x456d4e=this[_0x4e72de(0x1cb)]();this['_autosaveConfirmWindow']=new Window_AutosaveConfirm(_0x456d4e);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1cb)]=function(){const _0x14775f=_0x525f01,_0x423a37=this['mainCommandWidth'](),_0x23b9d0=this[_0x14775f(0x208)](0x1,![]),_0x446a1b=Graphics[_0x14775f(0x21a)]-_0x423a37,_0x4c2d24=Graphics['height']-_0x23b9d0;return new Rectangle(_0x446a1b,_0x4c2d24,_0x423a37,_0x23b9d0);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x1bc)]=function(){const _0x21d107=_0x525f01;return VisuMZ[_0x21d107(0x334)]['Settings'][_0x21d107(0x1ab)][_0x21d107(0x353)];},Scene_Base['prototype'][_0x525f01(0x25b)]=function(_0x5bf989){const _0x1aac08=_0x525f01;if(!this[_0x1aac08(0x1bc)]())return this[_0x1aac08(0x269)](_0x5bf989);if(!this['_autosaveConfirmWindow'])this[_0x1aac08(0x1a7)]();const _0x557a90=this[_0x1aac08(0x1c5)];this['removeChild'](_0x557a90),this['addChild'](_0x557a90),_0x557a90[_0x1aac08(0x201)](_0x5bf989),_0x557a90['fadeIn']();const _0x1aad49=VisuMZ[_0x1aac08(0x334)]['Settings'][_0x1aac08(0x34f)][_0x1aac08(0x333)];setTimeout(this[_0x1aac08(0x269)][_0x1aac08(0x2bb)](this,_0x5bf989),_0x1aad49);},Scene_Base[_0x525f01(0x1d9)][_0x525f01(0x269)]=function(_0x25b244){const _0x410cc4=_0x525f01;if(this[_0x410cc4(0x1c5)])this[_0x410cc4(0x1c5)]['fadeOut']();},Scene_Base['prototype'][_0x525f01(0x301)]=function(){},VisuMZ['SaveCore'][_0x525f01(0x2d5)]=Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x349)],Scene_Title[_0x525f01(0x1d9)]['initialize']=function(){const _0x24f82e=_0x525f01;VisuMZ[_0x24f82e(0x334)][_0x24f82e(0x2d5)][_0x24f82e(0x32b)](this),this[_0x24f82e(0x19e)]=![];},VisuMZ[_0x525f01(0x334)][_0x525f01(0x306)]=Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x27e)],Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x27e)]=function(){const _0x64af32=_0x525f01;VisuMZ[_0x64af32(0x334)][_0x64af32(0x306)][_0x64af32(0x32b)](this);if(this[_0x64af32(0x19e)])$gameSystem['onAfterLoad']();},VisuMZ[_0x525f01(0x334)][_0x525f01(0x26a)]=Scene_Title['prototype'][_0x525f01(0x262)],Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x262)]=function(){const _0x4ea3b5=_0x525f01;if(StorageManager[_0x4ea3b5(0x1c9)]()===_0x4ea3b5(0x232)){if('AbIYg'!==_0x4ea3b5(0x1af))return'file0';else this[_0x4ea3b5(0x329)]();}else VisuMZ[_0x4ea3b5(0x334)][_0x4ea3b5(0x26a)]['call'](this);},Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x329)]=function(){const _0x2dd68d=_0x525f01;DataManager['setupNewGame'](),$gameTemp[_0x2dd68d(0x1d5)]=!![],this['_commandWindow'][_0x2dd68d(0x247)](),SceneManager[_0x2dd68d(0x2de)](Scene_Save);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x27f)]=Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x258)],Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x258)]=function(){const _0x2c8496=_0x525f01;StorageManager['saveStyle']()===_0x2c8496(0x2e1)?this[_0x2c8496(0x1f7)]():VisuMZ['SaveCore'][_0x2c8496(0x27f)][_0x2c8496(0x32b)](this);},Scene_Title['prototype'][_0x525f01(0x1f7)]=function(){const _0x57b012=_0x525f01;DataManager[_0x57b012(0x29b)](0x0)[_0x57b012(0x2d1)](()=>this['onSaveCoreLoadSuccess']())[_0x57b012(0x28e)](()=>this[_0x57b012(0x1b6)]());},Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x302)]=function(){const _0x1013fa=_0x525f01;this['_commandWindow']['close'](),SoundManager['playLoad'](),this[_0x1013fa(0x23b)](),Scene_Load[_0x1013fa(0x1d9)][_0x1013fa(0x315)](),SceneManager[_0x1013fa(0x322)](Scene_Map),this[_0x1013fa(0x19e)]=!![],VisuMZ[_0x1013fa(0x334)][_0x1013fa(0x224)]['Save'][_0x1013fa(0x235)]['call'](this);},Scene_Title['prototype']['onSaveCoreLoadFailure']=function(){const _0x5d216e=_0x525f01;SoundManager[_0x5d216e(0x1ac)](),VisuMZ[_0x5d216e(0x334)][_0x5d216e(0x224)][_0x5d216e(0x245)][_0x5d216e(0x1f2)][_0x5d216e(0x32b)](this),this[_0x5d216e(0x2f1)]();},Scene_Title[_0x525f01(0x1d9)][_0x525f01(0x1f0)]=function(_0x44c7a1){const _0x5326f8=_0x525f01;Scene_Base[_0x5326f8(0x1d9)][_0x5326f8(0x1f0)][_0x5326f8(0x32b)](this,_0x44c7a1),this[_0x5326f8(0x1dc)]['open'](),this[_0x5326f8(0x1dc)][_0x5326f8(0x328)]();},VisuMZ[_0x525f01(0x334)][_0x525f01(0x2a2)]=Scene_Map[_0x525f01(0x1d9)]['onMapLoaded'],Scene_Map[_0x525f01(0x1d9)][_0x525f01(0x253)]=function(){const _0x2ed2f=_0x525f01;VisuMZ['SaveCore'][_0x2ed2f(0x2a2)][_0x2ed2f(0x32b)](this);if(SceneManager[_0x2ed2f(0x2a8)](Scene_Menu))this[_0x2ed2f(0x251)](_0x2ed2f(0x331)),this['requestAutosave']();else SceneManager['isPreviousScene'](Scene_Battle)&&(_0x2ed2f(0x355)==='wNvoa'?(this[_0x2ed2f(0x251)](_0x2ed2f(0x255)),this[_0x2ed2f(0x1ad)]()):_0x252dc1[_0x2ed2f(0x2be)](_0x581d31)[_0x2ed2f(0x2d1)](()=>this[_0x2ed2f(0x336)]())[_0x2ed2f(0x28e)](()=>this['onAutosaveFailure']()));},VisuMZ[_0x525f01(0x334)][_0x525f01(0x351)]=Scene_Map['prototype'][_0x525f01(0x30c)],Scene_Map[_0x525f01(0x1d9)][_0x525f01(0x30c)]=function(){const _0x467fb7=_0x525f01;this['shouldAutosave']()&&this['determineAutosaveBypass'](_0x467fb7(0x2d6)),VisuMZ['SaveCore'][_0x467fb7(0x351)]['call'](this);},Scene_Map['prototype'][_0x525f01(0x301)]=function(){const _0x25d971=_0x525f01;if($gameSystem[_0x25d971(0x32a)])return;const _0x4182f4=$gameSystem[_0x25d971(0x2c3)]();if(StorageManager[_0x25d971(0x1c9)]()!==_0x25d971(0x2e1)&&_0x4182f4<=0x0)return;this[_0x25d971(0x1a4)]=![],$gameSystem[_0x25d971(0x22c)](_0x4182f4),$gameSystem[_0x25d971(0x213)](),$gameSystem[_0x25d971(0x32a)]=!![],DataManager[_0x25d971(0x2be)](_0x4182f4)[_0x25d971(0x2d1)](()=>this[_0x25d971(0x276)]())[_0x25d971(0x28e)](()=>this['onSaveFailure']()),$gameSystem[_0x25d971(0x32a)]=undefined;},Scene_Map['prototype'][_0x525f01(0x276)]=function(){const _0x4d53de=_0x525f01;SoundManager[_0x4d53de(0x348)](),VisuMZ[_0x4d53de(0x334)][_0x4d53de(0x224)]['Save'][_0x4d53de(0x1be)][_0x4d53de(0x32b)](this),this[_0x4d53de(0x24e)](!![]);},Scene_Map['prototype']['onSaveFailure']=function(){const _0x10ed4e=_0x525f01;SoundManager[_0x10ed4e(0x1ac)](),VisuMZ['SaveCore'][_0x10ed4e(0x224)][_0x10ed4e(0x245)][_0x10ed4e(0x2ac)]['call'](this),this[_0x10ed4e(0x24e)](![]);},Scene_Map[_0x525f01(0x1d9)][_0x525f01(0x1f0)]=function(_0x4c4a52){const _0x5f1932=_0x525f01;Scene_Message[_0x5f1932(0x1d9)][_0x5f1932(0x1f0)][_0x5f1932(0x32b)](this,_0x4c4a52),this['_active']=!![];},VisuMZ[_0x525f01(0x334)][_0x525f01(0x273)]=Scene_Menu[_0x525f01(0x1d9)][_0x525f01(0x30d)],Scene_Menu['prototype'][_0x525f01(0x30d)]=function(){const _0x39fb9d=_0x525f01;VisuMZ[_0x39fb9d(0x334)][_0x39fb9d(0x273)][_0x39fb9d(0x32b)](this),SceneManager[_0x39fb9d(0x2a8)](Scene_Map)&&(_0x39fb9d(0x1ca)!==_0x39fb9d(0x1ca)?_0x534714[_0x39fb9d(0x334)][_0x39fb9d(0x224)][_0x39fb9d(0x271)][_0x39fb9d(0x27c)]&&this[_0x39fb9d(0x2dd)]():(this[_0x39fb9d(0x251)](_0x39fb9d(0x259)),this[_0x39fb9d(0x1ad)]()));},VisuMZ['SaveCore'][_0x525f01(0x1c3)]=Scene_Menu[_0x525f01(0x1d9)]['commandSave'],Scene_Menu['prototype'][_0x525f01(0x2e2)]=function(){const _0x18150d=_0x525f01,_0x5e8733=StorageManager[_0x18150d(0x1c9)]();switch(_0x5e8733){case _0x18150d(0x232):case _0x18150d(0x2e1):this[_0x18150d(0x1a6)]();break;default:VisuMZ[_0x18150d(0x334)][_0x18150d(0x1c3)][_0x18150d(0x32b)](this);break;}},Scene_Menu['prototype']['commandSaveLocked']=function(){const _0x4d8c18=_0x525f01,_0x1d1fa7=$gameSystem['savefileId']();$gameSystem[_0x4d8c18(0x22c)](_0x1d1fa7),$gameSystem[_0x4d8c18(0x213)](),DataManager[_0x4d8c18(0x2be)](_0x1d1fa7)[_0x4d8c18(0x2d1)](()=>this[_0x4d8c18(0x299)]())[_0x4d8c18(0x28e)](()=>this['onSaveCoreSaveFailure']());},Scene_Menu[_0x525f01(0x1d9)][_0x525f01(0x299)]=function(){const _0x4b1609=_0x525f01;SoundManager[_0x4b1609(0x348)](),VisuMZ[_0x4b1609(0x334)][_0x4b1609(0x224)][_0x4b1609(0x245)][_0x4b1609(0x1be)]['call'](this),this[_0x4b1609(0x24e)](!![]);},Scene_Menu['prototype']['onSaveCoreSaveFailure']=function(){const _0x44f889=_0x525f01;SoundManager[_0x44f889(0x1ac)](),VisuMZ[_0x44f889(0x334)][_0x44f889(0x224)][_0x44f889(0x245)][_0x44f889(0x2ac)][_0x44f889(0x32b)](this),this[_0x44f889(0x24e)](![]);},Scene_Menu['prototype'][_0x525f01(0x1f0)]=function(_0x169841){const _0x1bb757=_0x525f01;Scene_MenuBase[_0x1bb757(0x1d9)][_0x1bb757(0x1f0)][_0x1bb757(0x32b)](this,_0x169841),this[_0x1bb757(0x1dc)]['activate']();},Scene_Battle[_0x525f01(0x1d9)]['requestAutosave']=function(){},VisuMZ[_0x525f01(0x334)]['Scene_Options_maxCommands']=Scene_Options['prototype'][_0x525f01(0x228)],Scene_Options[_0x525f01(0x1d9)][_0x525f01(0x228)]=function(){const _0x559ab7=_0x525f01;let _0x21f32a=VisuMZ[_0x559ab7(0x334)][_0x559ab7(0x1ed)][_0x559ab7(0x32b)](this);const _0x47ba72=VisuMZ[_0x559ab7(0x334)]['Settings'];if(_0x47ba72[_0x559ab7(0x271)][_0x559ab7(0x27c)]&&_0x47ba72[_0x559ab7(0x271)][_0x559ab7(0x354)])_0x21f32a++;return _0x21f32a;},Scene_Save[_0x525f01(0x1d9)][_0x525f01(0x276)]=function(){const _0x17d531=_0x525f01;SoundManager['playSave'](),VisuMZ[_0x17d531(0x334)][_0x17d531(0x224)]['Save'][_0x17d531(0x1be)][_0x17d531(0x32b)](this),this[_0x17d531(0x220)][_0x17d531(0x240)](),this[_0x17d531(0x24e)](!![]);},VisuMZ['SaveCore']['Scene_Save_onSaveFailure']=Scene_Save['prototype']['onSaveFailure'],Scene_Save['prototype'][_0x525f01(0x1cd)]=function(){const _0x10f3fe=_0x525f01;SoundManager[_0x10f3fe(0x1ac)](),VisuMZ[_0x10f3fe(0x334)][_0x10f3fe(0x224)][_0x10f3fe(0x245)][_0x10f3fe(0x2ac)]['call'](this),this[_0x10f3fe(0x24e)](![]);},Scene_Save[_0x525f01(0x1d9)][_0x525f01(0x1f0)]=function(_0x1343b2){const _0x30290f=_0x525f01;Scene_File[_0x30290f(0x1d9)][_0x30290f(0x1f0)]['call'](this,_0x1343b2),_0x1343b2?this[_0x30290f(0x217)]():this['activateListWindow']();},Scene_Save[_0x525f01(0x1d9)][_0x525f01(0x206)]=function(){const _0x3de43c=_0x525f01;$gameTemp['_pickLockedSaveSlot']=![],Scene_File['prototype'][_0x3de43c(0x206)][_0x3de43c(0x32b)](this);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x205)]=Scene_Save[_0x525f01(0x1d9)][_0x525f01(0x324)],Scene_Save['prototype'][_0x525f01(0x324)]=function(){const _0x3bed07=_0x525f01;if($gameTemp[_0x3bed07(0x1d5)]){if('GVlGc'!==_0x3bed07(0x1fb))return TextManager['pickLockedSaveSlot'];else{if(!_0x5cc425['isAutosaveCompatible']()||_0x4af9ae[_0x3bed07(0x350)]())return;_0xb713f8['_scene'][_0x3bed07(0x1e4)]();}}else return VisuMZ['SaveCore'][_0x3bed07(0x205)][_0x3bed07(0x32b)](this);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x33c)]=Scene_Save['prototype'][_0x525f01(0x308)],Scene_Save['prototype'][_0x525f01(0x308)]=function(_0xd57746){const _0x2814df=_0x525f01;if($gameTemp[_0x2814df(0x1d5)])this[_0x2814df(0x25e)](_0xd57746);else{if(_0x2814df(0x20a)===_0x2814df(0x2d8)){const _0x1b3ebc=_0x568a4a[_0x2814df(0x311)](0x0,this['savefileIdToIndex'](_0x2ccbed));this['smoothSelect'](_0x1b3ebc);}else VisuMZ[_0x2814df(0x334)]['Scene_Save_executeSave'][_0x2814df(0x32b)](this,_0xd57746);}},Scene_Save[_0x525f01(0x1d9)][_0x525f01(0x25e)]=function(_0x3ed227){const _0x42c23c=_0x525f01;$gameTemp[_0x42c23c(0x1d5)]=![],SoundManager[_0x42c23c(0x1bd)](),$gameSystem[_0x42c23c(0x22c)](_0x3ed227),this[_0x42c23c(0x23b)](),SceneManager['goto'](Scene_Map);},VisuMZ[_0x525f01(0x334)][_0x525f01(0x250)]=Scene_Load[_0x525f01(0x1d9)][_0x525f01(0x1d4)],Scene_Load[_0x525f01(0x1d9)]['onLoadSuccess']=function(){const _0x56a819=_0x525f01;VisuMZ[_0x56a819(0x334)][_0x56a819(0x250)]['call'](this),VisuMZ[_0x56a819(0x334)][_0x56a819(0x224)]['Save']['OnLoadSuccessJS']['call'](this),setTimeout(VisuMZ[_0x56a819(0x334)][_0x56a819(0x312)][_0x56a819(0x2bb)](this),0x3e8);},Scene_Load[_0x525f01(0x1d9)][_0x525f01(0x252)]=function(){const _0xa6a34b=_0x525f01;SoundManager[_0xa6a34b(0x1ac)](),VisuMZ[_0xa6a34b(0x334)][_0xa6a34b(0x224)][_0xa6a34b(0x245)][_0xa6a34b(0x1f2)][_0xa6a34b(0x32b)](this),this[_0xa6a34b(0x2f1)]();},Scene_Load[_0x525f01(0x1d9)]['closeSaveConfirmationWindow']=function(_0xcee888){const _0x44378f=_0x525f01;Scene_File[_0x44378f(0x1d9)][_0x44378f(0x1f0)][_0x44378f(0x32b)](this,_0xcee888),this[_0x44378f(0x217)]();},VisuMZ['SaveCore'][_0x525f01(0x312)]=function(){$gameSystem['_saveCorePluginCommandSave']=undefined;},ImageManager['svActorHorzCells']=ImageManager[_0x525f01(0x280)]||0x9,ImageManager[_0x525f01(0x23a)]=ImageManager['svActorVertCells']||0x6,Window_Base[_0x525f01(0x1d9)][_0x525f01(0x1fe)]=function(_0x572419,_0x2bcace,_0x5db671){const _0x25a101=_0x525f01,_0x43ca52=ImageManager['loadSvActor'](_0x572419),_0x44492e=_0x43ca52[_0x25a101(0x21a)]/ImageManager['svActorHorzCells'],_0x2016de=_0x43ca52[_0x25a101(0x31c)]/ImageManager[_0x25a101(0x23a)],_0x2ca9f2=0x0,_0x42a087=0x0;this['contents'][_0x25a101(0x25a)](_0x43ca52,_0x2ca9f2,_0x42a087,_0x44492e,_0x2016de,_0x2bcace-_0x44492e/0x2,_0x5db671-_0x2016de);},VisuMZ['SaveCore'][_0x525f01(0x2ec)]=Window_Options[_0x525f01(0x1d9)][_0x525f01(0x2ba)],Window_Options[_0x525f01(0x1d9)][_0x525f01(0x2ba)]=function(){const _0x27a5a0=_0x525f01;VisuMZ[_0x27a5a0(0x334)][_0x27a5a0(0x2ec)]['call'](this),this['addSaveCoreCommands']();},Window_Options[_0x525f01(0x1d9)][_0x525f01(0x1a9)]=function(){const _0x25adad=_0x525f01;VisuMZ[_0x25adad(0x334)][_0x25adad(0x224)]['AutosaveOption']['AddOption']&&this[_0x25adad(0x2dd)]();},Window_Options[_0x525f01(0x1d9)][_0x525f01(0x2dd)]=function(){const _0x317930=_0x525f01,_0x426d1c=TextManager[_0x317930(0x1ba)],_0x398a9f=_0x317930(0x1f5);this[_0x317930(0x200)](_0x426d1c,_0x398a9f);};function Window_AutosaveConfirm(){const _0x20fc38=_0x525f01;this[_0x20fc38(0x349)](...arguments);}Window_AutosaveConfirm['prototype']=Object['create'](Window_Base[_0x525f01(0x1d9)]),Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x33d)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x349)]=function(_0x589e40){const _0x56ab6b=_0x525f01;this[_0x56ab6b(0x1c6)]=0x0,Window_Base[_0x56ab6b(0x1d9)][_0x56ab6b(0x349)][_0x56ab6b(0x32b)](this,_0x589e40),this[_0x56ab6b(0x2f5)]=0x0,this[_0x56ab6b(0x22d)]=0x0;},Window_AutosaveConfirm['prototype'][_0x525f01(0x20b)]=function(){const _0x2e6bfc=_0x525f01,_0x567f8e=0x0,_0xc78fa4=0x0,_0x3b2696=this[_0x2e6bfc(0x1df)],_0x182ee3=this[_0x2e6bfc(0x2b4)],_0x349cf6=ColorManager[_0x2e6bfc(0x21c)](),_0x17a043=ColorManager[_0x2e6bfc(0x266)](),_0x5dc220=_0x3b2696/0x2;this[_0x2e6bfc(0x2e4)][_0x2e6bfc(0x1ee)](_0x567f8e,_0xc78fa4,_0x5dc220,_0x182ee3,_0x17a043,_0x349cf6),this[_0x2e6bfc(0x2e4)][_0x2e6bfc(0x1ee)](_0x567f8e+_0x5dc220,_0xc78fa4,_0x5dc220,_0x182ee3,_0x349cf6,_0x17a043);},Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x201)]=function(_0x39f7c3){const _0x84bea3=_0x525f01;this[_0x84bea3(0x338)]=_0x39f7c3,this[_0x84bea3(0x240)]();},Window_AutosaveConfirm['prototype']['refresh']=function(){const _0x1c02fe=_0x525f01;this['contents'][_0x1c02fe(0x1a1)]();const _0x3bf68e=this[_0x1c02fe(0x338)]?TextManager['autosaveSuccess']:TextManager['autosaveFailure'],_0x12546a=Math['ceil'](this['textSizeEx'](_0x3bf68e)[_0x1c02fe(0x21a)]);this[_0x1c02fe(0x21a)]=_0x12546a+($gameSystem['windowPadding']()+this[_0x1c02fe(0x1d3)]())*0x2,this[_0x1c02fe(0x261)](),this[_0x1c02fe(0x327)]();const _0x5ce727=Math[_0x1c02fe(0x2f4)]((this[_0x1c02fe(0x1df)]-_0x12546a)/0x2);this['drawBackground'](),this['drawTextEx'](_0x3bf68e,_0x5ce727,0x0,_0x12546a);},Window_AutosaveConfirm[_0x525f01(0x1d9)]['getScreenPosition']=function(){const _0x513058=_0x525f01;return VisuMZ[_0x513058(0x334)]['Settings'][_0x513058(0x1ab)][_0x513058(0x32f)];},Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x261)]=function(){const _0x384964=_0x525f01,_0x240835=this[_0x384964(0x31d)]();if(_0x240835[_0x384964(0x1e0)](/upper/i)){if(_0x384964(0x2fd)!==_0x384964(0x325))this['y']=-0x1*$gameSystem['windowPadding']();else return _0x41d5a8[_0x384964(0x334)][_0x384964(0x205)][_0x384964(0x32b)](this);}else _0x240835[_0x384964(0x1e0)](/lower/i)?this['y']=Graphics[_0x384964(0x31c)]-this[_0x384964(0x31c)]+$gameSystem[_0x384964(0x2e8)]():_0x384964(0x218)!==_0x384964(0x257)?this['y']=(Graphics[_0x384964(0x31c)]-this[_0x384964(0x31c)])/0x2:_0x25ab6b[_0x384964(0x1d6)]['saveCurrentSlot']();if(_0x240835['match'](/left/i)){if(_0x384964(0x1ce)===_0x384964(0x1ce))this['x']=-0x1*$gameSystem[_0x384964(0x2e8)]();else return _0x58203e[_0x384964(0x334)][_0x384964(0x30a)][_0x384964(0x32b)](this,_0x199c73);}else _0x240835[_0x384964(0x1e0)](/right/i)?_0x384964(0x2b6)===_0x384964(0x2f0)?_0x475b0a['_saveCorePluginCommandSave']=_0x5404f7:this['x']=Graphics[_0x384964(0x21a)]-this[_0x384964(0x21a)]+$gameSystem[_0x384964(0x2e8)]():this['x']=(Graphics[_0x384964(0x21a)]-this['width'])/0x2;this['x']=Math[_0x384964(0x219)](this['x']),this['y']=Math[_0x384964(0x219)](this['y']);},Window_AutosaveConfirm[_0x525f01(0x1d9)]['update']=function(){const _0x2a17d3=_0x525f01;Window_Base[_0x2a17d3(0x1d9)][_0x2a17d3(0x274)][_0x2a17d3(0x32b)](this);if(this['_fadeSpeed']!==0x0)this['updateFade']();},Window_AutosaveConfirm[_0x525f01(0x1d9)]['updateFade']=function(){const _0x30edfb=_0x525f01;this[_0x30edfb(0x22d)]+=this['_fadeSpeed'];if(this[_0x30edfb(0x22d)]>=0xff||this[_0x30edfb(0x22d)]<=0x0)this['setFadeSpeed'](0x0);},Window_AutosaveConfirm['prototype']['setFadeSpeed']=function(_0xfed169){const _0x34a860=_0x525f01;this[_0x34a860(0x1c6)]=_0xfed169;},Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x284)]=function(){const _0x3ca194=_0x525f01;this[_0x3ca194(0x29a)](0x10);},Window_AutosaveConfirm[_0x525f01(0x1d9)][_0x525f01(0x31e)]=function(){const _0x567d49=_0x525f01;this[_0x567d49(0x29a)](-0x10);},VisuMZ['SaveCore'][_0x525f01(0x1d2)]=Window_SavefileList['prototype'][_0x525f01(0x2fe)],Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2fe)]=function(_0x54f55b,_0x310570){const _0x3d52f9=_0x525f01;if(StorageManager[_0x3d52f9(0x31b)]()===_0x3d52f9(0x2bd))_0x310570=![];if($gameTemp[_0x3d52f9(0x1d5)])_0x310570=![];VisuMZ[_0x3d52f9(0x334)][_0x3d52f9(0x1d2)]['call'](this,_0x54f55b,_0x310570);},Window_SavefileList['prototype'][_0x525f01(0x1f1)]=function(){const _0x2be76e=_0x525f01,_0x43aa26=VisuMZ[_0x2be76e(0x334)][_0x2be76e(0x224)][_0x2be76e(0x1db)],_0xbbd890=this[_0x2be76e(0x2cb)]();switch(_0xbbd890){case'vertical':return _0x43aa26[_0x2be76e(0x28c)];break;case'box':return _0x43aa26[_0x2be76e(0x222)];break;case _0x2be76e(0x2e9):return _0x43aa26[_0x2be76e(0x2a7)];break;default:return _0x43aa26[_0x2be76e(0x21f)];break;}},Window_SavefileList[_0x525f01(0x1d9)]['maxCols']=function(){const _0x530673=_0x525f01,_0xc7617f=VisuMZ[_0x530673(0x334)]['Settings'][_0x530673(0x1db)],_0x3ea144=this[_0x530673(0x2cb)]();switch(_0x3ea144){case _0x530673(0x2c8):return _0xc7617f['VertCols'];break;case _0x530673(0x231):return _0xc7617f[_0x530673(0x1e3)];break;case'large':return _0xc7617f[_0x530673(0x1c7)];break;default:return _0xc7617f[_0x530673(0x1a8)];break;}},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x1ae)]=function(){const _0x1e1055=_0x525f01;Imported['VisuMZ_1_MessageCore']&&Window_Selectable['prototype'][_0x1e1055(0x1ae)][_0x1e1055(0x32b)](this);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x270)]=function(_0x13b375){const _0x223233=_0x525f01;if(Imported['VisuMZ_1_MessageCore']){if(_0x223233(0x326)==='HZnHh')return Window_Selectable[_0x223233(0x1d9)][_0x223233(0x270)][_0x223233(0x32b)](this,_0x13b375);else{if(this[_0x223233(0x226)]===_0x9aea84)this[_0x223233(0x1cf)]();if(this[_0x223233(0x226)]['savePicture']===_0xbc425)this[_0x223233(0x1cf)]();return this[_0x223233(0x226)][_0x223233(0x227)];}}else return'xJAFQ'!==_0x223233(0x1b5)?'':![];},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x34d)]=function(){const _0x12bf97=_0x525f01;return VisuMZ[_0x12bf97(0x334)][_0x12bf97(0x224)]['ActorGraphic'];},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2cb)]=function(){const _0x366c61=_0x525f01;return VisuMZ[_0x366c61(0x334)][_0x366c61(0x224)][_0x366c61(0x2ae)];},Window_SavefileList[_0x525f01(0x1d9)]['selectSavefile']=function(_0x45dd96){const _0x139afd=_0x525f01,_0x582e3b=Math[_0x139afd(0x311)](0x0,this[_0x139afd(0x29d)](_0x45dd96));this[_0x139afd(0x278)](_0x582e3b);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2fb)]=function(_0x2e2ec6){const _0x26bc5c=_0x525f01,_0x1f52f9=this['indexToSavefileId'](_0x2e2ec6),_0x308745=DataManager[_0x26bc5c(0x352)](_0x1f52f9);if(_0x308745)_0x308745['savefileId']=_0x1f52f9;this[_0x26bc5c(0x2ff)]=_0x1f52f9;const _0x5359cc=this['itemRect'](_0x2e2ec6);this[_0x26bc5c(0x296)](),this[_0x26bc5c(0x21b)](this[_0x26bc5c(0x33f)](_0x1f52f9)),this[_0x26bc5c(0x230)](_0x308745,_0x5359cc);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2bf)]=function(_0xc99605,_0x2f41a5,_0x3ed59e){const _0x497cf0=_0x525f01;if(_0xc99605===0x0){if(_0x497cf0(0x2c7)===_0x497cf0(0x2c7))this[_0x497cf0(0x248)](TextManager[_0x497cf0(0x1f5)],_0x2f41a5,_0x3ed59e,0xb4);else return _0x3df293[_0x497cf0(0x233)];}else{if('KSMeA'!==_0x497cf0(0x2eb))this[_0x497cf0(0x248)](TextManager['file']+'\x20'+_0xc99605,_0x2f41a5,_0x3ed59e,0xb4);else{_0x3851a4[_0x497cf0(0x213)](),this[_0x497cf0(0x330)]=![];const _0x2ab085=_0x1595cf[_0x497cf0(0x31b)]();[_0x497cf0(0x281),_0x497cf0(0x23e)][_0x497cf0(0x2b9)](_0x2ab085)&&_0x2521aa['saveGame'](0x0)[_0x497cf0(0x2d1)](()=>this[_0x497cf0(0x336)]())[_0x497cf0(0x28e)](()=>this[_0x497cf0(0x2df)]());if([_0x497cf0(0x2bd),_0x497cf0(0x23e)][_0x497cf0(0x2b9)](_0x2ab085)){const _0x7d23e2=_0x39845f['savefileId']();_0x7d23e2>0x0&&_0x46149c['saveGame'](_0x7d23e2)[_0x497cf0(0x2d1)](()=>this[_0x497cf0(0x336)]())[_0x497cf0(0x28e)](()=>this[_0x497cf0(0x2df)]());}this[_0x497cf0(0x330)]=![];}}},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2f2)]=function(_0x4fb833,_0x22e74b,_0x3dd60c){const _0x537643=_0x525f01;if(_0x4fb833===0x0||DataManager['latestSavefileId']()!==_0x4fb833)return;const _0x592664=TextManager[_0x537643(0x264)];this[_0x537643(0x1b7)](ColorManager[_0x537643(0x1b4)]()),this['drawText'](_0x592664,_0x22e74b,_0x3dd60c,0xb4);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2cf)]=function(_0x150d79,_0x78661e,_0x1bab18,_0x59087f,_0x311e22){const _0x438876=_0x525f01;if(!_0x150d79[_0x438876(0x21e)])return;const _0x5927ac=this[_0x438876(0x34d)]();switch(_0x5927ac){case _0x438876(0x2a9):this['drawActorFaces'](_0x150d79,_0x78661e,_0x1bab18,_0x59087f,_0x311e22);break;case'sprite':this[_0x438876(0x1f9)](_0x150d79,_0x78661e,_0x1bab18,_0x59087f,_0x311e22);break;case _0x438876(0x2aa):this[_0x438876(0x260)](_0x150d79,_0x78661e,_0x1bab18,_0x59087f,_0x311e22);break;default:break;}},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x28a)]=function(_0x52644f,_0x124303,_0x437a96,_0xd59939,_0x3c198f){const _0x2e5461=_0x525f01;let _0x4d78cb=Math['max'](_0x52644f[_0x2e5461(0x23f)][_0x2e5461(0x2ce)],Scene_File[_0x2e5461(0x265)]);const _0x2f87ce=Math[_0x2e5461(0x22e)](ImageManager[_0x2e5461(0x211)],Math['floor'](_0xd59939/_0x4d78cb));_0x124303=_0x124303+Math[_0x2e5461(0x219)]((_0xd59939-_0x4d78cb*_0x2f87ce)/0x2);for(const _0x9f3c3f of _0x52644f[_0x2e5461(0x23f)]){this['drawFace'](_0x9f3c3f[0x0],_0x9f3c3f[0x1],_0x124303,_0x437a96+0x1,_0x2f87ce,_0x3c198f-0x2),_0x124303+=_0x2f87ce;}},ImageManager['saveMenuSpriteWidth']=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)][_0x525f01(0x1db)][_0x525f01(0x1e1)],ImageManager[_0x525f01(0x216)]=VisuMZ[_0x525f01(0x334)][_0x525f01(0x224)]['SaveMenu']['SvBattlerWidth'],Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x1f9)]=function(_0x202a20,_0x2459ba,_0x2d73dc,_0xaf55e,_0x5bf3f0){const _0x110629=_0x525f01;let _0x9192d3=Math[_0x110629(0x311)](_0x202a20[_0x110629(0x21e)]['length'],Scene_File['MAX_BATTLE_MEMBERS']);const _0x269330=ImageManager[_0x110629(0x340)];_0x2459ba=_0x2459ba+Math[_0x110629(0x219)]((_0xaf55e-_0x9192d3*_0x269330)/0x2)+_0x269330/0x2,_0x2d73dc=_0x2d73dc+_0x5bf3f0-0x8;for(const _0x5084e6 of _0x202a20[_0x110629(0x21e)]){if(_0x110629(0x1c2)===_0x110629(0x2b3)){if(!this[_0x110629(0x1bc)]())return this['closeAutosaveConfirmationWindow'](_0x25152c);if(!this[_0x110629(0x1c5)])this[_0x110629(0x1a7)]();const _0x5f98fe=this[_0x110629(0x1c5)];this[_0x110629(0x33e)](_0x5f98fe),this[_0x110629(0x1dd)](_0x5f98fe),_0x5f98fe[_0x110629(0x201)](_0x43fd8e),_0x5f98fe['fadeIn']();const _0x137dbd=_0xfed756[_0x110629(0x334)]['Settings'][_0x110629(0x34f)][_0x110629(0x333)];_0x25dc4e(this[_0x110629(0x269)][_0x110629(0x2bb)](this,_0x52008a),_0x137dbd);}else this[_0x110629(0x2fa)](_0x5084e6[0x0],_0x5084e6[0x1],_0x2459ba,_0x2d73dc),_0x2459ba+=_0x269330;}},Window_SavefileList['prototype'][_0x525f01(0x260)]=function(_0x390246,_0x2a8627,_0x5d8510,_0xf6c832,_0x1b4e94){const _0x5a9003=_0x525f01;if(!_0x390246[_0x5a9003(0x343)])return this[_0x5a9003(0x1f9)](_0x390246,_0x2a8627,_0x5d8510,_0xf6c832,_0x1b4e94);let _0x265729=Math[_0x5a9003(0x311)](_0x390246['svbattlers'][_0x5a9003(0x2ce)],Scene_File[_0x5a9003(0x265)]);const _0x3b5103=ImageManager[_0x5a9003(0x216)];_0x2a8627=_0x2a8627+Math[_0x5a9003(0x219)]((_0xf6c832-_0x265729*_0x3b5103)/0x2)+_0x3b5103/0x2,_0x5d8510=_0x5d8510+_0x1b4e94-0x8;for(const _0x13df74 of _0x390246['svbattlers']){this[_0x5a9003(0x1fe)](_0x13df74,_0x2a8627,_0x5d8510),_0x2a8627+=_0x3b5103;}},Window_SavefileList['prototype'][_0x525f01(0x237)]=function(_0x1fbc31,_0x1cb272,_0x2e4d86,_0x478a06,_0x3153f1,_0x1a60f2){const _0x3e8d08=_0x525f01;if(_0x1fbc31==='')return;_0x1cb272+=0x2,_0x2e4d86+=0x2,_0x478a06-=0x4,_0x3153f1-=0x4;const _0x4b4e56=ImageManager[_0x3e8d08(0x342)](_0x1fbc31),_0x3332f9=_0x4b4e56[_0x3e8d08(0x21a)],_0x29bf8f=_0x4b4e56[_0x3e8d08(0x31c)],_0x25a217=Math[_0x3e8d08(0x22e)](_0x478a06/_0x3332f9,_0x3153f1/_0x29bf8f,_0x1a60f2?0x1:0x3e8),_0x4832aa=Math[_0x3e8d08(0x344)](_0x4b4e56['width']*_0x25a217),_0x3801c0=Math['ceil'](_0x4b4e56[_0x3e8d08(0x31c)]*_0x25a217);this[_0x3e8d08(0x335)]['blt'](_0x4b4e56,0x0,0x0,_0x3332f9,_0x29bf8f,_0x1cb272,_0x2e4d86,_0x4832aa,_0x3801c0);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x33b)]=function(_0x48c08c,_0x3a144d,_0x5bcfaa,_0x163e27,_0x58c9ad,_0x1cd45b){const _0x3f1b7b=_0x525f01;if(_0x48c08c==='')return;_0x3a144d+=0x2,_0x5bcfaa+=0x2,_0x163e27-=0x4,_0x58c9ad-=0x4;const _0x2c7563=ImageManager[_0x3f1b7b(0x342)](_0x48c08c),_0x154203=_0x2c7563[_0x3f1b7b(0x21a)],_0x5e4d51=_0x2c7563['height'],_0x49a657=Math[_0x3f1b7b(0x22e)](_0x163e27/_0x154203,_0x58c9ad/_0x5e4d51,_0x1cd45b?0x1:0x3e8),_0x1eef44=Math[_0x3f1b7b(0x344)](_0x2c7563['width']*_0x49a657),_0x272f6a=Math[_0x3f1b7b(0x344)](_0x2c7563[_0x3f1b7b(0x31c)]*_0x49a657);_0x3a144d+=(_0x163e27-_0x1eef44)/0x2,_0x5bcfaa+=(_0x58c9ad-_0x272f6a)/0x2,this[_0x3f1b7b(0x335)][_0x3f1b7b(0x25a)](_0x2c7563,0x0,0x0,_0x154203,_0x5e4d51,_0x3a144d,_0x5bcfaa,_0x1eef44,_0x272f6a);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x1ec)]=function(_0x260793,_0x4058d5,_0x29c5de,_0x291d9c,_0x256acd){const _0x336b08=_0x525f01;_0x260793[_0x336b08(0x2af)]&&('UhfsD'==='BGQWC'?(_0x1b635f[_0x336b08(0x28f)](),_0x480d40[_0x336b08(0x1d5)]=!![],this['_commandWindow']['close'](),_0xdd82b1[_0x336b08(0x2de)](_0x1646df)):(_0x256acd=_0x256acd||_0x336b08(0x2b7),this[_0x336b08(0x248)](_0x260793['playtime'],_0x4058d5,_0x29c5de,_0x291d9c,_0x256acd)));},Window_SavefileList['prototype'][_0x525f01(0x290)]=function(_0x1e68b0,_0x106510,_0x403122,_0x321c91,_0x104ba5){const _0x1a44e6=_0x525f01;if(_0x1e68b0[_0x1a44e6(0x1de)]){_0x104ba5=_0x104ba5||'left';let _0x3b0cf1=this[_0x1a44e6(0x2a1)](_0x1e68b0);if(Imported[_0x1a44e6(0x1e9)]&&this[_0x1a44e6(0x30b)]()){if(_0x1a44e6(0x28d)!==_0x1a44e6(0x28d)){const _0x42f725=this[_0x1a44e6(0x294)](_0x415592),_0x15bf9a=_0x25e05d[_0x1a44e6(0x352)](_0x42f725);if(_0x15bf9a)_0x15bf9a[_0x1a44e6(0x2c3)]=_0x42f725;this[_0x1a44e6(0x2ff)]=_0x42f725;const _0xce49a7=this[_0x1a44e6(0x2f6)](_0x3721b4);this[_0x1a44e6(0x296)](),this['changePaintOpacity'](this[_0x1a44e6(0x33f)](_0x42f725)),this[_0x1a44e6(0x230)](_0x15bf9a,_0xce49a7);}else _0x3b0cf1=_0x1a44e6(0x300)[_0x1a44e6(0x279)](_0x3b0cf1);}this[_0x1a44e6(0x248)](_0x3b0cf1,_0x106510,_0x403122,_0x321c91,_0x104ba5);}},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2a1)]=function(_0x848dbb){const _0x4f188a=_0x525f01,_0x5da405=_0x848dbb['timestamp'],_0x50a132=new Date(_0x5da405);let _0x4fbbcb=_0x4f188a(0x22b);_0x4fbbcb=_0x4fbbcb[_0x4f188a(0x1c4)](/\[YEAR\]/gi,'%1'),_0x4fbbcb=_0x4fbbcb[_0x4f188a(0x1c4)](/\[MONTH\]/gi,'%2'),_0x4fbbcb=_0x4fbbcb[_0x4f188a(0x1c4)](/\[DATE\]/gi,'%3'),_0x4fbbcb=_0x4fbbcb[_0x4f188a(0x1c4)](/\[HOUR\]/gi,'%4'),_0x4fbbcb=_0x4fbbcb['replace'](/\[MINUTE\]/gi,'%5'),_0x4fbbcb=_0x4fbbcb[_0x4f188a(0x1c4)](/\[SECOND\]/gi,'%6');let _0x113ebe=String(_0x50a132[_0x4f188a(0x20c)]())[_0x4f188a(0x319)]('')['join']('​'),_0x5c3c7a=String(_0x50a132[_0x4f188a(0x286)]()+0x1),_0x450e3e=String(_0x50a132['getDate']())[_0x4f188a(0x2e7)](0x2,'0'),_0x5741e2=String(_0x50a132[_0x4f188a(0x282)]())['padStart'](0x2,'0'),_0xb2cc08=String(_0x50a132[_0x4f188a(0x26d)]())['padStart'](0x2,'0'),_0x4f8fba=String(_0x50a132['getSeconds']())[_0x4f188a(0x2e7)](0x2,'0'),_0x531032=_0x4fbbcb[_0x4f188a(0x279)](_0x113ebe,_0x5c3c7a,_0x450e3e,_0x5741e2,_0xb2cc08,_0x4f8fba);return _0x531032;},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2e0)]=function(_0x3cd76b,_0x21fab5,_0x344bce,_0x2bf697){const _0x1d070c=_0x525f01;if(_0x3cd76b[_0x1d070c(0x223)]===undefined)return;const _0x3e9b7c=_0x3cd76b[_0x1d070c(0x223)],_0x4fa61e=TextManager[_0x1d070c(0x34a)];Window_SavefileList[_0x1d070c(0x1d9)][_0x1d070c(0x2d0)][_0x1d070c(0x32b)](this,_0x3e9b7c,_0x4fa61e,_0x21fab5,_0x344bce,_0x2bf697);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x31a)]=function(_0x1a76e7,_0xf7840a,_0x1ac6c3,_0x393bfa,_0x412138){const _0x2f8b69=_0x525f01;if(_0x1a76e7[_0x2f8b69(0x288)]){const _0x22e8d0=this['textSizeEx'](_0x1a76e7[_0x2f8b69(0x288)])[_0x2f8b69(0x21a)];_0x412138=_0x412138||_0x2f8b69(0x2b7);if(_0x412138===_0x2f8b69(0x307))_0xf7840a=_0xf7840a+_0x393bfa-_0x22e8d0;else _0x412138===_0x2f8b69(0x21d)&&(_0xf7840a=_0xf7840a+(_0x393bfa-_0x22e8d0)/0x2);this['drawTextEx'](_0x1a76e7[_0x2f8b69(0x288)],_0xf7840a,_0x1ac6c3,_0x393bfa);}},Window_SavefileList['prototype'][_0x525f01(0x230)]=function(_0x1fd29b,_0x8a60b6){const _0x1abb3f=_0x525f01;if(_0x1fd29b){if(_0x1abb3f(0x314)!=='IMmET'){if(!_0x188c7b[_0x1abb3f(0x1f5)])return;this[_0x1abb3f(0x1e4)]();}else{const _0x28684e=ImageManager[_0x1abb3f(0x342)](_0x1fd29b[_0x1abb3f(0x323)]||'');_0x28684e[_0x1abb3f(0x341)](this['drawContentsLoaded'][_0x1abb3f(0x2bb)](this,_0x1fd29b,_0x8a60b6));}}else{if('RilFf'!==_0x1abb3f(0x263))return _0x3d7470['isNwjs']()?_0x1f6c89[_0x1abb3f(0x334)][_0x1abb3f(0x224)][_0x1abb3f(0x245)][_0x1abb3f(0x293)]:![];else this[_0x1abb3f(0x207)](this[_0x1abb3f(0x2ff)],_0x8a60b6);}},Window_SavefileList[_0x525f01(0x1d9)]['drawContentsLoaded']=function(_0x4e101c,_0x5f45ae){const _0x23da01=_0x525f01,_0x2d6be8=this[_0x23da01(0x2cb)]();switch(_0x2d6be8){case _0x23da01(0x2c8):this['drawVerticalStyleContents'](_0x4e101c,_0x5f45ae);break;case'box':this[_0x23da01(0x303)](_0x4e101c,_0x5f45ae);break;case'large':this[_0x23da01(0x30e)](_0x4e101c,_0x5f45ae);break;default:this[_0x23da01(0x272)](_0x4e101c,_0x5f45ae);break;}this[_0x23da01(0x296)]();const _0xe6e3cd=_0x4e101c[_0x23da01(0x2c3)];this['drawFileData'](_0xe6e3cd,_0x5f45ae);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x207)]=function(_0x514a10,_0x5eb436){const _0x2d5057=_0x525f01,_0x1f7050=this['menuStyle']();switch(_0x1f7050){case _0x2d5057(0x2c8):this['drawVerticalStyleFileData'](_0x514a10,_0x5eb436);break;case _0x2d5057(0x231):this['drawBoxStyleFileData'](_0x514a10,_0x5eb436);break;case'large':this[_0x2d5057(0x347)](_0x514a10,_0x5eb436);break;default:this[_0x2d5057(0x2a4)](_0x514a10,_0x5eb436);break;}},Window_SavefileList['prototype']['drawListStyleContents']=function(_0x1844d5,_0x8da2d3){const _0x3571b2=_0x525f01;VisuMZ[_0x3571b2(0x334)][_0x3571b2(0x224)][_0x3571b2(0x1db)][_0x3571b2(0x313)]['call'](this,_0x1844d5,_0x8da2d3);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2d4)]=function(_0xe6b75f,_0x41164d){const _0x3b5fe6=_0x525f01;VisuMZ[_0x3b5fe6(0x334)]['Settings'][_0x3b5fe6(0x1db)][_0x3b5fe6(0x27b)][_0x3b5fe6(0x32b)](this,_0xe6b75f,_0x41164d);},Window_SavefileList['prototype'][_0x525f01(0x303)]=function(_0x265a9c,_0x1465c1){const _0x329313=_0x525f01;VisuMZ['SaveCore'][_0x329313(0x224)][_0x329313(0x1db)][_0x329313(0x239)][_0x329313(0x32b)](this,_0x265a9c,_0x1465c1);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x30e)]=function(_0x189cfd,_0x36dd5c){const _0x48200c=_0x525f01;VisuMZ['SaveCore'][_0x48200c(0x224)]['SaveMenu'][_0x48200c(0x234)][_0x48200c(0x32b)](this,_0x189cfd,_0x36dd5c);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x2a4)]=function(_0x1853e7,_0x4a9bf7){const _0x5e2bfd=_0x525f01;VisuMZ[_0x5e2bfd(0x334)]['Settings'][_0x5e2bfd(0x1db)]['ListFileDataJS'][_0x5e2bfd(0x32b)](this,_0x1853e7,_0x4a9bf7);},Window_SavefileList['prototype'][_0x525f01(0x256)]=function(_0x4a87b9,_0x26d257){const _0x35b485=_0x525f01;VisuMZ[_0x35b485(0x334)]['Settings'][_0x35b485(0x1db)]['VertFileDataJS'][_0x35b485(0x32b)](this,_0x4a87b9,_0x26d257);},Window_SavefileList[_0x525f01(0x1d9)][_0x525f01(0x1aa)]=function(_0x191de9,_0x3b04a1){const _0x1a1c02=_0x525f01;VisuMZ['SaveCore'][_0x1a1c02(0x224)][_0x1a1c02(0x1db)][_0x1a1c02(0x1eb)][_0x1a1c02(0x32b)](this,_0x191de9,_0x3b04a1);},Window_SavefileList['prototype'][_0x525f01(0x347)]=function(_0x2c61dc,_0x5bfb8d){const _0x4bc867=_0x525f01;VisuMZ[_0x4bc867(0x334)][_0x4bc867(0x224)][_0x4bc867(0x1db)][_0x4bc867(0x26b)][_0x4bc867(0x32b)](this,_0x2c61dc,_0x5bfb8d);};