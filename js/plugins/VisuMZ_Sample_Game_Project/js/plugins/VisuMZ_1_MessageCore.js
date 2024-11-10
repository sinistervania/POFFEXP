//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.32;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.32] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x224d35=_0x2cd8;function _0x45e7(){const _0x32edd3=['processPyTextCode','adjustShowChoiceExtension','processPreviousColor','addExtraShowChoices','process_VisuMZ_MessageCore_TextCodes_Replace','getLastGainedItemData','Default','Window_Message_updatePlacement','ParseWeaponNotetags','Game_Party_initialize','PICTURE','</LEFT>','TightWrap','name','updateMessageCommonEvents','innerHeight','Type','addWrapBreakAfterPunctuation','itemHeight','MaxCols','outputWidth','fontItalic','Window_Message_processEscapeCharacter','battle\x20actor','Skills','close','messageWindowRect','setChoiceListMaxRows','obtainItem','calcWindowHeight','textColor','default','_messagePositionReset','setupChoices','convertTextMacros','flushTextState','Window_Base_update','_moveEasingType','isChoiceEnabled','onNewPageMessageCore','OffsetX','loadPicture','</RIGHT>','isRTL','exec','getChoiceListTextAlign','FontSmallerCap','processDrawPicture','drawItem','MessageRows','preemptive','AdjustRect','registerActorNameAutoColorChanges','lineHeight','type','fontSize','PREVCOLOR','max','outlineColor','choice','iconIndex','ParseAllNotetags','isHelpWindowWordWrap','FontBiggerCap','_relativePosition','height','_textColorStack','round','event','inputtingAction','battle\x20party','9140HVmQmn','setChoiceListMaxColumns','LineHeight','prepareWordWrapEscapeCharacters','adjustShowChoiceCancel','Window_ChoiceList_windowX','setMessageWindowXyOffsets','Window_Options_statusText','postConvertEscapeCharacters','<WORDWRAP>','_textDelayCount','innerWidth','updateXyOffsets','setMessageWindowRows','Game_Interpreter_setupChoices','\x1bCOLORLOCK[0]','code','ParseArmorNotetags','updateRelativePosition','postFlushTextState','gainItem','_lastGainedItemData','<I>','filter','choiceRows','setupItemChoice','textSpeed','getChoiceListMaxRows','AutoColor','\x1bC[%1]%2\x1bPREVCOLOR[0]','push','setWordWrap','Instant','textCodeCheck','setWaitMode','_messageOffsetY','_resetRect','Window_Message_synchronizeNameBox','Window_Base_processAllText','update','test','setTextAlignment','actor','getConfigValue','startWait','value','windowPadding','RelativePXPY','status','isContinuePrepareShowTextCommands','Items','ITALIC','messageCoreTextSpeed','_messageOffsetX','updatePlacement','description','levelUp','textCodeResult','_autoPosRegExp','newPage','DefaultOutlineWidth','colSpacing','806175kPCUIZ','getPreservedFontSettings','makeDeepCopy','_autoPositionTarget','text','unshift','Window_Message_terminateMessage','ANY','setMessageWindowWidth','processDrawCenteredPicture','updateEvents','processPxTextCode','convertMessageCoreEscapeActions','372668QoHVCG','\x1bCOLORLOCK[1]','CreateAutoColorRegExpListEntries','preFlushTextState','Window_Base_initialize','textSizeExWordWrap','escapeStart','setTextDelay','activate','ParseStateNotetags','convertEscapeCharacters','NameBoxWindowOffsetY','setRelativePosition','AutoColorRegExp','contentsHeight','faceName','</WORDWRAP>','processEscapeCharacter','35924CIBodq','processCommonEvent','makeFontSmaller','processAllText','_wholeMoveDuration','_messageCommonEvents','none','SWITCHES','slice','addCommand','registerResetRect','clearFlags','CreateAutoColorFor','itemRectWithPadding','Scene_Boot_onDatabaseLoaded','match','Enemies','follower','maxCommands','processMessageCoreEscapeActions','NameBoxWindowOffsetX','registerCommand','setFaceImage','easeIn','setChoiceListTextAlign','Armors','isBreakShowTextCommands','setLastGainedItemData','1320600GTJOkX','ARRAYSTRUCT','Scene_Options_maxCommands','convertMessageCoreEscapeReplacements','updateTransform','drawBackCenteredPicture','textSizeEx','_list','ChoiceWindowMaxRows','processColorLock','messageWordWrap','Window_Help_refresh','isColorLocked','Window_Base_processControlCharacter','MsgWindowOffsetX','130iSqCfJ','Window_Options_changeVolume','addLoadListener','addedHeight','\x1bBOLD[0]','placeCancelButton','obtainEscapeParam','setupEvents','outlineWidth','min','resetWordWrap','indexOf','isPressed','MessageWindowProperties','JSON','FUNC','launchMessageCommonEvent','WAIT','Window_NameBox_refresh','_macroBypassWordWrap','map\x20player','getChoiceListMaxColumns','_positionType','blt','trim','Actors','scale','inBattle','TextManager_message','processNewLine','windowWidth','substr','TextColor','changeTextColor','processControlCharacter','statusText','true','_moveTargetWidth','_moveTargetY','ConfigManager_makeData','_textAlignment','maxLines','isVolumeSymbol','changeVolume','_colorLock','synchronizeNameBox','isSceneBattle','ceil','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_commonEventId','_subject','\x1bTEXTALIGNMENT[0]','Window_Message_isTriggered','Window_Base_changeTextColor','STRUCT','processAutoColorWords','surprise','processFontChangeBold','ARRAYFUNC','changeTextSpeed','</I>','processFontChangeItalic','CENTERPICTURE','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Window_Options_isVolumeSymbol','refresh','command101','getMessageWindowRows','convertVariableEscapeCharacters','_centerMessageWindow','numVisibleRows','clearActorNameAutoColor','makeCommandList','process_VisuMZ_MessageCore_AutoColor','parameters','createContents','WordWrap','drawTextEx','onChoice','ChoiceWindowProperties','addMessageCommonEvent','<%1>','makeData','messageWidth','updateMove','drawBackPicture','<CENTER>','processStoredAutoColorChanges','_forcedPosition','defeat','updateAutoSizePosition','map\x20event','MsgWindowOffsetY','_moveDuration','prepareAutoSizeEscapeCharacters','\x1bBOLD[1]','isWordWrapEnabled','ParseEnemyNotetags','mainFontFace','Width','ChoiceWindowLineHeight','TextStr','COLORLOCK','convertChoiceMacros','convertHardcodedEscapeReplacements','AddOption','initMessageCore','remove','TextCodeReplace','call','_interpreter','Window_NameBox_updatePlacement','lastGainedObjectQuantity','33870EizxQI','convertFontSettingsEscapeCharacters','SHOW','convertNewPageTextStateMacros','parse','followers','emerge','FontChangeValue','process_VisuMZ_MessageCore_TextMacros','addedWidth','splice','refreshDimmerBitmap','</B>','choiceCols','maxCols','battle\x20enemy','length','isBusy','replace','Settings','processActorNameAutoColorChanges','constructor','clampPlacementPosition','setHelpWindowWordWrap','MessageCore','_cancelButton','applyMoveEasing','convertBackslashCharacters','Undefined','map\x20actor','applyDatabaseAutoColor','_texts','clear','canMove','selectDefault','Game_Map_updateEvents','resetTextColor','updateOffsetPosition','_index','clearCommandList','isWeapon','ConvertTextAutoColorRegExpFriendly','rtl','helpWordWrap','shift','members','boxWidth','isAutoColorAffected','moveTo','join','ARRAYEVAL','_moveTargetX','prototype','_eventId','Classes','right','center','easeInOut','sort','Window_Message_newPage','EVAL','addContinuousShowTextCommands','_autoSizeRegexp','\x1bTEXTALIGNMENT','process_VisuMZ_MessageCore_TextCodes_Action','toLowerCase','textSizeExTextAlignment','fontBold','130tPkxpK','\x1bITALIC[0]','isSceneMap','TextCodeActions','processFsTextCode','addGeneralOptions','TextAlign','drawing','processAutoSize','ConvertParams','MessageWindowXyOffsets','getTextAlignment','list','registerSelfEvent','maxFontSizeInLine','initialize','_textDelay','MaxRows','Weapons','convertBaseEscapeCharacters','applyData','_textMacroFound','Game_Party_gainItem','false','messagePositionReset','choiceLineHeight','changePaintOpacity','choices','getMessageWindowWidth','instantTextSpeed','Game_System_initialize','includes','ARRAYNUM','COMMONEVENT','AddAutoColor','_wordWrap','WRAPBREAK','_messageWindow','<LINE\x20BREAK>','item','isChoiceVisible','ALL','split','left','obtainGold','<LEFT>','version','updateAutoPosition','map','startY','ENABLE','obtainEscapeString','General','stretchDimmerSprite','\x1bi[%1]%2','_spriteset','2960vmezzi','substring','9860072ZSzrhE','TextMacros','</CENTER>','[0]','updateForcedPlacement','setColorLock','isInputting','_scene','nextEventCode','toUpperCase','battleActionName','<COLORLOCK>','processWrapBreak','callOkHandler','calcMoveEasing','convertLockColorsEscapeCharacters','_MessageCoreSettings','isMessageWindowWordWrap','message','_moveTargetHeight','_nameBoxWindow','returnPreservedFontSettings','VisuMZ_1_EventsMoveCore','resetFontSettings','WORD_WRAP_PADDING','messageRows','SortObjectByKeyLength','FastForwardKey','processTextAlignmentChange','setSpeakerName','paintOpacity','faceWidth','addMessageCoreCommands','prepareShowTextFollowups','adjustShowChoiceDefault','parseChoiceText','_action','ParseItemNotetags','updateDimensions','padding','TextJS','makeFontBigger','NameBoxWindowDefaultColor','Match','Window_Options_addGeneralOptions','convertShowChoiceEscapeCodes','width','clamp','startX','normalColor','AutoColorBypassList','currentCommand','choicePositionType','index','preConvertEscapeCharacters','\x1bI[%1]','map\x20party','return\x20\x27','mainFontSize','TextSpeed','<BR>','getChoiceListLineHeight','processTextAlignmentX','ParseClassNotetags','lastGainedObjectName','bind','itemPadding','onProcessCharacter','Game_Map_setupEvents','addMessageCoreTextSpeedCommand','format','MessageWidth','_dimmerSprite','initTextAlignement','setChoiceListLineHeight','textWidth','databaseObjectName','contentsBack','ParseSkillNotetags','contents','battleUserName','prepareForcedPositionEscapeCharacters','outputHeight','resetRect','battleTargetName','findTargetSprite','processAutoPosition','quantity','addContinuousShowChoices','windowX','resetPositionX','choiceTextAlign','_autoColorActorNames','changeValue','ActionJS','_targets','_target','prepareShowTextCommand','messageCoreWindowX','indent','\x1bTEXTALIGNMENT[3]','moveBy','textSpeedStatusText','maxChoiceWidth','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','EndPadding','ParseAddedText','getMessageWindowXyOffsets','setup','onDatabaseLoaded','Window_Base_processEscapeCharacter','currencyUnit','Window_Message_clearFlags','CreateAutoColorRegExpLists','actorName','_autoSizeCheck','States','floor','Window_ChoiceList_updatePlacement','setPositionType',')))','isCommandEnabled','terminateMessage','<B>','boxHeight','open'];_0x45e7=function(){return _0x32edd3;};return _0x45e7();}(function(_0x15ce6e,_0x479b84){const _0x2565ad=_0x2cd8,_0x33b2b6=_0x15ce6e();while(!![]){try{const _0x4b41f2=parseInt(_0x2565ad(0x2be))/0x1+parseInt(_0x2565ad(0x2fb))/0x2*(-parseInt(_0x2565ad(0x36c))/0x3)+-parseInt(_0x2565ad(0x3e8))/0x4*(-parseInt(_0x2565ad(0x273))/0x5)+-parseInt(_0x2565ad(0x2ec))/0x6+-parseInt(_0x2565ad(0x2d0))/0x7+-parseInt(_0x2565ad(0x3ea))/0x8+parseInt(_0x2565ad(0x2b1))/0x9*(parseInt(_0x2565ad(0x3b0))/0xa);if(_0x4b41f2===_0x479b84)break;else _0x33b2b6['push'](_0x33b2b6['shift']());}catch(_0x4d92a1){_0x33b2b6['push'](_0x33b2b6['shift']());}}}(_0x45e7,0xaa7a0));var label=_0x224d35(0x384),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x224d35(0x28a)](function(_0x138286){const _0x57666a=_0x224d35;return _0x138286[_0x57666a(0x2a3)]&&_0x138286['description'][_0x57666a(0x3cf)]('['+label+']');})[0x0];function _0x2cd8(_0x5ca0c3,_0x309e68){const _0x45e7b7=_0x45e7();return _0x2cd8=function(_0x2cd886,_0x5ec02d){_0x2cd886=_0x2cd886-0x1c0;let _0xed71cd=_0x45e7b7[_0x2cd886];return _0xed71cd;},_0x2cd8(_0x5ca0c3,_0x309e68);}VisuMZ[label][_0x224d35(0x37f)]=VisuMZ[label][_0x224d35(0x37f)]||{},VisuMZ[_0x224d35(0x3b9)]=function(_0x1e244a,_0x5bac20){const _0x330bb3=_0x224d35;for(const _0xa25054 in _0x5bac20){if(_0xa25054[_0x330bb3(0x2df)](/(.*):(.*)/i)){const _0xbffcb1=String(RegExp['$1']),_0x390203=String(RegExp['$2'])[_0x330bb3(0x3f3)]()['trim']();let _0x38cb09,_0x19e9ad,_0x1f0f04;switch(_0x390203){case'NUM':_0x38cb09=_0x5bac20[_0xa25054]!==''?Number(_0x5bac20[_0xa25054]):0x0;break;case _0x330bb3(0x3d0):_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON['parse'](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad['map'](_0x19150f=>Number(_0x19150f));break;case _0x330bb3(0x3a8):_0x38cb09=_0x5bac20[_0xa25054]!==''?eval(_0x5bac20[_0xa25054]):null;break;case _0x330bb3(0x39e):_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad[_0x330bb3(0x3e0)](_0x55fa27=>eval(_0x55fa27));break;case _0x330bb3(0x309):_0x38cb09=_0x5bac20[_0xa25054]!==''?JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054]):'';break;case'ARRAYJSON':_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad['map'](_0x2c7730=>JSON['parse'](_0x2c7730));break;case _0x330bb3(0x30a):_0x38cb09=_0x5bac20[_0xa25054]!==''?new Function(JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054])):new Function('return\x200');break;case _0x330bb3(0x335):_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad['map'](_0x4ef732=>new Function(JSON['parse'](_0x4ef732)));break;case'STR':_0x38cb09=_0x5bac20[_0xa25054]!==''?String(_0x5bac20[_0xa25054]):'';break;case'ARRAYSTR':_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON[_0x330bb3(0x370)](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad[_0x330bb3(0x3e0)](_0x5f0f92=>String(_0x5f0f92));break;case _0x330bb3(0x331):_0x1f0f04=_0x5bac20[_0xa25054]!==''?JSON['parse'](_0x5bac20[_0xa25054]):{},_0x1e244a[_0xbffcb1]={},VisuMZ[_0x330bb3(0x3b9)](_0x1e244a[_0xbffcb1],_0x1f0f04);continue;case _0x330bb3(0x2ed):_0x19e9ad=_0x5bac20[_0xa25054]!==''?JSON['parse'](_0x5bac20[_0xa25054]):[],_0x38cb09=_0x19e9ad[_0x330bb3(0x3e0)](_0xd20a46=>VisuMZ[_0x330bb3(0x3b9)]({},JSON[_0x330bb3(0x370)](_0xd20a46)));break;default:continue;}_0x1e244a[_0xbffcb1]=_0x38cb09;}}return _0x1e244a;},(_0x270bac=>{const _0x42963e=_0x224d35,_0x2110b4=_0x270bac['name'];for(const _0x183d31 of dependencies){if(!Imported[_0x183d31]){alert(_0x42963e(0x216)[_0x42963e(0x1f4)](_0x2110b4,_0x183d31)),SceneManager['exit']();break;}}const _0x245894=_0x270bac[_0x42963e(0x2aa)];if(_0x245894['match'](/\[Version[ ](.*?)\]/i)){const _0x5ec1db=Number(RegExp['$1']);_0x5ec1db!==VisuMZ[label][_0x42963e(0x3de)]&&(alert(_0x42963e(0x32b)['format'](_0x2110b4,_0x5ec1db)),SceneManager['exit']());}if(_0x245894['match'](/\[Tier[ ](\d+)\]/i)){const _0x4beddc=Number(RegExp['$1']);_0x4beddc<tier?(alert(_0x42963e(0x33a)[_0x42963e(0x1f4)](_0x2110b4,_0x4beddc,tier)),SceneManager['exit']()):tier=Math[_0x42963e(0x265)](_0x4beddc,tier);}VisuMZ[_0x42963e(0x3b9)](VisuMZ[label][_0x42963e(0x37f)],_0x270bac[_0x42963e(0x345)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x224d35(0x239)],_0x224d35(0x34a),_0x38d881=>{const _0x1d655e=_0x224d35;VisuMZ[_0x1d655e(0x3b9)](_0x38d881,_0x38d881);const _0x2eb8bb=_0x38d881[_0x1d655e(0x275)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x37fc9d=_0x38d881[_0x1d655e(0x3c1)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x2d7ade=_0x38d881[_0x1d655e(0x23f)]||$gameSystem[_0x1d655e(0x310)]()||0x1,_0xebcc90=_0x38d881[_0x1d655e(0x3b6)]['toLowerCase']()||_0x1d655e(0x24b);$gameSystem[_0x1d655e(0x1f8)](_0x2eb8bb),$gameSystem['setChoiceListMaxRows'](_0x37fc9d),$gameSystem[_0x1d655e(0x274)](_0x2d7ade),$gameSystem['setChoiceListTextAlign'](_0xebcc90);}),PluginManager[_0x224d35(0x2e5)](pluginData['name'],_0x224d35(0x308),_0x566f93=>{const _0x5f2ffd=_0x224d35;VisuMZ[_0x5f2ffd(0x3b9)](_0x566f93,_0x566f93);const _0x927e73=_0x566f93['Rows']||$gameSystem['getMessageWindowRows']()||0x1,_0x3c41c5=_0x566f93[_0x5f2ffd(0x35e)]||$gameSystem[_0x5f2ffd(0x3cc)]()||0x1;$gameTemp[_0x5f2ffd(0x340)]=!![];const _0xa4b9b4=_0x566f93[_0x5f2ffd(0x347)][_0x5f2ffd(0x3ad)]();$gameSystem[_0x5f2ffd(0x280)](_0x927e73),$gameSystem[_0x5f2ffd(0x2b9)](_0x3c41c5);[_0x5f2ffd(0x31f),_0x5f2ffd(0x3c7)][_0x5f2ffd(0x3cf)](_0xa4b9b4)&&$gameSystem['setMessageWindowWordWrap'](eval(_0xa4b9b4));const _0x42aed4=SceneManager[_0x5f2ffd(0x3f1)][_0x5f2ffd(0x3d5)];_0x42aed4&&(_0x42aed4['resetWordWrap'](),_0x42aed4['updateDimensions'](),_0x42aed4['createContents']());}),PluginManager[_0x224d35(0x2e5)](pluginData[_0x224d35(0x239)],_0x224d35(0x3ba),_0x4f942c=>{const _0x82c1ff=_0x224d35;VisuMZ[_0x82c1ff(0x3b9)](_0x4f942c,_0x4f942c),$gameSystem[_0x82c1ff(0x279)](_0x4f942c[_0x82c1ff(0x254)],_0x4f942c['OffsetY']);const _0x3d596d=SceneManager[_0x82c1ff(0x3f1)][_0x82c1ff(0x3d5)];_0x3d596d&&(_0x3d596d['resetWordWrap'](),_0x3d596d[_0x82c1ff(0x1d4)](),_0x3d596d['createContents']());}),VisuMZ['MessageCore'][_0x224d35(0x2de)]=Scene_Boot[_0x224d35(0x3a0)]['onDatabaseLoaded'],Scene_Boot[_0x224d35(0x3a0)][_0x224d35(0x21b)]=function(){const _0x10b708=_0x224d35;VisuMZ[_0x10b708(0x384)][_0x10b708(0x2de)][_0x10b708(0x368)](this),this[_0x10b708(0x3ac)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x10b708(0x374)](),this[_0x10b708(0x344)]();},VisuMZ[_0x224d35(0x384)]['SortObjectByKeyLength']=function(_0x5157dd){const _0x1079d2=_0x224d35,_0x4ef020=VisuMZ[_0x1079d2(0x384)]['Settings'][_0x5157dd];_0x4ef020[_0x1079d2(0x3a6)]((_0x211eb1,_0x34684a)=>{const _0x5e5a31=_0x1079d2;if(!_0x211eb1||!_0x34684a)return-0x1;return _0x34684a[_0x5e5a31(0x1d9)][_0x5e5a31(0x37c)]-_0x211eb1[_0x5e5a31(0x1d9)][_0x5e5a31(0x37c)];});},Scene_Boot[_0x224d35(0x3a0)][_0x224d35(0x3ac)]=function(){const _0x599e99=_0x224d35;VisuMZ[_0x599e99(0x384)][_0x599e99(0x1c8)](_0x599e99(0x3b3));for(const _0x13f521 of VisuMZ['MessageCore'][_0x599e99(0x37f)][_0x599e99(0x3b3)]){_0x13f521[_0x599e99(0x1d9)]=_0x13f521[_0x599e99(0x1d9)][_0x599e99(0x3f3)](),_0x13f521[_0x599e99(0x294)]=new RegExp('\x1b'+_0x13f521['Match'],'gi'),_0x13f521[_0x599e99(0x2ac)]='\x1b'+_0x13f521['Match'];if(_0x13f521[_0x599e99(0x23c)]==='')_0x13f521[_0x599e99(0x2ac)]+=_0x599e99(0x3ed);}},Scene_Boot['prototype'][_0x224d35(0x230)]=function(){const _0x4383eb=_0x224d35;VisuMZ[_0x4383eb(0x384)]['SortObjectByKeyLength']('TextCodeReplace');for(const _0x386000 of VisuMZ['MessageCore'][_0x4383eb(0x37f)][_0x4383eb(0x367)]){_0x386000[_0x4383eb(0x294)]=new RegExp('\x1b'+_0x386000[_0x4383eb(0x1d9)]+_0x386000[_0x4383eb(0x23c)],'gi'),_0x386000['TextStr']!==''&&_0x386000[_0x4383eb(0x360)]!=='Undefined'?_0x386000[_0x4383eb(0x2ac)]=new Function('return\x20\x27'+_0x386000[_0x4383eb(0x360)][_0x4383eb(0x37e)](/\\/g,'\x1b')+'\x27'):_0x386000['textCodeResult']=_0x386000[_0x4383eb(0x1d6)];}},Scene_Boot[_0x224d35(0x3a0)][_0x224d35(0x374)]=function(){const _0x2da7d2=_0x224d35;for(const _0x2d55ac of VisuMZ[_0x2da7d2(0x384)][_0x2da7d2(0x37f)][_0x2da7d2(0x3eb)]){_0x2d55ac[_0x2da7d2(0x294)]=new RegExp('\x5c['+_0x2d55ac[_0x2da7d2(0x1d9)]+'\x5c]','gi'),_0x2d55ac[_0x2da7d2(0x360)]!==''&&_0x2d55ac['TextStr']!==_0x2da7d2(0x388)?_0x2d55ac[_0x2da7d2(0x2ac)]=new Function(_0x2da7d2(0x1e7)+_0x2d55ac[_0x2da7d2(0x360)][_0x2da7d2(0x37e)](/\\/g,'\x1b')+'\x27'):_0x2d55ac[_0x2da7d2(0x2ac)]=_0x2d55ac[_0x2da7d2(0x1d6)];}},Scene_Boot[_0x224d35(0x3a0)]['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x4cebbf=_0x224d35,_0x14917d=VisuMZ['MessageCore'][_0x4cebbf(0x37f)][_0x4cebbf(0x28f)];!VisuMZ[_0x4cebbf(0x269)]&&(VisuMZ[_0x4cebbf(0x384)]['AddAutoColor']($dataClasses,_0x14917d[_0x4cebbf(0x3a2)]),VisuMZ['MessageCore'][_0x4cebbf(0x3d2)]($dataSkills,_0x14917d[_0x4cebbf(0x244)]),VisuMZ[_0x4cebbf(0x384)]['AddAutoColor']($dataItems,_0x14917d['Items']),VisuMZ[_0x4cebbf(0x384)][_0x4cebbf(0x3d2)]($dataWeapons,_0x14917d['Weapons']),VisuMZ['MessageCore']['AddAutoColor']($dataArmors,_0x14917d[_0x4cebbf(0x2e9)]),VisuMZ['MessageCore'][_0x4cebbf(0x3d2)]($dataEnemies,_0x14917d[_0x4cebbf(0x2e0)]),VisuMZ['MessageCore']['AddAutoColor']($dataStates,_0x14917d[_0x4cebbf(0x222)])),VisuMZ['MessageCore'][_0x4cebbf(0x21f)]();},VisuMZ[_0x224d35(0x384)][_0x224d35(0x1e0)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x224d35(0x229),_0x224d35(0x378),_0x224d35(0x289),_0x224d35(0x337),_0x224d35(0x3dd),_0x224d35(0x237),_0x224d35(0x351),_0x224d35(0x3ec),'<RIGHT>',_0x224d35(0x256),_0x224d35(0x3f5),'</COLORLOCK>','(((',_0x224d35(0x226),_0x224d35(0x27c),'</WORDWRAP>',_0x224d35(0x1ea),_0x224d35(0x3d6),_0x224d35(0x236),_0x224d35(0x339),_0x224d35(0x3d1),_0x224d35(0x30c),_0x224d35(0x36e),'HIDE',_0x224d35(0x3e2),'DISABLE','SWITCH',_0x224d35(0x2d7),_0x224d35(0x3d9),_0x224d35(0x2b8)],VisuMZ[_0x224d35(0x384)][_0x224d35(0x3d2)]=function(_0x3f283d,_0x109b8f){const _0x3e5dad=_0x224d35;if(_0x109b8f<=0x0)return;const _0xe8881b=_0x3f283d;for(const _0x537df8 of _0xe8881b){if(!_0x537df8)continue;VisuMZ[_0x3e5dad(0x384)]['CreateAutoColorFor'](_0x537df8,_0x109b8f);}},VisuMZ[_0x224d35(0x384)][_0x224d35(0x21f)]=function(){const _0x242f70=_0x224d35;VisuMZ['MessageCore']['AutoColorRegExp']=[];for(let _0x53a1bb=0x1;_0x53a1bb<=0x1f;_0x53a1bb++){const _0x158a14='TextColor%1'[_0x242f70(0x1f4)](_0x53a1bb),_0x516593=VisuMZ[_0x242f70(0x384)][_0x242f70(0x37f)]['AutoColor'][_0x158a14];_0x516593[_0x242f70(0x3a6)]((_0x18301a,_0x4df940)=>{const _0x3a3012=_0x242f70;if(!_0x18301a||!_0x4df940)return-0x1;return _0x4df940[_0x3a3012(0x37c)]-_0x18301a[_0x3a3012(0x37c)];}),this[_0x242f70(0x2c0)](_0x516593,_0x53a1bb);}},VisuMZ['MessageCore'][_0x224d35(0x2c0)]=function(_0x20fbe1,_0x57c6d4){const _0x21ae9c=_0x224d35;for(const _0x1e0fb9 of _0x20fbe1){if(_0x1e0fb9[_0x21ae9c(0x37c)]<=0x0)continue;if(/^\d+$/[_0x21ae9c(0x29b)](_0x1e0fb9))continue;let _0x2f39e3=VisuMZ[_0x21ae9c(0x384)][_0x21ae9c(0x395)](_0x1e0fb9);if(_0x1e0fb9[_0x21ae9c(0x2df)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x2cde49=new RegExp(_0x2f39e3,'i');else var _0x2cde49=new RegExp('\x5cb'+_0x2f39e3+'\x5cb','g');VisuMZ['MessageCore'][_0x21ae9c(0x2cb)][_0x21ae9c(0x291)]([_0x2cde49,_0x21ae9c(0x290)['format'](_0x57c6d4,_0x1e0fb9)]);}},VisuMZ[_0x224d35(0x384)][_0x224d35(0x395)]=function(_0x67558c){const _0x3be0d7=_0x224d35;return _0x67558c=_0x67558c[_0x3be0d7(0x37e)](/(\W)/gi,(_0x1f5164,_0x358486)=>'\x5c%1'['format'](_0x358486)),_0x67558c;},VisuMZ[_0x224d35(0x384)][_0x224d35(0x1ed)]=VisuMZ[_0x224d35(0x1ed)],VisuMZ[_0x224d35(0x1ed)]=function(_0x11e228){const _0x5e098e=_0x224d35;VisuMZ[_0x5e098e(0x384)]['ParseClassNotetags'][_0x5e098e(0x368)](this,_0x11e228);const _0x1d7d51=VisuMZ[_0x5e098e(0x384)][_0x5e098e(0x37f)][_0x5e098e(0x28f)];VisuMZ['MessageCore'][_0x5e098e(0x2dc)](_0x11e228,_0x1d7d51[_0x5e098e(0x3a2)]);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x1fc)]=VisuMZ[_0x224d35(0x1fc)],VisuMZ[_0x224d35(0x1fc)]=function(_0x3bccd5){const _0x303094=_0x224d35;VisuMZ[_0x303094(0x384)]['ParseSkillNotetags'][_0x303094(0x368)](this,_0x3bccd5);const _0x54600d=VisuMZ[_0x303094(0x384)][_0x303094(0x37f)][_0x303094(0x28f)];VisuMZ[_0x303094(0x384)][_0x303094(0x2dc)](_0x3bccd5,_0x54600d['Skills']);},0x7,VisuMZ['MessageCore'][_0x224d35(0x1d3)]=VisuMZ[_0x224d35(0x1d3)],VisuMZ[_0x224d35(0x1d3)]=function(_0x179609){const _0x4fc3cc=_0x224d35;VisuMZ[_0x4fc3cc(0x384)][_0x4fc3cc(0x1d3)][_0x4fc3cc(0x368)](this,_0x179609);const _0x5f18e3=VisuMZ[_0x4fc3cc(0x384)][_0x4fc3cc(0x37f)][_0x4fc3cc(0x28f)];VisuMZ['MessageCore'][_0x4fc3cc(0x2dc)](_0x179609,_0x5f18e3[_0x4fc3cc(0x2a5)]);},VisuMZ['MessageCore']['ParseWeaponNotetags']=VisuMZ[_0x224d35(0x234)],VisuMZ[_0x224d35(0x234)]=function(_0x175380){const _0x3369a7=_0x224d35;VisuMZ[_0x3369a7(0x384)]['ParseWeaponNotetags'][_0x3369a7(0x368)](this,_0x175380);const _0xcda5=VisuMZ['MessageCore'][_0x3369a7(0x37f)][_0x3369a7(0x28f)];VisuMZ['MessageCore'][_0x3369a7(0x2dc)](_0x175380,_0xcda5[_0x3369a7(0x3c2)]);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x284)]=VisuMZ[_0x224d35(0x284)],VisuMZ[_0x224d35(0x284)]=function(_0x403e73){const _0x491a9a=_0x224d35;VisuMZ[_0x491a9a(0x384)][_0x491a9a(0x284)][_0x491a9a(0x368)](this,_0x403e73);const _0x91447b=VisuMZ[_0x491a9a(0x384)][_0x491a9a(0x37f)][_0x491a9a(0x28f)];VisuMZ[_0x491a9a(0x384)][_0x491a9a(0x2dc)](_0x403e73,_0x91447b['Armors']);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x35c)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x224d35(0x35c)]=function(_0x32c48c){const _0x282dea=_0x224d35;VisuMZ[_0x282dea(0x384)][_0x282dea(0x35c)][_0x282dea(0x368)](this,_0x32c48c);const _0x1a7000=VisuMZ[_0x282dea(0x384)][_0x282dea(0x37f)][_0x282dea(0x28f)];VisuMZ[_0x282dea(0x384)][_0x282dea(0x2dc)](_0x32c48c,_0x1a7000[_0x282dea(0x2e0)]);},VisuMZ[_0x224d35(0x384)]['ParseStateNotetags']=VisuMZ[_0x224d35(0x2c7)],VisuMZ[_0x224d35(0x2c7)]=function(_0x33a84b){const _0x446d7e=_0x224d35;VisuMZ['MessageCore'][_0x446d7e(0x2c7)][_0x446d7e(0x368)](this,_0x33a84b);const _0x39f897=VisuMZ[_0x446d7e(0x384)]['Settings'][_0x446d7e(0x28f)];VisuMZ['MessageCore'][_0x446d7e(0x2dc)](_0x33a84b,_0x39f897[_0x446d7e(0x222)]);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x2dc)]=function(_0x239524,_0x1a464d){const _0x49443c=_0x224d35;if(_0x1a464d<=0x0)return;const _0x3778d4=VisuMZ['MessageCore'][_0x49443c(0x37f)][_0x49443c(0x28f)][_0x49443c(0x31b)+_0x1a464d];let _0x5849ea=_0x239524[_0x49443c(0x239)][_0x49443c(0x313)]();if(/^\d+$/['test'](_0x5849ea))return;if(VisuMZ[_0x49443c(0x384)]['AutoColorBypassList'][_0x49443c(0x3cf)](_0x5849ea[_0x49443c(0x3f3)]()))return;_0x5849ea=_0x5849ea[_0x49443c(0x37e)](/\\I\[(\d+)\]/gi,''),_0x5849ea=_0x5849ea[_0x49443c(0x37e)](/\x1bI\[(\d+)\]/gi,'');if(_0x5849ea[_0x49443c(0x37c)]<=0x0)return;if(_0x5849ea[_0x49443c(0x2df)](/-----/i))return;_0x3778d4[_0x49443c(0x291)](_0x5849ea);},SceneManager[_0x224d35(0x329)]=function(){const _0xd0f334=_0x224d35;return this[_0xd0f334(0x3f1)]&&this[_0xd0f334(0x3f1)][_0xd0f334(0x381)]===Scene_Battle;},SceneManager[_0x224d35(0x3b2)]=function(){const _0xeca45b=_0x224d35;return this['_scene']&&this[_0xeca45b(0x3f1)][_0xeca45b(0x381)]===Scene_Map;},VisuMZ[_0x224d35(0x384)][_0x224d35(0x317)]=TextManager[_0x224d35(0x1c0)],TextManager[_0x224d35(0x1c0)]=function(_0x4dba70){const _0x95d9ff=_0x224d35,_0x4d3079=[_0x95d9ff(0x2ab),_0x95d9ff(0x372),_0x95d9ff(0x25e),_0x95d9ff(0x333),'victory',_0x95d9ff(0x354),_0x95d9ff(0x2c4),'obtainExp',_0x95d9ff(0x3dc),_0x95d9ff(0x248)];let _0x52c4e6=VisuMZ[_0x95d9ff(0x384)][_0x95d9ff(0x317)][_0x95d9ff(0x368)](this,_0x4dba70);return _0x4d3079[_0x95d9ff(0x3cf)](_0x4dba70)&&(_0x52c4e6=_0x95d9ff(0x2ce)+_0x52c4e6),_0x52c4e6;},ConfigManager[_0x224d35(0x28d)]=VisuMZ[_0x224d35(0x384)][_0x224d35(0x37f)][_0x224d35(0x1e9)][_0x224d35(0x232)],VisuMZ['MessageCore']['ConfigManager_makeData']=ConfigManager[_0x224d35(0x34d)],ConfigManager[_0x224d35(0x34d)]=function(){const _0x194aa6=_0x224d35,_0x2a63bf=VisuMZ[_0x194aa6(0x384)][_0x194aa6(0x322)][_0x194aa6(0x368)](this);return _0x2a63bf['textSpeed']=this[_0x194aa6(0x28d)],_0x2a63bf;},VisuMZ[_0x224d35(0x384)]['ConfigManager_applyData']=ConfigManager[_0x224d35(0x3c4)],ConfigManager[_0x224d35(0x3c4)]=function(_0x50288f){const _0x24d45c=_0x224d35;VisuMZ['MessageCore']['ConfigManager_applyData']['call'](this,_0x50288f),_0x24d45c(0x28d)in _0x50288f?this[_0x24d45c(0x28d)]=Number(_0x50288f['textSpeed'])[_0x24d45c(0x1dd)](0x1,0xb):this[_0x24d45c(0x28d)]=VisuMZ['MessageCore'][_0x24d45c(0x37f)][_0x24d45c(0x1e9)][_0x24d45c(0x232)];},TextManager[_0x224d35(0x2a7)]=VisuMZ['MessageCore'][_0x224d35(0x37f)]['TextSpeed']['Name'],TextManager[_0x224d35(0x3cd)]=VisuMZ['MessageCore']['Settings'][_0x224d35(0x1e9)][_0x224d35(0x293)],VisuMZ[_0x224d35(0x384)][_0x224d35(0x3ce)]=Game_System[_0x224d35(0x3a0)][_0x224d35(0x3bf)],Game_System[_0x224d35(0x3a0)][_0x224d35(0x3bf)]=function(){const _0x4045bb=_0x224d35;VisuMZ[_0x4045bb(0x384)][_0x4045bb(0x3ce)][_0x4045bb(0x368)](this),this[_0x4045bb(0x365)]();},Game_System['prototype']['initMessageCore']=function(){const _0x3c3e0b=_0x224d35,_0x49a665=VisuMZ['MessageCore']['Settings'][_0x3c3e0b(0x3e4)],_0x2820a6=VisuMZ[_0x3c3e0b(0x384)][_0x3c3e0b(0x37f)][_0x3c3e0b(0x347)];this[_0x3c3e0b(0x3fa)]={'messageRows':_0x49a665[_0x3c3e0b(0x25d)],'messageWidth':_0x49a665[_0x3c3e0b(0x1f5)],'messageWordWrap':_0x2820a6['MessageWindow'],'helpWordWrap':_0x2820a6['HelpWindow'],'choiceLineHeight':_0x49a665[_0x3c3e0b(0x35f)],'choiceRows':_0x49a665[_0x3c3e0b(0x2f4)],'choiceCols':_0x49a665['ChoiceWindowMaxCols'],'choiceTextAlign':_0x49a665['ChoiceWindowTextAlign']},this[_0x3c3e0b(0x2a8)]===undefined&&(this['_messageOffsetX']=_0x49a665[_0x3c3e0b(0x2fa)],this['_messageOffsetY']=_0x49a665[_0x3c3e0b(0x357)]);},Game_System[_0x224d35(0x3a0)]['getMessageWindowRows']=function(){const _0x4a5e55=_0x224d35;if(this['_MessageCoreSettings']===undefined)this[_0x4a5e55(0x365)]();if(this[_0x4a5e55(0x3fa)][_0x4a5e55(0x1c7)]===undefined)this['initMessageCore']();return this[_0x4a5e55(0x3fa)][_0x4a5e55(0x1c7)];},Game_System['prototype'][_0x224d35(0x280)]=function(_0x1bc8e9){const _0x4169c1=_0x224d35;if(this['_MessageCoreSettings']===undefined)this[_0x4169c1(0x365)]();if(this[_0x4169c1(0x3fa)][_0x4169c1(0x1c7)]===undefined)this[_0x4169c1(0x365)]();this[_0x4169c1(0x3fa)][_0x4169c1(0x1c7)]=_0x1bc8e9||0x1;},Game_System['prototype']['getMessageWindowWidth']=function(){const _0x5d6487=_0x224d35;if(this[_0x5d6487(0x3fa)]===undefined)this['initMessageCore']();if(this[_0x5d6487(0x3fa)][_0x5d6487(0x34e)]===undefined)this[_0x5d6487(0x365)]();return this[_0x5d6487(0x3fa)]['messageWidth'];},Game_System[_0x224d35(0x3a0)][_0x224d35(0x2b9)]=function(_0x7bf317){const _0xd1a22c=_0x224d35;if(this[_0xd1a22c(0x3fa)]===undefined)this[_0xd1a22c(0x365)]();if(this[_0xd1a22c(0x3fa)][_0xd1a22c(0x34e)]===undefined)this[_0xd1a22c(0x365)]();_0x7bf317=Math[_0xd1a22c(0x32a)](_0x7bf317);if(_0x7bf317%0x2!==0x0)_0x7bf317+=0x1;this[_0xd1a22c(0x3fa)][_0xd1a22c(0x34e)]=_0x7bf317||0x2;},Game_System[_0x224d35(0x3a0)][_0x224d35(0x3fb)]=function(){const _0x5d59af=_0x224d35;if(this[_0x5d59af(0x3fa)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x5d59af(0x2f6)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x5d59af(0x2f6)];},Game_System[_0x224d35(0x3a0)]['setMessageWindowWordWrap']=function(_0x111042){const _0x2dba93=_0x224d35;if(this[_0x2dba93(0x3fa)]===undefined)this[_0x2dba93(0x365)]();if(this[_0x2dba93(0x3fa)]['messageWordWrap']===undefined)this[_0x2dba93(0x365)]();this[_0x2dba93(0x3fa)][_0x2dba93(0x2f6)]=_0x111042;},Game_System[_0x224d35(0x3a0)]['getMessageWindowXyOffsets']=function(){const _0x338e2a=_0x224d35;if(this[_0x338e2a(0x2a8)]===undefined){const _0xc06268=VisuMZ[_0x338e2a(0x384)]['Settings'][_0x338e2a(0x3e4)];this[_0x338e2a(0x2a8)]=_0xc06268[_0x338e2a(0x2fa)],this[_0x338e2a(0x296)]=_0xc06268[_0x338e2a(0x357)];}return{'x':this['_messageOffsetX']||0x0,'y':this[_0x338e2a(0x296)]||0x0};},Game_System[_0x224d35(0x3a0)][_0x224d35(0x279)]=function(_0x156d17,_0x46f2fc){const _0x591112=_0x224d35;if(this[_0x591112(0x3fa)]===undefined)this[_0x591112(0x365)]();this[_0x591112(0x2a8)]=_0x156d17,this[_0x591112(0x296)]=_0x46f2fc;},Game_System[_0x224d35(0x3a0)][_0x224d35(0x26a)]=function(){const _0x3b5e82=_0x224d35;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x3b5e82(0x3fa)][_0x3b5e82(0x397)]===undefined)this[_0x3b5e82(0x365)]();return this[_0x3b5e82(0x3fa)][_0x3b5e82(0x397)];},Game_System[_0x224d35(0x3a0)][_0x224d35(0x383)]=function(_0x24101b){const _0x44e651=_0x224d35;if(this[_0x44e651(0x3fa)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x44e651(0x397)]===undefined)this[_0x44e651(0x365)]();this['_MessageCoreSettings'][_0x44e651(0x397)]=_0x24101b;},Game_System[_0x224d35(0x3a0)][_0x224d35(0x1eb)]=function(){const _0x55d246=_0x224d35;if(this[_0x55d246(0x3fa)]===undefined)this[_0x55d246(0x365)]();if(this[_0x55d246(0x3fa)]['choiceLineHeight']===undefined)this[_0x55d246(0x365)]();return this['_MessageCoreSettings'][_0x55d246(0x3c9)];},Game_System[_0x224d35(0x3a0)][_0x224d35(0x1f8)]=function(_0x281646){const _0x5e0dfe=_0x224d35;if(this[_0x5e0dfe(0x3fa)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this[_0x5e0dfe(0x365)]();this[_0x5e0dfe(0x3fa)][_0x5e0dfe(0x3c9)]=_0x281646||0x1;},Game_System[_0x224d35(0x3a0)][_0x224d35(0x28e)]=function(){const _0x29df43=_0x224d35;if(this[_0x29df43(0x3fa)]===undefined)this[_0x29df43(0x365)]();if(this[_0x29df43(0x3fa)]['choiceRows']===undefined)this['initMessageCore']();return this[_0x29df43(0x3fa)]['choiceRows'];},Game_System[_0x224d35(0x3a0)][_0x224d35(0x247)]=function(_0x40f50a){const _0x862d57=_0x224d35;if(this[_0x862d57(0x3fa)]===undefined)this[_0x862d57(0x365)]();if(this[_0x862d57(0x3fa)]['choiceRows']===undefined)this[_0x862d57(0x365)]();this[_0x862d57(0x3fa)][_0x862d57(0x28b)]=_0x40f50a||0x1;},Game_System['prototype'][_0x224d35(0x310)]=function(){const _0x1962c4=_0x224d35;if(this[_0x1962c4(0x3fa)]===undefined)this[_0x1962c4(0x365)]();if(this['_MessageCoreSettings'][_0x1962c4(0x379)]===undefined)this[_0x1962c4(0x365)]();return this['_MessageCoreSettings']['choiceCols'];},Game_System[_0x224d35(0x3a0)][_0x224d35(0x274)]=function(_0x572da9){const _0x37a6e2=_0x224d35;if(this[_0x37a6e2(0x3fa)]===undefined)this[_0x37a6e2(0x365)]();if(this['_MessageCoreSettings'][_0x37a6e2(0x379)]===undefined)this[_0x37a6e2(0x365)]();this[_0x37a6e2(0x3fa)][_0x37a6e2(0x379)]=_0x572da9||0x1;},Game_System['prototype'][_0x224d35(0x259)]=function(){const _0x3268f1=_0x224d35;if(this[_0x3268f1(0x3fa)]===undefined)this[_0x3268f1(0x365)]();if(this[_0x3268f1(0x3fa)][_0x3268f1(0x209)]===undefined)this[_0x3268f1(0x365)]();return this[_0x3268f1(0x3fa)]['choiceTextAlign'];},Game_System['prototype'][_0x224d35(0x2e8)]=function(_0xa35552){const _0x14b472=_0x224d35;if(this[_0x14b472(0x3fa)]===undefined)this[_0x14b472(0x365)]();if(this[_0x14b472(0x3fa)][_0x14b472(0x209)]===undefined)this[_0x14b472(0x365)]();this[_0x14b472(0x3fa)][_0x14b472(0x209)]=_0xa35552[_0x14b472(0x3ad)]();},VisuMZ['MessageCore'][_0x224d35(0x235)]=Game_Party['prototype'][_0x224d35(0x3bf)],Game_Party[_0x224d35(0x3a0)]['initialize']=function(){const _0x47866a=_0x224d35;VisuMZ['MessageCore'][_0x47866a(0x235)][_0x47866a(0x368)](this),this[_0x47866a(0x365)]();},Game_Party[_0x224d35(0x3a0)][_0x224d35(0x365)]=function(){const _0x2ff41e=_0x224d35;this[_0x2ff41e(0x288)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x224d35(0x3a0)][_0x224d35(0x231)]=function(){const _0x788943=_0x224d35;if(this[_0x788943(0x288)]===undefined)this[_0x788943(0x365)]();return this[_0x788943(0x288)];},Game_Party['prototype']['setLastGainedItemData']=function(_0x2226e9,_0x3a5e61){const _0x33a5b6=_0x224d35;if(this[_0x33a5b6(0x288)]===undefined)this[_0x33a5b6(0x365)]();if(!_0x2226e9)return;if(DataManager['isItem'](_0x2226e9))this['_lastGainedItemData'][_0x33a5b6(0x262)]=0x0;else{if(DataManager[_0x33a5b6(0x394)](_0x2226e9))this[_0x33a5b6(0x288)][_0x33a5b6(0x262)]=0x1;else DataManager['isArmor'](_0x2226e9)&&(this[_0x33a5b6(0x288)][_0x33a5b6(0x262)]=0x2);}this[_0x33a5b6(0x288)]['id']=_0x2226e9['id'],this[_0x33a5b6(0x288)][_0x33a5b6(0x205)]=_0x3a5e61;},VisuMZ[_0x224d35(0x384)][_0x224d35(0x3c6)]=Game_Party[_0x224d35(0x3a0)][_0x224d35(0x287)],Game_Party['prototype'][_0x224d35(0x287)]=function(_0x48af62,_0x44d77e,_0x35b8a6){const _0x1b9b29=_0x224d35;VisuMZ[_0x1b9b29(0x384)]['Game_Party_gainItem'][_0x1b9b29(0x368)](this,_0x48af62,_0x44d77e,_0x35b8a6),_0x44d77e>0x0&&this[_0x1b9b29(0x2eb)](_0x48af62,_0x44d77e);},VisuMZ[_0x224d35(0x384)]['Game_Map_initialize']=Game_Map[_0x224d35(0x3a0)][_0x224d35(0x3bf)],Game_Map[_0x224d35(0x3a0)][_0x224d35(0x3bf)]=function(){const _0x2b34a2=_0x224d35;VisuMZ[_0x2b34a2(0x384)]['Game_Map_initialize'][_0x2b34a2(0x368)](this),this[_0x2b34a2(0x2d5)]=[];},VisuMZ[_0x224d35(0x384)][_0x224d35(0x1f2)]=Game_Map[_0x224d35(0x3a0)][_0x224d35(0x302)],Game_Map[_0x224d35(0x3a0)][_0x224d35(0x302)]=function(){const _0x116c17=_0x224d35;VisuMZ[_0x116c17(0x384)][_0x116c17(0x1f2)][_0x116c17(0x368)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x224d35(0x384)]['Game_Map_updateEvents']=Game_Map[_0x224d35(0x3a0)][_0x224d35(0x2bb)],Game_Map[_0x224d35(0x3a0)][_0x224d35(0x2bb)]=function(){const _0x247fbb=_0x224d35;VisuMZ[_0x247fbb(0x384)][_0x247fbb(0x38f)][_0x247fbb(0x368)](this),this[_0x247fbb(0x23a)]();},Game_Map['prototype']['addMessageCommonEvent']=function(_0x4bdd16){const _0x282831=_0x224d35;if(!$dataCommonEvents[_0x4bdd16])return;this[_0x282831(0x2d5)]=this[_0x282831(0x2d5)]||[];const _0x5aaa55=this[_0x282831(0x369)][_0x282831(0x3a1)],_0x235ffe=new Game_MessageCommonEvent(_0x4bdd16,_0x5aaa55);this[_0x282831(0x2d5)][_0x282831(0x291)](_0x235ffe);},Game_Map[_0x224d35(0x3a0)][_0x224d35(0x23a)]=function(){const _0x4f6482=_0x224d35;this[_0x4f6482(0x2d5)]=this['_messageCommonEvents']||[];for(const _0x38f1de of this[_0x4f6482(0x2d5)]){!_0x38f1de[_0x4f6482(0x369)]?this['_messageCommonEvents'][_0x4f6482(0x366)](_0x38f1de):_0x38f1de[_0x4f6482(0x29a)]();}},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x33d)]=function(_0x31109b){const _0x28ceab=_0x224d35;if($gameMessage[_0x28ceab(0x37d)]())return![];return this['prepareShowTextCommand'](_0x31109b),this[_0x28ceab(0x3a9)](_0x31109b),this['prepareShowTextFollowups'](_0x31109b),this[_0x28ceab(0x295)](_0x28ceab(0x1c0)),!![];},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x20f)]=function(_0x4b759b){const _0xb0837e=_0x224d35;$gameMessage[_0xb0837e(0x2e6)](_0x4b759b[0x0],_0x4b759b[0x1]),$gameMessage['setBackground'](_0x4b759b[0x2]),$gameMessage[_0xb0837e(0x225)](_0x4b759b[0x3]),$gameMessage[_0xb0837e(0x1cb)](_0x4b759b[0x4]);},Game_Interpreter['prototype'][_0x224d35(0x3a9)]=function(_0x4b046f){const _0x3e8373=_0x224d35;while(this['isContinuePrepareShowTextCommands']()){this[_0x3e8373(0x392)]++;if(this['currentCommand']()[_0x3e8373(0x283)]===0x191){let _0x8fcf10=this[_0x3e8373(0x1e1)]()[_0x3e8373(0x345)][0x0];_0x8fcf10=VisuMZ['MessageCore']['ParseAddedText'](_0x8fcf10),$gameMessage['add'](_0x8fcf10);}if(this[_0x3e8373(0x2ea)]())break;}},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x2a4)]=function(){const _0x40929a=_0x224d35;return this[_0x40929a(0x3f2)]()===0x65&&$gameSystem[_0x40929a(0x33e)]()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ['MessageCore'][_0x224d35(0x218)]=function(_0x27250c){const _0x4c79c0=_0x224d35;return _0x27250c=_0x27250c[_0x4c79c0(0x37e)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x27250c;},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x2ea)]=function(){const _0x3ca5a6=_0x224d35;if(this[_0x3ca5a6(0x1e1)]()&&this[_0x3ca5a6(0x1e1)]()[_0x3ca5a6(0x345)][0x0][_0x3ca5a6(0x2df)](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x3ca5a6(0x38b)]['length']>=$gameSystem[_0x3ca5a6(0x33e)]()&&this['nextEventCode']()!==0x191;},Game_Interpreter['prototype'][_0x224d35(0x1cf)]=function(_0x4b61b8){const _0x135291=_0x224d35;switch(this[_0x135291(0x3f2)]()){case 0x66:this[_0x135291(0x392)]++,this['setupChoices'](this['currentCommand']()[_0x135291(0x345)]);break;case 0x67:this[_0x135291(0x392)]++,this['setupNumInput'](this[_0x135291(0x1e1)]()[_0x135291(0x345)]);break;case 0x68:this[_0x135291(0x392)]++,this[_0x135291(0x28c)](this[_0x135291(0x1e1)]()[_0x135291(0x345)]);break;}},VisuMZ[_0x224d35(0x384)][_0x224d35(0x281)]=Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x24d)],Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x24d)]=function(_0x4c78d1){const _0x250874=_0x224d35;_0x4c78d1=this[_0x250874(0x206)](),VisuMZ['MessageCore']['Game_Interpreter_setupChoices'][_0x250874(0x368)](this,_0x4c78d1);},Game_Interpreter['prototype'][_0x224d35(0x206)]=function(){const _0x42b178=_0x224d35,_0x5f0569=this[_0x42b178(0x392)],_0x19085a=[];let _0x3c7285=0x0;this[_0x42b178(0x392)]++;while(this[_0x42b178(0x392)]<this['_list'][_0x42b178(0x37c)]){if(this[_0x42b178(0x1e1)]()[_0x42b178(0x211)]===this['_indent']){if(this[_0x42b178(0x1e1)]()[_0x42b178(0x283)]===0x194&&this[_0x42b178(0x3f2)]()!==0x66)break;else{if(this[_0x42b178(0x1e1)]()[_0x42b178(0x283)]===0x66)this[_0x42b178(0x22d)](_0x3c7285,this['currentCommand'](),_0x5f0569),this[_0x42b178(0x392)]-=0x2;else this[_0x42b178(0x1e1)]()[_0x42b178(0x283)]===0x192&&(this[_0x42b178(0x1e1)]()[_0x42b178(0x345)][0x0]=_0x3c7285,_0x3c7285++);}}this[_0x42b178(0x392)]++;}return this[_0x42b178(0x392)]=_0x5f0569,this[_0x42b178(0x1e1)]()['parameters'];},Game_Interpreter[_0x224d35(0x3a0)]['adjustShowChoiceExtension']=function(_0x355246,_0x1af469,_0x61d3ea){const _0x5bb006=_0x224d35;this[_0x5bb006(0x1d0)](_0x355246,_0x1af469,_0x61d3ea),this[_0x5bb006(0x277)](_0x355246,_0x1af469,_0x61d3ea),this[_0x5bb006(0x22f)](_0x1af469,_0x61d3ea);},Game_Interpreter['prototype'][_0x224d35(0x1d0)]=function(_0x4a350d,_0x11ca8c,_0x21531a){const _0x1583fa=_0x224d35;if(_0x11ca8c[_0x1583fa(0x345)][0x2]<0x0)return;const _0x2df79f=_0x11ca8c[_0x1583fa(0x345)][0x2]+_0x4a350d;this[_0x1583fa(0x2f3)][_0x21531a][_0x1583fa(0x345)][0x2]=_0x2df79f;},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x277)]=function(_0x3b7ee7,_0xcde23a,_0x13173d){const _0x4ba289=_0x224d35;if(_0xcde23a[_0x4ba289(0x345)][0x1]>=0x0){var _0x4c8cd3=_0xcde23a[_0x4ba289(0x345)][0x1]+_0x3b7ee7;this[_0x4ba289(0x2f3)][_0x13173d]['parameters'][0x1]=_0x4c8cd3;}else _0xcde23a[_0x4ba289(0x345)][0x1]===-0x2&&(this['_list'][_0x13173d]['parameters'][0x1]=_0xcde23a['parameters'][0x1]);},Game_Interpreter[_0x224d35(0x3a0)][_0x224d35(0x22f)]=function(_0x3a3835,_0x3e61ef){const _0x290c37=_0x224d35;for(const _0x2d74d3 of _0x3a3835[_0x290c37(0x345)][0x0]){this[_0x290c37(0x2f3)][_0x3e61ef][_0x290c37(0x345)][0x0][_0x290c37(0x291)](_0x2d74d3);}this[_0x290c37(0x2f3)][_0x290c37(0x376)](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x52d5d6=_0x224d35;this[_0x52d5d6(0x3bf)](...arguments);}Game_MessageCommonEvent[_0x224d35(0x3a0)][_0x224d35(0x3bf)]=function(_0x5171aa,_0x43b5c6){const _0x9cb706=_0x224d35;this[_0x9cb706(0x32c)]=_0x5171aa,this[_0x9cb706(0x3a1)]=_0x43b5c6||0x0,this[_0x9cb706(0x33c)]();},Game_MessageCommonEvent[_0x224d35(0x3a0)][_0x224d35(0x270)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x224d35(0x3a0)][_0x224d35(0x3bc)]=function(){const _0x43ae91=_0x224d35;return this[_0x43ae91(0x270)]()[_0x43ae91(0x3bc)];},Game_MessageCommonEvent[_0x224d35(0x3a0)][_0x224d35(0x33c)]=function(){const _0x36ce79=_0x224d35;this[_0x36ce79(0x369)]=new Game_Interpreter(),this['_interpreter'][_0x36ce79(0x21a)](this['list'](),this['_eventId']);},Game_MessageCommonEvent[_0x224d35(0x3a0)][_0x224d35(0x29a)]=function(){const _0x3e30f6=_0x224d35;this[_0x3e30f6(0x369)]&&(this[_0x3e30f6(0x369)]['isRunning']()?this[_0x3e30f6(0x369)][_0x3e30f6(0x29a)]():this[_0x3e30f6(0x38c)]());},Game_MessageCommonEvent['prototype'][_0x224d35(0x38c)]=function(){const _0x139da5=_0x224d35;this[_0x139da5(0x369)]=null;},Scene_Message['prototype'][_0x224d35(0x246)]=function(){const _0x245763=_0x224d35,_0x319b54=Math[_0x245763(0x304)](Graphics[_0x245763(0x1dc)],$gameSystem['getMessageWindowWidth']()),_0x72c50a=$gameSystem['getMessageWindowRows'](),_0x5bea36=this[_0x245763(0x249)](_0x72c50a,![]),_0x38bf3a=(Graphics[_0x245763(0x39a)]-_0x319b54)/0x2,_0x2a0166=0x0;return new Rectangle(_0x38bf3a,_0x2a0166,_0x319b54,_0x5bea36);},VisuMZ['MessageCore'][_0x224d35(0x2ee)]=Scene_Options['prototype'][_0x224d35(0x2e2)],Scene_Options['prototype'][_0x224d35(0x2e2)]=function(){const _0x539a09=_0x224d35;let _0x4de840=VisuMZ[_0x539a09(0x384)]['Scene_Options_maxCommands']['call'](this);const _0x3ba68f=VisuMZ['MessageCore'][_0x539a09(0x37f)];if(_0x3ba68f['TextSpeed']['AddOption']&&_0x3ba68f['TextSpeed'][_0x539a09(0x25f)])_0x4de840++;return _0x4de840;},VisuMZ[_0x224d35(0x384)]['Window_Base_initialize']=Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3bf)],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3bf)]=function(_0x298f5e){const _0xbc502=_0x224d35;this['initMessageCore'](_0x298f5e),VisuMZ[_0xbc502(0x384)][_0xbc502(0x2c2)][_0xbc502(0x368)](this,_0x298f5e);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x365)]=function(_0x2d6443){const _0x4a8c00=_0x224d35;this[_0x4a8c00(0x1f7)](),this[_0x4a8c00(0x305)](),this[_0x4a8c00(0x2da)](_0x2d6443);},Window_Base[_0x224d35(0x3a0)]['initTextAlignement']=function(){const _0x27d9b9=_0x224d35;this[_0x27d9b9(0x29c)](_0x27d9b9(0x24b));},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x29c)]=function(_0x3ec649){const _0x58bd4f=_0x224d35;this[_0x58bd4f(0x323)]=_0x3ec649;},Window_Base[_0x224d35(0x3a0)]['getTextAlignment']=function(){const _0x4196bb=_0x224d35;return this[_0x4196bb(0x323)];},VisuMZ[_0x224d35(0x384)]['Window_Base_textSizeEx']=Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2f2)],Window_Base['prototype'][_0x224d35(0x2f2)]=function(_0x122885){const _0x517d6b=_0x224d35;return this[_0x517d6b(0x305)](),VisuMZ[_0x517d6b(0x384)]['Window_Base_textSizeEx']['call'](this,_0x122885);},VisuMZ['MessageCore'][_0x224d35(0x299)]=Window_Base['prototype'][_0x224d35(0x2d3)],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2d3)]=function(_0x3f97ff){const _0x19c877=_0x224d35;VisuMZ[_0x19c877(0x384)][_0x19c877(0x299)][_0x19c877(0x368)](this,_0x3f97ff);if(_0x3f97ff[_0x19c877(0x3b7)])this['setTextAlignment'](_0x19c877(0x24b));},Window_Base['prototype'][_0x224d35(0x305)]=function(){const _0x2e291d=_0x224d35;this[_0x2e291d(0x292)](![]);},Window_Base['prototype'][_0x224d35(0x35b)]=function(){const _0x4c3039=_0x224d35;return this[_0x4c3039(0x3d3)];},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x292)]=function(_0x38d837){const _0x2a3b8e=_0x224d35;return this[_0x2a3b8e(0x3d3)]=_0x38d837,'';},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2da)]=function(_0x54a7ce){const _0x2eded8=_0x224d35;this['_resetRect']=JsonEx[_0x2eded8(0x2b3)](_0x54a7ce);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1c5)]=function(){const _0xbdff36=_0x224d35;this[_0xbdff36(0x1fd)]['fontFace']=$gameSystem[_0xbdff36(0x35d)](),this[_0xbdff36(0x1fd)][_0xbdff36(0x263)]=$gameSystem[_0xbdff36(0x1e8)](),this[_0xbdff36(0x1fd)][_0xbdff36(0x3af)]=![],this[_0xbdff36(0x1fd)][_0xbdff36(0x241)]=![],this[_0xbdff36(0x390)]();},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x390)]=function(){const _0x2ecfc3=_0x224d35;this['changeTextColor'](ColorManager['normalColor']()),this['changeOutlineColor'](ColorManager[_0x2ecfc3(0x266)]());const _0x2da0ae=VisuMZ['MessageCore']['Settings']['General'];_0x2da0ae[_0x2ecfc3(0x2af)]===undefined&&(_0x2da0ae[_0x2ecfc3(0x2af)]=0x3),this[_0x2ecfc3(0x1fd)]['outlineWidth']=_0x2da0ae[_0x2ecfc3(0x2af)],this[_0x2ecfc3(0x3ef)](![]);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3ef)]=function(_0x13ca43){const _0x591a20=_0x224d35;this[_0x591a20(0x327)]=_0x13ca43;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2f8)]=function(){const _0x7499d0=_0x224d35;return this[_0x7499d0(0x327)];},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x39b)]=function(){return![];},Window_Base['prototype'][_0x224d35(0x2b2)]=function(){const _0x2fbaa5=_0x224d35,_0x443aa4=['fontFace',_0x2fbaa5(0x263),_0x2fbaa5(0x3af),_0x2fbaa5(0x241),'textColor','outLineColor',_0x2fbaa5(0x303),_0x2fbaa5(0x1cc)];let _0x500bd9={};for(const _0x4f0048 of _0x443aa4){_0x500bd9[_0x4f0048]=this['contents'][_0x4f0048];}return _0x500bd9;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1c3)]=function(_0x3b3d12){for(const _0x4cbcff in _0x3b3d12){this['contents'][_0x4cbcff]=_0x3b3d12[_0x4cbcff];}},VisuMZ[_0x224d35(0x384)][_0x224d35(0x250)]=Window_Base[_0x224d35(0x3a0)][_0x224d35(0x29a)],Window_Base[_0x224d35(0x3a0)]['update']=function(){const _0x2db05c=_0x224d35;VisuMZ[_0x2db05c(0x384)][_0x2db05c(0x250)][_0x2db05c(0x368)](this),this[_0x2db05c(0x34f)]();},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x38d)]=function(){return![];},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x34f)]=function(){const _0x124a62=_0x224d35;this[_0x124a62(0x358)]>0x0&&(this[_0x124a62(0x38d)]()&&(this['x']=this[_0x124a62(0x386)](this['x'],this[_0x124a62(0x39f)]),this['y']=this[_0x124a62(0x386)](this['y'],this[_0x124a62(0x321)]),this[_0x124a62(0x1dc)]=this[_0x124a62(0x386)](this[_0x124a62(0x1dc)],this[_0x124a62(0x320)]),this['height']=this[_0x124a62(0x386)](this[_0x124a62(0x26d)],this[_0x124a62(0x1c1)]),this['clampPlacementPosition']()),this['_moveDuration']--);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x382)]=function(_0x1e2ef0,_0x163e9e){const _0x45aedb=_0x224d35;!_0x1e2ef0&&(this[_0x45aedb(0x1dc)]=Math[_0x45aedb(0x304)](this[_0x45aedb(0x1dc)],Graphics[_0x45aedb(0x1dc)]),this[_0x45aedb(0x26d)]=Math[_0x45aedb(0x304)](this[_0x45aedb(0x26d)],Graphics[_0x45aedb(0x26d)]));if(!_0x163e9e){const _0x402851=-(Math['floor'](Graphics[_0x45aedb(0x1dc)]-Graphics[_0x45aedb(0x39a)])/0x2),_0x2e1899=_0x402851+Graphics['width']-this[_0x45aedb(0x1dc)],_0x566903=-(Math[_0x45aedb(0x223)](Graphics[_0x45aedb(0x26d)]-Graphics[_0x45aedb(0x22a)])/0x2),_0x19f6cc=_0x566903+Graphics[_0x45aedb(0x26d)]-this['height'];this['x']=this['x'][_0x45aedb(0x1dd)](_0x402851,_0x2e1899),this['y']=this['y'][_0x45aedb(0x1dd)](_0x566903,_0x19f6cc);}},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x386)]=function(_0x34f08b,_0x265545){const _0x4797c2=_0x224d35,_0x1031ef=this['_moveDuration'],_0x1580d0=this['_wholeMoveDuration'],_0x335d3c=this[_0x4797c2(0x3f8)]((_0x1580d0-_0x1031ef)/_0x1580d0),_0x305470=this[_0x4797c2(0x3f8)]((_0x1580d0-_0x1031ef+0x1)/_0x1580d0),_0x2d6134=(_0x34f08b-_0x265545*_0x335d3c)/(0x1-_0x335d3c);return _0x2d6134+(_0x265545-_0x2d6134)*_0x305470;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3f8)]=function(_0x1123be){const _0x24e141=_0x224d35,_0x35c122=0x2;switch(this[_0x24e141(0x251)]){case 0x0:return _0x1123be;case 0x1:return this[_0x24e141(0x2e7)](_0x1123be,_0x35c122);case 0x2:return this['easeOut'](_0x1123be,_0x35c122);case 0x3:return this[_0x24e141(0x3a5)](_0x1123be,_0x35c122);default:return Imported['VisuMZ_0_CoreEngine']?VisuMZ['applyMoveEasing'](_0x1123be,this[_0x24e141(0x251)]):_0x1123be;}},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x39c)]=function(_0x1f37c4,_0x4ad97e,_0x4dbc42,_0x23dae8,_0x6ef33d,_0x4ae9af){const _0x32e67f=_0x224d35;this[_0x32e67f(0x39f)]=_0x1f37c4,this[_0x32e67f(0x321)]=_0x4ad97e,this[_0x32e67f(0x320)]=_0x4dbc42||this[_0x32e67f(0x1dc)],this['_moveTargetHeight']=_0x23dae8||this[_0x32e67f(0x26d)],this[_0x32e67f(0x358)]=_0x6ef33d||0x1;if(this[_0x32e67f(0x358)]<=0x0)this[_0x32e67f(0x358)]=0x1;this[_0x32e67f(0x2d4)]=this['_moveDuration'],this['_moveEasingType']=_0x4ae9af||0x0;if(_0x6ef33d<=0x0)this['updateMove']();},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x213)]=function(_0x1a539e,_0x1b13db,_0x1de07d,_0x31efaa,_0x41d9c5,_0x498acc){const _0x2f663c=_0x224d35;this[_0x2f663c(0x39f)]=this['x']+_0x1a539e,this[_0x2f663c(0x321)]=this['y']+_0x1b13db,this['_moveTargetWidth']=this[_0x2f663c(0x1dc)]+(_0x1de07d||0x0),this[_0x2f663c(0x1c1)]=this[_0x2f663c(0x26d)]+(_0x31efaa||0x0),this['_moveDuration']=_0x41d9c5||0x1;if(this['_moveDuration']<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x2f663c(0x358)],this[_0x2f663c(0x251)]=_0x498acc||0x0;if(_0x41d9c5<=0x0)this['updateMove']();},Window_Base[_0x224d35(0x3a0)]['resetRect']=function(_0x49562a,_0x286659){const _0x1d79f6=_0x224d35;this[_0x1d79f6(0x39c)](this[_0x1d79f6(0x297)]['x'],this[_0x1d79f6(0x297)]['y'],this[_0x1d79f6(0x297)]['width'],this[_0x1d79f6(0x297)]['height'],_0x49562a,_0x286659);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x330)]=Window_Base['prototype'][_0x224d35(0x31c)],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x31c)]=function(_0x4f98a8){const _0x10cad8=_0x224d35;if(this['isColorLocked']())return;_0x4f98a8=_0x4f98a8['replace'](/\,/g,''),this[_0x10cad8(0x26e)]=this[_0x10cad8(0x26e)]||[],this['_textColorStack'][_0x10cad8(0x2b6)](this['contents'][_0x10cad8(0x24a)]),VisuMZ[_0x10cad8(0x384)][_0x10cad8(0x330)][_0x10cad8(0x368)](this,_0x4f98a8);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x22e)]=function(_0x4833d0){const _0x402359=_0x224d35;this[_0x402359(0x301)](_0x4833d0);if(this[_0x402359(0x2f8)]())return;_0x4833d0['drawing']&&(this[_0x402359(0x26e)]=this[_0x402359(0x26e)]||[],this[_0x402359(0x1fd)][_0x402359(0x24a)]=this['_textColorStack'][_0x402359(0x398)]()||ColorManager[_0x402359(0x1df)]());},Window_Base['prototype'][_0x224d35(0x2c8)]=function(_0x505718){const _0x16f75a=_0x224d35;return _0x505718=this[_0x16f75a(0x24e)](_0x505718),_0x505718=this['convertBackslashCharacters'](_0x505718),_0x505718=this[_0x16f75a(0x33f)](_0x505718),_0x505718=this[_0x16f75a(0x1e4)](_0x505718),_0x505718=this[_0x16f75a(0x1db)](_0x505718),_0x505718=this['convertFontSettingsEscapeCharacters'](_0x505718),_0x505718=this['convertTextAlignmentEscapeCharacters'](_0x505718),_0x505718=this['convertLockColorsEscapeCharacters'](_0x505718),_0x505718=this[_0x16f75a(0x3c3)](_0x505718),_0x505718=this[_0x16f75a(0x363)](_0x505718),_0x505718=this[_0x16f75a(0x2bd)](_0x505718),_0x505718=this['convertMessageCoreEscapeReplacements'](_0x505718),_0x505718=this['postConvertEscapeCharacters'](_0x505718),_0x505718=this[_0x16f75a(0x33f)](_0x505718),_0x505718=this[_0x16f75a(0x332)](_0x505718),_0x505718=this['prepareWordWrapEscapeCharacters'](_0x505718),_0x505718;},Window_Base[_0x224d35(0x3a0)]['convertTextMacros']=function(_0x10c154){const _0x497a12=_0x224d35;this[_0x497a12(0x3c5)]=![];for(const _0x508650 of VisuMZ['MessageCore'][_0x497a12(0x37f)][_0x497a12(0x3eb)]){_0x10c154[_0x497a12(0x2df)](_0x508650[_0x497a12(0x294)])&&(this['_textMacroFound']=!![],_0x10c154=_0x10c154[_0x497a12(0x37e)](_0x508650['textCodeCheck'],_0x508650[_0x497a12(0x2ac)][_0x497a12(0x1ef)](this)));}return _0x10c154;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x387)]=function(_0x4bfddb){const _0x35f02a=_0x224d35;return _0x4bfddb=_0x4bfddb[_0x35f02a(0x37e)](/\\/g,'\x1b'),_0x4bfddb=_0x4bfddb[_0x35f02a(0x37e)](/\x1b\x1b/g,'\x5c'),_0x4bfddb;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x33f)]=function(_0x4e4c01){const _0x2b0c73=_0x224d35;for(;;){if(_0x4e4c01[_0x2b0c73(0x2df)](/\\V\[(\d+)\]/gi))_0x4e4c01=_0x4e4c01[_0x2b0c73(0x37e)](/\\V\[(\d+)\]/gi,(_0x4da134,_0x20f343)=>this[_0x2b0c73(0x387)](String($gameVariables[_0x2b0c73(0x2a0)](parseInt(_0x20f343)))));else{if(_0x4e4c01[_0x2b0c73(0x2df)](/\x1bV\[(\d+)\]/gi))_0x4e4c01=_0x4e4c01[_0x2b0c73(0x37e)](/\x1bV\[(\d+)\]/gi,(_0x353841,_0x468ad9)=>this[_0x2b0c73(0x387)](String($gameVariables[_0x2b0c73(0x2a0)](parseInt(_0x468ad9)))));else break;}}return _0x4e4c01;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1e4)]=function(_0x1c1730){return this['registerActorNameAutoColorChanges'](),_0x1c1730;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x27b)]=function(_0x2e46e1){return _0x2e46e1;},Window_Base[_0x224d35(0x3a0)]['convertShowChoiceEscapeCodes']=function(_0x260f89){const _0x3e4392=_0x224d35;return _0x260f89=_0x260f89[_0x3e4392(0x37e)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x260f89=_0x260f89['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x260f89=_0x260f89[_0x3e4392(0x37e)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x260f89;},Window_Base['prototype'][_0x224d35(0x36d)]=function(_0x10da2c){const _0x46c463=_0x224d35;return _0x10da2c=_0x10da2c[_0x46c463(0x37e)](/<B>/gi,_0x46c463(0x35a)),_0x10da2c=_0x10da2c[_0x46c463(0x37e)](/<\/B>/gi,_0x46c463(0x2ff)),_0x10da2c=_0x10da2c[_0x46c463(0x37e)](/<I>/gi,'\x1bITALIC[1]'),_0x10da2c=_0x10da2c[_0x46c463(0x37e)](/<\/I>/gi,_0x46c463(0x3b1)),_0x10da2c;},Window_Base['prototype']['convertTextAlignmentEscapeCharacters']=function(_0x3ac106){const _0x433451=_0x224d35;return _0x3ac106=_0x3ac106[_0x433451(0x37e)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x3ac106=_0x3ac106[_0x433451(0x37e)](/<\/LEFT>/gi,_0x433451(0x32e)),_0x3ac106=_0x3ac106[_0x433451(0x37e)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x3ac106=_0x3ac106[_0x433451(0x37e)](/<\/CENTER>/gi,'\x1bTEXTALIGNMENT[0]'),_0x3ac106=_0x3ac106[_0x433451(0x37e)](/<RIGHT>/gi,_0x433451(0x212)),_0x3ac106=_0x3ac106[_0x433451(0x37e)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x3ac106;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3f9)]=function(_0x52bc87){const _0x3c93a0=_0x224d35;return _0x52bc87=_0x52bc87['replace'](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x52bc87=_0x52bc87['replace'](/<\/COLORLOCK>/gi,_0x3c93a0(0x282)),_0x52bc87=_0x52bc87['replace'](/\(\(\(/gi,_0x3c93a0(0x2bf)),_0x52bc87=_0x52bc87[_0x3c93a0(0x37e)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x52bc87;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3c3)]=function(_0x2108af){const _0x58901f=_0x224d35;return _0x2108af=_0x2108af[_0x58901f(0x37e)](/\x1bN\[(\d+)\]/gi,(_0x5a4a62,_0x574589)=>this[_0x58901f(0x220)](parseInt(_0x574589))),_0x2108af=_0x2108af['replace'](/\x1bP\[(\d+)\]/gi,(_0x129d80,_0x53d874)=>this['partyMemberName'](parseInt(_0x53d874))),_0x2108af=_0x2108af[_0x58901f(0x37e)](/\x1bG/gi,TextManager[_0x58901f(0x21d)]),_0x2108af;},Window_Base['prototype']['convertHardcodedEscapeReplacements']=function(_0x42c238){const _0x12c185=_0x224d35;return _0x42c238=_0x42c238[_0x12c185(0x37e)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x12c185(0x202)]()),_0x42c238=_0x42c238['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x12c185(0x1fe)]()),_0x42c238=_0x42c238['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x42c238=_0x42c238[_0x12c185(0x37e)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x12c185(0x3f4)](![])),_0x42c238;},Window_Base[_0x224d35(0x3a0)]['battleTargetName']=function(){const _0xe208f0=_0x224d35;if(!SceneManager['isSceneBattle']())return'';if(BattleManager[_0xe208f0(0x20e)])return BattleManager['_target']['name']();if(BattleManager['_targets'][0x0])return BattleManager[_0xe208f0(0x20d)][0x0][_0xe208f0(0x239)]();return'';},Window_Base[_0x224d35(0x3a0)]['battleUserName']=function(){const _0x5e8c81=_0x224d35;if(!SceneManager['isSceneBattle']())return'';let _0x32da35=null;return _0x32da35=BattleManager[_0x5e8c81(0x32d)],!_0x32da35&&BattleManager[_0x5e8c81(0x3f0)]()&&(_0x32da35=BattleManager[_0x5e8c81(0x29d)]()),_0x32da35?_0x32da35[_0x5e8c81(0x239)]():'';},Window_Base['prototype'][_0x224d35(0x3f4)]=function(_0x2aa2c9){const _0x4f0d75=_0x224d35;if(!SceneManager[_0x4f0d75(0x329)]())return'';let _0x1b1295=BattleManager[_0x4f0d75(0x1d2)]||null;!_0x1b1295&&BattleManager[_0x4f0d75(0x3f0)]()&&(_0x1b1295=BattleManager[_0x4f0d75(0x271)]());if(_0x1b1295&&_0x1b1295[_0x4f0d75(0x3d7)]()){let _0x4adffc='';if(_0x2aa2c9)_0x4adffc+=_0x4f0d75(0x1e5)[_0x4f0d75(0x1f4)](_0x1b1295[_0x4f0d75(0x3d7)]()[_0x4f0d75(0x268)]);return _0x4adffc+=_0x1b1295[_0x4f0d75(0x3d7)]()['name'],_0x4adffc;}return'';},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2bd)]=function(_0xbde17b){const _0x1dd814=_0x224d35;for(const _0x47198e of VisuMZ[_0x1dd814(0x384)][_0x1dd814(0x37f)][_0x1dd814(0x3b3)]){_0xbde17b['match'](_0x47198e[_0x1dd814(0x294)])&&(_0xbde17b=_0xbde17b[_0x1dd814(0x37e)](_0x47198e[_0x1dd814(0x294)],_0x47198e[_0x1dd814(0x2ac)]),_0xbde17b=this[_0x1dd814(0x33f)](_0xbde17b));}return _0xbde17b;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2ef)]=function(_0x23bce3){const _0x14277a=_0x224d35;for(const _0x3589d3 of VisuMZ[_0x14277a(0x384)][_0x14277a(0x37f)][_0x14277a(0x367)]){_0x23bce3[_0x14277a(0x2df)](_0x3589d3[_0x14277a(0x294)])&&(_0x23bce3=_0x23bce3[_0x14277a(0x37e)](_0x3589d3[_0x14277a(0x294)],_0x3589d3[_0x14277a(0x2ac)]['bind'](this)),_0x23bce3=this[_0x14277a(0x33f)](_0x23bce3));}return _0x23bce3;},Window_Base['prototype'][_0x224d35(0x220)]=function(_0x1e7242){const _0x2aaa84=_0x224d35,_0x3afc00=_0x1e7242>=0x1?$gameActors[_0x2aaa84(0x29d)](_0x1e7242):null,_0x57cdb0=_0x3afc00?_0x3afc00[_0x2aaa84(0x239)]():'',_0x2fcc89=Number(VisuMZ[_0x2aaa84(0x384)]['Settings'][_0x2aaa84(0x28f)][_0x2aaa84(0x314)]);return this['isAutoColorAffected']()&&_0x2fcc89!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x2fcc89,_0x57cdb0):_0x57cdb0;},Window_Base[_0x224d35(0x3a0)]['partyMemberName']=function(_0x216d1a){const _0x313fc2=_0x224d35,_0x1b569e=_0x216d1a>=0x1?$gameParty['members']()[_0x216d1a-0x1]:null,_0x5a4340=_0x1b569e?_0x1b569e['name']():'',_0x2f950b=Number(VisuMZ[_0x313fc2(0x384)][_0x313fc2(0x37f)][_0x313fc2(0x28f)][_0x313fc2(0x314)]);return this['isAutoColorAffected']()&&_0x2f950b!==0x0?_0x313fc2(0x290)[_0x313fc2(0x1f4)](_0x2f950b,_0x5a4340):_0x5a4340;},Window_Base['prototype'][_0x224d35(0x332)]=function(_0x294f8a){const _0x1a376e=_0x224d35;return this[_0x1a376e(0x39b)]()&&(_0x294f8a=this[_0x1a376e(0x352)](_0x294f8a),_0x294f8a=this[_0x1a376e(0x380)](_0x294f8a)),_0x294f8a;},Window_Base['prototype'][_0x224d35(0x352)]=function(_0x3cc86b){const _0x3af630=_0x224d35;for(autoColor of VisuMZ[_0x3af630(0x384)][_0x3af630(0x2cb)]){_0x3cc86b=_0x3cc86b[_0x3af630(0x37e)](autoColor[0x0],autoColor[0x1]);}return _0x3cc86b;},Window_Base['prototype']['clearActorNameAutoColor']=function(){this['_autoColorActorNames']=[];},Window_Base[_0x224d35(0x3a0)]['registerActorNameAutoColorChanges']=function(){const _0x3f8647=_0x224d35;this[_0x3f8647(0x342)]();const _0x2ee365=VisuMZ[_0x3f8647(0x384)][_0x3f8647(0x37f)][_0x3f8647(0x28f)],_0x1075af=_0x2ee365[_0x3f8647(0x314)];if(_0x1075af<=0x0)return;for(const _0x2e86b8 of $gameActors['_data']){if(!_0x2e86b8)continue;const _0x32b634=_0x2e86b8['name']();if(_0x32b634[_0x3f8647(0x313)]()['length']<=0x0)continue;if(/^\d+$/[_0x3f8647(0x29b)](_0x32b634))continue;if(_0x32b634['match'](/-----/i))continue;let _0x5e104d=VisuMZ[_0x3f8647(0x384)][_0x3f8647(0x395)](_0x32b634);const _0x3614ee=new RegExp('\x5cb'+_0x5e104d+'\x5cb','g'),_0x3a100f=_0x3f8647(0x290)[_0x3f8647(0x1f4)](_0x1075af,_0x32b634);this[_0x3f8647(0x20a)][_0x3f8647(0x291)]([_0x3614ee,_0x3a100f]);}},Window_Base[_0x224d35(0x3a0)]['processActorNameAutoColorChanges']=function(_0x18304d){const _0xfa08fc=_0x224d35;this[_0xfa08fc(0x20a)]===undefined&&this[_0xfa08fc(0x260)]();for(autoColor of this['_autoColorActorNames']){_0x18304d=_0x18304d[_0xfa08fc(0x37e)](autoColor[0x0],autoColor[0x1]);}return _0x18304d;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1fa)]=function(_0x5a08b8,_0x21a2e2,_0x515979){const _0x3dd4d4=_0x224d35;if(!_0x5a08b8)return'';const _0x2f11e1=_0x5a08b8[_0x21a2e2];let _0x243cc7='';if(_0x2f11e1&&_0x515979&&_0x2f11e1[_0x3dd4d4(0x268)]){const _0x30b954=_0x3dd4d4(0x3e6);_0x243cc7=_0x30b954[_0x3dd4d4(0x1f4)](_0x2f11e1[_0x3dd4d4(0x268)],_0x2f11e1['name']);}else _0x2f11e1?_0x243cc7=_0x2f11e1['name']:_0x243cc7='';return this[_0x3dd4d4(0x39b)]()&&(_0x243cc7=this['applyDatabaseAutoColor'](_0x243cc7,_0x5a08b8)),_0x243cc7;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1ee)]=function(_0x30831c){const _0x1933b3=_0x224d35,_0x4716ab=$gameParty[_0x1933b3(0x231)]();if(_0x4716ab['id']<0x0)return'';let _0x47dfaf=null;if(_0x4716ab[_0x1933b3(0x262)]===0x0)_0x47dfaf=$dataItems[_0x4716ab['id']];if(_0x4716ab[_0x1933b3(0x262)]===0x1)_0x47dfaf=$dataWeapons[_0x4716ab['id']];if(_0x4716ab[_0x1933b3(0x262)]===0x2)_0x47dfaf=$dataArmors[_0x4716ab['id']];if(!_0x47dfaf)return'';return _0x30831c?_0x1933b3(0x3e6)[_0x1933b3(0x1f4)](_0x47dfaf[_0x1933b3(0x268)],_0x47dfaf[_0x1933b3(0x239)]):_0x47dfaf[_0x1933b3(0x239)];},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x36b)]=function(){const _0x29ba32=_0x224d35,_0x5f1039=$gameParty[_0x29ba32(0x231)]();if(_0x5f1039['id']<=0x0)return'';return _0x5f1039[_0x29ba32(0x205)];},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x38a)]=function(_0x2baffe,_0x5e3c5b){const _0x54aee6=_0x224d35,_0x14e896=VisuMZ[_0x54aee6(0x384)][_0x54aee6(0x37f)][_0x54aee6(0x28f)];let _0x10916f=0x0;if(_0x5e3c5b===$dataActors)_0x10916f=_0x14e896[_0x54aee6(0x314)];if(_0x5e3c5b===$dataClasses)_0x10916f=_0x14e896[_0x54aee6(0x3a2)];if(_0x5e3c5b===$dataSkills)_0x10916f=_0x14e896['Skills'];if(_0x5e3c5b===$dataItems)_0x10916f=_0x14e896[_0x54aee6(0x2a5)];if(_0x5e3c5b===$dataWeapons)_0x10916f=_0x14e896[_0x54aee6(0x3c2)];if(_0x5e3c5b===$dataArmors)_0x10916f=_0x14e896[_0x54aee6(0x2e9)];if(_0x5e3c5b===$dataEnemies)_0x10916f=_0x14e896['Enemies'];if(_0x5e3c5b===$dataStates)_0x10916f=_0x14e896[_0x54aee6(0x222)];return _0x10916f>0x0&&(_0x2baffe=_0x54aee6(0x290)[_0x54aee6(0x1f4)](_0x10916f,_0x2baffe)),_0x2baffe;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x276)]=function(_0x49c9db){const _0x4e065b=_0x224d35;_0x49c9db=_0x49c9db['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x4d0818,_0x405908)=>this['setWordWrap'](!![])),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x2eed6b,_0x1d1525)=>this[_0x4e065b(0x292)](![])),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2349c5,_0x1bc116)=>this[_0x4e065b(0x292)](![]));if(_0x49c9db[_0x4e065b(0x2df)](Window_Message[_0x4e065b(0x3aa)]))this['setWordWrap'](![]);else _0x49c9db[_0x4e065b(0x2df)](Window_Message[_0x4e065b(0x2ad)])&&this[_0x4e065b(0x292)](![]);if(!this['isWordWrapEnabled']())return _0x49c9db;if(_0x49c9db[_0x4e065b(0x37c)]<=0x0)return _0x49c9db;return VisuMZ['MessageCore'][_0x4e065b(0x37f)][_0x4e065b(0x347)]['LineBreakSpace']?(_0x49c9db=_0x49c9db['replace'](/[\n\r]+/g,'\x20'),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x49c9db=_0x49c9db['replace'](/[\n\r]+/g,''),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x49c9db=this[_0x4e065b(0x23d)](_0x49c9db),_0x49c9db=_0x49c9db[_0x4e065b(0x3da)]('\x20')[_0x4e065b(0x39d)]('\x1bWrapBreak[0]'),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x49c9db=_0x49c9db[_0x4e065b(0x37e)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x49c9db;},Window_Base['prototype'][_0x224d35(0x23d)]=function(_0x37428f){return _0x37428f;},VisuMZ[_0x224d35(0x384)]['Window_Base_processNewLine']=Window_Base[_0x224d35(0x3a0)][_0x224d35(0x318)],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x318)]=function(_0xab5b99){VisuMZ['MessageCore']['Window_Base_processNewLine']['call'](this,_0xab5b99),this['processTextAlignmentX'](_0xab5b99);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x2f9)]=Window_Base[_0x224d35(0x3a0)][_0x224d35(0x31d)],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x31d)]=function(_0x168aa5,_0x6fb91b){const _0x563ef0=_0x224d35;VisuMZ[_0x563ef0(0x384)]['Window_Base_processControlCharacter'][_0x563ef0(0x368)](this,_0x168aa5,_0x6fb91b),_0x6fb91b==='\x1bWrapBreak[0]'&&this['processWrapBreak'](_0x168aa5);},Window_Base['prototype'][_0x224d35(0x3e3)]=function(_0x2a9b65){const _0x44a3c5=_0x224d35;var _0x5cfb4b=/^\<(.*?)\>/[_0x44a3c5(0x258)](_0x2a9b65[_0x44a3c5(0x2b5)][_0x44a3c5(0x2d8)](_0x2a9b65[_0x44a3c5(0x1e3)]));return _0x5cfb4b?(_0x2a9b65[_0x44a3c5(0x1e3)]+=_0x5cfb4b[0x0][_0x44a3c5(0x37c)],String(_0x5cfb4b[0x0][_0x44a3c5(0x2d8)](0x1,_0x5cfb4b[0x0][_0x44a3c5(0x37c)]-0x1))):'';},VisuMZ[_0x224d35(0x384)]['Window_Base_processEscapeCharacter']=Window_Base[_0x224d35(0x3a0)]['processEscapeCharacter'],Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2cf)]=function(_0x19ab9b,_0x1b83a){const _0x4f87af=_0x224d35;switch(_0x19ab9b){case'C':_0x1b83a[_0x4f87af(0x3b7)]?VisuMZ['MessageCore'][_0x4f87af(0x21c)][_0x4f87af(0x368)](this,_0x19ab9b,_0x1b83a):this['obtainEscapeParam'](_0x1b83a);break;case'I':case'{':case'}':VisuMZ[_0x4f87af(0x384)][_0x4f87af(0x21c)][_0x4f87af(0x368)](this,_0x19ab9b,_0x1b83a);break;case'FS':this[_0x4f87af(0x3b4)](_0x1b83a);break;case'PX':this[_0x4f87af(0x2bc)](_0x1b83a);break;case'PY':this[_0x4f87af(0x22c)](_0x1b83a);break;case'BOLD':this['processFontChangeBold'](this[_0x4f87af(0x301)](_0x1b83a));break;case'CENTERPICTURE':this[_0x4f87af(0x2ba)](_0x1b83a);break;case _0x4f87af(0x361):this[_0x4f87af(0x2f5)](_0x1b83a);break;case'COMMONEVENT':this[_0x4f87af(0x2d1)](_0x1b83a);break;case _0x4f87af(0x2a6):this[_0x4f87af(0x338)](this[_0x4f87af(0x301)](_0x1b83a));break;case'PICTURE':this[_0x4f87af(0x25b)](_0x1b83a);break;case _0x4f87af(0x264):this[_0x4f87af(0x22e)](_0x1b83a);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0x1b83a);break;case _0x4f87af(0x30c):this['processCustomWait'](_0x1b83a);break;case _0x4f87af(0x3d4):this[_0x4f87af(0x3f6)](_0x1b83a);break;default:this[_0x4f87af(0x2e3)](_0x19ab9b,_0x1b83a);}},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2e3)]=function(_0x237121,_0x39c73d){const _0x4eaf1d=_0x224d35;for(const _0x1d8a60 of VisuMZ[_0x4eaf1d(0x384)][_0x4eaf1d(0x37f)][_0x4eaf1d(0x3b3)]){if(_0x1d8a60[_0x4eaf1d(0x1d9)]===_0x237121){if(_0x1d8a60[_0x4eaf1d(0x23c)]==='')this[_0x4eaf1d(0x301)](_0x39c73d);_0x1d8a60[_0x4eaf1d(0x20c)][_0x4eaf1d(0x368)](this,_0x39c73d);if(this[_0x4eaf1d(0x381)]===Window_Message){const _0x1d2ee0=_0x1d8a60['CommonEvent']||0x0;if(_0x1d2ee0>0x0)this[_0x4eaf1d(0x30b)](_0x1d2ee0);}}}},Window_Base[_0x224d35(0x3a0)]['makeFontBigger']=function(){const _0x273f29=_0x224d35;this['contents'][_0x273f29(0x263)]+=VisuMZ[_0x273f29(0x384)][_0x273f29(0x37f)][_0x273f29(0x3e4)]['FontChangeValue'],this[_0x273f29(0x1fd)][_0x273f29(0x263)]=Math[_0x273f29(0x304)](this[_0x273f29(0x1fd)]['fontSize'],VisuMZ[_0x273f29(0x384)][_0x273f29(0x37f)]['General'][_0x273f29(0x26b)]);},Window_Base['prototype']['makeFontSmaller']=function(){const _0x5730dc=_0x224d35;this[_0x5730dc(0x1fd)][_0x5730dc(0x263)]-=VisuMZ[_0x5730dc(0x384)]['Settings']['General'][_0x5730dc(0x373)],this['contents'][_0x5730dc(0x263)]=Math['max'](this['contents']['fontSize'],VisuMZ[_0x5730dc(0x384)][_0x5730dc(0x37f)][_0x5730dc(0x3e4)][_0x5730dc(0x25a)]);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3b4)]=function(_0x5d41d0){const _0x56ef53=_0x224d35,_0x5b8452=this[_0x56ef53(0x301)](_0x5d41d0);this['contents'][_0x56ef53(0x263)]=_0x5b8452[_0x56ef53(0x1dd)](VisuMZ[_0x56ef53(0x384)][_0x56ef53(0x37f)]['General'][_0x56ef53(0x25a)],VisuMZ['MessageCore']['Settings'][_0x56ef53(0x3e4)][_0x56ef53(0x26b)]);},Window_Base['prototype'][_0x224d35(0x3be)]=function(_0x94aba8){const _0x5e3fa4=_0x224d35;let _0x4e3124=this['contents'][_0x5e3fa4(0x263)];const _0x32c030=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x92f139=_0x32c030['exec'](_0x94aba8);if(!_0x92f139)break;const _0x1226f0=String(_0x92f139[0x1])[_0x5e3fa4(0x3f3)]();if(_0x1226f0==='{')this[_0x5e3fa4(0x1d7)]();else{if(_0x1226f0==='}')this[_0x5e3fa4(0x2d2)]();else _0x1226f0==='FS'&&(this[_0x5e3fa4(0x1fd)][_0x5e3fa4(0x263)]=parseInt(_0x92f139[0x3])[_0x5e3fa4(0x1dd)](VisuMZ['MessageCore']['Settings'][_0x5e3fa4(0x3e4)][_0x5e3fa4(0x25a)],VisuMZ[_0x5e3fa4(0x384)][_0x5e3fa4(0x37f)][_0x5e3fa4(0x3e4)][_0x5e3fa4(0x26b)]));}this[_0x5e3fa4(0x1fd)][_0x5e3fa4(0x263)]>_0x4e3124&&(_0x4e3124=this[_0x5e3fa4(0x1fd)]['fontSize']);}return _0x4e3124;},Window_Base['prototype']['processPxTextCode']=function(_0x2ba0b8){const _0x35b6a8=_0x224d35;_0x2ba0b8['x']=this[_0x35b6a8(0x301)](_0x2ba0b8),VisuMZ[_0x35b6a8(0x384)][_0x35b6a8(0x37f)][_0x35b6a8(0x3e4)]['RelativePXPY']&&(_0x2ba0b8['x']+=_0x2ba0b8['startX']);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x22c)]=function(_0x2932b2){const _0x2e459a=_0x224d35;_0x2932b2['y']=this[_0x2e459a(0x301)](_0x2932b2),VisuMZ[_0x2e459a(0x384)][_0x2e459a(0x37f)]['General'][_0x2e459a(0x2a2)]&&(_0x2932b2['y']+=_0x2932b2[_0x2e459a(0x3e1)]);},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x334)]=function(_0x43a1f8){const _0x9c7328=_0x224d35;this[_0x9c7328(0x1fd)][_0x9c7328(0x3af)]=!!_0x43a1f8;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x338)]=function(_0x13cc84){const _0xbd0a2c=_0x224d35;this[_0xbd0a2c(0x1fd)][_0xbd0a2c(0x241)]=!!_0x13cc84;},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x1ca)]=function(_0x459d45){const _0x4e26fe=_0x224d35,_0x58b20a=this['obtainEscapeParam'](_0x459d45);if(!_0x459d45['drawing'])return;switch(_0x58b20a){case 0x0:this[_0x4e26fe(0x29c)](_0x4e26fe(0x24b));return;case 0x1:this[_0x4e26fe(0x29c)]('left');break;case 0x2:this[_0x4e26fe(0x29c)](_0x4e26fe(0x3a4));break;case 0x3:this[_0x4e26fe(0x29c)]('right');break;}this[_0x4e26fe(0x1ec)](_0x459d45);},Window_Base[_0x224d35(0x3a0)]['processTextAlignmentX']=function(_0x43ca84){const _0xb582f4=_0x224d35;if(!_0x43ca84[_0xb582f4(0x3b7)])return;if(_0x43ca84['rtl'])return;if(this[_0xb582f4(0x3bb)]()==='default')return;let _0x1b014a=_0x43ca84['text'][_0xb582f4(0x306)](_0xb582f4(0x3ab),_0x43ca84[_0xb582f4(0x1e3)]+0x1),_0x2620ef=_0x43ca84[_0xb582f4(0x2b5)][_0xb582f4(0x306)]('\x0a',_0x43ca84['index']+0x1);if(_0x1b014a<0x0)_0x1b014a=_0x43ca84[_0xb582f4(0x2b5)][_0xb582f4(0x37c)]+0x1;if(_0x2620ef>0x0)_0x1b014a=Math[_0xb582f4(0x304)](_0x1b014a,_0x2620ef);const _0x1e63da=_0x43ca84['text']['substring'](_0x43ca84[_0xb582f4(0x1e3)],_0x1b014a),_0x10fecd=this[_0xb582f4(0x3ae)](_0x1e63da)['width'],_0x209d03=_0x43ca84[_0xb582f4(0x1dc)]||this[_0xb582f4(0x27e)]-0x8,_0x5ca069=this[_0xb582f4(0x381)]===Window_Message&&$gameMessage[_0xb582f4(0x2cd)]()!=='';switch(this[_0xb582f4(0x3bb)]()){case _0xb582f4(0x3db):_0x43ca84['x']=_0x43ca84[_0xb582f4(0x1de)];break;case _0xb582f4(0x3a4):_0x43ca84['x']=_0x43ca84['startX'],_0x43ca84['x']+=Math[_0xb582f4(0x223)]((_0x209d03-_0x10fecd)/0x2);_0x5ca069&&(_0x43ca84['x']-=_0x43ca84['startX']/0x2);break;case _0xb582f4(0x3a3):_0x43ca84['x']=_0x209d03-_0x10fecd+_0x43ca84[_0xb582f4(0x1de)];_0x5ca069&&(_0x43ca84['x']-=_0x43ca84[_0xb582f4(0x1de)]);break;}},Window_Base[_0x224d35(0x3a0)]['textSizeExTextAlignment']=function(_0x273b56){const _0x4d5724=_0x224d35;_0x273b56=_0x273b56[_0x4d5724(0x37e)](/\x1b!/g,''),_0x273b56=_0x273b56[_0x4d5724(0x37e)](/\x1b\|/g,''),_0x273b56=_0x273b56[_0x4d5724(0x37e)](/\x1b\./g,'');const _0xb05617=this['createTextState'](_0x273b56,0x0,0x0,0x0),_0x39b1f2=this[_0x4d5724(0x2b2)]();return _0xb05617['drawing']=![],this[_0x4d5724(0x2d3)](_0xb05617),this[_0x4d5724(0x1c3)](_0x39b1f2),{'width':_0xb05617[_0x4d5724(0x240)],'height':_0xb05617[_0x4d5724(0x200)]};},Window_Base[_0x224d35(0x1c6)]=VisuMZ[_0x224d35(0x384)][_0x224d35(0x37f)][_0x224d35(0x347)][_0x224d35(0x217)]||0x0,Window_Base[_0x224d35(0x3a0)][_0x224d35(0x3f6)]=function(_0x8a9637){const _0x692e1d=_0x224d35,_0x27feee=(_0x8a9637[_0x692e1d(0x396)]?-0x1:0x1)*this[_0x692e1d(0x1f9)]('\x20');_0x8a9637['x']+=_0x27feee;if(this['obtainEscapeParam'](_0x8a9637)>0x0)_0x8a9637['x']+=_0x27feee;if(_0x8a9637[_0x692e1d(0x396)])return;let _0x599927=_0x8a9637[_0x692e1d(0x2b5)][_0x692e1d(0x306)]('\x1bWrapBreak[0]',_0x8a9637[_0x692e1d(0x1e3)]+0x1),_0x41496d=_0x8a9637['text'][_0x692e1d(0x306)]('\x0a',_0x8a9637[_0x692e1d(0x1e3)]+0x1);if(_0x599927<0x0)_0x599927=_0x8a9637[_0x692e1d(0x2b5)]['length']+0x1;if(_0x41496d>0x0)_0x599927=Math['min'](_0x599927,_0x41496d);const _0x2405a8=_0x8a9637[_0x692e1d(0x2b5)][_0x692e1d(0x3e9)](_0x8a9637['index'],_0x599927),_0x2e72fc=this[_0x692e1d(0x2c3)](_0x2405a8)['width'];let _0x1a4211=_0x8a9637['width']||this['innerWidth'];_0x1a4211-=Window_Base[_0x692e1d(0x1c6)];if(this['constructor']===Window_Message){const _0x14fc23=$gameMessage[_0x692e1d(0x2cd)]()===''?0x0:ImageManager[_0x692e1d(0x1cd)]+0x14;_0x1a4211-=_0x14fc23,VisuMZ[_0x692e1d(0x384)]['Settings'][_0x692e1d(0x347)][_0x692e1d(0x238)]&&(_0x1a4211-=_0x14fc23);}let _0x522a71=![];if(_0x8a9637['x']+_0x2e72fc>_0x8a9637[_0x692e1d(0x1de)]+_0x1a4211)_0x522a71=!![];if(_0x2e72fc===0x0)_0x522a71=!![];_0x522a71&&(_0x8a9637[_0x692e1d(0x2b5)]=_0x8a9637[_0x692e1d(0x2b5)][_0x692e1d(0x2d8)](0x0,_0x8a9637[_0x692e1d(0x1e3)])+'\x0a'+_0x8a9637['text'][_0x692e1d(0x31a)](_0x8a9637[_0x692e1d(0x1e3)]));},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2c3)]=function(_0x323b56){const _0x4c789e=_0x224d35,_0xecae21=this['createTextState'](_0x323b56,0x0,0x0,0x0),_0x3f4f8c=this[_0x4c789e(0x2b2)]();return _0xecae21[_0x4c789e(0x3b7)]=![],this[_0x4c789e(0x292)](![]),this[_0x4c789e(0x2d3)](_0xecae21),this[_0x4c789e(0x292)](!![]),this[_0x4c789e(0x1c3)](_0x3f4f8c),{'width':_0xecae21[_0x4c789e(0x240)],'height':_0xecae21[_0x4c789e(0x200)]};},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2d1)]=function(_0x3305f9){const _0x20a4e7=_0x224d35;return this[_0x20a4e7(0x301)](_0x3305f9);},Window_Base[_0x224d35(0x3a0)]['processDrawPicture']=function(_0xfe4ca9){const _0x1d1d9e=_0x224d35,_0x1f4589=this[_0x1d1d9e(0x3e3)](_0xfe4ca9)[_0x1d1d9e(0x3da)](',');if(!_0xfe4ca9['drawing'])return;const _0x2e1322=_0x1f4589[0x0]['trim'](),_0x2edfbd=_0x1f4589[0x1]||0x0,_0x3e0a24=_0x1f4589[0x2]||0x0,_0x1148c0=ImageManager['loadPicture'](_0x2e1322),_0x3abaf6=this[_0x1d1d9e(0x1fd)][_0x1d1d9e(0x1cc)];_0x1148c0['addLoadListener'](this[_0x1d1d9e(0x350)][_0x1d1d9e(0x1ef)](this,_0x1148c0,_0xfe4ca9['x'],_0xfe4ca9['y'],_0x2edfbd,_0x3e0a24,_0x3abaf6));},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x350)]=function(_0x397389,_0x1f634b,_0x59b7a3,_0x1f9aaa,_0x26f91b,_0x1749a6){const _0x1a7856=_0x224d35;_0x1f9aaa=_0x1f9aaa||_0x397389[_0x1a7856(0x1dc)],_0x26f91b=_0x26f91b||_0x397389['height'],this[_0x1a7856(0x1fb)][_0x1a7856(0x1cc)]=_0x1749a6,this[_0x1a7856(0x1fb)][_0x1a7856(0x312)](_0x397389,0x0,0x0,_0x397389[_0x1a7856(0x1dc)],_0x397389['height'],_0x1f634b,_0x59b7a3,_0x1f9aaa,_0x26f91b),this[_0x1a7856(0x1fb)][_0x1a7856(0x1cc)]=0xff;},Window_Base['prototype'][_0x224d35(0x2ba)]=function(_0x1ca5bc){const _0x1c13b8=_0x224d35,_0x1f8486=this[_0x1c13b8(0x3e3)](_0x1ca5bc)[_0x1c13b8(0x3da)](',');if(!_0x1ca5bc['drawing'])return;const _0x2862e5=_0x1f8486[0x0][_0x1c13b8(0x313)](),_0x476c2f=ImageManager[_0x1c13b8(0x255)](_0x2862e5),_0x212032=JsonEx['makeDeepCopy'](_0x1ca5bc),_0x57f157=this['contents'][_0x1c13b8(0x1cc)];_0x476c2f[_0x1c13b8(0x2fd)](this[_0x1c13b8(0x2f1)]['bind'](this,_0x476c2f,_0x212032,_0x57f157));},Window_Base[_0x224d35(0x3a0)][_0x224d35(0x2f1)]=function(_0x5745cc,_0xb45e22,_0x87814c){const _0x5e8ea7=_0x224d35,_0x727299=_0xb45e22[_0x5e8ea7(0x1dc)]||this[_0x5e8ea7(0x27e)],_0x308e99=this[_0x5e8ea7(0x392)]!==undefined?this[_0x5e8ea7(0x23e)]():this[_0x5e8ea7(0x23b)],_0xae47e9=_0x727299/_0x5745cc[_0x5e8ea7(0x1dc)],_0x259c91=_0x308e99/_0x5745cc[_0x5e8ea7(0x26d)],_0x28131e=Math[_0x5e8ea7(0x304)](_0xae47e9,_0x259c91,0x1),_0x57bf80=this['_index']!==undefined?(this[_0x5e8ea7(0x2dd)](0x0)[_0x5e8ea7(0x26d)]-this[_0x5e8ea7(0x261)]())/0x2:0x0,_0x4b64cd=_0x5745cc['width']*_0x28131e,_0x4f8fe3=_0x5745cc[_0x5e8ea7(0x26d)]*_0x28131e,_0x538f56=Math[_0x5e8ea7(0x223)]((_0x727299-_0x4b64cd)/0x2)+_0xb45e22[_0x5e8ea7(0x1de)],_0x15bd11=Math[_0x5e8ea7(0x223)]((_0x308e99-_0x4f8fe3)/0x2)+_0xb45e22['startY']-_0x57bf80*0x2;this['contentsBack'][_0x5e8ea7(0x1cc)]=_0x87814c,this[_0x5e8ea7(0x1fb)][_0x5e8ea7(0x312)](_0x5745cc,0x0,0x0,_0x5745cc[_0x5e8ea7(0x1dc)],_0x5745cc[_0x5e8ea7(0x26d)],_0x538f56,_0x15bd11,_0x4b64cd,_0x4f8fe3),this[_0x5e8ea7(0x1fb)][_0x5e8ea7(0x1cc)]=0xff;},Window_Base[_0x224d35(0x3a0)]['processColorLock']=function(_0x455a0e){const _0xf8fdf3=_0x224d35,_0xae3c1c=this['obtainEscapeParam'](_0x455a0e);if(_0x455a0e[_0xf8fdf3(0x3b7)])this['setColorLock'](_0xae3c1c>0x0);},Window_Base[_0x224d35(0x3a0)]['processCustomWait']=function(_0x4b7c3f){const _0x4c4fc0=_0x224d35,_0x447b28=this[_0x4c4fc0(0x301)](_0x4b7c3f);this['constructor']===Window_Message&&_0x4b7c3f[_0x4c4fc0(0x3b7)]&&this[_0x4c4fc0(0x29f)](_0x447b28);},Window_Help[_0x224d35(0x3a0)][_0x224d35(0x305)]=function(){const _0x17733e=_0x224d35;this['setWordWrap']($gameSystem[_0x17733e(0x26a)]());},Window_Help[_0x224d35(0x3a0)][_0x224d35(0x39b)]=function(){return!![];},VisuMZ[_0x224d35(0x384)][_0x224d35(0x2f7)]=Window_Help[_0x224d35(0x3a0)][_0x224d35(0x33c)],Window_Help['prototype'][_0x224d35(0x33c)]=function(){const _0x5416e3=_0x224d35;this['clearActorNameAutoColor'](),VisuMZ[_0x5416e3(0x384)][_0x5416e3(0x2f7)][_0x5416e3(0x368)](this),this['resetWordWrap']();},VisuMZ['MessageCore'][_0x224d35(0x1da)]=Window_Options[_0x224d35(0x3a0)][_0x224d35(0x3b5)],Window_Options[_0x224d35(0x3a0)]['addGeneralOptions']=function(){const _0x39ae25=_0x224d35;VisuMZ[_0x39ae25(0x384)]['Window_Options_addGeneralOptions']['call'](this),this[_0x39ae25(0x1ce)]();},Window_Options[_0x224d35(0x3a0)]['addMessageCoreCommands']=function(){const _0x4cc2df=_0x224d35;VisuMZ[_0x4cc2df(0x384)]['Settings'][_0x4cc2df(0x1e9)][_0x4cc2df(0x364)]&&this[_0x4cc2df(0x1f3)]();},Window_Options[_0x224d35(0x3a0)][_0x224d35(0x1f3)]=function(){const _0x1da416=_0x224d35,_0x3c29e2=TextManager[_0x1da416(0x2a7)],_0x3487d3='textSpeed';this[_0x1da416(0x2d9)](_0x3c29e2,_0x3487d3);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x27a)]=Window_Options[_0x224d35(0x3a0)][_0x224d35(0x31e)],Window_Options[_0x224d35(0x3a0)][_0x224d35(0x31e)]=function(_0xe1bb52){const _0x5db24a=_0x224d35,_0x25ec36=this['commandSymbol'](_0xe1bb52);if(_0x25ec36==='textSpeed')return this[_0x5db24a(0x214)]();return VisuMZ[_0x5db24a(0x384)][_0x5db24a(0x27a)]['call'](this,_0xe1bb52);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x33b)]=Window_Options['prototype'][_0x224d35(0x325)],Window_Options[_0x224d35(0x3a0)][_0x224d35(0x325)]=function(_0x2973d3){const _0x215c95=_0x224d35;if(_0x2973d3===_0x215c95(0x28d))return!![];return VisuMZ[_0x215c95(0x384)]['Window_Options_isVolumeSymbol'][_0x215c95(0x368)](this,_0x2973d3);},Window_Options[_0x224d35(0x3a0)]['textSpeedStatusText']=function(){const _0x34de0d=_0x224d35,_0x462ed5=this[_0x34de0d(0x29e)](_0x34de0d(0x28d));return _0x462ed5>0xa?TextManager[_0x34de0d(0x3cd)]:_0x462ed5;},VisuMZ[_0x224d35(0x384)][_0x224d35(0x2fc)]=Window_Options[_0x224d35(0x3a0)]['changeVolume'],Window_Options[_0x224d35(0x3a0)][_0x224d35(0x326)]=function(_0x378518,_0x3c4a0e,_0x394ac6){const _0x37c048=_0x224d35;if(_0x378518===_0x37c048(0x28d))return this[_0x37c048(0x336)](_0x378518,_0x3c4a0e,_0x394ac6);VisuMZ[_0x37c048(0x384)]['Window_Options_changeVolume']['call'](this,_0x378518,_0x3c4a0e,_0x394ac6);},Window_Options[_0x224d35(0x3a0)]['changeTextSpeed']=function(_0x5c2773,_0x144e57,_0x401826){const _0x43a88e=_0x224d35,_0x1b266e=this[_0x43a88e(0x29e)](_0x5c2773),_0x1e3b94=0x1,_0x2e0426=_0x1b266e+(_0x144e57?_0x1e3b94:-_0x1e3b94);_0x2e0426>0xb&&_0x401826?this[_0x43a88e(0x20b)](_0x5c2773,0x1):this['changeValue'](_0x5c2773,_0x2e0426[_0x43a88e(0x1dd)](0x1,0xb));},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2cc)]=function(){const _0x563445=_0x224d35;let _0x2cf8da=Window_Base[_0x563445(0x3a0)]['contentsHeight'][_0x563445(0x368)](this);return _0x2cf8da-=this[_0x563445(0x2fe)](),_0x2cf8da;},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x377)]=function(){const _0xf841dd=_0x224d35;Window_Base[_0xf841dd(0x3a0)][_0xf841dd(0x377)]['call'](this),VisuMZ[_0xf841dd(0x384)][_0xf841dd(0x37f)][_0xf841dd(0x3e4)]['StretchDimmedBg']&&this[_0xf841dd(0x3e5)]();},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x3e5)]=function(){const _0xf4c44c=_0x224d35;this[_0xf4c44c(0x1f6)]['x']=Math['round'](this[_0xf4c44c(0x1dc)]/0x2),this['_dimmerSprite']['anchor']['x']=0.5,this[_0xf4c44c(0x1f6)][_0xf4c44c(0x315)]['x']=Graphics[_0xf4c44c(0x1dc)];},VisuMZ[_0x224d35(0x384)][_0x224d35(0x21e)]=Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2db)],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2db)]=function(){const _0x4c89e2=_0x224d35;VisuMZ['MessageCore'][_0x4c89e2(0x21e)][_0x4c89e2(0x368)](this),this['clearActorNameAutoColor'](),this[_0x4c89e2(0x305)](),this[_0x4c89e2(0x3ef)](![]),this['setTextAlignment'](_0x4c89e2(0x24b)),this[_0x4c89e2(0x2c5)](VisuMZ[_0x4c89e2(0x384)]['Settings'][_0x4c89e2(0x3e4)]['MessageTextDelay']);},Window_Message['prototype'][_0x224d35(0x305)]=function(){const _0x28bfc0=_0x224d35;this['setWordWrap']($gameSystem[_0x28bfc0(0x3fb)]());},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x39b)]=function(){return!![];},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2c5)]=function(_0x82367e){const _0x55c018=_0x224d35,_0x3541a1=0xb-ConfigManager['textSpeed'];_0x82367e=Math[_0x55c018(0x26f)](_0x82367e*_0x3541a1),this[_0x55c018(0x27d)]=_0x82367e,this[_0x55c018(0x3c0)]=_0x82367e;},VisuMZ['MessageCore'][_0x224d35(0x32f)]=Window_Message['prototype']['isTriggered'],Window_Message[_0x224d35(0x3a0)]['isTriggered']=function(){const _0x3c9208=_0x224d35;return VisuMZ[_0x3c9208(0x384)][_0x3c9208(0x32f)][_0x3c9208(0x368)](this)||Input[_0x3c9208(0x307)](VisuMZ[_0x3c9208(0x384)][_0x3c9208(0x37f)]['General'][_0x3c9208(0x1c9)]);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x233)]=Window_Message[_0x224d35(0x3a0)]['updatePlacement'],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2a9)]=function(){const _0x4b802d=_0x224d35;let _0x480cd8=this['y'];this['x']=Math[_0x4b802d(0x26f)]((Graphics[_0x4b802d(0x39a)]-this[_0x4b802d(0x1dc)])/0x2),VisuMZ['MessageCore'][_0x4b802d(0x233)][_0x4b802d(0x368)](this);if(this['_autoPositionTarget'])this['y']=_0x480cd8;this[_0x4b802d(0x27f)](),this[_0x4b802d(0x3ee)](),this[_0x4b802d(0x382)]();},VisuMZ[_0x224d35(0x384)][_0x224d35(0x3a7)]=Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2ae)],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2ae)]=function(_0x17b56a){const _0x36fbdc=_0x224d35;this[_0x36fbdc(0x36f)](_0x17b56a),this[_0x36fbdc(0x253)](_0x17b56a),VisuMZ[_0x36fbdc(0x384)]['Window_Message_newPage'][_0x36fbdc(0x368)](this,_0x17b56a),this[_0x36fbdc(0x346)]();},Window_Message[_0x224d35(0x3a0)]['convertNewPageTextStateMacros']=function(_0x5ce4b1){const _0x1b68b8=_0x224d35;if(!_0x5ce4b1)return;this[_0x1b68b8(0x30e)]=![],_0x5ce4b1['text']=this[_0x1b68b8(0x24e)](_0x5ce4b1['text']),this[_0x1b68b8(0x3c5)]&&(_0x5ce4b1['text']=this['prepareWordWrapEscapeCharacters'](_0x5ce4b1[_0x1b68b8(0x2b5)]),this[_0x1b68b8(0x30e)]=!![]);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x276)]=function(_0x5e0f83){const _0x7cf76c=_0x224d35;if(this['_macroBypassWordWrap'])return _0x5e0f83;return Window_Base['prototype'][_0x7cf76c(0x276)][_0x7cf76c(0x368)](this,_0x5e0f83);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x253)]=function(_0x26a520){const _0x127968=_0x224d35;this[_0x127968(0x1ff)](_0x26a520),this[_0x127968(0x359)](_0x26a520),this[_0x127968(0x1d4)]();},VisuMZ[_0x224d35(0x384)][_0x224d35(0x2b7)]=Window_Message[_0x224d35(0x3a0)][_0x224d35(0x228)],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x228)]=function(){const _0x5e38c1=_0x224d35;VisuMZ[_0x5e38c1(0x384)][_0x5e38c1(0x2b7)][_0x5e38c1(0x368)](this),this[_0x5e38c1(0x2db)]();if(this[_0x5e38c1(0x24c)])this[_0x5e38c1(0x3c8)]();},Window_Message['prototype'][_0x224d35(0x1d4)]=function(){const _0xc831a6=_0x224d35;this[_0xc831a6(0x1dc)]=$gameSystem[_0xc831a6(0x3cc)]()+this[_0xc831a6(0x375)]();;this['width']=Math['min'](Graphics[_0xc831a6(0x1dc)],this[_0xc831a6(0x1dc)]);const _0x112f20=$gameSystem[_0xc831a6(0x33e)]();this[_0xc831a6(0x26d)]=SceneManager['_scene'][_0xc831a6(0x249)](_0x112f20,![])+this[_0xc831a6(0x2fe)](),this[_0xc831a6(0x26d)]=Math[_0xc831a6(0x304)](Graphics[_0xc831a6(0x26d)],this['height']);if($gameTemp[_0xc831a6(0x340)])this[_0xc831a6(0x208)]();},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x375)]=function(){return 0x0;},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2fe)]=function(){return 0x0;},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x208)]=function(){const _0x319ea7=_0x224d35;this['x']=(Graphics['boxWidth']-this[_0x319ea7(0x1dc)])/0x2,$gameTemp[_0x319ea7(0x340)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x34f)]=function(){const _0x5a4a4e=_0x224d35,_0x13a2e8={'x':this['x'],'y':this['y']};Window_Base[_0x5a4a4e(0x3a0)][_0x5a4a4e(0x34f)][_0x5a4a4e(0x368)](this),this['updateNameBoxMove'](_0x13a2e8);},Window_Message['prototype'][_0x224d35(0x38d)]=function(){return!![];},Window_Message['prototype']['updateNameBoxMove']=function(_0x49bf82){const _0x31a781=_0x224d35;this[_0x31a781(0x1c2)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x49bf82['x'],this[_0x31a781(0x1c2)]['y']+=this['y']-_0x49bf82['y']);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x201)]=function(_0x515826,_0x523d64){const _0x22fbe0=_0x224d35;this['moveTo'](this[_0x22fbe0(0x297)]['x'],this[_0x22fbe0(0x311)]*(Graphics['boxHeight']-this[_0x22fbe0(0x26d)])/0x2,this['_resetRect']['width'],this[_0x22fbe0(0x297)][_0x22fbe0(0x26d)],_0x515826,_0x523d64);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2d1)]=function(_0x54ef8b){const _0x3de577=_0x224d35,_0x419ac4=Window_Base[_0x3de577(0x3a0)][_0x3de577(0x2d1)][_0x3de577(0x368)](this,_0x54ef8b);_0x54ef8b[_0x3de577(0x3b7)]&&this['launchMessageCommonEvent'](_0x419ac4);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x30b)]=function(_0x34584a){const _0x5e8721=_0x224d35;if($gameParty[_0x5e8721(0x316)]()){}else $gameMap[_0x5e8721(0x34b)](_0x34584a);},Window_Message[_0x224d35(0x3a0)]['processCharacter']=function(_0x2ca289){const _0x35815d=_0x224d35;this[_0x35815d(0x27d)]--,this['_textDelayCount']<=0x0&&(this[_0x35815d(0x1f1)](_0x2ca289),Window_Base[_0x35815d(0x3a0)]['processCharacter'][_0x35815d(0x368)](this,_0x2ca289));},Window_Message[_0x224d35(0x3a0)]['onProcessCharacter']=function(_0x2d1dee){const _0x25b121=_0x224d35;this[_0x25b121(0x27d)]=this[_0x25b121(0x3c0)];if(this[_0x25b121(0x3c0)]<=0x0)this['_showFast']=!![];},VisuMZ['MessageCore'][_0x224d35(0x242)]=Window_Message[_0x224d35(0x3a0)]['processEscapeCharacter'],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2cf)]=function(_0x2762d0,_0xb3eb29){const _0xd34b62=_0x224d35;!_0xb3eb29[_0xd34b62(0x3b7)]?Window_Base[_0xd34b62(0x3a0)][_0xd34b62(0x2cf)][_0xd34b62(0x368)](this,_0x2762d0,_0xb3eb29):VisuMZ[_0xd34b62(0x384)][_0xd34b62(0x242)]['call'](this,_0x2762d0,_0xb3eb29);},Window_Message['prototype'][_0x224d35(0x1ff)]=function(_0x227f00){const _0x2db93f=_0x224d35;let _0x3614f2=_0x227f00[_0x2db93f(0x2b5)];this[_0x2db93f(0x353)]={};if(this[_0x2db93f(0x35b)]())return _0x3614f2;_0x3614f2=_0x3614f2['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x1f09dd,_0x28b594)=>{const _0x5cdd1a=_0x2db93f,_0x227cf0=_0x28b594[_0x5cdd1a(0x3da)](',')[_0x5cdd1a(0x3e0)](_0x390db6=>Number(_0x390db6)||0x0);if(_0x227cf0[0x0]!==undefined)this[_0x5cdd1a(0x353)]['x']=Number(_0x227cf0[0x0]);if(_0x227cf0[0x1]!==undefined)this[_0x5cdd1a(0x353)]['y']=Number(_0x227cf0[0x1]);if(_0x227cf0[0x2]!==undefined)this['_forcedPosition'][_0x5cdd1a(0x1dc)]=Number(_0x227cf0[0x2]);if(_0x227cf0[0x3]!==undefined)this[_0x5cdd1a(0x353)][_0x5cdd1a(0x26d)]=Number(_0x227cf0[0x3]);return'';}),_0x3614f2=_0x3614f2[_0x2db93f(0x37e)](/<COORDINATES:[ ]*(.*)>/gi,(_0x1d1222,_0x48288e)=>{const _0x1c1efd=_0x2db93f,_0x2a8ce1=_0x48288e[_0x1c1efd(0x3da)](',')[_0x1c1efd(0x3e0)](_0x3c7370=>Number(_0x3c7370)||0x0);if(_0x2a8ce1[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x2a8ce1[0x0]);if(_0x2a8ce1[0x1]!==undefined)this[_0x1c1efd(0x353)]['y']=Number(_0x2a8ce1[0x1]);return'';}),_0x3614f2=_0x3614f2[_0x2db93f(0x37e)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x16b1eb,_0x40eaae)=>{const _0x6cc5f0=_0x2db93f,_0x2b6f8d=_0x40eaae[_0x6cc5f0(0x3da)](',')[_0x6cc5f0(0x3e0)](_0x37ac68=>Number(_0x37ac68)||0x0);if(_0x2b6f8d[0x0]!==undefined)this[_0x6cc5f0(0x353)][_0x6cc5f0(0x1dc)]=Number(_0x2b6f8d[0x2]);if(_0x2b6f8d[0x1]!==undefined)this[_0x6cc5f0(0x353)][_0x6cc5f0(0x26d)]=Number(_0x2b6f8d[0x3]);return'';}),_0x3614f2=_0x3614f2['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x50b73e,_0x414caf)=>{const _0x1ab689=_0x2db93f,_0x40a2c7=_0x414caf[_0x1ab689(0x3da)](',')[_0x1ab689(0x3e0)](_0x2f06cf=>Number(_0x2f06cf)||0x0);let _0x550e83=_0x40a2c7[0x0]||0x0,_0x513885=_0x40a2c7[0x1]||0x0;return $gameSystem[_0x1ab689(0x279)](_0x550e83,_0x513885),'';}),_0x227f00[_0x2db93f(0x2b5)]=_0x3614f2;},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x27f)]=function(){const _0x2a7b15=$gameSystem['getMessageWindowXyOffsets']();this['x']+=_0x2a7b15['x'],this['y']+=_0x2a7b15['y'];},Window_Message['prototype']['updateForcedPlacement']=function(){const _0x267a49=_0x224d35;this[_0x267a49(0x353)]=this[_0x267a49(0x353)]||{};const _0x27075d=['x','y',_0x267a49(0x1dc),_0x267a49(0x26d)];for(const _0x19e972 of _0x27075d){this[_0x267a49(0x353)][_0x19e972]!==undefined&&(this[_0x19e972]=Number(this[_0x267a49(0x353)][_0x19e972]));}},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x359)]=function(_0x44225a){const _0x3e887c=_0x224d35;let _0x444bdb=_0x44225a[_0x3e887c(0x2b5)];_0x444bdb=_0x444bdb['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x159089=_0x3e887c;return this[_0x159089(0x3b8)](_0x444bdb,!![],!![]),this[_0x159089(0x204)](_0x159089(0x2d6)),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0xe97a19=_0x3e887c;return this[_0xe97a19(0x3b8)](_0x444bdb,!![],![]),this[_0xe97a19(0x204)](_0xe97a19(0x2d6)),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0xcf14f2=_0x3e887c;return this[_0xcf14f2(0x3b8)](_0x444bdb,![],!![]),this[_0xcf14f2(0x204)](_0xcf14f2(0x2d6)),'';});if(SceneManager[_0x3e887c(0x329)]())_0x444bdb=_0x444bdb['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4b0b51,_0x364338)=>{const _0x2ebb38=_0x3e887c;return this[_0x2ebb38(0x3b8)](_0x444bdb,!![],!![]),this['processAutoPosition'](_0x2ebb38(0x243),Number(_0x364338)||0x1),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2aea33,_0x111e34)=>{const _0xf675de=_0x3e887c;return this[_0xf675de(0x3b8)](_0x444bdb,!![],!![]),this[_0xf675de(0x204)](_0xf675de(0x272),Number(_0x111e34)||0x0),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x45be65,_0x15f89f)=>{const _0x4e4d66=_0x3e887c;return this[_0x4e4d66(0x3b8)](_0x444bdb,!![],!![]),this['processAutoPosition'](_0x4e4d66(0x37b),Number(_0x15f89f)||0x0),'';});else SceneManager[_0x3e887c(0x3b2)]()&&(_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x381f61,_0x5717e0)=>{const _0x4f434a=_0x3e887c;return this[_0x4f434a(0x3b8)](_0x444bdb,!![],!![]),this[_0x4f434a(0x204)](_0x4f434a(0x30f),0x0),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x43c799,_0x39dd32)=>{const _0x2125fa=_0x3e887c;return this[_0x2125fa(0x3b8)](_0x444bdb,!![],!![]),this[_0x2125fa(0x204)](_0x2125fa(0x389),Number(_0x39dd32)||0x1),'';}),_0x444bdb=_0x444bdb['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x12fe5e,_0x543c59)=>{const _0xccd990=_0x3e887c;return this[_0xccd990(0x3b8)](_0x444bdb,!![],!![]),this[_0xccd990(0x204)]('map\x20party',Number(_0x543c59)||0x0),'';}),_0x444bdb=_0x444bdb[_0x3e887c(0x37e)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x9f11be,_0x242d71)=>{const _0x3478e8=_0x3e887c;return this[_0x3478e8(0x3b8)](_0x444bdb,!![],!![]),this['processAutoPosition'](_0x3478e8(0x356),Number(_0x242d71)||0x0),'';}));_0x44225a['text']=_0x444bdb;},Window_Message[_0x224d35(0x3aa)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x224d35(0x2ad)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x224d35(0x3a0)][_0x224d35(0x3b8)]=function(_0x1f2d15,_0x372111,_0x55ff65){const _0x2cea4c=_0x224d35;_0x1f2d15=_0x1f2d15[_0x2cea4c(0x37e)](Window_Message[_0x2cea4c(0x3aa)],''),_0x1f2d15=_0x1f2d15[_0x2cea4c(0x37e)](Window_Message[_0x2cea4c(0x2ad)],''),this[_0x2cea4c(0x221)]=!![];const _0x3e5efa=this['textSizeEx'](_0x1f2d15);if(_0x372111){let _0x2bd873=_0x3e5efa[_0x2cea4c(0x1dc)]+$gameSystem[_0x2cea4c(0x2a1)]()*0x2+0x6;const _0x2210b3=$gameMessage[_0x2cea4c(0x2cd)]()!=='',_0x1a0169=ImageManager[_0x2cea4c(0x1cd)],_0x733f7a=0x14;_0x2bd873+=_0x2210b3?_0x1a0169+_0x733f7a:0x4;if(_0x2bd873%0x2!==0x0)_0x2bd873+=0x1;$gameSystem[_0x2cea4c(0x2b9)](_0x2bd873);}if(_0x55ff65){let _0x360ce3=Math[_0x2cea4c(0x32a)](_0x3e5efa['height']/this[_0x2cea4c(0x261)]());$gameSystem[_0x2cea4c(0x280)](_0x360ce3);}this[_0x2cea4c(0x355)](),this[_0x2cea4c(0x221)]=![],this[_0x2cea4c(0x24c)]=!![];},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x355)]=function(){const _0x12a0b8=_0x224d35;this[_0x12a0b8(0x1d4)](),this['updatePlacement'](),this[_0x12a0b8(0x208)](),this[_0x12a0b8(0x2f0)](),this[_0x12a0b8(0x1fd)]['clear'](),this[_0x12a0b8(0x346)]();},Window_Message[_0x224d35(0x3a0)]['processAutoPosition']=function(_0x43cd5d,_0x426419){const _0x17d82b=_0x224d35;switch(_0x43cd5d[_0x17d82b(0x3ad)]()[_0x17d82b(0x313)]()){case _0x17d82b(0x243):this[_0x17d82b(0x2b4)]=$gameActors['actor'](_0x426419);break;case _0x17d82b(0x272):this[_0x17d82b(0x2b4)]=$gameParty[_0x17d82b(0x399)]()[_0x426419-0x1];break;case _0x17d82b(0x37b):this[_0x17d82b(0x2b4)]=$gameTroop['members']()[_0x426419-0x1];break;case _0x17d82b(0x30f):this['_autoPositionTarget']=$gamePlayer;break;case _0x17d82b(0x389):const _0x1e79fa=$gameActors[_0x17d82b(0x29d)](_0x426419)[_0x17d82b(0x1e3)]();_0x1e79fa===0x0?this[_0x17d82b(0x2b4)]=$gamePlayer:this[_0x17d82b(0x2b4)]=$gamePlayer[_0x17d82b(0x371)]()[_0x17d82b(0x2e1)](_0x1e79fa-0x1);break;case _0x17d82b(0x1e6):_0x426419===0x1?this[_0x17d82b(0x2b4)]=$gamePlayer:this[_0x17d82b(0x2b4)]=$gamePlayer['followers']()[_0x17d82b(0x2e1)](_0x426419-0x2);break;case _0x17d82b(0x356):this['_autoPositionTarget']=$gameMap[_0x17d82b(0x270)](_0x426419);break;}this[_0x17d82b(0x2b4)]&&this[_0x17d82b(0x3df)]();},VisuMZ[_0x224d35(0x384)]['Window_Message_synchronizeNameBox']=Window_Message[_0x224d35(0x3a0)]['synchronizeNameBox'],Window_Message[_0x224d35(0x3a0)][_0x224d35(0x328)]=function(){const _0xa2b55a=_0x224d35;this[_0xa2b55a(0x3df)](),VisuMZ[_0xa2b55a(0x384)][_0xa2b55a(0x298)][_0xa2b55a(0x368)](this);},Window_Message['prototype']['updateAutoPosition']=function(){const _0x4c8b43=_0x224d35;if(!this[_0x4c8b43(0x2b4)])return;const _0x17d485=SceneManager[_0x4c8b43(0x3f1)];if(!_0x17d485)return;if(!_0x17d485[_0x4c8b43(0x3e7)])return;const _0x116824=_0x17d485[_0x4c8b43(0x3e7)][_0x4c8b43(0x203)](this['_autoPositionTarget']);if(!_0x116824)return;let _0xa3bc2c=_0x116824['x'];_0xa3bc2c-=this[_0x4c8b43(0x1dc)]/0x2,_0xa3bc2c-=(Graphics[_0x4c8b43(0x1dc)]-Graphics['boxWidth'])/0x2;let _0x6886bd=_0x116824['y'];_0x6886bd-=this[_0x4c8b43(0x26d)],_0x6886bd-=(Graphics[_0x4c8b43(0x26d)]-Graphics[_0x4c8b43(0x22a)])/0x2,_0x6886bd-=_0x116824[_0x4c8b43(0x26d)]+0x8;const _0x3a6039=$gameSystem[_0x4c8b43(0x219)]();_0xa3bc2c+=_0x3a6039['x'],_0x6886bd+=_0x3a6039['y'],this['x']=Math[_0x4c8b43(0x26f)](_0xa3bc2c),this['y']=Math[_0x4c8b43(0x26f)](_0x6886bd),this[_0x4c8b43(0x382)](!![],![]),this['_nameBoxWindow'][_0x4c8b43(0x2a9)]();},Window_Message['prototype'][_0x224d35(0x3c8)]=function(){const _0x23d930=_0x224d35;this[_0x23d930(0x24c)]=![],this['_autoPositionTarget']=undefined,$gameSystem['initMessageCore'](),this[_0x23d930(0x355)](),this['openness']=0x0;},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x1e4)]=function(_0x4a80b5){const _0x5612f7=_0x224d35;return Window_Base['prototype'][_0x5612f7(0x1e4)][_0x5612f7(0x368)](this,_0x4a80b5);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x27b)]=function(_0x277cef){const _0x48830c=_0x224d35;return Window_Base[_0x48830c(0x3a0)][_0x48830c(0x27b)][_0x48830c(0x368)](this,_0x277cef);},Window_Message['prototype'][_0x224d35(0x24f)]=function(_0x21bae3){const _0x1e5bad=_0x224d35;this[_0x1e5bad(0x2c1)](_0x21bae3),Window_Base[_0x1e5bad(0x3a0)][_0x1e5bad(0x24f)][_0x1e5bad(0x368)](this,_0x21bae3),this[_0x1e5bad(0x286)](_0x21bae3);},Window_Message[_0x224d35(0x3a0)][_0x224d35(0x2c1)]=function(_0x1f7da5){},Window_Message[_0x224d35(0x3a0)]['postFlushTextState']=function(_0x3db2bd){},Window_NameBox[_0x224d35(0x3a0)]['isAutoColorAffected']=function(){return![];},Window_NameBox['prototype'][_0x224d35(0x390)]=function(){const _0x17638b=_0x224d35;Window_Base['prototype'][_0x17638b(0x390)][_0x17638b(0x368)](this),this[_0x17638b(0x31c)](this['defaultColor']());},Window_NameBox[_0x224d35(0x3a0)]['defaultColor']=function(){const _0x5982d9=_0x224d35,_0x2d1d42=VisuMZ[_0x5982d9(0x384)][_0x5982d9(0x37f)][_0x5982d9(0x3e4)][_0x5982d9(0x1d8)];return ColorManager['textColor'](_0x2d1d42);},VisuMZ['MessageCore'][_0x224d35(0x36a)]=Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x2a9)],Window_NameBox['prototype'][_0x224d35(0x2a9)]=function(){const _0x3cea26=_0x224d35;VisuMZ[_0x3cea26(0x384)][_0x3cea26(0x36a)][_0x3cea26(0x368)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x3cea26(0x382)](),this['updateOverlappingY']();},Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x1e4)]=function(_0x113f55){const _0x3ae899=_0x224d35;return _0x113f55=_0x113f55[_0x3ae899(0x37e)](/<LEFT>/gi,this[_0x3ae899(0x2ca)][_0x3ae899(0x1ef)](this,0x0)),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<CENTER>/gi,this[_0x3ae899(0x2ca)]['bind'](this,0x5)),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<RIGHT>/gi,this[_0x3ae899(0x2ca)][_0x3ae899(0x1ef)](this,0xa)),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<POSITION:[ ](\d+)>/gi,(_0x38c8e7,_0x13c895)=>this[_0x3ae899(0x2ca)](parseInt(_0x13c895))),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<\/LEFT>/gi,''),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<\/CENTER>/gi,''),_0x113f55=_0x113f55[_0x3ae899(0x37e)](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0x3ae899(0x1e4)][_0x3ae899(0x368)](this,_0x113f55);},Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x2ca)]=function(_0x14e047){const _0x5cec4a=_0x224d35;return this[_0x5cec4a(0x26c)]=_0x14e047,'';},Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x285)]=function(){const _0x2da6c6=_0x224d35;if($gameMessage[_0x2da6c6(0x257)]())return;this[_0x2da6c6(0x26c)]=this[_0x2da6c6(0x26c)]||0x0;const _0x46bf82=this[_0x2da6c6(0x3d5)],_0x433278=Math[_0x2da6c6(0x223)](_0x46bf82[_0x2da6c6(0x1dc)]*this[_0x2da6c6(0x26c)]/0xa);this['x']=_0x46bf82['x']+_0x433278-Math[_0x2da6c6(0x223)](this['width']/0x2),this['x']=this['x'][_0x2da6c6(0x1dd)](_0x46bf82['x'],_0x46bf82['x']+_0x46bf82[_0x2da6c6(0x1dc)]-this[_0x2da6c6(0x1dc)]);},Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x391)]=function(){const _0x157a5b=_0x224d35;if($gameMessage[_0x157a5b(0x257)]())return;this['_relativePosition']=this[_0x157a5b(0x26c)]||0x0;const _0x39d0f5=VisuMZ[_0x157a5b(0x384)][_0x157a5b(0x37f)]['General'][_0x157a5b(0x2e4)],_0x38dc91=VisuMZ[_0x157a5b(0x384)][_0x157a5b(0x37f)][_0x157a5b(0x3e4)][_0x157a5b(0x2c9)],_0x757690=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x157a5b(0x223)](_0x39d0f5*_0x757690),this['y']+=_0x38dc91;},Window_NameBox[_0x224d35(0x3a0)]['updateOverlappingY']=function(){const _0x58d1c4=_0x224d35,_0x120b7d=this[_0x58d1c4(0x3d5)],_0x55a0e2=_0x120b7d['y'],_0x380b6c=VisuMZ[_0x58d1c4(0x384)][_0x58d1c4(0x37f)][_0x58d1c4(0x3e4)][_0x58d1c4(0x2c9)];_0x55a0e2>this['y']&&_0x55a0e2<this['y']+this[_0x58d1c4(0x26d)]-_0x380b6c&&(this['y']=_0x120b7d['y']+_0x120b7d[_0x58d1c4(0x26d)]);},VisuMZ[_0x224d35(0x384)][_0x224d35(0x30d)]=Window_NameBox['prototype'][_0x224d35(0x33c)],Window_NameBox[_0x224d35(0x3a0)][_0x224d35(0x33c)]=function(){const _0x532db8=_0x224d35;this[_0x532db8(0x26c)]=0x0,VisuMZ['MessageCore']['Window_NameBox_refresh']['call'](this);},Window_ChoiceList['prototype'][_0x224d35(0x35b)]=function(){return![];},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x39b)]=function(){return!![];},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x23e)]=function(){const _0xfc5588=_0x224d35;return $gameSystem[_0xfc5588(0x1eb)]()+0x8;},Window_ChoiceList['prototype']['maxCols']=function(){const _0x58fdc7=_0x224d35;return $gameSystem[_0x58fdc7(0x310)]();},Window_ChoiceList[_0x224d35(0x3a0)]['start']=function(){const _0xc01f1d=_0x224d35;this[_0xc01f1d(0x33c)](),this[_0xc01f1d(0x38e)](),this[_0xc01f1d(0x22b)](),this[_0xc01f1d(0x2c6)]();},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x33c)]=function(){const _0x380530=_0x224d35;this[_0x380530(0x393)](),this[_0x380530(0x343)](),this[_0x380530(0x3d5)]&&(this[_0x380530(0x2a9)](),this['placeCancelButton']()),this[_0x380530(0x346)](),this['updateBackground'](),this[_0x380530(0x377)](),Window_Selectable[_0x380530(0x3a0)][_0x380530(0x33c)][_0x380530(0x368)](this);},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x343)]=function(){const _0x26b2a0=_0x224d35,_0x3ca67e=$gameMessage['choices']();let _0xd04498=0x0;for(let _0x308eda of _0x3ca67e){_0x308eda=this[_0x26b2a0(0x362)](_0x308eda);if(this[_0x26b2a0(0x3d8)](_0x308eda)){const _0x246029=this[_0x26b2a0(0x1d1)](_0x308eda),_0x3853ce=this['isChoiceEnabled'](_0x308eda);this['addCommand'](_0x246029,_0x26b2a0(0x267),_0x3853ce,_0xd04498);}_0xd04498++;}},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x362)]=function(_0x8c2b12){const _0x11dfc6=_0x224d35;return Window_Base[_0x11dfc6(0x3a0)][_0x11dfc6(0x24e)][_0x11dfc6(0x368)](this,_0x8c2b12);},Window_ChoiceList['prototype'][_0x224d35(0x3d8)]=function(_0x1e8042){const _0x411926=_0x224d35;if(Imported[_0x411926(0x1c4)])$gameMessage[_0x411926(0x3bd)]();if(_0x1e8042[_0x411926(0x2df)](/<HIDE>/i))return![];if(_0x1e8042[_0x411926(0x2df)](/<SHOW>/i))return!![];if(_0x1e8042[_0x411926(0x2df)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3a6e7f=RegExp['$1'][_0x411926(0x3da)](',')[_0x411926(0x3e0)](_0x13646b=>Number(_0x13646b)||0x0);for(const _0x1a4473 of _0x3a6e7f){if(!$gameSwitches[_0x411926(0x2a0)](_0x1a4473))return![];}return!![];}if(_0x1e8042[_0x411926(0x2df)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4b774d=RegExp['$1'][_0x411926(0x3da)](',')[_0x411926(0x3e0)](_0xf61468=>Number(_0xf61468)||0x0);for(const _0x349489 of _0x4b774d){if(!$gameSwitches['value'](_0x349489))return![];}return!![];}if(_0x1e8042['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x4f814f=RegExp['$1']['split'](',')[_0x411926(0x3e0)](_0x322623=>Number(_0x322623)||0x0);for(const _0x4f5bf8 of _0x4f814f){if($gameSwitches[_0x411926(0x2a0)](_0x4f5bf8))return!![];}return![];}if(_0x1e8042[_0x411926(0x2df)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x56dcb2=RegExp['$1'][_0x411926(0x3da)](',')[_0x411926(0x3e0)](_0x4ef1b8=>Number(_0x4ef1b8)||0x0);for(const _0x4911b9 of _0x56dcb2){if(!$gameSwitches[_0x411926(0x2a0)](_0x4911b9))return!![];}return![];}if(_0x1e8042['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x367a1c=RegExp['$1']['split'](',')[_0x411926(0x3e0)](_0x5f393f=>Number(_0x5f393f)||0x0);for(const _0x48a0e4 of _0x367a1c){if(!$gameSwitches[_0x411926(0x2a0)](_0x48a0e4))return!![];}return![];}if(_0x1e8042[_0x411926(0x2df)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x591dd8=RegExp['$1']['split'](',')[_0x411926(0x3e0)](_0x4a3e97=>Number(_0x4a3e97)||0x0);for(const _0x54c352 of _0x591dd8){if($gameSwitches[_0x411926(0x2a0)](_0x54c352))return![];}return!![];}return!![];},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x1d1)]=function(_0x4a14e5){const _0x510ea2=_0x224d35;let _0x3146e4=_0x4a14e5;return _0x3146e4=_0x3146e4['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3146e4=_0x3146e4[_0x510ea2(0x37e)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3146e4;},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x252)]=function(_0x2ea272){const _0x5d1355=_0x224d35;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage['registerSelfEvent']();if(_0x2ea272[_0x5d1355(0x2df)](/<DISABLE>/i))return![];if(_0x2ea272[_0x5d1355(0x2df)](/<ENABLE>/i))return!![];if(_0x2ea272['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x27cabe=RegExp['$1'][_0x5d1355(0x3da)](',')[_0x5d1355(0x3e0)](_0x4e1a7a=>Number(_0x4e1a7a)||0x0);for(const _0x43d3f9 of _0x27cabe){if(!$gameSwitches[_0x5d1355(0x2a0)](_0x43d3f9))return![];}return!![];}if(_0x2ea272[_0x5d1355(0x2df)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x9e75ff=RegExp['$1'][_0x5d1355(0x3da)](',')['map'](_0x48b505=>Number(_0x48b505)||0x0);for(const _0xae9797 of _0x9e75ff){if(!$gameSwitches[_0x5d1355(0x2a0)](_0xae9797))return![];}return!![];}if(_0x2ea272[_0x5d1355(0x2df)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x54d916=RegExp['$1'][_0x5d1355(0x3da)](',')['map'](_0x4b7abb=>Number(_0x4b7abb)||0x0);for(const _0x2e9e40 of _0x54d916){if($gameSwitches[_0x5d1355(0x2a0)](_0x2e9e40))return!![];}return![];}if(_0x2ea272[_0x5d1355(0x2df)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x440f4d=RegExp['$1'][_0x5d1355(0x3da)](',')[_0x5d1355(0x3e0)](_0x365686=>Number(_0x365686)||0x0);for(const _0x5f0ef0 of _0x440f4d){if(!$gameSwitches[_0x5d1355(0x2a0)](_0x5f0ef0))return!![];}return![];}if(_0x2ea272[_0x5d1355(0x2df)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2ae37b=RegExp['$1'][_0x5d1355(0x3da)](',')[_0x5d1355(0x3e0)](_0x58fe3c=>Number(_0x58fe3c)||0x0);for(const _0x5c9378 of _0x2ae37b){if(!$gameSwitches['value'](_0x5c9378))return!![];}return![];}if(_0x2ea272[_0x5d1355(0x2df)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5d4ed0=RegExp['$1'][_0x5d1355(0x3da)](',')[_0x5d1355(0x3e0)](_0x50e040=>Number(_0x50e040)||0x0);for(const _0x3461bb of _0x5d4ed0){if($gameSwitches[_0x5d1355(0x2a0)](_0x3461bb))return![];}return!![];}return!![];},VisuMZ[_0x224d35(0x384)][_0x224d35(0x224)]=Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x2a9)],Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x2a9)]=function(){const _0x5afc6c=_0x224d35;VisuMZ['MessageCore'][_0x5afc6c(0x224)][_0x5afc6c(0x368)](this),this['clampPlacementPosition']();},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x300)]=function(){const _0xced0e9=_0x224d35;if(!this[_0xced0e9(0x385)])return;const _0x334169=0x8,_0x5edec5=this[_0xced0e9(0x385)],_0x35c859=this['x']+this[_0xced0e9(0x1dc)],_0x5064b9=Math[_0xced0e9(0x223)]((Graphics[_0xced0e9(0x1dc)]-Graphics['boxWidth'])/0x2);_0x35c859>=Graphics[_0xced0e9(0x39a)]+_0x5064b9-_0x5edec5[_0xced0e9(0x1dc)]+_0x334169?_0x5edec5['x']=-_0x5edec5['width']-_0x334169:_0x5edec5['x']=this[_0xced0e9(0x1dc)]+_0x334169,_0x5edec5['y']=this[_0xced0e9(0x26d)]/0x2-_0x5edec5['height']/0x2;},VisuMZ[_0x224d35(0x384)]['Window_ChoiceList_windowX']=Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x207)],Window_ChoiceList[_0x224d35(0x3a0)]['windowX']=function(){const _0x23be77=_0x224d35;return this[_0x23be77(0x3d5)]?this[_0x23be77(0x210)]():VisuMZ['MessageCore'][_0x23be77(0x278)][_0x23be77(0x368)](this);},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x210)]=function(){const _0x5697e6=_0x224d35,_0x5481b4=$gameMessage[_0x5697e6(0x1e2)]();if(_0x5481b4===0x1)return(Graphics[_0x5697e6(0x39a)]-this['windowWidth']())/0x2;else return _0x5481b4===0x2?this['_messageWindow']['x']+this[_0x5697e6(0x3d5)][_0x5697e6(0x1dc)]-this['windowWidth']():this[_0x5697e6(0x3d5)]['x'];},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x319)]=function(){const _0x120a13=_0x224d35,_0x51e6d0=(this[_0x120a13(0x215)]()+this[_0x120a13(0x2b0)]())*this[_0x120a13(0x37a)]()+this[_0x120a13(0x1d5)]*0x2;return Math[_0x120a13(0x304)](_0x51e6d0,Graphics[_0x120a13(0x1dc)]);},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x341)]=function(){const _0x1ae545=_0x224d35,_0x13af56=$gameMessage[_0x1ae545(0x3cb)]()[_0x1ae545(0x3e0)](_0x19945=>this[_0x1ae545(0x362)](_0x19945))[_0x1ae545(0x28a)](_0x3b8753=>this[_0x1ae545(0x3d8)](_0x3b8753)),_0x27cd57=Math[_0x1ae545(0x32a)](_0x13af56[_0x1ae545(0x37c)]/this[_0x1ae545(0x37a)]());return Math[_0x1ae545(0x265)](0x1,Math[_0x1ae545(0x304)](_0x27cd57,this[_0x1ae545(0x324)]()));},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x324)]=function(){const _0x39e2e0=_0x224d35,_0xe01491=this[_0x39e2e0(0x3d5)],_0x28836e=_0xe01491?_0xe01491['y']:0x0,_0x11a692=_0xe01491?_0xe01491[_0x39e2e0(0x26d)]:0x0,_0x4caeb0=Graphics['boxHeight']/0x2;return _0x28836e<_0x4caeb0&&_0x28836e+_0x11a692>_0x4caeb0?0x4:$gameSystem['getChoiceListMaxRows']();},Window_ChoiceList['prototype'][_0x224d35(0x215)]=function(){const _0x26bbec=_0x224d35;let _0x50e23e=0x60;for(const _0x2f8f9e of this[_0x26bbec(0x2f3)]){const _0x4aa007=_0x2f8f9e[_0x26bbec(0x239)],_0x502891=this[_0x26bbec(0x2f2)](_0x4aa007)[_0x26bbec(0x1dc)],_0x40a0ef=Math[_0x26bbec(0x32a)](_0x502891)+this[_0x26bbec(0x1f0)]()*0x2;_0x50e23e<_0x40a0ef&&(_0x50e23e=_0x40a0ef);}return _0x50e23e;},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x25c)]=function(_0x251584){const _0x2962c8=_0x224d35,_0x3046e6=this['itemRectWithPadding'](_0x251584),_0x3fd9c0=$gameSystem[_0x2962c8(0x259)]()!=='default'?_0x2962c8(0x34c)['format']($gameSystem[_0x2962c8(0x259)]()):'',_0x299406=_0x3fd9c0+this['commandName'](_0x251584);this[_0x2962c8(0x3ca)](this[_0x2962c8(0x227)](_0x251584));const _0x37f540=this[_0x2962c8(0x2f2)](_0x299406)[_0x2962c8(0x26d)],_0x43af9f=Math[_0x2962c8(0x265)](_0x3046e6['y'],_0x3046e6['y']+Math[_0x2962c8(0x26f)]((_0x3046e6[_0x2962c8(0x26d)]-_0x37f540)/0x2));this[_0x2962c8(0x348)](_0x299406,_0x3046e6['x'],_0x43af9f,_0x3046e6[_0x2962c8(0x1dc)]);},Window_ChoiceList[_0x224d35(0x3a0)][_0x224d35(0x3f7)]=function(){const _0x340120=_0x224d35;$gameMessage[_0x340120(0x349)](this['currentExt']()),this['_messageWindow'][_0x340120(0x228)](),this[_0x340120(0x245)]();};