//=============================================================================
// VisuStella MZ - Enemy Encounter Effects
// VisuMZ_4_EncounterEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EncounterEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EncounterEffects = VisuMZ.EncounterEffects || {};
VisuMZ.EncounterEffects.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.07] [EncounterEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Encounter_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Both random encounters and on-screen encounters are pretty limited in what
 * they're able to do in RPG Maker MZ. This plugin expands their functionality
 * with some unique effects added through this plugin.
 * 
 * Both types of encounters can benefit from having more control over the
 * occurrence of Preemptive and Surprise Attacks. These can be enforced through
 * Plugin Commands and set up in a queue.
 * 
 * On-screen encounters can utilize alert functions that will cause events to
 * chase the player (or flee from them) once the player steps within their
 * visible detection range.
 * 
 * On-screen encounters can also utilize new functions added for use with the
 * Conditional Branch to determine which direction the player has approached
 * the on-screen encounter event from.
 * 
 * Random encounters can utilize repel and lure effects to nullify any random
 * encounters for a certain amount of steps or to increase their rate of
 * occurrence.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Take control of battle advantage. Enforce preemptive attacks, surprise
 *   attacks, neither, or chance it.
 * * Battle advantages can be set up in a queue for more interesting gameplay.
 * * Events can be given alert functionality to chase the player if the player
 *   steps within their vision range.
 * * Use Terrain Tags and Regions to set up tiles that will block detection
 *   range through line of sight usage.
 * * Events can trigger themselves upon touching followers instead of just
 *   players.
 * * Events can lock themselves in the direction they're facing when interacted
 *   with to make it easier to apply side attack and back attack effects.
 * * Random encounters can be bypassed through repel effects.
 * * Increase the rate of random encounters with lure effects.
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
 * Battle Advantage
 * 
 * Upon starting a battle with forced advantages, any calculations made by
 * other means will be overwritten in favor of the declared forced advantage.
 *
 * ---
 * 
 * Game_Player.encounterProgressValue
 * 
 * This function has been overwritten to allow for more flexibility over the
 * multipliers and effects applied through various effects and to allow for
 * the repel and lure effects to work as best as they can.
 * 
 * ---
 * 
 * Game_Event.updateSelfMovement
 * 
 * This function's original code will be ignored when the event is set to chase
 * or flee from the player after being alerted. After the alert and return
 * periods are over, self movement will resume as normal.
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
 * ---
 * 
 * === Battle Advantage-Related Tags ===
 * 
 * ---
 *
 * <Preemptive>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the preemptive advantage (in favor of the player party).
 *
 * ---
 *
 * <Surprise>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the surprise advantage (in favor of the enemy party).
 *
 * ---
 *
 * <No Advantage>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   no advantage at all.
 *
 * ---
 *
 * <Chance>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   a chance for preemptive, surprise, or no advantages (calculated normally).
 *
 * ---
 * 
 * === Event Encounter-Related Notetags ===
 * 
 * ---
 *
 * <Follower Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This event can trigger by touching a follower instead of only the player.
 *
 * ---
 *
 * <Encounter Direction Lock>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Normally when an event triggers without Direction Fix, it will face the
 *   player character. This tag prevents the event from facing the player, but
 *   still allows the event to freely turn directions.
 * - This is best used in conjunction with the Conditional Branch scripts.
 *
 * ---
 * 
 * === Alert-Related Notetags ===
 * 
 * ---
 *
 * <Alert>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This will use the default settings unless changed by other tags.
 *
 * ---
 *
 * <Alert Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Changes the event's alert detection range to 'x' tiles.
 * - Replace 'x' with a number value representing the number of tiles to use
 *   for its detection range.
 *
 * ---
 *
 * <Alert Dash>
 * <Alert Walk>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - If alerted, the event will dash/walk instead of whatever is set as a
 *   default setting within the Plugin Parameters.
 *
 * ---
 *
 * <Alert Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines the amount of time in frames for the event to chase the
 *   player continuously while the player is outside of the detection range.
 * - Replace 'x' with a number value representing the number of frames for the
 *   event to keep chasing the player with.
 * - If the player steps back into the alert detection range, the timer will be
 *   reset.
 *
 * ---
 * 
 * <Alert FoV Angle: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the Field of View angle to 'x' for the event.
 * - Replace 'x' with a number value representing the degrees of for the field
 *   of view angle used by the event to detect players.
 * - The angle will always be centered to the event's line of sight.
 * 
 * ---
 * 
 * <Alert Show FoV>
 * <Alert Hide FoV>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Shows/hides the field of view for the event.
 * - If an event's field of view is hidden, it can still chase players when
 *   entering the event's range.
 * 
 * ---
 *
 * <Alert Response: chase>
 * <Alert Response: rush>
 * <Alert Response: flee>
 * <Alert Response: random>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines how an alerted event will react.
 * - Chase: Use path finding to find a route to the player
 * - Rush: Rush directly at the player
 * - Flee: Run away from the player
 * - Random: Move in random directions
 *
 * ---
 *
 * <Response Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when initially alerted and responding.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Alert React Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - When initially alerted, there is a small window of waiting before starting
 *   the chase.
 * - Replace 'x' with a number representing the number of frames for the
 *   initial reaction delay.
 *
 * ---
 *
 * <Alert Common Event: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Runs a Common Event when initially alerted.
 * - Replace 'x' with a number representing the ID of the Common Event to run.
 * - Use 0 to run no Common Events.
 *
 * ---
 *
 * <Alert Sound Name: name>
 * <Alert Sound Volume: x>
 * <Alert Sound Pitch: y>
 * <Alert Sound Pan: z>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Play this sound effect when the event is initially alerted.
 * - Replace 'name' with the filename of the sound effect found in /audio/se/
 *   to play. Do NOT include the file extension.
 * - Replace 'x' with a number representing the volume of the sound effect.
 * - Replace 'y' with a number representing the pitch of the sound effect.
 * - Replace 'z' with a number representing the pan of the sound effect.
 *
 * ---
 *
 * <Return Position>
 * <Stay Position>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Decide if the event will return back to its initial position after an
 *   alert chase is over.
 * - Or if it will stay where it currently is.
 *
 * ---
 *
 * <Return Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This is the amount of time spent (in frames) after an alert chase is over
 *   but returning back to the event's original position.
 * - Replace 'x' with a number representing the number of frames for the
 *   duration between idling and returning.
 *
 * ---
 *
 * <Idle Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when beginning the idle phase after an
 *   alert chase is over but before returning back to the original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Returning Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when the event starts returning back to
 *   the event's original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 * 
 * === Alert Vision Blocking-Related Notetags ===
 * 
 * ---
 *
 * <Block Vision Tag: x>
 * <Block Vision Tags: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   terrain tag 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the terrain tag used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * <Block Vision Region: x>
 * <Block Vision Regions: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   region ID 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the region ID used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * ============================================================================
 * Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Conditional Branch event commands with this plugin
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerFront()
 * 
 * - Returns true if the event is facing the player's front.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerBack()
 * 
 * - Returns true if the event is facing the player's back.
 * - Best used with a Surprise attack.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerSide()
 * 
 * - Returns true if the event is facing the player's side.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventFront()
 * 
 * - Returns true if the player is facing the event's front.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventBack()
 * 
 * - Returns true if the player is facing the event's back.
 * - Best used with a Preemptive attack.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventSide()
 * 
 * - Returns true if the player is facing the event's side.
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
 * === Advantage Plugin Commands ===
 * 
 * ---
 *
 * Advantage: Add to Queue
 * - Add (at the end) to the existing advantage queue the following encounter
 *  advantages for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Set Queue
 * - Declare the exact advantage queue for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Reset Queue
 * - Resets the advantage queue for battles.
 *
 * ---
 * 
 * === Alert Plugin Commands ===
 * 
 * ---
 *
 * Alert: Stealth Mode
 * - Changes the stealth mode setting for the player.
 *
 *   Stealth Mode:
 *   - If Stealth Mode is on, bypass unnoticed alerts.
 *   - Already alerted events will stay alert.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Advantage Settings
 * ============================================================================
 *
 * Advantage common event settings related to enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Preemptive Event:
 *   - Run this Common Event upon a preemptive advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   Surprise Event:
 *   - Run this Common Event upon a surprise advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   No Advantage Event:
 *   - Run this Common Event when no advantage is given.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Alert Settings
 * ============================================================================
 *
 * These are settings for alerting events. Used mainly for events chasing the
 * player.
 * 
 * How alert detection works is when the player steps with an event (who has
 * an alert notetag or comment tag), the event will enter alert mode. At the
 * very start, a response balloon will play along with an initialy delay. If
 * there is a common event set, the common event will play immediately.
 * 
 * After the initial delay is over, the event will begin its chasing phase.
 * Although it's called the chasing phase, it can react differently by using
 * path finding to find a way to the player, rushing directly in a straight
 * line at the player, running away from the player, or moving about randomly.
 * 
 * If the player stays out of the event's alert detection range for a specific
 * amount of time, the event will enter its idle phase. An idle balloon will
 * play and the event will wait a short duration.
 * 
 * After this short duration is over, the event will return back to its
 * original position (if desired). Upon starting its return to its original
 * position, it will play the returning balloon.
 * 
 * During the idle and return phases, if the player steps in range of the
 * event's alert range, it will begin the chase all over again.
 *
 * ---
 *
 * Alert
 * 
 *   Detection Range:
 *   - Default tile range for event to detect the player in.
 * 
 *   Alert Dash:
 *   - Alerted events use dashing speed.
 * 
 *   Alert Time:
 *   - Number of frames the alerted event will attempt to chase the player.
 *
 * ---
 *
 * Field of View
 * 
 *   Angle Range:
 *   - The angle range used to determine the event's field of view.
 * 
 *   Show Range:
 *   - Show the field of view of events?
 * 
 *   Color 1:
 *   Color 2:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Response
 * 
 *   Response Type:
 *   - What kind of default response behavior do you want?
 *     - Chase: Use path finding to find a route to the player
 *     - Rush: Rush directly at the player
 *     - Flee: Run away from the player
 *     - Random: Move in random directions
 * 
 *   Response Balloon:
 *   - What kind of balloon should the event play when detecting the player?
 * 
 *   Common Event:
 *   - Run this Common Event when the player is detected.
 *   - Use 0 for no Common Event.
 * 
 *   Reaction Delay:
 *   - Number of frames for the event to stand still before beginning
 *     the chase.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played when alerted.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * Return
 * 
 *   Return Home:
 *   - After finishing a chase, return back to the home position?
 * 
 *   Idle Wait:
 *   - Number of frames to wait before returning home.
 * 
 *   Idle Balloon:
 *   - Play this balloon when an event is about to return.
 * 
 *   Returning Balloon:
 *   - Play this balloon when an event begins returning.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Encounter Multipliers
 * ============================================================================
 *
 * Encounter multiplier settings regarding enemy encounters.
 *
 * ---
 *
 * Bush Multiplier
 * 
 *   Parameter:
 *   - Multiplier for how fast encounters occur by when the player is walking
 *     through bushes.
 * 
 *   Boat Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via boat.
 * 
 *   Ship Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via ship.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Repel/Lure Settings
 * ============================================================================
 *
 * Repel/Lure settings regarding enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Repel Variable:
 *   - Select a variable where if the value is above 0, it will
 *     repel encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Repel reaches 0.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * Settings
 * 
 *   Lure Variable:
 *   - Select a variable where if the value is above 0, it will
 *     lure encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Lure reaches 0.
 *   - Use 0 to run no Common Events.
 * 
 *   Lure Multiplier:
 *   - Multiplier for how fast encounters occur by when the lure
 *     effect is active.
 * 
 *   Lure Increase:
 *   - Flat increase for how fast encounters occur by when the lure
 *     effect is active.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.07: January 6, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: August 20, 2021
 * * Compatibility Update!
 * ** Better compatibility with Event and Movement Core's spawn functions.
 *    Update made by Arisu.
 * 
 * Version 1.05: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for features that were left out by accident.
 * *** Notetag/Comment Tag: <Alert FoV Angle: x>
 * *** Notetag/Comment Tag: <Alert Hide FoV>
 * *** Notetag/Comment Tag: <Alert Show FoV>
 * 
 * Version 1.04: December 11, 2020
 * * Bug Fixes!
 * ** Without the Events and Movement Core, events returning home after a
 *    failed alert chase will no longer crash the game.
 *    Fix by Yanfly and Shiro.
 * 
 * Version 1.03: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: November 29, 2020
 * * Feature Update!
 * ** Initialization of the encounter effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu and Shaz.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Certain notetags will no longer cause crashes. Fix made by Yanfly.
 * ** Erased events will have their alert sprite removed, too. Fix made by
 *    Yanfly.
 *
 * Version 1.00: December 11, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageAddQueue
 * @text Advantage: Add to Queue
 * @desc Add (at the end) to the existing advantage queue the following
 * encounter advantages for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Add to the queue the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageSetQueue
 * @text Advantage: Set Queue
 * @desc Declare the exact advantage queue for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Change the queue to the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageResetQueue
 * @text Advantage: Reset Queue
 * @desc Resets the advantage queue for battles.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AlertStealthMode
 * @text Alert: Stealth Mode
 * @desc Changes the stealth mode setting for the player.
 *
 * @arg StealthMode:eval
 * @text Stealth Mode
 * @type boolean
 * @on Stealth On
 * @off No Steath
 * @desc If Stealth Mode is on, bypass unnoticed alerts.
 * Already alerted events will stay alert.
 * @default true
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
 * @param EncounterEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Advantage:struct
 * @text Advantage Settings
 * @type struct<Advantage>
 * @desc Advantage common event settings related to enemy encounters.
 * @default {"Preemptive:num":"0","Surprise:num":"0","Normal:num":"0"}
 *
 * @param Alert:struct
 * @text Alert Settings
 * @type struct<Alert>
 * @desc Settings alerting events. Used mainly for events chasing the player.
 * @default {"Alert":"","AlertRange:num":"4","AlertDash:eval":"true","AlertLock:num":"600","FoV":"","FovAngle:num":"120","ShowFoV:eval":"true","FovColor1:str":"rgba(255, 0, 0, 0)","FovColor2:str":"rgba(255, 0, 0, 0.5)","Response":"","ResponseType:str":"chase","ResponseBalloon:str":"Exclamation","CommonEvent:num":"0","ReactDelay:num":"80","Sound":"","SoundName:str":"Attack1","SoundVolume:num":"90","SoundPitch:num":"120","SoundPan:num":"0","Return":"","ReturnHome:eval":"true","ReturnWait:num":"180","ReturnStartBalloon:str":"Silence","ReturnEndBalloon:str":"Frustration"}
 *
 * @param EncounterMultiplier:struct
 * @text Encounter Multipliers
 * @type struct<EncounterMultiplier>
 * @desc Encounter multiplier settings regarding enemy encounters.
 * @default {"BushMultiplier:num":"2.00","BoatMultiplier:num":"1.00","ShipMultiplier:num":"0.50"}
 *
 * @param RepelLure:struct
 * @text Repel/Lure Settings
 * @type struct<RepelLure>
 * @desc Repel/Lure settings regarding enemy encounters.
 * @default {"RepelVariable:num":"31","RepelEvent:num":"6","LureVariable:num":"32","LureEvent:num":"8","LureRate:num":"4.0","LureFlat:num":"1"}
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
 * Advantage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Advantage:
 *
 * @param Preemptive:num
 * @text Preemptive Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a preemptive advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Surprise:num
 * @text Surprise Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a surprise advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Normal:num
 * @text No Advantage Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event when no advantage is given.
 * Use 0 to run no Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Alert Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Alert:
 *
 * @param Alert
 * 
 * @param AlertRange:num
 * @text Detection Range
 * @parent Alert
 * @type number
 * @min 1
 * @desc Default tile range for event to detect the player in.
 * @default 4
 *
 * @param AlertDash:eval
 * @text Alert Dash
 * @parent Alert
 * @type boolean
 * @on Dash
 * @off Walk
 * @desc Alerted events use dashing speed.
 * @default true
 * 
 * @param AlertLock:num
 * @text Alert Time
 * @parent Alert
 * @type number
 * @min 1
 * @desc Number of frames the alerted event will attempt to chase the player.
 * @default 600
 *
 * @param FoV
 * @text Field of View
 * 
 * @param FovAngle:num
 * @text Angle Range
 * @parent FoV
 * @type number
 * @min 1
 * @max 360
 * @desc The angle range used to determine the event's field of view.
 * @default 120
 *
 * @param ShowFoV:eval
 * @text Show Range
 * @parent FoV
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the field of view of events?
 * @default true
 *
 * @param FovColor1:str
 * @text Color 1
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0)
 *
 * @param FovColor2:str
 * @text Color 2
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0.5)
 *
 * @param Response
 *
 * @param ResponseType:str
 * @text Response Type
 * @parent Response
 * @type select
 * @option Chase: Use path finding to find a route to the player
 * @value chase
 * @option Rush: Rush directly at the player
 * @value rush
 * @option Flee: Run away from the player
 * @value flee
 * @option Random: Move in random directions
 * @value random
 * @desc What kind of default response behavior do you want?
 * @default chase
 *
 * @param ResponseBalloon:str
 * @text Response Balloon
 * @parent Response
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc What kind of balloon should the event play when detecting the player?
 * @default Exclamation
 *
 * @param CommonEvent:num
 * @text Common Event
 * @parent Response
 * @type common_event
 * @desc Run this Common Event when the player is detected.
 * Use 0 for no Common Event.
 * @default 0
 * 
 * @param ReactDelay:num
 * @text Reaction Delay
 * @parent Response
 * @type number
 * @min 1
 * @desc Number of frames for the event to stand still before beginning the chase.
 * @default 80
 *
 * @param Sound
 *
 * @param SoundName:str
 * @text Filename
 * @type file
 * @parent Sound
 * @dir audio/se/
 * @desc Filename of the sound effect played when alerted.
 * @default Attack1
 *
 * @param SoundVolume:num
 * @text Volume
 * @type number
 * @parent Sound
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param SoundPitch:num
 * @text Pitch
 * @type number
 * @parent Sound
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param SoundPan:num
 * @text Pan
 * @parent Sound
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Return
 *
 * @param ReturnHome:eval
 * @text Return Home
 * @parent Return
 * @type boolean
 * @on Return
 * @off Stay
 * @desc After finishing a chase, return back to the home position?
 * @default true
 * 
 * @param ReturnWait:num
 * @text Idle Wait
 * @parent Return
 * @type number
 * @min 1
 * @desc Number of frames to wait before returning home.
 * @default 180
 *
 * @param ReturnStartBalloon:str
 * @text Idle Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event is about to return.
 * @default Silence
 *
 * @param ReturnEndBalloon:str
 * @text Returning Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event begins returning.
 * @default Frustration
 *
 */
/* ----------------------------------------------------------------------------
 * Encounter Multipliers Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EncounterMultiplier:
 *
 * @param BushMultiplier:num
 * @text Bush Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is walking through bushes.
 * @default 2.00
 *
 * @param BoatMultiplier:num
 * @text Boat Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via boat.
 * @default 1.00
 *
 * @param ShipMultiplier:num
 * @text Ship Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via ship.
 * @default 0.50
 *
 */
/* ----------------------------------------------------------------------------
 * Repel/Lure Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~RepelLure:
 *
 * @param RepelVariable:num
 * @text Repel Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * repel encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param RepelEvent:num
 * @text Wear Off Common Event
 * @parent RepelVariable:num
 * @type common_event
 * @desc Run this Common Event when Repel reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureVariable:num
 * @text Lure Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * lure encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param LureEvent:num
 * @text Wear Off Common Event
 * @parent LureVariable:num
 * @type common_event
 * @desc Run this Common Event when Lure reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureRate:num
 * @text Lure Multiplier
 * @parent LureVariable:num
 * @desc Multiplier for how fast encounters occur by when the
 * lure effect is active.
 * @default 4.0
 *
 * @param LureFlat:num
 * @text Lure Increase
 * @parent LureVariable:num
 * @desc Flat increase for how fast encounters occur by when the
 * lure effect is active.
 * @default 1
 *
 */
//=============================================================================

const _0x1284b8=_0xe80c;(function(_0x6633e0,_0x34c0f9){const _0x4d239c=_0xe80c,_0x10b4c1=_0x6633e0();while(!![]){try{const _0x371373=-parseInt(_0x4d239c(0xbc))/0x1*(-parseInt(_0x4d239c(0x166))/0x2)+-parseInt(_0x4d239c(0xfc))/0x3*(parseInt(_0x4d239c(0x179))/0x4)+parseInt(_0x4d239c(0x185))/0x5*(parseInt(_0x4d239c(0x106))/0x6)+-parseInt(_0x4d239c(0x14a))/0x7+-parseInt(_0x4d239c(0xd7))/0x8*(parseInt(_0x4d239c(0x159))/0x9)+-parseInt(_0x4d239c(0xee))/0xa+parseInt(_0x4d239c(0xdc))/0xb*(parseInt(_0x4d239c(0xc4))/0xc);if(_0x371373===_0x34c0f9)break;else _0x10b4c1['push'](_0x10b4c1['shift']());}catch(_0x50d939){_0x10b4c1['push'](_0x10b4c1['shift']());}}}(_0x5e9b,0x7c240));var label=_0x1284b8(0xed),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1284b8(0x107)](function(_0x5add8a){const _0x1f2740=_0x1284b8;return _0x5add8a[_0x1f2740(0x141)]&&_0x5add8a['description']['includes']('['+label+']');})[0x0];function _0x5e9b(){const _0x4ef76c=['split','Game_Map_setup','checkForcedAdvantage','reactTime','match','encounterProgressValue',',\x20Event\x20Y:\x20','constructor','updateSelfMovementAlerted','checkEncounterEffectsStringTagsChase','lock','initMembers','isFacingSideways','Game_Event_checkEventTriggerTouch','status','ARRAYFUNC','alertSoundVolume','note','executeMoveDir8','terrainTag','returnWaiting','getAlertDistanceToPlayer','setupEncounterEffectsCommentTags','5063072mTcqRH','LIGHT-BULB','updateAlert','returnTime','AlertRange','FovAngle','AlertDefault','MUSIC-NOTE','getAlertAngleToTarget','pos','setAlertStealthMode','USER-DEFINED\x205','ARRAYEVAL','setupEncounterEffectsData','LureEvent','686754OLfckR','Event\x20X:\x20','USER-DEFINED\x203','regionId','code','MUSICNOTE','AdvantageAddQueue','checkEventFollowerTriggerTouch','Game_CharacterBase_setBalloonPose','Preemptive','_visible','isInShip','initialize','14EgJuEx','getAlertStealthMode','name','ReturnWait','FRUSTRATION','BattleManager_startBattle','processRepelEncounters','alertSoundPitch','AlertSoundName','AlertShowFov','chaseTime','updateBitmap','checkEventFacingPlayerFront','isPositionSideOf','direction','updateAngle','addForcedAdvantage','isEventRunning','alertDash','1043020JmLale','EncounterMultiplier','STR','setValue','initEventChaseData','cos','prototype','updateEncounterEffects','_preemptive','initEncounterEffects','showFov','angle','5UPUGsq','restore','anchor','AlertFovAngle','getForcedAdvantage','AlertDash','_EncounterEffectsTouchDirectionLock','moveTo','RepelVariable','LureRate','Game_Event_lock','context','setupPageSettings','follower','_data','round','initEncounterEffectsEffects','LOVE','value','RegExp','random','_alertBlockVisionRegions','startBattle','LureVariable','eventId','registerCommand','Game_CharacterBase_isDashing','tileWidth','initEncounterEffectsData','log','bitmap','isAlertLineOfVisionClear','isSupportDiagonalMovement','flee','\x20This\x20X:\x20','Queue','isPositionBackOf','playSe','arc','Game_Event_setupPageSettings','getAlertDistanceToFollower','ReactDelay','alertSoundPan','update','_forcedAdvantage','setupEncounterEffectsNotetags','Settings','surprise','AlertReactDelay','updateAlertIdle','isChaseReturning','updateSelfMovement','list','_alertStealthMode','MUSIC\x20NOTE','returnWait','_characterErased','hasEncounterHalf','turnTowardPlayer','_processEncounterDirectionLock','alertLock','Game_Event_update','visibleFollowers','moveTypeRandom','start','NUM','ARRAYSTRUCT','ANNOYED','USER-DEFINED\x201','LIGHT','updateSelfMovementReturnFromChase','commonEvent','AlertLock','setForcedAdvantage','ResponseBalloon','ShipMultiplier','chance',',\x20\x20This\x20Y:\x20','clearPageSettings','RepelEvent','length','RepelLure','enabled','Game_System_initialize','findDirectionTo','HEART','troop','parameters','shift','returnStartBalloon','AlertHideFov','_EncounterEffects_EventChaseData','alertSoundName','moveStraight','needsSmartChaseUpdate','needsBitmapRedraw','isRepelEncounters','pow','createFovBitmap','response','preemptive','toLowerCase','_source','BattleManager_onEncounter','EVAL','Surprise','eventX','Player:\x20','Game_Player_initMembers','isChaseAlerted','_trigger','updatePosition','alerted','call','chase','trim','getAlertDistanceToTarget','AlertSoundVolume','ReturnStartBalloon','isLureEncounters','returnEndBalloon','TouchDirectionLock','CommonEvent','contains','Sprite_Character_update','includes','FollowerTrigger','60011STonOP','updateSelfMovementSmartChase','setupEncounterEffectsEffects','ResponseType','getAlertAngleToPlayer','eventY','FUNC','isFacingTowards','12dIMiRU','BlockVisionRegion','fovAngle','no\x20advantage','lineTo','ConvertParams','_EncounterEffectsFollowerTrigger','sqrt','map','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','concat','_alertBlockVisionTags','AdvantageResetQueue','ceil','isPositionFrontOf','refresh','FovColor1','StayPosition','COBWEB','8TsANvv','NoAdvantage','chaseData','EXCLAMATION','isAlertVisionBlocked','17996044zjBmet','setDirection','BlockVisionTag','returnX','Game_Event_updateSelfMovement','QUESTION','ConvertBallonTextToID','_eventAlertChaseCache','height','SWEAT','reserveCommonEvent','ANGER','runAdvantageCommonEvents','SLEEP','isDashing','parent','isMovementSucceeded','EncounterEffects','9699970HpOOyg','Alert','ReturnEndBalloon','USER-DEFINED\x204','reactDelay','checkEventFacingPlayerBack','version','Chance','isChaseEnabled','returnAfter','format','getAlertAngleToFollower','getAlertTargets','Game_Character_turnTowardPlayer','3DCnBRt','FovColor2','initEncounterEffects_ForcedAdvantage','max','Data:\x20','setBalloonPose','push','checkEncounterEffectsStringTags','BattleCore','parse','2896518FYkqPl','filter','isFacingAway','checkPlayerFacingEventFront','LIGHT\x20BULB','checkEventFacingPlayerSide','StealthMode','_erased','debugShowDirections','updateAlertChase','event','Game_Event_clearPageSettings','returning','MUSIC','beginPath','VisuMZ_1_EventsMoveCore','alertBalloon','AlertStealthMode','checkEventTriggerTouch','save','_moveRouteIndex','drawAlertCircle','Event:\x20','processLureEncounters','actor','followers','ReturnHome','exit','playerX','makeDeepCopy','USER-DEFINED\x202','BoatMultiplier','ShowFoV','_character','addColorStop','tileset','getAlertDistanceToClosest','setup','AlertWalk','playerY','page','alertRange','_alertFovSprite','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','description'];_0x5e9b=function(){return _0x4ef76c;};return _0x5e9b();}function _0xe80c(_0x285877,_0x113249){const _0x5e9ba4=_0x5e9b();return _0xe80c=function(_0xe80cb7,_0x27c201){_0xe80cb7=_0xe80cb7-0x8b;let _0x558d3c=_0x5e9ba4[_0xe80cb7];return _0x558d3c;},_0xe80c(_0x285877,_0x113249);}VisuMZ[label][_0x1284b8(0x1b3)]=VisuMZ[label][_0x1284b8(0x1b3)]||{},VisuMZ[_0x1284b8(0xc9)]=function(_0x57e95d,_0x5b3411){const _0x4243f3=_0x1284b8;for(const _0x26059f in _0x5b3411){if(_0x26059f[_0x4243f3(0x137)](/(.*):(.*)/i)){const _0x35688e=String(RegExp['$1']),_0x344056=String(RegExp['$2'])['toUpperCase']()[_0x4243f3(0xb0)]();let _0x1134f8,_0x479b81,_0x2349b0;switch(_0x344056){case _0x4243f3(0x1c6):_0x1134f8=_0x5b3411[_0x26059f]!==''?Number(_0x5b3411[_0x26059f]):0x0;break;case'ARRAYNUM':_0x479b81=_0x5b3411[_0x26059f]!==''?JSON['parse'](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81[_0x4243f3(0xcc)](_0x23cf23=>Number(_0x23cf23));break;case _0x4243f3(0xa5):_0x1134f8=_0x5b3411[_0x26059f]!==''?eval(_0x5b3411[_0x26059f]):null;break;case _0x4243f3(0x156):_0x479b81=_0x5b3411[_0x26059f]!==''?JSON['parse'](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81[_0x4243f3(0xcc)](_0xbf2352=>eval(_0xbf2352));break;case'JSON':_0x1134f8=_0x5b3411[_0x26059f]!==''?JSON[_0x4243f3(0x105)](_0x5b3411[_0x26059f]):'';break;case'ARRAYJSON':_0x479b81=_0x5b3411[_0x26059f]!==''?JSON[_0x4243f3(0x105)](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81['map'](_0x3008fe=>JSON['parse'](_0x3008fe));break;case _0x4243f3(0xc2):_0x1134f8=_0x5b3411[_0x26059f]!==''?new Function(JSON['parse'](_0x5b3411[_0x26059f])):new Function('return\x200');break;case _0x4243f3(0x142):_0x479b81=_0x5b3411[_0x26059f]!==''?JSON[_0x4243f3(0x105)](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81[_0x4243f3(0xcc)](_0x274314=>new Function(JSON[_0x4243f3(0x105)](_0x274314)));break;case _0x4243f3(0x17b):_0x1134f8=_0x5b3411[_0x26059f]!==''?String(_0x5b3411[_0x26059f]):'';break;case'ARRAYSTR':_0x479b81=_0x5b3411[_0x26059f]!==''?JSON['parse'](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81[_0x4243f3(0xcc)](_0x21977b=>String(_0x21977b));break;case'STRUCT':_0x2349b0=_0x5b3411[_0x26059f]!==''?JSON[_0x4243f3(0x105)](_0x5b3411[_0x26059f]):{},_0x1134f8=VisuMZ[_0x4243f3(0xc9)]({},_0x2349b0);break;case _0x4243f3(0x1c7):_0x479b81=_0x5b3411[_0x26059f]!==''?JSON[_0x4243f3(0x105)](_0x5b3411[_0x26059f]):[],_0x1134f8=_0x479b81['map'](_0x3c0bb3=>VisuMZ[_0x4243f3(0xc9)]({},JSON['parse'](_0x3c0bb3)));break;default:continue;}_0x57e95d[_0x35688e]=_0x1134f8;}}return _0x57e95d;},(_0x1d79d4=>{const _0x5b4066=_0x1284b8,_0x195ce5=_0x1d79d4[_0x5b4066(0x168)];for(const _0xc6d422 of dependencies){if(!Imported[_0xc6d422]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5b4066(0xf8)](_0x195ce5,_0xc6d422)),SceneManager[_0x5b4066(0x121)]();break;}}const _0x29a11f=_0x1d79d4[_0x5b4066(0x132)];if(_0x29a11f[_0x5b4066(0x137)](/\[Version[ ](.*?)\]/i)){const _0x595d3c=Number(RegExp['$1']);_0x595d3c!==VisuMZ[label][_0x5b4066(0xf4)]&&(alert(_0x5b4066(0xcd)[_0x5b4066(0xf8)](_0x195ce5,_0x595d3c)),SceneManager[_0x5b4066(0x121)]());}if(_0x29a11f['match'](/\[Tier[ ](\d+)\]/i)){const _0x2ca482=Number(RegExp['$1']);_0x2ca482<tier?(alert(_0x5b4066(0x131)[_0x5b4066(0xf8)](_0x195ce5,_0x2ca482,tier)),SceneManager['exit']()):tier=Math[_0x5b4066(0xff)](_0x2ca482,tier);}VisuMZ[_0x5b4066(0xc9)](VisuMZ[label][_0x5b4066(0x1b3)],_0x1d79d4[_0x5b4066(0x94)]);})(pluginData),PluginManager[_0x1284b8(0x19e)](pluginData[_0x1284b8(0x168)],_0x1284b8(0x15f),_0x467353=>{const _0x2a245b=_0x1284b8;VisuMZ['ConvertParams'](_0x467353,_0x467353);const _0x32acab=_0x467353['Queue'];$gameSystem[_0x2a245b(0x176)](_0x32acab);}),PluginManager[_0x1284b8(0x19e)](pluginData[_0x1284b8(0x168)],'AdvantageSetQueue',_0x330377=>{const _0x199319=_0x1284b8;VisuMZ[_0x199319(0xc9)](_0x330377,_0x330377);const _0x1a00ad=_0x330377[_0x199319(0x1a8)];$gameSystem[_0x199319(0x1ce)](_0x1a00ad);}),PluginManager[_0x1284b8(0x19e)](pluginData[_0x1284b8(0x168)],_0x1284b8(0xd0),_0x2775c9=>{const _0x6988f6=_0x1284b8;VisuMZ['ConvertParams'](_0x2775c9,_0x2775c9),$gameSystem[_0x6988f6(0x1ce)]([]);}),PluginManager['registerCommand'](pluginData[_0x1284b8(0x168)],_0x1284b8(0x117),_0x238ad3=>{const _0x57dfe7=_0x1284b8;VisuMZ[_0x57dfe7(0xc9)](_0x238ad3,_0x238ad3);const _0x41e5e8=_0x238ad3[_0x57dfe7(0x10c)];$gamePlayer[_0x57dfe7(0x154)](_0x41e5e8);}),VisuMZ[_0x1284b8(0xed)][_0x1284b8(0x198)]={'Preemptive':/<(?:PREEMPTIVE|PRE-EMPTIVE|PRE EMPTIVE)>/i,'Surprise':/<(?:SURPRISE|SURPRISED)>/i,'NoAdvantage':/<NO ADVANTAGE>/i,'Chance':/<CHANCE>/i,'FollowerTrigger':/<(?:FOLLOWER TRIGGER|FOLLOWERTRIGGER)>/i,'TouchDirectionLock':/<(?:ENCOUNTER LOCK|ENCOUNTER DIRECTION LOCK)>/i,'AlertDefault':/<ALERT>/i,'AlertRange':/<ALERT RANGE:[ ](\d+)>/i,'AlertDash':/<ALERT DASH>/i,'AlertWalk':/<ALERT WALK>/i,'AlertLock':/<ALERT TIME:[ ](\d+)>/i,'AlertFovAngle':/<ALERT FOV ANGLE:[ ](\d+)>/i,'AlertShowFov':/<ALERT SHOW FOV>/i,'AlertHideFov':/<ALERT HIDE FOV>/i,'AlertResponse':/<ALERT RESPONSE:[ ](.*)>/i,'AlertBalloon':/<(?:ALERT|RESPONSE) BALLOON:[ ](.*)>/i,'AlertReactDelay':/<ALERT REACT DELAY:[ ](\d+)>/i,'AlertCommonEvent':/<ALERT COMMON EVENT:[ ](\d+)>/i,'AlertSoundName':/<ALERT SOUND NAME:[ ](.*)>/i,'AlertSoundVolume':/<ALERT SOUND VOLUME:[ ](\d+)>/i,'AlertSoundPitch':/<ALERT SOUND PITCH:[ ](\d+)>/i,'AlertSoundPan':/<ALERT SOUND PAN:[ ](.*)>/i,'ReturnPosition':/<RETURN POSITION>/i,'StayPosition':/<STAY POSITION>/i,'ReturnStartBalloon':/<IDLE BALLOON:[ ](.*)>/i,'ReturnEndBalloon':/<RETURNING BALLOON:[ ](.*)>/i,'ReturnWait':/<RETURN TIME:[ ](\d+)>/i,'BlockVisionTag':/<(?:BLOCK|BLOCKED) VISION (?:TAG|TAGS):[ ](.*)>/i,'BlockVisionRegion':/<(?:BLOCK|BLOCKED) VISION (?:REGION|REGIONS):[ ](.*)>/i},VisuMZ['EncounterEffects'][_0x1284b8(0x16b)]=BattleManager[_0x1284b8(0x19b)],BattleManager['startBattle']=function(){const _0x517791=_0x1284b8;this[_0x517791(0x135)](),VisuMZ['EncounterEffects'][_0x517791(0x16b)]['call'](this),this[_0x517791(0xe8)]();},BattleManager[_0x1284b8(0x135)]=function(){const _0x14425f=_0x1284b8,_0x495213=$gameSystem['shiftForcedAdvantage']();if(!_0x495213)return;switch(_0x495213[_0x14425f(0xa2)]()[_0x14425f(0xb0)]()){case _0x14425f(0xa1):this['_preemptive']=!![],this['_surprise']=![];break;case _0x14425f(0x1b4):this[_0x14425f(0x181)]=![],this['_surprise']=!![];break;case _0x14425f(0xc7):this[_0x14425f(0x181)]=![],this['_surprise']=![];break;case _0x14425f(0x1d1):VisuMZ[_0x14425f(0x104)][_0x14425f(0xa4)]['call'](this);break;}},BattleManager[_0x1284b8(0xe8)]=function(){const _0x73e842=_0x1284b8,_0x38df04=VisuMZ[_0x73e842(0xed)][_0x73e842(0x1b3)]['Advantage'];if(!_0x38df04)return;let _0x7aec91=0x0;if(this[_0x73e842(0x181)])_0x7aec91=_0x38df04[_0x73e842(0x162)]||0x0;else this['_surprise']?_0x7aec91=_0x38df04['Surprise']||0x0:_0x7aec91=_0x38df04['Normal']||0x0;_0x7aec91>0x0&&$gameTemp[_0x73e842(0xe6)](_0x7aec91);},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0x90)]=Game_System[_0x1284b8(0x17f)][_0x1284b8(0x165)],Game_System[_0x1284b8(0x17f)][_0x1284b8(0x165)]=function(){const _0x199486=_0x1284b8;VisuMZ[_0x199486(0xed)]['Game_System_initialize'][_0x199486(0xae)](this),this['initEncounterEffects_ForcedAdvantage']();},Game_System[_0x1284b8(0x17f)][_0x1284b8(0xfe)]=function(){const _0x3a39fb=_0x1284b8;this[_0x3a39fb(0x1b1)]=[];},Game_System[_0x1284b8(0x17f)][_0x1284b8(0x189)]=function(){const _0x1749bb=_0x1284b8;return this[_0x1749bb(0x1b1)]===undefined&&this[_0x1749bb(0xfe)](),this['_forcedAdvantage'];},Game_System[_0x1284b8(0x17f)]['shiftForcedAdvantage']=function(){const _0x546122=_0x1284b8;if($gameTroop&&$gameTroop['troop']()){const _0x5c81f2=VisuMZ[_0x546122(0xed)][_0x546122(0x198)],_0x15704c=$gameTroop[_0x546122(0x93)]()[_0x546122(0x168)];if(_0x15704c[_0x546122(0x137)](_0x5c81f2[_0x546122(0x162)]))return'preemptive';else{if(_0x15704c[_0x546122(0x137)](_0x5c81f2[_0x546122(0xa6)]))return'surprise';else{if(_0x15704c[_0x546122(0x137)](_0x5c81f2[_0x546122(0xd8)]))return'no\x20advantage';else{if(_0x15704c[_0x546122(0x137)](_0x5c81f2[_0x546122(0xf5)]))return _0x546122(0x1d1);}}}}return this[_0x546122(0x189)]()[_0x546122(0x95)]();},Game_System[_0x1284b8(0x17f)][_0x1284b8(0x1ce)]=function(_0x5152b8){const _0x218fd0=_0x1284b8;this[_0x218fd0(0x1b1)]===undefined&&this[_0x218fd0(0xfe)](),this[_0x218fd0(0x1b1)]=_0x5152b8;},Game_System[_0x1284b8(0x17f)][_0x1284b8(0x176)]=function(_0x2a0524){const _0x12384d=_0x1284b8;this['_forcedAdvantage']===undefined&&this['initEncounterEffects_ForcedAdvantage'](),this[_0x12384d(0x1b1)]=this['_forcedAdvantage'][_0x12384d(0xce)](_0x2a0524);},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0x134)]=Game_Map[_0x1284b8(0x17f)][_0x1284b8(0x12b)],Game_Map[_0x1284b8(0x17f)]['setup']=function(_0x2f3682){const _0x67348e=_0x1284b8;VisuMZ['EncounterEffects']['Game_Map_setup'][_0x67348e(0xae)](this,_0x2f3682),this[_0x67348e(0x1a1)](),this[_0x67348e(0x157)]();},Game_Map['prototype'][_0x1284b8(0x1a1)]=function(){const _0x5b6a33=_0x1284b8;this['_alertBlockVisionTags']=[],this[_0x5b6a33(0x19a)]=[];},Game_Map[_0x1284b8(0x17f)][_0x1284b8(0x157)]=function(){const _0x34acef=_0x1284b8,_0x2518de=this[_0x34acef(0x129)]();if(!_0x2518de)return;const _0x3ea794=VisuMZ[_0x34acef(0xed)]['RegExp'],_0x186244=_0x2518de[_0x34acef(0x144)],_0x241f06=$dataMap?$dataMap[_0x34acef(0x144)]:'';if(_0x186244['match'](_0x3ea794[_0x34acef(0xde)])){const _0x116ca7=String(RegExp['$1'])['split'](',')[_0x34acef(0xcc)](_0x36177b=>Number(_0x36177b));this[_0x34acef(0xcf)]=this[_0x34acef(0xcf)][_0x34acef(0xce)](_0x116ca7);}if(_0x186244[_0x34acef(0x137)](_0x3ea794['BlockVisionRegion'])){const _0x49c704=String(RegExp['$1'])['split'](',')[_0x34acef(0xcc)](_0x15910b=>Number(_0x15910b));this[_0x34acef(0x19a)]=this['_alertBlockVisionRegions'][_0x34acef(0xce)](_0x49c704);}if(_0x241f06[_0x34acef(0x137)](_0x3ea794[_0x34acef(0xde)])){const _0x40de3e=String(RegExp['$1'])[_0x34acef(0x133)](',')['map'](_0x21811c=>Number(_0x21811c));this['_alertBlockVisionTags']=this[_0x34acef(0xcf)][_0x34acef(0xce)](_0x40de3e);}if(_0x241f06[_0x34acef(0x137)](_0x3ea794[_0x34acef(0xc5)])){const _0x43c0f6=String(RegExp['$1'])[_0x34acef(0x133)](',')['map'](_0x127e8d=>Number(_0x127e8d));this[_0x34acef(0x19a)]=this[_0x34acef(0x19a)][_0x34acef(0xce)](_0x43c0f6);}},Game_Map['prototype'][_0x1284b8(0xdb)]=function(_0x40a817,_0x2785ac){const _0x33a766=_0x1284b8;if(this[_0x33a766(0xcf)]===undefined)return![];if(this['_alertBlockVisionRegions']===undefined)return![];const _0x2e7cf6=this[_0x33a766(0x146)](_0x40a817,_0x2785ac);if(this[_0x33a766(0xcf)]['includes'](_0x2e7cf6))return!![];const _0x3f5b61=this[_0x33a766(0x15c)](_0x40a817,_0x2785ac);if(this[_0x33a766(0x19a)][_0x33a766(0xba)](_0x3f5b61))return!![];return![];},Game_CharacterBase['prototype'][_0x1284b8(0x10e)]=function(_0x1f85c2){const _0x9061b3=_0x1284b8;return;console['log'](_0x9061b3(0x1a7)+this['x']+_0x9061b3(0x1d2)+this['y']),console['log'](_0x9061b3(0x15a)+_0x1f85c2['x']+_0x9061b3(0x139)+_0x1f85c2['y']);},Game_CharacterBase[_0x1284b8(0x17f)][_0x1284b8(0xc3)]=function(_0x8cfdc5){const _0x11d257=_0x1284b8;switch(this[_0x11d257(0x174)]()){case 0x1:return[0x8,0x9,0x6][_0x11d257(0xb8)](_0x8cfdc5[_0x11d257(0x174)]());case 0x2:return[0x7,0x8,0x9][_0x11d257(0xb8)](_0x8cfdc5[_0x11d257(0x174)]());case 0x3:return[0x4,0x7,0x8][_0x11d257(0xb8)](_0x8cfdc5[_0x11d257(0x174)]());case 0x4:return[0x9,0x6,0x3]['contains'](_0x8cfdc5[_0x11d257(0x174)]());case 0x6:return[0x7,0x4,0x1]['contains'](_0x8cfdc5[_0x11d257(0x174)]());case 0x7:return[0x2,0x3,0x6][_0x11d257(0xb8)](_0x8cfdc5[_0x11d257(0x174)]());case 0x8:return[0x1,0x2,0x3][_0x11d257(0xb8)](_0x8cfdc5['direction']());case 0x9:return[0x4,0x1,0x2][_0x11d257(0xb8)](_0x8cfdc5[_0x11d257(0x174)]());}return![];},Game_CharacterBase[_0x1284b8(0x17f)]['isFacingAway']=function(_0x46e7e2){const _0x28989d=_0x1284b8;switch(this[_0x28989d(0x174)]()){case 0x1:return[0x4,0x1,0x2][_0x28989d(0xb8)](_0x46e7e2['direction']());case 0x2:return[0x1,0x2,0x3]['contains'](_0x46e7e2[_0x28989d(0x174)]());case 0x3:return[0x2,0x3,0x6][_0x28989d(0xb8)](_0x46e7e2[_0x28989d(0x174)]());case 0x4:return[0x7,0x4,0x1][_0x28989d(0xb8)](_0x46e7e2[_0x28989d(0x174)]());case 0x6:return[0x9,0x6,0x3][_0x28989d(0xb8)](_0x46e7e2['direction']());case 0x7:return[0x4,0x7,0x8][_0x28989d(0xb8)](_0x46e7e2[_0x28989d(0x174)]());case 0x8:return[0x7,0x8,0x9][_0x28989d(0xb8)](_0x46e7e2[_0x28989d(0x174)]());case 0x9:return[0x8,0x9,0x6]['contains'](_0x46e7e2['direction']());}return![];},Game_CharacterBase['prototype'][_0x1284b8(0x13f)]=function(_0x4eb670){const _0x457fdd=_0x1284b8;switch(this['direction']()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x4eb670[_0x457fdd(0x174)]());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x457fdd(0xb8)](_0x4eb670['direction']());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x457fdd(0xb8)](_0x4eb670['direction']());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x457fdd(0xb8)](_0x4eb670['direction']());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x457fdd(0xb8)](_0x4eb670[_0x457fdd(0x174)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x457fdd(0xb8)](_0x4eb670['direction']());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3]['contains'](_0x4eb670[_0x457fdd(0x174)]());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x4eb670[_0x457fdd(0x174)]());}return![];},Game_CharacterBase[_0x1284b8(0x17f)][_0x1284b8(0xd2)]=function(_0x1b1363){const _0xb441cd=_0x1284b8;this[_0xb441cd(0x10e)](_0x1b1363);switch(this[_0xb441cd(0x174)]()){case 0x1:return _0x1b1363['y']>this['y'];case 0x2:return _0x1b1363['y']>this['y'];case 0x3:return _0x1b1363['y']>this['y'];case 0x4:return _0x1b1363['x']<this['x'];case 0x6:return _0x1b1363['x']>this['x'];case 0x7:return _0x1b1363['y']<this['y'];case 0x8:return _0x1b1363['y']<this['y'];case 0x9:return _0x1b1363['y']<this['y'];}return![];},Game_CharacterBase[_0x1284b8(0x17f)]['isPositionBackOf']=function(_0x31609b){const _0x56986c=_0x1284b8;this[_0x56986c(0x10e)](_0x31609b);switch(this[_0x56986c(0x174)]()){case 0x1:return _0x31609b['y']<this['y'];case 0x2:return _0x31609b['y']<this['y'];case 0x3:return _0x31609b['y']<this['y'];case 0x4:return _0x31609b['x']>this['x'];case 0x6:return _0x31609b['x']<this['x'];case 0x7:return _0x31609b['y']>this['y'];case 0x8:return _0x31609b['y']>this['y'];case 0x9:return _0x31609b['y']>this['y'];}return![];},Game_CharacterBase[_0x1284b8(0x17f)]['isPositionSideOf']=function(_0x4cc46c){const _0x2962e8=_0x1284b8;this[_0x2962e8(0x10e)](_0x4cc46c);switch(this[_0x2962e8(0x174)]()){case 0x1:return this['x']<_0x4cc46c['x']&&this['y']>_0x4cc46c['y']||this['x']>_0x4cc46c['x']&&this['y']<_0x4cc46c['y'];case 0x2:return this['x']!==_0x4cc46c['x'];case 0x3:return this['x']>_0x4cc46c['x']&&this['y']>_0x4cc46c['y']||this['x']<_0x4cc46c['x']&&this['y']<_0x4cc46c['y'];case 0x4:return this['y']!==_0x4cc46c['y'];break;case 0x6:return this['y']!==_0x4cc46c['y'];break;case 0x7:return this['x']>_0x4cc46c['x']&&this['y']>_0x4cc46c['y']||this['x']<_0x4cc46c['x']&&this['y']<_0x4cc46c['y'];case 0x8:return this['x']!==_0x4cc46c['x'];case 0x9:return this['x']<_0x4cc46c['x']&&this['y']>_0x4cc46c['y']||this['x']>_0x4cc46c['x']&&this['y']<_0x4cc46c['y'];}return![];},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0xa9)]=Game_Player[_0x1284b8(0x17f)][_0x1284b8(0x13e)],Game_Player[_0x1284b8(0x17f)][_0x1284b8(0x13e)]=function(){const _0x2e0d2a=_0x1284b8;VisuMZ[_0x2e0d2a(0xed)]['Game_Player_initMembers']['call'](this),this[_0x2e0d2a(0x182)]();},Game_Player[_0x1284b8(0x17f)][_0x1284b8(0x182)]=function(){const _0x431a4d=_0x1284b8;this[_0x431a4d(0x1ba)]=![];},Game_Player['prototype'][_0x1284b8(0x167)]=function(){const _0x225650=_0x1284b8;return this[_0x225650(0x1ba)]===undefined&&this[_0x225650(0x182)](),this[_0x225650(0x1ba)];},Game_Player['prototype'][_0x1284b8(0x154)]=function(_0x511a06){const _0x5cb4e2=_0x1284b8;this[_0x5cb4e2(0x1ba)]===undefined&&this[_0x5cb4e2(0x182)](),this[_0x5cb4e2(0x1ba)]=_0x511a06;},Game_Player['prototype'][_0x1284b8(0x138)]=function(){const _0x2e60ca=_0x1284b8;if(this[_0x2e60ca(0x9d)]())return this[_0x2e60ca(0x16c)](),0x0;const _0x245f26=VisuMZ[_0x2e60ca(0xed)][_0x2e60ca(0x1b3)][_0x2e60ca(0x17a)];if(!_0x245f26)return 0x1;let _0x1f792e=0x1;return $gameMap['isBush'](this['x'],this['y'])&&(_0x1f792e*=_0x245f26['BushMultiplier']),$gameParty[_0x2e60ca(0x1be)]()&&(_0x1f792e*=0.5),this['isInBoat']()&&(_0x1f792e*=_0x245f26[_0x2e60ca(0x125)]),this[_0x2e60ca(0x164)]()&&(_0x1f792e*=_0x245f26[_0x2e60ca(0x1d0)]),this[_0x2e60ca(0xb4)]()&&(_0x1f792e=this[_0x2e60ca(0x11d)](_0x1f792e)),_0x1f792e;},Game_Player['prototype'][_0x1284b8(0x9d)]=function(){const _0x3b914e=_0x1284b8,_0x446378=VisuMZ['EncounterEffects']['Settings'][_0x3b914e(0x8e)];if(!_0x446378)return![];if(_0x446378['RepelVariable']<=0x0)return![];const _0x4e715a=$gameVariables[_0x3b914e(0x197)](_0x446378[_0x3b914e(0x18d)])||0x0;return _0x4e715a>0x0;},Game_Player['prototype'][_0x1284b8(0x16c)]=function(){const _0x32b06a=_0x1284b8,_0x36c2ea=VisuMZ['EncounterEffects'][_0x32b06a(0x1b3)]['RepelLure'];if(!_0x36c2ea)return;if(_0x36c2ea[_0x32b06a(0x18d)]<=0x0)return;let _0x2c9173=$gameVariables['value'](_0x36c2ea[_0x32b06a(0x18d)])||0x0;const _0x96ef63=_0x2c9173>0x0;_0x96ef63&&(_0x2c9173--,$gameVariables['setValue'](_0x36c2ea['RepelVariable'],_0x2c9173),_0x2c9173<=0x0&&_0x36c2ea[_0x32b06a(0x8c)]>0x0&&$gameTemp['reserveCommonEvent'](_0x36c2ea['RepelEvent']));},Game_Player[_0x1284b8(0x17f)][_0x1284b8(0xb4)]=function(){const _0x1e4cb0=_0x1284b8,_0x4af325=VisuMZ['EncounterEffects'][_0x1e4cb0(0x1b3)][_0x1e4cb0(0x8e)];if(!_0x4af325)return![];if(_0x4af325[_0x1e4cb0(0x19c)]<=0x0)return![];const _0x16cc67=$gameVariables[_0x1e4cb0(0x197)](_0x4af325[_0x1e4cb0(0x19c)])||0x0;return _0x16cc67>0x0;},Game_Player['prototype'][_0x1284b8(0x11d)]=function(_0xd742be){const _0x191256=_0x1284b8,_0x2b4b9b=VisuMZ['EncounterEffects']['Settings']['RepelLure'];if(!_0x2b4b9b)return _0xd742be;if(_0x2b4b9b[_0x191256(0x19c)]<=0x0)return _0xd742be;let _0x1922d8=$gameVariables[_0x191256(0x197)](_0x2b4b9b[_0x191256(0x19c)])||0x0;const _0x2db5b8=_0x1922d8>0x0;return _0x2db5b8&&(_0x1922d8--,$gameVariables[_0x191256(0x17c)](_0x2b4b9b[_0x191256(0x19c)],_0x1922d8),_0x1922d8<=0x0&&_0x2b4b9b[_0x191256(0x158)]>0x0&&$gameTemp[_0x191256(0xe6)](_0x2b4b9b[_0x191256(0x158)])),_0xd742be*=_0x2b4b9b[_0x191256(0x18e)],_0xd742be+=_0x2b4b9b['LureFlat'],_0xd742be;},VisuMZ['EncounterEffects'][_0x1284b8(0x111)]=Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x8b)],Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x8b)]=function(){const _0x3beb79=_0x1284b8;VisuMZ['EncounterEffects'][_0x3beb79(0x111)][_0x3beb79(0xae)](this),this[_0x3beb79(0x195)]();},VisuMZ['EncounterEffects'][_0x1284b8(0x1ac)]=Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x191)],Game_Event['prototype'][_0x1284b8(0x191)]=function(){const _0x3b89c9=_0x1284b8;VisuMZ[_0x3b89c9(0xed)][_0x3b89c9(0x1ac)][_0x3b89c9(0xae)](this),this[_0x3b89c9(0xbe)]();},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0xbe)]=function(){const _0x43f0ef=_0x1284b8;this[_0x43f0ef(0x195)](),this['setupEncounterEffectsNotetags'](),this['setupEncounterEffectsCommentTags']();},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1b2)]=function(_0x36a470){const _0x55edd=_0x1284b8;if(!this[_0x55edd(0x110)]())return;const _0x37bae8=this[_0x55edd(0x110)]()[_0x55edd(0x144)];if(_0x37bae8==='')return;this['checkEncounterEffectsStringTags'](_0x37bae8);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x149)]=function(_0x15584c){const _0x30af5c=_0x1284b8;if(!this[_0x30af5c(0x110)]())return;if(!this[_0x30af5c(0x12e)]())return;const _0x2eab29=this[_0x30af5c(0x1b9)]();let _0x2a8c3b='';for(const _0x4ae3ce of _0x2eab29){if([0x6c,0x198][_0x30af5c(0xba)](_0x4ae3ce[_0x30af5c(0x15d)])){if(_0x2a8c3b!=='')_0x2a8c3b+='\x0a';_0x2a8c3b+=_0x4ae3ce[_0x30af5c(0x94)][0x0];}}this['checkEncounterEffectsStringTags'](_0x2a8c3b);},Game_Event[_0x1284b8(0x17f)]['initEncounterEffectsEffects']=function(){const _0x467d4a=_0x1284b8;this[_0x467d4a(0xca)]=![],this[_0x467d4a(0x18b)]=![],this['initEventChaseData']();},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x103)]=function(_0x2e6ebe){const _0x3012cd=_0x1284b8,_0x447c16=VisuMZ[_0x3012cd(0xed)][_0x3012cd(0x198)];_0x2e6ebe[_0x3012cd(0x137)](_0x447c16[_0x3012cd(0xbb)])&&(this[_0x3012cd(0xca)]=!![],this[_0x3012cd(0xab)]=0x2),_0x2e6ebe[_0x3012cd(0x137)](_0x447c16[_0x3012cd(0xb6)])&&(this[_0x3012cd(0x18b)]=!![]),this[_0x3012cd(0x13c)](_0x2e6ebe);},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0x140)]=Game_Event[_0x1284b8(0x17f)]['checkEventTriggerTouch'],Game_Event['prototype'][_0x1284b8(0x118)]=function(_0x36e37e,_0x2cef0d){const _0x2ae3bc=_0x1284b8;VisuMZ['EncounterEffects'][_0x2ae3bc(0x140)][_0x2ae3bc(0xae)](this,_0x36e37e,_0x2cef0d),this[_0x2ae3bc(0x160)](_0x36e37e,_0x2cef0d);},Game_Event[_0x1284b8(0x17f)]['checkEventFollowerTriggerTouch']=function(_0x5fc683,_0xda402d){const _0x206c43=_0x1284b8;if(!this[_0x206c43(0xca)])return;if($gameMap[_0x206c43(0x177)]())return;if(this[_0x206c43(0xab)]!==0x2)return;if(this['isJumping']())return;if(!this['isNormalPriority']())return;const _0xdc88d1=$gamePlayer[_0x206c43(0x11f)]()[_0x206c43(0x1c3)]();for(const _0x123153 of _0xdc88d1){if(!_0x123153)continue;if(_0x123153[_0x206c43(0x153)](_0x5fc683,_0xda402d)){this[_0x206c43(0x1c5)]();break;}}},VisuMZ[_0x1284b8(0xed)]['Game_Event_lock']=Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x13d)],Game_Event[_0x1284b8(0x17f)]['lock']=function(){const _0x3e31ca=_0x1284b8;this[_0x3e31ca(0x1c0)]=!!this[_0x3e31ca(0x18b)],VisuMZ[_0x3e31ca(0xed)][_0x3e31ca(0x18f)]['call'](this),this[_0x3e31ca(0x1c0)]=undefined;},VisuMZ['EncounterEffects']['Game_Character_turnTowardPlayer']=Game_Character[_0x1284b8(0x17f)][_0x1284b8(0x1bf)],Game_Character['prototype'][_0x1284b8(0x1bf)]=function(){const _0x425f33=_0x1284b8;if(this[_0x425f33(0x1c0)])return;VisuMZ['EncounterEffects'][_0x425f33(0xfb)][_0x425f33(0xae)](this);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x17d)]=function(){const _0x18e227=_0x1284b8,_0x52f3f8=VisuMZ[_0x18e227(0xed)][_0x18e227(0x1b3)]['Alert'];this['_EncounterEffects_EventChaseData']={'enabled':![],'alerted':![],'alertRange':_0x52f3f8[_0x18e227(0x14e)],'alertDash':_0x52f3f8['AlertDash'],'alertLock':_0x52f3f8['AlertLock'],'chaseTime':_0x52f3f8[_0x18e227(0x1cd)],'fovAngle':_0x52f3f8[_0x18e227(0x14f)],'showFov':_0x52f3f8[_0x18e227(0x126)],'response':_0x52f3f8[_0x18e227(0xbf)],'alertBalloon':VisuMZ['EncounterEffects'][_0x18e227(0xe2)](_0x52f3f8[_0x18e227(0x1cf)]),'commonEvent':_0x52f3f8[_0x18e227(0xb7)],'reactDelay':_0x52f3f8[_0x18e227(0x1ae)],'reactTime':_0x52f3f8[_0x18e227(0x1ae)],'alertSoundName':_0x52f3f8['SoundName'],'alertSoundVolume':_0x52f3f8['SoundVolume'],'alertSoundPitch':_0x52f3f8['SoundPitch'],'alertSoundPan':_0x52f3f8['SoundPan'],'returnStartBalloon':VisuMZ[_0x18e227(0xed)]['ConvertBallonTextToID'](_0x52f3f8[_0x18e227(0xb3)]),'returnEndBalloon':VisuMZ[_0x18e227(0xed)][_0x18e227(0xe2)](_0x52f3f8['ReturnEndBalloon']),'returnAfter':_0x52f3f8[_0x18e227(0x120)],'returnWaiting':![],'returnTime':_0x52f3f8[_0x18e227(0x169)],'returnWait':_0x52f3f8[_0x18e227(0x169)],'returning':![],'returnX':this['x'],'returnY':this['y'],'returnDir':this[_0x18e227(0x174)]()};},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0xe2)]=function(_0x39baa8){const _0x7c468=_0x1284b8;let _0x2c2357=0x0;switch(_0x39baa8['toUpperCase']()[_0x7c468(0xb0)]()){case'!':case _0x7c468(0xda):_0x2c2357=0x1;break;case'?':case _0x7c468(0xe1):_0x2c2357=0x2;break;case _0x7c468(0x113):case'NOTE':case _0x7c468(0x1bb):case _0x7c468(0x151):case _0x7c468(0x15e):_0x2c2357=0x3;break;case _0x7c468(0x92):case _0x7c468(0x196):_0x2c2357=0x4;break;case _0x7c468(0xe7):_0x2c2357=0x5;break;case _0x7c468(0xe5):_0x2c2357=0x6;break;case _0x7c468(0xd6):case _0x7c468(0x1c8):case _0x7c468(0x16a):_0x2c2357=0x7;break;case'SILENCE':case'...':_0x2c2357=0x8;break;case _0x7c468(0x1ca):case'BULB':case _0x7c468(0x10a):case _0x7c468(0x14b):case'LIGHTBULB':_0x2c2357=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x7c468(0xe9):_0x2c2357=0xa;break;case _0x7c468(0x1c9):_0x2c2357=0xb;break;case _0x7c468(0x124):_0x2c2357=0xc;break;case _0x7c468(0x15b):_0x2c2357=0xd;break;case _0x7c468(0xf1):_0x2c2357=0xe;break;case _0x7c468(0x155):_0x2c2357=0xf;break;}return _0x2c2357;},Game_Event['prototype'][_0x1284b8(0x13c)]=function(_0xa9a4fc){const _0x20c300=_0x1284b8,_0x4f525d=VisuMZ[_0x20c300(0xed)][_0x20c300(0x198)],_0x58675d=this['_EncounterEffects_EventChaseData'];_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x150)])&&(_0x58675d[_0x20c300(0x8f)]=!![]);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x14e)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x12f)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x18a)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x178)]=![]);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x12c)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d['alertDash']=![]);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x1cd)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x1c1)]=Number(RegExp['$1'])||0x1,_0x58675d[_0x20c300(0x170)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x188)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0xc6)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x16f)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x183)]=!![]);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x97)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x183)]=![]);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['AlertResponse'])&&(_0x58675d['enabled']=!![],_0x58675d[_0x20c300(0xa0)]=String(RegExp['$1'])[_0x20c300(0xa2)]()[_0x20c300(0xb0)]());if(_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['AlertBalloon'])){_0x58675d[_0x20c300(0x8f)]=!![];const _0x1f8fca=VisuMZ['EncounterEffects'][_0x20c300(0xe2)](String(RegExp['$1']));_0x58675d[_0x20c300(0x116)]=_0x1f8fca;}_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x1b5)])&&(_0x58675d['enabled']=!![],_0x58675d[_0x20c300(0xf2)]=Number(RegExp['$1'])||0x1,_0x58675d[_0x20c300(0x136)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['AlertCommonEvent'])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x1cc)]=Number(RegExp['$1'])||0x0);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0x16e)])&&(_0x58675d['enabled']=!![],_0x58675d['alertSoundName']=String(RegExp['$1']));_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0xb2)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x143)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['AlertSoundPitch'])&&(_0x58675d['enabled']=!![],_0x58675d[_0x20c300(0x16d)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['AlertSoundPan'])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x1af)]=Number(RegExp['$1'])||0x1);_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['ReturnPosition'])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0xf7)]=!![]);_0xa9a4fc['match'](_0x4f525d[_0x20c300(0xd5)])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0xf7)]=![]);if(_0xa9a4fc[_0x20c300(0x137)](_0x4f525d[_0x20c300(0xb3)])){_0x58675d[_0x20c300(0x8f)]=!![];const _0x21c228=VisuMZ[_0x20c300(0xed)]['ConvertBallonTextToID'](String(RegExp['$1']));_0x58675d[_0x20c300(0x96)]=_0x21c228;}if(_0xa9a4fc['match'](_0x4f525d[_0x20c300(0xf0)])){_0x58675d[_0x20c300(0x8f)]=!![];const _0x1270c2=VisuMZ[_0x20c300(0xed)]['ConvertBallonTextToID'](String(RegExp['$1']));_0x58675d[_0x20c300(0xb5)]=_0x1270c2;}_0xa9a4fc[_0x20c300(0x137)](_0x4f525d['ReturnWait'])&&(_0x58675d[_0x20c300(0x8f)]=!![],_0x58675d[_0x20c300(0x14d)]=Number(RegExp['$1'])||0x1,_0x58675d['returnWait']=Number(RegExp['$1'])||0x1);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0xd9)]=function(){const _0x3b72e3=_0x1284b8;return this[_0x3b72e3(0x98)]===undefined&&this[_0x3b72e3(0xd3)](),this['_EncounterEffects_EventChaseData'];},Game_Event[_0x1284b8(0x17f)]['isChaseEnabled']=function(){const _0x1428c4=_0x1284b8;if(this['_erased'])return![];return this[_0x1428c4(0xd9)]()[_0x1428c4(0x8f)];},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1b7)]=function(){const _0x590d02=_0x1284b8;return this[_0x590d02(0xd9)]()['returnWaiting']||this[_0x590d02(0xd9)]()['returning'];},Game_Event[_0x1284b8(0x17f)]['isChaseAlerted']=function(){const _0x1566e5=_0x1284b8;return this[_0x1566e5(0xd9)]()[_0x1566e5(0xad)];},VisuMZ[_0x1284b8(0xed)]['Game_Event_updateSelfMovement']=Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1b8)],Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1b8)]=function(){const _0x119daf=_0x1284b8;if(this['isChaseAlerted']())this[_0x119daf(0x13b)]();else this[_0x119daf(0x1b7)]()?this['updateSelfMovementReturnFromChase']():VisuMZ['EncounterEffects'][_0x119daf(0xe0)][_0x119daf(0xae)](this);},Game_Event[_0x1284b8(0x17f)]['updateSelfMovementAlerted']=function(){const _0x41134f=_0x1284b8,_0x6cf0b2=this['chaseData']();if(_0x6cf0b2[_0x41134f(0x136)]>0x0){_0x6cf0b2[_0x41134f(0x136)]-=0x1;return;}switch(_0x6cf0b2['response']){case _0x41134f(0xaf):this[_0x41134f(0xbd)]();break;case'rush':this['moveTowardPlayer']();break;case _0x41134f(0x1a6):this['moveAwayFromPlayer']();break;case _0x41134f(0x199):this[_0x41134f(0x1c4)]();break;default:VisuMZ[_0x41134f(0xed)][_0x41134f(0xe0)][_0x41134f(0xae)](this);break;}},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0xbd)]=function(){const _0x4ef34a=_0x1284b8;if(!this[_0x4ef34a(0x9b)]())return;this[_0x4ef34a(0xe3)]=this['_eventAlertChaseCache']||{},this[_0x4ef34a(0xe3)]['playerX']=$gamePlayer['x'],this[_0x4ef34a(0xe3)][_0x4ef34a(0x12d)]=$gamePlayer['y'],this[_0x4ef34a(0xe3)]['eventX']=this['x'],this[_0x4ef34a(0xe3)][_0x4ef34a(0xc1)]=this['y'];const _0x40fb27=Imported[_0x4ef34a(0x115)]&&$gameMap[_0x4ef34a(0x1a5)]();let _0x437712=$gamePlayer['x'],_0x100193=$gamePlayer['y'],_0x26efab=0x0;_0x40fb27?(_0x26efab=this['findDiagonalDirectionTo'](_0x437712,_0x100193),this[_0x4ef34a(0x145)](_0x26efab)):(_0x26efab=this[_0x4ef34a(0x91)](_0x437712,_0x100193),this[_0x4ef34a(0x9a)](_0x26efab));},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x9b)]=function(){const _0x58277b=_0x1284b8;if(this['isMoving']())return![];this[_0x58277b(0xe3)]=this[_0x58277b(0xe3)]||{};if(this[_0x58277b(0xe3)][_0x58277b(0x122)]!==$gamePlayer['x'])return!![];if(this[_0x58277b(0xe3)]['playerY']!==$gamePlayer['y'])return!![];if(this['_eventAlertChaseCache'][_0x58277b(0xa7)]!==this['x'])return!![];if(this[_0x58277b(0xe3)]['eventY']!==this['y'])return!![];return![];},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1cb)]=function(){const _0x2dc363=_0x1284b8,_0x2946cc=this[_0x2dc363(0xd9)]();if(!_0x2946cc['returning'])return;let _0x31bdaa=_0x2946cc[_0x2dc363(0xdf)],_0x5b0c36=_0x2946cc['returnY'];this['x']===_0x31bdaa&&this['y']===_0x5b0c36&&(_0x2946cc['returning']=![],this[_0x2dc363(0x11a)]=0x0,this[_0x2dc363(0xdd)](_0x2946cc['returnDir']));const _0x78b4e8=Imported[_0x2dc363(0x115)]&&$gameMap['isSupportDiagonalMovement']();let _0x379c23=0x0;_0x78b4e8?(_0x379c23=this['findDiagonalDirectionTo'](_0x31bdaa,_0x5b0c36),this['executeMoveDir8'](_0x379c23)):(_0x379c23=this[_0x2dc363(0x91)](_0x31bdaa,_0x5b0c36),this[_0x2dc363(0x9a)](_0x379c23));},VisuMZ['EncounterEffects'][_0x1284b8(0x1c2)]=Game_Event[_0x1284b8(0x17f)]['update'],Game_Event['prototype'][_0x1284b8(0x1b0)]=function(){const _0x309e8e=_0x1284b8;VisuMZ[_0x309e8e(0xed)][_0x309e8e(0x1c2)][_0x309e8e(0xae)](this),this[_0x309e8e(0x14c)]();},Game_Event['prototype']['updateAlert']=function(){const _0xe0c07b=_0x1284b8;if(!this[_0xe0c07b(0xf6)]())return;this[_0xe0c07b(0xaa)]()?this[_0xe0c07b(0x10f)]():(this['updateAlertReturnWait'](),this['updateAlertIdle']());},Game_Event[_0x1284b8(0x17f)]['updateAlertChase']=function(){const _0x523f59=_0x1284b8,_0x4a88ad=this['chaseData'](),_0xa35a01=this[_0x523f59(0x12a)]();if(_0xa35a01>_0x4a88ad[_0x523f59(0x12f)]){_0x4a88ad[_0x523f59(0x170)]--;if(_0x4a88ad[_0x523f59(0x170)]>0x0)return;_0x4a88ad[_0x523f59(0xad)]=![],_0x4a88ad[_0x523f59(0xf7)]?(_0x4a88ad['returnWaiting']=!![],_0x4a88ad[_0x523f59(0x14d)]=_0x4a88ad[_0x523f59(0x1bc)],$gameTemp['requestBalloon'](this,_0x4a88ad[_0x523f59(0x96)])):$gameTemp['requestBalloon'](this,_0x4a88ad['returnEndBalloon']);}else _0x4a88ad['chaseTime']=_0x4a88ad['alertLock'];},Game_Event[_0x1284b8(0x17f)]['updateAlertReturnWait']=function(){const _0x3e0809=_0x1284b8,_0x1a0fe6=this[_0x3e0809(0xd9)]();if(!_0x1a0fe6[_0x3e0809(0x147)])return;_0x1a0fe6[_0x3e0809(0x14d)]-=0x1,_0x1a0fe6[_0x3e0809(0x14d)]<=0x0&&(_0x1a0fe6[_0x3e0809(0x147)]=![],_0x1a0fe6[_0x3e0809(0x112)]=!![],$gameTemp['requestBalloon'](this,_0x1a0fe6['returnEndBalloon']));},Game_Event['prototype'][_0x1284b8(0x1b6)]=function(){const _0x326315=_0x1284b8;if($gamePlayer[_0x326315(0x167)]())return;const _0x5ca773=this[_0x326315(0xd9)](),_0x46c854=Math[_0x326315(0x194)](this[_0x326315(0x12a)]());if(_0x46c854>_0x5ca773['alertRange'])return;const _0x132fb5=this[_0x326315(0xc0)]();if(_0x132fb5>_0x5ca773[_0x326315(0xc6)])return;if(!this[_0x326315(0x1a4)]())return;_0x5ca773['alerted']=!![],_0x5ca773[_0x326315(0x170)]=_0x5ca773[_0x326315(0x1c1)],_0x5ca773[_0x326315(0x147)]=![],_0x5ca773[_0x326315(0x112)]=![],$gameTemp['requestBalloon'](this,_0x5ca773[_0x326315(0x116)]),_0x5ca773[_0x326315(0x136)]=_0x5ca773['reactDelay'];_0x5ca773[_0x326315(0x1cc)]>0x0&&$gameTemp[_0x326315(0xe6)](_0x5ca773['commonEvent']);if(_0x5ca773[_0x326315(0x99)]!==''){const _0x1e6eca={'name':_0x5ca773[_0x326315(0x99)],'volume':_0x5ca773['alertSoundVolume'],'pitch':_0x5ca773[_0x326315(0x16d)],'pan':_0x5ca773[_0x326315(0x1af)]};AudioManager[_0x326315(0x1aa)](_0x1e6eca);}},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0xfa)]=function(){const _0x2f69ff=_0x1284b8,_0x1e12cd=[$gamePlayer];if($gamePlayer[_0x2f69ff(0x11f)]()[_0x2f69ff(0x163)])for(let _0x5009d0=0x0;_0x5009d0<$gamePlayer[_0x2f69ff(0x11f)]()[_0x2f69ff(0x193)][_0x2f69ff(0x8d)];_0x5009d0++){const _0x1070ff=$gamePlayer['followers']()['follower'](_0x5009d0);if(!_0x1070ff)continue;if(!_0x1070ff['actor']())continue;_0x1e12cd[_0x2f69ff(0x102)](_0x1070ff);}return _0x1e12cd;},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x12a)]=function(){const _0x31d7a8=_0x1284b8,_0x1ca015=[];_0x1ca015[_0x31d7a8(0x102)](this[_0x31d7a8(0x148)]());for(let _0x135b6a=0x0;_0x135b6a<$gamePlayer[_0x31d7a8(0x11f)]()[_0x31d7a8(0x193)][_0x31d7a8(0x8d)];_0x135b6a++){_0x1ca015['push'](this[_0x31d7a8(0x1ad)](_0x135b6a));}return Math['min'](..._0x1ca015);},Game_Event[_0x1284b8(0x17f)]['getAlertDistanceToPlayer']=function(){const _0x563bf8=_0x1284b8;return this[_0x563bf8(0xb1)]($gamePlayer);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1ad)]=function(_0x1cc006){const _0x19d74b=_0x1284b8;if(!$gamePlayer[_0x19d74b(0x11f)]()[_0x19d74b(0x163)])return 0x3e7;const _0x48c1aa=$gamePlayer['followers']()[_0x19d74b(0x192)](_0x1cc006);if(!_0x48c1aa[_0x19d74b(0x11e)]())return 0x3e7;return this[_0x19d74b(0xb1)](_0x48c1aa);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0xb1)]=function(_0x231716){const _0x4eb097=_0x1284b8,_0x404596=this['x'],_0x51a127=this['y'],_0x249585=_0x231716['x'],_0x5bc3c4=_0x231716['y'],_0xce913d=Math[_0x4eb097(0x9e)](_0x249585-_0x404596,0x2),_0x20bb5c=Math[_0x4eb097(0x9e)](_0x5bc3c4-_0x51a127,0x2);return Math[_0x4eb097(0xcb)](_0xce913d+_0x20bb5c);},Game_Event['prototype'][_0x1284b8(0xc0)]=function(_0x16e834){const _0x5b376b=_0x1284b8;return this[_0x5b376b(0x152)]($gamePlayer,_0x16e834);},Game_Event['prototype'][_0x1284b8(0xf9)]=function(_0x519a02,_0x2ea8b7){const _0x41f173=_0x1284b8;if(!$gamePlayer['followers']()[_0x41f173(0x163)])return 0x3e7;const _0x181be3=$gamePlayer[_0x41f173(0x11f)]()[_0x41f173(0x192)](_0x519a02);if(!_0x181be3['actor']())return 0x3e7;return this[_0x41f173(0x152)](_0x181be3,_0x2ea8b7);},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x152)]=function(_0x55e35c,_0x139d44){const _0x2f32d7=_0x1284b8,_0x4292b4=this['x'],_0x537f0a=this['y'],_0x46d2c7=_0x55e35c['x'],_0x4ae150=_0x55e35c['y'];let _0x20f4a8=Math['atan2'](_0x4ae150-_0x537f0a,_0x46d2c7-_0x4292b4)*0xb4/Math['PI'];if(!_0x139d44){const _0x1cf7de=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this[_0x2f32d7(0x174)]()];_0x20f4a8+=_0x1cf7de,_0x20f4a8+=this['chaseData']()[_0x2f32d7(0xc6)]/0x2;}while(_0x20f4a8<0x0)_0x20f4a8+=0x168;while(_0x20f4a8>=0x168)_0x20f4a8-=0x168;return _0x20f4a8;},Game_Event[_0x1284b8(0x17f)][_0x1284b8(0x1a4)]=function(){const _0xa8c1c3=_0x1284b8;let _0xa390d9=![];const _0x41dee3=this[_0xa8c1c3(0x12a)]();_0xa390d9&&(console['log'](_0xa8c1c3(0xa8),$gamePlayer['x'],$gamePlayer['y']),console[_0xa8c1c3(0x1a2)](_0xa8c1c3(0x11c),this['x'],this['y']));const _0xa545e9=this[_0xa8c1c3(0xfa)]();for(const _0x4310d0 of _0xa545e9){if(!_0x4310d0)continue;let _0x8a7de1=_0x41dee3,_0x47804b=this['getAlertAngleToTarget'](_0x4310d0,!![]),_0x5e844e=_0x47804b*Math['PI']/0xb4;while(_0x8a7de1>=0x0){const _0x9224a4=Math[_0xa8c1c3(0x194)](this['x']+_0x8a7de1*Math[_0xa8c1c3(0x17e)](_0x5e844e)),_0x1166da=Math[_0xa8c1c3(0x194)](this['y']+_0x8a7de1*Math['sin'](_0x5e844e));_0x8a7de1-=0x1;_0xa390d9&&console[_0xa8c1c3(0x1a2)](_0xa8c1c3(0x100),_0x47804b,_0x8a7de1,_0x9224a4,_0x1166da);if($gameMap[_0xa8c1c3(0xdb)](_0x9224a4,_0x1166da))return![];}}return!![];},VisuMZ[_0x1284b8(0xed)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x1284b8(0x17f)][_0x1284b8(0xea)],Game_CharacterBase['prototype'][_0x1284b8(0xea)]=function(){const _0x32641b=_0x1284b8;if(this[_0x32641b(0x13a)]===Game_Event&&this[_0x32641b(0xaa)]()&&this[_0x32641b(0xd9)]()[_0x32641b(0x178)])return this[_0x32641b(0xec)]();return VisuMZ[_0x32641b(0xed)][_0x32641b(0x19f)][_0x32641b(0xae)](this);},VisuMZ[_0x1284b8(0xed)]['Game_CharacterBase_setBalloonPose']=Game_CharacterBase[_0x1284b8(0x17f)]['setBalloonPose'],Game_CharacterBase['prototype'][_0x1284b8(0x101)]=function(_0x35ca8b,_0x2a3fc7){const _0x367480=_0x1284b8;if(this[_0x367480(0x13a)]===Game_Event){if(this[_0x367480(0x1b7)]()||this[_0x367480(0xaa)]())return;}VisuMZ['EncounterEffects'][_0x367480(0x161)]['call'](this,_0x35ca8b,_0x2a3fc7);},Game_Interpreter[_0x1284b8(0x17f)][_0x1284b8(0x172)]=function(){const _0x474048=_0x1284b8,_0xda2f4a=$gameMap[_0x474048(0x110)](this[_0x474048(0x19d)]());if(!_0xda2f4a)return![];const _0x423c32=$gamePlayer;return _0xda2f4a[_0x474048(0xc3)](_0x423c32)&&_0x423c32[_0x474048(0xd2)](_0xda2f4a);},Game_Interpreter[_0x1284b8(0x17f)][_0x1284b8(0xf3)]=function(){const _0x173f24=_0x1284b8,_0x258a57=$gameMap[_0x173f24(0x110)](this['eventId']());if(!_0x258a57)return![];const _0x3d092a=$gamePlayer;return _0x258a57[_0x173f24(0x108)](_0x3d092a)&&_0x3d092a[_0x173f24(0x1a9)](_0x258a57);},Game_Interpreter[_0x1284b8(0x17f)][_0x1284b8(0x10b)]=function(){const _0xfb8299=_0x1284b8,_0x2f6a8f=$gameMap[_0xfb8299(0x110)](this[_0xfb8299(0x19d)]());if(!_0x2f6a8f)return![];const _0x31d3d7=$gamePlayer;return _0x2f6a8f['isFacingSideways'](_0x31d3d7)&&_0x31d3d7[_0xfb8299(0x173)](_0x2f6a8f);},Game_Interpreter['prototype'][_0x1284b8(0x109)]=function(){const _0x18f78b=_0x1284b8,_0x2e73fb=$gameMap[_0x18f78b(0x110)](this['eventId']());if(!_0x2e73fb)return![];const _0x4cfb7f=$gamePlayer;return _0x4cfb7f[_0x18f78b(0xc3)](_0x2e73fb)&&_0x2e73fb[_0x18f78b(0xd2)](_0x4cfb7f);},Game_Interpreter[_0x1284b8(0x17f)]['checkPlayerFacingEventBack']=function(){const _0x48bdbf=_0x1284b8,_0x55c31b=$gameMap[_0x48bdbf(0x110)](this[_0x48bdbf(0x19d)]());if(!_0x55c31b)return![];const _0x50d763=$gamePlayer;return _0x50d763['isFacingAway'](_0x55c31b)&&_0x55c31b[_0x48bdbf(0x1a9)](_0x50d763);},Game_Interpreter[_0x1284b8(0x17f)]['checkPlayerFacingEventSide']=function(){const _0x58420b=_0x1284b8,_0x19a26d=$gameMap[_0x58420b(0x110)](this[_0x58420b(0x19d)]());if(!_0x19a26d)return![];const _0x12f390=$gamePlayer;return _0x12f390[_0x58420b(0x13f)](_0x19a26d)&&_0x19a26d[_0x58420b(0x173)](_0x12f390);},VisuMZ[_0x1284b8(0xed)][_0x1284b8(0xb9)]=Sprite_Character['prototype'][_0x1284b8(0x1b0)],Sprite_Character[_0x1284b8(0x17f)][_0x1284b8(0x1b0)]=function(){const _0x47bd46=_0x1284b8;VisuMZ[_0x47bd46(0xed)]['Sprite_Character_update'][_0x47bd46(0xae)](this),this[_0x47bd46(0x180)]();},Sprite_Character[_0x1284b8(0x17f)]['updateEncounterEffects']=function(){this['createAlertFovSprite']();},Sprite_Character[_0x1284b8(0x17f)]['createAlertFovSprite']=function(){const _0x14c8b6=_0x1284b8;if(this[_0x14c8b6(0x130)])return;if(!this[_0x14c8b6(0xeb)])return;this[_0x14c8b6(0x130)]=new Sprite_AlertFovSprite(this),this[_0x14c8b6(0x130)]['z']=0x6,this[_0x14c8b6(0xeb)]['addChild'](this[_0x14c8b6(0x130)]);};function Sprite_AlertFovSprite(){const _0x3b1cd7=_0x1284b8;this[_0x3b1cd7(0x165)](...arguments);}Sprite_AlertFovSprite[_0x1284b8(0x17f)]=Object['create'](Sprite[_0x1284b8(0x17f)]),Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x13a)]=Sprite_AlertFovSprite,Sprite_AlertFovSprite[_0x1284b8(0x17f)]['initialize']=function(_0x25a0b5){const _0x51c929=_0x1284b8;this[_0x51c929(0xa3)]=_0x25a0b5,this[_0x51c929(0x127)]=_0x25a0b5['_character'],Sprite[_0x51c929(0x17f)]['initialize'][_0x51c929(0xae)](this),this['initMembers'](),this[_0x51c929(0x1b0)]();},Sprite_AlertFovSprite['prototype']['initMembers']=function(){const _0x1850ea=_0x1284b8;this[_0x1850ea(0x187)]['x']=0.5,this[_0x1850ea(0x187)]['y']=0.5,this[_0x1850ea(0x1bd)]=![];if(!this[_0x1850ea(0x127)])return;if(this[_0x1850ea(0x127)][_0x1850ea(0x13a)]!==Game_Event)return;this['_data']={};},Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x1b0)]=function(){const _0x3099a8=_0x1284b8;Sprite['prototype'][_0x3099a8(0x1b0)][_0x3099a8(0xae)](this);if(!this[_0x3099a8(0x127)])return;if(this['_character'][_0x3099a8(0x13a)]!==Game_Event)return;this[_0x3099a8(0x171)]();if(!this[_0x3099a8(0x193)][_0x3099a8(0x8f)])return;this['updatePosition'](),this[_0x3099a8(0x175)]();},Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x171)]=function(){const _0x1b10d7=_0x1284b8;if(!this['needsBitmapRedraw']())return;this[_0x1b10d7(0x193)]=JsonEx[_0x1b10d7(0x123)](this['_character'][_0x1b10d7(0xd9)]());if(this['_data']['enabled']&&!this[_0x1b10d7(0x127)][_0x1b10d7(0x10d)])this['createFovBitmap']();else{this[_0x1b10d7(0x1bd)]=this[_0x1b10d7(0x127)]['_erased'];if(this[_0x1b10d7(0x1a3)])this[_0x1b10d7(0x1a3)]['destroy']();this['bitmap']=new Bitmap(0x1,0x1);}},Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x9c)]=function(){const _0x22416c=_0x1284b8,_0x173bd3=this[_0x22416c(0x127)][_0x22416c(0xd9)](),_0x4face3=this[_0x22416c(0x193)];if(_0x173bd3['enabled']!==_0x4face3[_0x22416c(0x8f)])return!![];if(_0x173bd3[_0x22416c(0x12f)]!==_0x4face3[_0x22416c(0x12f)])return!![];if(_0x173bd3['fovAngle']!==_0x4face3[_0x22416c(0xc6)])return!![];if(this['_characterErased']!==this['_character'][_0x22416c(0x10d)])return!![];return![];},Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x9f)]=function(){const _0x1ae812=_0x1284b8,_0x4d9fd2=this[_0x1ae812(0x193)];if(!_0x4d9fd2[_0x1ae812(0x183)])return;const _0x4c39f2=VisuMZ[_0x1ae812(0xed)][_0x1ae812(0x1b3)][_0x1ae812(0xef)],_0x44025a=_0x4d9fd2['fovAngle'],_0xf577f4=Math[_0x1ae812(0xd1)]((_0x4d9fd2[_0x1ae812(0x12f)]+0.4)*$gameMap[_0x1ae812(0x1a0)]()),_0x7a374=_0x4c39f2[_0x1ae812(0xd4)],_0x326da4=_0x4c39f2[_0x1ae812(0xfd)];this[_0x1ae812(0x1a3)]=new Bitmap(_0xf577f4*0x2,_0xf577f4*0x2),this[_0x1ae812(0x1a3)]['drawAlertCircle'](_0xf577f4,_0x44025a,_0x7a374,_0x326da4),this['blendMode']=0x1;},Bitmap['prototype'][_0x1284b8(0x11b)]=function(_0x50aa1f,_0x77b6ca,_0x1ac707,_0x2aafc0){const _0x502a96=_0x1284b8,_0x1b22e6=this[_0x502a96(0x190)],_0x1cab2e=_0x77b6ca*(Math['PI']/0xb4),_0x56fb46=_0x50aa1f*0x2,_0x55755d=_0x1b22e6['createRadialGradient'](_0x50aa1f,_0x50aa1f,0x18,_0x50aa1f,_0x50aa1f,_0x50aa1f);_0x55755d['addColorStop'](0x0,_0x1ac707),_0x55755d[_0x502a96(0x128)](0.85,_0x2aafc0),_0x55755d[_0x502a96(0x128)](0x1,_0x1ac707),_0x1b22e6[_0x502a96(0x119)](),_0x1b22e6['fillStyle']=_0x55755d,_0x1b22e6[_0x502a96(0x114)](),_0x1b22e6[_0x502a96(0x18c)](_0x50aa1f,_0x50aa1f),_0x1b22e6[_0x502a96(0xc8)](_0x56fb46,_0x50aa1f),_0x1b22e6[_0x502a96(0x1ab)](_0x50aa1f,_0x50aa1f,_0x50aa1f,0x0,_0x1cab2e),_0x1b22e6[_0x502a96(0xc8)](_0x50aa1f,_0x50aa1f),_0x1b22e6['fill'](),_0x1b22e6[_0x502a96(0x186)](),this['_baseTexture'][_0x502a96(0x1b0)]();},Sprite_AlertFovSprite['prototype'][_0x1284b8(0xac)]=function(){const _0x88321d=_0x1284b8;this['x']=this[_0x88321d(0xa3)]['x'],this['y']=this[_0x88321d(0xa3)]['y']-this[_0x88321d(0xa3)][_0x88321d(0xe4)]/0x2;},Sprite_AlertFovSprite[_0x1284b8(0x17f)][_0x1284b8(0x175)]=function(){const _0x2076e2=_0x1284b8,_0x29f140=this[_0x2076e2(0x193)];let _0x314ae5=_0x29f140[_0x2076e2(0xc6)]/-0x2;_0x314ae5+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this['_character']['_direction']],this[_0x2076e2(0x184)]=_0x314ae5;};