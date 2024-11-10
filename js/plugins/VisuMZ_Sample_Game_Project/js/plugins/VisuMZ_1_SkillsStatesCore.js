//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.27] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x244f65=_0x158c;function _0x47be(){const _0x5abecf=['skillVisibleJS','Window_SkillStatus_refresh','_stateData','groupDefeat','stateMaximumTurns','sort','stateMpSlipHealJS','_hidden','commandStyleCheck','hide','meetsPassiveStateConditionClasses','addPassiveStates','isBuffAffected','buffColor','getStateOriginByKey','Parse_Notetags_State_ApplyRemoveLeaveJS','ActionEndUpdate','meetsPassiveStateConditionJS','traitsSet','skillCostSeparator','item','normalColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawActorStateTurns','canClearState','onEraseBuff','itemTextAlign','drawExtendedSkillsStatesCoreStatus','removeBuff','autoRemovalTiming','none','reset','makeResistedStateCategories','stateHpSlipDamageJS','rgba(0,\x200,\x200,\x201)','itemWindowRectSkillsStatesCore','ColorNegative','Game_Actor_learnSkill','Game_BattlerBase_skillMpCost','SkillSceneStatusBgType','states','icon','addStateTurns','isStateRestrict','initMembers','keys','Game_BattlerBase_skillTpCost','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','_checkingVisuMzPassiveStateObjects','statusWidth','_classIDs','clearStates','statesByCategory','prototype','_turnDisplaySprite','drawItemStyleIconText','NUM','isAllDead','Parse_Notetags_Skill_Cost','createTurnDisplaySprite','exit','<troop-%1>','removeStatesAuto','add','format','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Buffs','onExpireDebuffJS','_stored_buffColor','replace','_skillIDs','shift','NEGATIVE','canPaySkillCost','updateStateTurns','applyBuffTurnManipulationEffects','GaugeCurrentJS','increaseBuff','CheckVisibleSkillNotetags','ARRAYSTR','GaugeMaxJS','isPlaytest','SkillSceneAdjustSkillList','_result','forgetSkill','Game_BattlerBase_buffIconIndex','_actor','scrollTo','_cache','Window_SkillList_includes','colSpacing','_subject','createPassiveStatesCache','6xJNqVE','initMembersSkillsStatesCore','commandStyle','heal','name','process_VisuMZ_SkillsStatesCore_Notetags','_lastStatesActionEndFrameCount','slice','makeSuccess','onAddBuffJS','LayoutStyle','MultiplierJS','Game_Action_testApply','onAddDebuffGlobalJS','currentMaxValue','clear','user','Parse_Notetags_Skill_JS','Game_BattlerBase_overwriteBuffTurns','maxSlipDamage','updateTurnDisplaySprite','ParseStateNotetags','recalculateSlipDamageJS','changeTextColor','_colorCache','skills','iconHeight','setActor','drawSkillCost','mainCommandWidth','Game_Battler_isStateAddable','skillTypes','#%1','isBuffExpired','ATK','Game_Troop_setup','isBottomHelpMode','<member-%1>','onEraseStateCustomJS','setup','buffLength','_phase','fontFace','_skillTypeWindow','Scene_Skill_statusWindowRect','length','setStateTurns','changePaintOpacity','redrawSkillsStatesCore','convertTargetToStateOriginKey','drawExtendedParameter','textSizeEx','magicSkills','getStypeIdWithName','AGI','IconStypeNorm','drawActorIcons','ReapplyRules','makeCurrentTroopUniqueID','clamp','_costSettings','useDigitGrouping','476823LEYQYV','_tempBattler','meetsSkillConditionsGlobalJS','onExpireBuff','placeExactGauge','parameters','priority','_categoryWindow','getStateData','getSkillTypes','VisuMZ_2_ClassChangeSystem','ConvertParams','isSkillCostShown','endAction','Window_StatusBase_drawActorIcons','hasState','6588008knepeu','PayJS','setupSkillsStatesCore','_checkingTraitsSetSkillsStatesCore','process_VisuMZ_SkillsStatesCore_State_Notetags','Window_SkillType_initialize','%1\x20%2\x20%3','_checkingPassiveStates','_commandNameWindow','buttonAssistSwitch','toUpperCase','removeState','checkSkillTypeMatch','isStateExpired','decreaseBuff','meetsStateCondition','TurnOffsetX','VisuMZ_1_MainMenuCore','isUseSkillsStatesCoreUpdatedLayout','_stateRetainType','isLearnedSkill','Game_Battler_regenerateAll','map','setItem','helpWindowRectSkillsStatesCore','SkillMenuStatusRect','DataOffsetX','Game_Action_applyItemUserEffect','bitmap','ARRAYEVAL','outlineColor','trim','alterSkillName','stateTpSlipHealJS','isAlive','isStateResist','log','Name','removeBuffsAuto','MaxTurns','updateFrame','Sprite_Gauge_redraw','VisuMZ_0_CoreEngine','updateCommandNameWindow','StackDebuffMax','Game_BattlerBase_isStateResist','ARRAYJSON','indexOf','ParseSkillNotetags','Parse_Notetags_State_PassiveJS','MAT','onAddStateGlobalJS','Parse_Notetags_State_Category','_stateDisplay','inBattle','addDebuff','9eYlulS','clearStatesWithStateRetain','iconIndex','meetsPassiveStateGlobalConditionJS','fontSize','skillMpCost','Game_BattlerBase_meetsSkillConditions','stateColor','GaugeDrawJS','getCurrentStateActiveUser','Scene_Boot_onDatabaseLoaded','applySkillsStatesCoreEffects','die','createItemWindow','recoverAll','itemLineRect','commandNameWindowDrawText','8232760AauKAl','itemAt','onExpireBuffJS','success','getStateReapplyRulings','createCommandNameWindow','Window_SkillList_drawItem','addWindow','applyStateTurnManipulationEffects','updateHelp','addBuff','DataFontSize','ColorNeutral','CalcJS','isBuffOrDebuffAffected','contents','fontBold','_itemWindow','action','ceil','testSkillStatesCoreNotetags','ShowData','getStateIdWithName','Costs','call','getStateRetainType','TurnFontSize','damage','checkSkillConditionsNotetags','initialize','slipTp','_stateOrigin','Game_BattlerBase_eraseBuff','passiveStates','TurnEndOnMap','ColorDebuff','resetStateCounts','_statusWindow','includesSkillsStatesCore','uiHelpPosition','addCommand','onExpireDebuff','checkCacheKey','makeCommandName','Game_BattlerBase_resetStateCounts','applyItemUserEffect','placeGauge','isMaxBuffAffected','enemy','currentMaxValueSkillsStatesCore','callUpdateHelp','passiveStateObjects','canUse','onAddBuff','addState','6562026ptSxtq','recover\x20all','paySkillCost','Window_SkillList_maxCols','hasStateCategory','resetTextColor','push','isStateAddable','DisplayedParams','stateTpSlipDamageJS','skillId','skillEnableJS','center','auto','Scene_Skill_createItemWindow','tpCost','commandNameWindowDrawBackground','isMaxDebuffAffected','meetsSkillConditions','onRegenerateCustomStateDamageOverTime','meetsPassiveStateConditions','addBuffTurns','EVAL','PassiveStates','_stypeId','getSkillIdWithName','setStateRetainType','death','createSkillCostText','active','ARRAYSTRUCT','ALL','addPassiveStatesTraitSets','onAddStateMakeCustomSlipValues','stateId','Window_StatusBase_placeGauge','return\x200','totalStateCategory','onEraseBuffJS','innerWidth','Game_BattlerBase_eraseState','actor','resetFontSettings','uiMenuStyle','_animationIndex','gaugeBackColor','gainHp','addDebuffTurns','applyDebuffTurnManipulationEffects','regenerateAllSkillsStatesCore','Sprite_Gauge_gaugeRate','onRemoveState','ColorPositive','DEF','adjustItemWidthByShopStatus','Sprite_StateIcon_loadBitmap','isGroupDefeatStateAffected','<actor-%1>','totalStateCategoryAffected','convertPassiveStates','drawActorStateData','Sprite_Gauge_initMembers','includes','isUseModernControls','Game_BattlerBase_die','_shopStatusWindow','JSON','onExpireStateCustomJS','Scene_Skill_skillTypeWindowRect','Game_Battler_addDebuff','skillTpCost','_buffs','stateEraseJS','clearStateData','Game_BattlerBase_decreaseBuff','MAXHP','Enemy','MDF','stateAddJS','meetsSkillConditionsEnableJS','onAddStateJS','onAddStateCustomJS','buff','DataOffsetY','TurnOffsetY','convertGaugeTypeSkillsStatesCore','SkillConditionJS','commandName','currentDisplayedValue','_stateTurns','hasSkill','VisuMZ_1_ElementStatusCore','onExpireDebuffGlobalJS','right','multiclasses','Skills','concat','BattleHiddenSkillTypes','learnSkill','drawParamText','Settings','applyStateCategoryRemovalEffects','BattleManager_endAction','maxItems','meetsPassiveStateConditionSwitches','stateExpireJS','getClassIdWithName','greater','shopStatusWidth','updateVisibility','Game_Actor_skillTypes','LUK','testApply','clearStateRetainType','drawActorBuffTurns','max','onEraseBuffGlobalJS','ShowTurns','checkShowHideJS','_states','helpWindowRect','number','ParseAllNotetags','parse','updatedLayoutStyle','isStateAffected','ANY','eraseBuff','allIcons','_stateIDs','makeCommandList','drawActorIconsAllTurnCounters','_scene','getColor','ShowShopStatus','anchor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','split','stateHpSlipHealJS','stateMpSlipDamageJS','currentClass','iconText','getStateDisplay','onEraseStateJS','getCurrentStateOriginKey','isDebuffAffected','_skills','_stateMaxTurns','setBuffTurns','stateData','Game_BattlerBase_increaseBuff','_tempActor','helpAreaTop','redraw','getCurrentTroopUniqueID','onAddBuffGlobalJS','isPartyAllAffectedByGroupDefeatStates','categories','Game_Battler_addState','usableSkills','traitObjects','Game_BattlerBase_recoverAll','onAddDebuff','stypeId','Game_BattlerBase_clearStates','windowPadding','buffIconIndex','updateStatesActionEnd','makeAdditionalSkillCostText','calcWindowHeight','createShopStatusWindow','ShowJS','drawActorBuffRates','mainAreaTop','_stypeIDs','Scene_Skill_itemWindowRect','textColor','currentValue','aliveMembers','skill','Scene_Skill_helpWindowRect','drawText','_stored_state-%1-color','onEraseDebuff','value','Game_Unit_isAllDead','STR','slipHp','opacity','_currentActor','statePassiveConditionJS','process_VisuMZ_SkillsStatesCore_Skill_Notetags','isSkillTypeMatchForUse','shopStatusWindowRect','restriction','toLowerCase','EnableLayout','text','SkillsStatesCore','constructor','createAllSkillCostText','CmdTextAlign','slipMp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','MAXMP','_battler','height','addChild','eraseState','Actor','shopStatusWindowRectSkillsStatesCore','setDebuffTurns','_stateSteps','Window_SkillList_updateHelp','setStateData','STRUCT','statusWindowRect','width','gaugeRate','addPassiveStatesFromOtherPlugins','drawItem','Param','POSITIVE','description','debuffColor','enemyId','isPassiveStateStackable','paramBuffRate','currentValueSkillsStatesCore','frameCount','loadBitmap','onExpireState','overwriteBuffTurns','stateCategoriesResisted','6188987JfwJmN','stateTurns','isRightInputMode','Game_BattlerBase_refresh','mainAreaHeight','index','CheckVisibleBattleNotetags','statusWindowRectSkillsStatesCore','onEraseDebuffJS','note','onExpireBuffGlobalJS','buffTurns','changeOutlineColor','States','uiInputPosition','itemWindowRect','1195504qXTevt','isSkillHidden','_passiveStateResults','isCommandEnabled','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','addPassiveStatesByNotetag','gaugeLineHeight','Game_Battler_addBuff','onEraseDebuffGlobalJS','debuffTurns','StackBuffMax','drawTextEx','isActor','gradientFillRect','onAddState','_buffTurns','Parse_Notetags_State_SlipEffectJS','<enemy-%1>','isSkillUsableForAutoBattle','\x5cI[%1]%2','Sprite_StateIcon_updateFrame','boxWidth','checkSkillConditionsSwitchNotetags','mpCost','CheckVisibleSwitchNotetags','_currentTroopUniqueID','mainFontFace','Sprite_Gauge_currentValue','onEraseStateGlobalJS','onExpireStateGlobalJS','Sprite_Gauge_currentMaxValue','iconWidth','checkShowHideNotetags','_stored_debuffColor','filter','6940296bWihko','refresh','ParseClassIDs','setPassiveStateSlipDamageJS','getColorDataFromPluginParameters','isStateCategoryAffected','clearStateOrigin','setStateOrigin','addPassiveStatesByPluginParameters','skillTypeWindowRectSkillsStatesCore','match','setStateDisplay','isStateRemoved','lineHeight','fillRect','drawFullGauge','regenerateAll','maxCols','status','floor'];_0x47be=function(){return _0x5abecf;};return _0x47be();}function _0x158c(_0x88ee27,_0x426458){const _0x47bec5=_0x47be();return _0x158c=function(_0x158c5c,_0x53ec80){_0x158c5c=_0x158c5c-0x16d;let _0x378ffe=_0x47bec5[_0x158c5c];return _0x378ffe;},_0x158c(_0x88ee27,_0x426458);}(function(_0x9efe35,_0x3cedc9){const _0x3cdcf4=_0x158c,_0x22996b=_0x9efe35();while(!![]){try{const _0x1728dc=parseInt(_0x3cdcf4(0x3bb))/0x1+-parseInt(_0x3cdcf4(0x2e9))/0x2*(-parseInt(_0x3cdcf4(0x37d))/0x3)+-parseInt(_0x3cdcf4(0x30c))/0x4+parseInt(_0x3cdcf4(0x1b8))/0x5+parseInt(_0x3cdcf4(0x1ef))/0x6+-parseInt(_0x3cdcf4(0x2d9))/0x7+parseInt(_0x3cdcf4(0x16f))/0x8*(-parseInt(_0x3cdcf4(0x1a7))/0x9);if(_0x1728dc===_0x3cedc9)break;else _0x22996b['push'](_0x22996b['shift']());}catch(_0x43f9e2){_0x22996b['push'](_0x22996b['shift']());}}}(_0x47be,0xecc6a));var label=_0x244f65(0x2b5),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x244f65(0x30b)](function(_0x33d5c){const _0x5cb7a1=_0x244f65;return _0x33d5c[_0x5cb7a1(0x31e)]&&_0x33d5c[_0x5cb7a1(0x2ce)][_0x5cb7a1(0x22d)]('['+label+']');})[0x0];VisuMZ[label][_0x244f65(0x253)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x244f65(0x3c6)]=function(_0x4cf7da,_0x256a7a){const _0x3e8ca3=_0x244f65;for(const _0xbdc2fc in _0x256a7a){if(_0xbdc2fc[_0x3e8ca3(0x316)](/(.*):(.*)/i)){const _0x39d47b=String(RegExp['$1']),_0x319926=String(RegExp['$2'])[_0x3e8ca3(0x179)]()[_0x3e8ca3(0x18e)]();let _0x521a6f,_0x303a20,_0x114fae;switch(_0x319926){case _0x3e8ca3(0x358):_0x521a6f=_0x256a7a[_0xbdc2fc]!==''?Number(_0x256a7a[_0xbdc2fc]):0x0;break;case'ARRAYNUM':_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON['parse'](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20[_0x3e8ca3(0x185)](_0x35f7b5=>Number(_0x35f7b5));break;case _0x3e8ca3(0x205):_0x521a6f=_0x256a7a[_0xbdc2fc]!==''?eval(_0x256a7a[_0xbdc2fc]):null;break;case _0x3e8ca3(0x18c):_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20[_0x3e8ca3(0x185)](_0x356a46=>eval(_0x356a46));break;case _0x3e8ca3(0x231):_0x521a6f=_0x256a7a[_0xbdc2fc]!==''?JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc]):'';break;case _0x3e8ca3(0x19d):_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20[_0x3e8ca3(0x185)](_0x13f718=>JSON[_0x3e8ca3(0x26a)](_0x13f718));break;case'FUNC':_0x521a6f=_0x256a7a[_0xbdc2fc]!==''?new Function(JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc])):new Function(_0x3e8ca3(0x213));break;case'ARRAYFUNC':_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20[_0x3e8ca3(0x185)](_0x4fd687=>new Function(JSON[_0x3e8ca3(0x26a)](_0x4fd687)));break;case _0x3e8ca3(0x2a9):_0x521a6f=_0x256a7a[_0xbdc2fc]!==''?String(_0x256a7a[_0xbdc2fc]):'';break;case _0x3e8ca3(0x36f):_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON[_0x3e8ca3(0x26a)](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20['map'](_0xf48410=>String(_0xf48410));break;case _0x3e8ca3(0x2c6):_0x114fae=_0x256a7a[_0xbdc2fc]!==''?JSON['parse'](_0x256a7a[_0xbdc2fc]):{},_0x4cf7da[_0x39d47b]={},VisuMZ['ConvertParams'](_0x4cf7da[_0x39d47b],_0x114fae);continue;case _0x3e8ca3(0x20d):_0x303a20=_0x256a7a[_0xbdc2fc]!==''?JSON['parse'](_0x256a7a[_0xbdc2fc]):[],_0x521a6f=_0x303a20['map'](_0x34beb9=>VisuMZ['ConvertParams']({},JSON[_0x3e8ca3(0x26a)](_0x34beb9)));break;default:continue;}_0x4cf7da[_0x39d47b]=_0x521a6f;}}return _0x4cf7da;},(_0x52f1d3=>{const _0x4ecbf1=_0x244f65,_0x252ab8=_0x52f1d3[_0x4ecbf1(0x381)];for(const _0xe65e8c of dependencies){if(!Imported[_0xe65e8c]){alert(_0x4ecbf1(0x336)[_0x4ecbf1(0x360)](_0x252ab8,_0xe65e8c)),SceneManager[_0x4ecbf1(0x35c)]();break;}}const _0x43f290=_0x52f1d3[_0x4ecbf1(0x2ce)];if(_0x43f290[_0x4ecbf1(0x316)](/\[Version[ ](.*?)\]/i)){const _0x15b4fe=Number(RegExp['$1']);_0x15b4fe!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4ecbf1(0x360)](_0x252ab8,_0x15b4fe)),SceneManager[_0x4ecbf1(0x35c)]());}if(_0x43f290[_0x4ecbf1(0x316)](/\[Tier[ ](\d+)\]/i)){const _0x33d793=Number(RegExp['$1']);_0x33d793<tier?(alert(_0x4ecbf1(0x277)[_0x4ecbf1(0x360)](_0x252ab8,_0x33d793,tier)),SceneManager[_0x4ecbf1(0x35c)]()):tier=Math[_0x4ecbf1(0x262)](_0x33d793,tier);}VisuMZ[_0x4ecbf1(0x3c6)](VisuMZ[label][_0x4ecbf1(0x253)],_0x52f1d3[_0x4ecbf1(0x3c0)]);})(pluginData),VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1b1)]=Scene_Boot[_0x244f65(0x355)]['onDatabaseLoaded'],Scene_Boot[_0x244f65(0x355)]['onDatabaseLoaded']=function(){const _0x376e56=_0x244f65;VisuMZ[_0x376e56(0x2b5)][_0x376e56(0x1b1)][_0x376e56(0x1d0)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x376e56(0x2b5)]['CheckIncompatibleStates']();},Scene_Boot[_0x244f65(0x355)][_0x244f65(0x382)]=function(){const _0x230f3f=_0x244f65;if(VisuMZ[_0x230f3f(0x269)])return;this[_0x230f3f(0x2ae)](),this[_0x230f3f(0x173)]();},Scene_Boot[_0x244f65(0x355)][_0x244f65(0x2ae)]=function(){const _0x4f7566=_0x244f65;for(const _0x5f76af of $dataSkills){if(!_0x5f76af)continue;VisuMZ[_0x4f7566(0x2b5)][_0x4f7566(0x35a)](_0x5f76af),VisuMZ[_0x4f7566(0x2b5)][_0x4f7566(0x38e)](_0x5f76af);}},Scene_Boot[_0x244f65(0x355)][_0x244f65(0x173)]=function(){const _0x43b3e5=_0x244f65;for(const _0x42270b of $dataStates){if(!_0x42270b)continue;VisuMZ[_0x43b3e5(0x2b5)]['Parse_Notetags_State_Category'](_0x42270b),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS'](_0x42270b),VisuMZ['SkillsStatesCore'][_0x43b3e5(0x2f9)](_0x42270b),VisuMZ[_0x43b3e5(0x2b5)][_0x43b3e5(0x32f)](_0x42270b);}},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x19f)]=VisuMZ[_0x244f65(0x19f)],VisuMZ[_0x244f65(0x19f)]=function(_0x578761){const _0x1a73ba=_0x244f65;VisuMZ[_0x1a73ba(0x2b5)]['ParseSkillNotetags'][_0x1a73ba(0x1d0)](this,_0x578761),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x578761),VisuMZ[_0x1a73ba(0x2b5)]['Parse_Notetags_Skill_JS'](_0x578761);},VisuMZ[_0x244f65(0x2b5)]['ParseStateNotetags']=VisuMZ[_0x244f65(0x392)],VisuMZ[_0x244f65(0x392)]=function(_0x1033d1){const _0x39a8f0=_0x244f65;VisuMZ[_0x39a8f0(0x2b5)][_0x39a8f0(0x392)]['call'](this,_0x1033d1),VisuMZ[_0x39a8f0(0x2b5)]['Parse_Notetags_State_Category'](_0x1033d1),VisuMZ[_0x39a8f0(0x2b5)][_0x39a8f0(0x1a0)](_0x1033d1),VisuMZ[_0x39a8f0(0x2b5)][_0x39a8f0(0x2f9)](_0x1033d1),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x1033d1);},VisuMZ[_0x244f65(0x2b5)]['Parse_Notetags_Skill_Cost']=function(_0x688f03){const _0x39128e=_0x244f65,_0xf733e3=_0x688f03[_0x39128e(0x2e2)];_0xf733e3[_0x39128e(0x316)](/<MP COST:[ ](\d+)>/i)&&(_0x688f03[_0x39128e(0x300)]=Number(RegExp['$1'])),_0xf733e3[_0x39128e(0x316)](/<TP COST:[ ](\d+)>/i)&&(_0x688f03[_0x39128e(0x1fe)]=Number(RegExp['$1']));},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1fa)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x320)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x38e)]=function(_0x4e26cb){const _0x5309f4=_0x244f65,_0x314e7d=_0x4e26cb['note'];if(_0x314e7d['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x1ed1b1=String(RegExp['$1']),_0x23348d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5309f4(0x360)](_0x1ed1b1);VisuMZ[_0x5309f4(0x2b5)]['skillEnableJS'][_0x4e26cb['id']]=new Function(_0x5309f4(0x2a2),_0x23348d);}if(_0x314e7d[_0x5309f4(0x316)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x3e355c=String(RegExp['$1']),_0x5b9c1d=_0x5309f4(0x361)[_0x5309f4(0x360)](_0x3e355c);VisuMZ[_0x5309f4(0x2b5)][_0x5309f4(0x320)][_0x4e26cb['id']]=new Function(_0x5309f4(0x2a2),_0x5b9c1d);}},VisuMZ['SkillsStatesCore'][_0x244f65(0x1a3)]=function(_0xc04eb8){const _0x4b03e4=_0x244f65;_0xc04eb8[_0x4b03e4(0x28c)]=[_0x4b03e4(0x20e),_0x4b03e4(0x26d)];const _0x4d589c=_0xc04eb8[_0x4b03e4(0x2e2)],_0xe06ab2=_0x4d589c[_0x4b03e4(0x316)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0xe06ab2)for(const _0x571b72 of _0xe06ab2){_0x571b72[_0x4b03e4(0x316)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2066cc=String(RegExp['$1'])[_0x4b03e4(0x179)]()[_0x4b03e4(0x18e)]()['split'](',');for(const _0x5cdeb2 of _0x2066cc){_0xc04eb8[_0x4b03e4(0x28c)][_0x4b03e4(0x1f5)](_0x5cdeb2['trim']());}}if(_0x4d589c[_0x4b03e4(0x316)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x11b002=RegExp['$1'][_0x4b03e4(0x278)](/[\r\n]+/);for(const _0x2aa118 of _0x11b002){_0xc04eb8[_0x4b03e4(0x28c)][_0x4b03e4(0x1f5)](_0x2aa118[_0x4b03e4(0x179)]()[_0x4b03e4(0x18e)]());}}_0x4d589c[_0x4b03e4(0x316)](/<POSITIVE STATE>/i)&&_0xc04eb8['categories']['push'](_0x4b03e4(0x2cd)),_0x4d589c[_0x4b03e4(0x316)](/<NEGATIVE STATE>/i)&&_0xc04eb8[_0x4b03e4(0x28c)][_0x4b03e4(0x1f5)](_0x4b03e4(0x368));},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x2ad)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1a0)]=function(_0x2f15dc){const _0x23a559=_0x244f65,_0x33641f=_0x2f15dc[_0x23a559(0x2e2)];if(_0x33641f[_0x23a559(0x316)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x1c3523=String(RegExp['$1']),_0x2609f9=_0x23a559(0x2ba)['format'](_0x1c3523);VisuMZ[_0x23a559(0x2b5)][_0x23a559(0x2ad)][_0x2f15dc['id']]=new Function('state',_0x2609f9);}},VisuMZ['SkillsStatesCore']['stateHpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0x244f65(0x279)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x27a)]={},VisuMZ['SkillsStatesCore'][_0x244f65(0x326)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1f8)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x190)]={},VisuMZ['SkillsStatesCore'][_0x244f65(0x2f9)]=function(_0x57619e){const _0x1758ab=_0x244f65,_0x3e6b75=_0x57619e['note'],_0x21443d=_0x1758ab(0x2ed);if(_0x3e6b75[_0x1758ab(0x316)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x1ad6d7=String(RegExp['$1']),_0x3028fb=_0x21443d[_0x1758ab(0x360)](_0x1ad6d7,_0x1758ab(0x1d3),-0x1,_0x1758ab(0x2aa));VisuMZ[_0x1758ab(0x2b5)][_0x1758ab(0x341)][_0x57619e['id']]=new Function(_0x1758ab(0x211),_0x3028fb);}else{if(_0x3e6b75['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x10394a=String(RegExp['$1']),_0x3d63d3=_0x21443d[_0x1758ab(0x360)](_0x10394a,_0x1758ab(0x380),0x1,_0x1758ab(0x2aa));VisuMZ[_0x1758ab(0x2b5)][_0x1758ab(0x279)][_0x57619e['id']]=new Function(_0x1758ab(0x211),_0x3d63d3);}}if(_0x3e6b75[_0x1758ab(0x316)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0xcee81e=String(RegExp['$1']),_0xdad68a=_0x21443d[_0x1758ab(0x360)](_0xcee81e,_0x1758ab(0x1d3),-0x1,_0x1758ab(0x2b9));VisuMZ[_0x1758ab(0x2b5)][_0x1758ab(0x27a)][_0x57619e['id']]=new Function('stateId',_0xdad68a);}else{if(_0x3e6b75[_0x1758ab(0x316)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x3f39fd=String(RegExp['$1']),_0x59e70f=_0x21443d['format'](_0x3f39fd,'heal',0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x1758ab(0x326)][_0x57619e['id']]=new Function(_0x1758ab(0x211),_0x59e70f);}}if(_0x3e6b75['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x19e7db=String(RegExp['$1']),_0x8b61c8=_0x21443d['format'](_0x19e7db,_0x1758ab(0x1d3),-0x1,_0x1758ab(0x1d6));VisuMZ[_0x1758ab(0x2b5)][_0x1758ab(0x1f8)][_0x57619e['id']]=new Function(_0x1758ab(0x211),_0x8b61c8);}else{if(_0x3e6b75[_0x1758ab(0x316)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x1602f2=String(RegExp['$1']),_0x286acc=_0x21443d[_0x1758ab(0x360)](_0x1602f2,_0x1758ab(0x380),0x1,_0x1758ab(0x1d6));VisuMZ[_0x1758ab(0x2b5)][_0x1758ab(0x190)][_0x57619e['id']]=new Function(_0x1758ab(0x211),_0x286acc);}}},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x23d)]={},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x237)]={},VisuMZ['SkillsStatesCore'][_0x244f65(0x258)]={},VisuMZ[_0x244f65(0x2b5)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x1e76da){const _0x41c5d4=_0x244f65,_0x514849=_0x1e76da[_0x41c5d4(0x2e2)],_0x291bdf=_0x41c5d4(0x34f);if(_0x514849[_0x41c5d4(0x316)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x2c8d92=String(RegExp['$1']),_0x5bfb4e=_0x291bdf[_0x41c5d4(0x360)](_0x2c8d92);VisuMZ['SkillsStatesCore'][_0x41c5d4(0x23d)][_0x1e76da['id']]=new Function(_0x41c5d4(0x211),_0x5bfb4e);}if(_0x514849[_0x41c5d4(0x316)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x4fbee2=String(RegExp['$1']),_0x47c4dd=_0x291bdf['format'](_0x4fbee2);VisuMZ[_0x41c5d4(0x2b5)][_0x41c5d4(0x237)][_0x1e76da['id']]=new Function(_0x41c5d4(0x211),_0x47c4dd);}if(_0x514849['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3c4140=String(RegExp['$1']),_0x3d7fc3=_0x291bdf[_0x41c5d4(0x360)](_0x3c4140);VisuMZ['SkillsStatesCore'][_0x41c5d4(0x258)][_0x1e76da['id']]=new Function(_0x41c5d4(0x211),_0x3d7fc3);}},VisuMZ[_0x244f65(0x2b5)]['CheckIncompatibleStates']=function(){const _0x2da619=_0x244f65;if(!VisuMZ[_0x2da619(0x2b5)]['Settings'][_0x2da619(0x2e6)]['ActionEndUpdate'])return;for(const _0x5d1089 of $dataStates){if(!_0x5d1089)continue;_0x5d1089[_0x2da619(0x2b1)]===0x4&&_0x5d1089[_0x2da619(0x33d)]===0x1&&(_0x5d1089[_0x2da619(0x33d)]=0x2);}},DataManager[_0x244f65(0x259)]=function(_0x1c49fc){const _0x587b9b=_0x244f65;_0x1c49fc=_0x1c49fc['toUpperCase']()[_0x587b9b(0x18e)](),this[_0x587b9b(0x352)]=this[_0x587b9b(0x352)]||{};if(this[_0x587b9b(0x352)][_0x1c49fc])return this[_0x587b9b(0x352)][_0x1c49fc];for(const _0x530d44 of $dataClasses){if(!_0x530d44)continue;let _0x348d40=_0x530d44['name'];_0x348d40=_0x348d40[_0x587b9b(0x365)](/\x1I\[(\d+)\]/gi,''),_0x348d40=_0x348d40[_0x587b9b(0x365)](/\\I\[(\d+)\]/gi,''),this[_0x587b9b(0x352)][_0x348d40[_0x587b9b(0x179)]()[_0x587b9b(0x18e)]()]=_0x530d44['id'];}return this[_0x587b9b(0x352)][_0x1c49fc]||0x0;},DataManager[_0x244f65(0x3c4)]=function(_0x4cf17b){const _0x331355=_0x244f65;this[_0x331355(0x29d)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x4cf17b['id']])return this['_stypeIDs'][_0x4cf17b['id']];this[_0x331355(0x29d)][_0x4cf17b['id']]=[_0x4cf17b[_0x331355(0x292)]];if(_0x4cf17b[_0x331355(0x2e2)][_0x331355(0x316)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x467f26=JSON[_0x331355(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x331355(0x29d)][_0x4cf17b['id']]=this['_stypeIDs'][_0x4cf17b['id']][_0x331355(0x24f)](_0x467f26);}else{if(_0x4cf17b[_0x331355(0x2e2)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2b2a8b=RegExp['$1'][_0x331355(0x278)](',');for(const _0x1792f5 of _0x2b2a8b){const _0x5e9aa2=DataManager['getStypeIdWithName'](_0x1792f5);if(_0x5e9aa2)this[_0x331355(0x29d)][_0x4cf17b['id']][_0x331355(0x1f5)](_0x5e9aa2);}}}return this[_0x331355(0x29d)][_0x4cf17b['id']];},DataManager[_0x244f65(0x3b2)]=function(_0xe8da0b){const _0x348d52=_0x244f65;_0xe8da0b=_0xe8da0b[_0x348d52(0x179)]()['trim'](),this[_0x348d52(0x29d)]=this['_stypeIDs']||{};if(this[_0x348d52(0x29d)][_0xe8da0b])return this[_0x348d52(0x29d)][_0xe8da0b];for(let _0x479e04=0x1;_0x479e04<0x64;_0x479e04++){if(!$dataSystem[_0x348d52(0x39c)][_0x479e04])continue;let _0x3c3319=$dataSystem['skillTypes'][_0x479e04][_0x348d52(0x179)]()[_0x348d52(0x18e)]();_0x3c3319=_0x3c3319['replace'](/\x1I\[(\d+)\]/gi,''),_0x3c3319=_0x3c3319[_0x348d52(0x365)](/\\I\[(\d+)\]/gi,''),this[_0x348d52(0x29d)][_0x3c3319]=_0x479e04;}return this[_0x348d52(0x29d)][_0xe8da0b]||0x0;},DataManager['getSkillIdWithName']=function(_0x29e3d1){const _0x5c88c5=_0x244f65;_0x29e3d1=_0x29e3d1[_0x5c88c5(0x179)]()[_0x5c88c5(0x18e)](),this[_0x5c88c5(0x366)]=this[_0x5c88c5(0x366)]||{};if(this[_0x5c88c5(0x366)][_0x29e3d1])return this[_0x5c88c5(0x366)][_0x29e3d1];for(const _0x4c67b3 of $dataSkills){if(!_0x4c67b3)continue;this[_0x5c88c5(0x366)][_0x4c67b3[_0x5c88c5(0x381)][_0x5c88c5(0x179)]()[_0x5c88c5(0x18e)]()]=_0x4c67b3['id'];}return this['_skillIDs'][_0x29e3d1]||0x0;},DataManager['getStateIdWithName']=function(_0x31e61b){const _0x444d0d=_0x244f65;_0x31e61b=_0x31e61b[_0x444d0d(0x179)]()['trim'](),this[_0x444d0d(0x270)]=this[_0x444d0d(0x270)]||{};if(this[_0x444d0d(0x270)][_0x31e61b])return this[_0x444d0d(0x270)][_0x31e61b];for(const _0x513b8f of $dataStates){if(!_0x513b8f)continue;this[_0x444d0d(0x270)][_0x513b8f[_0x444d0d(0x381)][_0x444d0d(0x179)]()['trim']()]=_0x513b8f['id'];}return this['_stateIDs'][_0x31e61b]||0x0;},DataManager[_0x244f65(0x324)]=function(_0x3b5b31){const _0x4bffa5=_0x244f65;this[_0x4bffa5(0x282)]=this['_stateMaxTurns']||{};if(this[_0x4bffa5(0x282)][_0x3b5b31])return this[_0x4bffa5(0x282)][_0x3b5b31];return $dataStates[_0x3b5b31][_0x4bffa5(0x2e2)][_0x4bffa5(0x316)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x4bffa5(0x282)][_0x3b5b31]=Number(RegExp['$1']):this[_0x4bffa5(0x282)][_0x3b5b31]=VisuMZ[_0x4bffa5(0x2b5)]['Settings'][_0x4bffa5(0x2e6)]['MaxTurns'],this['_stateMaxTurns'][_0x3b5b31];},ColorManager[_0x244f65(0x310)]=function(_0x42070f,_0x402dca){const _0x318896=_0x244f65;return _0x402dca=String(_0x402dca),this[_0x318896(0x395)]=this['_colorCache']||{},_0x402dca[_0x318896(0x316)](/#(.*)/i)?this[_0x318896(0x395)][_0x42070f]=_0x318896(0x39d)[_0x318896(0x360)](String(RegExp['$1'])):this[_0x318896(0x395)][_0x42070f]=this[_0x318896(0x29f)](Number(_0x402dca)),this['_colorCache'][_0x42070f];},ColorManager[_0x244f65(0x274)]=function(_0x1c7123){const _0x4f893a=_0x244f65;return _0x1c7123=String(_0x1c7123),_0x1c7123[_0x4f893a(0x316)](/#(.*)/i)?_0x4f893a(0x39d)[_0x4f893a(0x360)](String(RegExp['$1'])):this['textColor'](Number(_0x1c7123));},ColorManager[_0x244f65(0x1ae)]=function(_0x2fc71c){const _0x386ddf=_0x244f65;if(typeof _0x2fc71c===_0x386ddf(0x268))_0x2fc71c=$dataStates[_0x2fc71c];const _0x275566=_0x386ddf(0x2a5)[_0x386ddf(0x360)](_0x2fc71c['id']);this[_0x386ddf(0x395)]=this[_0x386ddf(0x395)]||{};if(this[_0x386ddf(0x395)][_0x275566])return this[_0x386ddf(0x395)][_0x275566];const _0x1baceb=this['retrieveStateColor'](_0x2fc71c);return this[_0x386ddf(0x310)](_0x275566,_0x1baceb);},ColorManager['retrieveStateColor']=function(_0x4502df){const _0x392c75=_0x244f65,_0x2ada7e=_0x4502df[_0x392c75(0x2e2)];if(_0x2ada7e['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2ada7e[_0x392c75(0x316)](/<POSITIVE STATE>/i))return VisuMZ[_0x392c75(0x2b5)][_0x392c75(0x253)][_0x392c75(0x2e6)][_0x392c75(0x223)];else return _0x2ada7e[_0x392c75(0x316)](/<NEGATIVE STATE>/i)?VisuMZ[_0x392c75(0x2b5)][_0x392c75(0x253)][_0x392c75(0x2e6)][_0x392c75(0x344)]:VisuMZ[_0x392c75(0x2b5)][_0x392c75(0x253)][_0x392c75(0x2e6)][_0x392c75(0x1c4)];}},ColorManager[_0x244f65(0x32d)]=function(){const _0x2f31a8=_0x244f65,_0x12ca30=_0x2f31a8(0x364);this['_colorCache']=this[_0x2f31a8(0x395)]||{};if(this[_0x2f31a8(0x395)][_0x12ca30])return this[_0x2f31a8(0x395)][_0x12ca30];const _0x442c8a=VisuMZ[_0x2f31a8(0x2b5)][_0x2f31a8(0x253)][_0x2f31a8(0x362)]['ColorBuff'];return this[_0x2f31a8(0x310)](_0x12ca30,_0x442c8a);},ColorManager[_0x244f65(0x2cf)]=function(){const _0x4b90d7=_0x244f65,_0x24705b=_0x4b90d7(0x30a);this[_0x4b90d7(0x395)]=this[_0x4b90d7(0x395)]||{};if(this[_0x4b90d7(0x395)][_0x24705b])return this[_0x4b90d7(0x395)][_0x24705b];const _0xd58652=VisuMZ[_0x4b90d7(0x2b5)][_0x4b90d7(0x253)][_0x4b90d7(0x362)][_0x4b90d7(0x1db)];return this[_0x4b90d7(0x310)](_0x24705b,_0xd58652);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x255)]=BattleManager['endAction'],BattleManager[_0x244f65(0x3c8)]=function(){const _0x25e885=_0x244f65;this['updateStatesActionEnd'](),VisuMZ[_0x25e885(0x2b5)]['BattleManager_endAction'][_0x25e885(0x1d0)](this);},BattleManager[_0x244f65(0x296)]=function(){const _0x7bb310=_0x244f65,_0x5a77ae=VisuMZ[_0x7bb310(0x2b5)][_0x7bb310(0x253)][_0x7bb310(0x2e6)];if(!_0x5a77ae)return;if(_0x5a77ae[_0x7bb310(0x330)]===![])return;if(!this[_0x7bb310(0x37b)])return;this[_0x7bb310(0x37b)][_0x7bb310(0x296)]();},Game_Battler[_0x244f65(0x355)][_0x244f65(0x296)]=function(){const _0x653e00=_0x244f65;if(BattleManager[_0x653e00(0x3a6)]!==_0x653e00(0x1ca))return;if(this[_0x653e00(0x383)]===Graphics['frameCount'])return;this[_0x653e00(0x383)]=Graphics[_0x653e00(0x2d4)];for(const _0x5721a1 of this[_0x653e00(0x266)]){const _0x4a44c6=$dataStates[_0x5721a1];if(!_0x4a44c6)continue;if(_0x4a44c6[_0x653e00(0x33d)]!==0x1)continue;this[_0x653e00(0x248)][_0x5721a1]>0x0&&this[_0x653e00(0x248)][_0x5721a1]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x36a)]=function(){const _0x1fa235=_0x244f65,_0xdc5158=VisuMZ['SkillsStatesCore']['Settings'][_0x1fa235(0x2e6)];for(const _0x45a22d of this[_0x1fa235(0x266)]){const _0x58f01b=$dataStates[_0x45a22d];if(_0xdc5158&&_0xdc5158[_0x1fa235(0x330)]!==![]){if(_0x58f01b&&_0x58f01b[_0x1fa235(0x33d)]===0x1)continue;}this[_0x1fa235(0x248)][_0x45a22d]>0x0&&this['_stateTurns'][_0x45a22d]--;}},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x18a)]=Game_Action[_0x244f65(0x355)][_0x244f65(0x1e5)],Game_Action[_0x244f65(0x355)][_0x244f65(0x1e5)]=function(_0x45931f){const _0x52b48b=_0x244f65;VisuMZ[_0x52b48b(0x2b5)][_0x52b48b(0x18a)]['call'](this,_0x45931f),this['applySkillsStatesCoreEffects'](_0x45931f);},Game_Action[_0x244f65(0x355)][_0x244f65(0x1b2)]=function(_0x25c55e){const _0x934947=_0x244f65;this[_0x934947(0x254)](_0x25c55e),this['applyStateTurnManipulationEffects'](_0x25c55e),this[_0x934947(0x36b)](_0x25c55e),this[_0x934947(0x21f)](_0x25c55e);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x389)]=Game_Action['prototype'][_0x244f65(0x25f)],Game_Action[_0x244f65(0x355)][_0x244f65(0x25f)]=function(_0x3384b5){const _0x13a9b6=_0x244f65;if(this[_0x13a9b6(0x1cc)](_0x3384b5))return!![];return VisuMZ[_0x13a9b6(0x2b5)][_0x13a9b6(0x389)][_0x13a9b6(0x1d0)](this,_0x3384b5);},Game_Action[_0x244f65(0x355)][_0x244f65(0x1cc)]=function(_0x570101){const _0x25a0d6=_0x244f65,_0x26b416=this[_0x25a0d6(0x334)]()[_0x25a0d6(0x2e2)];if(_0x26b416['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x5ee6d4=String(RegExp['$1']);if(_0x570101[_0x25a0d6(0x311)](_0x5ee6d4))return!![];}if(_0x26b416[_0x25a0d6(0x316)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x4525aa=Number(RegExp['$1']);if(_0x570101['isStateAffected'](_0x4525aa))return!![];}else{if(_0x26b416[_0x25a0d6(0x316)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x54da06=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x570101[_0x25a0d6(0x26c)](_0x54da06))return!![];}}return![];},Game_Action[_0x244f65(0x355)]['applyStateCategoryRemovalEffects']=function(_0x1eb424){const _0x40d2f3=_0x244f65;if(_0x1eb424[_0x40d2f3(0x348)]()[_0x40d2f3(0x3aa)]<=0x0)return;const _0x34e62e=this['item']()[_0x40d2f3(0x2e2)];if(_0x34e62e[_0x40d2f3(0x316)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x5a9d2e=String(RegExp['$1']);_0x1eb424['removeStatesByCategoryAll'](_0x5a9d2e);}const _0xcf842f=_0x34e62e[_0x40d2f3(0x316)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0xcf842f)for(const _0x51cc3b of _0xcf842f){_0x51cc3b[_0x40d2f3(0x316)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4d9dad=String(RegExp['$1']),_0x302ac7=Number(RegExp['$2']);_0x1eb424['removeStatesByCategory'](_0x4d9dad,_0x302ac7);}},Game_Action[_0x244f65(0x355)][_0x244f65(0x1c0)]=function(_0x51731b){const _0x12c116=_0x244f65,_0x54ef9e=this[_0x12c116(0x334)]()[_0x12c116(0x2e2)],_0x4261be=_0x54ef9e['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4261be)for(const _0x3081ea of _0x4261be){let _0x5bc539=0x0,_0x46abea=0x0;if(_0x3081ea[_0x12c116(0x316)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x5bc539=Number(RegExp['$1']),_0x46abea=Number(RegExp['$2']);else _0x3081ea[_0x12c116(0x316)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x5bc539=DataManager[_0x12c116(0x1ce)](RegExp['$1']),_0x46abea=Number(RegExp['$2']));_0x51731b[_0x12c116(0x3ab)](_0x5bc539,_0x46abea),this[_0x12c116(0x385)](_0x51731b);}const _0x4d1da3=_0x54ef9e[_0x12c116(0x316)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4d1da3)for(const _0x3762dd of _0x4d1da3){let _0x6cc02=0x0,_0x3b878c=0x0;if(_0x3762dd['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x6cc02=Number(RegExp['$1']),_0x3b878c=Number(RegExp['$2']);else _0x3762dd[_0x12c116(0x316)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x6cc02=DataManager[_0x12c116(0x1ce)](RegExp['$1']),_0x3b878c=Number(RegExp['$2']));_0x51731b[_0x12c116(0x34a)](_0x6cc02,_0x3b878c),this[_0x12c116(0x385)](_0x51731b);}},Game_Action[_0x244f65(0x355)]['applyBuffTurnManipulationEffects']=function(_0x27af59){const _0x3e02b3=_0x244f65,_0x34cf45=[_0x3e02b3(0x23a),_0x3e02b3(0x2bb),_0x3e02b3(0x39f),_0x3e02b3(0x224),'MAT',_0x3e02b3(0x23c),_0x3e02b3(0x3b3),_0x3e02b3(0x25e)],_0x42ef87=this[_0x3e02b3(0x334)]()[_0x3e02b3(0x2e2)],_0x7e37ec=_0x42ef87[_0x3e02b3(0x316)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x7e37ec)for(const _0x3c7fba of _0x7e37ec){_0x3c7fba[_0x3e02b3(0x316)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x5be0a0=_0x34cf45[_0x3e02b3(0x19e)](String(RegExp['$1'])[_0x3e02b3(0x179)]()),_0x35d77b=Number(RegExp['$2']);_0x5be0a0>=0x0&&(_0x27af59[_0x3e02b3(0x283)](_0x5be0a0,_0x35d77b),this[_0x3e02b3(0x385)](_0x27af59));}const _0x514671=_0x42ef87[_0x3e02b3(0x316)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x514671)for(const _0x484f09 of _0x7e37ec){_0x484f09[_0x3e02b3(0x316)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4aa1fd=_0x34cf45['indexOf'](String(RegExp['$1'])[_0x3e02b3(0x179)]()),_0x1ec793=Number(RegExp['$2']);_0x4aa1fd>=0x0&&(_0x27af59[_0x3e02b3(0x204)](_0x4aa1fd,_0x1ec793),this[_0x3e02b3(0x385)](_0x27af59));}},Game_Action[_0x244f65(0x355)][_0x244f65(0x21f)]=function(_0x14f26e){const _0x1111bf=_0x244f65,_0x1cf64e=[_0x1111bf(0x23a),'MAXMP','ATK',_0x1111bf(0x224),_0x1111bf(0x1a1),_0x1111bf(0x23c),_0x1111bf(0x3b3),_0x1111bf(0x25e)],_0x2bbd06=this['item']()[_0x1111bf(0x2e2)],_0x27e0e2=_0x2bbd06[_0x1111bf(0x316)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x27e0e2)for(const _0x1b1713 of _0x27e0e2){_0x1b1713[_0x1111bf(0x316)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4acc35=_0x1cf64e[_0x1111bf(0x19e)](String(RegExp['$1'])[_0x1111bf(0x179)]()),_0x681e4b=Number(RegExp['$2']);_0x4acc35>=0x0&&(_0x14f26e[_0x1111bf(0x2c2)](_0x4acc35,_0x681e4b),this['makeSuccess'](_0x14f26e));}const _0x51448d=_0x2bbd06[_0x1111bf(0x316)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x51448d)for(const _0x5ec16a of _0x27e0e2){_0x5ec16a['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2740bc=_0x1cf64e[_0x1111bf(0x19e)](String(RegExp['$1'])['toUpperCase']()),_0x49dacb=Number(RegExp['$2']);_0x2740bc>=0x0&&(_0x14f26e[_0x1111bf(0x21e)](_0x2740bc,_0x49dacb),this[_0x1111bf(0x385)](_0x14f26e));}},VisuMZ['SkillsStatesCore']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x34c)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x34c)]=function(){const _0x19533f=_0x244f65;this['_cache']={},this[_0x19533f(0x37e)](),VisuMZ[_0x19533f(0x2b5)]['Game_BattlerBase_initMembers'][_0x19533f(0x1d0)](this);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x37e)]=function(){const _0x5379f5=_0x244f65;this[_0x5379f5(0x182)]='',this[_0x5379f5(0x322)]={},this[_0x5379f5(0x1a4)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1e2)]=function(_0x36012a){const _0x11cf79=_0x244f65;return this[_0x11cf79(0x378)]=this[_0x11cf79(0x378)]||{},this[_0x11cf79(0x378)][_0x36012a]!==undefined;},VisuMZ['SkillsStatesCore'][_0x244f65(0x2dc)]=Game_BattlerBase['prototype'][_0x244f65(0x30d)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x30d)]=function(){const _0x3741da=_0x244f65;this[_0x3741da(0x378)]={},VisuMZ[_0x3741da(0x2b5)][_0x3741da(0x2dc)][_0x3741da(0x1d0)](this);},VisuMZ['SkillsStatesCore'][_0x244f65(0x217)]=Game_BattlerBase[_0x244f65(0x355)]['eraseState'],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2bf)]=function(_0x2b621d){const _0x4418d5=_0x244f65;let _0x39e682=this[_0x4418d5(0x26c)](_0x2b621d);VisuMZ[_0x4418d5(0x2b5)][_0x4418d5(0x217)][_0x4418d5(0x1d0)](this,_0x2b621d);if(_0x39e682&&!this[_0x4418d5(0x26c)](_0x2b621d))this['onRemoveState'](_0x2b621d);},Game_BattlerBase['prototype'][_0x244f65(0x222)]=function(_0x2fb79f){const _0x451572=_0x244f65;this['clearStateData'](_0x2fb79f),this['clearStateDisplay'](_0x2fb79f),this[_0x451572(0x312)](_0x2fb79f);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1e4)]=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1dc)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1dc)]=function(_0x5eee1d){const _0x16abd5=_0x244f65,_0x5c90e5=$dataStates[_0x5eee1d],_0x1fde9d=this[_0x16abd5(0x2da)](_0x5eee1d),_0x553648=this[_0x16abd5(0x1bc)](_0x5c90e5)[_0x16abd5(0x2b2)]()[_0x16abd5(0x18e)]();switch(_0x553648){case'ignore':if(_0x1fde9d<=0x0)VisuMZ['SkillsStatesCore'][_0x16abd5(0x1e4)][_0x16abd5(0x1d0)](this,_0x5eee1d);break;case _0x16abd5(0x33f):VisuMZ[_0x16abd5(0x2b5)][_0x16abd5(0x1e4)][_0x16abd5(0x1d0)](this,_0x5eee1d);break;case _0x16abd5(0x25a):VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x16abd5(0x1d0)](this,_0x5eee1d),this['_stateTurns'][_0x5eee1d]=Math['max'](this[_0x16abd5(0x248)][_0x5eee1d],_0x1fde9d);break;case _0x16abd5(0x35f):VisuMZ[_0x16abd5(0x2b5)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x5eee1d),this[_0x16abd5(0x248)][_0x5eee1d]+=_0x1fde9d;break;default:VisuMZ['SkillsStatesCore'][_0x16abd5(0x1e4)][_0x16abd5(0x1d0)](this,_0x5eee1d);break;}},Game_BattlerBase[_0x244f65(0x355)]['getStateReapplyRulings']=function(_0x23157c){const _0x354ccd=_0x244f65,_0x595a92=_0x23157c[_0x354ccd(0x2e2)];return _0x595a92[_0x354ccd(0x316)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x354ccd(0x2b5)][_0x354ccd(0x253)][_0x354ccd(0x2e6)][_0x354ccd(0x3b6)];},VisuMZ[_0x244f65(0x2b5)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2d7)],Game_BattlerBase['prototype'][_0x244f65(0x2d7)]=function(_0x259156,_0x2f710d){const _0x13e92d=_0x244f65,_0x39b095=VisuMZ['SkillsStatesCore'][_0x13e92d(0x253)][_0x13e92d(0x362)][_0x13e92d(0x3b6)],_0x142128=this[_0x13e92d(0x2e4)](_0x259156);switch(_0x39b095){case'ignore':if(_0x142128<=0x0)this[_0x13e92d(0x2f8)][_0x259156]=_0x2f710d;break;case _0x13e92d(0x33f):this[_0x13e92d(0x2f8)][_0x259156]=_0x2f710d;break;case _0x13e92d(0x25a):this[_0x13e92d(0x2f8)][_0x259156]=Math[_0x13e92d(0x262)](_0x142128,_0x2f710d);break;case _0x13e92d(0x35f):this[_0x13e92d(0x2f8)][_0x259156]+=_0x2f710d;break;default:VisuMZ[_0x13e92d(0x2b5)][_0x13e92d(0x38f)][_0x13e92d(0x1d0)](this,_0x259156,_0x2f710d);break;}const _0x4fd3e4=VisuMZ[_0x13e92d(0x2b5)][_0x13e92d(0x253)][_0x13e92d(0x362)][_0x13e92d(0x196)];this[_0x13e92d(0x2f8)][_0x259156]=this[_0x13e92d(0x2f8)][_0x259156][_0x13e92d(0x3b8)](0x0,_0x4fd3e4);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x227)]=function(){const _0x53be27=_0x244f65;if(this['_cache'][_0x53be27(0x323)]!==undefined)return this['_cache'][_0x53be27(0x323)];this['_cache'][_0x53be27(0x323)]=![];const _0x220d84=this['states']();for(const _0x44a03a of _0x220d84){if(!_0x44a03a)continue;if(_0x44a03a[_0x53be27(0x2e2)][_0x53be27(0x316)](/<GROUP DEFEAT>/i)){this[_0x53be27(0x378)]['groupDefeat']=!![];break;}}return this[_0x53be27(0x378)][_0x53be27(0x323)];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x293)]=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x353)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x353)]=function(){const _0x4a7cb7=_0x244f65;this[_0x4a7cb7(0x1d1)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x4a7cb7(0x2b5)]['Game_BattlerBase_clearStates'][_0x4a7cb7(0x1d0)](this),this['initMembersSkillsStatesCore']());},Game_Actor[_0x244f65(0x355)]['clearStates']=function(){const _0x547f14=_0x244f65;this['_stateSteps']=this[_0x547f14(0x2c3)]||{},Game_Battler[_0x547f14(0x355)][_0x547f14(0x353)][_0x547f14(0x1d0)](this);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1a8)]=function(){const _0x4f44f0=_0x244f65,_0x454b4b=this[_0x4f44f0(0x348)]();for(const _0x33bc30 of _0x454b4b){if(_0x33bc30&&this[_0x4f44f0(0x338)](_0x33bc30))this[_0x4f44f0(0x2bf)](_0x33bc30['id']);}this[_0x4f44f0(0x378)]={};},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x338)]=function(_0x6fb1d6){const _0x2b66ab=_0x244f65,_0x344218=this[_0x2b66ab(0x1d1)]();if(_0x344218!==''){const _0x34d9df=_0x6fb1d6[_0x2b66ab(0x2e2)];if(_0x344218===_0x2b66ab(0x20a)&&_0x34d9df[_0x2b66ab(0x316)](/<NO DEATH CLEAR>/i))return![];if(_0x344218===_0x2b66ab(0x1f0)&&_0x34d9df[_0x2b66ab(0x316)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x2b66ab(0x26c)](_0x6fb1d6['id']);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1d1)]=function(){const _0x2cea47=_0x244f65;return this[_0x2cea47(0x182)];},Game_BattlerBase[_0x244f65(0x355)]['setStateRetainType']=function(_0x845815){const _0x2c4371=_0x244f65;this[_0x2c4371(0x182)]=_0x845815;},Game_BattlerBase[_0x244f65(0x355)]['clearStateRetainType']=function(){const _0x28d6bd=_0x244f65;this[_0x28d6bd(0x182)]='';},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x22f)]=Game_BattlerBase['prototype'][_0x244f65(0x1b3)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1b3)]=function(){const _0x4157ad=_0x244f65;this['setStateRetainType']('death'),VisuMZ[_0x4157ad(0x2b5)][_0x4157ad(0x22f)]['call'](this),this['clearStateRetainType']();},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x290)]=Game_BattlerBase[_0x244f65(0x355)]['recoverAll'],Game_BattlerBase['prototype'][_0x244f65(0x1b5)]=function(){const _0x43ddf9=_0x244f65;this[_0x43ddf9(0x209)](_0x43ddf9(0x1f0)),VisuMZ[_0x43ddf9(0x2b5)][_0x43ddf9(0x290)][_0x43ddf9(0x1d0)](this),this[_0x43ddf9(0x260)]();},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x369)]=function(_0x19cb17){const _0x3b2dfd=_0x244f65;for(settings of VisuMZ[_0x3b2dfd(0x2b5)][_0x3b2dfd(0x253)]['Costs']){const _0x13909a=settings[_0x3b2dfd(0x1c5)][_0x3b2dfd(0x1d0)](this,_0x19cb17);if(!settings['CanPayJS']['call'](this,_0x19cb17,_0x13909a))return![];}return!![];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1f1)]=function(_0x5413f9){const _0x382260=_0x244f65;for(settings of VisuMZ[_0x382260(0x2b5)]['Settings']['Costs']){const _0x40b4a3=settings[_0x382260(0x1c5)][_0x382260(0x1d0)](this,_0x5413f9);settings[_0x382260(0x170)][_0x382260(0x1d0)](this,_0x5413f9,_0x40b4a3);}},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1ad)]=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x201)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x201)]=function(_0x12db6a){const _0xc1b15b=_0x244f65;if(!_0x12db6a)return![];if(!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions']['call'](this,_0x12db6a))return![];if(!this[_0xc1b15b(0x1d4)](_0x12db6a))return![];if(!this[_0xc1b15b(0x23e)](_0x12db6a))return![];if(!this[_0xc1b15b(0x3bd)](_0x12db6a))return![];return!![];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1d4)]=function(_0x4a61b3){if(!this['checkSkillConditionsSwitchNotetags'](_0x4a61b3))return![];return!![];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2ff)]=function(_0xd1b046){const _0x10e9f8=_0x244f65,_0x53cfe0=_0xd1b046[_0x10e9f8(0x2e2)];if(_0x53cfe0[_0x10e9f8(0x316)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x37f502=JSON[_0x10e9f8(0x26a)]('['+RegExp['$1'][_0x10e9f8(0x316)](/\d+/g)+']');for(const _0x214ae0 of _0x37f502){if(!$gameSwitches['value'](_0x214ae0))return![];}return!![];}if(_0x53cfe0[_0x10e9f8(0x316)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2921a5=JSON[_0x10e9f8(0x26a)]('['+RegExp['$1'][_0x10e9f8(0x316)](/\d+/g)+']');for(const _0x503cbd of _0x2921a5){if(!$gameSwitches[_0x10e9f8(0x2a7)](_0x503cbd))return![];}return!![];}if(_0x53cfe0[_0x10e9f8(0x316)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d9f22=JSON[_0x10e9f8(0x26a)]('['+RegExp['$1'][_0x10e9f8(0x316)](/\d+/g)+']');for(const _0x53aadc of _0x1d9f22){if($gameSwitches[_0x10e9f8(0x2a7)](_0x53aadc))return!![];}return![];}if(_0x53cfe0['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x535731=JSON[_0x10e9f8(0x26a)]('['+RegExp['$1'][_0x10e9f8(0x316)](/\d+/g)+']');for(const _0x560b5d of _0x535731){if(!$gameSwitches['value'](_0x560b5d))return!![];}return![];}if(_0x53cfe0['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa7d355=JSON[_0x10e9f8(0x26a)]('['+RegExp['$1'][_0x10e9f8(0x316)](/\d+/g)+']');for(const _0x49bb84 of _0xa7d355){if(!$gameSwitches[_0x10e9f8(0x2a7)](_0x49bb84))return!![];}return![];}if(_0x53cfe0['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x76fae8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b3e39 of _0x76fae8){if($gameSwitches[_0x10e9f8(0x2a7)](_0x1b3e39))return![];}return!![];}return!![];},Game_BattlerBase['prototype']['meetsSkillConditionsEnableJS']=function(_0x4ba727){const _0x4fd69b=_0x244f65,_0x5a6ea8=_0x4ba727[_0x4fd69b(0x2e2)],_0x1601b3=VisuMZ[_0x4fd69b(0x2b5)][_0x4fd69b(0x1fa)];return _0x1601b3[_0x4ba727['id']]?_0x1601b3[_0x4ba727['id']][_0x4fd69b(0x1d0)](this,_0x4ba727):!![];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x3bd)]=function(_0x55c37a){const _0x1a4271=_0x244f65;return VisuMZ[_0x1a4271(0x2b5)][_0x1a4271(0x253)][_0x1a4271(0x24e)][_0x1a4271(0x245)]['call'](this,_0x55c37a);},VisuMZ['SkillsStatesCore'][_0x244f65(0x346)]=Game_BattlerBase['prototype'][_0x244f65(0x1ac)],Game_BattlerBase['prototype'][_0x244f65(0x1ac)]=function(_0x2b79e0){const _0x1c9783=_0x244f65;for(settings of VisuMZ['SkillsStatesCore'][_0x1c9783(0x253)]['Costs']){if(settings[_0x1c9783(0x194)][_0x1c9783(0x179)]()==='MP')return settings[_0x1c9783(0x1c5)][_0x1c9783(0x1d0)](this,_0x2b79e0);}return VisuMZ[_0x1c9783(0x2b5)][_0x1c9783(0x346)][_0x1c9783(0x1d0)](this,_0x2b79e0);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x34e)]=Game_BattlerBase['prototype'][_0x244f65(0x235)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x235)]=function(_0x87661){const _0x432673=_0x244f65;for(settings of VisuMZ[_0x432673(0x2b5)][_0x432673(0x253)]['Costs']){if(settings[_0x432673(0x194)][_0x432673(0x179)]()==='TP')return settings[_0x432673(0x1c5)][_0x432673(0x1d0)](this,_0x87661);}return VisuMZ[_0x432673(0x2b5)][_0x432673(0x34e)][_0x432673(0x1d0)](this,_0x87661);},Game_BattlerBase[_0x244f65(0x355)]['hasState']=function(_0x1cf4d6){const _0x4830d3=_0x244f65;if(typeof _0x1cf4d6===_0x4830d3(0x268))_0x1cf4d6=$dataStates[_0x1cf4d6];return this['states']()['includes'](_0x1cf4d6);},VisuMZ[_0x244f65(0x2b5)]['Game_BattlerBase_states']=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x348)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x348)]=function(){const _0x53bf96=_0x244f65;let _0x5511f4=VisuMZ[_0x53bf96(0x2b5)]['Game_BattlerBase_states'][_0x53bf96(0x1d0)](this);if($gameTemp[_0x53bf96(0x176)])return _0x5511f4;return $gameTemp[_0x53bf96(0x176)]=!![],this[_0x53bf96(0x32b)](_0x5511f4),$gameTemp[_0x53bf96(0x176)]=undefined,_0x5511f4;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x32b)]=function(_0x1ebc6e){const _0x380e2a=_0x244f65,_0x22e479=this[_0x380e2a(0x1d9)]();for(state of _0x22e479){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x1ebc6e[_0x380e2a(0x22d)](state))continue;_0x1ebc6e[_0x380e2a(0x1f5)](state);}_0x22e479[_0x380e2a(0x3aa)]>0x0&&_0x1ebc6e[_0x380e2a(0x325)]((_0x291334,_0x4797b4)=>{const _0x2832c5=_0x380e2a,_0x32e0b8=_0x291334[_0x2832c5(0x3c1)],_0x1191b8=_0x4797b4[_0x2832c5(0x3c1)];if(_0x32e0b8!==_0x1191b8)return _0x1191b8-_0x32e0b8;return _0x291334-_0x4797b4;});},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2d1)]=function(_0x353944){const _0x1b2eaa=_0x244f65;return _0x353944[_0x1b2eaa(0x2e2)][_0x1b2eaa(0x316)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x244f65(0x2b5)]['Game_BattlerBase_traitsSet']=Game_BattlerBase['prototype'][_0x244f65(0x332)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x332)]=function(_0x5df824){const _0x4f66c8=_0x244f65;this[_0x4f66c8(0x172)]=!![];let _0x2d4729=VisuMZ[_0x4f66c8(0x2b5)]['Game_BattlerBase_traitsSet'][_0x4f66c8(0x1d0)](this,_0x5df824);return this[_0x4f66c8(0x172)]=undefined,_0x2d4729;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x22a)]=function(){const _0x10104e=_0x244f65;let _0x795cf5=[];this[_0x10104e(0x2eb)]=this[_0x10104e(0x2eb)]||{};for(;;){_0x795cf5=[];let _0x4334cd=!![];for(const _0xac6849 of this['_cache'][_0x10104e(0x1d9)]){const _0x3f2b91=$dataStates[_0xac6849];if(!_0x3f2b91)continue;let _0x472972=this[_0x10104e(0x203)](_0x3f2b91);this[_0x10104e(0x2eb)][_0xac6849]!==_0x472972&&(_0x4334cd=![],this[_0x10104e(0x2eb)][_0xac6849]=_0x472972);if(!_0x472972)continue;_0x795cf5[_0x10104e(0x1f5)](_0x3f2b91);}if(_0x4334cd)break;else{if(!this['_checkingTraitsSetSkillsStatesCore'])this['refresh']();this['createPassiveStatesCache']();}}return _0x795cf5;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x203)]=function(_0x1cfa6d){const _0x17cac4=_0x244f65;if(!this['meetsPassiveStateConditionClasses'](_0x1cfa6d))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x1cfa6d))return![];if(!this[_0x17cac4(0x331)](_0x1cfa6d))return![];if(!this[_0x17cac4(0x1aa)](_0x1cfa6d))return![];return!![];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x32a)]=function(_0x199499){return!![];},Game_Actor[_0x244f65(0x355)][_0x244f65(0x32a)]=function(_0x1ab7b3){const _0x3c214f=_0x244f65,_0x361ca3=_0x1ab7b3['note'];if(_0x361ca3[_0x3c214f(0x316)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x3d7fb2=String(RegExp['$1'])['split'](',')[_0x3c214f(0x185)](_0x1098cc=>_0x1098cc[_0x3c214f(0x18e)]()),_0x25f73e=VisuMZ[_0x3c214f(0x2b5)][_0x3c214f(0x30e)](_0x3d7fb2);return _0x25f73e[_0x3c214f(0x22d)](this[_0x3c214f(0x27b)]());}if(_0x361ca3[_0x3c214f(0x316)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x5a8b74=String(RegExp['$1'])[_0x3c214f(0x278)](',')[_0x3c214f(0x185)](_0x3559d9=>_0x3559d9[_0x3c214f(0x18e)]()),_0x323bee=VisuMZ[_0x3c214f(0x2b5)][_0x3c214f(0x30e)](_0x5a8b74);let _0x44df8b=[this[_0x3c214f(0x27b)]()];return Imported[_0x3c214f(0x3c5)]&&this[_0x3c214f(0x24d)]&&(_0x44df8b=this['multiclasses']()),_0x323bee['filter'](_0x1b7aea=>_0x44df8b[_0x3c214f(0x22d)](_0x1b7aea))['length']>0x0;}return Game_BattlerBase['prototype'][_0x3c214f(0x32a)][_0x3c214f(0x1d0)](this,_0x1ab7b3);},VisuMZ[_0x244f65(0x2b5)]['ParseClassIDs']=function(_0x138657){const _0x310ddd=_0x244f65,_0x3aee84=[];for(let _0x45c98a of _0x138657){_0x45c98a=(String(_0x45c98a)||'')[_0x310ddd(0x18e)]();const _0x481597=/^\d+$/['test'](_0x45c98a);_0x481597?_0x3aee84[_0x310ddd(0x1f5)](Number(_0x45c98a)):_0x3aee84[_0x310ddd(0x1f5)](DataManager[_0x310ddd(0x259)](_0x45c98a));}return _0x3aee84['map'](_0x422fb5=>$dataClasses[Number(_0x422fb5)])['remove'](null);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x257)]=function(_0x1a62ba){const _0x2db9ff=_0x244f65,_0x41e84d=_0x1a62ba[_0x2db9ff(0x2e2)];if(_0x41e84d[_0x2db9ff(0x316)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17dad7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x49d9e3 of _0x17dad7){if(!$gameSwitches[_0x2db9ff(0x2a7)](_0x49d9e3))return![];}return!![];}if(_0x41e84d['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2b5fef=JSON[_0x2db9ff(0x26a)]('['+RegExp['$1'][_0x2db9ff(0x316)](/\d+/g)+']');for(const _0x29ecf3 of _0x2b5fef){if(!$gameSwitches[_0x2db9ff(0x2a7)](_0x29ecf3))return![];}return!![];}if(_0x41e84d['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35dd6f=JSON[_0x2db9ff(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5dfb32 of _0x35dd6f){if($gameSwitches[_0x2db9ff(0x2a7)](_0x5dfb32))return!![];}return![];}if(_0x41e84d[_0x2db9ff(0x316)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e9b9c=JSON[_0x2db9ff(0x26a)]('['+RegExp['$1'][_0x2db9ff(0x316)](/\d+/g)+']');for(const _0x33acfa of _0x4e9b9c){if(!$gameSwitches[_0x2db9ff(0x2a7)](_0x33acfa))return!![];}return![];}if(_0x41e84d[_0x2db9ff(0x316)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ac980=JSON[_0x2db9ff(0x26a)]('['+RegExp['$1'][_0x2db9ff(0x316)](/\d+/g)+']');for(const _0xce36c0 of _0x1ac980){if(!$gameSwitches[_0x2db9ff(0x2a7)](_0xce36c0))return!![];}return![];}if(_0x41e84d['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12a030=JSON[_0x2db9ff(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3f51e2 of _0x12a030){if($gameSwitches[_0x2db9ff(0x2a7)](_0x3f51e2))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x244f65(0x331)]=function(_0x3bcfcf){const _0x292f17=_0x244f65,_0x1a075=VisuMZ[_0x292f17(0x2b5)][_0x292f17(0x2ad)];if(_0x1a075[_0x3bcfcf['id']]&&!_0x1a075[_0x3bcfcf['id']][_0x292f17(0x1d0)](this,_0x3bcfcf))return![];return!![];},Game_BattlerBase['prototype'][_0x244f65(0x1aa)]=function(_0x233cfc){const _0x331186=_0x244f65;return VisuMZ[_0x331186(0x2b5)][_0x331186(0x253)][_0x331186(0x206)]['PassiveConditionJS'][_0x331186(0x1d0)](this,_0x233cfc);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1d9)]=function(){const _0x7e98a=_0x244f65;if(this[_0x7e98a(0x1e2)](_0x7e98a(0x1d9)))return this[_0x7e98a(0x22a)]();if(this[_0x7e98a(0x350)])return[];return this[_0x7e98a(0x350)]=!![],this['createPassiveStatesCache'](),this[_0x7e98a(0x350)]=undefined,this['convertPassiveStates']();},Game_BattlerBase['prototype'][_0x244f65(0x37c)]=function(){const _0x586f48=_0x244f65;this[_0x586f48(0x350)]=!![],this['_cache']['passiveStates']=[],this[_0x586f48(0x2ca)](),this[_0x586f48(0x2ee)](),this['addPassiveStatesByPluginParameters'](),this['_checkingVisuMzPassiveStateObjects']=undefined;},Game_BattlerBase['prototype'][_0x244f65(0x2ca)]=function(){const _0x2a80de=_0x244f65;if(Imported[_0x2a80de(0x24a)])this[_0x2a80de(0x20f)]();},Game_BattlerBase[_0x244f65(0x355)]['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2ee)]=function(){const _0x4ca7e6=_0x244f65,_0x312613=this[_0x4ca7e6(0x1eb)]();for(const _0x39e48d of _0x312613){if(!_0x39e48d)continue;const _0x543e13=_0x39e48d['note'][_0x4ca7e6(0x316)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x543e13)for(const _0x3c0772 of _0x543e13){_0x3c0772[_0x4ca7e6(0x316)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x484c74=RegExp['$1'];if(_0x484c74[_0x4ca7e6(0x316)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x2f6b3b=JSON[_0x4ca7e6(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x4ca7e6(0x378)]['passiveStates']=this[_0x4ca7e6(0x378)][_0x4ca7e6(0x1d9)][_0x4ca7e6(0x24f)](_0x2f6b3b);}else{const _0x3cae88=_0x484c74[_0x4ca7e6(0x278)](',');for(const _0x578365 of _0x3cae88){const _0x367140=DataManager[_0x4ca7e6(0x1ce)](_0x578365);if(_0x367140)this[_0x4ca7e6(0x378)][_0x4ca7e6(0x1d9)][_0x4ca7e6(0x1f5)](_0x367140);}}}}},Game_BattlerBase['prototype'][_0x244f65(0x314)]=function(){const _0x1c2e59=_0x244f65,_0x502209=VisuMZ[_0x1c2e59(0x2b5)][_0x1c2e59(0x253)][_0x1c2e59(0x206)]['Global'];this[_0x1c2e59(0x378)][_0x1c2e59(0x1d9)]=this[_0x1c2e59(0x378)]['passiveStates'][_0x1c2e59(0x24f)](_0x502209);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2da)]=function(_0xde9209){const _0x3da5dc=_0x244f65;if(typeof _0xde9209!=='number')_0xde9209=_0xde9209['id'];return this[_0x3da5dc(0x248)][_0xde9209]||0x0;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x3ab)]=function(_0x94b070,_0x49c79c){const _0xbbae53=_0x244f65;if(typeof _0x94b070!==_0xbbae53(0x268))_0x94b070=_0x94b070['id'];if(this['isStateAffected'](_0x94b070)){const _0x10828f=DataManager['stateMaximumTurns'](_0x94b070);this['_stateTurns'][_0x94b070]=_0x49c79c[_0xbbae53(0x3b8)](0x0,_0x10828f);if(this[_0xbbae53(0x248)][_0x94b070]<=0x0)this[_0xbbae53(0x17a)](_0x94b070);}},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x34a)]=function(_0x518ff1,_0x58b110){const _0x33aed6=_0x244f65;if(typeof _0x518ff1!==_0x33aed6(0x268))_0x518ff1=_0x518ff1['id'];this[_0x33aed6(0x26c)](_0x518ff1)&&(_0x58b110+=this[_0x33aed6(0x2da)](_0x518ff1),this[_0x33aed6(0x3ab)](_0x518ff1,_0x58b110));},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1d8)]=Game_BattlerBase['prototype']['eraseBuff'],Game_BattlerBase['prototype'][_0x244f65(0x26e)]=function(_0x11c058){const _0xe95d89=_0x244f65,_0x4390eb=this[_0xe95d89(0x236)][_0x11c058];VisuMZ['SkillsStatesCore'][_0xe95d89(0x1d8)][_0xe95d89(0x1d0)](this,_0x11c058);if(_0x4390eb>0x0)this[_0xe95d89(0x339)](_0x11c058);if(_0x4390eb<0x0)this[_0xe95d89(0x2a6)](_0x11c058);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x285)]=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x36d)],Game_BattlerBase['prototype'][_0x244f65(0x36d)]=function(_0x462be3){const _0x2d0cf9=_0x244f65;VisuMZ[_0x2d0cf9(0x2b5)][_0x2d0cf9(0x285)][_0x2d0cf9(0x1d0)](this,_0x462be3);if(!this[_0x2d0cf9(0x1c6)](_0x462be3))this[_0x2d0cf9(0x26e)](_0x462be3);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x239)]=Game_BattlerBase['prototype'][_0x244f65(0x17d)],Game_BattlerBase['prototype'][_0x244f65(0x17d)]=function(_0x1b5008){const _0xdbfbd5=_0x244f65;VisuMZ[_0xdbfbd5(0x2b5)]['Game_BattlerBase_decreaseBuff'][_0xdbfbd5(0x1d0)](this,_0x1b5008);if(!this[_0xdbfbd5(0x1c6)](_0x1b5008))this[_0xdbfbd5(0x26e)](_0x1b5008);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x339)]=function(_0x360a89){},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2a6)]=function(_0x24776d){},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1e7)]=function(_0x8909d7){const _0xd2d18a=_0x244f65;return this[_0xd2d18a(0x236)][_0x8909d7]===VisuMZ[_0xd2d18a(0x2b5)][_0xd2d18a(0x253)][_0xd2d18a(0x362)][_0xd2d18a(0x2f3)];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x200)]=function(_0x1a792e){const _0xc42e8f=_0x244f65;return this['_buffs'][_0x1a792e]===-VisuMZ[_0xc42e8f(0x2b5)][_0xc42e8f(0x253)]['Buffs'][_0xc42e8f(0x19b)];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x375)]=Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x295)],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x295)]=function(_0xa21b90,_0x2ede9f){const _0x5264d3=_0x244f65;return _0xa21b90=_0xa21b90[_0x5264d3(0x3b8)](-0x2,0x2),VisuMZ['SkillsStatesCore'][_0x5264d3(0x375)]['call'](this,_0xa21b90,_0x2ede9f);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2d2)]=function(_0x5c6fd6){const _0x45171a=_0x244f65,_0x98cc5d=this['_buffs'][_0x5c6fd6];return VisuMZ[_0x45171a(0x2b5)]['Settings'][_0x45171a(0x362)][_0x45171a(0x388)]['call'](this,_0x5c6fd6,_0x98cc5d);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2e4)]=function(_0x4073d6){const _0x2824ae=_0x244f65;return this[_0x2824ae(0x2f8)][_0x4073d6]||0x0;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2f2)]=function(_0x4115dd){return this['buffTurns'](_0x4115dd);},Game_BattlerBase[_0x244f65(0x355)]['setBuffTurns']=function(_0x35de94,_0x1ade84){const _0x2b1665=_0x244f65;if(this[_0x2b1665(0x32c)](_0x35de94)){const _0x43e555=VisuMZ[_0x2b1665(0x2b5)][_0x2b1665(0x253)][_0x2b1665(0x362)][_0x2b1665(0x196)];this[_0x2b1665(0x2f8)][_0x35de94]=_0x1ade84[_0x2b1665(0x3b8)](0x0,_0x43e555);}},Game_BattlerBase['prototype'][_0x244f65(0x204)]=function(_0x163a13,_0x159167){const _0x300088=_0x244f65;this[_0x300088(0x32c)](_0x163a13)&&(_0x159167+=this[_0x300088(0x2e4)](stateId),this[_0x300088(0x3ab)](_0x163a13,_0x159167));},Game_BattlerBase['prototype']['setDebuffTurns']=function(_0xadc09a,_0x2e8b88){const _0x30a078=_0x244f65;if(this[_0x30a078(0x280)](_0xadc09a)){const _0x5af4c4=VisuMZ[_0x30a078(0x2b5)][_0x30a078(0x253)][_0x30a078(0x362)][_0x30a078(0x196)];this[_0x30a078(0x2f8)][_0xadc09a]=_0x2e8b88[_0x30a078(0x3b8)](0x0,_0x5af4c4);}},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x21e)]=function(_0x4de1cb,_0x2ee862){const _0x36d88c=_0x244f65;this['isDebuffAffected'](_0x4de1cb)&&(_0x2ee862+=this[_0x36d88c(0x2e4)](stateId),this[_0x36d88c(0x3ab)](_0x4de1cb,_0x2ee862));},Game_BattlerBase[_0x244f65(0x355)]['stateData']=function(_0x499c2e){const _0x12d780=_0x244f65;if(typeof _0x499c2e!==_0x12d780(0x268))_0x499c2e=_0x499c2e['id'];return this[_0x12d780(0x322)]=this[_0x12d780(0x322)]||{},this[_0x12d780(0x322)][_0x499c2e]=this[_0x12d780(0x322)][_0x499c2e]||{},this[_0x12d780(0x322)][_0x499c2e];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x3c3)]=function(_0xdc1601,_0x23769e){const _0x4ac645=_0x244f65;if(typeof _0xdc1601!=='number')_0xdc1601=_0xdc1601['id'];const _0x1c5d34=this[_0x4ac645(0x284)](_0xdc1601);return _0x1c5d34[_0x23769e];},Game_BattlerBase['prototype'][_0x244f65(0x2c5)]=function(_0xa65c5e,_0x18274c,_0x463a54){if(typeof _0xa65c5e!=='number')_0xa65c5e=_0xa65c5e['id'];const _0x60c9cd=this['stateData'](_0xa65c5e);_0x60c9cd[_0x18274c]=_0x463a54;},Game_BattlerBase['prototype'][_0x244f65(0x238)]=function(_0x2752d1){const _0xb5ffa9=_0x244f65;if(typeof _0x2752d1!=='number')_0x2752d1=_0x2752d1['id'];this[_0xb5ffa9(0x322)]=this[_0xb5ffa9(0x322)]||{},this['_stateData'][_0x2752d1]={};},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x27d)]=function(_0x42da2b){const _0x4286c1=_0x244f65;if(typeof _0x42da2b!==_0x4286c1(0x268))_0x42da2b=_0x42da2b['id'];return this[_0x4286c1(0x1a4)]=this[_0x4286c1(0x1a4)]||{},this[_0x4286c1(0x1a4)][_0x42da2b]===undefined&&(this['_stateDisplay'][_0x42da2b]=''),this[_0x4286c1(0x1a4)][_0x42da2b];},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x317)]=function(_0x561285,_0x598309){const _0x4d0ad8=_0x244f65;if(typeof _0x561285!==_0x4d0ad8(0x268))_0x561285=_0x561285['id'];this[_0x4d0ad8(0x1a4)]=this['_stateDisplay']||{},this[_0x4d0ad8(0x1a4)][_0x561285]=_0x598309;},Game_BattlerBase[_0x244f65(0x355)]['clearStateDisplay']=function(_0x453fac){const _0x375a13=_0x244f65;if(typeof _0x453fac!==_0x375a13(0x268))_0x453fac=_0x453fac['id'];this[_0x375a13(0x1a4)]=this[_0x375a13(0x1a4)]||{},this[_0x375a13(0x1a4)][_0x453fac]='';},Game_BattlerBase[_0x244f65(0x355)]['getStateOrigin']=function(_0x4e5336){const _0x1cc841=_0x244f65;if(typeof _0x4e5336!==_0x1cc841(0x268))_0x4e5336=_0x4e5336['id'];this[_0x1cc841(0x1d7)]=this[_0x1cc841(0x1d7)]||{},this['_stateOrigin'][_0x4e5336]=this['_stateOrigin'][_0x4e5336]||_0x1cc841(0x38d);const _0x312d40=this['_stateOrigin'][_0x4e5336];return this[_0x1cc841(0x32e)](_0x312d40);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x313)]=function(_0x3b22ec,_0x3fc512){const _0x441104=_0x244f65;this[_0x441104(0x1d7)]=this[_0x441104(0x1d7)]||{};const _0x7befc=_0x3fc512?this[_0x441104(0x3ae)](_0x3fc512):this[_0x441104(0x27f)]();this[_0x441104(0x1d7)][_0x3b22ec]=_0x7befc;},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x312)]=function(_0x5617b2){const _0x373bcb=_0x244f65;this[_0x373bcb(0x1d7)]=this[_0x373bcb(0x1d7)]||{},delete this[_0x373bcb(0x1d7)][_0x5617b2];},Game_BattlerBase[_0x244f65(0x355)]['getCurrentStateOriginKey']=function(){const _0x5059c6=_0x244f65,_0x219fc4=this['getCurrentStateActiveUser']();return this[_0x5059c6(0x3ae)](_0x219fc4);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x1b0)]=function(){const _0x46b204=_0x244f65;if($gameParty[_0x46b204(0x1a5)]()){if(BattleManager[_0x46b204(0x37b)])return BattleManager[_0x46b204(0x37b)];else{if(BattleManager[_0x46b204(0x2ac)])return BattleManager[_0x46b204(0x2ac)];}}else{const _0x4c7d5a=SceneManager[_0x46b204(0x273)];if(![Scene_Map,Scene_Item][_0x46b204(0x22d)](_0x4c7d5a[_0x46b204(0x2b6)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x244f65(0x355)]['convertTargetToStateOriginKey']=function(_0x1415bd){const _0x2dd2c9=_0x244f65;if(!_0x1415bd)return _0x2dd2c9(0x38d);if(_0x1415bd[_0x2dd2c9(0x2f5)]())return _0x2dd2c9(0x228)[_0x2dd2c9(0x360)](_0x1415bd['actorId']());else{const _0x186423=_0x2dd2c9(0x2fa)[_0x2dd2c9(0x360)](_0x1415bd[_0x2dd2c9(0x2d0)]()),_0x58ad67=_0x2dd2c9(0x3a2)['format'](_0x1415bd[_0x2dd2c9(0x2de)]()),_0x5f2532=_0x2dd2c9(0x35d)[_0x2dd2c9(0x360)]($gameTroop[_0x2dd2c9(0x289)]());return _0x2dd2c9(0x175)[_0x2dd2c9(0x360)](_0x186423,_0x58ad67,_0x5f2532);}return _0x2dd2c9(0x38d);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x32e)]=function(_0x439895){const _0x9e37d8=_0x244f65;if(_0x439895==='user')return this;else{if(_0x439895['match'](/<actor-(\d+)>/i))return $gameActors[_0x9e37d8(0x218)](Number(RegExp['$1']));else{if($gameParty[_0x9e37d8(0x1a5)]()&&_0x439895[_0x9e37d8(0x316)](/<troop-(\d+)>/i)){const _0x1819b6=Number(RegExp['$1']);if(_0x1819b6===$gameTroop['getCurrentTroopUniqueID']()){if(_0x439895[_0x9e37d8(0x316)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x439895[_0x9e37d8(0x316)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore']['Game_Battler_addState']=Game_Battler['prototype'][_0x244f65(0x1ee)],Game_Battler[_0x244f65(0x355)][_0x244f65(0x1ee)]=function(_0x1ccf51){const _0x6fa35c=_0x244f65,_0x303cad=this['isStateAddable'](_0x1ccf51);VisuMZ[_0x6fa35c(0x2b5)][_0x6fa35c(0x28d)][_0x6fa35c(0x1d0)](this,_0x1ccf51);if(_0x303cad&&this[_0x6fa35c(0x16e)]($dataStates[_0x1ccf51])){this[_0x6fa35c(0x2f7)](_0x1ccf51);;}},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x39b)]=Game_Battler[_0x244f65(0x355)][_0x244f65(0x1f6)],Game_Battler[_0x244f65(0x355)][_0x244f65(0x1f6)]=function(_0x28a0a6){const _0x2db9dd=_0x244f65,_0x27e5aa=$dataStates[_0x28a0a6];if(_0x27e5aa&&_0x27e5aa['note']['match'](/<NO DEATH CLEAR>/i))return!this[_0x2db9dd(0x192)](_0x28a0a6)&&!this[_0x2db9dd(0x34b)](_0x28a0a6)&&!this[_0x2db9dd(0x373)][_0x2db9dd(0x318)](_0x28a0a6);return VisuMZ[_0x2db9dd(0x2b5)][_0x2db9dd(0x39b)][_0x2db9dd(0x1d0)](this,_0x28a0a6);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x2f7)]=function(_0xaf19af){const _0x138946=_0x244f65;this[_0x138946(0x313)](_0xaf19af),this[_0x138946(0x210)](_0xaf19af),this['onAddStateCustomJS'](_0xaf19af),this[_0x138946(0x1a2)](_0xaf19af);},Game_Battler['prototype'][_0x244f65(0x222)]=function(_0x2757fc){const _0x227000=_0x244f65;Game_BattlerBase[_0x227000(0x355)]['onRemoveState'][_0x227000(0x1d0)](this,_0x2757fc),this['onEraseStateCustomJS'](_0x2757fc),this[_0x227000(0x305)](_0x2757fc);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x35e)]=function(_0x5409e2){const _0x20e820=_0x244f65;for(const _0x41a2f5 of this[_0x20e820(0x348)]()){this[_0x20e820(0x17c)](_0x41a2f5['id'])&&_0x41a2f5[_0x20e820(0x33d)]===_0x5409e2&&(this[_0x20e820(0x17a)](_0x41a2f5['id']),this[_0x20e820(0x2d6)](_0x41a2f5['id']),this[_0x20e820(0x306)](_0x41a2f5['id']));}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x2d6)]=function(_0x5d0d70){const _0x429d0d=_0x244f65;this[_0x429d0d(0x232)](_0x5d0d70);},Game_Battler['prototype'][_0x244f65(0x240)]=function(_0x4a5167){const _0x3fdc61=_0x244f65;if(this[_0x3fdc61(0x286)]||this['_tempBattler'])return;const _0x3cee07=VisuMZ[_0x3fdc61(0x2b5)][_0x3fdc61(0x23d)];if(_0x3cee07[_0x4a5167])_0x3cee07[_0x4a5167][_0x3fdc61(0x1d0)](this,_0x4a5167);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x3a3)]=function(_0x15c459){const _0x5e3fe1=_0x244f65;if(this['_tempActor']||this['_tempBattler'])return;const _0x539b33=VisuMZ[_0x5e3fe1(0x2b5)][_0x5e3fe1(0x237)];if(_0x539b33[_0x15c459])_0x539b33[_0x15c459][_0x5e3fe1(0x1d0)](this,_0x15c459);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x232)]=function(_0xd4f1bd){const _0x1755b5=_0x244f65;if(this[_0x1755b5(0x286)]||this[_0x1755b5(0x3bc)])return;const _0x1f70f5=VisuMZ['SkillsStatesCore'][_0x1755b5(0x258)];if(_0x1f70f5[_0xd4f1bd])_0x1f70f5[_0xd4f1bd][_0x1755b5(0x1d0)](this,_0xd4f1bd);},Game_Battler[_0x244f65(0x355)]['onAddStateGlobalJS']=function(_0x240bef){const _0x1339a6=_0x244f65;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x1339a6(0x2b5)][_0x1339a6(0x253)][_0x1339a6(0x2e6)][_0x1339a6(0x23f)][_0x1339a6(0x1d0)](this,_0x240bef);}catch(_0x27ab20){if($gameTemp[_0x1339a6(0x371)]())console[_0x1339a6(0x193)](_0x27ab20);}},Game_Battler['prototype'][_0x244f65(0x305)]=function(_0x5228be){const _0x3b3d1f=_0x244f65;if(this[_0x3b3d1f(0x286)]||this[_0x3b3d1f(0x3bc)])return;try{VisuMZ['SkillsStatesCore'][_0x3b3d1f(0x253)][_0x3b3d1f(0x2e6)][_0x3b3d1f(0x27e)][_0x3b3d1f(0x1d0)](this,_0x5228be);}catch(_0x39f0fd){if($gameTemp[_0x3b3d1f(0x371)]())console[_0x3b3d1f(0x193)](_0x39f0fd);}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x306)]=function(_0x3ea673){const _0x52549a=_0x244f65;if(this[_0x52549a(0x286)]||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore'][_0x52549a(0x253)]['States']['onExpireStateJS'][_0x52549a(0x1d0)](this,_0x3ea673);}catch(_0x13bd48){if($gameTemp[_0x52549a(0x371)]())console[_0x52549a(0x193)](_0x13bd48);}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x354)]=function(_0x59ff19){const _0x2144ff=_0x244f65;return _0x59ff19=_0x59ff19[_0x2144ff(0x179)]()['trim'](),this[_0x2144ff(0x348)]()[_0x2144ff(0x30b)](_0x704175=>_0x704175['categories']['includes'](_0x59ff19));},Game_Battler['prototype']['removeStatesByCategory']=function(_0x49a291,_0x2225a2){const _0x1ed2ed=_0x244f65;_0x49a291=_0x49a291[_0x1ed2ed(0x179)]()[_0x1ed2ed(0x18e)](),_0x2225a2=_0x2225a2||0x0;const _0x3a3187=this[_0x1ed2ed(0x354)](_0x49a291),_0x6b897e=[];for(const _0x1b1352 of _0x3a3187){if(!_0x1b1352)continue;if(_0x2225a2<=0x0)return;_0x6b897e[_0x1ed2ed(0x1f5)](_0x1b1352['id']),this[_0x1ed2ed(0x373)]['success']=!![],_0x2225a2--;}while(_0x6b897e[_0x1ed2ed(0x3aa)]>0x0){this[_0x1ed2ed(0x17a)](_0x6b897e[_0x1ed2ed(0x367)]());}},Game_Battler[_0x244f65(0x355)]['removeStatesByCategoryAll']=function(_0x3d5206){const _0x34cf69=_0x244f65;_0x3d5206=_0x3d5206[_0x34cf69(0x179)]()['trim']();const _0xd6b743=this[_0x34cf69(0x354)](_0x3d5206),_0x2ff250=[];for(const _0x29df0b of _0xd6b743){if(!_0x29df0b)continue;_0x2ff250[_0x34cf69(0x1f5)](_0x29df0b['id']),this[_0x34cf69(0x373)][_0x34cf69(0x1bb)]=!![];}while(_0x2ff250[_0x34cf69(0x3aa)]>0x0){this['removeState'](_0x2ff250[_0x34cf69(0x367)]());}},Game_Battler[_0x244f65(0x355)]['isStateCategoryAffected']=function(_0x17b6e4){const _0xce2521=_0x244f65;return this[_0xce2521(0x229)](_0x17b6e4)>0x0;},Game_Battler[_0x244f65(0x355)][_0x244f65(0x1f3)]=function(_0x5264bd){const _0x5283c2=_0x244f65;return this[_0x5283c2(0x214)](_0x5264bd)>0x0;},Game_Battler[_0x244f65(0x355)][_0x244f65(0x229)]=function(_0x3bc7a7){const _0x5298c2=_0x244f65,_0x4bf4b4=this['statesByCategory'](_0x3bc7a7)[_0x5298c2(0x30b)](_0x2c7f85=>this['isStateAffected'](_0x2c7f85['id']));return _0x4bf4b4[_0x5298c2(0x3aa)];},Game_Battler[_0x244f65(0x355)][_0x244f65(0x214)]=function(_0x266dc4){const _0x286621=_0x244f65,_0x4bc5c0=this[_0x286621(0x354)](_0x266dc4);return _0x4bc5c0['length'];},VisuMZ[_0x244f65(0x2b5)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x244f65(0x355)]['isStateResist'],Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x192)]=function(_0x42a6f2){const _0x385e6a=_0x244f65,_0x406fd8=$dataStates[_0x42a6f2];if(_0x406fd8&&_0x406fd8[_0x385e6a(0x28c)][_0x385e6a(0x3aa)]>0x0)for(const _0x29e543 of _0x406fd8['categories']){if(this['isStateCategoryResisted'](_0x29e543))return!![];}return VisuMZ[_0x385e6a(0x2b5)][_0x385e6a(0x19c)]['call'](this,_0x42a6f2);},Game_BattlerBase[_0x244f65(0x355)]['isStateCategoryResisted']=function(_0x39c792){const _0x1611a8=_0x244f65;let _0xd71c4d=_0x1611a8(0x2d8);if(this[_0x1611a8(0x1e2)](_0xd71c4d))return this[_0x1611a8(0x378)][_0xd71c4d][_0x1611a8(0x22d)](_0x39c792);return this[_0x1611a8(0x378)][_0xd71c4d]=this[_0x1611a8(0x340)](),this[_0x1611a8(0x378)][_0xd71c4d][_0x1611a8(0x22d)](_0x39c792);},Game_BattlerBase['prototype'][_0x244f65(0x340)]=function(){const _0x56ea07=_0x244f65,_0x4189c6=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x1f525e=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x14186c=[];for(const _0xa23ce of this[_0x56ea07(0x28f)]()){if(!_0xa23ce)continue;const _0x5c3816=_0xa23ce[_0x56ea07(0x2e2)],_0x2fd698=_0x5c3816[_0x56ea07(0x316)](_0x4189c6);if(_0x2fd698)for(const _0x40d420 of _0x2fd698){_0x40d420[_0x56ea07(0x316)](_0x4189c6);const _0x16a48b=String(RegExp['$1'])['split'](',')[_0x56ea07(0x185)](_0x59b441=>String(_0x59b441)[_0x56ea07(0x179)]()[_0x56ea07(0x18e)]());_0x14186c=_0x14186c[_0x56ea07(0x24f)](_0x16a48b);}if(_0x5c3816[_0x56ea07(0x316)](_0x1f525e)){const _0x5d1b02=String(RegExp['$1'])[_0x56ea07(0x278)](/[\r\n]+/)[_0x56ea07(0x185)](_0xad2b31=>String(_0xad2b31)[_0x56ea07(0x179)]()[_0x56ea07(0x18e)]());_0x14186c=_0x14186c[_0x56ea07(0x24f)](_0x5d1b02);}}return _0x14186c;},VisuMZ['SkillsStatesCore'][_0x244f65(0x2f0)]=Game_Battler[_0x244f65(0x355)]['addBuff'],Game_Battler[_0x244f65(0x355)][_0x244f65(0x1c2)]=function(_0x394566,_0x3e77d7){const _0xb2ec14=_0x244f65;VisuMZ[_0xb2ec14(0x2b5)][_0xb2ec14(0x2f0)]['call'](this,_0x394566,_0x3e77d7),this[_0xb2ec14(0x32c)](_0x394566)&&this[_0xb2ec14(0x1ed)](_0x394566,_0x3e77d7);},Game_Battler[_0x244f65(0x355)]['isBuffPrevented']=function(_0x5c5a6e){},VisuMZ['SkillsStatesCore'][_0x244f65(0x234)]=Game_Battler[_0x244f65(0x355)][_0x244f65(0x1a6)],Game_Battler[_0x244f65(0x355)]['addDebuff']=function(_0x4f0a9d,_0x5375fb){const _0x228a7b=_0x244f65;VisuMZ[_0x228a7b(0x2b5)]['Game_Battler_addDebuff'][_0x228a7b(0x1d0)](this,_0x4f0a9d,_0x5375fb),this[_0x228a7b(0x280)](_0x4f0a9d)&&this[_0x228a7b(0x291)](_0x4f0a9d,_0x5375fb);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x195)]=function(){const _0x220719=_0x244f65;for(let _0x4f9ad1=0x0;_0x4f9ad1<this[_0x220719(0x3a5)]();_0x4f9ad1++){if(this[_0x220719(0x39e)](_0x4f9ad1)){const _0x1c0d08=this[_0x220719(0x236)][_0x4f9ad1];this[_0x220719(0x33c)](_0x4f9ad1);if(_0x1c0d08>0x0)this['onExpireBuff'](_0x4f9ad1);if(_0x1c0d08<0x0)this[_0x220719(0x1e1)](_0x4f9ad1);}}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x1ed)]=function(_0x274fe9,_0x563de8){const _0xb359ed=_0x244f65;this[_0xb359ed(0x28a)](_0x274fe9,_0x563de8);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x291)]=function(_0x57049a,_0x3cab60){const _0x464c2e=_0x244f65;this[_0x464c2e(0x38a)](_0x57049a,_0x3cab60);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x339)]=function(_0x421e5f){const _0x1d69d1=_0x244f65;Game_BattlerBase[_0x1d69d1(0x355)][_0x1d69d1(0x339)]['call'](this,_0x421e5f),this[_0x1d69d1(0x263)](_0x421e5f);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x2a6)]=function(_0x2f3ab7){const _0x205045=_0x244f65;Game_BattlerBase[_0x205045(0x355)][_0x205045(0x2a6)]['call'](this,_0x2f3ab7),this[_0x205045(0x2f1)](_0x2f3ab7);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x3be)]=function(_0x343af6){const _0x454318=_0x244f65;this[_0x454318(0x2e3)](_0x343af6);},Game_Battler['prototype'][_0x244f65(0x1e1)]=function(_0x5af656){this['onExpireDebuffGlobalJS'](_0x5af656);},Game_Battler['prototype'][_0x244f65(0x28a)]=function(_0x323631,_0x4b9211){const _0x123dd2=_0x244f65;VisuMZ[_0x123dd2(0x2b5)][_0x123dd2(0x253)][_0x123dd2(0x362)][_0x123dd2(0x386)][_0x123dd2(0x1d0)](this,_0x323631,_0x4b9211);},Game_Battler[_0x244f65(0x355)]['onAddDebuffGlobalJS']=function(_0x503005,_0x434950){const _0x3ecdd8=_0x244f65;VisuMZ[_0x3ecdd8(0x2b5)][_0x3ecdd8(0x253)]['Buffs']['onAddDebuffJS'][_0x3ecdd8(0x1d0)](this,_0x503005,_0x434950);},Game_BattlerBase[_0x244f65(0x355)]['onEraseBuffGlobalJS']=function(_0x4833fd){const _0x4f83d3=_0x244f65;VisuMZ[_0x4f83d3(0x2b5)][_0x4f83d3(0x253)][_0x4f83d3(0x362)][_0x4f83d3(0x215)][_0x4f83d3(0x1d0)](this,_0x4833fd);},Game_BattlerBase[_0x244f65(0x355)][_0x244f65(0x2f1)]=function(_0xbb0a17){const _0x5322dc=_0x244f65;VisuMZ[_0x5322dc(0x2b5)]['Settings'][_0x5322dc(0x362)][_0x5322dc(0x2e1)][_0x5322dc(0x1d0)](this,_0xbb0a17);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x2e3)]=function(_0x2cf0ea){const _0x2a2048=_0x244f65;VisuMZ['SkillsStatesCore'][_0x2a2048(0x253)][_0x2a2048(0x362)][_0x2a2048(0x1ba)][_0x2a2048(0x1d0)](this,_0x2cf0ea);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x24b)]=function(_0x41001c){const _0x4f9cb5=_0x244f65;VisuMZ[_0x4f9cb5(0x2b5)][_0x4f9cb5(0x253)][_0x4f9cb5(0x362)][_0x4f9cb5(0x363)][_0x4f9cb5(0x1d0)](this,_0x41001c);},Game_Battler[_0x244f65(0x355)][_0x244f65(0x210)]=function(_0x3a1c14){const _0x47d9be=_0x244f65,_0x281918=VisuMZ[_0x47d9be(0x2b5)],_0x343dbe=[_0x47d9be(0x341),_0x47d9be(0x279),_0x47d9be(0x27a),'stateMpSlipHealJS',_0x47d9be(0x1f8),_0x47d9be(0x190)];for(const _0x33c8d0 of _0x343dbe){_0x281918[_0x33c8d0][_0x3a1c14]&&_0x281918[_0x33c8d0][_0x3a1c14][_0x47d9be(0x1d0)](this,_0x3a1c14);}},VisuMZ['SkillsStatesCore'][_0x244f65(0x184)]=Game_Battler['prototype'][_0x244f65(0x31c)],Game_Battler[_0x244f65(0x355)][_0x244f65(0x31c)]=function(){const _0x57952a=_0x244f65;this[_0x57952a(0x393)](),VisuMZ[_0x57952a(0x2b5)][_0x57952a(0x184)][_0x57952a(0x1d0)](this),this[_0x57952a(0x30f)](),this[_0x57952a(0x220)]();},Game_Battler['prototype'][_0x244f65(0x30f)]=function(){const _0x29e608=_0x244f65;for(const _0x449a48 of this[_0x29e608(0x1d9)]()){if(!_0x449a48)continue;this[_0x29e608(0x210)](_0x449a48['id']);}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x393)]=function(){const _0x60a91d=_0x244f65;for(const _0x8c4842 of this[_0x60a91d(0x348)]()){if(!_0x8c4842)continue;_0x8c4842[_0x60a91d(0x2e2)][_0x60a91d(0x316)](/<JS SLIP REFRESH>/i)&&this[_0x60a91d(0x210)](_0x8c4842['id']);}},Game_Battler[_0x244f65(0x355)]['regenerateAllSkillsStatesCore']=function(){const _0x40e16c=_0x244f65;if(!this[_0x40e16c(0x191)]())return;const _0x20ed32=this[_0x40e16c(0x348)]();for(const _0x159f27 of _0x20ed32){if(!_0x159f27)continue;this['onRegenerateCustomStateDamageOverTime'](_0x159f27);}},Game_Battler[_0x244f65(0x355)][_0x244f65(0x202)]=function(_0x33130d){const _0x3db58a=_0x244f65,_0x5e3287=this['getStateData'](_0x33130d['id'],_0x3db58a(0x2aa))||0x0,_0x4a807e=-this[_0x3db58a(0x390)](),_0x561396=Math[_0x3db58a(0x262)](_0x5e3287,_0x4a807e);if(_0x561396!==0x0)this[_0x3db58a(0x21d)](_0x561396);const _0x4f35b0=this[_0x3db58a(0x3c3)](_0x33130d['id'],_0x3db58a(0x2b9))||0x0;if(_0x4f35b0!==0x0)this['gainMp'](_0x4f35b0);const _0x35cf2e=this[_0x3db58a(0x3c3)](_0x33130d['id'],_0x3db58a(0x1d6))||0x0;if(_0x35cf2e!==0x0)this['gainSilentTp'](_0x35cf2e);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x25d)]=Game_Actor['prototype']['skillTypes'],Game_Actor['prototype']['skillTypes']=function(){const _0x59dd58=_0x244f65,_0x42e0c6=VisuMZ[_0x59dd58(0x2b5)][_0x59dd58(0x25d)][_0x59dd58(0x1d0)](this),_0x17070f=VisuMZ[_0x59dd58(0x2b5)][_0x59dd58(0x253)]['Skills'];let _0x2678f5=_0x17070f['HiddenSkillTypes'];return $gameParty[_0x59dd58(0x1a5)]()&&(_0x2678f5=_0x2678f5[_0x59dd58(0x24f)](_0x17070f[_0x59dd58(0x250)])),_0x42e0c6[_0x59dd58(0x30b)](_0x4ff27=>!_0x2678f5[_0x59dd58(0x22d)](_0x4ff27));},Game_Actor['prototype'][_0x244f65(0x28e)]=function(){const _0x5e8815=_0x244f65;return this['skills']()[_0x5e8815(0x30b)](_0x4f8ffb=>this[_0x5e8815(0x2fb)](_0x4f8ffb));},Game_Actor[_0x244f65(0x355)][_0x244f65(0x2fb)]=function(_0x12318a){const _0x5ef03b=_0x244f65;if(!this[_0x5ef03b(0x1ec)](_0x12318a))return![];if(!_0x12318a)return![];if(!this['isSkillTypeMatchForUse'](_0x12318a))return![];if(this[_0x5ef03b(0x2ea)](_0x12318a))return![];return!![];},Game_Actor[_0x244f65(0x355)][_0x244f65(0x2af)]=function(_0x64ff0d){const _0xf7a4d5=_0x244f65,_0x2e1580=this['skillTypes'](),_0x3ad898=DataManager['getSkillTypes'](_0x64ff0d),_0x47cd1b=_0x2e1580[_0xf7a4d5(0x30b)](_0x1b9c90=>_0x3ad898[_0xf7a4d5(0x22d)](_0x1b9c90));return _0x47cd1b[_0xf7a4d5(0x3aa)]>0x0;},Game_Actor[_0x244f65(0x355)][_0x244f65(0x2ea)]=function(_0x45e56e){const _0x27b204=_0x244f65;if(!VisuMZ[_0x27b204(0x2b5)][_0x27b204(0x2df)](this,_0x45e56e))return!![];if(!VisuMZ[_0x27b204(0x2b5)][_0x27b204(0x301)](this,_0x45e56e))return!![];if(!VisuMZ[_0x27b204(0x2b5)]['CheckVisibleSkillNotetags'](this,_0x45e56e))return!![];return![];},Game_Actor[_0x244f65(0x355)][_0x244f65(0x1eb)]=function(){const _0x2ada66=_0x244f65;let _0x42a189=[this['actor'](),this['currentClass']()];_0x42a189=_0x42a189[_0x2ada66(0x24f)](this['equips']()[_0x2ada66(0x30b)](_0x4eb65e=>_0x4eb65e));for(const _0x480efc of this[_0x2ada66(0x281)]){const _0x89a9c5=$dataSkills[_0x480efc];if(_0x89a9c5)_0x42a189[_0x2ada66(0x1f5)](_0x89a9c5);}return _0x42a189;},Game_Actor[_0x244f65(0x355)][_0x244f65(0x314)]=function(){const _0x45b131=_0x244f65;Game_Battler[_0x45b131(0x355)][_0x45b131(0x314)]['call'](this);const _0x15070f=VisuMZ[_0x45b131(0x2b5)][_0x45b131(0x253)][_0x45b131(0x206)][_0x45b131(0x2c0)];this[_0x45b131(0x378)][_0x45b131(0x1d9)]=this[_0x45b131(0x378)][_0x45b131(0x1d9)][_0x45b131(0x24f)](_0x15070f);},VisuMZ['SkillsStatesCore'][_0x244f65(0x345)]=Game_Actor[_0x244f65(0x355)][_0x244f65(0x251)],Game_Actor['prototype'][_0x244f65(0x251)]=function(_0x30fd99){const _0x40a91f=_0x244f65;VisuMZ[_0x40a91f(0x2b5)][_0x40a91f(0x345)][_0x40a91f(0x1d0)](this,_0x30fd99),this[_0x40a91f(0x378)]={};},VisuMZ[_0x244f65(0x2b5)]['Game_Actor_forgetSkill']=Game_Actor[_0x244f65(0x355)]['forgetSkill'],Game_Actor['prototype'][_0x244f65(0x374)]=function(_0x4a8874){const _0x5c70da=_0x244f65;VisuMZ[_0x5c70da(0x2b5)]['Game_Actor_forgetSkill'][_0x5c70da(0x1d0)](this,_0x4a8874),this[_0x5c70da(0x378)]={};},Game_Actor['prototype']['stepsForTurn']=function(){const _0x5ebcd6=_0x244f65;return VisuMZ[_0x5ebcd6(0x2b5)][_0x5ebcd6(0x253)][_0x5ebcd6(0x2e6)][_0x5ebcd6(0x1da)]??0x14;},Game_Enemy[_0x244f65(0x355)]['passiveStateObjects']=function(){const _0x164d43=_0x244f65;let _0x5ccffa=[this['enemy']()];return _0x5ccffa[_0x164d43(0x24f)](this[_0x164d43(0x396)]());},Game_Enemy[_0x244f65(0x355)][_0x244f65(0x314)]=function(){const _0x3eacdd=_0x244f65;Game_Battler['prototype']['addPassiveStatesByPluginParameters'][_0x3eacdd(0x1d0)](this);const _0x47f299=VisuMZ['SkillsStatesCore'][_0x3eacdd(0x253)]['PassiveStates'][_0x3eacdd(0x23b)];this[_0x3eacdd(0x378)][_0x3eacdd(0x1d9)]=this[_0x3eacdd(0x378)]['passiveStates'][_0x3eacdd(0x24f)](_0x47f299);},Game_Enemy[_0x244f65(0x355)][_0x244f65(0x396)]=function(){const _0x2bc13c=_0x244f65,_0x3c193a=[];for(const _0x1071df of this[_0x2bc13c(0x1e8)]()['actions']){const _0x376b74=$dataSkills[_0x1071df[_0x2bc13c(0x1f9)]];if(_0x376b74&&!_0x3c193a[_0x2bc13c(0x22d)](_0x376b74))_0x3c193a[_0x2bc13c(0x1f5)](_0x376b74);}return _0x3c193a;},Game_Enemy['prototype'][_0x244f65(0x17e)]=function(_0x2a0698){const _0x167758=_0x244f65;return this[_0x167758(0x16e)]($dataStates[_0x2a0698]);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x2a8)]=Game_Unit[_0x244f65(0x355)][_0x244f65(0x359)],Game_Unit['prototype'][_0x244f65(0x359)]=function(){const _0x1bb030=_0x244f65;if(this[_0x1bb030(0x28b)]())return!![];return VisuMZ[_0x1bb030(0x2b5)][_0x1bb030(0x2a8)][_0x1bb030(0x1d0)](this);},Game_Unit[_0x244f65(0x355)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x58d032=_0x244f65,_0x298e9b=this[_0x58d032(0x2a1)]();for(const _0x3f628b of _0x298e9b){if(!_0x3f628b['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x3a0)]=Game_Troop[_0x244f65(0x355)]['setup'],Game_Troop[_0x244f65(0x355)][_0x244f65(0x3a4)]=function(_0x35496b){const _0x2f3f5e=_0x244f65;VisuMZ[_0x2f3f5e(0x2b5)][_0x2f3f5e(0x3a0)][_0x2f3f5e(0x1d0)](this,_0x35496b),this[_0x2f3f5e(0x3b7)]();},Game_Troop[_0x244f65(0x355)][_0x244f65(0x3b7)]=function(){const _0x221e68=_0x244f65;this[_0x221e68(0x302)]=Graphics[_0x221e68(0x2d4)];},Game_Troop[_0x244f65(0x355)][_0x244f65(0x289)]=function(){const _0x1b2efc=_0x244f65;return this[_0x1b2efc(0x302)]=this['_currentTroopUniqueID']||Graphics[_0x1b2efc(0x2d4)],this[_0x1b2efc(0x302)];},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x3a1)]=function(){const _0x489919=_0x244f65;if(ConfigManager[_0x489919(0x21a)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x489919(0x1df)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x489919(0x26b)]()[_0x489919(0x316)](/LOWER/i);else Scene_ItemBase[_0x489919(0x355)][_0x489919(0x2db)]['call'](this);}},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x2db)]=function(){const _0x4c70f3=_0x244f65;if(ConfigManager[_0x4c70f3(0x21a)]&&ConfigManager[_0x4c70f3(0x2e7)]!==undefined)return ConfigManager[_0x4c70f3(0x2e7)];else return this[_0x4c70f3(0x181)]()?this[_0x4c70f3(0x26b)]()[_0x4c70f3(0x316)](/RIGHT/i):Scene_ItemBase[_0x4c70f3(0x355)][_0x4c70f3(0x2db)][_0x4c70f3(0x1d0)](this);},Scene_Skill['prototype'][_0x244f65(0x26b)]=function(){const _0x3f0203=_0x244f65;return VisuMZ[_0x3f0203(0x2b5)]['Settings'][_0x3f0203(0x24e)][_0x3f0203(0x387)];},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x22e)]=function(){const _0x3ca6b4=_0x244f65;return this[_0x3ca6b4(0x3c2)]&&this[_0x3ca6b4(0x3c2)]['isUseModernControls']();},Scene_Skill[_0x244f65(0x355)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x5bba24=_0x244f65;return VisuMZ[_0x5bba24(0x2b5)][_0x5bba24(0x253)][_0x5bba24(0x24e)][_0x5bba24(0x2b3)];},VisuMZ[_0x244f65(0x2b5)]['Scene_Skill_helpWindowRect']=Scene_Skill[_0x244f65(0x355)][_0x244f65(0x267)],Scene_Skill['prototype'][_0x244f65(0x267)]=function(){const _0x162370=_0x244f65;return this[_0x162370(0x181)]()?this[_0x162370(0x187)]():VisuMZ[_0x162370(0x2b5)][_0x162370(0x2a3)][_0x162370(0x1d0)](this);},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x187)]=function(){const _0xd7ab9e=_0x244f65,_0x344479=0x0,_0x2c46a5=this[_0xd7ab9e(0x287)](),_0x2718f1=Graphics[_0xd7ab9e(0x2fe)],_0x5b772d=this['helpAreaHeight']();return new Rectangle(_0x344479,_0x2c46a5,_0x2718f1,_0x5b772d);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x233)]=Scene_Skill[_0x244f65(0x355)]['skillTypeWindowRect'],Scene_Skill[_0x244f65(0x355)]['skillTypeWindowRect']=function(){const _0x5dddbe=_0x244f65;return this[_0x5dddbe(0x181)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x5dddbe(0x2b5)][_0x5dddbe(0x233)][_0x5dddbe(0x1d0)](this);},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x315)]=function(){const _0x220de5=_0x244f65,_0x57eac9=this[_0x220de5(0x39a)](),_0x481bae=this[_0x220de5(0x298)](0x3,!![]),_0x5cb142=this['isRightInputMode']()?Graphics[_0x220de5(0x2fe)]-_0x57eac9:0x0,_0x406e3c=this[_0x220de5(0x29c)]();return new Rectangle(_0x5cb142,_0x406e3c,_0x57eac9,_0x481bae);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x3a9)]=Scene_Skill[_0x244f65(0x355)][_0x244f65(0x2c7)],Scene_Skill[_0x244f65(0x355)][_0x244f65(0x2c7)]=function(){const _0x1f7c94=_0x244f65;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x1f7c94(0x2e0)]():VisuMZ[_0x1f7c94(0x2b5)][_0x1f7c94(0x3a9)]['call'](this);},Scene_Skill['prototype'][_0x244f65(0x2e0)]=function(){const _0x1340c6=_0x244f65,_0x2e7a81=Graphics['boxWidth']-this[_0x1340c6(0x39a)](),_0x2c98aa=this[_0x1340c6(0x3a8)]['height'],_0x52f42e=this['isRightInputMode']()?0x0:Graphics[_0x1340c6(0x2fe)]-_0x2e7a81,_0x3c03cf=this[_0x1340c6(0x29c)]();return new Rectangle(_0x52f42e,_0x3c03cf,_0x2e7a81,_0x2c98aa);},VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow']=Scene_Skill[_0x244f65(0x355)][_0x244f65(0x1b4)],Scene_Skill[_0x244f65(0x355)]['createItemWindow']=function(){const _0x6c1b89=_0x244f65;VisuMZ[_0x6c1b89(0x2b5)][_0x6c1b89(0x1fd)][_0x6c1b89(0x1d0)](this),this['allowCreateShopStatusWindow']()&&this['createShopStatusWindow']();},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x29e)]=Scene_Skill[_0x244f65(0x355)][_0x244f65(0x2e8)],Scene_Skill[_0x244f65(0x355)]['itemWindowRect']=function(){const _0x2948e5=_0x244f65;if(this[_0x2948e5(0x181)]())return this[_0x2948e5(0x343)]();else{const _0x1ca16c=VisuMZ[_0x2948e5(0x2b5)]['Scene_Skill_itemWindowRect']['call'](this);return this['allowCreateShopStatusWindow']()&&this[_0x2948e5(0x225)]()&&(_0x1ca16c[_0x2948e5(0x2c8)]-=this[_0x2948e5(0x25b)]()),_0x1ca16c;}},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x343)]=function(){const _0xcf9f4=_0x244f65,_0x4e4b77=Graphics[_0xcf9f4(0x2fe)]-this[_0xcf9f4(0x25b)](),_0x345f37=this[_0xcf9f4(0x2dd)]()-this[_0xcf9f4(0x1dd)]['height'],_0x4345dc=this[_0xcf9f4(0x2db)]()?Graphics[_0xcf9f4(0x2fe)]-_0x4e4b77:0x0,_0x5dc368=this[_0xcf9f4(0x1dd)]['y']+this[_0xcf9f4(0x1dd)][_0xcf9f4(0x2bd)];return new Rectangle(_0x4345dc,_0x5dc368,_0x4e4b77,_0x345f37);},Scene_Skill[_0x244f65(0x355)]['allowCreateShopStatusWindow']=function(){const _0x2bf45e=_0x244f65;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ[_0x2bf45e(0x2b5)][_0x2bf45e(0x253)][_0x2bf45e(0x24e)][_0x2bf45e(0x275)];},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x225)]=function(){const _0x1fe99f=_0x244f65;return VisuMZ[_0x1fe99f(0x2b5)][_0x1fe99f(0x253)][_0x1fe99f(0x24e)][_0x1fe99f(0x372)];},Scene_Skill['prototype'][_0x244f65(0x299)]=function(){const _0x74fbfb=_0x244f65,_0x39416c=this[_0x74fbfb(0x2b0)]();this[_0x74fbfb(0x230)]=new Window_ShopStatus(_0x39416c),this[_0x74fbfb(0x1bf)](this[_0x74fbfb(0x230)]),this[_0x74fbfb(0x1c9)]['setStatusWindow'](this[_0x74fbfb(0x230)]);const _0x2beca6=VisuMZ[_0x74fbfb(0x2b5)]['Settings'][_0x74fbfb(0x24e)][_0x74fbfb(0x347)];this[_0x74fbfb(0x230)]['setBackgroundType'](_0x2beca6||0x0);},Scene_Skill[_0x244f65(0x355)]['shopStatusWindowRect']=function(){const _0x5e51f7=_0x244f65;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x5e51f7(0x2c1)]():VisuMZ['SkillsStatesCore'][_0x5e51f7(0x253)][_0x5e51f7(0x24e)][_0x5e51f7(0x188)]['call'](this);},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x2c1)]=function(){const _0x4314cf=_0x244f65,_0x3036ab=this[_0x4314cf(0x25b)](),_0x548b1a=this[_0x4314cf(0x1c9)][_0x4314cf(0x2bd)],_0x5545ce=this[_0x4314cf(0x2db)]()?0x0:Graphics[_0x4314cf(0x2fe)]-this[_0x4314cf(0x25b)](),_0xecb444=this[_0x4314cf(0x1c9)]['y'];return new Rectangle(_0x5545ce,_0xecb444,_0x3036ab,_0x548b1a);},Scene_Skill[_0x244f65(0x355)][_0x244f65(0x25b)]=function(){const _0x42c400=_0x244f65;return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop[_0x42c400(0x355)][_0x42c400(0x351)]():0x0;},Scene_Skill[_0x244f65(0x355)]['buttonAssistText1']=function(){const _0x5f1853=_0x244f65;return this[_0x5f1853(0x3a8)]&&this['_skillTypeWindow'][_0x5f1853(0x20c)]?TextManager[_0x5f1853(0x178)]:'';},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x22c)]=Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x34c)],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x34c)]=function(){const _0x42257f=_0x244f65;VisuMZ[_0x42257f(0x2b5)][_0x42257f(0x22c)]['call'](this),this[_0x42257f(0x3b9)]=null;},VisuMZ[_0x244f65(0x2b5)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x3a4)],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x3a4)]=function(_0x38274c,_0x2006a5){const _0x5283e7=_0x244f65;this[_0x5283e7(0x171)](_0x38274c,_0x2006a5),_0x2006a5=_0x2006a5[_0x5283e7(0x2b2)](),VisuMZ[_0x5283e7(0x2b5)]['Sprite_Gauge_setup']['call'](this,_0x38274c,_0x2006a5);},Sprite_Gauge['prototype']['setupSkillsStatesCore']=function(_0x5d4ddf,_0x42720d){const _0x219b11=_0x244f65,_0x444801=VisuMZ[_0x219b11(0x2b5)][_0x219b11(0x253)][_0x219b11(0x1cf)][_0x219b11(0x30b)](_0x97601c=>_0x97601c[_0x219b11(0x194)][_0x219b11(0x179)]()===_0x42720d[_0x219b11(0x179)]());_0x444801[_0x219b11(0x3aa)]>=0x1?this['_costSettings']=_0x444801[0x0]:this['_costSettings']=null;},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x304)]=Sprite_Gauge[_0x244f65(0x355)]['currentValue'],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x2a0)]=function(){const _0x5c6d5e=_0x244f65;return this[_0x5c6d5e(0x2bc)]&&this[_0x5c6d5e(0x3b9)]?this[_0x5c6d5e(0x2d3)]():VisuMZ[_0x5c6d5e(0x2b5)][_0x5c6d5e(0x304)][_0x5c6d5e(0x1d0)](this);},Sprite_Gauge[_0x244f65(0x355)]['currentValueSkillsStatesCore']=function(){const _0x1cf50e=_0x244f65;return this[_0x1cf50e(0x3b9)][_0x1cf50e(0x36c)][_0x1cf50e(0x1d0)](this[_0x1cf50e(0x2bc)]);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x307)]=Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x38b)],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x38b)]=function(){const _0x5adc73=_0x244f65;return this[_0x5adc73(0x2bc)]&&this['_costSettings']?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x5adc73(0x2b5)][_0x5adc73(0x307)][_0x5adc73(0x1d0)](this);},Sprite_Gauge['prototype'][_0x244f65(0x1e9)]=function(){const _0x5b0ba4=_0x244f65;return this['_costSettings'][_0x5b0ba4(0x370)][_0x5b0ba4(0x1d0)](this[_0x5b0ba4(0x2bc)]);},VisuMZ['SkillsStatesCore'][_0x244f65(0x221)]=Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x2c9)],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x2c9)]=function(){const _0x236415=_0x244f65,_0x5e5e00=VisuMZ['SkillsStatesCore'][_0x236415(0x221)][_0x236415(0x1d0)](this);return _0x5e5e00[_0x236415(0x3b8)](0x0,0x1);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x198)]=Sprite_Gauge[_0x244f65(0x355)]['redraw'],Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x288)]=function(){const _0x3c15ad=_0x244f65;this[_0x3c15ad(0x2bc)]&&this[_0x3c15ad(0x3b9)]?(this[_0x3c15ad(0x18b)][_0x3c15ad(0x38c)](),this['redrawSkillsStatesCore']()):VisuMZ[_0x3c15ad(0x2b5)]['Sprite_Gauge_redraw'][_0x3c15ad(0x1d0)](this);},Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x247)]=function(){const _0xd8824d=_0x244f65;let _0x94a477=this[_0xd8824d(0x2a0)]();return Imported[_0xd8824d(0x199)]&&this[_0xd8824d(0x3ba)]()&&(_0x94a477=VisuMZ['GroupDigits'](_0x94a477)),_0x94a477;},Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x3ad)]=function(){const _0xd0df5f=_0x244f65;this[_0xd0df5f(0x3b9)][_0xd0df5f(0x1af)]['call'](this);},Sprite_Gauge[_0x244f65(0x355)][_0x244f65(0x31b)]=function(_0x8ce44b,_0x5caa38,_0x5b347d,_0x5a7672,_0x30f9c0,_0x3c1ad9){const _0x987fe=_0x244f65,_0x22d1ba=this['gaugeRate'](),_0x396229=Math['floor']((_0x30f9c0-0x2)*_0x22d1ba),_0x833c6d=_0x3c1ad9-0x2,_0x102787=this[_0x987fe(0x21c)]();this[_0x987fe(0x18b)][_0x987fe(0x31a)](_0x5b347d,_0x5a7672,_0x30f9c0,_0x3c1ad9,_0x102787),this['bitmap'][_0x987fe(0x2f6)](_0x5b347d+0x1,_0x5a7672+0x1,_0x396229,_0x833c6d,_0x8ce44b,_0x5caa38);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x226)]=Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x2d5)],Sprite_StateIcon[_0x244f65(0x355)]['loadBitmap']=function(){const _0x228872=_0x244f65;VisuMZ[_0x228872(0x2b5)][_0x228872(0x226)][_0x228872(0x1d0)](this),this[_0x228872(0x35b)]();},Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x35b)]=function(){const _0x443717=_0x244f65,_0x3fcb78=Window_Base[_0x443717(0x355)][_0x443717(0x319)]();this[_0x443717(0x356)]=new Sprite(),this[_0x443717(0x356)][_0x443717(0x18b)]=new Bitmap(ImageManager[_0x443717(0x308)],_0x3fcb78),this[_0x443717(0x356)][_0x443717(0x276)]['x']=this[_0x443717(0x276)]['x'],this[_0x443717(0x356)][_0x443717(0x276)]['y']=this[_0x443717(0x276)]['y'],this[_0x443717(0x2be)](this[_0x443717(0x356)]),this['contents']=this[_0x443717(0x356)][_0x443717(0x18b)];},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x197)],Sprite_StateIcon[_0x244f65(0x355)]['updateFrame']=function(){const _0x20008d=_0x244f65;VisuMZ[_0x20008d(0x2b5)][_0x20008d(0x2fd)]['call'](this),this[_0x20008d(0x391)]();},Sprite_StateIcon[_0x244f65(0x355)]['drawText']=function(_0x5e262c,_0x38d21e,_0x134250,_0x5e588f,_0x421626){const _0x291840=_0x244f65;this[_0x291840(0x1c7)][_0x291840(0x2a4)](_0x5e262c,_0x38d21e,_0x134250,_0x5e588f,this[_0x291840(0x1c7)][_0x291840(0x2bd)],_0x421626);},Sprite_StateIcon['prototype'][_0x244f65(0x391)]=function(){const _0xcead87=_0x244f65;this['resetFontSettings'](),this[_0xcead87(0x1c7)][_0xcead87(0x38c)]();const _0x2ca4a8=this[_0xcead87(0x2bc)];if(!_0x2ca4a8)return;const _0x52db83=_0x2ca4a8[_0xcead87(0x348)]()[_0xcead87(0x30b)](_0x13e7bb=>_0x13e7bb[_0xcead87(0x1a9)]>0x0),_0x569b33=[...Array(0x8)[_0xcead87(0x34d)]()]['filter'](_0x167017=>_0x2ca4a8[_0xcead87(0x241)](_0x167017)!==0x0),_0x470caf=this[_0xcead87(0x21b)],_0x52cb2c=_0x52db83[_0x470caf];if(_0x52cb2c)Window_Base[_0xcead87(0x355)]['drawActorStateTurns'][_0xcead87(0x1d0)](this,_0x2ca4a8,_0x52cb2c,0x0,0x0),Window_Base[_0xcead87(0x355)][_0xcead87(0x22b)][_0xcead87(0x1d0)](this,_0x2ca4a8,_0x52cb2c,0x0,0x0);else{const _0x5135b5=_0x569b33[_0x470caf-_0x52db83[_0xcead87(0x3aa)]];if(_0x5135b5===undefined)return;Window_Base[_0xcead87(0x355)][_0xcead87(0x261)][_0xcead87(0x1d0)](this,_0x2ca4a8,_0x5135b5,0x0,0x0),Window_Base['prototype']['drawActorBuffRates']['call'](this,_0x2ca4a8,_0x5135b5,0x0,0x0);}},Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x219)]=function(){const _0x370526=_0x244f65;this[_0x370526(0x1c7)][_0x370526(0x3a7)]=$gameSystem[_0x370526(0x303)](),this[_0x370526(0x1c7)]['fontSize']=$gameSystem['mainFontSize'](),this[_0x370526(0x1f4)]();},Sprite_StateIcon['prototype'][_0x244f65(0x1f4)]=function(){const _0x3df674=_0x244f65;this['changeTextColor'](ColorManager[_0x3df674(0x335)]()),this[_0x3df674(0x2e5)](ColorManager[_0x3df674(0x18d)]());},Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x394)]=function(_0x59c9a8){const _0x49fe3d=_0x244f65;this[_0x49fe3d(0x1c7)]['textColor']=_0x59c9a8;},Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x2e5)]=function(_0xa6b94b){const _0x498db2=_0x244f65;this[_0x498db2(0x1c7)][_0x498db2(0x18d)]=_0xa6b94b;},Sprite_StateIcon[_0x244f65(0x355)][_0x244f65(0x329)]=function(){const _0x5588f0=_0x244f65;this[_0x5588f0(0x327)]=!![],this[_0x5588f0(0x25c)]();},Window_Base[_0x244f65(0x355)][_0x244f65(0x399)]=function(_0xcf47df,_0x2b37de,_0x4f84ea,_0xf381ad,_0x295580){const _0x48183c=_0x244f65,_0x1e9a4e=this[_0x48183c(0x2b7)](_0xcf47df,_0x2b37de),_0x34e000=this[_0x48183c(0x3b0)](_0x1e9a4e,_0x4f84ea,_0xf381ad,_0x295580),_0x35acc2=_0x4f84ea+_0x295580-_0x34e000[_0x48183c(0x2c8)];this['drawTextEx'](_0x1e9a4e,_0x35acc2,_0xf381ad,_0x295580),this[_0x48183c(0x219)]();},Window_Base[_0x244f65(0x355)]['createAllSkillCostText']=function(_0x109831,_0x3a3ac1){const _0x483c61=_0x244f65;let _0x3e01c7='';for(settings of VisuMZ['SkillsStatesCore'][_0x483c61(0x253)][_0x483c61(0x1cf)]){if(!this[_0x483c61(0x3c7)](_0x109831,_0x3a3ac1,settings))continue;if(_0x3e01c7[_0x483c61(0x3aa)]>0x0)_0x3e01c7+=this[_0x483c61(0x333)]();_0x3e01c7+=this[_0x483c61(0x20b)](_0x109831,_0x3a3ac1,settings);}_0x3e01c7=this[_0x483c61(0x297)](_0x109831,_0x3a3ac1,_0x3e01c7);if(_0x3a3ac1[_0x483c61(0x2e2)][_0x483c61(0x316)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x3e01c7[_0x483c61(0x3aa)]>0x0)_0x3e01c7+=this[_0x483c61(0x333)]();_0x3e01c7+=String(RegExp['$1']);}return _0x3e01c7;},Window_Base['prototype'][_0x244f65(0x297)]=function(_0x4c875c,_0x240628,_0x104967){return _0x104967;},Window_Base[_0x244f65(0x355)][_0x244f65(0x3c7)]=function(_0x34cf59,_0x4c7c37,_0x4837f0){const _0x4cc5b7=_0x244f65,_0x212b7d=_0x4837f0[_0x4cc5b7(0x1c5)][_0x4cc5b7(0x1d0)](_0x34cf59,_0x4c7c37);return _0x4837f0[_0x4cc5b7(0x29a)][_0x4cc5b7(0x1d0)](_0x34cf59,_0x4c7c37,_0x212b7d,_0x4837f0);},Window_Base[_0x244f65(0x355)][_0x244f65(0x20b)]=function(_0x113dd5,_0x285653,_0x54ac65){const _0x29c80f=_0x244f65,_0x48c553=_0x54ac65[_0x29c80f(0x1c5)][_0x29c80f(0x1d0)](_0x113dd5,_0x285653);return _0x54ac65['TextJS'][_0x29c80f(0x1d0)](_0x113dd5,_0x285653,_0x48c553,_0x54ac65);},Window_Base['prototype'][_0x244f65(0x333)]=function(){return'\x20';},Window_Base[_0x244f65(0x355)]['drawActorIcons']=function(_0x14625b,_0x1c52db,_0x7c413,_0x3fd53b){const _0x3d4be7=_0x244f65;if(!_0x14625b)return;VisuMZ[_0x3d4be7(0x2b5)][_0x3d4be7(0x16d)][_0x3d4be7(0x1d0)](this,_0x14625b,_0x1c52db,_0x7c413,_0x3fd53b),this[_0x3d4be7(0x272)](_0x14625b,_0x1c52db,_0x7c413,_0x3fd53b);},Window_Base['prototype']['drawActorIconsAllTurnCounters']=function(_0xd16a6e,_0x2eac47,_0x46a2fc,_0x5a8056){const _0x19cfb8=_0x244f65;_0x5a8056=_0x5a8056||0x90;const _0x5d1e68=ImageManager[_0x19cfb8(0x308)],_0x4dd30d=_0xd16a6e[_0x19cfb8(0x26f)]()[_0x19cfb8(0x384)](0x0,Math[_0x19cfb8(0x31f)](_0x5a8056/_0x5d1e68)),_0x8e37=_0xd16a6e[_0x19cfb8(0x348)]()['filter'](_0x435cb7=>_0x435cb7[_0x19cfb8(0x1a9)]>0x0),_0x479daa=[...Array(0x8)[_0x19cfb8(0x34d)]()][_0x19cfb8(0x30b)](_0xb11943=>_0xd16a6e[_0x19cfb8(0x241)](_0xb11943)!==0x0),_0x3aef2a=[];let _0x3ec9f1=_0x2eac47;for(let _0x482b5c=0x0;_0x482b5c<_0x4dd30d[_0x19cfb8(0x3aa)];_0x482b5c++){this[_0x19cfb8(0x219)]();const _0x4205cc=_0x8e37[_0x482b5c];if(_0x4205cc)!_0x3aef2a[_0x19cfb8(0x22d)](_0x4205cc)&&this[_0x19cfb8(0x337)](_0xd16a6e,_0x4205cc,_0x3ec9f1,_0x46a2fc),this['drawActorStateData'](_0xd16a6e,_0x4205cc,_0x3ec9f1,_0x46a2fc),_0x3aef2a['push'](_0x4205cc);else{const _0x401d51=_0x479daa[_0x482b5c-_0x8e37[_0x19cfb8(0x3aa)]];this[_0x19cfb8(0x261)](_0xd16a6e,_0x401d51,_0x3ec9f1,_0x46a2fc),this['drawActorBuffRates'](_0xd16a6e,_0x401d51,_0x3ec9f1,_0x46a2fc);}_0x3ec9f1+=_0x5d1e68;}},Window_Base[_0x244f65(0x355)][_0x244f65(0x337)]=function(_0x2025b1,_0x4948a2,_0x62b579,_0x40ed97){const _0x36c15e=_0x244f65;if(!VisuMZ[_0x36c15e(0x2b5)][_0x36c15e(0x253)]['States'][_0x36c15e(0x264)])return;if(!_0x2025b1['isStateAffected'](_0x4948a2['id']))return;if(_0x4948a2[_0x36c15e(0x33d)]===0x0)return;if(_0x4948a2[_0x36c15e(0x2e2)][_0x36c15e(0x316)](/<HIDE STATE TURNS>/i))return;const _0x29c83a=_0x2025b1[_0x36c15e(0x2da)](_0x4948a2['id']),_0x5c52e2=ImageManager[_0x36c15e(0x308)],_0x1f4c89=ColorManager[_0x36c15e(0x1ae)](_0x4948a2);this[_0x36c15e(0x394)](_0x1f4c89),this[_0x36c15e(0x2e5)](_0x36c15e(0x342)),this[_0x36c15e(0x1c7)][_0x36c15e(0x1c8)]=!![],this[_0x36c15e(0x1c7)]['fontSize']=VisuMZ[_0x36c15e(0x2b5)][_0x36c15e(0x253)][_0x36c15e(0x2e6)][_0x36c15e(0x1d2)],_0x62b579+=VisuMZ['SkillsStatesCore'][_0x36c15e(0x253)]['States'][_0x36c15e(0x17f)],_0x40ed97+=VisuMZ['SkillsStatesCore']['Settings'][_0x36c15e(0x2e6)][_0x36c15e(0x243)],this['drawText'](_0x29c83a,_0x62b579,_0x40ed97,_0x5c52e2,_0x36c15e(0x24c)),this[_0x36c15e(0x1c7)][_0x36c15e(0x1c8)]=![],this[_0x36c15e(0x219)]();},Window_Base[_0x244f65(0x355)][_0x244f65(0x22b)]=function(_0x29568a,_0x4a4ce8,_0x4fe77b,_0x30f382){const _0x537947=_0x244f65;if(!VisuMZ[_0x537947(0x2b5)][_0x537947(0x253)]['States'][_0x537947(0x1cd)])return;const _0x293776=ImageManager['iconWidth'],_0x222515=ImageManager['iconHeight']/0x2,_0x13fe24=ColorManager[_0x537947(0x335)]();this[_0x537947(0x394)](_0x13fe24),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x537947(0x1c7)][_0x537947(0x1c8)]=!![],this[_0x537947(0x1c7)][_0x537947(0x1ab)]=VisuMZ[_0x537947(0x2b5)][_0x537947(0x253)][_0x537947(0x2e6)][_0x537947(0x1c3)],_0x4fe77b+=VisuMZ[_0x537947(0x2b5)][_0x537947(0x253)]['States'][_0x537947(0x189)],_0x30f382+=VisuMZ[_0x537947(0x2b5)][_0x537947(0x253)][_0x537947(0x2e6)][_0x537947(0x242)];const _0x41b9e9=String(_0x29568a[_0x537947(0x27d)](_0x4a4ce8['id']));this[_0x537947(0x2a4)](_0x41b9e9,_0x4fe77b,_0x30f382,_0x293776,_0x537947(0x1fb)),this['contents']['fontBold']=![],this[_0x537947(0x219)]();},Window_Base[_0x244f65(0x355)][_0x244f65(0x261)]=function(_0x1c0ded,_0xc8390d,_0x2ef37e,_0x5263c0){const _0xe27e62=_0x244f65;if(!VisuMZ[_0xe27e62(0x2b5)][_0xe27e62(0x253)][_0xe27e62(0x362)][_0xe27e62(0x264)])return;const _0x3a1d8d=_0x1c0ded['buff'](_0xc8390d);if(_0x3a1d8d===0x0)return;const _0x4c8c35=_0x1c0ded['buffTurns'](_0xc8390d),_0x343e50=ImageManager['iconWidth'],_0xf35952=_0x3a1d8d>0x0?ColorManager[_0xe27e62(0x32d)]():ColorManager[_0xe27e62(0x2cf)]();this[_0xe27e62(0x394)](_0xf35952),this[_0xe27e62(0x2e5)](_0xe27e62(0x342)),this[_0xe27e62(0x1c7)][_0xe27e62(0x1c8)]=!![],this[_0xe27e62(0x1c7)][_0xe27e62(0x1ab)]=VisuMZ[_0xe27e62(0x2b5)][_0xe27e62(0x253)][_0xe27e62(0x362)]['TurnFontSize'],_0x2ef37e+=VisuMZ[_0xe27e62(0x2b5)][_0xe27e62(0x253)][_0xe27e62(0x362)]['TurnOffsetX'],_0x5263c0+=VisuMZ['SkillsStatesCore']['Settings'][_0xe27e62(0x362)][_0xe27e62(0x243)],this[_0xe27e62(0x2a4)](_0x4c8c35,_0x2ef37e,_0x5263c0,_0x343e50,_0xe27e62(0x24c)),this[_0xe27e62(0x1c7)][_0xe27e62(0x1c8)]=![],this[_0xe27e62(0x219)]();},Window_Base['prototype'][_0x244f65(0x29b)]=function(_0x78899a,_0x162f1c,_0x64ff29,_0x29d1df){const _0x5de0de=_0x244f65;if(!VisuMZ[_0x5de0de(0x2b5)]['Settings']['Buffs'][_0x5de0de(0x1cd)])return;const _0x3e8e93=_0x78899a[_0x5de0de(0x2d2)](_0x162f1c),_0xfd5812=_0x78899a[_0x5de0de(0x241)](_0x162f1c),_0x10f490=ImageManager[_0x5de0de(0x308)],_0x1ddb6b=ImageManager[_0x5de0de(0x397)]/0x2,_0x7c30f9=_0xfd5812>0x0?ColorManager[_0x5de0de(0x32d)]():ColorManager[_0x5de0de(0x2cf)]();this[_0x5de0de(0x394)](_0x7c30f9),this[_0x5de0de(0x2e5)](_0x5de0de(0x342)),this[_0x5de0de(0x1c7)]['fontBold']=!![],this['contents'][_0x5de0de(0x1ab)]=VisuMZ[_0x5de0de(0x2b5)]['Settings'][_0x5de0de(0x362)][_0x5de0de(0x1c3)],_0x64ff29+=VisuMZ[_0x5de0de(0x2b5)]['Settings'][_0x5de0de(0x362)]['DataOffsetX'],_0x29d1df+=VisuMZ[_0x5de0de(0x2b5)]['Settings'][_0x5de0de(0x362)][_0x5de0de(0x242)];const _0x340be4='%1%'[_0x5de0de(0x360)](Math['round'](_0x3e8e93*0x64));this[_0x5de0de(0x2a4)](_0x340be4,_0x64ff29,_0x29d1df,_0x10f490,'center'),this[_0x5de0de(0x1c7)][_0x5de0de(0x1c8)]=![],this[_0x5de0de(0x219)]();},VisuMZ['SkillsStatesCore'][_0x244f65(0x212)]=Window_StatusBase[_0x244f65(0x355)][_0x244f65(0x1e6)],Window_StatusBase['prototype'][_0x244f65(0x1e6)]=function(_0x56f6c8,_0x4f2219,_0x55a676,_0x229ab9){const _0x3cc9e4=_0x244f65;if(_0x56f6c8['isActor']())_0x4f2219=this[_0x3cc9e4(0x244)](_0x56f6c8,_0x4f2219);this['placeExactGauge'](_0x56f6c8,_0x4f2219,_0x55a676,_0x229ab9);},Window_StatusBase[_0x244f65(0x355)][_0x244f65(0x3bf)]=function(_0x3473a1,_0x44d032,_0x27d7b8,_0x3cae49){const _0x5b0bed=_0x244f65;if([_0x5b0bed(0x33e),'untitled'][_0x5b0bed(0x22d)](_0x44d032[_0x5b0bed(0x2b2)]()))return;VisuMZ[_0x5b0bed(0x2b5)][_0x5b0bed(0x212)][_0x5b0bed(0x1d0)](this,_0x3473a1,_0x44d032,_0x27d7b8,_0x3cae49);},Window_StatusBase[_0x244f65(0x355)]['convertGaugeTypeSkillsStatesCore']=function(_0x3a95f1,_0x5888fb){const _0x273a5a=_0x244f65,_0x2cd95c=_0x3a95f1[_0x273a5a(0x27b)]()[_0x273a5a(0x2e2)];if(_0x5888fb==='hp'&&_0x2cd95c[_0x273a5a(0x316)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x5888fb==='mp'&&_0x2cd95c[_0x273a5a(0x316)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x5888fb==='tp'&&_0x2cd95c[_0x273a5a(0x316)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x5888fb;}},VisuMZ['SkillsStatesCore'][_0x244f65(0x16d)]=Window_StatusBase[_0x244f65(0x355)]['drawActorIcons'],Window_StatusBase[_0x244f65(0x355)][_0x244f65(0x3b5)]=function(_0x2b721d,_0x10b8b7,_0x2fee46,_0x11bcf0){const _0x32dc25=_0x244f65;if(!_0x2b721d)return;Window_Base[_0x32dc25(0x355)]['drawActorIcons'][_0x32dc25(0x1d0)](this,_0x2b721d,_0x10b8b7,_0x2fee46,_0x11bcf0);},VisuMZ[_0x244f65(0x2b5)]['Window_SkillType_initialize']=Window_SkillType[_0x244f65(0x355)][_0x244f65(0x1d5)],Window_SkillType[_0x244f65(0x355)][_0x244f65(0x1d5)]=function(_0x155c2c){const _0x2d72e6=_0x244f65;VisuMZ[_0x2d72e6(0x2b5)][_0x2d72e6(0x174)][_0x2d72e6(0x1d0)](this,_0x155c2c),this[_0x2d72e6(0x1bd)](_0x155c2c);},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x1bd)]=function(_0x2c3301){const _0x229e91=_0x244f65,_0x50b3d8=new Rectangle(0x0,0x0,_0x2c3301[_0x229e91(0x2c8)],_0x2c3301[_0x229e91(0x2bd)]);this[_0x229e91(0x177)]=new Window_Base(_0x50b3d8),this['_commandNameWindow'][_0x229e91(0x2ab)]=0x0,this[_0x229e91(0x2be)](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x1ea)]=function(){const _0x3b0601=_0x244f65;Window_Command[_0x3b0601(0x355)][_0x3b0601(0x1ea)][_0x3b0601(0x1d0)](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x19a)]=function(){const _0x751fcd=_0x244f65,_0x496e57=this[_0x751fcd(0x177)];_0x496e57[_0x751fcd(0x1c7)][_0x751fcd(0x38c)]();const _0x34b9e3=this[_0x751fcd(0x328)](this[_0x751fcd(0x2de)]());if(_0x34b9e3===_0x751fcd(0x349)&&this['maxItems']()>0x0){const _0x14fa6e=this[_0x751fcd(0x1b6)](this[_0x751fcd(0x2de)]());let _0x25ab29=this[_0x751fcd(0x246)](this[_0x751fcd(0x2de)]());_0x25ab29=_0x25ab29[_0x751fcd(0x365)](/\\I\[(\d+)\]/gi,''),_0x496e57['resetFontSettings'](),this[_0x751fcd(0x1ff)](_0x25ab29,_0x14fa6e),this['commandNameWindowDrawText'](_0x25ab29,_0x14fa6e),this['commandNameWindowCenter'](_0x25ab29,_0x14fa6e);}},Window_SkillType[_0x244f65(0x355)]['commandNameWindowDrawBackground']=function(_0x13138e,_0x2f6d9e){},Window_SkillType['prototype'][_0x244f65(0x1b7)]=function(_0x188fe4,_0x41f2a3){const _0x45cb55=_0x244f65,_0x5af9a7=this['_commandNameWindow'];_0x5af9a7['drawText'](_0x188fe4,0x0,_0x41f2a3['y'],_0x5af9a7[_0x45cb55(0x216)],_0x45cb55(0x1fb));},Window_SkillType[_0x244f65(0x355)]['commandNameWindowCenter']=function(_0x452373,_0x353e3b){const _0x4da9a2=_0x244f65,_0x32dfdd=this[_0x4da9a2(0x177)],_0x4c14c1=$gameSystem[_0x4da9a2(0x294)](),_0x357962=_0x353e3b['x']+Math['floor'](_0x353e3b['width']/0x2)+_0x4c14c1;_0x32dfdd['x']=_0x32dfdd[_0x4da9a2(0x2c8)]/-0x2+_0x357962,_0x32dfdd['y']=Math[_0x4da9a2(0x31f)](_0x353e3b[_0x4da9a2(0x2bd)]/0x2);},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x22e)]=function(){const _0x433421=_0x244f65;return Imported['VisuMZ_0_CoreEngine']&&Window_Command[_0x433421(0x355)][_0x433421(0x22e)]['call'](this);},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x271)]=function(){const _0x1f65f5=_0x244f65;if(!this['_actor'])return;const _0x518244=this['_actor'][_0x1f65f5(0x39c)]();for(const _0x5427ea of _0x518244){const _0x374b6c=this['makeCommandName'](_0x5427ea);this[_0x1f65f5(0x1e0)](_0x374b6c,_0x1f65f5(0x2a2),!![],_0x5427ea);}},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x1e3)]=function(_0x2a2205){const _0x4a137b=_0x244f65;let _0x2d444c=$dataSystem[_0x4a137b(0x39c)][_0x2a2205];if(_0x2d444c[_0x4a137b(0x316)](/\\I\[(\d+)\]/i))return _0x2d444c;if(this[_0x4a137b(0x37f)]()===_0x4a137b(0x2b4))return _0x2d444c;const _0x4e3b4d=VisuMZ['SkillsStatesCore']['Settings']['Skills'],_0x1e4644=$dataSystem[_0x4a137b(0x3b1)][_0x4a137b(0x22d)](_0x2a2205),_0x586212=_0x1e4644?_0x4e3b4d['IconStypeMagic']:_0x4e3b4d[_0x4a137b(0x3b4)];return _0x4a137b(0x2fc)['format'](_0x586212,_0x2d444c);},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x33a)]=function(){const _0x5ede37=_0x244f65;return VisuMZ[_0x5ede37(0x2b5)][_0x5ede37(0x253)][_0x5ede37(0x24e)][_0x5ede37(0x2b8)];},Window_SkillType['prototype'][_0x244f65(0x2cb)]=function(_0x5bd9f6){const _0x3e75de=_0x244f65,_0x73484e=this[_0x3e75de(0x328)](_0x5bd9f6);if(_0x73484e==='iconText')this[_0x3e75de(0x357)](_0x5bd9f6);else _0x73484e===_0x3e75de(0x349)?this['drawItemStyleIcon'](_0x5bd9f6):Window_Command[_0x3e75de(0x355)][_0x3e75de(0x2cb)]['call'](this,_0x5bd9f6);},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x37f)]=function(){const _0x2e3c9d=_0x244f65;return VisuMZ[_0x2e3c9d(0x2b5)][_0x2e3c9d(0x253)][_0x2e3c9d(0x24e)]['CmdStyle'];},Window_SkillType[_0x244f65(0x355)][_0x244f65(0x328)]=function(_0x32e47c){const _0x5cae43=_0x244f65;if(_0x32e47c<0x0)return _0x5cae43(0x2b4);const _0x364af1=this['commandStyle']();if(_0x364af1!==_0x5cae43(0x1fc))return _0x364af1;else{if(this[_0x5cae43(0x256)]()>0x0){const _0x1d88a8=this[_0x5cae43(0x246)](_0x32e47c);if(_0x1d88a8[_0x5cae43(0x316)](/\\I\[(\d+)\]/i)){const _0x1415b1=this[_0x5cae43(0x1b6)](_0x32e47c),_0x2bb5a6=this[_0x5cae43(0x3b0)](_0x1d88a8)[_0x5cae43(0x2c8)];return _0x2bb5a6<=_0x1415b1[_0x5cae43(0x2c8)]?_0x5cae43(0x27c):_0x5cae43(0x349);}}}return _0x5cae43(0x2b4);},Window_SkillType['prototype']['drawItemStyleIconText']=function(_0x153005){const _0x1206d9=_0x244f65,_0x23887b=this[_0x1206d9(0x1b6)](_0x153005),_0x19c12a=this['commandName'](_0x153005),_0x1cadad=this[_0x1206d9(0x3b0)](_0x19c12a)['width'];this[_0x1206d9(0x3ac)](this[_0x1206d9(0x2ec)](_0x153005));const _0x5a3bd4=this['itemTextAlign']();if(_0x5a3bd4===_0x1206d9(0x24c))this[_0x1206d9(0x2f4)](_0x19c12a,_0x23887b['x']+_0x23887b[_0x1206d9(0x2c8)]-_0x1cadad,_0x23887b['y'],_0x1cadad);else{if(_0x5a3bd4===_0x1206d9(0x1fb)){const _0x18156c=_0x23887b['x']+Math['floor']((_0x23887b[_0x1206d9(0x2c8)]-_0x1cadad)/0x2);this[_0x1206d9(0x2f4)](_0x19c12a,_0x18156c,_0x23887b['y'],_0x1cadad);}else this[_0x1206d9(0x2f4)](_0x19c12a,_0x23887b['x'],_0x23887b['y'],_0x1cadad);}},Window_SkillType[_0x244f65(0x355)]['drawItemStyleIcon']=function(_0x388347){const _0x518295=_0x244f65;this['commandName'](_0x388347)[_0x518295(0x316)](/\\I\[(\d+)\]/i);const _0x35fd5e=Number(RegExp['$1'])||0x0,_0x318d64=this[_0x518295(0x1b6)](_0x388347),_0x4e0920=_0x318d64['x']+Math[_0x518295(0x31f)]((_0x318d64['width']-ImageManager[_0x518295(0x308)])/0x2),_0x21a8b1=_0x318d64['y']+(_0x318d64[_0x518295(0x2bd)]-ImageManager[_0x518295(0x397)])/0x2;this['drawIcon'](_0x35fd5e,_0x4e0920,_0x21a8b1);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x321)]=Window_SkillStatus['prototype'][_0x244f65(0x30d)],Window_SkillStatus['prototype'][_0x244f65(0x30d)]=function(){const _0x275440=_0x244f65;VisuMZ['SkillsStatesCore'][_0x275440(0x321)][_0x275440(0x1d0)](this);if(this[_0x275440(0x376)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x244f65(0x355)][_0x244f65(0x33b)]=function(){const _0xc582ee=_0x244f65;if(!Imported[_0xc582ee(0x199)])return;if(!Imported[_0xc582ee(0x180)])return;const _0x1c47e9=this[_0xc582ee(0x2ef)]();let _0x1792c8=this[_0xc582ee(0x37a)]()/0x2+0xb4+0xb4+0xb4,_0x5e1f09=this[_0xc582ee(0x216)]-_0x1792c8-0x2;if(_0x5e1f09>=0x12c){const _0x3e6034=VisuMZ['CoreEngine'][_0xc582ee(0x253)][_0xc582ee(0x2cc)][_0xc582ee(0x1f7)],_0x162a78=Math[_0xc582ee(0x31f)](_0x5e1f09/0x2)-0x18;let _0x33ed44=_0x1792c8,_0xf9fdf9=Math[_0xc582ee(0x31f)]((this['innerHeight']-Math[_0xc582ee(0x1cb)](_0x3e6034[_0xc582ee(0x3aa)]/0x2)*_0x1c47e9)/0x2),_0x35aba1=0x0;for(const _0x111503 of _0x3e6034){this[_0xc582ee(0x3af)](_0x33ed44,_0xf9fdf9,_0x162a78,_0x111503),_0x35aba1++,_0x35aba1%0x2===0x0?(_0x33ed44=_0x1792c8,_0xf9fdf9+=_0x1c47e9):_0x33ed44+=_0x162a78+0x18;}}this['resetFontSettings']();},Window_SkillStatus[_0x244f65(0x355)]['drawExtendedParameter']=function(_0x487333,_0x37309d,_0x3dd6b0,_0x3c73aa){const _0x58f44b=_0x244f65,_0x5b5f4d=this[_0x58f44b(0x2ef)]();this[_0x58f44b(0x219)](),this[_0x58f44b(0x252)](_0x487333,_0x37309d,_0x3dd6b0,_0x3c73aa,!![]),this[_0x58f44b(0x1f4)](),this[_0x58f44b(0x1c7)][_0x58f44b(0x1ab)]-=0x8;const _0x321083=this['_actor']['paramValueByName'](_0x3c73aa,!![]);this[_0x58f44b(0x1c7)][_0x58f44b(0x2a4)](_0x321083,_0x487333,_0x37309d,_0x3dd6b0,_0x5b5f4d,_0x58f44b(0x24c));},VisuMZ['SkillsStatesCore'][_0x244f65(0x379)]=Window_SkillList[_0x244f65(0x355)][_0x244f65(0x22d)],Window_SkillList[_0x244f65(0x355)]['includes']=function(_0x469148){const _0x4f2639=_0x244f65;return this[_0x4f2639(0x1de)](_0x469148);},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1f2)]=Window_SkillList[_0x244f65(0x355)][_0x244f65(0x31d)],Window_SkillList['prototype'][_0x244f65(0x31d)]=function(){const _0x2e878b=_0x244f65;return SceneManager[_0x2e878b(0x273)][_0x2e878b(0x2b6)]===Scene_Battle?VisuMZ[_0x2e878b(0x2b5)][_0x2e878b(0x1f2)][_0x2e878b(0x1d0)](this):VisuMZ[_0x2e878b(0x2b5)][_0x2e878b(0x253)][_0x2e878b(0x24e)]['ListWindowCols'];},VisuMZ[_0x244f65(0x2b5)]['Window_SkillList_setActor']=Window_SkillList[_0x244f65(0x355)][_0x244f65(0x398)],Window_SkillList[_0x244f65(0x355)][_0x244f65(0x398)]=function(_0x26f8e2){const _0x3ae9be=_0x244f65,_0x262311=this[_0x3ae9be(0x376)]!==_0x26f8e2;VisuMZ[_0x3ae9be(0x2b5)]['Window_SkillList_setActor'][_0x3ae9be(0x1d0)](this,_0x26f8e2),_0x262311&&(this[_0x3ae9be(0x1dd)]&&this[_0x3ae9be(0x1dd)][_0x3ae9be(0x2b6)]===Window_ShopStatus&&this[_0x3ae9be(0x1dd)]['setItem'](this[_0x3ae9be(0x1b9)](0x0)));},Window_SkillList[_0x244f65(0x355)]['setStypeId']=function(_0x193bb4){const _0x3efb22=_0x244f65;if(this[_0x3efb22(0x207)]===_0x193bb4)return;this['_stypeId']=_0x193bb4,this[_0x3efb22(0x30d)](),this[_0x3efb22(0x377)](0x0,0x0),this['_statusWindow']&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x3efb22(0x1dd)][_0x3efb22(0x186)](this[_0x3efb22(0x1b9)](0x0));},Window_SkillList[_0x244f65(0x355)][_0x244f65(0x1de)]=function(_0x41698e){const _0x20234f=_0x244f65;if(!_0x41698e)return VisuMZ['SkillsStatesCore'][_0x20234f(0x379)]['call'](this,_0x41698e);if(!this[_0x20234f(0x17b)](_0x41698e))return![];if(!this[_0x20234f(0x309)](_0x41698e))return![];if(!this[_0x20234f(0x265)](_0x41698e))return![];return!![];},Window_SkillList[_0x244f65(0x355)][_0x244f65(0x17b)]=function(_0x3ea8bf){const _0x19f33d=_0x244f65;return DataManager[_0x19f33d(0x3c4)](_0x3ea8bf)[_0x19f33d(0x22d)](this[_0x19f33d(0x207)]);},Window_SkillList[_0x244f65(0x355)]['checkShowHideNotetags']=function(_0x176ddd){const _0x23a345=_0x244f65;if(!VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags'](this['_actor'],_0x176ddd))return![];if(!VisuMZ[_0x23a345(0x2b5)]['CheckVisibleSwitchNotetags'](this['_actor'],_0x176ddd))return![];if(!VisuMZ['SkillsStatesCore'][_0x23a345(0x36e)](this[_0x23a345(0x376)],_0x176ddd))return![];return!![];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x2df)]=function(_0x2a093a,_0x2ab44e){const _0xfc65f0=_0x244f65,_0x3edb52=_0x2ab44e[_0xfc65f0(0x2e2)];if(_0x3edb52['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0xfc65f0(0x1a5)]())return![];else return _0x3edb52[_0xfc65f0(0x316)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x301)]=function(_0x56ab3a,_0x1ae96d){const _0x2b5237=_0x244f65,_0x32e01f=_0x1ae96d[_0x2b5237(0x2e2)];if(_0x32e01f[_0x2b5237(0x316)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12dd01=JSON['parse']('['+RegExp['$1'][_0x2b5237(0x316)](/\d+/g)+']');for(const _0x37a050 of _0x12dd01){if(!$gameSwitches['value'](_0x37a050))return![];}return!![];}if(_0x32e01f[_0x2b5237(0x316)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x238fbd=JSON[_0x2b5237(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33d6ce of _0x238fbd){if(!$gameSwitches[_0x2b5237(0x2a7)](_0x33d6ce))return![];}return!![];}if(_0x32e01f[_0x2b5237(0x316)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24db5a=JSON[_0x2b5237(0x26a)]('['+RegExp['$1'][_0x2b5237(0x316)](/\d+/g)+']');for(const _0x43d470 of _0x24db5a){if($gameSwitches[_0x2b5237(0x2a7)](_0x43d470))return!![];}return![];}if(_0x32e01f[_0x2b5237(0x316)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58c596=JSON[_0x2b5237(0x26a)]('['+RegExp['$1'][_0x2b5237(0x316)](/\d+/g)+']');for(const _0xeb4fb1 of _0x58c596){if(!$gameSwitches[_0x2b5237(0x2a7)](_0xeb4fb1))return!![];}return![];}if(_0x32e01f[_0x2b5237(0x316)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a4f82=JSON[_0x2b5237(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x387811 of _0x5a4f82){if(!$gameSwitches['value'](_0x387811))return!![];}return![];}if(_0x32e01f['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f779c=JSON[_0x2b5237(0x26a)]('['+RegExp['$1'][_0x2b5237(0x316)](/\d+/g)+']');for(const _0x58acb6 of _0x3f779c){if($gameSwitches['value'](_0x58acb6))return![];}return!![];}return!![];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x36e)]=function(_0x2d380f,_0x1f2e12){const _0x1e7995=_0x244f65,_0x76c1c6=_0x1f2e12[_0x1e7995(0x2e2)];if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x544bc2=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x15ee7f of _0x544bc2){if(!_0x2d380f[_0x1e7995(0x183)](_0x15ee7f))return![];}return!![];}else{if(_0x76c1c6['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1c9c53=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x993c37 of _0x1c9c53){const _0x1cbfcb=DataManager[_0x1e7995(0x208)](_0x993c37);if(!_0x1cbfcb)continue;if(!_0x2d380f[_0x1e7995(0x183)](_0x1cbfcb))return![];}return!![];}}if(_0x76c1c6['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x196743=JSON[_0x1e7995(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x257b6a of _0x196743){if(!_0x2d380f[_0x1e7995(0x183)](_0x257b6a))return![];}return!![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2b1b2f=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x5c3a4c of _0x2b1b2f){const _0x40c579=DataManager[_0x1e7995(0x208)](_0x5c3a4c);if(!_0x40c579)continue;if(!_0x2d380f[_0x1e7995(0x183)](_0x40c579))return![];}return!![];}}if(_0x76c1c6['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1686e1=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x424eba of _0x1686e1){if(_0x2d380f[_0x1e7995(0x183)](_0x424eba))return!![];}return![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x28b5e=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x2aa59a of _0x28b5e){const _0x43e386=DataManager[_0x1e7995(0x208)](_0x2aa59a);if(!_0x43e386)continue;if(_0x2d380f[_0x1e7995(0x183)](_0x43e386))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x555beb=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x480270 of _0x555beb){if(!_0x2d380f[_0x1e7995(0x183)](_0x480270))return!![];}return![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1cabc2=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x107c24 of _0x1cabc2){const _0x1c6698=DataManager['getSkillIdWithName'](_0x107c24);if(!_0x1c6698)continue;if(!_0x2d380f[_0x1e7995(0x183)](_0x1c6698))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3a021a=JSON['parse']('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x2235f8 of _0x3a021a){if(!_0x2d380f[_0x1e7995(0x183)](_0x2235f8))return!![];}return![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x257890=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x2119c8 of _0x257890){const _0x27fa18=DataManager[_0x1e7995(0x208)](_0x2119c8);if(!_0x27fa18)continue;if(!_0x2d380f[_0x1e7995(0x183)](_0x27fa18))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54e8b2=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x210bf6 of _0x54e8b2){if(_0x2d380f[_0x1e7995(0x183)](_0x210bf6))return![];}return!![];}else{if(_0x76c1c6['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x45ab00=RegExp['$1']['split'](',');for(const _0x182359 of _0x45ab00){const _0x8f235c=DataManager[_0x1e7995(0x208)](_0x182359);if(!_0x8f235c)continue;if(_0x2d380f[_0x1e7995(0x183)](_0x8f235c))return![];}return!![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45706c=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x46ef69 of _0x45706c){if(!_0x2d380f[_0x1e7995(0x249)](_0x46ef69))return![];}return!![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xc08335=RegExp['$1']['split'](',');for(const _0x346f28 of _0xc08335){const _0x3e4e0b=DataManager['getSkillIdWithName'](_0x346f28);if(!_0x3e4e0b)continue;if(!_0x2d380f[_0x1e7995(0x249)](_0x3e4e0b))return![];}return!![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e64fd=JSON[_0x1e7995(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33f796 of _0x4e64fd){if(!_0x2d380f['hasSkill'](_0x33f796))return![];}return!![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3a9742=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x405df7 of _0x3a9742){const _0x5be8b8=DataManager['getSkillIdWithName'](_0x405df7);if(!_0x5be8b8)continue;if(!_0x2d380f[_0x1e7995(0x249)](_0x5be8b8))return![];}return!![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e7e9f=JSON[_0x1e7995(0x26a)]('['+RegExp['$1'][_0x1e7995(0x316)](/\d+/g)+']');for(const _0x2b36a6 of _0x2e7e9f){if(_0x2d380f['hasSkill'](_0x2b36a6))return!![];}return![];}else{if(_0x76c1c6['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x791d69=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0xd205b2 of _0x791d69){const _0x5a67ef=DataManager[_0x1e7995(0x208)](_0xd205b2);if(!_0x5a67ef)continue;if(_0x2d380f[_0x1e7995(0x249)](_0x5a67ef))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2cd084=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x24470e of _0x2cd084){if(!_0x2d380f[_0x1e7995(0x249)](_0x24470e))return!![];}return![];}else{if(_0x76c1c6['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xd50a8e=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x564a97 of _0xd50a8e){const _0x230dc7=DataManager[_0x1e7995(0x208)](_0x564a97);if(!_0x230dc7)continue;if(!_0x2d380f[_0x1e7995(0x249)](_0x230dc7))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3aea45=JSON[_0x1e7995(0x26a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x335663 of _0x3aea45){if(!_0x2d380f['hasSkill'](_0x335663))return!![];}return![];}else{if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1d64f3=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x3f80d3 of _0x1d64f3){const _0x96c4ef=DataManager[_0x1e7995(0x208)](_0x3f80d3);if(!_0x96c4ef)continue;if(!_0x2d380f[_0x1e7995(0x249)](_0x96c4ef))return!![];}return![];}}if(_0x76c1c6[_0x1e7995(0x316)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ec6ca=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x428055 of _0x4ec6ca){if(_0x2d380f['hasSkill'](_0x428055))return![];}return!![];}else{if(_0x76c1c6['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1b6299=RegExp['$1'][_0x1e7995(0x278)](',');for(const _0x1454b5 of _0x1b6299){const _0x3888c2=DataManager[_0x1e7995(0x208)](_0x1454b5);if(!_0x3888c2)continue;if(_0x2d380f['hasSkill'](_0x3888c2))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x244f65(0x265)]=function(_0x6d31b7){const _0xdfe696=_0x244f65,_0x2a391a=_0x6d31b7[_0xdfe696(0x2e2)],_0x191de8=VisuMZ[_0xdfe696(0x2b5)]['skillVisibleJS'];return _0x191de8[_0x6d31b7['id']]?_0x191de8[_0x6d31b7['id']]['call'](this,_0x6d31b7):!![];},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x1be)]=Window_SkillList['prototype'][_0x244f65(0x2cb)],Window_SkillList[_0x244f65(0x355)]['drawItem']=function(_0x4ca73c){const _0x493984=_0x244f65,_0x44f7a1=this[_0x493984(0x1b9)](_0x4ca73c),_0x1c6bff=_0x44f7a1['name'];if(_0x44f7a1)this[_0x493984(0x18f)](_0x44f7a1);VisuMZ[_0x493984(0x2b5)]['Window_SkillList_drawItem'][_0x493984(0x1d0)](this,_0x4ca73c);if(_0x44f7a1)_0x44f7a1['name']=_0x1c6bff;},Window_SkillList[_0x244f65(0x355)][_0x244f65(0x18f)]=function(_0x47f2bd){const _0x24f800=_0x244f65;if(_0x47f2bd&&_0x47f2bd['note'][_0x24f800(0x316)](/<LIST NAME:[ ](.*)>/i)){_0x47f2bd[_0x24f800(0x381)]=String(RegExp['$1'])[_0x24f800(0x18e)]();for(;;){if(_0x47f2bd['name'][_0x24f800(0x316)](/\\V\[(\d+)\]/gi))_0x47f2bd[_0x24f800(0x381)]=_0x47f2bd[_0x24f800(0x381)][_0x24f800(0x365)](/\\V\[(\d+)\]/gi,(_0x8a66aa,_0x5d5e2e)=>$gameVariables['value'](parseInt(_0x5d5e2e)));else break;}}},Window_SkillList['prototype'][_0x244f65(0x399)]=function(_0x38a1c8,_0x383cce,_0x95e912,_0x7d2250){const _0x2de120=_0x244f65;Window_Base[_0x2de120(0x355)][_0x2de120(0x399)][_0x2de120(0x1d0)](this,this['_actor'],_0x38a1c8,_0x383cce,_0x95e912,_0x7d2250);},Window_SkillList[_0x244f65(0x355)]['setStatusWindow']=function(_0xaac1a8){this['_statusWindow']=_0xaac1a8,this['callUpdateHelp']();},VisuMZ[_0x244f65(0x2b5)][_0x244f65(0x2c4)]=Window_SkillList[_0x244f65(0x355)][_0x244f65(0x1c1)],Window_SkillList[_0x244f65(0x355)]['updateHelp']=function(){const _0x381643=_0x244f65;VisuMZ[_0x381643(0x2b5)][_0x381643(0x2c4)][_0x381643(0x1d0)](this),this[_0x381643(0x1dd)]&&this[_0x381643(0x1dd)][_0x381643(0x2b6)]===Window_ShopStatus&&this['_statusWindow']['setItem'](this[_0x381643(0x334)]());};