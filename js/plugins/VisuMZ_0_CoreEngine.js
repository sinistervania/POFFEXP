//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.55;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.55] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x30b69f=_0x5d97;(function(_0x3a73a5,_0x734616){const _0x525be4=_0x5d97,_0x238c80=_0x3a73a5();while(!![]){try{const _0x4f5bca=parseInt(_0x525be4(0x747))/0x1+-parseInt(_0x525be4(0x533))/0x2+-parseInt(_0x525be4(0x2be))/0x3*(parseInt(_0x525be4(0x7f8))/0x4)+parseInt(_0x525be4(0x64d))/0x5+-parseInt(_0x525be4(0x534))/0x6*(parseInt(_0x525be4(0x80a))/0x7)+parseInt(_0x525be4(0x1ee))/0x8*(-parseInt(_0x525be4(0x2c0))/0x9)+parseInt(_0x525be4(0x35b))/0xa;if(_0x4f5bca===_0x734616)break;else _0x238c80['push'](_0x238c80['shift']());}catch(_0x17ce97){_0x238c80['push'](_0x238c80['shift']());}}}(_0x43f4,0x95d7e));var label=_0x30b69f(0x5d8),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x400b85){const _0x1fed2f=_0x30b69f;return _0x400b85[_0x1fed2f(0x27e)]&&_0x400b85[_0x1fed2f(0x279)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x30b69f(0x200)]=VisuMZ[label][_0x30b69f(0x200)]||{},VisuMZ[_0x30b69f(0x2b2)]=function(_0x52212b,_0x355153){const _0x2f94d5=_0x30b69f;for(const _0x52c335 in _0x355153){if(_0x52c335[_0x2f94d5(0x487)](/(.*):(.*)/i)){const _0x218f01=String(RegExp['$1']),_0x109f06=String(RegExp['$2'])[_0x2f94d5(0x62b)]()['trim']();let _0x574c97,_0x25b32,_0x537f96;switch(_0x109f06){case _0x2f94d5(0x59f):_0x574c97=_0x355153[_0x52c335]!==''?Number(_0x355153[_0x52c335]):0x0;break;case _0x2f94d5(0x636):_0x25b32=_0x355153[_0x52c335]!==''?JSON['parse'](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32[_0x2f94d5(0x729)](_0x481718=>Number(_0x481718));break;case _0x2f94d5(0x348):_0x574c97=_0x355153[_0x52c335]!==''?eval(_0x355153[_0x52c335]):null;break;case'ARRAYEVAL':_0x25b32=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32['map'](_0x59ce66=>eval(_0x59ce66));break;case _0x2f94d5(0x2af):_0x574c97=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):'';break;case _0x2f94d5(0x5fc):_0x25b32=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32['map'](_0x1a3ffe=>JSON[_0x2f94d5(0x1f0)](_0x1a3ffe));break;case _0x2f94d5(0x50c):_0x574c97=_0x355153[_0x52c335]!==''?new Function(JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335])):new Function(_0x2f94d5(0x339));break;case _0x2f94d5(0x40f):_0x25b32=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32[_0x2f94d5(0x729)](_0x52c7ab=>new Function(JSON[_0x2f94d5(0x1f0)](_0x52c7ab)));break;case _0x2f94d5(0x468):_0x574c97=_0x355153[_0x52c335]!==''?String(_0x355153[_0x52c335]):'';break;case'ARRAYSTR':_0x25b32=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32[_0x2f94d5(0x729)](_0x161dce=>String(_0x161dce));break;case _0x2f94d5(0x461):_0x537f96=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):{},_0x52212b[_0x218f01]={},VisuMZ['ConvertParams'](_0x52212b[_0x218f01],_0x537f96);continue;case _0x2f94d5(0x6e5):_0x25b32=_0x355153[_0x52c335]!==''?JSON[_0x2f94d5(0x1f0)](_0x355153[_0x52c335]):[],_0x574c97=_0x25b32[_0x2f94d5(0x729)](_0x276ffc=>VisuMZ[_0x2f94d5(0x2b2)]({},JSON[_0x2f94d5(0x1f0)](_0x276ffc)));break;default:continue;}_0x52212b[_0x218f01]=_0x574c97;}}return _0x52212b;},(_0x5f44f0=>{const _0x343cc2=_0x30b69f,_0x570d1f=_0x5f44f0[_0x343cc2(0x656)];for(const _0x550d84 of dependencies){if(!Imported[_0x550d84]){alert(_0x343cc2(0x208)[_0x343cc2(0x84d)](_0x570d1f,_0x550d84)),SceneManager[_0x343cc2(0x3d6)]();break;}}const _0x346d47=_0x5f44f0[_0x343cc2(0x279)];if(_0x346d47['match'](/\[Version[ ](.*?)\]/i)){const _0x2111ad=Number(RegExp['$1']);_0x2111ad!==VisuMZ[label]['version']&&(alert(_0x343cc2(0x2f5)[_0x343cc2(0x84d)](_0x570d1f,_0x2111ad)),SceneManager[_0x343cc2(0x3d6)]());}if(_0x346d47['match'](/\[Tier[ ](\d+)\]/i)){const _0x2d9dd0=Number(RegExp['$1']);_0x2d9dd0<tier?(alert(_0x343cc2(0x5bc)[_0x343cc2(0x84d)](_0x570d1f,_0x2d9dd0,tier)),SceneManager[_0x343cc2(0x3d6)]()):tier=Math[_0x343cc2(0x7fd)](_0x2d9dd0,tier);}VisuMZ[_0x343cc2(0x2b2)](VisuMZ[label]['Settings'],_0x5f44f0[_0x343cc2(0x45d)]);})(pluginData),((()=>{const _0x227738=_0x30b69f;if(VisuMZ[_0x227738(0x5d8)][_0x227738(0x200)]['QoL']['SubfolderParse']??!![])for(const _0x843edd in $plugins){const _0x9ecf03=$plugins[_0x843edd];_0x9ecf03[_0x227738(0x656)][_0x227738(0x487)](/(.*)\/(.*)/i)&&(_0x9ecf03[_0x227738(0x656)]=String(RegExp['$2'][_0x227738(0x2d3)]()));}})()),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x6c8),_0x80232f=>{const _0x2c2f63=_0x30b69f;if(!SceneManager[_0x2c2f63(0x864)])return;if(!SceneManager[_0x2c2f63(0x864)][_0x2c2f63(0x799)])return;VisuMZ[_0x2c2f63(0x2b2)](_0x80232f,_0x80232f);const _0x39bb11=Math[_0x2c2f63(0x297)](_0x80232f[_0x2c2f63(0x2b7)]),_0x50ef56=Math['round'](_0x80232f[_0x2c2f63(0x589)]);$gameTemp[_0x2c2f63(0x4f5)](_0x39bb11,_0x50ef56,_0x80232f[_0x2c2f63(0x240)],_0x80232f[_0x2c2f63(0x50e)],_0x80232f[_0x2c2f63(0x84c)]);}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x245),_0x152e33=>{const _0x549bd8=_0x30b69f;if(!$gameTemp[_0x549bd8(0x2d6)]())return;if(!Utils[_0x549bd8(0x343)]())return;SceneManager[_0x549bd8(0x864)]['_active']=![],VisuMZ[_0x549bd8(0x5d8)][_0x549bd8(0x2db)]();}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x46c),_0x127875=>{const _0x337928=_0x30b69f;if(!$gameTemp[_0x337928(0x2d6)]())return;if(!Utils[_0x337928(0x343)]())return;SceneManager[_0x337928(0x864)][_0x337928(0x2f1)]=![],VisuMZ[_0x337928(0x5d8)][_0x337928(0x554)]();}),PluginManager[_0x30b69f(0x81d)](pluginData['name'],_0x30b69f(0x293),_0x4fdb10=>{const _0x1d28ff=_0x30b69f;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x1d28ff(0x20a)]()<=0x0)return;VisuMZ[_0x1d28ff(0x2b2)](_0x4fdb10,_0x4fdb10);const _0x98cc08=_0x1d28ff(0x514)[_0x1d28ff(0x84d)]($gameMap[_0x1d28ff(0x20a)]()[_0x1d28ff(0x71f)](0x3)),_0x41e181=VisuMZ[_0x1d28ff(0x5d8)]['ExtractStrFromMap']($gameMap[_0x1d28ff(0x20a)]());VisuMZ[_0x1d28ff(0x5d8)][_0x1d28ff(0x7a6)](_0x41e181,_0x98cc08,!![]);}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x486),_0x2491a7=>{const _0x4273ea=_0x30b69f;if(!$gameTemp[_0x4273ea(0x2d6)]())return;if(!Utils[_0x4273ea(0x343)]())return;if(!$gameParty['inBattle']())return;VisuMZ[_0x4273ea(0x2b2)](_0x2491a7,_0x2491a7);const _0x15bad7='Troop%1'[_0x4273ea(0x84d)]($gameTroop[_0x4273ea(0x817)][_0x4273ea(0x71f)](0x4)),_0x3af8bd=VisuMZ[_0x4273ea(0x5d8)][_0x4273ea(0x543)]($gameTroop[_0x4273ea(0x817)]);VisuMZ[_0x4273ea(0x5d8)][_0x4273ea(0x7a6)](_0x3af8bd,_0x15bad7,!![]);}),VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7a6)]=function(_0x51e136,_0x4cacf1,_0x2f3560){const _0x3003a2=_0x30b69f,_0x33c0aa=require('fs');let _0x101016=_0x3003a2(0x70e)[_0x3003a2(0x84d)](_0x4cacf1||'0');_0x33c0aa[_0x3003a2(0x2fc)](_0x101016,_0x51e136,_0x258645=>{const _0x63846c=_0x3003a2;if(_0x258645)throw err;else _0x2f3560&&alert(_0x63846c(0x5a4)[_0x63846c(0x84d)](_0x101016));});},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2db)]=function(){const _0x418612=_0x30b69f,_0x95e26c=[];for(const _0x2278e7 of $dataMapInfos){if(!_0x2278e7)continue;_0x95e26c[_0x418612(0x327)](_0x2278e7['id']);}const _0x3c8317=_0x95e26c[_0x418612(0x303)]*0x64+Math[_0x418612(0x378)](0x64);alert(_0x418612(0x2dd)[_0x418612(0x84d)](_0x3c8317)),this[_0x418612(0x772)]=[],this['_currentMap']=$dataMap;for(const _0x360d07 of _0x95e26c){VisuMZ[_0x418612(0x5d8)][_0x418612(0x62f)](_0x360d07);}setTimeout(VisuMZ[_0x418612(0x5d8)][_0x418612(0x304)][_0x418612(0x3f2)](this),_0x3c8317);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x62f)]=function(_0x9515ed){const _0x2c3888=_0x30b69f,_0x3594e7='Map%1.json'[_0x2c3888(0x84d)](_0x9515ed['padZero'](0x3)),_0x75fc58=new XMLHttpRequest(),_0x27ff8f='data/'+_0x3594e7;_0x75fc58[_0x2c3888(0x5f4)]('GET',_0x27ff8f),_0x75fc58[_0x2c3888(0x76e)]('application/json'),_0x75fc58[_0x2c3888(0x37a)]=()=>this['storeMapData'](_0x75fc58,_0x9515ed,_0x3594e7,_0x27ff8f),_0x75fc58[_0x2c3888(0x7e3)]=()=>DataManager['onXhrError'](_0x2c3888(0x1c8),_0x3594e7,_0x27ff8f),_0x75fc58[_0x2c3888(0x2e0)]();},VisuMZ['CoreEngine'][_0x30b69f(0x77b)]=function(_0xdfff63,_0x2a2d75,_0xcffde2,_0x5953af){const _0x2dedfc=_0x30b69f;$dataMap=JSON[_0x2dedfc(0x1f0)](_0xdfff63[_0x2dedfc(0x6ce)]),DataManager[_0x2dedfc(0x5aa)]($dataMap),this[_0x2dedfc(0x772)][_0x2a2d75]=VisuMZ[_0x2dedfc(0x5d8)]['ExtractStrFromMap'](_0x2a2d75),$dataMap=this[_0x2dedfc(0x1d4)];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x304)]=function(){const _0x34b385=_0x30b69f,_0x29201f=_0x34b385(0x280);this[_0x34b385(0x772)][_0x34b385(0x708)](undefined)[_0x34b385(0x708)]('')['remove'](null);const _0x2e1516=this['_storedMapText']['join'](_0x34b385(0x6f9))[_0x34b385(0x2d3)]();VisuMZ['CoreEngine'][_0x34b385(0x7a6)](_0x2e1516,_0x29201f,!![]),SceneManager[_0x34b385(0x864)][_0x34b385(0x2f1)]=!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x62a)]=function(_0x4f8864){const _0x1e9c74=_0x30b69f;if(!$dataMap)return'';let _0x23d4cc='█'[_0x1e9c74(0x75b)](0x46)+'\x0a\x0a',_0x2cbadd='═'['repeat'](0x46)+'\x0a\x0a',_0x199438='';this[_0x1e9c74(0x46b)]=0x0;for(const _0x353233 of $dataMap['events']){if(!_0x353233)continue;let _0x3f6f25=_0x353233['id'],_0x19767d=_0x353233[_0x1e9c74(0x656)],_0x57eb76=_0x353233[_0x1e9c74(0x3e3)];for(const _0x274950 of _0x57eb76){const _0x1780e8=_0x57eb76[_0x1e9c74(0x657)](_0x274950)+0x1;let _0xa67625=_0x2cbadd+_0x1e9c74(0x350),_0x4d7790=VisuMZ[_0x1e9c74(0x5d8)][_0x1e9c74(0x727)](_0x274950['list']);if(_0x4d7790[_0x1e9c74(0x303)]>0x0){if(_0x199438[_0x1e9c74(0x303)]>0x0)_0x199438+=_0x2cbadd+_0x1e9c74(0x6f9);else{const _0x109e2b=$dataMapInfos[_0x4f8864][_0x1e9c74(0x656)];_0x199438+=_0x23d4cc+_0x1e9c74(0x48a)[_0x1e9c74(0x84d)](_0x4f8864,_0x109e2b||_0x1e9c74(0x26c))+_0x23d4cc;}_0x199438+=_0xa67625[_0x1e9c74(0x84d)](_0x3f6f25,_0x19767d,_0x1780e8,_0x4d7790);}}}return _0x199438['length']>0x0&&(_0x199438+=_0x2cbadd),_0x199438;},VisuMZ[_0x30b69f(0x5d8)]['ExportStrFromAllTroops']=function(){const _0x4906fe=_0x30b69f,_0x35587b=$dataTroops['length']*0xa+Math[_0x4906fe(0x378)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x4906fe(0x84d)](_0x35587b));const _0x1b2df7=[];for(const _0x371851 of $dataTroops){if(!_0x371851)continue;const _0x15ddeb=_0x371851['id'];_0x1b2df7[_0x15ddeb]=VisuMZ[_0x4906fe(0x5d8)][_0x4906fe(0x543)](_0x15ddeb);}setTimeout(VisuMZ[_0x4906fe(0x5d8)][_0x4906fe(0x34b)]['bind'](this,_0x1b2df7),_0x35587b);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x543)]=function(_0x15bee2){const _0x19b26b=_0x30b69f;if(!$dataTroops[_0x15bee2])return'';let _0x41ad1e='█'[_0x19b26b(0x75b)](0x46)+'\x0a\x0a',_0x5c4129='═'[_0x19b26b(0x75b)](0x46)+'\x0a\x0a',_0x332bc1='';this['_commonEventLayers']=0x0;const _0xaec19=$dataTroops[_0x15bee2];let _0x1880e8=_0xaec19['pages'];for(const _0x32a7f7 of _0x1880e8){const _0x55d13b=_0x1880e8[_0x19b26b(0x657)](_0x32a7f7)+0x1;let _0x2c99d2=_0x5c4129+_0x19b26b(0x776),_0x56138d=VisuMZ[_0x19b26b(0x5d8)][_0x19b26b(0x727)](_0x32a7f7[_0x19b26b(0x54a)]);_0x56138d[_0x19b26b(0x303)]>0x0&&(_0x332bc1[_0x19b26b(0x303)]>0x0?_0x332bc1+=_0x5c4129+_0x19b26b(0x6f9):_0x332bc1+=_0x41ad1e+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x19b26b(0x84d)](_0x15bee2,_0xaec19[_0x19b26b(0x656)]||_0x19b26b(0x26c))+_0x41ad1e,_0x332bc1+=_0x2c99d2[_0x19b26b(0x84d)](_0x55d13b,_0x56138d));}return _0x332bc1['length']>0x0&&(_0x332bc1+=_0x5c4129),_0x332bc1;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x34b)]=function(_0x2cf941){const _0x437a52=_0x30b69f,_0x517244='AllTroops';_0x2cf941[_0x437a52(0x708)](undefined)[_0x437a52(0x708)]('')['remove'](null);const _0xb3b099=_0x2cf941[_0x437a52(0x3bf)](_0x437a52(0x6f9))[_0x437a52(0x2d3)]();VisuMZ['CoreEngine'][_0x437a52(0x7a6)](_0xb3b099,_0x517244,!![]),SceneManager['_scene'][_0x437a52(0x2f1)]=!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x727)]=function(_0x967fad){const _0x551d6a=_0x30b69f;let _0xc1dc1b='\x0a'+'─'[_0x551d6a(0x75b)](0x46)+'\x0a',_0x44e1fd='\x0a'+'┄'[_0x551d6a(0x75b)](0x46)+'\x0a',_0x5dc3e1='';for(const _0x542f24 of _0x967fad){if(!_0x542f24)continue;if(_0x542f24[_0x551d6a(0x2df)]===0x65)_0x5dc3e1+=_0xc1dc1b+'\x0a',_0x5dc3e1+=_0x551d6a(0x5be),_0x542f24['parameters'][0x4]!==''&&_0x542f24['parameters'][0x4]!==undefined&&(_0x5dc3e1+='【%1】\x0a'[_0x551d6a(0x84d)](_0x542f24[_0x551d6a(0x45d)][0x4]));else{if(_0x542f24[_0x551d6a(0x2df)]===0x191)_0x5dc3e1+=_0x551d6a(0x7ca)[_0x551d6a(0x84d)](_0x542f24[_0x551d6a(0x45d)][0x0]);else{if(_0x542f24[_0x551d6a(0x2df)]===0x192)_0x5dc3e1+=_0xc1dc1b,_0x5dc3e1+=_0x551d6a(0x209)[_0x551d6a(0x84d)](_0x44e1fd,_0x542f24[_0x551d6a(0x45d)][0x0]+0x1,_0x542f24['parameters'][0x1]);else{if(_0x542f24[_0x551d6a(0x2df)]===0x193)_0x5dc3e1+=_0xc1dc1b,_0x5dc3e1+=_0x551d6a(0x580)[_0x551d6a(0x84d)](_0x44e1fd);else{if(_0x542f24[_0x551d6a(0x2df)]===0x194)_0x5dc3e1+=_0xc1dc1b,_0x5dc3e1+='%1〘End\x20Choice\x20Selection〙%1'[_0x551d6a(0x84d)](_0x44e1fd);else{if(_0x542f24[_0x551d6a(0x2df)]===0x69)_0x5dc3e1+=_0xc1dc1b+'\x0a',_0x5dc3e1+=_0x551d6a(0x477);else{if(_0x542f24[_0x551d6a(0x2df)]===0x6c)_0x5dc3e1+=_0xc1dc1b+'\x0a',_0x5dc3e1+=_0x551d6a(0x48d)[_0x551d6a(0x84d)](_0x542f24[_0x551d6a(0x45d)][0x0]);else{if(_0x542f24['code']===0x198)_0x5dc3e1+=_0x551d6a(0x7ca)['format'](_0x542f24['parameters'][0x0]);else{if(_0x542f24[_0x551d6a(0x2df)]===0x75){const _0xd29300=$dataCommonEvents[_0x542f24[_0x551d6a(0x45d)][0x0]];if(_0xd29300&&this[_0x551d6a(0x46b)]<=0xa){this[_0x551d6a(0x46b)]++;let _0x1ccca5=VisuMZ[_0x551d6a(0x5d8)][_0x551d6a(0x727)](_0xd29300[_0x551d6a(0x54a)]);_0x1ccca5['length']>0x0&&(_0x5dc3e1+=_0xc1dc1b,_0x5dc3e1+=_0x44e1fd,_0x5dc3e1+=_0x551d6a(0x248)[_0x551d6a(0x84d)](_0xd29300['id'],_0xd29300['name']),_0x5dc3e1+=_0x44e1fd,_0x5dc3e1+=_0x1ccca5,_0x5dc3e1+=_0x44e1fd,_0x5dc3e1+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x551d6a(0x84d)](_0xd29300['id'],_0xd29300[_0x551d6a(0x656)]),_0x5dc3e1+=_0x44e1fd),this[_0x551d6a(0x46b)]--;}}}}}}}}}}}return _0x5dc3e1[_0x551d6a(0x303)]>0x0&&(_0x5dc3e1+=_0xc1dc1b),_0x5dc3e1;},PluginManager[_0x30b69f(0x81d)](pluginData['name'],_0x30b69f(0x3ec),_0x428320=>{const _0x32b90d=_0x30b69f;VisuMZ[_0x32b90d(0x2b2)](_0x428320,_0x428320);const _0x584fbf=_0x428320['URL'];VisuMZ[_0x32b90d(0x2b1)](_0x584fbf);}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x388),_0x484068=>{const _0x44ccf9=_0x30b69f;VisuMZ['ConvertParams'](_0x484068,_0x484068);const _0x4d1d13=_0x484068[_0x44ccf9(0x7d5)]||0x0;$gameParty[_0x44ccf9(0x27c)](_0x4d1d13);}),PluginManager['registerCommand'](pluginData[_0x30b69f(0x656)],_0x30b69f(0x254),_0x36ebb5=>{const _0xc4a52e=_0x30b69f;if(!SceneManager['isSceneMap']())return;VisuMZ['ConvertParams'](_0x36ebb5,_0x36ebb5);const _0x4137b4=_0x36ebb5['CommonEventID'];SceneManager[_0xc4a52e(0x864)]['playOnceParallelInterpreter'](_0x4137b4);}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x3a4),_0x374337=>{const _0x1866aa=_0x30b69f;if(!$gameTemp[_0x1866aa(0x2d6)]())return;if(!Utils[_0x1866aa(0x343)]())return;VisuMZ['ConvertParams'](_0x374337,_0x374337);const _0x1f52c6=_0x374337[_0x1866aa(0x28f)]||0x1;$gameTemp[_0x1866aa(0x371)]=_0x1f52c6;}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x1c0),_0x31f086=>{const _0x549ccf=_0x30b69f;VisuMZ[_0x549ccf(0x2b2)](_0x31f086,_0x31f086);const _0x127f21=_0x31f086[_0x549ccf(0x67c)]||0x1,_0x13aff2=_0x31f086['easingType']||'Linear',_0x2c7bf3=$gameScreen[_0x549ccf(0x427)](_0x127f21);_0x2c7bf3&&_0x2c7bf3['setEasingType'](_0x13aff2);}),PluginManager[_0x30b69f(0x81d)](pluginData['name'],_0x30b69f(0x442),_0x40b931=>{const _0x42bfaf=_0x30b69f;for(let _0x21c3d4=0x1;_0x21c3d4<=0x64;_0x21c3d4++){$gameScreen[_0x42bfaf(0x326)](_0x21c3d4);}}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x26e),_0x2717d5=>{const _0x244baa=_0x30b69f;VisuMZ['ConvertParams'](_0x2717d5,_0x2717d5);const _0x59ee08=Math[_0x244baa(0x522)](_0x2717d5['StartID'],_0x2717d5[_0x244baa(0x241)]),_0x1d4d22=Math[_0x244baa(0x7fd)](_0x2717d5[_0x244baa(0x56c)],_0x2717d5[_0x244baa(0x241)]);for(let _0x2022da=_0x59ee08;_0x2022da<=_0x1d4d22;_0x2022da++){$gameScreen['erasePicture'](_0x2022da);}}),PluginManager['registerCommand'](pluginData['name'],'PictureShowIcon',_0x437e19=>{const _0x59e5dd=_0x30b69f;VisuMZ[_0x59e5dd(0x2b2)](_0x437e19,_0x437e19);const _0x4aa747=Math[_0x59e5dd(0x297)](_0x437e19[_0x59e5dd(0x28f)])['clamp'](0x1,0x64),_0x190d90=_0x437e19[_0x59e5dd(0x200)],_0x23ce69=_0x190d90['Origin'][_0x59e5dd(0x4ac)](0x0,0x1),_0xde9f13=Math['round'](_0x190d90[_0x59e5dd(0x53d)]||0x0),_0x3e28e1=Math[_0x59e5dd(0x297)](_0x190d90['PositionY']||0x0),_0x56c9bb=Math['round'](_0x190d90[_0x59e5dd(0x85f)]||0x0),_0x6d7cd5=Math[_0x59e5dd(0x297)](_0x190d90[_0x59e5dd(0x415)]||0x0),_0x187ddc=Math[_0x59e5dd(0x297)](_0x190d90[_0x59e5dd(0x60d)])[_0x59e5dd(0x4ac)](0x0,0xff),_0x2d27f3=_0x190d90[_0x59e5dd(0x1f2)],_0xbe261b=_0x59e5dd(0x7b0),_0x131b38=_0x437e19[_0x59e5dd(0x6e1)]?_0x59e5dd(0x6e1):_0x59e5dd(0x744),_0x243097=_0xbe261b[_0x59e5dd(0x84d)](_0x437e19[_0x59e5dd(0x556)],_0x131b38);$gameScreen['showPicture'](_0x4aa747,_0x243097,_0x23ce69,_0xde9f13,_0x3e28e1,_0x56c9bb,_0x6d7cd5,_0x187ddc,_0x2d27f3);}),PluginManager[_0x30b69f(0x81d)](pluginData['name'],_0x30b69f(0x654),_0xea4c40=>{const _0x316d52=_0x30b69f;VisuMZ[_0x316d52(0x2b2)](_0xea4c40,_0xea4c40);const _0xa1291f=_0xea4c40[_0x316d52(0x7ae)]||_0x316d52(0x7fe),_0x571ea0=_0xea4c40['Power'][_0x316d52(0x4ac)](0x1,0x9),_0xc0ab5=_0xea4c40[_0x316d52(0x244)][_0x316d52(0x4ac)](0x1,0x9),_0x546af5=_0xea4c40['Duration']||0x1,_0x3490e8=_0xea4c40[_0x316d52(0x3fe)];$gameScreen[_0x316d52(0x451)](_0xa1291f),$gameScreen[_0x316d52(0x492)](_0x571ea0,_0xc0ab5,_0x546af5);if(_0x3490e8){const _0x4e7383=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4e7383)_0x4e7383[_0x316d52(0x263)](_0x546af5);}}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],'SystemSetFontSize',_0x2e2f0f=>{const _0xf2af88=_0x30b69f;VisuMZ['ConvertParams'](_0x2e2f0f,_0x2e2f0f);const _0x45d9cc=_0x2e2f0f[_0xf2af88(0x450)]||0x1;$gameSystem[_0xf2af88(0x5af)](_0x45d9cc);}),PluginManager[_0x30b69f(0x81d)](pluginData['name'],_0x30b69f(0x44d),_0x2d95d2=>{const _0x48abe7=_0x30b69f;if($gameParty[_0x48abe7(0x5c3)]())return;VisuMZ[_0x48abe7(0x2b2)](_0x2d95d2,_0x2d95d2);const _0x587180=_0x2d95d2['option'];if(_0x587180['match'](/Front/i))$gameSystem[_0x48abe7(0x3d3)](![]);else _0x587180[_0x48abe7(0x487)](/Side/i)?$gameSystem[_0x48abe7(0x3d3)](!![]):$gameSystem[_0x48abe7(0x3d3)](!$gameSystem['isSideView']());}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],'SystemLoadAudio',_0x58e33f=>{const _0x5616a7=_0x30b69f;if($gameParty[_0x5616a7(0x5c3)]())return;VisuMZ[_0x5616a7(0x2b2)](_0x58e33f,_0x58e33f);const _0xb37130=[_0x5616a7(0x6db),_0x5616a7(0x300),'me','se'];for(const _0x58378f of _0xb37130){const _0x3aae21=_0x58e33f[_0x58378f],_0x4607a4=_0x5616a7(0x454)[_0x5616a7(0x84d)](_0x58378f);for(const _0x37069d of _0x3aae21){AudioManager['createBuffer'](_0x4607a4,_0x37069d);}}}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x43c),_0x456f2f=>{const _0x239221=_0x30b69f;if($gameParty[_0x239221(0x5c3)]())return;VisuMZ[_0x239221(0x2b2)](_0x456f2f,_0x456f2f);const _0x2a7bb2=[_0x239221(0x748),_0x239221(0x55c),'battlebacks2',_0x239221(0x6d0),_0x239221(0x738),_0x239221(0x7fc),_0x239221(0x3c8),_0x239221(0x43a),_0x239221(0x3cd),'sv_enemies',_0x239221(0x3c4),_0x239221(0x398),_0x239221(0x2ee),_0x239221(0x535)];for(const _0x4961f9 of _0x2a7bb2){const _0x429e8e=_0x456f2f[_0x4961f9],_0x5e9340=_0x239221(0x1fd)['format'](_0x4961f9);for(const _0x26d095 of _0x429e8e){ImageManager['loadBitmap'](_0x5e9340,_0x26d095);}}}),PluginManager['registerCommand'](pluginData['name'],'SwitchRandomizeOne',_0x3fed68=>{const _0x8c8a13=_0x30b69f;if($gameParty[_0x8c8a13(0x5c3)]())return;VisuMZ[_0x8c8a13(0x2b2)](_0x3fed68,_0x3fed68);const _0x49eb34=_0x3fed68[_0x8c8a13(0x3d9)],_0x1454e6=(_0x3fed68[_0x8c8a13(0x1bf)]||0x0)/0x64;for(const _0x40a6db of _0x49eb34){const _0xd43eb=Math[_0x8c8a13(0x7fe)]()<=_0x1454e6;$gameSwitches['setValue'](_0x40a6db,_0xd43eb);}}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x281),_0x1a120e=>{const _0x14e65a=_0x30b69f;if($gameParty[_0x14e65a(0x5c3)]())return;VisuMZ[_0x14e65a(0x2b2)](_0x1a120e,_0x1a120e);const _0x12740f=Math[_0x14e65a(0x522)](_0x1a120e[_0x14e65a(0x56c)],_0x1a120e[_0x14e65a(0x241)]),_0x532d9c=Math[_0x14e65a(0x7fd)](_0x1a120e[_0x14e65a(0x56c)],_0x1a120e[_0x14e65a(0x241)]),_0xb58d35=(_0x1a120e[_0x14e65a(0x1bf)]||0x0)/0x64;for(let _0xa2b953=_0x12740f;_0xa2b953<=_0x532d9c;_0xa2b953++){const _0x17715a=Math[_0x14e65a(0x7fe)]()<=_0xb58d35;$gameSwitches[_0x14e65a(0x39d)](_0xa2b953,_0x17715a);}}),PluginManager['registerCommand'](pluginData[_0x30b69f(0x656)],_0x30b69f(0x309),_0x20a337=>{const _0x54ac9b=_0x30b69f;if($gameParty[_0x54ac9b(0x5c3)]())return;VisuMZ[_0x54ac9b(0x2b2)](_0x20a337,_0x20a337);const _0x6a2b5=_0x20a337[_0x54ac9b(0x3d9)];for(const _0x46cb1a of _0x6a2b5){const _0x400ca3=$gameSwitches[_0x54ac9b(0x7d5)](_0x46cb1a);$gameSwitches[_0x54ac9b(0x39d)](_0x46cb1a,!_0x400ca3);}}),PluginManager['registerCommand'](pluginData['name'],_0x30b69f(0x1f6),_0x26edfd=>{const _0x2b967f=_0x30b69f;if($gameParty[_0x2b967f(0x5c3)]())return;VisuMZ['ConvertParams'](_0x26edfd,_0x26edfd);const _0x42f5af=Math['min'](_0x26edfd[_0x2b967f(0x56c)],_0x26edfd[_0x2b967f(0x241)]),_0x4fe334=Math['max'](_0x26edfd[_0x2b967f(0x56c)],_0x26edfd['EndingID']);for(let _0x299934=_0x42f5af;_0x299934<=_0x4fe334;_0x299934++){const _0x56c457=$gameSwitches[_0x2b967f(0x7d5)](_0x299934);$gameSwitches[_0x2b967f(0x39d)](_0x299934,!_0x56c457);}}),PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x664),_0x231e1e=>{const _0x30900a=_0x30b69f;if($gameParty['inBattle']())return;VisuMZ[_0x30900a(0x2b2)](_0x231e1e,_0x231e1e);const _0x55d41f=_0x231e1e[_0x30900a(0x450)][_0x30900a(0x62b)]()['trim'](),_0x57caf1=VisuMZ[_0x30900a(0x5d8)][_0x30900a(0x473)](_0x55d41f);$gameSystem['setBattleSystem'](_0x57caf1);}),VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x473)]=function(_0x25fea2){const _0x333ae8=_0x30b69f;_0x25fea2=_0x25fea2||_0x333ae8(0x29e),_0x25fea2=String(_0x25fea2)[_0x333ae8(0x62b)]()[_0x333ae8(0x2d3)]();switch(_0x25fea2){case'DTB':return 0x0;case _0x333ae8(0x23a):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x333ae8(0x513)]=!![]);return 0x1;case _0x333ae8(0x3ba):Imported[_0x333ae8(0x75f)]&&(ConfigManager[_0x333ae8(0x513)]=![]);return 0x2;case'CTB':if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x333ae8(0x3e9);break;case _0x333ae8(0x37c):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x333ae8(0x37c);break;case _0x333ae8(0x4e1):if(Imported[_0x333ae8(0x4f2)])return _0x333ae8(0x4e1);break;case _0x333ae8(0x538):if(Imported[_0x333ae8(0x43f)])return _0x333ae8(0x538);break;case _0x333ae8(0x1c2):if(Imported[_0x333ae8(0x723)])return _0x333ae8(0x1c2);break;case _0x333ae8(0x4c4):if(Imported['VisuMZ_2_BattleSystemETB'])return'ETB';break;case'PTB':if(Imported[_0x333ae8(0x389)])return _0x333ae8(0x1fa);break;}return $dataSystem[_0x333ae8(0x733)];},PluginManager[_0x30b69f(0x81d)](pluginData[_0x30b69f(0x656)],_0x30b69f(0x813),_0x4b394f=>{const _0x27f27a=_0x30b69f;VisuMZ[_0x27f27a(0x2b2)](_0x4b394f,_0x4b394f);const _0x59ec56=_0x4b394f[_0x27f27a(0x450)]||0x1;$gameSystem[_0x27f27a(0x497)](_0x59ec56);}),VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x284)]=Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x65c)],Scene_Boot['prototype'][_0x30b69f(0x65c)]=function(){const _0x4adf59=_0x30b69f;VisuMZ[_0x4adf59(0x5d8)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x4adf59(0x665)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x4adf59(0x678)](),this[_0x4adf59(0x855)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x4adf59(0x264)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x49f)]={},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x665)]=function(){const _0x466b85=_0x30b69f,_0x448e7b=['MAXHP',_0x466b85(0x33f),'ATK',_0x466b85(0x6aa),_0x466b85(0x3b0),'MDF',_0x466b85(0x408),_0x466b85(0x1ef)],_0x399bcd=[_0x466b85(0x325),_0x466b85(0x6d9),_0x466b85(0x6e6),'CEV',_0x466b85(0x7b7),_0x466b85(0x3e5),'CNT','HRG',_0x466b85(0x6c0),'TRG'],_0x10b042=[_0x466b85(0x5d0),'GRD',_0x466b85(0x6b4),_0x466b85(0x452),'MCR','TCR',_0x466b85(0x851),_0x466b85(0x417),_0x466b85(0x47b),'EXR'],_0x2de0bf=[_0x448e7b,_0x399bcd,_0x10b042],_0x2b7f01=[_0x466b85(0x3d7),_0x466b85(0x298),_0x466b85(0x67f),_0x466b85(0x5c2),_0x466b85(0x467),_0x466b85(0x73e),_0x466b85(0x644),'Flat',_0x466b85(0x20c),_0x466b85(0x2a0)];for(const _0xf1795e of _0x2de0bf){let _0x289039='';if(_0xf1795e===_0x448e7b)_0x289039='param';if(_0xf1795e===_0x399bcd)_0x289039=_0x466b85(0x3be);if(_0xf1795e===_0x10b042)_0x289039=_0x466b85(0x364);for(const _0xfcd8a of _0x2b7f01){let _0x2df2b4=_0x466b85(0x84b)['format'](_0x289039,_0xfcd8a);VisuMZ[_0x466b85(0x5d8)][_0x466b85(0x49f)][_0x2df2b4]=[],VisuMZ[_0x466b85(0x5d8)]['RegExp'][_0x2df2b4+'JS']=[];let _0x43f7a2=_0x466b85(0x549);if([_0x466b85(0x3d7),_0x466b85(0x313)]['includes'](_0xfcd8a))_0x43f7a2+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x466b85(0x298),_0x466b85(0x20c)]['includes'](_0xfcd8a))_0x43f7a2+=_0x466b85(0x3f6);else{if([_0x466b85(0x67f),'Flat2']['includes'](_0xfcd8a))_0x43f7a2+=_0x466b85(0x285);else{if(_0xfcd8a===_0x466b85(0x5c2))_0x43f7a2+=_0x466b85(0x651);else{if(_0xfcd8a===_0x466b85(0x73e))_0x43f7a2+=_0x466b85(0x5b6);else _0xfcd8a===_0x466b85(0x644)&&(_0x43f7a2+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x1250f9 of _0xf1795e){let _0x49be76=_0xfcd8a[_0x466b85(0x338)](/[\d+]/g,'')[_0x466b85(0x62b)]();const _0x22643c=_0x43f7a2['format'](_0x1250f9,_0x49be76);VisuMZ[_0x466b85(0x5d8)][_0x466b85(0x49f)][_0x2df2b4][_0x466b85(0x327)](new RegExp(_0x22643c,'i'));const _0x24b851='<JS\x20%1\x20%2:[\x20](.*)>'[_0x466b85(0x84d)](_0x1250f9,_0x49be76);VisuMZ['CoreEngine'][_0x466b85(0x49f)][_0x2df2b4+'JS'][_0x466b85(0x327)](new RegExp(_0x24b851,'i'));}}}},Scene_Boot['prototype'][_0x30b69f(0x79c)]=function(){const _0xfbbe14=_0x30b69f;if(VisuMZ[_0xfbbe14(0x264)])return;},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x678)]=function(){const _0x162038=_0x30b69f,_0x1f733d=VisuMZ[_0x162038(0x5d8)][_0x162038(0x200)];_0x1f733d[_0x162038(0x702)][_0x162038(0x627)]&&VisuMZ[_0x162038(0x1c1)](!![]);_0x1f733d['QoL'][_0x162038(0x68f)]&&(Input[_0x162038(0x31b)][0x23]='end',Input[_0x162038(0x31b)][0x24]=_0x162038(0x2ab));if(_0x1f733d[_0x162038(0x834)]){const _0x555ab4=_0x1f733d[_0x162038(0x834)];_0x555ab4[_0x162038(0x5fb)]=_0x555ab4[_0x162038(0x5fb)]||_0x162038(0x482),_0x555ab4['KeyTAB']=_0x555ab4[_0x162038(0x366)]||_0x162038(0x72a);}_0x1f733d[_0x162038(0x547)][_0x162038(0x524)]&&(Input[_0x162038(0x31b)][0x57]='up',Input[_0x162038(0x31b)][0x41]=_0x162038(0x320),Input[_0x162038(0x31b)][0x53]=_0x162038(0x76b),Input['keyMapper'][0x44]=_0x162038(0x42d),Input['keyMapper'][0x45]='pagedown'),_0x1f733d['KeyboardInput'][_0x162038(0x5f1)]&&(Input[_0x162038(0x31b)][0x52]='dashToggle'),_0x1f733d['Param']['DisplayedParams']=_0x1f733d[_0x162038(0x420)][_0x162038(0x818)][_0x162038(0x729)](_0x4e7a22=>_0x4e7a22[_0x162038(0x62b)]()[_0x162038(0x2d3)]()),_0x1f733d[_0x162038(0x420)][_0x162038(0x6a0)]=_0x1f733d[_0x162038(0x420)][_0x162038(0x6a0)][_0x162038(0x729)](_0x586007=>_0x586007['toUpperCase']()[_0x162038(0x2d3)]());},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x855)]=function(){const _0x15ad5b=_0x30b69f;this[_0x15ad5b(0x561)]();},Scene_Boot['prototype'][_0x30b69f(0x561)]=function(){const _0x473941=_0x30b69f,_0x13d11f=VisuMZ['CoreEngine'][_0x473941(0x200)][_0x473941(0x2ad)];for(const _0x470ea7 of _0x13d11f){const _0x190f1d=_0x470ea7[_0x473941(0x373)]['replace'](/[ ]/g,''),_0x2a118c=_0x470ea7[_0x473941(0x856)];VisuMZ[_0x473941(0x5d8)][_0x473941(0x850)](_0x190f1d,_0x2a118c);}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x850)]=function(_0x2c3e5e,_0x5eedb0){const _0x4c6526=_0x30b69f;if(!!window[_0x2c3e5e]){if($gameTemp[_0x4c6526(0x2d6)]())console[_0x4c6526(0x216)](_0x4c6526(0x6b1)['format'](_0x2c3e5e));}const _0x93cf67=_0x4c6526(0x30b)[_0x4c6526(0x84d)](_0x2c3e5e,_0x5eedb0);window[_0x2c3e5e]=new Function(_0x93cf67);},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x3c7)]=function(){const _0x49a5d9=_0x30b69f,_0x3e628a=VisuMZ[_0x49a5d9(0x5d8)][_0x49a5d9(0x200)][_0x49a5d9(0x21f)];if(!_0x3e628a)return;for(const _0x216b62 of _0x3e628a){if(!_0x216b62)continue;VisuMZ[_0x49a5d9(0x5d8)]['createCustomParameter'](_0x216b62);}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x22d)]={},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x434)]={},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2b5)]={},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x57f)]={},VisuMZ['CoreEngine'][_0x30b69f(0x830)]=function(_0x7a242e){const _0x542233=_0x30b69f,_0x1ed7be=_0x7a242e['Abbreviation'],_0x3877f7=_0x7a242e[_0x542233(0x4e3)],_0x519f58=_0x7a242e[_0x542233(0x3a7)],_0x2c0afa=_0x7a242e['Type'],_0x41bf14=new Function(_0x7a242e[_0x542233(0x457)]);VisuMZ[_0x542233(0x5d8)][_0x542233(0x22d)][_0x1ed7be[_0x542233(0x62b)]()['trim']()]=_0x3877f7,VisuMZ[_0x542233(0x5d8)][_0x542233(0x434)][_0x1ed7be[_0x542233(0x62b)]()[_0x542233(0x2d3)]()]=_0x519f58,VisuMZ[_0x542233(0x5d8)]['CustomParamType'][_0x1ed7be[_0x542233(0x62b)]()['trim']()]=_0x2c0afa,VisuMZ[_0x542233(0x5d8)]['CustomParamAbb'][_0x1ed7be[_0x542233(0x62b)]()[_0x542233(0x2d3)]()]=_0x1ed7be,Object['defineProperty'](Game_BattlerBase['prototype'],_0x1ed7be,{'get'(){const _0x1db20f=_0x542233,_0x5a8127=_0x41bf14[_0x1db20f(0x305)](this);return _0x2c0afa==='integer'?Math[_0x1db20f(0x297)](_0x5a8127):_0x5a8127;}});},VisuMZ[_0x30b69f(0x264)]=function(){const _0x2b1b02=_0x30b69f;for(const _0x400dbc of $dataActors){if(_0x400dbc)VisuMZ['ParseActorNotetags'](_0x400dbc);}for(const _0x453115 of $dataClasses){if(_0x453115)VisuMZ[_0x2b1b02(0x4fe)](_0x453115);}for(const _0x2c209c of $dataSkills){if(_0x2c209c)VisuMZ[_0x2b1b02(0x3a1)](_0x2c209c);}for(const _0x33fe04 of $dataItems){if(_0x33fe04)VisuMZ[_0x2b1b02(0x6bd)](_0x33fe04);}for(const _0x531118 of $dataWeapons){if(_0x531118)VisuMZ[_0x2b1b02(0x4c8)](_0x531118);}for(const _0x202f3f of $dataArmors){if(_0x202f3f)VisuMZ['ParseArmorNotetags'](_0x202f3f);}for(const _0x5dbaf8 of $dataEnemies){if(_0x5dbaf8)VisuMZ[_0x2b1b02(0x81e)](_0x5dbaf8);}for(const _0x39c360 of $dataStates){if(_0x39c360)VisuMZ[_0x2b1b02(0x756)](_0x39c360);}for(const _0x4664b9 of $dataTilesets){if(_0x4664b9)VisuMZ[_0x2b1b02(0x74e)](_0x4664b9);}},VisuMZ[_0x30b69f(0x6c4)]=function(_0xfce6a4){},VisuMZ[_0x30b69f(0x4fe)]=function(_0x2cb0ad){},VisuMZ[_0x30b69f(0x3a1)]=function(_0x1f7506){},VisuMZ[_0x30b69f(0x6bd)]=function(_0x4f6713){},VisuMZ[_0x30b69f(0x4c8)]=function(_0x3768a8){},VisuMZ['ParseArmorNotetags']=function(_0xc97181){},VisuMZ[_0x30b69f(0x81e)]=function(_0x1318fb){},VisuMZ[_0x30b69f(0x756)]=function(_0x38a090){},VisuMZ[_0x30b69f(0x74e)]=function(_0xf036d3){},VisuMZ[_0x30b69f(0x5d8)]['ParseActorNotetags']=VisuMZ[_0x30b69f(0x6c4)],VisuMZ['ParseActorNotetags']=function(_0x471aed){const _0x35d447=_0x30b69f;VisuMZ[_0x35d447(0x5d8)]['ParseActorNotetags'][_0x35d447(0x305)](this,_0x471aed);const _0x97ec80=_0x471aed[_0x35d447(0x719)];if(_0x97ec80['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x471aed['maxLevel']=Number(RegExp['$1']);if(_0x471aed[_0x35d447(0x324)]===0x0)_0x471aed[_0x35d447(0x324)]=Number['MAX_SAFE_INTEGER'];}_0x97ec80[_0x35d447(0x487)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x471aed['initialLevel']=Math[_0x35d447(0x522)](Number(RegExp['$1']),_0x471aed['maxLevel']));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4fe)]=VisuMZ[_0x30b69f(0x4fe)],VisuMZ[_0x30b69f(0x4fe)]=function(_0x23d589){const _0x17f48b=_0x30b69f;VisuMZ[_0x17f48b(0x5d8)][_0x17f48b(0x4fe)]['call'](this,_0x23d589);if(_0x23d589[_0x17f48b(0x2c1)])for(const _0x417b8d of _0x23d589[_0x17f48b(0x2c1)]){_0x417b8d[_0x17f48b(0x719)][_0x17f48b(0x487)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x417b8d[_0x17f48b(0x722)]=Math[_0x17f48b(0x7fd)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x81e)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x30b69f(0x81e)]=function(_0xbc71c){const _0x5abeb2=_0x30b69f;VisuMZ['CoreEngine'][_0x5abeb2(0x81e)][_0x5abeb2(0x305)](this,_0xbc71c),_0xbc71c[_0x5abeb2(0x722)]=0x1;const _0x1f5df1=_0xbc71c[_0x5abeb2(0x719)];if(_0x1f5df1[_0x5abeb2(0x487)](/<LEVEL:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x722)]=Number(RegExp['$1']);if(_0x1f5df1['match'](/<MAXHP:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x0]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<MAXMP:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x1]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<ATK:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x2]=Number(RegExp['$1']);if(_0x1f5df1['match'](/<DEF:[ ](\d+)>/i))_0xbc71c['params'][0x3]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<MAT:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x4]=Number(RegExp['$1']);if(_0x1f5df1['match'](/<MDF:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x5]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<AGI:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x6]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<LUK:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x3de)][0x7]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<EXP:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x77c)]=Number(RegExp['$1']);if(_0x1f5df1[_0x5abeb2(0x487)](/<GOLD:[ ](\d+)>/i))_0xbc71c[_0x5abeb2(0x6f8)]=Number(RegExp['$1']);},VisuMZ[_0x30b69f(0x5d8)]['Graphics_defaultStretchMode']=Graphics['_defaultStretchMode'],Graphics[_0x30b69f(0x5c5)]=function(){const _0x42fd3d=_0x30b69f;switch(VisuMZ[_0x42fd3d(0x5d8)][_0x42fd3d(0x200)]['QoL'][_0x42fd3d(0x594)]){case _0x42fd3d(0x3f9):return!![];case _0x42fd3d(0x501):return![];default:return VisuMZ[_0x42fd3d(0x5d8)][_0x42fd3d(0x4b9)][_0x42fd3d(0x305)](this);}},VisuMZ['CoreEngine']['Graphics_printError']=Graphics['printError'],Graphics['printError']=function(_0x342fed,_0x57279a,_0x47dca1=null){const _0x42dde5=_0x30b69f;VisuMZ[_0x42dde5(0x5d8)][_0x42dde5(0x7a2)][_0x42dde5(0x305)](this,_0x342fed,_0x57279a,_0x47dca1),VisuMZ[_0x42dde5(0x1c1)](![]);},VisuMZ['CoreEngine']['Graphics_centerElement']=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x296c51){const _0x58bd39=_0x30b69f;VisuMZ['CoreEngine'][_0x58bd39(0x496)][_0x58bd39(0x305)](this,_0x296c51),this['_centerElementCoreEngine'](_0x296c51);},Graphics['_centerElementCoreEngine']=function(_0x57b10e){const _0x9f5e9c=_0x30b69f;VisuMZ[_0x9f5e9c(0x5d8)][_0x9f5e9c(0x200)][_0x9f5e9c(0x702)][_0x9f5e9c(0x770)]&&(_0x57b10e['style']['font-smooth']='none');VisuMZ[_0x9f5e9c(0x5d8)][_0x9f5e9c(0x200)][_0x9f5e9c(0x702)][_0x9f5e9c(0x2d4)]&&(_0x57b10e[_0x9f5e9c(0x395)]['image-rendering']=_0x9f5e9c(0x5d2));const _0x3b386d=Math[_0x9f5e9c(0x7fd)](0x0,Math[_0x9f5e9c(0x4ca)](_0x57b10e[_0x9f5e9c(0x6c7)]*this[_0x9f5e9c(0x6ca)])),_0x3c585f=Math[_0x9f5e9c(0x7fd)](0x0,Math['floor'](_0x57b10e[_0x9f5e9c(0x820)]*this[_0x9f5e9c(0x6ca)]));_0x57b10e[_0x9f5e9c(0x395)][_0x9f5e9c(0x6c7)]=_0x3b386d+'px',_0x57b10e[_0x9f5e9c(0x395)]['height']=_0x3c585f+'px';},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x5c0)]=Bitmap['prototype']['initialize'],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(_0x206996,_0x4d40f4){const _0x548ad4=_0x30b69f;VisuMZ['CoreEngine']['Bitmap_initialize'][_0x548ad4(0x305)](this,_0x206996,_0x4d40f4),this[_0x548ad4(0x4ef)]=!(VisuMZ['CoreEngine'][_0x548ad4(0x200)][_0x548ad4(0x702)][_0x548ad4(0x2d4)]??!![]);},Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x768)]=function(){const _0x20bb98=_0x30b69f;this[_0x20bb98(0x3fc)]=!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x6f0)]=Sprite['prototype'][_0x30b69f(0x60f)],Sprite[_0x30b69f(0x5fe)]['destroy']=function(){const _0x48541b=_0x30b69f;VisuMZ['CoreEngine']['Sprite_destroy'][_0x48541b(0x305)](this),this[_0x48541b(0x31c)]();},Sprite['prototype'][_0x30b69f(0x31c)]=function(){const _0x31b918=_0x30b69f;if(!this[_0x31b918(0x516)])return;if(!this[_0x31b918(0x516)][_0x31b918(0x3fc)])return;this[_0x31b918(0x516)][_0x31b918(0x2da)]&&!this[_0x31b918(0x79b)]['_baseTexture'][_0x31b918(0x223)]&&this[_0x31b918(0x516)][_0x31b918(0x60f)]();},VisuMZ[_0x30b69f(0x5d8)]['Bitmap_resize']=Bitmap[_0x30b69f(0x5fe)]['resize'],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x347)]=function(_0x2d6505,_0x50977a){const _0x68d191=_0x30b69f;VisuMZ[_0x68d191(0x5d8)][_0x68d191(0x4b5)][_0x68d191(0x305)](this,_0x2d6505,_0x50977a),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x30b69f(0x58c)]=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x42f)],Bitmap[_0x30b69f(0x5fe)]['blt']=function(_0x54a1cc,_0xa5d00a,_0x1a4bce,_0x577fa4,_0x3378c4,_0x489058,_0x5ad60a,_0x1fb169,_0x1de56e){const _0x3de1e6=_0x30b69f;_0xa5d00a=Math[_0x3de1e6(0x297)](_0xa5d00a),_0x1a4bce=Math['round'](_0x1a4bce),_0x577fa4=Math[_0x3de1e6(0x297)](_0x577fa4),_0x3378c4=Math[_0x3de1e6(0x297)](_0x3378c4),_0x489058=Math[_0x3de1e6(0x297)](_0x489058),_0x5ad60a=Math[_0x3de1e6(0x297)](_0x5ad60a),VisuMZ[_0x3de1e6(0x5d8)]['Bitmap_blt'][_0x3de1e6(0x305)](this,_0x54a1cc,_0xa5d00a,_0x1a4bce,_0x577fa4,_0x3378c4,_0x489058,_0x5ad60a,_0x1fb169,_0x1de56e),this[_0x3de1e6(0x768)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x20e)]=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x4fb)],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x4fb)]=function(_0x4ceee9,_0x1985d6,_0x36b24f,_0x13eb15){const _0xfa97d4=_0x30b69f;VisuMZ[_0xfa97d4(0x5d8)][_0xfa97d4(0x20e)][_0xfa97d4(0x305)](this,_0x4ceee9,_0x1985d6,_0x36b24f,_0x13eb15),this[_0xfa97d4(0x768)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x406)]=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x7ef)],Bitmap['prototype'][_0x30b69f(0x7ef)]=function(_0x3fa482,_0x9273dd,_0x506030,_0x261b7a,_0x4d1950){const _0x32ea61=_0x30b69f;VisuMZ[_0x32ea61(0x5d8)][_0x32ea61(0x406)][_0x32ea61(0x305)](this,_0x3fa482,_0x9273dd,_0x506030,_0x261b7a,_0x4d1950),this['markCoreEngineModified']();},VisuMZ[_0x30b69f(0x5d8)]['Bitmap_strokeRect']=Bitmap[_0x30b69f(0x5fe)]['strokeRect'],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x836)]=function(_0x19abef,_0x1dedea,_0x693672,_0x24e7d6,_0x2427e2){const _0x16f1dd=_0x30b69f;VisuMZ[_0x16f1dd(0x5d8)][_0x16f1dd(0x2e5)][_0x16f1dd(0x305)](this,_0x19abef,_0x1dedea,_0x693672,_0x24e7d6,_0x2427e2),this[_0x16f1dd(0x768)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x33e)]=Bitmap[_0x30b69f(0x5fe)]['gradientFillRect'],Bitmap['prototype'][_0x30b69f(0x3ab)]=function(_0x4329f8,_0x46d9b1,_0x1c51da,_0x47b01f,_0x1b254d,_0xece29b,_0x42c9c9){const _0x1da02c=_0x30b69f;VisuMZ[_0x1da02c(0x5d8)]['Bitmap_gradientFillRect'][_0x1da02c(0x305)](this,_0x4329f8,_0x46d9b1,_0x1c51da,_0x47b01f,_0x1b254d,_0xece29b,_0x42c9c9),this['markCoreEngineModified']();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x845)]=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x3ef)],Bitmap['prototype'][_0x30b69f(0x3ef)]=function(_0x45da2e,_0x5d46a,_0x15e2d6,_0x16496f){const _0x1fd842=_0x30b69f;_0x45da2e=Math[_0x1fd842(0x297)](_0x45da2e),_0x5d46a=Math[_0x1fd842(0x297)](_0x5d46a),_0x15e2d6=Math[_0x1fd842(0x297)](_0x15e2d6),VisuMZ[_0x1fd842(0x5d8)][_0x1fd842(0x845)]['call'](this,_0x45da2e,_0x5d46a,_0x15e2d6,_0x16496f),this[_0x1fd842(0x768)]();},VisuMZ['CoreEngine']['Bitmap_measureTextWidth']=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x766)],Bitmap['prototype'][_0x30b69f(0x766)]=function(_0x3883cb){const _0x3b9c5d=_0x30b69f;return Math[_0x3b9c5d(0x386)](VisuMZ[_0x3b9c5d(0x5d8)][_0x3b9c5d(0x5e5)]['call'](this,_0x3883cb));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4a4)]=Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x397)],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x397)]=function(_0x536e08,_0x5aecb5,_0x5994b7,_0x50badd,_0x58a439,_0x2c2aa2){const _0x122637=_0x30b69f;_0x5aecb5=Math[_0x122637(0x297)](_0x5aecb5),_0x5994b7=Math[_0x122637(0x297)](_0x5994b7),_0x50badd=Math['round'](_0x50badd),_0x58a439=Math['round'](_0x58a439),VisuMZ[_0x122637(0x5d8)][_0x122637(0x4a4)][_0x122637(0x305)](this,_0x536e08,_0x5aecb5,_0x5994b7,_0x50badd,_0x58a439,_0x2c2aa2),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x30b69f(0x3b1)]=Bitmap['prototype'][_0x30b69f(0x692)],Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x692)]=function(_0x15c022,_0x3bf288,_0x1f7e7f,_0x122a25){const _0xb347cb=_0x30b69f;VisuMZ[_0xb347cb(0x5d8)][_0xb347cb(0x200)][_0xb347cb(0x702)][_0xb347cb(0x414)]?this['_drawTextShadow'](_0x15c022,_0x3bf288,_0x1f7e7f,_0x122a25):VisuMZ[_0xb347cb(0x5d8)][_0xb347cb(0x3b1)][_0xb347cb(0x305)](this,_0x15c022,_0x3bf288,_0x1f7e7f,_0x122a25);},Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x2d9)]=function(_0x4a706f,_0x68636d,_0x31c774,_0x193b37){const _0x11af82=_0x30b69f,_0x2c145f=this['context'];_0x2c145f['fillStyle']=this[_0x11af82(0x25a)],_0x2c145f[_0x11af82(0x507)](_0x4a706f,_0x68636d+0x2,_0x31c774+0x2,_0x193b37);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x5cf)]=Input[_0x30b69f(0x503)],Input[_0x30b69f(0x503)]=function(){const _0x1d4d58=_0x30b69f;VisuMZ[_0x1d4d58(0x5d8)][_0x1d4d58(0x5cf)][_0x1d4d58(0x305)](this),this[_0x1d4d58(0x49e)]=undefined,this[_0x1d4d58(0x27a)]=undefined,this['_gamepadWait']=Input['keyRepeatWait'];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x536)]=Input[_0x30b69f(0x202)],Input[_0x30b69f(0x202)]=function(){const _0x35fd6e=_0x30b69f;VisuMZ[_0x35fd6e(0x5d8)][_0x35fd6e(0x536)]['call'](this);if(this[_0x35fd6e(0x593)])this[_0x35fd6e(0x593)]--;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x659)]=Input[_0x30b69f(0x33d)],Input[_0x30b69f(0x33d)]=function(){const _0x55311f=_0x30b69f;if(this[_0x55311f(0x593)])return;VisuMZ['CoreEngine'][_0x55311f(0x659)]['call'](this);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x575)]=Input[_0x30b69f(0x81b)],Input[_0x30b69f(0x81b)]=function(){const _0x180c73=_0x30b69f;VisuMZ[_0x180c73(0x5d8)]['Input_setupEventHandlers']['call'](this),document['addEventListener'](_0x180c73(0x629),this['_onKeyPress'][_0x180c73(0x3f2)](this));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4d0)]=Input[_0x30b69f(0x376)],Input[_0x30b69f(0x376)]=function(_0xdf0e46){const _0x5aea0e=_0x30b69f;this[_0x5aea0e(0x27a)]=_0xdf0e46[_0x5aea0e(0x4a0)],VisuMZ[_0x5aea0e(0x5d8)][_0x5aea0e(0x4d0)]['call'](this,_0xdf0e46);},Input[_0x30b69f(0x2e1)]=function(_0x11d31b){const _0xa34b8c=_0x30b69f;this[_0xa34b8c(0x56e)](_0x11d31b);},Input[_0x30b69f(0x56e)]=function(_0x171146){const _0x3c61de=_0x30b69f;this['_inputSpecialKeyCode']=_0x171146[_0x3c61de(0x4a0)];let _0x1925ee=String['fromCharCode'](_0x171146[_0x3c61de(0x750)]);this[_0x3c61de(0x49e)]===undefined?this[_0x3c61de(0x49e)]=_0x1925ee:this[_0x3c61de(0x49e)]+=_0x1925ee;},VisuMZ[_0x30b69f(0x5d8)]['Input_shouldPreventDefault']=Input[_0x30b69f(0x5b8)],Input[_0x30b69f(0x5b8)]=function(_0x3f4ea7){const _0x56d876=_0x30b69f;if(_0x3f4ea7===0x8)return![];return VisuMZ[_0x56d876(0x5d8)][_0x56d876(0x1e8)][_0x56d876(0x305)](this,_0x3f4ea7);},Input['isSpecialCode']=function(_0x3bf2a9){const _0x4a52e2=_0x30b69f;if(_0x3bf2a9[_0x4a52e2(0x487)](/backspace/i))return this[_0x4a52e2(0x27a)]===0x8;if(_0x3bf2a9[_0x4a52e2(0x487)](/enter/i))return this[_0x4a52e2(0x27a)]===0xd;if(_0x3bf2a9[_0x4a52e2(0x487)](/escape/i))return this[_0x4a52e2(0x27a)]===0x1b;},Input[_0x30b69f(0x761)]=function(){const _0x5d9d07=_0x30b69f;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x5d9d07(0x239)](this['_inputSpecialKeyCode']);},Input[_0x30b69f(0x418)]=function(){const _0x3c65ab=_0x30b69f;return[0x25,0x26,0x27,0x28][_0x3c65ab(0x239)](this[_0x3c65ab(0x27a)]);},Input[_0x30b69f(0x219)]=function(){const _0x35d286=_0x30b69f;if(navigator[_0x35d286(0x360)]){const _0x5b25f3=navigator[_0x35d286(0x360)]();if(_0x5b25f3)for(const _0x28fe1c of _0x5b25f3){if(_0x28fe1c&&_0x28fe1c[_0x35d286(0x68a)])return!![];}}return![];},Input[_0x30b69f(0x780)]=function(){const _0x320d98=_0x30b69f;if(navigator[_0x320d98(0x360)]){const _0x104126=navigator[_0x320d98(0x360)]();if(_0x104126)for(const _0x566d8e of _0x104126){if(_0x566d8e&&_0x566d8e['connected']){if(this[_0x320d98(0x80f)](_0x566d8e))return!![];}}}return![];},Input[_0x30b69f(0x80f)]=function(_0x4d4c4a){const _0x10eb2c=_0x30b69f,_0x577c13=_0x4d4c4a[_0x10eb2c(0x4ce)];for(let _0x246960=0x0;_0x246960<_0x577c13['length'];_0x246960++){if(_0x577c13[_0x246960]['pressed'])return!![];}return![];},VisuMZ[_0x30b69f(0x5d8)]['Tilemap_addShadow']=Tilemap[_0x30b69f(0x5fe)][_0x30b69f(0x77e)],Tilemap[_0x30b69f(0x5fe)][_0x30b69f(0x77e)]=function(_0x2944b0,_0x3de1ba,_0x2e8b46,_0x481b9d){const _0x3352fa=_0x30b69f;if($gameMap&&$gameMap[_0x3352fa(0x5b1)]())return;VisuMZ[_0x3352fa(0x5d8)][_0x3352fa(0x23d)][_0x3352fa(0x305)](this,_0x2944b0,_0x3de1ba,_0x2e8b46,_0x481b9d);},Tilemap[_0x30b69f(0x7e0)][_0x30b69f(0x5fe)]['_createInternalTextures']=function(){const _0x6ac6f8=_0x30b69f;this[_0x6ac6f8(0x44b)]();for(let _0x1da736=0x0;_0x1da736<Tilemap[_0x6ac6f8(0x221)][_0x6ac6f8(0x345)];_0x1da736++){const _0x27fb72=new PIXI[(_0x6ac6f8(0x623))]();_0x27fb72[_0x6ac6f8(0x607)](0x800,0x800),VisuMZ[_0x6ac6f8(0x5d8)]['Settings']['QoL'][_0x6ac6f8(0x2d4)]&&(_0x27fb72[_0x6ac6f8(0x78b)]=PIXI['SCALE_MODES'][_0x6ac6f8(0x275)]),this['_internalTextures'][_0x6ac6f8(0x327)](_0x27fb72);}},WindowLayer[_0x30b69f(0x5fe)]['isMaskingEnabled']=function(){const _0xda2ac6=_0x30b69f;return SceneManager&&SceneManager[_0xda2ac6(0x864)]?SceneManager[_0xda2ac6(0x864)][_0xda2ac6(0x57c)]():!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7e5)]=WindowLayer[_0x30b69f(0x5fe)]['render'],WindowLayer[_0x30b69f(0x5fe)][_0x30b69f(0x22e)]=function render(_0x4c4442){const _0x4994f1=_0x30b69f;this[_0x4994f1(0x41d)]()?VisuMZ[_0x4994f1(0x5d8)][_0x4994f1(0x7e5)][_0x4994f1(0x305)](this,_0x4c4442):this[_0x4994f1(0x69b)](_0x4c4442);},WindowLayer['prototype'][_0x30b69f(0x69b)]=function render(_0x478631){const _0x430e44=_0x30b69f;if(!this[_0x430e44(0x430)])return;const _0x2bc933=new PIXI[(_0x430e44(0x2d7))](),_0x3066ee=_0x478631['gl'],_0x1b007f=this[_0x430e44(0x715)][_0x430e44(0x763)]();_0x478631[_0x430e44(0x6ad)][_0x430e44(0x579)](),_0x2bc933[_0x430e44(0x859)]=this[_0x430e44(0x859)],_0x478631['batch'][_0x430e44(0x4b4)](),_0x3066ee['enable'](_0x3066ee['STENCIL_TEST']);while(_0x1b007f['length']>0x0){const _0x424227=_0x1b007f[_0x430e44(0x1c6)]();_0x424227[_0x430e44(0x286)]&&_0x424227[_0x430e44(0x430)]&&_0x424227[_0x430e44(0x662)]>0x0&&(_0x3066ee[_0x430e44(0x7e6)](_0x3066ee[_0x430e44(0x613)],0x0,~0x0),_0x3066ee[_0x430e44(0x713)](_0x3066ee['KEEP'],_0x3066ee[_0x430e44(0x43e)],_0x3066ee['KEEP']),_0x424227['render'](_0x478631),_0x478631['batch']['flush'](),_0x2bc933[_0x430e44(0x503)](),_0x3066ee[_0x430e44(0x7e6)](_0x3066ee['ALWAYS'],0x1,~0x0),_0x3066ee[_0x430e44(0x713)](_0x3066ee['REPLACE'],_0x3066ee['REPLACE'],_0x3066ee[_0x430e44(0x4b7)]),_0x3066ee[_0x430e44(0x44e)](_0x3066ee[_0x430e44(0x363)],_0x3066ee[_0x430e44(0x6bc)]),_0x2bc933[_0x430e44(0x22e)](_0x478631),_0x478631[_0x430e44(0x478)][_0x430e44(0x4b4)](),_0x3066ee[_0x430e44(0x44e)](_0x3066ee[_0x430e44(0x6bc)],_0x3066ee[_0x430e44(0x436)]));}_0x3066ee['disable'](_0x3066ee['STENCIL_TEST']),_0x3066ee['clear'](_0x3066ee[_0x430e44(0x60b)]),_0x3066ee['clearStencil'](0x0),_0x478631[_0x430e44(0x478)][_0x430e44(0x4b4)]();for(const _0x545258 of this[_0x430e44(0x715)]){!_0x545258['_isWindow']&&_0x545258[_0x430e44(0x430)]&&_0x545258[_0x430e44(0x22e)](_0x478631);}_0x478631[_0x430e44(0x478)][_0x430e44(0x4b4)]();},DataManager[_0x30b69f(0x246)]=function(_0x204ec9){const _0x8ef4d9=_0x30b69f;return this[_0x8ef4d9(0x6a9)](_0x204ec9)&&_0x204ec9['itypeId']===0x2;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x832)]=DataManager['setupNewGame'],DataManager[_0x30b69f(0x745)]=function(){const _0x43f2af=_0x30b69f;VisuMZ[_0x43f2af(0x5d8)][_0x43f2af(0x832)][_0x43f2af(0x305)](this),this[_0x43f2af(0x5b4)](),this[_0x43f2af(0x2f8)]();},DataManager[_0x30b69f(0x5b4)]=function(){const _0x1eb1a1=_0x30b69f;if($gameTemp[_0x1eb1a1(0x2d6)]()){const _0x456255=VisuMZ[_0x1eb1a1(0x5d8)][_0x1eb1a1(0x200)]['QoL'][_0x1eb1a1(0x703)];if(_0x456255>0x0)$gameTemp[_0x1eb1a1(0x383)](_0x456255);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x4da06c=_0x30b69f,_0x347468=VisuMZ[_0x4da06c(0x5d8)][_0x4da06c(0x200)][_0x4da06c(0x702)]['NewGameCommonEventAll']||0x0;if(_0x347468>0x0)$gameTemp['reserveCommonEvent'](_0x347468);},DataManager[_0x30b69f(0x30e)]=function(_0x30c69c){const _0x1c003e=_0x30b69f,_0x3a2c77=$dataTroops[_0x30c69c];if(!_0x3a2c77)return'';let _0x31b751='';_0x31b751+=_0x3a2c77[_0x1c003e(0x656)];for(const _0x1ab2d1 of _0x3a2c77['pages']){for(const _0xbdc8ea of _0x1ab2d1[_0x1c003e(0x54a)]){[0x6c,0x198]['includes'](_0xbdc8ea['code'])&&(_0x31b751+='\x0a',_0x31b751+=_0xbdc8ea[_0x1c003e(0x45d)][0x0]);}}return _0x31b751;},StorageManager['jsonToZip']=function(_0x4a94fa){return new Promise((_0x29cd88,_0x1e015d)=>{const _0x39740d=_0x5d97;try{const _0x3f1a91=pako[_0x39740d(0x75c)](_0x4a94fa,{'to':'string','level':0x1});if(_0x3f1a91[_0x39740d(0x303)]>=0xc350){}_0x29cd88(_0x3f1a91);}catch(_0x52b5b4){_0x1e015d(_0x52b5b4);}});},TextManager['stringKeyMap']=['','','',_0x30b69f(0x2c5),'','',_0x30b69f(0x437),'',_0x30b69f(0x67d),_0x30b69f(0x4d2),'','',_0x30b69f(0x72c),_0x30b69f(0x273),_0x30b69f(0x2c8),'',_0x30b69f(0x7bf),_0x30b69f(0x45c),_0x30b69f(0x7cd),_0x30b69f(0x302),_0x30b69f(0x30d),'KANA','EISU',_0x30b69f(0x256),_0x30b69f(0x731),'HANJA','',_0x30b69f(0x6b7),_0x30b69f(0x259),'NONCONVERT',_0x30b69f(0x1de),_0x30b69f(0x754),_0x30b69f(0x353),'PGUP',_0x30b69f(0x2bd),_0x30b69f(0x32b),_0x30b69f(0x295),_0x30b69f(0x858),'UP',_0x30b69f(0x518),_0x30b69f(0x7ee),_0x30b69f(0x23c),_0x30b69f(0x61f),_0x30b69f(0x61d),_0x30b69f(0x317),_0x30b69f(0x6cc),'DELETE','','0','1','2','3','4','5','6','7','8','9','COLON','SEMICOLON',_0x30b69f(0x614),_0x30b69f(0x838),_0x30b69f(0x38d),_0x30b69f(0x592),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x30b69f(0x20f),'',_0x30b69f(0x4fd),'',_0x30b69f(0x2c9),_0x30b69f(0x34d),_0x30b69f(0x7cb),_0x30b69f(0x36b),'NUMPAD3',_0x30b69f(0x1c5),_0x30b69f(0x2d8),_0x30b69f(0x63c),_0x30b69f(0x1cb),_0x30b69f(0x1ca),_0x30b69f(0x296),'MULTIPLY',_0x30b69f(0x62e),_0x30b69f(0x358),_0x30b69f(0x641),_0x30b69f(0x31f),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x30b69f(0x233),_0x30b69f(0x5b3),_0x30b69f(0x5a2),'F13',_0x30b69f(0x667),'F15',_0x30b69f(0x278),_0x30b69f(0x2ea),_0x30b69f(0x596),'F19',_0x30b69f(0x7b3),_0x30b69f(0x3a6),_0x30b69f(0x315),'F23','F24','','','','','','','','',_0x30b69f(0x231),_0x30b69f(0x260),_0x30b69f(0x691),_0x30b69f(0x759),_0x30b69f(0x2a7),_0x30b69f(0x576),_0x30b69f(0x1e4),'','','','','','','','','',_0x30b69f(0x571),_0x30b69f(0x74f),_0x30b69f(0x5d7),'HASH',_0x30b69f(0x232),_0x30b69f(0x7a0),_0x30b69f(0x36f),_0x30b69f(0x734),_0x30b69f(0x35e),_0x30b69f(0x696),'ASTERISK','PLUS',_0x30b69f(0x5ca),'HYPHEN_MINUS',_0x30b69f(0x3c6),'CLOSE_CURLY_BRACKET',_0x30b69f(0x419),'','','','',_0x30b69f(0x4db),_0x30b69f(0x557),_0x30b69f(0x212),'','','SEMICOLON',_0x30b69f(0x838),_0x30b69f(0x539),_0x30b69f(0x7ce),_0x30b69f(0x6e9),_0x30b69f(0x47e),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x30b69f(0x746),_0x30b69f(0x84e),'CLOSE_BRACKET','QUOTE','',_0x30b69f(0x229),'ALTGR','',_0x30b69f(0x45f),_0x30b69f(0x357),'',_0x30b69f(0x24e),'','','WIN_OEM_RESET',_0x30b69f(0x26b),_0x30b69f(0x7f2),_0x30b69f(0x61e),_0x30b69f(0x7c9),_0x30b69f(0x63d),_0x30b69f(0x21c),_0x30b69f(0x224),_0x30b69f(0x81f),_0x30b69f(0x5e8),_0x30b69f(0x491),'WIN_OEM_ENLW',_0x30b69f(0x2c3),_0x30b69f(0x6fb),_0x30b69f(0x7d3),'EXSEL',_0x30b69f(0x2cd),'PLAY','ZOOM','','PA1',_0x30b69f(0x3fd),''],TextManager[_0x30b69f(0x4a7)]=VisuMZ['CoreEngine'][_0x30b69f(0x200)]['ButtonAssist'][_0x30b69f(0x5e4)],TextManager[_0x30b69f(0x432)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x834)]['CancelText'],TextManager[_0x30b69f(0x7db)]=VisuMZ['CoreEngine'][_0x30b69f(0x200)][_0x30b69f(0x834)][_0x30b69f(0x5ff)],VisuMZ[_0x30b69f(0x5d8)]['TextManager_param']=TextManager[_0x30b69f(0x1cc)],TextManager[_0x30b69f(0x1cc)]=function(_0x1ff790){const _0x5a0ae0=_0x30b69f;return typeof _0x1ff790===_0x5a0ae0(0x807)?VisuMZ['CoreEngine'][_0x5a0ae0(0x7d8)]['call'](this,_0x1ff790):this[_0x5a0ae0(0x716)](_0x1ff790);},TextManager['paramName']=function(_0x56e0c6){const _0x122ca5=_0x30b69f;_0x56e0c6=String(_0x56e0c6||'')[_0x122ca5(0x62b)]();const _0x587f14=VisuMZ[_0x122ca5(0x5d8)][_0x122ca5(0x200)][_0x122ca5(0x420)];if(_0x56e0c6===_0x122ca5(0x67b))return $dataSystem['terms'][_0x122ca5(0x3de)][0x0];if(_0x56e0c6==='MAXMP')return $dataSystem[_0x122ca5(0x2e8)][_0x122ca5(0x3de)][0x1];if(_0x56e0c6===_0x122ca5(0x401))return $dataSystem['terms'][_0x122ca5(0x3de)][0x2];if(_0x56e0c6===_0x122ca5(0x6aa))return $dataSystem['terms']['params'][0x3];if(_0x56e0c6===_0x122ca5(0x3b0))return $dataSystem[_0x122ca5(0x2e8)][_0x122ca5(0x3de)][0x4];if(_0x56e0c6===_0x122ca5(0x7a1))return $dataSystem[_0x122ca5(0x2e8)]['params'][0x5];if(_0x56e0c6==='AGI')return $dataSystem[_0x122ca5(0x2e8)][_0x122ca5(0x3de)][0x6];if(_0x56e0c6===_0x122ca5(0x1ef))return $dataSystem[_0x122ca5(0x2e8)][_0x122ca5(0x3de)][0x7];if(_0x56e0c6===_0x122ca5(0x325))return _0x587f14[_0x122ca5(0x822)];if(_0x56e0c6===_0x122ca5(0x6d9))return _0x587f14[_0x122ca5(0x511)];if(_0x56e0c6===_0x122ca5(0x6e6))return _0x587f14['XParamVocab2'];if(_0x56e0c6==='CEV')return _0x587f14[_0x122ca5(0x74c)];if(_0x56e0c6===_0x122ca5(0x7b7))return _0x587f14['XParamVocab4'];if(_0x56e0c6===_0x122ca5(0x3e5))return _0x587f14[_0x122ca5(0x7dd)];if(_0x56e0c6==='CNT')return _0x587f14[_0x122ca5(0x537)];if(_0x56e0c6===_0x122ca5(0x736))return _0x587f14[_0x122ca5(0x7bb)];if(_0x56e0c6===_0x122ca5(0x6c0))return _0x587f14[_0x122ca5(0x464)];if(_0x56e0c6===_0x122ca5(0x6c3))return _0x587f14[_0x122ca5(0x448)];if(_0x56e0c6===_0x122ca5(0x5d0))return _0x587f14[_0x122ca5(0x4e4)];if(_0x56e0c6===_0x122ca5(0x1f8))return _0x587f14[_0x122ca5(0x6ae)];if(_0x56e0c6==='REC')return _0x587f14[_0x122ca5(0x257)];if(_0x56e0c6===_0x122ca5(0x452))return _0x587f14[_0x122ca5(0x73b)];if(_0x56e0c6===_0x122ca5(0x39a))return _0x587f14[_0x122ca5(0x53e)];if(_0x56e0c6===_0x122ca5(0x2ff))return _0x587f14[_0x122ca5(0x23f)];if(_0x56e0c6===_0x122ca5(0x851))return _0x587f14['SParamVocab6'];if(_0x56e0c6==='MDR')return _0x587f14['SParamVocab7'];if(_0x56e0c6===_0x122ca5(0x47b))return _0x587f14[_0x122ca5(0x392)];if(_0x56e0c6===_0x122ca5(0x588))return _0x587f14[_0x122ca5(0x531)];if(VisuMZ[_0x122ca5(0x5d8)][_0x122ca5(0x22d)][_0x56e0c6])return VisuMZ[_0x122ca5(0x5d8)]['CustomParamNames'][_0x56e0c6];return'';},TextManager[_0x30b69f(0x77a)]=function(_0x4a7d63){const _0x28f1d8=_0x30b69f;if(_0x4a7d63==='cancel')_0x4a7d63=_0x28f1d8(0x6cf);let _0x16443a=[];for(let _0x5395a1 in Input['keyMapper']){_0x5395a1=Number(_0x5395a1);if(_0x5395a1>=0x60&&_0x5395a1<=0x69)continue;if([0x12,0x20]['includes'](_0x5395a1))continue;_0x4a7d63===Input[_0x28f1d8(0x31b)][_0x5395a1]&&_0x16443a['push'](_0x5395a1);}for(let _0x2d59b6=0x0;_0x2d59b6<_0x16443a[_0x28f1d8(0x303)];_0x2d59b6++){_0x16443a[_0x2d59b6]=TextManager[_0x28f1d8(0x4f8)][_0x16443a[_0x2d59b6]];}return this[_0x28f1d8(0x757)](_0x16443a);},TextManager['makeInputButtonString']=function(_0x26f998){const _0x34cb8e=_0x30b69f,_0x323c71=VisuMZ[_0x34cb8e(0x5d8)][_0x34cb8e(0x200)]['ButtonAssist'],_0x27fcc7=_0x323c71[_0x34cb8e(0x54c)],_0x3b7bdb=_0x26f998['pop'](),_0x4a77b7=_0x34cb8e(0x318)['format'](_0x3b7bdb);return _0x323c71[_0x4a77b7]?_0x323c71[_0x4a77b7]:_0x27fcc7[_0x34cb8e(0x84d)](_0x3b7bdb);},TextManager[_0x30b69f(0x739)]=function(_0x34ae9d,_0x4b596b){const _0x1ddafb=_0x30b69f,_0xdba183=VisuMZ[_0x1ddafb(0x5d8)][_0x1ddafb(0x200)][_0x1ddafb(0x834)],_0x47024e=_0xdba183['MultiKeyFmt'],_0x28c75f=this[_0x1ddafb(0x77a)](_0x34ae9d),_0x5c13bb=this[_0x1ddafb(0x77a)](_0x4b596b);return _0x47024e[_0x1ddafb(0x84d)](_0x28c75f,_0x5c13bb);},VisuMZ['CoreEngine'][_0x30b69f(0x6ea)]=ColorManager[_0x30b69f(0x39b)],ColorManager[_0x30b69f(0x39b)]=function(){const _0x314d3e=_0x30b69f;VisuMZ['CoreEngine'][_0x314d3e(0x6ea)][_0x314d3e(0x305)](this),this[_0x314d3e(0x600)]=this['_colorCache']||{};},ColorManager[_0x30b69f(0x711)]=function(_0x24e63f,_0x460f0e){const _0x47e90b=_0x30b69f;return _0x460f0e=String(_0x460f0e),this[_0x47e90b(0x600)]=this[_0x47e90b(0x600)]||{},_0x460f0e[_0x47e90b(0x487)](/#(.*)/i)?this[_0x47e90b(0x600)][_0x24e63f]=_0x47e90b(0x559)[_0x47e90b(0x84d)](String(RegExp['$1'])):this[_0x47e90b(0x600)][_0x24e63f]=this[_0x47e90b(0x50d)](Number(_0x460f0e)),this[_0x47e90b(0x600)][_0x24e63f];},ColorManager[_0x30b69f(0x5f2)]=function(_0x5c0b67){const _0x3a4c46=_0x30b69f;return _0x5c0b67=String(_0x5c0b67),_0x5c0b67['match'](/#(.*)/i)?_0x3a4c46(0x559)[_0x3a4c46(0x84d)](String(RegExp['$1'])):this[_0x3a4c46(0x50d)](Number(_0x5c0b67));},ColorManager[_0x30b69f(0x46f)]=function(){const _0x832777=_0x30b69f;this[_0x832777(0x600)]={};},ColorManager['normalColor']=function(){const _0x302d23=_0x30b69f,_0x10a3d5=_0x302d23(0x2b9);this['_colorCache']=this[_0x302d23(0x600)]||{};if(this[_0x302d23(0x600)][_0x10a3d5])return this[_0x302d23(0x600)][_0x10a3d5];const _0x5af3a5=VisuMZ[_0x302d23(0x5d8)][_0x302d23(0x200)][_0x302d23(0x3ca)][_0x302d23(0x1bb)];return this[_0x302d23(0x711)](_0x10a3d5,_0x5af3a5);},ColorManager[_0x30b69f(0x5f0)]=function(){const _0x12eb3f=_0x30b69f,_0x41735c=_0x12eb3f(0x306);this[_0x12eb3f(0x600)]=this[_0x12eb3f(0x600)]||{};if(this[_0x12eb3f(0x600)][_0x41735c])return this[_0x12eb3f(0x600)][_0x41735c];const _0x107e57=VisuMZ['CoreEngine'][_0x12eb3f(0x200)][_0x12eb3f(0x3ca)]['ColorSystem'];return this[_0x12eb3f(0x711)](_0x41735c,_0x107e57);},ColorManager[_0x30b69f(0x5e7)]=function(){const _0x4e1849=_0x30b69f,_0x4f83fd=_0x4e1849(0x446);this[_0x4e1849(0x600)]=this[_0x4e1849(0x600)]||{};if(this['_colorCache'][_0x4f83fd])return this[_0x4e1849(0x600)][_0x4f83fd];const _0x42d179=VisuMZ[_0x4e1849(0x5d8)][_0x4e1849(0x200)][_0x4e1849(0x3ca)]['ColorCrisis'];return this[_0x4e1849(0x711)](_0x4f83fd,_0x42d179);},ColorManager[_0x30b69f(0x1ce)]=function(){const _0x507106=_0x30b69f,_0x246b55=_0x507106(0x292);this[_0x507106(0x600)]=this[_0x507106(0x600)]||{};if(this[_0x507106(0x600)][_0x246b55])return this['_colorCache'][_0x246b55];const _0x5956c6=VisuMZ[_0x507106(0x5d8)][_0x507106(0x200)][_0x507106(0x3ca)]['ColorDeath'];return this[_0x507106(0x711)](_0x246b55,_0x5956c6);},ColorManager[_0x30b69f(0x784)]=function(){const _0xdaa8d2=_0x30b69f,_0xabe435=_0xdaa8d2(0x28b);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0xabe435])return this['_colorCache'][_0xabe435];const _0x54e12c=VisuMZ[_0xdaa8d2(0x5d8)][_0xdaa8d2(0x200)][_0xdaa8d2(0x3ca)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0xabe435,_0x54e12c);},ColorManager[_0x30b69f(0x1d2)]=function(){const _0x117f6b=_0x30b69f,_0x4bc6a2=_0x117f6b(0x570);this[_0x117f6b(0x600)]=this['_colorCache']||{};if(this['_colorCache'][_0x4bc6a2])return this['_colorCache'][_0x4bc6a2];const _0x263f2b=VisuMZ[_0x117f6b(0x5d8)][_0x117f6b(0x200)][_0x117f6b(0x3ca)][_0x117f6b(0x66c)];return this[_0x117f6b(0x711)](_0x4bc6a2,_0x263f2b);},ColorManager['hpGaugeColor2']=function(){const _0x45a303=_0x30b69f,_0x3a2728=_0x45a303(0x35a);this['_colorCache']=this[_0x45a303(0x600)]||{};if(this[_0x45a303(0x600)][_0x3a2728])return this[_0x45a303(0x600)][_0x3a2728];const _0x45e53f=VisuMZ['CoreEngine'][_0x45a303(0x200)][_0x45a303(0x3ca)][_0x45a303(0x4b8)];return this[_0x45a303(0x711)](_0x3a2728,_0x45e53f);},ColorManager[_0x30b69f(0x367)]=function(){const _0x2a607b=_0x30b69f,_0x1673ae=_0x2a607b(0x3a9);this[_0x2a607b(0x600)]=this[_0x2a607b(0x600)]||{};if(this[_0x2a607b(0x600)][_0x1673ae])return this[_0x2a607b(0x600)][_0x1673ae];const _0x565e7c=VisuMZ[_0x2a607b(0x5d8)][_0x2a607b(0x200)]['Color']['ColorMPGauge1'];return this[_0x2a607b(0x711)](_0x1673ae,_0x565e7c);},ColorManager[_0x30b69f(0x801)]=function(){const _0x203abd=_0x30b69f,_0xfbfb8a=_0x203abd(0x476);this[_0x203abd(0x600)]=this[_0x203abd(0x600)]||{};if(this['_colorCache'][_0xfbfb8a])return this[_0x203abd(0x600)][_0xfbfb8a];const _0x26fea6=VisuMZ[_0x203abd(0x5d8)][_0x203abd(0x200)][_0x203abd(0x3ca)][_0x203abd(0x82a)];return this[_0x203abd(0x711)](_0xfbfb8a,_0x26fea6);},ColorManager[_0x30b69f(0x6ed)]=function(){const _0x53d095=_0x30b69f,_0x45e625=_0x53d095(0x3dd);this[_0x53d095(0x600)]=this['_colorCache']||{};if(this[_0x53d095(0x600)][_0x45e625])return this['_colorCache'][_0x45e625];const _0x235b5d=VisuMZ[_0x53d095(0x5d8)]['Settings'][_0x53d095(0x3ca)]['ColorMPCost'];return this[_0x53d095(0x711)](_0x45e625,_0x235b5d);},ColorManager[_0x30b69f(0x82e)]=function(){const _0x6ef70a=_0x30b69f,_0x277a11=_0x6ef70a(0x7c1);this['_colorCache']=this[_0x6ef70a(0x600)]||{};if(this[_0x6ef70a(0x600)][_0x277a11])return this['_colorCache'][_0x277a11];const _0x37b32a=VisuMZ[_0x6ef70a(0x5d8)][_0x6ef70a(0x200)]['Color'][_0x6ef70a(0x7eb)];return this['getColorDataFromPluginParameters'](_0x277a11,_0x37b32a);},ColorManager[_0x30b69f(0x6f6)]=function(){const _0x3bd38a=_0x30b69f,_0x2a8ce9=_0x3bd38a(0x64e);this[_0x3bd38a(0x600)]=this[_0x3bd38a(0x600)]||{};if(this[_0x3bd38a(0x600)][_0x2a8ce9])return this[_0x3bd38a(0x600)][_0x2a8ce9];const _0x513a8a=VisuMZ[_0x3bd38a(0x5d8)][_0x3bd38a(0x200)][_0x3bd38a(0x3ca)][_0x3bd38a(0x861)];return this[_0x3bd38a(0x711)](_0x2a8ce9,_0x513a8a);},ColorManager[_0x30b69f(0x5b9)]=function(){const _0x5ed03f=_0x30b69f,_0x57ae38=_0x5ed03f(0x46e);this[_0x5ed03f(0x600)]=this['_colorCache']||{};if(this[_0x5ed03f(0x600)][_0x57ae38])return this[_0x5ed03f(0x600)][_0x57ae38];const _0x599b4c=VisuMZ[_0x5ed03f(0x5d8)]['Settings'][_0x5ed03f(0x3ca)][_0x5ed03f(0x5d1)];return this[_0x5ed03f(0x711)](_0x57ae38,_0x599b4c);},ColorManager[_0x30b69f(0x7aa)]=function(){const _0x42e3ff=_0x30b69f,_0x2be5ea=_0x42e3ff(0x2bc);this[_0x42e3ff(0x600)]=this[_0x42e3ff(0x600)]||{};if(this[_0x42e3ff(0x600)][_0x2be5ea])return this[_0x42e3ff(0x600)][_0x2be5ea];const _0x5b7d4f=VisuMZ[_0x42e3ff(0x5d8)]['Settings']['Color'][_0x42e3ff(0x603)];return this[_0x42e3ff(0x711)](_0x2be5ea,_0x5b7d4f);},ColorManager[_0x30b69f(0x1df)]=function(){const _0x2e2e40=_0x30b69f,_0x21e431='_stored_tpGaugeColor1';this[_0x2e2e40(0x600)]=this[_0x2e2e40(0x600)]||{};if(this[_0x2e2e40(0x600)][_0x21e431])return this['_colorCache'][_0x21e431];const _0x5acb60=VisuMZ[_0x2e2e40(0x5d8)][_0x2e2e40(0x200)][_0x2e2e40(0x3ca)][_0x2e2e40(0x28c)];return this['getColorDataFromPluginParameters'](_0x21e431,_0x5acb60);},ColorManager[_0x30b69f(0x789)]=function(){const _0x36ef84=_0x30b69f,_0x69fb70=_0x36ef84(0x69d);this['_colorCache']=this[_0x36ef84(0x600)]||{};if(this[_0x36ef84(0x600)][_0x69fb70])return this[_0x36ef84(0x600)][_0x69fb70];const _0x19c9ad=VisuMZ[_0x36ef84(0x5d8)][_0x36ef84(0x200)]['Color']['ColorTPGauge2'];return this[_0x36ef84(0x711)](_0x69fb70,_0x19c9ad);},ColorManager[_0x30b69f(0x4c5)]=function(){const _0x5806bd=_0x30b69f,_0x3431e8=_0x5806bd(0x577);this['_colorCache']=this[_0x5806bd(0x600)]||{};if(this[_0x5806bd(0x600)][_0x3431e8])return this[_0x5806bd(0x600)][_0x3431e8];const _0x2e99e1=VisuMZ[_0x5806bd(0x5d8)]['Settings'][_0x5806bd(0x3ca)][_0x5806bd(0x68c)];return this['getColorDataFromPluginParameters'](_0x3431e8,_0x2e99e1);},ColorManager[_0x30b69f(0x868)]=function(){const _0x227827=_0x30b69f,_0xd69e74=_0x227827(0x38f);this[_0x227827(0x600)]=this[_0x227827(0x600)]||{};if(this[_0x227827(0x600)][_0xd69e74])return this[_0x227827(0x600)][_0xd69e74];const _0x4bdb4f=VisuMZ[_0x227827(0x5d8)][_0x227827(0x200)][_0x227827(0x3ca)]['ColorTPCost'];return this[_0x227827(0x711)](_0xd69e74,_0x4bdb4f);},ColorManager[_0x30b69f(0x573)]=function(){const _0x178730=_0x30b69f,_0x2652e6=_0x178730(0x825);this[_0x178730(0x600)]=this[_0x178730(0x600)]||{};if(this[_0x178730(0x600)][_0x2652e6])return this['_colorCache'][_0x2652e6];const _0x380cbd=VisuMZ[_0x178730(0x5d8)]['Settings'][_0x178730(0x3ca)]['ColorExpGauge1'];return this[_0x178730(0x711)](_0x2652e6,_0x380cbd);},ColorManager[_0x30b69f(0x361)]=function(){const _0x457ba1=_0x30b69f,_0x44c0e5=_0x457ba1(0x2b3);this[_0x457ba1(0x600)]=this['_colorCache']||{};if(this[_0x457ba1(0x600)][_0x44c0e5])return this['_colorCache'][_0x44c0e5];const _0x538854=VisuMZ[_0x457ba1(0x5d8)]['Settings']['Color']['ColorExpGauge2'];return this[_0x457ba1(0x711)](_0x44c0e5,_0x538854);},ColorManager[_0x30b69f(0x764)]=function(){const _0xfe1d4d=_0x30b69f,_0x38f791=_0xfe1d4d(0x765);this[_0xfe1d4d(0x600)]=this[_0xfe1d4d(0x600)]||{};if(this['_colorCache'][_0x38f791])return this[_0xfe1d4d(0x600)][_0x38f791];const _0x35b738=VisuMZ[_0xfe1d4d(0x5d8)][_0xfe1d4d(0x200)]['Color'][_0xfe1d4d(0x4ff)];return this[_0xfe1d4d(0x711)](_0x38f791,_0x35b738);},ColorManager['maxLvGaugeColor2']=function(){const _0x387e6c=_0x30b69f,_0x2b21a7=_0x387e6c(0x4bd);this[_0x387e6c(0x600)]=this[_0x387e6c(0x600)]||{};if(this[_0x387e6c(0x600)][_0x2b21a7])return this['_colorCache'][_0x2b21a7];const _0x52902d=VisuMZ[_0x387e6c(0x5d8)][_0x387e6c(0x200)][_0x387e6c(0x3ca)][_0x387e6c(0x7dc)];return this[_0x387e6c(0x711)](_0x2b21a7,_0x52902d);},ColorManager['hpColor']=function(_0x151370){const _0x258d08=_0x30b69f;return VisuMZ[_0x258d08(0x5d8)][_0x258d08(0x200)][_0x258d08(0x3ca)][_0x258d08(0x49d)][_0x258d08(0x305)](this,_0x151370);},ColorManager['mpColor']=function(_0x33d50a){const _0x31ad53=_0x30b69f;return VisuMZ[_0x31ad53(0x5d8)][_0x31ad53(0x200)]['Color'][_0x31ad53(0x267)][_0x31ad53(0x305)](this,_0x33d50a);},ColorManager[_0x30b69f(0x49c)]=function(_0x164450){const _0x4326db=_0x30b69f;return VisuMZ[_0x4326db(0x5d8)][_0x4326db(0x200)][_0x4326db(0x3ca)][_0x4326db(0x618)][_0x4326db(0x305)](this,_0x164450);},ColorManager['paramchangeTextColor']=function(_0x5d6929){const _0x2df24d=_0x30b69f;return VisuMZ[_0x2df24d(0x5d8)][_0x2df24d(0x200)][_0x2df24d(0x3ca)][_0x2df24d(0x6bb)][_0x2df24d(0x305)](this,_0x5d6929);},ColorManager[_0x30b69f(0x3a5)]=function(_0x50be49){const _0x40ba54=_0x30b69f;return VisuMZ[_0x40ba54(0x5d8)][_0x40ba54(0x200)][_0x40ba54(0x3ca)]['DamageColor'][_0x40ba54(0x305)](this,_0x50be49);},ColorManager['outlineColor']=function(){const _0x178c6b=_0x30b69f;return VisuMZ[_0x178c6b(0x5d8)][_0x178c6b(0x200)][_0x178c6b(0x3ca)][_0x178c6b(0x1d5)];},ColorManager[_0x30b69f(0x52d)]=function(){const _0x4ea7f8=_0x30b69f;return VisuMZ[_0x4ea7f8(0x5d8)][_0x4ea7f8(0x200)][_0x4ea7f8(0x3ca)][_0x4ea7f8(0x5df)]||_0x4ea7f8(0x61b);},ColorManager[_0x30b69f(0x1ec)]=function(){const _0x516d89=_0x30b69f;return VisuMZ['CoreEngine'][_0x516d89(0x200)][_0x516d89(0x3ca)][_0x516d89(0x574)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x30b69f(0x5bd)]=function(){const _0x51a56c=_0x30b69f;return VisuMZ[_0x51a56c(0x5d8)][_0x51a56c(0x200)]['Color'][_0x51a56c(0x34f)];},ColorManager[_0x30b69f(0x3da)]=function(){const _0x454f78=_0x30b69f;return VisuMZ['CoreEngine']['Settings']['Color'][_0x454f78(0x7ad)];},ColorManager[_0x30b69f(0x42a)]=function(){const _0x5a25b2=_0x30b69f;return VisuMZ['CoreEngine'][_0x5a25b2(0x200)][_0x5a25b2(0x3ca)][_0x5a25b2(0x2e2)];},ColorManager[_0x30b69f(0x852)]=function(){const _0xa3000a=_0x30b69f;return VisuMZ[_0xa3000a(0x5d8)][_0xa3000a(0x200)][_0xa3000a(0x3ca)]['ItemBackColor2'];},SceneManager[_0x30b69f(0x7a5)]=[],SceneManager[_0x30b69f(0x606)]=function(){const _0x51bb27=_0x30b69f;return this[_0x51bb27(0x864)]&&this[_0x51bb27(0x864)][_0x51bb27(0x815)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x44a50d=_0x30b69f;return this['_scene']&&this[_0x44a50d(0x864)][_0x44a50d(0x815)]===Scene_Map;},SceneManager[_0x30b69f(0x6df)]=function(){const _0x3359b7=_0x30b69f;return this[_0x3359b7(0x864)]&&this[_0x3359b7(0x864)]instanceof Scene_Map;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4f9)]=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x4a01a6=_0x30b69f;VisuMZ[_0x4a01a6(0x5d8)]['SceneManager_initialize'][_0x4a01a6(0x305)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x669)]=SceneManager[_0x30b69f(0x661)],SceneManager[_0x30b69f(0x661)]=function(_0x3d845b){const _0x39cadf=_0x30b69f;if($gameTemp)this[_0x39cadf(0x470)](_0x3d845b);VisuMZ['CoreEngine'][_0x39cadf(0x669)][_0x39cadf(0x305)](this,_0x3d845b);},SceneManager[_0x30b69f(0x470)]=function(_0x133c67){const _0x10a236=_0x30b69f;if(!_0x133c67['ctrlKey']&&!_0x133c67[_0x10a236(0x649)])switch(_0x133c67[_0x10a236(0x4a0)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x10a236(0x550)]();break;case 0x76:if(Input['isPressed'](_0x10a236(0x1c6))||Input['isPressed'](_0x10a236(0x728)))return;this['playTestF7']();break;}},SceneManager['playTestF6']=function(){const _0x3abe41=_0x30b69f;if($gameTemp[_0x3abe41(0x2d6)]()&&VisuMZ[_0x3abe41(0x5d8)][_0x3abe41(0x200)][_0x3abe41(0x702)]['F6key']){ConfigManager[_0x3abe41(0x6a6)]!==0x0?(ConfigManager[_0x3abe41(0x2b6)]=0x0,ConfigManager[_0x3abe41(0x800)]=0x0,ConfigManager[_0x3abe41(0x4e9)]=0x0,ConfigManager[_0x3abe41(0x6a6)]=0x0):(ConfigManager[_0x3abe41(0x2b6)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x3abe41(0x4e9)]=0x64,ConfigManager[_0x3abe41(0x6a6)]=0x64);ConfigManager[_0x3abe41(0x5d6)]();if(this['_scene'][_0x3abe41(0x815)]===Scene_Options){if(this[_0x3abe41(0x864)]['_optionsWindow'])this[_0x3abe41(0x864)][_0x3abe41(0x312)][_0x3abe41(0x4af)]();if(this[_0x3abe41(0x864)]['_listWindow'])this['_scene'][_0x3abe41(0x365)][_0x3abe41(0x4af)]();}}},SceneManager[_0x30b69f(0x544)]=function(){const _0xb3dbc=_0x30b69f;$gameTemp['isPlaytest']()&&VisuMZ[_0xb3dbc(0x5d8)]['Settings']['QoL'][_0xb3dbc(0x806)]&&($gameTemp[_0xb3dbc(0x321)]=!$gameTemp[_0xb3dbc(0x321)]);},SceneManager[_0x30b69f(0x3b8)]=function(){const _0xfe56ec=_0x30b69f;if(!$gameTemp[_0xfe56ec(0x2d6)]())return;if(!SceneManager[_0xfe56ec(0x606)]())return;for(const _0x495772 of $gameParty[_0xfe56ec(0x5f7)]()){if(!_0x495772)continue;_0x495772[_0xfe56ec(0x74a)](_0x495772['maxTp']());}},SceneManager[_0x30b69f(0x2c7)]=function(){const _0x35a9ae=_0x30b69f;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0x35a9ae(0x5d8)][_0x35a9ae(0x200)]['UI'][_0x35a9ae(0x842)];},SceneManager[_0x30b69f(0x502)]=function(_0x36fc93){const _0x382bb8=_0x30b69f;VisuMZ['CoreEngine'][_0x382bb8(0x200)]['UI'][_0x382bb8(0x235)]&&(this[_0x382bb8(0x599)]=_0x36fc93);},SceneManager['isSideButtonLayout']=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){const _0x2263b2=_0x30b69f;return this[_0x2263b2(0x262)];},SceneManager[_0x30b69f(0x778)]=function(){const _0x1e2392=_0x30b69f;return this[_0x1e2392(0x458)]()||this[_0x1e2392(0x866)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x59e)]=SceneManager[_0x30b69f(0x4d7)],SceneManager[_0x30b69f(0x4d7)]=function(){const _0x2843ff=_0x30b69f;return VisuMZ[_0x2843ff(0x5d8)][_0x2843ff(0x200)]['QoL'][_0x2843ff(0x844)]?VisuMZ[_0x2843ff(0x5d8)][_0x2843ff(0x59e)][_0x2843ff(0x305)](this):!![];},SceneManager[_0x30b69f(0x243)]=function(_0x154f17){const _0x24cf89=_0x30b69f;if(_0x154f17 instanceof Error)this['catchNormalError'](_0x154f17);else _0x154f17 instanceof Array&&_0x154f17[0x0]==='LoadError'?this[_0x24cf89(0x4e2)](_0x154f17):this[_0x24cf89(0x266)](_0x154f17);this['stop']();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x3b2)]=BattleManager['processEscape'],BattleManager[_0x30b69f(0x425)]=function(){const _0x4e7062=_0x30b69f;if(VisuMZ[_0x4e7062(0x5d8)][_0x4e7062(0x200)][_0x4e7062(0x702)][_0x4e7062(0x471)])this[_0x4e7062(0x525)]();else return VisuMZ[_0x4e7062(0x5d8)][_0x4e7062(0x3b2)]['call'](this);},BattleManager[_0x30b69f(0x525)]=function(){const _0x2bed33=_0x30b69f;return $gameParty[_0x2bed33(0x6f4)](),SoundManager[_0x2bed33(0x2ef)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x30b69f(0x7d1)]=function(){const _0x55cf7d=_0x30b69f;return $gameSystem[_0x55cf7d(0x3a2)]()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x1bbd5e=_0x30b69f;return $gameSystem[_0x1bbd5e(0x3a2)]()===0x1;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7ab)]=Game_Temp[_0x30b69f(0x5fe)]['initialize'],Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x4ff539=_0x30b69f;VisuMZ[_0x4ff539(0x5d8)][_0x4ff539(0x7ab)][_0x4ff539(0x305)](this),this[_0x4ff539(0x7d9)](),this[_0x4ff539(0x28a)](),this[_0x4ff539(0x323)]();},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x7d9)]=function(){const _0x1a54ac=_0x30b69f;VisuMZ[_0x1a54ac(0x5d8)][_0x1a54ac(0x200)][_0x1a54ac(0x702)][_0x1a54ac(0x647)]&&(this['_isPlaytest']=![]);},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x38b)]=function(_0x1bf57c){this['_lastPluginCommandInterpreter']=_0x1bf57c;},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x73a)]=function(){const _0x4a8054=_0x30b69f;return this[_0x4a8054(0x66e)];},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x2c6)]=function(){const _0x5885ad=_0x30b69f;this['_forcedTroopView']=undefined,this[_0x5885ad(0x51f)]=undefined;},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x3fb)]=function(_0x3b747f){const _0x5ff35d=_0x30b69f;$gameMap&&$dataMap&&$dataMap[_0x5ff35d(0x719)]&&this[_0x5ff35d(0x220)]($dataMap[_0x5ff35d(0x719)]);const _0xf080b2=$dataTroops[_0x3b747f];if(_0xf080b2){let _0x25424b=DataManager['createTroopNote'](_0xf080b2['id']);this[_0x5ff35d(0x220)](_0x25424b);}},Game_Temp['prototype']['parseForcedGameTroopSettingsCoreEngine']=function(_0x5dddbd){const _0x2ac8b6=_0x30b69f;if(!_0x5dddbd)return;if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this[_0x2ac8b6(0x5ec)]='FV';else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x2ac8b6(0x5ec)]='SV';else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x589de=String(RegExp['$1']);if(_0x589de[_0x2ac8b6(0x487)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x589de['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x2ac8b6(0x5ec)]='SV');}}}if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:DTB)>/i))this[_0x2ac8b6(0x51f)]=0x0;else{if(_0x5dddbd['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x2ac8b6(0x51f)]=0x1;else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x2ac8b6(0x51f)]=0x2;else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x3e9));else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:STB)>/i))Imported[_0x2ac8b6(0x6d4)]&&(this[_0x2ac8b6(0x51f)]='STB');else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:BTB)>/i))Imported[_0x2ac8b6(0x4f2)]&&(this[_0x2ac8b6(0x51f)]='BTB');else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:FTB)>/i))Imported[_0x2ac8b6(0x43f)]&&(this[_0x2ac8b6(0x51f)]='FTB');else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:OTB)>/i))Imported[_0x2ac8b6(0x723)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x1c2));else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:ETB)>/i))Imported[_0x2ac8b6(0x1ff)]&&(this[_0x2ac8b6(0x51f)]='ETB');else{if(_0x5dddbd['match'](/<(?:PTB)>/i))Imported[_0x2ac8b6(0x389)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x1fa));else{if(_0x5dddbd[_0x2ac8b6(0x487)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x341137=String(RegExp['$1']);if(_0x341137[_0x2ac8b6(0x487)](/DTB/i))this[_0x2ac8b6(0x51f)]=0x0;else{if(_0x341137[_0x2ac8b6(0x487)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x2ac8b6(0x51f)]=0x1;else{if(_0x341137[_0x2ac8b6(0x487)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x2ac8b6(0x51f)]=0x2;else{if(_0x341137['match'](/CTB/i))Imported[_0x2ac8b6(0x55e)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x3e9));else{if(_0x341137[_0x2ac8b6(0x487)](/STB/i))Imported[_0x2ac8b6(0x6d4)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x37c));else{if(_0x341137[_0x2ac8b6(0x487)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this['_forcedBattleSys']=_0x2ac8b6(0x4e1));else{if(_0x341137[_0x2ac8b6(0x487)](/FTB/i))Imported[_0x2ac8b6(0x43f)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x538));else{if(_0x341137['match'](/OTB/i))Imported[_0x2ac8b6(0x723)]&&(this[_0x2ac8b6(0x51f)]='OTB');else{if(_0x341137[_0x2ac8b6(0x487)](/ETB/i))Imported[_0x2ac8b6(0x1ff)]&&(this[_0x2ac8b6(0x51f)]='ETB');else _0x341137[_0x2ac8b6(0x487)](/PTB/i)&&(Imported[_0x2ac8b6(0x389)]&&(this[_0x2ac8b6(0x51f)]=_0x2ac8b6(0x1fa)));}}}}}}}}}}}}}}}}}}}},Game_Temp['prototype'][_0x30b69f(0x28a)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x99d907,_0x113997,_0x14c91a,_0xf4e1a){const _0x139049=_0x30b69f;if(!this[_0x139049(0x394)]())return;_0x14c91a=_0x14c91a||![],_0xf4e1a=_0xf4e1a||![];if($dataAnimations[_0x113997]){const _0x26cbba={'targets':_0x99d907,'animationId':_0x113997,'mirror':_0x14c91a,'mute':_0xf4e1a};this['_fauxAnimationQueue'][_0x139049(0x327)](_0x26cbba);for(const _0x34a637 of _0x99d907){_0x34a637[_0x139049(0x4d9)]&&_0x34a637[_0x139049(0x4d9)]();}}},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x394)]=function(){return!![];},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x737)]=function(){return this['_fauxAnimationQueue']['shift']();},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x323)]=function(){const _0x29d1b4=_0x30b69f;this[_0x29d1b4(0x624)]=[];},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x4f5)]=function(_0x4e1bea,_0x2603e4,_0x3c7642,_0x40c41f,_0x282df7){const _0x453212=_0x30b69f;if(!this[_0x453212(0x5d9)]())return;_0x40c41f=_0x40c41f||![],_0x282df7=_0x282df7||![];if($dataAnimations[_0x3c7642]){const _0x268911={'x':_0x4e1bea,'y':_0x2603e4,'animationId':_0x3c7642,'mirror':_0x40c41f,'mute':_0x282df7};this['_pointAnimationQueue'][_0x453212(0x327)](_0x268911);}},Game_Temp[_0x30b69f(0x5fe)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x51c)]=function(){const _0x2cc531=_0x30b69f;return this[_0x2cc531(0x624)]['shift']();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x214)]=Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x361ea9=_0x30b69f;VisuMZ['CoreEngine'][_0x361ea9(0x214)][_0x361ea9(0x305)](this),this[_0x361ea9(0x7f7)]();},Game_System['prototype'][_0x30b69f(0x7f7)]=function(){const _0x27ef7f=_0x30b69f;this[_0x27ef7f(0x791)]={'SideView':$dataSystem[_0x27ef7f(0x6e7)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced'][_0x27ef7f(0x619)],'Padding':0xc};},Game_System['prototype'][_0x30b69f(0x5b5)]=function(){const _0x143539=_0x30b69f;if($gameTemp[_0x143539(0x5ec)]==='SV')return!![];else{if($gameTemp[_0x143539(0x5ec)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x143539(0x7f7)]();if(this[_0x143539(0x791)][_0x143539(0x6ba)]===undefined)this[_0x143539(0x7f7)]();return this['_CoreEngineSettings'][_0x143539(0x6ba)];},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x3d3)]=function(_0x5ebb65){const _0x3034c3=_0x30b69f;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x3034c3(0x791)][_0x3034c3(0x6ba)]===undefined)this[_0x3034c3(0x7f7)]();this[_0x3034c3(0x791)][_0x3034c3(0x6ba)]=_0x5ebb65;},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x506)]=function(){const _0x9d0cb0=_0x30b69f;if(this[_0x9d0cb0(0x791)]===undefined)this[_0x9d0cb0(0x7f7)]();this[_0x9d0cb0(0x791)][_0x9d0cb0(0x7cf)]=this[_0x9d0cb0(0x689)]();},Game_System['prototype']['initialBattleSystem']=function(){const _0x4a54ca=_0x30b69f,_0x331105=(VisuMZ[_0x4a54ca(0x5d8)][_0x4a54ca(0x200)][_0x4a54ca(0x7cf)]||'DATABASE')[_0x4a54ca(0x62b)]()[_0x4a54ca(0x2d3)]();return VisuMZ[_0x4a54ca(0x5d8)]['CreateBattleSystemID'](_0x331105);},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x3a2)]=function(){const _0x55a62d=_0x30b69f;if($gameTemp[_0x55a62d(0x51f)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this['_CoreEngineSettings']===undefined)this[_0x55a62d(0x7f7)]();if(this[_0x55a62d(0x791)][_0x55a62d(0x7cf)]===undefined)this[_0x55a62d(0x506)]();return this[_0x55a62d(0x791)][_0x55a62d(0x7cf)];},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x590)]=function(_0x29d32a){const _0x365986=_0x30b69f;if(this[_0x365986(0x791)]===undefined)this[_0x365986(0x7f7)]();if(this[_0x365986(0x791)][_0x365986(0x7cf)]===undefined)this[_0x365986(0x506)]();this[_0x365986(0x791)]['BattleSystem']=_0x29d32a;},Game_System[_0x30b69f(0x5fe)]['mainFontSize']=function(){const _0x37f28d=_0x30b69f;if(this[_0x37f28d(0x791)]===undefined)this[_0x37f28d(0x7f7)]();if(this[_0x37f28d(0x791)]['FontSize']===undefined)this[_0x37f28d(0x7f7)]();return this[_0x37f28d(0x791)][_0x37f28d(0x630)];},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x5af)]=function(_0x18feb3){const _0x46f659=_0x30b69f;if(this[_0x46f659(0x791)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this[_0x46f659(0x7f7)]();this['_CoreEngineSettings']['FontSize']=_0x18feb3;},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x690)]=function(){const _0x433fd6=_0x30b69f;if(this[_0x433fd6(0x791)]===undefined)this[_0x433fd6(0x7f7)]();if(this[_0x433fd6(0x791)][_0x433fd6(0x2aa)]===undefined)this[_0x433fd6(0x7f7)]();return this[_0x433fd6(0x791)][_0x433fd6(0x2aa)];},Game_System[_0x30b69f(0x5fe)][_0x30b69f(0x497)]=function(_0xbae42a){const _0x1eccb9=_0x30b69f;if(this[_0x1eccb9(0x791)]===undefined)this[_0x1eccb9(0x7f7)]();if(this['_CoreEngineSettings'][_0x1eccb9(0x677)]===undefined)this[_0x1eccb9(0x7f7)]();this[_0x1eccb9(0x791)]['Padding']=_0xbae42a;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x693)]=Game_Screen['prototype'][_0x30b69f(0x6f5)],Game_Screen[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x27d9c3=_0x30b69f;VisuMZ[_0x27d9c3(0x5d8)][_0x27d9c3(0x693)]['call'](this),this[_0x27d9c3(0x499)]();},Game_Screen[_0x30b69f(0x5fe)][_0x30b69f(0x499)]=function(){const _0x494ec7=_0x30b69f,_0x15d48a=VisuMZ[_0x494ec7(0x5d8)][_0x494ec7(0x200)]['ScreenShake'];this[_0x494ec7(0x583)]=_0x15d48a?.['DefaultStyle']||_0x494ec7(0x7fe);},Game_Screen[_0x30b69f(0x5fe)]['getCoreEngineScreenShakeStyle']=function(){const _0xcfcf6e=_0x30b69f;if(this[_0xcfcf6e(0x583)]===undefined)this[_0xcfcf6e(0x499)]();return this[_0xcfcf6e(0x583)];},Game_Screen['prototype'][_0x30b69f(0x451)]=function(_0x33fac9){const _0x24fa27=_0x30b69f;if(this[_0x24fa27(0x583)]===undefined)this[_0x24fa27(0x499)]();this['_coreEngineShakeStyle']=_0x33fac9[_0x24fa27(0x5a1)]()[_0x24fa27(0x2d3)]();},Game_Picture['prototype'][_0x30b69f(0x237)]=function(){const _0x6158e2=_0x30b69f;if($gameParty['inBattle']())return![];return this[_0x6158e2(0x656)]()&&this[_0x6158e2(0x656)]()['charAt'](0x0)==='!';},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x421)]=Game_Picture[_0x30b69f(0x5fe)]['x'],Game_Picture[_0x30b69f(0x5fe)]['x']=function(){const _0x39413a=_0x30b69f;return this[_0x39413a(0x237)]()?this[_0x39413a(0x2e3)]():VisuMZ['CoreEngine'][_0x39413a(0x421)][_0x39413a(0x305)](this);},Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x2e3)]=function(){const _0x2a4004=_0x30b69f,_0x51e103=$gameMap[_0x2a4004(0x509)]()*$gameMap[_0x2a4004(0x225)]();return this['_x']-_0x51e103;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x441)]=Game_Picture['prototype']['y'],Game_Picture['prototype']['y']=function(){const _0x41f6ed=_0x30b69f;return this[_0x41f6ed(0x237)]()?this['yScrollLinkedOffset']():VisuMZ[_0x41f6ed(0x5d8)]['Game_Picture_y']['call'](this);},Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x53f)]=function(){const _0x190536=_0x30b69f,_0x17d637=$gameMap[_0x190536(0x6dd)]()*$gameMap[_0x190536(0x64c)]();return this['_y']-_0x17d637;},Game_Picture['prototype'][_0x30b69f(0x44a)]=function(_0x3cd002){const _0x4103ab=_0x30b69f;this[_0x4103ab(0x3af)]=_0x3cd002;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4bb)]=Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x2ec)],Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x2ec)]=function(_0x531ad8){const _0x9d139f=_0x30b69f;return this[_0x9d139f(0x3af)]=this[_0x9d139f(0x3af)]||0x0,[0x0,0x1,0x2,0x3][_0x9d139f(0x6b2)](this[_0x9d139f(0x3af)])?VisuMZ[_0x9d139f(0x5d8)][_0x9d139f(0x4bb)][_0x9d139f(0x305)](this,_0x531ad8):VisuMZ[_0x9d139f(0x76f)](_0x531ad8,this[_0x9d139f(0x3af)]);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x84a)]=Game_Action['prototype']['itemHit'],Game_Action[_0x30b69f(0x5fe)]['itemHit']=function(_0x3eed4b){const _0x3bd206=_0x30b69f;return VisuMZ[_0x3bd206(0x5d8)][_0x3bd206(0x200)][_0x3bd206(0x702)]['ImprovedAccuracySystem']?this[_0x3bd206(0x4bc)](_0x3eed4b):VisuMZ[_0x3bd206(0x5d8)][_0x3bd206(0x84a)]['call'](this,_0x3eed4b);},Game_Action['prototype'][_0x30b69f(0x4bc)]=function(_0xbae192){const _0x326457=_0x30b69f,_0x431453=this['itemSuccessRate'](_0xbae192),_0x121d16=this['subjectHitRate'](_0xbae192),_0xca24ed=this[_0x326457(0x1ea)](_0xbae192);return _0x431453*(_0x121d16-_0xca24ed);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x247)]=Game_Action[_0x30b69f(0x5fe)]['itemEva'],Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x6d5)]=function(_0x492a8e){const _0x2cafd0=_0x30b69f;return VisuMZ['CoreEngine']['Settings'][_0x2cafd0(0x702)][_0x2cafd0(0x7ba)]?0x0:VisuMZ['CoreEngine'][_0x2cafd0(0x247)]['call'](this,_0x492a8e);},Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x58f)]=function(_0x469400){const _0x1d78ee=_0x30b69f;return this[_0x1d78ee(0x7f5)]()[_0x1d78ee(0x34e)]*0.01;},Game_Action[_0x30b69f(0x5fe)]['subjectHitRate']=function(_0x27d242){const _0x50014e=_0x30b69f;if(VisuMZ[_0x50014e(0x5d8)][_0x50014e(0x200)][_0x50014e(0x702)][_0x50014e(0x847)]&&this[_0x50014e(0x6a9)]())return 0x1;return this['isPhysical']()?VisuMZ[_0x50014e(0x5d8)][_0x50014e(0x200)][_0x50014e(0x702)][_0x50014e(0x847)]&&this[_0x50014e(0x705)]()[_0x50014e(0x622)]()?this[_0x50014e(0x705)]()[_0x50014e(0x720)]+0.05:this[_0x50014e(0x705)]()['hit']:0x1;},Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x1ea)]=function(_0x189554){const _0x218999=_0x30b69f;if(this[_0x218999(0x705)]()[_0x218999(0x622)]()===_0x189554[_0x218999(0x622)]())return 0x0;if(this[_0x218999(0x28d)]())return VisuMZ['CoreEngine'][_0x218999(0x200)][_0x218999(0x702)]['AccuracyBoost']&&_0x189554[_0x218999(0x5bb)]()?_0x189554[_0x218999(0x7b8)]-0.05:_0x189554[_0x218999(0x7b8)];else return this[_0x218999(0x6d6)]()?_0x189554['mev']:0x0;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7c4)]=Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x3b5)],Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x3b5)]=function(_0x168c01){const _0x1817c1=_0x30b69f;VisuMZ[_0x1817c1(0x5d8)]['Game_Action_updateLastTarget'][_0x1817c1(0x305)](this,_0x168c01);if(VisuMZ[_0x1817c1(0x5d8)]['Settings'][_0x1817c1(0x702)]['ImprovedAccuracySystem'])return;const _0x4e84ac=_0x168c01['result']();_0x4e84ac[_0x1817c1(0x7b9)]&&(0x1-this[_0x1817c1(0x6d5)](_0x168c01)>this['itemHit'](_0x168c01)&&(_0x4e84ac[_0x1817c1(0x7b9)]=![],_0x4e84ac[_0x1817c1(0x725)]=!![]));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x5ed)]=Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x7d6)],Game_BattlerBase[_0x30b69f(0x5fe)]['initMembers']=function(){const _0x408ce3=_0x30b69f;this['_cache']={},VisuMZ['CoreEngine'][_0x408ce3(0x5ed)]['call'](this);},VisuMZ[_0x30b69f(0x5d8)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x4af)],Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x4af)]=function(){const _0x38b36a=_0x30b69f;this[_0x38b36a(0x804)]={},VisuMZ['CoreEngine'][_0x38b36a(0x49b)][_0x38b36a(0x305)](this);},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x265)]=function(_0x57cf77){const _0x39342f=_0x30b69f;return this['_cache']=this[_0x39342f(0x804)]||{},this[_0x39342f(0x804)][_0x57cf77]!==undefined;},Game_BattlerBase['prototype'][_0x30b69f(0x660)]=function(_0x119e3c){const _0x10e077=_0x30b69f,_0x5e31bc=(_0x2e450c,_0x5e305b)=>{const _0x13d9ae=_0x5d97;if(!_0x5e305b)return _0x2e450c;if(_0x5e305b['note'][_0x13d9ae(0x487)](VisuMZ[_0x13d9ae(0x5d8)][_0x13d9ae(0x49f)]['paramPlus'][_0x119e3c])){var _0x3a1cd5=Number(RegExp['$1']);_0x2e450c+=_0x3a1cd5;}if(_0x5e305b[_0x13d9ae(0x719)]['match'](VisuMZ[_0x13d9ae(0x5d8)][_0x13d9ae(0x49f)][_0x13d9ae(0x460)][_0x119e3c])){var _0x401502=String(RegExp['$1']);try{_0x2e450c+=eval(_0x401502);}catch(_0x1501f1){if($gameTemp['isPlaytest']())console[_0x13d9ae(0x216)](_0x1501f1);}}return _0x2e450c;};return this[_0x10e077(0x5f3)]()['reduce'](_0x5e31bc,this[_0x10e077(0x7c0)][_0x119e3c]);},Game_BattlerBase[_0x30b69f(0x5fe)]['paramMax']=function(_0x2b02a9){const _0x6eef45=_0x30b69f;var _0x352d77=_0x6eef45(0x311)+(this[_0x6eef45(0x622)]()?_0x6eef45(0x354):_0x6eef45(0x2ce))+_0x6eef45(0x758)+_0x2b02a9;if(this[_0x6eef45(0x265)](_0x352d77))return this[_0x6eef45(0x804)][_0x352d77];this[_0x6eef45(0x804)][_0x352d77]=eval(VisuMZ[_0x6eef45(0x5d8)]['Settings'][_0x6eef45(0x420)][_0x352d77]);const _0x2136fb=(_0x53bf0c,_0x48e8b0)=>{const _0x10f2d1=_0x6eef45;if(!_0x48e8b0)return _0x53bf0c;if(_0x48e8b0[_0x10f2d1(0x719)][_0x10f2d1(0x487)](VisuMZ[_0x10f2d1(0x5d8)][_0x10f2d1(0x49f)][_0x10f2d1(0x5a8)][_0x2b02a9])){var _0xc3772c=Number(RegExp['$1']);if(_0xc3772c===0x0)_0xc3772c=Number[_0x10f2d1(0x863)];_0x53bf0c=Math[_0x10f2d1(0x7fd)](_0x53bf0c,_0xc3772c);}if(_0x48e8b0['note'][_0x10f2d1(0x487)](VisuMZ[_0x10f2d1(0x5d8)][_0x10f2d1(0x49f)][_0x10f2d1(0x5ef)][_0x2b02a9])){var _0x4ab1eb=String(RegExp['$1']);try{_0x53bf0c=Math[_0x10f2d1(0x7fd)](_0x53bf0c,Number(eval(_0x4ab1eb)));}catch(_0x1f6b85){if($gameTemp['isPlaytest']())console[_0x10f2d1(0x216)](_0x1f6b85);}}return _0x53bf0c;};if(this[_0x6eef45(0x804)][_0x352d77]===0x0)this[_0x6eef45(0x804)][_0x352d77]=Number[_0x6eef45(0x863)];return this[_0x6eef45(0x804)][_0x352d77]=this['traitObjects']()[_0x6eef45(0x1f7)](_0x2136fb,this[_0x6eef45(0x804)][_0x352d77]),this[_0x6eef45(0x804)][_0x352d77];},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x73c)]=function(_0x12e333){const _0x34d05c=_0x30b69f,_0x4f1901=this[_0x34d05c(0x755)](Game_BattlerBase[_0x34d05c(0x5da)],_0x12e333),_0x10daab=(_0x2c692f,_0x34bd1f)=>{const _0x1c5721=_0x34d05c;if(!_0x34bd1f)return _0x2c692f;if(_0x34bd1f['note']['match'](VisuMZ[_0x1c5721(0x5d8)][_0x1c5721(0x49f)][_0x1c5721(0x7f0)][_0x12e333])){var _0x3d91aa=Number(RegExp['$1'])/0x64;_0x2c692f*=_0x3d91aa;}if(_0x34bd1f[_0x1c5721(0x719)][_0x1c5721(0x487)](VisuMZ[_0x1c5721(0x5d8)]['RegExp']['paramRate2'][_0x12e333])){var _0x3d91aa=Number(RegExp['$1']);_0x2c692f*=_0x3d91aa;}if(_0x34bd1f['note'][_0x1c5721(0x487)](VisuMZ['CoreEngine'][_0x1c5721(0x49f)][_0x1c5721(0x3e2)][_0x12e333])){var _0x296c86=String(RegExp['$1']);try{_0x2c692f*=eval(_0x296c86);}catch(_0x330e93){if($gameTemp[_0x1c5721(0x2d6)]())console[_0x1c5721(0x216)](_0x330e93);}}return _0x2c692f;};return this[_0x34d05c(0x5f3)]()[_0x34d05c(0x1f7)](_0x10daab,_0x4f1901);},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x1eb)]=function(_0xce73a6){const _0x99157b=_0x30b69f,_0x3331b0=(_0x36c622,_0x1fbce3)=>{const _0x1e00e4=_0x5d97;if(!_0x1fbce3)return _0x36c622;if(_0x1fbce3[_0x1e00e4(0x719)][_0x1e00e4(0x487)](VisuMZ[_0x1e00e4(0x5d8)][_0x1e00e4(0x49f)]['paramFlat'][_0xce73a6])){var _0x3e3949=Number(RegExp['$1']);_0x36c622+=_0x3e3949;}if(_0x1fbce3[_0x1e00e4(0x719)][_0x1e00e4(0x487)](VisuMZ[_0x1e00e4(0x5d8)][_0x1e00e4(0x49f)][_0x1e00e4(0x379)][_0xce73a6])){var _0x5ec922=String(RegExp['$1']);try{_0x36c622+=eval(_0x5ec922);}catch(_0x4bb202){if($gameTemp['isPlaytest']())console[_0x1e00e4(0x216)](_0x4bb202);}}return _0x36c622;};return this[_0x99157b(0x5f3)]()[_0x99157b(0x1f7)](_0x3331b0,0x0);},Game_BattlerBase['prototype'][_0x30b69f(0x1cc)]=function(_0x19a572){const _0x13c2da=_0x30b69f;let _0x3ef976=_0x13c2da(0x1cc)+_0x19a572+'Total';if(this[_0x13c2da(0x265)](_0x3ef976))return this[_0x13c2da(0x804)][_0x3ef976];return this[_0x13c2da(0x804)][_0x3ef976]=Math['round'](VisuMZ[_0x13c2da(0x5d8)][_0x13c2da(0x200)][_0x13c2da(0x420)][_0x13c2da(0x3dc)][_0x13c2da(0x305)](this,_0x19a572)),this['_cache'][_0x3ef976];},Game_BattlerBase[_0x30b69f(0x5fe)]['xparamPlus']=function(_0x150920){const _0x255fe8=_0x30b69f,_0x31107b=(_0x39c59a,_0x4c1f29)=>{const _0x2c1725=_0x5d97;if(!_0x4c1f29)return _0x39c59a;if(_0x4c1f29[_0x2c1725(0x719)][_0x2c1725(0x487)](VisuMZ['CoreEngine'][_0x2c1725(0x49f)][_0x2c1725(0x80d)][_0x150920])){var _0x204919=Number(RegExp['$1'])/0x64;_0x39c59a+=_0x204919;}if(_0x4c1f29[_0x2c1725(0x719)]['match'](VisuMZ[_0x2c1725(0x5d8)][_0x2c1725(0x49f)]['xparamPlus2'][_0x150920])){var _0x204919=Number(RegExp['$1']);_0x39c59a+=_0x204919;}if(_0x4c1f29[_0x2c1725(0x719)][_0x2c1725(0x487)](VisuMZ[_0x2c1725(0x5d8)][_0x2c1725(0x49f)][_0x2c1725(0x75d)][_0x150920])){var _0x4398e0=String(RegExp['$1']);try{_0x39c59a+=eval(_0x4398e0);}catch(_0x1a86e2){if($gameTemp[_0x2c1725(0x2d6)]())console['log'](_0x1a86e2);}}return _0x39c59a;};return this[_0x255fe8(0x5f3)]()[_0x255fe8(0x1f7)](_0x31107b,0x0);},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x33a)]=function(_0x53ae37){const _0x563363=_0x30b69f,_0x251008=(_0x312e6f,_0x4f8661)=>{const _0x4a5fa7=_0x5d97;if(!_0x4f8661)return _0x312e6f;if(_0x4f8661['note'][_0x4a5fa7(0x487)](VisuMZ[_0x4a5fa7(0x5d8)]['RegExp'][_0x4a5fa7(0x808)][_0x53ae37])){var _0xcdd0f7=Number(RegExp['$1'])/0x64;_0x312e6f*=_0xcdd0f7;}if(_0x4f8661[_0x4a5fa7(0x719)][_0x4a5fa7(0x487)](VisuMZ['CoreEngine'][_0x4a5fa7(0x49f)]['xparamRate2'][_0x53ae37])){var _0xcdd0f7=Number(RegExp['$1']);_0x312e6f*=_0xcdd0f7;}if(_0x4f8661['note']['match'](VisuMZ[_0x4a5fa7(0x5d8)][_0x4a5fa7(0x49f)]['xparamRateJS'][_0x53ae37])){var _0x40a714=String(RegExp['$1']);try{_0x312e6f*=eval(_0x40a714);}catch(_0x193aee){if($gameTemp[_0x4a5fa7(0x2d6)]())console[_0x4a5fa7(0x216)](_0x193aee);}}return _0x312e6f;};return this[_0x563363(0x5f3)]()[_0x563363(0x1f7)](_0x251008,0x1);},Game_BattlerBase[_0x30b69f(0x5fe)]['xparamFlatBonus']=function(_0x2ec03e){const _0x22fec2=_0x30b69f,_0x191c28=(_0x13eba7,_0x14e739)=>{const _0x7e6cc1=_0x5d97;if(!_0x14e739)return _0x13eba7;if(_0x14e739[_0x7e6cc1(0x719)][_0x7e6cc1(0x487)](VisuMZ[_0x7e6cc1(0x5d8)]['RegExp'][_0x7e6cc1(0x7af)][_0x2ec03e])){var _0x5d9c14=Number(RegExp['$1'])/0x64;_0x13eba7+=_0x5d9c14;}if(_0x14e739[_0x7e6cc1(0x719)]['match'](VisuMZ[_0x7e6cc1(0x5d8)]['RegExp'][_0x7e6cc1(0x3c0)][_0x2ec03e])){var _0x5d9c14=Number(RegExp['$1']);_0x13eba7+=_0x5d9c14;}if(_0x14e739['note'][_0x7e6cc1(0x487)](VisuMZ['CoreEngine'][_0x7e6cc1(0x49f)][_0x7e6cc1(0x65d)][_0x2ec03e])){var _0x42fba6=String(RegExp['$1']);try{_0x13eba7+=eval(_0x42fba6);}catch(_0x52a0c3){if($gameTemp[_0x7e6cc1(0x2d6)]())console[_0x7e6cc1(0x216)](_0x52a0c3);}}return _0x13eba7;};return this[_0x22fec2(0x5f3)]()[_0x22fec2(0x1f7)](_0x191c28,0x0);},Game_BattlerBase[_0x30b69f(0x5fe)]['xparam']=function(_0x13d2ce){const _0x572c55=_0x30b69f;let _0xc76ca9=_0x572c55(0x3be)+_0x13d2ce+_0x572c55(0x308);if(this[_0x572c55(0x265)](_0xc76ca9))return this[_0x572c55(0x804)][_0xc76ca9];return this[_0x572c55(0x804)][_0xc76ca9]=VisuMZ[_0x572c55(0x5d8)][_0x572c55(0x200)][_0x572c55(0x420)][_0x572c55(0x601)][_0x572c55(0x305)](this,_0x13d2ce),this['_cache'][_0xc76ca9];},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x749)]=function(_0x4912a2){const _0x42bfb2=_0x30b69f,_0x478498=(_0x2d8ca2,_0x1f7c90)=>{const _0x562986=_0x5d97;if(!_0x1f7c90)return _0x2d8ca2;if(_0x1f7c90['note'][_0x562986(0x487)](VisuMZ[_0x562986(0x5d8)][_0x562986(0x49f)][_0x562986(0x287)][_0x4912a2])){var _0xd85d64=Number(RegExp['$1'])/0x64;_0x2d8ca2+=_0xd85d64;}if(_0x1f7c90[_0x562986(0x719)][_0x562986(0x487)](VisuMZ[_0x562986(0x5d8)][_0x562986(0x49f)][_0x562986(0x4e6)][_0x4912a2])){var _0xd85d64=Number(RegExp['$1']);_0x2d8ca2+=_0xd85d64;}if(_0x1f7c90[_0x562986(0x719)]['match'](VisuMZ[_0x562986(0x5d8)]['RegExp'][_0x562986(0x7fb)][_0x4912a2])){var _0x571ae2=String(RegExp['$1']);try{_0x2d8ca2+=eval(_0x571ae2);}catch(_0x190783){if($gameTemp[_0x562986(0x2d6)]())console['log'](_0x190783);}}return _0x2d8ca2;};return this[_0x42bfb2(0x5f3)]()[_0x42bfb2(0x1f7)](_0x478498,0x0);},Game_BattlerBase['prototype'][_0x30b69f(0x697)]=function(_0x3dc9dd){const _0x60ea41=_0x30b69f,_0x42de41=(_0x26a7c2,_0x465f8a)=>{const _0x2b2f4b=_0x5d97;if(!_0x465f8a)return _0x26a7c2;if(_0x465f8a[_0x2b2f4b(0x719)]['match'](VisuMZ[_0x2b2f4b(0x5d8)][_0x2b2f4b(0x49f)]['sparamRate1'][_0x3dc9dd])){var _0x38f4b1=Number(RegExp['$1'])/0x64;_0x26a7c2*=_0x38f4b1;}if(_0x465f8a['note'][_0x2b2f4b(0x487)](VisuMZ[_0x2b2f4b(0x5d8)]['RegExp']['sparamRate2'][_0x3dc9dd])){var _0x38f4b1=Number(RegExp['$1']);_0x26a7c2*=_0x38f4b1;}if(_0x465f8a['note'][_0x2b2f4b(0x487)](VisuMZ[_0x2b2f4b(0x5d8)][_0x2b2f4b(0x49f)]['sparamRateJS'][_0x3dc9dd])){var _0x24b510=String(RegExp['$1']);try{_0x26a7c2*=eval(_0x24b510);}catch(_0x7468e){if($gameTemp['isPlaytest']())console['log'](_0x7468e);}}return _0x26a7c2;};return this[_0x60ea41(0x5f3)]()['reduce'](_0x42de41,0x1);},Game_BattlerBase['prototype'][_0x30b69f(0x786)]=function(_0x643003){const _0x3b15b2=_0x30b69f,_0x25f0f8=(_0x1be3a2,_0x4d9b14)=>{const _0x3b1e3e=_0x5d97;if(!_0x4d9b14)return _0x1be3a2;if(_0x4d9b14[_0x3b1e3e(0x719)]['match'](VisuMZ['CoreEngine']['RegExp']['sparamFlat1'][_0x643003])){var _0xfc099f=Number(RegExp['$1'])/0x64;_0x1be3a2+=_0xfc099f;}if(_0x4d9b14[_0x3b1e3e(0x719)]['match'](VisuMZ['CoreEngine'][_0x3b1e3e(0x49f)]['sparamFlat2'][_0x643003])){var _0xfc099f=Number(RegExp['$1']);_0x1be3a2+=_0xfc099f;}if(_0x4d9b14['note']['match'](VisuMZ[_0x3b1e3e(0x5d8)][_0x3b1e3e(0x49f)][_0x3b1e3e(0x31e)][_0x643003])){var _0x5e4428=String(RegExp['$1']);try{_0x1be3a2+=eval(_0x5e4428);}catch(_0x440d16){if($gameTemp[_0x3b1e3e(0x2d6)]())console[_0x3b1e3e(0x216)](_0x440d16);}}return _0x1be3a2;};return this[_0x3b15b2(0x5f3)]()[_0x3b15b2(0x1f7)](_0x25f0f8,0x0);},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x364)]=function(_0x51ebaf){const _0x239df7=_0x30b69f;let _0x28ae57=_0x239df7(0x364)+_0x51ebaf+_0x239df7(0x308);if(this[_0x239df7(0x265)](_0x28ae57))return this['_cache'][_0x28ae57];return this[_0x239df7(0x804)][_0x28ae57]=VisuMZ['CoreEngine'][_0x239df7(0x200)]['Param']['SParameterFormula']['call'](this,_0x51ebaf),this['_cache'][_0x28ae57];},Game_BattlerBase[_0x30b69f(0x5fe)][_0x30b69f(0x210)]=function(_0x2abb15,_0xe4af32){const _0x11b1f2=_0x30b69f;if(typeof paramId==='number')return this[_0x11b1f2(0x1cc)](_0x2abb15);_0x2abb15=String(_0x2abb15||'')[_0x11b1f2(0x62b)]();if(_0x2abb15==='MAXHP')return this[_0x11b1f2(0x1cc)](0x0);if(_0x2abb15===_0x11b1f2(0x33f))return this[_0x11b1f2(0x1cc)](0x1);if(_0x2abb15===_0x11b1f2(0x401))return this[_0x11b1f2(0x1cc)](0x2);if(_0x2abb15===_0x11b1f2(0x6aa))return this[_0x11b1f2(0x1cc)](0x3);if(_0x2abb15==='MAT')return this['param'](0x4);if(_0x2abb15===_0x11b1f2(0x7a1))return this[_0x11b1f2(0x1cc)](0x5);if(_0x2abb15===_0x11b1f2(0x408))return this[_0x11b1f2(0x1cc)](0x6);if(_0x2abb15==='LUK')return this[_0x11b1f2(0x1cc)](0x7);if(_0x2abb15===_0x11b1f2(0x325))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x2abb15===_0x11b1f2(0x6d9))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this[_0x11b1f2(0x3be)](0x1)*0x64))+'%':this[_0x11b1f2(0x3be)](0x1);if(_0x2abb15===_0x11b1f2(0x6e6))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x2abb15===_0x11b1f2(0x7b4))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this[_0x11b1f2(0x3be)](0x3)*0x64))+'%':this[_0x11b1f2(0x3be)](0x3);if(_0x2abb15==='MEV')return _0xe4af32?String(Math[_0x11b1f2(0x297)](this[_0x11b1f2(0x3be)](0x4)*0x64))+'%':this[_0x11b1f2(0x3be)](0x4);if(_0x2abb15===_0x11b1f2(0x3e5))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x5)*0x64))+'%':this[_0x11b1f2(0x3be)](0x5);if(_0x2abb15===_0x11b1f2(0x5e2))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x2abb15===_0x11b1f2(0x736))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x7)*0x64))+'%':this[_0x11b1f2(0x3be)](0x7);if(_0x2abb15===_0x11b1f2(0x6c0))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x3be)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x2abb15===_0x11b1f2(0x6c3))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this[_0x11b1f2(0x3be)](0x9)*0x64))+'%':this[_0x11b1f2(0x3be)](0x9);if(_0x2abb15==='TGR')return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x0)*0x64))+'%':this[_0x11b1f2(0x364)](0x0);if(_0x2abb15===_0x11b1f2(0x1f8))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x364)](0x1)*0x64))+'%':this[_0x11b1f2(0x364)](0x1);if(_0x2abb15===_0x11b1f2(0x6b4))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x2)*0x64))+'%':this[_0x11b1f2(0x364)](0x2);if(_0x2abb15===_0x11b1f2(0x452))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x3)*0x64))+'%':this[_0x11b1f2(0x364)](0x3);if(_0x2abb15===_0x11b1f2(0x39a))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x4)*0x64))+'%':this[_0x11b1f2(0x364)](0x4);if(_0x2abb15===_0x11b1f2(0x2ff))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x364)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x2abb15===_0x11b1f2(0x851))return _0xe4af32?String(Math['round'](this[_0x11b1f2(0x364)](0x6)*0x64))+'%':this[_0x11b1f2(0x364)](0x6);if(_0x2abb15===_0x11b1f2(0x417))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x7)*0x64))+'%':this[_0x11b1f2(0x364)](0x7);if(_0x2abb15===_0x11b1f2(0x47b))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this['sparam'](0x8)*0x64))+'%':this[_0x11b1f2(0x364)](0x8);if(_0x2abb15===_0x11b1f2(0x588))return _0xe4af32?String(Math[_0x11b1f2(0x297)](this[_0x11b1f2(0x364)](0x9)*0x64))+'%':this[_0x11b1f2(0x364)](0x9);if(VisuMZ[_0x11b1f2(0x5d8)][_0x11b1f2(0x57f)][_0x2abb15]){const _0x4b9103=VisuMZ[_0x11b1f2(0x5d8)][_0x11b1f2(0x57f)][_0x2abb15],_0x5006d7=this[_0x4b9103];return VisuMZ[_0x11b1f2(0x5d8)]['CustomParamType'][_0x2abb15]===_0x11b1f2(0x4cd)?_0x5006d7:_0xe4af32?String(Math[_0x11b1f2(0x297)](_0x5006d7*0x64))+'%':_0x5006d7;}return'';},Game_BattlerBase['prototype'][_0x30b69f(0x255)]=function(){const _0x15735c=_0x30b69f;return this[_0x15735c(0x500)]()&&this[_0x15735c(0x83d)]<this[_0x15735c(0x307)]*VisuMZ[_0x15735c(0x5d8)][_0x15735c(0x200)]['Param'][_0x15735c(0x226)];},Game_Battler[_0x30b69f(0x5fe)][_0x30b69f(0x7b2)]=function(){const _0x2a391d=_0x30b69f;SoundManager['playMiss'](),this[_0x2a391d(0x79d)]('evade');},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x675)]=Game_Actor['prototype'][_0x30b69f(0x74d)],Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x74d)]=function(_0x26d41a){const _0x1b5a17=_0x30b69f;if(this['level']>0x63)return this[_0x1b5a17(0x283)](_0x26d41a);return VisuMZ['CoreEngine'][_0x1b5a17(0x675)][_0x1b5a17(0x305)](this,_0x26d41a);},Game_Actor[_0x30b69f(0x5fe)]['paramBaseAboveLevel99']=function(_0x29ced9){const _0xb8064b=_0x30b69f,_0x36030d=this[_0xb8064b(0x6fa)]()[_0xb8064b(0x3de)][_0x29ced9][0x63],_0x7fcf29=this[_0xb8064b(0x6fa)]()[_0xb8064b(0x3de)][_0x29ced9][0x62];return _0x36030d+(_0x36030d-_0x7fcf29)*(this[_0xb8064b(0x722)]-0x63);},VisuMZ[_0x30b69f(0x5d8)]['Game_Actor_changeClass']=Game_Actor[_0x30b69f(0x5fe)]['changeClass'],Game_Actor['prototype'][_0x30b69f(0x6b5)]=function(_0x481d59,_0x1f66ef){const _0x1e8086=_0x30b69f;$gameTemp[_0x1e8086(0x4ae)]=!![],VisuMZ[_0x1e8086(0x5d8)]['Game_Actor_changeClass'][_0x1e8086(0x305)](this,_0x481d59,_0x1f66ef),$gameTemp[_0x1e8086(0x4ae)]=undefined;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x1e9)]=Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x528)],Game_Actor[_0x30b69f(0x5fe)]['levelUp']=function(){const _0x510eb1=_0x30b69f;VisuMZ[_0x510eb1(0x5d8)][_0x510eb1(0x1e9)][_0x510eb1(0x305)](this);if(!$gameTemp[_0x510eb1(0x4ae)])this[_0x510eb1(0x55b)]();},Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x55b)]=function(){const _0x154203=_0x30b69f;this['_cache']={};if(VisuMZ[_0x154203(0x5d8)][_0x154203(0x200)][_0x154203(0x702)]['LevelUpFullHp'])this[_0x154203(0x83d)]=this[_0x154203(0x307)];if(VisuMZ[_0x154203(0x5d8)]['Settings']['QoL'][_0x154203(0x444)])this[_0x154203(0x505)]=this['mmp'];},Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x58a)]=function(){const _0x6a924a=_0x30b69f;if(this[_0x6a924a(0x2de)]())return 0x1;const _0x157744=this['nextLevelExp']()-this['currentLevelExp'](),_0x55bbf6=this[_0x6a924a(0x3ae)]()-this['currentLevelExp']();return(_0x55bbf6/_0x157744)['clamp'](0x0,0x1);},Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x5f3)]=function(){const _0x6d1b05=_0x30b69f,_0x39aae3=Game_Battler[_0x6d1b05(0x5fe)][_0x6d1b05(0x5f3)]['call'](this);for(const _0x485672 of this[_0x6d1b05(0x4a2)]()){_0x485672&&_0x39aae3[_0x6d1b05(0x327)](_0x485672);}return _0x39aae3['push'](this['currentClass'](),this[_0x6d1b05(0x3bb)]()),_0x39aae3;},Object['defineProperty'](Game_Enemy[_0x30b69f(0x5fe)],'level',{'get':function(){const _0x477bdf=_0x30b69f;return this[_0x477bdf(0x5de)]();},'configurable':!![]}),Game_Enemy[_0x30b69f(0x5fe)][_0x30b69f(0x5de)]=function(){const _0x229d9a=_0x30b69f;return this['enemy']()[_0x229d9a(0x722)];},Game_Enemy[_0x30b69f(0x5fe)][_0x30b69f(0x453)]=function(){const _0x5f963e=_0x30b69f;!this[_0x5f963e(0x25c)]&&(this[_0x5f963e(0x316)]+=Math['round']((Graphics[_0x5f963e(0x820)]-0x270)/0x2),this[_0x5f963e(0x316)]-=Math['floor']((Graphics[_0x5f963e(0x820)]-Graphics[_0x5f963e(0x377)])/0x2),$gameSystem['isSideView']()?this['_screenX']-=Math[_0x5f963e(0x4ca)]((Graphics['width']-Graphics[_0x5f963e(0x582)])/0x2):this[_0x5f963e(0x4fa)]+=Math[_0x5f963e(0x297)]((Graphics[_0x5f963e(0x582)]-0x330)/0x2)),this[_0x5f963e(0x25c)]=!![];},Game_Party[_0x30b69f(0x5fe)][_0x30b69f(0x5eb)]=function(){const _0x859dca=_0x30b69f;return VisuMZ[_0x859dca(0x5d8)][_0x859dca(0x200)][_0x859dca(0x3b4)][_0x859dca(0x344)];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x46d)]=Game_Party['prototype'][_0x30b69f(0x5cb)],Game_Party['prototype'][_0x30b69f(0x5cb)]=function(_0x178831){const _0x51548a=_0x30b69f;if(VisuMZ[_0x51548a(0x5d8)]['Settings'][_0x51548a(0x702)]['KeyItemProtect']&&DataManager[_0x51548a(0x246)](_0x178831))return;VisuMZ[_0x51548a(0x5d8)][_0x51548a(0x46d)][_0x51548a(0x305)](this,_0x178831);},Game_Party['prototype'][_0x30b69f(0x56d)]=function(){const _0x1c915f=_0x30b69f,_0x5c81fd=VisuMZ[_0x1c915f(0x5d8)][_0x1c915f(0x200)]['QoL'],_0x34fb24=_0x5c81fd[_0x1c915f(0x479)]??0x63;let _0x5278a4=[];(_0x5c81fd[_0x1c915f(0x687)]??!![])&&(_0x5278a4=_0x5278a4[_0x1c915f(0x7f1)]($dataItems));(_0x5c81fd[_0x1c915f(0x6a8)]??!![])&&(_0x5278a4=_0x5278a4['concat']($dataWeapons));(_0x5c81fd[_0x1c915f(0x61a)]??!![])&&(_0x5278a4=_0x5278a4['concat']($dataArmors));for(const _0x6eca00 of _0x5278a4){if(!_0x6eca00)continue;if(_0x6eca00[_0x1c915f(0x656)][_0x1c915f(0x2d3)]()<=0x0)continue;if(_0x6eca00[_0x1c915f(0x656)][_0x1c915f(0x487)](/-----/i))continue;this[_0x1c915f(0x1bc)](_0x6eca00,_0x34fb24);}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x59d)]=Game_Troop[_0x30b69f(0x5fe)][_0x30b69f(0x835)],Game_Troop['prototype'][_0x30b69f(0x835)]=function(_0x5c5076){const _0x171c53=_0x30b69f;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x171c53(0x3fb)](_0x5c5076),VisuMZ[_0x171c53(0x5d8)][_0x171c53(0x59d)]['call'](this,_0x5c5076);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x81a)]=Game_Map[_0x30b69f(0x5fe)][_0x30b69f(0x835)],Game_Map[_0x30b69f(0x5fe)]['setup']=function(_0x53d79c){const _0x11a111=_0x30b69f;VisuMZ['CoreEngine']['Game_Map_setup'][_0x11a111(0x305)](this,_0x53d79c),this[_0x11a111(0x4dd)](_0x53d79c);},Game_Map[_0x30b69f(0x5fe)][_0x30b69f(0x4dd)]=function(){const _0x1d8621=_0x30b69f;this['_hideTileShadows']=VisuMZ[_0x1d8621(0x5d8)][_0x1d8621(0x200)][_0x1d8621(0x702)][_0x1d8621(0x490)]||![];if($dataMap&&$dataMap[_0x1d8621(0x719)]){if($dataMap[_0x1d8621(0x719)][_0x1d8621(0x487)](/<SHOW TILE SHADOWS>/i))this[_0x1d8621(0x62d)]=![];if($dataMap['note'][_0x1d8621(0x487)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map['prototype'][_0x30b69f(0x5b1)]=function(){const _0x34df16=_0x30b69f;if(this[_0x34df16(0x62d)]===undefined)this[_0x34df16(0x4dd)]();return this[_0x34df16(0x62d)];},VisuMZ['CoreEngine'][_0x30b69f(0x3d4)]=Game_Character[_0x30b69f(0x5fe)]['processMoveCommand'],Game_Character['prototype'][_0x30b69f(0x5a0)]=function(_0x3e8c11){const _0x5a0da2=_0x30b69f;try{VisuMZ[_0x5a0da2(0x5d8)]['Game_Character_processMoveCommand'][_0x5a0da2(0x305)](this,_0x3e8c11);}catch(_0x648985){if($gameTemp['isPlaytest']())console[_0x5a0da2(0x216)](_0x648985);}},Game_Player[_0x30b69f(0x5fe)][_0x30b69f(0x3e0)]=function(){const _0x3dc86b=_0x30b69f,_0x2bf9e7=$gameMap['encounterStep']();this[_0x3dc86b(0x6a1)]=Math[_0x3dc86b(0x378)](_0x2bf9e7)+Math[_0x3dc86b(0x378)](_0x2bf9e7)+this['encounterStepsMinimum']();},Game_Player['prototype'][_0x30b69f(0x35d)]=function(){const _0x5b60a3=_0x30b69f;return $dataMap&&$dataMap[_0x5b60a3(0x719)]&&$dataMap[_0x5b60a3(0x719)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x5b60a3(0x5d8)][_0x5b60a3(0x200)]['QoL'][_0x5b60a3(0x7e4)];},VisuMZ[_0x30b69f(0x5d8)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x30b69f(0x5fe)][_0x30b69f(0x773)],Game_Event['prototype'][_0x30b69f(0x773)]=function(_0x5e1233,_0x533c9a){const _0x3219b1=_0x30b69f;return this[_0x3219b1(0x72b)]()?this['checkSmartEventCollision'](_0x5e1233,_0x533c9a):VisuMZ[_0x3219b1(0x5d8)]['Game_Event_isCollidedWithEvents']['call'](this,_0x5e1233,_0x533c9a);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x439690=_0x30b69f;return VisuMZ[_0x439690(0x5d8)]['Settings']['QoL'][_0x439690(0x826)];},Game_Event['prototype'][_0x30b69f(0x390)]=function(_0x892853,_0x3e0280){const _0x1656b7=_0x30b69f;if(!this[_0x1656b7(0x5a7)]())return![];else{const _0x2fbb21=$gameMap[_0x1656b7(0x79e)](_0x892853,_0x3e0280)['filter'](_0x330e28=>_0x330e28[_0x1656b7(0x5a7)]());return _0x2fbb21[_0x1656b7(0x303)]>0x0;}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x846)]=Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x24a)],Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x24a)]=function(_0x38d762){const _0x1762b7=_0x30b69f,_0x2faea9=this[_0x1762b7(0x7b1)]();return _0x2faea9['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x2faea9):VisuMZ['CoreEngine']['Game_Interpreter_command105'][_0x1762b7(0x305)](this,_0x38d762);},Game_Interpreter[_0x30b69f(0x5fe)]['getCombinedScrollingText']=function(){const _0x11ea2a=_0x30b69f;let _0x1a7e61='',_0x3abc4c=this[_0x11ea2a(0x82f)]+0x1;while(this[_0x11ea2a(0x2e9)][_0x3abc4c]&&this['_list'][_0x3abc4c][_0x11ea2a(0x2df)]===0x195){_0x1a7e61+=this['_list'][_0x3abc4c][_0x11ea2a(0x45d)][0x0]+'\x0a',_0x3abc4c++;}return _0x1a7e61;},Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x1e0)]=function(_0x17cb6d){const _0x2af213=_0x30b69f;try{eval(_0x17cb6d);}catch(_0x171de6){$gameTemp[_0x2af213(0x2d6)]()&&(console['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x2af213(0x216)](_0x171de6));}return!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x634)]=Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x803)],Game_Interpreter['prototype']['command111']=function(_0x54ec11){const _0x34abce=_0x30b69f;try{VisuMZ[_0x34abce(0x5d8)]['Game_Interpreter_command111'][_0x34abce(0x305)](this,_0x54ec11);}catch(_0x164272){$gameTemp[_0x34abce(0x2d6)]()&&(console[_0x34abce(0x216)](_0x34abce(0x1c3)),console[_0x34abce(0x216)](_0x164272)),this[_0x34abce(0x5c8)]();}return!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x6c6)]=Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x412)],Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x412)]=function(_0x4b2e1a){const _0x90558a=_0x30b69f;try{VisuMZ[_0x90558a(0x5d8)][_0x90558a(0x6c6)][_0x90558a(0x305)](this,_0x4b2e1a);}catch(_0x1ad333){$gameTemp[_0x90558a(0x2d6)]()&&(console[_0x90558a(0x216)](_0x90558a(0x7ed)),console[_0x90558a(0x216)](_0x1ad333));}return!![];},VisuMZ['CoreEngine'][_0x30b69f(0x66a)]=Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x25b)],Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x25b)]=function(){const _0x3f7788=_0x30b69f;try{VisuMZ['CoreEngine']['Game_Interpreter_command355'][_0x3f7788(0x305)](this);}catch(_0x467b9f){$gameTemp[_0x3f7788(0x2d6)]()&&(console['log'](_0x3f7788(0x4b0)),console[_0x3f7788(0x216)](_0x467b9f));}return!![];},VisuMZ[_0x30b69f(0x5d8)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x30b69f(0x34a)],Game_Interpreter['prototype'][_0x30b69f(0x34a)]=function(_0x2a7f62){const _0x28b72b=_0x30b69f;return $gameTemp[_0x28b72b(0x38b)](this),VisuMZ[_0x28b72b(0x5d8)][_0x28b72b(0x23b)][_0x28b72b(0x305)](this,_0x2a7f62);},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x40a)]=function(){const _0x5752d0=_0x30b69f;return VisuMZ[_0x5752d0(0x5d8)][_0x5752d0(0x200)]['UI']['FadeSpeed'];},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x21b)]=function(){const _0x5bbc63=_0x30b69f;return VisuMZ[_0x5bbc63(0x5d8)]['Settings']['UI'][_0x5bbc63(0x862)];},Scene_Base['prototype'][_0x30b69f(0x6fd)]=function(){const _0x10598a=_0x30b69f;return VisuMZ['CoreEngine'][_0x10598a(0x200)]['UI'][_0x10598a(0x638)];},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x30c)]=function(){const _0x26d113=_0x30b69f;return VisuMZ[_0x26d113(0x5d8)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x3a3)]=function(){const _0x34d996=_0x30b69f;return VisuMZ['CoreEngine']['Settings']['UI'][_0x34d996(0x5e9)];},Scene_Base[_0x30b69f(0x5fe)]['buttonAreaHeight']=function(){const _0x2877d6=_0x30b69f;return VisuMZ['CoreEngine'][_0x2877d6(0x200)]['UI'][_0x2877d6(0x591)];},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x57c)]=function(){const _0x491db2=_0x30b69f;return VisuMZ[_0x491db2(0x5d8)][_0x491db2(0x200)]['Window'][_0x491db2(0x269)];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x857)]=Scene_Base['prototype'][_0x30b69f(0x4d4)],Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x4d4)]=function(){const _0x3e5659=_0x30b69f;VisuMZ[_0x3e5659(0x5d8)][_0x3e5659(0x857)][_0x3e5659(0x305)](this),this[_0x3e5659(0x639)](),this[_0x3e5659(0x32c)]['x']=Math[_0x3e5659(0x297)](this[_0x3e5659(0x32c)]['x']),this[_0x3e5659(0x32c)]['y']=Math[_0x3e5659(0x297)](this['_windowLayer']['y']);},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x639)]=function(){},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x7a8)]=function(){const _0x136221=_0x30b69f;return TextManager['getInputMultiButtonStrings'](_0x136221(0x5ea),_0x136221(0x632));},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x695)]=function(){const _0xf3af7b=_0x30b69f;return TextManager[_0xf3af7b(0x77a)](_0xf3af7b(0x598));},Scene_Base['prototype'][_0x30b69f(0x71e)]=function(){const _0x177841=_0x30b69f;return TextManager[_0x177841(0x77a)](_0x177841(0x1c6));},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x58d)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x30b69f(0x5fe)]['buttonAssistKey5']=function(){const _0x4295c2=_0x30b69f;return TextManager[_0x4295c2(0x77a)](_0x4295c2(0x4d1));},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x51a)]=function(){const _0x14317a=_0x30b69f;return this[_0x14317a(0x76c)]&&this[_0x14317a(0x76c)][_0x14317a(0x430)]?TextManager[_0x14317a(0x7db)]:'';},Scene_Base[_0x30b69f(0x5fe)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x410)]=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){const _0x2cbdcc=_0x30b69f;return TextManager[_0x2cbdcc(0x4a7)];},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x3ee)]=function(){const _0x275c68=_0x30b69f;return TextManager[_0x275c68(0x432)];},Scene_Base['prototype'][_0x30b69f(0x52b)]=function(){return 0x0;},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x611)]=function(){return 0x0;},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x234)]=function(){return 0x0;},Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x40b)]=function(){return 0x0;},Scene_Base[_0x30b69f(0x5fe)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x56b)]=Scene_Boot['prototype'][_0x30b69f(0x282)],Scene_Boot[_0x30b69f(0x5fe)]['loadSystemImages']=function(){const _0x2b74a3=_0x30b69f;VisuMZ['CoreEngine'][_0x2b74a3(0x56b)][_0x2b74a3(0x305)](this),this[_0x2b74a3(0x777)]();},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x777)]=function(){const _0x862263=_0x30b69f,_0x4d62bb=['animations',_0x862263(0x55c),'battlebacks2','characters',_0x862263(0x738),_0x862263(0x7fc),_0x862263(0x3c8),'pictures','sv_actors',_0x862263(0x7e1),_0x862263(0x3c4),_0x862263(0x398),_0x862263(0x2ee),_0x862263(0x535)];for(const _0x17fce9 of _0x4d62bb){const _0x31a0eb=VisuMZ['CoreEngine'][_0x862263(0x200)][_0x862263(0x683)][_0x17fce9],_0x23b737='img/%1/'['format'](_0x17fce9);for(const _0x2fb949 of _0x31a0eb){ImageManager['loadBitmap'](_0x23b737,_0x2fb949);}}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7e7)]=Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x79a)],Scene_Boot[_0x30b69f(0x5fe)]['startNormalGame']=function(){const _0x53d531=_0x30b69f;Utils[_0x53d531(0x809)]('test')&&VisuMZ[_0x53d531(0x5d8)][_0x53d531(0x200)][_0x53d531(0x702)]['NewGameBoot']?this[_0x53d531(0x3fa)]():VisuMZ[_0x53d531(0x5d8)][_0x53d531(0x7e7)]['call'](this);},Scene_Boot['prototype'][_0x30b69f(0x3fa)]=function(){const _0x4693ae=_0x30b69f;DataManager[_0x4693ae(0x745)](),SceneManager[_0x4693ae(0x2f6)](Scene_Map);},Scene_Boot['prototype']['adjustBoxSize']=function(){const _0x400c13=_0x30b69f,_0x5b6831=$dataSystem[_0x400c13(0x519)][_0x400c13(0x23e)],_0x1cd194=$dataSystem[_0x400c13(0x519)][_0x400c13(0x605)],_0x2114aa=VisuMZ[_0x400c13(0x5d8)][_0x400c13(0x200)]['UI'][_0x400c13(0x1da)];Graphics[_0x400c13(0x582)]=_0x5b6831-_0x2114aa*0x2,Graphics[_0x400c13(0x377)]=_0x1cd194-_0x2114aa*0x2,this[_0x400c13(0x82c)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2d0)]=Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x41a)],Scene_Boot['prototype'][_0x30b69f(0x41a)]=function(){const _0x5c97d6=_0x30b69f;this[_0x5c97d6(0x1cd)]()?this['makeDocumentTitle']():VisuMZ[_0x5c97d6(0x5d8)][_0x5c97d6(0x2d0)][_0x5c97d6(0x305)](this);},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x1cd)]=function(){const _0x29f113=_0x30b69f;if(Scene_Title[_0x29f113(0x6f2)]==='')return![];if(Scene_Title[_0x29f113(0x6f2)]==='Subtitle')return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x29f113(0x6b0)]===_0x29f113(0x4c3))return![];return!![];},Scene_Boot['prototype'][_0x30b69f(0x529)]=function(){const _0x582876=_0x30b69f,_0x42f1be=$dataSystem[_0x582876(0x396)],_0x326ff2=Scene_Title[_0x582876(0x6f2)]||'',_0x5e668a=Scene_Title[_0x582876(0x6b0)]||'',_0x52ad2a=VisuMZ[_0x582876(0x5d8)][_0x582876(0x200)][_0x582876(0x4a1)]['Title'][_0x582876(0x819)],_0x3248ee=_0x52ad2a[_0x582876(0x84d)](_0x42f1be,_0x326ff2,_0x5e668a);document['title']=_0x3248ee;},Scene_Boot[_0x30b69f(0x5fe)][_0x30b69f(0x82c)]=function(){const _0x1d102d=_0x30b69f;if(VisuMZ[_0x1d102d(0x5d8)][_0x1d102d(0x200)]['UI']['SideButtons']){const _0x31e2eb=Graphics[_0x1d102d(0x6c7)]-Graphics[_0x1d102d(0x582)]-VisuMZ[_0x1d102d(0x5d8)][_0x1d102d(0x200)]['UI']['BoxMargin']*0x2,_0x56ff9e=Sprite_Button[_0x1d102d(0x5fe)][_0x1d102d(0x671)][_0x1d102d(0x305)](this)*0x4;if(_0x31e2eb>=_0x56ff9e)SceneManager[_0x1d102d(0x502)](!![]);}},Scene_Title[_0x30b69f(0x6f2)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x7b5)][_0x30b69f(0x1db)],Scene_Title[_0x30b69f(0x6b0)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)]['Title']['Version'],Scene_Title[_0x30b69f(0x28e)]=VisuMZ[_0x30b69f(0x5d8)]['Settings']['TitlePicButtons'],VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7df)]=Scene_Title['prototype'][_0x30b69f(0x672)],Scene_Title[_0x30b69f(0x5fe)]['drawGameTitle']=function(){const _0x7bacbd=_0x30b69f;VisuMZ[_0x7bacbd(0x5d8)][_0x7bacbd(0x200)][_0x7bacbd(0x4a1)][_0x7bacbd(0x7b5)][_0x7bacbd(0x672)][_0x7bacbd(0x305)](this);if(Scene_Title[_0x7bacbd(0x6f2)]!==''&&Scene_Title[_0x7bacbd(0x6f2)]!==_0x7bacbd(0x1db))this[_0x7bacbd(0x67a)]();if(Scene_Title[_0x7bacbd(0x6b0)]!==''&&Scene_Title[_0x7bacbd(0x6b0)]!==_0x7bacbd(0x4c3))this['drawGameVersion']();},Scene_Title['prototype']['drawGameSubtitle']=function(){const _0x442cef=_0x30b69f;VisuMZ[_0x442cef(0x5d8)][_0x442cef(0x200)][_0x442cef(0x4a1)][_0x442cef(0x7b5)]['drawGameSubtitle'][_0x442cef(0x305)](this);},Scene_Title['prototype'][_0x30b69f(0x5e3)]=function(){const _0x16e1c7=_0x30b69f;VisuMZ['CoreEngine'][_0x16e1c7(0x200)][_0x16e1c7(0x4a1)][_0x16e1c7(0x7b5)]['drawGameVersion'][_0x16e1c7(0x305)](this);},Scene_Title['prototype']['createCommandWindow']=function(){const _0x34a67b=_0x30b69f;this['createTitleButtons']();const _0x205b18=$dataSystem[_0x34a67b(0x823)][_0x34a67b(0x78a)],_0x7cfc61=this[_0x34a67b(0x65b)]();this[_0x34a67b(0x272)]=new Window_TitleCommand(_0x7cfc61),this[_0x34a67b(0x272)][_0x34a67b(0x64a)](_0x205b18);const _0x11f4b0=this[_0x34a67b(0x65b)]();this[_0x34a67b(0x272)][_0x34a67b(0x741)](_0x11f4b0['x'],_0x11f4b0['y'],_0x11f4b0['width'],_0x11f4b0[_0x34a67b(0x820)]),this[_0x34a67b(0x512)](this[_0x34a67b(0x272)]);},Scene_Title['prototype'][_0x30b69f(0x7d7)]=function(){const _0x59abbc=_0x30b69f;return this['_commandWindow']?this['_commandWindow'][_0x59abbc(0x474)]():VisuMZ[_0x59abbc(0x5d8)]['Settings'][_0x59abbc(0x6be)][_0x59abbc(0x303)];},Scene_Title[_0x30b69f(0x5fe)][_0x30b69f(0x65b)]=function(){const _0x10ea9a=_0x30b69f;return VisuMZ[_0x10ea9a(0x5d8)]['Settings'][_0x10ea9a(0x4a1)]['Title'][_0x10ea9a(0x393)][_0x10ea9a(0x305)](this);},Scene_Title[_0x30b69f(0x5fe)]['createTitleButtons']=function(){const _0x5e6f1c=_0x30b69f;for(const _0x3bcf42 of Scene_Title[_0x5e6f1c(0x28e)]){const _0x1def68=new Sprite_TitlePictureButton(_0x3bcf42);this[_0x5e6f1c(0x7f9)](_0x1def68);}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2f7)]=Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x1f2387=_0x30b69f;VisuMZ['CoreEngine'][_0x1f2387(0x2f7)][_0x1f2387(0x305)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x1f2387(0x3c5)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x75a)]=Scene_Map[_0x30b69f(0x5fe)]['updateMainMultiply'],Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x7bd)]=function(){const _0x1b3d47=_0x30b69f;VisuMZ['CoreEngine'][_0x1b3d47(0x75a)]['call'](this),$gameTemp[_0x1b3d47(0x321)]&&!$gameMessage[_0x1b3d47(0x608)]()&&(this['updateMain'](),SceneManager[_0x1b3d47(0x6c5)]());},Scene_Map[_0x30b69f(0x5fe)]['terminate']=function(){const _0x1bb578=_0x30b69f;Scene_Message[_0x1bb578(0x5fe)][_0x1bb578(0x356)][_0x1bb578(0x305)](this),!SceneManager[_0x1bb578(0x322)](Scene_Battle)&&(this['_spriteset'][_0x1bb578(0x202)](),this[_0x1bb578(0x22b)][_0x1bb578(0x1d9)](),this[_0x1bb578(0x32c)][_0x1bb578(0x430)]=![],SceneManager['snapForBackground']()),$gameScreen[_0x1bb578(0x85b)](),this[_0x1bb578(0x3c5)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7a4)]=Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x7c7)],Scene_Map[_0x30b69f(0x5fe)]['createMenuButton']=function(){const _0x31e2ae=_0x30b69f;VisuMZ['CoreEngine'][_0x31e2ae(0x7a4)][_0x31e2ae(0x305)](this),SceneManager['isSideButtonLayout']()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x841)]=function(){const _0x55c59f=_0x30b69f;this[_0x55c59f(0x32e)]['x']=Graphics[_0x55c59f(0x582)]+0x4;},VisuMZ[_0x30b69f(0x5d8)]['Scene_Map_updateScene']=Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x41c)],Scene_Map[_0x30b69f(0x5fe)]['updateScene']=function(){const _0x2b6f56=_0x30b69f;VisuMZ[_0x2b6f56(0x5d8)]['Scene_Map_updateScene'][_0x2b6f56(0x305)](this),this[_0x2b6f56(0x6a5)]();},Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x6a5)]=function(){const _0x546c46=_0x30b69f;Input[_0x546c46(0x5ee)](_0x546c46(0x288))&&(ConfigManager[_0x546c46(0x4be)]=!ConfigManager[_0x546c46(0x4be)],ConfigManager[_0x546c46(0x5d6)]());},VisuMZ[_0x30b69f(0x5d8)]['Scene_Map_updateMain']=Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x2ae)],Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x2ae)]=function(){const _0x1a178f=_0x30b69f;VisuMZ['CoreEngine'][_0x1a178f(0x3d5)][_0x1a178f(0x305)](this),this[_0x1a178f(0x251)]();},Scene_Map['prototype']['clearOnceParallelInterpreters']=function(){const _0x440cec=_0x30b69f;this[_0x440cec(0x663)]=[];},Scene_Map[_0x30b69f(0x5fe)]['updateOnceParallelInterpreters']=function(){const _0xf4e772=_0x30b69f;if(!this[_0xf4e772(0x663)])return;for(const _0x4f30e4 of this[_0xf4e772(0x663)]){_0x4f30e4&&_0x4f30e4['update']();}},Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x4a9)]=function(_0x3dbfdc){const _0x117f83=_0x30b69f,_0x4dfd45=$dataCommonEvents[_0x3dbfdc];if(!_0x4dfd45)return;const _0x57f9ec=new Game_OnceParallelInterpreter();this[_0x117f83(0x83c)](_0x57f9ec),_0x57f9ec[_0x117f83(0x668)](_0x3dbfdc);},Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x83c)]=function(_0xdce5fd){const _0x2f71ee=_0x30b69f;this['_onceParallelInterpreters']=this[_0x2f71ee(0x663)]||[],this[_0x2f71ee(0x663)][_0x2f71ee(0x327)](_0xdce5fd);},Scene_Map[_0x30b69f(0x5fe)][_0x30b69f(0x828)]=function(_0x5a3f9f){const _0x36f74f=_0x30b69f;this[_0x36f74f(0x663)]=this[_0x36f74f(0x663)]||[],this[_0x36f74f(0x663)]['remove'](_0x5a3f9f);};function Game_OnceParallelInterpreter(){const _0x4d9a87=_0x30b69f;this[_0x4d9a87(0x6f5)](...arguments);}Game_OnceParallelInterpreter[_0x30b69f(0x5fe)]=Object['create'](Game_Interpreter['prototype']),Game_OnceParallelInterpreter['prototype'][_0x30b69f(0x815)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x30b69f(0x5fe)][_0x30b69f(0x668)]=function(_0x18272e){const _0x2be74d=_0x30b69f,_0x39c717=$dataCommonEvents[_0x18272e];_0x39c717?this[_0x2be74d(0x835)](_0x39c717[_0x2be74d(0x54a)],0x0):this[_0x2be74d(0x356)]();},Game_OnceParallelInterpreter[_0x30b69f(0x5fe)][_0x30b69f(0x356)]=function(){const _0x1e139b=_0x30b69f;if(!SceneManager['isSceneMap']())return;SceneManager[_0x1e139b(0x864)][_0x1e139b(0x828)](this),Game_Interpreter[_0x1e139b(0x5fe)][_0x1e139b(0x356)]['call'](this);},VisuMZ[_0x30b69f(0x5d8)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase['prototype'][_0x30b69f(0x5d4)],Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x5d4)]=function(){const _0x33b1c5=_0x30b69f;let _0x499209=0x0;return SceneManager[_0x33b1c5(0x778)]()?_0x499209=this[_0x33b1c5(0x27f)]():_0x499209=VisuMZ[_0x33b1c5(0x5d8)][_0x33b1c5(0x32f)][_0x33b1c5(0x305)](this),this[_0x33b1c5(0x51b)]()&&this['getButtonAssistLocation']()===_0x33b1c5(0x2f2)&&(_0x499209+=Window_ButtonAssist[_0x33b1c5(0x5fe)]['lineHeight']()),_0x499209;},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x27f)]=function(){return this['isBottomHelpMode']()?this['mainAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x30b69f(0x7ec)]=Scene_MenuBase['prototype'][_0x30b69f(0x5c9)],Scene_MenuBase[_0x30b69f(0x5fe)]['mainAreaTop']=function(){const _0x4f2f66=_0x30b69f;return SceneManager[_0x4f2f66(0x778)]()?this[_0x4f2f66(0x3d8)]():VisuMZ[_0x4f2f66(0x5d8)][_0x4f2f66(0x7ec)][_0x4f2f66(0x305)](this);},Scene_MenuBase['prototype'][_0x30b69f(0x3d8)]=function(){const _0x847ee3=_0x30b69f;return!this[_0x847ee3(0x21b)]()?this[_0x847ee3(0x342)]():0x0;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x4f1)]=Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x2ca)],Scene_MenuBase['prototype'][_0x30b69f(0x2ca)]=function(){const _0x27f179=_0x30b69f;let _0x2437e0=0x0;return SceneManager[_0x27f179(0x778)]()?_0x2437e0=this['mainAreaHeightSideButtonLayout']():_0x2437e0=VisuMZ[_0x27f179(0x5d8)]['Scene_MenuBase_mainAreaHeight'][_0x27f179(0x305)](this),this[_0x27f179(0x51b)]()&&this['getButtonAssistLocation']()!=='button'&&(_0x2437e0-=Window_ButtonAssist[_0x27f179(0x5fe)][_0x27f179(0x578)]()),_0x2437e0;},Scene_MenuBase[_0x30b69f(0x5fe)]['mainAreaHeightSideButtonLayout']=function(){const _0x4db135=_0x30b69f;return Graphics[_0x4db135(0x377)]-this[_0x4db135(0x562)]();},VisuMZ[_0x30b69f(0x5d8)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x30b69f(0x5fe)]['createBackground'],Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x1f5)]=function(){const _0x141fe9=_0x30b69f;this[_0x141fe9(0x38a)]=new PIXI['filters'][(_0x141fe9(0x3b6))](clamp=!![]),this[_0x141fe9(0x83e)]=new Sprite(),this[_0x141fe9(0x83e)][_0x141fe9(0x516)]=SceneManager[_0x141fe9(0x7e9)](),this[_0x141fe9(0x83e)][_0x141fe9(0x382)]=[this[_0x141fe9(0x38a)]],this['addChild'](this[_0x141fe9(0x83e)]),this[_0x141fe9(0x276)](0xc0),this[_0x141fe9(0x276)](this[_0x141fe9(0x7f6)]()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype'][_0x30b69f(0x7f6)]=function(){const _0x5dc547=_0x30b69f,_0x2d8dda=String(this['constructor'][_0x5dc547(0x656)]),_0x2a4e2b=this[_0x5dc547(0x40c)](_0x2d8dda);return _0x2a4e2b?_0x2a4e2b[_0x5dc547(0x60c)]:0xc0;},Scene_MenuBase['prototype']['createCustomBackgroundImages']=function(){const _0x28ba2a=_0x30b69f,_0x16a5ce=String(this[_0x28ba2a(0x815)][_0x28ba2a(0x656)]),_0x2bc244=this['getCustomBackgroundSettings'](_0x16a5ce);_0x2bc244&&(_0x2bc244['BgFilename1']!==''||_0x2bc244[_0x28ba2a(0x798)]!=='')&&(this[_0x28ba2a(0x4c6)]=new Sprite(ImageManager[_0x28ba2a(0x3e7)](_0x2bc244[_0x28ba2a(0x250)])),this[_0x28ba2a(0x706)]=new Sprite(ImageManager[_0x28ba2a(0x227)](_0x2bc244[_0x28ba2a(0x798)])),this[_0x28ba2a(0x7f9)](this[_0x28ba2a(0x4c6)]),this['addChild'](this[_0x28ba2a(0x706)]),this[_0x28ba2a(0x4c6)][_0x28ba2a(0x516)][_0x28ba2a(0x751)](this[_0x28ba2a(0x45e)]['bind'](this,this[_0x28ba2a(0x4c6)])),this[_0x28ba2a(0x706)][_0x28ba2a(0x516)][_0x28ba2a(0x751)](this[_0x28ba2a(0x45e)][_0x28ba2a(0x3f2)](this,this[_0x28ba2a(0x706)])));},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x40c)]=function(_0x9f2f43){const _0x2f7e85=_0x30b69f;return VisuMZ['CoreEngine']['Settings'][_0x2f7e85(0x48b)][_0x9f2f43]||VisuMZ[_0x2f7e85(0x5d8)][_0x2f7e85(0x200)][_0x2f7e85(0x48b)]['Scene_Unlisted'];},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x45e)]=function(_0x28e1c3){const _0x164c29=_0x30b69f;this[_0x164c29(0x346)](_0x28e1c3),this[_0x164c29(0x77f)](_0x28e1c3);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x54b)]=Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x626)],Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x626)]=function(){const _0x5699c4=_0x30b69f;VisuMZ[_0x5699c4(0x5d8)]['Scene_MenuBase_createCancelButton']['call'](this),SceneManager[_0x5699c4(0x866)]()&&this[_0x5699c4(0x3eb)]();},Scene_MenuBase['prototype'][_0x30b69f(0x3eb)]=function(){const _0x9a7c8c=_0x30b69f;this['_cancelButton']['x']=Graphics[_0x9a7c8c(0x582)]+0x4;},VisuMZ['CoreEngine'][_0x30b69f(0x5c4)]=Scene_MenuBase[_0x30b69f(0x5fe)]['createPageButtons'],Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x5bf)]=function(){const _0x4e3d2a=_0x30b69f;VisuMZ[_0x4e3d2a(0x5d8)]['Scene_MenuBase_createPageButtons'][_0x4e3d2a(0x305)](this),SceneManager['isSideButtonLayout']()&&this[_0x4e3d2a(0x652)]();},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x652)]=function(){const _0x496a8d=_0x30b69f;this['_pageupButton']['x']=-0x1*(this[_0x496a8d(0x76c)][_0x496a8d(0x6c7)]+this['_pagedownButton'][_0x496a8d(0x6c7)]+0x8),this['_pagedownButton']['x']=-0x1*(this[_0x496a8d(0x4da)][_0x496a8d(0x6c7)]+0x4);},Scene_MenuBase[_0x30b69f(0x5fe)]['isMenuButtonAssistEnabled']=function(){const _0x13045f=_0x30b69f;return VisuMZ['CoreEngine'][_0x13045f(0x200)]['ButtonAssist'][_0x13045f(0x504)];},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x795)]=function(){const _0x4d11b2=_0x30b69f;return SceneManager[_0x4d11b2(0x866)]()||SceneManager[_0x4d11b2(0x458)]()?VisuMZ[_0x4d11b2(0x5d8)][_0x4d11b2(0x200)][_0x4d11b2(0x834)][_0x4d11b2(0x3f5)]:_0x4d11b2(0x6fc);},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x639)]=function(){const _0x276ef4=_0x30b69f;if(!this[_0x276ef4(0x51b)]())return;const _0x5ee40c=this[_0x276ef4(0x646)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x5ee40c),this[_0x276ef4(0x512)](this[_0x276ef4(0x69f)]);},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x646)]=function(){const _0x465725=_0x30b69f;return this[_0x465725(0x795)]()===_0x465725(0x6fc)?this['buttonAssistWindowButtonRect']():this['buttonAssistWindowSideRect']();},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x831)]=function(){const _0x25e45b=_0x30b69f,_0x33188d=ConfigManager[_0x25e45b(0x735)]?(Sprite_Button[_0x25e45b(0x5fe)][_0x25e45b(0x671)]()+0x6)*0x2:0x0,_0x50dde4=this[_0x25e45b(0x3c2)](),_0x3ac946=Graphics[_0x25e45b(0x582)]-_0x33188d*0x2,_0x4be5ac=this[_0x25e45b(0x2bb)]();return new Rectangle(_0x33188d,_0x50dde4,_0x3ac946,_0x4be5ac);},Scene_MenuBase[_0x30b69f(0x5fe)][_0x30b69f(0x55d)]=function(){const _0xbddd6c=_0x30b69f,_0x49fc31=Graphics[_0xbddd6c(0x582)],_0x34753e=Window_ButtonAssist[_0xbddd6c(0x5fe)][_0xbddd6c(0x578)](),_0x2b6a71=0x0;let _0xe23a3e=0x0;return this[_0xbddd6c(0x795)]()===_0xbddd6c(0x2f2)?_0xe23a3e=0x0:_0xe23a3e=Graphics[_0xbddd6c(0x377)]-_0x34753e,new Rectangle(_0x2b6a71,_0xe23a3e,_0x49fc31,_0x34753e);},Scene_Menu[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x3aa)],VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x5fd)]=Scene_Menu['prototype'][_0x30b69f(0x310)],Scene_Menu['prototype'][_0x30b69f(0x310)]=function(){const _0x15309f=_0x30b69f;VisuMZ[_0x15309f(0x5d8)][_0x15309f(0x5fd)][_0x15309f(0x305)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Menu[_0x30b69f(0x5fe)][_0x30b69f(0x480)]=function(){const _0x5551fd=_0x30b69f;this[_0x5551fd(0x272)]&&this['_commandWindow'][_0x5551fd(0x64a)](Scene_Menu['layoutSettings'][_0x5551fd(0x44f)]),this[_0x5551fd(0x52f)]&&this[_0x5551fd(0x52f)][_0x5551fd(0x64a)](Scene_Menu[_0x5551fd(0x4f7)][_0x5551fd(0x411)]),this[_0x5551fd(0x78f)]&&this[_0x5551fd(0x78f)][_0x5551fd(0x64a)](Scene_Menu[_0x5551fd(0x4f7)][_0x5551fd(0x57b)]);},Scene_Menu['prototype'][_0x30b69f(0x65b)]=function(){const _0x4cc181=_0x30b69f;return Scene_Menu[_0x4cc181(0x4f7)]['CommandRect']['call'](this);},Scene_Menu[_0x30b69f(0x5fe)][_0x30b69f(0x340)]=function(){const _0x5a4147=_0x30b69f;return Scene_Menu[_0x5a4147(0x4f7)][_0x5a4147(0x26d)][_0x5a4147(0x305)](this);},Scene_Menu[_0x30b69f(0x5fe)][_0x30b69f(0x85a)]=function(){const _0x14ada2=_0x30b69f;return Scene_Menu[_0x14ada2(0x4f7)][_0x14ada2(0x222)]['call'](this);},Scene_Item[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)]['Settings'][_0x30b69f(0x4a1)][_0x30b69f(0x760)],VisuMZ['CoreEngine']['Scene_Item_create']=Scene_Item[_0x30b69f(0x5fe)][_0x30b69f(0x310)],Scene_Item[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0x57c0f9=_0x30b69f;VisuMZ[_0x57c0f9(0x5d8)]['Scene_Item_create'][_0x57c0f9(0x305)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item['prototype'][_0x30b69f(0x480)]=function(){const _0x54d69b=_0x30b69f;this['_helpWindow']&&this[_0x54d69b(0x4c2)][_0x54d69b(0x64a)](Scene_Item['layoutSettings'][_0x54d69b(0x215)]),this[_0x54d69b(0x6bf)]&&this[_0x54d69b(0x6bf)][_0x54d69b(0x64a)](Scene_Item[_0x54d69b(0x4f7)][_0x54d69b(0x796)]),this[_0x54d69b(0x3b7)]&&this[_0x54d69b(0x3b7)][_0x54d69b(0x64a)](Scene_Item[_0x54d69b(0x4f7)][_0x54d69b(0x24c)]),this['_actorWindow']&&this[_0x54d69b(0x72e)][_0x54d69b(0x64a)](Scene_Item[_0x54d69b(0x4f7)][_0x54d69b(0x4cb)]);},Scene_Item[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x574034=_0x30b69f;return Scene_Item[_0x574034(0x4f7)][_0x574034(0x1c9)][_0x574034(0x305)](this);},Scene_Item['prototype'][_0x30b69f(0x3f4)]=function(){const _0x2a84dc=_0x30b69f;return Scene_Item[_0x2a84dc(0x4f7)][_0x2a84dc(0x2eb)][_0x2a84dc(0x305)](this);},Scene_Item[_0x30b69f(0x5fe)][_0x30b69f(0x5ce)]=function(){const _0x3e6aa9=_0x30b69f;return Scene_Item[_0x3e6aa9(0x4f7)][_0x3e6aa9(0x792)]['call'](this);},Scene_Item[_0x30b69f(0x5fe)][_0x30b69f(0x548)]=function(){const _0x4f95d8=_0x30b69f;return Scene_Item[_0x4f95d8(0x4f7)][_0x4f95d8(0x301)]['call'](this);},Scene_Skill[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x602)],VisuMZ[_0x30b69f(0x5d8)]['Scene_Skill_create']=Scene_Skill['prototype']['create'],Scene_Skill[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0x1768b3=_0x30b69f;VisuMZ[_0x1768b3(0x5d8)]['Scene_Skill_create'][_0x1768b3(0x305)](this),this[_0x1768b3(0x480)]();},Scene_Skill[_0x30b69f(0x5fe)][_0x30b69f(0x480)]=function(){const _0x15b452=_0x30b69f;this[_0x15b452(0x4c2)]&&this[_0x15b452(0x4c2)][_0x15b452(0x64a)](Scene_Skill['layoutSettings'][_0x15b452(0x215)]),this[_0x15b452(0x2f3)]&&this[_0x15b452(0x2f3)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x15b452(0x426)]),this[_0x15b452(0x78f)]&&this[_0x15b452(0x78f)][_0x15b452(0x64a)](Scene_Skill[_0x15b452(0x4f7)]['StatusBgType']),this[_0x15b452(0x3b7)]&&this['_itemWindow']['setBackgroundType'](Scene_Skill[_0x15b452(0x4f7)][_0x15b452(0x24c)]),this[_0x15b452(0x72e)]&&this['_actorWindow'][_0x15b452(0x64a)](Scene_Skill[_0x15b452(0x4f7)][_0x15b452(0x4cb)]);},Scene_Skill[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x407756=_0x30b69f;return Scene_Skill[_0x407756(0x4f7)]['HelpRect'][_0x407756(0x305)](this);},Scene_Skill[_0x30b69f(0x5fe)][_0x30b69f(0x40e)]=function(){const _0x2cf1d1=_0x30b69f;return Scene_Skill[_0x2cf1d1(0x4f7)][_0x2cf1d1(0x289)]['call'](this);},Scene_Skill[_0x30b69f(0x5fe)]['statusWindowRect']=function(){const _0x3aa302=_0x30b69f;return Scene_Skill[_0x3aa302(0x4f7)][_0x3aa302(0x222)][_0x3aa302(0x305)](this);},Scene_Skill['prototype'][_0x30b69f(0x5ce)]=function(){const _0x536dd1=_0x30b69f;return Scene_Skill[_0x536dd1(0x4f7)]['ItemRect'][_0x536dd1(0x305)](this);},Scene_Skill[_0x30b69f(0x5fe)][_0x30b69f(0x548)]=function(){const _0x26b92b=_0x30b69f;return Scene_Skill[_0x26b92b(0x4f7)][_0x26b92b(0x301)][_0x26b92b(0x305)](this);},Scene_Equip[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)]['EquipMenu'],VisuMZ['CoreEngine']['Scene_Equip_create']=Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x310)],Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0x21fb4a=_0x30b69f;VisuMZ[_0x21fb4a(0x5d8)][_0x21fb4a(0x65a)]['call'](this),this[_0x21fb4a(0x480)]();},Scene_Equip['prototype'][_0x30b69f(0x480)]=function(){const _0x56ea1f=_0x30b69f;this['_helpWindow']&&this[_0x56ea1f(0x4c2)][_0x56ea1f(0x64a)](Scene_Equip['layoutSettings'][_0x56ea1f(0x215)]),this[_0x56ea1f(0x78f)]&&this[_0x56ea1f(0x78f)][_0x56ea1f(0x64a)](Scene_Equip[_0x56ea1f(0x4f7)]['StatusBgType']),this[_0x56ea1f(0x272)]&&this[_0x56ea1f(0x272)]['setBackgroundType'](Scene_Equip[_0x56ea1f(0x4f7)][_0x56ea1f(0x44f)]),this[_0x56ea1f(0x5d3)]&&this['_slotWindow'][_0x56ea1f(0x64a)](Scene_Equip['layoutSettings'][_0x56ea1f(0x56f)]),this[_0x56ea1f(0x3b7)]&&this[_0x56ea1f(0x3b7)]['setBackgroundType'](Scene_Equip[_0x56ea1f(0x4f7)][_0x56ea1f(0x24c)]);},Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x51d74a=_0x30b69f;return Scene_Equip[_0x51d74a(0x4f7)][_0x51d74a(0x1c9)]['call'](this);},Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x85a)]=function(){const _0x65019f=_0x30b69f;return Scene_Equip[_0x65019f(0x4f7)][_0x65019f(0x222)]['call'](this);},Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x65b)]=function(){const _0x42dc3b=_0x30b69f;return Scene_Equip['layoutSettings'][_0x42dc3b(0x393)][_0x42dc3b(0x305)](this);},Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x5ba)]=function(){const _0x2b091a=_0x30b69f;return Scene_Equip['layoutSettings'][_0x2b091a(0x20d)][_0x2b091a(0x305)](this);},Scene_Equip[_0x30b69f(0x5fe)][_0x30b69f(0x5ce)]=function(){const _0x64579d=_0x30b69f;return Scene_Equip[_0x64579d(0x4f7)][_0x64579d(0x792)]['call'](this);},Scene_Status['layoutSettings']=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x767)],VisuMZ['CoreEngine'][_0x30b69f(0x564)]=Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x310)],Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0x349bd7=_0x30b69f;VisuMZ[_0x349bd7(0x5d8)][_0x349bd7(0x564)][_0x349bd7(0x305)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x480)]=function(){const _0x442044=_0x30b69f;this['_profileWindow']&&this['_profileWindow'][_0x442044(0x64a)](Scene_Status[_0x442044(0x4f7)][_0x442044(0x370)]),this[_0x442044(0x78f)]&&this[_0x442044(0x78f)][_0x442044(0x64a)](Scene_Status[_0x442044(0x4f7)][_0x442044(0x57b)]),this[_0x442044(0x429)]&&this[_0x442044(0x429)][_0x442044(0x64a)](Scene_Status['layoutSettings'][_0x442044(0x2e7)]),this['_statusEquipWindow']&&this[_0x442044(0x63a)][_0x442044(0x64a)](Scene_Status[_0x442044(0x4f7)][_0x442044(0x35f)]);},Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x2fe)]=function(){const _0x1c23d1=_0x30b69f;return Scene_Status[_0x1c23d1(0x4f7)][_0x1c23d1(0x63f)]['call'](this);},Scene_Status['prototype'][_0x30b69f(0x85a)]=function(){const _0x5b4d66=_0x30b69f;return Scene_Status[_0x5b4d66(0x4f7)][_0x5b4d66(0x222)][_0x5b4d66(0x305)](this);},Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x6eb)]=function(){const _0x366e4d=_0x30b69f;return Scene_Status['layoutSettings'][_0x366e4d(0x290)][_0x366e4d(0x305)](this);},Scene_Status[_0x30b69f(0x5fe)][_0x30b69f(0x865)]=function(){const _0x63e89b=_0x30b69f;return Scene_Status[_0x63e89b(0x4f7)][_0x63e89b(0x472)][_0x63e89b(0x305)](this);},Scene_Options[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)]['Settings'][_0x30b69f(0x4a1)][_0x30b69f(0x253)],VisuMZ[_0x30b69f(0x5d8)]['Scene_Options_create']=Scene_Options[_0x30b69f(0x5fe)]['create'],Scene_Options[_0x30b69f(0x5fe)]['create']=function(){const _0x3b864f=_0x30b69f;VisuMZ[_0x3b864f(0x5d8)][_0x3b864f(0x204)]['call'](this),this[_0x3b864f(0x480)]();},Scene_Options[_0x30b69f(0x5fe)]['setCoreEngineUpdateWindowBg']=function(){const _0x3bf5d9=_0x30b69f;this[_0x3bf5d9(0x312)]&&this[_0x3bf5d9(0x312)][_0x3bf5d9(0x64a)](Scene_Options[_0x3bf5d9(0x4f7)][_0x3bf5d9(0x508)]);},Scene_Options[_0x30b69f(0x5fe)][_0x30b69f(0x721)]=function(){const _0x578d2b=_0x30b69f;return Scene_Options[_0x578d2b(0x4f7)][_0x578d2b(0x409)][_0x578d2b(0x305)](this);},Scene_Save[_0x30b69f(0x4f7)]=VisuMZ['CoreEngine'][_0x30b69f(0x200)]['MenuLayout']['SaveMenu'],Scene_Save[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0xb83677=_0x30b69f;Scene_File[_0xb83677(0x5fe)]['create'][_0xb83677(0x305)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x4dd9fb=_0x30b69f;this['_helpWindow']&&this[_0x4dd9fb(0x4c2)][_0x4dd9fb(0x64a)](Scene_Save['layoutSettings']['HelpBgType']),this[_0x4dd9fb(0x365)]&&this[_0x4dd9fb(0x365)][_0x4dd9fb(0x64a)](Scene_Save[_0x4dd9fb(0x4f7)][_0x4dd9fb(0x6fe)]);},Scene_Save[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x583446=_0x30b69f;return Scene_Save[_0x583446(0x4f7)]['HelpRect'][_0x583446(0x305)](this);},Scene_Save[_0x30b69f(0x5fe)]['listWindowRect']=function(){const _0x280069=_0x30b69f;return Scene_Save[_0x280069(0x4f7)][_0x280069(0x76a)][_0x280069(0x305)](this);},Scene_Load[_0x30b69f(0x4f7)]=VisuMZ['CoreEngine']['Settings'][_0x30b69f(0x4a1)][_0x30b69f(0x331)],Scene_Load[_0x30b69f(0x5fe)]['create']=function(){const _0x375dcd=_0x30b69f;Scene_File[_0x375dcd(0x5fe)][_0x375dcd(0x310)][_0x375dcd(0x305)](this),this[_0x375dcd(0x480)]();},Scene_Load['prototype'][_0x30b69f(0x480)]=function(){const _0x25ab1a=_0x30b69f;this[_0x25ab1a(0x4c2)]&&this[_0x25ab1a(0x4c2)][_0x25ab1a(0x64a)](Scene_Load[_0x25ab1a(0x4f7)][_0x25ab1a(0x215)]),this[_0x25ab1a(0x365)]&&this[_0x25ab1a(0x365)]['setBackgroundType'](Scene_Load['layoutSettings'][_0x25ab1a(0x6fe)]);},Scene_Load[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x667f3d=_0x30b69f;return Scene_Load['layoutSettings']['HelpRect'][_0x667f3d(0x305)](this);},Scene_Load[_0x30b69f(0x5fe)][_0x30b69f(0x797)]=function(){const _0x1f4c10=_0x30b69f;return Scene_Load[_0x1f4c10(0x4f7)][_0x1f4c10(0x76a)]['call'](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine'][_0x30b69f(0x200)][_0x30b69f(0x4a1)]['GameEnd'],VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2ac)]=Scene_GameEnd[_0x30b69f(0x5fe)][_0x30b69f(0x1f5)],Scene_GameEnd[_0x30b69f(0x5fe)][_0x30b69f(0x1f5)]=function(){const _0x3f9ead=_0x30b69f;Scene_MenuBase[_0x3f9ead(0x5fe)][_0x3f9ead(0x1f5)]['call'](this);},Scene_GameEnd[_0x30b69f(0x5fe)]['createCommandWindow']=function(){const _0x37939c=_0x30b69f,_0x307f05=this[_0x37939c(0x65b)]();this[_0x37939c(0x272)]=new Window_GameEnd(_0x307f05),this[_0x37939c(0x272)]['setHandler'](_0x37939c(0x4d1),this[_0x37939c(0x7c5)][_0x37939c(0x3f2)](this)),this['addWindow'](this[_0x37939c(0x272)]),this['_commandWindow'][_0x37939c(0x64a)](Scene_GameEnd[_0x37939c(0x4f7)][_0x37939c(0x44f)]);},Scene_GameEnd['prototype']['commandWindowRect']=function(){const _0x2e5f68=_0x30b69f;return Scene_GameEnd[_0x2e5f68(0x4f7)][_0x2e5f68(0x393)][_0x2e5f68(0x305)](this);},Scene_Shop[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x4d8)],VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x50b)]=Scene_Shop['prototype'][_0x30b69f(0x310)],Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x310)]=function(){const _0x420892=_0x30b69f;VisuMZ['CoreEngine']['Scene_Shop_create'][_0x420892(0x305)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x480)]=function(){const _0x536a3=_0x30b69f;this[_0x536a3(0x4c2)]&&this['_helpWindow']['setBackgroundType'](Scene_Shop[_0x536a3(0x4f7)]['HelpBgType']),this[_0x536a3(0x52f)]&&this['_goldWindow']['setBackgroundType'](Scene_Shop['layoutSettings'][_0x536a3(0x411)]),this[_0x536a3(0x272)]&&this['_commandWindow'][_0x536a3(0x64a)](Scene_Shop[_0x536a3(0x4f7)]['CommandBgType']),this[_0x536a3(0x1d0)]&&this[_0x536a3(0x1d0)]['setBackgroundType'](Scene_Shop[_0x536a3(0x4f7)][_0x536a3(0x26f)]),this[_0x536a3(0x585)]&&this[_0x536a3(0x585)][_0x536a3(0x64a)](Scene_Shop[_0x536a3(0x4f7)][_0x536a3(0x270)]),this[_0x536a3(0x78f)]&&this[_0x536a3(0x78f)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x536a3(0x57b)]),this[_0x536a3(0x645)]&&this[_0x536a3(0x645)][_0x536a3(0x64a)](Scene_Shop[_0x536a3(0x4f7)][_0x536a3(0x400)]),this[_0x536a3(0x6bf)]&&this[_0x536a3(0x6bf)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x536a3(0x796)]),this[_0x536a3(0x32a)]&&this['_sellWindow'][_0x536a3(0x64a)](Scene_Shop[_0x536a3(0x4f7)][_0x536a3(0x867)]);},Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x520)]=function(){const _0x32206e=_0x30b69f;return Scene_Shop[_0x32206e(0x4f7)][_0x32206e(0x1c9)][_0x32206e(0x305)](this);},Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x340)]=function(){const _0x172320=_0x30b69f;return Scene_Shop[_0x172320(0x4f7)][_0x172320(0x26d)]['call'](this);},Scene_Shop[_0x30b69f(0x5fe)]['commandWindowRect']=function(){const _0x29781d=_0x30b69f;return Scene_Shop[_0x29781d(0x4f7)][_0x29781d(0x393)][_0x29781d(0x305)](this);},Scene_Shop['prototype'][_0x30b69f(0x489)]=function(){const _0x282ddb=_0x30b69f;return Scene_Shop[_0x282ddb(0x4f7)]['DummyRect'][_0x282ddb(0x305)](this);},Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x484)]=function(){const _0x3955e9=_0x30b69f;return Scene_Shop['layoutSettings']['NumberRect'][_0x3955e9(0x305)](this);},Scene_Shop['prototype']['statusWindowRect']=function(){const _0x28f233=_0x30b69f;return Scene_Shop['layoutSettings'][_0x28f233(0x222)]['call'](this);},Scene_Shop[_0x30b69f(0x5fe)][_0x30b69f(0x6a3)]=function(){const _0x39ab83=_0x30b69f;return Scene_Shop[_0x39ab83(0x4f7)]['BuyRect'][_0x39ab83(0x305)](this);},Scene_Shop[_0x30b69f(0x5fe)]['categoryWindowRect']=function(){const _0xbafb31=_0x30b69f;return Scene_Shop[_0xbafb31(0x4f7)]['CategoryRect'][_0xbafb31(0x305)](this);},Scene_Shop[_0x30b69f(0x5fe)]['sellWindowRect']=function(){const _0x599716=_0x30b69f;return Scene_Shop[_0x599716(0x4f7)][_0x599716(0x7d0)]['call'](this);},Scene_Name[_0x30b69f(0x4f7)]=VisuMZ[_0x30b69f(0x5d8)]['Settings'][_0x30b69f(0x4a1)][_0x30b69f(0x670)],VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x6ec)]=Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x310)],Scene_Name[_0x30b69f(0x5fe)]['create']=function(){const _0x53510d=_0x30b69f;VisuMZ['CoreEngine'][_0x53510d(0x6ec)][_0x53510d(0x305)](this),this[_0x53510d(0x480)]();},Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x480)]=function(){const _0x55fd6a=_0x30b69f;this['_editWindow']&&this[_0x55fd6a(0x85e)][_0x55fd6a(0x64a)](Scene_Name[_0x55fd6a(0x4f7)]['EditBgType']),this[_0x55fd6a(0x3ed)]&&this['_inputWindow'][_0x55fd6a(0x64a)](Scene_Name[_0x55fd6a(0x4f7)][_0x55fd6a(0x70c)]);},Scene_Name['prototype'][_0x30b69f(0x562)]=function(){return 0x0;},Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x2c2)]=function(){const _0x48dc94=_0x30b69f;return Scene_Name[_0x48dc94(0x4f7)][_0x48dc94(0x63e)]['call'](this);},Scene_Name[_0x30b69f(0x5fe)]['inputWindowRect']=function(){const _0x13e725=_0x30b69f;return Scene_Name[_0x13e725(0x4f7)][_0x13e725(0x21e)][_0x13e725(0x305)](this);},Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x2cb)]=function(){const _0x484350=_0x30b69f;if(!this['_inputWindow'])return![];return VisuMZ[_0x484350(0x5d8)][_0x484350(0x200)][_0x484350(0x547)][_0x484350(0x2cb)];},Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x7a8)]=function(){const _0x223a3b=_0x30b69f;return this[_0x223a3b(0x2cb)]()?TextManager['getInputButtonString']('tab'):Scene_MenuBase[_0x223a3b(0x5fe)][_0x223a3b(0x7a8)][_0x223a3b(0x305)](this);},Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x51a)]=function(){const _0x178071=_0x30b69f;if(this[_0x178071(0x2cb)]()){const _0x3d303a=VisuMZ['CoreEngine'][_0x178071(0x200)]['KeyboardInput'];return this[_0x178071(0x3ed)][_0x178071(0x568)]===_0x178071(0x5f5)?_0x3d303a[_0x178071(0x4df)]||'Keyboard':_0x3d303a[_0x178071(0x2ed)]||_0x178071(0x2ed);}else return Scene_MenuBase[_0x178071(0x5fe)][_0x178071(0x51a)][_0x178071(0x305)](this);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x459)]=Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x57a)],Scene_Name[_0x30b69f(0x5fe)][_0x30b69f(0x57a)]=function(){const _0x2ecc03=_0x30b69f;this[_0x2ecc03(0x2a3)]()?this[_0x2ecc03(0x277)]():VisuMZ[_0x2ecc03(0x5d8)][_0x2ecc03(0x459)][_0x2ecc03(0x305)](this);},Scene_Name['prototype'][_0x30b69f(0x2a3)]=function(){const _0x463614=_0x30b69f,_0x5c8f24=VisuMZ[_0x463614(0x5d8)][_0x463614(0x200)][_0x463614(0x547)];if(!_0x5c8f24)return![];const _0x547338=_0x5c8f24[_0x463614(0x572)];if(!_0x547338)return![];const _0x5f5d65=this[_0x463614(0x85e)][_0x463614(0x656)]()['toLowerCase']();for(const _0x4d9277 of _0x547338){if(_0x5f5d65[_0x463614(0x6b2)](_0x4d9277[_0x463614(0x5a1)]()))return!![];}return![];},Scene_Name['prototype']['onInputBannedWords']=function(){SoundManager['playBuzzer']();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x565)]=Scene_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x202)],Scene_Battle['prototype'][_0x30b69f(0x202)]=function(){const _0x22c39c=_0x30b69f;VisuMZ[_0x22c39c(0x5d8)][_0x22c39c(0x565)][_0x22c39c(0x305)](this);if($gameTemp['_playTestFastMode'])this['updatePlayTestF7']();},Scene_Battle[_0x30b69f(0x5fe)]['updatePlayTestF7']=function(){const _0x34b3ea=_0x30b69f;!BattleManager[_0x34b3ea(0x369)]()&&!this[_0x34b3ea(0x40d)]&&!$gameMessage[_0x34b3ea(0x608)]()&&(this[_0x34b3ea(0x40d)]=!![],this['update'](),SceneManager[_0x34b3ea(0x6c5)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x849)]=Scene_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x626)],Scene_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x626)]=function(){const _0x3e0165=_0x30b69f;VisuMZ['CoreEngine'][_0x3e0165(0x849)][_0x3e0165(0x305)](this),SceneManager[_0x3e0165(0x866)]()&&this[_0x3e0165(0x3bd)]();},Scene_Battle['prototype'][_0x30b69f(0x3bd)]=function(){const _0x3db6b8=_0x30b69f;this[_0x3db6b8(0x465)]['x']=Graphics[_0x3db6b8(0x582)]+0x4,this[_0x3db6b8(0x6fd)]()?this['_cancelButton']['y']=Graphics[_0x3db6b8(0x377)]-this[_0x3db6b8(0x2bb)]():this[_0x3db6b8(0x465)]['y']=0x0;},VisuMZ[_0x30b69f(0x5d8)]['Sprite_Button_initialize']=Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(_0x331600){const _0x4657b6=_0x30b69f;VisuMZ['CoreEngine'][_0x4657b6(0x732)][_0x4657b6(0x305)](this,_0x331600),this[_0x4657b6(0x6e3)]();},Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x6e3)]=function(){const _0x347f8a=_0x30b69f,_0x5d0364=VisuMZ[_0x347f8a(0x5d8)][_0x347f8a(0x200)]['UI'];this[_0x347f8a(0x3db)]=![];switch(this[_0x347f8a(0x2ba)]){case _0x347f8a(0x4d1):this[_0x347f8a(0x3db)]=!_0x5d0364['cancelShowButton'];break;case _0x347f8a(0x5ea):case _0x347f8a(0x632):this[_0x347f8a(0x3db)]=!_0x5d0364[_0x347f8a(0x54f)];break;case'down':case'up':case _0x347f8a(0x83f):case'up2':case'ok':this[_0x347f8a(0x3db)]=!_0x5d0364[_0x347f8a(0x4e5)];break;case _0x347f8a(0x6b8):this[_0x347f8a(0x3db)]=!_0x5d0364['menuShowButton'];break;}},VisuMZ[_0x30b69f(0x5d8)]['Sprite_Button_updateOpacity']=Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x2a9)],Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x2a9)]=function(){const _0x4502af=_0x30b69f;SceneManager['areButtonsHidden']()||this[_0x4502af(0x3db)]?this[_0x4502af(0x1c7)]():VisuMZ[_0x4502af(0x5d8)][_0x4502af(0x294)][_0x4502af(0x305)](this);},Sprite_Button[_0x30b69f(0x5fe)][_0x30b69f(0x1c7)]=function(){const _0x4f6849=_0x30b69f;this[_0x4f6849(0x430)]=![],this[_0x4f6849(0x6e4)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x4f6849(0x820)]*0xa;},VisuMZ['CoreEngine'][_0x30b69f(0x6c9)]=Sprite_Battler[_0x30b69f(0x5fe)]['startMove'],Sprite_Battler[_0x30b69f(0x5fe)][_0x30b69f(0x686)]=function(_0x1d39bd,_0x13d8d1,_0x231d49){const _0x33b0e1=_0x30b69f;(this[_0x33b0e1(0x207)]!==_0x1d39bd||this[_0x33b0e1(0x5a9)]!==_0x13d8d1)&&(this[_0x33b0e1(0x1dc)](_0x33b0e1(0x438)),this['_movementWholeDuration']=_0x231d49),VisuMZ[_0x33b0e1(0x5d8)][_0x33b0e1(0x6c9)][_0x33b0e1(0x305)](this,_0x1d39bd,_0x13d8d1,_0x231d49);},Sprite_Battler[_0x30b69f(0x5fe)][_0x30b69f(0x1dc)]=function(_0x4c9cca){const _0x59fad0=_0x30b69f;this[_0x59fad0(0x785)]=_0x4c9cca;},Sprite_Battler[_0x30b69f(0x5fe)][_0x30b69f(0x333)]=function(){const _0x44be6e=_0x30b69f;if(this[_0x44be6e(0x5ac)]<=0x0)return;const _0x23941a=this[_0x44be6e(0x5ac)],_0x29274f=this[_0x44be6e(0x682)],_0x39d8ae=this['_moveEasingType'];this[_0x44be6e(0x4eb)]=this[_0x44be6e(0x1bd)](this['_offsetX'],this[_0x44be6e(0x207)],_0x23941a,_0x29274f,_0x39d8ae),this['_offsetY']=this[_0x44be6e(0x1bd)](this[_0x44be6e(0x3ac)],this[_0x44be6e(0x5a9)],_0x23941a,_0x29274f,_0x39d8ae),this['_movementDuration']--;if(this[_0x44be6e(0x5ac)]<=0x0)this[_0x44be6e(0x455)]();},Sprite_Battler[_0x30b69f(0x5fe)][_0x30b69f(0x1bd)]=function(_0x3cda9c,_0x34eae3,_0x509da7,_0x495538,_0xa0e8a2){const _0x5a9869=_0x30b69f,_0x39b27e=VisuMZ[_0x5a9869(0x76f)]((_0x495538-_0x509da7)/_0x495538,_0xa0e8a2||'Linear'),_0x4a36e9=VisuMZ[_0x5a9869(0x76f)]((_0x495538-_0x509da7+0x1)/_0x495538,_0xa0e8a2||_0x5a9869(0x438)),_0x5d03c5=(_0x3cda9c-_0x34eae3*_0x39b27e)/(0x1-_0x39b27e);return _0x5d03c5+(_0x34eae3-_0x5d03c5)*_0x4a36e9;},VisuMZ[_0x30b69f(0x5d8)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x3b9)],Sprite_Actor['prototype']['setActorHome']=function(_0x152447){const _0x663900=_0x30b69f;VisuMZ[_0x663900(0x5d8)][_0x663900(0x200)]['UI']['RepositionActors']?this[_0x663900(0x2a4)](_0x152447):VisuMZ['CoreEngine'][_0x663900(0x712)][_0x663900(0x305)](this,_0x152447);},Sprite_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x2a4)]=function(_0x44eda1){const _0x2666d9=_0x30b69f;let _0x37e009=Math['round'](Graphics[_0x2666d9(0x6c7)]/0x2+0xc0);_0x37e009-=Math[_0x2666d9(0x4ca)]((Graphics[_0x2666d9(0x6c7)]-Graphics[_0x2666d9(0x582)])/0x2),_0x37e009+=_0x44eda1*0x20;let _0x2b60e8=Graphics[_0x2666d9(0x820)]-0xc8-$gameParty[_0x2666d9(0x6ff)]()*0x30;_0x2b60e8-=Math[_0x2666d9(0x4ca)]((Graphics[_0x2666d9(0x820)]-Graphics['boxHeight'])/0x2),_0x2b60e8+=_0x44eda1*0x30,this['setHome'](_0x37e009,_0x2b60e8);},Sprite_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x794)]=function(){const _0x140aaa=_0x30b69f;this[_0x140aaa(0x686)](0x4b0,0x0,0x78);},Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x3d1)]=function(_0x65e8e0){const _0x511a20=_0x30b69f;this[_0x511a20(0x5a6)]=_0x65e8e0;},VisuMZ['CoreEngine'][_0x30b69f(0x3cb)]=Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x7be)],Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x7be)]=function(){const _0x47397e=_0x30b69f;if(this[_0x47397e(0x5a6)])return;VisuMZ[_0x47397e(0x5d8)]['Sprite_Animation_processSoundTimings']['call'](this);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x3e4)]=Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x1fc)],Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x1fc)]=function(_0x48508d){const _0x169250=_0x30b69f;this[_0x169250(0x424)]()?this['setViewportCoreEngineFix'](_0x48508d):VisuMZ['CoreEngine'][_0x169250(0x3e4)][_0x169250(0x305)](this,_0x48508d);},Sprite_Animation['prototype']['isAnimationOffsetXMirrored']=function(){const _0x49eac8=_0x30b69f;if(!this[_0x49eac8(0x631)])return![];const _0xa58754=this['_animation']['name']||'';if(_0xa58754[_0x49eac8(0x487)](/<MIRROR OFFSET X>/i))return!![];if(_0xa58754['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x49eac8(0x5d8)]['Settings'][_0x49eac8(0x702)][_0x49eac8(0x413)];},Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x84f)]=function(_0x3de986){const _0x11257a=_0x30b69f,_0x79a907=this[_0x11257a(0x261)],_0x3a4f5e=this['_viewportSize'],_0x292703=this[_0x11257a(0x631)][_0x11257a(0x6cb)]*(this[_0x11257a(0x5b7)]?-0x1:0x1)-_0x79a907/0x2,_0x58f215=this[_0x11257a(0x631)][_0x11257a(0x431)]-_0x3a4f5e/0x2,_0x37f5c6=this[_0x11257a(0x428)](_0x3de986);_0x3de986['gl']['viewport'](_0x292703+_0x37f5c6['x'],_0x58f215+_0x37f5c6['y'],_0x79a907,_0x3a4f5e);},Sprite_Animation[_0x30b69f(0x5fe)][_0x30b69f(0x230)]=function(_0x2d9d4c){const _0x3670f8=_0x30b69f;if(_0x2d9d4c[_0x3670f8(0x782)]){}const _0x118dd3=this[_0x3670f8(0x631)][_0x3670f8(0x656)];let _0x177c8c=_0x2d9d4c[_0x3670f8(0x820)]*_0x2d9d4c[_0x3670f8(0x336)]['y'],_0x15a594=0x0,_0x1fec48=-_0x177c8c/0x2;if(_0x118dd3[_0x3670f8(0x487)](/<(?:HEAD|HEADER|TOP)>/i))_0x1fec48=-_0x177c8c;if(_0x118dd3[_0x3670f8(0x487)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x1fec48=0x0;if(this[_0x3670f8(0x631)]['alignBottom'])_0x1fec48=0x0;if(_0x118dd3['match'](/<(?:LEFT)>/i))_0x15a594=-_0x2d9d4c[_0x3670f8(0x6c7)]/0x2;if(_0x118dd3[_0x3670f8(0x487)](/<(?:RIGHT)>/i))_0x15a594=_0x2d9d4c[_0x3670f8(0x6c7)]/0x2;_0x118dd3[_0x3670f8(0x487)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x15a594=Number(RegExp['$1'])*_0x2d9d4c['width']);_0x118dd3[_0x3670f8(0x487)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x1fec48=(0x1-Number(RegExp['$1']))*-_0x177c8c);_0x118dd3[_0x3670f8(0x487)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x15a594=Number(RegExp['$1'])*_0x2d9d4c['width'],_0x1fec48=(0x1-Number(RegExp['$2']))*-_0x177c8c);if(_0x118dd3[_0x3670f8(0x487)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x15a594+=Number(RegExp['$1']);if(_0x118dd3['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x1fec48+=Number(RegExp['$1']);_0x118dd3[_0x3670f8(0x487)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x15a594+=Number(RegExp['$1']),_0x1fec48+=Number(RegExp['$2']));const _0xe19013=new Point(_0x15a594,_0x1fec48);return _0x2d9d4c['updateTransform'](),_0x2d9d4c[_0x3670f8(0x4de)]['apply'](_0xe19013);},Sprite_AnimationMV['prototype'][_0x30b69f(0x68b)]=function(){const _0x51b47b=_0x30b69f;this[_0x51b47b(0x752)]=VisuMZ[_0x51b47b(0x5d8)]['Settings'][_0x51b47b(0x702)][_0x51b47b(0x31d)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x51b47b(0x752)]=this['_rate']['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x30b69f(0x5fe)][_0x30b69f(0x4f6)]=function(){const _0x1592a0=_0x30b69f;if(!this[_0x1592a0(0x631)]);const _0x14ce4a=this['_animation'][_0x1592a0(0x656)]||'';_0x14ce4a['match'](/<RATE:[ ](\d+)>/i)&&(this[_0x1592a0(0x752)]=(Number(RegExp['$1'])||0x1)[_0x1592a0(0x4ac)](0x1,0xa));},Sprite_AnimationMV[_0x30b69f(0x5fe)][_0x30b69f(0x3d1)]=function(_0x2840cd){const _0x4680b0=_0x30b69f;this[_0x4680b0(0x5a6)]=_0x2840cd;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x75e)]=Sprite_AnimationMV[_0x30b69f(0x5fe)][_0x30b69f(0x85c)],Sprite_AnimationMV['prototype'][_0x30b69f(0x85c)]=function(_0x18acec){const _0x32a7d3=_0x30b69f;this[_0x32a7d3(0x5a6)]&&(_0x18acec=JsonEx[_0x32a7d3(0x384)](_0x18acec),_0x18acec['se']&&(_0x18acec['se'][_0x32a7d3(0x802)]=0x0)),VisuMZ[_0x32a7d3(0x5d8)]['Sprite_AnimationMV_processTimingData'][_0x32a7d3(0x305)](this,_0x18acec);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x42b)]=Sprite_AnimationMV[_0x30b69f(0x5fe)][_0x30b69f(0x211)],Sprite_AnimationMV[_0x30b69f(0x5fe)][_0x30b69f(0x211)]=function(){const _0x4309f0=_0x30b69f;VisuMZ[_0x4309f0(0x5d8)][_0x4309f0(0x42b)][_0x4309f0(0x305)](this);if(this[_0x4309f0(0x631)][_0x4309f0(0x45a)]===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics[_0x4309f0(0x6c7)]/0x2);if(this['y']===0x0)this['y']=Math[_0x4309f0(0x297)](Graphics['height']/0x2);}},Sprite_Damage[_0x30b69f(0x5fe)][_0x30b69f(0x48c)]=function(_0x14059b){const _0x58b72b=_0x30b69f;let _0x19a06e=Math[_0x58b72b(0x742)](_0x14059b)[_0x58b72b(0x781)]();this[_0x58b72b(0x33c)]()&&(_0x19a06e=VisuMZ[_0x58b72b(0x6a4)](_0x19a06e));const _0x16e7a2=this[_0x58b72b(0x619)](),_0x50b51c=Math[_0x58b72b(0x4ca)](_0x16e7a2*0.75);for(let _0x5cdb64=0x0;_0x5cdb64<_0x19a06e[_0x58b72b(0x303)];_0x5cdb64++){const _0x9053a8=this[_0x58b72b(0x5f8)](_0x50b51c,_0x16e7a2);_0x9053a8[_0x58b72b(0x516)][_0x58b72b(0x397)](_0x19a06e[_0x5cdb64],0x0,0x0,_0x50b51c,_0x16e7a2,_0x58b72b(0x493)),_0x9053a8['x']=(_0x5cdb64-(_0x19a06e['length']-0x1)/0x2)*_0x50b51c,_0x9053a8['dy']=-_0x5cdb64;}},Sprite_Damage['prototype'][_0x30b69f(0x33c)]=function(){const _0x1f1b5e=_0x30b69f;return VisuMZ[_0x1f1b5e(0x5d8)][_0x1f1b5e(0x200)][_0x1f1b5e(0x702)][_0x1f1b5e(0x3f8)];},Sprite_Damage[_0x30b69f(0x5fe)][_0x30b69f(0x616)]=function(){const _0x221890=_0x30b69f;return ColorManager[_0x221890(0x52d)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x546)]=Sprite_Gauge[_0x30b69f(0x5fe)]['gaugeRate'],Sprite_Gauge[_0x30b69f(0x5fe)]['gaugeRate']=function(){const _0x4c2642=_0x30b69f;return VisuMZ[_0x4c2642(0x5d8)][_0x4c2642(0x546)]['call'](this)['clamp'](0x0,0x1);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x6e2)]=Sprite_Gauge['prototype'][_0x30b69f(0x52e)],Sprite_Gauge[_0x30b69f(0x5fe)]['currentValue']=function(){const _0x4be1fd=_0x30b69f;let _0x58ae9f=VisuMZ['CoreEngine'][_0x4be1fd(0x6e2)][_0x4be1fd(0x305)](this);return _0x58ae9f;},Sprite_Gauge['prototype'][_0x30b69f(0x699)]=function(){const _0x1bc5ec=_0x30b69f;let _0x4b999d=this[_0x1bc5ec(0x52e)]();this[_0x1bc5ec(0x33c)]()&&(_0x4b999d=VisuMZ[_0x1bc5ec(0x6a4)](_0x4b999d));const _0xdf83aa=this['bitmapWidth']()-0x1,_0x330135=this[_0x1bc5ec(0x4ab)]?this[_0x1bc5ec(0x4ab)]():this['bitmapHeight']();this['setupValueFont'](),this[_0x1bc5ec(0x516)][_0x1bc5ec(0x397)](_0x4b999d,0x0,0x0,_0xdf83aa,_0x330135,'right');},Sprite_Gauge['prototype'][_0x30b69f(0x2a1)]=function(){return 0x3;},Sprite_Gauge[_0x30b69f(0x5fe)][_0x30b69f(0x33c)]=function(){const _0x535d6d=_0x30b69f;return VisuMZ[_0x535d6d(0x5d8)][_0x535d6d(0x200)][_0x535d6d(0x702)]['DigitGroupingGaugeSprites'];},Sprite_Gauge['prototype'][_0x30b69f(0x616)]=function(){const _0x5b511d=_0x30b69f;return ColorManager[_0x5b511d(0x1ec)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x439)]=Sprite_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x3cf)],Sprite_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x3cf)]=function(){const _0x53dd40=_0x30b69f;this['_pictureName'][_0x53dd40(0x487)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x53dd40(0x439)][_0x53dd40(0x305)](this);},Sprite_Picture['prototype'][_0x30b69f(0x2a2)]=function(_0x191e3f){const _0x11f779=_0x30b69f,_0x1c245e=ImageManager[_0x11f779(0x3ad)],_0x61db55=ImageManager['iconHeight'],_0x13af31=this['_pictureName'][_0x11f779(0x487)](/SMOOTH/i);this[_0x11f779(0x516)]=new Bitmap(_0x1c245e,_0x61db55);const _0x235e75=ImageManager[_0x11f779(0x78e)](_0x11f779(0x635)),_0x65c73e=_0x191e3f%0x10*_0x1c245e,_0x5bbc71=Math[_0x11f779(0x4ca)](_0x191e3f/0x10)*_0x61db55;this[_0x11f779(0x516)][_0x11f779(0x790)]=_0x13af31,this[_0x11f779(0x516)]['blt'](_0x235e75,_0x65c73e,_0x5bbc71,_0x1c245e,_0x61db55,0x0,0x0,_0x1c245e,_0x61db55);};function _0x5d97(_0x25fa42,_0x78ed47){const _0x43f466=_0x43f4();return _0x5d97=function(_0x5d9754,_0x349f8c){_0x5d9754=_0x5d9754-0x1bb;let _0x34ace4=_0x43f466[_0x5d9754];return _0x34ace4;},_0x5d97(_0x25fa42,_0x78ed47);}function Sprite_TitlePictureButton(){const _0x2b935d=_0x30b69f;this[_0x2b935d(0x6f5)](...arguments);}Sprite_TitlePictureButton[_0x30b69f(0x5fe)]=Object['create'](Sprite_Clickable[_0x30b69f(0x5fe)]),Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x815)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(_0x453f38){const _0x3f70cf=_0x30b69f;Sprite_Clickable[_0x3f70cf(0x5fe)][_0x3f70cf(0x6f5)][_0x3f70cf(0x305)](this),this[_0x3f70cf(0x329)]=_0x453f38,this[_0x3f70cf(0x66d)]=null,this[_0x3f70cf(0x835)]();},Sprite_TitlePictureButton[_0x30b69f(0x5fe)]['setup']=function(){const _0x5a0fb6=_0x30b69f;this['x']=Graphics['width'],this['y']=Graphics['height'],this[_0x5a0fb6(0x430)]=![],this[_0x5a0fb6(0x27d)]();},Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x27d)]=function(){const _0x46f28c=_0x30b69f;this['bitmap']=ImageManager[_0x46f28c(0x610)](this['_data'][_0x46f28c(0x1fe)]),this[_0x46f28c(0x516)][_0x46f28c(0x751)](this[_0x46f28c(0x566)][_0x46f28c(0x3f2)](this));},Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x566)]=function(){const _0x3200c9=_0x30b69f;this[_0x3200c9(0x329)][_0x3200c9(0x2fa)]['call'](this),this[_0x3200c9(0x329)][_0x3200c9(0x674)][_0x3200c9(0x305)](this),this['setClickHandler'](this[_0x3200c9(0x329)][_0x3200c9(0x63b)][_0x3200c9(0x3f2)](this));},Sprite_TitlePictureButton[_0x30b69f(0x5fe)]['update']=function(){const _0x5c582f=_0x30b69f;Sprite_Clickable['prototype'][_0x5c582f(0x202)]['call'](this),this[_0x5c582f(0x2a9)](),this[_0x5c582f(0x38c)]();},Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x40a)]=function(){const _0xe038d9=_0x30b69f;return VisuMZ[_0xe038d9(0x5d8)][_0xe038d9(0x200)][_0xe038d9(0x4a1)][_0xe038d9(0x7b5)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton['prototype'][_0x30b69f(0x2a9)]=function(){const _0x201547=_0x30b69f;this[_0x201547(0x526)]||this[_0x201547(0x4ea)]?this[_0x201547(0x6e4)]=0xff:(this['opacity']+=this[_0x201547(0x430)]?this[_0x201547(0x40a)]():-0x1*this[_0x201547(0x40a)](),this[_0x201547(0x6e4)]=Math[_0x201547(0x522)](0xc0,this[_0x201547(0x6e4)]));},Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x83a)]=function(_0x40612b){const _0x3bb9b6=_0x30b69f;this[_0x3bb9b6(0x66d)]=_0x40612b;},Sprite_TitlePictureButton[_0x30b69f(0x5fe)][_0x30b69f(0x837)]=function(){const _0x313c00=_0x30b69f;this[_0x313c00(0x66d)]&&this['_clickHandler']();},VisuMZ[_0x30b69f(0x5d8)]['Spriteset_Base_initialize']=Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x10eead=_0x30b69f;VisuMZ[_0x10eead(0x5d8)][_0x10eead(0x821)][_0x10eead(0x305)](this),this[_0x10eead(0x581)]();},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x581)]=function(){const _0x3a8d54=_0x30b69f;this[_0x3a8d54(0x658)]=[],this[_0x3a8d54(0x334)]=[],this[_0x3a8d54(0x54d)]=this[_0x3a8d54(0x336)]['x'],this['_cacheScaleY']=this[_0x3a8d54(0x336)]['y'];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x584)]=Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x60f)],Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x60f)]=function(_0x2f74b7){const _0x32d0cb=_0x30b69f;this[_0x32d0cb(0x37e)](),this[_0x32d0cb(0x4b6)](),VisuMZ[_0x32d0cb(0x5d8)][_0x32d0cb(0x584)][_0x32d0cb(0x305)](this,_0x2f74b7);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x788)]=Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x202)],Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x202)]=function(){const _0xe01429=_0x30b69f;VisuMZ['CoreEngine']['Spriteset_Base_update'][_0xe01429(0x305)](this),this[_0xe01429(0x80c)](),this[_0xe01429(0x268)](),this['updatePointAnimations']();},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x80c)]=function(){const _0x139165=_0x30b69f;if(!VisuMZ[_0x139165(0x5d8)][_0x139165(0x200)][_0x139165(0x702)][_0x139165(0x494)])return;if(this[_0x139165(0x54d)]===this[_0x139165(0x336)]['x']&&this[_0x139165(0x404)]===this[_0x139165(0x336)]['y'])return;this[_0x139165(0x688)](),this[_0x139165(0x54d)]=this[_0x139165(0x336)]['x'],this[_0x139165(0x404)]=this['scale']['y'];},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x688)]=function(){const _0x105705=_0x30b69f;this[_0x105705(0x336)]['x']!==0x0&&(this[_0x105705(0x55a)][_0x105705(0x336)]['x']=0x1/this[_0x105705(0x336)]['x'],this[_0x105705(0x55a)]['x']=-(this['x']/this[_0x105705(0x336)]['x'])),this[_0x105705(0x336)]['y']!==0x0&&(this['_pictureContainer']['scale']['y']=0x1/this[_0x105705(0x336)]['y'],this[_0x105705(0x55a)]['y']=-(this['y']/this[_0x105705(0x336)]['y']));},VisuMZ[_0x30b69f(0x5d8)]['Spriteset_Base_updatePosition']=Spriteset_Base['prototype'][_0x30b69f(0x211)],Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x211)]=function(){const _0xb76919=_0x30b69f;VisuMZ['CoreEngine'][_0xb76919(0x213)][_0xb76919(0x305)](this),this[_0xb76919(0x46a)]();},Spriteset_Base[_0x30b69f(0x5fe)]['updatePositionCoreEngine']=function(){const _0x1af50d=_0x30b69f;if(!$gameScreen)return;if($gameScreen[_0x1af50d(0x6c2)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x1af50d(0x72f)]());const _0x41dca9=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0x1af50d(0x37d):this[_0x1af50d(0x375)]();break;case'horizontal':this['updatePositionCoreEngineShakeHorz']();break;case _0x1af50d(0x7da):this['updatePositionCoreEngineShakeVert']();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x375)]=function(){const _0x489528=_0x30b69f,_0x5d07e5=VisuMZ[_0x489528(0x5d8)][_0x489528(0x200)][_0x489528(0x654)];if(_0x5d07e5&&_0x5d07e5[_0x489528(0x814)])return _0x5d07e5[_0x489528(0x814)]['call'](this);this['x']+=Math[_0x489528(0x297)]($gameScreen[_0x489528(0x72f)]());},Spriteset_Base['prototype'][_0x30b69f(0x4cc)]=function(){const _0x2d6f47=_0x30b69f,_0xfa694f=VisuMZ['CoreEngine']['Settings'][_0x2d6f47(0x654)];if(_0xfa694f&&_0xfa694f[_0x2d6f47(0x6d8)])return _0xfa694f[_0x2d6f47(0x6d8)][_0x2d6f47(0x305)](this);const _0x162ff7=$gameScreen[_0x2d6f47(0x4fc)]*0.75,_0x4a09b6=$gameScreen[_0x2d6f47(0x238)]*0.6,_0x4eb16e=$gameScreen[_0x2d6f47(0x6c2)];this['x']+=Math[_0x2d6f47(0x297)](Math[_0x2d6f47(0x378)](_0x162ff7)-Math[_0x2d6f47(0x378)](_0x4a09b6))*(Math['min'](_0x4eb16e,0x1e)*0.5),this['y']+=Math[_0x2d6f47(0x297)](Math[_0x2d6f47(0x378)](_0x162ff7)-Math[_0x2d6f47(0x378)](_0x4a09b6))*(Math[_0x2d6f47(0x522)](_0x4eb16e,0x1e)*0.5);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x495)]=function(){const _0x1d272e=_0x30b69f,_0x1855d2=VisuMZ[_0x1d272e(0x5d8)][_0x1d272e(0x200)][_0x1d272e(0x654)];if(_0x1855d2&&_0x1855d2['horzJS'])return _0x1855d2[_0x1d272e(0x6b6)][_0x1d272e(0x305)](this);const _0x5e036d=$gameScreen[_0x1d272e(0x4fc)]*0.75,_0x5495aa=$gameScreen[_0x1d272e(0x238)]*0.6,_0x183d61=$gameScreen[_0x1d272e(0x6c2)];this['x']+=Math[_0x1d272e(0x297)](Math[_0x1d272e(0x378)](_0x5e036d)-Math[_0x1d272e(0x378)](_0x5495aa))*(Math[_0x1d272e(0x522)](_0x183d61,0x1e)*0.5);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x205)]=function(){const _0x37c4fd=_0x30b69f,_0x5f5915=VisuMZ[_0x37c4fd(0x5d8)][_0x37c4fd(0x200)][_0x37c4fd(0x654)];if(_0x5f5915&&_0x5f5915['vertJS'])return _0x5f5915[_0x37c4fd(0x6d3)][_0x37c4fd(0x305)](this);const _0x1a36eb=$gameScreen[_0x37c4fd(0x4fc)]*0.75,_0x55e6b7=$gameScreen[_0x37c4fd(0x238)]*0.6,_0x5c8977=$gameScreen['_shakeDuration'];this['y']+=Math[_0x37c4fd(0x297)](Math[_0x37c4fd(0x378)](_0x1a36eb)-Math['randomInt'](_0x55e6b7))*(Math[_0x37c4fd(0x522)](_0x5c8977,0x1e)*0.5);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x268)]=function(){const _0x2af4e0=_0x30b69f;for(const _0xda2c96 of this['_fauxAnimationSprites']){!_0xda2c96['isPlaying']()&&this[_0x2af4e0(0x2e4)](_0xda2c96);}this[_0x2af4e0(0x2d2)]();},Spriteset_Base['prototype'][_0x30b69f(0x2d2)]=function(){const _0x44a457=_0x30b69f;for(;;){const _0x385188=$gameTemp[_0x44a457(0x737)]();if(_0x385188)this['createFauxAnimation'](_0x385188);else break;}},Spriteset_Base['prototype'][_0x30b69f(0x228)]=function(_0x26764a){const _0xee2e2d=_0x30b69f,_0x31090d=$dataAnimations[_0x26764a[_0xee2e2d(0x6d7)]],_0xb799b8=_0x26764a[_0xee2e2d(0x372)],_0x52eece=_0x26764a['mirror'],_0x139290=_0x26764a[_0xee2e2d(0x4c1)];let _0x5a2ee0=this['animationBaseDelay']();const _0x15a95a=this[_0xee2e2d(0x5a5)]();if(this[_0xee2e2d(0x359)](_0x31090d))for(const _0x2cf2d1 of _0xb799b8){this[_0xee2e2d(0x609)]([_0x2cf2d1],_0x31090d,_0x52eece,_0x5a2ee0,_0x139290),_0x5a2ee0+=_0x15a95a;}else this[_0xee2e2d(0x609)](_0xb799b8,_0x31090d,_0x52eece,_0x5a2ee0,_0x139290);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x609)]=function(_0x5c61ab,_0x4f0a14,_0x33f34e,_0x4d353d,_0x15aee1){const _0x217e6b=_0x30b69f,_0x5a873b=this['isMVAnimation'](_0x4f0a14),_0x393c1c=new(_0x5a873b?Sprite_AnimationMV:Sprite_Animation)(),_0x585331=this[_0x217e6b(0x595)](_0x5c61ab);this[_0x217e6b(0x620)](_0x5c61ab[0x0])&&(_0x33f34e=!_0x33f34e),_0x393c1c['targetObjects']=_0x5c61ab,_0x393c1c[_0x217e6b(0x835)](_0x585331,_0x4f0a14,_0x33f34e,_0x4d353d),_0x393c1c['setMute'](_0x15aee1),this[_0x217e6b(0x38e)][_0x217e6b(0x7f9)](_0x393c1c),this[_0x217e6b(0x658)][_0x217e6b(0x327)](_0x393c1c);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x2e4)]=function(_0x29ed22){const _0x36c19f=_0x30b69f;this[_0x36c19f(0x658)][_0x36c19f(0x708)](_0x29ed22),this[_0x36c19f(0x38e)]['removeChild'](_0x29ed22);for(const _0x4ced31 of _0x29ed22[_0x36c19f(0x73f)]){_0x4ced31[_0x36c19f(0x648)]&&_0x4ced31['endAnimation']();}_0x29ed22[_0x36c19f(0x60f)]();},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x37e)]=function(){const _0x4a40f6=_0x30b69f;for(const _0x51151a of this[_0x4a40f6(0x658)]){this[_0x4a40f6(0x2e4)](_0x51151a);}},Spriteset_Base[_0x30b69f(0x5fe)]['isFauxAnimationPlaying']=function(){const _0x4fcf01=_0x30b69f;return this[_0x4fcf01(0x658)][_0x4fcf01(0x303)]>0x0;},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x405)]=function(){const _0x57e51a=_0x30b69f;for(const _0x33bd84 of this[_0x57e51a(0x334)]){!_0x33bd84[_0x57e51a(0x6f1)]()&&this['removePointAnimation'](_0x33bd84);}this['processPointAnimationRequests']();},Spriteset_Base[_0x30b69f(0x5fe)]['processPointAnimationRequests']=function(){const _0xc79601=_0x30b69f;for(;;){const _0x7ae594=$gameTemp[_0xc79601(0x51c)]();if(_0x7ae594)this['createPointAnimation'](_0x7ae594);else break;}},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x83b)]=function(_0x304f3){const _0x4f109d=_0x30b69f,_0x433251=$dataAnimations[_0x304f3[_0x4f109d(0x6d7)]],_0x48aeec=this[_0x4f109d(0x435)](_0x304f3),_0x5e63ba=_0x304f3[_0x4f109d(0x488)],_0x17c1b0=_0x304f3[_0x4f109d(0x4c1)];let _0x19b82b=this[_0x4f109d(0x6f3)]();const _0x4b55b3=this[_0x4f109d(0x5a5)]();if(this[_0x4f109d(0x359)](_0x433251))for(const _0x166c79 of _0x48aeec){this[_0x4f109d(0x68d)]([_0x166c79],_0x433251,_0x5e63ba,_0x19b82b,_0x17c1b0),_0x19b82b+=_0x4b55b3;}else this[_0x4f109d(0x68d)](_0x48aeec,_0x433251,_0x5e63ba,_0x19b82b,_0x17c1b0);},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x435)]=function(_0x5062e2){const _0x34d85f=_0x30b69f,_0x424425=new Sprite_Clickable();_0x424425['x']=_0x5062e2['x'],_0x424425['y']=_0x5062e2['y'],_0x424425['z']=0x64;const _0x174031=this[_0x34d85f(0x4aa)]();return _0x174031[_0x34d85f(0x7f9)](_0x424425),[_0x424425];},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x4aa)]=function(){return this;},Spriteset_Map[_0x30b69f(0x5fe)][_0x30b69f(0x4aa)]=function(){const _0x21ee03=_0x30b69f;return this[_0x21ee03(0x49a)]||this;},Spriteset_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x4aa)]=function(){const _0x56c72c=_0x30b69f;return this[_0x56c72c(0x5ae)]||this;},Spriteset_Base[_0x30b69f(0x5fe)]['createPointAnimationSprite']=function(_0x300491,_0x3de039,_0x12b95a,_0x5e3c90,_0x34e110){const _0xc6efe1=_0x30b69f,_0x41de33=this[_0xc6efe1(0x51e)](_0x3de039),_0x5b0b9f=new(_0x41de33?Sprite_AnimationMV:Sprite_Animation)();_0x5b0b9f['targetObjects']=_0x300491,_0x5b0b9f[_0xc6efe1(0x835)](_0x300491,_0x3de039,_0x12b95a,_0x5e3c90),_0x5b0b9f[_0xc6efe1(0x3d1)](_0x34e110),this[_0xc6efe1(0x38e)][_0xc6efe1(0x7f9)](_0x5b0b9f),this[_0xc6efe1(0x334)][_0xc6efe1(0x327)](_0x5b0b9f);},Spriteset_Base[_0x30b69f(0x5fe)]['removePointAnimation']=function(_0x347c2a){const _0x5b5681=_0x30b69f;this[_0x5b5681(0x334)][_0x5b5681(0x708)](_0x347c2a),this[_0x5b5681(0x38e)][_0x5b5681(0x3bc)](_0x347c2a);for(const _0xe83106 of _0x347c2a[_0x5b5681(0x73f)]){_0xe83106[_0x5b5681(0x648)]&&_0xe83106[_0x5b5681(0x648)]();const _0x397ee1=this['getPointAnimationLayer']();if(_0x397ee1)_0x397ee1[_0x5b5681(0x3bc)](_0xe83106);}_0x347c2a[_0x5b5681(0x60f)]();},Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x4b6)]=function(){const _0x5ae9e2=_0x30b69f;for(const _0x4ec1af of this[_0x5ae9e2(0x334)]){this[_0x5ae9e2(0x7bc)](_0x4ec1af);}},Spriteset_Base[_0x30b69f(0x5fe)]['isPointAnimationPlaying']=function(){const _0x4c6858=_0x30b69f;return this[_0x4c6858(0x334)]['length']>0x0;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x26a)]=Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x403)],Spriteset_Base[_0x30b69f(0x5fe)][_0x30b69f(0x403)]=function(){const _0x12040b=_0x30b69f;return VisuMZ[_0x12040b(0x5d8)][_0x12040b(0x26a)][_0x12040b(0x305)](this)||this[_0x12040b(0x650)]();},Spriteset_Battle[_0x30b69f(0x5fe)]['createBackground']=function(){const _0x59369e=_0x30b69f;this[_0x59369e(0x38a)]=new PIXI['filters'][(_0x59369e(0x3b6))](clamp=!![]),this[_0x59369e(0x83e)]=new Sprite(),this[_0x59369e(0x83e)][_0x59369e(0x516)]=SceneManager[_0x59369e(0x7e9)](),this[_0x59369e(0x83e)][_0x59369e(0x382)]=[this[_0x59369e(0x38a)]],this[_0x59369e(0x816)][_0x59369e(0x7f9)](this[_0x59369e(0x83e)]);},VisuMZ[_0x30b69f(0x5d8)]['Spriteset_Battle_createEnemies']=Spriteset_Battle['prototype'][_0x30b69f(0x203)],Spriteset_Battle[_0x30b69f(0x5fe)]['createEnemies']=function(){const _0x394c54=_0x30b69f;this[_0x394c54(0x701)]()&&this[_0x394c54(0x1be)](),VisuMZ[_0x394c54(0x5d8)][_0x394c54(0x730)][_0x394c54(0x305)](this);},Spriteset_Battle['prototype'][_0x30b69f(0x701)]=function(){const _0x3ec1fb=_0x30b69f,_0xcb1328=VisuMZ[_0x3ec1fb(0x5d8)][_0x3ec1fb(0x200)][_0x3ec1fb(0x4c9)];if(!_0xcb1328)return![];if(Utils[_0x3ec1fb(0x36a)]>=_0x3ec1fb(0x22c)&&!_0xcb1328[_0x3ec1fb(0x43b)])return![];return _0xcb1328['RepositionEnemies'];},Spriteset_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x1be)]=function(){const _0x48eb21=_0x30b69f;for(member of $gameTroop['members']()){member[_0x48eb21(0x453)]();}},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x43d)]=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(_0x245dd5){const _0x48a381=_0x30b69f;_0x245dd5['x']=Math[_0x48a381(0x297)](_0x245dd5['x']),_0x245dd5['y']=Math['round'](_0x245dd5['y']),_0x245dd5['width']=Math[_0x48a381(0x297)](_0x245dd5['width']),_0x245dd5[_0x48a381(0x820)]=Math[_0x48a381(0x297)](_0x245dd5[_0x48a381(0x820)]),this[_0x48a381(0x3f3)](),VisuMZ[_0x48a381(0x5d8)][_0x48a381(0x43d)][_0x48a381(0x305)](this,_0x245dd5),this['initCoreEasing']();},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x3f3)]=function(){const _0x5d8521=_0x30b69f;this[_0x5d8521(0x628)]=VisuMZ[_0x5d8521(0x5d8)][_0x5d8521(0x200)][_0x5d8521(0x702)][_0x5d8521(0x69e)],this['_digitGroupingEx']=VisuMZ['CoreEngine']['Settings'][_0x5d8521(0x702)][_0x5d8521(0x6f7)];},Window_Base['prototype'][_0x30b69f(0x578)]=function(){return VisuMZ['CoreEngine']['Settings']['Window']['LineHeight'];},Window_Base[_0x30b69f(0x5fe)]['itemPadding']=function(){const _0x467f3d=_0x30b69f;return VisuMZ[_0x467f3d(0x5d8)][_0x467f3d(0x200)][_0x467f3d(0x78d)][_0x467f3d(0x2cf)];},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x1e2)]=function(){const _0xeb483e=_0x30b69f;$gameSystem[_0xeb483e(0x48e)]?this[_0xeb483e(0x811)]=$gameSystem[_0xeb483e(0x48e)]():this['backOpacity']=VisuMZ[_0xeb483e(0x5d8)][_0xeb483e(0x200)][_0xeb483e(0x78d)][_0xeb483e(0x1e5)];},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x39f)]=function(){const _0x1a0a09=_0x30b69f;return VisuMZ['CoreEngine']['Settings'][_0x1a0a09(0x78d)][_0x1a0a09(0x615)];},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x47c)]=function(){return VisuMZ['CoreEngine']['Settings']['Window']['OpenSpeed'];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x558)]=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x202)],Window_Base['prototype'][_0x30b69f(0x202)]=function(){const _0x4c972b=_0x30b69f;VisuMZ['CoreEngine'][_0x4c972b(0x558)]['call'](this),this['updateCoreEasing']();},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x4c7)]=function(){const _0x3d1428=_0x30b69f;this[_0x3d1428(0x3ff)]&&(this[_0x3d1428(0x662)]+=this['openingSpeed'](),this[_0x3d1428(0x1f9)]()&&(this[_0x3d1428(0x3ff)]=![]));},Window_Base['prototype'][_0x30b69f(0x6d1)]=function(){const _0x2b2c12=_0x30b69f;this[_0x2b2c12(0x3c1)]&&(this[_0x2b2c12(0x662)]-=this['openingSpeed'](),this['isClosed']()&&(this[_0x2b2c12(0x3c1)]=![]));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x848)]=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x397)],Window_Base[_0x30b69f(0x5fe)]['drawText']=function(_0x19af9b,_0x576a93,_0x1351e6,_0x31d7b7,_0x21e888){const _0xb29e2=_0x30b69f;if(this['useDigitGrouping']())_0x19af9b=VisuMZ[_0xb29e2(0x6a4)](_0x19af9b);VisuMZ[_0xb29e2(0x5d8)][_0xb29e2(0x848)][_0xb29e2(0x305)](this,_0x19af9b,_0x576a93,_0x1351e6,_0x31d7b7,_0x21e888);},Window_Base[_0x30b69f(0x5fe)]['useDigitGrouping']=function(){const _0x7d7fb1=_0x30b69f;return this[_0x7d7fb1(0x628)];},VisuMZ[_0x30b69f(0x5d8)]['Window_Base_createTextState']=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x5e1)],Window_Base['prototype'][_0x30b69f(0x5e1)]=function(_0x5a9aef,_0x9dcfa4,_0x43ff5e,_0x4393f5){const _0x2b83e4=_0x30b69f;var _0x435910=VisuMZ[_0x2b83e4(0x5d8)]['Window_Base_createTextState']['call'](this,_0x5a9aef,_0x9dcfa4,_0x43ff5e,_0x4393f5);if(this['useDigitGroupingEx']())_0x435910[_0x2b83e4(0x612)]=VisuMZ[_0x2b83e4(0x6a4)](_0x435910[_0x2b83e4(0x612)]);return _0x435910;},Window_Base['prototype'][_0x30b69f(0x642)]=function(){const _0x1cdce9=_0x30b69f;return this[_0x1cdce9(0x381)];},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x762)]=function(_0x41efc1){const _0x30b70b=_0x30b69f;this[_0x30b70b(0x628)]=_0x41efc1;},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x5ab)]=function(_0x43fdb4){this['_digitGroupingEx']=_0x43fdb4;},VisuMZ[_0x30b69f(0x5d8)]['Window_Base_drawIcon']=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x445)],Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x445)]=function(_0x3d79e8,_0x44b34d,_0x3ed2fe){const _0x487867=_0x30b69f;_0x44b34d=Math[_0x487867(0x297)](_0x44b34d),_0x3ed2fe=Math[_0x487867(0x297)](_0x3ed2fe),VisuMZ[_0x487867(0x5d8)]['Window_Base_drawIcon'][_0x487867(0x305)](this,_0x3d79e8,_0x44b34d,_0x3ed2fe);},VisuMZ['CoreEngine'][_0x30b69f(0x1d8)]=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x7ac)],Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x7ac)]=function(_0x1e608e,_0x14b561,_0x5da4e5,_0x2a4666,_0x4527d3,_0x35d752){const _0x2e7697=_0x30b69f;_0x4527d3=_0x4527d3||ImageManager[_0x2e7697(0x242)],_0x35d752=_0x35d752||ImageManager[_0x2e7697(0x5c1)],_0x5da4e5=Math[_0x2e7697(0x297)](_0x5da4e5),_0x2a4666=Math[_0x2e7697(0x297)](_0x2a4666),_0x4527d3=Math[_0x2e7697(0x297)](_0x4527d3),_0x35d752=Math[_0x2e7697(0x297)](_0x35d752),VisuMZ[_0x2e7697(0x5d8)]['Window_Base_drawFace'][_0x2e7697(0x305)](this,_0x1e608e,_0x14b561,_0x5da4e5,_0x2a4666,_0x4527d3,_0x35d752);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x517)]=Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x743)],Window_Base['prototype'][_0x30b69f(0x743)]=function(_0x456497,_0x16baa4,_0x2b51dd,_0x39c109){const _0x18d7e5=_0x30b69f;_0x2b51dd=Math[_0x18d7e5(0x297)](_0x2b51dd),_0x39c109=Math[_0x18d7e5(0x297)](_0x39c109),VisuMZ[_0x18d7e5(0x5d8)][_0x18d7e5(0x517)][_0x18d7e5(0x305)](this,_0x456497,_0x16baa4,_0x2b51dd,_0x39c109);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x805)]=Window_Selectable[_0x30b69f(0x5fe)]['itemRect'],Window_Selectable['prototype'][_0x30b69f(0x597)]=function(_0x228660){const _0x343a64=_0x30b69f;let _0x4c39c6=VisuMZ[_0x343a64(0x5d8)][_0x343a64(0x805)][_0x343a64(0x305)](this,_0x228660);return _0x4c39c6['x']=Math['round'](_0x4c39c6['x']),_0x4c39c6['y']=Math[_0x343a64(0x297)](_0x4c39c6['y']),_0x4c39c6[_0x343a64(0x6c7)]=Math['round'](_0x4c39c6[_0x343a64(0x6c7)]),_0x4c39c6[_0x343a64(0x820)]=Math['round'](_0x4c39c6[_0x343a64(0x820)]),_0x4c39c6;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2fb)]=Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x2b0)],Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x2b0)]=function(_0x437290,_0xe95e49,_0x115336){const _0x4a6842=_0x30b69f;_0xe95e49=Math['round'](_0xe95e49),_0x115336=Math['round'](_0x115336),VisuMZ['CoreEngine'][_0x4a6842(0x2fb)][_0x4a6842(0x305)](this,_0x437290,_0xe95e49,_0x115336);},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x640)]=function(){const _0x21d3e9=_0x30b69f;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x21d3e9(0x5f6),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x21d3e9(0x336)]['x'],'targetScaleY':this[_0x21d3e9(0x336)]['y'],'targetOpacity':this[_0x21d3e9(0x6e4)],'targetBackOpacity':this[_0x21d3e9(0x811)],'targetContentsOpacity':this[_0x21d3e9(0x779)]};},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x64f)]=function(){const _0x254cd6=_0x30b69f;if(!this[_0x254cd6(0x70d)])return;if(this[_0x254cd6(0x70d)][_0x254cd6(0x68e)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x254cd6(0x70d)]['targetX']),this['y']=this[_0x254cd6(0x70a)](this['y'],this[_0x254cd6(0x70d)][_0x254cd6(0x56a)]),this[_0x254cd6(0x336)]['x']=this['applyCoreEasing'](this[_0x254cd6(0x336)]['x'],this[_0x254cd6(0x70d)][_0x254cd6(0x50a)]),this[_0x254cd6(0x336)]['y']=this['applyCoreEasing'](this[_0x254cd6(0x336)]['y'],this['_coreEasing'][_0x254cd6(0x73d)]),this[_0x254cd6(0x6e4)]=this['applyCoreEasing'](this[_0x254cd6(0x6e4)],this[_0x254cd6(0x70d)][_0x254cd6(0x1e1)]),this[_0x254cd6(0x811)]=this[_0x254cd6(0x70a)](this[_0x254cd6(0x811)],this['_coreEasing'][_0x254cd6(0x481)]),this[_0x254cd6(0x779)]=this[_0x254cd6(0x70a)](this['contentsOpacity'],this[_0x254cd6(0x70d)][_0x254cd6(0x567)]),this[_0x254cd6(0x70d)][_0x254cd6(0x68e)]--;},Window_Base[_0x30b69f(0x5fe)]['applyCoreEasing']=function(_0x3a5fde,_0x2c136d){const _0x463291=_0x30b69f;if(!this[_0x463291(0x70d)])return _0x2c136d;const _0x34f60d=this[_0x463291(0x70d)][_0x463291(0x68e)],_0x5c6df1=this[_0x463291(0x70d)][_0x463291(0x71b)],_0x239ab2=this[_0x463291(0x483)]((_0x5c6df1-_0x34f60d)/_0x5c6df1),_0x2a34d0=this['calcCoreEasing']((_0x5c6df1-_0x34f60d+0x1)/_0x5c6df1),_0x4ee623=(_0x3a5fde-_0x2c136d*_0x239ab2)/(0x1-_0x239ab2);return _0x4ee623+(_0x2c136d-_0x4ee623)*_0x2a34d0;},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x483)]=function(_0x3ac747){const _0x4f2c88=_0x30b69f;if(!this[_0x4f2c88(0x70d)])return _0x3ac747;return VisuMZ['ApplyEasing'](_0x3ac747,this['_coreEasing'][_0x4f2c88(0x5cc)]||_0x4f2c88(0x5f6));},Window_Base['prototype'][_0x30b69f(0x82d)]=function(_0x522910,_0x1a9c1a){const _0x11f818=_0x30b69f;if(!this['_coreEasing'])return;this['x']=this[_0x11f818(0x70d)]['targetX'],this['y']=this[_0x11f818(0x70d)][_0x11f818(0x56a)],this[_0x11f818(0x336)]['x']=this[_0x11f818(0x70d)][_0x11f818(0x50a)],this[_0x11f818(0x336)]['y']=this[_0x11f818(0x70d)][_0x11f818(0x73d)],this['opacity']=this[_0x11f818(0x70d)][_0x11f818(0x1e1)],this[_0x11f818(0x811)]=this['_coreEasing'][_0x11f818(0x481)],this[_0x11f818(0x779)]=this[_0x11f818(0x70d)]['targetContentsOpacity'],this[_0x11f818(0x341)](_0x522910,_0x1a9c1a,this['x'],this['y'],this['scale']['x'],this[_0x11f818(0x336)]['y'],this[_0x11f818(0x6e4)],this[_0x11f818(0x811)],this[_0x11f818(0x779)]);},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x341)]=function(_0x95498b,_0x7070e4,_0x319acb,_0x40bc01,_0xf3db61,_0x4aaf17,_0x86fa81,_0x427a6b,_0x30d12f){this['_coreEasing']={'duration':_0x95498b,'wholeDuration':_0x95498b,'type':_0x7070e4,'targetX':_0x319acb,'targetY':_0x40bc01,'targetScaleX':_0xf3db61,'targetScaleY':_0x4aaf17,'targetOpacity':_0x86fa81,'targetBackOpacity':_0x427a6b,'targetContentsOpacity':_0x30d12f};},Window_Base[_0x30b69f(0x5fe)][_0x30b69f(0x771)]=function(_0x257863,_0x3de3d5,_0x449d19,_0x38999e,_0x31b8e1){const _0x1815e7=_0x30b69f;this[_0x1815e7(0x319)](),this[_0x1815e7(0x3ea)][_0x1815e7(0x619)]=VisuMZ[_0x1815e7(0x5d8)][_0x1815e7(0x200)][_0x1815e7(0x3b4)][_0x1815e7(0x4ba)];const _0x520219=VisuMZ['CoreEngine'][_0x1815e7(0x200)][_0x1815e7(0x3b4)][_0x1815e7(0x839)];if(_0x520219>0x0&&_0x3de3d5===TextManager[_0x1815e7(0x34c)]){const _0x522d52=_0x38999e+(this[_0x1815e7(0x578)]()-ImageManager[_0x1815e7(0x48f)])/0x2;this['drawIcon'](_0x520219,_0x449d19+(_0x31b8e1-ImageManager[_0x1815e7(0x3ad)]),_0x522d52),_0x31b8e1-=ImageManager[_0x1815e7(0x3ad)]+0x4;}else this['changeTextColor'](ColorManager[_0x1815e7(0x5f0)]()),this[_0x1815e7(0x397)](_0x3de3d5,_0x449d19,_0x38999e,_0x31b8e1,_0x1815e7(0x42d)),_0x31b8e1-=this[_0x1815e7(0x53a)](_0x3de3d5)+0x6;this[_0x1815e7(0x1d1)]();const _0x2c107e=this[_0x1815e7(0x53a)](this[_0x1815e7(0x628)]?VisuMZ[_0x1815e7(0x6a4)](_0x257863):_0x257863);_0x2c107e>_0x31b8e1?this[_0x1815e7(0x397)](VisuMZ[_0x1815e7(0x5d8)][_0x1815e7(0x200)]['Gold'][_0x1815e7(0x7ff)],_0x449d19,_0x38999e,_0x31b8e1,_0x1815e7(0x42d)):this['drawText'](_0x257863,_0x449d19,_0x38999e,_0x31b8e1,_0x1815e7(0x42d)),this[_0x1815e7(0x319)]();},Window_Base[_0x30b69f(0x5fe)]['drawIconBySize']=function(_0x232661,_0x18ba30,_0x1a153c,_0x432871,_0x9791cd){const _0x20f8f9=_0x30b69f,_0x584d30=ImageManager[_0x20f8f9(0x78e)]('IconSet'),_0x462d7=ImageManager[_0x20f8f9(0x3ad)],_0x4f03a2=ImageManager[_0x20f8f9(0x48f)],_0xf3ef4f=_0x232661%0x10*_0x462d7,_0x1dc084=Math[_0x20f8f9(0x4ca)](_0x232661/0x10)*_0x4f03a2,_0x484766=_0x432871,_0x283c4f=_0x432871;this[_0x20f8f9(0x3ea)][_0x20f8f9(0x29c)][_0x20f8f9(0x66f)]=_0x9791cd,this['contents']['blt'](_0x584d30,_0xf3ef4f,_0x1dc084,_0x462d7,_0x4f03a2,_0x18ba30,_0x1a153c,_0x484766,_0x283c4f),this[_0x20f8f9(0x3ea)]['_context'][_0x20f8f9(0x66f)]=!![];},Window_Base[_0x30b69f(0x5fe)]['drawGauge']=function(_0x22416e,_0x5261a6,_0x3587b9,_0x4fee63,_0x3ee1f1,_0x37182a){const _0x38b8c9=_0x30b69f,_0x19e21a=Math[_0x38b8c9(0x4ca)]((_0x3587b9-0x2)*_0x4fee63),_0x39adab=Sprite_Gauge[_0x38b8c9(0x5fe)][_0x38b8c9(0x24f)][_0x38b8c9(0x305)](this),_0x2e8ff7=_0x5261a6+this[_0x38b8c9(0x578)]()-_0x39adab-0x2;this[_0x38b8c9(0x3ea)][_0x38b8c9(0x7ef)](_0x22416e,_0x2e8ff7,_0x3587b9,_0x39adab,ColorManager[_0x38b8c9(0x784)]()),this[_0x38b8c9(0x3ea)]['gradientFillRect'](_0x22416e+0x1,_0x2e8ff7+0x1,_0x19e21a,_0x39adab-0x2,_0x3ee1f1,_0x37182a);},Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x854)]=function(_0x3dea95){const _0x386ab3=_0x30b69f;let _0xc2060a=this['index']();const _0x65777a=this[_0x386ab3(0x474)](),_0xb37c13=this['maxCols']();if(this[_0x386ab3(0x551)]()&&(_0xc2060a<_0x65777a||_0x3dea95&&_0xb37c13===0x1)){_0xc2060a+=_0xb37c13;if(_0xc2060a>=_0x65777a)_0xc2060a=_0x65777a-0x1;this['smoothSelect'](_0xc2060a);}else!this[_0x386ab3(0x551)]()&&((_0xc2060a<_0x65777a-_0xb37c13||_0x3dea95&&_0xb37c13===0x1)&&this[_0x386ab3(0x423)]((_0xc2060a+_0xb37c13)%_0x65777a));},VisuMZ[_0x30b69f(0x5d8)]['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x30b69f(0x854)],Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x854)]=function(_0x5dd457){const _0x2e09ee=_0x30b69f;this[_0x2e09ee(0x551)]()&&_0x5dd457&&this[_0x2e09ee(0x54e)]()===0x1&&this[_0x2e09ee(0x24d)]()===this[_0x2e09ee(0x474)]()-0x1?this[_0x2e09ee(0x423)](0x0):VisuMZ['CoreEngine'][_0x2e09ee(0x4e8)][_0x2e09ee(0x305)](this,_0x5dd457);},Window_Selectable['prototype'][_0x30b69f(0x41b)]=function(_0xf6f315){const _0x55307b=_0x30b69f;let _0x5bd617=Math[_0x55307b(0x7fd)](0x0,this[_0x55307b(0x24d)]());const _0x12a986=this['maxItems'](),_0x2444f4=this['maxCols']();if(this['isUseModernControls']()&&_0x5bd617>0x0||_0xf6f315&&_0x2444f4===0x1){_0x5bd617-=_0x2444f4;if(_0x5bd617<=0x0)_0x5bd617=0x0;this['smoothSelect'](_0x5bd617);}else!this[_0x55307b(0x551)]()&&((_0x5bd617>=_0x2444f4||_0xf6f315&&_0x2444f4===0x1)&&this[_0x55307b(0x423)]((_0x5bd617-_0x2444f4+_0x12a986)%_0x12a986));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x1e6)]=Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x41b)],Window_Selectable[_0x30b69f(0x5fe)]['cursorUp']=function(_0x497c67){const _0x347f9c=_0x30b69f;this[_0x347f9c(0x551)]()&&_0x497c67&&this['maxCols']()===0x1&&this[_0x347f9c(0x24d)]()===0x0?this[_0x347f9c(0x423)](this['maxItems']()-0x1):VisuMZ[_0x347f9c(0x5d8)][_0x347f9c(0x1e6)][_0x347f9c(0x305)](this,_0x497c67);},Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x551)]=function(){const _0x38928b=_0x30b69f;return VisuMZ[_0x38928b(0x5d8)][_0x38928b(0x200)][_0x38928b(0x702)][_0x38928b(0x68f)];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x5a3)]=Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x774)],Window_Selectable['prototype'][_0x30b69f(0x774)]=function(){const _0x5a961a=_0x30b69f;this[_0x5a961a(0x551)]()?(this[_0x5a961a(0x271)](),this[_0x5a961a(0x1f3)]()):VisuMZ[_0x5a961a(0x5d8)]['Window_Selectable_processCursorMove'][_0x5a961a(0x305)](this);},Window_Selectable['prototype'][_0x30b69f(0x37b)]=function(){return!![];},Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x271)]=function(){const _0x3a2752=_0x30b69f;if(this['isCursorMovable']()){const _0x1b20cd=this[_0x3a2752(0x24d)]();Input[_0x3a2752(0x58e)](_0x3a2752(0x76b))&&(Input['isPressed']('shift')&&this[_0x3a2752(0x37b)]()?this[_0x3a2752(0x587)]():this[_0x3a2752(0x854)](Input[_0x3a2752(0x5ee)]('down'))),Input[_0x3a2752(0x58e)]('up')&&(Input[_0x3a2752(0x81c)](_0x3a2752(0x1c6))&&this['allowShiftScrolling']()?this['cursorPageup']():this[_0x3a2752(0x41b)](Input['isTriggered']('up'))),Input[_0x3a2752(0x58e)](_0x3a2752(0x42d))&&this['cursorRight'](Input[_0x3a2752(0x5ee)](_0x3a2752(0x42d))),Input[_0x3a2752(0x58e)](_0x3a2752(0x320))&&this[_0x3a2752(0x5ad)](Input['isTriggered']('left')),!this['isHandled'](_0x3a2752(0x632))&&Input[_0x3a2752(0x58e)](_0x3a2752(0x632))&&this[_0x3a2752(0x587)](),!this['isHandled'](_0x3a2752(0x5ea))&&Input['isRepeated'](_0x3a2752(0x5ea))&&this[_0x3a2752(0x643)](),this[_0x3a2752(0x24d)]()!==_0x1b20cd&&this[_0x3a2752(0x362)]();}},Window_Selectable[_0x30b69f(0x5fe)]['processCursorHomeEndTrigger']=function(){const _0x38a80c=_0x30b69f;if(this[_0x38a80c(0x6de)]()){const _0x383ba9=this[_0x38a80c(0x24d)]();Input['isTriggered'](_0x38a80c(0x2ab))&&this[_0x38a80c(0x423)](Math[_0x38a80c(0x522)](this[_0x38a80c(0x24d)](),0x0)),Input[_0x38a80c(0x5ee)]('end')&&this['smoothSelect'](Math[_0x38a80c(0x7fd)](this[_0x38a80c(0x24d)](),this[_0x38a80c(0x474)]()-0x1)),this[_0x38a80c(0x24d)]()!==_0x383ba9&&this['playCursorSound']();}},VisuMZ['CoreEngine']['Window_Selectable_processTouch']=Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x38c)],Window_Selectable[_0x30b69f(0x5fe)]['processTouch']=function(){const _0xef231f=_0x30b69f;this['isUseModernControls']()?this[_0xef231f(0x41e)]():VisuMZ['CoreEngine'][_0xef231f(0x4b3)]['call'](this);},Window_Selectable['prototype'][_0x30b69f(0x41e)]=function(){const _0x4cb18e=_0x30b69f;VisuMZ[_0x4cb18e(0x5d8)]['Window_Selectable_processTouch'][_0x4cb18e(0x305)](this);},Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x58b)]=function(){const _0x4e1f04=_0x30b69f;return VisuMZ[_0x4e1f04(0x5d8)][_0x4e1f04(0x200)]['Window']['ColSpacing'];},Window_Selectable['prototype'][_0x30b69f(0x5b0)]=function(){const _0x2ca1c3=_0x30b69f;return VisuMZ[_0x2ca1c3(0x5d8)][_0x2ca1c3(0x200)][_0x2ca1c3(0x78d)][_0x2ca1c3(0x510)];},Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x840)]=function(){const _0x2ed922=_0x30b69f;return Window_Scrollable['prototype'][_0x2ed922(0x840)]['call'](this)+VisuMZ[_0x2ed922(0x5d8)][_0x2ed922(0x200)]['Window'][_0x2ed922(0x4dc)];;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x52c)]=Window_Selectable[_0x30b69f(0x5fe)][_0x30b69f(0x50f)],Window_Selectable['prototype']['drawBackgroundRect']=function(_0xc06f30){const _0x54e49d=_0x30b69f,_0x4047a4=VisuMZ[_0x54e49d(0x5d8)][_0x54e49d(0x200)][_0x54e49d(0x78d)];if(_0x4047a4[_0x54e49d(0x700)]===![])return;_0x4047a4[_0x54e49d(0x4a5)]?_0x4047a4['DrawItemBackgroundJS'][_0x54e49d(0x305)](this,_0xc06f30):VisuMZ[_0x54e49d(0x5d8)][_0x54e49d(0x52c)][_0x54e49d(0x305)](this,_0xc06f30);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x61c)]=Window_Gold[_0x30b69f(0x5fe)][_0x30b69f(0x4af)],Window_Gold[_0x30b69f(0x5fe)]['refresh']=function(){const _0x5b15a4=_0x30b69f;this[_0x5b15a4(0x440)]()?this[_0x5b15a4(0x447)]():VisuMZ['CoreEngine'][_0x5b15a4(0x61c)][_0x5b15a4(0x305)](this);},Window_Gold['prototype'][_0x30b69f(0x440)]=function(){const _0x974313=_0x30b69f;if(TextManager['currencyUnit']!==this[_0x974313(0x34c)]())return![];return VisuMZ['CoreEngine'][_0x974313(0x200)]['Gold'][_0x974313(0x355)];},Window_Gold['prototype'][_0x30b69f(0x447)]=function(){const _0x5873b3=_0x30b69f;this[_0x5873b3(0x319)](),this[_0x5873b3(0x3ea)][_0x5873b3(0x503)](),this[_0x5873b3(0x3ea)][_0x5873b3(0x619)]=VisuMZ[_0x5873b3(0x5d8)][_0x5873b3(0x200)][_0x5873b3(0x3b4)][_0x5873b3(0x4ba)];const _0x95304d=VisuMZ[_0x5873b3(0x5d8)][_0x5873b3(0x200)]['Gold']['GoldIcon'],_0x4c4e91=this['itemLineRect'](0x0);if(_0x95304d>0x0){const _0x6469be=_0x4c4e91['y']+(this['lineHeight']()-ImageManager[_0x5873b3(0x48f)])/0x2;this['drawIcon'](_0x95304d,_0x4c4e91['x'],_0x6469be);const _0x317ad8=ImageManager[_0x5873b3(0x3ad)]+0x4;_0x4c4e91['x']+=_0x317ad8,_0x4c4e91[_0x5873b3(0x6c7)]-=_0x317ad8;}this['changeTextColor'](ColorManager[_0x5873b3(0x5f0)]()),this[_0x5873b3(0x397)](this[_0x5873b3(0x34c)](),_0x4c4e91['x'],_0x4c4e91['y'],_0x4c4e91['width'],'left');const _0x3911d9=this[_0x5873b3(0x53a)](this[_0x5873b3(0x34c)]())+0x6;;_0x4c4e91['x']+=_0x3911d9,_0x4c4e91['width']-=_0x3911d9,this['resetTextColor']();const _0x4ac9ae=this['value'](),_0x10afd2=this['textWidth'](this[_0x5873b3(0x628)]?VisuMZ['GroupDigits'](this['value']()):this[_0x5873b3(0x7d5)]());_0x10afd2>_0x4c4e91[_0x5873b3(0x6c7)]?this[_0x5873b3(0x397)](VisuMZ[_0x5873b3(0x5d8)][_0x5873b3(0x200)][_0x5873b3(0x3b4)][_0x5873b3(0x7ff)],_0x4c4e91['x'],_0x4c4e91['y'],_0x4c4e91[_0x5873b3(0x6c7)],'right'):this[_0x5873b3(0x397)](this[_0x5873b3(0x7d5)](),_0x4c4e91['x'],_0x4c4e91['y'],_0x4c4e91[_0x5873b3(0x6c7)],'right'),this[_0x5873b3(0x319)]();},Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x2fd)]=function(_0x18020d,_0x30ae9b,_0x3b816e,_0x190450,_0x15c350){const _0x241c16=_0x30b69f;_0x190450=String(_0x190450||'')[_0x241c16(0x62b)]();if(VisuMZ['CoreEngine'][_0x241c16(0x200)]['Param'][_0x241c16(0x258)]){const _0x233a6a=VisuMZ[_0x241c16(0x252)](_0x190450);_0x15c350?(this[_0x241c16(0x833)](_0x233a6a,_0x18020d,_0x30ae9b,this['gaugeLineHeight']()),_0x3b816e-=this[_0x241c16(0x433)]()+0x2,_0x18020d+=this['gaugeLineHeight']()+0x2):(this[_0x241c16(0x445)](_0x233a6a,_0x18020d+0x2,_0x30ae9b+0x2),_0x3b816e-=ImageManager[_0x241c16(0x3ad)]+0x4,_0x18020d+=ImageManager[_0x241c16(0x3ad)]+0x4);}const _0x54f39e=TextManager[_0x241c16(0x1cc)](_0x190450);this[_0x241c16(0x319)](),this[_0x241c16(0x475)](ColorManager['systemColor']()),_0x15c350?(this[_0x241c16(0x3ea)][_0x241c16(0x619)]=this[_0x241c16(0x3a0)](),this[_0x241c16(0x3ea)][_0x241c16(0x397)](_0x54f39e,_0x18020d,_0x30ae9b,_0x3b816e,this['gaugeLineHeight'](),_0x241c16(0x320))):this[_0x241c16(0x397)](_0x54f39e,_0x18020d,_0x30ae9b,_0x3b816e),this['resetFontSettings']();},Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x3a0)]=function(){const _0x52020e=_0x30b69f;return $gameSystem[_0x52020e(0x30f)]()-0x8;},Window_StatusBase[_0x30b69f(0x5fe)]['drawActorClass']=function(_0x5a178e,_0x4db982,_0x23b711,_0x263894){const _0x5a3881=_0x30b69f;_0x263894=_0x263894||0xa8,this[_0x5a3881(0x1d1)]();if(VisuMZ['CoreEngine'][_0x5a3881(0x200)]['UI'][_0x5a3881(0x2a8)])this[_0x5a3881(0x402)](_0x5a178e[_0x5a3881(0x6fa)]()[_0x5a3881(0x656)],_0x4db982,_0x23b711,_0x263894);else{const _0x46c7e6=_0x5a178e[_0x5a3881(0x6fa)]()[_0x5a3881(0x656)][_0x5a3881(0x338)](/\\I\[(\d+)\]/gi,'');this[_0x5a3881(0x397)](_0x46c7e6,_0x4db982,_0x23b711,_0x263894);}},Window_StatusBase['prototype'][_0x30b69f(0x5e6)]=function(_0x19a5b2,_0x27f573,_0x2c027e,_0x315007){const _0x2dfdde=_0x30b69f;_0x315007=_0x315007||0x10e,this['resetTextColor']();if(VisuMZ[_0x2dfdde(0x5d8)][_0x2dfdde(0x200)]['UI'][_0x2dfdde(0x2a6)])this['drawTextEx'](_0x19a5b2[_0x2dfdde(0x5dc)](),_0x27f573,_0x2c027e,_0x315007);else{const _0x480a0e=_0x19a5b2[_0x2dfdde(0x5dc)]()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x19a5b2[_0x2dfdde(0x5dc)](),_0x27f573,_0x2c027e,_0x315007);}},VisuMZ['CoreEngine'][_0x30b69f(0x653)]=Window_StatusBase['prototype'][_0x30b69f(0x485)],Window_StatusBase['prototype'][_0x30b69f(0x485)]=function(_0x4655be,_0x499cdf,_0x6c96c0){const _0x51816c=_0x30b69f;if(this['isExpGaugeDrawn']())this[_0x51816c(0x684)](_0x4655be,_0x499cdf,_0x6c96c0);VisuMZ['CoreEngine'][_0x51816c(0x653)][_0x51816c(0x305)](this,_0x4655be,_0x499cdf,_0x6c96c0);},Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x5c7)]=function(){const _0x1de34b=_0x30b69f;return VisuMZ[_0x1de34b(0x5d8)][_0x1de34b(0x200)]['UI'][_0x1de34b(0x542)];},Window_StatusBase[_0x30b69f(0x5fe)][_0x30b69f(0x684)]=function(_0x32c678,_0x535979,_0x3c7603){const _0x705e75=_0x30b69f;if(!_0x32c678)return;if(!_0x32c678[_0x705e75(0x622)]())return;const _0x2d7405=0x80,_0x2c37d0=_0x32c678[_0x705e75(0x58a)]();let _0x2d490e=ColorManager['expGaugeColor1'](),_0xe58114=ColorManager[_0x705e75(0x361)]();_0x2c37d0>=0x1&&(_0x2d490e=ColorManager[_0x705e75(0x764)](),_0xe58114=ColorManager[_0x705e75(0x673)]()),this[_0x705e75(0x80b)](_0x535979,_0x3c7603,_0x2d7405,_0x2c37d0,_0x2d490e,_0xe58114);},Window_EquipStatus[_0x30b69f(0x5fe)][_0x30b69f(0x47d)]=function(){const _0x2512db=_0x30b69f;let _0x13daae=0x0;for(const _0x39288a of VisuMZ[_0x2512db(0x5d8)]['Settings'][_0x2512db(0x420)]['DisplayedParams']){const _0x492ed3=this[_0x2512db(0x65f)](),_0x35161d=this[_0x2512db(0x6ab)](_0x13daae);this[_0x2512db(0x633)](_0x492ed3,_0x35161d,_0x39288a),_0x13daae++;}},Window_EquipStatus[_0x30b69f(0x5fe)][_0x30b69f(0x3c3)]=function(_0x31de1a,_0xe29ab0,_0x311438){const _0x9a2143=_0x30b69f,_0x298498=this[_0x9a2143(0x4e0)]()-this[_0x9a2143(0x65f)]()*0x2;this[_0x9a2143(0x2fd)](_0x31de1a,_0xe29ab0,_0x298498,_0x311438,![]);},Window_EquipStatus[_0x30b69f(0x5fe)][_0x30b69f(0x523)]=function(_0x518f44,_0x1b28dd,_0x22cd7a){const _0x29c423=_0x30b69f,_0x2ddb85=this[_0x29c423(0x717)]();this[_0x29c423(0x1d1)](),this[_0x29c423(0x397)](this[_0x29c423(0x335)][_0x29c423(0x210)](_0x22cd7a,!![]),_0x518f44,_0x1b28dd,_0x2ddb85,_0x29c423(0x42d));},Window_EquipStatus[_0x30b69f(0x5fe)][_0x30b69f(0x30a)]=function(_0x477765,_0x1b0107){const _0x42ab54=_0x30b69f,_0x1b66b5=this[_0x42ab54(0x4f3)]();this[_0x42ab54(0x475)](ColorManager[_0x42ab54(0x5f0)]());const _0x4e6302=VisuMZ[_0x42ab54(0x5d8)]['Settings']['UI'][_0x42ab54(0x80e)];this['drawText'](_0x4e6302,_0x477765,_0x1b0107,_0x1b66b5,_0x42ab54(0x493));},Window_EquipStatus[_0x30b69f(0x5fe)][_0x30b69f(0x704)]=function(_0x33f1ba,_0x389dda,_0x3fdf04){const _0x5e90c7=_0x30b69f,_0x5afc44=this[_0x5e90c7(0x717)](),_0x1e5226=this[_0x5e90c7(0x1ed)][_0x5e90c7(0x210)](_0x3fdf04),_0x2d8ea2=_0x1e5226-this[_0x5e90c7(0x335)][_0x5e90c7(0x210)](_0x3fdf04);this[_0x5e90c7(0x475)](ColorManager['paramchangeTextColor'](_0x2d8ea2)),this[_0x5e90c7(0x397)](this['_tempActor'][_0x5e90c7(0x210)](_0x3fdf04,!![]),_0x33f1ba,_0x389dda,_0x5afc44,'right');},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x35c)]=Window_EquipItem['prototype'][_0x30b69f(0x6af)],Window_EquipItem[_0x30b69f(0x5fe)][_0x30b69f(0x6af)]=function(_0x1e6b60){const _0x1113f9=_0x30b69f;return _0x1e6b60&&this[_0x1113f9(0x335)]?this[_0x1113f9(0x335)][_0x1113f9(0x6c1)](_0x1e6b60):VisuMZ[_0x1113f9(0x5d8)][_0x1113f9(0x35c)]['call'](this,_0x1e6b60);},Window_StatusParams[_0x30b69f(0x5fe)][_0x30b69f(0x474)]=function(){const _0x244aae=_0x30b69f;return VisuMZ[_0x244aae(0x5d8)][_0x244aae(0x200)]['Param'][_0x244aae(0x818)][_0x244aae(0x303)];},Window_StatusParams[_0x30b69f(0x5fe)][_0x30b69f(0x633)]=function(_0x174939){const _0x459877=_0x30b69f,_0x3cd79f=this[_0x459877(0x32d)](_0x174939),_0xd5a3e7=VisuMZ[_0x459877(0x5d8)][_0x459877(0x200)][_0x459877(0x420)][_0x459877(0x818)][_0x174939],_0x37cfee=TextManager[_0x459877(0x1cc)](_0xd5a3e7),_0x2a7421=this[_0x459877(0x335)][_0x459877(0x210)](_0xd5a3e7,!![]);this[_0x459877(0x2fd)](_0x3cd79f['x'],_0x3cd79f['y'],0xa0,_0xd5a3e7,![]),this[_0x459877(0x1d1)](),this[_0x459877(0x397)](_0x2a7421,_0x3cd79f['x']+0xa0,_0x3cd79f['y'],0x3c,_0x459877(0x42d));};if(VisuMZ[_0x30b69f(0x5d8)]['Settings'][_0x30b69f(0x547)][_0x30b69f(0x2cb)]){VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)]['KeyboardInput'][_0x30b69f(0x7b6)]&&(Window_NameInput[_0x30b69f(0x7c3)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x30b69f(0x3f1),'OK']);;VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x718)]=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)],Window_NameInput['prototype'][_0x30b69f(0x6f5)]=function(_0x9864a7){const _0x3cc780=_0x30b69f;this[_0x3cc780(0x568)]=this[_0x3cc780(0x2e6)](),VisuMZ[_0x3cc780(0x5d8)][_0x3cc780(0x718)]['call'](this,_0x9864a7),this['_mode']===_0x3cc780(0x1d6)?this[_0x3cc780(0x621)](0x0):(Input[_0x3cc780(0x503)](),this[_0x3cc780(0x27b)]());},Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x2e6)]=function(){const _0x222ce1=_0x30b69f;if(Input['isGamepadConnected']())return'default';return VisuMZ[_0x222ce1(0x5d8)][_0x222ce1(0x200)]['KeyboardInput'][_0x222ce1(0x4d3)]||_0x222ce1(0x5f5);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x7f3)]=Window_NameInput[_0x30b69f(0x5fe)]['processHandling'],Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x527)]=function(){const _0x3de845=_0x30b69f;if(!this[_0x3de845(0x1f9)]())return;if(!this['active'])return;if(this[_0x3de845(0x568)]===_0x3de845(0x5f5)&&Input[_0x3de845(0x780)]())this[_0x3de845(0x7de)](_0x3de845(0x1d6));else{if(Input[_0x3de845(0x4a8)](_0x3de845(0x6dc)))Input[_0x3de845(0x503)](),this[_0x3de845(0x685)]();else{if(Input['isTriggered'](_0x3de845(0x598)))Input['clear'](),this['_mode']==='keyboard'?this[_0x3de845(0x7de)](_0x3de845(0x1d6)):this[_0x3de845(0x7de)](_0x3de845(0x5f5));else{if(this[_0x3de845(0x568)]===_0x3de845(0x5f5))this[_0x3de845(0x2bf)]();else Input[_0x3de845(0x4a8)]('escape')?(Input[_0x3de845(0x503)](),this[_0x3de845(0x7de)](_0x3de845(0x5f5))):VisuMZ[_0x3de845(0x5d8)][_0x3de845(0x7f3)][_0x3de845(0x305)](this);}}}},VisuMZ['CoreEngine'][_0x30b69f(0x314)]=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x38c)],Window_NameInput[_0x30b69f(0x5fe)]['processTouch']=function(){const _0xb50f99=_0x30b69f;if(!this[_0xb50f99(0x6ef)]())return;if(this[_0xb50f99(0x568)]==='keyboard'){if(TouchInput[_0xb50f99(0x5ee)]()&&this[_0xb50f99(0x22f)]())this[_0xb50f99(0x7de)](_0xb50f99(0x1d6));else TouchInput[_0xb50f99(0x2b4)]()&&this[_0xb50f99(0x7de)]('default');}else VisuMZ[_0xb50f99(0x5d8)][_0xb50f99(0x314)][_0xb50f99(0x305)](this);},Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x2bf)]=function(){const _0x1a85f8=_0x30b69f;if(Input[_0x1a85f8(0x4a8)](_0x1a85f8(0x7e2)))Input['clear'](),this['onNameOk']();else{if(Input[_0x1a85f8(0x49e)]!==undefined){let _0x5e9688=Input[_0x1a85f8(0x49e)],_0x407bd6=_0x5e9688[_0x1a85f8(0x303)];for(let _0x402e07=0x0;_0x402e07<_0x407bd6;++_0x402e07){this[_0x1a85f8(0x85e)]['add'](_0x5e9688[_0x402e07])?SoundManager[_0x1a85f8(0x3f7)]():SoundManager['playBuzzer']();}Input[_0x1a85f8(0x503)]();}}},Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x7de)]=function(_0x10cd84){const _0x24daa8=_0x30b69f;let _0x275df2=this['_mode'];this['_mode']=_0x10cd84,_0x275df2!==this[_0x24daa8(0x568)]&&(this[_0x24daa8(0x4af)](),SoundManager[_0x24daa8(0x3f7)](),this[_0x24daa8(0x568)]===_0x24daa8(0x1d6)?this[_0x24daa8(0x621)](0x0):this[_0x24daa8(0x621)](-0x1));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x25d)]=Window_NameInput['prototype'][_0x30b69f(0x854)],Window_NameInput['prototype'][_0x30b69f(0x854)]=function(_0x5c6ef8){const _0xf17ddd=_0x30b69f;if(this['_mode']===_0xf17ddd(0x5f5)&&!Input[_0xf17ddd(0x418)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0xf17ddd(0x5d8)]['Window_NameInput_cursorDown'][_0xf17ddd(0x305)](this,_0x5c6ef8),this[_0xf17ddd(0x7de)](_0xf17ddd(0x1d6));},VisuMZ[_0x30b69f(0x5d8)]['Window_NameInput_cursorUp']=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x41b)],Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x41b)]=function(_0x8a2c52){const _0x429d73=_0x30b69f;if(this[_0x429d73(0x568)]===_0x429d73(0x5f5)&&!Input['isArrowPressed']())return;if(Input[_0x429d73(0x761)]())return;VisuMZ['CoreEngine'][_0x429d73(0x2cc)][_0x429d73(0x305)](this,_0x8a2c52),this[_0x429d73(0x7de)]('default');},VisuMZ[_0x30b69f(0x5d8)]['Window_NameInput_cursorRight']=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x6e8)],Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x6e8)]=function(_0x217909){const _0x23942e=_0x30b69f;if(this[_0x23942e(0x568)]===_0x23942e(0x5f5)&&!Input[_0x23942e(0x418)]())return;if(Input[_0x23942e(0x761)]())return;VisuMZ[_0x23942e(0x5d8)]['Window_NameInput_cursorRight'][_0x23942e(0x305)](this,_0x217909),this['switchModes'](_0x23942e(0x1d6));},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x521)]=Window_NameInput[_0x30b69f(0x5fe)]['cursorLeft'],Window_NameInput['prototype'][_0x30b69f(0x5ad)]=function(_0x234a5e){const _0x52dbee=_0x30b69f;if(this[_0x52dbee(0x568)]===_0x52dbee(0x5f5)&&!Input['isArrowPressed']())return;if(Input[_0x52dbee(0x761)]())return;VisuMZ[_0x52dbee(0x5d8)][_0x52dbee(0x521)][_0x52dbee(0x305)](this,_0x234a5e),this[_0x52dbee(0x7de)]('default');},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x52a)]=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x587)],Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x587)]=function(){const _0xbd0afe=_0x30b69f;if(this['_mode']==='keyboard')return;if(Input[_0xbd0afe(0x761)]())return;VisuMZ[_0xbd0afe(0x5d8)]['Window_NameInput_cursorPagedown'][_0xbd0afe(0x305)](this),this[_0xbd0afe(0x7de)]('default');},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x498)]=Window_NameInput['prototype'][_0x30b69f(0x643)],Window_NameInput['prototype'][_0x30b69f(0x643)]=function(){const _0x5e953d=_0x30b69f;if(this['_mode']===_0x5e953d(0x5f5))return;if(Input[_0x5e953d(0x761)]())return;VisuMZ[_0x5e953d(0x5d8)][_0x5e953d(0x498)]['call'](this),this[_0x5e953d(0x7de)](_0x5e953d(0x1d6));},VisuMZ['CoreEngine']['Window_NameInput_refresh']=Window_NameInput[_0x30b69f(0x5fe)][_0x30b69f(0x4af)],Window_NameInput[_0x30b69f(0x5fe)]['refresh']=function(){const _0x331886=_0x30b69f;if(this[_0x331886(0x568)]===_0x331886(0x5f5)){this[_0x331886(0x3ea)][_0x331886(0x503)](),this['contentsBack']['clear'](),this[_0x331886(0x1d1)]();let _0x5c0add=VisuMZ[_0x331886(0x5d8)]['Settings'][_0x331886(0x547)][_0x331886(0x332)]['split']('\x0a'),_0x3b80d2=_0x5c0add[_0x331886(0x303)],_0x58609d=(this['innerHeight']-_0x3b80d2*this[_0x331886(0x578)]())/0x2;for(let _0x572814=0x0;_0x572814<_0x3b80d2;++_0x572814){let _0x1582cc=_0x5c0add[_0x572814],_0x2ada35=this['textSizeEx'](_0x1582cc)[_0x331886(0x6c7)],_0x1e5e5f=Math[_0x331886(0x4ca)]((this[_0x331886(0x3ea)]['width']-_0x2ada35)/0x2);this[_0x331886(0x402)](_0x1582cc,_0x1e5e5f,_0x58609d),_0x58609d+=this[_0x331886(0x578)]();}}else VisuMZ['CoreEngine']['Window_NameInput_refresh'][_0x331886(0x305)](this);};};VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x78c)]=Window_ShopSell[_0x30b69f(0x5fe)][_0x30b69f(0x6af)],Window_ShopSell['prototype'][_0x30b69f(0x6af)]=function(_0x317679){const _0x34b7f6=_0x30b69f;return VisuMZ['CoreEngine'][_0x34b7f6(0x200)][_0x34b7f6(0x702)]['KeyItemProtect']&&DataManager[_0x34b7f6(0x246)](_0x317679)?![]:VisuMZ[_0x34b7f6(0x5d8)][_0x34b7f6(0x78c)]['call'](this,_0x317679);},Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x551)]=function(){return![];};VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x200)][_0x30b69f(0x547)][_0x30b69f(0x563)]&&(VisuMZ['CoreEngine'][_0x30b69f(0x47f)]=Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x70f)],Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x70f)]=function(){const _0x38c43a=_0x30b69f;VisuMZ['CoreEngine'][_0x38c43a(0x47f)]['call'](this),this[_0x38c43a(0x621)](this[_0x38c43a(0x810)]-0x1),Input[_0x38c43a(0x503)]();},VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x694)],Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x694)]=function(){const _0xb615a3=_0x30b69f;if(!this['isOpenAndActive']())return;if(Input[_0xb615a3(0x761)]())this[_0xb615a3(0x29b)]();else{if(Input[_0xb615a3(0x4a8)]('backspace'))this[_0xb615a3(0x3c9)]();else{if(Input['_inputSpecialKeyCode']===0x2e)this['processKeyboardDelete']();else{if(Input[_0xb615a3(0x27a)]===0x24)this[_0xb615a3(0x422)]();else Input['_inputSpecialKeyCode']===0x23?this[_0xb615a3(0x4d6)]():VisuMZ[_0xb615a3(0x5d8)]['Window_NumberInput_processDigitChange'][_0xb615a3(0x305)](this);}}}},Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x774)]=function(){const _0x3be182=_0x30b69f;if(!this[_0x3be182(0x6de)]())return;Input[_0x3be182(0x761)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x3be182(0x5fe)][_0x3be182(0x774)]['call'](this);},Window_NumberInput[_0x30b69f(0x5fe)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput['prototype'][_0x30b69f(0x29b)]=function(){const _0x1b919c=_0x30b69f;if(String(this[_0x1b919c(0x3e6)])[_0x1b919c(0x303)]>=this[_0x1b919c(0x810)])return;const _0x118323=Number(String(this[_0x1b919c(0x3e6)])+Input[_0x1b919c(0x49e)]);if(isNaN(_0x118323))return;this['_number']=_0x118323;const _0x3d6db5='9'[_0x1b919c(0x75b)](this['_maxDigits']);this[_0x1b919c(0x3e6)]=this[_0x1b919c(0x3e6)][_0x1b919c(0x4ac)](0x0,_0x3d6db5),Input[_0x1b919c(0x503)](),this[_0x1b919c(0x4af)](),SoundManager['playCursor'](),this[_0x1b919c(0x621)](this['_maxDigits']-0x1);},Window_NumberInput['prototype'][_0x30b69f(0x3c9)]=function(){const _0x1126de=_0x30b69f;this['_number']=Number(String(this['_number'])[_0x1126de(0x4cf)](0x0,-0x1)),this[_0x1126de(0x3e6)]=Math[_0x1126de(0x7fd)](0x0,this['_number']),Input[_0x1126de(0x503)](),this[_0x1126de(0x4af)](),SoundManager[_0x1126de(0x1d3)](),this[_0x1126de(0x621)](this['_maxDigits']-0x1);},Window_NumberInput[_0x30b69f(0x5fe)][_0x30b69f(0x59c)]=function(){const _0x14aeef=_0x30b69f;this[_0x14aeef(0x3e6)]=Number(String(this[_0x14aeef(0x3e6)])['substring'](0x1)),this[_0x14aeef(0x3e6)]=Math[_0x14aeef(0x7fd)](0x0,this['_number']),Input[_0x14aeef(0x503)](),this['refresh'](),SoundManager[_0x14aeef(0x1d3)](),this[_0x14aeef(0x621)](this[_0x14aeef(0x810)]-0x1);});;function _0x43f4(){const _0x47e82a=['buttonAssistKey3','padZero','hit','optionsWindowRect','level','VisuMZ_2_BattleSystemOTB','pow','evaded','makeActionList','ExtractStrFromList','ctrl','map','\x5c}❪TAB❫\x5c{','isSmartEventCollisionOn','CLEAR','key%1','_actorWindow','shake','Spriteset_Battle_createEnemies','FINAL','Sprite_Button_initialize','battleSystem','UNDERSCORE','touchUI','HRG','retrieveFauxAnimation','enemies','getInputMultiButtonStrings','getLastPluginCommandInterpreter','SParamVocab3','paramRate','targetScaleY','Rate1','targetObjects','makeCommandList','move','abs','drawCharacter','Pixelated','setupNewGame','OPEN_BRACKET','1900BvUWtC','animations','sparamPlus','gainSilentTp','bitmapHeight','XParamVocab3','paramBase','ParseTilesetNotetags','EXCLAMATION','charCode','addLoadListener','_rate','platform','MODECHANGE','traitsPi','ParseStateNotetags','makeInputButtonString','ParamMax','WIN_OEM_FJ_MASSHOU','Scene_Map_updateMainMultiply','repeat','deflate','xparamPlusJS','Sprite_AnimationMV_processTimingData','VisuMZ_1_OptionsCore','ItemMenu','isNumpadPressed','enableDigitGrouping','clone','maxLvGaugeColor1','_stored_maxLvGaugeColor1','measureTextWidth','StatusMenu','markCoreEngineModified','toLocaleString','ListRect','down','_pageupButton','IconSParam9','overrideMimeType','ApplyEasing','FontSmoothing','drawCurrencyValue','_storedMapText','isCollidedWithEvents','processCursorMove','OUTCIRC','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','loadGameImagesCoreEngine','areButtonsOutsideMainUI','contentsOpacity','getInputButtonString','storeMapData','exp','exec','_addShadow','centerSprite','isGamepadTriggered','toString','_mainSprite','Game_Picture_show','gaugeBackColor','_moveEasingType','sparamFlatBonus','setColorTone','Spriteset_Base_update','tpGaugeColor2','background','scaleMode','Window_ShopSell_isEnabled','Window','loadSystem','_statusWindow','smooth','_CoreEngineSettings','ItemRect','Sprite_Picture_updateOrigin','retreat','getButtonAssistLocation','CategoryBgType','listWindowRect','BgFilename2','_spriteset','startNormalGame','_bitmap','process_VisuMZ_CoreEngine_Notetags','requestMotion','eventsXyNt','_timerSprite','PERCENT','MDF','Graphics_printError','Center','Scene_Map_createMenuButton','_storedStack','ExportString','textBaseline','buttonAssistKey1','_scaleY','ctGaugeColor2','Game_Temp_initialize','drawFace','DimColor2','Type','xparamFlat1','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','getCombinedScrollingText','performMiss','F20','CEV','Title','QwertyLayout','MEV','eva','missed','ImprovedAccuracySystem','XParamVocab7','removePointAnimation','updateMainMultiply','processSoundTimings','SHIFT','_paramPlus','_stored_powerUpColor','setFrame','LATIN1','Game_Action_updateLastTarget','popScene','windowRect','createMenuButton','IconXParam0','WIN_OEM_PA3','%1\x0a','NUMPAD1','INQUART','ALT','MINUS','BattleSystem','SellRect','isTpb','_refreshPauseSign','CRSEL','_targetAnchor','value','initMembers','commandWindowRows','TextManager_param','forceOutOfPlaytest','vertical','buttonAssistSwitch','ColorMaxLvGauge2','XParamVocab5','switchModes','Scene_Title_drawGameTitle','Renderer','sv_enemies','enter','onerror','EncounterRateMinimum','WindowLayer_render','stencilFunc','Scene_Boot_startNormalGame','setHandler','backgroundBitmap','updateWaitMode','ColorPowerUp','Scene_MenuBase_mainAreaTop','Control\x20Variables\x20Script\x20Error','DOWN','fillRect','paramRate1','concat','WIN_OEM_PA1','Window_NameInput_processHandling','_refreshArrows','item','getBackgroundOpacity','initCoreEngine','4aGbIaz','addChild','IconParam5','sparamPlusJS','faces','max','random','GoldOverlap','bgsVolume','mpGaugeColor2','volume','command111','_cache','Window_Selectable_itemRect','F7key','number','xparamRate1','isOptionValid','7252YBxEQQ','drawGauge','updatePictureAntiZoom','xparamPlus1','ParamArrow','isGamepadButtonPressed','_maxDigits','backOpacity','PreserveNumbers','SystemSetWindowPadding','originalJS','constructor','_baseSprite','_troopId','DisplayedParams','DocumentTitleFmt','Game_Map_setup','_setupEventHandlers','isPressed','registerCommand','ParseEnemyNotetags','WIN_OEM_FINISH','height','Spriteset_Base_initialize','XParamVocab0','titleCommandWindow','DigitGroupingLocale','_stored_expGaugeColor1','SmartEventCollisionPriority','drawSegment','removeOnceParallelInterpreter','useFontWidthFix','ColorMPGauge2','IconXParam7','determineSideButtonLayoutValid','anchorCoreEasing','powerUpColor','_index','createCustomParameter','buttonAssistWindowButtonRect','DataManager_setupNewGame','drawIconBySize','ButtonAssist','setup','strokeRect','onClick','EQUALS','GoldIcon','setClickHandler','createPointAnimation','addOnceParallelInterpreter','_hp','_backgroundSprite','down2','itemHeight','moveMenuButtonSideButtonLayout','ShowButtons','skills','RequireFocus','Bitmap_drawCircle','Game_Interpreter_command105','AccuracyBoost','Window_Base_drawText','Scene_Battle_createCancelButton','Game_Action_itemHit','%1%2','Mute','format','BACK_SLASH','setViewportCoreEngineFix','createJsQuickFunction','PDR','itemBackColor2','EnableJS','cursorDown','process_VisuMZ_CoreEngine_Functions','CodeJS','Scene_Base_createWindowLayer','LEFT','transform','statusWindowRect','clearZoom','processTimingData','makeAutoBattleActions','_editWindow','ScaleX','nah','ColorPowerDown','BottomHelp','MAX_SAFE_INTEGER','_scene','statusEquipWindowRect','isSideButtonLayout','SellBgType','pendingColor','ColorNormal','gainItem','applyEasing','repositionEnemiesByResolution','Chance','PictureEasingType','ShowDevTools','OTB','Conditional\x20Branch\x20Script\x20Error','setAction','NUMPAD4','shift','hideButtonFromView','$dataMap','HelpRect','NUMPAD8','NUMPAD7','param','isFullDocumentTitle','deathColor','_pauseSignSprite','_dummyWindow','resetTextColor','hpGaugeColor1','playCursor','_currentMap','OutlineColor','default','OUTSINE','Window_Base_drawFace','hide','BoxMargin','Subtitle','setMoveEasingType','Game_Picture_updateMove','ACCEPT','tpGaugeColor1','runCombinedScrollingTextAsCode','targetOpacity','updateBackOpacity','updatePadding','WIN_OEM_FJ_ROYA','BackOpacity','Window_Selectable_cursorUp','\x20Origin:\x20%1','Input_shouldPreventDefault','Game_Actor_levelUp','targetEvaRate','paramFlatBonus','outlineColorGauge','_tempActor','8demdZf','LUK','parse','%1:\x20Exit\x20','BlendMode','processCursorHomeEndTrigger','_lastOrigin','createBackground','SwitchToggleRange','reduce','GRD','isOpen','PTB','OUTCUBIC','setViewport','img/%1/','PictureFilename','VisuMZ_2_BattleSystemETB','Settings','_downArrowSprite','update','createEnemies','Scene_Options_create','updatePositionCoreEngineShakeVert','IconXParam2','_targetOffsetX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','%1〘Choice\x20%2〙\x20%3%1','mapId','setGuard','Flat1','SlotRect','Bitmap_clearRect','OS_KEY','paramValueByName','updatePosition','VOLUME_UP','Spriteset_Base_updatePosition','Game_System_initialize','HelpBgType','log','IconParam6','INCIRC','isGamepadConnected','updateAnchor','isBottomHelpMode','WIN_OEM_CUSEL','IconParam3','InputRect','CustomParam','parseForcedGameTroopSettingsCoreEngine','Layer','StatusRect','destroyed','WIN_OEM_ATTN','tileWidth','CrisisRate','loadTitle2','createFauxAnimation','META','anchor','_mapNameWindow','1.3.0','CustomParamNames','render','isTouchedInsideFrame','targetSpritePosition','NUM_LOCK','DOLLAR','F10','buttonAssistOffset3','SideButtons','innerWidth','isMapScrollLinked','_shakeSpeed','contains','TPB\x20ACTIVE','Game_Interpreter_PluginCommand','SELECT','Tilemap_addShadow','uiAreaWidth','SParamVocab5','AnimationID','EndingID','faceWidth','catchException','Speed','ExportAllMapText','isKeyItem','Game_Action_itemEva','〘Common\x20Event\x20%1:\x20%2〙\x20Start','setAnchor','command105','INQUAD','ItemBgType','index','WIN_ICO_CLEAR','gaugeHeight','BgFilename1','updateOnceParallelInterpreters','GetParamIcon','OptionsMenu','MapOnceParallel','isDying','JUNJA','SParamVocab2','DrawIcons','CONVERT','outlineColor','command355','_repositioned','Window_NameInput_cursorDown','INOUTBOUNCE','innerHeight','SCROLL_LOCK','_viewportSize','_hideButtons','wait','ParseAllNotetags','checkCacheKey','catchUnknownError','ActorMPColor','updateFauxAnimations','EnableMasking','Spriteset_Base_isAnimationPlaying','WIN_OEM_JUMP','Unnamed','GoldRect','PictureEraseRange','DummyBgType','NumberBgType','processCursorMoveModernControls','_commandWindow','ENTER','restore','NEAREST','setBackgroundOpacity','onInputBannedWords','F16','description','_inputSpecialKeyCode','deselect','gainGold','setupButtonImage','status','helpAreaTopSideButtonLayout','AllMaps','SwitchRandomizeRange','loadSystemImages','paramBaseAboveLevel99','Scene_Boot_onDatabaseLoaded','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','_isWindow','sparamPlus1','dashToggle','SkillTypeRect','createFauxAnimationQueue','_stored_gaugeBackColor','ColorTPGauge1','isPhysical','pictureButtons','PictureID','StatusParamsRect','sceneTerminationClearEffects','_stored_deathColor','ExportCurMapText','Sprite_Button_updateOpacity','HOME','NUMPAD9','round','Plus1','updateData','context','processKeyboardDigitChange','_context','_targetY','DATABASE','filter','Flat2','valueOutlineWidth','loadIconBitmap','doesNameContainBannedWords','setActorHomeRepositioned','measureTextWidthNoRounding','TextCodeNicknames','WIN_OEM_FJ_TOUROKU','TextCodeClassNames','updateOpacity','Padding','home','Scene_GameEnd_createBackground','jsQuickFunc','updateMain','JSON','drawActorSimpleStatus','openURL','ConvertParams','_stored_expGaugeColor2','isCancelled','CustomParamType','bgmVolume','pointX','BattleManager_checkSubstitute','_stored_normalColor','_buttonType','buttonAreaHeight','_stored_ctGaugeColor2','PGDN','2369517uZfcPH','processKeyboardHandling','71190SwtEmd','learnings','editWindowRect','WIN_OEM_BACKTAB','IconSParam0','CANCEL','clearForcedGameTroopSettingsCoreEngine','initVisuMZCoreEngine','ENTER_SPECIAL','SLEEP','mainAreaHeight','EnableNameInput','Window_NameInput_cursorUp','EREOF','Enemy','ItemPadding','Scene_Boot_updateDocumentTitle','_battlerName','processFauxAnimationRequests','trim','PixelateImageRendering','_windowskin','isPlaytest','Graphics','NUMPAD5','_drawTextShadow','_baseTexture','ExportStrFromAllMaps','filterArea','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','isMaxLevel','code','send','_onKeyPress','ItemBackColor1','xScrollLinkedOffset','removeFauxAnimation','Bitmap_strokeRect','defaultInputMode','StatusParamsBgType','terms','_list','F17','CategoryRect','calcEasing','Manual','titles1','playEscape','makeFontBigger','_active','top','_skillTypeWindow','createSpriteset','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','goto','Scene_Map_initialize','reserveNewGameCommonEvent','makeCoreEngineCommandList','OnLoadJS','Window_StatusBase_drawActorSimpleStatus','writeFile','drawParamText','profileWindowRect','TCR','bgs','ActorRect','PAUSE','length','exportAllMapStrings','call','_stored_systemColor','mhp','Total','SwitchToggleOne','drawRightArrow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','isRightInputMode','CAPSLOCK','createTroopNote','mainFontSize','create','Basic','_optionsWindow','Flat','Window_NameInput_processTouch','F22','_screenY','PRINTSCREEN','Key%1','resetFontSettings','guardSkillId','keyMapper','destroyCoreEngineMarkedBitmaps','MvAnimationRate','sparamFlatJS','DECIMAL','left','_playTestFastMode','isNextScene','createPointAnimationQueue','maxLevel','HIT','erasePicture','push','font','_data','_sellWindow','END','_windowLayer','itemLineRect','_menuButton','Scene_MenuBase_helpAreaTop','_anchor','LoadMenu','NameInputMessage','updateMove','_pointAnimationSprites','_actor','scale','IconSParam7','replace','return\x200','xparamRate','Scene_Battle_createSpriteset','useDigitGrouping','_pollGamepads','Bitmap_gradientFillRect','MAXMP','goldWindowRect','setupCoreEasing','helpAreaBottom','isNwjs','GoldMax','MAX_GL_TEXTURES','scaleSprite','resize','EVAL','IconParam0','command357','exportAllTroopStrings','currencyUnit','NUMPAD0','successRate','DimColor1','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','drawTextTopAligned','MIN_SAFE_INTEGER','SPACE','Actor','ItemStyle','terminate','WIN_ICO_00','SEPARATOR','isAnimationForEach','_stored_hpGaugeColor2','12794440baJiMR','Window_EquipItem_isEnabled','encounterStepsMinimum','OPEN_PAREN','StatusEquipBgType','getGamepads','expGaugeColor2','playCursorSound','ZERO','sparam','_listWindow','KeyTAB','mpGaugeColor1','_lastY','isInputting','RPGMAKER_VERSION','NUMPAD2','playCancel','CommandList','IconSParam4','AMPERSAND','ProfileBgType','_pictureCoordinatesMode','targets','FunctionName','skillTypes','updatePositionCoreEngineShakeOriginal','_onKeyDown','boxHeight','randomInt','paramFlatJS','onload','allowShiftScrolling','STB','original','removeAllFauxAnimations','INOUTQUAD','asin','_digitGroupingEx','filters','reserveCommonEvent','makeDeepCopy','_commandList','ceil','ConvertNumberToString','GoldChange','VisuMZ_2_BattleSystemPTB','_backgroundFilter','setLastPluginCommandInterpreter','processTouch','GREATER_THAN','_effectsContainer','_stored_pendingColor','checkSmartEventCollision','buttonAssistKey%1','SParamVocab8','CommandRect','showFauxAnimations','style','gameTitle','drawText','tilesets','OUTELASTIC','MCR','loadWindowskin','INSINE','setValue','setAttack','translucentOpacity','smallParamFontSize','ParseSkillNotetags','getBattleSystem','mainCommandWidth','PictureCoordinatesMode','damageColor','F21','Icon','INOUTSINE','_stored_mpGaugeColor1','MainMenu','gradientFillRect','_offsetY','iconWidth','currentExp','_coreEasingType','MAT','Bitmap_drawTextOutline','BattleManager_processEscape','test','Gold','updateLastTarget','BlurFilter','_itemWindow','playTestCtrlT','setActorHome','TPB\x20WAIT','actor','removeChild','repositionCancelButtonSideButtonLayout','xparam','join','xparamFlat2','_closing','buttonY','drawParamName','system','clearOnceParallelInterpreters','OPEN_CURLY_BRACKET','process_VisuMZ_CoreEngine_CustomParameters','parallaxes','processKeyboardBackspace','Color','Sprite_Animation_processSoundTimings','Symbol','sv_actors','INQUINT','loadBitmap','_action','setMute','inbounce','setSideView','Game_Character_processMoveCommand','Scene_Map_updateMain','exit','Plus','mainAreaTopSideButtonLayout','IDs','dimColor2','_isButtonHidden','BasicParameterFormula','_stored_mpCostColor','params','IconSParam1','makeEncounterCount','_opacity','paramRateJS','pages','Sprite_Animation_setViewport','MRF','_number','loadTitle1','Scene_Map_createSpriteset','CTB','contents','moveCancelButtonSideButtonLayout','OpenURL','_inputWindow','buttonAssistText5','drawCircle','TextFmt','Page','bind','initDigitGrouping','categoryWindowRect','Location','([\x5c+\x5c-]\x5cd+)([%％])>','playOk','DigitGroupingDamageSprites','stretch','startAutoNewGame','applyForcedGameTroopSettingsCoreEngine','_customModified','WIN_OEM_CLEAR','Wait','_opening','BuyBgType','ATK','drawTextEx','isAnimationPlaying','_cacheScaleY','updatePointAnimations','Bitmap_fillRect','padding','AGI','OptionsRect','fadeSpeed','buttonAssistOffset4','getCustomBackgroundSettings','_playtestF7Looping','skillTypeWindowRect','ARRAYFUNC','buttonAssistText3','GoldBgType','command122','AnimationMirrorOffset','FontShadows','ScaleY','addCommand','MDR','isArrowPressed','TILDE','updateDocumentTitle','cursorUp','updateScene','isMaskingEnabled','processTouchModernControls','ExtJS','Param','Game_Picture_x','processKeyboardHome','smoothSelect','isAnimationOffsetXMirrored','processEscape','SkillTypeBgType','picture','targetPosition','_statusParamsWindow','itemBackColor1','Sprite_AnimationMV_updatePosition','updatePictureCoordinates','right','alpha','blt','visible','offsetY','buttonAssistCancel','gaugeLineHeight','CustomParamIcons','createPointAnimationTargets','ONE_MINUS_SRC_ALPHA','HELP','Linear','Sprite_Picture_loadBitmap','pictures','RepositionEnemies130','SystemLoadImages','Window_Base_initialize','KEEP','VisuMZ_2_BattleSystemFTB','isItemStyle','Game_Picture_y','PictureEraseAll','IconParam7','LevelUpFullMp','drawIcon','_stored_crisisColor','drawGoldItemStyle','XParamVocab9','FontWidthFix','setEasingType','_destroyInternalTextures','buttonAssistText%1','SystemSetSideView','blendFunc','CommandBgType','option','setCoreEngineScreenShakeStyle','PHA','moveRelativeToResolutionChange','%1/','onMoveEnd','INOUTQUART','ValueJS','areButtonsHidden','Scene_Name_onInputOk','position','_backSprite','CTRL','parameters','adjustSprite','WIN_ICO_HELP','paramPlusJS','STRUCT','win32','child_process','XParamVocab8','_cancelButton','setTargetAnchor','Rate','STR','initBasic','updatePositionCoreEngine','_commonEventLayers','ExportAllTroopText','Game_Party_consumeItem','_stored_ctGaugeColor1','clearCachedKeys','onKeyDownKeysF6F7','EscapeAlways','StatusEquipRect','CreateBattleSystemID','maxItems','changeTextColor','_stored_mpGaugeColor2','〘Scrolling\x20Text〙\x0a','batch','BTestAddedQuantity','Game_Picture_move','FDR','openingSpeed','drawAllParams','SLASH','Window_NumberInput_start','setCoreEngineUpdateWindowBg','targetBackOpacity','\x5c}❪SHIFT❫\x5c{','calcCoreEasing','numberWindowRect','drawActorLevel','ExportCurTroopText','match','mirror','dummyWindowRect','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','MenuBg','createDigits','》Comment《\x0a%1\x0a','windowOpacity','iconHeight','NoTileShadows','WIN_OEM_AUTO','startShake','center','AntiZoomPictures','updatePositionCoreEngineShakeHorz','Graphics_centerElement','setWindowPadding','Window_NameInput_cursorPageup','initCoreEngineScreenShake','_tilemap','Game_BattlerBase_refresh','tpColor','ActorHPColor','_inputString','RegExp','keyCode','MenuLayout','equips','INOUTQUINT','Bitmap_drawText','DrawItemBackgroundJS','OUTQUINT','buttonAssistOk','isSpecialCode','playOnceParallelInterpreter','getPointAnimationLayer','textHeight','clamp','TextJS','_changingClass','refresh','Script\x20Call\x20Error','_animationQueue','_upArrowSprite','Window_Selectable_processTouch','flush','Bitmap_resize','removeAllPointAnimations','REPLACE','ColorHPGauge2','Graphics_defaultStretchMode','GoldFontSize','Game_Picture_calcEasing','itemHitImprovedAccuracy','_stored_maxLvGaugeColor2','alwaysDash','stypeId','INOUTCIRC','mute','_helpWindow','0.00','ETB','tpCostColor','_backSprite1','updateOpen','ParseWeaponNotetags','ScreenResolution','floor','ActorBgType','updatePositionCoreEngineShakeRand','integer','buttons','slice','Input_onKeyDown','cancel','TAB','DefaultMode','createWindowLayer','IconSParam3','processKeyboardEnd','isGameActive','ShopMenu','startAnimation','_pagedownButton','VOLUME_MUTE','ItemHeight','setupCoreEngine','worldTransform','Keyboard','paramX','BTB','catchLoadError','ParamName','SParamVocab0','numberShowButton','sparamPlus2','INBACK','Window_Selectable_cursorDown','meVolume','_hovered','_offsetX','IconXParam1','attackSkillId','text%1','_smooth','_balloonQueue','Scene_MenuBase_mainAreaHeight','VisuMZ_2_BattleSystemBTB','rightArrowWidth','show','requestPointAnimation','setupCustomRateCoreEngine','layoutSettings','stringKeyMap','SceneManager_initialize','_screenX','clearRect','_shakePower','CONTEXT_MENU','ParseClassNotetags','ColorMaxLvGauge1','isAlive','normal','setSideButtonLayout','clear','Enable','_mp','resetBattleSystem','fillText','OptionsBgType','displayX','targetScaleX','Scene_Shop_create','FUNC','textColor','Mirror','drawBackgroundRect','RowSpacing','XParamVocab1','addWindow','atbActive','Map%1','globalAlpha','bitmap','Window_Base_drawCharacter','RIGHT','advanced','buttonAssistText1','isMenuButtonAssistEnabled','retrievePointAnimation','_height','isMVAnimation','_forcedBattleSys','helpWindowRect','Window_NameInput_cursorLeft','min','drawCurrentParam','WASD','processAlwaysEscape','_pressed','processHandling','levelUp','makeDocumentTitle','Window_NameInput_cursorPagedown','buttonAssistOffset1','Window_Selectable_drawBackgroundRect','outlineColorDmg','currentValue','_goldWindow','ShowJS','SParamVocab9','setSkill','344844krGGTs','2118LLXdiz','titles2','Input_update','XParamVocab6','FTB','COMMA','textWidth','_clientArea','updateOrigin','PositionX','SParamVocab4','yScrollLinkedOffset','OUTQUAD','waiting','LvExpGauge','ExtractStrFromTroop','playTestF7','IconSParam6','Sprite_Gauge_gaugeRate','KeyboardInput','actorWindowRect','<%1\x20%2:[\x20]','list','Scene_MenuBase_createCancelButton','KeyUnlisted','_cacheScaleX','maxCols','pagedownShowButton','playTestF6','isUseModernControls','_refreshBack','INELASTIC','ExportStrFromAllTroops','Game_Action_setAttack','IconIndex','VOLUME_DOWN','Window_Base_update','#%1','_pictureContainer','levelUpRecovery','battlebacks1','buttonAssistWindowSideRect','VisuMZ_2_BattleSystemCTB','GameEnd','IconParam2','process_VisuMZ_CoreEngine_jsQuickFunctions','helpAreaHeight','EnableNumberInput','Scene_Status_create','Scene_Battle_update','onButtonImageLoad','targetContentsOpacity','_mode','canUse','targetY','Scene_Boot_loadSystemImages','StartID','setupBattleTestItems','_registerKeyInput','SlotBgType','_stored_hpGaugeColor1','CIRCUMFLEX','BannedWords','expGaugeColor1','OutlineColorGauge','Input_setupEventHandlers','WIN_OEM_FJ_LOYA','_stored_tpCostColor','lineHeight','forceStencil','onInputOk','StatusBgType','isWindowMaskingEnabled','_makeFontNameText','Upper\x20Left','CustomParamAbb','%1〘Choice\x20Cancel〙%1','initMembersCoreEngine','boxWidth','_coreEngineShakeStyle','Spriteset_Base_destroy','_numberWindow','checkSubstitute','cursorPagedown','EXR','pointY','expRate','colSpacing','Bitmap_blt','buttonAssistKey4','isRepeated','itemSuccessRate','setBattleSystem','ButtonHeight','QUESTION_MARK','_gamepadWait','AutoStretch','makeTargetSprites','F18','itemRect','tab','_sideButtonLayout','IconXParam3','UpdatePictureCoordinates','processKeyboardDelete','Game_Troop_setup','SceneManager_isGameActive','NUM','processMoveCommand','toLowerCase','F12','Window_Selectable_processCursorMove','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','animationNextDelay','_muteSound','isNormalPriority','paramMax','_targetOffsetY','onLoad','enableDigitGroupingEx','_movementDuration','cursorLeft','_battleField','setMainFontSize','rowSpacing','areTileShadowsHidden','alphabetic','F11','reservePlayTestNewGameCommonEvent','isSideView','(\x5cd+)([%％])>','_mirror','_shouldPreventDefault','ctGaugeColor1','slotWindowRect','isEnemy','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','dimColor1','〘Show\x20Text〙\x0a','createPageButtons','Bitmap_initialize','faceHeight','Max','inBattle','Scene_MenuBase_createPageButtons','_defaultStretchMode','sqrt','isExpGaugeDrawn','skipBranch','mainAreaTop','PIPE','consumeItem','type','_fauxAnimationQueue','itemWindowRect','Input_clear','TGR','ColorCTGauge1','pixelated','_slotWindow','helpAreaTop','needsUpdate','save','DOUBLE_QUOTE','CoreEngine','showPointAnimations','TRAIT_PARAM','apply','nickname','RevertPreserveNumbers','getLevel','OutlineColorDmg','toFixed','createTextState','CNT','drawGameVersion','OkText','Bitmap_measureTextWidth','drawActorNickname','crisisColor','WIN_OEM_COPY','CommandWidth','pageup','maxGold','_forcedTroopView','Game_BattlerBase_initMembers','isTriggered','paramMaxJS','systemColor','DashToggleR','getColor','traitObjects','open','keyboard','LINEAR','members','createChildSprite','skillId','_duration','KeySHIFT','ARRAYJSON','Scene_Menu_create','prototype','SwitchActorText','_colorCache','XParameterFormula','SkillMenu','ColorCTGauge2','INCUBIC','uiAreaHeight','isSceneBattle','setSize','isBusy','createFauxAnimationSprite','sin','STENCIL_BUFFER_BIT','SnapshotOpacity','Opacity','_targetOpacity','destroy','loadPicture','buttonAssistOffset2','text','EQUAL','LESS_THAN','TranslucentOpacity','valueOutlineColor','_lastX','ActorTPColor','fontSize','BTestArmors','rgba(0,\x200,\x200,\x200.7)','Window_Gold_refresh','EXECUTE','WIN_OEM_PA2','PRINT','animationShouldMirror','select','isActor','BaseTexture','_pointAnimationQueue','BgType','createCancelButton','OpenConsole','_digitGrouping','keypress','ExtractStrFromMap','toUpperCase','usableSkills','_hideTileShadows','ADD','loadMapData','FontSize','_animation','pagedown','drawItem','Game_Interpreter_command111','IconSet','ARRAYNUM','nw.gui','BottomButtons','createButtonAssistWindow','_statusEquipWindow','CallHandlerJS','NUMPAD6','WIN_OEM_WSCTRL','EditRect','ProfileRect','initCoreEasing','SUBTRACT','useDigitGroupingEx','cursorPageup','Rate2','_buyWindow','buttonAssistWindowRect','ForceNoPlayTest','endAnimation','altKey','setBackgroundType','numRepeats','tileHeight','3341465cTSHNK','_stored_powerDownColor','updateCoreEasing','isPointAnimationPlaying','(\x5cd+)>','movePageButtonSideButtonLayout','Window_StatusBase_drawActorLevel','ScreenShake','showDevTools','name','indexOf','_fauxAnimationSprites','Input_pollGamepads','Scene_Equip_create','commandWindowRect','onDatabaseLoaded','xparamFlatJS','canAttack','itemPadding','paramPlus','onKeyDown','openness','_onceParallelInterpreters','SystemSetBattleSystem','process_VisuMZ_CoreEngine_RegExp','_targetScaleX','F14','setCommonEvent','SceneManager_onKeyDown','Game_Interpreter_command355','isForFriend','ColorHPGauge1','_clickHandler','_lastPluginCommandInterpreter','imageSmoothingEnabled','NameMenu','blockWidth','drawGameTitle','maxLvGaugeColor2','PositionJS','Game_Actor_paramBase','IconSParam5','TimeProgress','process_VisuMZ_CoreEngine_Settings','OUTBOUNCE','drawGameSubtitle','MAXHP','pictureId','BACKSPACE','Game_Action_numRepeats','Plus2','_scaleX','en-US','_movementWholeDuration','ImgLoad','drawActorExpGauge','processBack','startMove','BTestItems','adjustPictureAntiZoom','initialBattleSystem','connected','setupRate','ColorTPCost','createPointAnimationSprite','duration','ModernControls','windowPadding','WIN_OEM_FJ_JISHO','_drawTextOutline','Game_Screen_initialize','processDigitChange','buttonAssistKey2','CLOSE_PAREN','sparamRate','_margin','drawValue','_pictureCoordinatesWindow','renderNoMask','Game_Picture_initBasic','_stored_tpGaugeColor2','DigitGroupingStandardText','_buttonAssistWindow','ExtDisplayedParams','_encounterCount','_origin','buyWindowRect','GroupDigits','updateDashToggle','seVolume','setupFont','BTestWeapons','isItem','DEF','paramY','OUTQUART','framebuffer','SParamVocab1','isEnabled','version','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','includes','Untitled','REC','changeClass','horzJS','ESC','menu','createDimmerSprite','SideView','ParamChange','ONE','ParseItemNotetags','TitleCommandList','_categoryWindow','MRG','canEquip','_shakeDuration','TRG','ParseActorNotetags','updateEffekseer','Game_Interpreter_command122','width','AnimationPoint','Sprite_Battler_startMove','_realScale','offsetX','INSERT','IconSParam8','responseText','escape','characters','updateClose','INOUTEXPO','vertJS','VisuMZ_2_BattleSystemSTB','itemEva','isMagical','animationId','randomJS','EVA','updateKeyText','bgm','backspace','displayY','isCursorMovable','isInstanceOfSceneMap','darwin','Smooth','Sprite_Gauge_currentValue','initButtonHidden','opacity','ARRAYSTRUCT','CRI','optSideView','cursorRight','PERIOD','ColorManager_loadWindowskin','statusParamsWindowRect','Scene_Name_create','mpCostColor','_blank','isOpenAndActive','Sprite_destroy','isPlaying','subtitle','animationBaseDelay','performEscape','initialize','powerDownColor','DigitGroupingExText','gold','\x0a\x0a\x0a\x0a\x0a','currentClass','ATTN','button','isBottomButtonMode','ListBgType','maxBattleMembers','ShowItemBackground','coreEngineRepositionEnemies','QoL','NewGameCommonEvent','drawNewParam','subject','_backSprite2','_dimmerSprite','remove','_updateFilterArea','applyCoreEasing','Scene_Base_terminateAnimationClearBugFix','InputBgType','_coreEasing','Exported_Script_%1.txt','start','evaluate','getColorDataFromPluginParameters','Sprite_Actor_setActorHome','stencilOp','Game_Interpreter_updateWaitMode','children','paramName','paramWidth','Window_NameInput_initialize','note','IconSParam2','wholeDuration','cos','bitmapWidth'];_0x43f4=function(){return _0x47e82a;};return _0x43f4();}Window_TitleCommand[_0x30b69f(0x385)]=VisuMZ[_0x30b69f(0x5d8)]['Settings'][_0x30b69f(0x6be)],Window_TitleCommand[_0x30b69f(0x5fe)][_0x30b69f(0x740)]=function(){const _0x2b34db=_0x30b69f;this[_0x2b34db(0x2f9)]();},Window_TitleCommand[_0x30b69f(0x5fe)][_0x30b69f(0x2f9)]=function(){const _0x17094c=_0x30b69f;for(const _0x1fd6df of Window_TitleCommand[_0x17094c(0x385)]){if(_0x1fd6df[_0x17094c(0x530)][_0x17094c(0x305)](this)){const _0x29dbfb=_0x1fd6df[_0x17094c(0x3cc)];let _0x163b11=_0x1fd6df['TextStr'];if(['',_0x17094c(0x6b3)][_0x17094c(0x6b2)](_0x163b11))_0x163b11=_0x1fd6df[_0x17094c(0x4ad)][_0x17094c(0x305)](this);const _0x1d72cc=_0x1fd6df[_0x17094c(0x853)][_0x17094c(0x305)](this),_0x537c3f=_0x1fd6df[_0x17094c(0x41f)][_0x17094c(0x305)](this);this[_0x17094c(0x416)](_0x163b11,_0x29dbfb,_0x1d72cc,_0x537c3f),this[_0x17094c(0x7e8)](_0x29dbfb,_0x1fd6df[_0x17094c(0x63b)][_0x17094c(0x3f2)](this,_0x537c3f));}}},Window_GameEnd[_0x30b69f(0x385)]=VisuMZ['CoreEngine'][_0x30b69f(0x200)][_0x30b69f(0x4a1)][_0x30b69f(0x55f)][_0x30b69f(0x36d)],Window_GameEnd[_0x30b69f(0x5fe)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x30b69f(0x5fe)]['makeCoreEngineCommandList']=function(){const _0x120520=_0x30b69f;for(const _0x42307b of Window_GameEnd[_0x120520(0x385)]){if(_0x42307b[_0x120520(0x530)][_0x120520(0x305)](this)){const _0x27a6f4=_0x42307b[_0x120520(0x3cc)];let _0x6a15a3=_0x42307b['TextStr'];if(['',_0x120520(0x6b3)][_0x120520(0x6b2)](_0x6a15a3))_0x6a15a3=_0x42307b[_0x120520(0x4ad)][_0x120520(0x305)](this);const _0x1b83d8=_0x42307b['EnableJS']['call'](this),_0x26d579=_0x42307b[_0x120520(0x41f)][_0x120520(0x305)](this);this[_0x120520(0x416)](_0x6a15a3,_0x27a6f4,_0x1b83d8,_0x26d579),this[_0x120520(0x7e8)](_0x27a6f4,_0x42307b[_0x120520(0x63b)][_0x120520(0x3f2)](this,_0x26d579));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x30b69f(0x5fe)]=Object['create'](Window_Base[_0x30b69f(0x5fe)]),Window_ButtonAssist['prototype'][_0x30b69f(0x815)]=Window_ButtonAssist,Window_ButtonAssist[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(_0x51d3a9){const _0x57a7ff=_0x30b69f;this[_0x57a7ff(0x329)]={},Window_Base['prototype'][_0x57a7ff(0x6f5)][_0x57a7ff(0x305)](this,_0x51d3a9),this['setBackgroundType'](VisuMZ[_0x57a7ff(0x5d8)]['Settings']['ButtonAssist'][_0x57a7ff(0x625)]||0x0),this[_0x57a7ff(0x4af)]();},Window_ButtonAssist[_0x30b69f(0x5fe)][_0x30b69f(0x2f0)]=function(){const _0x4e0893=_0x30b69f;this['contents'][_0x4e0893(0x619)]<=0x60&&(this[_0x4e0893(0x3ea)][_0x4e0893(0x619)]+=0x6);},Window_ButtonAssist[_0x30b69f(0x5fe)]['makeFontSmaller']=function(){const _0x231d12=_0x30b69f;this[_0x231d12(0x3ea)][_0x231d12(0x619)]>=0x18&&(this['contents'][_0x231d12(0x619)]-=0x6);},Window_ButtonAssist['prototype'][_0x30b69f(0x202)]=function(){const _0x5186cf=_0x30b69f;Window_Base[_0x5186cf(0x5fe)]['update'][_0x5186cf(0x305)](this),this['updateKeyText']();},Window_ButtonAssist[_0x30b69f(0x5fe)][_0x30b69f(0x1e3)]=function(){const _0xbbbb2c=_0x30b69f;this[_0xbbbb2c(0x407)]=SceneManager[_0xbbbb2c(0x864)][_0xbbbb2c(0x795)]()!==_0xbbbb2c(0x6fc)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x30b69f(0x6da)]=function(){const _0x1f12bf=_0x30b69f,_0x44d1a7=SceneManager[_0x1f12bf(0x864)];for(let _0x1e6508=0x1;_0x1e6508<=0x5;_0x1e6508++){if(this[_0x1f12bf(0x329)][_0x1f12bf(0x72d)[_0x1f12bf(0x84d)](_0x1e6508)]!==_0x44d1a7[_0x1f12bf(0x391)['format'](_0x1e6508)]())return this[_0x1f12bf(0x4af)]();if(this[_0x1f12bf(0x329)][_0x1f12bf(0x4ee)[_0x1f12bf(0x84d)](_0x1e6508)]!==_0x44d1a7[_0x1f12bf(0x44c)['format'](_0x1e6508)]())return this[_0x1f12bf(0x4af)]();}},Window_ButtonAssist['prototype'][_0x30b69f(0x4af)]=function(){const _0x492b2a=_0x30b69f;this[_0x492b2a(0x3ea)][_0x492b2a(0x503)]();for(let _0x34e50a=0x1;_0x34e50a<=0x5;_0x34e50a++){this[_0x492b2a(0x827)](_0x34e50a);}},Window_ButtonAssist[_0x30b69f(0x5fe)][_0x30b69f(0x827)]=function(_0x496eb6){const _0x45ca3f=_0x30b69f,_0x1e5e24=this[_0x45ca3f(0x236)]/0x5,_0x2bbeaa=SceneManager[_0x45ca3f(0x864)],_0x740391=_0x2bbeaa[_0x45ca3f(0x391)[_0x45ca3f(0x84d)](_0x496eb6)](),_0x6529d=_0x2bbeaa[_0x45ca3f(0x44c)[_0x45ca3f(0x84d)](_0x496eb6)]();this[_0x45ca3f(0x329)][_0x45ca3f(0x72d)[_0x45ca3f(0x84d)](_0x496eb6)]=_0x740391,this[_0x45ca3f(0x329)][_0x45ca3f(0x4ee)[_0x45ca3f(0x84d)](_0x496eb6)]=_0x6529d;if(_0x740391==='')return;if(_0x6529d==='')return;const _0x3ff544=_0x2bbeaa['buttonAssistOffset%1'[_0x45ca3f(0x84d)](_0x496eb6)](),_0x115f8c=this['itemPadding'](),_0x49670e=_0x1e5e24*(_0x496eb6-0x1)+_0x115f8c+_0x3ff544,_0x3dbbce=VisuMZ[_0x45ca3f(0x5d8)][_0x45ca3f(0x200)][_0x45ca3f(0x834)][_0x45ca3f(0x3f0)];this[_0x45ca3f(0x402)](_0x3dbbce[_0x45ca3f(0x84d)](_0x740391,_0x6529d),_0x49670e,0x0,_0x1e5e24-_0x115f8c*0x2);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x714)]=Game_Interpreter['prototype'][_0x30b69f(0x7ea)],Game_Interpreter[_0x30b69f(0x5fe)][_0x30b69f(0x7ea)]=function(){const _0x452066=_0x30b69f;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ[_0x452066(0x5d8)][_0x452066(0x59b)]();return VisuMZ[_0x452066(0x5d8)][_0x452066(0x714)][_0x452066(0x305)](this);},VisuMZ[_0x30b69f(0x5d8)]['UpdatePictureCoordinates']=function(){const _0x5c07e3=_0x30b69f,_0xee9d2f=$gameTemp[_0x5c07e3(0x371)]||0x0;(_0xee9d2f<0x0||_0xee9d2f>0x64||TouchInput['isCancelled']()||Input[_0x5c07e3(0x5ee)](_0x5c07e3(0x4d1)))&&($gameTemp[_0x5c07e3(0x371)]=undefined,Input[_0x5c07e3(0x503)](),TouchInput[_0x5c07e3(0x503)]());const _0x1a481a=$gameScreen[_0x5c07e3(0x427)](_0xee9d2f);return _0x1a481a&&(_0x1a481a['_x']=TouchInput['_x'],_0x1a481a['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x5c07e3(0x42c)](),$gameTemp[_0x5c07e3(0x371)]!==undefined;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x42c)]=function(){const _0x5d0816=_0x30b69f,_0x518af7=SceneManager[_0x5d0816(0x864)];if(!_0x518af7)return;!_0x518af7['_pictureCoordinatesWindow']&&(SoundManager['playLoad'](),_0x518af7['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x518af7[_0x5d0816(0x7f9)](_0x518af7[_0x5d0816(0x69a)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x5d0816(0x36c)](),_0x518af7['removeChild'](_0x518af7[_0x5d0816(0x69a)]),_0x518af7['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x45bd1e=_0x30b69f;this[_0x45bd1e(0x6f5)](...arguments);}Window_PictureCoordinates[_0x30b69f(0x5fe)]=Object[_0x30b69f(0x310)](Window_Base[_0x30b69f(0x5fe)]),Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x815)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x6f5)]=function(){const _0x20ac98=_0x30b69f;this[_0x20ac98(0x1f4)]=_0x20ac98(0x860),this[_0x20ac98(0x617)]=_0x20ac98(0x860),this[_0x20ac98(0x368)]=_0x20ac98(0x860);const _0x14d3b1=this[_0x20ac98(0x7c6)]();Window_Base['prototype'][_0x20ac98(0x6f5)][_0x20ac98(0x305)](this,_0x14d3b1),this[_0x20ac98(0x64a)](0x2);},Window_PictureCoordinates['prototype'][_0x30b69f(0x7c6)]=function(){const _0x497901=_0x30b69f;let _0x1e3ac6=0x0,_0xf1f826=Graphics[_0x497901(0x820)]-this[_0x497901(0x578)](),_0x3dd0cd=Graphics['width'],_0x2cfa3d=this['lineHeight']();return new Rectangle(_0x1e3ac6,_0xf1f826,_0x3dd0cd,_0x2cfa3d);},Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x1e3)]=function(){const _0x5ebbc6=_0x30b69f;this[_0x5ebbc6(0x407)]=0x0;},Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x202)]=function(){const _0x5d6662=_0x30b69f;Window_Base[_0x5d6662(0x5fe)][_0x5d6662(0x202)][_0x5d6662(0x305)](this),this[_0x5d6662(0x299)]();},Window_PictureCoordinates[_0x30b69f(0x5fe)]['updateData']=function(){const _0xec9db4=_0x30b69f;if(!this['needsUpdate']())return;this[_0xec9db4(0x4af)]();},Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x5d5)]=function(){const _0x2ea13b=_0x30b69f,_0x13aed6=$gameTemp[_0x2ea13b(0x371)],_0x29404e=$gameScreen[_0x2ea13b(0x427)](_0x13aed6);return _0x29404e?this[_0x2ea13b(0x1f4)]!==_0x29404e[_0x2ea13b(0x6a2)]||this[_0x2ea13b(0x617)]!==_0x29404e['_x']||this[_0x2ea13b(0x368)]!==_0x29404e['_y']:![];},Window_PictureCoordinates[_0x30b69f(0x5fe)][_0x30b69f(0x4af)]=function(){const _0x3f411d=_0x30b69f;this[_0x3f411d(0x3ea)][_0x3f411d(0x503)]();const _0xd4b11c=$gameTemp[_0x3f411d(0x371)],_0x50203e=$gameScreen[_0x3f411d(0x427)](_0xd4b11c);if(!_0x50203e)return;this[_0x3f411d(0x1f4)]=_0x50203e[_0x3f411d(0x6a2)],this[_0x3f411d(0x617)]=_0x50203e['_x'],this[_0x3f411d(0x368)]=_0x50203e['_y'];const _0x28c9f1=ColorManager[_0x3f411d(0x42a)]();this[_0x3f411d(0x3ea)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x3f411d(0x25f)],_0x28c9f1);const _0x163ba2=_0x3f411d(0x1e7)['format'](_0x50203e['_origin']===0x0?_0x3f411d(0x57e):_0x3f411d(0x7a3)),_0x21d488='X:\x20%1'['format'](_0x50203e['_x']),_0x50f612='Y:\x20%1'['format'](_0x50203e['_y']),_0x36f428=_0x3f411d(0x1f1)[_0x3f411d(0x84d)](TextManager[_0x3f411d(0x77a)](_0x3f411d(0x4d1)));let _0x19934b=Math[_0x3f411d(0x4ca)](this[_0x3f411d(0x236)]/0x4);this[_0x3f411d(0x397)](_0x163ba2,_0x19934b*0x0,0x0,_0x19934b),this[_0x3f411d(0x397)](_0x21d488,_0x19934b*0x1,0x0,_0x19934b,_0x3f411d(0x493)),this['drawText'](_0x50f612,_0x19934b*0x2,0x0,_0x19934b,_0x3f411d(0x493));const _0x26c275=this['textSizeEx'](_0x36f428)['width'],_0x397919=this[_0x3f411d(0x236)]-_0x26c275;this[_0x3f411d(0x402)](_0x36f428,_0x397919,0x0,_0x26c275);},VisuMZ[_0x30b69f(0x1c1)]=function(_0x5366cb){const _0x3f3abe=_0x30b69f;if(Utils[_0x3f3abe(0x809)](_0x3f3abe(0x3b3))){var _0x814f1f=require(_0x3f3abe(0x637))['Window']['get']();SceneManager[_0x3f3abe(0x655)]();if(_0x5366cb)setTimeout(_0x814f1f['focus'][_0x3f3abe(0x3f2)](_0x814f1f),0x190);}},VisuMZ[_0x30b69f(0x76f)]=function(_0x29d38f,_0x1042b6){const _0x49f597=_0x30b69f;_0x1042b6=_0x1042b6[_0x49f597(0x62b)]();var _0x1a6dca=1.70158,_0x21ee63=0.7;switch(_0x1042b6){case _0x49f597(0x5f6):return _0x29d38f;case _0x49f597(0x39c):return-0x1*Math[_0x49f597(0x71c)](_0x29d38f*(Math['PI']/0x2))+0x1;case _0x49f597(0x1d7):return Math[_0x49f597(0x60a)](_0x29d38f*(Math['PI']/0x2));case _0x49f597(0x3a8):return-0.5*(Math[_0x49f597(0x71c)](Math['PI']*_0x29d38f)-0x1);case _0x49f597(0x24b):return _0x29d38f*_0x29d38f;case _0x49f597(0x540):return _0x29d38f*(0x2-_0x29d38f);case _0x49f597(0x37f):return _0x29d38f<0.5?0x2*_0x29d38f*_0x29d38f:-0x1+(0x4-0x2*_0x29d38f)*_0x29d38f;case _0x49f597(0x604):return _0x29d38f*_0x29d38f*_0x29d38f;case _0x49f597(0x1fb):var _0x20967b=_0x29d38f-0x1;return _0x20967b*_0x20967b*_0x20967b+0x1;case'INOUTCUBIC':return _0x29d38f<0.5?0x4*_0x29d38f*_0x29d38f*_0x29d38f:(_0x29d38f-0x1)*(0x2*_0x29d38f-0x2)*(0x2*_0x29d38f-0x2)+0x1;case _0x49f597(0x7cc):return _0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f;case _0x49f597(0x6ac):var _0x20967b=_0x29d38f-0x1;return 0x1-_0x20967b*_0x20967b*_0x20967b*_0x20967b;case _0x49f597(0x456):var _0x20967b=_0x29d38f-0x1;return _0x29d38f<0.5?0x8*_0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f:0x1-0x8*_0x20967b*_0x20967b*_0x20967b*_0x20967b;case _0x49f597(0x3ce):return _0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f;case _0x49f597(0x4a6):var _0x20967b=_0x29d38f-0x1;return 0x1+_0x20967b*_0x20967b*_0x20967b*_0x20967b*_0x20967b;case _0x49f597(0x4a3):var _0x20967b=_0x29d38f-0x1;return _0x29d38f<0.5?0x10*_0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f*_0x29d38f:0x1+0x10*_0x20967b*_0x20967b*_0x20967b*_0x20967b*_0x20967b;case'INEXPO':if(_0x29d38f===0x0)return 0x0;return Math[_0x49f597(0x724)](0x2,0xa*(_0x29d38f-0x1));case'OUTEXPO':if(_0x29d38f===0x1)return 0x1;return-Math[_0x49f597(0x724)](0x2,-0xa*_0x29d38f)+0x1;case _0x49f597(0x6d2):if(_0x29d38f===0x0||_0x29d38f===0x1)return _0x29d38f;var _0x5208ed=_0x29d38f*0x2,_0x1c885a=_0x5208ed-0x1;if(_0x5208ed<0x1)return 0.5*Math[_0x49f597(0x724)](0x2,0xa*_0x1c885a);return 0.5*(-Math['pow'](0x2,-0xa*_0x1c885a)+0x2);case _0x49f597(0x218):var _0x5208ed=_0x29d38f/0x1;return-0x1*(Math[_0x49f597(0x5c6)](0x1-_0x5208ed*_0x29d38f)-0x1);case _0x49f597(0x775):var _0x20967b=_0x29d38f-0x1;return Math[_0x49f597(0x5c6)](0x1-_0x20967b*_0x20967b);case _0x49f597(0x4c0):var _0x5208ed=_0x29d38f*0x2,_0x1c885a=_0x5208ed-0x2;if(_0x5208ed<0x1)return-0.5*(Math['sqrt'](0x1-_0x5208ed*_0x5208ed)-0x1);return 0.5*(Math['sqrt'](0x1-_0x1c885a*_0x1c885a)+0x1);case _0x49f597(0x4e7):return _0x29d38f*_0x29d38f*((_0x1a6dca+0x1)*_0x29d38f-_0x1a6dca);case'OUTBACK':var _0x5208ed=_0x29d38f/0x1-0x1;return _0x5208ed*_0x5208ed*((_0x1a6dca+0x1)*_0x5208ed+_0x1a6dca)+0x1;break;case'INOUTBACK':var _0x5208ed=_0x29d38f*0x2,_0x171283=_0x5208ed-0x2,_0x57c83a=_0x1a6dca*1.525;if(_0x5208ed<0x1)return 0.5*_0x5208ed*_0x5208ed*((_0x57c83a+0x1)*_0x5208ed-_0x57c83a);return 0.5*(_0x171283*_0x171283*((_0x57c83a+0x1)*_0x171283+_0x57c83a)+0x2);case _0x49f597(0x553):if(_0x29d38f===0x0||_0x29d38f===0x1)return _0x29d38f;var _0x5208ed=_0x29d38f/0x1,_0x1c885a=_0x5208ed-0x1,_0xf40e85=0x1-_0x21ee63,_0x57c83a=_0xf40e85/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x1c885a)*Math[_0x49f597(0x60a)]((_0x1c885a-_0x57c83a)*(0x2*Math['PI'])/_0xf40e85));case _0x49f597(0x399):var _0xf40e85=0x1-_0x21ee63,_0x5208ed=_0x29d38f*0x2;if(_0x29d38f===0x0||_0x29d38f===0x1)return _0x29d38f;var _0x57c83a=_0xf40e85/(0x2*Math['PI'])*Math[_0x49f597(0x380)](0x1);return Math['pow'](0x2,-0xa*_0x5208ed)*Math[_0x49f597(0x60a)]((_0x5208ed-_0x57c83a)*(0x2*Math['PI'])/_0xf40e85)+0x1;case'INOUTELASTIC':var _0xf40e85=0x1-_0x21ee63;if(_0x29d38f===0x0||_0x29d38f===0x1)return _0x29d38f;var _0x5208ed=_0x29d38f*0x2,_0x1c885a=_0x5208ed-0x1,_0x57c83a=_0xf40e85/(0x2*Math['PI'])*Math[_0x49f597(0x380)](0x1);if(_0x5208ed<0x1)return-0.5*(Math[_0x49f597(0x724)](0x2,0xa*_0x1c885a)*Math[_0x49f597(0x60a)]((_0x1c885a-_0x57c83a)*(0x2*Math['PI'])/_0xf40e85));return Math[_0x49f597(0x724)](0x2,-0xa*_0x1c885a)*Math[_0x49f597(0x60a)]((_0x1c885a-_0x57c83a)*(0x2*Math['PI'])/_0xf40e85)*0.5+0x1;case _0x49f597(0x679):var _0x5208ed=_0x29d38f/0x1;if(_0x5208ed<0x1/2.75)return 7.5625*_0x5208ed*_0x5208ed;else{if(_0x5208ed<0x2/2.75){var _0x171283=_0x5208ed-1.5/2.75;return 7.5625*_0x171283*_0x171283+0.75;}else{if(_0x5208ed<2.5/2.75){var _0x171283=_0x5208ed-2.25/2.75;return 7.5625*_0x171283*_0x171283+0.9375;}else{var _0x171283=_0x5208ed-2.625/2.75;return 7.5625*_0x171283*_0x171283+0.984375;}}}case'INBOUNCE':var _0x27a57a=0x1-VisuMZ['ApplyEasing'](0x1-_0x29d38f,'outbounce');return _0x27a57a;case _0x49f597(0x25e):if(_0x29d38f<0.5)var _0x27a57a=VisuMZ[_0x49f597(0x76f)](_0x29d38f*0x2,_0x49f597(0x3d2))*0.5;else var _0x27a57a=VisuMZ[_0x49f597(0x76f)](_0x29d38f*0x2-0x1,'outbounce')*0.5+0.5;return _0x27a57a;default:return _0x29d38f;}},VisuMZ[_0x30b69f(0x252)]=function(_0xccb069){const _0x13166a=_0x30b69f;_0xccb069=String(_0xccb069)[_0x13166a(0x62b)]();const _0x28f422=VisuMZ[_0x13166a(0x5d8)][_0x13166a(0x200)][_0x13166a(0x420)];if(_0xccb069==='MAXHP')return _0x28f422[_0x13166a(0x349)];if(_0xccb069==='MAXMP')return _0x28f422['IconParam1'];if(_0xccb069===_0x13166a(0x401))return _0x28f422[_0x13166a(0x560)];if(_0xccb069===_0x13166a(0x6aa))return _0x28f422[_0x13166a(0x21d)];if(_0xccb069===_0x13166a(0x3b0))return _0x28f422['IconParam4'];if(_0xccb069===_0x13166a(0x7a1))return _0x28f422[_0x13166a(0x7fa)];if(_0xccb069==='AGI')return _0x28f422[_0x13166a(0x217)];if(_0xccb069===_0x13166a(0x1ef))return _0x28f422[_0x13166a(0x443)];if(_0xccb069===_0x13166a(0x325))return _0x28f422[_0x13166a(0x7c8)];if(_0xccb069===_0x13166a(0x6d9))return _0x28f422[_0x13166a(0x4ec)];if(_0xccb069===_0x13166a(0x6e6))return _0x28f422[_0x13166a(0x206)];if(_0xccb069==='CEV')return _0x28f422[_0x13166a(0x59a)];if(_0xccb069===_0x13166a(0x7b7))return _0x28f422['IconXParam4'];if(_0xccb069==='MRF')return _0x28f422['IconXParam5'];if(_0xccb069===_0x13166a(0x5e2))return _0x28f422['IconXParam6'];if(_0xccb069===_0x13166a(0x736))return _0x28f422[_0x13166a(0x82b)];if(_0xccb069==='MRG')return _0x28f422['IconXParam8'];if(_0xccb069===_0x13166a(0x6c3))return _0x28f422['IconXParam9'];if(_0xccb069===_0x13166a(0x5d0))return _0x28f422[_0x13166a(0x2c4)];if(_0xccb069===_0x13166a(0x1f8))return _0x28f422[_0x13166a(0x3df)];if(_0xccb069===_0x13166a(0x6b4))return _0x28f422[_0x13166a(0x71a)];if(_0xccb069==='PHA')return _0x28f422[_0x13166a(0x4d5)];if(_0xccb069===_0x13166a(0x39a))return _0x28f422[_0x13166a(0x36e)];if(_0xccb069===_0x13166a(0x2ff))return _0x28f422[_0x13166a(0x676)];if(_0xccb069==='PDR')return _0x28f422[_0x13166a(0x545)];if(_0xccb069===_0x13166a(0x417))return _0x28f422[_0x13166a(0x337)];if(_0xccb069===_0x13166a(0x47b))return _0x28f422[_0x13166a(0x6cd)];if(_0xccb069===_0x13166a(0x588))return _0x28f422[_0x13166a(0x76d)];if(VisuMZ[_0x13166a(0x5d8)][_0x13166a(0x434)][_0xccb069])return VisuMZ[_0x13166a(0x5d8)][_0x13166a(0x434)][_0xccb069]||0x0;return 0x0;},VisuMZ[_0x30b69f(0x387)]=function(_0x3ecea8,_0x2e7eb2,_0x4588d9){const _0x414d42=_0x30b69f;if(_0x4588d9===undefined&&_0x3ecea8%0x1===0x0)return _0x3ecea8;if(_0x4588d9!==undefined&&[_0x414d42(0x67b),_0x414d42(0x33f),_0x414d42(0x401),_0x414d42(0x6aa),_0x414d42(0x3b0),'MDF',_0x414d42(0x408),_0x414d42(0x1ef)][_0x414d42(0x6b2)](String(_0x4588d9)[_0x414d42(0x62b)]()[_0x414d42(0x2d3)]()))return _0x3ecea8;_0x2e7eb2=_0x2e7eb2||0x0;if(VisuMZ[_0x414d42(0x5d8)]['CustomParamAbb'][_0x4588d9])return VisuMZ[_0x414d42(0x5d8)][_0x414d42(0x2b5)][_0x4588d9]===_0x414d42(0x4cd)?_0x3ecea8:String((_0x3ecea8*0x64)['toFixed'](_0x2e7eb2))+'%';return String((_0x3ecea8*0x64)[_0x414d42(0x5e0)](_0x2e7eb2))+'%';},VisuMZ[_0x30b69f(0x6a4)]=function(_0x2ba25c){const _0x383d1b=_0x30b69f;_0x2ba25c=String(_0x2ba25c);if(!_0x2ba25c)return _0x2ba25c;if(typeof _0x2ba25c!=='string')return _0x2ba25c;const _0x550d29=VisuMZ[_0x383d1b(0x5d8)]['Settings'][_0x383d1b(0x702)][_0x383d1b(0x824)]||_0x383d1b(0x681),_0x2eae45={'maximumFractionDigits':0x6};_0x2ba25c=_0x2ba25c['replace'](/\[(.*?)\]/g,(_0x4b195a,_0x254002)=>{const _0x5dd63a=_0x383d1b;return VisuMZ[_0x5dd63a(0x812)](_0x254002,'[',']');}),_0x2ba25c=_0x2ba25c['replace'](/<(.*?)>/g,(_0x7dab8a,_0x163ad6)=>{return VisuMZ['PreserveNumbers'](_0x163ad6,'<','>');}),_0x2ba25c=_0x2ba25c[_0x383d1b(0x338)](/\{\{(.*?)\}\}/g,(_0x2de710,_0x234277)=>{const _0x522dcf=_0x383d1b;return VisuMZ[_0x522dcf(0x812)](_0x234277,'','');}),_0x2ba25c=_0x2ba25c['replace'](/(\d+\.?\d*)/g,(_0x164f2c,_0x4fa5b8)=>{const _0x2ee025=_0x383d1b;let _0x4f3353=_0x4fa5b8;if(_0x4f3353[0x0]==='0')return _0x4f3353;if(_0x4f3353[_0x4f3353[_0x2ee025(0x303)]-0x1]==='.')return Number(_0x4f3353)[_0x2ee025(0x769)](_0x550d29,_0x2eae45)+'.';else return _0x4f3353[_0x4f3353[_0x2ee025(0x303)]-0x1]===','?Number(_0x4f3353)[_0x2ee025(0x769)](_0x550d29,_0x2eae45)+',':Number(_0x4f3353)[_0x2ee025(0x769)](_0x550d29,_0x2eae45);});let _0x2c65f5=0x3;while(_0x2c65f5--){_0x2ba25c=VisuMZ[_0x383d1b(0x5dd)](_0x2ba25c);}return _0x2ba25c;},VisuMZ[_0x30b69f(0x812)]=function(_0x19f1c6,_0x50e81b,_0x1ae0b1){const _0x15c9e7=_0x30b69f;return _0x19f1c6=_0x19f1c6[_0x15c9e7(0x338)](/(\d)/gi,(_0x3f13d9,_0x2c83ec)=>'PRESERVCONVERSION(%1)'[_0x15c9e7(0x84d)](Number(_0x2c83ec))),'%2%1%3'[_0x15c9e7(0x84d)](_0x19f1c6,_0x50e81b,_0x1ae0b1);},VisuMZ['RevertPreserveNumbers']=function(_0x282376){const _0x3166db=_0x30b69f;return _0x282376=_0x282376[_0x3166db(0x338)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2c8b2d,_0x30be0f)=>Number(parseInt(_0x30be0f))),_0x282376;},VisuMZ[_0x30b69f(0x2b1)]=function(_0x31e45d){const _0x4ce51f=_0x30b69f;SoundManager['playOk']();if(!Utils[_0x4ce51f(0x343)]()){const _0x44dcd1=window[_0x4ce51f(0x5f4)](_0x31e45d,_0x4ce51f(0x6ee));}else{const _0x17439b=process[_0x4ce51f(0x753)]==_0x4ce51f(0x6e0)?_0x4ce51f(0x5f4):process['platform']==_0x4ce51f(0x462)?_0x4ce51f(0x70f):'xdg-open';require(_0x4ce51f(0x463))[_0x4ce51f(0x77d)](_0x17439b+'\x20'+_0x31e45d);}},Game_Picture['prototype'][_0x30b69f(0x22a)]=function(){const _0x524049=_0x30b69f;return this[_0x524049(0x330)];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x69c)]=Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x469)],Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x469)]=function(){const _0x4bfbf0=_0x30b69f;VisuMZ['CoreEngine']['Game_Picture_initBasic']['call'](this),this[_0x4bfbf0(0x330)]={'x':0x0,'y':0x0},this[_0x4bfbf0(0x7d4)]={'x':0x0,'y':0x0};},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x1dd)]=Game_Picture['prototype'][_0x30b69f(0x333)],Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x333)]=function(){const _0x2a650f=_0x30b69f;this['updateAnchor']();const _0xac06d4=this[_0x2a650f(0x5fa)];VisuMZ[_0x2a650f(0x5d8)][_0x2a650f(0x1dd)][_0x2a650f(0x305)](this),_0xac06d4>0x0&&this[_0x2a650f(0x5fa)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x2a650f(0x29d)],this[_0x2a650f(0x680)]=this[_0x2a650f(0x666)],this[_0x2a650f(0x7a9)]=this['_targetScaleY'],this[_0x2a650f(0x3e1)]=this[_0x2a650f(0x60e)],this[_0x2a650f(0x330)]&&(this['_anchor']['x']=this[_0x2a650f(0x7d4)]['x'],this[_0x2a650f(0x330)]['y']=this[_0x2a650f(0x7d4)]['y']));},VisuMZ['CoreEngine'][_0x30b69f(0x783)]=Game_Picture['prototype']['show'],Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x4f4)]=function(_0x41edd9,_0x4ab4f9,_0x491f04,_0x17136c,_0x5c32b0,_0x41db52,_0x3b4e41,_0x50917b){const _0x1d26a2=_0x30b69f;VisuMZ[_0x1d26a2(0x5d8)][_0x1d26a2(0x783)][_0x1d26a2(0x305)](this,_0x41edd9,_0x4ab4f9,_0x491f04,_0x17136c,_0x5c32b0,_0x41db52,_0x3b4e41,_0x50917b),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4ab4f9]||{'x':0x0,'y':0x0});},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x47a)]=Game_Picture[_0x30b69f(0x5fe)]['move'],Game_Picture['prototype']['move']=function(_0x132ee2,_0x5e4eec,_0x3761f0,_0x595f72,_0x172d2a,_0x9ed420,_0x1f513b,_0xb8f069,_0x4eb3e4){const _0x79c332=_0x30b69f;VisuMZ[_0x79c332(0x5d8)][_0x79c332(0x47a)]['call'](this,_0x132ee2,_0x5e4eec,_0x3761f0,_0x595f72,_0x172d2a,_0x9ed420,_0x1f513b,_0xb8f069,_0x4eb3e4),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x132ee2]||{'x':0x0,'y':0x0});},Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x21a)]=function(){const _0x8cf5b0=_0x30b69f;this[_0x8cf5b0(0x5fa)]>0x0&&(this[_0x8cf5b0(0x330)]['x']=this[_0x8cf5b0(0x1bd)](this[_0x8cf5b0(0x330)]['x'],this[_0x8cf5b0(0x7d4)]['x']),this[_0x8cf5b0(0x330)]['y']=this['applyEasing'](this['_anchor']['y'],this[_0x8cf5b0(0x7d4)]['y']));},Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x249)]=function(_0x5d2ab2){const _0x565476=_0x30b69f;this[_0x565476(0x330)]=_0x5d2ab2,this[_0x565476(0x7d4)]=JsonEx[_0x565476(0x384)](this[_0x565476(0x330)]);},Game_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x466)]=function(_0x275f45){const _0x4ac817=_0x30b69f;this[_0x4ac817(0x7d4)]=_0x275f45;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x793)]=Sprite_Picture[_0x30b69f(0x5fe)][_0x30b69f(0x53c)],Sprite_Picture[_0x30b69f(0x5fe)]['updateOrigin']=function(){const _0x4307f7=_0x30b69f,_0x1b14cd=this['picture']();!_0x1b14cd[_0x4307f7(0x22a)]()?VisuMZ['CoreEngine'][_0x4307f7(0x793)]['call'](this):(this[_0x4307f7(0x22a)]['x']=_0x1b14cd[_0x4307f7(0x22a)]()['x'],this[_0x4307f7(0x22a)]['y']=_0x1b14cd['anchor']()['y']);},Game_Action[_0x30b69f(0x5fe)]['setEnemyAction']=function(_0x30e035){const _0x34002b=_0x30b69f;if(_0x30e035){const _0x427ebf=_0x30e035[_0x34002b(0x5f9)];if(_0x427ebf===0x1&&this[_0x34002b(0x705)]()[_0x34002b(0x4ed)]()!==0x1)this[_0x34002b(0x39e)]();else _0x427ebf===0x2&&this[_0x34002b(0x705)]()[_0x34002b(0x31a)]()!==0x2?this[_0x34002b(0x20b)]():this[_0x34002b(0x532)](_0x427ebf);}else this[_0x34002b(0x503)]();},Game_Actor['prototype'][_0x30b69f(0x62c)]=function(){const _0x4785d2=_0x30b69f;return this[_0x4785d2(0x843)]()[_0x4785d2(0x29f)](_0x500319=>this[_0x4785d2(0x569)](_0x500319)&&this[_0x4785d2(0x374)]()[_0x4785d2(0x6b2)](_0x500319[_0x4785d2(0x4bf)]));},Window_Base['prototype'][_0x30b69f(0x6b9)]=function(){const _0x548f21=_0x30b69f;this['_dimmerSprite']=new Sprite(),this[_0x548f21(0x707)][_0x548f21(0x516)]=new Bitmap(0x0,0x0),this[_0x548f21(0x707)]['x']=0x0,this['addChildToBack'](this['_dimmerSprite']);},Window_Base['prototype']['refreshDimmerBitmap']=function(){const _0x5b1752=_0x30b69f;if(this[_0x5b1752(0x707)]){const _0x3be4f0=this[_0x5b1752(0x707)][_0x5b1752(0x516)],_0x1bbc0b=this['width'],_0x498952=this['height'],_0xbae11e=this[_0x5b1752(0x407)],_0x4306ff=ColorManager[_0x5b1752(0x5bd)](),_0xdff13b=ColorManager['dimColor2']();_0x3be4f0[_0x5b1752(0x347)](_0x1bbc0b,_0x498952),_0x3be4f0[_0x5b1752(0x3ab)](0x0,0x0,_0x1bbc0b,_0xbae11e,_0xdff13b,_0x4306ff,!![]),_0x3be4f0[_0x5b1752(0x7ef)](0x0,_0xbae11e,_0x1bbc0b,_0x498952-_0xbae11e*0x2,_0x4306ff),_0x3be4f0['gradientFillRect'](0x0,_0x498952-_0xbae11e,_0x1bbc0b,_0xbae11e,_0x4306ff,_0xdff13b,!![]),this[_0x5b1752(0x707)][_0x5b1752(0x7c2)](0x0,0x0,_0x1bbc0b,_0x498952);}},Game_Actor[_0x30b69f(0x5fe)][_0x30b69f(0x85d)]=function(){const _0x2bad68=_0x30b69f;for(let _0x25dac6=0x0;_0x25dac6<this['numActions']();_0x25dac6++){const _0x20eecb=this[_0x2bad68(0x726)]();let _0x47c6cd=Number[_0x2bad68(0x352)];this[_0x2bad68(0x1c4)](_0x25dac6,_0x20eecb[0x0]);for(const _0x422566 of _0x20eecb){const _0x1c74a8=_0x422566[_0x2bad68(0x710)]();_0x1c74a8>_0x47c6cd&&(_0x47c6cd=_0x1c74a8,this['setAction'](_0x25dac6,_0x422566));}}this['setActionState'](_0x2bad68(0x541));},Window_BattleItem[_0x30b69f(0x5fe)][_0x30b69f(0x6af)]=function(_0x19f353){const _0x33ac37=_0x30b69f;return BattleManager[_0x33ac37(0x3bb)]()?BattleManager['actor']()['canUse'](_0x19f353):Window_ItemList[_0x33ac37(0x5fe)][_0x33ac37(0x6af)]['call'](this,_0x19f353);},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x3e8)]=Scene_Map[_0x30b69f(0x5fe)]['createSpriteset'],Scene_Map[_0x30b69f(0x5fe)]['createSpriteset']=function(){const _0x2d8f1b=_0x30b69f;VisuMZ[_0x2d8f1b(0x5d8)][_0x2d8f1b(0x3e8)][_0x2d8f1b(0x305)](this);const _0x47a50c=this[_0x2d8f1b(0x799)]['_timerSprite'];if(_0x47a50c)this[_0x2d8f1b(0x7f9)](_0x47a50c);},VisuMZ['CoreEngine'][_0x30b69f(0x33b)]=Scene_Battle['prototype']['createSpriteset'],Scene_Battle[_0x30b69f(0x5fe)][_0x30b69f(0x2f4)]=function(){const _0x572ad8=_0x30b69f;VisuMZ[_0x572ad8(0x5d8)][_0x572ad8(0x33b)]['call'](this);const _0x204852=this['_spriteset'][_0x572ad8(0x79f)];if(_0x204852)this[_0x572ad8(0x7f9)](_0x204852);},Sprite_Actor[_0x30b69f(0x5fe)]['update']=function(){const _0x327ca1=_0x30b69f;Sprite_Battler[_0x327ca1(0x5fe)][_0x327ca1(0x202)]['call'](this),this['updateShadow']();if(this[_0x327ca1(0x335)])this['updateMotion']();else this[_0x327ca1(0x2d1)]!==''&&(this[_0x327ca1(0x2d1)]='');},Window['prototype'][_0x30b69f(0x7f4)]=function(){const _0x3adbbb=_0x30b69f,_0x3e3516=this['_width'],_0xacc496=this['_height'],_0x39218f=0x18,_0x586399=_0x39218f/0x2,_0x431107=0x60+_0x39218f,_0xc723fc=0x0+_0x39218f;this[_0x3adbbb(0x201)]['bitmap']=this[_0x3adbbb(0x2d5)],this['_downArrowSprite'][_0x3adbbb(0x22a)]['x']=0.5,this['_downArrowSprite'][_0x3adbbb(0x22a)]['y']=0.5,this['_downArrowSprite'][_0x3adbbb(0x7c2)](_0x431107+_0x586399,_0xc723fc+_0x586399+_0x39218f,_0x39218f,_0x586399),this['_downArrowSprite']['move'](Math[_0x3adbbb(0x297)](_0x3e3516/0x2),Math['round'](_0xacc496-_0x586399)),this[_0x3adbbb(0x4b2)][_0x3adbbb(0x516)]=this['_windowskin'],this[_0x3adbbb(0x4b2)][_0x3adbbb(0x22a)]['x']=0.5,this['_upArrowSprite'][_0x3adbbb(0x22a)]['y']=0.5,this[_0x3adbbb(0x4b2)][_0x3adbbb(0x7c2)](_0x431107+_0x586399,_0xc723fc,_0x39218f,_0x586399),this[_0x3adbbb(0x4b2)][_0x3adbbb(0x741)](Math[_0x3adbbb(0x297)](_0x3e3516/0x2),Math[_0x3adbbb(0x297)](_0x586399));},Window[_0x30b69f(0x5fe)][_0x30b69f(0x7d2)]=function(){const _0xd61c4e=_0x30b69f,_0x46f784=0x90,_0x2c3cc2=0x60,_0x44a859=0x18;this[_0xd61c4e(0x1cf)][_0xd61c4e(0x516)]=this[_0xd61c4e(0x2d5)],this[_0xd61c4e(0x1cf)][_0xd61c4e(0x22a)]['x']=0.5,this[_0xd61c4e(0x1cf)][_0xd61c4e(0x22a)]['y']=0x1,this[_0xd61c4e(0x1cf)]['move'](Math[_0xd61c4e(0x297)](this['_width']/0x2),this[_0xd61c4e(0x51d)]),this[_0xd61c4e(0x1cf)][_0xd61c4e(0x7c2)](_0x46f784,_0x2c3cc2,_0x44a859,_0x44a859),this['_pauseSignSprite'][_0xd61c4e(0x42e)]=0xff;},Window[_0x30b69f(0x5fe)][_0x30b69f(0x709)]=function(){const _0x5f48d1=_0x30b69f,_0x2793f3=this['_clientArea']['worldTransform'][_0x5f48d1(0x5db)](new Point(0x0,0x0)),_0x4bd3e5=this[_0x5f48d1(0x53b)][_0x5f48d1(0x2dc)];_0x4bd3e5['x']=_0x2793f3['x']+this['origin']['x'],_0x4bd3e5['y']=_0x2793f3['y']+this['origin']['y'],_0x4bd3e5[_0x5f48d1(0x6c7)]=Math[_0x5f48d1(0x386)](this['innerWidth']*this[_0x5f48d1(0x336)]['x']),_0x4bd3e5[_0x5f48d1(0x820)]=Math[_0x5f48d1(0x386)](this[_0x5f48d1(0x25f)]*this[_0x5f48d1(0x336)]['y']);},Window[_0x30b69f(0x5fe)][_0x30b69f(0x552)]=function(){const _0x19434d=_0x30b69f,_0x47df67=this[_0x19434d(0x698)],_0x54240e=Math['max'](0x0,this['_width']-_0x47df67*0x2),_0x5199ea=Math[_0x19434d(0x7fd)](0x0,this['_height']-_0x47df67*0x2),_0x336f7f=this[_0x19434d(0x45b)],_0x1ab5b6=_0x336f7f[_0x19434d(0x715)][0x0];_0x336f7f['bitmap']=this[_0x19434d(0x2d5)],_0x336f7f[_0x19434d(0x7c2)](0x0,0x0,0x60,0x60),_0x336f7f['move'](_0x47df67,_0x47df67),_0x336f7f[_0x19434d(0x336)]['x']=_0x54240e/0x60,_0x336f7f[_0x19434d(0x336)]['y']=_0x5199ea/0x60,_0x1ab5b6[_0x19434d(0x516)]=this[_0x19434d(0x2d5)],_0x1ab5b6['setFrame'](0x0,0x60,0x60,0x60),_0x1ab5b6[_0x19434d(0x741)](0x0,0x0,_0x54240e,_0x5199ea),_0x1ab5b6['scale']['x']=0x1/_0x336f7f[_0x19434d(0x336)]['x'],_0x1ab5b6[_0x19434d(0x336)]['y']=0x1/_0x336f7f[_0x19434d(0x336)]['y'],_0x336f7f[_0x19434d(0x787)](this['_colorTone']);},Game_Temp[_0x30b69f(0x5fe)][_0x30b69f(0x291)]=function(){const _0x137807=_0x30b69f;this[_0x137807(0x4b1)]=[],this[_0x137807(0x5cd)]=[],this[_0x137807(0x624)]=[],this[_0x137807(0x4f0)]=[];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x70b)]=Scene_Base[_0x30b69f(0x5fe)][_0x30b69f(0x356)],Scene_Base['prototype'][_0x30b69f(0x356)]=function(){const _0x2dee2c=_0x30b69f;if($gameTemp)$gameTemp[_0x2dee2c(0x291)]();VisuMZ['CoreEngine'][_0x2dee2c(0x70b)][_0x2dee2c(0x305)](this);},Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x2a5)]=function(_0x3ea999){const _0x5169bd=_0x30b69f,_0x4bd2d2=this[_0x5169bd(0x29a)];_0x4bd2d2[_0x5169bd(0x5d6)](),_0x4bd2d2[_0x5169bd(0x328)]=this[_0x5169bd(0x57d)]();const _0x122be1=_0x4bd2d2['measureText'](_0x3ea999)[_0x5169bd(0x6c7)];return _0x4bd2d2['restore'](),_0x122be1;},Window_Message['prototype'][_0x30b69f(0x53a)]=function(_0x11d947){const _0x3bd3df=_0x30b69f;return this[_0x3bd3df(0x829)]()?this[_0x3bd3df(0x3ea)][_0x3bd3df(0x2a5)](_0x11d947):Window_Base['prototype']['textWidth'][_0x3bd3df(0x305)](this,_0x11d947);},Window_Message[_0x30b69f(0x5fe)]['useFontWidthFix']=function(){const _0x3dea30=_0x30b69f;return VisuMZ[_0x3dea30(0x5d8)]['Settings'][_0x3dea30(0x702)][_0x3dea30(0x449)]??!![];},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x67e)]=Game_Action[_0x30b69f(0x5fe)]['numRepeats'],Game_Action[_0x30b69f(0x5fe)][_0x30b69f(0x64b)]=function(){const _0x4aaa8e=_0x30b69f;return this['item']()?VisuMZ[_0x4aaa8e(0x5d8)][_0x4aaa8e(0x67e)][_0x4aaa8e(0x305)](this):0x0;},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x555)]=Game_Action['prototype']['setAttack'],Game_Action[_0x30b69f(0x5fe)]['setAttack']=function(){const _0x3ecfc8=_0x30b69f;this['subject']()&&this[_0x3ecfc8(0x705)]()[_0x3ecfc8(0x65e)]()?VisuMZ[_0x3ecfc8(0x5d8)][_0x3ecfc8(0x555)]['call'](this):this[_0x3ecfc8(0x503)]();},Sprite_Name[_0x30b69f(0x5fe)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x30b69f(0x5fe)]['redraw']=function(){const _0x594f40=_0x30b69f,_0x23387d=this['name'](),_0x5ca72c=this[_0x594f40(0x71d)](),_0x39a411=this[_0x594f40(0x74b)]();this[_0x594f40(0x6a7)](),this[_0x594f40(0x516)][_0x594f40(0x503)](),this[_0x594f40(0x516)][_0x594f40(0x351)](_0x23387d,0x0,0x0,_0x5ca72c,_0x39a411,'left');},Bitmap[_0x30b69f(0x5fe)][_0x30b69f(0x351)]=function(_0x3be115,_0x3b9c60,_0x49394e,_0x53ae47,_0x397282,_0x3f19de){const _0x38e3ed=_0x30b69f,_0x3ac670=this[_0x38e3ed(0x29a)],_0x76f4b4=_0x3ac670['globalAlpha'];_0x53ae47=_0x53ae47||0xffffffff;let _0x12ec86=_0x3b9c60,_0x27f9cf=Math[_0x38e3ed(0x297)](_0x49394e+0x18/0x2+this[_0x38e3ed(0x619)]*0.35);_0x3f19de===_0x38e3ed(0x493)&&(_0x12ec86+=_0x53ae47/0x2),_0x3f19de===_0x38e3ed(0x42d)&&(_0x12ec86+=_0x53ae47),_0x3ac670[_0x38e3ed(0x5d6)](),_0x3ac670[_0x38e3ed(0x328)]=this[_0x38e3ed(0x57d)](),_0x3ac670['textAlign']=_0x3f19de,_0x3ac670[_0x38e3ed(0x7a7)]=_0x38e3ed(0x5b2),_0x3ac670[_0x38e3ed(0x515)]=0x1,this[_0x38e3ed(0x692)](_0x3be115,_0x12ec86,_0x27f9cf,_0x53ae47),_0x3ac670[_0x38e3ed(0x515)]=_0x76f4b4,this['_drawTextBody'](_0x3be115,_0x12ec86,_0x27f9cf,_0x53ae47),_0x3ac670[_0x38e3ed(0x274)](),this[_0x38e3ed(0x2da)][_0x38e3ed(0x202)]();},VisuMZ[_0x30b69f(0x5d8)][_0x30b69f(0x2b8)]=BattleManager[_0x30b69f(0x586)],BattleManager[_0x30b69f(0x586)]=function(_0x58a0e6){const _0x363e5a=_0x30b69f;if(this[_0x363e5a(0x3d0)][_0x363e5a(0x66b)]())return![];return VisuMZ[_0x363e5a(0x5d8)]['BattleManager_checkSubstitute'][_0x363e5a(0x305)](this,_0x58a0e6);};