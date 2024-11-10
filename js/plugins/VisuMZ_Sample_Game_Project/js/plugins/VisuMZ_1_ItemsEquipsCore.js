//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.37;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.37] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
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
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x4222e9=_0x2aab;(function(_0x20092b,_0x4e6d53){const _0x5da3d5=_0x2aab,_0xbd7d62=_0x20092b();while(!![]){try{const _0x1d337e=parseInt(_0x5da3d5(0x39b))/0x1+parseInt(_0x5da3d5(0x2e1))/0x2+parseInt(_0x5da3d5(0x290))/0x3+-parseInt(_0x5da3d5(0x3db))/0x4+-parseInt(_0x5da3d5(0x4c3))/0x5+-parseInt(_0x5da3d5(0x3d9))/0x6*(parseInt(_0x5da3d5(0x493))/0x7)+parseInt(_0x5da3d5(0x10d))/0x8;if(_0x1d337e===_0x4e6d53)break;else _0xbd7d62['push'](_0xbd7d62['shift']());}catch(_0x5ef7b1){_0xbd7d62['push'](_0xbd7d62['shift']());}}}(_0x17ca,0xe235b));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5ed68a){const _0x5eb7d6=_0x2aab;return _0x5ed68a['status']&&_0x5ed68a[_0x5eb7d6(0x182)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4222e9(0x471)]||{},VisuMZ[_0x4222e9(0x4c5)]=function(_0x24d29a,_0x515843){const _0x312f82=_0x4222e9;for(const _0x58f258 in _0x515843){if(_0x58f258[_0x312f82(0x1cf)](/(.*):(.*)/i)){const _0x4ea6fb=String(RegExp['$1']),_0x80495b=String(RegExp['$2'])[_0x312f82(0x258)]()[_0x312f82(0x277)]();let _0x5cf973,_0x1dfda3,_0x180aae;switch(_0x80495b){case _0x312f82(0x39f):_0x5cf973=_0x515843[_0x58f258]!==''?Number(_0x515843[_0x58f258]):0x0;break;case'ARRAYNUM':_0x1dfda3=_0x515843[_0x58f258]!==''?JSON['parse'](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0x982d0f=>Number(_0x982d0f));break;case _0x312f82(0x448):_0x5cf973=_0x515843[_0x58f258]!==''?eval(_0x515843[_0x58f258]):null;break;case _0x312f82(0x286):_0x1dfda3=_0x515843[_0x58f258]!==''?JSON[_0x312f82(0x84)](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0x193f1d=>eval(_0x193f1d));break;case _0x312f82(0x226):_0x5cf973=_0x515843[_0x58f258]!==''?JSON[_0x312f82(0x84)](_0x515843[_0x58f258]):'';break;case'ARRAYJSON':_0x1dfda3=_0x515843[_0x58f258]!==''?JSON['parse'](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0x51f25e=>JSON[_0x312f82(0x84)](_0x51f25e));break;case _0x312f82(0x31e):_0x5cf973=_0x515843[_0x58f258]!==''?new Function(JSON[_0x312f82(0x84)](_0x515843[_0x58f258])):new Function(_0x312f82(0x1bc));break;case'ARRAYFUNC':_0x1dfda3=_0x515843[_0x58f258]!==''?JSON[_0x312f82(0x84)](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0x147611=>new Function(JSON[_0x312f82(0x84)](_0x147611)));break;case'STR':_0x5cf973=_0x515843[_0x58f258]!==''?String(_0x515843[_0x58f258]):'';break;case _0x312f82(0x255):_0x1dfda3=_0x515843[_0x58f258]!==''?JSON['parse'](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0x40db9c=>String(_0x40db9c));break;case'STRUCT':_0x180aae=_0x515843[_0x58f258]!==''?JSON['parse'](_0x515843[_0x58f258]):{},_0x24d29a[_0x4ea6fb]={},VisuMZ['ConvertParams'](_0x24d29a[_0x4ea6fb],_0x180aae);continue;case'ARRAYSTRUCT':_0x1dfda3=_0x515843[_0x58f258]!==''?JSON[_0x312f82(0x84)](_0x515843[_0x58f258]):[],_0x5cf973=_0x1dfda3[_0x312f82(0x3c8)](_0xbc93a7=>VisuMZ[_0x312f82(0x4c5)]({},JSON[_0x312f82(0x84)](_0xbc93a7)));break;default:continue;}_0x24d29a[_0x4ea6fb]=_0x5cf973;}}return _0x24d29a;},(_0x57ece2=>{const _0x74aed6=_0x4222e9,_0x1d18e2=_0x57ece2[_0x74aed6(0x3a4)];for(const _0x21363d of dependencies){if(!Imported[_0x21363d]){alert(_0x74aed6(0x399)['format'](_0x1d18e2,_0x21363d)),SceneManager[_0x74aed6(0x487)]();break;}}const _0x380f71=_0x57ece2['description'];if(_0x380f71[_0x74aed6(0x1cf)](/\[Version[ ](.*?)\]/i)){if(_0x74aed6(0x2bb)!==_0x74aed6(0x4fc)){const _0x48642e=Number(RegExp['$1']);_0x48642e!==VisuMZ[label][_0x74aed6(0x2d0)]&&(alert(_0x74aed6(0x1cd)[_0x74aed6(0x474)](_0x1d18e2,_0x48642e)),SceneManager[_0x74aed6(0x487)]());}else{const _0x289a2c=this[_0x74aed6(0x434)](_0x48e4fd);if(_0x289a2c[_0x74aed6(0x1cf)](/\\I\[(\d+)\]/i)){const _0x33717e=this['itemLineRect'](_0x2095fe),_0x35653d=this['textSizeEx'](_0x289a2c)['width'];return _0x35653d<=_0x33717e['width']?_0x74aed6(0x18e):_0x74aed6(0x268);}}}if(_0x380f71['match'](/\[Tier[ ](\d+)\]/i)){if(_0x74aed6(0x354)!==_0x74aed6(0x44e)){const _0x485231=Number(RegExp['$1']);if(_0x485231<tier){if(_0x74aed6(0x1a3)==='lufGf'){if(this[_0x74aed6(0x408)]())return this[_0x74aed6(0x3ff)][_0x74aed6(0xa2)]()===0x1?_0x3a50b7[_0x74aed6(0x41c)](_0x74aed6(0xd5),_0x74aed6(0x3e1)):_0x36b013[_0x74aed6(0x41c)](_0x74aed6(0x47f),_0x74aed6(0x42e));return _0x173c89[_0x74aed6(0x3f5)][_0x74aed6(0x213)]['call'](this);}else alert(_0x74aed6(0x301)['format'](_0x1d18e2,_0x485231,tier)),SceneManager[_0x74aed6(0x487)]();}else'muqQr'!==_0x74aed6(0x190)?tier=Math[_0x74aed6(0x1b7)](_0x485231,tier):_0x150eaa[_0x74aed6(0x3f5)][_0x74aed6(0x2c1)][_0x74aed6(0x37b)](this);}else{const _0x5b3dcc=_0x74aed6(0x46e);if(this[_0x74aed6(0x13a)][_0x5b3dcc])return this[_0x74aed6(0x13a)][_0x5b3dcc];if(_0x5b3dac[_0x74aed6(0x2f9)]){const _0x53c142=this[_0x74aed6(0x106)][_0x74aed6(0x223)];if(_0x53c142[_0x74aed6(0x1cf)](/<ALWAYS HIT>/i))return _0x74aed6(0x24a);else{if(_0x53c142['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x74aed6(0x2cc)[_0x74aed6(0x474)](_0x2e9dec(_0x2e112b['$1']));}}return _0x74aed6(0x2cc)[_0x74aed6(0x474)](this[_0x74aed6(0x106)][_0x74aed6(0x3ce)]);}}VisuMZ[_0x74aed6(0x4c5)](VisuMZ[label][_0x74aed6(0x471)],_0x57ece2[_0x74aed6(0x2f5)]);})(pluginData),PluginManager[_0x4222e9(0x36a)](pluginData[_0x4222e9(0x3a4)],_0x4222e9(0x12a),_0x49dcfd=>{const _0x5714bf=_0x4222e9;VisuMZ[_0x5714bf(0x4c5)](_0x49dcfd,_0x49dcfd);const _0x5e4d74=_0x49dcfd[_0x5714bf(0x372)][_0x5714bf(0x3c8)](_0x3680b0=>$gameActors['actor'](_0x3680b0)),_0x1d0cb6=_0x49dcfd['Slots']['map'](_0xdf05c6=>$dataSystem[_0x5714bf(0x18d)]['indexOf'](_0xdf05c6[_0x5714bf(0x277)]()));for(const _0x1331cf of _0x5e4d74){if(_0x5714bf(0x1e0)!==_0x5714bf(0x3f6)){if(!_0x1331cf)continue;_0x1331cf[_0x5714bf(0xfb)](_0x1d0cb6);}else return'?????';}}),PluginManager[_0x4222e9(0x36a)](pluginData['name'],_0x4222e9(0x1d2),_0x37e928=>{const _0x382d1d=_0x4222e9;VisuMZ[_0x382d1d(0x4c5)](_0x37e928,_0x37e928);const _0x3c0bc3=_0x37e928['Actors']['map'](_0x2a5f70=>$gameActors[_0x382d1d(0x22a)](_0x2a5f70));for(const _0x34c0da of _0x3c0bc3){if(!_0x34c0da)continue;_0x34c0da['forceResetEquipSlots']();}}),PluginManager[_0x4222e9(0x36a)](pluginData[_0x4222e9(0x3a4)],_0x4222e9(0x10b),_0x167d9a=>{const _0x285f4a=_0x4222e9;VisuMZ[_0x285f4a(0x4c5)](_0x167d9a,_0x167d9a);const _0x47d549=[],_0x5307e9=_0x167d9a[_0x285f4a(0x210)][_0x285f4a(0x3c8)](_0x42ca50=>_0x42ca50[_0x285f4a(0x258)]()[_0x285f4a(0x277)]()),_0x538590=_0x167d9a['Whitelist'][_0x285f4a(0x3c8)](_0x4f4e04=>_0x4f4e04[_0x285f4a(0x258)]()[_0x285f4a(0x277)]()),_0x38d871=_0x167d9a[_0x285f4a(0x3a7)]>=_0x167d9a[_0x285f4a(0x1a1)]?_0x167d9a[_0x285f4a(0x1a1)]:_0x167d9a[_0x285f4a(0x3a7)],_0x7501cd=_0x167d9a[_0x285f4a(0x3a7)]>=_0x167d9a['Step1Start']?_0x167d9a[_0x285f4a(0x3a7)]:_0x167d9a['Step1Start'],_0x8fe7e9=Array(_0x7501cd-_0x38d871+0x1)[_0x285f4a(0x19a)]()[_0x285f4a(0x3c8)]((_0x527581,_0x2fc4cf)=>_0x38d871+_0x2fc4cf);for(const _0x3f9733 of _0x8fe7e9){if('PRTOE'==='HukQj')_0x3ae68e+='%1'[_0x285f4a(0x474)](this[_0x285f4a(0xa9)]['selfTP']);else{const _0x568015=$dataItems[_0x3f9733];if(!_0x568015)continue;if(!VisuMZ[_0x285f4a(0x16c)][_0x285f4a(0x3e0)](_0x568015,_0x5307e9,_0x538590))continue;_0x47d549['push']([0x0,_0x3f9733,0x0,_0x568015['price']]);}}const _0x104a2c=_0x167d9a[_0x285f4a(0x33b)]>=_0x167d9a[_0x285f4a(0x49f)]?_0x167d9a[_0x285f4a(0x49f)]:_0x167d9a['Step2End'],_0x1df893=_0x167d9a[_0x285f4a(0x33b)]>=_0x167d9a['Step2Start']?_0x167d9a['Step2End']:_0x167d9a['Step2Start'],_0x414251=Array(_0x1df893-_0x104a2c+0x1)[_0x285f4a(0x19a)]()[_0x285f4a(0x3c8)]((_0x280588,_0x22cbad)=>_0x104a2c+_0x22cbad);for(const _0x2e99f5 of _0x414251){if('Ngvhn'!==_0x285f4a(0x155))return _0x594955[_0x285f4a(0x319)]('shift');else{const _0x3f7877=$dataWeapons[_0x2e99f5];if(!_0x3f7877)continue;if(!VisuMZ[_0x285f4a(0x16c)][_0x285f4a(0x3e0)](_0x3f7877,_0x5307e9,_0x538590))continue;_0x47d549[_0x285f4a(0x48f)]([0x1,_0x2e99f5,0x0,_0x3f7877[_0x285f4a(0x4ad)]]);}}const _0x1647ac=_0x167d9a['Step3End']>=_0x167d9a[_0x285f4a(0x3c9)]?_0x167d9a[_0x285f4a(0x3c9)]:_0x167d9a[_0x285f4a(0xa8)],_0x2d21bd=_0x167d9a['Step3End']>=_0x167d9a[_0x285f4a(0x3c9)]?_0x167d9a['Step3End']:_0x167d9a[_0x285f4a(0x3c9)],_0x1a9c18=Array(_0x2d21bd-_0x1647ac+0x1)[_0x285f4a(0x19a)]()['map']((_0x25161d,_0x207831)=>_0x1647ac+_0x207831);for(const _0x1f8d95 of _0x1a9c18){if(_0x285f4a(0x25d)==='KGROa'){const _0x5cb4b6=$dataArmors[_0x1f8d95];if(!_0x5cb4b6)continue;if(!VisuMZ[_0x285f4a(0x16c)][_0x285f4a(0x3e0)](_0x5cb4b6,_0x5307e9,_0x538590))continue;_0x47d549[_0x285f4a(0x48f)]([0x2,_0x1f8d95,0x0,_0x5cb4b6[_0x285f4a(0x4ad)]]);}else _0x1a7efe=_0x185806(_0x9b6fdf['$1'])[_0x285f4a(0x1b6)]()['trim']();}SceneManager[_0x285f4a(0x48f)](Scene_Shop),SceneManager[_0x285f4a(0x1fc)](_0x47d549,_0x167d9a['PurchaseOnly']);}),VisuMZ[_0x4222e9(0x16c)]['IncludeShopItem']=function(_0x47fc7f,_0x1f6273,_0x152451){const _0x4640a6=_0x4222e9;if(_0x47fc7f[_0x4640a6(0x3a4)][_0x4640a6(0x277)]()==='')return![];if(_0x47fc7f[_0x4640a6(0x3a4)][_0x4640a6(0x1cf)](/-----/i))return![];const _0x30888a=_0x47fc7f[_0x4640a6(0x125)];if(_0x1f6273[_0x4640a6(0x1ae)]>0x0){if(_0x4640a6(0x4aa)!==_0x4640a6(0x143))for(const _0x470251 of _0x1f6273){if('goCSR'!=='MAGYb'){if(!_0x470251)continue;if(_0x30888a[_0x4640a6(0x302)](_0x470251))return![];}else this[_0x4640a6(0x489)]++;}else return _0x51d99d[_0x4640a6(0x16c)][_0x4640a6(0x3b3)][_0x4640a6(0x37b)](this);}if(_0x152451[_0x4640a6(0x1ae)]>0x0){for(const _0x5ed799 of _0x152451){if(!_0x5ed799)continue;if(_0x30888a[_0x4640a6(0x302)](_0x5ed799))return!![];}return![];}return!![];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x240)]=Scene_Boot[_0x4222e9(0x3f5)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x4222e9(0x496)]=function(){const _0x267355=_0x4222e9;this[_0x267355(0x465)](),VisuMZ[_0x267355(0x16c)]['Scene_Boot_onDatabaseLoaded'][_0x267355(0x37b)](this),this[_0x267355(0x151)](),VisuMZ['ItemsEquipsCore']['SetupProxyItemGroups']();},Scene_Boot[_0x4222e9(0x3f5)][_0x4222e9(0x465)]=function(){const _0x67d3f2=_0x4222e9;VisuMZ[_0x67d3f2(0x16c)]['RegExp']={},VisuMZ[_0x67d3f2(0x16c)][_0x67d3f2(0x231)][_0x67d3f2(0x250)]=[],VisuMZ[_0x67d3f2(0x16c)][_0x67d3f2(0x231)][_0x67d3f2(0x3c5)]=[];const _0x4f0118=[_0x67d3f2(0x3cf),_0x67d3f2(0x466),'ATK','DEF','MAT',_0x67d3f2(0x86),'AGI','LUK'];for(const _0x2b1e3f of _0x4f0118){if('NeIKd'==='DWPfo')return this[_0x67d3f2(0x106)][_0x67d3f2(0x4ad)]*this[_0x67d3f2(0x364)]();else{const _0x34fd8a='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x67d3f2(0x474)](_0x2b1e3f);VisuMZ[_0x67d3f2(0x16c)]['RegExp'][_0x67d3f2(0x250)][_0x67d3f2(0x48f)](new RegExp(_0x34fd8a,'i'));const _0x45dd73=_0x67d3f2(0x32d)[_0x67d3f2(0x474)](_0x2b1e3f);VisuMZ[_0x67d3f2(0x16c)][_0x67d3f2(0x231)][_0x67d3f2(0x3c5)]['push'](new RegExp(_0x45dd73,'g'));}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){const _0xcd998e=_0x4222e9;if(VisuMZ['ParseAllNotetags'])return;this[_0xcd998e(0x4ca)]();const _0x24d59e=[$dataItems,$dataWeapons,$dataArmors];for(const _0x2fb8c1 of _0x24d59e){for(const _0x8edf42 of _0x2fb8c1){if('MWAkz'!==_0xcd998e(0xd7)){if(!_0x8edf42)continue;VisuMZ[_0xcd998e(0x16c)][_0xcd998e(0x4d9)](_0x8edf42,_0x2fb8c1),VisuMZ[_0xcd998e(0x16c)][_0xcd998e(0x3de)](_0x8edf42,_0x2fb8c1),VisuMZ[_0xcd998e(0x16c)]['Parse_Notetags_ParamValues'](_0x8edf42,_0x2fb8c1),VisuMZ[_0xcd998e(0x16c)][_0xcd998e(0x342)](_0x8edf42,_0x2fb8c1),VisuMZ[_0xcd998e(0x16c)][_0xcd998e(0x4d1)](_0x8edf42,_0x2fb8c1);}else _0x4c82ee=_0x1863df[_0xcd998e(0x8c)]['Settings'][_0xcd998e(0x25f)]['ExtDisplayedParams'];}}},Scene_Boot[_0x4222e9(0x3f5)][_0x4222e9(0x4ca)]=function(){const _0x329e01=_0x4222e9;for(const _0x9b8068 of $dataClasses){if(!_0x9b8068)continue;VisuMZ['ItemsEquipsCore'][_0x329e01(0x147)](_0x9b8068);}},VisuMZ[_0x4222e9(0x16c)]['ParseClassNotetags']=VisuMZ[_0x4222e9(0x2a7)],VisuMZ[_0x4222e9(0x2a7)]=function(_0x491ad2){const _0x535d4c=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x535d4c(0x2a7)][_0x535d4c(0x37b)](this,_0x491ad2),VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0x491ad2);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x321)]=VisuMZ[_0x4222e9(0x321)],VisuMZ[_0x4222e9(0x321)]=function(_0x287cda){const _0x16ddc5=_0x4222e9;VisuMZ[_0x16ddc5(0x16c)]['ParseItemNotetags']['call'](this,_0x287cda),VisuMZ[_0x16ddc5(0x16c)][_0x16ddc5(0x183)](_0x287cda,$dataItems);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x1af)]=VisuMZ[_0x4222e9(0x1af)],VisuMZ['ParseWeaponNotetags']=function(_0x1c2800){const _0x1e3eca=_0x4222e9;VisuMZ[_0x1e3eca(0x16c)][_0x1e3eca(0x1af)]['call'](this,_0x1c2800),VisuMZ[_0x1e3eca(0x16c)]['Parse_Notetags_Batch'](_0x1c2800,$dataWeapons);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x216)]=VisuMZ[_0x4222e9(0x216)],VisuMZ['ParseArmorNotetags']=function(_0x1f998e){const _0x4f33dc=_0x4222e9;VisuMZ[_0x4f33dc(0x16c)]['ParseArmorNotetags'][_0x4f33dc(0x37b)](this,_0x1f998e),VisuMZ['ItemsEquipsCore'][_0x4f33dc(0x183)](_0x1f998e,$dataArmors);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x147)]=function(_0x264171){const _0x5ac40f=_0x4222e9;_0x264171[_0x5ac40f(0x2bd)]=[];if(!BattleManager['isBattleTest']()&&_0x264171[_0x5ac40f(0x223)][_0x5ac40f(0x1cf)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x6dc652=String(RegExp['$1'])[_0x5ac40f(0x3cb)](/[\r\n]+/);for(const _0x32cb62 of _0x6dc652){const _0x12c21f=$dataSystem['equipTypes']['indexOf'](_0x32cb62[_0x5ac40f(0x277)]());if(_0x12c21f>0x0)_0x264171[_0x5ac40f(0x2bd)]['push'](_0x12c21f);}}else for(const _0x1ed198 of $dataSystem[_0x5ac40f(0x18d)]){if(_0x5ac40f(0x312)===_0x5ac40f(0x312)){const _0x2258c3=$dataSystem['equipTypes']['indexOf'](_0x1ed198[_0x5ac40f(0x277)]());if(_0x2258c3>0x0)_0x264171[_0x5ac40f(0x2bd)][_0x5ac40f(0x48f)](_0x2258c3);}else _0x3144f2['prototype'][_0x5ac40f(0x1be)][_0x5ac40f(0x37b)](this);}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x183)]=function(_0x4d5729,_0x3d83aa){const _0x50658b=_0x4222e9;VisuMZ[_0x50658b(0x16c)][_0x50658b(0x4d9)](_0x4d5729,_0x3d83aa),VisuMZ['ItemsEquipsCore'][_0x50658b(0x3de)](_0x4d5729,_0x3d83aa),VisuMZ['ItemsEquipsCore'][_0x50658b(0x142)](_0x4d5729,_0x3d83aa),VisuMZ[_0x50658b(0x16c)][_0x50658b(0x342)](_0x4d5729,_0x3d83aa),VisuMZ[_0x50658b(0x16c)][_0x50658b(0x4d1)](_0x4d5729,_0x3d83aa);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x4d9)]=function(_0x27f610,_0x3fd802){const _0x5ea8c8=_0x4222e9;_0x27f610['categories']=[];const _0x4b913b=_0x27f610[_0x5ea8c8(0x223)],_0x1a324d=_0x4b913b[_0x5ea8c8(0x1cf)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1a324d)for(const _0x175b37 of _0x1a324d){if('pKkuX'===_0x5ea8c8(0x402)){_0x175b37['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2423a9=String(RegExp['$1'])[_0x5ea8c8(0x258)]()['trim']()[_0x5ea8c8(0x3cb)](',');for(const _0x141371 of _0x2423a9){if(_0x5ea8c8(0x4f6)===_0x5ea8c8(0x17a)){_0x4dff47=this[_0x5ea8c8(0xb3)](_0x4d5f41);const _0x40ee5b=this['equipSlots']();this[_0x5ea8c8(0xc4)]=[];for(let _0x5e668b=0x0;_0x5e668b<_0x40ee5b['length'];_0x5e668b++){this['_equips'][_0x5e668b]=new _0x4a4142();}for(let _0x55fd81=0x0;_0x55fd81<_0x40ee5b['length'];_0x55fd81++){const _0x16232b=_0x40ee5b[_0x55fd81],_0x453c08=this[_0x5ea8c8(0x4c1)](_0x7d64dc,_0x16232b);if(this[_0x5ea8c8(0xac)](_0x453c08))this[_0x5ea8c8(0xc4)][_0x55fd81][_0x5ea8c8(0x44c)](_0x453c08);}this['releaseUnequippableItems'](!![]),this[_0x5ea8c8(0x49d)]();}else _0x27f610[_0x5ea8c8(0x125)]['push'](_0x141371[_0x5ea8c8(0x277)]());}}else return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x5ea8c8(0x4ec)]():_0x1e4e1b['ItemsEquipsCore'][_0x5ea8c8(0x455)]['call'](this);}if(_0x4b913b[_0x5ea8c8(0x1cf)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x49c310=RegExp['$1']['split'](/[\r\n]+/);for(const _0x29c0e6 of _0x49c310){_0x5ea8c8(0x35d)!=='lhyrQ'?_0x1e1760+=_0x5ea8c8(0x139)[_0x5ea8c8(0x474)](this[_0x5ea8c8(0xa9)][_0x5ea8c8(0x80)]):_0x27f610[_0x5ea8c8(0x125)][_0x5ea8c8(0x48f)](_0x29c0e6['toUpperCase']()['trim']());}}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x3de)]=function(_0x1ebcf3,_0x3ae2d4){const _0x5e9c0e=_0x4222e9;if(_0x1ebcf3[_0x5e9c0e(0x223)][_0x5e9c0e(0x1cf)](/<PRICE:[ ](\d+)>/i)){if(_0x5e9c0e(0x165)!==_0x5e9c0e(0x430))_0x1ebcf3[_0x5e9c0e(0x4ad)]=Number(RegExp['$1']);else return this[_0x5e9c0e(0x3ba)]();}},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x142)]=function(_0x189dc5,_0x4caa90){const _0x4f9687=_0x4222e9;if(_0x4caa90===$dataItems)return;for(let _0x2b3a78=0x0;_0x2b3a78<0x8;_0x2b3a78++){const _0x3b2709=VisuMZ[_0x4f9687(0x16c)][_0x4f9687(0x231)]['EquipParams'][_0x2b3a78];_0x189dc5[_0x4f9687(0x223)][_0x4f9687(0x1cf)](_0x3b2709)&&(_0x189dc5[_0x4f9687(0x2c9)][_0x2b3a78]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x421)]={},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x342)]=function(_0x2ac384,_0x15e576){const _0x46f6e0=_0x4222e9;if(_0x15e576===$dataItems)return;if(_0x2ac384[_0x46f6e0(0x223)]['match'](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x5d8404=String(RegExp['$1']),_0xd4b618=(_0x15e576===$dataWeapons?_0x46f6e0(0x4b6):_0x46f6e0(0x418))['format'](_0x2ac384['id']),_0x57c229='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x5d8404);for(let _0xf62ad4=0x0;_0xf62ad4<0x8;_0xf62ad4++){if(_0x5d8404['match'](VisuMZ[_0x46f6e0(0x16c)][_0x46f6e0(0x231)][_0x46f6e0(0x3c5)][_0xf62ad4])){const _0x559e56=_0x46f6e0(0x239)[_0x46f6e0(0x474)](_0xd4b618,_0xf62ad4);VisuMZ['ItemsEquipsCore'][_0x46f6e0(0x421)][_0x559e56]=new Function(_0x46f6e0(0x1f2),_0x46f6e0(0x4c2),_0x57c229);}}}},VisuMZ[_0x4222e9(0x16c)]['itemEnableJS']={},VisuMZ[_0x4222e9(0x16c)]['Parse_Notetags_EnableJS']=function(_0x17f387,_0x1c6a4b){const _0x3db615=_0x4222e9;if(_0x1c6a4b!==$dataItems)return;if(_0x17f387[_0x3db615(0x223)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x3db615(0x21d)!==_0x3db615(0x21d)){const _0xf6ef6e=_0x3db615(0x2be);if(this['_customItemInfo'][_0xf6ef6e])return this[_0x3db615(0x13a)][_0xf6ef6e];const _0x4e2c54=_0x41b2f7[_0x3db615(0x16c)][_0x3db615(0x471)]['StatusWindow'],_0x34bc70=_0x3db615(0x1d8)[_0x3db615(0x474)](this[_0x3db615(0x106)][_0x3db615(0x200)]);return _0x4e2c54[_0x34bc70];}else{const _0x30b70a=String(RegExp['$1']),_0x21d399=_0x3db615(0x275)[_0x3db615(0x474)](_0x30b70a);VisuMZ[_0x3db615(0x16c)]['itemEnableJS'][_0x17f387['id']]=new Function(_0x3db615(0x1f2),_0x21d399);}}},DataManager[_0x4222e9(0x17d)]=function(_0x3032a7){const _0x2716c4=_0x4222e9;return this['isItem'](_0x3032a7)&&_0x3032a7[_0x2716c4(0x392)]===0x2;},DataManager[_0x4222e9(0x233)]=function(_0x21dea4){const _0x42c146=_0x4222e9;if(!_0x21dea4){if(_0x42c146(0x30a)!==_0x42c146(0x2a5))return 0x63;else{const _0x3fbf74=_0x1bd5e0['armorTypes'][_0x42c146(0x3fb)](_0x147993(_0x20e1b0['$1'])['trim']());return _0x1a6ccd[_0x42c146(0x102)](_0x33cd75)&&_0x2fee34[_0x42c146(0x45d)]===_0x3fbf74;}}else{if(_0x21dea4[_0x42c146(0x223)]['match'](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x42c146(0x3ee)===_0x42c146(0x3ee))return this[_0x42c146(0x2aa)](_0x21dea4);else _0x2a7c48['categories'][_0x42c146(0x48f)](_0x859ef6['toUpperCase']()[_0x42c146(0x277)]());}}},DataManager[_0x4222e9(0x2aa)]=function(_0x22a0e2){const _0x3a3f9b=_0x4222e9;if(this['isItem'](_0x22a0e2)){if(_0x3a3f9b(0x4ac)===_0x3a3f9b(0x8d))this[_0x3a3f9b(0x43b)](_0x436ce9);else return VisuMZ[_0x3a3f9b(0x16c)][_0x3a3f9b(0x471)]['ItemScene'][_0x3a3f9b(0x2fa)];}else{if(this[_0x3a3f9b(0x1b9)](_0x22a0e2))return VisuMZ[_0x3a3f9b(0x16c)]['Settings']['ItemScene'][_0x3a3f9b(0x409)];else{if(this[_0x3a3f9b(0x102)](_0x22a0e2)){if('sYMBP'!==_0x3a3f9b(0x11b))return VisuMZ[_0x3a3f9b(0x16c)][_0x3a3f9b(0x471)]['ItemScene'][_0x3a3f9b(0x4f9)];else{if(!_0x3c801b)return 0x63;else return _0x3552b0[_0x3a3f9b(0x223)][_0x3a3f9b(0x1cf)](/<MAX:[ ](\d+)>/i)?_0x1f952a(_0x2ad8c0['$1']):this[_0x3a3f9b(0x2aa)](_0x28aa60);}}}}},DataManager[_0x4222e9(0x3b6)]=function(_0x496321){const _0xeac083=_0x4222e9;_0x496321=_0x496321['toUpperCase']()['trim'](),this['_itemIDs']=this[_0xeac083(0x123)]||{};if(this[_0xeac083(0x123)][_0x496321])return this[_0xeac083(0x123)][_0x496321];for(const _0x1b2ad2 of $dataItems){if(!_0x1b2ad2)continue;this[_0xeac083(0x123)][_0x1b2ad2[_0xeac083(0x3a4)][_0xeac083(0x258)]()[_0xeac083(0x277)]()]=_0x1b2ad2['id'];}return this[_0xeac083(0x123)][_0x496321]||0x0;},DataManager[_0x4222e9(0x401)]=function(_0x2d9d81){const _0x21d0d1=_0x4222e9;_0x2d9d81=_0x2d9d81[_0x21d0d1(0x258)]()['trim'](),this['_weaponIDs']=this['_weaponIDs']||{};if(this[_0x21d0d1(0x18b)][_0x2d9d81])return this['_weaponIDs'][_0x2d9d81];for(const _0x302ea7 of $dataWeapons){if(!_0x302ea7)continue;this[_0x21d0d1(0x18b)][_0x302ea7['name'][_0x21d0d1(0x258)]()[_0x21d0d1(0x277)]()]=_0x302ea7['id'];}return this['_weaponIDs'][_0x2d9d81]||0x0;},DataManager['getArmorIdWithName']=function(_0x1cf39e){const _0x5bb627=_0x4222e9;_0x1cf39e=_0x1cf39e[_0x5bb627(0x258)]()[_0x5bb627(0x277)](),this['_armorIDs']=this['_armorIDs']||{};if(this[_0x5bb627(0x4a3)][_0x1cf39e])return this[_0x5bb627(0x4a3)][_0x1cf39e];for(const _0x1d78b1 of $dataArmors){if(_0x5bb627(0x443)!==_0x5bb627(0x443))this['_slotWindow'][_0x5bb627(0x40e)](0x0),this[_0x5bb627(0x22e)]['activate']();else{if(!_0x1d78b1)continue;this['_armorIDs'][_0x1d78b1[_0x5bb627(0x3a4)][_0x5bb627(0x258)]()[_0x5bb627(0x277)]()]=_0x1d78b1['id'];}}return this[_0x5bb627(0x4a3)][_0x1cf39e]||0x0;},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x4f1)]=function(){const _0x4ef0ba=_0x4222e9;VisuMZ['ItemsEquipsCore']['SetupProxyItemGroup']($dataItems),VisuMZ[_0x4ef0ba(0x16c)][_0x4ef0ba(0x39e)]($dataWeapons),VisuMZ[_0x4ef0ba(0x16c)]['SetupProxyItemGroup']($dataArmors);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x39e)]=function(_0x56c08e){const _0x8338dc=_0x4222e9;for(const _0x54377c of _0x56c08e){if(_0x8338dc(0x313)!==_0x8338dc(0x38f)){if(!_0x54377c)continue;if(!DataManager['isProxyItem'](_0x54377c))continue;const _0x3396fa=DataManager[_0x8338dc(0x4be)](_0x54377c),_0x1021dc=[_0x8338dc(0x3a4),_0x8338dc(0x1a0),_0x8338dc(0x182)];for(const _0x1be3e9 of _0x1021dc){if(_0x8338dc(0x3ad)!=='EoSLS'){if(!_0x39ef90[_0x8338dc(0x292)](this[_0x8338dc(0x106)]))return![];const _0x545471=this[_0x8338dc(0x179)]();this[_0x8338dc(0x1f4)](_0x545471,_0x41ce1f,_0x32f580,_0x14770a,!![]);const _0x3d1c77=this[_0x8338dc(0x118)]();return this[_0x8338dc(0x1f4)](_0x3d1c77,_0x463999,_0x85b1d9,_0x2852e7,![],_0x8338dc(0x3e1)),this[_0x8338dc(0xe0)](_0x267fa9,_0x2682a2,_0x523389),this[_0x8338dc(0x4ef)](),!![];}else _0x54377c[_0x1be3e9]=_0x3396fa[_0x1be3e9];}}else return _0x551b28[_0x8338dc(0x16c)][_0x8338dc(0x471)][_0x8338dc(0x11c)][_0x8338dc(0x220)];}},DataManager[_0x4222e9(0x49b)]=function(_0x8ca4e7){const _0x679f5f=_0x4222e9;if(!_0x8ca4e7)return![];if(!_0x8ca4e7[_0x679f5f(0x223)])return![];return _0x8ca4e7&&_0x8ca4e7[_0x679f5f(0x223)][_0x679f5f(0x1cf)](/<PROXY:[ ](.*)>/i);},DataManager[_0x4222e9(0x4be)]=function(_0x45cea3){const _0x18f10e=_0x4222e9;return this['isProxyItem'](_0x45cea3)?_0x18f10e(0x31a)===_0x18f10e(0x3c0)?_0x2e79b4[_0x18f10e(0x1b7)](0x1,_0x967634[_0x18f10e(0x41e)]()-0x4):(_0x45cea3=this['switchProxyItem'](_0x45cea3)||_0x45cea3,this['isProxyItem'](_0x45cea3)?this[_0x18f10e(0x4be)](_0x45cea3):_0x45cea3):_0x45cea3;},DataManager['switchProxyItem']=function(_0x2bb3ed){const _0xeada00=_0x4222e9;_0x2bb3ed['note'][_0xeada00(0x1cf)](/<PROXY:[ ](.*)>/i);const _0xffe531=RegExp['$1'][_0xeada00(0x277)](),_0xce5fd1=/^\d+$/['test'](_0xffe531);if(this[_0xeada00(0x292)](_0x2bb3ed)){const _0x5f22f3=_0xce5fd1?Number(RegExp['$1']):DataManager[_0xeada00(0x3b6)](_0xffe531);return $dataItems[_0x5f22f3]||_0x2bb3ed;}else{if(this[_0xeada00(0x1b9)](_0x2bb3ed)){const _0x496303=_0xce5fd1?Number(RegExp['$1']):DataManager[_0xeada00(0x401)](_0xffe531);return $dataWeapons[_0x496303]||_0x2bb3ed;}else{if(this['isArmor'](_0x2bb3ed)){const _0x6661ed=_0xce5fd1?Number(RegExp['$1']):DataManager[_0xeada00(0x209)](_0xffe531);return $dataArmors[_0x6661ed]||_0x2bb3ed;}}}return _0x2bb3ed;},VisuMZ[_0x4222e9(0x16c)]['Window_ItemList_item']=Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x1f2)],Window_ItemList['prototype'][_0x4222e9(0x1f2)]=function(){const _0x4ef385=_0x4222e9;if($gameTemp[_0x4ef385(0x1c6)])return VisuMZ[_0x4ef385(0x16c)][_0x4ef385(0x3b3)][_0x4ef385(0x37b)](this);return DataManager[_0x4ef385(0x4be)](VisuMZ[_0x4ef385(0x16c)][_0x4ef385(0x3b3)][_0x4ef385(0x37b)](this));},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x1ba)]=function(){const _0x171859=_0x4222e9;return VisuMZ[_0x171859(0x16c)]['Window_ItemList_item'][_0x171859(0x37b)](this);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x1f0)]=Window_ShopBuy[_0x4222e9(0x3f5)]['item'],Window_ShopBuy[_0x4222e9(0x3f5)][_0x4222e9(0x1f2)]=function(){const _0x1a7b06=_0x4222e9;if($gameTemp[_0x1a7b06(0x1c6)])return VisuMZ[_0x1a7b06(0x16c)][_0x1a7b06(0x1f0)][_0x1a7b06(0x37b)](this);return DataManager[_0x1a7b06(0x4be)](VisuMZ['ItemsEquipsCore'][_0x1a7b06(0x1f0)][_0x1a7b06(0x37b)](this));},Window_ShopBuy[_0x4222e9(0x3f5)]['proxyItem']=function(){const _0x3eaf71=_0x4222e9;return VisuMZ[_0x3eaf71(0x16c)][_0x3eaf71(0x1f0)]['call'](this);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x176)]=Window_ShopStatus['prototype'][_0x4222e9(0x25e)],Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x25e)]=function(_0x397d05){const _0x504f9=_0x4222e9;_0x397d05=DataManager[_0x504f9(0x4be)](_0x397d05),VisuMZ[_0x504f9(0x16c)][_0x504f9(0x176)][_0x504f9(0x37b)](this,_0x397d05);},VisuMZ['ItemsEquipsCore']['Game_Item_setObject']=Game_Item['prototype'][_0x4222e9(0x44c)],Game_Item['prototype'][_0x4222e9(0x44c)]=function(_0x3c3880){const _0x474819=_0x4222e9;if(DataManager[_0x474819(0x49b)](_0x3c3880))return;VisuMZ[_0x474819(0x16c)][_0x474819(0x500)][_0x474819(0x37b)](this,_0x3c3880);},ColorManager[_0x4222e9(0x3f3)]=function(_0x1925d8){const _0x15b923=_0x4222e9;if(!_0x1925d8)return this[_0x15b923(0x282)]();else{if(_0x1925d8[_0x15b923(0x223)][_0x15b923(0x1cf)](/<COLOR:[ ](\d+)>/i)){if('HWGIw'===_0x15b923(0x2ab)){const _0x38a7a8=this[_0x15b923(0x3a0)]();this[_0x15b923(0x1f4)](_0x38a7a8,_0x2283e0,_0x55c2ac,_0x57930d,!![]);const _0x4f268a=this[_0x15b923(0x194)]();return this['drawItemKeyData'](_0x4f268a,_0x4e401a,_0x21e1c7,_0x2765db,![],_0x15b923(0x3e1)),this['drawItemDarkRect'](_0xfe684a,_0x336d31,_0x26f462),this['resetFontSettings'](),!![];}else return this[_0x15b923(0x396)](Number(RegExp['$1'])[_0x15b923(0x469)](0x0,0x1f));}else return _0x1925d8[_0x15b923(0x223)][_0x15b923(0x1cf)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x4222e9(0x325)]=function(_0x53b0dd){const _0x281db3=_0x4222e9;return _0x53b0dd=String(_0x53b0dd),_0x53b0dd[_0x281db3(0x1cf)](/#(.*)/i)?_0x281db3(0x427)[_0x281db3(0x474)](String(RegExp['$1'])):this[_0x281db3(0x396)](Number(_0x53b0dd));},SceneManager[_0x4222e9(0x33d)]=function(){const _0x19cf9a=_0x4222e9;return this[_0x19cf9a(0x306)]&&this[_0x19cf9a(0x306)][_0x19cf9a(0x310)]===Scene_Shop;},Game_Temp[_0x4222e9(0x3f5)][_0x4222e9(0x2c6)]=function(){const _0x251ca3=_0x4222e9;if(this['_bypassNewLabel'])return![];return VisuMZ[_0x251ca3(0x16c)]['Settings']['New']['Enable'];},VisuMZ[_0x4222e9(0x47b)]=VisuMZ['ItemsEquipsCore'][_0x4222e9(0x471)][_0x4222e9(0x246)][_0x4222e9(0x126)],VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x441)]=Game_BattlerBase[_0x4222e9(0x3f5)][_0x4222e9(0xa0)],Game_BattlerBase['prototype'][_0x4222e9(0xa0)]=function(_0x26423f){const _0x1fc54c=_0x4222e9;if(this['_shopStatusMenuMode'])return this['_shopStatusMenuAlly']?VisuMZ[_0x1fc54c(0x47b)]:0x1;else{if(_0x1fc54c(0xa1)!==_0x1fc54c(0xa1)){const _0x5d9ba8=_0x1fc54c(0x3fd);if(this['_customItemInfo'][_0x5d9ba8])return this['_customItemInfo'][_0x5d9ba8];return this[_0x1fc54c(0x130)]()?_0x2c6a86[_0x1fc54c(0x16c)]['Settings'][_0x1fc54c(0x246)][_0x1fc54c(0x4a1)]:_0x51eb27['ItemsEquipsCore'][_0x1fc54c(0x471)][_0x1fc54c(0x246)]['NotConsumable'];}else return VisuMZ['ItemsEquipsCore'][_0x1fc54c(0x441)][_0x1fc54c(0x37b)](this,_0x26423f);}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x419)]=Game_BattlerBase[_0x4222e9(0x3f5)]['meetsItemConditions'],Game_BattlerBase[_0x4222e9(0x3f5)][_0x4222e9(0x4f2)]=function(_0x49b9c5){const _0x59b826=_0x4222e9;if(!_0x49b9c5)return![];if(!VisuMZ[_0x59b826(0x16c)][_0x59b826(0x419)][_0x59b826(0x37b)](this,_0x49b9c5))return![];if(!this[_0x59b826(0x4d8)](_0x49b9c5))return![];if(!this['meetsItemConditionsJS'](_0x49b9c5))return![];return!![];},Game_BattlerBase[_0x4222e9(0x3f5)]['meetsItemConditionsNotetags']=function(_0x5c2828){if(!this['checkItemConditionsSwitchNotetags'](_0x5c2828))return![];return!![];},Game_BattlerBase[_0x4222e9(0x3f5)][_0x4222e9(0x491)]=function(_0x1fbce2){const _0x491c7c=_0x4222e9,_0xe730b4=_0x1fbce2['note'];if(_0xe730b4[_0x491c7c(0x1cf)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf1d390=JSON['parse']('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0x53ffce of _0xf1d390){if(!$gameSwitches[_0x491c7c(0x1f1)](_0x53ffce))return![];}return!![];}if(_0xe730b4[_0x491c7c(0x1cf)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x137982=JSON['parse']('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0x3080ba of _0x137982){if(!$gameSwitches[_0x491c7c(0x1f1)](_0x3080ba))return![];}return!![];}if(_0xe730b4['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2907cb=JSON[_0x491c7c(0x84)]('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0x5a622e of _0x2907cb){if($gameSwitches[_0x491c7c(0x1f1)](_0x5a622e))return!![];}return![];}if(_0xe730b4[_0x491c7c(0x1cf)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('BdJYu'===_0x491c7c(0x4d4)){const _0x177437=JSON[_0x491c7c(0x84)]('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0x54c31f of _0x177437){if(!$gameSwitches['value'](_0x54c31f))return!![];}return![];}else return _0x8adfec[_0x491c7c(0x16c)]['Scene_Equip_statusWindowRect'][_0x491c7c(0x37b)](this);}if(_0xe730b4[_0x491c7c(0x1cf)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x491c7c(0x330)===_0x491c7c(0x373)){const _0x2f46e5=this[_0x491c7c(0x164)](),_0x1aac09=this[_0x491c7c(0x2c1)]()?this[_0x491c7c(0x104)]():0x0,_0x114253=_0x2f46e5['y']+_0x2f46e5[_0x491c7c(0xb1)],_0x582f73=_0x29e27b[_0x491c7c(0x21a)]-this[_0x491c7c(0x104)](),_0x19589e=this[_0x491c7c(0x17f)]()-_0x2f46e5[_0x491c7c(0xb1)];return new _0x1e90c6(_0x1aac09,_0x114253,_0x582f73,_0x19589e);}else{const _0x33e943=JSON[_0x491c7c(0x84)]('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0xcd44a1 of _0x33e943){if(!$gameSwitches[_0x491c7c(0x1f1)](_0xcd44a1))return!![];}return![];}}if(_0xe730b4[_0x491c7c(0x1cf)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('tEeIP'!==_0x491c7c(0x3f2)){const _0x3f8c58=JSON[_0x491c7c(0x84)]('['+RegExp['$1'][_0x491c7c(0x1cf)](/\d+/g)+']');for(const _0x37169d of _0x3f8c58){if($gameSwitches[_0x491c7c(0x1f1)](_0x37169d))return![];}return!![];}else return this[_0x491c7c(0x1fa)]()?this[_0x491c7c(0x3ba)]():_0x2d446b['ItemsEquipsCore'][_0x491c7c(0x43e)][_0x491c7c(0x37b)](this);}return!![];},Game_BattlerBase[_0x4222e9(0x3f5)][_0x4222e9(0x15f)]=function(_0x9e91a3){const _0x4f5fd3=_0x4222e9,_0x404fc5=_0x9e91a3[_0x4f5fd3(0x223)],_0x1b643c=VisuMZ['ItemsEquipsCore'][_0x4f5fd3(0xcd)];return _0x1b643c[_0x9e91a3['id']]?_0x1b643c[_0x9e91a3['id']]['call'](this,_0x9e91a3):!![];},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x219)]=function(_0x40acb0){const _0x4b0a09=_0x4222e9;_0x40acb0=this[_0x4b0a09(0xb3)](_0x40acb0);const _0x589ff5=this[_0x4b0a09(0x2bd)]();this[_0x4b0a09(0xc4)]=[];for(let _0x3d3920=0x0;_0x3d3920<_0x589ff5[_0x4b0a09(0x1ae)];_0x3d3920++){this[_0x4b0a09(0xc4)][_0x3d3920]=new Game_Item();}for(let _0x481900=0x0;_0x481900<_0x589ff5[_0x4b0a09(0x1ae)];_0x481900++){if('pKsCF'===_0x4b0a09(0x431))return this[_0x4b0a09(0x50d)]();else{const _0x1fb6dc=_0x589ff5[_0x481900],_0x2eb3d9=this['getMatchingInitEquip'](_0x40acb0,_0x1fb6dc);if(this[_0x4b0a09(0xac)](_0x2eb3d9))this[_0x4b0a09(0xc4)][_0x481900]['setObject'](_0x2eb3d9);}}this['releaseUnequippableItems'](!![]),this['refresh']();},Game_Actor[_0x4222e9(0x3f5)]['convertInitEquipsToItems']=function(_0x24b074){const _0x280559=_0x4222e9,_0x19482b=[];for(let _0x4d4a34=0x0;_0x4d4a34<_0x24b074[_0x280559(0x1ae)];_0x4d4a34++){const _0x4dd785=_0x24b074[_0x4d4a34];if(_0x4dd785<=0x0)continue;const _0x15f851=$dataSystem[_0x280559(0x18d)][_0x4d4a34+0x1];if(_0x15f851===$dataSystem[_0x280559(0x18d)][0x1]||_0x4d4a34===0x1&&this['isDualWield']())_0x19482b[_0x280559(0x48f)]($dataWeapons[_0x4dd785]);else{if(BattleManager[_0x280559(0x8f)]()){const _0x3e19bc=$dataArmors[_0x4dd785];if(_0x3e19bc&&_0x3e19bc[_0x280559(0x14c)]===_0x4d4a34+0x1){if(_0x280559(0x19e)===_0x280559(0x19e))_0x19482b['push'](_0x3e19bc);else{_0x4ba07a[_0x280559(0x16c)][_0x280559(0x231)]={},_0x5babd5[_0x280559(0x16c)]['RegExp'][_0x280559(0x250)]=[],_0x2cb823[_0x280559(0x16c)][_0x280559(0x231)]['BorderRegExp']=[];const _0x49cc54=['MaxHP',_0x280559(0x466),_0x280559(0x360),_0x280559(0x2cd),'MAT','MDF','AGI',_0x280559(0x3b9)];for(const _0x51e141 of _0x49cc54){const _0x193b85=_0x280559(0x1df)[_0x280559(0x474)](_0x51e141);_0x449b21[_0x280559(0x16c)][_0x280559(0x231)]['EquipParams'][_0x280559(0x48f)](new _0xe30be7(_0x193b85,'i'));const _0x11e203='\x5cb%1\x5cb'[_0x280559(0x474)](_0x51e141);_0x436dc4[_0x280559(0x16c)][_0x280559(0x231)]['BorderRegExp']['push'](new _0x5dd262(_0x11e203,'g'));}}}}else{if(_0x280559(0xd9)===_0x280559(0x4bc)){const _0x55c58a=_0x211b47[_0x280559(0x16c)][_0x280559(0x471)][_0x280559(0x485)][_0x280559(0x3e2)];return _0x55c58a[_0x280559(0x1cf)](/#(.*)/i)?'#'+_0x474611(_0x3428f7['$1']):_0x3c3eeb[_0x280559(0x396)](_0x55c58a);}else{const _0x3d9cc3=$dataArmors[_0x4dd785];_0x3d9cc3&&_0x3d9cc3[_0x280559(0x14c)]===_0x4d4a34+0x1&&('YnsaL'!==_0x280559(0x105)?_0x19482b[_0x280559(0x48f)](_0x3d9cc3):_0xed537f=_0x357e7f(_0xa313f['$1']));}}}}return _0x19482b;},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x4c1)]=function(_0x10a7ed,_0x4e56d3){const _0x507d2e=_0x4222e9;for(const _0xda73ca of _0x10a7ed){if(_0x507d2e(0x15e)===_0x507d2e(0x20e))return;else{if(!_0xda73ca)continue;if(_0xda73ca[_0x507d2e(0x14c)]===_0x4e56d3)return _0x10a7ed[_0x507d2e(0x38a)](_0x10a7ed[_0x507d2e(0x3fb)](_0xda73ca),0x1),_0xda73ca;}}return null;},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x2bd)]=function(){const _0x21bf62=_0x4222e9,_0x40cccd=JsonEx['makeDeepCopy'](this[_0x21bf62(0x42b)]||this[_0x21bf62(0x477)]()[_0x21bf62(0x2bd)]);if(_0x40cccd[_0x21bf62(0x1ae)]>=0x2&&this[_0x21bf62(0x38c)]())_0x40cccd[0x1]=0x1;return _0x40cccd;},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0xfb)]=function(_0x464243){const _0x3324f9=_0x4222e9;_0x464243[_0x3324f9(0x1b0)](0x0),_0x464243[_0x3324f9(0x1b0)](-0x1),this[_0x3324f9(0x42b)]=_0x464243,this[_0x3324f9(0x49d)](),this['updateChangedSlots']();},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x417)]=function(){const _0x539987=_0x4222e9;this[_0x539987(0x42b)]=undefined,this[_0x539987(0x49d)](),this[_0x539987(0x4d7)]();},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x4d7)]=function(){const _0x426045=_0x4222e9;let _0x1dd782=this['equipSlots']()[_0x426045(0x1ae)];while(this[_0x426045(0xc4)][_0x426045(0x1ae)]>_0x1dd782){const _0x1f6e8a=this[_0x426045(0xc4)][this['_equips'][_0x426045(0x1ae)]-0x1];_0x1f6e8a&&_0x1f6e8a[_0x426045(0x2e7)]()&&$gameParty[_0x426045(0x218)](_0x1f6e8a['object'](),0x1),this['_equips']['pop']();}while(_0x1dd782>this[_0x426045(0xc4)][_0x426045(0x1ae)]){this[_0x426045(0xc4)][_0x426045(0x48f)](new Game_Item());}},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0xe7)]=function(){const _0x525d12=_0x4222e9,_0x57b43a=this[_0x525d12(0x2bd)]();for(let _0x11cb07=0x0;_0x11cb07<_0x57b43a[_0x525d12(0x1ae)];_0x11cb07++){if(!this[_0x525d12(0xc4)][_0x11cb07])this[_0x525d12(0xc4)][_0x11cb07]=new Game_Item();}this[_0x525d12(0xb5)](![]),this[_0x525d12(0x49d)]();},VisuMZ['ItemsEquipsCore']['Game_Actor_changeEquip']=Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x24d)],Game_Actor['prototype'][_0x4222e9(0x24d)]=function(_0x36bc8e,_0x4fda84){const _0x49252d=_0x4222e9;if(!this[_0x49252d(0x475)]){const _0x58fef3=JsonEx['makeDeepCopy'](this);_0x58fef3[_0x49252d(0x475)]=!![],VisuMZ['ItemsEquipsCore'][_0x49252d(0x23f)][_0x49252d(0x37b)](this,_0x36bc8e,_0x4fda84),this['equipAdjustHpMp'](_0x58fef3);}else VisuMZ['ItemsEquipsCore'][_0x49252d(0x23f)][_0x49252d(0x37b)](this,_0x36bc8e,_0x4fda84);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xa6)]=Game_Actor['prototype'][_0x4222e9(0x212)],Game_Actor[_0x4222e9(0x3f5)]['forceChangeEquip']=function(_0x2587bf,_0x1d84da){const _0x41d5da=_0x4222e9;if(!this[_0x41d5da(0x475)]){if(_0x41d5da(0x335)===_0x41d5da(0x335)){const _0x30d7a7=JsonEx[_0x41d5da(0xd0)](this);_0x30d7a7[_0x41d5da(0x475)]=!![],VisuMZ[_0x41d5da(0x16c)]['Game_Actor_forceChangeEquip'][_0x41d5da(0x37b)](this,_0x2587bf,_0x1d84da),this['equipAdjustHpMp'](_0x30d7a7);}else{if(this[_0x41d5da(0xa9)]['changeBuff'][_0x51905f]!==0x0)this[_0x41d5da(0xa9)][_0x41d5da(0x33c)]=!![];}}else _0x41d5da(0x29c)===_0x41d5da(0x199)?(_0x17d647[_0x41d5da(0x16c)][_0x41d5da(0x156)][_0x41d5da(0x37b)](this),this['isUseModernControls']()&&(this[_0x41d5da(0x1ab)][_0x41d5da(0x22b)](),this[_0x41d5da(0x1ab)][_0x41d5da(0x2e5)](),this[_0x41d5da(0x22e)]['smoothSelect'](0x0),this[_0x41d5da(0x22e)][_0x41d5da(0x21c)]())):VisuMZ[_0x41d5da(0x16c)][_0x41d5da(0xa6)][_0x41d5da(0x37b)](this,_0x2587bf,_0x1d84da);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x132)]=Game_Actor['prototype'][_0x4222e9(0x2b5)],Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x2b5)]=function(_0x4823ff){const _0x4fbaf9=_0x4222e9;if(!this[_0x4fbaf9(0x475)]){if(_0x4fbaf9(0xa3)===_0x4fbaf9(0xa3)){const _0x32abc5=JsonEx[_0x4fbaf9(0xd0)](this);_0x32abc5['_tempActor']=!![],VisuMZ['ItemsEquipsCore'][_0x4fbaf9(0x132)][_0x4fbaf9(0x37b)](this,_0x4823ff),this[_0x4fbaf9(0x438)](_0x32abc5);}else{if(_0xaf678f['value'](_0x5de5e4))return![];}}else VisuMZ[_0x4fbaf9(0x16c)][_0x4fbaf9(0x132)][_0x4fbaf9(0x37b)](this,_0x4823ff);},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0xb5)]=function(_0x34df23){const _0x2b2856=_0x4222e9;if(this[_0x2b2856(0x333)])return;for(;;){if('iWLFj'===_0x2b2856(0xb4)){const _0x4e3099=this[_0x2b2856(0x2bd)](),_0x13d34c=this[_0x2b2856(0x381)](),_0x2ab279=_0x13d34c[_0x2b2856(0x1ae)];let _0x41d19d=![];for(let _0x2b3b85=0x0;_0x2b3b85<_0x2ab279;_0x2b3b85++){if(_0x2b2856(0x3eb)!==_0x2b2856(0x2f2)){const _0x2d174d=_0x13d34c[_0x2b3b85];if(_0x2d174d&&(!this[_0x2b2856(0xac)](_0x2d174d)||_0x2d174d[_0x2b2856(0x14c)]!==_0x4e3099[_0x2b3b85])){!_0x34df23&&this[_0x2b2856(0x2ae)](null,_0x2d174d);if(!this['_tempActor']){const _0x3ee076=JsonEx[_0x2b2856(0xd0)](this);_0x3ee076[_0x2b2856(0x475)]=!![],this[_0x2b2856(0xc4)][_0x2b3b85][_0x2b2856(0x44c)](null),this[_0x2b2856(0x333)]=!![],this[_0x2b2856(0x438)](_0x3ee076),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else this[_0x2b2856(0xc4)][_0x2b3b85][_0x2b2856(0x44c)](null);_0x41d19d=!![];}}else return this[_0x2b2856(0x227)]();}if(!_0x41d19d)break;}else this[_0x2b2856(0x428)]();}},Game_Actor['prototype'][_0x4222e9(0x438)]=function(_0xcbbba2){const _0x29ac41=_0x4222e9;if(this[_0x29ac41(0x475)])return;if(!VisuMZ['ItemsEquipsCore'][_0x29ac41(0x471)][_0x29ac41(0x29b)][_0x29ac41(0x323)])return;const _0x4805fb=Math[_0x29ac41(0x446)](_0xcbbba2[_0x29ac41(0x2c4)]()*this[_0x29ac41(0x34d)]),_0x3844c4=Math['round'](_0xcbbba2[_0x29ac41(0x348)]()*this[_0x29ac41(0xe5)]);if(this['hp']>0x0)this[_0x29ac41(0x3a5)](_0x4805fb);if(this['mp']>0x0)this[_0x29ac41(0x384)](_0x3844c4);},Game_Actor[_0x4222e9(0x3f5)]['clearEquipments']=function(){const _0x3ae75d=_0x4222e9,_0x2b9564=this[_0x3ae75d(0x2bd)]()[_0x3ae75d(0x1ae)];for(let _0x5865b8=0x0;_0x5865b8<_0x2b9564;_0x5865b8++){if(_0x3ae75d(0xf0)==='Pmdtm')return 0x63;else{if(this[_0x3ae75d(0x2eb)](_0x5865b8))this['changeEquip'](_0x5865b8,null);}}},Game_Actor[_0x4222e9(0x3f5)]['isClearEquipOk']=function(_0x4329c1){const _0x820f8f=_0x4222e9;if(this[_0x820f8f(0x2df)]()[_0x820f8f(0x302)](this[_0x820f8f(0x2bd)]()[_0x4329c1])){if(_0x820f8f(0x28c)==='CAiBU')return![];else this['_equips'][_0x29091e]=new _0xc91ed1();}else return this[_0x820f8f(0x36b)](_0x4329c1);},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x2df)]=function(){const _0x15aeb9=_0x4222e9;return VisuMZ[_0x15aeb9(0x16c)][_0x15aeb9(0x471)][_0x15aeb9(0x29b)][_0x15aeb9(0x1fb)];},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x4a6)]=function(){const _0x119db3=_0x4222e9,_0x2f365b=this['equipSlots']()[_0x119db3(0x1ae)];for(let _0x526f81=0x0;_0x526f81<_0x2f365b;_0x526f81++){if(this[_0x119db3(0x318)](_0x526f81))this[_0x119db3(0x24d)](_0x526f81,null);}for(let _0x863283=0x0;_0x863283<_0x2f365b;_0x863283++){if(_0x119db3(0x488)===_0x119db3(0x215)){const _0x55b701=_0x584e33[_0x119db3(0xd0)](this['_forcedSlots']||this['currentClass']()[_0x119db3(0x2bd)]);if(_0x55b701[_0x119db3(0x1ae)]>=0x2&&this[_0x119db3(0x38c)]())_0x55b701[0x1]=0x1;return _0x55b701;}else{if(this[_0x119db3(0x318)](_0x863283))this[_0x119db3(0x24d)](_0x863283,this[_0x119db3(0x2b7)](_0x863283));}}},Game_Actor[_0x4222e9(0x3f5)]['isOptimizeEquipOk']=function(_0xbdb836){const _0x36792d=_0x4222e9;if(this['nonOptimizeEtypes']()['includes'](this[_0x36792d(0x2bd)]()[_0xbdb836]))return![];else{if(_0x36792d(0x254)==='HgvXa'){_0x112fcc[_0x36792d(0x3f5)][_0x36792d(0x46f)][_0x36792d(0x37b)](this);if(this[_0x36792d(0x162)])this['updateCategoryNameWindow']();}else return this[_0x36792d(0x36b)](_0xbdb836);}},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x35f)]=function(){const _0x348852=_0x4222e9;return VisuMZ[_0x348852(0x16c)]['Settings']['EquipScene'][_0x348852(0x111)];},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x1ed)]=Game_Actor['prototype'][_0x4222e9(0x2ae)],Game_Actor[_0x4222e9(0x3f5)]['tradeItemWithParty']=function(_0x5581a4,_0x21ff50){const _0xf6741d=_0x4222e9;if(this[_0xf6741d(0x475)])return![];$gameTemp[_0xf6741d(0x4db)]=!![];const _0xc9d08f=VisuMZ[_0xf6741d(0x16c)][_0xf6741d(0x1ed)][_0xf6741d(0x37b)](this,_0x5581a4,_0x21ff50);return $gameTemp[_0xf6741d(0x4db)]=![],_0xc9d08f;},Game_Actor[_0x4222e9(0x3f5)]['changeEquipById']=function(_0x48615d,_0x4030a4){const _0x5e2efe=_0x4222e9,_0x39ca35=this[_0x5e2efe(0x34f)](_0x48615d);if(_0x39ca35<0x0)return;const _0x4380de=_0x48615d===0x1?$dataWeapons[_0x4030a4]:$dataArmors[_0x4030a4];this[_0x5e2efe(0x24d)](_0x39ca35,_0x4380de);},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x34f)]=function(_0x2fac80){const _0x4cfb6f=_0x4222e9;let _0x2f4277=0x0;const _0x4bbdf3=this[_0x4cfb6f(0x2bd)](),_0x49ecfe=this[_0x4cfb6f(0x381)]();for(let _0x207566=0x0;_0x207566<_0x4bbdf3[_0x4cfb6f(0x1ae)];_0x207566++){if('nMneM'!==_0x4cfb6f(0x87)){if(_0x4bbdf3[_0x207566]===_0x2fac80){if(_0x4cfb6f(0x2bc)===_0x4cfb6f(0x195)){const _0x24cb7e=_0x10d2f7['x']+_0x20a269[_0x4cfb6f(0x24e)]((_0x31e430[_0x4cfb6f(0x506)]-_0x5f4499)/0x2);this['drawTextEx'](_0x264d0b,_0x24cb7e,_0x4fd18a['y'],_0x58125f);}else{_0x2f4277=_0x207566;if(!_0x49ecfe[_0x207566])return _0x2f4277;}}}else this['deactivate'](),this[_0x4cfb6f(0x2e5)]();}return _0x2f4277;},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x9f)]=Game_Actor['prototype'][_0x4222e9(0x362)],Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x362)]=function(_0x43dfe6){const _0x2fdbf5=_0x4222e9;let _0x3c7970=VisuMZ[_0x2fdbf5(0x16c)][_0x2fdbf5(0x9f)][_0x2fdbf5(0x37b)](this,_0x43dfe6);for(const _0x10aa76 of this[_0x2fdbf5(0x381)]()){if(_0x10aa76)_0x3c7970+=this['paramPlusItemsEquipsCoreCustomJS'](_0x10aa76,_0x43dfe6);}return _0x3c7970;},Game_Actor['prototype'][_0x4222e9(0x445)]=function(_0x31e951,_0x3c5edc){const _0x42b31c=_0x4222e9;if(this[_0x42b31c(0x13f)])return 0x0;const _0x7e3bdc=(DataManager['isWeapon'](_0x31e951)?_0x42b31c(0x4b6):'A%1')[_0x42b31c(0x474)](_0x31e951['id']),_0x495623=_0x42b31c(0x239)['format'](_0x7e3bdc,_0x3c5edc);if(VisuMZ['ItemsEquipsCore']['paramJS'][_0x495623]){this[_0x42b31c(0x13f)]=!![];const _0x3d41b=VisuMZ['ItemsEquipsCore']['paramJS'][_0x495623][_0x42b31c(0x37b)](this,_0x31e951,_0x3c5edc);return this[_0x42b31c(0x13f)]=![],_0x3d41b;}else return 0x0;},Game_Actor[_0x4222e9(0x3f5)][_0x4222e9(0x1b3)]=function(_0x27a2cb){const _0x5a52b2=_0x4222e9;this[_0x5a52b2(0x26d)]=!![],this['_shopStatusMenuAlly']=_0x27a2cb;},VisuMZ['ItemsEquipsCore'][_0x4222e9(0xd6)]=Game_Party['prototype'][_0x4222e9(0x2a9)],Game_Party[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)]=function(){const _0x30f7f5=_0x4222e9;VisuMZ[_0x30f7f5(0x16c)]['Game_Party_initialize'][_0x30f7f5(0x37b)](this),this[_0x30f7f5(0x15b)]();},Game_Party['prototype'][_0x4222e9(0x15b)]=function(){const _0x5da689=_0x4222e9;this[_0x5da689(0x357)]=[];},Game_Party[_0x4222e9(0x3f5)][_0x4222e9(0x452)]=function(_0xbd4c3b){const _0x119eef=_0x4222e9;if(!$gameTemp['newLabelEnabled']())return![];if(this['_newItemsList']===undefined)this[_0x119eef(0x15b)]();let _0xc5b810='';if(DataManager[_0x119eef(0x292)](_0xbd4c3b))_0xc5b810=_0x119eef(0x2dd)['format'](_0xbd4c3b['id']);else{if(DataManager[_0x119eef(0x1b9)](_0xbd4c3b))_0xc5b810=_0x119eef(0x44b)[_0x119eef(0x474)](_0xbd4c3b['id']);else{if(DataManager[_0x119eef(0x102)](_0xbd4c3b))_0x119eef(0xad)===_0x119eef(0xad)?_0xc5b810=_0x119eef(0x331)[_0x119eef(0x474)](_0xbd4c3b['id']):this[_0x119eef(0x32e)](0x0,0x0);else{if(_0x119eef(0x127)!==_0x119eef(0x22d))return;else _0x1394b7=_0x167914[_0x119eef(0x460)];}}}return this[_0x119eef(0x357)][_0x119eef(0x302)](_0xc5b810);},Game_Party[_0x4222e9(0x3f5)]['setNewItem']=function(_0x514558){const _0x591ab2=_0x4222e9;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x591ab2(0x357)]===undefined)this[_0x591ab2(0x15b)]();let _0x42148f='';if(DataManager[_0x591ab2(0x292)](_0x514558))_0x42148f=_0x591ab2(0x2dd)[_0x591ab2(0x474)](_0x514558['id']);else{if(DataManager[_0x591ab2(0x1b9)](_0x514558))_0x42148f='weapon-%1'['format'](_0x514558['id']);else{if(DataManager[_0x591ab2(0x102)](_0x514558))_0x42148f=_0x591ab2(0x331)[_0x591ab2(0x474)](_0x514558['id']);else return;}}if(!this[_0x591ab2(0x357)][_0x591ab2(0x302)](_0x42148f))this[_0x591ab2(0x357)][_0x591ab2(0x48f)](_0x42148f);},Game_Party['prototype']['clearNewItem']=function(_0xc05671){const _0x1d408a=_0x4222e9;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x1d408a(0x357)]===undefined)this['initNewItemsList']();let _0x1afd1d='';if(DataManager[_0x1d408a(0x292)](_0xc05671))_0x1afd1d=_0x1d408a(0x2dd)['format'](_0xc05671['id']);else{if(DataManager[_0x1d408a(0x1b9)](_0xc05671)){if('iCDUt'!==_0x1d408a(0x2e2))_0x1afd1d=_0x1d408a(0x44b)[_0x1d408a(0x474)](_0xc05671['id']);else return _0x51fa61[_0x1d408a(0x16c)][_0x1d408a(0x471)][_0x1d408a(0x14f)][_0x1d408a(0xe1)];}else{if(DataManager[_0x1d408a(0x102)](_0xc05671))_0x1afd1d=_0x1d408a(0x331)['format'](_0xc05671['id']);else{if('sGVKx'===_0x1d408a(0xc8)){this[_0x1d408a(0x3ff)][_0x1d408a(0x49d)]();const _0x8ce092=this[_0x1d408a(0x22e)]['item'](),_0x43a804=this[_0x1d408a(0x3ff)][_0x1d408a(0x112)][_0x1d408a(0x3fb)](_0x8ce092),_0x2f39b6=_0xab45c4['floor'](this[_0x1d408a(0x3ff)][_0x1d408a(0x344)]()/0x2)-0x1;this[_0x1d408a(0x3ff)][_0x1d408a(0x40e)](_0x43a804>=0x0?_0x43a804:0x0),this[_0x1d408a(0x3ff)]['setTopRow'](this[_0x1d408a(0x3ff)][_0x1d408a(0x1d6)]()-_0x2f39b6);}else return;}}}this[_0x1d408a(0x357)][_0x1d408a(0x302)](_0x1afd1d)&&this[_0x1d408a(0x357)]['splice'](this[_0x1d408a(0x357)][_0x1d408a(0x3fb)](_0x1afd1d),0x1);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x113)]=Game_Party[_0x4222e9(0x3f5)][_0x4222e9(0x47a)],Game_Party['prototype'][_0x4222e9(0x47a)]=function(_0x511ba1){const _0xc6210a=_0x4222e9;if(DataManager[_0xc6210a(0x49b)](_0x511ba1))_0x511ba1=DataManager[_0xc6210a(0x4be)](_0x511ba1);return VisuMZ[_0xc6210a(0x16c)][_0xc6210a(0x113)][_0xc6210a(0x37b)](this,_0x511ba1);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x2e9)]=Game_Party['prototype']['gainItem'],Game_Party['prototype'][_0x4222e9(0x218)]=function(_0x10610b,_0x3fe864,_0xe03836){const _0x4f1c51=_0x4222e9;if(DataManager['isProxyItem'](_0x10610b))_0x10610b=null;const _0x25e105=this['numItems'](_0x10610b);VisuMZ['ItemsEquipsCore'][_0x4f1c51(0x2e9)]['call'](this,_0x10610b,_0x3fe864,_0xe03836);if(this[_0x4f1c51(0x47a)](_0x10610b)>_0x25e105)this['setNewItem'](_0x10610b);},Game_Party[_0x4222e9(0x3f5)][_0x4222e9(0x198)]=function(_0x2524a6){const _0x47fa9d=_0x4222e9;if(DataManager[_0x47fa9d(0x49b)](_0x2524a6))_0x2524a6=DataManager[_0x47fa9d(0x4be)](_0x2524a6);return DataManager['maxItemAmount'](_0x2524a6);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xab)]=Scene_ItemBase['prototype'][_0x4222e9(0x137)],Scene_ItemBase['prototype'][_0x4222e9(0x137)]=function(){const _0x10f085=_0x4222e9;VisuMZ[_0x10f085(0x16c)]['Scene_ItemBase_activateItemWindow']['call'](this),this[_0x10f085(0x3ff)]['callUpdateHelp']();},Scene_Item[_0x4222e9(0x3f5)]['isBottomHelpMode']=function(){const _0x4c2470=_0x4222e9;if(ConfigManager[_0x4c2470(0x3c2)]&&ConfigManager[_0x4c2470(0x2fe)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x4c2470(0x1fa)]())return this[_0x4c2470(0x462)]()['match'](/LOWER/i);else{if(_0x4c2470(0x424)!=='JktjS')Scene_ItemBase['prototype'][_0x4c2470(0x2c1)]['call'](this);else{if(_0xe7309b['isProxyItem'](_0x1b2e89))_0x355417=null;const _0x214338=this[_0x4c2470(0x47a)](_0x54b5c6);_0x3f317c[_0x4c2470(0x16c)]['Game_Party_gainItem'][_0x4c2470(0x37b)](this,_0x407b56,_0x5833a6,_0xe802fe);if(this[_0x4c2470(0x47a)](_0x196dfd)>_0x214338)this[_0x4c2470(0x367)](_0x22fa1a);}}}},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x2c1)]=function(){const _0x1f5f7c=_0x4222e9;if(ConfigManager[_0x1f5f7c(0x3c2)]&&ConfigManager[_0x1f5f7c(0x9c)]!==undefined){if(_0x1f5f7c(0x454)!==_0x1f5f7c(0x454)){const _0x546460=_0x5a60c3[_0x1f5f7c(0x84)]('['+_0x145219['$1'][_0x1f5f7c(0x1cf)](/\d+/g)+']');for(const _0x4bd7ad of _0x546460){if(_0x5d2fc5[_0x1f5f7c(0x1f1)](_0x4bd7ad))return!![];}return![];}else return ConfigManager[_0x1f5f7c(0x9c)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1f5f7c(0x374)!==_0x1f5f7c(0x374)){const _0xd4a699=_0x36256b[_0x1f5f7c(0x16c)][_0x1f5f7c(0x471)][_0x1f5f7c(0x485)],_0x45ec7b=_0xd4a699['Text'];if(_0x45ec7b==='')return;const _0xe37f16=_0x5b60a7[_0x1f5f7c(0x3d3)],_0x205fcc=_0x2ef602[_0x1f5f7c(0x40f)];this['bitmap'][_0x1f5f7c(0x309)]=_0xd4a699['FontFace']||_0x34e99e[_0x1f5f7c(0x4fe)](),this['bitmap'][_0x1f5f7c(0x396)]=this[_0x1f5f7c(0x37f)](),this[_0x1f5f7c(0x1f9)]['fontSize']=_0xd4a699['FontSize'],this[_0x1f5f7c(0x1f9)][_0x1f5f7c(0x2de)](_0x45ec7b,0x0,_0x205fcc/0x2,_0xe37f16,_0x205fcc/0x2,_0x1f5f7c(0x83));}else return this[_0x1f5f7c(0x462)]()[_0x1f5f7c(0x1cf)](/RIGHT/i);}else{if(_0x1f5f7c(0x3c1)==='vpfGD')Scene_ItemBase[_0x1f5f7c(0x3f5)]['isRightInputMode']['call'](this);else return;}}},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x462)]=function(){const _0x12ec62=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x12ec62(0x471)][_0x12ec62(0x11c)][_0x12ec62(0x20c)];},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x3b8)]=function(){const _0x3cd501=_0x4222e9;return this[_0x3cd501(0x37a)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x1fa)]=function(){const _0x4d73a=_0x4222e9;return VisuMZ[_0x4d73a(0x16c)][_0x4d73a(0x471)]['ItemScene'][_0x4d73a(0x1d3)];},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x1c2)]=Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x272)],Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x272)]=function(){const _0x59ba7c=_0x4222e9;VisuMZ[_0x59ba7c(0x16c)]['Scene_Item_create'][_0x59ba7c(0x37b)](this);if(this[_0x59ba7c(0x3b8)]()){if('ImjUd'!==_0x59ba7c(0x32c))this[_0x59ba7c(0x453)]();else{const _0x20d355=_0x132131[_0x39c551],_0x1d9e71=this[_0x59ba7c(0x4c1)](_0x328fec,_0x20d355);if(this[_0x59ba7c(0xac)](_0x1d9e71))this[_0x59ba7c(0xc4)][_0x22212f][_0x59ba7c(0x44c)](_0x1d9e71);}}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x467)]=Scene_Item['prototype'][_0x4222e9(0x410)],Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x410)]=function(){const _0x164798=_0x4222e9;return this[_0x164798(0x1fa)]()?this[_0x164798(0x3ba)]():VisuMZ[_0x164798(0x16c)][_0x164798(0x467)]['call'](this);},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x3ba)]=function(){const _0x5f343b=_0x4222e9,_0x2da7dc=0x0,_0x8ada19=this[_0x5f343b(0x152)](),_0x413fb5=Graphics['boxWidth'],_0x5ade12=this[_0x5f343b(0x1ef)]();return new Rectangle(_0x2da7dc,_0x8ada19,_0x413fb5,_0x5ade12);},VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x4222e9(0x4a4)],Scene_Item[_0x4222e9(0x3f5)]['createCategoryWindow']=function(){const _0xa67697=_0x4222e9;VisuMZ[_0xa67697(0x16c)][_0xa67697(0x4da)]['call'](this),this['isUseModernControls']()&&this['postCreateCategoryWindowItemsEquipsCore']();},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x263)]=function(){const _0x5d94da=_0x4222e9;delete this[_0x5d94da(0x37a)][_0x5d94da(0x4df)]['ok'],delete this[_0x5d94da(0x37a)]['_handlers'][_0x5d94da(0x173)];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x1e3)]=Scene_Item['prototype'][_0x4222e9(0x3af)],Scene_Item['prototype'][_0x4222e9(0x3af)]=function(){const _0x246522=_0x4222e9;return this[_0x246522(0x1fa)]()?this[_0x246522(0x4e9)]():VisuMZ[_0x246522(0x16c)][_0x246522(0x1e3)][_0x246522(0x37b)](this);},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x4e9)]=function(){const _0x26e220=_0x4222e9,_0x57efd3=0x0,_0x56f27e=this[_0x26e220(0x232)](),_0x5b1f95=Graphics[_0x26e220(0x21a)],_0x50ceb8=this[_0x26e220(0x40d)](0x1,!![]);return new Rectangle(_0x57efd3,_0x56f27e,_0x5b1f95,_0x50ceb8);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0xf8)]=Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x47e)],Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x47e)]=function(){const _0x1fe776=_0x4222e9;VisuMZ[_0x1fe776(0x16c)]['Scene_Item_createItemWindow'][_0x1fe776(0x37b)](this);if(this[_0x1fe776(0x3b8)]()){if('TeYOU'===_0x1fe776(0x1c8))this[_0x1fe776(0x26e)]();else return this['categoryWindowRectItemsEquipsCore']();}this[_0x1fe776(0xcf)]()&&this[_0x1fe776(0x3a1)]();},VisuMZ['ItemsEquipsCore']['Scene_Item_itemWindowRect']=Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x2b6)],Scene_Item[_0x4222e9(0x3f5)]['itemWindowRect']=function(){const _0x56fa4a=_0x4222e9;if(this[_0x56fa4a(0x1fa)]())return this[_0x56fa4a(0x1e6)]();else{const _0x341339=VisuMZ[_0x56fa4a(0x16c)][_0x56fa4a(0x47d)][_0x56fa4a(0x37b)](this);return this[_0x56fa4a(0xcf)]()&&this[_0x56fa4a(0x2a1)]()&&(_0x341339[_0x56fa4a(0x506)]-=this[_0x56fa4a(0x104)]()),_0x341339;}},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x1e6)]=function(){const _0x66c218=_0x4222e9,_0x35a6b2=this['isRightInputMode']()?this[_0x66c218(0x104)]():0x0,_0x499365=this['_categoryWindow']['y']+this[_0x66c218(0x37a)][_0x66c218(0xb1)],_0x58391b=Graphics[_0x66c218(0x21a)]-this[_0x66c218(0x104)](),_0x25ea08=this['mainAreaBottom']()-_0x499365;return new Rectangle(_0x35a6b2,_0x499365,_0x58391b,_0x25ea08);},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x26e)]=function(){const _0x13a5a0=_0x4222e9;this['_itemWindow'][_0x13a5a0(0x14b)](_0x13a5a0(0x173),this[_0x13a5a0(0x247)]['bind'](this));},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0xcf)]=function(){const _0x5ee2a7=_0x4222e9;if(this[_0x5ee2a7(0x1fa)]())return _0x5ee2a7(0xf3)===_0x5ee2a7(0xf3)?!![]:_0x598982[_0x5ee2a7(0x16c)][_0x5ee2a7(0x471)]['ItemScene']['ItemMenuStatusRect'][_0x5ee2a7(0x37b)](this);else{if('wqWnj'===_0x5ee2a7(0x27c)){const _0x2a0c30=_0x2c208a['_scene'][_0x5ee2a7(0x407)];_0x2a0c30&&(this['canShiftRemoveEquipment'](this[_0x5ee2a7(0x1d6)]())?(this[_0x5ee2a7(0x3f7)](),this[_0x5ee2a7(0x36f)]()):this[_0x5ee2a7(0x2b3)]());}else return VisuMZ[_0x5ee2a7(0x16c)][_0x5ee2a7(0x471)][_0x5ee2a7(0x11c)]['ShowShopStatus'];}},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x2a1)]=function(){const _0x3f99bd=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x3f99bd(0x471)][_0x3f99bd(0x11c)][_0x3f99bd(0x383)];},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x3a1)]=function(){const _0x12da44=_0x4222e9,_0x382947=this[_0x12da44(0x238)]();this['_statusWindow']=new Window_ShopStatus(_0x382947),this[_0x12da44(0x20f)](this['_statusWindow']),this[_0x12da44(0x3ff)][_0x12da44(0x355)](this[_0x12da44(0x41b)]);const _0x593f74=VisuMZ['ItemsEquipsCore'][_0x12da44(0x471)]['ItemScene'][_0x12da44(0x18a)];this[_0x12da44(0x41b)][_0x12da44(0x3d6)](_0x593f74||0x0);},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x238)]=function(){const _0x1697e5=_0x4222e9;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x1697e5(0x457)!==_0x1697e5(0x201))return this[_0x1697e5(0x371)]();else{const _0x459f73=_0xe1bbb3['ItemsEquipsCore'][_0x1697e5(0x231)][_0x1697e5(0x250)][_0x50a0c8];_0x1f03fc[_0x1697e5(0x223)][_0x1697e5(0x1cf)](_0x459f73)&&(_0x4e2d68['params'][_0x135890]=_0x58bdd4(_0x2d832d['$1']));}}else return VisuMZ[_0x1697e5(0x16c)][_0x1697e5(0x471)][_0x1697e5(0x11c)][_0x1697e5(0x1cb)][_0x1697e5(0x37b)](this);},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x371)]=function(){const _0x288179=_0x4222e9,_0x472b6c=this[_0x288179(0x104)](),_0x1b6c28=this[_0x288179(0x3ff)]['height'],_0x348153=this['isRightInputMode']()?0x0:Graphics[_0x288179(0x21a)]-this[_0x288179(0x104)](),_0x31e950=this[_0x288179(0x3ff)]['y'];return new Rectangle(_0x348153,_0x31e950,_0x472b6c,_0x1b6c28);},Scene_Item[_0x4222e9(0x3f5)]['statusWidth']=function(){const _0x553223=_0x4222e9;return Scene_Shop['prototype'][_0x553223(0x104)]();},Scene_Item['prototype'][_0x4222e9(0x408)]=function(){const _0x3c2dc2=_0x4222e9;if(!this[_0x3c2dc2(0x462)]())return![];if(!this[_0x3c2dc2(0x3b8)]())return![];if(!this['_itemWindow'])return![];if(!this['_itemWindow'][_0x3c2dc2(0x50b)])return![];return this[_0x3c2dc2(0x462)]()&&this[_0x3c2dc2(0x3b8)]();},Scene_Item[_0x4222e9(0x3f5)][_0x4222e9(0x213)]=function(){const _0x576394=_0x4222e9;if(this[_0x576394(0x408)]())return this[_0x576394(0x3ff)][_0x576394(0xa2)]()===0x1?TextManager[_0x576394(0x41c)](_0x576394(0xd5),_0x576394(0x3e1)):TextManager[_0x576394(0x41c)]('pageup',_0x576394(0x42e));return Scene_ItemBase[_0x576394(0x3f5)][_0x576394(0x213)][_0x576394(0x37b)](this);},Scene_Item['prototype'][_0x4222e9(0xef)]=function(){const _0x353e0a=_0x4222e9;if(this[_0x353e0a(0x408)]()){if('BTrne'!==_0x353e0a(0x4e0))return VisuMZ[_0x353e0a(0x16c)][_0x353e0a(0x471)][_0x353e0a(0x11c)]['buttonAssistCategory'];else _0x4a4ac0['a']=_0x53e83f,_0x3f2e50['b']=_0x59bd32;}return Scene_ItemBase[_0x353e0a(0x3f5)][_0x353e0a(0xef)][_0x353e0a(0x37b)](this);},Scene_Equip['prototype']['isBottomHelpMode']=function(){const _0x2dd9b5=_0x4222e9;if(ConfigManager[_0x2dd9b5(0x3c2)]&&ConfigManager[_0x2dd9b5(0x2fe)]!==undefined){if('nBueM'!==_0x2dd9b5(0x345))return ConfigManager[_0x2dd9b5(0x2fe)];else{const _0x2428cc=this[_0x2dd9b5(0x4cf)]();let _0x239a44=0x0,_0x3476bb=0x0,_0x4c4a03='';if(this[_0x2dd9b5(0x475)]){_0xb53bf4[_0x2dd9b5(0x267)]?(_0x239a44=this[_0x2dd9b5(0x407)][_0x2dd9b5(0xeb)](_0x1e884c,![]),_0x3476bb=this[_0x2dd9b5(0x475)][_0x2dd9b5(0xeb)](_0x12037e,![]),_0x4c4a03=this[_0x2dd9b5(0x475)][_0x2dd9b5(0xeb)](_0x2c6baa,!![])):(_0x239a44=this[_0x2dd9b5(0x407)][_0x2dd9b5(0xa0)](_0xecf770),_0x3476bb=this['_tempActor'][_0x2dd9b5(0xa0)](_0xaec187),_0x4c4a03=this[_0x2dd9b5(0x475)]['param'](_0x46fada));const _0xb262bc=_0x239a44,_0x311100=_0x3476bb;_0x57233d=_0x311100-_0xb262bc,this['changeTextColor'](_0x181e3d[_0x2dd9b5(0x3b2)](_0x388893)),this[_0x2dd9b5(0x2de)](_0x4c4a03,_0x36ddde,_0x292c3f,_0x2b504f-_0x2428cc,_0x2dd9b5(0x3e1));}}}else{if(this[_0x2dd9b5(0x1fa)]())return this['updatedLayoutStyle']()[_0x2dd9b5(0x1cf)](/LOWER/i);else Scene_MenuBase[_0x2dd9b5(0x3f5)][_0x2dd9b5(0x2c1)][_0x2dd9b5(0x37b)](this);}},Scene_Equip[_0x4222e9(0x3f5)]['isRightInputMode']=function(){const _0x21112a=_0x4222e9;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x21112a(0x9c)]!==undefined)return _0x21112a(0x351)==='qhxwZ'?ConfigManager[_0x21112a(0x9c)]:_0x36a4a1[_0x21112a(0x16c)][_0x21112a(0x2cf)][_0x21112a(0x37b)](this);else{if(this[_0x21112a(0x1fa)]()){if(_0x21112a(0x2da)===_0x21112a(0x1d5)){const _0x3a8771=_0x2a152c[_0x21112a(0x306)]['_actor'];if(!_0x3a8771)return;if(!_0x3a8771[_0x21112a(0x36b)](this[_0x21112a(0x1d6)]()))return![];const _0x5caf2b=_0x3a8771[_0x21112a(0x2bd)]()[this[_0x21112a(0x1d6)]()];if(_0x3a8771[_0x21112a(0x2df)]()[_0x21112a(0x302)](_0x5caf2b))return![];return!![];;}else return this[_0x21112a(0x462)]()['match'](/RIGHT/i);}else Scene_MenuBase['prototype']['isRightInputMode'][_0x21112a(0x37b)](this);}},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x462)]=function(){const _0xacd7d=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0xacd7d(0x471)]['EquipScene'][_0xacd7d(0x20c)];},Scene_Equip['prototype'][_0x4222e9(0x3b8)]=function(){const _0x27d55e=_0x4222e9;return this[_0x27d55e(0x1ab)]&&this[_0x27d55e(0x1ab)][_0x27d55e(0x3b8)]();},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x1fa)]=function(){const _0x5b6eb6=_0x4222e9;return VisuMZ[_0x5b6eb6(0x16c)]['Settings']['EquipScene'][_0x5b6eb6(0x1d3)];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x1d1)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x272)],Scene_Equip[_0x4222e9(0x3f5)]['create']=function(){const _0x1b05f9=_0x4222e9;VisuMZ[_0x1b05f9(0x16c)][_0x1b05f9(0x1d1)][_0x1b05f9(0x37b)](this);if(this['isUseModernControls']()){if(_0x1b05f9(0x490)!==_0x1b05f9(0x490))return _0x813047[_0x1b05f9(0x22a)]()?_0x36780d[_0x1b05f9(0x22a)]()[_0x1b05f9(0x129)](_0x5b196a):_0x3fddf3['prototype']['isEnabled'][_0x1b05f9(0x37b)](this,_0x1f2175);else this[_0x1b05f9(0x207)]();}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x43e)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x410)],Scene_Equip['prototype'][_0x4222e9(0x410)]=function(){const _0x4a64f0=_0x4222e9;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4a64f0(0x32a)===_0x4a64f0(0x109))_0x2a8f07[_0x4a64f0(0x16c)][_0x4a64f0(0x303)][_0x4a64f0(0x37b)](this),this['isUseModernControls']()&&this[_0x4a64f0(0x263)]();else return this[_0x4a64f0(0x3ba)]();}else{if('VXqNA'!==_0x4a64f0(0x4bf))this[_0x4a64f0(0x3dc)](_0x1e26f5['isTriggered'](_0x4a64f0(0xd5)));else return VisuMZ[_0x4a64f0(0x16c)][_0x4a64f0(0x43e)][_0x4a64f0(0x37b)](this);}},Scene_Equip['prototype'][_0x4222e9(0x3ba)]=function(){const _0x27a62=_0x4222e9,_0x59d58a=0x0,_0x1e091e=this[_0x27a62(0x152)](),_0x171e6e=Graphics[_0x27a62(0x21a)],_0x5ef2b8=this[_0x27a62(0x1ef)]();return new Rectangle(_0x59d58a,_0x1e091e,_0x171e6e,_0x5ef2b8);},VisuMZ['ItemsEquipsCore']['Scene_Equip_statusWindowRect']=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x238)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x238)]=function(){const _0x26cb78=_0x4222e9;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x26cb78(0x371)]();else{if('QZOQX'===_0x26cb78(0x50c)){const _0x2d6702=_0x3e66d4[_0x26cb78(0x84)]('['+_0x3ad9db['$1']['match'](/\d+/g)+']');for(const _0x53ff64 of _0x2d6702){if(!_0x340908[_0x26cb78(0x1f1)](_0x53ff64))return![];}}else return VisuMZ['ItemsEquipsCore'][_0x26cb78(0x2e0)][_0x26cb78(0x37b)](this);}},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x371)]=function(){const _0x4fb061=_0x4222e9,_0x5814a5=this[_0x4fb061(0x2c1)]()?0x0:Graphics['boxWidth']-this[_0x4fb061(0x104)](),_0x4a0a07=this['mainAreaTop'](),_0x1848b3=this[_0x4fb061(0x104)](),_0x3d77fd=this['mainAreaHeight']();return new Rectangle(_0x5814a5,_0x4a0a07,_0x1848b3,_0x3d77fd);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xd3)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x164)],Scene_Equip['prototype'][_0x4222e9(0x164)]=function(){const _0x927f13=_0x4222e9;if(this[_0x927f13(0x1fa)]())return this[_0x927f13(0x4cc)]();else{if(_0x927f13(0x403)!==_0x927f13(0x279))return VisuMZ[_0x927f13(0x16c)]['Scene_Equip_commandWindowRect'][_0x927f13(0x37b)](this);else{if(_0x439582[_0x8b1edd]===_0x36c3c7){_0x295f0f=_0x32ad8d;if(!_0x4bf55d[_0x39e96f])return _0x4d4555;}}}},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x3bf)]=function(){const _0xeabacd=_0x4222e9,_0x912e9b=VisuMZ[_0xeabacd(0x16c)][_0xeabacd(0x471)][_0xeabacd(0x29b)];return _0x912e9b[_0xeabacd(0x4bb)]||_0x912e9b[_0xeabacd(0x4a7)];},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x4cc)]=function(){const _0x4b0b10=_0x4222e9,_0x25197b=this[_0x4b0b10(0x3bf)](),_0xb0ef5f=this[_0x4b0b10(0x2c1)]()?this[_0x4b0b10(0x104)]():0x0,_0x574974=this[_0x4b0b10(0x232)](),_0x2d1a75=Graphics[_0x4b0b10(0x21a)]-this[_0x4b0b10(0x104)](),_0x55e84e=_0x25197b?this[_0x4b0b10(0x40d)](0x1,!![]):0x0;return new Rectangle(_0xb0ef5f,_0x574974,_0x2d1a75,_0x55e84e);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x4a2)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x45c)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x45c)]=function(){const _0x34f2bb=_0x4222e9;VisuMZ[_0x34f2bb(0x16c)]['Scene_Equip_createSlotWindow'][_0x34f2bb(0x37b)](this),this[_0x34f2bb(0x3b8)]()&&('UwSiY'==='UwSiY'?this[_0x34f2bb(0x1c1)]():_0x5400a3=_0x34f2bb(0x331)['format'](_0x35c84e['id']));},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x455)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x251)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x251)]=function(){const _0x38cf36=_0x4222e9;return this[_0x38cf36(0x1fa)]()?this[_0x38cf36(0x4ec)]():VisuMZ[_0x38cf36(0x16c)][_0x38cf36(0x455)]['call'](this);},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x4ec)]=function(){const _0x39d773=_0x4222e9,_0x3ec9b0=this['commandWindowRect'](),_0x2efcb2=this[_0x39d773(0x2c1)]()?this['statusWidth']():0x0,_0xa2621e=_0x3ec9b0['y']+_0x3ec9b0[_0x39d773(0xb1)],_0x3ee3a4=Graphics[_0x39d773(0x21a)]-this['statusWidth'](),_0x253a9b=this['mainAreaHeight']()-_0x3ec9b0[_0x39d773(0xb1)];return new Rectangle(_0x2efcb2,_0xa2621e,_0x3ee3a4,_0x253a9b);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x38e)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x2b6)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x2b6)]=function(){const _0x3f515e=_0x4222e9;return this[_0x3f515e(0x1fa)]()?this['slotWindowRect']():VisuMZ[_0x3f515e(0x16c)][_0x3f515e(0x38e)][_0x3f515e(0x37b)](this);},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x104)]=function(){const _0x23fadc=_0x4222e9;if(this[_0x23fadc(0x1fa)]()){if(_0x23fadc(0x2b9)==='lCFJi')return this['geUpdatedLayoutStatusWidth']();else this[_0x23fadc(0x3b1)]();}else return VisuMZ[_0x23fadc(0x16c)][_0x23fadc(0x471)][_0x23fadc(0x29b)][_0x23fadc(0x90)];},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x28f)]=function(){return Math['floor'](Graphics['boxWidth']/0x2);},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x1c1)]=function(){const _0x2bdeb2=_0x4222e9;this[_0x2bdeb2(0x22e)][_0x2bdeb2(0x14b)](_0x2bdeb2(0x173),this[_0x2bdeb2(0x247)][_0x2bdeb2(0x16e)](this)),this[_0x2bdeb2(0x22e)][_0x2bdeb2(0x14b)](_0x2bdeb2(0x42e),this[_0x2bdeb2(0x36d)][_0x2bdeb2(0x16e)](this)),this['_slotWindow'][_0x2bdeb2(0x14b)]('pageup',this[_0x2bdeb2(0x160)][_0x2bdeb2(0x16e)](this));},VisuMZ[_0x4222e9(0x16c)]['Scene_Equip_commandEquip']=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x207)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x207)]=function(){const _0x335c91=_0x4222e9;if(this[_0x335c91(0x3b8)]()){if(_0x335c91(0x484)!=='adGSh')this[_0x335c91(0x1ab)][_0x335c91(0x2e5)](),this[_0x335c91(0x1ab)][_0x335c91(0x22b)]();else{this[_0x335c91(0x4ef)]();const _0x5ad5f0=_0x22cece[_0x335c91(0x16c)]['Settings'][_0x335c91(0x11c)],_0x3c56e1=_0x5ad5f0[_0x335c91(0x423)],_0x4fefac=_0x3c56e1[_0x335c91(0x474)](_0x236479[_0x335c91(0x47a)](_0x1bd25d));this[_0x335c91(0x412)][_0x335c91(0x3cd)]=_0x5ad5f0[_0x335c91(0x14d)],this[_0x335c91(0x2de)](_0x4fefac,_0x50188c,_0x56aa19,_0x12140c,_0x335c91(0x3e1)),this[_0x335c91(0x4ef)]();}}VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip'][_0x335c91(0x37b)](this);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x93)]=Scene_Equip['prototype'][_0x4222e9(0x3d0)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x3d0)]=function(){const _0x38f5f0=_0x4222e9;this['_slotWindow'][_0x38f5f0(0x1d6)]()>=0x0?(VisuMZ[_0x38f5f0(0x16c)][_0x38f5f0(0x93)][_0x38f5f0(0x37b)](this),this[_0x38f5f0(0x34b)]()):_0x38f5f0(0x22c)!==_0x38f5f0(0x22c)?this[_0x38f5f0(0x472)][_0x38f5f0(0x355)](this[_0x38f5f0(0x41b)]):(this[_0x38f5f0(0x22e)][_0x38f5f0(0x40e)](0x0),this['_slotWindow']['activate']());},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x34b)]=function(){const _0x5e4057=_0x4222e9;this[_0x5e4057(0x3ff)][_0x5e4057(0x49d)]();const _0x536f8c=this['_slotWindow'][_0x5e4057(0x1f2)](),_0x24f494=this[_0x5e4057(0x3ff)]['_data']['indexOf'](_0x536f8c),_0x2eb6d9=Math['floor'](this[_0x5e4057(0x3ff)]['maxVisibleItems']()/0x2)-0x1;this['_itemWindow'][_0x5e4057(0x40e)](_0x24f494>=0x0?_0x24f494:0x0),this[_0x5e4057(0x3ff)][_0x5e4057(0x15a)](this[_0x5e4057(0x3ff)][_0x5e4057(0x1d6)]()-_0x2eb6d9);},VisuMZ[_0x4222e9(0x16c)]['Scene_Equip_onSlotCancel']=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x24b)],Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x24b)]=function(){const _0x27dce4=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x27dce4(0x38d)][_0x27dce4(0x37b)](this);if(this[_0x27dce4(0x3b8)]()){if(_0x27dce4(0x4a5)===_0x27dce4(0x4d6))return _0x1ecadc[_0x27dce4(0x16c)]['Settings'][_0x27dce4(0x246)][_0x27dce4(0x3e5)];else this['_commandWindow'][_0x27dce4(0x40e)](0x0),this[_0x27dce4(0x22e)][_0x27dce4(0x22b)]();}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x156)]=Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x3bb)],Scene_Equip['prototype'][_0x4222e9(0x3bb)]=function(){const _0x1819c5=_0x4222e9;VisuMZ[_0x1819c5(0x16c)]['Scene_Equip_onActorChange'][_0x1819c5(0x37b)](this),this['isUseModernControls']()&&(this[_0x1819c5(0x1ab)][_0x1819c5(0x22b)](),this[_0x1819c5(0x1ab)][_0x1819c5(0x2e5)](),this[_0x1819c5(0x22e)][_0x1819c5(0x40e)](0x0),this[_0x1819c5(0x22e)][_0x1819c5(0x21c)]());},Scene_Equip[_0x4222e9(0x3f5)]['buttonAssistSlotWindowShift']=function(){const _0xd03fb1=_0x4222e9;if(!this['_slotWindow'])return![];if(!this[_0xd03fb1(0x22e)]['active'])return![];return this['_slotWindow'][_0xd03fb1(0xb8)]();},Scene_Equip[_0x4222e9(0x3f5)]['buttonAssistKey3']=function(){const _0x5f5933=_0x4222e9;if(this['buttonAssistSlotWindowShift']())return _0x5f5933(0x23d)===_0x5f5933(0x25a)?_0x56f419:TextManager[_0x5f5933(0x319)](_0x5f5933(0x8e));return Scene_MenuBase[_0x5f5933(0x3f5)][_0x5f5933(0x41f)][_0x5f5933(0x37b)](this);},Scene_Equip['prototype'][_0x4222e9(0x3df)]=function(){const _0x28463e=_0x4222e9;if(this[_0x28463e(0x478)]())return VisuMZ[_0x28463e(0x16c)][_0x28463e(0x471)][_0x28463e(0x29b)][_0x28463e(0xca)];return Scene_MenuBase[_0x28463e(0x3f5)][_0x28463e(0x3df)]['call'](this);},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x507)]=function(){const _0x38ce1f=_0x4222e9;if(this[_0x38ce1f(0x478)]()){if(_0x38ce1f(0x442)!=='FqKPd')this['isGoodShown'](_0x536d1c)?this['_goodsCount']++:_0x534385[_0x38ce1f(0x48f)](_0x1f89bf);else return this[_0x38ce1f(0x461)][_0x38ce1f(0x506)]/0x5/-0x3;}return Scene_MenuBase[_0x38ce1f(0x3f5)]['buttonAssistOffset3']['call'](this);},Scene_Equip[_0x4222e9(0x3f5)][_0x4222e9(0x247)]=function(){const _0x3f4769=_0x4222e9;SceneManager[_0x3f4769(0x1ac)]();},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x350)]=Scene_Load[_0x4222e9(0x3f5)][_0x4222e9(0x2e8)],Scene_Load[_0x4222e9(0x3f5)][_0x4222e9(0x2e8)]=function(){const _0x34024a=_0x4222e9;VisuMZ[_0x34024a(0x16c)][_0x34024a(0x350)]['call'](this),this[_0x34024a(0x11f)]();},Scene_Load[_0x4222e9(0x3f5)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x55f870=_0x4222e9;if($gameSystem['versionId']()!==$dataSystem[_0x55f870(0x361)])for(const _0x24a2ae of $gameActors[_0x55f870(0x112)]){if(_0x24a2ae)_0x24a2ae['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x1f7)]=function(){const _0x435b7e=_0x4222e9;if(ConfigManager[_0x435b7e(0x3c2)]&&ConfigManager[_0x435b7e(0x2fe)]!==undefined)return ConfigManager[_0x435b7e(0x2fe)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x435b7e(0x462)]()[_0x435b7e(0x1cf)](/LOWER/i);else Scene_MenuBase[_0x435b7e(0x3f5)][_0x435b7e(0x2c1)][_0x435b7e(0x37b)](this);}},Scene_Shop['prototype'][_0x4222e9(0x2c1)]=function(){const _0x7e4516=_0x4222e9;if(ConfigManager[_0x7e4516(0x3c2)]&&ConfigManager['uiInputPosition']!==undefined){if(_0x7e4516(0x2f4)!==_0x7e4516(0x447))return ConfigManager['uiInputPosition'];else _0x4e6a78(_0x9646e4);}else{if(this[_0x7e4516(0x1fa)]()){if(_0x7e4516(0x228)!==_0x7e4516(0x228)){const _0x24ba30=_0x836998[_0x7e4516(0x16c)][_0x7e4516(0x471)][_0x7e4516(0x29b)];return _0x24ba30[_0x7e4516(0x4bb)]||_0x24ba30[_0x7e4516(0x4a7)];}else return this[_0x7e4516(0x462)]()['match'](/RIGHT/i);}else Scene_MenuBase[_0x7e4516(0x3f5)][_0x7e4516(0x2c1)][_0x7e4516(0x37b)](this);}},Scene_Shop['prototype'][_0x4222e9(0x462)]=function(){const _0x45ddc9=_0x4222e9;return VisuMZ['ItemsEquipsCore']['Settings'][_0x45ddc9(0x14f)][_0x45ddc9(0x20c)];},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x3b8)]=function(){const _0x131623=_0x4222e9;return this['_categoryWindow']&&this[_0x131623(0x37a)]['isUseModernControls']();},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x1fa)]=function(){const _0x2b1a84=_0x4222e9;return VisuMZ[_0x2b1a84(0x16c)][_0x2b1a84(0x471)][_0x2b1a84(0x14f)]['EnableLayout'];},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x260)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x4ee)],Scene_Shop['prototype']['prepare']=function(_0x5a15e4,_0x5a6cd9){const _0x50ffba=_0x4222e9;_0x5a15e4=JsonEx['makeDeepCopy'](_0x5a15e4),VisuMZ['ItemsEquipsCore'][_0x50ffba(0x260)][_0x50ffba(0x37b)](this,_0x5a15e4,_0x5a6cd9),this['adjustHiddenShownGoods']();},Scene_Shop[_0x4222e9(0x3f5)]['adjustHiddenShownGoods']=function(){const _0x184790=_0x4222e9;this['_goodsCount']=0x0;const _0x50fecc=[];for(const _0x5073ab of this[_0x184790(0x482)]){if(this['isGoodShown'](_0x5073ab))this[_0x184790(0x489)]++;else{if(_0x184790(0x214)!==_0x184790(0x214)){const _0x3009b2=this[_0x184790(0x153)];_0x3009b2[_0x184790(0x412)]['clear']();const _0x1bea54=this[_0x184790(0x2fd)](this[_0x184790(0x1d6)]());if(_0x1bea54===_0x184790(0x268)){const _0x546b1e=this[_0x184790(0x33f)](this[_0x184790(0x1d6)]());let _0x385c9f=this[_0x184790(0x434)](this[_0x184790(0x1d6)]());_0x385c9f=_0x385c9f[_0x184790(0x89)](/\\I\[(\d+)\]/gi,''),_0x3009b2[_0x184790(0x4ef)](),this[_0x184790(0x385)](_0x385c9f,_0x546b1e),this[_0x184790(0x25c)](_0x385c9f,_0x546b1e),this[_0x184790(0x39d)](_0x385c9f,_0x546b1e);}}else _0x50fecc[_0x184790(0x48f)](_0x5073ab);}}for(const _0x39e446 of _0x50fecc){this[_0x184790(0x482)]['remove'](_0x39e446);}},Scene_Shop['prototype'][_0x4222e9(0x21f)]=function(_0x554fab){const _0xdedb82=_0x4222e9;if(_0x554fab[0x0]>0x2||_0x554fab[0x0]<0x0)return![];const _0x8906f6=[$dataItems,$dataWeapons,$dataArmors][_0x554fab[0x0]][_0x554fab[0x1]];if(!_0x8906f6)return![];const _0x582974=_0x8906f6[_0xdedb82(0x223)]||'';if(_0x582974[_0xdedb82(0x1cf)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x84d269=JSON[_0xdedb82(0x84)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2e949f of _0x84d269){if('JqlBb'!==_0xdedb82(0x134)){if(!this['checkItemConditionsSwitchNotetags'](_0x4c1ac4))return![];return!![];}else{if(!$gameSwitches[_0xdedb82(0x1f1)](_0x2e949f))return![];}}return!![];}if(_0x582974[_0xdedb82(0x1cf)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xdedb82(0x3fc)!==_0xdedb82(0x270)){const _0x5bc339=JSON['parse']('['+RegExp['$1'][_0xdedb82(0x1cf)](/\d+/g)+']');for(const _0x3cf600 of _0x5bc339){if(!$gameSwitches[_0xdedb82(0x1f1)](_0x3cf600))return![];}return!![];}else return this[_0xdedb82(0x3ba)]();}if(_0x582974[_0xdedb82(0x1cf)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a207a=JSON[_0xdedb82(0x84)]('['+RegExp['$1'][_0xdedb82(0x1cf)](/\d+/g)+']');for(const _0x585f89 of _0x3a207a){if('fGvDF'!==_0xdedb82(0x1dd)){if($gameSwitches[_0xdedb82(0x1f1)](_0x585f89))return!![];}else this[_0xdedb82(0x2f7)](!![]);}return![];}if(_0x582974[_0xdedb82(0x1cf)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('PCnAD'!=='PCnAD')_0xcdd45a[_0xdedb82(0x16c)][_0xdedb82(0x101)][_0xdedb82(0x37b)](this),this['isUseModernControls']()&&this[_0xdedb82(0x2b4)](),this[_0xdedb82(0x1fa)]()&&this[_0xdedb82(0x3ec)][_0xdedb82(0x34c)]();else{const _0x2e8cef=JSON[_0xdedb82(0x84)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2f127d of _0x2e8cef){if(!$gameSwitches[_0xdedb82(0x1f1)](_0x2f127d))return!![];}return![];}}if(_0x582974[_0xdedb82(0x1cf)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26964b=JSON[_0xdedb82(0x84)]('['+RegExp['$1'][_0xdedb82(0x1cf)](/\d+/g)+']');for(const _0x3f103c of _0x26964b){if(!$gameSwitches[_0xdedb82(0x1f1)](_0x3f103c))return!![];}return![];}if(_0x582974[_0xdedb82(0x1cf)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f8137=JSON[_0xdedb82(0x84)]('['+RegExp['$1'][_0xdedb82(0x1cf)](/\d+/g)+']');for(const _0x713db6 of _0x2f8137){if(_0xdedb82(0x486)==='blRnu'){if($gameSwitches[_0xdedb82(0x1f1)](_0x713db6))return![];}else return _0x103e43[_0xdedb82(0x16c)][_0xdedb82(0x471)][_0xdedb82(0x29b)][_0xdedb82(0xca)];}return!![];}return!![];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xe3)]=Scene_Shop['prototype'][_0x4222e9(0x272)],Scene_Shop[_0x4222e9(0x3f5)]['create']=function(){const _0x4fa2b0=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x4fa2b0(0xe3)][_0x4fa2b0(0x37b)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&(_0x4fa2b0(0x4ea)!==_0x4fa2b0(0x4ea)?(_0x55c9ce=_0x4b0ef3['param'](_0x12a89b),_0x243cb6=_0x3f5e4a-_0x48682a[_0x4fa2b0(0xa0)](_0x10c2f6),this[_0x4fa2b0(0x1e5)](_0xad2c9c[_0x4fa2b0(0x3b2)](_0x37a32c)),_0x118724=(_0xcc16b7>=0x0?'+':'')+_0x3dbdd7):this[_0x4fa2b0(0x11e)]()),this[_0x4fa2b0(0x1d0)]();},Scene_Shop[_0x4222e9(0x3f5)]['postCreateItemsEquipsCore']=function(){const _0x1aa6b7=_0x4222e9;this[_0x1aa6b7(0x3ec)]['hide'](),this[_0x1aa6b7(0x397)][_0x1aa6b7(0x4dd)](),this[_0x1aa6b7(0x397)][_0x1aa6b7(0x2e5)](),this[_0x1aa6b7(0x41b)]['show']();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x234)]=Scene_Shop['prototype']['helpWindowRect'],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x410)]=function(){const _0x19c6a8=_0x4222e9;if(this[_0x19c6a8(0x1fa)]()){if(_0x19c6a8(0xfc)!==_0x19c6a8(0x265))return this[_0x19c6a8(0x3ba)]();else{_0x4e1944+=0x1;if(_0x578f22[_0x19c6a8(0x223)][_0x19c6a8(0x1cf)](_0xd94518)){const _0x146dc0=_0x55c775(_0x26265a['$1'])||0x1;if(_0x3b3f70>=_0x146dc0)return!![];}if(_0x45b305[_0x19c6a8(0x223)][_0x19c6a8(0x1cf)](_0x1474c6)){const _0x5b6292=_0x3ce000(_0x5b3eea['$1'])||0x1;if(_0x4d9d7b>=_0x5b6292)return!![];}}}else return VisuMZ[_0x19c6a8(0x16c)][_0x19c6a8(0x234)]['call'](this);},Scene_Shop[_0x4222e9(0x3f5)]['helpWindowRectItemsEquipsCore']=function(){const _0x36f366=_0x4222e9,_0x33b7d5=0x0,_0x7c414c=this['helpAreaTop'](),_0x585790=Graphics[_0x36f366(0x21a)],_0x21553f=this['helpAreaHeight']();return new Rectangle(_0x33b7d5,_0x7c414c,_0x585790,_0x21553f);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xbb)]=Scene_Shop['prototype'][_0x4222e9(0x237)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x237)]=function(){const _0x5e7c0a=_0x4222e9;if(this[_0x5e7c0a(0x1fa)]()){if(_0x5e7c0a(0x1ea)===_0x5e7c0a(0x347))_0x5681d7=_0x5e7c0a(0x331)[_0x5e7c0a(0x474)](_0x4b6518['id']);else return this['goldWindowRectItemsEquipsCore']();}else{if(_0x5e7c0a(0xc3)!=='uOCEK'){const _0x125315=0x0,_0xd0ae1d=this[_0x5e7c0a(0x232)](),_0x314326=_0xa8c384[_0x5e7c0a(0x21a)],_0x3b49c5=this['calcWindowHeight'](0x1,!![]);return new _0x4d2e33(_0x125315,_0xd0ae1d,_0x314326,_0x3b49c5);}else return VisuMZ[_0x5e7c0a(0x16c)][_0x5e7c0a(0xbb)][_0x5e7c0a(0x37b)](this);}},Scene_Shop[_0x4222e9(0x3f5)]['goldWindowRectItemsEquipsCore']=function(){const _0x559037=_0x4222e9,_0x2e0ba8=this[_0x559037(0x7d)](),_0x3b1bcc=this[_0x559037(0x40d)](0x1,!![]),_0x1f0892=this[_0x559037(0x2c1)]()?0x0:Graphics[_0x559037(0x21a)]-_0x2e0ba8,_0x36ed3d=this[_0x559037(0x232)]();return new Rectangle(_0x1f0892,_0x36ed3d,_0x2e0ba8,_0x3b1bcc);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x32b)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x164)],Scene_Shop['prototype']['commandWindowRect']=function(){const _0x2277c0=_0x4222e9;if(this[_0x2277c0(0x1fa)]()){if('TzwKP'!==_0x2277c0(0x12e))_0x81cb8e[_0x2277c0(0x405)](_0x2277c0(0x8e))&&this[_0x2277c0(0x437)]()?this[_0x2277c0(0xbf)]():this[_0x2277c0(0x10f)](_0x2fd2f4[_0x2277c0(0x40b)]('up'));else return this[_0x2277c0(0x4cc)]();}else{if('TgTnW'===_0x2277c0(0x192))return VisuMZ[_0x2277c0(0x16c)][_0x2277c0(0x32b)]['call'](this);else{this['resetFontSettings'](),this[_0x2277c0(0x412)][_0x2277c0(0x3cd)]=this[_0x2277c0(0x3a3)]();let _0x4d0ff9=this['textWidth'](_0x17cccf['param'](_0x4c0a4f))+0x4+_0x2377da;return _0x568fc6['VisuMZ_0_CoreEngine']?(this[_0x2277c0(0x358)](_0x49e24c,_0xa5583a,_0x3853ef,_0x554b45,!![]),_0x57c1ae['CoreEngine']['Settings'][_0x2277c0(0x25f)]['DrawIcons']&&(_0x4d0ff9+=_0x412431['iconWidth']+0x4)):(this[_0x2277c0(0x1e5)](_0x547483[_0x2277c0(0x50a)]()),this[_0x2277c0(0x2de)](_0x4816eb['param'](_0x1d7ca4),_0xf150f6,_0x5a77c9,_0x227bac)),this[_0x2277c0(0x4ef)](),_0x4d0ff9;}}},Scene_Shop[_0x4222e9(0x3f5)]['commandWindowRectItemsEquipsCore']=function(){const _0x26e2ca=_0x4222e9,_0x26af4f=this[_0x26e2ca(0x2c1)]()?this[_0x26e2ca(0x7d)]():0x0,_0x43471c=this['mainAreaTop'](),_0x6b90bc=Graphics[_0x26e2ca(0x21a)]-this[_0x26e2ca(0x7d)](),_0x496a89=this[_0x26e2ca(0x40d)](0x1,!![]);return new Rectangle(_0x26af4f,_0x43471c,_0x6b90bc,_0x496a89);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x327)]=Scene_Shop[_0x4222e9(0x3f5)]['numberWindowRect'],Scene_Shop['prototype'][_0x4222e9(0x4a9)]=function(){const _0xaaf072=_0x4222e9;return this[_0xaaf072(0x1fa)]()?this[_0xaaf072(0x7e)]():VisuMZ[_0xaaf072(0x16c)][_0xaaf072(0x327)][_0xaaf072(0x37b)](this);},Scene_Shop['prototype']['numberWindowRectItemsEquipsCore']=function(){const _0x1deeab=_0x4222e9,_0x38d4ef=this[_0x1deeab(0x1ab)]['y']+this['_commandWindow']['height'],_0x127dcf=Graphics['boxWidth']-this['statusWidth'](),_0x23f14a=this['isRightInputMode']()?Graphics[_0x1deeab(0x21a)]-_0x127dcf:0x0,_0x239627=this['mainAreaHeight']()-this['_commandWindow'][_0x1deeab(0xb1)];return new Rectangle(_0x23f14a,_0x38d4ef,_0x127dcf,_0x239627);},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_statusWindowRect']=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x238)],Scene_Shop['prototype'][_0x4222e9(0x238)]=function(){const _0x9dbfa0=_0x4222e9;return this[_0x9dbfa0(0x1fa)]()?'FUZWh'===_0x9dbfa0(0xc0)?this[_0x9dbfa0(0x371)]():_0x1e5752[_0x9dbfa0(0x16c)][_0x9dbfa0(0x1f0)]['call'](this):VisuMZ['ItemsEquipsCore'][_0x9dbfa0(0x205)]['call'](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x371)]=function(){const _0x3480c2=_0x4222e9,_0x366e31=this[_0x3480c2(0x104)](),_0x1a71fa=this[_0x3480c2(0x17f)]()-this[_0x3480c2(0x1ab)]['height'],_0x451114=this[_0x3480c2(0x2c1)]()?0x0:Graphics['boxWidth']-_0x366e31,_0x227fe2=this[_0x3480c2(0x1ab)]['y']+this[_0x3480c2(0x1ab)]['height'];return new Rectangle(_0x451114,_0x227fe2,_0x366e31,_0x1a71fa);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x1bd)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x146)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x146)]=function(){const _0x253cd2=_0x4222e9;if(this[_0x253cd2(0x1fa)]()){if('KAkms'===_0x253cd2(0x1ad)){const _0x50773e=this[_0x253cd2(0x33f)](_0x2a9a14),_0x5ca974=this['commandName'](_0x39f20b),_0x54eb59=this[_0x253cd2(0x211)](_0x5ca974)[_0x253cd2(0x506)];this[_0x253cd2(0x393)](this[_0x253cd2(0x1b5)](_0x2c934f));const _0x4c623a=this[_0x253cd2(0x33a)]();if(_0x4c623a===_0x253cd2(0x3e1))this[_0x253cd2(0x295)](_0x5ca974,_0x50773e['x']+_0x50773e['width']-_0x54eb59,_0x50773e['y'],_0x54eb59);else{if(_0x4c623a==='center'){const _0x5a4199=_0x50773e['x']+_0x1ac1ba[_0x253cd2(0x24e)]((_0x50773e[_0x253cd2(0x506)]-_0x54eb59)/0x2);this[_0x253cd2(0x295)](_0x5ca974,_0x5a4199,_0x50773e['y'],_0x54eb59);}else this['drawTextEx'](_0x5ca974,_0x50773e['x'],_0x50773e['y'],_0x54eb59);}}else return this[_0x253cd2(0x50d)]();}else return VisuMZ['ItemsEquipsCore'][_0x253cd2(0x1bd)][_0x253cd2(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x50d)]=function(){const _0x4d79b8=_0x4222e9,_0x3f605e=this[_0x4d79b8(0x1ab)]['y']+this[_0x4d79b8(0x1ab)]['height'],_0x5bc826=Graphics[_0x4d79b8(0x21a)]-this[_0x4d79b8(0x104)](),_0x2b9afb=this[_0x4d79b8(0x17f)]()-this[_0x4d79b8(0x1ab)][_0x4d79b8(0xb1)],_0x1a355b=this[_0x4d79b8(0x2c1)]()?Graphics[_0x4d79b8(0x21a)]-_0x5bc826:0x0;return new Rectangle(_0x1a355b,_0x3f605e,_0x5bc826,_0x2b9afb);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x303)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x4a4)],Scene_Shop[_0x4222e9(0x3f5)]['createCategoryWindow']=function(){const _0x455604=_0x4222e9;VisuMZ[_0x455604(0x16c)]['Scene_Shop_createCategoryWindow'][_0x455604(0x37b)](this);if(this[_0x455604(0x3b8)]()){if(_0x455604(0xb7)===_0x455604(0x287))for(const _0x24d259 of _0x524fef[_0x455604(0x112)]){if(_0x24d259)_0x24d259[_0x455604(0xe7)]();}else this[_0x455604(0x263)]();}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x2cf)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x3af)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x3af)]=function(){const _0x15c75d=_0x4222e9;if(this[_0x15c75d(0x1fa)]()){if(_0x15c75d(0x353)===_0x15c75d(0x2fc)){this['changePaintOpacity'](this[_0x15c75d(0x44f)](null));const _0x118cf9=_0x1ee776[_0x15c75d(0x16c)][_0x15c75d(0x471)][_0x15c75d(0x29b)],_0x3ec995=this[_0x15c75d(0x33f)](_0x533e2e),_0xc67710=_0x3ec995['y']+(this[_0x15c75d(0x39a)]()-_0x137609[_0x15c75d(0x40f)])/0x2,_0x3ade1e=_0x4dc55e[_0x15c75d(0x3d3)]+0x4,_0x5d9db6=_0x39fbe1[_0x15c75d(0x1b7)](0x0,_0x3ec995[_0x15c75d(0x506)]-_0x3ade1e);this['resetTextColor'](),this[_0x15c75d(0x42d)](_0x118cf9['RemoveEquipIcon'],_0x3ec995['x'],_0xc67710),this[_0x15c75d(0x2de)](_0x118cf9['RemoveEquipText'],_0x3ec995['x']+_0x3ade1e,_0x3ec995['y'],_0x5d9db6),this['changePaintOpacity'](!![]);}else return this[_0x15c75d(0x4e9)]();}else return VisuMZ[_0x15c75d(0x16c)]['Scene_Shop_categoryWindowRect'][_0x15c75d(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x4e9)]=function(){const _0x3e625b=_0x4222e9,_0x171290=this[_0x3e625b(0x1ab)]['y'],_0x4d3079=this[_0x3e625b(0x1ab)][_0x3e625b(0x506)],_0x44e242=this[_0x3e625b(0x40d)](0x1,!![]),_0x2a31fd=this[_0x3e625b(0x2c1)]()?Graphics[_0x3e625b(0x21a)]-_0x4d3079:0x0;return new Rectangle(_0x2a31fd,_0x171290,_0x4d3079,_0x44e242);},Scene_Shop['prototype'][_0x4222e9(0x263)]=function(){const _0x3a1ba5=_0x4222e9;delete this[_0x3a1ba5(0x37a)][_0x3a1ba5(0x4df)]['ok'],delete this[_0x3a1ba5(0x37a)]['_handlers'][_0x3a1ba5(0x173)];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x305)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x502)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x502)]=function(){const _0x20dce0=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x20dce0(0x305)][_0x20dce0(0x37b)](this);if(this[_0x20dce0(0x1fa)]()){if(_0x20dce0(0x3bc)!==_0x20dce0(0x377))this[_0x20dce0(0x1d4)]();else{this['commandName'](_0x227f9b)[_0x20dce0(0x1cf)](/\\I\[(\d+)\]/i);const _0x84b6e5=_0x4edc72(_0x38be50['$1'])||0x0,_0x337d07=this[_0x20dce0(0x33f)](_0x5b0869),_0x169bcf=_0x337d07['x']+_0xcf6ed0[_0x20dce0(0x24e)]((_0x337d07[_0x20dce0(0x506)]-_0x2d209a[_0x20dce0(0x3d3)])/0x2),_0x5f4337=_0x337d07['y']+(_0x337d07[_0x20dce0(0xb1)]-_0x44b8ff[_0x20dce0(0x40f)])/0x2;this['drawIcon'](_0x84b6e5,_0x169bcf,_0x5f4337);}}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x480)]=Scene_Shop[_0x4222e9(0x3f5)]['sellWindowRect'],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x308)]=function(){const _0xfb9dbf=_0x4222e9;return this[_0xfb9dbf(0x1fa)]()?this[_0xfb9dbf(0x204)]():VisuMZ['ItemsEquipsCore'][_0xfb9dbf(0x480)][_0xfb9dbf(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x204)]=function(){const _0xae1d53=_0x4222e9,_0x54628e=this[_0xae1d53(0x37a)]['y']+this['_categoryWindow']['height'],_0x315080=Graphics['boxWidth']-this[_0xae1d53(0x104)](),_0x57dcad=this[_0xae1d53(0x17f)]()-this[_0xae1d53(0x37a)][_0xae1d53(0xb1)],_0x5d3dfd=this['isRightInputMode']()?Graphics[_0xae1d53(0x21a)]-_0x315080:0x0;return new Rectangle(_0x5d3dfd,_0x54628e,_0x315080,_0x57dcad);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x1d4)]=function(){const _0x57dd1b=_0x4222e9;this[_0x57dd1b(0x472)]['setStatusWindow'](this[_0x57dd1b(0x41b)]);},Scene_Shop['prototype']['statusWidth']=function(){const _0x7db5f3=_0x4222e9;return VisuMZ[_0x7db5f3(0x16c)][_0x7db5f3(0x471)][_0x7db5f3(0x246)]['Width'];},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x4222e9(0x3f5)]['activateSellWindow'],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x315)]=function(){const _0x55d386=_0x4222e9;VisuMZ[_0x55d386(0x16c)]['Scene_Shop_activateSellWindow'][_0x55d386(0x37b)](this),this[_0x55d386(0x1fa)]()&&this[_0x55d386(0x41b)][_0x55d386(0x4dd)](),this[_0x55d386(0x472)]['updateHelp']();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xee)]=Scene_Shop[_0x4222e9(0x3f5)]['commandBuy'],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0xa4)]=function(){const _0x40d024=_0x4222e9;VisuMZ['ItemsEquipsCore']['Scene_Shop_commandBuy'][_0x40d024(0x37b)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x40d024(0x261)]();},Scene_Shop['prototype'][_0x4222e9(0x261)]=function(){const _0x50f5d7=_0x4222e9;this[_0x50f5d7(0x45f)]=this[_0x50f5d7(0x45f)]||0x0,this['_buyWindow'][_0x50f5d7(0x40e)](this[_0x50f5d7(0x45f)]);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x2d8)]=Scene_Shop[_0x4222e9(0x3f5)]['commandSell'],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x43f)]=function(){const _0x2d708a=_0x4222e9;VisuMZ[_0x2d708a(0x16c)][_0x2d708a(0x2d8)][_0x2d708a(0x37b)](this),this[_0x2d708a(0x1fa)]()&&this[_0x2d708a(0x428)](),this[_0x2d708a(0x3b8)]()&&(this[_0x2d708a(0x37a)][_0x2d708a(0x40e)](0x0),this['onCategoryOk']());},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x428)]=function(){const _0x4febc4=_0x4222e9;this[_0x4febc4(0x397)][_0x4febc4(0x34c)](),this[_0x4febc4(0x1ab)][_0x4febc4(0x34c)]();},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_onBuyCancel']=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x43a)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x43a)]=function(){const _0x386c87=_0x4222e9;VisuMZ[_0x386c87(0x16c)][_0x386c87(0x16d)][_0x386c87(0x37b)](this),this[_0x386c87(0x1fa)]()&&(_0x386c87(0x285)===_0x386c87(0x2b0)?_0x3f53a9=_0x577ae0(_0x5db781['$1'])[_0x386c87(0x277)]():this[_0x386c87(0x2e3)]());},Scene_Shop[_0x4222e9(0x3f5)]['onBuyCancelItemsEquipsCore']=function(){const _0x20c407=_0x4222e9;this[_0x20c407(0x45f)]=this[_0x20c407(0x397)][_0x20c407(0x1d6)](),this['_buyWindow'][_0x20c407(0x4dd)](),this[_0x20c407(0x397)][_0x20c407(0x2e5)](),this[_0x20c407(0x397)][_0x20c407(0x3c3)](0x0,0x0),this[_0x20c407(0x41b)]['show'](),this[_0x20c407(0x3ec)]['hide']();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x370)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x2b4)],Scene_Shop['prototype']['onCategoryCancel']=function(){const _0x3c1f07=_0x4222e9;VisuMZ[_0x3c1f07(0x16c)]['Scene_Shop_onCategoryCancel'][_0x3c1f07(0x37b)](this),this[_0x3c1f07(0x1fa)]()&&this['onCategoryCancelItemsEquipsCore']();},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0xde)]=function(){const _0x1da89f=_0x4222e9;this['_buyWindow']['show'](),this[_0x1da89f(0x1ab)][_0x1da89f(0x4dd)]();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x3a6)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x283)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x283)]=function(){const _0x363ee3=_0x4222e9;$gameTemp[_0x363ee3(0x1c6)]=!![],VisuMZ[_0x363ee3(0x16c)][_0x363ee3(0x3a6)][_0x363ee3(0x37b)](this),$gameTemp[_0x363ee3(0x1c6)]=![],this[_0x363ee3(0x106)]=this[_0x363ee3(0x397)][_0x363ee3(0x1f2)]();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x494)]=Scene_Shop['prototype']['buyingPrice'],Scene_Shop[_0x4222e9(0x3f5)]['buyingPrice']=function(){const _0x4eae5d=_0x4222e9;$gameTemp[_0x4eae5d(0x1c6)]=!![],this['_item']=this[_0x4eae5d(0x397)][_0x4eae5d(0x1f2)]();const _0x5316c7=VisuMZ['ItemsEquipsCore'][_0x4eae5d(0x494)]['call'](this);return $gameTemp[_0x4eae5d(0x1c6)]=![],this['_item']=this[_0x4eae5d(0x397)][_0x4eae5d(0x1f2)](),_0x5316c7;},VisuMZ['ItemsEquipsCore']['Scene_Shop_onSellOk']=Scene_Shop['prototype'][_0x4222e9(0x320)],Scene_Shop[_0x4222e9(0x3f5)]['onSellOk']=function(){const _0x50a48d=_0x4222e9;VisuMZ[_0x50a48d(0x16c)]['Scene_Shop_onSellOk'][_0x50a48d(0x37b)](this),this[_0x50a48d(0x1fa)]()&&this[_0x50a48d(0x298)]();},Scene_Shop[_0x4222e9(0x3f5)]['onSellOkItemsEquipsCore']=function(){const _0x21912e=_0x4222e9;this['_categoryWindow'][_0x21912e(0x4dd)]();},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_onSellCancel']=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x91)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x91)]=function(){const _0xc4a9d5=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0xc4a9d5(0x101)][_0xc4a9d5(0x37b)](this);if(this[_0xc4a9d5(0x3b8)]()){if(_0xc4a9d5(0x376)===_0xc4a9d5(0x376))this[_0xc4a9d5(0x2b4)]();else{const _0x1529ef=new _0x944d6b(0x0,0x0,_0x33fb4e[_0xc4a9d5(0x506)],_0x40a696[_0xc4a9d5(0xb1)]);this[_0xc4a9d5(0x153)]=new _0x1fbcf9(_0x1529ef),this[_0xc4a9d5(0x153)][_0xc4a9d5(0x2ca)]=0x0,this[_0xc4a9d5(0x2d2)](this[_0xc4a9d5(0x153)]),this[_0xc4a9d5(0xe4)]();}}this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0xc4a9d5(0x3ec)][_0xc4a9d5(0x34c)]();},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x3e4)]=function(_0x298515){const _0x2b9f6f=_0x4222e9,_0x137335=this[_0x2b9f6f(0x106)];this['_item']=_0x298515;const _0x4b0b5d=this[_0x2b9f6f(0x30e)]();return this['_item']=_0x137335,_0x4b0b5d;},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_sellingPrice']=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x30e)],Scene_Shop[_0x4222e9(0x3f5)]['sellingPrice']=function(){const _0x1ba901=_0x4222e9;let _0x5ee459=this['determineBaseSellingPrice']();const _0x3feb95=this[_0x1ba901(0x106)];return _0x5ee459=VisuMZ[_0x1ba901(0x16c)]['Settings'][_0x1ba901(0x14f)][_0x1ba901(0x304)][_0x1ba901(0x37b)](this,_0x3feb95,_0x5ee459),_0x5ee459;},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x34a)]=function(){const _0x33874e=_0x4222e9;let _0x49c5ca=this[_0x33874e(0x106)][_0x33874e(0x4ad)];if(!this[_0x33874e(0x106)])return _0x33874e(0x28e)!==_0x33874e(0x281)?0x0:_0x27e5ee[_0x33874e(0x9c)];else{if(this[_0x33874e(0x106)][_0x33874e(0x223)][_0x33874e(0x1cf)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x170953=String(RegExp['$1']);let _0x41d0b2=this[_0x33874e(0x106)],_0x50f6f9=_0x49c5ca*this[_0x33874e(0x364)]();try{if('OOwvR'==='llifF')return _0x33874e(0x18e);else eval(_0x170953);}catch(_0x4fd908){if($gameTemp[_0x33874e(0x359)]())console['log'](_0x4fd908);}if(isNaN(_0x50f6f9))_0x50f6f9=0x0;return Math['floor'](_0x50f6f9);}else return this[_0x33874e(0x106)][_0x33874e(0x223)][_0x33874e(0x1cf)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x33874e(0x24e)](this[_0x33874e(0x149)]());}},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x149)]=function(){const _0x484367=_0x4222e9;return this[_0x484367(0x106)][_0x484367(0x4ad)]*this[_0x484367(0x364)]();},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x364)]=function(){const _0x2a92a3=_0x4222e9;return VisuMZ[_0x2a92a3(0x16c)]['Settings'][_0x2a92a3(0x14f)][_0x2a92a3(0x406)];},Scene_Shop[_0x4222e9(0x3f5)]['buttonAssistItemListRequirement']=function(){const _0x3c5e5c=_0x4222e9;if(!this[_0x3c5e5c(0x462)]())return![];if(!this[_0x3c5e5c(0x3b8)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x3c5e5c(0x472)]['active'])return![];return this[_0x3c5e5c(0x462)]()&&this[_0x3c5e5c(0x3b8)]();},Scene_Shop[_0x4222e9(0x3f5)]['buttonAssistKey1']=function(){const _0x1d3300=_0x4222e9;if(this['buttonAssistItemListRequirement']())return this[_0x1d3300(0x472)]['maxCols']()===0x1?TextManager[_0x1d3300(0x41c)](_0x1d3300(0xd5),'right'):TextManager[_0x1d3300(0x41c)](_0x1d3300(0x47f),_0x1d3300(0x42e));else{if(this[_0x1d3300(0x1ca)]&&this[_0x1d3300(0x1ca)][_0x1d3300(0x50b)])return _0x1d3300(0x128)===_0x1d3300(0x128)?TextManager[_0x1d3300(0x41c)]('left',_0x1d3300(0x3e1)):this[_0x1d3300(0x396)](_0x47ae52(_0x642df['$1'])[_0x1d3300(0x469)](0x0,0x1f));}return Scene_MenuBase[_0x1d3300(0x3f5)][_0x1d3300(0x213)][_0x1d3300(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)]['buttonAssistKey2']=function(){const _0x1b96f9=_0x4222e9;if(this[_0x1b96f9(0x1ca)]&&this[_0x1b96f9(0x1ca)][_0x1b96f9(0x50b)]){if(_0x1b96f9(0x2db)!==_0x1b96f9(0x2db))_0x3deb14[_0x1b96f9(0x16c)][_0x1b96f9(0xdc)]['call'](this,_0x1ea77b),_0x225e27[_0x1b96f9(0x37a)]=this;else return TextManager['getInputMultiButtonStrings']('up',_0x1b96f9(0x269));}return Scene_MenuBase[_0x1b96f9(0x3f5)][_0x1b96f9(0x23c)][_0x1b96f9(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0xef)]=function(){const _0x2f086e=_0x4222e9;if(this[_0x2f086e(0x408)]()){if(_0x2f086e(0x338)!==_0x2f086e(0x3ea))return VisuMZ[_0x2f086e(0x16c)][_0x2f086e(0x471)][_0x2f086e(0x11c)][_0x2f086e(0x121)];else{const _0x417a61=_0x43ffb3(_0x3e46af['$1']);let _0x2a7d41=this[_0x2f086e(0x106)],_0x15ab39=_0x56676f*this[_0x2f086e(0x364)]();try{_0x2ec370(_0x417a61);}catch(_0x16cf44){if(_0x145753[_0x2f086e(0x359)]())_0x4a28a8[_0x2f086e(0x316)](_0x16cf44);}if(_0xb5ec9a(_0x15ab39))_0x15ab39=0x0;return _0x2938cb[_0x2f086e(0x24e)](_0x15ab39);}}else{if(this[_0x2f086e(0x1ca)]&&this[_0x2f086e(0x1ca)][_0x2f086e(0x50b)])return VisuMZ[_0x2f086e(0x16c)][_0x2f086e(0x471)][_0x2f086e(0x14f)]['buttonAssistSmallIncrement'];}return Scene_MenuBase[_0x2f086e(0x3f5)][_0x2f086e(0xef)][_0x2f086e(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x463)]=function(){const _0x85d0fd=_0x4222e9;if(this[_0x85d0fd(0x1ca)]&&this[_0x85d0fd(0x1ca)][_0x85d0fd(0x50b)])return VisuMZ[_0x85d0fd(0x16c)][_0x85d0fd(0x471)][_0x85d0fd(0x14f)][_0x85d0fd(0x25b)];return Scene_MenuBase[_0x85d0fd(0x3f5)][_0x85d0fd(0x463)][_0x85d0fd(0x37b)](this);},Scene_Shop[_0x4222e9(0x3f5)]['resetShopSwitches']=function(){const _0x22ca73=_0x4222e9;if(!SceneManager['isSceneShop']())return;const _0x33c586=VisuMZ[_0x22ca73(0x16c)][_0x22ca73(0x471)][_0x22ca73(0x14f)];_0x33c586['SwitchBuy']&&(_0x22ca73(0x14a)===_0x22ca73(0x1db)?this[_0x22ca73(0x9e)]():$gameSwitches[_0x22ca73(0x4f7)](_0x33c586['SwitchBuy'],![])),_0x33c586[_0x22ca73(0x31d)]&&$gameSwitches['setValue'](_0x33c586['SwitchSell'],![]);},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x4fd)]=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x2a2)],Scene_Shop['prototype'][_0x4222e9(0x2a2)]=function(_0x16484e){const _0x2f56be=_0x4222e9;VisuMZ[_0x2f56be(0x16c)][_0x2f56be(0x4fd)][_0x2f56be(0x37b)](this,_0x16484e);if(_0x16484e<=0x0)return;const _0x8355d8=VisuMZ[_0x2f56be(0x16c)][_0x2f56be(0x471)][_0x2f56be(0x14f)];_0x8355d8[_0x2f56be(0x2c3)]&&$gameSwitches['setValue'](_0x8355d8[_0x2f56be(0x2c3)],!![]);},VisuMZ[_0x4222e9(0x16c)]['Scene_Shop_doSell']=Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x253)],Scene_Shop[_0x4222e9(0x3f5)][_0x4222e9(0x253)]=function(_0xb75d2a){const _0x514223=_0x4222e9;VisuMZ[_0x514223(0x16c)]['Scene_Shop_doSell']['call'](this,_0xb75d2a);if(_0xb75d2a<=0x0)return;const _0x27f30d=VisuMZ[_0x514223(0x16c)]['Settings'][_0x514223(0x14f)];_0x27f30d[_0x514223(0x2c3)]&&$gameSwitches[_0x514223(0x4f7)](_0x27f30d['SwitchSell'],!![]);};function _0x2aab(_0x430347,_0x54b238){const _0x17ca7c=_0x17ca();return _0x2aab=function(_0x2aabc8,_0x3d9bf5){_0x2aabc8=_0x2aabc8-0x7c;let _0x7d5a76=_0x17ca7c[_0x2aabc8];return _0x7d5a76;},_0x2aab(_0x430347,_0x54b238);}function _0x17ca(){const _0x31c686=['RGtKT','allowShiftScrolling','equipAdjustHpMp','getItemDamageAmountTextOriginal','onBuyCancel','drawItemStyleIconText','Icon','KeyItemProtect','Scene_Equip_helpWindowRect','commandSell','goldWindowRectItemsEquipsCore','Game_BattlerBase_param','FqKPd','SEYdC','Damage\x20Formula\x20Error\x20for\x20%1','paramPlusItemsEquipsCoreCustomJS','round','hxfXd','EVAL','type','fontSizeRatio','weapon-%1','setObject','MP\x20RECOVERY','SBkdB','isEnabled','wtypeId','hqJHS','isNewItem','onCategoryOk','gcDwD','Scene_Equip_slotWindowRect','Huatq','dJqBF','rateMP','REMOVED\x20EFFECTS','addCommand','playCursorSound','createSlotWindow','atypeId','Window_ItemList_maxCols','_buyWindowLastIndex','weapon','_buttonAssistWindow','updatedLayoutStyle','buttonAssistText2','money','process_VisuMZ_ItemsEquipsCore_RegExp','MaxMP','Scene_Item_helpWindowRect','mlyOP','clamp','middle','cxOwy','isCancelled','categoryList','SUCCESS\x20RATE','callUpdateHelp','DBKRW','Settings','_sellWindow','sBTbo','format','_tempActor','loadSystem','currentClass','buttonAssistSlotWindowShift','DrawIcons','numItems','ShopMenuStatusStandard','flatHP','Scene_Item_itemWindowRect','createItemWindow','pageup','Scene_Shop_sellWindowRect','getMenuImage','_goods','ExtDisplayedParams','zCWOX','New','blRnu','exit','VUKmk','_goodsCount','ukXod','drawItemCustomEntries','DrawBackRect','categoryItemTypes','+%1%','push','xnjSd','checkItemConditionsSwitchNotetags','background','1253ZoHprn','Scene_Shop_buyingPrice','drawItemCost','onDatabaseLoaded','vuEcH','drawItemActorMenuImage','currentExt','isHoverEnabled','isProxyItem','ZYakJ','refresh','lRpbU','Step2Start','DrawPortraitJS','Consumable','Scene_Equip_createSlotWindow','_armorIDs','createCategoryWindow','NCTKZ','optimizeEquipments','CommandAddClear','translucentOpacity','numberWindowRect','RibUp','eUPOk','KggmW','price','select','EFFECT_GAIN_TP','zSSdy','SvAMJ','HIT\x20TYPE','addItemCategories','DrawItemData','_newLabelOpacityChange','W%1','RegularItems','LabelDamageTP','_tempActorA','gYmCJ','CommandAddOptimize','tgFFW','EFFECT_REMOVE_BUFF','getProxyItem','VXqNA','updateNewLabelOpacity','getMatchingInitEquip','paramId','3560095PrOISu','drawItemDamageAmount','ConvertParams','tGaov','CMYeO','_list','processCursorHomeEndTrigger','process_VisuMZ_ItemsEquipsCore_EquipSlots','categoryNameWindowCenter','commandWindowRectItemsEquipsCore','onTouchOk','drawItemDamageElement','itemPadding','QEwjj','Parse_Notetags_EnableJS','cnRdo','getItemEffectsTpRecoveryLabel','BdJYu','AxlMa','hwBgy','updateChangedSlots','meetsItemConditionsNotetags','Parse_Notetags_Category','Scene_Item_createCategoryWindow','_bypassNewLabel','DetgB','show','JxKZH','_handlers','FLlgG','getItemScopeText','drawItemEquipType','qcSow','dYvyO','udfwr','revertGlobalNamespaceVariables','QioNT','clearNewItem','categoryWindowRectItemsEquipsCore','NrdYQ','removeDebuff','slotWindowRectItemsEquipsCore','xQdvb','prepare','resetFontSettings','drawItemEffects','SetupProxyItemGroups','meetsItemConditions','MBqxJ','addSellCommand','lXWuh','BOavA','setValue','LPGFF','MaxArmors','repeats','MdVLR','KOkXI','Scene_Shop_doBuy','mainFontFace','isSoleArmorType','Game_Item_setObject','getItemQuantityText','createSellWindow','xqXMD','dlkDN','ListWindowCols','width','buttonAssistOffset3','getItemDamageAmountText','isUseParamNamesWithIcons','systemColor','active','QIwRS','buyWindowRectItemsEquipsCore','LabelHitType','KFtlb','mainCommandWidth','numberWindowRectItemsEquipsCore','Ztgwp','selfTP','getItemEffectsAddedStatesBuffsText','?????','center','parse','powerDownColor','MDF','DBtPU','RemoveEquipText','replace','drawActorCharacter','fakYo','CoreEngine','oGtnL','shift','isBattleTest','StatusWindowWidth','onSellCancel','drawNewLabelText','Scene_Equip_onSlotOk','LabelSuccessRate','isShowNew','IconSet','Speed0','scope','SwitchID','hideAdditionalSprites','drawItem','uiInputPosition','QoL','onTouchCancel','Game_Actor_paramPlus','param','blhPc','maxCols','JFQtc','commandBuy','getItemEffectsMpDamageLabel','Game_Actor_forceChangeEquip','LabelRecoverHP','Step3End','_itemData','getDamageStyle','Scene_ItemBase_activateItemWindow','canEquip','RitfU','EpNId','EGtIi','getItemEffectsHpRecoveryLabel','height','PQjGv','convertInitEquipsToItems','iWLFj','releaseUnequippableItems','RemoveEquipIcon','FufWK','isShiftRemoveShortcutEnabled','CmdIconClear','Categories','Scene_Shop_goldWindowRect','categoryNameWindowDrawBackground','actorParams','TP\x20DAMAGE','cursorPageup','FUZWh','Mmcem','onTouchSelect','uOCEK','_equips','colSpacing','categoryStyle','drawItemHitType','zupad','removeStateBuffChanges','buttonAssistRemove','Znjze','YdrPj','itemEnableJS','rOByL','allowCreateStatusWindow','makeDeepCopy','Scene_Shop_onSellOk','clear','Scene_Equip_commandWindowRect','isClicked','left','Game_Party_initialize','LxvBI','AlreadyEquipMarker','oGFSN','ceil','LabelRecoverMP','Window_ItemCategory_setItemWindow','Speed2000','onCategoryCancelItemsEquipsCore','makeItemData','drawItemDarkRect','buttonAssistSmallIncrement','fillRect','Scene_Shop_create','updateCommandNameWindow','mmp','getItemEffectsHpDamageText','prepareNewEquipSlotsOnLoad','clearNewLabelFromItem','armorTypes','zaVYe','paramValueByName','hCSek','Window_ItemList_drawItem','Scene_Shop_commandBuy','buttonAssistText1','Hmyyn','Window_ShopSell_isEnabled','initNewLabelSprites','UztUC','iFNKl','BzAVS','EFFECT_RECOVER_HP','DrawEquipData','Scene_Item_createItemWindow','changeBuff','ChtFR','forceChangeEquipSlots','dnEWg','setHelpWindowItem','drawUpdatedBeforeParamValue','commandStyle','BattleUsable','Scene_Shop_onSellCancel','isArmor','ScopeRandomAllies','statusWidth','RLDlE','_item','imKAJ','drawCurrencyValue','PoBEQ','optimize','BatchShop','elements','9623968RoWQTA','yBXuw','cursorUp','addLoadListener','NonOptimizeETypes','_data','Game_Party_numItems','vzvxg','possession','characterName','LabelSelfGainTP','getItemConsumableText','tpGain','update','JWyLQ','ItemScene','playOkSound','postCreateItemsEquipsCore','refreshActorEquipSlotsIfUpdated','drawActorParamDifference','buttonAssistCategory','hideNewLabelSprites','_itemIDs','getItemEffectsAddedStatesBuffsLabel','categories','MultiplierStandard','vOtku','GnxcK','canUse','ActorChangeEquipSlots','equip2','Window_EquipItem_includes','QFLmO','TzwKP','dbnfl','canConsumeItem','apeev','Game_Actor_discardEquip','Xhtfe','JqlBb','ZTIQo','Window_ShopCommand_initialize','activateItemWindow','DamageType%1','+%1','_customItemInfo','ELEMENT','elementId','OffsetY','nevTk','_calculatingJSParameters','SCOPE','limitedPageUpDownSceneCheck','Parse_Notetags_ParamValues','wrInr','getItemsEquipsCoreBackColor2','playEquip','buyWindowRect','Parse_Notetags_EquipSlots','FadeLimit','baseSellingPrice','CNZwA','setHandler','etypeId','ItemQuantityFontSize','Twibj','ShopScene','sell','process_VisuMZ_ItemsEquipsCore_Notetags','helpAreaTop','_commandNameWindow','addInnerChild','Ngvhn','Scene_Equip_onActorChange','getItemSpeedText','roZck','drawItemEffectsTpDamage','setTopRow','initNewItemsList','getItemEffectsRemovedStatesBuffsText','getItemDamageElementLabel','lFsjt','meetsItemConditionsJS','previousActor','addState','_categoryNameWindow','isRepeated','commandWindowRect','eAsWX','DLNpa','CmdIconBuy','drawItemEffectsSelfTpGain','canShiftRemoveEquipment','Speed1','getItemEffectsTpDamageLabel','ItemsEquipsCore','Scene_Shop_onBuyCancel','bind','EFFECT_ADD_BUFF','dataId','BackRectColor','isHandled','cancel','bXgoJ','yRVKf','Window_ShopStatus_setItem','drawUpdatedAfterParamValue','USER\x20TP\x20GAIN','getItemConsumableLabel','Fbzum','drawNewLabelIcon','QOqRB','isKeyItem','XavJm','mainAreaHeight','cursorRight','makeCommandList','description','Parse_Notetags_Batch','innerWidth','removeState','ScopeRandomEnemies','_newLabelSprites','FieldUsable','FTKxz','ItemMenuStatusBgType','_weaponIDs','caout','equipTypes','iconText','damage','HKTLO','drawItemCustomEntryLine','TgTnW','SpeedNeg2000','getItemSuccessRateText','TjxpN','LabelElement','categoryNameWindowDrawText','maxItems','DEqhp','fill','placeItemNewLabel','drawPossession','auto','emcsO','qVnFX','iconIndex','Step1Start','addOptimizeCommand','tffNE','TP\x20RECOVERY','isOptimizeCommandAdded','CmdCancelRename','getItemRepeatsLabel','buy','number','createNewLabelSprite','_commandWindow','pop','feADZ','length','ParseWeaponNotetags','remove','yKTjf','CannotEquipMarker','setShopStatusWindowMode','GPjUB','isCommandEnabled','toLowerCase','max','setItemWindow','isWeapon','proxyItem','thsGw','return\x200','Scene_Shop_buyWindowRect','processCursorMoveModernControls','addEquipCommand','hideDisabledCommands','postCreateSlotWindowItemsEquipsCore','Scene_Item_create','GajnZ','isBuyCommandEnabled','\x5cI[%1]%2','_bypassProxy','HiddenItemB','TeYOU','0000','_numberWindow','ItemMenuStatusRect','HP\x20DAMAGE','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','vMrQs','match','resetShopSwitches','Scene_Equip_create','ActorResetEquipSlots','EnableLayout','postCreateSellWindowItemsEquipsCore','iLrMK','index','JRoPR','Occasion%1','_slotId','ZAyEQ','hsmoL','updateCategoryNameWindow','IjMJV','otuYF','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','cBFkG','drawItemEffectsMpDamage','MANUAL','Scene_Item_categoryWindowRect','weaponTypes','changeTextColor','itemWindowRectItemsEquipsCore','categoryStyleCheck','getItemsEquipsCoreBackColor1','MenuPortraits','xhYpN','PZmgT','gaugeBackColor','Game_Actor_tradeItemWithParty','VVozE','helpAreaHeight','Window_ShopBuy_item','value','item','LabelApply','drawItemKeyData','drawParamName','doNKs','isBottomHelpMode','powerUpColor','bitmap','isUseItemsEquipsCoreUpdatedLayout','NonRemoveETypes','prepareNextScene','ScopeAlliesButUser','ScopeRandomAny','EFFECT_REMOVE_STATE','occasion','CQLXX','isClearCommandAdded','KeyItems','sellWindowRectItemsEquipsCore','Scene_Shop_statusWindowRect','drawItemNumber','commandEquip','TeVft','getArmorIdWithName','_newLabelOpacityUpperLimit','resetTextColor','LayoutStyle','drawItemEffectsHpDamage','FsnCo','addWindow','Blacklist','textSizeEx','forceChangeEquip','buttonAssistKey1','syXJe','FDLYl','ParseArmorNotetags','drawCustomShopGraphicLoad','gainItem','initEquips','boxWidth','prepareItemCustomData','activate','Ktyoj','_category','isGoodShown','ShowShopStatus','Window_ItemCategory_initialize','text','note','VPQES','isHovered','JSON','getItemDamageAmountLabelOriginal','yYCNI','isEquipCommandEnabled','actor','deactivate','JTcMw','zOKFX','_slotWindow','YUTPY','EUOHq','RegExp','mainAreaTop','maxItemAmount','Scene_Shop_helpWindowRect','effects','getItemDamageAmountLabelBattleCore','goldWindowRect','statusWindowRect','%1-%2','_resetFontSize','drawItemSpeed','buttonAssistKey2','pCOHQ','damageColor','Game_Actor_changeEquip','Scene_Boot_onDatabaseLoaded','bQZam','_tempActorB','Type','drawCustomShopGraphic','_money','StatusWindow','popScene','textWidth','drawRemoveItem','100%','onSlotCancel','NeverUsable','changeEquip','floor','setTempActor','EquipParams','slotWindowRect','iRnvy','doSell','PVhDX','ARRAYSTR','jdjYZ','prepareRefreshItemsEquipsCoreLayout','toUpperCase','drawItemStyleIcon','PLgHW','buttonAssistLargeIncrement','commandNameWindowDrawText','KGROa','setItem','Param','Scene_Shop_prepare','commandBuyItemsEquipsCore','ShiftShortcutKey','postCreateCategoryWindowItemsEquipsCore','getItemEffectsSelfTpGainLabel','wwLCv','nIfUL','VisuMZ_0_CoreEngine','icon','down','isEquipCommandAdded','getItemEffectsRemovedStatesBuffsLabel','EFFECT_ADD_STATE','_shopStatusMenuMode','postCreateItemWindowModernControls','drawItemEffectsMpRecovery','rhABc','visible','create','Nonconsumable','IpreF','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','windowPadding','trim','addCancelCommand','cmYxP','itemHasEquipLimit','loadFaceImages','eiRkG','createCommandNameWindow','tfBGc','xEgbl','top','iYVNV','normalColor','onBuyOk','innerHeight','nbUXn','ARRAYEVAL','shmVj','dPbHY','jFNrO','rateHP','REPEAT','CAiBU','getItemDamageAmountTextBattleCore','XhGiD','geUpdatedLayoutStatusWidth','5178525qfwIiN','UQuzt','isItem','setupItemDamageTempActors','_resetFontColor','drawTextEx','Translucent','getItemEffectsTpRecoveryText','onSellOkItemsEquipsCore','HNnau','getItemSpeedLabel','EquipScene','zlDmm','TGquN','equip','VisuMZ_1_MainMenuCore','itemAt','adjustItemWidthByStatus','doBuy','drawItemEffectsAddedStatesBuffs','Window_ShopBuy_price','WwWXa','getItemHitTypeText','ParseClassNotetags','Window_Selectable_initialize','initialize','defaultItemMax','IbSHY','Window_EquipItem_isEnabled','onMenuImageLoad','tradeItemWithParty','ipUEF','OqKSw','atk','battleMembers','playBuzzerSound','onCategoryCancel','discardEquip','itemWindowRect','bestEquipItem','List','lCFJi','CmdHideDisabled','KqfBj','Ucxyu','equipSlots','OCCASION','KyFeC','rpRqS','isRightInputMode','getItemEffectsMpDamageText','SwitchBuy','hpRate','formula','newLabelEnabled','drawItemQuantity','ogtOB','params','opacity','EFFECT_REMOVE_DEBUFF','%1%','DEF','allowCommandWindowCursorUp','Scene_Shop_categoryWindowRect','version','processCursorMove','addChild','drawItemOccasion','getItemEffectsHpRecoveryText','isOpenAndActive','processTouchModernControls','ADDED\x20EFFECTS','Scene_Shop_commandSell','paintOpacity','PLvZQ','DSvTy','getItemRepeatsText','item-%1','drawText','nonRemovableEtypes','Scene_Equip_statusWindowRect','1674790cNozVy','DGQSw','onBuyCancelItemsEquipsCore','CmdIconOptimize','deselect','cursorPagedown','object','reloadMapIfUpdated','Game_Party_gainItem','FontFace','isClearEquipOk','isClearCommandEnabled','addItemCategory','RxKFV','phCVG','EFqcr','EFFECT_RECOVER_MP','XzABd','cursorDown','qZEFR','parameters','checkShiftRemoveShortcut','onTouchSelectModern','ZxxeT','VisuMZ_1_BattleCore','MaxItems','modifiedBuyPriceItemsEquipsCore','gKBmq','commandStyleCheck','uiHelpPosition','BvaYp','drawing','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','includes','Scene_Shop_createCategoryWindow','SellPriceJS','Scene_Shop_createSellWindow','_scene','BHtoV','sellWindowRect','fontFace','kbqhx','getItemEffects','OrUES','members','sellingPrice','isOptimizeCommandEnabled','constructor','yFPWM','ezQCB','gwnmG','equipSlotIndex','activateSellWindow','log','qGyQJ','isOptimizeEquipOk','getInputButtonString','UujsR','LabelDamageHP','(+%1)','SwitchSell','FUNC','paramValueFontSize','onSellOk','ParseItemNotetags','drawItemEffectsRemovedStatesBuffs','EquipAdjustHpMp','Window_ShopBuy_refresh','getColor','Window_EquipStatus_refresh','Scene_Shop_numberWindowRect','uxghr','OffsetX','mrPjd','Scene_Shop_commandWindowRect','KYCjB','\x5cb%1\x5cb','scrollTo','speed','PrKaq','armor-%1','qvDgL','_bypassReleaseUnequippableItemsItemsEquipsCore','vPEBo','wkIIf','Fyjab','Window_ItemList_colSpacing','IMqhp','getItemDamageElementText','itemTextAlign','Step2End','addStateBuffChanges','isSceneShop','getItemOccasionText','itemLineRect','onTouchSelectModernControls','Window_EquipCommand_initialize','Parse_Notetags_ParamJS','getItemEffectsSelfTpGainText','maxVisibleItems','WCbTe','BuyPriceJS','elLaN','mpRate','mHPXb','determineBaseSellingPrice','onSlotOkAutoSelect','hide','mhp','optKeyItemsNumber','getNextAvailableEtypeId','Scene_Load_reloadMapIfUpdated','qhxwZ','_doubleTouch','NDuvc','pDjUx','setStatusWindow','drawEquipData','_newItemsList','drawParamText','isPlaytest','CIjUm','values','SpeedNeg1999','lhyrQ','placeNewLabel','nonOptimizeEtypes','ATK','versionId','paramPlus','HP\x20RECOVERY','sellPriceRate','kHpKo','getItemHitTypeLabel','setNewItem','value1','UoZtA','registerCommand','isEquipChangeOk','isSoleWeaponType','nextActor','QuhDC','updateHelp','Scene_Shop_onCategoryCancel','statusWindowRectItemsEquipsCore','Actors','TIxHK','qePdD','DbHWe','asNfR','uowIM','createBitmap','Jctuk','_categoryWindow','call','drawItemSuccessRate','WCHcd','WwVUF','getTextColor','HiddenItemA','equips','isCursorMovable','ItemSceneAdjustItemList','setMp','commandNameWindowDrawBackground','move','Speed1000','MP\x20DAMAGE','CmdIconSell','splice','fnmaV','isDualWield','Scene_Equip_onSlotCancel','Scene_Equip_itemWindowRect','QlDMG','DrawParamJS','oonYJ','itypeId','changePaintOpacity','drawItemName','isPageChangeRequested','textColor','_buyWindow','contentsBack','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','lineHeight','1264613vMLbdl','vBdus','commandNameWindowCenter','SetupProxyItemGroup','NUM','getItemSuccessRateLabel','createStatusWindow','flatMP','smallParamFontSize','name','setHp','Scene_Shop_onBuyOk','Step1End','\x5cI[%1]','currentSymbol','XDlFp','LabelRemove','UVZhG','EoSLS','isOpen','categoryWindowRect','hitIndex','drawItemData','paramchangeTextColor','Window_ItemList_item','ykdyu','consumable','getItemIdWithName','(%1)','isUseModernControls','LUK','helpWindowRectItemsEquipsCore','onActorChange','ibjID','xRGjr','NoChangeMarker','shouldCommandWindowExist','jZuky','vpfGD','uiMenuStyle','smoothScrollTo','UbdSv','BorderRegExp','CmdStyle','ParamChangeFontSize','map','Step3Start','JAxiX','split','drawParamsItemsEquipsCore','fontSize','successRate','MaxHP','onSlotOk','setCategory','isDrawItemNumber','iconWidth','refreshItemsEquipsCoreNoMenuImage','gainTP','setBackgroundType','loadPicture','AllArmors','53478YJFort','isMainMenuCoreMenuImageOptionAvailable','7188712uFfyok','cursorLeft','refreshCursor','Parse_Notetags_Prices','buttonAssistText3','IncludeShopItem','right','FontColor','isEquipItem','sellPriceOfItem','LabelConsume','gaugeLineHeight','keyItem','code','_newLabelOpacity','RceCm','gSBTv','_dummyWindow','zXPNe','oolaH','sVlRP','SdvZC','drawItemEffectsTpRecovery','lrHqg','getItemColor','DAMAGE\x20MULTIPLIER','prototype','fbKeY','processShiftRemoveShortcut','AllWeapons','blt','buffIconIndex','indexOf','ypgnU','CONSUMABLE','LZvur','_itemWindow','Fbjrt','getWeaponIdWithName','pKkuX','FVIya','pdswW','isPressed','SellPriceRate','_actor','buttonAssistItemListRequirement','MaxWeapons','CmdTextAlign','isTriggered','brNoz','calcWindowHeight','smoothSelect','iconHeight','helpWindowRect','paCvI','contents','ztKXf','FontSize','Window_Selectable_refresh','itemDataFontSize','forceResetEquipSlots','A%1','Game_BattlerBase_meetsItemConditions','hitType','_statusWindow','getInputMultiButtonStrings','drawItemEffectsHpRecovery','mainFontSize','buttonAssistKey3','isShiftShortcutKeyForRemove','paramJS','processCursorSpecialCheckModernControls','ItemQuantityFmt','ceWAx','EFFECT_ADD_DEBUFF','AllItems','#%1','commandSellItemsEquipsCore','Window_Selectable_setHelpWindowItem','processHandling','_forcedSlots','Window_ItemList_updateHelp','drawIcon','pagedown','QoSVw','SfqOR','PwKaD','CCsGL','removeBuff','commandName','value2'];_0x17ca=function(){return _0x31c686;};return _0x17ca();}function Sprite_NewLabel(){const _0x41f5d0=_0x4222e9;this[_0x41f5d0(0x2a9)](...arguments);}Sprite_NewLabel[_0x4222e9(0x3f5)]=Object[_0x4222e9(0x272)](Sprite[_0x4222e9(0x3f5)]),Sprite_NewLabel[_0x4222e9(0x3f5)][_0x4222e9(0x310)]=Sprite_NewLabel,Sprite_NewLabel[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)]=function(){const _0x81eaa9=_0x4222e9;Sprite[_0x81eaa9(0x3f5)]['initialize']['call'](this),this['createBitmap']();},Sprite_NewLabel[_0x4222e9(0x3f5)][_0x4222e9(0x378)]=function(){const _0x584a09=_0x4222e9,_0x489a8e=ImageManager[_0x584a09(0x3d3)],_0x1edbcc=ImageManager[_0x584a09(0x40f)];this['bitmap']=new Bitmap(_0x489a8e,_0x1edbcc),this[_0x584a09(0x17b)](),this[_0x584a09(0x92)]();},Sprite_NewLabel[_0x4222e9(0x3f5)]['drawNewLabelIcon']=function(){const _0xe858e8=_0x4222e9,_0x55156a=VisuMZ[_0xe858e8(0x16c)][_0xe858e8(0x471)][_0xe858e8(0x485)]['Icon'];if(_0x55156a<=0x0)return;const _0x57bdda=ImageManager['loadSystem'](_0xe858e8(0x96)),_0x59a48b=ImageManager[_0xe858e8(0x3d3)],_0x32bad8=ImageManager['iconHeight'],_0x24c8d3=_0x55156a%0x10*_0x59a48b,_0x4f4ebe=Math[_0xe858e8(0x24e)](_0x55156a/0x10)*_0x32bad8;this[_0xe858e8(0x1f9)][_0xe858e8(0x3f9)](_0x57bdda,_0x24c8d3,_0x4f4ebe,_0x59a48b,_0x32bad8,0x0,0x0);},Sprite_NewLabel[_0x4222e9(0x3f5)][_0x4222e9(0x92)]=function(){const _0x41b9b1=_0x4222e9,_0xfbabbc=VisuMZ[_0x41b9b1(0x16c)][_0x41b9b1(0x471)][_0x41b9b1(0x485)],_0x261c61=_0xfbabbc['Text'];if(_0x261c61==='')return;const _0x17c530=ImageManager['iconWidth'],_0xbac772=ImageManager['iconHeight'];this['bitmap'][_0x41b9b1(0x309)]=_0xfbabbc[_0x41b9b1(0x2ea)]||$gameSystem[_0x41b9b1(0x4fe)](),this['bitmap'][_0x41b9b1(0x396)]=this[_0x41b9b1(0x37f)](),this['bitmap']['fontSize']=_0xfbabbc[_0x41b9b1(0x414)],this[_0x41b9b1(0x1f9)][_0x41b9b1(0x2de)](_0x261c61,0x0,_0xbac772/0x2,_0x17c530,_0xbac772/0x2,_0x41b9b1(0x83));},Sprite_NewLabel[_0x4222e9(0x3f5)][_0x4222e9(0x37f)]=function(){const _0x3a4307=_0x4222e9,_0x3b4fa2=VisuMZ[_0x3a4307(0x16c)][_0x3a4307(0x471)][_0x3a4307(0x485)]['FontColor'];return _0x3b4fa2[_0x3a4307(0x1cf)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x3a4307(0x396)](_0x3b4fa2);},Window_Base[_0x4222e9(0x3f5)][_0x4222e9(0x394)]=function(_0x2691c2,_0x4ec5c4,_0x51c375,_0x728c77){const _0x93e5dd=_0x4222e9;if(_0x2691c2){const _0x262f8c=_0x51c375+(this[_0x93e5dd(0x39a)]()-ImageManager[_0x93e5dd(0x40f)])/0x2,_0x498af1=ImageManager[_0x93e5dd(0x3d3)]+0x4,_0x576786=Math[_0x93e5dd(0x1b7)](0x0,_0x728c77-_0x498af1);this['changeTextColor'](ColorManager[_0x93e5dd(0x3f3)](_0x2691c2)),this[_0x93e5dd(0x42d)](_0x2691c2[_0x93e5dd(0x1a0)],_0x4ec5c4,_0x262f8c),this[_0x93e5dd(0x2de)](_0x2691c2[_0x93e5dd(0x3a4)],_0x4ec5c4+_0x498af1,_0x51c375,_0x576786),this[_0x93e5dd(0x20b)]();}},Window_Base['prototype'][_0x4222e9(0x206)]=function(_0x32fbce,_0x5021dd,_0x5393a5,_0x214ab4){const _0x299a68=_0x4222e9;if(this[_0x299a68(0x3d2)](_0x32fbce)){this[_0x299a68(0x4ef)]();const _0x4207ea=VisuMZ[_0x299a68(0x16c)][_0x299a68(0x471)][_0x299a68(0x11c)],_0xaf98bb=_0x4207ea[_0x299a68(0x423)],_0x52fd72=_0xaf98bb[_0x299a68(0x474)]($gameParty[_0x299a68(0x47a)](_0x32fbce));this[_0x299a68(0x412)][_0x299a68(0x3cd)]=_0x4207ea['ItemQuantityFontSize'],this[_0x299a68(0x2de)](_0x52fd72,_0x5021dd,_0x5393a5,_0x214ab4,_0x299a68(0x3e1)),this['resetFontSettings']();}},Window_Base[_0x4222e9(0x3f5)][_0x4222e9(0x3d2)]=function(_0x31e5df){const _0x1bf1b1=_0x4222e9;if(DataManager[_0x1bf1b1(0x17d)](_0x31e5df))return $dataSystem[_0x1bf1b1(0x34e)];return!![];},Window_Base[_0x4222e9(0x3f5)][_0x4222e9(0xe0)]=function(_0x2608df,_0x73f820,_0x214be4,_0x2cb93f,_0x41fce6){const _0x33cdf3=_0x4222e9;_0x41fce6=Math[_0x33cdf3(0x1b7)](_0x41fce6||0x1,0x1);while(_0x41fce6--){_0x2cb93f=_0x2cb93f||this[_0x33cdf3(0x39a)](),this[_0x33cdf3(0x398)][_0x33cdf3(0x2d9)]=0xa0;const _0x147c92=ColorManager[_0x33cdf3(0x1ec)]();this[_0x33cdf3(0x398)][_0x33cdf3(0xe2)](_0x2608df+0x1,_0x73f820+0x1,_0x214be4-0x2,_0x2cb93f-0x2,_0x147c92),this[_0x33cdf3(0x398)][_0x33cdf3(0x2d9)]=0xff;}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x2a8)]=Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)],Window_Selectable['prototype']['initialize']=function(_0x17608c){const _0x515e71=_0x4222e9;this[_0x515e71(0xf2)](),VisuMZ['ItemsEquipsCore']['Window_Selectable_initialize']['call'](this,_0x17608c);},Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0xf2)]=function(){const _0x40eca1=_0x4222e9;this[_0x40eca1(0x187)]={},this[_0x40eca1(0x3e9)]=0xff,this['_newLabelOpacityChange']=VisuMZ[_0x40eca1(0x16c)][_0x40eca1(0x471)][_0x40eca1(0x485)]['FadeSpeed'],this[_0x40eca1(0x20a)]=VisuMZ[_0x40eca1(0x16c)][_0x40eca1(0x471)][_0x40eca1(0x485)][_0x40eca1(0x148)];},Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x95)]=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x4222e9(0x429)]=Window_Selectable[_0x4222e9(0x3f5)]['setHelpWindowItem'],Window_Selectable['prototype'][_0x4222e9(0xfd)]=function(_0x312f2c){const _0x85aabf=_0x4222e9;VisuMZ[_0x85aabf(0x16c)]['Window_Selectable_setHelpWindowItem']['call'](this,_0x312f2c);if(this['isShowNew']())this['clearNewLabelFromItem'](_0x312f2c);},Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0xe8)]=function(_0x42184e){const _0x90153f=_0x4222e9;if(!_0x42184e)return;$gameParty[_0x90153f(0x4e8)](_0x42184e);let _0x23d74b='';if(DataManager[_0x90153f(0x292)](_0x42184e))_0x23d74b='item-%1'[_0x90153f(0x474)](_0x42184e['id']);else{if(DataManager['isWeapon'](_0x42184e))_0x90153f(0x1b1)===_0x90153f(0x174)?this[_0x90153f(0x3b8)]()?this[_0x90153f(0x2f7)](!![]):_0x1f6883[_0x90153f(0x3f5)][_0x90153f(0xc2)][_0x90153f(0x37b)](this,_0xa83e88):_0x23d74b=_0x90153f(0x44b)[_0x90153f(0x474)](_0x42184e['id']);else{if(DataManager['isArmor'](_0x42184e))_0x23d74b=_0x90153f(0x331)[_0x90153f(0x474)](_0x42184e['id']);else return;}}const _0x4d620e=this['_newLabelSprites'][_0x23d74b];if(_0x4d620e)_0x4d620e['hide']();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x415)]=Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x49d)],Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x49d)]=function(){const _0x285916=_0x4222e9;this['hideNewLabelSprites'](),VisuMZ[_0x285916(0x16c)][_0x285916(0x415)]['call'](this);},Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x122)]=function(){const _0x5cecd8=_0x4222e9;for(const _0x4cdfe7 of Object[_0x5cecd8(0x35b)](this['_newLabelSprites'])){if('hAwPU'!==_0x5cecd8(0x332))_0x4cdfe7[_0x5cecd8(0x34c)]();else return 0x0;}},VisuMZ['ItemsEquipsCore']['Window_Selectable_update']=Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x11a)],Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x11a)]=function(){const _0xb4a1fe=_0x4222e9;this[_0xb4a1fe(0x4c0)](),VisuMZ[_0xb4a1fe(0x16c)]['Window_Selectable_update'][_0xb4a1fe(0x37b)](this);},Window_Selectable['prototype'][_0x4222e9(0x4c0)]=function(){const _0x4b079a=_0x4222e9;if(!this[_0x4b079a(0x95)]())return;const _0x401a84=this[_0x4b079a(0x20a)];this[_0x4b079a(0x3e9)]+=this[_0x4b079a(0x4b5)];(this[_0x4b079a(0x3e9)]>=_0x401a84||this[_0x4b079a(0x3e9)]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x4b079a(0x3e9)]=this['_newLabelOpacity'][_0x4b079a(0x469)](0x0,_0x401a84);for(const _0x2c06f8 of Object['values'](this['_newLabelSprites'])){_0x2c06f8[_0x4b079a(0x2ca)]=this[_0x4b079a(0x3e9)];}},Window_Selectable[_0x4222e9(0x3f5)][_0x4222e9(0x1aa)]=function(_0x505c47){const _0x129352=_0x4222e9,_0x4f4669=this['_newLabelSprites'];if(_0x4f4669[_0x505c47]){if(_0x129352(0x391)!==_0x129352(0x4de))return _0x4f4669[_0x505c47];else{const _0x48bd7f=_0x529597[_0x129352(0x3d3)],_0x438fd0=_0x3ef601[_0x129352(0x40f)];this[_0x129352(0x1f9)]=new _0x1539f4(_0x48bd7f,_0x438fd0),this[_0x129352(0x17b)](),this['drawNewLabelText']();}}else{const _0x123141=new Sprite_NewLabel();return _0x4f4669[_0x505c47]=_0x123141,this[_0x129352(0x154)](_0x123141),_0x123141;}},Window_Selectable[_0x4222e9(0x3f5)]['placeNewLabel']=function(_0x82b17b,_0xef0af3,_0x11b0d5){const _0x12d19e=_0x4222e9;let _0x254e00='';if(DataManager[_0x12d19e(0x292)](_0x82b17b))_0x254e00=_0x12d19e(0x2dd)['format'](_0x82b17b['id']);else{if(DataManager[_0x12d19e(0x1b9)](_0x82b17b))_0x12d19e(0x411)!==_0x12d19e(0x411)?_0x1c041f[_0x12d19e(0x4f7)](_0x221e6c[_0x12d19e(0x2c3)],!![]):_0x254e00=_0x12d19e(0x44b)['format'](_0x82b17b['id']);else{if(DataManager['isArmor'](_0x82b17b))_0x254e00=_0x12d19e(0x331)[_0x12d19e(0x474)](_0x82b17b['id']);else{if(_0x12d19e(0xf4)===_0x12d19e(0x4f5)){_0x4483c7[_0x12d19e(0x3f5)][_0x12d19e(0x46f)]['call'](this);if(this[_0x12d19e(0x153)])this[_0x12d19e(0xe4)]();}else return;}}}const _0xfef50c=this[_0x12d19e(0x1aa)](_0x254e00);_0xfef50c[_0x12d19e(0x386)](_0xef0af3,_0x11b0d5),_0xfef50c['show'](),_0xfef50c[_0x12d19e(0x2ca)]=this[_0x12d19e(0x3e9)];},Window_ItemCategory[_0x4222e9(0x46d)]=VisuMZ[_0x4222e9(0x16c)]['Settings'][_0x4222e9(0xba)][_0x4222e9(0x2b8)],Window_ItemCategory[_0x4222e9(0x48d)]=['HiddenItemA',_0x4222e9(0x1c7),_0x4222e9(0x273),_0x4222e9(0x4a1),'AlwaysUsable',_0x4222e9(0x100),_0x4222e9(0x188),'NeverUsable'],VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x221)]=Window_ItemCategory['prototype']['initialize'],Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)]=function(_0x40bb64){const _0x30221e=_0x4222e9;VisuMZ[_0x30221e(0x16c)][_0x30221e(0x221)][_0x30221e(0x37b)](this,_0x40bb64),this['createCategoryNameWindow'](_0x40bb64);},Window_ItemCategory[_0x4222e9(0x3f5)]['createCategoryNameWindow']=function(_0x1f90a7){const _0x39d75d=_0x4222e9,_0x53dafb=new Rectangle(0x0,0x0,_0x1f90a7[_0x39d75d(0x506)],_0x1f90a7[_0x39d75d(0xb1)]);this[_0x39d75d(0x162)]=new Window_Base(_0x53dafb),this[_0x39d75d(0x162)]['opacity']=0x0,this[_0x39d75d(0x2d2)](this['_categoryNameWindow']),this[_0x39d75d(0x1dc)]();},Window_ItemCategory[_0x4222e9(0x3f5)]['isUseModernControls']=function(){const _0x28cf46=_0x4222e9;return Imported[_0x28cf46(0x267)]&&Window_HorzCommand[_0x28cf46(0x3f5)][_0x28cf46(0x3b8)][_0x28cf46(0x37b)](this);},Window_ItemCategory['prototype'][_0x4222e9(0x4c9)]=function(){},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x11d)]=function(){const _0x277a14=_0x4222e9;if(!this[_0x277a14(0x3b8)]())Window_HorzCommand['prototype'][_0x277a14(0x11d)]['call'](this);},Window_ItemCategory['prototype']['maxCols']=function(){const _0x1d4bec=_0x4222e9;return this['_list']?this[_0x1d4bec(0x198)]():0x4;},Window_ItemCategory['prototype'][_0x4222e9(0x11a)]=function(){const _0xa4f453=_0x4222e9;Window_HorzCommand['prototype']['update'][_0xa4f453(0x37b)](this),this[_0xa4f453(0x3ff)]&&this['_itemWindow'][_0xa4f453(0x3d1)](this[_0xa4f453(0x499)]());},Window_ItemCategory[_0x4222e9(0x3f5)]['processCursorMoveModernControls']=function(){const _0x39b7c4=_0x4222e9;if(this[_0x39b7c4(0x382)]()){if(_0x39b7c4(0x379)===_0x39b7c4(0x224))_0x102880[_0x39b7c4(0x3f5)][_0x39b7c4(0x2c1)]['call'](this);else{const _0x3d7aa2=this['index']();if(this[_0x39b7c4(0x3ff)]&&this[_0x39b7c4(0x3ff)][_0x39b7c4(0xa2)]()<=0x1){if(_0x39b7c4(0x4ab)===_0x39b7c4(0x17e)){if(!this[_0x39b7c4(0x22e)])return![];if(!this[_0x39b7c4(0x22e)][_0x39b7c4(0x50b)])return![];return this['_slotWindow'][_0x39b7c4(0xb8)]();}else Input[_0x39b7c4(0x163)]('right')&&this[_0x39b7c4(0x180)](Input[_0x39b7c4(0x40b)](_0x39b7c4(0x3e1))),Input[_0x39b7c4(0x163)]('left')&&this[_0x39b7c4(0x3dc)](Input[_0x39b7c4(0x40b)]('left'));}else{if(this[_0x39b7c4(0x3ff)]&&this[_0x39b7c4(0x3ff)][_0x39b7c4(0xa2)]()>0x1){if(_0x39b7c4(0x2ee)==='hYiqf'){const _0x115c32=this[_0x39b7c4(0x104)](),_0x29e123=this[_0x39b7c4(0x17f)]()-this[_0x39b7c4(0x1ab)][_0x39b7c4(0xb1)],_0x5f475d=this[_0x39b7c4(0x2c1)]()?0x0:_0x517e79[_0x39b7c4(0x21a)]-_0x115c32,_0x2bfae6=this[_0x39b7c4(0x1ab)]['y']+this[_0x39b7c4(0x1ab)]['height'];return new _0x3e1653(_0x5f475d,_0x2bfae6,_0x115c32,_0x29e123);}else Input[_0x39b7c4(0x163)](_0x39b7c4(0x42e))&&!Input[_0x39b7c4(0x405)](_0x39b7c4(0x8e))&&this[_0x39b7c4(0x180)](Input[_0x39b7c4(0x40b)](_0x39b7c4(0x42e))),Input['isRepeated'](_0x39b7c4(0x47f))&&!Input[_0x39b7c4(0x405)]('shift')&&this[_0x39b7c4(0x3dc)](Input[_0x39b7c4(0x40b)](_0x39b7c4(0x47f)));}}if(this['index']()!==_0x3d7aa2){if(_0x39b7c4(0x349)!==_0x39b7c4(0x349)){if(_0x22184e['isPlaytest']())_0x1c010c['log'](_0x3cef79);}else this['playCursorSound']();}}}},Window_ItemCategory[_0x4222e9(0x3f5)]['processHandling']=function(){const _0x4533b8=_0x4222e9;if(this[_0x4533b8(0x3b8)]())return;Window_HorzCommand[_0x4533b8(0x3f5)][_0x4533b8(0x42a)][_0x4533b8(0x37b)](this);},Window_ItemCategory[_0x4222e9(0x3f5)]['isHoverEnabled']=function(){const _0x25b128=_0x4222e9;return this['isUseModernControls']()?_0x25b128(0x4c6)!==_0x25b128(0x48a)?![]:'%1%'[_0x25b128(0x474)](_0x3321c8['round'](_0x51ed80*0x64)):Window_HorzCommand[_0x25b128(0x3f5)][_0x25b128(0x49a)][_0x25b128(0x37b)](this);},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x2d6)]=function(){const _0xafd491=_0x4222e9;if(this[_0xafd491(0x2d5)]()){TouchInput[_0xafd491(0x40b)]()&&this[_0xafd491(0xc2)](!![]);if(TouchInput[_0xafd491(0xd4)]())this[_0xafd491(0x4cd)]();else TouchInput[_0xafd491(0x46c)]()&&this[_0xafd491(0x9e)]();}},Window_ItemCategory[_0x4222e9(0x3f5)]['onTouchSelect']=function(_0x1ef0d2){const _0x103b3d=_0x4222e9;if(this[_0x103b3d(0x3b8)]()){if('PQjGv'===_0x103b3d(0xb2))this['onTouchSelectModern'](!![]);else return this['isEquipChangeOk'](_0x5d0d0c);}else Window_HorzCommand['prototype'][_0x103b3d(0xc2)][_0x103b3d(0x37b)](this,_0x1ef0d2);},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x2f7)]=function(_0x3cd567){const _0x59cb05=_0x4222e9;this[_0x59cb05(0x352)]=![];if(this[_0x59cb05(0x382)]()){const _0x6421f1=this[_0x59cb05(0x1d6)](),_0x4ef42f=this[_0x59cb05(0x3b0)]();_0x4ef42f>=0x0&&_0x4ef42f!==this[_0x59cb05(0x1d6)]()&&this['select'](_0x4ef42f),_0x3cd567&&this[_0x59cb05(0x1d6)]()!==_0x6421f1&&this['playCursorSound']();}},Window_ItemCategory[_0x4222e9(0x3f5)]['makeCommandList']=function(){const _0x2df20c=_0x4222e9;this[_0x2df20c(0x4b3)](),this[_0x2df20c(0x4ae)](this['index']());},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x4b3)]=function(){const _0x22a5d0=_0x4222e9;for(const _0x46491e of Window_ItemCategory[_0x22a5d0(0x46d)]){this[_0x22a5d0(0x2ed)](_0x46491e);}},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x2ed)]=function(_0x5a005e){const _0x42be1a=_0x4222e9,_0x32b376=_0x5a005e[_0x42be1a(0x243)],_0xf7852a=_0x5a005e[_0x42be1a(0x43c)],_0x21053e=_0x5a005e[_0x42be1a(0x99)]||0x0;if(_0x21053e>0x0&&!$gameSwitches[_0x42be1a(0x1f1)](_0x21053e))return;let _0x57863b='',_0x4e0e35='category',_0x16c77c=_0x32b376;if(_0x32b376[_0x42be1a(0x1cf)](/Category:(.*)/i))_0x42be1a(0x37d)!=='WJjyH'?_0x57863b=String(RegExp['$1'])['trim']():_0x415ba6='weapon-%1'['format'](_0x363fb8['id']);else{if(Window_ItemCategory['categoryItemTypes']['includes'](_0x32b376))_0x57863b=VisuMZ[_0x42be1a(0x16c)][_0x42be1a(0x471)][_0x42be1a(0xba)][_0x32b376];else{if([_0x42be1a(0x426),_0x42be1a(0x4b7)][_0x42be1a(0x302)](_0x32b376)){if(_0x42be1a(0x311)===_0x42be1a(0x2c0))return this[_0x42be1a(0x1fa)]()?this[_0x42be1a(0x440)]():_0x81aaf6[_0x42be1a(0x16c)]['Scene_Shop_goldWindowRect'][_0x42be1a(0x37b)](this);else _0x57863b=TextManager[_0x42be1a(0x1f2)];}else{if(_0x32b376===_0x42be1a(0x203))_0x57863b=TextManager[_0x42be1a(0x3e7)];else{if(_0x32b376===_0x42be1a(0x3f8))_0x57863b=TextManager[_0x42be1a(0x460)];else{if(_0x32b376===_0x42be1a(0x3d8)){if('QoSVw'===_0x42be1a(0x42f))_0x57863b=TextManager['armor'];else return _0x335bcc[_0x42be1a(0x16c)][_0x42be1a(0x471)]['ShopScene'][_0x42be1a(0x40a)];}else{if(_0x32b376[_0x42be1a(0x1cf)](/WTYPE:(\d+)/i))_0x57863b=$dataSystem[_0x42be1a(0x1e4)][Number(RegExp['$1'])]||'';else{if(_0x32b376[_0x42be1a(0x1cf)](/ATYPE:(\d+)/i)){if(_0x42be1a(0x3ac)===_0x42be1a(0x4f8))return _0x41ca97[_0x42be1a(0x16c)][_0x42be1a(0x38e)]['call'](this);else _0x57863b=$dataSystem[_0x42be1a(0xe9)][Number(RegExp['$1'])]||'';}else{if(_0x32b376[_0x42be1a(0x1cf)](/ETYPE:(\d+)/i)){if('FwzaA'!=='KYmTw')_0x57863b=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'';else{const _0x41748f=_0x299f76['makeDeepCopy'](_0x31f5a2);_0x41748f[_0x42be1a(0x475)]=!![];const _0x131f55=_0x41748f[_0x42be1a(0x2bd)]()[_0x42be1a(0x3fb)](this['_item'][_0x42be1a(0x14c)]);if(_0x131f55>=0x0)_0x41748f[_0x42be1a(0x212)](_0x131f55,this[_0x42be1a(0x106)]);let _0x3ad0ef=0x0,_0x1aa7e0=0x0,_0x3e59cf=0x0;_0x2ccef9['VisuMZ_0_CoreEngine']?(_0x3ad0ef=_0x41748f[_0x42be1a(0xeb)](_0x2bfa33),_0x1aa7e0=_0x3ad0ef-_0x261f5b['paramValueByName'](_0x54a029),this['changeTextColor'](_0x492fda[_0x42be1a(0x3b2)](_0x1aa7e0)),_0x3e59cf=(_0x1aa7e0>=0x0?'+':'')+_0x4c01e6['ConvertNumberToString'](_0x1aa7e0,0x0,_0x5bcd6d)):(_0x3ad0ef=_0x41748f['param'](_0x164330),_0x1aa7e0=_0x3ad0ef-_0x14a0bc[_0x42be1a(0xa0)](_0x443820),this['changeTextColor'](_0x42fc44[_0x42be1a(0x3b2)](_0x1aa7e0)),_0x3e59cf=(_0x1aa7e0>=0x0?'+':'')+_0x1aa7e0);if(_0x3e59cf==='+0')_0x3e59cf=_0x37536d[_0x42be1a(0x3be)];this[_0x42be1a(0x2de)](_0x3e59cf,_0x30cb9f,_0x406707,_0x5662ba,_0x42be1a(0x83));}}}}}}}}}}_0xf7852a>0x0&&this[_0x42be1a(0xc6)]()!==_0x42be1a(0x222)&&(_0x57863b='\x5cI[%1]%2'[_0x42be1a(0x474)](_0xf7852a,_0x57863b)),this[_0x42be1a(0x45a)](_0x57863b,_0x4e0e35,!![],_0x16c77c);},Window_ItemCategory[_0x4222e9(0x3f5)]['itemTextAlign']=function(){const _0x42e751=_0x4222e9;return VisuMZ[_0x42e751(0x16c)][_0x42e751(0x471)][_0x42e751(0xba)]['TextAlign'];},Window_ItemCategory[_0x4222e9(0x3f5)]['drawItem']=function(_0xd6f561){const _0x5d8380=_0x4222e9,_0x3ab152=this[_0x5d8380(0x1e7)](_0xd6f561);if(_0x3ab152==='iconText')this['drawItemStyleIconText'](_0xd6f561);else _0x3ab152===_0x5d8380(0x268)?this[_0x5d8380(0x259)](_0xd6f561):Window_HorzCommand['prototype'][_0x5d8380(0x9b)][_0x5d8380(0x37b)](this,_0xd6f561);},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0xc6)]=function(){const _0x29dd9a=_0x4222e9;return VisuMZ['ItemsEquipsCore']['Settings'][_0x29dd9a(0xba)]['Style'];},Window_ItemCategory[_0x4222e9(0x3f5)]['categoryStyleCheck']=function(_0x11afa8){const _0x554bcf=_0x4222e9;if(_0x11afa8<0x0)return _0x554bcf(0x222);const _0x3304a4=this[_0x554bcf(0xc6)]();if(_0x3304a4!==_0x554bcf(0x19d)){if(_0x554bcf(0x504)===_0x554bcf(0x504))return _0x3304a4;else{const _0x51f9aa=this[_0x554bcf(0x34f)](_0x5a7f8f);if(_0x51f9aa<0x0)return;const _0x3528fb=_0x3101bc===0x1?_0xde8a03[_0x44d4a]:_0x1c6b9d[_0x159a35];this['changeEquip'](_0x51f9aa,_0x3528fb);}}else{const _0x3eef9d=this[_0x554bcf(0x434)](_0x11afa8);if(_0x3eef9d[_0x554bcf(0x1cf)](/\\I\[(\d+)\]/i)){const _0x1e1d16=this[_0x554bcf(0x33f)](_0x11afa8),_0x4a14e2=this[_0x554bcf(0x211)](_0x3eef9d)[_0x554bcf(0x506)];if(_0x4a14e2<=_0x1e1d16['width']){if(_0x554bcf(0x404)!==_0x554bcf(0x404)){const _0x1ffb4a=this[_0x554bcf(0x1a7)]();this[_0x554bcf(0x1f4)](_0x1ffb4a,_0x4f554e,_0x192f35,_0x2cdf36,!![]);const _0x180e32=this[_0x554bcf(0x2dc)]();return this[_0x554bcf(0x1f4)](_0x180e32,_0x15111b,_0x4a5804,_0x597f8d,![],_0x554bcf(0x3e1)),this['drawItemDarkRect'](_0x31c414,_0x4ab427,_0x1a2157),this[_0x554bcf(0x4ef)](),!![];}else return _0x554bcf(0x18e);}else return _0x554bcf(0x268);}else{if(_0x554bcf(0x1b4)===_0x554bcf(0x1b4))return _0x554bcf(0x222);else _0x4f471c['_bypassProxy']=!![],_0x337d59['ItemsEquipsCore'][_0x554bcf(0x3a6)][_0x554bcf(0x37b)](this),_0x230c11[_0x554bcf(0x1c6)]=![],this['_item']=this[_0x554bcf(0x397)][_0x554bcf(0x1f2)]();}}},Window_ItemCategory['prototype']['drawItemStyleIconText']=function(_0x1d7efc){const _0x19793f=_0x4222e9,_0x1ac2b5=this[_0x19793f(0x33f)](_0x1d7efc),_0x1d17fe=this[_0x19793f(0x434)](_0x1d7efc),_0x34af40=this[_0x19793f(0x211)](_0x1d17fe)[_0x19793f(0x506)];this[_0x19793f(0x393)](this[_0x19793f(0x1b5)](_0x1d7efc));const _0x156e18=this[_0x19793f(0x33a)]();if(_0x156e18===_0x19793f(0x3e1))this[_0x19793f(0x295)](_0x1d17fe,_0x1ac2b5['x']+_0x1ac2b5['width']-_0x34af40,_0x1ac2b5['y'],_0x34af40);else{if(_0x156e18===_0x19793f(0x83)){const _0x2c7dfe=_0x1ac2b5['x']+Math[_0x19793f(0x24e)]((_0x1ac2b5[_0x19793f(0x506)]-_0x34af40)/0x2);this[_0x19793f(0x295)](_0x1d17fe,_0x2c7dfe,_0x1ac2b5['y'],_0x34af40);}else this[_0x19793f(0x295)](_0x1d17fe,_0x1ac2b5['x'],_0x1ac2b5['y'],_0x34af40);}},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x259)]=function(_0x531a94){const _0x466cee=_0x4222e9,_0x2dce30=this[_0x466cee(0x434)](_0x531a94);if(_0x2dce30[_0x466cee(0x1cf)](/\\I\[(\d+)\]/i)){if(_0x466cee(0x2f8)!==_0x466cee(0x2f8)){_0x4bd432=_0x11afb8;if(!_0x593a76[_0x1ee918])return _0x1c6326;}else{const _0x26abf2=Number(RegExp['$1'])||0x0,_0x12637c=this[_0x466cee(0x33f)](_0x531a94),_0x4e6f44=_0x12637c['x']+Math['floor']((_0x12637c[_0x466cee(0x506)]-ImageManager[_0x466cee(0x3d3)])/0x2),_0x132c14=_0x12637c['y']+(_0x12637c[_0x466cee(0xb1)]-ImageManager[_0x466cee(0x40f)])/0x2;this[_0x466cee(0x42d)](_0x26abf2,_0x4e6f44,_0x132c14);}}},VisuMZ['ItemsEquipsCore'][_0x4222e9(0xdc)]=Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x1b8)],Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x1b8)]=function(_0x430631){const _0x434d83=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x434d83(0xdc)][_0x434d83(0x37b)](this,_0x430631),_0x430631['_categoryWindow']=this;},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x46f)]=function(){const _0x469311=_0x4222e9;Window_HorzCommand[_0x469311(0x3f5)][_0x469311(0x46f)][_0x469311(0x37b)](this);if(this[_0x469311(0x162)])this['updateCategoryNameWindow']();},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x1dc)]=function(){const _0x30aaf7=_0x4222e9,_0x2ebfbe=this[_0x30aaf7(0x162)];_0x2ebfbe[_0x30aaf7(0x412)][_0x30aaf7(0xd2)]();const _0x26a1f2=this[_0x30aaf7(0x1e7)](this[_0x30aaf7(0x1d6)]());if(_0x26a1f2===_0x30aaf7(0x268)){const _0x154ffd=this[_0x30aaf7(0x33f)](this['index']());let _0xe44ead=this[_0x30aaf7(0x434)](this[_0x30aaf7(0x1d6)]());_0xe44ead=_0xe44ead[_0x30aaf7(0x89)](/\\I\[(\d+)\]/gi,''),_0x2ebfbe[_0x30aaf7(0x4ef)](),this[_0x30aaf7(0xbc)](_0xe44ead,_0x154ffd),this[_0x30aaf7(0x197)](_0xe44ead,_0x154ffd),this[_0x30aaf7(0x4cb)](_0xe44ead,_0x154ffd);}},Window_ItemCategory['prototype'][_0x4222e9(0xbc)]=function(_0x5938ce,_0x1b2ab1){},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x197)]=function(_0x19d8fb,_0x2192bb){const _0x3660cd=_0x4222e9,_0x128c2a=this[_0x3660cd(0x162)];_0x128c2a[_0x3660cd(0x2de)](_0x19d8fb,0x0,_0x2192bb['y'],_0x128c2a['innerWidth'],_0x3660cd(0x83));},Window_ItemCategory[_0x4222e9(0x3f5)][_0x4222e9(0x4cb)]=function(_0x519151,_0x2c30ad){const _0x6c8a38=_0x4222e9,_0x4f1c2b=this[_0x6c8a38(0x162)],_0x453585=$gameSystem['windowPadding'](),_0x14b945=_0x2c30ad['x']+Math[_0x6c8a38(0x24e)](_0x2c30ad['width']/0x2)+_0x453585;_0x4f1c2b['x']=_0x4f1c2b[_0x6c8a38(0x506)]/-0x2+_0x14b945,_0x4f1c2b['y']=Math[_0x6c8a38(0x24e)](_0x2c30ad[_0x6c8a38(0xb1)]/0x2);},Window_ItemList['prototype'][_0x4222e9(0x1be)]=function(){const _0x5c3c03=_0x4222e9;if(this[_0x5c3c03(0x382)]()){if(_0x5c3c03(0x328)===_0x5c3c03(0x13e))for(const _0x24446b of _0x548e12[_0x5c3c03(0x18d)]){const _0x132857=_0x435236[_0x5c3c03(0x18d)][_0x5c3c03(0x3fb)](_0x24446b[_0x5c3c03(0x277)]());if(_0x132857>0x0)_0x4a902a['equipSlots'][_0x5c3c03(0x48f)](_0x132857);}else{const _0x3e1cda=this[_0x5c3c03(0x1d6)]();if(this['maxCols']()<=0x1)!this[_0x5c3c03(0x172)]('pagedown')&&Input[_0x5c3c03(0x40b)]('pagedown')&&this[_0x5c3c03(0x2e6)](),!this[_0x5c3c03(0x172)](_0x5c3c03(0x47f))&&Input[_0x5c3c03(0x40b)](_0x5c3c03(0x47f))&&this[_0x5c3c03(0xbf)]();else{if(this[_0x5c3c03(0xa2)]()>0x1){Input[_0x5c3c03(0x163)]('right')&&this[_0x5c3c03(0x180)](Input['isTriggered']('right'));Input[_0x5c3c03(0x163)](_0x5c3c03(0xd5))&&this[_0x5c3c03(0x3dc)](Input[_0x5c3c03(0x40b)](_0x5c3c03(0xd5)));if(this[_0x5c3c03(0x141)]()){if(_0x5c3c03(0x503)!==_0x5c3c03(0x432)){if(Input[_0x5c3c03(0x40b)](_0x5c3c03(0x42e))&&Input[_0x5c3c03(0x405)]('shift')){if('NJMqy'!=='NJMqy')return _0x282558[_0x5c3c03(0x16c)][_0x5c3c03(0x471)]['ShopScene'][_0x5c3c03(0x3c6)];else this[_0x5c3c03(0x2e6)]();}Input[_0x5c3c03(0x40b)](_0x5c3c03(0x47f))&&Input[_0x5c3c03(0x405)](_0x5c3c03(0x8e))&&this[_0x5c3c03(0xbf)]();}else this[_0x5c3c03(0x21e)]!==_0x55c85c&&(this[_0x5c3c03(0x21e)]=_0x4b3c0d,this[_0x5c3c03(0x49d)](),this[_0x5c3c03(0x37a)]&&this[_0x5c3c03(0x37a)][_0x5c3c03(0x3b8)]()?this[_0x5c3c03(0x40e)](0x0):this[_0x5c3c03(0x32e)](0x0,0x0));}else{if(_0x5c3c03(0x49e)==='lRpbU'){Input['isTriggered'](_0x5c3c03(0x42e))&&this[_0x5c3c03(0x2e6)]();if(Input['isTriggered'](_0x5c3c03(0x47f))){if(_0x5c3c03(0x46b)===_0x5c3c03(0x175)){if(_0x699ce2['uiMenuStyle']&&_0x26ca35[_0x5c3c03(0x2fe)]!==_0x3e4035)return _0x4b61b0[_0x5c3c03(0x2fe)];else{if(this[_0x5c3c03(0x1fa)]())return this[_0x5c3c03(0x462)]()[_0x5c3c03(0x1cf)](/LOWER/i);else _0x421a1d[_0x5c3c03(0x3f5)]['isRightInputMode'][_0x5c3c03(0x37b)](this);}}else this[_0x5c3c03(0xbf)]();}}else this['drawItemKeyData'](_0x2c8170,_0x29cb53,_0x1c9948,_0x482eda,!![]),this[_0x5c3c03(0x1f4)](_0x1739f8,_0x4efcb0,_0x28dbbb,_0x1dc899,![],_0x5c3c03(0x3e1)),this[_0x5c3c03(0xe0)](_0x8b12eb,_0x446bf9,_0x5bf5bf),this[_0x5c3c03(0x4ef)]();}}}if(Input[_0x5c3c03(0x163)](_0x5c3c03(0x269))){if(_0x5c3c03(0x289)===_0x5c3c03(0x17c)){const _0x1670cf=this[_0x5c3c03(0x33e)]();return this['drawItemKeyData'](_0x1670cf,_0x10d9d8,_0x2e20ec,_0x1bb05d,![],'center'),this['drawItemDarkRect'](_0x24c10c,_0x45e8c8,_0x278061),this['resetFontSettings'](),!![];}else Input[_0x5c3c03(0x405)](_0x5c3c03(0x8e))&&this[_0x5c3c03(0x437)]()?this[_0x5c3c03(0x2e6)]():_0x5c3c03(0x189)==='DwCSB'?(this[_0x5c3c03(0x1ab)][_0x5c3c03(0x22b)](),this[_0x5c3c03(0x1ab)]['deselect'](),this[_0x5c3c03(0x22e)][_0x5c3c03(0x40e)](0x0),this[_0x5c3c03(0x22e)]['activate']()):this[_0x5c3c03(0x2f3)](Input['isTriggered']('down'));}Input['isRepeated']('up')&&(Input[_0x5c3c03(0x405)](_0x5c3c03(0x8e))&&this[_0x5c3c03(0x437)]()?this[_0x5c3c03(0xbf)]():this['cursorUp'](Input[_0x5c3c03(0x40b)]('up')));if(Imported[_0x5c3c03(0x267)]){if(_0x5c3c03(0x4d5)!==_0x5c3c03(0x8b))this[_0x5c3c03(0x4c9)]();else{if(this[_0x5c3c03(0x478)]())return this[_0x5c3c03(0x461)][_0x5c3c03(0x506)]/0x5/-0x3;return _0x16156e['prototype'][_0x5c3c03(0x507)]['call'](this);}}this[_0x5c3c03(0x1d6)]()!==_0x3e1cda&&this[_0x5c3c03(0x45b)]();}}},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x141)]=function(){const _0x391e7b=_0x4222e9,_0x26ebbe=SceneManager[_0x391e7b(0x306)],_0x47ad03=[Scene_Item,Scene_Shop];return _0x47ad03[_0x391e7b(0x302)](_0x26ebbe[_0x391e7b(0x310)]);},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x21c)]=function(){const _0x5d4de6=_0x4222e9;Window_Selectable[_0x5d4de6(0x3f5)]['activate']['call'](this);if(this['_categoryWindow']&&this['_categoryWindow'][_0x5d4de6(0x3b8)]()){if('YdrPj'!==_0x5d4de6(0xcc)){this[_0x5d4de6(0x434)](_0x3ddfde)[_0x5d4de6(0x1cf)](/\\I\[(\d+)\]/i);const _0x213dd7=_0x4ae8e8(_0x5507cb['$1'])||0x0,_0x4c6312=this['itemLineRect'](_0x1364b5),_0x82cc93=_0x4c6312['x']+_0x15a0ec['floor']((_0x4c6312[_0x5d4de6(0x506)]-_0x32ba54['iconWidth'])/0x2),_0x381298=_0x4c6312['y']+(_0x4c6312[_0x5d4de6(0xb1)]-_0x241e24[_0x5d4de6(0x40f)])/0x2;this[_0x5d4de6(0x42d)](_0x213dd7,_0x82cc93,_0x381298);}else this[_0x5d4de6(0x37a)][_0x5d4de6(0x21c)]();}},Window_ItemList[_0x4222e9(0x3f5)]['deactivate']=function(){const _0x1b1c57=_0x4222e9;Window_Selectable[_0x1b1c57(0x3f5)][_0x1b1c57(0x22b)][_0x1b1c57(0x37b)](this);if(this[_0x1b1c57(0x37a)]&&this[_0x1b1c57(0x37a)][_0x1b1c57(0x3b8)]()){if(_0x1b1c57(0x317)===_0x1b1c57(0x317))this[_0x1b1c57(0x37a)]['deactivate']();else return _0x1b1c57(0x82);}},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x3d1)]=function(_0x17ff9e){const _0xddc4ee=_0x4222e9;if(this[_0xddc4ee(0x21e)]!==_0x17ff9e){if(_0xddc4ee(0x1ce)!=='EuVdF'){this[_0xddc4ee(0x21e)]=_0x17ff9e,this[_0xddc4ee(0x49d)]();if(this[_0xddc4ee(0x37a)]&&this[_0xddc4ee(0x37a)][_0xddc4ee(0x3b8)]()){if(_0xddc4ee(0x3fe)!==_0xddc4ee(0x3fe)){if(_0x1620cd[_0xddc4ee(0x17d)](_0x16e48b))return _0x1c0b40[_0xddc4ee(0x34e)];return!![];}else this[_0xddc4ee(0x40e)](0x0);}else _0xddc4ee(0xf5)!==_0xddc4ee(0xf5)?(_0xf80db0[_0xddc4ee(0x16c)][_0xddc4ee(0x221)][_0xddc4ee(0x37b)](this,_0x3779fb),this['createCategoryNameWindow'](_0x5d4577)):this[_0xddc4ee(0x32e)](0x0,0x0);}else _0x3d5997='foreground';}},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x45e)]=Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0xa2)],Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0xa2)]=function(){const _0x4a7b3c=_0x4222e9;if(SceneManager[_0x4a7b3c(0x306)][_0x4a7b3c(0x310)]===Scene_Battle)return _0x4a7b3c(0x497)!==_0x4a7b3c(0x497)?_0x47d557[_0x4a7b3c(0x16c)]['Settings']['ShopScene']['EnableLayout']:VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x4a7b3c(0x37b)](this);else{if(SceneManager[_0x4a7b3c(0x306)][_0x4a7b3c(0x310)]===Scene_Map){if('qVnFX'===_0x4a7b3c(0x19f))return VisuMZ[_0x4a7b3c(0x16c)]['Window_ItemList_maxCols'][_0x4a7b3c(0x37b)](this);else{this['_doubleTouch']=![];if(this['isCursorMovable']()){const _0x38fe58=this[_0x4a7b3c(0x1d6)](),_0x491a56=this[_0x4a7b3c(0x3b0)]();_0x491a56>=0x0&&_0x491a56!==this['index']()&&this['select'](_0x491a56),_0x358494&&this[_0x4a7b3c(0x1d6)]()!==_0x38fe58&&this[_0x4a7b3c(0x45b)]();}}}else return VisuMZ[_0x4a7b3c(0x16c)]['Settings'][_0x4a7b3c(0x11c)][_0x4a7b3c(0x505)];}},VisuMZ[_0x4222e9(0x16c)]['Window_ItemList_colSpacing']=Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0xc5)],Window_ItemList['prototype'][_0x4222e9(0xc5)]=function(){const _0x180e16=_0x4222e9;return this[_0x180e16(0xa2)]()<=0x1?Window_Selectable[_0x180e16(0x3f5)][_0x180e16(0xc5)]['call'](this):VisuMZ[_0x180e16(0x16c)][_0x180e16(0x337)][_0x180e16(0x37b)](this);},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x302)]=function(_0x369715){const _0x2d5699=_0x4222e9;switch(this[_0x2d5699(0x21e)]){case'AllItems':return DataManager[_0x2d5699(0x292)](_0x369715);case'RegularItems':return DataManager['isItem'](_0x369715)&&_0x369715['itypeId']===0x1;case'KeyItems':return DataManager['isItem'](_0x369715)&&_0x369715[_0x2d5699(0x392)]===0x2;case _0x2d5699(0x380):return DataManager['isItem'](_0x369715)&&_0x369715['itypeId']===0x3;case _0x2d5699(0x1c7):return DataManager[_0x2d5699(0x292)](_0x369715)&&_0x369715[_0x2d5699(0x392)]===0x4;case _0x2d5699(0x4a1):return DataManager[_0x2d5699(0x292)](_0x369715)&&_0x369715['consumable'];case _0x2d5699(0x273):return DataManager['isItem'](_0x369715)&&!_0x369715[_0x2d5699(0x3b5)];case'AlwaysUsable':return DataManager['isItem'](_0x369715)&&[0x0][_0x2d5699(0x302)](_0x369715[_0x2d5699(0x200)]);case _0x2d5699(0x100):return DataManager[_0x2d5699(0x292)](_0x369715)&&[0x0,0x1][_0x2d5699(0x302)](_0x369715['occasion']);case _0x2d5699(0x188):return DataManager['isItem'](_0x369715)&&[0x0,0x2][_0x2d5699(0x302)](_0x369715[_0x2d5699(0x200)]);case _0x2d5699(0x24c):return DataManager['isItem'](_0x369715)&&[0x3]['includes'](_0x369715[_0x2d5699(0x200)]);case _0x2d5699(0x3f8):return DataManager[_0x2d5699(0x1b9)](_0x369715);case _0x2d5699(0x3d8):return DataManager[_0x2d5699(0x102)](_0x369715);default:if(this[_0x2d5699(0x21e)][_0x2d5699(0x1cf)](/WTYPE:(\d+)/i))return DataManager['isWeapon'](_0x369715)&&_0x369715['wtypeId']===Number(RegExp['$1']);else{if(this[_0x2d5699(0x21e)][_0x2d5699(0x1cf)](/WTYPE:(.*)/i)){const _0x954394=$dataSystem[_0x2d5699(0x1e4)][_0x2d5699(0x3fb)](String(RegExp['$1'])['trim']());return DataManager[_0x2d5699(0x1b9)](_0x369715)&&_0x369715[_0x2d5699(0x450)]===_0x954394;}else{if(this[_0x2d5699(0x21e)][_0x2d5699(0x1cf)](/ATYPE:(\d+)/i)){if(_0x2d5699(0x14e)!==_0x2d5699(0x456))return DataManager['isArmor'](_0x369715)&&_0x369715['atypeId']===Number(RegExp['$1']);else{const _0x43c44b=this['commandStyle'](),_0x524065=_0x4058ef['ItemsEquipsCore'][_0x2d5699(0x471)][_0x2d5699(0x14f)][_0x2d5699(0x167)],_0x59b4aa=_0x43c44b==='text'?_0x13d941[_0x2d5699(0x1a8)]:_0x2d5699(0x1c5)[_0x2d5699(0x474)](_0x524065,_0x311206[_0x2d5699(0x1a8)]),_0x4dc0e5=this['isBuyCommandEnabled']();if(this[_0x2d5699(0x1c0)]()&&!_0x4dc0e5)return;this[_0x2d5699(0x45a)](_0x59b4aa,_0x2d5699(0x1a8),_0x4dc0e5);}}else{if(this['_category'][_0x2d5699(0x1cf)](/ATYPE:(.*)/i)){const _0x4b9614=$dataSystem[_0x2d5699(0xe9)]['indexOf'](String(RegExp['$1'])[_0x2d5699(0x277)]());return DataManager[_0x2d5699(0x102)](_0x369715)&&_0x369715[_0x2d5699(0x45d)]===_0x4b9614;}else{if(this[_0x2d5699(0x21e)][_0x2d5699(0x1cf)](/ETYPE:(\d+)/i))return!!_0x369715&&_0x369715[_0x2d5699(0x14c)]===Number(RegExp['$1']);else{if(this[_0x2d5699(0x21e)]['match'](/ETYPE:(.*)/i)){if('SPbZC'===_0x2d5699(0x2c8))_0x1aceb9=_0x5d9208[_0x2d5699(0x446)]((this['innerHeight']-_0x5ceaf1)/0x2);else{const _0x3b6ebf=$dataSystem['equipTypes'][_0x2d5699(0x3fb)](String(RegExp['$1'])[_0x2d5699(0x277)]());return DataManager['isArmor'](_0x369715)&&_0x369715['etypeId']===_0x3b6ebf;}}else{if(this[_0x2d5699(0x21e)][_0x2d5699(0x1cf)](/Category:(.*)/i))return!!_0x369715&&_0x369715[_0x2d5699(0x125)][_0x2d5699(0x302)](String(RegExp['$1'])[_0x2d5699(0x258)]()[_0x2d5699(0x277)]());}}}}}}}return![];},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x95)]=function(){return!![];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xed)]=Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x9b)],Window_ItemList['prototype']['drawItem']=function(_0x468643){const _0x327c77=_0x4222e9;VisuMZ['ItemsEquipsCore'][_0x327c77(0xed)][_0x327c77(0x37b)](this,_0x468643),this[_0x327c77(0x19b)](_0x468643);},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x206)]=function(_0x447f7b,_0x5eac99,_0x10220a,_0x3e603e){const _0x49bc01=_0x4222e9;Window_Selectable[_0x49bc01(0x3f5)][_0x49bc01(0x206)][_0x49bc01(0x37b)](this,_0x447f7b,_0x5eac99,_0x10220a,_0x3e603e);},Window_ItemList[_0x4222e9(0x3f5)]['placeItemNewLabel']=function(_0x43a572){const _0x286502=_0x4222e9,_0xabd76e=this[_0x286502(0x2a0)](_0x43a572);if(!_0xabd76e||!this[_0x286502(0x95)]())return;if(!$gameParty['isNewItem'](_0xabd76e))return;const _0x5f4b58=this[_0x286502(0x33f)](_0x43a572),_0x19023e=_0x5f4b58['x'],_0x504483=_0x5f4b58['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x32dba5=VisuMZ['ItemsEquipsCore'][_0x286502(0x471)][_0x286502(0x485)][_0x286502(0x329)],_0x6cbe11=VisuMZ[_0x286502(0x16c)]['Settings'][_0x286502(0x485)][_0x286502(0x13d)];this[_0x286502(0x35e)](_0xabd76e,_0x19023e+_0x32dba5,_0x504483+_0x6cbe11);},Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x355)]=function(_0x38e551){const _0x4baeb0=_0x4222e9;this['_statusWindow']=_0x38e551,this[_0x4baeb0(0x46f)]();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x42c)]=Window_ItemList[_0x4222e9(0x3f5)][_0x4222e9(0x36f)],Window_ItemList['prototype'][_0x4222e9(0x36f)]=function(){const _0x5c1a42=_0x4222e9;VisuMZ[_0x5c1a42(0x16c)][_0x5c1a42(0x42c)]['call'](this);if(this[_0x5c1a42(0x41b)]&&this[_0x5c1a42(0x41b)]['constructor']===Window_ShopStatus){if(_0x5c1a42(0x468)!==_0x5c1a42(0x4e4))this[_0x5c1a42(0x41b)][_0x5c1a42(0x25e)](this[_0x5c1a42(0x1f2)]());else return this[_0x5c1a42(0x1e6)]();}},Window_BattleItem[_0x4222e9(0x3f5)]['isEnabled']=function(_0x542052){const _0x430226=_0x4222e9;if(BattleManager['actor']()){if(_0x430226(0x18c)!==_0x430226(0x18c))this['cursorPageup']();else return BattleManager[_0x430226(0x22a)]()[_0x430226(0x129)](_0x542052);}else return Window_ItemList[_0x430226(0x3f5)][_0x430226(0x44f)]['call'](this,_0x542052);},Window_EventItem[_0x4222e9(0x3f5)][_0x4222e9(0x95)]=function(){return![];},Window_EquipStatus[_0x4222e9(0x3f5)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x533252=_0x4222e9;return VisuMZ[_0x533252(0x16c)]['Settings']['EquipScene'][_0x533252(0x1d3)];},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x326)]=Window_EquipStatus[_0x4222e9(0x3f5)]['refresh'],Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x49d)]=function(){const _0x1addbf=_0x4222e9;this[_0x1addbf(0x9a)](),this['resetFontSettings']();if(this['_actor'])this['_actor'][_0x1addbf(0x49d)]();if(this[_0x1addbf(0x1fa)]()){if('ZMgzZ'!=='ZMgzZ'){const _0x216321=_0x570eb7(_0x232690['$1'])||0x1;if(_0x5a83d4>=_0x216321)return!![];}else this['prepareRefreshItemsEquipsCoreLayout']();}else VisuMZ['ItemsEquipsCore'][_0x1addbf(0x326)][_0x1addbf(0x37b)](this);},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x257)]=function(){const _0x9d16fa=_0x4222e9;this[_0x9d16fa(0x412)][_0x9d16fa(0xd2)]();if(!this[_0x9d16fa(0x407)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x3394b7=ImageManager[_0x9d16fa(0x3d7)](this[_0x9d16fa(0x407)][_0x9d16fa(0x481)]());_0x3394b7[_0x9d16fa(0x110)](this[_0x9d16fa(0x2ad)][_0x9d16fa(0x16e)](this));}else this[_0x9d16fa(0x3d4)]();},Window_EquipStatus['prototype'][_0x4222e9(0x3da)]=function(){const _0x1c69be=_0x4222e9;return Imported[_0x1c69be(0x29f)]&&this[_0x1c69be(0x407)][_0x1c69be(0x481)]()!==''&&VisuMZ[_0x1c69be(0x16c)]['Settings']['EquipScene'][_0x1c69be(0x1e9)];},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2ad)]=function(){const _0x156e0c=_0x4222e9;VisuMZ[_0x156e0c(0x16c)][_0x156e0c(0x471)]['EquipScene'][_0x156e0c(0x4a0)]['call'](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x3d4)]=function(){const _0xf3086f=_0x4222e9;VisuMZ[_0xf3086f(0x16c)][_0xf3086f(0x471)][_0xf3086f(0x29b)]['DrawFaceJS']['call'](this),this[_0xf3086f(0x3cc)]();},Window_EquipStatus[_0x4222e9(0x3f5)]['drawParamsItemsEquipsCore']=function(){const _0xce022a=_0x4222e9;this[_0xce022a(0x4ef)](),VisuMZ[_0xce022a(0x16c)][_0xce022a(0x471)][_0xce022a(0x29b)][_0xce022a(0x390)][_0xce022a(0x37b)](this);},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x498)]=function(_0x17186c,_0x443f9f,_0x321333,_0x583cf2,_0x427559){const _0x2361ec=_0x4222e9,_0x455c63=ImageManager['loadPicture'](_0x17186c[_0x2361ec(0x481)]()),_0x5ad8a2=this['innerWidth']-_0x455c63[_0x2361ec(0x506)];_0x443f9f+=_0x5ad8a2/0x2;if(_0x5ad8a2<0x0)_0x583cf2-=_0x5ad8a2;Window_StatusBase[_0x2361ec(0x3f5)][_0x2361ec(0x498)][_0x2361ec(0x37b)](this,_0x17186c,_0x443f9f,_0x321333,_0x583cf2,_0x427559);},Window_EquipStatus['prototype'][_0x4222e9(0xbd)]=function(){const _0x46471b=_0x4222e9;if(Imported['VisuMZ_0_CoreEngine']){if('rpSkS'==='rpSkS')return VisuMZ[_0x46471b(0x8c)][_0x46471b(0x471)]['Param'][_0x46471b(0x483)];else this['resetFontSettings'](),this[_0x46471b(0x393)](!![]),this[_0x46471b(0x21b)](),this[_0x46471b(0x3e3)]()?this['drawEquipData']():this[_0x46471b(0x3b1)](),this[_0x46471b(0x244)]();}else return'CIjUm'===_0x46471b(0x35a)?[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7]:this[_0x46471b(0x1fa)]()?this[_0x46471b(0x371)]():_0x230975['ItemsEquipsCore'][_0x46471b(0x471)]['ItemScene'][_0x46471b(0x1cb)]['call'](this);},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x31f)]=function(){const _0x493630=_0x4222e9;return VisuMZ[_0x493630(0x16c)]['Settings'][_0x493630(0x29b)]['ParamValueFontSize'];},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0x509)]=function(){const _0x2df761=_0x4222e9;return Imported[_0x2df761(0x267)]&&VisuMZ[_0x2df761(0x8c)][_0x2df761(0x471)][_0x2df761(0x25f)][_0x2df761(0x479)];},Window_EquipStatus[_0x4222e9(0x3f5)]['drawUpdatedParamName']=function(_0x3c04e2,_0x1d62d7,_0x3efb0d,_0x33a91f){const _0x2784b3=_0x4222e9,_0x4b90bb=this[_0x2784b3(0x4cf)]();if(Imported[_0x2784b3(0x267)])this[_0x2784b3(0x358)](_0x1d62d7+_0x4b90bb,_0x3efb0d,_0x33a91f,_0x3c04e2,![]);else{if(_0x2784b3(0x12f)===_0x2784b3(0x4c7)){const _0x5c2869=_0x59a73f(_0x2ca1bf['$1']);_0x5c2869<_0x36addb?(_0x33b333(_0x2784b3(0x301)[_0x2784b3(0x474)](_0x18694f,_0x5c2869,_0x464fc2)),_0x448e97[_0x2784b3(0x487)]()):_0x2e27d8=_0x46e5a7[_0x2784b3(0x1b7)](_0x5c2869,_0x3e8a07);}else this[_0x2784b3(0x2de)](TextManager['param'](_0x3c04e2),_0x1d62d7+_0x4b90bb,_0x3efb0d,_0x33a91f);}},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0xfe)]=function(_0x5fc92d,_0x61c1d9,_0x46e00f,_0x59ce58){const _0x114030=_0x4222e9,_0x3cc106=this[_0x114030(0x4cf)]();let _0x5d58e3=0x0;Imported[_0x114030(0x267)]?_0x5d58e3=this['_actor'][_0x114030(0xeb)](_0x5fc92d,!![]):_0x5d58e3=this[_0x114030(0x407)][_0x114030(0xa0)](_0x5fc92d);const _0x2a2bdc=_0x5d58e3;this[_0x114030(0x2de)](_0x5d58e3,_0x61c1d9,_0x46e00f,_0x59ce58-_0x3cc106,_0x114030(0x3e1));},Window_EquipStatus['prototype'][_0x4222e9(0x177)]=function(_0x5511da,_0x266eb2,_0x3508e8,_0xe7d503){const _0x2a8ccb=_0x4222e9,_0x279320=this[_0x2a8ccb(0x4cf)]();let _0x3751c=0x0,_0x1eb1ab=0x0,_0x2862c9='';if(this['_tempActor']){Imported[_0x2a8ccb(0x267)]?_0x2a8ccb(0x3ef)===_0x2a8ccb(0x3ef)?(_0x3751c=this['_actor'][_0x2a8ccb(0xeb)](_0x5511da,![]),_0x1eb1ab=this['_tempActor']['paramValueByName'](_0x5511da,![]),_0x2862c9=this[_0x2a8ccb(0x475)]['paramValueByName'](_0x5511da,!![])):this[_0x2a8ccb(0x37a)][_0x2a8ccb(0x4dd)]():(_0x3751c=this['_actor'][_0x2a8ccb(0xa0)](_0x5511da),_0x1eb1ab=this[_0x2a8ccb(0x475)]['param'](_0x5511da),_0x2862c9=this['_tempActor'][_0x2a8ccb(0xa0)](_0x5511da));const _0x4ab1f7=_0x3751c,_0x1782fe=_0x1eb1ab;diffValue=_0x1782fe-_0x4ab1f7,this[_0x2a8ccb(0x1e5)](ColorManager['paramchangeTextColor'](diffValue)),this['drawText'](_0x2862c9,_0x266eb2,_0x3508e8,_0xe7d503-_0x279320,_0x2a8ccb(0x3e1));}},Window_EquipStatus[_0x4222e9(0x3f5)]['drawUpdatedParamValueDiff']=function(_0x15bdea,_0xa663e2,_0x133ab5,_0x1229b0){const _0x304a7c=_0x4222e9,_0x3c7e31=this[_0x304a7c(0x4cf)]();let _0x283e3d=0x0,_0x55758a=0x0,_0x5b39ce=![];if(this[_0x304a7c(0x475)]){if(_0x304a7c(0x133)!==_0x304a7c(0x7f)){Imported['VisuMZ_0_CoreEngine']?(_0x283e3d=this[_0x304a7c(0x407)][_0x304a7c(0xeb)](_0x15bdea,![]),_0x55758a=this[_0x304a7c(0x475)][_0x304a7c(0xeb)](_0x15bdea,![]),_0x5b39ce=String(this[_0x304a7c(0x407)]['paramValueByName'](_0x15bdea,!![]))['match'](/([%％])/i)):(_0x283e3d=this[_0x304a7c(0x407)]['param'](_0x15bdea),_0x55758a=this[_0x304a7c(0x475)][_0x304a7c(0xa0)](_0x15bdea),_0x5b39ce=_0x283e3d%0x1!==0x0||_0x55758a%0x1!==0x0);const _0x15008a=_0x283e3d,_0x6e9bb6=_0x55758a,_0x128570=_0x6e9bb6-_0x15008a;let _0x307aaf=_0x128570;if(_0x5b39ce)_0x307aaf=Math[_0x304a7c(0x446)](_0x128570*0x64)+'%';_0x128570!==0x0&&(this['changeTextColor'](ColorManager[_0x304a7c(0x3b2)](_0x128570)),_0x307aaf=(_0x128570>0x0?_0x304a7c(0x31c):_0x304a7c(0x3b7))[_0x304a7c(0x474)](_0x307aaf),this[_0x304a7c(0x2de)](_0x307aaf,_0xa663e2+_0x3c7e31,_0x133ab5,_0x1229b0,_0x304a7c(0xd5)));}else{if(this[_0x304a7c(0x27a)](_0x46ac9d))return![];if(this[_0x304a7c(0x36c)](_0x49e8b5))return![];if(this[_0x304a7c(0x4ff)](_0x348847))return![];}}},Window_EquipStatus[_0x4222e9(0x3f5)][_0x4222e9(0xe0)]=function(_0xa3ba8,_0x50482b,_0x371a5a,_0x48c748,_0x2c5598){const _0x5d4473=_0x4222e9;if(VisuMZ[_0x5d4473(0x16c)][_0x5d4473(0x471)][_0x5d4473(0x29b)][_0x5d4473(0x48c)]===![])return;_0x2c5598=Math[_0x5d4473(0x1b7)](_0x2c5598||0x1,0x1);while(_0x2c5598--){if(_0x5d4473(0x473)==='sBTbo'){_0x48c748=_0x48c748||this['lineHeight'](),this[_0x5d4473(0x412)][_0x5d4473(0x2d9)]=0xa0;const _0x3f394a=ColorManager['getItemsEquipsCoreBackColor2']();this['contents']['fillRect'](_0xa3ba8+0x1,_0x50482b+0x1,_0x371a5a-0x2,_0x48c748-0x2,_0x3f394a),this[_0x5d4473(0x412)][_0x5d4473(0x2d9)]=0xff;}else{this[_0x5d4473(0x9a)](),this[_0x5d4473(0x4ef)]();if(this[_0x5d4473(0x407)])this[_0x5d4473(0x407)][_0x5d4473(0x49d)]();this[_0x5d4473(0x1fa)]()?this[_0x5d4473(0x257)]():_0x3720ef[_0x5d4473(0x16c)]['Window_EquipStatus_refresh'][_0x5d4473(0x37b)](this);}}},ColorManager[_0x4222e9(0x144)]=function(){const _0x3ca5c0=_0x4222e9,_0x21ad82=VisuMZ[_0x3ca5c0(0x16c)][_0x3ca5c0(0x471)][_0x3ca5c0(0x29b)];let _0x1d76dc=_0x21ad82[_0x3ca5c0(0x171)]!==undefined?_0x21ad82[_0x3ca5c0(0x171)]:0x13;return ColorManager[_0x3ca5c0(0x325)](_0x1d76dc);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x341)]=Window_EquipCommand['prototype'][_0x4222e9(0x2a9)],Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)]=function(_0xccd7a5){const _0xda3ad5=_0x4222e9;VisuMZ['ItemsEquipsCore']['Window_EquipCommand_initialize'][_0xda3ad5(0x37b)](this,_0xccd7a5),this['createCommandNameWindow'](_0xccd7a5);},Window_EquipCommand['prototype']['createCommandNameWindow']=function(_0x6a3e0c){const _0x4f8aa4=_0x4222e9,_0x2f6465=new Rectangle(0x0,0x0,_0x6a3e0c[_0x4f8aa4(0x506)],_0x6a3e0c[_0x4f8aa4(0xb1)]);this[_0x4f8aa4(0x153)]=new Window_Base(_0x2f6465),this['_commandNameWindow']['opacity']=0x0,this[_0x4f8aa4(0x2d2)](this[_0x4f8aa4(0x153)]),this[_0x4f8aa4(0xe4)]();},Window_EquipCommand['prototype'][_0x4222e9(0x46f)]=function(){const _0x722ba6=_0x4222e9;Window_HorzCommand[_0x722ba6(0x3f5)][_0x722ba6(0x46f)][_0x722ba6(0x37b)](this);if(this[_0x722ba6(0x153)])this[_0x722ba6(0xe4)]();},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0xe4)]=function(){const _0x39e487=_0x4222e9,_0x31953c=this[_0x39e487(0x153)];_0x31953c[_0x39e487(0x412)]['clear']();const _0x1c80f7=this[_0x39e487(0x2fd)](this[_0x39e487(0x1d6)]());if(_0x1c80f7===_0x39e487(0x268)){if('MwdKi'==='MwdKi'){const _0x3f9d19=this[_0x39e487(0x33f)](this['index']());let _0x5d91b8=this[_0x39e487(0x434)](this[_0x39e487(0x1d6)]());_0x5d91b8=_0x5d91b8[_0x39e487(0x89)](/\\I\[(\d+)\]/gi,''),_0x31953c[_0x39e487(0x4ef)](),this[_0x39e487(0x385)](_0x5d91b8,_0x3f9d19),this[_0x39e487(0x25c)](_0x5d91b8,_0x3f9d19),this[_0x39e487(0x39d)](_0x5d91b8,_0x3f9d19);}else this[_0x39e487(0x245)]=_0x3e4dc8[_0x39e487(0x306)][_0x39e487(0x464)]();}},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x385)]=function(_0x3658a4,_0x41b3b8){},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x25c)]=function(_0x5d8c37,_0x4a1ac0){const _0x104d29=_0x4222e9,_0x228582=this['_commandNameWindow'];_0x228582[_0x104d29(0x2de)](_0x5d8c37,0x0,_0x4a1ac0['y'],_0x228582[_0x104d29(0x184)],_0x104d29(0x83));},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x39d)]=function(_0x4dff58,_0x5b8f17){const _0x52b9d1=_0x4222e9,_0x13ca89=this[_0x52b9d1(0x153)],_0x3383e6=$gameSystem[_0x52b9d1(0x276)](),_0x4fb462=_0x5b8f17['x']+Math[_0x52b9d1(0x24e)](_0x5b8f17['width']/0x2)+_0x3383e6;_0x13ca89['x']=_0x13ca89['width']/-0x2+_0x4fb462,_0x13ca89['y']=Math[_0x52b9d1(0x24e)](_0x5b8f17['height']/0x2);},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x3b8)]=function(){const _0x2a2929=_0x4222e9;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x2a2929(0x3f5)][_0x2a2929(0x3b8)][_0x2a2929(0x37b)](this);},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x11d)]=function(){const _0x5559ec=_0x4222e9;if(this[_0x5559ec(0x3a9)]()===_0x5559ec(0x29e))Window_HorzCommand['prototype'][_0x5559ec(0x11d)][_0x5559ec(0x37b)](this);},Window_EquipCommand[_0x4222e9(0x3f5)]['processCursorMoveModernControls']=function(){const _0x4116c8=_0x4222e9;if(!this[_0x4116c8(0x422)]()){if(_0x4116c8(0x3b4)!==_0x4116c8(0x3b4)){const _0x387308=this[_0x4116c8(0x2fd)](_0x3d2eab);if(_0x387308===_0x4116c8(0x18e))this['drawItemStyleIconText'](_0x23bb16);else _0x387308===_0x4116c8(0x268)?this['drawItemStyleIcon'](_0x4a3a6f):_0xe5a0eb['prototype'][_0x4116c8(0x9b)]['call'](this,_0x490570);}else Window_HorzCommand[_0x4116c8(0x3f5)]['processCursorMoveModernControls']['call'](this);}},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x422)]=function(){const _0x226b59=_0x4222e9;if(!this[_0x226b59(0x382)]())return![];if(SceneManager['_scene'][_0x226b59(0x310)]!==Scene_Equip)return![];return Input['isTriggered'](_0x226b59(0x269))&&(_0x226b59(0xcb)==='Znjze'?(this[_0x226b59(0x45b)](),SceneManager['_scene']['commandEquip'](),SceneManager[_0x226b59(0x306)][_0x226b59(0x22e)]['smoothSelect'](-0x1)):this[_0x226b59(0x207)]()),![];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0xa2)]=function(){const _0x198c3e=_0x4222e9;return this[_0x198c3e(0x4c8)]?this[_0x198c3e(0x4c8)]['length']:0x3;},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2d6)]=function(){const _0xfe3e52=_0x4222e9;if(this['isOpen']()&&this[_0xfe3e52(0x271)]&&SceneManager[_0xfe3e52(0x306)]['constructor']===Scene_Equip){if(this[_0xfe3e52(0x49a)]()&&TouchInput['isHovered']())_0xfe3e52(0x2ef)===_0xfe3e52(0x2ef)?this['onTouchSelectModernControls'](![]):this[_0xfe3e52(0x2ed)](_0x5c74e9);else{if(TouchInput[_0xfe3e52(0x40b)]()){if(_0xfe3e52(0x208)===_0xfe3e52(0xce)){_0x57feb7[_0xfe3e52(0x16c)][_0xfe3e52(0x471)][_0xfe3e52(0x246)][_0xfe3e52(0xf7)][_0xfe3e52(0x37b)](this);return;}else this[_0xfe3e52(0x340)](!![]);}}TouchInput[_0xfe3e52(0xd4)]()&&this[_0xfe3e52(0x4cd)]();}},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x340)]=function(_0x55e166){const _0x405298=_0x4222e9;this[_0x405298(0x352)]=![];const _0x4ad63a=this[_0x405298(0x1d6)](),_0xba6e4a=this[_0x405298(0x3b0)](),_0x40f846=SceneManager[_0x405298(0x306)][_0x405298(0x22e)];if(_0x40f846[_0x405298(0x3ae)]()&&_0x40f846[_0x405298(0x271)]){if(_0xba6e4a>=0x0){if(_0xba6e4a===this[_0x405298(0x1d6)]()){if('XxPFO'===_0x405298(0x400)){const _0x229637=this[_0x405298(0x33f)](_0x2fc49d),_0x4b1f48=this[_0x405298(0x434)](_0x3444c2),_0x3b73b9=this[_0x405298(0x211)](_0x4b1f48)[_0x405298(0x506)];this[_0x405298(0x393)](this['isCommandEnabled'](_0x48f14c));const _0x4cc0cb=this[_0x405298(0x33a)]();if(_0x4cc0cb===_0x405298(0x3e1))this[_0x405298(0x295)](_0x4b1f48,_0x229637['x']+_0x229637[_0x405298(0x506)]-_0x3b73b9,_0x229637['y'],_0x3b73b9);else{if(_0x4cc0cb==='center'){const _0x52ba9d=_0x229637['x']+_0x45645c['floor']((_0x229637[_0x405298(0x506)]-_0x3b73b9)/0x2);this[_0x405298(0x295)](_0x4b1f48,_0x52ba9d,_0x229637['y'],_0x3b73b9);}else this[_0x405298(0x295)](_0x4b1f48,_0x229637['x'],_0x229637['y'],_0x3b73b9);}}else this[_0x405298(0x352)]=!![];}this[_0x405298(0x21c)](),this[_0x405298(0x4ae)](_0xba6e4a);}else _0x40f846['hitIndex']()>=0x0&&(this[_0x405298(0x22b)](),this[_0x405298(0x2e5)]());}_0x55e166&&this[_0x405298(0x1d6)]()!==_0x4ad63a&&this[_0x405298(0x45b)]();},Window_EquipCommand[_0x4222e9(0x3f5)]['makeCommandList']=function(){const _0x481b8f=_0x4222e9;this[_0x481b8f(0x1bf)](),this[_0x481b8f(0x1a2)](),this['addClearCommand']();},Window_EquipCommand['prototype'][_0x4222e9(0x49d)]=function(){const _0x55d096=_0x4222e9;Window_HorzCommand[_0x55d096(0x3f5)]['refresh'][_0x55d096(0x37b)](this),this['refreshCursor']();},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x1bf)]=function(){const _0x111624=_0x4222e9;if(!this[_0x111624(0x26a)]())return;const _0x4c48f1=this[_0x111624(0xff)](),_0x54b95d=VisuMZ[_0x111624(0x16c)][_0x111624(0x471)][_0x111624(0x29b)]['CmdIconEquip'],_0x257037=_0x4c48f1===_0x111624(0x222)?TextManager[_0x111624(0x12b)]:_0x111624(0x1c5)['format'](_0x54b95d,TextManager[_0x111624(0x12b)]),_0x15a024=this[_0x111624(0x229)]();this['addCommand'](_0x257037,_0x111624(0x29e),_0x15a024);},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x26a)]=function(){const _0x46c7ee=_0x4222e9;return!this[_0x46c7ee(0x3b8)]();},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x229)]=function(){return!![];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x1a2)]=function(){const _0x3aeb5d=_0x4222e9;if(!this['isOptimizeCommandAdded']())return;const _0x33275d=this[_0x3aeb5d(0xff)](),_0x112479=VisuMZ['ItemsEquipsCore']['Settings'][_0x3aeb5d(0x29b)][_0x3aeb5d(0x2e4)],_0x2099fd=_0x33275d===_0x3aeb5d(0x222)?TextManager[_0x3aeb5d(0x10a)]:_0x3aeb5d(0x1c5)['format'](_0x112479,TextManager[_0x3aeb5d(0x10a)]),_0x1d0909=this[_0x3aeb5d(0x30f)]();this[_0x3aeb5d(0x45a)](_0x2099fd,_0x3aeb5d(0x10a),_0x1d0909);},Window_EquipCommand['prototype'][_0x4222e9(0x1a5)]=function(){const _0x4960cc=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x4960cc(0x471)][_0x4960cc(0x29b)][_0x4960cc(0x4bb)];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x30f)]=function(){return!![];},Window_EquipCommand[_0x4222e9(0x3f5)]['addClearCommand']=function(){const _0x517dbd=_0x4222e9;if(!this['isClearCommandAdded']())return;const _0x220459=this['commandStyle'](),_0x2cebf3=VisuMZ['ItemsEquipsCore'][_0x517dbd(0x471)]['EquipScene'][_0x517dbd(0xb9)],_0x299d42=_0x220459===_0x517dbd(0x222)?TextManager[_0x517dbd(0xd2)]:'\x5cI[%1]%2'['format'](_0x2cebf3,TextManager[_0x517dbd(0xd2)]),_0x453e7e=this['isClearCommandEnabled']();this[_0x517dbd(0x45a)](_0x299d42,_0x517dbd(0xd2),_0x453e7e);},Window_EquipCommand['prototype'][_0x4222e9(0x202)]=function(){const _0x5b0fa5=_0x4222e9;return VisuMZ[_0x5b0fa5(0x16c)][_0x5b0fa5(0x471)][_0x5b0fa5(0x29b)][_0x5b0fa5(0x4a7)];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2ec)]=function(){return!![];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x33a)]=function(){const _0x5973d9=_0x4222e9;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x5973d9(0x40a)];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x9b)]=function(_0x40298f){const _0xda0ab7=_0x4222e9,_0x3cc0ac=this['commandStyleCheck'](_0x40298f);if(_0x3cc0ac==='iconText'){if(_0xda0ab7(0x1da)!==_0xda0ab7(0x1da))return this['categoryWindowRectItemsEquipsCore']();else this[_0xda0ab7(0x43b)](_0x40298f);}else{if(_0x3cc0ac==='icon'){if(_0xda0ab7(0x299)===_0xda0ab7(0x299))this[_0xda0ab7(0x259)](_0x40298f);else return _0x1dad4a[_0xda0ab7(0x16c)][_0xda0ab7(0x471)]['StatusWindow'][_0xda0ab7(0x1f3)];}else _0xda0ab7(0x27f)!==_0xda0ab7(0x27f)?this[_0xda0ab7(0x257)]():Window_HorzCommand['prototype'][_0xda0ab7(0x9b)][_0xda0ab7(0x37b)](this,_0x40298f);}},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0xff)]=function(){const _0x5604f1=_0x4222e9;return VisuMZ[_0x5604f1(0x16c)][_0x5604f1(0x471)][_0x5604f1(0x29b)][_0x5604f1(0x3c6)];},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2fd)]=function(_0x3d95eb){const _0x48a1fe=_0x4222e9;if(_0x3d95eb<0x0)return _0x48a1fe(0x222);const _0x2c6088=this[_0x48a1fe(0xff)]();if(_0x2c6088!==_0x48a1fe(0x19d))return _0x2c6088;else{if(this['maxItems']()>0x0){const _0x2927bd=this[_0x48a1fe(0x434)](_0x3d95eb);if(_0x2927bd['match'](/\\I\[(\d+)\]/i)){if(_0x48a1fe(0x29d)==='yvkES'){_0x3285de+=_0x48a1fe(0x3a8)[_0x48a1fe(0x474)](_0x11c324),_0x22b970++;if(_0xaf5736>=_0x312b45)return _0x1d1699;}else{const _0x4ffdf1=this['itemLineRect'](_0x3d95eb),_0x29e60d=this[_0x48a1fe(0x211)](_0x2927bd)[_0x48a1fe(0x506)];if(_0x29e60d<=_0x4ffdf1[_0x48a1fe(0x506)])return _0x48a1fe(0x18e);else{if(_0x48a1fe(0x274)==='CiLwl'){const _0x515816=this[_0x48a1fe(0x37a)]['y']+this[_0x48a1fe(0x37a)][_0x48a1fe(0xb1)],_0x413740=_0x32624f['boxWidth']-this['statusWidth'](),_0x5b6243=this[_0x48a1fe(0x17f)]()-this['_categoryWindow'][_0x48a1fe(0xb1)],_0x41c616=this[_0x48a1fe(0x2c1)]()?_0x5025de['boxWidth']-_0x413740:0x0;return new _0x4762ab(_0x41c616,_0x515816,_0x413740,_0x5b6243);}else return _0x48a1fe(0x268);}}}}}return _0x48a1fe(0x222);},Window_EquipCommand[_0x4222e9(0x3f5)][_0x4222e9(0x43b)]=function(_0xf03a0d){const _0x2342b5=_0x4222e9,_0x975a16=this[_0x2342b5(0x33f)](_0xf03a0d),_0x4a7744=this[_0x2342b5(0x434)](_0xf03a0d),_0x5d842e=this['textSizeEx'](_0x4a7744)['width'];this[_0x2342b5(0x393)](this[_0x2342b5(0x1b5)](_0xf03a0d));const _0x3097ba=this['itemTextAlign']();if(_0x3097ba===_0x2342b5(0x3e1)){if(_0x2342b5(0x413)==='ztKXf')this[_0x2342b5(0x295)](_0x4a7744,_0x975a16['x']+_0x975a16[_0x2342b5(0x506)]-_0x5d842e,_0x975a16['y'],_0x5d842e);else{const _0x590647=_0x5552e5(_0x2dea2a['$1'])['split'](/[\r\n]+/);for(const _0x59a3a9 of _0x590647){const _0x29956f=_0x1b315d[_0x2342b5(0x18d)][_0x2342b5(0x3fb)](_0x59a3a9[_0x2342b5(0x277)]());if(_0x29956f>0x0)_0x4d5c9a[_0x2342b5(0x2bd)][_0x2342b5(0x48f)](_0x29956f);}}}else{if(_0x3097ba==='center'){const _0x4255fd=_0x975a16['x']+Math[_0x2342b5(0x24e)]((_0x975a16[_0x2342b5(0x506)]-_0x5d842e)/0x2);this[_0x2342b5(0x295)](_0x4a7744,_0x4255fd,_0x975a16['y'],_0x5d842e);}else _0x2342b5(0x2bf)==='YtdLW'?!this[_0x2342b5(0x422)]()&&_0x42df32['prototype'][_0x2342b5(0x1be)][_0x2342b5(0x37b)](this):this[_0x2342b5(0x295)](_0x4a7744,_0x975a16['x'],_0x975a16['y'],_0x5d842e);}},Window_EquipCommand['prototype'][_0x4222e9(0x259)]=function(_0x27bec1){const _0x41bcf5=_0x4222e9;this[_0x41bcf5(0x434)](_0x27bec1)[_0x41bcf5(0x1cf)](/\\I\[(\d+)\]/i);const _0x2878fb=Number(RegExp['$1'])||0x0,_0x587bff=this[_0x41bcf5(0x33f)](_0x27bec1),_0x22b989=_0x587bff['x']+Math[_0x41bcf5(0x24e)]((_0x587bff[_0x41bcf5(0x506)]-ImageManager['iconWidth'])/0x2),_0x41e332=_0x587bff['y']+(_0x587bff[_0x41bcf5(0xb1)]-ImageManager[_0x41bcf5(0x40f)])/0x2;this['drawIcon'](_0x2878fb,_0x22b989,_0x41e332);},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x3b8)]=function(){const _0x498753=_0x4222e9;return Imported[_0x498753(0x267)]&&Window_HorzCommand[_0x498753(0x3f5)][_0x498753(0x3b8)][_0x498753(0x37b)](this);},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x21c)]=function(){const _0x73e75a=_0x4222e9;Window_StatusBase[_0x73e75a(0x3f5)]['activate']['call'](this),this['callUpdateHelp']();},Window_EquipSlot['prototype'][_0x4222e9(0x2d1)]=function(){const _0x3b80ff=_0x4222e9;Window_StatusBase['prototype'][_0x3b80ff(0x2d1)]['call'](this),this[_0x3b80ff(0x2f6)]();},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x2f6)]=function(){const _0x9edd99=_0x4222e9;if(!this[_0x9edd99(0xb8)]())return;if(Input[_0x9edd99(0x40b)](_0x9edd99(0x8e))&&this['item']()){const _0x24f3f2=SceneManager[_0x9edd99(0x306)]['_actor'];if(_0x24f3f2){if(this[_0x9edd99(0x169)](this[_0x9edd99(0x1d6)]())){if(_0x9edd99(0x252)!==_0x9edd99(0x1f6))this[_0x9edd99(0x3f7)](),this[_0x9edd99(0x36f)]();else return _0x5b6905[_0x5b2c9a];}else this[_0x9edd99(0x2b3)]();}}},Window_EquipSlot['prototype'][_0x4222e9(0x169)]=function(_0x186c6f){const _0x1db605=_0x4222e9,_0x285eff=SceneManager[_0x1db605(0x306)][_0x1db605(0x407)];if(!_0x285eff)return;if(!_0x285eff[_0x1db605(0x36b)](this[_0x1db605(0x1d6)]()))return _0x1db605(0x4b0)!==_0x1db605(0x4b0)?_0x3160bb[_0x1db605(0x16c)][_0x1db605(0xd3)][_0x1db605(0x37b)](this):![];const _0x4b5d51=_0x285eff[_0x1db605(0x2bd)]()[this[_0x1db605(0x1d6)]()];if(_0x285eff[_0x1db605(0x2df)]()['includes'](_0x4b5d51))return![];return!![];;},Window_EquipSlot['prototype'][_0x4222e9(0x3f7)]=function(){const _0x2f9370=_0x4222e9;SoundManager[_0x2f9370(0x145)]();const _0x568127=SceneManager[_0x2f9370(0x306)][_0x2f9370(0x407)];_0x568127[_0x2f9370(0x24d)](this[_0x2f9370(0x1d6)](),null),this[_0x2f9370(0x49d)](),this[_0x2f9370(0x3ff)][_0x2f9370(0x49d)](),this[_0x2f9370(0x46f)]();const _0x14abc7=SceneManager[_0x2f9370(0x306)][_0x2f9370(0x41b)];if(_0x14abc7)_0x14abc7[_0x2f9370(0x49d)]();},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0xb8)]=function(){const _0x2654ff=_0x4222e9;if(!this[_0x2654ff(0x50b)])return![];if(!VisuMZ[_0x2654ff(0x16c)]['Settings'][_0x2654ff(0x29b)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x1be)]=function(){const _0x52d72e=_0x4222e9;!this[_0x52d72e(0x422)]()&&Window_StatusBase[_0x52d72e(0x3f5)][_0x52d72e(0x1be)][_0x52d72e(0x37b)](this);},Window_EquipSlot[_0x4222e9(0x3f5)]['processCursorSpecialCheckModernControls']=function(){const _0x335940=_0x4222e9;if(!this[_0x335940(0x382)]())return![];if(SceneManager[_0x335940(0x306)][_0x335940(0x310)]!==Scene_Equip)return![];if(this[_0x335940(0x2ce)]())return this['playCursorSound'](),Input[_0x335940(0xd2)](),SceneManager[_0x335940(0x306)]['onSlotCancel'](),![];else{if(Input[_0x335940(0x163)](_0x335940(0x269))){const _0x4c60b2=this[_0x335940(0x1d6)]();Input[_0x335940(0x405)](_0x335940(0x8e))?this[_0x335940(0x2e6)]():this[_0x335940(0x2f3)](Input[_0x335940(0x40b)](_0x335940(0x269)));if(this[_0x335940(0x1d6)]()!==_0x4c60b2){if('jFRdN'!==_0x335940(0x4dc))this[_0x335940(0x45b)]();else{const _0xdcbc3=this[_0x335940(0x1ab)]['y']+this[_0x335940(0x1ab)][_0x335940(0xb1)],_0x1674cf=_0x4d2172[_0x335940(0x21a)]-this[_0x335940(0x104)](),_0x2b6e6e=this[_0x335940(0x2c1)]()?_0x29374b[_0x335940(0x21a)]-_0x1674cf:0x0,_0x4b35c3=this[_0x335940(0x17f)]()-this[_0x335940(0x1ab)][_0x335940(0xb1)];return new _0x2ae97e(_0x2b6e6e,_0xdcbc3,_0x1674cf,_0x4b35c3);}}return!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x335940(0x40b)](_0x335940(0x8e)))return _0x335940(0x4f3)===_0x335940(0x4e7)?_0x1a4c77[_0x335940(0x16c)][_0x335940(0x45e)]['call'](this):!![];}}return![];},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x2ce)]=function(){const _0x397539=_0x4222e9;if(this[_0x397539(0x1d6)]()!==0x0)return![];const _0x54dcc8=VisuMZ[_0x397539(0x16c)][_0x397539(0x471)][_0x397539(0x29b)];if(!_0x54dcc8['CommandAddOptimize']&&!_0x54dcc8[_0x397539(0x4a7)])return![];return Input[_0x397539(0x40b)]('up');},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x420)]=function(){const _0x2c16a4=_0x4222e9;return VisuMZ['ItemsEquipsCore']['Settings'][_0x2c16a4(0x29b)][_0x2c16a4(0x262)];},Window_EquipSlot['prototype'][_0x4222e9(0x2d6)]=function(){const _0x755e6=_0x4222e9;if(this['isOpen']()&&this[_0x755e6(0x271)]&&SceneManager[_0x755e6(0x306)][_0x755e6(0x310)]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x755e6(0x225)]())this[_0x755e6(0x340)](![]);else{if(TouchInput[_0x755e6(0x40b)]()){if(_0x755e6(0x3f0)!==_0x755e6(0x3f0)){const _0x2d847c=new _0x12f191();return _0x27c482[_0x1c362b]=_0x2d847c,this['addInnerChild'](_0x2d847c),_0x2d847c;}else this['onTouchSelectModernControls'](!![]);}}if(TouchInput[_0x755e6(0xd4)]())this[_0x755e6(0x4cd)]();else TouchInput[_0x755e6(0x46c)]()&&this[_0x755e6(0x9e)]();}},Window_EquipSlot['prototype'][_0x4222e9(0x340)]=function(_0x375ddd){const _0x416da3=_0x4222e9;this[_0x416da3(0x352)]=![];const _0x41545f=this[_0x416da3(0x1d6)](),_0x23b6cb=this[_0x416da3(0x3b0)](),_0x1a80c2=SceneManager[_0x416da3(0x306)][_0x416da3(0x1ab)];if(_0x1a80c2[_0x416da3(0x3ae)]()&&_0x1a80c2[_0x416da3(0x271)]){if(_0x23b6cb>=0x0)_0x23b6cb===this[_0x416da3(0x1d6)]()&&(this['_doubleTouch']=!![]),this[_0x416da3(0x21c)](),this['select'](_0x23b6cb);else _0x1a80c2[_0x416da3(0x3b0)]()>=0x0&&(this['deactivate'](),this[_0x416da3(0x2e5)]());}_0x375ddd&&this['index']()!==_0x41545f&&this[_0x416da3(0x45b)]();},Window_EquipSlot[_0x4222e9(0x3f5)][_0x4222e9(0x314)]=function(){const _0x2638a6=_0x4222e9;return this[_0x2638a6(0x1d6)]();},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x12c)]=Window_EquipItem[_0x4222e9(0x3f5)][_0x4222e9(0x302)],Window_EquipItem['prototype'][_0x4222e9(0x302)]=function(_0x49545a){const _0x2593d4=_0x4222e9;return _0x49545a===null&&this[_0x2593d4(0x2df)]()[_0x2593d4(0x302)](this[_0x2593d4(0x14c)]())?![]:VisuMZ[_0x2593d4(0x16c)][_0x2593d4(0x12c)]['call'](this,_0x49545a);},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0x2ac)]=Window_EquipItem['prototype'][_0x4222e9(0x44f)],Window_EquipItem['prototype'][_0x4222e9(0x44f)]=function(_0x5cbac1){const _0x4cf82e=_0x4222e9;if(_0x5cbac1&&this[_0x4cf82e(0x407)]){if(this[_0x4cf82e(0x27a)](_0x5cbac1))return![];if(this[_0x4cf82e(0x36c)](_0x5cbac1))return![];if(this[_0x4cf82e(0x4ff)](_0x5cbac1))return![];}if(!_0x5cbac1)return!this[_0x4cf82e(0x2df)]()[_0x4cf82e(0x302)](this[_0x4cf82e(0x14c)]());return VisuMZ[_0x4cf82e(0x16c)]['Window_EquipItem_isEnabled'][_0x4cf82e(0x37b)](this,_0x5cbac1);},Window_EquipItem[_0x4222e9(0x3f5)][_0x4222e9(0x27a)]=function(_0x3d8124){const _0x3de963=_0x4222e9,_0x48dd3c=_0x3d8124['note'];if(_0x48dd3c['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if('NOtYi'===_0x3de963(0x12d))_0x59d22c[_0x3de963(0x316)](_0x3de963(0x444)[_0x3de963(0x474)](this[_0x3de963(0x106)]['name'])),_0xd22734[_0x3de963(0x316)](_0x5bb51b);else{const _0x54d089=Number(RegExp['$1'])||0x1;let _0x4a3e7b=0x0;const _0x5c7d9c=this[_0x3de963(0x407)][_0x3de963(0x381)](),_0x3515be=SceneManager['_scene']['_slotWindow'][_0x3de963(0x314)]();_0x5c7d9c[_0x3515be]=null;for(const _0x536520 of _0x5c7d9c){if(!_0x536520)continue;if(DataManager[_0x3de963(0x1b9)](_0x3d8124)===DataManager['isWeapon'](_0x536520)){if(_0x3d8124['id']===_0x536520['id'])_0x4a3e7b+=0x1;}}return _0x4a3e7b>=_0x54d089;}}else return![];},Window_EquipItem['prototype'][_0x4222e9(0x36c)]=function(_0x15a108){const _0x5210b3=_0x4222e9;if(!DataManager['isWeapon'](_0x15a108))return![];const _0x26c589=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x5b26a0=0x0;const _0x1b27a7=this['_actor']['equips'](),_0x2bff1b=SceneManager['_scene']['_slotWindow'][_0x5210b3(0x314)]();_0x1b27a7[_0x2bff1b]=null;for(const _0x2eaeeb of _0x1b27a7){if(_0x5210b3(0xae)!==_0x5210b3(0x1bb)){if(!_0x2eaeeb)continue;if(!DataManager[_0x5210b3(0x1b9)](_0x2eaeeb))continue;if(_0x15a108['wtypeId']===_0x2eaeeb[_0x5210b3(0x450)]){_0x5b26a0+=0x1;if(_0x15a108[_0x5210b3(0x223)][_0x5210b3(0x1cf)](_0x26c589)){if(_0x5210b3(0x166)===_0x5210b3(0x1d7)){const _0x17cbe3=_0x5210b3(0x178);if(this[_0x5210b3(0xa9)][_0x5210b3(0x80)]===0x0&&!this['_customItemInfo'][_0x17cbe3])return![];const _0x268578=this[_0x5210b3(0x264)]();this[_0x5210b3(0x1f4)](_0x268578,_0x38ccd4,_0x3fcef5,_0x374674,!![]);const _0x407cab=this['getItemEffectsSelfTpGainText']();return this[_0x5210b3(0xa9)][_0x5210b3(0x80)]>0x0?this[_0x5210b3(0x1e5)](_0x13e6db[_0x5210b3(0x1f8)]()):this[_0x5210b3(0x1e5)](_0x21613d[_0x5210b3(0x85)]()),this[_0x5210b3(0x1f4)](_0x407cab,_0xa4786e,_0x81275c,_0x16cd9d,![],'right'),this['drawItemDarkRect'](_0x2d2b91,_0x3ede67,_0xc76249),this['resetFontSettings'](),!![];}else{const _0x47eb0a=Number(RegExp['$1'])||0x1;if(_0x5b26a0>=_0x47eb0a)return!![];}}if(_0x2eaeeb[_0x5210b3(0x223)][_0x5210b3(0x1cf)](_0x26c589)){if('RGtKT'!==_0x5210b3(0x436))return![];else{const _0x13a7f0=Number(RegExp['$1'])||0x1;if(_0x5b26a0>=_0x13a7f0)return!![];}}}}else return this['normalColor']();}return![];},Window_EquipItem[_0x4222e9(0x3f5)][_0x4222e9(0x4ff)]=function(_0x40e868){const _0x5c544d=_0x4222e9;if(!DataManager[_0x5c544d(0x102)](_0x40e868))return![];const _0x10b57f=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x1d624e=0x0;const _0x18303b=this[_0x5c544d(0x407)][_0x5c544d(0x381)](),_0x2a2201=SceneManager[_0x5c544d(0x306)][_0x5c544d(0x22e)][_0x5c544d(0x314)]();_0x18303b[_0x2a2201]=null;for(const _0x3b6237 of _0x18303b){if(!_0x3b6237)continue;if(!DataManager[_0x5c544d(0x102)](_0x3b6237))continue;if(_0x40e868[_0x5c544d(0x45d)]===_0x3b6237[_0x5c544d(0x45d)]){_0x1d624e+=0x1;if(_0x40e868[_0x5c544d(0x223)][_0x5c544d(0x1cf)](_0x10b57f)){const _0x22aae0=Number(RegExp['$1'])||0x1;if(_0x1d624e>=_0x22aae0)return!![];}if(_0x3b6237[_0x5c544d(0x223)]['match'](_0x10b57f)){if(_0x5c544d(0x7c)===_0x5c544d(0x7c)){const _0x5d5e1d=Number(RegExp['$1'])||0x1;if(_0x1d624e>=_0x5d5e1d)return!![];}else return _0x3d54fe[_0x5c544d(0x16c)][_0x5c544d(0x471)]['ItemScene'][_0x5c544d(0x2fa)];}}}return![];},Window_EquipItem[_0x4222e9(0x3f5)][_0x4222e9(0x2df)]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene']['NonRemoveETypes'];},Window_EquipItem['prototype'][_0x4222e9(0x9b)]=function(_0x6ec9fb){const _0x1e9e73=_0x4222e9,_0x1c995b=this[_0x1e9e73(0x2a0)](_0x6ec9fb);_0x1c995b?Window_ItemList['prototype']['drawItem']['call'](this,_0x6ec9fb):this[_0x1e9e73(0x249)](_0x6ec9fb);},Window_EquipItem[_0x4222e9(0x3f5)][_0x4222e9(0x249)]=function(_0x565009){const _0x3d91a7=_0x4222e9;this[_0x3d91a7(0x393)](this['isEnabled'](null));const _0x392f90=VisuMZ[_0x3d91a7(0x16c)][_0x3d91a7(0x471)][_0x3d91a7(0x29b)],_0x671f72=this['itemLineRect'](_0x565009),_0x3dc2b0=_0x671f72['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x4ba632=ImageManager[_0x3d91a7(0x3d3)]+0x4,_0x55acc5=Math[_0x3d91a7(0x1b7)](0x0,_0x671f72[_0x3d91a7(0x506)]-_0x4ba632);this[_0x3d91a7(0x20b)](),this['drawIcon'](_0x392f90[_0x3d91a7(0xb6)],_0x671f72['x'],_0x3dc2b0),this[_0x3d91a7(0x2de)](_0x392f90[_0x3d91a7(0x88)],_0x671f72['x']+_0x4ba632,_0x671f72['y'],_0x55acc5),this[_0x3d91a7(0x393)](!![]);},Window_EquipItem['prototype'][_0x4222e9(0x36f)]=function(){const _0x528265=_0x4222e9;Window_ItemList[_0x528265(0x3f5)][_0x528265(0x36f)]['call'](this);if(this['_actor']&&this['_statusWindow']&&this[_0x528265(0x1d9)]>=0x0){const _0x12359d=JsonEx[_0x528265(0xd0)](this[_0x528265(0x407)]);_0x12359d[_0x528265(0x475)]=!![],_0x12359d[_0x528265(0x212)](this['_slotId'],this[_0x528265(0x1f2)]()),this[_0x528265(0x41b)][_0x528265(0x24f)](_0x12359d);}},VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize']=Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)],Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x2a9)]=function(_0x22f902){const _0x5df78e=_0x4222e9;VisuMZ[_0x5df78e(0x16c)][_0x5df78e(0x136)][_0x5df78e(0x37b)](this,_0x22f902),this[_0x5df78e(0x27d)](_0x22f902);},Window_ShopCommand['prototype'][_0x4222e9(0x27d)]=function(_0x34cc6a){const _0xa84f28=_0x4222e9,_0xdf67b3=new Rectangle(0x0,0x0,_0x34cc6a[_0xa84f28(0x506)],_0x34cc6a[_0xa84f28(0xb1)]);this['_commandNameWindow']=new Window_Base(_0xdf67b3),this[_0xa84f28(0x153)][_0xa84f28(0x2ca)]=0x0,this['addChild'](this[_0xa84f28(0x153)]),this[_0xa84f28(0xe4)]();},Window_ShopCommand['prototype'][_0x4222e9(0x46f)]=function(){const _0x5999ab=_0x4222e9;Window_HorzCommand['prototype'][_0x5999ab(0x46f)]['call'](this);if(this['_commandNameWindow'])this[_0x5999ab(0xe4)]();},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0xe4)]=function(){const _0x441ceb=_0x4222e9,_0x2c9677=this['_commandNameWindow'];_0x2c9677['contents']['clear']();const _0x2cae81=this[_0x441ceb(0x2fd)](this[_0x441ceb(0x1d6)]());if(_0x2cae81===_0x441ceb(0x268)){const _0x321ba4=this[_0x441ceb(0x33f)](this[_0x441ceb(0x1d6)]());let _0x50eb24=this['commandName'](this[_0x441ceb(0x1d6)]());_0x50eb24=_0x50eb24[_0x441ceb(0x89)](/\\I\[(\d+)\]/gi,''),_0x2c9677[_0x441ceb(0x4ef)](),this[_0x441ceb(0x385)](_0x50eb24,_0x321ba4),this['commandNameWindowDrawText'](_0x50eb24,_0x321ba4),this[_0x441ceb(0x39d)](_0x50eb24,_0x321ba4);}},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x385)]=function(_0x1cb058,_0x3f6a44){},Window_ShopCommand['prototype'][_0x4222e9(0x25c)]=function(_0x1eb300,_0x4101e4){const _0x581c80=_0x4222e9,_0x5e8dac=this['_commandNameWindow'];_0x5e8dac[_0x581c80(0x2de)](_0x1eb300,0x0,_0x4101e4['y'],_0x5e8dac[_0x581c80(0x184)],_0x581c80(0x83));},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x39d)]=function(_0x365da4,_0x41dc6c){const _0x27ee87=_0x4222e9,_0x397ab6=this[_0x27ee87(0x153)],_0x2ec81d=$gameSystem[_0x27ee87(0x276)](),_0x346e40=_0x41dc6c['x']+Math['floor'](_0x41dc6c[_0x27ee87(0x506)]/0x2)+_0x2ec81d;_0x397ab6['x']=_0x397ab6['width']/-0x2+_0x346e40,_0x397ab6['y']=Math[_0x27ee87(0x24e)](_0x41dc6c[_0x27ee87(0xb1)]/0x2);},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0xa2)]=function(){const _0x6af930=_0x4222e9;return this['_list']?this['_list'][_0x6af930(0x1ae)]:0x3;},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x1c0)]=function(){const _0x419fcd=_0x4222e9;return VisuMZ[_0x419fcd(0x16c)][_0x419fcd(0x471)][_0x419fcd(0x14f)][_0x419fcd(0x2ba)];},Window_ShopCommand['prototype'][_0x4222e9(0x181)]=function(){const _0x4ca8f4=_0x4222e9;this['addBuyCommand'](),this[_0x4ca8f4(0x4f4)](),this[_0x4ca8f4(0x278)]();},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x49d)]=function(){const _0x2762d1=_0x4222e9;Window_HorzCommand['prototype'][_0x2762d1(0x49d)][_0x2762d1(0x37b)](this),this[_0x2762d1(0x3dd)]();},Window_ShopCommand[_0x4222e9(0x3f5)]['addBuyCommand']=function(){const _0x48bf15=_0x4222e9,_0x12c263=this[_0x48bf15(0xff)](),_0x5d0305=VisuMZ[_0x48bf15(0x16c)][_0x48bf15(0x471)][_0x48bf15(0x14f)]['CmdIconBuy'],_0x58722e=_0x12c263===_0x48bf15(0x222)?TextManager[_0x48bf15(0x1a8)]:'\x5cI[%1]%2'[_0x48bf15(0x474)](_0x5d0305,TextManager[_0x48bf15(0x1a8)]),_0x550e09=this['isBuyCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x550e09)return;this[_0x48bf15(0x45a)](_0x58722e,_0x48bf15(0x1a8),_0x550e09);},Window_ShopCommand['prototype'][_0x4222e9(0x1c4)]=function(){const _0x4a7479=_0x4222e9;if(SceneManager[_0x4a7479(0x306)][_0x4a7479(0x310)]===Scene_Shop)return SceneManager[_0x4a7479(0x306)][_0x4a7479(0x489)]>0x0;else{if(_0x4a7479(0x365)!=='kHpKo'){_0x727d95[_0x4a7479(0x40b)]()&&this[_0x4a7479(0xc2)](!![]);if(_0x4e86d5[_0x4a7479(0xd4)]())this[_0x4a7479(0x4cd)]();else _0x530f3a['isCancelled']()&&this['onTouchCancel']();}else return!![];}},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x4f4)]=function(){const _0x2545b7=_0x4222e9,_0x2d33af=this[_0x2545b7(0xff)](),_0x5ec2bc=VisuMZ[_0x2545b7(0x16c)]['Settings'][_0x2545b7(0x14f)][_0x2545b7(0x389)],_0x2deb4d=_0x2d33af===_0x2545b7(0x222)?TextManager[_0x2545b7(0x150)]:_0x2545b7(0x1c5)[_0x2545b7(0x474)](_0x5ec2bc,TextManager[_0x2545b7(0x150)]),_0xdb29d4=this['isSellCommandEnabled']();if(this[_0x2545b7(0x1c0)]()&&!_0xdb29d4)return;this[_0x2545b7(0x45a)](_0x2deb4d,_0x2545b7(0x150),_0xdb29d4);},Window_ShopCommand[_0x4222e9(0x3f5)]['isSellCommandEnabled']=function(){return!this['_purchaseOnly'];},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x278)]=function(){const _0x588268=_0x4222e9,_0x4b5731=this[_0x588268(0xff)](),_0x1e1092=VisuMZ['ItemsEquipsCore'][_0x588268(0x471)][_0x588268(0x14f)]['CmdIconCancel'],_0x40310c=VisuMZ[_0x588268(0x16c)][_0x588268(0x471)][_0x588268(0x14f)][_0x588268(0x1a6)],_0x2e9c32=_0x4b5731===_0x588268(0x222)?_0x40310c:_0x588268(0x1c5)['format'](_0x1e1092,_0x40310c);this[_0x588268(0x45a)](_0x2e9c32,_0x588268(0x173));},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0x33a)]=function(){const _0xda3a3a=_0x4222e9;return VisuMZ[_0xda3a3a(0x16c)][_0xda3a3a(0x471)][_0xda3a3a(0x14f)][_0xda3a3a(0x40a)];},Window_ShopCommand[_0x4222e9(0x3f5)]['drawItem']=function(_0xf7d1ce){const _0xbb2bf=_0x4222e9,_0x3c21b6=this[_0xbb2bf(0x2fd)](_0xf7d1ce);if(_0x3c21b6===_0xbb2bf(0x18e))this[_0xbb2bf(0x43b)](_0xf7d1ce);else{if(_0x3c21b6===_0xbb2bf(0x268)){if(_0xbb2bf(0x4b1)!==_0xbb2bf(0x4b1)){const _0x2a3505='HP\x20RECOVERY';if(this['_itemData'][_0xbb2bf(0x28a)]<=0x0&&this[_0xbb2bf(0xa9)][_0xbb2bf(0x47c)]<=0x0&&!this[_0xbb2bf(0x13a)][_0x2a3505])return![];const _0x1527f1=this[_0xbb2bf(0xb0)]();this[_0xbb2bf(0x1f4)](_0x1527f1,_0x9f6415,_0x303320,_0x83193,!![]);const _0x3eb576=this[_0xbb2bf(0x2d4)]();return this[_0xbb2bf(0x1e5)](_0x1f8b95[_0xbb2bf(0x23e)](0x1)),this['drawItemKeyData'](_0x3eb576,_0x41a6b0,_0x14bc75,_0xb1ba28,![],_0xbb2bf(0x3e1)),this[_0xbb2bf(0xe0)](_0xf5b1af,_0x597cde,_0x1b7d74),this['resetFontSettings'](),!![];}else this[_0xbb2bf(0x259)](_0xf7d1ce);}else _0xbb2bf(0x3ca)!==_0xbb2bf(0x3ca)?this[_0xbb2bf(0x2f3)](_0x2118d6[_0xbb2bf(0x40b)](_0xbb2bf(0x269))):Window_HorzCommand[_0xbb2bf(0x3f5)][_0xbb2bf(0x9b)][_0xbb2bf(0x37b)](this,_0xf7d1ce);}},Window_ShopCommand[_0x4222e9(0x3f5)][_0x4222e9(0xff)]=function(){const _0x33c2ca=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x33c2ca(0x471)][_0x33c2ca(0x14f)]['CmdStyle'];},Window_ShopCommand[_0x4222e9(0x3f5)]['commandStyleCheck']=function(_0x1ae5d0){const _0x3beb66=_0x4222e9;if(_0x1ae5d0<0x0)return _0x3beb66(0x222);const _0xdd84dd=this['commandStyle']();if(_0xdd84dd!==_0x3beb66(0x19d)){if(_0x3beb66(0x22f)!=='nNlvS')return _0xdd84dd;else{const _0x37b7e0=this[_0x3beb66(0x33f)](_0x447519),_0x4042f4=this['textSizeEx'](_0x1336ac)['width'];return _0x4042f4<=_0x37b7e0[_0x3beb66(0x506)]?_0x3beb66(0x18e):'icon';}}else{if(this[_0x3beb66(0x198)]()>0x0){if('XomEf'!=='nZNWF'){const _0xc2e490=this[_0x3beb66(0x434)](_0x1ae5d0);if(_0xc2e490[_0x3beb66(0x1cf)](/\\I\[(\d+)\]/i)){if('ipUEF'!==_0x3beb66(0x2af))return _0x2cdf3d['isArmor'](_0x527381)&&_0x56cd19['atypeId']===_0x7765da(_0x268568['$1']);else{const _0x109010=this[_0x3beb66(0x33f)](_0x1ae5d0),_0xf15caf=this[_0x3beb66(0x211)](_0xc2e490)['width'];return _0xf15caf<=_0x109010[_0x3beb66(0x506)]?_0x3beb66(0x18e):_0x3beb66(0x268);}}}else{if(!_0x4661c6[_0x3beb66(0x1f1)](_0x475827))return![];}}}return _0x3beb66(0x222);},Window_ShopCommand['prototype'][_0x4222e9(0x43b)]=function(_0x1b6426){const _0x274133=_0x4222e9,_0x3e9603=this[_0x274133(0x33f)](_0x1b6426),_0x558f4b=this[_0x274133(0x434)](_0x1b6426),_0x485cbb=this[_0x274133(0x211)](_0x558f4b)['width'];this[_0x274133(0x393)](this[_0x274133(0x1b5)](_0x1b6426));const _0x4c687a=this[_0x274133(0x33a)]();if(_0x4c687a===_0x274133(0x3e1))this[_0x274133(0x295)](_0x558f4b,_0x3e9603['x']+_0x3e9603['width']-_0x485cbb,_0x3e9603['y'],_0x485cbb);else{if(_0x4c687a===_0x274133(0x83)){if('zXPNe'!==_0x274133(0x3ed))this[_0x274133(0x10f)](_0x3a6416[_0x274133(0x40b)]('up'));else{const _0x2ed7bb=_0x3e9603['x']+Math[_0x274133(0x24e)]((_0x3e9603[_0x274133(0x506)]-_0x485cbb)/0x2);this[_0x274133(0x295)](_0x558f4b,_0x2ed7bb,_0x3e9603['y'],_0x485cbb);}}else this[_0x274133(0x295)](_0x558f4b,_0x3e9603['x'],_0x3e9603['y'],_0x485cbb);}},Window_ShopCommand['prototype'][_0x4222e9(0x259)]=function(_0x42cd22){const _0x482d7f=_0x4222e9;this[_0x482d7f(0x434)](_0x42cd22)['match'](/\\I\[(\d+)\]/i);const _0xb6fbc2=Number(RegExp['$1'])||0x0,_0x97e90e=this[_0x482d7f(0x33f)](_0x42cd22),_0x55ca89=_0x97e90e['x']+Math[_0x482d7f(0x24e)]((_0x97e90e['width']-ImageManager[_0x482d7f(0x3d3)])/0x2),_0x3e0b00=_0x97e90e['y']+(_0x97e90e[_0x482d7f(0xb1)]-ImageManager[_0x482d7f(0x40f)])/0x2;this['drawIcon'](_0xb6fbc2,_0x55ca89,_0x3e0b00);},VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh']=Window_ShopBuy[_0x4222e9(0x3f5)][_0x4222e9(0x49d)],Window_ShopBuy[_0x4222e9(0x3f5)][_0x4222e9(0x49d)]=function(){const _0x5dbb39=_0x4222e9;this['updateMoneyAmount'](),VisuMZ['ItemsEquipsCore'][_0x5dbb39(0x324)][_0x5dbb39(0x37b)](this);},Window_ShopBuy['prototype']['updateMoneyAmount']=function(){const _0x4e6028=_0x4222e9;SceneManager[_0x4e6028(0x306)][_0x4e6028(0x310)]===Scene_Shop&&('ZTIQo'===_0x4e6028(0x135)?this[_0x4e6028(0x245)]=SceneManager[_0x4e6028(0x306)][_0x4e6028(0x464)]():this[_0x4e6028(0x3a1)]());},VisuMZ[_0x4222e9(0x16c)]['Window_ShopBuy_price']=Window_ShopBuy['prototype']['price'],Window_ShopBuy[_0x4222e9(0x3f5)]['price']=function(_0x19eecc){const _0x1f95c2=_0x4222e9;if(!_0x19eecc)return 0x0;let _0x186e5c=VisuMZ[_0x1f95c2(0x16c)][_0x1f95c2(0x2a4)][_0x1f95c2(0x37b)](this,_0x19eecc);return Math[_0x1f95c2(0x1b7)](0x0,this['modifiedBuyPriceItemsEquipsCore'](_0x19eecc,_0x186e5c));},Window_ShopBuy['prototype'][_0x4222e9(0x2fb)]=function(_0x450716,_0x3507a6){const _0x3c4c7b=_0x4222e9,_0x51435b=_0x450716[_0x3c4c7b(0x223)];if(_0x51435b['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if(_0x3c4c7b(0x4e5)===_0x3c4c7b(0x4e5)){const _0x12632d=String(RegExp['$1']);try{eval(_0x12632d);}catch(_0x367eb5){if($gameTemp[_0x3c4c7b(0x359)]())console['log'](_0x367eb5);}}else{if(this[_0x3c4c7b(0x1ca)]&&this[_0x3c4c7b(0x1ca)][_0x3c4c7b(0x50b)])return _0x4a0cca[_0x3c4c7b(0x41c)]('up',_0x3c4c7b(0x269));return _0x513da7[_0x3c4c7b(0x3f5)][_0x3c4c7b(0x23c)][_0x3c4c7b(0x37b)](this);}}_0x3507a6=VisuMZ['ItemsEquipsCore'][_0x3c4c7b(0x471)][_0x3c4c7b(0x14f)][_0x3c4c7b(0x346)][_0x3c4c7b(0x37b)](this,_0x450716,_0x3507a6);if(isNaN(_0x3507a6))_0x3507a6=0x0;return Math[_0x3c4c7b(0x24e)](_0x3507a6);},Window_ShopBuy[_0x4222e9(0x3f5)][_0x4222e9(0x9b)]=function(_0xe8508b){const _0x34282c=_0x4222e9;this['resetFontSettings']();const _0xdd6639=this[_0x34282c(0x2a0)](_0xe8508b),_0x151895=this[_0x34282c(0x33f)](_0xe8508b),_0x2c7642=_0x151895[_0x34282c(0x506)];this[_0x34282c(0x393)](this[_0x34282c(0x44f)](_0xdd6639)),this[_0x34282c(0x394)](_0xdd6639,_0x151895['x'],_0x151895['y'],_0x2c7642),this[_0x34282c(0x495)](_0xdd6639,_0x151895),this[_0x34282c(0x393)](!![]);},Window_ShopBuy[_0x4222e9(0x3f5)][_0x4222e9(0x495)]=function(_0x3d0737,_0x15681b){const _0xdca1a1=_0x4222e9,_0x4f42f0=this[_0xdca1a1(0x4ad)](_0x3d0737);this[_0xdca1a1(0x108)](_0x4f42f0,TextManager['currencyUnit'],_0x15681b['x'],_0x15681b['y'],_0x15681b['width']);},Window_ShopSell[_0x4222e9(0x3f5)][_0x4222e9(0xa2)]=function(){const _0x415478=_0x4222e9;return SceneManager[_0x415478(0x306)][_0x415478(0x1fa)]()?0x1:0x2;},VisuMZ[_0x4222e9(0x16c)][_0x4222e9(0xf1)]=Window_ShopSell['prototype'][_0x4222e9(0x44f)],Window_ShopSell['prototype']['isEnabled']=function(_0xae28be){const _0x3645e7=_0x4222e9;if(!_0xae28be)return![];const _0x38715c=_0xae28be[_0x3645e7(0x223)];if(_0x38715c['match'](/<CANNOT SELL>/i))return![];if(_0x38715c[_0x3645e7(0x1cf)](/<CAN SELL>/i))return!![];if(_0x38715c['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10be26=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x10690b of _0x10be26){if(!$gameSwitches['value'](_0x10690b))return![];}}if(_0x38715c[_0x3645e7(0x1cf)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3832b6=JSON['parse']('['+RegExp['$1'][_0x3645e7(0x1cf)](/\d+/g)+']');for(const _0x1c0ca1 of _0x3832b6){if(!$gameSwitches[_0x3645e7(0x1f1)](_0x1c0ca1))return![];}}if(_0x38715c['match'](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2df9ac=JSON[_0x3645e7(0x84)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2271d8 of _0x2df9ac){if($gameSwitches[_0x3645e7(0x1f1)](_0x2271d8))return![];}}return VisuMZ[_0x3645e7(0x16c)][_0x3645e7(0xf1)]['call'](this,_0xae28be);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x395)]=function(){return![];},Window_ShopStatus[_0x4222e9(0x3f5)]['loadFaceImages']=function(){const _0xbddff6=_0x4222e9;Window_StatusBase[_0xbddff6(0x3f5)][_0xbddff6(0x27b)][_0xbddff6(0x37b)](this);for(const _0x1424a7 of $gameParty[_0xbddff6(0x30d)]()){ImageManager['loadCharacter'](_0x1424a7[_0xbddff6(0x116)]());}},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4a8)]=function(){const _0x46f0c0=_0x4222e9;return VisuMZ[_0x46f0c0(0x16c)][_0x46f0c0(0x471)][_0x46f0c0(0x246)][_0x46f0c0(0x296)];},Window_ShopStatus['prototype']['refresh']=function(){const _0x4086a6=_0x4222e9;this[_0x4086a6(0x412)][_0x4086a6(0xd2)](),this[_0x4086a6(0x398)]['clear']();if(this['_item']){if('Gjovp'===_0x4086a6(0x230)){const _0x143487=this['getItemSpeedLabel']();this[_0x4086a6(0x1f4)](_0x143487,_0x17c8d3,_0x1a8607,_0x23c0ff,!![]);const _0x243425=this[_0x4086a6(0x157)]();return this['drawItemKeyData'](_0x243425,_0xc9967b,_0x28cb93,_0x5afcac,![],_0x4086a6(0x3e1)),this['drawItemDarkRect'](_0x29c689,_0x3b472c,_0xcaf4e),this['resetFontSettings'](),!![];}else this['resetFontSettings'](),this[_0x4086a6(0x393)](!![]),this[_0x4086a6(0x21b)](),this[_0x4086a6(0x3e3)]()?this['drawEquipData']():this['drawItemData'](),this[_0x4086a6(0x244)]();}},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x19c)]=function(_0x4c9d62,_0x2cb3f9){const _0x1632c3=_0x4222e9;if(!this[_0x1632c3(0x3e3)]()&&!DataManager[_0x1632c3(0x292)](this[_0x1632c3(0x106)]))return;const _0x1e1397=this[_0x1632c3(0x184)]-this[_0x1632c3(0x4cf)]()-_0x4c9d62,_0x304037=this[_0x1632c3(0x248)](_0x1632c3(0x1c9));this[_0x1632c3(0x1e5)](ColorManager['systemColor']()),this[_0x1632c3(0x2de)](TextManager[_0x1632c3(0x115)],_0x4c9d62+this[_0x1632c3(0x4cf)](),_0x2cb3f9,_0x1e1397-_0x304037),this[_0x1632c3(0x20b)](),this[_0x1632c3(0x206)](this[_0x1632c3(0x106)],_0x4c9d62,_0x2cb3f9,_0x1e1397);},Window_ShopStatus['prototype'][_0x4222e9(0xe0)]=function(_0x3f897c,_0x25b3a7,_0x446bde,_0x4dc3a1,_0x40ddf2){const _0x29d652=_0x4222e9;if(VisuMZ[_0x29d652(0x16c)]['Settings'][_0x29d652(0x246)]['DrawBackRect']===![])return;_0x40ddf2=Math[_0x29d652(0x1b7)](_0x40ddf2||0x1,0x1);while(_0x40ddf2--){_0x4dc3a1=_0x4dc3a1||this[_0x29d652(0x39a)](),this[_0x29d652(0x398)][_0x29d652(0x2d9)]=0xa0;const _0x1a9cbb=ColorManager[_0x29d652(0x1e8)]();this['contentsBack']['fillRect'](_0x3f897c+0x1,_0x25b3a7+0x1,_0x446bde-0x2,_0x4dc3a1-0x2,_0x1a9cbb),this[_0x29d652(0x398)]['paintOpacity']=0xff;}},ColorManager[_0x4222e9(0x1e8)]=function(){const _0x16965a=_0x4222e9,_0x21714a=VisuMZ[_0x16965a(0x16c)][_0x16965a(0x471)][_0x16965a(0x246)];let _0x1d5157=_0x21714a[_0x16965a(0x171)]!==undefined?_0x21714a[_0x16965a(0x171)]:0x13;return ColorManager['getColor'](_0x1d5157);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x356)]=function(){const _0x3c7b82=_0x4222e9;if(VisuMZ[_0x3c7b82(0x16c)][_0x3c7b82(0x471)]['StatusWindow']['DrawEquipData']){VisuMZ[_0x3c7b82(0x16c)][_0x3c7b82(0x471)][_0x3c7b82(0x246)][_0x3c7b82(0xf7)][_0x3c7b82(0x37b)](this);return;}const _0x56f91b=this[_0x3c7b82(0x39a)](),_0x3290c8=this[_0x3c7b82(0x3e6)]()+0x8;let _0x406461=0x0,_0x4b95a9=0x0,_0x2f68ea=this[_0x3c7b82(0x184)],_0x14201a=this['innerHeight'],_0x259102=Math[_0x3c7b82(0x24e)](_0x2f68ea/0x2),_0x3902bc=_0x406461+_0x2f68ea-_0x259102;this['drawItemName'](this[_0x3c7b82(0x106)],_0x406461+this[_0x3c7b82(0x4cf)](),_0x4b95a9,_0x2f68ea-this[_0x3c7b82(0x4cf)]()*0x2),this[_0x3c7b82(0xe0)](_0x406461,_0x4b95a9,_0x2f68ea),_0x4b95a9+=_0x56f91b;if(this[_0x3c7b82(0x4e2)](_0x406461,_0x4b95a9,_0x259102))_0x4b95a9+=0x0;if(this['drawItemQuantity'](_0x3902bc,_0x4b95a9,_0x259102))_0x4b95a9+=_0x56f91b;const _0x3cc292=this[_0x3c7b82(0xbd)](),_0x50d264=_0x4b95a9;_0x4b95a9=_0x14201a-_0x3cc292[_0x3c7b82(0x1ae)]*_0x3290c8-0x4;let _0x2b3d46=_0x406461,_0x4b5464=0x0,_0x39d1a8=_0x4b95a9;for(const _0x45d439 of _0x3cc292){if('ghJHH'==='DsCTc'){const _0x5a395f=_0x36ed14[_0x2d848d];if(_0x5a395f&&_0x5a395f[_0x3c7b82(0x1a0)]>0x0){_0xc82f6a+=_0x3c7b82(0x3a8)['format'](_0x5a395f[_0x3c7b82(0x1a0)]),_0x28a812++;if(_0xb8d9d0>=_0x3854a0)return _0x4692bd;}}else _0x4b5464=Math[_0x3c7b82(0x1b7)](this[_0x3c7b82(0x1f5)](_0x45d439,_0x406461+0x4,_0x4b95a9+0x4,_0x2f68ea),_0x4b5464),_0x4b95a9+=_0x3290c8;}const _0xe6ea8b=$gameParty['maxBattleMembers'](),_0x40851e=Math[_0x3c7b82(0x24e)]((_0x2f68ea-_0x4b5464)/_0xe6ea8b);_0x4b5464=_0x2f68ea-_0x40851e*_0xe6ea8b;for(const _0xab39e8 of $gameParty[_0x3c7b82(0x2b2)]()){if('VCEax'!==_0x3c7b82(0x288)){const _0x59c776=$gameParty[_0x3c7b82(0x2b2)]()[_0x3c7b82(0x3fb)](_0xab39e8),_0x12ec47=_0x2b3d46+_0x4b5464+_0x59c776*_0x40851e;this[_0x3c7b82(0x393)](_0xab39e8[_0x3c7b82(0xac)](this[_0x3c7b82(0x106)])),this[_0x3c7b82(0x8a)](_0xab39e8,_0x12ec47+_0x40851e/0x2,_0x39d1a8);let _0x2a7d58=_0x39d1a8;for(const _0x1feda2 of _0x3cc292){const _0x3473b9=_0x2a7d58-(_0x56f91b-_0x3290c8)/0x2;this[_0x3c7b82(0x120)](_0xab39e8,_0x1feda2,_0x12ec47,_0x3473b9,_0x40851e),_0x2a7d58+=_0x3290c8;}}else _0x5b01b0[_0x3c7b82(0x16c)][_0x3c7b82(0x93)][_0x3c7b82(0x37b)](this),this[_0x3c7b82(0x34b)]();}this['drawItemDarkRect'](_0x2b3d46,_0x50d264,_0x4b5464,_0x39d1a8-_0x50d264);for(let _0x3ef67e=0x0;_0x3ef67e<_0xe6ea8b;_0x3ef67e++){if(_0x3c7b82(0x4e3)===_0x3c7b82(0x4e3)){const _0x51dae3=_0x2b3d46+_0x4b5464+_0x3ef67e*_0x40851e;this[_0x3c7b82(0xe0)](_0x51dae3,_0x50d264,_0x40851e,_0x39d1a8-_0x50d264);}else{const _0x59bc6f=_0x34c2a0['actor'](0x1);this[_0x3c7b82(0x4b9)]=_0x25576a['makeDeepCopy'](_0x59bc6f),this[_0x3c7b82(0x242)]=_0x16cb3e['makeDeepCopy'](_0x59bc6f);}}for(const _0x24e93e of _0x3cc292){this['drawItemDarkRect'](_0x2b3d46,_0x39d1a8,_0x4b5464,_0x3290c8);for(let _0x318f34=0x0;_0x318f34<_0xe6ea8b;_0x318f34++){const _0x1c488d=_0x2b3d46+_0x4b5464+_0x318f34*_0x40851e;this[_0x3c7b82(0xe0)](_0x1c488d,_0x39d1a8,_0x40851e,_0x3290c8);}_0x39d1a8+=_0x3290c8;}},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4e2)]=function(_0x3c2e9b,_0x4744da,_0x31c281){const _0x1d2750=_0x4222e9;if(!this[_0x1d2750(0x3e3)]())return![];const _0x50bfcb=$dataSystem['equipTypes'][this[_0x1d2750(0x106)][_0x1d2750(0x14c)]];return this[_0x1d2750(0x1f4)](_0x50bfcb,_0x3c2e9b,_0x4744da,_0x31c281,!![]),this['drawItemDarkRect'](_0x3c2e9b,_0x4744da,_0x31c281),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x501)]=function(){const _0x528f81=_0x4222e9,_0x2649b0=VisuMZ[_0x528f81(0x16c)][_0x528f81(0x471)][_0x528f81(0x11c)][_0x528f81(0x423)];return _0x2649b0[_0x528f81(0x474)]($gameParty['numItems'](this[_0x528f81(0x106)]));},Window_ShopStatus[_0x4222e9(0x3f5)]['actorParams']=function(){const _0x10695a=_0x4222e9;let _0x4794cb=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x10695a(0x267)]){if(_0x10695a(0x158)!==_0x10695a(0x158)){if(_0x1c3153[_0x10695a(0x1c6)])return _0x669019['ItemsEquipsCore'][_0x10695a(0x1f0)][_0x10695a(0x37b)](this);return _0x5210ee['getProxyItem'](_0x29c4c0[_0x10695a(0x16c)][_0x10695a(0x1f0)]['call'](this));}else _0x4794cb=VisuMZ[_0x10695a(0x8c)][_0x10695a(0x471)][_0x10695a(0x25f)]['ExtDisplayedParams'];}return _0x4794cb=_0x4794cb[_0x10695a(0x3c8)](_0x5c31b0=>typeof _0x5c31b0===_0x10695a(0x1a9)?_0x5c31b0:_0x5c31b0['toUpperCase']()[_0x10695a(0x277)]()),_0x4794cb;},Window_ShopStatus[_0x4222e9(0x3f5)]['smallParamFontSize']=function(){const _0x1dc67f=_0x4222e9;return VisuMZ[_0x1dc67f(0x16c)]['Settings'][_0x1dc67f(0x246)][_0x1dc67f(0x3c7)];},Window_ShopStatus['prototype'][_0x4222e9(0x1f5)]=function(_0x52b6c5,_0x3c8324,_0x52e227,_0x22ce20){const _0x13943b=_0x4222e9;this[_0x13943b(0x4ef)](),this[_0x13943b(0x412)][_0x13943b(0x3cd)]=this[_0x13943b(0x3a3)]();let _0x3cf683=this['textWidth'](TextManager[_0x13943b(0xa0)](_0x52b6c5))+0x4+_0x3c8324;if(Imported[_0x13943b(0x267)]){if(_0x13943b(0x27e)!==_0x13943b(0x27e)){const _0x266f77=_0x2da8f5[_0x13943b(0x16c)][_0x13943b(0x471)]['ItemScene'][_0x13943b(0x423)];return _0x266f77['format'](_0x27ce1b[_0x13943b(0x47a)](this[_0x13943b(0x106)]));}else this[_0x13943b(0x358)](_0x3c8324,_0x52e227,_0x22ce20,_0x52b6c5,!![]),VisuMZ[_0x13943b(0x8c)][_0x13943b(0x471)]['Param']['DrawIcons']&&(_0x13943b(0x4ba)!==_0x13943b(0x4ba)?this[_0x13943b(0x261)]():_0x3cf683+=ImageManager[_0x13943b(0x3d3)]+0x4);}else _0x13943b(0x37e)===_0x13943b(0x40c)?this[_0x13943b(0x259)](_0xd1b744):(this[_0x13943b(0x1e5)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x13943b(0xa0)](_0x52b6c5),_0x3c8324,_0x52e227,_0x22ce20));return this[_0x13943b(0x4ef)](),_0x3cf683;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x120)]=function(_0x475b88,_0x429b10,_0x2dae88,_0x3830d2,_0x263000){const _0x595388=_0x4222e9;_0x2dae88+=this[_0x595388(0x4cf)](),_0x263000-=this[_0x595388(0x4cf)]()*0x2;const _0x3badc9=VisuMZ[_0x595388(0x16c)][_0x595388(0x471)]['StatusWindow'];this['contents'][_0x595388(0x3cd)]=_0x3badc9['ParamChangeFontSize'],this[_0x595388(0x393)](_0x475b88[_0x595388(0xac)](this[_0x595388(0x106)]));if(_0x475b88['isEquipped'](this[_0x595388(0x106)])){const _0x341245=_0x3badc9[_0x595388(0xd8)];this[_0x595388(0x2de)](_0x341245,_0x2dae88,_0x3830d2,_0x263000,'center');}else{if(_0x475b88[_0x595388(0xac)](this[_0x595388(0x106)])){const _0x5df734=JsonEx[_0x595388(0xd0)](_0x475b88);_0x5df734[_0x595388(0x475)]=!![];const _0x1c4526=_0x5df734[_0x595388(0x2bd)]()[_0x595388(0x3fb)](this[_0x595388(0x106)][_0x595388(0x14c)]);if(_0x1c4526>=0x0)_0x5df734['forceChangeEquip'](_0x1c4526,this['_item']);let _0x4a66d6=0x0,_0x270c22=0x0,_0x26f6e0=0x0;Imported[_0x595388(0x267)]?(_0x4a66d6=_0x5df734['paramValueByName'](_0x429b10),_0x270c22=_0x4a66d6-_0x475b88[_0x595388(0xeb)](_0x429b10),this[_0x595388(0x1e5)](ColorManager[_0x595388(0x3b2)](_0x270c22)),_0x26f6e0=(_0x270c22>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x270c22,0x0,_0x429b10)):(_0x4a66d6=_0x5df734[_0x595388(0xa0)](_0x429b10),_0x270c22=_0x4a66d6-_0x475b88[_0x595388(0xa0)](_0x429b10),this[_0x595388(0x1e5)](ColorManager[_0x595388(0x3b2)](_0x270c22)),_0x26f6e0=(_0x270c22>=0x0?'+':'')+_0x270c22);if(_0x26f6e0==='+0')_0x26f6e0=_0x3badc9[_0x595388(0x3be)];this[_0x595388(0x2de)](_0x26f6e0,_0x2dae88,_0x3830d2,_0x263000,'center');}else{const _0x379ed0=_0x3badc9[_0x595388(0x1b2)];this[_0x595388(0x2de)](_0x379ed0,_0x2dae88,_0x3830d2,_0x263000,_0x595388(0x83));}}this['resetFontSettings'](),this[_0x595388(0x393)](!![]);},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemData']=function(){const _0x5baf1f=_0x4222e9;VisuMZ['ItemsEquipsCore']['Settings'][_0x5baf1f(0x246)][_0x5baf1f(0x4b4)][_0x5baf1f(0x37b)](this);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x21b)]=function(){const _0x1af531=_0x4222e9;this[_0x1af531(0x13a)]={};if(!this[_0x1af531(0x106)])return;const _0x3fcd2c=this[_0x1af531(0x106)][_0x1af531(0x223)];if(_0x3fcd2c[_0x1af531(0x1cf)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x449d7a=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x2ab62f of _0x449d7a){if(_0x2ab62f[_0x1af531(0x1cf)](/(.*):[ ](.*)/i)){const _0xcf8348=String(RegExp['$1'])[_0x1af531(0x258)]()['trim'](),_0x2f241d=String(RegExp['$2'])[_0x1af531(0x277)]();this['_customItemInfo'][_0xcf8348]=_0x2f241d;}}}},Window_ShopStatus[_0x4222e9(0x3f5)]['itemDataFontSize']=function(){return Math['max'](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x4222e9(0x3f5)]['resetFontSettings']=function(){const _0x522405=_0x4222e9;Window_StatusBase['prototype'][_0x522405(0x4ef)][_0x522405(0x37b)](this),this[_0x522405(0x412)][_0x522405(0x3cd)]=this[_0x522405(0x23a)]||this[_0x522405(0x412)][_0x522405(0x3cd)],this[_0x522405(0x412)][_0x522405(0x396)]=this[_0x522405(0x294)]||this[_0x522405(0x412)][_0x522405(0x396)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x44a)]=function(){const _0x481fb8=_0x4222e9;return this[_0x481fb8(0x412)]['fontSize']/$gameSystem[_0x481fb8(0x41e)]();},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x42d)]=function(_0x3a59be,_0x11cdb0,_0x465a28){const _0x2264ac=_0x4222e9,_0x3ff177=ImageManager[_0x2264ac(0x476)](_0x2264ac(0x96)),_0x4e3a6c=ImageManager[_0x2264ac(0x3d3)],_0xe14523=ImageManager[_0x2264ac(0x40f)],_0x36724c=_0x3a59be%0x10*_0x4e3a6c,_0x1ec7c3=Math[_0x2264ac(0x24e)](_0x3a59be/0x10)*_0xe14523,_0xc213e8=Math[_0x2264ac(0xda)](_0x4e3a6c*this[_0x2264ac(0x44a)]()),_0x5a094c=Math['ceil'](_0xe14523*this[_0x2264ac(0x44a)]());this[_0x2264ac(0x412)][_0x2264ac(0x3f9)](_0x3ff177,_0x36724c,_0x1ec7c3,_0x4e3a6c,_0xe14523,_0x11cdb0,_0x465a28,_0xc213e8,_0x5a094c);},Window_ShopStatus[_0x4222e9(0x3f5)]['processDrawIcon']=function(_0x39b215,_0x5e7aab){const _0x32786e=_0x4222e9;if(_0x5e7aab[_0x32786e(0x300)]){if(_0x32786e(0x291)!==_0x32786e(0x266))this['drawIcon'](_0x39b215,_0x5e7aab['x'],_0x5e7aab['y']+0x2);else return _0x521f5a[_0x32786e(0x2fe)];}_0x5e7aab['x']+=Math['ceil'](ImageManager[_0x32786e(0x3d3)]*this[_0x32786e(0x44a)]());if(this['fontSizeRatio']()===0x1)_0x5e7aab['x']+=0x4;},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemKeyData']=function(_0x965ace,_0x48b25f,_0x35834c,_0x5a94f5,_0x304648,_0x323d3c){const _0x7d9a66=_0x4222e9;_0x965ace=_0x965ace||'',_0x323d3c=_0x323d3c||_0x7d9a66(0xd5),this[_0x7d9a66(0x23a)]=this[_0x7d9a66(0x416)](),this[_0x7d9a66(0x294)]=_0x304648?ColorManager[_0x7d9a66(0x50a)]():this[_0x7d9a66(0x412)][_0x7d9a66(0x396)],_0x48b25f+=this[_0x7d9a66(0x4cf)](),_0x5a94f5-=this[_0x7d9a66(0x4cf)]()*0x2;const _0x3c1c91=this[_0x7d9a66(0x211)](_0x965ace);if(_0x323d3c===_0x7d9a66(0x83))_0x7d9a66(0x4fb)!=='QRPJO'?_0x48b25f=_0x48b25f+Math[_0x7d9a66(0x24e)]((_0x5a94f5-_0x3c1c91[_0x7d9a66(0x506)])/0x2):(_0x22df00[_0x7d9a66(0x3f5)]['refresh'][_0x7d9a66(0x37b)](this),this['refreshCursor']());else _0x323d3c===_0x7d9a66(0x3e1)&&(_0x48b25f=_0x48b25f+_0x5a94f5-_0x3c1c91[_0x7d9a66(0x506)]);_0x35834c+=(this[_0x7d9a66(0x39a)]()-_0x3c1c91[_0x7d9a66(0xb1)])/0x2,this[_0x7d9a66(0x295)](_0x965ace,_0x48b25f,_0x35834c,_0x5a94f5),this[_0x7d9a66(0x23a)]=undefined,this['_resetFontColor']=undefined,this[_0x7d9a66(0x4ef)]();},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemConsumable']=function(_0x594def,_0x33134d,_0xbf4a1b){const _0xc1f7e2=_0x4222e9;if(!DataManager['isItem'](this[_0xc1f7e2(0x106)]))return![];const _0x366462=this[_0xc1f7e2(0x179)]();this[_0xc1f7e2(0x1f4)](_0x366462,_0x594def,_0x33134d,_0xbf4a1b,!![]);const _0x5c4132=this[_0xc1f7e2(0x118)]();return this[_0xc1f7e2(0x1f4)](_0x5c4132,_0x594def,_0x33134d,_0xbf4a1b,![],'right'),this[_0xc1f7e2(0xe0)](_0x594def,_0x33134d,_0xbf4a1b),this[_0xc1f7e2(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemConsumableLabel']=function(){const _0x5690c4=_0x4222e9;return VisuMZ[_0x5690c4(0x16c)]['Settings'][_0x5690c4(0x246)][_0x5690c4(0x3e5)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x118)]=function(){const _0x3bd3bc=_0x4222e9,_0x25b5fb=_0x3bd3bc(0x3fd);if(this[_0x3bd3bc(0x13a)][_0x25b5fb])return this[_0x3bd3bc(0x13a)][_0x25b5fb];if(this[_0x3bd3bc(0x130)]())return _0x3bd3bc(0x36e)==='QuhDC'?VisuMZ[_0x3bd3bc(0x16c)][_0x3bd3bc(0x471)][_0x3bd3bc(0x246)][_0x3bd3bc(0x4a1)]:this[_0x3bd3bc(0x1fa)]()?this[_0x3bd3bc(0x4cc)]():_0x3ad402[_0x3bd3bc(0x16c)][_0x3bd3bc(0x32b)][_0x3bd3bc(0x37b)](this);else{if('OIIFC'===_0x3bd3bc(0x114))this[_0x3bd3bc(0x412)][_0x3bd3bc(0xd2)](),this[_0x3bd3bc(0x398)]['clear'](),this['_item']&&(this['resetFontSettings'](),this['changePaintOpacity'](!![]),this[_0x3bd3bc(0x21b)](),this[_0x3bd3bc(0x3e3)]()?this[_0x3bd3bc(0x356)]():this[_0x3bd3bc(0x3b1)](),this[_0x3bd3bc(0x244)]());else return VisuMZ[_0x3bd3bc(0x16c)]['Settings']['StatusWindow']['NotConsumable'];}},Window_ShopStatus['prototype'][_0x4222e9(0x130)]=function(){const _0x1c507a=_0x4222e9;return VisuMZ[_0x1c507a(0x8c)]&&VisuMZ[_0x1c507a(0x8c)]['Settings'][_0x1c507a(0x9d)][_0x1c507a(0x43d)]&&DataManager[_0x1c507a(0x17d)](this[_0x1c507a(0x106)])?![]:this[_0x1c507a(0x106)][_0x1c507a(0x3b5)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2c7)]=function(_0x50c777,_0x1fae45,_0x212a7d){const _0x5b3fd6=_0x4222e9;if(!this['isEquipItem']()&&!DataManager['isItem'](this[_0x5b3fd6(0x106)]))return![];if(DataManager['isKeyItem'](this[_0x5b3fd6(0x106)])&&!$dataSystem['optKeyItemsNumber']){if(_0x5b3fd6(0x3c4)!==_0x5b3fd6(0x3c4)){const _0x46d931=_0x3a5dde?_0x23409f(_0x345610['$1']):_0x2e81f4[_0x5b3fd6(0x209)](_0x2510ef);return _0x4eadeb[_0x46d931]||_0xebbb98;}else{const _0x144778=TextManager[_0x5b3fd6(0x3e7)];this['drawItemKeyData'](_0x144778,_0x50c777,_0x1fae45,_0x212a7d,!![],_0x5b3fd6(0x83));}}else{const _0x1fd62d=TextManager[_0x5b3fd6(0x115)];this['drawItemKeyData'](_0x1fd62d,_0x50c777,_0x1fae45,_0x212a7d,!![]);const _0x49af37=this['getItemQuantityText']();this[_0x5b3fd6(0x1f4)](_0x49af37,_0x50c777,_0x1fae45,_0x212a7d,![],_0x5b3fd6(0x3e1));}return this['drawItemDarkRect'](_0x50c777,_0x1fae45,_0x212a7d),this[_0x5b3fd6(0x4ef)](),!![];},Window_ShopStatus['prototype'][_0x4222e9(0x501)]=function(){const _0x518ff9=_0x4222e9,_0x4cf324='QUANTITY';if(this[_0x518ff9(0x13a)][_0x4cf324])return this[_0x518ff9(0x13a)][_0x4cf324];const _0x2e8dbc=VisuMZ[_0x518ff9(0x16c)]['Settings']['ItemScene'][_0x518ff9(0x423)];return _0x2e8dbc['format']($gameParty[_0x518ff9(0x47a)](this[_0x518ff9(0x106)]));},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2d3)]=function(_0x304d4e,_0x5013ae,_0x8bcd66){const _0x567d56=_0x4222e9,_0x439fe5=this['getItemOccasionText']();return this[_0x567d56(0x1f4)](_0x439fe5,_0x304d4e,_0x5013ae,_0x8bcd66,![],'center'),this[_0x567d56(0xe0)](_0x304d4e,_0x5013ae,_0x8bcd66),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x33e)]=function(){const _0x3023fc=_0x4222e9,_0x3674a2=_0x3023fc(0x2be);if(this[_0x3023fc(0x13a)][_0x3674a2])return this[_0x3023fc(0x13a)][_0x3674a2];const _0x352f7a=VisuMZ['ItemsEquipsCore'][_0x3023fc(0x471)][_0x3023fc(0x246)],_0x5f1842='Occasion%1'['format'](this[_0x3023fc(0x106)][_0x3023fc(0x200)]);return _0x352f7a[_0x5f1842];},Window_ShopStatus['prototype']['drawItemScope']=function(_0x3b1f2d,_0x379da0,_0x14b6a0){const _0x94a48f=_0x4222e9,_0x24f016=this[_0x94a48f(0x4e1)]();return this['drawItemKeyData'](_0x24f016,_0x3b1f2d,_0x379da0,_0x14b6a0,![],_0x94a48f(0x83)),this[_0x94a48f(0xe0)](_0x3b1f2d,_0x379da0,_0x14b6a0),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x4222e9(0x4e1)]=function(){const _0x2b8c8c=_0x4222e9,_0x4d9350=_0x2b8c8c(0x140);if(this[_0x2b8c8c(0x13a)][_0x4d9350])return this[_0x2b8c8c(0x13a)][_0x4d9350];const _0x30aa7f=VisuMZ[_0x2b8c8c(0x16c)]['Settings']['StatusWindow'];if(Imported[_0x2b8c8c(0x2f9)]){const _0x172479=this[_0x2b8c8c(0x106)][_0x2b8c8c(0x223)];if(_0x172479['match'](/<TARGET:[ ](.*)>/i)){if(_0x2b8c8c(0x369)==='UoZtA'){const _0x79dab2=String(RegExp['$1']);if(_0x79dab2[_0x2b8c8c(0x1cf)](/(\d+) RANDOM ANY/i)){if(_0x2b8c8c(0x3aa)===_0x2b8c8c(0x10e))_0x1734eb[_0x2b8c8c(0x16c)]['Game_Actor_discardEquip'][_0x2b8c8c(0x37b)](this,_0x21d4d1);else return _0x30aa7f[_0x2b8c8c(0x1fe)][_0x2b8c8c(0x474)](Number(RegExp['$1']));}else{if(_0x79dab2[_0x2b8c8c(0x1cf)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x30aa7f[_0x2b8c8c(0x186)][_0x2b8c8c(0x474)](Number(RegExp['$1']));else{if(_0x79dab2[_0x2b8c8c(0x1cf)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x2b8c8c(0x49c)!==_0x2b8c8c(0x49c)?_0x155eac[_0x2b8c8c(0x16c)][_0x2b8c8c(0x471)][_0x2b8c8c(0x29b)][_0x2b8c8c(0x262)]:_0x30aa7f[_0x2b8c8c(0x103)][_0x2b8c8c(0x474)](Number(RegExp['$1']));else{if(_0x79dab2[_0x2b8c8c(0x1cf)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x30aa7f[_0x2b8c8c(0x1fd)];}}}}else{if(_0x4e4005[_0x2b8c8c(0x3c2)]&&_0x3b5c83[_0x2b8c8c(0x9c)]!==_0x38bd8)return _0x49d60a[_0x2b8c8c(0x9c)];else{if(this[_0x2b8c8c(0x1fa)]())return this[_0x2b8c8c(0x462)]()[_0x2b8c8c(0x1cf)](/RIGHT/i);else _0x12f843['prototype'][_0x2b8c8c(0x2c1)][_0x2b8c8c(0x37b)](this);}}}}const _0x3715be='Scope%1'[_0x2b8c8c(0x474)](this[_0x2b8c8c(0x106)][_0x2b8c8c(0x98)]);return _0x30aa7f[_0x3715be];},Window_ShopStatus['prototype'][_0x4222e9(0x23b)]=function(_0x1a8a1e,_0x2bcf43,_0x5b31bb){const _0x164cf0=_0x4222e9,_0x2e9791=this[_0x164cf0(0x29a)]();this['drawItemKeyData'](_0x2e9791,_0x1a8a1e,_0x2bcf43,_0x5b31bb,!![]);const _0x4649cd=this[_0x164cf0(0x157)]();return this[_0x164cf0(0x1f4)](_0x4649cd,_0x1a8a1e,_0x2bcf43,_0x5b31bb,![],_0x164cf0(0x3e1)),this[_0x164cf0(0xe0)](_0x1a8a1e,_0x2bcf43,_0x5b31bb),this[_0x164cf0(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemSpeedLabel']=function(){const _0x3eb358=_0x4222e9;return VisuMZ[_0x3eb358(0x16c)][_0x3eb358(0x471)][_0x3eb358(0x246)]['LabelSpeed'];},Window_ShopStatus['prototype'][_0x4222e9(0x157)]=function(){const _0x5c782b=_0x4222e9,_0x247a1d='SPEED';if(this[_0x5c782b(0x13a)][_0x247a1d])return this['_customItemInfo'][_0x247a1d];const _0x697ae5=this[_0x5c782b(0x106)][_0x5c782b(0x32f)];if(_0x697ae5>=0x7d0)return VisuMZ[_0x5c782b(0x16c)][_0x5c782b(0x471)][_0x5c782b(0x246)][_0x5c782b(0xdd)];else{if(_0x697ae5>=0x3e8)return VisuMZ[_0x5c782b(0x16c)]['Settings'][_0x5c782b(0x246)][_0x5c782b(0x387)];else{if(_0x697ae5>0x0)return VisuMZ['ItemsEquipsCore'][_0x5c782b(0x471)][_0x5c782b(0x246)][_0x5c782b(0x16a)];else{if(_0x697ae5===0x0){if(_0x5c782b(0x4ed)===_0x5c782b(0x4ed))return VisuMZ[_0x5c782b(0x16c)]['Settings'][_0x5c782b(0x246)][_0x5c782b(0x97)];else{const _0x3bf217=_0x4df12e(_0x580b89['$1']),_0x2552b6=_0x5c782b(0x275)[_0x5c782b(0x474)](_0x3bf217);_0x52a77d[_0x5c782b(0x16c)][_0x5c782b(0xcd)][_0x19fb60['id']]=new _0x44e8cb(_0x5c782b(0x1f2),_0x2552b6);}}else{if(_0x697ae5>-0x3e8){if(_0x5c782b(0xec)!==_0x5c782b(0xec))_0x505bd2+=_0x3b42cd(_0x59b152['$1']);else return VisuMZ['ItemsEquipsCore']['Settings'][_0x5c782b(0x246)]['SpeedNeg999'];}else{if(_0x697ae5>-0x7d0)return VisuMZ[_0x5c782b(0x16c)][_0x5c782b(0x471)]['StatusWindow'][_0x5c782b(0x35c)];else{if(_0x697ae5<=-0x7d0)return VisuMZ[_0x5c782b(0x16c)][_0x5c782b(0x471)][_0x5c782b(0x246)][_0x5c782b(0x193)];else{if(_0x5c782b(0x107)!==_0x5c782b(0xaf))return _0x5c782b(0x82);else{const _0x5749f8=_0x3788e8[_0x5c782b(0x1b7)](_0x4619f7(_0x36821c),0x0)/_0x4d83e1['a'][_0x5c782b(0x2b1)];return this[_0x5c782b(0x4e6)](),_0x287b6c(_0x5749f8)?_0x5c782b(0x82):_0x5c782b(0x2cc)['format'](_0x3b37e6[_0x5c782b(0x446)](_0x5749f8*0x64));}}}}}}}}},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x37c)]=function(_0x13fa81,_0x58a7d8,_0x2c7cb9){const _0x53fb7f=_0x4222e9,_0x1395d7=this['getItemSuccessRateLabel']();this[_0x53fb7f(0x1f4)](_0x1395d7,_0x13fa81,_0x58a7d8,_0x2c7cb9,!![]);const _0x3a1cc5=this[_0x53fb7f(0x194)]();return this[_0x53fb7f(0x1f4)](_0x3a1cc5,_0x13fa81,_0x58a7d8,_0x2c7cb9,![],'right'),this[_0x53fb7f(0xe0)](_0x13fa81,_0x58a7d8,_0x2c7cb9),this[_0x53fb7f(0x4ef)](),!![];},Window_ShopStatus['prototype'][_0x4222e9(0x3a0)]=function(){const _0xd35ba9=_0x4222e9;return VisuMZ[_0xd35ba9(0x16c)][_0xd35ba9(0x471)][_0xd35ba9(0x246)][_0xd35ba9(0x94)];},Window_ShopStatus['prototype'][_0x4222e9(0x194)]=function(){const _0x2c3b0e=_0x4222e9,_0x277128=_0x2c3b0e(0x46e);if(this[_0x2c3b0e(0x13a)][_0x277128])return this[_0x2c3b0e(0x13a)][_0x277128];if(Imported[_0x2c3b0e(0x2f9)]){if(_0x2c3b0e(0xea)===_0x2c3b0e(0xea)){const _0x3a117b=this[_0x2c3b0e(0x106)][_0x2c3b0e(0x223)];if(_0x3a117b['match'](/<ALWAYS HIT>/i))return _0x2c3b0e(0x24a);else{if(_0x3a117b[_0x2c3b0e(0x1cf)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x2c3b0e(0x2cc)[_0x2c3b0e(0x474)](Number(RegExp['$1']));}}else _0x5c5d99[_0x2c3b0e(0x16c)][_0x2c3b0e(0xd1)]['call'](this),this[_0x2c3b0e(0x1fa)]()&&this['onSellOkItemsEquipsCore']();}return'%1%'['format'](this['_item'][_0x2c3b0e(0x3ce)]);},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemRepeats']=function(_0x563901,_0x4ab345,_0x1a93df){const _0xd038ec=_0x4222e9,_0x56c5ee=this['getItemRepeatsLabel']();this['drawItemKeyData'](_0x56c5ee,_0x563901,_0x4ab345,_0x1a93df,!![]);const _0x2be974=this[_0xd038ec(0x2dc)]();return this[_0xd038ec(0x1f4)](_0x2be974,_0x563901,_0x4ab345,_0x1a93df,![],_0xd038ec(0x3e1)),this[_0xd038ec(0xe0)](_0x563901,_0x4ab345,_0x1a93df),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x1a7)]=function(){const _0x177a44=_0x4222e9;return VisuMZ[_0x177a44(0x16c)]['Settings'][_0x177a44(0x246)]['LabelRepeats'];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2dc)]=function(){const _0x355658=_0x4222e9,_0x1cd23c=_0x355658(0x28b);if(this[_0x355658(0x13a)][_0x1cd23c])return this[_0x355658(0x13a)][_0x1cd23c];const _0x3d6fb2='×%1';return _0x3d6fb2[_0x355658(0x474)](this[_0x355658(0x106)][_0x355658(0x4fa)]);},Window_ShopStatus['prototype'][_0x4222e9(0xc7)]=function(_0x2a5ddb,_0x7632d2,_0x4d6481){const _0x32feb2=_0x4222e9,_0x3ffb0f=this[_0x32feb2(0x366)]();this[_0x32feb2(0x1f4)](_0x3ffb0f,_0x2a5ddb,_0x7632d2,_0x4d6481,!![]);const _0x4ea181=this[_0x32feb2(0x2a6)]();return this[_0x32feb2(0x1f4)](_0x4ea181,_0x2a5ddb,_0x7632d2,_0x4d6481,![],'right'),this[_0x32feb2(0xe0)](_0x2a5ddb,_0x7632d2,_0x4d6481),this[_0x32feb2(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x366)]=function(){const _0x1cd2d0=_0x4222e9;return VisuMZ[_0x1cd2d0(0x16c)][_0x1cd2d0(0x471)][_0x1cd2d0(0x246)][_0x1cd2d0(0x50e)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2a6)]=function(){const _0x40fa8a=_0x4222e9,_0x4bb760=_0x40fa8a(0x4b2);if(this[_0x40fa8a(0x13a)][_0x4bb760])return this['_customItemInfo'][_0x4bb760];const _0x1c91ca=VisuMZ[_0x40fa8a(0x16c)][_0x40fa8a(0x471)]['StatusWindow'],_0x2b46ed='HitType%1'[_0x40fa8a(0x474)](this['_item'][_0x40fa8a(0x41a)]);return _0x1c91ca[_0x2b46ed];},Window_ShopStatus['prototype']['drawItemDamage']=function(_0x497309,_0x231f5e,_0x4f1197){const _0x846273=_0x4222e9;if(this[_0x846273(0x106)][_0x846273(0x18f)]['type']<=0x0)return _0x231f5e;if(this[_0x846273(0x4ce)](_0x497309,_0x231f5e,_0x4f1197))_0x231f5e+=this[_0x846273(0x39a)]();if(this[_0x846273(0x4c4)](_0x497309,_0x231f5e,_0x4f1197))_0x231f5e+=this[_0x846273(0x39a)]();return this[_0x846273(0x4ef)](),_0x231f5e;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4ce)]=function(_0x3e721f,_0x38d10c,_0x17b356){const _0x5cf768=_0x4222e9,_0x329aa0=this[_0x5cf768(0x15d)]();this[_0x5cf768(0x1f4)](_0x329aa0,_0x3e721f,_0x38d10c,_0x17b356,!![]);const _0x159328=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x159328,_0x3e721f,_0x38d10c,_0x17b356,![],'right'),this['drawItemDarkRect'](_0x3e721f,_0x38d10c,_0x17b356),this[_0x5cf768(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemDamageElementLabel']=function(){const _0x58960e=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x58960e(0x471)][_0x58960e(0x246)][_0x58960e(0x196)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x339)]=function(){const _0xd6d041=_0x4222e9,_0x248edf=_0xd6d041(0x13b);if(this[_0xd6d041(0x13a)][_0x248edf])return this[_0xd6d041(0x13a)][_0x248edf];if(this[_0xd6d041(0x106)][_0xd6d041(0x18f)][_0xd6d041(0x13c)]<=-0x1)return _0xd6d041(0x2f0)!==_0xd6d041(0x4d0)?VisuMZ[_0xd6d041(0x16c)][_0xd6d041(0x471)][_0xd6d041(0x246)]['ElementWeapon']:_0x341fd9['ItemsEquipsCore']['Settings']['StatusWindow']['Speed0'];else return this['_item'][_0xd6d041(0x18f)][_0xd6d041(0x13c)]===0x0?VisuMZ[_0xd6d041(0x16c)]['Settings']['StatusWindow']['ElementNone']:_0xd6d041(0xfa)!==_0xd6d041(0x375)?$dataSystem[_0xd6d041(0x10c)][this['_item']['damage'][_0xd6d041(0x13c)]]:!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemDamageAmount']=function(_0x437846,_0x22034a,_0x23eb75){const _0x431ad3=_0x4222e9,_0xa927be=this['getItemDamageAmountLabel']();this[_0x431ad3(0x1f4)](_0xa927be,_0x437846,_0x22034a,_0x23eb75,!![]),this[_0x431ad3(0x293)]();const _0x440256=this[_0x431ad3(0x508)](),_0x42cb6b=ColorManager[_0x431ad3(0x23e)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x431ad3(0x18f)][_0x431ad3(0x449)]]);return this['changeTextColor'](_0x42cb6b),this[_0x431ad3(0x1f4)](_0x440256,_0x437846,_0x22034a,_0x23eb75,![],_0x431ad3(0x3e1)),this[_0x431ad3(0xe0)](_0x437846,_0x22034a,_0x23eb75),this[_0x431ad3(0x4ef)](),!![];},Window_ShopStatus['prototype']['getItemDamageAmountLabel']=function(){const _0x5d9e48=_0x4222e9;if(Imported[_0x5d9e48(0x2f9)]&&DataManager[_0x5d9e48(0xaa)](this[_0x5d9e48(0x106)])!==_0x5d9e48(0x1e2))return this[_0x5d9e48(0x236)]();else{if(_0x5d9e48(0x39c)!==_0x5d9e48(0x256))return this['getItemDamageAmountLabelOriginal']();else{const _0x236276=_0x4cf929[_0x5d9e48(0x84)]('['+_0x2142fd['$1']['match'](/\d+/g)+']');for(const _0x5ca8dc of _0x236276){if(!_0x46cac3[_0x5d9e48(0x1f1)](_0x5ca8dc))return!![];}return![];}}},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemDamageAmountLabelOriginal']=function(){const _0xfc70a4=_0x4222e9,_0x32e688=VisuMZ['ItemsEquipsCore'][_0xfc70a4(0x471)][_0xfc70a4(0x246)],_0x4788a3=_0xfc70a4(0x138)[_0xfc70a4(0x474)](this[_0xfc70a4(0x106)][_0xfc70a4(0x18f)][_0xfc70a4(0x449)]),_0x5d573f=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0xfc70a4(0x106)]['damage'][_0xfc70a4(0x449)]];return _0x32e688[_0x4788a3]['format'](_0x5d573f);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x293)]=function(){const _0x3d15ae=_0x4222e9,_0x2bd018=$gameActors[_0x3d15ae(0x22a)](0x1);this['_tempActorA']=JsonEx['makeDeepCopy'](_0x2bd018),this[_0x3d15ae(0x242)]=JsonEx[_0x3d15ae(0xd0)](_0x2bd018);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x508)]=function(){const _0x5c138f=_0x4222e9,_0x248c22=_0x5c138f(0x3f4);if(this['_customItemInfo'][_0x248c22])return this[_0x5c138f(0x13a)][_0x248c22];return Imported[_0x5c138f(0x2f9)]&&DataManager[_0x5c138f(0xaa)](this[_0x5c138f(0x106)])!=='MANUAL'?this[_0x5c138f(0x28d)]():this['getItemDamageAmountTextOriginal']();},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x439)]=function(){const _0x50b9f2=_0x4222e9;window['a']=this[_0x50b9f2(0x4b9)],window['b']=this[_0x50b9f2(0x242)],this[_0x50b9f2(0x4b9)][_0x50b9f2(0x1b3)](!![]),this[_0x50b9f2(0x242)][_0x50b9f2(0x1b3)]([0x3,0x4][_0x50b9f2(0x302)](this[_0x50b9f2(0x106)][_0x50b9f2(0x18f)][_0x50b9f2(0x449)]));let _0x20d473=this['_item'][_0x50b9f2(0x18f)][_0x50b9f2(0x2c5)];try{const _0x2a321f=Math['max'](eval(_0x20d473),0x0)/window['a']['atk'];return this[_0x50b9f2(0x4e6)](),isNaN(_0x2a321f)?_0x50b9f2(0x1ee)!=='VVozE'?_0x4b0ccb['ItemsEquipsCore'][_0x50b9f2(0x45e)]['call'](this):_0x50b9f2(0x82):'%1%'['format'](Math[_0x50b9f2(0x446)](_0x2a321f*0x64));}catch(_0x537cda){return $gameTemp[_0x50b9f2(0x359)]()&&(console[_0x50b9f2(0x316)](_0x50b9f2(0x444)[_0x50b9f2(0x474)](this[_0x50b9f2(0x106)]['name'])),console['log'](_0x537cda)),this[_0x50b9f2(0x4e6)](),_0x50b9f2(0x82);}},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4e6)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4f0)]=function(_0x4f7208,_0x19b717,_0x936753){const _0x20c9fb=_0x4222e9;if(!this[_0x20c9fb(0xdf)]())return _0x19b717;if(this[_0x20c9fb(0x41d)](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();if(this['drawItemEffectsMpRecovery'](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this['lineHeight']();if(this[_0x20c9fb(0x3f1)](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();if(this[_0x20c9fb(0x20d)](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();if(this['drawItemEffectsMpDamage'](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();if(this['drawItemEffectsTpDamage'](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();if(this['drawItemEffectsSelfTpGain'](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this['lineHeight']();if(this[_0x20c9fb(0x2a3)](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this['lineHeight']();if(this[_0x20c9fb(0x322)](_0x4f7208,_0x19b717,_0x936753))_0x19b717+=this[_0x20c9fb(0x39a)]();return this['resetFontSettings'](),_0x19b717;},Window_ShopStatus['prototype'][_0x4222e9(0x30b)]=function(){const _0x924978=_0x4222e9;return this[_0x924978(0x106)][_0x924978(0x235)];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0xdf)]=function(){const _0x5d990f=_0x4222e9;let _0x1f7bb2=![];this[_0x5d990f(0xa9)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x564830=this['getItemEffects']();for(const _0x143c39 of _0x564830){switch(_0x143c39[_0x5d990f(0x3e8)]){case Game_Action[_0x5d990f(0xf6)]:this[_0x5d990f(0xa9)][_0x5d990f(0x28a)]+=_0x143c39[_0x5d990f(0x368)],this['_itemData'][_0x5d990f(0x47c)]+=_0x143c39[_0x5d990f(0x435)],_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x2f1)]:this[_0x5d990f(0xa9)][_0x5d990f(0x458)]+=_0x143c39['value1'],this[_0x5d990f(0xa9)][_0x5d990f(0x3a2)]+=_0x143c39[_0x5d990f(0x435)],_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x4af)]:this[_0x5d990f(0xa9)][_0x5d990f(0x3d5)]+=_0x143c39[_0x5d990f(0x368)],_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x26c)]:this['_itemData'][_0x5d990f(0x161)][_0x5d990f(0x48f)](_0x143c39[_0x5d990f(0x170)]),_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x1ff)]:this[_0x5d990f(0xa9)][_0x5d990f(0x185)][_0x5d990f(0x48f)](_0x143c39['dataId']),this[_0x5d990f(0xa9)][_0x5d990f(0xc9)]=!![],_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x16f)]:this['_itemData'][_0x5d990f(0xf9)][_0x143c39[_0x5d990f(0x170)]]+=0x1,_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x425)]:this[_0x5d990f(0xa9)][_0x5d990f(0xf9)][_0x143c39[_0x5d990f(0x170)]]-=0x1,_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x4bd)]:this[_0x5d990f(0xa9)][_0x5d990f(0x433)][_0x5d990f(0x48f)](_0x143c39[_0x5d990f(0x170)]),this[_0x5d990f(0xa9)][_0x5d990f(0xc9)]=!![],_0x1f7bb2=!![];break;case Game_Action[_0x5d990f(0x2cb)]:this['_itemData'][_0x5d990f(0x4eb)][_0x5d990f(0x48f)](_0x143c39[_0x5d990f(0x170)]),this['_itemData']['removeStateBuffChanges']=!![],_0x1f7bb2=!![];break;}}if(this['_itemData'][_0x5d990f(0x161)]['length']>0x0)this[_0x5d990f(0xa9)][_0x5d990f(0x33c)]=!![];for(let _0x334151=0x0;_0x334151<this[_0x5d990f(0xa9)]['changeBuff'][_0x5d990f(0x1ae)];_0x334151++){if(this[_0x5d990f(0xa9)][_0x5d990f(0xf9)][_0x334151]!==0x0)this['_itemData']['addStateBuffChanges']=!![];}if(this[_0x5d990f(0x106)][_0x5d990f(0x119)]!==0x0){if(_0x5d990f(0xc1)!==_0x5d990f(0x470))this[_0x5d990f(0xa9)][_0x5d990f(0x80)]=this[_0x5d990f(0x106)]['tpGain'],_0x1f7bb2=!![];else return _0xfb6f7f[_0x5d990f(0x41c)](_0x5d990f(0x47f),_0x5d990f(0x42e));}const _0xe5fc91=['HP\x20RECOVERY',_0x5d990f(0x44d),_0x5d990f(0x1a4),_0x5d990f(0x1cc),_0x5d990f(0x388),_0x5d990f(0xbe),_0x5d990f(0x178),_0x5d990f(0x2d7),_0x5d990f(0x459)];for(const _0x32d5e9 of _0xe5fc91){if(this[_0x5d990f(0x13a)][_0x32d5e9]){if(_0x5d990f(0x38b)!==_0x5d990f(0x307)){_0x1f7bb2=!![];break;}else return this['updatedLayoutStyle']()[_0x5d990f(0x1cf)](/RIGHT/i);}}return _0x1f7bb2;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x41d)]=function(_0x2ed71f,_0x21a921,_0x5650e7){const _0x126dd4=_0x4222e9,_0x268906=_0x126dd4(0x363);if(this[_0x126dd4(0xa9)][_0x126dd4(0x28a)]<=0x0&&this[_0x126dd4(0xa9)][_0x126dd4(0x47c)]<=0x0&&!this['_customItemInfo'][_0x268906])return![];const _0x143bf0=this['getItemEffectsHpRecoveryLabel']();this[_0x126dd4(0x1f4)](_0x143bf0,_0x2ed71f,_0x21a921,_0x5650e7,!![]);const _0xe6623f=this['getItemEffectsHpRecoveryText']();return this[_0x126dd4(0x1e5)](ColorManager['damageColor'](0x1)),this[_0x126dd4(0x1f4)](_0xe6623f,_0x2ed71f,_0x21a921,_0x5650e7,![],_0x126dd4(0x3e1)),this['drawItemDarkRect'](_0x2ed71f,_0x21a921,_0x5650e7),this[_0x126dd4(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsHpRecoveryLabel']=function(){const _0x2d1ffc=_0x4222e9,_0x4fa248=VisuMZ[_0x2d1ffc(0x16c)][_0x2d1ffc(0x471)]['StatusWindow'][_0x2d1ffc(0xa7)];return _0x4fa248[_0x2d1ffc(0x474)](TextManager['hp']);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2d4)]=function(){const _0x546463=_0x4222e9,_0x281daf=_0x546463(0x363);if(this[_0x546463(0x13a)][_0x281daf])return this[_0x546463(0x13a)][_0x281daf];let _0x1582a3='';if(this[_0x546463(0xa9)][_0x546463(0x28a)]>0x0)_0x1582a3+=_0x546463(0x48e)['format'](Math['floor'](this[_0x546463(0xa9)][_0x546463(0x28a)]*0x64));if(this[_0x546463(0xa9)][_0x546463(0x28a)]>0x0&&this['_itemData'][_0x546463(0x47c)]>0x0)_0x1582a3+='\x20';if(this[_0x546463(0xa9)][_0x546463(0x47c)]>0x0)_0x1582a3+=_0x546463(0x139)[_0x546463(0x474)](this[_0x546463(0xa9)]['flatHP']);return _0x1582a3;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x26f)]=function(_0x190327,_0x32f95e,_0x96ea9f){const _0x45d2b3=_0x4222e9,_0x52910c='MP\x20RECOVERY';if(this[_0x45d2b3(0xa9)][_0x45d2b3(0x458)]<=0x0&&this[_0x45d2b3(0xa9)]['flatMP']<=0x0&&!this[_0x45d2b3(0x13a)][_0x52910c])return![];const _0x264822=this['getItemEffectsMpRecoveryLabel']();this['drawItemKeyData'](_0x264822,_0x190327,_0x32f95e,_0x96ea9f,!![]);const _0x6c793a=this['getItemEffectsMpRecoveryText']();return this[_0x45d2b3(0x1e5)](ColorManager[_0x45d2b3(0x23e)](0x3)),this[_0x45d2b3(0x1f4)](_0x6c793a,_0x190327,_0x32f95e,_0x96ea9f,![],_0x45d2b3(0x3e1)),this[_0x45d2b3(0xe0)](_0x190327,_0x32f95e,_0x96ea9f),this[_0x45d2b3(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsMpRecoveryLabel']=function(){const _0x503165=_0x4222e9,_0x503bc2=VisuMZ[_0x503165(0x16c)][_0x503165(0x471)][_0x503165(0x246)][_0x503165(0xdb)];return _0x503bc2[_0x503165(0x474)](TextManager['mp']);},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsMpRecoveryText']=function(){const _0x264c06=_0x4222e9,_0x3279d7=_0x264c06(0x44d);if(this[_0x264c06(0x13a)][_0x3279d7])return this[_0x264c06(0x13a)][_0x3279d7];let _0x3d122f='';if(this[_0x264c06(0xa9)][_0x264c06(0x458)]>0x0)_0x3d122f+=_0x264c06(0x48e)[_0x264c06(0x474)](Math[_0x264c06(0x24e)](this[_0x264c06(0xa9)]['rateMP']*0x64));if(this[_0x264c06(0xa9)][_0x264c06(0x458)]>0x0&&this[_0x264c06(0xa9)]['flatMP']>0x0)_0x3d122f+='\x20';if(this['_itemData'][_0x264c06(0x3a2)]>0x0)_0x3d122f+=_0x264c06(0x139)[_0x264c06(0x474)](this[_0x264c06(0xa9)][_0x264c06(0x3a2)]);return _0x3d122f;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x3f1)]=function(_0x5f593f,_0x8f2c85,_0x2830c4){const _0xde30cd=_0x4222e9,_0x332130=_0xde30cd(0x1a4);if(this[_0xde30cd(0xa9)]['gainTP']<=0x0&&!this['_customItemInfo'][_0x332130])return![];const _0xbf50e9=this[_0xde30cd(0x4d3)]();this[_0xde30cd(0x1f4)](_0xbf50e9,_0x5f593f,_0x8f2c85,_0x2830c4,!![]);const _0x444a40=this[_0xde30cd(0x297)]();return this[_0xde30cd(0x1e5)](ColorManager[_0xde30cd(0x1f8)]()),this[_0xde30cd(0x1f4)](_0x444a40,_0x5f593f,_0x8f2c85,_0x2830c4,![],_0xde30cd(0x3e1)),this[_0xde30cd(0xe0)](_0x5f593f,_0x8f2c85,_0x2830c4),this[_0xde30cd(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x4d3)]=function(){const _0x34e61e=_0x4222e9,_0x34179b=VisuMZ[_0x34e61e(0x16c)][_0x34e61e(0x471)][_0x34e61e(0x246)]['LabelRecoverTP'];return _0x34179b['format'](TextManager['tp']);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x297)]=function(){const _0x51e0e1=_0x4222e9,_0x4cb6aa=_0x51e0e1(0x1a4);if(this['_customItemInfo'][_0x4cb6aa])return this[_0x51e0e1(0x13a)][_0x4cb6aa];let _0x454d1c='';return _0x454d1c+='+%1'[_0x51e0e1(0x474)](this['_itemData'][_0x51e0e1(0x3d5)]),_0x454d1c;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x168)]=function(_0x4ed557,_0x321f05,_0x26b011){const _0x8e91fb=_0x4222e9,_0x18ebbe='USER\x20TP\x20GAIN';if(this[_0x8e91fb(0xa9)][_0x8e91fb(0x80)]===0x0&&!this[_0x8e91fb(0x13a)][_0x18ebbe])return![];const _0x48c70b=this['getItemEffectsSelfTpGainLabel']();this[_0x8e91fb(0x1f4)](_0x48c70b,_0x4ed557,_0x321f05,_0x26b011,!![]);const _0x32382f=this[_0x8e91fb(0x343)]();if(this['_itemData']['selfTP']>0x0){if('qMVKM'!=='kYvLZ')this['changeTextColor'](ColorManager[_0x8e91fb(0x1f8)]());else{const _0x156a68=_0x1f62f5[_0x8e91fb(0x16c)][_0x8e91fb(0x471)]['StatusWindow'],_0x5a2278=_0x8e91fb(0x138)[_0x8e91fb(0x474)](this[_0x8e91fb(0x106)]['damage'][_0x8e91fb(0x449)]),_0x381a4e=[null,_0x2dcc20['hp'],_0x5ac5aa['mp'],_0x158cb3['hp'],_0x17d4b5['mp'],_0x16a416['hp'],_0x2d2683['mp']][this[_0x8e91fb(0x106)][_0x8e91fb(0x18f)][_0x8e91fb(0x449)]];return _0x156a68[_0x5a2278][_0x8e91fb(0x474)](_0x381a4e);}}else _0x8e91fb(0x1c3)!==_0x8e91fb(0x1c3)?this['onTouchCancel']():this[_0x8e91fb(0x1e5)](ColorManager['powerDownColor']());return this['drawItemKeyData'](_0x32382f,_0x4ed557,_0x321f05,_0x26b011,![],_0x8e91fb(0x3e1)),this[_0x8e91fb(0xe0)](_0x4ed557,_0x321f05,_0x26b011),this[_0x8e91fb(0x4ef)](),!![];},Window_ShopStatus['prototype'][_0x4222e9(0x264)]=function(){const _0xb91607=_0x4222e9,_0x565cfe=VisuMZ['ItemsEquipsCore'][_0xb91607(0x471)][_0xb91607(0x246)][_0xb91607(0x117)];return _0x565cfe[_0xb91607(0x474)](TextManager['tp']);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x343)]=function(){const _0x5cff87=_0x4222e9,_0x44b072=_0x5cff87(0x178);if(this[_0x5cff87(0x13a)][_0x44b072])return this[_0x5cff87(0x13a)][_0x44b072];let _0x519f41='';if(this[_0x5cff87(0xa9)][_0x5cff87(0x80)]>0x0){if(_0x5cff87(0x1de)!==_0x5cff87(0x1de)){const _0x4236b8=_0x459cbb(_0x59ac76['$1'])||0x0,_0x408075=this[_0x5cff87(0x33f)](_0xf35d63),_0x1091bd=_0x408075['x']+_0x2984b5[_0x5cff87(0x24e)]((_0x408075[_0x5cff87(0x506)]-_0xc000d8[_0x5cff87(0x3d3)])/0x2),_0x574f74=_0x408075['y']+(_0x408075[_0x5cff87(0xb1)]-_0x1dfdcb[_0x5cff87(0x40f)])/0x2;this[_0x5cff87(0x42d)](_0x4236b8,_0x1091bd,_0x574f74);}else _0x519f41+=_0x5cff87(0x139)['format'](this[_0x5cff87(0xa9)]['selfTP']);}else{if(_0x5cff87(0x2ff)===_0x5cff87(0x2ff))_0x519f41+='%1'[_0x5cff87(0x474)](this[_0x5cff87(0xa9)][_0x5cff87(0x80)]);else{if(!_0x43496e[_0x5cff87(0x33d)]())return;const _0x104e02=_0x5e5038[_0x5cff87(0x16c)][_0x5cff87(0x471)][_0x5cff87(0x14f)];_0x104e02[_0x5cff87(0x2c3)]&&_0x543d20[_0x5cff87(0x4f7)](_0x104e02[_0x5cff87(0x2c3)],![]),_0x104e02[_0x5cff87(0x31d)]&&_0x511f99['setValue'](_0x104e02[_0x5cff87(0x31d)],![]);}}return _0x519f41;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x20d)]=function(_0x1bad42,_0x1fe9f8,_0x4b9066){const _0x23c3ac=_0x4222e9,_0x1122ee=_0x23c3ac(0x1cc);if(this['_itemData'][_0x23c3ac(0x28a)]>=0x0&&this[_0x23c3ac(0xa9)]['flatHP']>=0x0&&!this[_0x23c3ac(0x13a)][_0x1122ee])return![];const _0xe7be03=this['getItemEffectsHpDamageLabel']();this[_0x23c3ac(0x1f4)](_0xe7be03,_0x1bad42,_0x1fe9f8,_0x4b9066,!![]);const _0x31fb35=this[_0x23c3ac(0xe6)]();return this[_0x23c3ac(0x1e5)](ColorManager['damageColor'](0x0)),this[_0x23c3ac(0x1f4)](_0x31fb35,_0x1bad42,_0x1fe9f8,_0x4b9066,![],'right'),this[_0x23c3ac(0xe0)](_0x1bad42,_0x1fe9f8,_0x4b9066),this[_0x23c3ac(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsHpDamageLabel']=function(){const _0x3e7f67=_0x4222e9,_0x4a7758=VisuMZ[_0x3e7f67(0x16c)][_0x3e7f67(0x471)][_0x3e7f67(0x246)][_0x3e7f67(0x31b)];return _0x4a7758[_0x3e7f67(0x474)](TextManager['hp']);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0xe6)]=function(){const _0x5b951c=_0x4222e9,_0x2ecc97=_0x5b951c(0x1cc);if(this[_0x5b951c(0x13a)][_0x2ecc97])return this[_0x5b951c(0x13a)][_0x2ecc97];let _0x254179='';if(this[_0x5b951c(0xa9)][_0x5b951c(0x28a)]<0x0)_0x254179+='%1%'[_0x5b951c(0x474)](Math['floor'](this[_0x5b951c(0xa9)]['rateHP']*0x64));if(this[_0x5b951c(0xa9)][_0x5b951c(0x28a)]<0x0&&this[_0x5b951c(0xa9)][_0x5b951c(0x47c)]<0x0)_0x254179+='\x20';if(this[_0x5b951c(0xa9)][_0x5b951c(0x47c)]<0x0)_0x254179+='%1'['format'](this['_itemData'][_0x5b951c(0x47c)]);return _0x254179;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x1e1)]=function(_0x11d4d0,_0x48239a,_0x14a8cb){const _0x1fbd2d=_0x4222e9,_0x264f10=_0x1fbd2d(0x388);if(this[_0x1fbd2d(0xa9)]['rateMP']>=0x0&&this[_0x1fbd2d(0xa9)][_0x1fbd2d(0x3a2)]>=0x0&&!this[_0x1fbd2d(0x13a)][_0x264f10])return![];const _0x2c1c86=this[_0x1fbd2d(0xa5)]();this[_0x1fbd2d(0x1f4)](_0x2c1c86,_0x11d4d0,_0x48239a,_0x14a8cb,!![]);const _0x238f9=this[_0x1fbd2d(0x2c2)]();return this[_0x1fbd2d(0x1e5)](ColorManager[_0x1fbd2d(0x23e)](0x2)),this[_0x1fbd2d(0x1f4)](_0x238f9,_0x11d4d0,_0x48239a,_0x14a8cb,![],_0x1fbd2d(0x3e1)),this['drawItemDarkRect'](_0x11d4d0,_0x48239a,_0x14a8cb),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsMpDamageLabel']=function(){const _0x2fa576=_0x4222e9,_0x1d682a=VisuMZ[_0x2fa576(0x16c)][_0x2fa576(0x471)][_0x2fa576(0x246)]['LabelDamageMP'];return _0x1d682a[_0x2fa576(0x474)](TextManager['mp']);},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2c2)]=function(){const _0x5ee59c=_0x4222e9,_0x2e36e0=_0x5ee59c(0x388);if(this[_0x5ee59c(0x13a)][_0x2e36e0])return this['_customItemInfo'][_0x2e36e0];let _0x1e93d8='';if(this[_0x5ee59c(0xa9)][_0x5ee59c(0x458)]<0x0)_0x1e93d8+=_0x5ee59c(0x2cc)[_0x5ee59c(0x474)](Math[_0x5ee59c(0x24e)](this[_0x5ee59c(0xa9)][_0x5ee59c(0x458)]*0x64));if(this['_itemData'][_0x5ee59c(0x458)]<0x0&&this[_0x5ee59c(0xa9)][_0x5ee59c(0x3a2)]<0x0)_0x1e93d8+='\x20';if(this[_0x5ee59c(0xa9)][_0x5ee59c(0x3a2)]<0x0)_0x1e93d8+='%1'['format'](this[_0x5ee59c(0xa9)][_0x5ee59c(0x3a2)]);return _0x1e93d8;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x159)]=function(_0x5686e6,_0x119b1c,_0xcaad95){const _0x152efd=_0x4222e9,_0x49a281=_0x152efd(0xbe);if(this[_0x152efd(0xa9)][_0x152efd(0x3d5)]>=0x0&&!this['_customItemInfo'][_0x49a281])return![];const _0x1b1640=this[_0x152efd(0x16b)]();this[_0x152efd(0x1f4)](_0x1b1640,_0x5686e6,_0x119b1c,_0xcaad95,!![]);const _0x1f53d0=this['getItemEffectsTpDamageText']();return this['changeTextColor'](ColorManager[_0x152efd(0x85)]()),this[_0x152efd(0x1f4)](_0x1f53d0,_0x5686e6,_0x119b1c,_0xcaad95,![],_0x152efd(0x3e1)),this[_0x152efd(0xe0)](_0x5686e6,_0x119b1c,_0xcaad95),this[_0x152efd(0x4ef)](),!![];},Window_ShopStatus['prototype']['getItemEffectsTpDamageLabel']=function(){const _0x5b0b7e=_0x4222e9,_0x3b89ae=VisuMZ[_0x5b0b7e(0x16c)]['Settings']['StatusWindow'][_0x5b0b7e(0x4b8)];return _0x3b89ae['format'](TextManager['tp']);},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsTpDamageText']=function(){const _0x227dd7=_0x4222e9,_0x32eda4=_0x227dd7(0xbe);if(this[_0x227dd7(0x13a)][_0x32eda4])return this[_0x227dd7(0x13a)][_0x32eda4];let _0x4664b4='';return _0x4664b4+='%1'[_0x227dd7(0x474)](this[_0x227dd7(0xa9)][_0x227dd7(0x3d5)]),_0x4664b4;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x2a3)]=function(_0x381a51,_0x2005f0,_0x3c6f22){const _0xccbab3=_0x4222e9,_0x4aca69=_0xccbab3(0x2d7);if(!this['_itemData']['addStateBuffChanges']&&!this[_0xccbab3(0x13a)][_0x4aca69])return![];const _0x57983f=this[_0xccbab3(0x124)]();this[_0xccbab3(0x1f4)](_0x57983f,_0x381a51,_0x2005f0,_0x3c6f22,!![]);const _0x4d6981=this[_0xccbab3(0x81)]();return this[_0xccbab3(0x1f4)](_0x4d6981,_0x381a51,_0x2005f0,_0x3c6f22,![],_0xccbab3(0x3e1)),this['drawItemDarkRect'](_0x381a51,_0x2005f0,_0x3c6f22),this[_0xccbab3(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x124)]=function(){const _0x1a96b9=_0x4222e9;return VisuMZ[_0x1a96b9(0x16c)][_0x1a96b9(0x471)][_0x1a96b9(0x246)][_0x1a96b9(0x1f3)];},Window_ShopStatus['prototype'][_0x4222e9(0x81)]=function(){const _0x2fc5b5=_0x4222e9,_0x253744='ADDED\x20EFFECTS';if(this[_0x2fc5b5(0x13a)][_0x253744])return this[_0x2fc5b5(0x13a)][_0x253744];let _0x4c7318='',_0x307cab=0x0;const _0x496390=0x8;for(const _0x1dcf58 of this[_0x2fc5b5(0xa9)][_0x2fc5b5(0x161)]){const _0x3c31cb=$dataStates[_0x1dcf58];if(_0x3c31cb&&_0x3c31cb[_0x2fc5b5(0x1a0)]>0x0){_0x4c7318+=_0x2fc5b5(0x3a8)[_0x2fc5b5(0x474)](_0x3c31cb['iconIndex']),_0x307cab++;if(_0x307cab>=_0x496390)return _0x4c7318;}}for(let _0x510011=0x0;_0x510011<this[_0x2fc5b5(0xa9)][_0x2fc5b5(0xf9)]['length'];_0x510011++){if(_0x2fc5b5(0x131)!=='jaQTj'){const _0x4d9b9c=this[_0x2fc5b5(0xa9)][_0x2fc5b5(0xf9)][_0x510011],_0x47ccf6=Game_BattlerBase[_0x2fc5b5(0x3f5)]['buffIconIndex'](_0x4d9b9c,_0x510011);if(_0x47ccf6>0x0){if(_0x2fc5b5(0x241)!==_0x2fc5b5(0x241))_0x548bf3[_0x2fc5b5(0x16c)][_0x2fc5b5(0x1c2)][_0x2fc5b5(0x37b)](this),this[_0x2fc5b5(0x3b8)]()&&this[_0x2fc5b5(0x453)]();else{_0x4c7318+=_0x2fc5b5(0x3a8)[_0x2fc5b5(0x474)](_0x47ccf6),_0x307cab++;if(_0x307cab>=_0x496390)return _0x4c7318;}}}else _0x3d7cda[_0x2fc5b5(0x16c)]['Scene_Shop_createSellWindow'][_0x2fc5b5(0x37b)](this),this[_0x2fc5b5(0x1fa)]()&&this[_0x2fc5b5(0x1d4)]();}return _0x4c7318;},Window_ShopStatus[_0x4222e9(0x3f5)]['drawItemEffectsRemovedStatesBuffs']=function(_0x26acba,_0x50425a,_0xc9c13f){const _0x3571f0=_0x4222e9,_0x12fd81=_0x3571f0(0x459);if(!this[_0x3571f0(0xa9)][_0x3571f0(0xc9)]&&!this[_0x3571f0(0x13a)][_0x12fd81])return![];const _0x4b7d08=this[_0x3571f0(0x26b)]();this['drawItemKeyData'](_0x4b7d08,_0x26acba,_0x50425a,_0xc9c13f,!![]);const _0x406dc9=this[_0x3571f0(0x15c)]();return this[_0x3571f0(0x1f4)](_0x406dc9,_0x26acba,_0x50425a,_0xc9c13f,![],_0x3571f0(0x3e1)),this['drawItemDarkRect'](_0x26acba,_0x50425a,_0xc9c13f),this[_0x3571f0(0x4ef)](),!![];},Window_ShopStatus[_0x4222e9(0x3f5)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x589480=_0x4222e9;return VisuMZ['ItemsEquipsCore'][_0x589480(0x471)][_0x589480(0x246)][_0x589480(0x3ab)];},Window_ShopStatus['prototype'][_0x4222e9(0x15c)]=function(){const _0x5e341e=_0x4222e9,_0xb580a8=_0x5e341e(0x459);if(this['_customItemInfo'][_0xb580a8])return this[_0x5e341e(0x13a)][_0xb580a8];let _0x1db990='',_0x1e24d3=0x0;const _0x5c0ba5=VisuMZ[_0x5e341e(0x16c)][_0x5e341e(0x471)]['StatusWindow']['MaxIcons'];for(const _0x2acbf6 of this[_0x5e341e(0xa9)][_0x5e341e(0x185)]){const _0x1645b0=$dataStates[_0x2acbf6];if(_0x1645b0&&_0x1645b0[_0x5e341e(0x1a0)]>0x0){_0x1db990+=_0x5e341e(0x3a8)[_0x5e341e(0x474)](_0x1645b0[_0x5e341e(0x1a0)]),_0x1e24d3++;if(_0x1e24d3>=_0x5c0ba5)return _0x1db990;}}for(let _0x145115=0x0;_0x145115<this[_0x5e341e(0xa9)][_0x5e341e(0x433)][_0x5e341e(0x1ae)];_0x145115++){const _0x1ddaf9=Game_BattlerBase[_0x5e341e(0x3f5)][_0x5e341e(0x3fa)](0x1,_0x145115);if(_0x1ddaf9>0x0){_0x1db990+=_0x5e341e(0x3a8)[_0x5e341e(0x474)](_0x1ddaf9),_0x1e24d3++;if(_0x1e24d3>=_0x5c0ba5)return _0x1db990;}}for(let _0x37a64c=0x0;_0x37a64c<this[_0x5e341e(0xa9)]['removeDebuff']['length'];_0x37a64c++){const _0x321a60=Game_BattlerBase[_0x5e341e(0x3f5)][_0x5e341e(0x3fa)](-0x1,_0x37a64c);if(_0x321a60>0x0){_0x1db990+='\x5cI[%1]'[_0x5e341e(0x474)](_0x321a60),_0x1e24d3++;if(_0x1e24d3>=_0x5c0ba5)return _0x1db990;}}return _0x1db990;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x48b)]=function(_0x2e7a3f,_0x31d9bd,_0x49eaf8){const _0xa92dff=_0x4222e9;if(this[_0xa92dff(0x106)][_0xa92dff(0x223)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x429902=String(RegExp['$1'])[_0xa92dff(0x3cb)](/[\r\n]+/);for(const _0x4a58f1 of _0x429902){if(_0x4a58f1[_0xa92dff(0x1cf)](/(.*):[ ](.*)/i)){const _0x301b3c=String(RegExp['$1'])[_0xa92dff(0x277)](),_0x174194=String(RegExp['$2'])[_0xa92dff(0x277)]();this[_0xa92dff(0x191)](_0x301b3c,_0x174194,_0x2e7a3f,_0x31d9bd,_0x49eaf8),_0x31d9bd+=this[_0xa92dff(0x39a)]();}}}return this[_0xa92dff(0x4ef)](),_0x31d9bd;},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x191)]=function(_0x41d784,_0xa65ede,_0x51f4ff,_0x5b58de,_0x435331){const _0x429dd3=_0x4222e9;this['drawItemKeyData'](_0x41d784,_0x51f4ff,_0x5b58de,_0x435331,!![]),this[_0x429dd3(0x1f4)](_0xa65ede,_0x51f4ff,_0x5b58de,_0x435331,![],_0x429dd3(0x3e1)),this['drawItemDarkRect'](_0x51f4ff,_0x5b58de,_0x435331),this[_0x429dd3(0x4ef)]();},Window_ShopStatus[_0x4222e9(0x3f5)][_0x4222e9(0x244)]=function(){const _0x5ad77a=_0x4222e9;if(!this[_0x5ad77a(0x106)])return;const _0x4125b4=this[_0x5ad77a(0x106)]['note'],_0xf04324=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x10026d=_0x4125b4[_0x5ad77a(0x1cf)](_0xf04324);if(_0x10026d)for(const _0x304175 of _0x10026d){if(_0x5ad77a(0x336)!==_0x5ad77a(0x336))return _0x450371[_0x5ad77a(0x16c)][_0x5ad77a(0x471)][_0x5ad77a(0x14f)][_0x5ad77a(0x20c)];else{_0x304175[_0x5ad77a(0x1cf)](_0xf04324);const _0x88b95e=String(RegExp['$1'])[_0x5ad77a(0x277)]()||'';if(_0x88b95e==='')continue;const _0x3b434a=ImageManager['loadPicture'](_0x88b95e);_0x3b434a['addLoadListener'](this[_0x5ad77a(0x217)][_0x5ad77a(0x16e)](this,_0x3b434a,this[_0x5ad77a(0x106)]));}}},Window_ShopStatus['prototype']['drawCustomShopGraphicLoad']=function(_0x5d08f9,_0x154b32){const _0x193d20=_0x4222e9;if(this[_0x193d20(0x106)]!==_0x154b32)return;if(!_0x5d08f9)return;if(_0x5d08f9[_0x193d20(0x506)]<=0x0||_0x5d08f9['height']<=0x0)return;const _0x25cd72=_0x154b32[_0x193d20(0x223)];let _0x56401d=_0x193d20(0x492);if(_0x25cd72['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)){if(_0x193d20(0x3bd)===_0x193d20(0x3bd))_0x56401d='foreground';else{!_0xea87fc&&this[_0x193d20(0x2ae)](null,_0x3e49e5);if(!this[_0x193d20(0x475)]){const _0x14e481=_0x164ea0['makeDeepCopy'](this);_0x14e481['_tempActor']=!![],this['_equips'][_0x361f15][_0x193d20(0x44c)](null),this[_0x193d20(0x333)]=!![],this[_0x193d20(0x438)](_0x14e481),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=_0x5c10d9;}else this[_0x193d20(0xc4)][_0x182728][_0x193d20(0x44c)](null);_0x25748b=!![];}}const _0x843f9b=_0x56401d==='background'?this['contentsBack']:this[_0x193d20(0x412)];let _0x182a31=this[_0x193d20(0x184)],_0x4b6b59=this['innerHeight'];_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x182a31=Number(RegExp['$1']));if(_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)){if(_0x193d20(0x451)!=='LOqSC')_0x4b6b59=Number(RegExp['$1']);else{const _0x253b3a=this[_0x193d20(0x2bd)]();for(let _0x152088=0x0;_0x152088<_0x253b3a[_0x193d20(0x1ae)];_0x152088++){if(!this[_0x193d20(0xc4)][_0x152088])this['_equips'][_0x152088]=new _0x26b3d5();}this[_0x193d20(0xb5)](![]),this[_0x193d20(0x49d)]();}}_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x182a31=Number(RegExp['$1']),_0x4b6b59=Number(RegExp['$2']));const _0x54f638=Math['min'](0x1,_0x182a31/_0x5d08f9[_0x193d20(0x506)],_0x4b6b59/_0x5d08f9[_0x193d20(0xb1)]);let _0xe290fe=0x0,_0x206297=0x0,_0x41965f=Math['floor'](_0x5d08f9[_0x193d20(0x506)]*_0x54f638),_0x58175b=Math[_0x193d20(0x24e)](_0x5d08f9[_0x193d20(0xb1)]*_0x54f638),_0xe6d9a2='center';_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0xe6d9a2=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0xe6d9a2===_0x193d20(0xd5))_0xe290fe=0x0;else{if(_0xe6d9a2==='center')_0xe290fe=Math[_0x193d20(0x446)]((this[_0x193d20(0x184)]-_0x41965f)/0x2);else{if(_0x193d20(0x1eb)!==_0x193d20(0x30c))_0xe290fe=this[_0x193d20(0x184)]-_0x41965f;else{const _0x437058=this['itemLineRect'](this[_0x193d20(0x1d6)]());let _0x5ee105=this[_0x193d20(0x434)](this[_0x193d20(0x1d6)]());_0x5ee105=_0x5ee105[_0x193d20(0x89)](/\\I\[(\d+)\]/gi,''),_0x222659[_0x193d20(0x4ef)](),this['commandNameWindowDrawBackground'](_0x5ee105,_0x437058),this[_0x193d20(0x25c)](_0x5ee105,_0x437058),this['commandNameWindowCenter'](_0x5ee105,_0x437058);}}}let _0x121226=_0x193d20(0x46a);_0x25cd72['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x121226=String(RegExp['$1'])[_0x193d20(0x1b6)]()['trim']());if(_0x121226===_0x193d20(0x280)){if(_0x193d20(0x334)!==_0x193d20(0x4d2))_0x206297=0x0;else{const _0x114c9e=_0x1fe535[_0x193d20(0x18d)][_0x193d20(0x3fb)](_0x54302c['trim']());if(_0x114c9e>0x0)_0x1a1fce[_0x193d20(0x2bd)]['push'](_0x114c9e);}}else _0x121226===_0x193d20(0x46a)?_0x206297=Math[_0x193d20(0x446)]((this[_0x193d20(0x284)]-_0x58175b)/0x2):_0x206297=this[_0x193d20(0x284)]-_0x58175b;if(_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)){if('chFaj'!=='nAdXv')_0xe290fe+=Number(RegExp['$1']);else{_0xe96101[_0x193d20(0x267)]?(_0x326c30=this[_0x193d20(0x407)]['paramValueByName'](_0x83199f,![]),_0x1715eb=this[_0x193d20(0x475)]['paramValueByName'](_0x427335,![]),_0x191268=this['_tempActor'][_0x193d20(0xeb)](_0x34c28a,!![])):(_0x163b86=this[_0x193d20(0x407)][_0x193d20(0xa0)](_0x1faad2),_0x1ed16c=this[_0x193d20(0x475)][_0x193d20(0xa0)](_0x148ccd),_0x49961e=this['_tempActor']['param'](_0x520726));const _0x1097ae=_0x393104,_0x5f58e3=_0x59c84f;_0x13c4ed=_0x5f58e3-_0x1097ae,this[_0x193d20(0x1e5)](_0x472b14['paramchangeTextColor'](_0x55e316)),this['drawText'](_0x5109a8,_0x3f604a,_0x1166ad,_0x3466ac-_0x2d103d,_0x193d20(0x3e1));}}_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x206297+=Number(RegExp['$1']));_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0xe290fe+=Number(RegExp['$1']),_0x206297+=Number(RegExp['$2']));let _0x1636ad=0xff;if(_0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x1636ad=Number(RegExp['$1']);else _0x25cd72[_0x193d20(0x1cf)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x1636ad=Math[_0x193d20(0x446)](Number(RegExp['$1'])*0.01*0xff)[_0x193d20(0x469)](0x0,0xff));_0x843f9b['paintOpacity']=_0x1636ad,_0x843f9b[_0x193d20(0x3f9)](_0x5d08f9,0x0,0x0,_0x5d08f9[_0x193d20(0x506)],_0x5d08f9[_0x193d20(0xb1)],_0xe290fe,_0x206297,_0x41965f,_0x58175b),_0x843f9b['paintOpacity']=0xff;};