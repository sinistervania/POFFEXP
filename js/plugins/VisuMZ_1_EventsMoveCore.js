//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.33] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x452dd7=_0x54f2;(function(_0x572bf4,_0xe16cb6){const _0x20e2cf=_0x54f2,_0x51c894=_0x572bf4();while(!![]){try{const _0x11e2f7=parseInt(_0x20e2cf(0x1a1))/0x1*(-parseInt(_0x20e2cf(0x3a6))/0x2)+-parseInt(_0x20e2cf(0x29f))/0x3+-parseInt(_0x20e2cf(0x366))/0x4+parseInt(_0x20e2cf(0x178))/0x5+parseInt(_0x20e2cf(0x4a4))/0x6+parseInt(_0x20e2cf(0x168))/0x7+parseInt(_0x20e2cf(0x233))/0x8*(parseInt(_0x20e2cf(0x25f))/0x9);if(_0x11e2f7===_0xe16cb6)break;else _0x51c894['push'](_0x51c894['shift']());}catch(_0x24aca9){_0x51c894['push'](_0x51c894['shift']());}}}(_0x283b,0x396dd));var label=_0x452dd7(0x278),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x30aecc){const _0x95d358=_0x452dd7;return _0x30aecc[_0x95d358(0x3ec)]&&_0x30aecc[_0x95d358(0x1e8)][_0x95d358(0x38b)]('['+label+']');})[0x0];function _0x283b(){const _0x1c8f32=['Game_Message_setItemChoice','_spawnPreserved','getPreservedMorphEventData','useCarryPoseForIcons','list','removeMorph','horizontal\x20mirror','setEventLabelsVisible','deltaXFrom','setupPageSettings','deleteSavedEventLocation','_selfTarget','Value','Game_Map_isDashDisabled','TiltRight','SPIN\x20CCW','isSpawnHitboxCollisionOk','square','Seconds','directionOnLadderSpriteVS8dir','AdvancedSwitches','Game_Follower_initialize','hasStepAnime','Game_CharacterBase_screenX','forceCarrying','meetActivationRegionConditions','convertSelfVariableValuesInScriptCall','isSaveEventLocations','updateScale','updateRoutineMove','setPlayerControlDisable','Scene_Boot_onDatabaseLoaded','getLastPluginCommandInterpreter','EventAutoMovement','SpawnEventAtRegion','EXCLAMATION','posEventsMoveCore','VisibleEventLabels','getEventIconIndex','Toggle','isMapSwitch','Hours','follower','_expireCommonEvent','Template','HEART','Setting','Game_Interpreter_updateWaitMode','reverseDir','setup','setupDiagonalSupport','checkAdvancedSwitchVariablePresent','CPCsMet','Game_CharacterBase_moveStraight','BitmapSmoothing','Game_CharacterBase_isDashing','mimic','Game_Player_executeMove','ShowShadows','processMoveRouteTeleportToCharacter','processMoveSynchRandom','Game_Player_checkEventTriggerThere','VICTORY','COBWEB','Icon','setDashingEnabled','random','eventsXy','addLoadListener','isBoat','iconIndex','hasEventIcon','bind','_labelWindows','prepareSpawnedEventAtTerrainTag','_erased','destinationX','Game_CharacterBase_initMembers','NOTE','_moveSynch','moveTowardCharacter','LOVE','%1Dock','Game_Interpreter_character','startMapCommonEventOnTouch','switches','setBalloonPose','SelfSwitchID','away','conditions','HMPH','searchLimit','executeMove','updateParallel','drawing','_moveOnlyRegions','EVAL','type','_eventIconSprite','Step2EventId','IconBufferX','checkSmartEventCollision','activationProximityDistance','text','prepareSpawnedEventAtXY','_needsPeriodicRefresh','MUSICNOTE','_seconds','setMoveRoute','DashModifier','blendMode','locate','processMoveRouteSelfVariable','loadDataFile','WalkAllow','updateShadow','Boat','_DisablePlayerControl','_followerControlID','Game_Follower_chaseCharacter','visibleRange','drawTextEx','Game_Player_increaseSteps','getPlayerDiagonalSetting','EventIconDelete','roundY','distance','OpacitySpeed','Game_Event_setupPageSettings','_interpreter','SlowerSpeed','morphIntoTemplate','_encounterEffectDuration','SCREEN','min','561354cywdIr','meetsCPC','_spriteOffsetY','EventTimerSpeed','%1Forbid','_forceShowFollower','StopAutoMoveEvents','right','scale','SelfVariables','changeSpeed','_characterSprites','isDashing','Game_Message_add','processMoveRouteJumpTo','setupSpawn','roundYWithDirection','inBattle','Region%1','onLoadSuccess','Enable','disable','itemPadding','initialize','_moveAllowPlayerCollision','log','FollowerID','correctFacingDirection','pages','setOpacity','checkRegionEventTrigger','VisuMZ_1_MessageCore','canStartLocalEvents','labelWindowText','_eventScreenX','setupEvents','Minutes','regionList','isPreventSelfMovement','Game_CharacterBase_characterIndex','TurnInPlaceDelay','abs','Forbid','_commonEvents','_characterIndex','ship','setCommonEvent','_forceCarrying','$callEventMap','roundXWithDirection','updateShadowChanges','RIGHT','_eventPageIndex','SPIN\x20ANTICLOCKWISE','processMoveRouteStepToCharacter','registerSelfTarget','execute','max','rotation','call','pluginCommandCallEvent','isPassable','autosaveEventLocation','onOk','variableId','isPlayerControlDisabled','_screenZoomScale','Step2Preserve','LEFT','Game_Event_findProperPageIndex','Window_NumberInput_processOk','ZZZ','SpawnEventDespawnRegions','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_opacity','updateTilt','variableValid','updateMoveSynch','_activationProximity','ShipSpeed','_cacheVisibility','loadCPC','resume','moveSynchTarget','processMoveRouteFadeIn','Game_Troop_meetsConditionsCPC','Game_Switches_value','StopAutoMoveMessages','DashingEnable','isSupportDiagonalMovement','getSavedEventLocation','setImage','Game_CharacterBase_canPass','hasMoveOnlyRegions','Game_Event_meetsConditionsCPC','apply','setupPlayerVisibilityOverrides','SpawnEventDespawnEventID','isShadowShrink','mapId','advancedFunc','MapID','checkNeedForPeriodicRefresh','_spriteset','Walk','processMoveRouteAnimation','textSizeEx','EventID','update','unlockEvent','savePreservedMorphEventDataKey','processMoveCommand','_eventLabelOffsetX','GetMoveSynchTarget','Game_Event_updateParallel','AirshipSpeed','setPose','checkEventTriggerEventsMoveCore','updateMove','TargetSwitchId','of\x20Preloaded\x20Maps.\x0a\x0a','SuccessSwitchId','PreloadMaps','_pose','processMoveRouteMoveToCharacter','airship','createSpawnedEventWithData','Window_EventItem_onCancel','activationRegionList','slice','bufferX','initMembersEventsMoveCore','deltaYFrom','updateBitmapSmoothing','Game_Map_events','EventLabelRefresh','Game_Player_isDashing','copy','Self\x20Switch\x20%1','Game_CharacterBase_updatePattern','iconHeight','clearDashing','createCharacterShadow','Game_Event_event','_visiblePlayerX','isRegionForbidPass','BlendMode','registerSelfEvent','target','FastForwardKey','Sprite_Character_setCharacterBitmap','eventId','loadSystem','isBusy','isEventClickTriggered','EventTemplates','forceMoveRoute','Step2MapId','Game_Switches_setValue','PlayerMovementDiagonal','RegionTouch','isRegionAllowPass','Game_CharacterBase_setDirection','LineHeight','SILENCE','SPIN\x20ACW','removeTemporaryMapSpawnedEvents','Game_CharacterBase_moveDiagonally','_randomHomeX','eventsXyNt','Game_Timer_stop','Sprite_Character_setTileBitmap','saveEventLocation','Collision','_commonEventId','fontSize','initFollowerController','LIGHT-BULB','Visible','1162756KPSawh','filename','_pageIndex','Allow','pause','Disable','_data','turnLeft90','eventLabelsVisible','_type','Dock','setAllowEventAutoMovement','timer','Visibility','SelfSwitchABCD','regionId','1546360ALgGGw','vehicle','DOWN','onChange','isLandOk','defaultFontSize','IconBlendMode','template','toLowerCase','Game_CharacterBase_increaseSteps','posNt','IconBufferY','Sprite_Character_characterPatternY','TOGGLE','startMapCommonEventOnOKTarget','_stopCount','Game_CommonEvent_isActive','_character','MorphEventRemove','%1DockRegionOnly','_pattern','StrictCollision','_characterName','Game_Vehicle_isMapPassable','updatePattern','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_target','height','VehicleDock','needsUpdate','isMoveOnlyRegionPassable','spawnPreserved','_scene','_eventErased','processMoveSynchAway','_randomMoveWeight','Game_Map_update','_forceShowPlayer','lastSpawnedEventID','initMembers','Spriteset_Map_createShadow','141205mJYJgq','isSpriteVS8dir','Step1MapId','IconSize','push','areFollowersForceShown','hasCPCs','clearCarrying','HURT','event','SpawnEventDespawnAtXY','updateVS8BalloonOffsets','isWorking','LIGHT','clear','_followerChaseOff','windowPadding','create','advancedValue','charAt','isValid','_regionRules','Game_Map_setupEvents','SelfSwitches','characterIndexVS8','setControlledFollowerID','deletePreservedMorphEventDataKey','setTileBitmap','Game_Event_isCollidedWithPlayerCharacters','clearPageSettings','getEventIconData','isCollidedWithPlayerCharacters','_stepPattern','clamp','_hidden','spriteId','width','moveDiagonally','direction','deleteSavedEventLocationKey','EventId','Step1EventId','VS8','characterName','deleteIconsOnEventsDataKey','initEventsMoveCoreEffects','opacity','onExpire','PostCopyJS','_eventCache','moveRouteIndex','setMovementSuccess','offsetX','Window_EventItem_onOk','start','firstSpawnedEventID','despawnEventId','switch1Id','Game_System_initialize','Player','createShadows','setStopFollowerChasing','screenX','RegionOkTarget','moveAwayFromCharacter','filter','string','isAllowEventAutoMovement','executeMoveDir8','isAutoBufferIcon','_comments','description','NORMAL','canPass','floor','firstSpawnedEvent','Game_Map_setup','_visiblePlayerY','canPassDiagonally','MapVariables','Game_Variables_value','return\x20%1','isShadowVisible','initEventsMoveCoreSettings','_spawnedEvents','Map\x20%1\x20Variable\x20%2','opacitySpeed','trim','executeCommand','switch2Id','MoveAllSynchTargets','Game_Followers_isVisible','_advancedSwitchVariable','PreSpawnJS','VisuMZ_Setup_Preload_Map','pageIndex','PreloadedMaps','DashEnableToggle','VehicleForbid','createIconSprite','updatePosition','_filename','events','_eventId','EventTimerExpireClear','pos','constructor','areFollowersForceHidden','Game_Message_setNumberInput','Game_Event_updateSelfMovement','vertical\x20mirror','KNEEL','Window_ScrollText_startMessage','requestRefresh','match','labelWindowRange','clearDestination','DefaultShadow','realMoveSpeed','zoomScale','processMoveRouteStepFrom','concat','createLabelWindows','shadowX','_EventsMoveCoreSettings','trigger','processMoveRouteSetIndex','updatePeriodicRefresh','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','FavorHorz','AdvancedVariables','Chase','AutoBalloon','refresh','RIGHT\x20TO\x20LEFT','_patternLocked','parallelCommonEvents','processMoveRouteJumpForward','value','hasDragonbones','isShip','convertVariableValuesInScriptCall','clearEventCache','isSelfVariable','page','_moveRoute','746008mOHpvO','command357','EventAllow','updatePatternEventsMoveCore','unlock','Game_Character_forceMoveRoute','setNumberInput','isEventRunning','EventLocationSave','makeDeepCopy','processMoveSynchCustom','FollowerSetTargetChase','absDistance','Game_CharacterBase_hasStepAnime','CPC','Window_Message_startMessage','UPPER\x20LEFT','processOk','_visibleEventY','meetsConditions','characterIndex','reserveCommonEvent','%1%2','bitmap','refreshIfNeeded','_spawnData','isTriggerIn','referEvent','startMessage','LOWER\x20RIGHT','resizeWindow','_eventMorphData','_paused','_speed','mirror\x20vert','_duration','Game_Character_processMoveCommand','character','replace','checkEventTriggerAuto','_cacheSystemVisible','SelfVariableID','CarryPose','setSelfValue','9kWNwFd','isLabelVisible','left','Map\x20%1\x20Switch\x20%2','_PreservedEventMorphData','VisibleRange','isEventTest','_shadowGraphic','contents','VisuMZ_2_DragonbonesUnion','setDiagonalDirection','checkCollisionKeywords','PlayerIconDelete','AllAllow','createBitmap','processMoveRouteMoveTo','isTransparent','chaseCharacter','_inputTime','checkEventTriggerThere','CallEvent','moveSynchType','Passability','offsetY','despawnRegions','EventsMoveCore','Game_CharacterBase_isTransparent','Name','Region','clearSpriteOffsets','setMapValue','isAdvancedSwitch','processMoveRouteFadeOut','_PlayerDiagonalSetting','_eventScreenY','RegionOk','MULTIPLY','requestAnimation','isBigCharacter','Map%1.json','ANGER','processMoveSynchMirrorVert','isVisible','code','meetActivationProximityConditions','_selfTargetNumberInput','TerrainTags','SwitchId','VehicleAllow','getPosingCharacterIndex','Sprite_Character_update','processMoveRouteStepTo','TargetVariableId','setupSpawnedEvents','_chaseOff','_tilemap','Self\x20Variable\x20%1','setFrames','EventLocationCreate','isPassableByAnyDirection','createLowerLayer','anchor','getDirectionFromPoint','reverse\x20mimic','428580jWGjXK','deltaX','determineCommonEventsWithCPC','Game_Timer_onExpire','_selfTargetItemChoice','despawnAtXY','_event','blt','hideShadows','region','isCollidedWithEvents','setMoveSpeed','MessageCore','isPlayerForceHidden','_cpc','Game_CharacterBase_pattern','OperateValues','processMoveCommandEventsMoveCore','_frames','turn180','isDashDisabled','deltaY','removeChild','LOWER\x20LEFT','followers','processMoveRouteJumpToCharacter','setupSpawnTest','Sprite_Balloon_updatePosition','Sprite_Character_initMembers','parameters','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_mapId','isDashingAndMoving','MapSwitches','PosX','isAnyEventStarting','COLLAPSE','format','Airship','jump','custom','Game_Map_parallelCommonEvents','Game_Map_unlockEvent','_forceDashing','autoEventIconBuffer','_lastPluginCommandInterpreter','MorphEventTo','approach','map','VisuMZ_0_CoreEngine','Map%1-Event%2','isPlaytest','_lastMovedDirection','Game_Timer_start','_text','USER-DEFINED\x202','Game_SelfSwitches_setValue','Game_CharacterBase_direction','Game_Event_meetsConditions','getSelfTarget','randomInt','Game_CharacterBase_realMoveSpeed','horz\x20mirror','updateEventIconSprite','backX','isJumping','some','_moveSpeed','processMoveRouteMoveUntilStop','_SavedEventLocations','moveBackToRandomHome','getPosingCharacterPattern','_diagonalSupport','USER-DEFINED\x204','TerrainTag','_eventCopyData','isMapPassable','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','startCallEvent','pattern','player','boxWidth','updatePose','ConvertParams','_needsRefresh','switch2Valid','EventLocationDelete','processMoveRouteMoveRepeat','PreMorphJS','_eventIcon','Spriteset_Map_createLowerLayer','boat','QUESTION','Game_Event_initialize','getControlledFollowerID','Game_Vehicle_initMoveSpeed','exit','LIGHT\x20BULB','TiltVert','frameCount','getPosingCharacterDirection','clearStepPattern','isRegionDockable','setEventIconData','meetsSwitchCondition','PreCopyJS','setupSaveEventLocations','Button','Label','processDrawIcon','determineEventOverload','SLEEP','_vehicleType','_callEventMap','SpawnEventDespawnEverything','PostMorphJS','round','isMoving','Game_CharacterBase_update','processMoveRouteBalloon','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','radius','_MapSpawnedEventData','prototype','LIGHTBULB','characterPatternYVS8','ARRAYJSON','_addedHitbox','iconWidth','Game_Event_start','moveAwayFromPoint','moveTypeRandom','UNTITLED','padZero','tileHeight','findDirectionTo','_eventOverloadThreshold','isTurnInPlace','checkEventTriggerHere','parse','initMoveSpeed','lastMovedDirection','setupEventsMoveCoreNotetags','forceDashing','EventTimerExpireEvent','isPosing','setPlayerDiagonalSetting','down','setupCopyEvent','ITEM','_waitMode','Game_Event_checkEventTriggerAuto','setLastPluginCommandInterpreter','Window_NumberInput_start','moveStraight','isActive','Game_CharacterBase_screenY','updateText','_selfEvent','getDirectionToPoint','process_VisuMZ_EventsMoveCore_Switches_Variables','TemplateName','createSaveEventLocationData','setPattern','updateEventsMoveCoreTagChanges','dashSpeedModifier','name','isBattleTest','setupEventsMoveCoreEffects','_saveEventLocations','onCancel','BalloonOffsetY','switchId','onDatabaseLoaded','characterPatternY','Settings','_CPCs','activationProximityType','MapId','Game_Variables_setValue','shadowY','PageId','%1Allow','turnTowardCharacter','EventTimerPause','isDestinationValid','splice','LEFT\x20TO\x20RIGHT','fontFace','IconSet','eraseEvent','_activationProximityAutoTriggerBypass','addChild','OFF','createLabelWindowForTarget','isAllowCharacterTilt','findDiagonalDirectionTo','createSpawnedEvent','isDiagonalDirection','571584sBLQaV','IconIndex','_callEventData','FUNC','length','screenY','Game_Player_checkEventTriggerHere','_eventLabelOffsetY','Movement','vert\x20mirror','createShadow','isOnLadder','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','mapValue','_dragonbones','column','toUpperCase','restoreSavedEventPosition','SPIN\x20COUNTERCLOCKWISE','mirror\x20horz','updateSelfMovement','Hidden','WalkForbid','Preserve','Scene_Map_startEncounterEffect','clearSelfTarget','outlineColor','setupEventsMoveCoreCommentTags','checkActivationProximity','CommonEventID','Game_Vehicle_isLandOk','Game_Player_isMapPassable','_forceHidePlayer','isDashingEnabled','checkValidEventerMap','turnTowardPoint','SPIN\x20CLOCKWISE','includes','setEventIconDataKey','turnAwayFromCharacter','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','processMoveSynchMirrorHorz','Operation','canMove','registerCommand','contentsOpacity','isSmartEventCollisionOn','_saveEventLocation','MUSIC\x20NOTE','Game_Player_getInputDirection','deleteIconsOnEventsData','isTile','CustomPageConditions','setDirection','Game_Map_refresh','PosY','setCharacterBitmap','SWEAT','isAirship','getMapSpawnedEventData','lineHeight','setWaitMode','BoatSpeed','spawnEventId','2MGUIzz','SwitchGetSelfSwitchABCD','OffsetY','_shadowSprite','_moveRouteIndex','Game_Interpreter_executeCommand','startMapCommonEventOnOK','setupFollowerVisibilityOverrides','_forceHideFollower','setValue','Game_Event_locate','Game_Interpreter_PluginCommand','shadowFilename','Game_Enemy_meetsSwitchCondition','AutoBuffer','VariableId','morphInto','moveTowardPoint','BufferY','processMoveRoutePatternLock','default','smooth','reverse','setFrame','isSpawnedEvent','initEventsMoveCore','iconSize','visible','return\x200','_working','setupMorphEvent','Game_Event_moveTypeRandom','isSelfSwitch','_randomHomeY','Frames','isOnRope','mirror\x20vertical','TRUE','indexOf','metCPC','_eventOverload','processMoveSynch','delay','FontSize','isInVehicle','BULB','Scene_Load_onLoadSuccess','lastSpawnedEvent','moveByInput','Direction','Game_SelfSwitches_value','PlayerAllow','increaseSteps','setDestination','_visibleEventX','checkExistingEntitiesAt','OffsetX','frontX','Game_Character_setMoveRoute','dir8','checkEventsMoveCoreStringTags','DiagonalSpeedMultiplier','isTargetEventValidForLabelWindow','note','turnRight90','EventTimerFramesSet','erase','_labelWindow','Game_Temp_setDestination','clearPose','status','getPose','Game_Troop_meetsConditions','_poseDuration','EnableDir8','onClickTrigger','isAirshipPassable','updateOpacity','isMapVariable','%1:%2','adjustDir8MovementSpeed','command108','ARRAYEVAL','_EventIcons','_eventSpawnData','PlayerMovementChange','enable','getInputDirection','_periodicRefreshTimer','RandomMoveWeight','JSON','isPressed','processMoveSynchReverseMimic','Game_Map_event','hasAdvancedSwitchVariable','_reflection','setupRegionRestrictions','parent','bufferY','SpawnEventDespawnTerrainTags','stop','turnAwayFromPoint','none','variables','gainFrames','$preloadedMap_%1','despawnTerrainTags','MoveRouteIndex','isPlayerForceShown','selfValue','ROUTE_SCRIPT','terrainTag','USER-DEFINED\x201','processMoveRouteHugWall','_clickTrigger','isMovementSucceeded','timerText','ADDITIVE','processMoveRouteTeleportTo'];_0x283b=function(){return _0x1c8f32;};return _0x283b();}VisuMZ[label][_0x452dd7(0x34e)]=VisuMZ[label][_0x452dd7(0x34e)]||{},VisuMZ['ConvertParams']=function(_0x8a8593,_0x5226e4){const _0x4b98a4=_0x452dd7;for(const _0x2a3c56 in _0x5226e4){if(_0x2a3c56[_0x4b98a4(0x213)](/(.*):(.*)/i)){const _0x35aa31=String(RegExp['$1']),_0x4f573e=String(RegExp['$2'])[_0x4b98a4(0x376)]()['trim']();let _0x12f246,_0x4502d0,_0x4d99eb;switch(_0x4f573e){case'NUM':_0x12f246=_0x5226e4[_0x2a3c56]!==''?Number(_0x5226e4[_0x2a3c56]):0x0;break;case'ARRAYNUM':_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x2da7a1=>Number(_0x2da7a1));break;case _0x4b98a4(0x47d):_0x12f246=_0x5226e4[_0x2a3c56]!==''?eval(_0x5226e4[_0x2a3c56]):null;break;case _0x4b98a4(0x3f8):_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON['parse'](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x5e2927=>eval(_0x5e2927));break;case _0x4b98a4(0x400):_0x12f246=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):'';break;case _0x4b98a4(0x31d):_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x18ee2d=>JSON[_0x4b98a4(0x32a)](_0x18ee2d));break;case _0x4b98a4(0x369):_0x12f246=_0x5226e4[_0x2a3c56]!==''?new Function(JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56])):new Function(_0x4b98a4(0x3c2));break;case'ARRAYFUNC':_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x3110aa=>new Function(JSON[_0x4b98a4(0x32a)](_0x3110aa)));break;case'STR':_0x12f246=_0x5226e4[_0x2a3c56]!==''?String(_0x5226e4[_0x2a3c56]):'';break;case'ARRAYSTR':_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x208860=>String(_0x208860));break;case'STRUCT':_0x4d99eb=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):{},_0x8a8593[_0x35aa31]={},VisuMZ[_0x4b98a4(0x2f2)](_0x8a8593[_0x35aa31],_0x4d99eb);continue;case'ARRAYSTRUCT':_0x4502d0=_0x5226e4[_0x2a3c56]!==''?JSON[_0x4b98a4(0x32a)](_0x5226e4[_0x2a3c56]):[],_0x12f246=_0x4502d0[_0x4b98a4(0x2cf)](_0x4b483a=>VisuMZ[_0x4b98a4(0x2f2)]({},JSON['parse'](_0x4b483a)));break;default:continue;}_0x8a8593[_0x35aa31]=_0x12f246;}}return _0x8a8593;},(_0x2ba875=>{const _0x23892c=_0x452dd7,_0x29c602=_0x2ba875[_0x23892c(0x345)];for(const _0x2c3ba7 of dependencies){if(!Imported[_0x2c3ba7]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x23892c(0x2c4)](_0x29c602,_0x2c3ba7)),SceneManager['exit']();break;}}const _0x457c5f=_0x2ba875[_0x23892c(0x1e8)];if(_0x457c5f[_0x23892c(0x213)](/\[Version[ ](.*?)\]/i)){const _0x3c1630=Number(RegExp['$1']);_0x3c1630!==VisuMZ[label]['version']&&(alert(_0x23892c(0x2bd)[_0x23892c(0x2c4)](_0x29c602,_0x3c1630)),SceneManager[_0x23892c(0x2ff)]());}if(_0x457c5f['match'](/\[Tier[ ](\d+)\]/i)){const _0x115380=Number(RegExp['$1']);_0x115380<tier?(alert(_0x23892c(0x4ed)[_0x23892c(0x2c4)](_0x29c602,_0x115380,tier)),SceneManager[_0x23892c(0x2ff)]()):tier=Math[_0x23892c(0x4dd)](_0x115380,tier);}VisuMZ[_0x23892c(0x2f2)](VisuMZ[label][_0x23892c(0x34e)],_0x2ba875[_0x23892c(0x2bc)]);})(pluginData),VisuMZ[_0x452dd7(0x2af)]=function(_0x4e567c,_0x4015c4,_0x2beba9){switch(_0x2beba9){case'=':return _0x4015c4;break;case'+':return _0x4e567c+_0x4015c4;break;case'-':return _0x4e567c-_0x4015c4;break;case'*':return _0x4e567c*_0x4015c4;break;case'/':return _0x4e567c/_0x4015c4;break;case'%':return _0x4e567c%_0x4015c4;break;}return _0x4e567c;},PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],'AutoMoveEvents',_0x15e087=>{const _0x2c7be4=_0x452dd7;VisuMZ[_0x2c7be4(0x2f2)](_0x15e087,_0x15e087);switch(_0x15e087[_0x2c7be4(0x429)]){case _0x2c7be4(0x16b):$gameSystem[_0x2c7be4(0x173)](!![]);break;case'Stop':$gameSystem[_0x2c7be4(0x173)](![]);break;case _0x2c7be4(0x444):$gameSystem[_0x2c7be4(0x173)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'CallEvent',_0x582503=>{const _0x169488=_0x452dd7;VisuMZ[_0x169488(0x2f2)](_0x582503,_0x582503);const _0x3b7c89=$gameTemp[_0x169488(0x43d)](),_0xe1a8b8={'mapId':_0x582503['MapId'],'eventId':_0x582503[_0x169488(0x1c9)]||_0x3b7c89[_0x169488(0x53b)](),'pageId':_0x582503[_0x169488(0x354)]};if(_0xe1a8b8[_0x169488(0x507)]<=0x0)_0xe1a8b8[_0x169488(0x507)]=$gameMap?$gameMap[_0x169488(0x507)]():0x1;$gameTemp[_0x169488(0x43d)]()['pluginCommandCallEvent'](_0xe1a8b8);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x202),_0xb864c4=>{const _0x25815a=_0x452dd7;VisuMZ['ConvertParams'](_0xb864c4,_0xb864c4);switch(_0xb864c4[_0x25815a(0x429)]){case _0x25815a(0x4b8):$gameSystem[_0x25815a(0x45e)](!![]);break;case _0x25815a(0x16d):$gameSystem[_0x25815a(0x45e)](![]);break;case _0x25815a(0x444):$gameSystem['setDashingEnabled'](!$gameSystem[_0x25815a(0x387)]());break;}}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'EventIconChange',_0x32dd35=>{const _0x4b2735=_0x452dd7;VisuMZ[_0x4b2735(0x2f2)](_0x32dd35,_0x32dd35);const _0xfbc8f2=$gameTemp[_0x4b2735(0x43d)]();_0x32dd35[_0x4b2735(0x351)]=_0x32dd35[_0x4b2735(0x351)]||$gameMap['mapId'](),$gameSystem['setEventIconDataKey'](_0x32dd35[_0x4b2735(0x351)],_0x32dd35[_0x4b2735(0x1c9)]||_0xfbc8f2['eventId'](),_0x32dd35[_0x4b2735(0x367)],_0x32dd35[_0x4b2735(0x481)],_0x32dd35['IconBufferY'],_0x32dd35[_0x4b2735(0x17e)]);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x499),_0x4abcb4=>{const _0x4e3c88=_0x452dd7;VisuMZ[_0x4e3c88(0x2f2)](_0x4abcb4,_0x4abcb4);const _0x507984=$gameTemp['getLastPluginCommandInterpreter']();_0x4abcb4[_0x4e3c88(0x351)]=_0x4abcb4['MapId']||$gameMap[_0x4e3c88(0x507)](),$gameSystem[_0x4e3c88(0x1cd)](_0x4abcb4[_0x4e3c88(0x351)],_0x4abcb4[_0x4e3c88(0x1c9)]||_0x507984[_0x4e3c88(0x53b)]());}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x52b),_0x18ab88=>{if($gameMap)for(const _0x1af930 of $gameMap['events']()){_0x1af930['refresh']();}}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],'EventLabelVisible',_0x328807=>{const _0x5a10d1=_0x452dd7;VisuMZ[_0x5a10d1(0x2f2)](_0x328807,_0x328807);switch(_0x328807[_0x5a10d1(0x175)]){case _0x5a10d1(0x167):$gameSystem[_0x5a10d1(0x424)](!![]);break;case _0x5a10d1(0x37b):$gameSystem['setEventLabelsVisible'](![]);break;case _0x5a10d1(0x444):$gameSystem[_0x5a10d1(0x424)](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x23b),_0x431049=>{const _0x273e07=_0x452dd7;VisuMZ[_0x273e07(0x2f2)](_0x431049,_0x431049);const _0x5dd42a=$gameTemp[_0x273e07(0x43d)]();if(!$gameMap)return;const _0x470c8b=$gameMap['event'](_0x431049[_0x273e07(0x1c9)]||_0x5dd42a[_0x273e07(0x53b)]());if(_0x470c8b)_0x470c8b['saveEventLocation']();}),PluginManager[_0x452dd7(0x392)](pluginData['name'],_0x452dd7(0x299),_0x55b0fa=>{const _0x477844=_0x452dd7;VisuMZ[_0x477844(0x2f2)](_0x55b0fa,_0x55b0fa);const _0x3a8dd9=$gameTemp[_0x477844(0x43d)](),_0x318b9e=_0x55b0fa[_0x477844(0x351)]||$gameMap[_0x477844(0x507)](),_0x20c824=_0x55b0fa[_0x477844(0x1c9)]||_0x3a8dd9[_0x477844(0x53b)](),_0x35fc2c=_0x55b0fa[_0x477844(0x2c1)]||0x0,_0x1f56c9=_0x55b0fa[_0x477844(0x39d)]||0x0,_0x5d5b0e=_0x55b0fa[_0x477844(0x3d7)]||0x2,_0x45015d=((_0x55b0fa[_0x477844(0x354)]||0x1)-0x1)['clamp'](0x0,0x13),_0x53699b=_0x55b0fa[_0x477844(0x411)]||0x0;$gameSystem[_0x477844(0x341)](_0x318b9e,_0x20c824,_0x35fc2c,_0x1f56c9,_0x5d5b0e,_0x45015d,_0x53699b);}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x2f5),_0x4cdf6e=>{const _0x1c9b21=_0x452dd7;VisuMZ[_0x1c9b21(0x2f2)](_0x4cdf6e,_0x4cdf6e);const _0x4d9cd9=$gameTemp[_0x1c9b21(0x43d)](),_0x4da8ae=_0x4cdf6e['MapId']||$gameMap[_0x1c9b21(0x507)](),_0x58f625=_0x4cdf6e['EventId']||_0x4d9cd9[_0x1c9b21(0x53b)]();$gameSystem[_0x1c9b21(0x1c8)](_0x4da8ae,_0x58f625);}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x32f),_0x3175fa=>{const _0x52c5d2=_0x452dd7;VisuMZ[_0x52c5d2(0x2f2)](_0x3175fa,_0x3175fa);const _0x3fedaf=_0x3175fa[_0x52c5d2(0x383)];$gameTimer[_0x52c5d2(0x4d2)](_0x3fedaf);}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x209),_0x4191be=>{const _0x8b2a0e=_0x452dd7;$gameTimer[_0x8b2a0e(0x4d2)](0x0);}),PluginManager[_0x452dd7(0x392)](pluginData['name'],'EventTimerFramesGain',_0x2f84d7=>{const _0x252d17=_0x452dd7;if(!$gameTimer[_0x252d17(0x1ad)]())return;VisuMZ[_0x252d17(0x2f2)](_0x2f84d7,_0x2f84d7);let _0x50a150=0x0;_0x50a150+=_0x2f84d7['Frames'],_0x50a150+=_0x2f84d7['Seconds']*0x3c,_0x50a150+=_0x2f84d7['Minutes']*0x3c*0x3c,_0x50a150+=_0x2f84d7['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x252d17(0x40e)](_0x50a150);}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x3e7),_0x21671f=>{const _0xaabd59=_0x452dd7;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x21671f,_0x21671f);let _0x4a0fd6=0x0;_0x4a0fd6+=_0x21671f[_0xaabd59(0x3c8)],_0x4a0fd6+=_0x21671f[_0xaabd59(0x42f)]*0x3c,_0x4a0fd6+=_0x21671f[_0xaabd59(0x4c8)]*0x3c*0x3c,_0x4a0fd6+=_0x21671f[_0xaabd59(0x446)]*0x3c*0x3c*0x3c,$gameTimer[_0xaabd59(0x298)](_0x4a0fd6);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x357),_0x52ae35=>{const _0x453e6b=_0x452dd7;if(!$gameTimer[_0x453e6b(0x1ad)]())return;$gameTimer[_0x453e6b(0x16c)]();}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'EventTimerResume',_0x4b776c=>{const _0x5ab541=_0x452dd7;if(!$gameTimer['isWorking']())return;$gameTimer[_0x5ab541(0x4f6)]();}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x4a7),_0x43ee98=>{const _0x547623=_0x452dd7;VisuMZ[_0x547623(0x2f2)](_0x43ee98,_0x43ee98);const _0x28474d=_0x43ee98['Speed']||0x0;$gameTimer[_0x547623(0x4ae)](_0x28474d);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],'FollowerSetGlobalChase',_0x3e7d8f=>{const _0x2b5d72=_0x452dd7;VisuMZ['ConvertParams'](_0x3e7d8f,_0x3e7d8f);const _0x351bbf=!_0x3e7d8f[_0x2b5d72(0x224)];$gameSystem[_0x2b5d72(0x1de)](_0x351bbf);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x23e),_0x24c9c9=>{const _0x425053=_0x452dd7;VisuMZ[_0x425053(0x2f2)](_0x24c9c9,_0x24c9c9);const _0x29cfe8=(_0x24c9c9[_0x425053(0x4be)]||0x0)-0x1,_0x5e4f24=!_0x24c9c9[_0x425053(0x224)],_0x2a4aa8=$gamePlayer[_0x425053(0x2b7)]()[_0x425053(0x447)](_0x29cfe8);if(_0x2a4aa8)_0x2a4aa8['setChaseOff'](_0x5e4f24);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'FollowerSetControl',_0xbeed08=>{const _0xed11b2=_0x452dd7;VisuMZ[_0xed11b2(0x2f2)](_0xbeed08,_0xbeed08);const _0x44c5f4=_0xbeed08[_0xed11b2(0x4be)];$gameSystem[_0xed11b2(0x1ba)](_0x44c5f4);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'FollowerReset',_0x372220=>{const _0x3633f4=_0x452dd7;VisuMZ[_0x3633f4(0x2f2)](_0x372220,_0x372220),$gameSystem[_0x3633f4(0x1ba)](0x0),$gameSystem[_0x3633f4(0x1de)](![]);for(const _0x175a3e of $gamePlayer[_0x3633f4(0x2b7)]()[_0x3633f4(0x16e)]){if(_0x175a3e)_0x175a3e['setChaseOff'](![]);}}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x3a7),_0x36e9b5=>{const _0x3434c4=_0x452dd7;VisuMZ[_0x3434c4(0x2f2)](_0x36e9b5,_0x36e9b5);const _0x6668b1=$gameTemp['getLastPluginCommandInterpreter']();_0x36e9b5[_0x3434c4(0x351)]=_0x36e9b5[_0x3434c4(0x351)]||$gameMap[_0x3434c4(0x507)]();const _0x44e8da=[_0x36e9b5[_0x3434c4(0x351)],_0x36e9b5[_0x3434c4(0x1c9)]||_0x6668b1[_0x3434c4(0x53b)](),_0x36e9b5['Letter']],_0x11c1e7=_0x36e9b5[_0x3434c4(0x51b)],_0x15b151=$gameSelfSwitches[_0x3434c4(0x22b)](_0x44e8da)||![];$gameSwitches[_0x3434c4(0x3af)](_0x11c1e7,_0x15b151);}),PluginManager[_0x452dd7(0x392)](pluginData['name'],'SwitchGetSelfSwitchID',_0x95ae4a=>{const _0x243cfe=_0x452dd7;VisuMZ[_0x243cfe(0x2f2)](_0x95ae4a,_0x95ae4a);const _0x34b30d=$gameTemp[_0x243cfe(0x43d)]();_0x95ae4a['MapId']=_0x95ae4a['MapId']||$gameMap['mapId']();const _0x420553=[_0x95ae4a[_0x243cfe(0x351)],_0x95ae4a[_0x243cfe(0x1c9)]||_0x34b30d[_0x243cfe(0x53b)](),_0x243cfe(0x52e)[_0x243cfe(0x2c4)](_0x95ae4a[_0x243cfe(0x28e)])],_0xfaf193=_0x95ae4a[_0x243cfe(0x51b)],_0x125669=$gameSelfSwitches[_0x243cfe(0x22b)](_0x420553)||![];$gameSwitches[_0x243cfe(0x3af)](_0xfaf193,_0x125669);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'VariableGetSelfVariableID',_0x2823d4=>{const _0x1e6f58=_0x452dd7;VisuMZ[_0x1e6f58(0x2f2)](_0x2823d4,_0x2823d4);const _0x4d58c1=$gameTemp[_0x1e6f58(0x43d)]();_0x2823d4[_0x1e6f58(0x351)]=_0x2823d4[_0x1e6f58(0x351)]||$gameMap[_0x1e6f58(0x507)]();const _0x4beea4=[_0x2823d4[_0x1e6f58(0x351)],_0x2823d4[_0x1e6f58(0x1c9)]||_0x4d58c1[_0x1e6f58(0x53b)](),_0x1e6f58(0x297)[_0x1e6f58(0x2c4)](_0x2823d4[_0x1e6f58(0x3b5)])],_0x152579=_0x2823d4[_0x1e6f58(0x293)],_0x22be63=$gameSelfSwitches[_0x1e6f58(0x22b)](_0x4beea4)||![];$gameVariables[_0x1e6f58(0x3af)](_0x152579,_0x22be63);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x2cd),_0x310f32=>{const _0x23e446=_0x452dd7;VisuMZ['ConvertParams'](_0x310f32,_0x310f32);if(!$gameMap)return;const _0xdb3b7e=$gameTemp[_0x23e446(0x43d)](),_0x4496b7=_0x310f32[_0x23e446(0x4e7)];_0x310f32[_0x23e446(0x1a3)]=_0x310f32[_0x23e446(0x1a3)]||$gameMap['mapId'](),_0x310f32[_0x23e446(0x541)]=_0x310f32['Step2MapId']||$gameMap[_0x23e446(0x507)](),_0x310f32[_0x23e446(0x340)]=_0x310f32['TemplateName'][_0x23e446(0x376)]()['trim']();if(!_0x4496b7&&_0x310f32[_0x23e446(0x1a3)]!==$gameMap[_0x23e446(0x507)]())return;if($gameMap[_0x23e446(0x507)]()===_0x310f32[_0x23e446(0x1a3)]){const _0x4cb334=$gameMap[_0x23e446(0x1aa)](_0x310f32[_0x23e446(0x1ca)]||_0xdb3b7e[_0x23e446(0x53b)]());if(!_0x4cb334)return;_0x310f32['TemplateName']!==_0x23e446(0x323)?_0x4cb334['morphIntoTemplate'](_0x310f32[_0x23e446(0x340)]):_0x4cb334[_0x23e446(0x3b6)](_0x310f32[_0x23e446(0x541)],_0x310f32['Step2EventId']||_0xdb3b7e[_0x23e446(0x53b)]());}_0x4496b7&&$gameSystem['savePreservedMorphEventDataKey'](_0x310f32['Step1MapId'],_0x310f32[_0x23e446(0x1ca)],_0x310f32[_0x23e446(0x340)],_0x310f32[_0x23e446(0x541)],_0x310f32[_0x23e446(0x480)]);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x18a),_0x3eba74=>{const _0x2d5b7e=_0x452dd7;VisuMZ[_0x2d5b7e(0x2f2)](_0x3eba74,_0x3eba74);if(!$gameMap)return;const _0x20837f=$gameTemp[_0x2d5b7e(0x43d)]();_0x3eba74[_0x2d5b7e(0x351)]=_0x3eba74[_0x2d5b7e(0x351)]||$gameMap[_0x2d5b7e(0x507)]();if($gameMap['mapId']()===_0x3eba74[_0x2d5b7e(0x351)]){const _0x56a8fd=$gameMap[_0x2d5b7e(0x1aa)](_0x3eba74[_0x2d5b7e(0x1c9)]||_0x20837f['eventId']());_0x56a8fd[_0x2d5b7e(0x422)]();}_0x3eba74['RemovePreserve']&&$gameSystem[_0x2d5b7e(0x1bb)](_0x3eba74[_0x2d5b7e(0x351)],_0x3eba74[_0x2d5b7e(0x1c9)]||_0x20837f['eventId']());}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x3fb),_0x3cb310=>{const _0x274aa1=_0x452dd7;VisuMZ[_0x274aa1(0x2f2)](_0x3cb310,_0x3cb310),$gameSystem[_0x274aa1(0x43b)](!_0x3cb310[_0x274aa1(0x4b8)]);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x543),_0x5e126c=>{const _0x341e86=_0x452dd7;VisuMZ[_0x341e86(0x2f2)](_0x5e126c,_0x5e126c),$gameSystem[_0x341e86(0x331)](_0x5e126c[_0x341e86(0x44b)]);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'PlayerIconChange',_0x103e19=>{const _0x333c89=_0x452dd7;VisuMZ['ConvertParams'](_0x103e19,_0x103e19),$gameSystem[_0x333c89(0x306)]($gamePlayer,_0x103e19[_0x333c89(0x367)],_0x103e19[_0x333c89(0x481)],_0x103e19[_0x333c89(0x183)],_0x103e19[_0x333c89(0x17e)]);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x26b),_0x35925e=>{const _0xbb2c58=_0x452dd7;VisuMZ[_0xbb2c58(0x2f2)](_0x35925e,_0x35925e),$gameSystem[_0xbb2c58(0x398)]($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x176),_0x3464b1=>{const _0x5caeca=_0x452dd7;VisuMZ['ConvertParams'](_0x3464b1,_0x3464b1);const _0xa9ea7c=$gameTemp['getLastPluginCommandInterpreter']();_0x3464b1[_0x5caeca(0x351)]=_0x3464b1['MapId']||$gameMap['mapId']();const _0x157537=[_0x3464b1[_0x5caeca(0x351)],_0x3464b1[_0x5caeca(0x1c9)]||_0xa9ea7c[_0x5caeca(0x53b)](),_0x3464b1['Letter']];switch(_0x3464b1['Value']){case'ON':$gameSelfSwitches['setValue'](_0x157537,!![]);break;case'OFF':$gameSelfSwitches[_0x5caeca(0x3af)](_0x157537,![]);break;case _0x5caeca(0x444):$gameSelfSwitches['setValue'](_0x157537,!$gameSelfSwitches[_0x5caeca(0x22b)](_0x157537));break;}}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x474),_0x2321d7=>{const _0x1b7ced=_0x452dd7;VisuMZ[_0x1b7ced(0x2f2)](_0x2321d7,_0x2321d7);const _0x5cea8b=$gameTemp[_0x1b7ced(0x43d)]();_0x2321d7[_0x1b7ced(0x351)]=_0x2321d7[_0x1b7ced(0x351)]||$gameMap[_0x1b7ced(0x507)]();const _0x4b8d68=[_0x2321d7[_0x1b7ced(0x351)],_0x2321d7[_0x1b7ced(0x1c9)]||_0x5cea8b[_0x1b7ced(0x53b)](),'Self\x20Switch\x20%1'[_0x1b7ced(0x2c4)](_0x2321d7[_0x1b7ced(0x28e)])];switch(_0x2321d7[_0x1b7ced(0x429)]){case'ON':$gameSelfSwitches[_0x1b7ced(0x3af)](_0x4b8d68,!![]);break;case'OFF':$gameSelfSwitches[_0x1b7ced(0x3af)](_0x4b8d68,![]);break;case _0x1b7ced(0x444):$gameSelfSwitches['setValue'](_0x4b8d68,!$gameSelfSwitches['value'](_0x4b8d68));break;}}),PluginManager[_0x452dd7(0x392)](pluginData['name'],_0x452dd7(0x25c),_0x5b9eb7=>{const _0x5daf8d=_0x452dd7;VisuMZ[_0x5daf8d(0x2f2)](_0x5b9eb7,_0x5b9eb7);const _0x3b68c8=$gameTemp[_0x5daf8d(0x43d)]();_0x5b9eb7[_0x5daf8d(0x351)]=_0x5b9eb7[_0x5daf8d(0x351)]||$gameMap[_0x5daf8d(0x507)]();const _0x68e867=[_0x5b9eb7[_0x5daf8d(0x351)],_0x5b9eb7[_0x5daf8d(0x1c9)]||_0x3b68c8[_0x5daf8d(0x53b)](),'Self\x20Variable\x20%1'[_0x5daf8d(0x2c4)](_0x5b9eb7[_0x5daf8d(0x3b5)])],_0x3d2b86=VisuMZ[_0x5daf8d(0x2af)]($gameSelfSwitches[_0x5daf8d(0x22b)](_0x68e867),_0x5b9eb7[_0x5daf8d(0x429)],_0x5b9eb7[_0x5daf8d(0x390)]);$gameSelfSwitches[_0x5daf8d(0x3af)](_0x68e867,_0x3d2b86);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],'SpawnEventAtXY',_0x370e40=>{const _0x2ce25b=_0x452dd7;VisuMZ['ConvertParams'](_0x370e40,_0x370e40);const _0x2d282f=$gameTemp['getLastPluginCommandInterpreter'](),_0x4604c0={'template':_0x370e40['TemplateName'],'mapId':_0x370e40['MapId']||$gameMap[_0x2ce25b(0x507)](),'eventId':_0x370e40['EventId']||_0x2d282f['eventId'](),'x':_0x370e40[_0x2ce25b(0x2c1)],'y':_0x370e40[_0x2ce25b(0x39d)],'spawnPreserved':_0x370e40[_0x2ce25b(0x37d)],'spawnEventId':$gameMap[_0x2ce25b(0x1f5)][_0x2ce25b(0x36a)]+0x3e8},_0x198d61=_0x370e40[_0x2ce25b(0x51d)]||0x0;if(!VisuMZ['PreloadedMaps'][_0x4604c0[_0x2ce25b(0x507)]]&&_0x4604c0[_0x2ce25b(0x507)]!==$gameMap[_0x2ce25b(0x507)]()){let _0x5d8b03=_0x2ce25b(0x38e)[_0x2ce25b(0x2c4)](_0x4604c0[_0x2ce25b(0x507)]);_0x5d8b03+=_0x2ce25b(0x51c),_0x5d8b03+=_0x2ce25b(0x2ec),_0x5d8b03+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5d8b03+=_0x2ce25b(0x221)[_0x2ce25b(0x2c4)](_0x4604c0[_0x2ce25b(0x507)]),alert(_0x5d8b03);return;}const _0x32472d=$gameMap[_0x2ce25b(0x485)](_0x4604c0,_0x370e40[_0x2ce25b(0x551)],_0x370e40[_0x2ce25b(0x275)]);_0x198d61&&$gameSwitches[_0x2ce25b(0x3af)](_0x198d61,!!_0x32472d);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x43f),_0x5637c6=>{const _0x4c7d07=_0x452dd7;VisuMZ[_0x4c7d07(0x2f2)](_0x5637c6,_0x5637c6);const _0x62fb32=$gameTemp[_0x4c7d07(0x43d)](),_0x86388c={'template':_0x5637c6[_0x4c7d07(0x340)],'mapId':_0x5637c6['MapId']||$gameMap[_0x4c7d07(0x507)](),'eventId':_0x5637c6['EventId']||_0x62fb32[_0x4c7d07(0x53b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x5637c6['Preserve'],'spawnEventId':$gameMap[_0x4c7d07(0x1f5)][_0x4c7d07(0x36a)]+0x3e8},_0x34f782=_0x5637c6[_0x4c7d07(0x51d)]||0x0;if(!VisuMZ[_0x4c7d07(0x201)][_0x86388c['mapId']]&&_0x86388c['mapId']!==$gameMap['mapId']()){let _0x90e8da=_0x4c7d07(0x38e)[_0x4c7d07(0x2c4)](_0x86388c[_0x4c7d07(0x507)]);_0x90e8da+=_0x4c7d07(0x51c),_0x90e8da+=_0x4c7d07(0x2ec),_0x90e8da+=_0x4c7d07(0x191),_0x90e8da+=_0x4c7d07(0x221)['format'](_0x86388c[_0x4c7d07(0x507)]),alert(_0x90e8da);return;}const _0x2611fc=$gameMap['prepareSpawnedEventAtRegion'](_0x86388c,_0x5637c6[_0x4c7d07(0x27b)],_0x5637c6['Collision'],_0x5637c6[_0x4c7d07(0x275)]);_0x34f782&&$gameSwitches[_0x4c7d07(0x3af)](_0x34f782,!!_0x2611fc);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],'SpawnEventAtTerrainTag',_0x34455a=>{const _0x36c4b4=_0x452dd7;VisuMZ[_0x36c4b4(0x2f2)](_0x34455a,_0x34455a);const _0x2b61d0=$gameTemp[_0x36c4b4(0x43d)](),_0x24932f={'template':_0x34455a[_0x36c4b4(0x340)],'mapId':_0x34455a[_0x36c4b4(0x351)]||$gameMap[_0x36c4b4(0x507)](),'eventId':_0x34455a[_0x36c4b4(0x1c9)]||_0x2b61d0['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x34455a['Preserve'],'spawnEventId':$gameMap[_0x36c4b4(0x1f5)][_0x36c4b4(0x36a)]+0x3e8},_0x1e18cd=_0x34455a[_0x36c4b4(0x51d)]||0x0;if(!VisuMZ[_0x36c4b4(0x201)][_0x24932f['mapId']]&&_0x24932f['mapId']!==$gameMap[_0x36c4b4(0x507)]()){let _0x3440ca=_0x36c4b4(0x38e)['format'](_0x24932f[_0x36c4b4(0x507)]);_0x3440ca+=_0x36c4b4(0x51c),_0x3440ca+=_0x36c4b4(0x2ec),_0x3440ca+=_0x36c4b4(0x191),_0x3440ca+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x36c4b4(0x2c4)](_0x24932f['mapId']),alert(_0x3440ca);return;}const _0x1dc627=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x24932f,_0x34455a['TerrainTags'],_0x34455a[_0x36c4b4(0x551)],_0x34455a['Passability']);_0x1e18cd&&$gameSwitches[_0x36c4b4(0x3af)](_0x1e18cd,!!_0x1dc627);}),PluginManager['registerCommand'](pluginData['name'],_0x452dd7(0x505),_0x4949d9=>{const _0xf70463=_0x452dd7;VisuMZ[_0xf70463(0x2f2)](_0x4949d9,_0x4949d9);const _0x5c8baf=$gameTemp[_0xf70463(0x43d)]();$gameMap[_0xf70463(0x1d9)](_0x4949d9[_0xf70463(0x50f)]||_0x5c8baf[_0xf70463(0x53b)]());}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x1ab),_0x49b286=>{const _0xad730c=_0x452dd7;VisuMZ['ConvertParams'](_0x49b286,_0x49b286);const _0x19c4ec=_0x49b286['PosX'],_0xfcc283=_0x49b286[_0xad730c(0x39d)];$gameMap[_0xad730c(0x2a4)](_0x19c4ec,_0xfcc283);}),PluginManager[_0x452dd7(0x392)](pluginData[_0x452dd7(0x345)],_0x452dd7(0x4ec),_0x1c608e=>{const _0x3dff89=_0x452dd7;VisuMZ[_0x3dff89(0x2f2)](_0x1c608e,_0x1c608e),$gameMap[_0x3dff89(0x277)](_0x1c608e[_0x3dff89(0x27b)]);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x409),_0x4c7ee7=>{const _0x2180fa=_0x452dd7;VisuMZ[_0x2180fa(0x2f2)](_0x4c7ee7,_0x4c7ee7),$gameMap[_0x2180fa(0x410)](_0x4c7ee7[_0x2180fa(0x28d)]);}),PluginManager['registerCommand'](pluginData[_0x452dd7(0x345)],_0x452dd7(0x311),_0x583956=>{const _0x837c2=_0x452dd7;VisuMZ[_0x837c2(0x2f2)](_0x583956,_0x583956),$gameMap['despawnEverything']();}),VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x43c)]=Scene_Boot[_0x452dd7(0x31a)]['onDatabaseLoaded'],Scene_Boot[_0x452dd7(0x31a)][_0x452dd7(0x34c)]=function(){const _0x3c6cd3=_0x452dd7;VisuMZ[_0x3c6cd3(0x278)]['Scene_Boot_onDatabaseLoaded'][_0x3c6cd3(0x4df)](this),this[_0x3c6cd3(0x372)](),this[_0x3c6cd3(0x33f)]();if(VisuMZ['EventsMoveCore'][_0x3c6cd3(0x39a)])VisuMZ[_0x3c6cd3(0x278)][_0x3c6cd3(0x39a)][_0x3c6cd3(0x4bb)]();},VisuMZ[_0x452dd7(0x201)]=[],VisuMZ[_0x452dd7(0x53f)]={},Scene_Boot[_0x452dd7(0x31a)][_0x452dd7(0x372)]=function(){const _0x319797=_0x452dd7;if(DataManager[_0x319797(0x346)]()||DataManager[_0x319797(0x265)]())return;const _0x59b854=VisuMZ[_0x319797(0x278)][_0x319797(0x34e)]['Template'],_0x41899d=_0x59b854[_0x319797(0x51e)]['slice'](0x0);for(const _0x3e349e of _0x59b854['List']){_0x3e349e[_0x319797(0x27a)]=_0x3e349e[_0x319797(0x27a)]['toUpperCase']()[_0x319797(0x1f8)](),VisuMZ[_0x319797(0x53f)][_0x3e349e['Name']]=_0x3e349e;if(!_0x41899d[_0x319797(0x38b)](_0x3e349e[_0x319797(0x509)]))_0x41899d[_0x319797(0x1a5)](_0x3e349e[_0x319797(0x509)]);}for(const _0x46c16e of _0x41899d){if(VisuMZ[_0x319797(0x201)][_0x46c16e])continue;const _0x34510c=_0x319797(0x286)[_0x319797(0x2c4)](_0x46c16e[_0x319797(0x324)](0x3)),_0x336f8d=_0x319797(0x40f)[_0x319797(0x2c4)](_0x46c16e);DataManager[_0x319797(0x48e)](_0x336f8d,_0x34510c),setTimeout(this[_0x319797(0x1ff)]['bind'](this,_0x46c16e,_0x336f8d),0x64);}},Scene_Boot[_0x452dd7(0x31a)][_0x452dd7(0x1ff)]=function(_0x4d9886,_0x2236db){const _0x25e504=_0x452dd7;window[_0x2236db]?(VisuMZ['PreloadedMaps'][_0x4d9886]=window[_0x2236db],window[_0x2236db]=undefined):setTimeout(this[_0x25e504(0x1ff)]['bind'](this,_0x4d9886,_0x2236db),0x64);},VisuMZ[_0x452dd7(0x431)]=[],VisuMZ[_0x452dd7(0x1b8)]=[],VisuMZ[_0x452dd7(0x2c0)]=[],VisuMZ[_0x452dd7(0x223)]=[],VisuMZ[_0x452dd7(0x4ad)]=[],VisuMZ[_0x452dd7(0x1f0)]=[],Scene_Boot[_0x452dd7(0x31a)][_0x452dd7(0x33f)]=function(){const _0x11cdb2=_0x452dd7;for(let _0x58de16=0x1;_0x58de16<$dataSystem[_0x11cdb2(0x472)][_0x11cdb2(0x36a)];_0x58de16++){if($dataSystem[_0x11cdb2(0x472)][_0x58de16][_0x11cdb2(0x213)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x11cdb2(0x431)][_0x11cdb2(0x1a5)](_0x58de16);if($dataSystem['switches'][_0x58de16]['match'](/<SELF>/i))VisuMZ[_0x11cdb2(0x1b8)][_0x11cdb2(0x1a5)](_0x58de16);if($dataSystem[_0x11cdb2(0x472)][_0x58de16]['match'](/<MAP>/i))VisuMZ[_0x11cdb2(0x2c0)]['push'](_0x58de16);}for(let _0x5d00c3=0x1;_0x5d00c3<$dataSystem[_0x11cdb2(0x40d)][_0x11cdb2(0x36a)];_0x5d00c3++){if($dataSystem['variables'][_0x5d00c3][_0x11cdb2(0x213)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x11cdb2(0x1a5)](_0x5d00c3);if($dataSystem[_0x11cdb2(0x40d)][_0x5d00c3][_0x11cdb2(0x213)](/<SELF>/i))VisuMZ[_0x11cdb2(0x4ad)][_0x11cdb2(0x1a5)](_0x5d00c3);if($dataSystem['variables'][_0x5d00c3][_0x11cdb2(0x213)](/<MAP>/i))VisuMZ[_0x11cdb2(0x1f0)][_0x11cdb2(0x1a5)](_0x5d00c3);}},VisuMZ[_0x452dd7(0x278)]['CustomPageConditions']={},VisuMZ[_0x452dd7(0x278)]['CustomPageConditions'][_0x452dd7(0x4bb)]=function(){const _0x21969b=_0x452dd7;this[_0x21969b(0x49e)]=new Game_CPCInterpreter(),this[_0x21969b(0x2a1)]();},VisuMZ[_0x452dd7(0x278)]['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x5c1182=_0x452dd7;this['_commonEvents']=[];for(const _0x48fe38 of $dataCommonEvents){if(!_0x48fe38)continue;VisuMZ[_0x5c1182(0x278)][_0x5c1182(0x39a)]['loadCPC'](_0x48fe38);if(_0x48fe38[_0x5c1182(0x241)]['length']>0x0)this[_0x5c1182(0x4cf)][_0x5c1182(0x1a5)](_0x48fe38['id']);}},VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x452dd7(0x3cd)]=function(_0x2778b1,_0x334180){const _0x23159e=_0x452dd7;return this[_0x23159e(0x49e)][_0x23159e(0x44e)](_0x2778b1,_0x334180),this[_0x23159e(0x49e)][_0x23159e(0x4dc)](),this[_0x23159e(0x49e)][_0x23159e(0x2ad)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x39a)]['loadCPC']=function(_0x38d74b){const _0x34c475=_0x452dd7;let _0x2d363d=![];_0x38d74b[_0x34c475(0x241)]=[];for(const _0x42c188 of _0x38d74b['list']){if([0x6c,0x198][_0x34c475(0x38b)](_0x42c188[_0x34c475(0x28a)])){const _0x340a77=_0x42c188[_0x34c475(0x2bc)][0x0];if(_0x340a77[_0x34c475(0x213)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x2d363d=!![];else _0x340a77[_0x34c475(0x213)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x2d363d=![]);}_0x2d363d&&_0x38d74b[_0x34c475(0x241)]['push'](_0x42c188);}},getSelfSwitchValue=function(_0xc0b4fd,_0x3e7384,_0x356716){const _0x10d09=_0x452dd7;let _0x44bdcf=[_0xc0b4fd,_0x3e7384,_0x10d09(0x52e)[_0x10d09(0x2c4)](_0x356716)];return typeof _0x356716===_0x10d09(0x1e3)&&(_0x44bdcf=[_0xc0b4fd,_0x3e7384,_0x356716[_0x10d09(0x376)]()[_0x10d09(0x1f8)]()]),$gameSelfSwitches[_0x10d09(0x22b)](_0x44bdcf);},getMapSwitchValue=function(_0x381df9,_0xc34216){const _0x30827c=_0x452dd7;let _0x336b77=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x30827c(0x2c4)](_0x381df9,_0xc34216)];return $gameSelfSwitches[_0x30827c(0x22b)](_0x336b77);},getMapVariableValue=function(_0x2df258,_0x3c2bb2){const _0x3677be=_0x452dd7;let _0x40ebf7=[0x0,0x0,_0x3677be(0x1f6)[_0x3677be(0x2c4)](_0x2df258,_0x3c2bb2)];return $gameSelfSwitches['value'](_0x40ebf7);},getSelfVariableValue=function(_0x3bad4a,_0x3d2096,_0x132bf5){const _0x2e2c30=_0x452dd7,_0x2312e2=[_0x3bad4a,_0x3d2096,_0x2e2c30(0x297)[_0x2e2c30(0x2c4)](_0x132bf5)];return $gameSelfSwitches[_0x2e2c30(0x22b)](_0x2312e2);},setSelfSwitchValue=function(_0x4af8c1,_0x1d2704,_0x1b2e4a,_0x245020){const _0x5d586f=_0x452dd7;let _0x40f38d=[_0x4af8c1,_0x1d2704,_0x5d586f(0x52e)[_0x5d586f(0x2c4)](_0x1b2e4a)];typeof _0x1b2e4a===_0x5d586f(0x1e3)&&(_0x40f38d=[_0x4af8c1,_0x1d2704,_0x1b2e4a[_0x5d586f(0x376)]()[_0x5d586f(0x1f8)]()]),$gameSelfSwitches[_0x5d586f(0x3af)](_0x40f38d,_0x245020);},setSelfVariableValue=function(_0x23ed2c,_0x4cbbaf,_0x4bd3db,_0x56603a){const _0x5367e2=_0x452dd7,_0x87a688=[_0x23ed2c,_0x4cbbaf,_0x5367e2(0x297)[_0x5367e2(0x2c4)](_0x4bd3db)];$gameSelfSwitches[_0x5367e2(0x3af)](_0x87a688,_0x56603a);},setMapSwitchValue=function(_0x293b1e,_0x564781,_0x4e3746){const _0x27acdf=_0x452dd7;let _0x34269b=[0x0,0x0,_0x27acdf(0x262)[_0x27acdf(0x2c4)](_0x293b1e,_0x564781)];$gameSelfSwitches[_0x27acdf(0x3af)](_0x34269b,_0x4e3746);},setMapVariableValue=function(_0xb2b98e,_0xdbab65,_0x1f30ba){const _0x4a441d=_0x452dd7;let _0x35d1ed=[0x0,0x0,_0x4a441d(0x1f6)[_0x4a441d(0x2c4)](_0xb2b98e,_0xdbab65)];$gameSelfSwitches[_0x4a441d(0x3af)](_0x35d1ed,_0x1f30ba);},DataManager[_0x452dd7(0x27e)]=function(_0x5787b8){const _0x9c791=_0x452dd7;if(SceneManager[_0x9c791(0x198)][_0x9c791(0x20b)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x9c791(0x38b)](_0x5787b8);},DataManager['isAdvancedVariable']=function(_0x57efa5){const _0x5b6c22=_0x452dd7;if(SceneManager[_0x5b6c22(0x198)][_0x5b6c22(0x20b)]===Scene_Debug)return![];return VisuMZ[_0x5b6c22(0x223)][_0x5b6c22(0x38b)](_0x57efa5);},DataManager[_0x452dd7(0x3c6)]=function(_0x217fb6){const _0x20eb95=_0x452dd7;if(SceneManager[_0x20eb95(0x198)][_0x20eb95(0x20b)]===Scene_Debug)return![];return VisuMZ[_0x20eb95(0x1b8)]['includes'](_0x217fb6);},DataManager[_0x452dd7(0x230)]=function(_0x459f81){const _0x58f6f2=_0x452dd7;if(SceneManager[_0x58f6f2(0x198)][_0x58f6f2(0x20b)]===Scene_Debug)return![];return VisuMZ['SelfVariables'][_0x58f6f2(0x38b)](_0x459f81);},DataManager['isMapSwitch']=function(_0x52cadc){const _0xd9e940=_0x452dd7;if(BattleManager[_0xd9e940(0x346)]())return![];return VisuMZ[_0xd9e940(0x2c0)][_0xd9e940(0x38b)](_0x52cadc);},DataManager[_0x452dd7(0x3f4)]=function(_0x2379e9){const _0x1be119=_0x452dd7;if(BattleManager[_0x1be119(0x346)]())return![];return VisuMZ['MapVariables'][_0x1be119(0x38b)](_0x2379e9);},VisuMZ['EventsMoveCore'][_0x452dd7(0x3ea)]=Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x3db)],Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x3db)]=function(_0x3b4a40,_0x28f274){const _0x4639d2=_0x452dd7;if(this['isEventClickTriggered'](_0x3b4a40,_0x28f274))return;VisuMZ[_0x4639d2(0x278)]['Game_Temp_setDestination'][_0x4639d2(0x4df)](this,_0x3b4a40,_0x28f274);},Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x53e)]=function(_0x20c721,_0x5c2d90){const _0x5ac73d=_0x452dd7,_0x312be2=$gameMap[_0x5ac73d(0x460)](_0x20c721,_0x5c2d90);for(const _0x5cd53d of _0x312be2){if(_0x5cd53d&&_0x5cd53d['hasClickTrigger']())return _0x5cd53d[_0x5ac73d(0x3f1)](),!![];}return![];},Game_Temp[_0x452dd7(0x31a)]['setLastPluginCommandInterpreter']=function(_0x3535c4){const _0x2c3048=_0x452dd7;this[_0x2c3048(0x2cc)]=_0x3535c4;},Game_Temp[_0x452dd7(0x31a)]['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x4db)]=function(_0xedf5a6){const _0x3f9979=_0x452dd7;this[_0x3f9979(0x428)]=_0xedf5a6;},Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x37f)]=function(){const _0x34f581=_0x452dd7;this[_0x34f581(0x428)]=undefined;},Game_Temp[_0x452dd7(0x31a)][_0x452dd7(0x2da)]=function(){const _0x1e0dee=_0x452dd7;return this[_0x1e0dee(0x428)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1db)]=Game_System[_0x452dd7(0x31a)][_0x452dd7(0x4bb)],Game_System['prototype'][_0x452dd7(0x4bb)]=function(){const _0x17b594=_0x452dd7;VisuMZ['EventsMoveCore'][_0x17b594(0x1db)][_0x17b594(0x4df)](this),this[_0x17b594(0x3bf)](),this[_0x17b594(0x165)]();},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x3bf)]=function(){const _0x537a43=_0x452dd7;this[_0x537a43(0x21d)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x537a43(0x3f9)]={},this[_0x537a43(0x319)]=[],this[_0x537a43(0x263)]={},this[_0x537a43(0x2e4)]={},this[_0x537a43(0x492)]=![],this[_0x537a43(0x280)]=_0x537a43(0x3ba);},Game_System['prototype'][_0x452dd7(0x387)]=function(){const _0x6605fa=_0x452dd7;if(this[_0x6605fa(0x21d)]===undefined)this[_0x6605fa(0x3bf)]();if(this['_EventsMoveCoreSettings'][_0x6605fa(0x4fc)]===undefined)this[_0x6605fa(0x3bf)]();return this[_0x6605fa(0x21d)][_0x6605fa(0x4fc)];},Game_System['prototype'][_0x452dd7(0x45e)]=function(_0x17fe90){const _0x2be207=_0x452dd7;if(this['_EventsMoveCoreSettings']===undefined)this[_0x2be207(0x3bf)]();if(this[_0x2be207(0x21d)][_0x2be207(0x4fc)]===undefined)this[_0x2be207(0x3bf)]();this[_0x2be207(0x21d)][_0x2be207(0x4fc)]=_0x17fe90;},Game_System['prototype'][_0x452dd7(0x1e4)]=function(){const _0x59edce=_0x452dd7;if(this[_0x59edce(0x21d)]===undefined)this[_0x59edce(0x3bf)]();if(this[_0x59edce(0x21d)][_0x59edce(0x43e)]===undefined)this[_0x59edce(0x3bf)]();return this[_0x59edce(0x21d)][_0x59edce(0x43e)];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x173)]=function(_0x380243){const _0x38190c=_0x452dd7;if(this[_0x38190c(0x21d)]===undefined)this[_0x38190c(0x3bf)]();if(this[_0x38190c(0x21d)][_0x38190c(0x43e)]===undefined)this[_0x38190c(0x3bf)]();this[_0x38190c(0x21d)]['EventAutoMovement']=_0x380243;},Game_System['prototype'][_0x452dd7(0x170)]=function(){const _0x50afea=_0x452dd7;if(this[_0x50afea(0x21d)]===undefined)this[_0x50afea(0x3bf)]();if(this[_0x50afea(0x21d)][_0x50afea(0x442)]===undefined)this[_0x50afea(0x3bf)]();return this['_EventsMoveCoreSettings'][_0x50afea(0x442)];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x424)]=function(_0xdc1cfb){const _0x174256=_0x452dd7;if(this[_0x174256(0x21d)]===undefined)this['initEventsMoveCore']();if(this[_0x174256(0x21d)]['VisibleEventLabels']===undefined)this[_0x174256(0x3bf)]();this[_0x174256(0x21d)]['VisibleEventLabels']=_0xdc1cfb;},Game_System[_0x452dd7(0x31a)]['isPlayerControlDisabled']=function(){const _0x1d3666=_0x452dd7;return this[_0x1d3666(0x492)]===undefined&&(this['_DisablePlayerControl']=![]),this[_0x1d3666(0x492)];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x43b)]=function(_0x566f7a){this['_DisablePlayerControl']=_0x566f7a;},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x498)]=function(){const _0x2c773b=_0x452dd7;return this[_0x2c773b(0x280)];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x331)]=function(_0x389c8a){const _0x436ea8=_0x452dd7;this[_0x436ea8(0x280)]=String(_0x389c8a)[_0x436ea8(0x180)]()[_0x436ea8(0x1f8)]();},Game_System[_0x452dd7(0x31a)]['getEventIconData']=function(_0xb1ae77){const _0x1cc557=_0x452dd7;if(this[_0x1cc557(0x3f9)]===undefined)this[_0x1cc557(0x3bf)]();if(!_0xb1ae77)return null;if(_0xb1ae77===$gamePlayer)return this['_EventIcons'][_0x1cc557(0x1dc)];else{const _0x4efe13=VisuMZ[_0x1cc557(0x278)][_0x1cc557(0x34e)],_0x40eb67='Map%1-Event%2'['format'](_0xb1ae77[_0x1cc557(0x2be)],_0xb1ae77['_eventId']);return this['_EventIcons'][_0x40eb67]=this['_EventIcons'][_0x40eb67]||{'iconIndex':0x0,'bufferX':_0x4efe13['Icon']['BufferX'],'bufferY':_0x4efe13['Icon'][_0x1cc557(0x3b8)],'blendMode':_0x4efe13[_0x1cc557(0x45d)][_0x1cc557(0x536)]},this[_0x1cc557(0x3f9)][_0x40eb67];}},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x306)]=function(_0x3abee7,_0x178773,_0x3d5d36,_0xb66e66,_0x583f45){const _0x5a3ad8=_0x452dd7;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0x46d480=_0x3abee7===$gamePlayer?'Player':_0x5a3ad8(0x2d1)[_0x5a3ad8(0x2c4)](_0x3abee7[_0x5a3ad8(0x2be)],_0x3abee7['_eventId']);this[_0x5a3ad8(0x3f9)][_0x46d480]={'iconIndex':_0x178773,'bufferX':_0x3d5d36,'bufferY':_0xb66e66,'blendMode':_0x583f45};},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x38c)]=function(_0x160988,_0x90161e,_0x47bdc6,_0x6c5ec9,_0x30dd65,_0x1b43e0){const _0x49d759=_0x452dd7;if(this['_EventIcons']===undefined)this['initEventsMoveCore']();const _0xd74c30='Map%1-Event%2'[_0x49d759(0x2c4)](_0x160988,_0x90161e);this[_0x49d759(0x3f9)][_0xd74c30]={'iconIndex':_0x47bdc6,'bufferX':_0x6c5ec9,'bufferY':_0x30dd65,'blendMode':_0x1b43e0};},Game_System['prototype'][_0x452dd7(0x398)]=function(_0x1354ba){const _0x4656ee=_0x452dd7;if(this['_EventIcons']===undefined)this[_0x4656ee(0x3bf)]();if(!_0x1354ba)return null;_0x1354ba===$gamePlayer?delete this[_0x4656ee(0x3f9)][_0x4656ee(0x1dc)]:this['deleteIconsOnEventsDataKey'](_0x1354ba[_0x4656ee(0x2be)],_0x1354ba[_0x4656ee(0x208)]);},Game_System[_0x452dd7(0x31a)]['deleteIconsOnEventsDataKey']=function(_0x28d423,_0x2a2d76){const _0x5477a9=_0x452dd7;if(this[_0x5477a9(0x3f9)]===undefined)this[_0x5477a9(0x3bf)]();const _0x1960ff=_0x5477a9(0x2d1)[_0x5477a9(0x2c4)](_0x28d423,_0x2a2d76);delete this[_0x5477a9(0x3f9)][_0x1960ff];},Game_System[_0x452dd7(0x31a)]['getSavedEventLocation']=function(_0x2ac7dc){const _0x3fa309=_0x452dd7;if(this[_0x3fa309(0x2e4)]===undefined)this[_0x3fa309(0x3bf)]();if(!_0x2ac7dc)return null;const _0x24c984=_0x3fa309(0x2d1)['format'](_0x2ac7dc[_0x3fa309(0x2be)],_0x2ac7dc['_eventId']);return this['_SavedEventLocations'][_0x24c984];},Game_System['prototype'][_0x452dd7(0x550)]=function(_0x239cbe){const _0xef1061=_0x452dd7;if(this[_0xef1061(0x2e4)]===undefined)this[_0xef1061(0x3bf)]();if(!_0x239cbe)return;const _0x3e5079='Map%1-Event%2'['format'](_0x239cbe[_0xef1061(0x2be)],_0x239cbe[_0xef1061(0x208)]);this[_0xef1061(0x2e4)][_0x3e5079]={'direction':_0x239cbe[_0xef1061(0x1c7)](),'x':Math[_0xef1061(0x313)](_0x239cbe['x']),'y':Math[_0xef1061(0x313)](_0x239cbe['y']),'pageIndex':_0x239cbe[_0xef1061(0x16a)],'moveRouteIndex':_0x239cbe[_0xef1061(0x3aa)]};},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x427)]=function(_0x2eb9bc){const _0x4e6f20=_0x452dd7;if(this[_0x4e6f20(0x2e4)]===undefined)this[_0x4e6f20(0x3bf)]();if(!_0x2eb9bc)return;this[_0x4e6f20(0x1c8)](_0x2eb9bc[_0x4e6f20(0x2be)],_0x2eb9bc[_0x4e6f20(0x208)]);},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x1c8)]=function(_0xec6843,_0x58cd67){const _0x330b98=_0x452dd7;if(this[_0x330b98(0x2e4)]===undefined)this[_0x330b98(0x3bf)]();const _0x4d0956=_0x330b98(0x2d1)['format'](_0xec6843,_0x58cd67);delete this[_0x330b98(0x2e4)][_0x4d0956];},Game_System['prototype'][_0x452dd7(0x341)]=function(_0x4b9929,_0x2c0bab,_0x111d50,_0x56f1d5,_0x5e9fbe,_0x3f1a49,_0x1f0e41){const _0x50a154=_0x452dd7;if(this[_0x50a154(0x2e4)]===undefined)this[_0x50a154(0x3bf)]();const _0x5065c9=_0x50a154(0x2d1)[_0x50a154(0x2c4)](_0x4b9929,_0x2c0bab);this[_0x50a154(0x2e4)][_0x5065c9]={'direction':_0x5e9fbe,'x':Math[_0x50a154(0x313)](_0x111d50),'y':Math[_0x50a154(0x313)](_0x56f1d5),'pageIndex':_0x3f1a49,'moveRouteIndex':_0x1f0e41};},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x41f)]=function(_0x999697){const _0x42d3ed=_0x452dd7;if(this['_PreservedEventMorphData']===undefined)this[_0x42d3ed(0x3bf)]();if(!_0x999697)return;const _0x121b72=_0x42d3ed(0x2d1)[_0x42d3ed(0x2c4)](_0x999697[_0x42d3ed(0x2be)],_0x999697[_0x42d3ed(0x208)]);return this[_0x42d3ed(0x263)][_0x121b72];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x512)]=function(_0x539500,_0xaa302f,_0x3526f1,_0x20cc9a,_0xdddfd3){const _0x4dcd47=_0x452dd7;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x10ee3f=_0x4dcd47(0x2d1)[_0x4dcd47(0x2c4)](_0x539500,_0xaa302f);this['_PreservedEventMorphData'][_0x10ee3f]={'template':_0x3526f1,'mapId':_0x20cc9a,'eventId':_0xdddfd3};},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x1bb)]=function(_0x143f9e,_0x51020b){const _0x2db0b1=_0x452dd7;if(this[_0x2db0b1(0x263)]===undefined)this['initEventsMoveCore']();const _0x5c3591='Map%1-Event%2'[_0x2db0b1(0x2c4)](_0x143f9e,_0x51020b);delete this[_0x2db0b1(0x263)][_0x5c3591];},Game_System['prototype'][_0x452dd7(0x3a1)]=function(_0x104c83){const _0x5cad55=_0x452dd7;if(this[_0x5cad55(0x319)]===undefined)this['initEventsMoveCore']();return this[_0x5cad55(0x319)][_0x104c83]=this[_0x5cad55(0x319)][_0x104c83]||[],this['_MapSpawnedEventData'][_0x104c83];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x54a)]=function(_0x237dcd){const _0x4994e3=_0x452dd7,_0x3a03a3=this['getMapSpawnedEventData'](_0x237dcd);for(const _0x364b5e of _0x3a03a3){if(!_0x364b5e)continue;if(_0x364b5e[_0x4994e3(0x41e)])continue;const _0x5995ab=_0x3a03a3[_0x4994e3(0x3cc)](_0x364b5e);_0x3a03a3[_0x5995ab]=null;}},Game_System['prototype'][_0x452dd7(0x165)]=function(){const _0x82b203=_0x452dd7;this[_0x82b203(0x493)]=0x0,this[_0x82b203(0x1b0)]=![];},Game_System['prototype'][_0x452dd7(0x2fd)]=function(){const _0x4618b9=_0x452dd7;if(this[_0x4618b9(0x493)]===undefined)this[_0x4618b9(0x165)]();return this[_0x4618b9(0x493)];},Game_System[_0x452dd7(0x31a)]['setControlledFollowerID']=function(_0x33b4d1){const _0x566c9d=_0x452dd7;if(this[_0x566c9d(0x493)]===undefined)this[_0x566c9d(0x165)]();this[_0x566c9d(0x493)]=_0x33b4d1;;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x470)]=Game_Interpreter[_0x452dd7(0x31a)]['character'],Game_Interpreter[_0x452dd7(0x31a)][_0x452dd7(0x258)]=function(_0x4d56c6){const _0x4e2d6b=_0x452dd7;if(!$gameParty[_0x4e2d6b(0x4b5)]()&&_0x4d56c6<0x0){let _0x266187=$gameSystem[_0x4e2d6b(0x2fd)]();if(_0x266187>0x0)return $gamePlayer[_0x4e2d6b(0x2b7)]()['follower'](_0x266187-0x1);}return VisuMZ['EventsMoveCore'][_0x4e2d6b(0x470)]['call'](this,_0x4d56c6);},Game_System['prototype']['isStopFollowerChasing']=function(){const _0x43844c=_0x452dd7;if(this['_followerChaseOff']===undefined)this[_0x43844c(0x165)]();return this[_0x43844c(0x1b0)];},Game_System[_0x452dd7(0x31a)][_0x452dd7(0x1de)]=function(_0x2813bd){const _0x28657f=_0x452dd7;if(this[_0x28657f(0x1b0)]===undefined)this[_0x28657f(0x165)]();this[_0x28657f(0x1b0)]=_0x2813bd;;},VisuMZ[_0x452dd7(0x278)]['Game_Timer_initialize']=Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x4bb)],Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x4bb)]=function(){const _0x1cf4bb=_0x452dd7;VisuMZ[_0x1cf4bb(0x278)]['Game_Timer_initialize'][_0x1cf4bb(0x4df)](this),this[_0x1cf4bb(0x3bf)]();},Game_Timer['prototype']['initEventsMoveCore']=function(){const _0x4abf7d=_0x452dd7;this['_paused']=![],this[_0x4abf7d(0x254)]=-0x1,this[_0x4abf7d(0x448)]=0x0;},Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x510)]=function(_0x420ce7){const _0x4822f3=_0x452dd7;if(!_0x420ce7)return;if(!this[_0x4822f3(0x3c3)])return;if(this[_0x4822f3(0x253)])return;if(this[_0x4822f3(0x2b1)]<=0x0)return;if(this[_0x4822f3(0x254)]===undefined)this[_0x4822f3(0x3bf)]();this['_frames']+=this[_0x4822f3(0x254)],this[_0x4822f3(0x2b1)]<=0x0&&this['onExpire']();},VisuMZ['EventsMoveCore']['Game_Timer_start']=Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x1d7)],Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x1d7)]=function(_0x9ab406){const _0x1d1de3=_0x452dd7;VisuMZ[_0x1d1de3(0x278)][_0x1d1de3(0x2d4)]['call'](this,_0x9ab406);if(this['_paused']===undefined)this[_0x1d1de3(0x3bf)]();this[_0x1d1de3(0x253)]=![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x54e)]=Game_Timer['prototype'][_0x452dd7(0x40a)],Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x40a)]=function(){const _0xb88afd=_0x452dd7;VisuMZ['EventsMoveCore'][_0xb88afd(0x54e)]['call'](this);if(this[_0xb88afd(0x253)]===undefined)this[_0xb88afd(0x3bf)]();this[_0xb88afd(0x253)]=![];},Game_Timer['prototype'][_0x452dd7(0x16c)]=function(){const _0x4bb2a3=_0x452dd7;if(this[_0x4bb2a3(0x2b1)]<=0x0)return;this[_0x4bb2a3(0x253)]=!![],this[_0x4bb2a3(0x3c3)]=!![];},Game_Timer['prototype'][_0x452dd7(0x4f6)]=function(){const _0x1f7013=_0x452dd7;if(this[_0x1f7013(0x2b1)]<=0x0)return;this[_0x1f7013(0x253)]=![],this[_0x1f7013(0x3c3)]=!![];},Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x40e)]=function(_0x1908cc){const _0x484ee3=_0x452dd7;this['_frames']=this[_0x484ee3(0x2b1)]||0x0,this['_frames']+=_0x1908cc,this[_0x484ee3(0x3c3)]=!![],this[_0x484ee3(0x2b1)]=Math[_0x484ee3(0x4dd)](0x1,this['_frames']);},Game_Timer['prototype'][_0x452dd7(0x298)]=function(_0x16928c){const _0x3135d4=_0x452dd7;this[_0x3135d4(0x2b1)]=this['_frames']||0x0,this[_0x3135d4(0x2b1)]=_0x16928c,this[_0x3135d4(0x3c3)]=!![],this[_0x3135d4(0x2b1)]=Math[_0x3135d4(0x4dd)](0x1,this['_frames']);},Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x4ae)]=function(_0xa95774){const _0x18731a=_0x452dd7;this[_0x18731a(0x254)]=_0xa95774,this[_0x18731a(0x3c3)]=!![],_0xa95774>0x0&&(this[_0x18731a(0x2b1)]=Math['max'](this['_frames'],0x1));},Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x4d2)]=function(_0x19e7f4){const _0x599896=_0x452dd7;if(this[_0x599896(0x448)]===undefined)this[_0x599896(0x3bf)]();this[_0x599896(0x448)]=_0x19e7f4;},VisuMZ['EventsMoveCore']['Game_Timer_onExpire']=Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x1d0)],Game_Timer[_0x452dd7(0x31a)][_0x452dd7(0x1d0)]=function(){const _0x30f6be=_0x452dd7;if(this[_0x30f6be(0x448)]===undefined)this[_0x30f6be(0x3bf)]();this[_0x30f6be(0x448)]?$gameTemp[_0x30f6be(0x248)](this[_0x30f6be(0x448)]):VisuMZ[_0x30f6be(0x278)][_0x30f6be(0x2a2)][_0x30f6be(0x4df)](this);},VisuMZ['EventsMoveCore'][_0x452dd7(0x4b1)]=Game_Message['prototype']['add'],Game_Message['prototype']['add']=function(_0x5a3105){const _0x149500=_0x452dd7;VisuMZ[_0x149500(0x278)][_0x149500(0x4b1)][_0x149500(0x4df)](this,_0x5a3105),this['_selfEvent']=$gameTemp[_0x149500(0x2da)]();},Game_Message[_0x452dd7(0x31a)][_0x452dd7(0x537)]=function(){const _0x1d5ba7=_0x452dd7;$gameTemp[_0x1d5ba7(0x4db)](this[_0x1d5ba7(0x33d)]);},VisuMZ['EventsMoveCore'][_0x452dd7(0x4fa)]=Game_Switches[_0x452dd7(0x31a)]['value'],Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x22b)]=function(_0x11fa69){const _0x48405f=_0x452dd7;if(DataManager[_0x48405f(0x27e)](_0x11fa69))return!!this[_0x48405f(0x1b3)](_0x11fa69);else{if(DataManager[_0x48405f(0x3c6)](_0x11fa69))return!!this[_0x48405f(0x413)](_0x11fa69);else return DataManager['isMapSwitch'](_0x11fa69)?!!this[_0x48405f(0x373)](_0x11fa69):VisuMZ[_0x48405f(0x278)][_0x48405f(0x4fa)]['call'](this,_0x11fa69);}},Game_Switches[_0x452dd7(0x508)]={},Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x1b3)]=function(_0xdf51b){const _0x47e611=_0x452dd7;if(!Game_Switches['advancedFunc'][_0xdf51b]){$dataSystem['switches'][_0xdf51b][_0x47e611(0x213)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x151ffe=_0x47e611(0x1f2)[_0x47e611(0x2c4)](String(RegExp['$1']));Game_Switches[_0x47e611(0x508)][_0xdf51b]=new Function(_0x47e611(0x34b),_0x151ffe);}const _0x4bcb2d=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x47e611(0x508)][_0xdf51b][_0x47e611(0x4df)](_0x4bcb2d,_0xdf51b);},Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x413)]=function(_0x2f6927){const _0x59f2ed=_0x452dd7,_0x737296=$gameTemp[_0x59f2ed(0x2da)]()||this;if(_0x737296[_0x59f2ed(0x20b)]!==Game_Event)return VisuMZ[_0x59f2ed(0x278)][_0x59f2ed(0x4fa)]['call'](this,_0x2f6927);else{const _0x137d30=[_0x737296['_mapId'],_0x737296[_0x59f2ed(0x208)],_0x59f2ed(0x52e)[_0x59f2ed(0x2c4)](_0x2f6927)];return $gameSelfSwitches[_0x59f2ed(0x22b)](_0x137d30);}},Game_Switches['prototype'][_0x452dd7(0x373)]=function(_0x464f2b){const _0x5b843d=_0x452dd7,_0x22dbaf=$gameMap?$gameMap[_0x5b843d(0x507)]():0x0,_0x3391a2=[0x0,0x0,_0x5b843d(0x262)[_0x5b843d(0x2c4)](_0x22dbaf,_0x464f2b)];return $gameSelfSwitches[_0x5b843d(0x22b)](_0x3391a2);},VisuMZ[_0x452dd7(0x278)]['Game_Switches_setValue']=Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x3af)],Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x3af)]=function(_0x1546ca,_0x480021){const _0xe93f9e=_0x452dd7;if(DataManager[_0xe93f9e(0x3c6)](_0x1546ca))this['setSelfValue'](_0x1546ca,_0x480021);else DataManager[_0xe93f9e(0x445)](_0x1546ca)?this[_0xe93f9e(0x27d)](_0x1546ca,_0x480021):VisuMZ[_0xe93f9e(0x278)][_0xe93f9e(0x542)][_0xe93f9e(0x4df)](this,_0x1546ca,_0x480021);},Game_Switches['prototype'][_0x452dd7(0x25e)]=function(_0x1a1c64,_0x2920db){const _0x44420e=_0x452dd7,_0x4d40ae=$gameTemp[_0x44420e(0x2da)]()||this;if(_0x4d40ae[_0x44420e(0x20b)]!==Game_Event)VisuMZ[_0x44420e(0x278)][_0x44420e(0x542)][_0x44420e(0x4df)](this,_0x1a1c64,_0x2920db);else{const _0x402bcb=[_0x4d40ae[_0x44420e(0x2be)],_0x4d40ae[_0x44420e(0x208)],'Self\x20Switch\x20%1'[_0x44420e(0x2c4)](_0x1a1c64)];$gameSelfSwitches['setValue'](_0x402bcb,_0x2920db);}},Game_Switches[_0x452dd7(0x31a)][_0x452dd7(0x27d)]=function(_0x4c12d2,_0x4b3fc9){const _0x5a3055=_0x452dd7,_0x3d47b5=$gameMap?$gameMap[_0x5a3055(0x507)]():0x0,_0x473aec=[0x0,0x0,_0x5a3055(0x262)['format'](_0x3d47b5,_0x4c12d2)];return $gameSelfSwitches['setValue'](_0x473aec,_0x4b3fc9);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1f1)]=Game_Variables['prototype']['value'],Game_Variables[_0x452dd7(0x31a)]['value']=function(_0x3d113b){const _0xa4543f=_0x452dd7;if(DataManager['isAdvancedVariable'](_0x3d113b))return this[_0xa4543f(0x1b3)](_0x3d113b);else{if(DataManager[_0xa4543f(0x230)](_0x3d113b))return this[_0xa4543f(0x413)](_0x3d113b);else return DataManager['isMapVariable'](_0x3d113b)?this[_0xa4543f(0x373)](_0x3d113b):VisuMZ[_0xa4543f(0x278)][_0xa4543f(0x1f1)][_0xa4543f(0x4df)](this,_0x3d113b);}},Game_Variables[_0x452dd7(0x508)]={},Game_Variables[_0x452dd7(0x31a)][_0x452dd7(0x1b3)]=function(_0x458b8a){const _0x449ffd=_0x452dd7;if(!Game_Variables[_0x449ffd(0x508)][_0x458b8a]){$dataSystem[_0x449ffd(0x40d)][_0x458b8a]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x23c252=_0x449ffd(0x1f2)[_0x449ffd(0x2c4)](String(RegExp['$1']));Game_Variables[_0x449ffd(0x508)][_0x458b8a]=new Function('variableId',_0x23c252);}const _0x34cb1c=$gameTemp['getSelfTarget']()||this;return Game_Variables['advancedFunc'][_0x458b8a][_0x449ffd(0x4df)](_0x34cb1c,_0x458b8a);},Game_Variables[_0x452dd7(0x31a)]['selfValue']=function(_0x22ed60){const _0x8c29c5=_0x452dd7,_0x3806fa=$gameTemp[_0x8c29c5(0x2da)]()||this;if(_0x3806fa[_0x8c29c5(0x20b)]!==Game_Event)return VisuMZ[_0x8c29c5(0x278)][_0x8c29c5(0x1f1)][_0x8c29c5(0x4df)](this,_0x22ed60);else{const _0x5dd0ab=[_0x3806fa[_0x8c29c5(0x2be)],_0x3806fa[_0x8c29c5(0x208)],_0x8c29c5(0x297)[_0x8c29c5(0x2c4)](_0x22ed60)];return $gameSelfSwitches[_0x8c29c5(0x22b)](_0x5dd0ab);}},Game_Variables[_0x452dd7(0x31a)][_0x452dd7(0x373)]=function(_0x954472){const _0x53c47d=_0x452dd7,_0x1d5acf=$gameMap?$gameMap[_0x53c47d(0x507)]():0x0,_0x403682=[0x0,0x0,_0x53c47d(0x1f6)[_0x53c47d(0x2c4)](_0x1d5acf,_0x954472)];return $gameSelfSwitches[_0x53c47d(0x22b)](_0x403682)||0x0;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x352)]=Game_Variables[_0x452dd7(0x31a)][_0x452dd7(0x3af)],Game_Variables[_0x452dd7(0x31a)][_0x452dd7(0x3af)]=function(_0x3fb264,_0x550401){const _0x385b20=_0x452dd7;if(DataManager['isSelfVariable'](_0x3fb264))this[_0x385b20(0x25e)](_0x3fb264,_0x550401);else DataManager[_0x385b20(0x3f4)](_0x3fb264)?this[_0x385b20(0x27d)](_0x3fb264,_0x550401):VisuMZ[_0x385b20(0x278)][_0x385b20(0x352)]['call'](this,_0x3fb264,_0x550401);},Game_Variables[_0x452dd7(0x31a)][_0x452dd7(0x25e)]=function(_0x4029fe,_0x210735){const _0x28b256=_0x452dd7,_0x35bb00=$gameTemp[_0x28b256(0x2da)]()||this;if(_0x35bb00[_0x28b256(0x20b)]!==Game_Event)VisuMZ['EventsMoveCore'][_0x28b256(0x352)][_0x28b256(0x4df)](this,_0x4029fe,_0x210735);else{const _0x6be0b6=[_0x35bb00[_0x28b256(0x2be)],_0x35bb00[_0x28b256(0x208)],_0x28b256(0x297)[_0x28b256(0x2c4)](_0x4029fe)];$gameSelfSwitches[_0x28b256(0x3af)](_0x6be0b6,_0x210735);}},Game_Variables['prototype'][_0x452dd7(0x27d)]=function(_0x3cce4d,_0x1058bf){const _0x56b5e8=_0x452dd7,_0xfd471f=$gameMap?$gameMap[_0x56b5e8(0x507)]():0x0,_0x16c5b3=[0x0,0x0,_0x56b5e8(0x1f6)[_0x56b5e8(0x2c4)](_0xfd471f,_0x3cce4d)];$gameSelfSwitches[_0x56b5e8(0x3af)](_0x16c5b3,_0x1058bf);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x3d8)]=Game_SelfSwitches[_0x452dd7(0x31a)][_0x452dd7(0x22b)],Game_SelfSwitches[_0x452dd7(0x31a)][_0x452dd7(0x22b)]=function(_0xbee8f4){const _0x4a7c1b=_0x452dd7;if(_0xbee8f4[0x2][_0x4a7c1b(0x213)](/(?:SELF|MAP)/i))return this[_0x4a7c1b(0x413)](_0xbee8f4);else{return VisuMZ[_0x4a7c1b(0x278)][_0x4a7c1b(0x3d8)][_0x4a7c1b(0x4df)](this,_0xbee8f4);;}},Game_SelfSwitches['prototype'][_0x452dd7(0x413)]=function(_0xab423a){const _0x160d07=_0x452dd7;return _0xab423a[0x2][_0x160d07(0x213)](/VAR/i)?this['_data'][_0xab423a]||0x0:!!this['_data'][_0xab423a];},VisuMZ[_0x452dd7(0x278)]['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x452dd7(0x31a)]['setValue'],Game_SelfSwitches[_0x452dd7(0x31a)][_0x452dd7(0x3af)]=function(_0x550bd5,_0x2033b7){const _0x1c0294=_0x452dd7;_0x550bd5[0x2][_0x1c0294(0x213)](/(?:SELF|MAP)/i)?this[_0x1c0294(0x25e)](_0x550bd5,_0x2033b7):VisuMZ[_0x1c0294(0x278)][_0x1c0294(0x2d7)]['call'](this,_0x550bd5,_0x2033b7);},Game_SelfSwitches[_0x452dd7(0x31a)]['setSelfValue']=function(_0x4e68c6,_0x39d110){const _0x29ef41=_0x452dd7;this[_0x29ef41(0x16e)][_0x4e68c6]=_0x4e68c6[0x2][_0x29ef41(0x213)](/VAR/i)?_0x39d110:!!_0x39d110,this[_0x29ef41(0x17b)]();},VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']=Game_Enemy[_0x452dd7(0x31a)][_0x452dd7(0x307)],Game_Enemy[_0x452dd7(0x31a)][_0x452dd7(0x307)]=function(_0x3fec14){const _0x3dae08=_0x452dd7;$gameTemp[_0x3dae08(0x4db)](this);const _0x187450=VisuMZ[_0x3dae08(0x278)][_0x3dae08(0x3b3)][_0x3dae08(0x4df)](this,_0x3fec14);return $gameTemp['clearSelfTarget'](),_0x187450;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x3ee)]=Game_Troop[_0x452dd7(0x31a)][_0x452dd7(0x246)],Game_Troop[_0x452dd7(0x31a)][_0x452dd7(0x246)]=function(_0x6f48d5){const _0x3089ca=_0x452dd7;$gameTemp[_0x3089ca(0x4db)](this);const _0x5e8322=VisuMZ['EventsMoveCore'][_0x3089ca(0x3ee)][_0x3089ca(0x4df)](this,_0x6f48d5);return $gameTemp[_0x3089ca(0x37f)](),_0x5e8322;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1ed)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x44e)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x44e)]=function(_0x429b5d){const _0x5304cc=_0x452dd7;this[_0x5304cc(0x54a)](_0x429b5d),this[_0x5304cc(0x22f)](),VisuMZ[_0x5304cc(0x278)]['Game_Map_setup'][_0x5304cc(0x4df)](this,_0x429b5d),this[_0x5304cc(0x22f)](),this[_0x5304cc(0x44f)](),this[_0x5304cc(0x406)](),this[_0x5304cc(0x309)](),this[_0x5304cc(0x294)](),this[_0x5304cc(0x504)](),this[_0x5304cc(0x3ad)](),this[_0x5304cc(0x22f)]();},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1b7)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x4c7)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x4c7)]=function(){const _0x2749d8=_0x452dd7;VisuMZ[_0x2749d8(0x278)][_0x2749d8(0x1b7)][_0x2749d8(0x4df)](this),this[_0x2749d8(0x24b)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x30d)]=function(){const _0x41260f=_0x452dd7,_0x1b291b=Game_Map[_0x41260f(0x327)];this['_eventOverload']=this[_0x41260f(0x207)]()[_0x41260f(0x36a)]>_0x1b291b;if(this['_eventOverload']&&$gameTemp[_0x41260f(0x2d2)]()){}},Game_Map[_0x452dd7(0x31a)]['isEventOverloaded']=function(){const _0x5a371e=_0x452dd7;return this[_0x5a371e(0x3ce)];},Game_Map[_0x452dd7(0x31a)]['clearEventCache']=function(){this['_eventCache']=undefined;},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x44f)]=function(){const _0x181142=_0x452dd7;this[_0x181142(0x2e7)]=VisuMZ[_0x181142(0x278)][_0x181142(0x34e)]['Movement'][_0x181142(0x3f0)];const _0xa218d1=$dataMap[_0x181142(0x3e5)]||'';if(_0xa218d1[_0x181142(0x213)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x181142(0x2e7)]=!![];else _0xa218d1[_0x181142(0x213)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x181142(0x2e7)]=![]);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x4fd)]=function(){const _0x151786=_0x452dd7,_0x1d329c=$gameSystem[_0x151786(0x498)]();if(_0x1d329c===_0x151786(0x3fc))return!![];if(_0x1d329c===_0x151786(0x4b9))return![];if(this[_0x151786(0x2e7)]===undefined)this['setupDiagonalSupport']();return this[_0x151786(0x2e7)];},Game_Map[_0x452dd7(0x31a)]['roundXWithDirection']=function(_0x2ccf55,_0x4def94){const _0x5e7e38=_0x452dd7;if([0x1,0x4,0x7]['includes'](_0x4def94))_0x2ccf55-=0x1;if([0x3,0x6,0x9][_0x5e7e38(0x38b)](_0x4def94))_0x2ccf55+=0x1;return this['roundX'](_0x2ccf55);},Game_Map[_0x452dd7(0x31a)]['roundYWithDirection']=function(_0x127b7c,_0x2ef8a7){const _0x343fee=_0x452dd7;if([0x1,0x2,0x3][_0x343fee(0x38b)](_0x2ef8a7))_0x127b7c+=0x1;if([0x7,0x8,0x9][_0x343fee(0x38b)](_0x2ef8a7))_0x127b7c-=0x1;return this[_0x343fee(0x49a)](_0x127b7c);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x23f)]=function(_0x5c8888,_0x6df6c0,_0x4bd296,_0x4a05fe){const _0x43aa4f=_0x452dd7;return Math[_0x43aa4f(0x4dd)](Math[_0x43aa4f(0x4cd)](this[_0x43aa4f(0x2a0)](_0x5c8888,_0x4bd296)),Math[_0x43aa4f(0x4cd)](this['deltaY'](_0x6df6c0,_0x4a05fe)));},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x406)]=function(){const _0x1feef3=_0x452dd7,_0x58037e=VisuMZ[_0x1feef3(0x278)][_0x1feef3(0x34e)][_0x1feef3(0x27b)],_0x3369bc={},_0x607223=['Allow',_0x1feef3(0x4ce),_0x1feef3(0x172)],_0x1b9cad=['All',_0x1feef3(0x50c),_0x1feef3(0x1dc),'Event','Vehicle',_0x1feef3(0x491),'Ship',_0x1feef3(0x2c5)];for(const _0x3042ed of _0x607223){for(const _0x323a7b of _0x1b9cad){const _0x4b1d00='%1%2'['format'](_0x323a7b,_0x3042ed);_0x58037e[_0x4b1d00]&&(_0x3369bc[_0x4b1d00]=_0x58037e[_0x4b1d00]['slice'](0x0));}}const _0x3c944c=$dataMap[_0x1feef3(0x3e5)]||'',_0xefbd37=_0x3c944c[_0x1feef3(0x213)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0xefbd37)for(const _0x3464f3 of _0xefbd37){_0x3464f3['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3d1fe7=String(RegExp['$1'])['toLowerCase']()[_0x1feef3(0x1f8)](),_0x247193=String(RegExp['$2'])[_0x1feef3(0x180)]()[_0x1feef3(0x1f8)]();const _0x3cac4d=JSON[_0x1feef3(0x32a)]('['+RegExp['$3'][_0x1feef3(0x213)](/\d+/g)+']');_0x3d1fe7=_0x3d1fe7[_0x1feef3(0x1b4)](0x0)[_0x1feef3(0x376)]()+_0x3d1fe7[_0x1feef3(0x525)](0x1),_0x247193=_0x247193['charAt'](0x0)[_0x1feef3(0x376)]()+_0x247193[_0x1feef3(0x525)](0x1);const _0x5c961a=_0x1feef3(0x249)['format'](_0x3d1fe7,_0x247193);if(_0x3369bc[_0x5c961a])_0x3369bc[_0x5c961a]=_0x3369bc[_0x5c961a][_0x1feef3(0x21a)](_0x3cac4d);}this['_regionRules']=_0x3369bc;},Game_Map[_0x452dd7(0x31a)]['isRegionAllowPass']=function(_0x4e6746,_0x77f86d,_0x12f887,_0x4476da){const _0x19135a=_0x452dd7,_0x38583b=this[_0x19135a(0x4d5)](_0x4e6746,_0x12f887),_0x4f6f08=this['roundYWithDirection'](_0x77f86d,_0x12f887),_0x1f3ab3=this[_0x19135a(0x177)](_0x38583b,_0x4f6f08),_0x3016da=this[_0x19135a(0x1b6)];if(_0x3016da[_0x19135a(0x26c)][_0x19135a(0x38b)](_0x1f3ab3))return!![];else{if(_0x4476da==='player')return _0x3016da[_0x19135a(0x3d9)][_0x19135a(0x38b)](_0x1f3ab3)||_0x3016da[_0x19135a(0x48f)][_0x19135a(0x38b)](_0x1f3ab3);else{if(_0x4476da===_0x19135a(0x1aa))return _0x3016da[_0x19135a(0x235)][_0x19135a(0x38b)](_0x1f3ab3)||_0x3016da[_0x19135a(0x48f)]['includes'](_0x1f3ab3);else{if(_0x3016da[_0x19135a(0x28f)][_0x19135a(0x38b)](_0x1f3ab3))return!![];else{const _0xbbde9=_0x19135a(0x355)[_0x19135a(0x2c4)](_0x4476da[_0x19135a(0x1b4)](0x0)[_0x19135a(0x376)]()+_0x4476da[_0x19135a(0x525)](0x1));if(_0x3016da[_0xbbde9])return _0x3016da[_0xbbde9][_0x19135a(0x38b)](_0x1f3ab3);}}}}return![];},Game_Map[_0x452dd7(0x31a)]['isRegionForbidPass']=function(_0x4cd13d,_0x545b41,_0x3c195e,_0x139d41){const _0x1c3644=_0x452dd7,_0x24b783=this[_0x1c3644(0x4d5)](_0x4cd13d,_0x3c195e),_0x4daee8=this['roundYWithDirection'](_0x545b41,_0x3c195e),_0x5a1766=this['regionId'](_0x24b783,_0x4daee8),_0x16873d=this[_0x1c3644(0x1b6)];if(_0x16873d['AllForbid'][_0x1c3644(0x38b)](_0x5a1766))return!![];else{if(_0x139d41===_0x1c3644(0x2ef))return _0x16873d['PlayerForbid'][_0x1c3644(0x38b)](_0x5a1766)||_0x16873d[_0x1c3644(0x37c)][_0x1c3644(0x38b)](_0x5a1766);else{if(_0x139d41==='event')return _0x16873d['EventForbid']['includes'](_0x5a1766)||_0x16873d[_0x1c3644(0x37c)]['includes'](_0x5a1766);else{if(_0x16873d[_0x1c3644(0x203)][_0x1c3644(0x38b)](_0x5a1766))return!![];else{const _0x4fef21=_0x1c3644(0x4a8)[_0x1c3644(0x2c4)](_0x139d41[_0x1c3644(0x1b4)](0x0)[_0x1c3644(0x376)]()+_0x139d41[_0x1c3644(0x525)](0x1));if(_0x16873d[_0x4fef21])return _0x16873d[_0x4fef21]['includes'](_0x5a1766);}}}}return![];},Game_Map[_0x452dd7(0x31a)]['isRegionDockable']=function(_0x25da5b,_0xb4fc8,_0x4f773,_0x492d4d){const _0x77cd2a=_0x452dd7;_0x4f773=_0x492d4d==='airship'?0x5:_0x4f773;const _0x170806=this['roundXWithDirection'](_0x25da5b,_0x4f773),_0x1d8a86=this[_0x77cd2a(0x4b4)](_0xb4fc8,_0x4f773),_0x9f0182=this[_0x77cd2a(0x177)](_0x170806,_0x1d8a86),_0x5982ff=this[_0x77cd2a(0x1b6)];if(_0x5982ff[_0x77cd2a(0x194)][_0x77cd2a(0x38b)](_0x9f0182))return!![];else{const _0x5c4d2e=_0x77cd2a(0x46f)[_0x77cd2a(0x2c4)](_0x492d4d[_0x77cd2a(0x1b4)](0x0)['toUpperCase']()+_0x492d4d[_0x77cd2a(0x525)](0x1));if(_0x5982ff[_0x5c4d2e])return _0x5982ff[_0x5c4d2e][_0x77cd2a(0x38b)](_0x9f0182);}return![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x39c)]=Game_Map[_0x452dd7(0x31a)]['refresh'],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x226)]=function(){const _0x44512c=_0x452dd7;VisuMZ[_0x44512c(0x278)][_0x44512c(0x39c)][_0x44512c(0x4df)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x50a)]=function(){const _0x22bbaa=_0x452dd7;this['_needsPeriodicRefresh']=![];if(this['events']()['some'](_0x15705b=>_0x15705b[_0x22bbaa(0x404)]())){this[_0x22bbaa(0x486)]=!![];return;}if(this[_0x22bbaa(0x207)]()[_0x22bbaa(0x2e1)](_0x2be319=>_0x2be319[_0x22bbaa(0x1a7)]())){this[_0x22bbaa(0x486)]=!![];return;}if(this[_0x22bbaa(0x4cf)][_0x22bbaa(0x2e1)](_0x121251=>_0x121251[_0x22bbaa(0x404)]())){this[_0x22bbaa(0x486)]=!![];return;}if(this['_commonEvents'][_0x22bbaa(0x2e1)](_0x3b3f70=>_0x3b3f70['hasCPCs']())){this[_0x22bbaa(0x486)]=!![];return;}},VisuMZ['EventsMoveCore'][_0x452dd7(0x19c)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x510)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x510)]=function(_0x59f9d7){const _0x591b5d=_0x452dd7;this[_0x591b5d(0x220)](),VisuMZ[_0x591b5d(0x278)][_0x591b5d(0x19c)][_0x591b5d(0x4df)](this,_0x59f9d7);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x220)]=function(){const _0x38e4f0=_0x452dd7;if(!this[_0x38e4f0(0x486)])return;this['_periodicRefreshTimer']=this[_0x38e4f0(0x3fe)]||0x3c,this[_0x38e4f0(0x3fe)]--,this['_periodicRefreshTimer']<=0x0&&(this[_0x38e4f0(0x212)](),this[_0x38e4f0(0x3fe)]=0x3c);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x42a)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x2b3)],Game_Map[_0x452dd7(0x31a)]['isDashDisabled']=function(){const _0x39f2f5=_0x452dd7;if(!$gameSystem[_0x39f2f5(0x387)]())return!![];return VisuMZ[_0x39f2f5(0x278)][_0x39f2f5(0x42a)]['call'](this);},Game_Map['prototype'][_0x452dd7(0x309)]=function(){const _0x265d33=_0x452dd7;this[_0x265d33(0x348)]=![];const _0x51c29b=$dataMap[_0x265d33(0x3e5)]||'';_0x51c29b[_0x265d33(0x213)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x265d33(0x348)]=!![]);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x438)]=function(){const _0x83cca9=_0x452dd7;if(this[_0x83cca9(0x348)]===undefined)this[_0x83cca9(0x309)]();return this['_saveEventLocations'];},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x54a)]=function(_0x32a7a7){const _0x242d8a=_0x452dd7;_0x32a7a7!==this[_0x242d8a(0x507)]()&&$gamePlayer&&$gameSystem[_0x242d8a(0x54a)](this[_0x242d8a(0x507)]());},Game_Map['prototype'][_0x452dd7(0x294)]=function(){const _0x15386d=_0x452dd7;this[_0x15386d(0x1f5)]=$gameSystem[_0x15386d(0x3a1)](this[_0x15386d(0x507)]()),this[_0x15386d(0x2f3)]=!![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x52a)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x207)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x207)]=function(){const _0x44e537=_0x452dd7;if(this['_eventCache'])return this['_eventCache'];const _0x3e53ee=VisuMZ[_0x44e537(0x278)][_0x44e537(0x52a)][_0x44e537(0x4df)](this),_0x552c26=_0x3e53ee[_0x44e537(0x21a)](this['_spawnedEvents']||[]);return this[_0x44e537(0x1d2)]=_0x552c26['filter'](_0x5dbdaa=>!!_0x5dbdaa),this[_0x44e537(0x1d2)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x403)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x1aa)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x1aa)]=function(_0x3d4fc0){const _0x59fc66=_0x452dd7;return _0x3d4fc0>=0x3e8?(_0x3d4fc0-=0x3e8,this[_0x59fc66(0x1f5)][_0x3d4fc0]):VisuMZ[_0x59fc66(0x278)]['Game_Map_event'][_0x59fc66(0x4df)](this,_0x3d4fc0);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x35d)]=function(_0x187dcb){const _0x224312=_0x452dd7,_0xa4988c=this[_0x224312(0x1aa)](_0x187dcb);if(_0xa4988c)_0xa4988c[_0x224312(0x3e8)]();},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x2b9)]=function(){const _0x464b23=_0x452dd7,_0x5575d6={'template':_0x464b23(0x30a),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x464b23(0x1f5)]['length']+0x3e8};this[_0x464b23(0x522)](_0x5575d6);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x3dd)]=function(_0x26d5b9,_0x19805a){const _0x23502f=_0x452dd7;if(this[_0x23502f(0x460)](_0x26d5b9,_0x19805a)['length']>0x0)return!![];if($gamePlayer['x']===_0x26d5b9&&$gamePlayer['y']===_0x19805a)return!![];if(this[_0x23502f(0x2fa)]()[_0x23502f(0x182)](_0x26d5b9,_0x19805a))return!![];if(this[_0x23502f(0x4d1)]()[_0x23502f(0x182)](_0x26d5b9,_0x19805a))return!![];return![];},Game_Map['prototype']['isSpawnHitboxCollisionOk']=function(_0x4f9bfb,_0x17f718,_0x66e929){const _0x1127d3=_0x452dd7;$gameTemp[_0x1127d3(0x24c)]=_0x4f9bfb;const _0xbcd5fe=new Game_Event(_0x4f9bfb[_0x1127d3(0x507)],_0x4f9bfb[_0x1127d3(0x53b)]);$gameTemp[_0x1127d3(0x24c)]=undefined,_0xbcd5fe['refresh']();let _0x3bbfc6=_0x17f718-_0xbcd5fe[_0x1127d3(0x31e)][_0x1127d3(0x261)],_0x1bcd7f=_0x17f718+_0xbcd5fe[_0x1127d3(0x31e)][_0x1127d3(0x261)],_0x243251=_0x66e929-_0xbcd5fe[_0x1127d3(0x31e)]['up'],_0x4b0146=_0x66e929+_0xbcd5fe[_0x1127d3(0x31e)][_0x1127d3(0x332)];for(let _0x4e1129=_0x3bbfc6;_0x4e1129<=_0x1bcd7f;_0x4e1129++){for(let _0x4da243=_0x243251;_0x4da243<=_0x4b0146;_0x4da243++){if(this['checkExistingEntitiesAt'](_0x4e1129,_0x4da243))return![];}}return!![];},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x522)]=function(_0x577264){const _0x5c7ff7=_0x452dd7;$gameTemp[_0x5c7ff7(0x24c)]=_0x577264;const _0x343720=new Game_Event(_0x577264[_0x5c7ff7(0x507)],_0x577264['eventId']);$gameTemp[_0x5c7ff7(0x24c)]=undefined,this[_0x5c7ff7(0x1f5)]['push'](_0x343720),_0x343720[_0x5c7ff7(0x4b3)](_0x577264),this[_0x5c7ff7(0x22f)]();},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x485)]=function(_0xf313f0,_0x210328,_0x123884){const _0x2f380a=_0x452dd7,_0x20d5e7=_0xf313f0['template'][_0x2f380a(0x376)]()[_0x2f380a(0x1f8)]();if(_0x20d5e7!==_0x2f380a(0x323)){const _0x36852a=VisuMZ['EventTemplates'][_0x20d5e7];_0x36852a&&(_0xf313f0['mapId']=_0x36852a[_0x2f380a(0x509)],_0xf313f0[_0x2f380a(0x53b)]=_0x36852a[_0x2f380a(0x50f)]);}const _0x444f64=_0xf313f0['x'],_0x2a31ed=_0xf313f0['y'];if(!this[_0x2f380a(0x1b5)](_0x444f64,_0x2a31ed))return![];if(_0x210328){if(this[_0x2f380a(0x3dd)](_0x444f64,_0x2a31ed))return![];if(!this['isSpawnHitboxCollisionOk'](_0xf313f0,_0x444f64,_0x2a31ed))return![];}if(_0x123884){if(!this[_0x2f380a(0x29a)](_0x444f64,_0x2a31ed))return![];}return this[_0x2f380a(0x522)](_0xf313f0),!![];},Game_Map[_0x452dd7(0x31a)]['prepareSpawnedEventAtRegion']=function(_0x1baa8e,_0x4737f2,_0x226a2f,_0xc12f69){const _0x3682e4=_0x452dd7,_0x2d6774=[],_0x3e5936=this[_0x3682e4(0x1c5)](),_0x3f3749=this[_0x3682e4(0x193)]();for(let _0x429a12=0x0;_0x429a12<_0x3e5936;_0x429a12++){for(let _0x2c8188=0x0;_0x2c8188<_0x3f3749;_0x2c8188++){if(!_0x4737f2['includes'](this[_0x3682e4(0x177)](_0x429a12,_0x2c8188)))continue;if(!this[_0x3682e4(0x1b5)](_0x429a12,_0x2c8188))continue;if(_0x226a2f){if(this[_0x3682e4(0x3dd)](_0x429a12,_0x2c8188))continue;if(!this[_0x3682e4(0x42d)](_0x1baa8e,_0x429a12,_0x2c8188))continue;}if(_0xc12f69){if(!this[_0x3682e4(0x29a)](_0x429a12,_0x2c8188))continue;}_0x2d6774[_0x3682e4(0x1a5)]([_0x429a12,_0x2c8188]);}}if(_0x2d6774[_0x3682e4(0x36a)]>0x0){const _0x533612=_0x2d6774[Math[_0x3682e4(0x2db)](_0x2d6774[_0x3682e4(0x36a)])];return _0x1baa8e['x']=_0x533612[0x0],_0x1baa8e['y']=_0x533612[0x1],this[_0x3682e4(0x522)](_0x1baa8e),!![];}return![];},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x467)]=function(_0x2b5052,_0x471d32,_0xffb33c,_0x5ea0b2){const _0x3c70a6=_0x452dd7,_0xc9bd58=[],_0x26e40b=this[_0x3c70a6(0x1c5)](),_0x507ebd=this[_0x3c70a6(0x193)]();for(let _0x29077c=0x0;_0x29077c<_0x26e40b;_0x29077c++){for(let _0x500866=0x0;_0x500866<_0x507ebd;_0x500866++){if(!_0x471d32[_0x3c70a6(0x38b)](this[_0x3c70a6(0x415)](_0x29077c,_0x500866)))continue;if(!this[_0x3c70a6(0x1b5)](_0x29077c,_0x500866))continue;if(_0xffb33c){if(this[_0x3c70a6(0x3dd)](_0x29077c,_0x500866))continue;if(!this[_0x3c70a6(0x42d)](_0x2b5052,_0x29077c,_0x500866))continue;}if(_0x5ea0b2){if(!this[_0x3c70a6(0x29a)](_0x29077c,_0x500866))continue;}_0xc9bd58[_0x3c70a6(0x1a5)]([_0x29077c,_0x500866]);}}if(_0xc9bd58[_0x3c70a6(0x36a)]>0x0){const _0x38631e=_0xc9bd58[Math[_0x3c70a6(0x2db)](_0xc9bd58['length'])];return _0x2b5052['x']=_0x38631e[0x0],_0x2b5052['y']=_0x38631e[0x1],this['createSpawnedEventWithData'](_0x2b5052),!![];}return![];},Game_Map[_0x452dd7(0x31a)]['isPassableByAnyDirection']=function(_0x1fb8f9,_0x8a1d6d){const _0x2a9a51=_0x452dd7;if(this[_0x2a9a51(0x4e1)](_0x1fb8f9,_0x8a1d6d,0x2))return!![];if(this['isPassable'](_0x1fb8f9,_0x8a1d6d,0x4))return!![];if(this[_0x2a9a51(0x4e1)](_0x1fb8f9,_0x8a1d6d,0x6))return!![];if(this[_0x2a9a51(0x4e1)](_0x1fb8f9,_0x8a1d6d,0x8))return!![];return![];},Game_Map['prototype'][_0x452dd7(0x1d9)]=function(_0x70b34e){const _0x2350ba=_0x452dd7;if(_0x70b34e<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x3cfadd=this['event'](_0x70b34e);_0x3cfadd['locate'](-0x1,-0x1),_0x3cfadd['erase'](),this[_0x2350ba(0x1f5)][_0x70b34e-0x3e8]=null,this[_0x2350ba(0x22f)]();},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x1ec)]=function(){const _0x158dc5=_0x452dd7;for(const _0x31ef8d of this[_0x158dc5(0x1f5)]){if(_0x31ef8d)return _0x31ef8d;}return null;},Game_Map['prototype'][_0x452dd7(0x1d8)]=function(){const _0x8134a0=_0x452dd7,_0x3bc73b=this[_0x8134a0(0x1ec)]();return _0x3bc73b?_0x3bc73b['_eventId']:0x0;},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x3d5)]=function(){const _0x42c3cb=_0x452dd7,_0x1a686b=this[_0x42c3cb(0x1f5)]['slice'](0x0)[_0x42c3cb(0x3bc)]();for(const _0xa9a9ec of _0x1a686b){if(_0xa9a9ec)return _0xa9a9ec;}return null;},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x19e)]=function(){const _0x498c37=this['lastSpawnedEvent']();return _0x498c37?_0x498c37['_eventId']:0x0;},Game_Map['prototype'][_0x452dd7(0x2a4)]=function(_0x32400c,_0x2322c9){const _0x1d2411=_0x452dd7,_0x224db3=this[_0x1d2411(0x460)](_0x32400c,_0x2322c9);for(const _0x32735f of _0x224db3){if(!_0x32735f)continue;if(_0x32735f[_0x1d2411(0x3be)]())this[_0x1d2411(0x1d9)](_0x32735f[_0x1d2411(0x208)]);}},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x277)]=function(_0xc7bc71){const _0x3d12ee=_0x452dd7;for(const _0x471250 of this[_0x3d12ee(0x1f5)]){if(!_0x471250)continue;_0xc7bc71['includes'](_0x471250['regionId']())&&this[_0x3d12ee(0x1d9)](_0x471250[_0x3d12ee(0x208)]);}},Game_Map['prototype'][_0x452dd7(0x410)]=function(_0x5c9dfe){const _0x1f51a6=_0x452dd7;for(const _0x202213 of this[_0x1f51a6(0x1f5)]){if(!_0x202213)continue;_0x5c9dfe['includes'](_0x202213[_0x1f51a6(0x415)]())&&this[_0x1f51a6(0x1d9)](_0x202213[_0x1f51a6(0x208)]);}},Game_Map[_0x452dd7(0x31a)]['despawnEverything']=function(){const _0x4789fd=_0x452dd7;for(const _0x2bad76 of this['_spawnedEvents']){if(!_0x2bad76)continue;this[_0x4789fd(0x1d9)](_0x2bad76[_0x4789fd(0x208)]);}},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x2c9)]=Game_Map['prototype'][_0x452dd7(0x511)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x511)]=function(_0x15100e){const _0x579981=_0x452dd7;VisuMZ['EventsMoveCore']['Game_Map_unlockEvent'][_0x579981(0x4df)](this,_0x15100e);if(_0x15100e>=0x3e8){const _0x456c13=this[_0x579981(0x1aa)](_0x15100e);if(_0x456c13)_0x456c13[_0x579981(0x237)]();}},Game_Map['prototype'][_0x452dd7(0x504)]=function(){const _0x5f16bb=_0x452dd7;this[_0x5f16bb(0x19d)]=![],this[_0x5f16bb(0x386)]=![];if(!$dataMap)return;const _0x4ee572=$dataMap[_0x5f16bb(0x3e5)]||'';if(_0x4ee572[_0x5f16bb(0x213)](/<HIDE PLAYER>/i))this[_0x5f16bb(0x19d)]=![],this['_forceHidePlayer']=!![];else _0x4ee572[_0x5f16bb(0x213)](/<SHOW PLAYER>/i)&&(this[_0x5f16bb(0x19d)]=!![],this[_0x5f16bb(0x386)]=![]);},Game_Map['prototype']['isPlayerForceShown']=function(){const _0x15c58e=_0x452dd7;return this[_0x15c58e(0x19d)]===undefined&&this[_0x15c58e(0x504)](),this[_0x15c58e(0x19d)];},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x2ac)]=function(){const _0x4050eb=_0x452dd7;return this[_0x4050eb(0x386)]===undefined&&this[_0x4050eb(0x504)](),this[_0x4050eb(0x386)];},VisuMZ[_0x452dd7(0x278)]['Game_CharacterBase_isTransparent']=Game_CharacterBase['prototype'][_0x452dd7(0x26f)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x26f)]=function(){const _0x3210be=_0x452dd7;if(this===$gamePlayer){if($gameMap[_0x3210be(0x412)]())return![];if($gameMap[_0x3210be(0x2ac)]())return!![];}return VisuMZ['EventsMoveCore'][_0x3210be(0x279)][_0x3210be(0x4df)](this);},Game_Map[_0x452dd7(0x31a)]['setupFollowerVisibilityOverrides']=function(){const _0x24a1c8=_0x452dd7;this[_0x24a1c8(0x4a9)]=![],this[_0x24a1c8(0x3ae)]=![];if(!$dataMap)return;const _0x2b77c2=$dataMap[_0x24a1c8(0x3e5)]||'';if(_0x2b77c2['match'](/<HIDE FOLLOWERS>/i))this[_0x24a1c8(0x4a9)]=![],this['_forceHideFollower']=!![];else _0x2b77c2[_0x24a1c8(0x213)](/<SHOW FOLLOWERS>/i)&&(this[_0x24a1c8(0x4a9)]=!![],this['_forceHideFollower']=![]);},Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x1a6)]=function(){const _0x30acb3=_0x452dd7;return this['_forceShowFollower']===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x30acb3(0x4a9)];},Game_Map[_0x452dd7(0x31a)]['areFollowersForceHidden']=function(){const _0x4f3181=_0x452dd7;return this[_0x4f3181(0x3ae)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x4f3181(0x3ae)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1fc)]=Game_Followers[_0x452dd7(0x31a)][_0x452dd7(0x289)],Game_Followers['prototype'][_0x452dd7(0x289)]=function(){const _0x532163=_0x452dd7;if($gameMap[_0x532163(0x1a6)]())return!![];if($gameMap[_0x532163(0x20c)]())return![];return VisuMZ[_0x532163(0x278)][_0x532163(0x1fc)]['call'](this);},Game_CommonEvent[_0x452dd7(0x31a)][_0x452dd7(0x404)]=function(){const _0x156fe9=_0x452dd7,_0x3e2671=this[_0x156fe9(0x1aa)]();return this[_0x156fe9(0x33a)]()&&_0x3e2671[_0x156fe9(0x21e)]>=0x1&&DataManager['isAdvancedSwitch'](_0x3e2671[_0x156fe9(0x34b)]);},Game_CommonEvent['prototype'][_0x452dd7(0x1a7)]=function(){const _0x25b230=_0x452dd7;return VisuMZ[_0x25b230(0x278)][_0x25b230(0x39a)][_0x25b230(0x4cf)]['includes'](this[_0x25b230(0x163)]);},VisuMZ['EventsMoveCore'][_0x452dd7(0x188)]=Game_CommonEvent['prototype'][_0x452dd7(0x33a)],Game_CommonEvent[_0x452dd7(0x31a)][_0x452dd7(0x33a)]=function(){const _0x2b5af1=_0x452dd7;return VisuMZ[_0x2b5af1(0x278)][_0x2b5af1(0x188)][_0x2b5af1(0x4df)](this)?!![]:VisuMZ['EventsMoveCore'][_0x2b5af1(0x39a)][_0x2b5af1(0x3cd)](this[_0x2b5af1(0x1aa)]()['CPC'],this[_0x2b5af1(0x163)]);},VisuMZ['EventsMoveCore'][_0x452dd7(0x2c8)]=Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x229)],Game_Map[_0x452dd7(0x31a)][_0x452dd7(0x229)]=function(){const _0x58a13d=_0x452dd7,_0x272a99=VisuMZ['EventsMoveCore'][_0x58a13d(0x2c8)][_0x58a13d(0x4df)](this),_0x19b70a=VisuMZ['EventsMoveCore'][_0x58a13d(0x39a)]['_commonEvents']['map'](_0x1ec25c=>$dataCommonEvents[_0x1ec25c]);return _0x272a99[_0x58a13d(0x21a)](_0x19b70a)['filter']((_0x3869bd,_0x4ccf82,_0x5a7d5a)=>_0x5a7d5a[_0x58a13d(0x3cc)](_0x3869bd)===_0x4ccf82);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x46a)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x19f)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x19f)]=function(){const _0x2454b4=_0x452dd7;VisuMZ['EventsMoveCore'][_0x2454b4(0x46a)][_0x2454b4(0x4df)](this),this[_0x2454b4(0x1f4)]();},Game_CharacterBase['prototype']['initEventsMoveCoreSettings']=function(){const _0x23f2f0=_0x452dd7;this[_0x23f2f0(0x228)]=![],this[_0x23f2f0(0x3eb)](),this[_0x23f2f0(0x531)](),this[_0x23f2f0(0x27c)](),this[_0x23f2f0(0x304)]();},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1a2)]=function(){const _0x57f9a8=_0x452dd7;if(this[_0x57f9a8(0x20b)]===Game_Player&&this['isInVehicle']())return this[_0x57f9a8(0x179)]()[_0x57f9a8(0x1cc)]()[_0x57f9a8(0x213)](/\[VS8\]/i);else return Imported[_0x57f9a8(0x268)]&&this[_0x57f9a8(0x22c)]()?!![]:this[_0x57f9a8(0x1cc)]()[_0x57f9a8(0x213)](/\[VS8\]/i);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x2d8)]=Game_CharacterBase['prototype'][_0x452dd7(0x1c7)],Game_CharacterBase['prototype'][_0x452dd7(0x1c7)]=function(){const _0xcc044f=_0x452dd7;if(this[_0xcc044f(0x371)]()&&!this[_0xcc044f(0x2e0)]()&&this[_0xcc044f(0x1a2)]())return this[_0xcc044f(0x430)]();else{if(this['isOnLadder']()&&!this[_0xcc044f(0x2e0)]())return 0x8;else return this['isPosing']()&&this['isSpriteVS8dir']()?this[_0xcc044f(0x303)]():VisuMZ['EventsMoveCore']['Game_CharacterBase_direction'][_0xcc044f(0x4df)](this);}},VisuMZ[_0x452dd7(0x278)]['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x39b)],Game_CharacterBase['prototype']['setDirection']=function(_0x534708){const _0x2db26e=_0x452dd7;if(!this[_0x2db26e(0x1a2)]())_0x534708=this[_0x2db26e(0x4bf)](_0x534708);VisuMZ[_0x2db26e(0x278)][_0x2db26e(0x546)][_0x2db26e(0x4df)](this,_0x534708);},Game_CharacterBase['prototype']['correctFacingDirection']=function(_0x3bd0cb){const _0x429e9c=_0x452dd7;if(_0x3bd0cb===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x3bd0cb===0x3)return this[_0x429e9c(0x1ea)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x3bd0cb===0x7)return this[_0x429e9c(0x1ea)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x3bd0cb===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x3bd0cb;},Game_CharacterBase['prototype'][_0x452dd7(0x365)]=function(_0x3f5ba6){const _0x1f85ac=_0x452dd7;return[0x1,0x3,0x5,0x7,0x9][_0x1f85ac(0x38b)](_0x3f5ba6);},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x32c)]=function(){const _0x100329=_0x452dd7;return this[_0x100329(0x2d3)]||0x0;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x452)]=Game_CharacterBase[_0x452dd7(0x31a)]['moveStraight'],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x339)]=function(_0x4fd0ee){const _0x208426=_0x452dd7;this['_lastMovedDirection']=_0x4fd0ee,VisuMZ['EventsMoveCore']['Game_CharacterBase_moveStraight'][_0x208426(0x4df)](this,_0x4fd0ee);},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1e5)]=function(_0x287e3a){const _0x4848ff=_0x452dd7;if(!this['isDiagonalDirection'](_0x287e3a))return this[_0x4848ff(0x339)](_0x287e3a);let _0x18c11d=0x0,_0x121f1b=0x0;switch(_0x287e3a){case 0x1:_0x18c11d=0x4,_0x121f1b=0x2;break;case 0x3:_0x18c11d=0x6,_0x121f1b=0x2;break;case 0x7:_0x18c11d=0x4,_0x121f1b=0x8;break;case 0x9:_0x18c11d=0x6,_0x121f1b=0x8;break;}if(VisuMZ[_0x4848ff(0x278)][_0x4848ff(0x34e)]['Movement'][_0x4848ff(0x18d)]){if(!this[_0x4848ff(0x1ea)](this['_x'],this['_y'],_0x18c11d))return this[_0x4848ff(0x339)](_0x121f1b);if(!this[_0x4848ff(0x1ea)](this['_x'],this['_y'],_0x121f1b))return this[_0x4848ff(0x339)](_0x18c11d);if(!this[_0x4848ff(0x1ef)](this['_x'],this['_y'],_0x18c11d,_0x121f1b)){let _0x195c84=VisuMZ[_0x4848ff(0x278)][_0x4848ff(0x34e)]['Movement'][_0x4848ff(0x222)]?_0x18c11d:_0x121f1b;return this['moveStraight'](_0x195c84);}}this['_lastMovedDirection']=_0x287e3a,this[_0x4848ff(0x1c6)](_0x18c11d,_0x121f1b);},VisuMZ['EventsMoveCore'][_0x452dd7(0x2dc)]=Game_CharacterBase['prototype'][_0x452dd7(0x217)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x217)]=function(){const _0xb4dad2=_0x452dd7;let _0x1b329e=this[_0xb4dad2(0x2e2)];return this[_0xb4dad2(0x4b0)]()&&(_0x1b329e+=this['dashSpeedModifier']()),this['adjustDir8MovementSpeed'](_0x1b329e);},Game_CharacterBase['prototype'][_0x452dd7(0x344)]=function(){const _0x26df11=_0x452dd7,_0x832eeb=VisuMZ[_0x26df11(0x278)]['Settings'][_0x26df11(0x36e)];return _0x832eeb[_0x26df11(0x48a)]!==undefined?_0x832eeb['DashModifier']:VisuMZ[_0x26df11(0x278)][_0x26df11(0x2dc)]['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3f6)]=function(_0x13b32a){const _0x5d1f65=_0x452dd7,_0x169428=VisuMZ['EventsMoveCore']['Settings'][_0x5d1f65(0x36e)];if(!_0x169428[_0x5d1f65(0x49f)])return _0x13b32a;return[0x1,0x3,0x7,0x9][_0x5d1f65(0x38b)](this['_lastMovedDirection'])&&(_0x13b32a*=_0x169428[_0x5d1f65(0x3e3)]||0.01),_0x13b32a;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x454)]=Game_CharacterBase[_0x452dd7(0x31a)]['isDashing'],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x4b0)]=function(){const _0x3e3664=_0x452dd7;if(this[_0x3e3664(0x2ca)])return!![];return VisuMZ[_0x3e3664(0x278)][_0x3e3664(0x454)][_0x3e3664(0x4df)](this);},Game_CharacterBase['prototype'][_0x452dd7(0x2bf)]=function(){return this['isDashing']();},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x2ae)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x2ee)],Game_CharacterBase[_0x452dd7(0x31a)]['pattern']=function(){const _0x22ce14=_0x452dd7;return this['isPosing']()?this[_0x22ce14(0x2e6)]():VisuMZ['EventsMoveCore'][_0x22ce14(0x2ae)][_0x22ce14(0x4df)](this);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x181)]=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3da)]=function(){const _0x4274a9=_0x452dd7;VisuMZ['EventsMoveCore'][_0x4274a9(0x181)][_0x4274a9(0x4df)](this),this[_0x4274a9(0x3eb)]();},VisuMZ['EventsMoveCore'][_0x452dd7(0x4cb)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x247)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x247)]=function(){const _0x561102=_0x452dd7;if(this['isSpriteVS8dir']())return this[_0x561102(0x1b9)]();return VisuMZ[_0x561102(0x278)][_0x561102(0x4cb)]['call'](this);},Game_CharacterBase[_0x452dd7(0x31a)]['characterIndexVS8']=function(){const _0x480c94=_0x452dd7,_0x130503=this[_0x480c94(0x1c7)]();if(this[_0x480c94(0x2e0)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x130503))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x130503))return 0x5;}else{if(this[_0x480c94(0x371)]())return 0x6;else{if(this[_0x480c94(0x330)]())return this[_0x480c94(0x290)]();else{if(this[_0x480c94(0x4d3)]){if([0x2,0x4,0x6,0x8][_0x480c94(0x38b)](_0x130503))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x130503))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x480c94(0x420)]()){if([0x2,0x4,0x6,0x8][_0x480c94(0x38b)](_0x130503))return 0x4;if([0x1,0x3,0x7,0x9][_0x480c94(0x38b)](_0x130503))return 0x5;}else{if(this['isDashingAndMoving']()){if([0x2,0x4,0x6,0x8][_0x480c94(0x38b)](_0x130503))return 0x2;if([0x1,0x3,0x7,0x9][_0x480c94(0x38b)](_0x130503))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x130503))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x130503))return 0x1;}}}}}}},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x420)]=function(){const _0x26afb5=_0x452dd7;return VisuMZ[_0x26afb5(0x278)][_0x26afb5(0x34e)][_0x26afb5(0x1cb)][_0x26afb5(0x25d)];},Game_CharacterBase['prototype'][_0x452dd7(0x3c9)]=function(){const _0x4d036e=_0x452dd7;return this['isOnLadder']()&&this['terrainTag']()===VisuMZ[_0x4d036e(0x278)]['Settings'][_0x4d036e(0x2e9)]['Rope'];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x430)]=function(){const _0x45a0bf=_0x452dd7;return this[_0x45a0bf(0x3c9)]()?0x4:0x2;},VisuMZ[_0x452dd7(0x278)]['Game_CharacterBase_update']=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x510)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x510)]=function(){const _0x1da230=_0x452dd7;VisuMZ[_0x1da230(0x278)][_0x1da230(0x315)]['call'](this),this[_0x1da230(0x2f1)]();},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x2f1)]=function(){const _0x4dbb80=_0x452dd7;this[_0x4dbb80(0x3ef)]=this[_0x4dbb80(0x3ef)]||0x0;if(this[_0x4dbb80(0x3ef)]>0x0){this[_0x4dbb80(0x3ef)]--;if(this[_0x4dbb80(0x3ef)]<=0x0&&this[_0x4dbb80(0x51f)]!==_0x4dbb80(0x4eb))this[_0x4dbb80(0x3eb)]();}},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x54b)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1c6)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1c6)]=function(_0x29b320,_0x3df30c){const _0x1af14a=_0x452dd7;VisuMZ['EventsMoveCore'][_0x1af14a(0x54b)][_0x1af14a(0x4df)](this,_0x29b320,_0x3df30c);if(this[_0x1af14a(0x1a2)]())this[_0x1af14a(0x269)](_0x29b320,_0x3df30c);},Game_CharacterBase[_0x452dd7(0x31a)]['setDiagonalDirection']=function(_0x2887e7,_0x319678){const _0xadeccc=_0x452dd7;if(_0x2887e7===0x4&&_0x319678===0x2)this[_0xadeccc(0x39b)](0x1);if(_0x2887e7===0x6&&_0x319678===0x2)this[_0xadeccc(0x39b)](0x3);if(_0x2887e7===0x4&&_0x319678===0x8)this[_0xadeccc(0x39b)](0x7);if(_0x2887e7===0x6&&_0x319678===0x8)this['setDirection'](0x9);},VisuMZ['EventsMoveCore'][_0x452dd7(0x240)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x433)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x433)]=function(){const _0x441649=_0x452dd7;if(this[_0x441649(0x330)]()&&this[_0x441649(0x3ed)]()==='ZZZ')return!![];return VisuMZ[_0x441649(0x278)][_0x441649(0x240)][_0x441649(0x4df)](this);},Game_CharacterBase['prototype']['setPose']=function(_0x6d667f,_0x3452bf){const _0x5f4063=_0x452dd7;if(_0x6d667f[_0x5f4063(0x213)](/Z/i))_0x6d667f=_0x5f4063(0x4eb);if(_0x6d667f[_0x5f4063(0x213)](/SLEEP/i))_0x6d667f=_0x5f4063(0x4eb);this[_0x5f4063(0x1a2)]()&&(this[_0x5f4063(0x51f)]=_0x6d667f[_0x5f4063(0x376)]()[_0x5f4063(0x1f8)](),this[_0x5f4063(0x3ef)]=_0x3452bf||Infinity);},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3ed)]=function(){const _0x3b99c3=_0x452dd7;return this[_0x3b99c3(0x1a2)]()?(this[_0x3b99c3(0x51f)]||'')[_0x3b99c3(0x376)]()[_0x3b99c3(0x1f8)]():''[_0x3b99c3(0x376)]()[_0x3b99c3(0x1f8)]();},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x473)]=function(_0x41fa93,_0x193f59){const _0x4bef5b=_0x452dd7;if(this['isSpriteVS8dir']()){const _0x2859f2=['',_0x4bef5b(0x440),_0x4bef5b(0x2fb),_0x4bef5b(0x396),_0x4bef5b(0x44a),_0x4bef5b(0x287),'SWEAT',_0x4bef5b(0x45c),_0x4bef5b(0x548),_0x4bef5b(0x300),_0x4bef5b(0x4eb),'','','','',''][_0x41fa93];this[_0x4bef5b(0x518)](_0x2859f2,_0x193f59);}},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3eb)]=function(){const _0xa8c3ab=_0x452dd7;this[_0xa8c3ab(0x51f)]='',this['_poseDuration']=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x507cdd=_0x452dd7;return this[_0x507cdd(0x1a2)]()&&!!this[_0x507cdd(0x51f)];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x290)]=function(){const _0x1c2f1c=_0x452dd7,_0x3d7d33=this['_pose'][_0x1c2f1c(0x376)]();switch(this[_0x1c2f1c(0x51f)][_0x1c2f1c(0x376)]()[_0x1c2f1c(0x1f8)]()){case _0x1c2f1c(0x334):case'HMPH':case'VICTORY':case _0x1c2f1c(0x1a9):case _0x1c2f1c(0x210):case _0x1c2f1c(0x2c3):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x303)]=function(){const _0x35256d=_0x452dd7;switch(this[_0x35256d(0x51f)][_0x35256d(0x376)]()){case _0x35256d(0x440):case'QUESTION':case _0x35256d(0x396):case'!':case'?':return 0x2;break;case'HEART':case _0x35256d(0x287):case _0x35256d(0x39f):return 0x4;break;case'ITEM':case _0x35256d(0x477):case _0x35256d(0x45b):case _0x35256d(0x45c):case _0x35256d(0x548):case _0x35256d(0x300):return 0x6;break;case _0x35256d(0x1a9):case _0x35256d(0x210):case _0x35256d(0x2c3):case _0x35256d(0x4eb):case _0x35256d(0x30e):return 0x8;break;default:return VisuMZ[_0x35256d(0x278)]['Game_CharacterBase_setDirection'][_0x35256d(0x4df)](this);break;}},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x2e6)]=function(){const _0x2bae7a=_0x452dd7;switch(this[_0x2bae7a(0x51f)]['toUpperCase']()){case _0x2bae7a(0x334):case _0x2bae7a(0x1a9):case _0x2bae7a(0x440):case'!':case _0x2bae7a(0x44a):case'COBWEB':return 0x0;break;case'HMPH':case _0x2bae7a(0x210):case _0x2bae7a(0x2fb):case'?':case _0x2bae7a(0x287):case _0x2bae7a(0x548):return 0x1;break;case _0x2bae7a(0x45b):case _0x2bae7a(0x2c3):case _0x2bae7a(0x396):case _0x2bae7a(0x39f):case _0x2bae7a(0x300):return 0x2;break;default:return VisuMZ[_0x2bae7a(0x278)][_0x2bae7a(0x2ae)][_0x2bae7a(0x4df)](this);break;}},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x435)]=function(){const _0x4d3120=_0x452dd7;this[_0x4d3120(0x4d3)]=!![];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1a8)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x32e)]=function(){this['_forceDashing']=!![];},Game_CharacterBase['prototype'][_0x452dd7(0x531)]=function(){const _0x309286=_0x452dd7;this[_0x309286(0x2ca)]=![];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1f3)]=function(){const _0x55d9a5=_0x452dd7;if(this[_0x55d9a5(0x399)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x55d9a5(0x18e)]==='')return![];if(this[_0x55d9a5(0x20b)]===Game_Vehicle)return![];if(this[_0x55d9a5(0x26f)]())return![];return!![];},Game_CharacterBase['prototype']['isShadowShrink']=function(){const _0x5d14d2=_0x452dd7;if(this[_0x5d14d2(0x371)]())return!![];if(this[_0x5d14d2(0x20b)]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3b2)]=function(){const _0x139ae0=_0x452dd7;return VisuMZ[_0x139ae0(0x278)][_0x139ae0(0x34e)][_0x139ae0(0x36e)]['DefaultShadow'];},Game_CharacterBase[_0x452dd7(0x31a)]['shadowX']=function(){const _0x3a908f=_0x452dd7;return this[_0x3a908f(0x1df)]();},Game_CharacterBase[_0x452dd7(0x31a)]['shadowY']=function(){const _0x214d58=_0x452dd7,_0x5bb41a=$gameMap[_0x214d58(0x325)]();return Math[_0x214d58(0x1eb)](this['scrolledY']()*_0x5bb41a+_0x5bb41a);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x363)]=function(_0x2e7b5d,_0x3f6298){const _0x53036f=_0x452dd7,_0x13ad4e=this[_0x53036f(0x478)](),_0x584b83=$gameMap[_0x53036f(0x1c5)](),_0x4b06e6=[],_0x4408a3=[],_0x5ab586=[],_0x1e884a={};let _0x136d71=_0x1e884a;if(this['x']===_0x2e7b5d&&this['y']===_0x3f6298)return 0x0;_0x1e884a[_0x53036f(0x407)]=null,_0x1e884a['x']=this['x'],_0x1e884a['y']=this['y'],_0x1e884a['g']=0x0,_0x1e884a['f']=$gameMap[_0x53036f(0x49b)](_0x1e884a['x'],_0x1e884a['y'],_0x2e7b5d,_0x3f6298),_0x4b06e6['push'](_0x1e884a),_0x4408a3[_0x53036f(0x1a5)](_0x1e884a['y']*_0x584b83+_0x1e884a['x']);while(_0x4b06e6[_0x53036f(0x36a)]>0x0){let _0x598403=0x0;for(let _0x1e45b8=0x0;_0x1e45b8<_0x4b06e6['length'];_0x1e45b8++){_0x4b06e6[_0x1e45b8]['f']<_0x4b06e6[_0x598403]['f']&&(_0x598403=_0x1e45b8);}const _0x41dbda=_0x4b06e6[_0x598403],_0x2f3dcc=_0x41dbda['x'],_0x48768b=_0x41dbda['y'],_0xde8574=_0x48768b*_0x584b83+_0x2f3dcc,_0x556b74=_0x41dbda['g'];_0x4b06e6[_0x53036f(0x359)](_0x598403,0x1),_0x4408a3[_0x53036f(0x359)](_0x4408a3['indexOf'](_0xde8574),0x1),_0x5ab586[_0x53036f(0x1a5)](_0xde8574);if(_0x41dbda['x']===_0x2e7b5d&&_0x41dbda['y']===_0x3f6298){_0x136d71=_0x41dbda;break;}if(_0x556b74>=_0x13ad4e)continue;const _0x17025b=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x238df3=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x5addf3=0x1;_0x5addf3<0xa;_0x5addf3++){if(_0x5addf3===0x5)continue;const _0x40c0b6=_0x5addf3,_0x877b6c=_0x17025b[_0x5addf3],_0x51cd6f=_0x238df3[_0x5addf3],_0x495e6d=$gameMap['roundXWithDirection'](_0x2f3dcc,_0x40c0b6),_0x1bc982=$gameMap[_0x53036f(0x4b4)](_0x48768b,_0x40c0b6),_0x48fe8=_0x1bc982*_0x584b83+_0x495e6d;if(_0x5ab586[_0x53036f(0x38b)](_0x48fe8))continue;if(this[_0x53036f(0x20b)]===Game_Player&&VisuMZ[_0x53036f(0x278)]['Settings']['Movement'][_0x53036f(0x18d)]){if(!this[_0x53036f(0x1ea)](_0x2f3dcc,_0x48768b,_0x877b6c))continue;if(!this[_0x53036f(0x1ea)](_0x2f3dcc,_0x48768b,_0x51cd6f))continue;}if(!this[_0x53036f(0x1ef)](_0x2f3dcc,_0x48768b,_0x877b6c,_0x51cd6f))continue;const _0x1be703=_0x556b74+0x1,_0x408a30=_0x4408a3[_0x53036f(0x3cc)](_0x48fe8);if(_0x408a30<0x0||_0x1be703<_0x4b06e6[_0x408a30]['g']){let _0x419994={};_0x408a30>=0x0?_0x419994=_0x4b06e6[_0x408a30]:(_0x4b06e6[_0x53036f(0x1a5)](_0x419994),_0x4408a3[_0x53036f(0x1a5)](_0x48fe8)),_0x419994[_0x53036f(0x407)]=_0x41dbda,_0x419994['x']=_0x495e6d,_0x419994['y']=_0x1bc982,_0x419994['g']=_0x1be703,_0x419994['f']=_0x1be703+$gameMap['distance'](_0x495e6d,_0x1bc982,_0x2e7b5d,_0x3f6298),(!_0x136d71||_0x419994['f']-_0x419994['g']<_0x136d71['f']-_0x136d71['g'])&&(_0x136d71=_0x419994);}}}let _0x138152=_0x136d71;while(_0x138152['parent']&&_0x138152['parent']!==_0x1e884a){_0x138152=_0x138152[_0x53036f(0x407)];}const _0x58968c=$gameMap[_0x53036f(0x2a0)](_0x138152['x'],_0x1e884a['x']),_0x4e12f2=$gameMap[_0x53036f(0x2b4)](_0x138152['y'],_0x1e884a['y']);if(_0x58968c<0x0&&_0x4e12f2>0x0)return 0x1;if(_0x58968c>0x0&&_0x4e12f2>0x0)return 0x3;if(_0x58968c<0x0&&_0x4e12f2<0x0)return 0x7;if(_0x58968c>0x0&&_0x4e12f2<0x0)return 0x9;if(_0x4e12f2>0x0)return 0x2;if(_0x58968c<0x0)return 0x4;if(_0x58968c>0x0)return 0x6;if(_0x4e12f2<0x0)return 0x8;const _0x425b2f=this['deltaXFrom'](_0x2e7b5d),_0x22d26a=this[_0x53036f(0x528)](_0x3f6298);if(Math[_0x53036f(0x4cd)](_0x425b2f)>Math['abs'](_0x22d26a))return _0x425b2f>0x0?0x4:0x6;else{if(_0x22d26a!==0x0)return _0x22d26a>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x500)]=Game_CharacterBase['prototype'][_0x452dd7(0x1ea)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1ea)]=function(_0x1ccd69,_0x29dfe,_0xcfa7c6){const _0x17abc9=_0x452dd7;return this[_0x17abc9(0x30f)]===_0x17abc9(0x521)?this[_0x17abc9(0x179)]()[_0x17abc9(0x3f2)](_0x1ccd69,_0x29dfe,_0xcfa7c6):VisuMZ['EventsMoveCore'][_0x17abc9(0x500)][_0x17abc9(0x4df)](this,_0x1ccd69,_0x29dfe,_0xcfa7c6);},Game_CharacterBase[_0x452dd7(0x31a)]['clearSpriteOffsets']=function(){const _0x369be0=_0x452dd7;this['_spriteOffsetX']=0x0,this[_0x369be0(0x4a6)]=0x0;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x434)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1df)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x1df)]=function(){const _0xbff67b=_0x452dd7;return VisuMZ['EventsMoveCore'][_0xbff67b(0x434)]['call'](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x33b)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x36b)],Game_CharacterBase[_0x452dd7(0x31a)]['screenY']=function(){const _0x2e254d=_0x452dd7;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenY'][_0x2e254d(0x4df)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase['prototype'][_0x452dd7(0x304)]=function(){this['_stepPattern']='';},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x52f)]=Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x190)],Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x190)]=function(){const _0x19da69=_0x452dd7;if(this[_0x19da69(0x228)])return;if(this[_0x19da69(0x236)]())return;VisuMZ[_0x19da69(0x278)][_0x19da69(0x52f)][_0x19da69(0x4df)](this);},Game_CharacterBase[_0x452dd7(0x31a)]['updatePatternEventsMoveCore']=function(){const _0x8c8853=_0x452dd7;if(!this[_0x8c8853(0x433)]()&&this[_0x8c8853(0x187)]>0x0)return![];switch(String(this['_stepPattern'])[_0x8c8853(0x376)]()[_0x8c8853(0x1f8)]()){case _0x8c8853(0x35a):this[_0x8c8853(0x18c)]+=0x1;if(this['_pattern']>0x2)this['setPattern'](0x0);break;case _0x8c8853(0x227):this[_0x8c8853(0x18c)]-=0x1;if(this[_0x8c8853(0x18c)]<0x0)this['setPattern'](0x2);break;case _0x8c8853(0x38a):case'SPIN\x20CW':this['turnRight90']();break;case _0x8c8853(0x378):case _0x8c8853(0x42c):case _0x8c8853(0x4d9):case _0x8c8853(0x549):this[_0x8c8853(0x16f)]();break;default:return![];}return!![];},Game_CharacterBase[_0x452dd7(0x31a)]['getEventIconData']=function(){const _0x14c152=_0x452dd7;return $gameSystem[_0x14c152(0x1bf)](this);},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x464)]=function(){const _0x52e657=_0x452dd7,_0x1e77cc=this[_0x52e657(0x1bf)]();if(!_0x1e77cc)return![];return _0x1e77cc[_0x52e657(0x463)]>0x0;},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x3df)]=function(){const _0x3949de=_0x452dd7,_0x370502=this['direction']();return $gameMap[_0x3949de(0x4d5)](this['x'],_0x370502);},Game_CharacterBase['prototype']['frontY']=function(){const _0x22afc0=_0x452dd7,_0x2fd89b=this['direction']();return $gameMap[_0x22afc0(0x4b4)](this['y'],_0x2fd89b);},Game_CharacterBase[_0x452dd7(0x31a)][_0x452dd7(0x2df)]=function(){const _0x5a6a87=_0x452dd7,_0x2ec5c5=this[_0x5a6a87(0x44d)](this['direction']());return $gameMap[_0x5a6a87(0x4d5)](this['x'],_0x2ec5c5);},Game_CharacterBase['prototype']['backY']=function(){const _0x52f2dc=_0x452dd7,_0x234b4f=this[_0x52f2dc(0x44d)](this[_0x52f2dc(0x1c7)]());return $gameMap[_0x52f2dc(0x4b4)](this['y'],_0x234b4f);},VisuMZ['EventsMoveCore']['Game_Character_setMoveRoute']=Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x489)],Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x489)]=function(_0x63afb){const _0x504b33=_0x452dd7;route=JsonEx[_0x504b33(0x23c)](_0x63afb),VisuMZ['EventsMoveCore'][_0x504b33(0x3e0)][_0x504b33(0x4df)](this,route);},VisuMZ['EventsMoveCore']['Game_Character_forceMoveRoute']=Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x540)],Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x540)]=function(_0x54eb72){const _0x107ee1=_0x452dd7;route=JsonEx[_0x107ee1(0x23c)](_0x54eb72),VisuMZ[_0x107ee1(0x278)][_0x107ee1(0x238)][_0x107ee1(0x4df)](this,route);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x257)]=Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x513)],Game_Character['prototype'][_0x452dd7(0x513)]=function(_0x29a785){const _0x283879=_0x452dd7,_0x4ba2c6=Game_Character,_0x10b241=_0x29a785['parameters'];if(_0x29a785['code']===_0x4ba2c6[_0x283879(0x414)]){let _0x1e870e=_0x29a785[_0x283879(0x2bc)][0x0];_0x1e870e=this['convertVariableValuesInScriptCall'](_0x1e870e),_0x1e870e=this[_0x283879(0x437)](_0x1e870e),this[_0x283879(0x2b0)](_0x29a785,_0x1e870e);}else VisuMZ[_0x283879(0x278)]['Game_Character_processMoveCommand'][_0x283879(0x4df)](this,_0x29a785);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x22e)]=function(_0x679923){const _0x220b9a=_0x452dd7,_0x23bde6=/\$gameVariables\.value\((\d+)\)/gi,_0x285579=/\\V\[(\d+)\]/gi;while(_0x679923[_0x220b9a(0x213)](_0x23bde6)){_0x679923=_0x679923[_0x220b9a(0x259)](_0x23bde6,(_0x33a727,_0x3620b4)=>$gameVariables[_0x220b9a(0x22b)](parseInt(_0x3620b4)));}while(_0x679923[_0x220b9a(0x213)](_0x285579)){_0x679923=_0x679923[_0x220b9a(0x259)](_0x285579,(_0x3710ad,_0x38e90c)=>$gameVariables[_0x220b9a(0x22b)](parseInt(_0x38e90c)));}return _0x679923;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x437)]=function(_0x1f5f5a){const _0x332eff=_0x452dd7,_0x245ad2=/\\SELFVAR\[(\d+)\]/gi;while(_0x1f5f5a[_0x332eff(0x213)](_0x245ad2)){_0x1f5f5a=_0x1f5f5a[_0x332eff(0x259)](_0x245ad2,(_0x5909bb,_0xff60dd)=>getSelfVariableValue(this[_0x332eff(0x2be)],this['_eventId'],parseInt(_0xff60dd)));}return _0x1f5f5a;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x2b0)]=function(_0x48a4a8,_0x30dd60){const _0x7c91ca=_0x452dd7;if(_0x30dd60['match'](/ANIMATION:[ ](\d+)/i))return this['processMoveRouteAnimation'](Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/BALLOON:[ ](.*)/i))return this[_0x7c91ca(0x316)](String(RegExp['$1']));if(_0x30dd60['match'](/FADE IN:[ ](\d+)/i))return this[_0x7c91ca(0x4f8)](Number(RegExp['$1']));if(_0x30dd60['match'](/FADE OUT:[ ](\d+)/i))return this[_0x7c91ca(0x27f)](Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x7c91ca(0x435)]();if(_0x30dd60[_0x7c91ca(0x213)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x7c91ca(0x1a8)]();if(_0x30dd60[_0x7c91ca(0x213)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x7c91ca(0x32e)]();if(_0x30dd60[_0x7c91ca(0x213)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x7c91ca(0x531)]();if(_0x30dd60[_0x7c91ca(0x213)](/HUG:[ ]LEFT/i))return this[_0x7c91ca(0x417)](_0x7c91ca(0x261));if(_0x30dd60[_0x7c91ca(0x213)](/HUG:[ ]RIGHT/i))return this[_0x7c91ca(0x417)]('right');if(_0x30dd60[_0x7c91ca(0x213)](/INDEX:[ ](\d+)/i))return this[_0x7c91ca(0x21f)](Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x4ecbb3=this[_0x7c91ca(0x4d0)]+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0x4ecbb3);}if(_0x30dd60['match'](/JUMP FORWARD:[ ](\d+)/i))return this[_0x7c91ca(0x22a)](Number(RegExp['$1']));if(_0x30dd60['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x7c91ca(0x4b2)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30dd60[_0x7c91ca(0x213)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x2d8565=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1']));return this[_0x7c91ca(0x2b8)](_0x2d8565);}if(_0x30dd60[_0x7c91ca(0x213)](/JUMP TO PLAYER/i))return this[_0x7c91ca(0x2b8)]($gamePlayer);if(_0x30dd60[_0x7c91ca(0x213)](/JUMP TO HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x2a466d=this[_0x7c91ca(0x54c)],_0xa8f88d=this[_0x7c91ca(0x3c7)];return this[_0x7c91ca(0x4b2)](_0x2a466d,_0xa8f88d);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x463668=String(RegExp['$1']),_0x3b3690=this['checkCollisionKeywords'](_0x30dd60);return this['processMoveRouteMoveUntilStop'](_0x463668,_0x3b3690);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x2a2fee=Number(RegExp['$1']),_0x638a8=Number(RegExp['$2']),_0x3e6ff1=this[_0x7c91ca(0x26a)](_0x30dd60);return this[_0x7c91ca(0x26e)](_0x2a2fee,_0x638a8,_0x3e6ff1);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x5e7b2a=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1'])),_0x16a57b=this[_0x7c91ca(0x26a)](_0x30dd60);return this[_0x7c91ca(0x520)](_0x5e7b2a,_0x16a57b);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE TO PLAYER/i)){const _0x2ed061=this['checkCollisionKeywords'](_0x30dd60);return this[_0x7c91ca(0x520)]($gamePlayer,_0x2ed061);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE TO HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x9ef749=this[_0x7c91ca(0x54c)],_0x4b1adb=this[_0x7c91ca(0x3c7)],_0x5d5e71=this['checkCollisionKeywords'](_0x30dd60);return this['processMoveRouteMoveTo'](_0x9ef749,_0x4b1adb,_0x5d5e71);}if(_0x30dd60[_0x7c91ca(0x213)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x1,Number(RegExp['$1']));if(_0x30dd60['match'](/MOVE DOWN:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x2,Number(RegExp['$1']));if(_0x30dd60['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x3,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/MOVE LEFT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x4,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x6,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x7,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/MOVE UP:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x8,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x7c91ca(0x2f6)](0x9,Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/OPACITY:[ ](\d+)([%％])/i)){const _0x5c6168=Math[_0x7c91ca(0x313)](Number(RegExp['$1'])/0x64*0xff);return this[_0x7c91ca(0x4c1)](_0x5c6168['clamp'](0x0,0xff));}if(_0x30dd60[_0x7c91ca(0x213)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x669273=this[_0x7c91ca(0x4ee)]+Math[_0x7c91ca(0x313)](Number(RegExp['$1'])/0x64*0xff);return this[_0x7c91ca(0x4c1)](_0x669273[_0x7c91ca(0x1c2)](0x0,0xff));}if(_0x30dd60[_0x7c91ca(0x213)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x1c880a=this[_0x7c91ca(0x4ee)]+Number(RegExp['$1']);return this[_0x7c91ca(0x4c1)](_0x1c880a['clamp'](0x0,0xff));}if(_0x30dd60['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x7c91ca(0x3b9)](Number(RegExp['$1']));if(_0x30dd60[_0x7c91ca(0x213)](/PATTERN UNLOCK/i))return this[_0x7c91ca(0x228)]=![];if(_0x30dd60[_0x7c91ca(0x213)](/POSE:[ ](.*)/i)){const _0x35be90=String(RegExp['$1'])[_0x7c91ca(0x376)]()['trim']();return this['setPose'](_0x35be90);}if(_0x30dd60[_0x7c91ca(0x213)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x1b3d81=Number(RegExp['$1']),_0x3c2e91=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x1b3d81,_0x3c2e91);}if(_0x30dd60[_0x7c91ca(0x213)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x1afd5a=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1']));return this[_0x7c91ca(0x4da)](_0x1afd5a);}if(_0x30dd60['match'](/STEP TOWARD PLAYER/i))return this[_0x7c91ca(0x4da)]($gamePlayer);if(_0x30dd60[_0x7c91ca(0x213)](/STEP TOWARD HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x424c23=this[_0x7c91ca(0x54c)],_0x57984f=this[_0x7c91ca(0x3c7)];return this[_0x7c91ca(0x292)](_0x424c23,_0x57984f);}if(_0x30dd60[_0x7c91ca(0x213)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x7c91ca(0x321)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30dd60['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x3dee58=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1']));return this[_0x7c91ca(0x1e1)](_0x3dee58);}if(_0x30dd60[_0x7c91ca(0x213)](/STEP AWAY FROM PLAYER/i))return this[_0x7c91ca(0x1e1)]($gamePlayer);if(_0x30dd60[_0x7c91ca(0x213)](/STEP AWAY FROM HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x4c883d=this[_0x7c91ca(0x54c)],_0x2d0964=this[_0x7c91ca(0x3c7)];return this[_0x7c91ca(0x321)](_0x4c883d,_0x2d0964);}if(_0x30dd60['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30dd60[_0x7c91ca(0x213)](/TURN TO EVENT:[ ](\d+)/i)){const _0x17c8ae=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1']));return this[_0x7c91ca(0x356)](_0x17c8ae);}if(_0x30dd60[_0x7c91ca(0x213)](/TURN TO PLAYER/i))return this[_0x7c91ca(0x356)]($gamePlayer);if(_0x30dd60[_0x7c91ca(0x213)](/TURN TO HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x1c5d89=this[_0x7c91ca(0x54c)],_0x363300=this[_0x7c91ca(0x3c7)];return this[_0x7c91ca(0x3b7)](_0x1c5d89,_0x363300);}if(_0x30dd60[_0x7c91ca(0x213)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x7c91ca(0x40b)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30dd60['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x13c634=$gameMap[_0x7c91ca(0x1aa)](Number(RegExp['$1']));return this[_0x7c91ca(0x38d)](_0x13c634);}if(_0x30dd60[_0x7c91ca(0x213)](/TURN AWAY FROM PLAYER/i))return this[_0x7c91ca(0x38d)]($gamePlayer);if(_0x30dd60[_0x7c91ca(0x213)](/TURN AWAY FROM HOME/i)&&this[_0x7c91ca(0x53b)]){const _0xf352d9=this[_0x7c91ca(0x54c)],_0xf2d4cd=this[_0x7c91ca(0x3c7)];return this[_0x7c91ca(0x40b)](_0xf352d9,_0xf2d4cd);}if(_0x30dd60[_0x7c91ca(0x213)](/TURN LOWER LEFT/i))return this[_0x7c91ca(0x39b)](0x1);if(_0x30dd60[_0x7c91ca(0x213)](/TURN LOWER RIGHT/i))return this[_0x7c91ca(0x39b)](0x3);if(_0x30dd60[_0x7c91ca(0x213)](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x30dd60['match'](/TURN UPPER RIGHT/i))return this[_0x7c91ca(0x39b)](0x9);if(_0x30dd60['match'](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x30dd60[_0x7c91ca(0x213)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x7c91ca(0x48d)](RegExp['$1'],RegExp['$2']);if(_0x30dd60[_0x7c91ca(0x213)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x7c91ca(0x41c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x30dd60['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x3ca91b=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x3ca91b);}if(_0x30dd60[_0x7c91ca(0x213)](/TELEPORT TO PLAYER/i))return this[_0x7c91ca(0x458)]($gamePlayer);if(_0x30dd60['match'](/TELEPORT TO HOME/i)&&this[_0x7c91ca(0x53b)]){const _0x38e5df=this[_0x7c91ca(0x54c)],_0x4fa1ca=this['_randomHomeY'];return this['processMoveRouteTeleportTo'](_0x38e5df,_0x4fa1ca);}try{VisuMZ[_0x7c91ca(0x278)][_0x7c91ca(0x257)][_0x7c91ca(0x4df)](this,_0x48a4a8);}catch(_0x57e510){if($gameTemp[_0x7c91ca(0x2d2)]())console['log'](_0x57e510);}},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x50d)]=function(_0x2a45e5){const _0x22c364=_0x452dd7;$gameTemp[_0x22c364(0x284)]([this],_0x2a45e5);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x316)]=function(_0x1c9bce){const _0x3b7068=_0x452dd7;let _0x3b1703=0x0;switch(_0x1c9bce['toUpperCase']()[_0x3b7068(0x1f8)]()){case'!':case _0x3b7068(0x440):_0x3b1703=0x1;break;case'?':case _0x3b7068(0x2fb):_0x3b1703=0x2;break;case'MUSIC':case _0x3b7068(0x46b):case _0x3b7068(0x396):case'MUSIC-NOTE':case _0x3b7068(0x487):_0x3b1703=0x3;break;case _0x3b7068(0x44a):case _0x3b7068(0x46e):_0x3b1703=0x4;break;case _0x3b7068(0x287):_0x3b1703=0x5;break;case _0x3b7068(0x39f):_0x3b1703=0x6;break;case'COBWEB':case'ANNOYED':case'FRUSTRATION':_0x3b1703=0x7;break;case _0x3b7068(0x548):case'...':_0x3b1703=0x8;break;case _0x3b7068(0x1ae):case _0x3b7068(0x3d3):case'LIGHT\x20BULB':case _0x3b7068(0x166):case _0x3b7068(0x31b):_0x3b1703=0x9;break;case'Z':case'ZZ':case _0x3b7068(0x4eb):case _0x3b7068(0x30e):_0x3b1703=0xa;break;case _0x3b7068(0x416):_0x3b1703=0xb;break;case _0x3b7068(0x2d6):_0x3b1703=0xc;break;case'USER-DEFINED\x203':_0x3b1703=0xd;break;case _0x3b7068(0x2e8):_0x3b1703=0xe;break;case'USER-DEFINED\x205':_0x3b1703=0xf;break;}$gameTemp['requestBalloon'](this,_0x3b1703);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x4f8)]=function(_0x1b853a){const _0x519f10=_0x452dd7;_0x1b853a+=this[_0x519f10(0x4ee)],this[_0x519f10(0x4c1)](_0x1b853a[_0x519f10(0x1c2)](0x0,0xff));if(this[_0x519f10(0x4ee)]<0xff)this[_0x519f10(0x3aa)]--;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x27f)]=function(_0x54a7d7){const _0x48b912=_0x452dd7;_0x54a7d7=this[_0x48b912(0x4ee)]-_0x54a7d7,this['setOpacity'](_0x54a7d7[_0x48b912(0x1c2)](0x0,0xff));if(this[_0x48b912(0x4ee)]>0x0)this['_moveRouteIndex']--;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x417)]=function(_0x1926c8){const _0x13c7df=_0x452dd7,_0x5a9254=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x2bbe07=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x13d3a6=this[_0x13c7df(0x1c7)](),_0x136fd6=(_0x1926c8===_0x13c7df(0x261)?_0x5a9254:_0x2bbe07)[_0x13d3a6],_0x11d04a=(_0x1926c8==='left'?_0x2bbe07:_0x5a9254)[_0x13d3a6];if(this[_0x13c7df(0x1ea)](this['x'],this['y'],_0x136fd6))_0x1926c8===_0x13c7df(0x261)?this[_0x13c7df(0x16f)]():this[_0x13c7df(0x3e6)]();else!this[_0x13c7df(0x1ea)](this['x'],this['y'],this[_0x13c7df(0x1c7)]())&&(this['canPass'](this['x'],this['y'],_0x11d04a)?_0x1926c8===_0x13c7df(0x261)?this['turnRight90']():this[_0x13c7df(0x16f)]():this[_0x13c7df(0x2b2)]());this[_0x13c7df(0x1ea)](this['x'],this['y'],this[_0x13c7df(0x1c7)]())&&this['moveForward']();},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x21f)]=function(_0xcc1eaf){const _0x4470fa=_0x452dd7;if(ImageManager[_0x4470fa(0x285)](this['_characterName']))return;_0xcc1eaf=_0xcc1eaf['clamp'](0x0,0x7),this[_0x4470fa(0x4ff)](this[_0x4470fa(0x18e)],_0xcc1eaf);},Game_Character['prototype']['processMoveRouteJumpForward']=function(_0x4e6758){const _0x267ac7=_0x452dd7;switch(this[_0x267ac7(0x1c7)]()){case 0x1:this[_0x267ac7(0x2c6)](-_0x4e6758,_0x4e6758);break;case 0x2:this[_0x267ac7(0x2c6)](0x0,_0x4e6758);break;case 0x3:this[_0x267ac7(0x2c6)](_0x4e6758,_0x4e6758);break;case 0x4:this['jump'](-_0x4e6758,0x0);break;case 0x6:this[_0x267ac7(0x2c6)](_0x4e6758,0x0);break;case 0x7:this[_0x267ac7(0x2c6)](-_0x4e6758,-_0x4e6758);break;case 0x8:this[_0x267ac7(0x2c6)](0x0,-_0x4e6758);break;case 0x9:this['jump'](_0x4e6758,-_0x4e6758);break;}},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x4b2)]=function(_0x28198a,_0x20554b){const _0x2d51e6=_0x452dd7,_0x291bbb=Math[_0x2d51e6(0x313)](_0x28198a-this['x']),_0x9039a3=Math[_0x2d51e6(0x313)](_0x20554b-this['y']);this[_0x2d51e6(0x2c6)](_0x291bbb,_0x9039a3);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x2b8)]=function(_0x4be13f){const _0x20979c=_0x452dd7;if(_0x4be13f)this[_0x20979c(0x4b2)](_0x4be13f['x'],_0x4be13f['y']);},Game_Character[_0x452dd7(0x31a)]['processMoveRouteStepTo']=function(_0x19f591,_0x5cf52b,_0x55b66e){const _0x51b2a6=_0x452dd7;let _0xc7f253=0x0;if(_0x55b66e)$gameTemp[_0x51b2a6(0x4bc)]=!![];$gameMap[_0x51b2a6(0x4fd)]()?_0xc7f253=this['findDiagonalDirectionTo'](_0x19f591,_0x5cf52b):_0xc7f253=this[_0x51b2a6(0x326)](_0x19f591,_0x5cf52b);if(_0x55b66e)$gameTemp[_0x51b2a6(0x4bc)]=![];this[_0x51b2a6(0x1e5)](_0xc7f253),this[_0x51b2a6(0x1d4)](!![]);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x4da)]=function(_0x5d7bcb){if(_0x5d7bcb)this['processMoveRouteStepTo'](_0x5d7bcb['x'],_0x5d7bcb['y']);},Game_Character['prototype'][_0x452dd7(0x219)]=function(_0x468463,_0x4fec43){const _0x3e087f=_0x452dd7,_0x1bae40=this['deltaXFrom'](_0x468463),_0x5e04ec=this[_0x3e087f(0x528)](_0x4fec43);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x26a)]=function(_0x62869a){const _0x3a99fe=_0x452dd7;if(_0x62869a['match'](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x62869a[_0x3a99fe(0x213)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1bd)]=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x1c0)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x1c0)]=function(_0x5a6518,_0x1179d7){const _0x5a210b=_0x452dd7;if($gameTemp[_0x5a210b(0x4bc)])return![];return VisuMZ[_0x5a210b(0x278)]['Game_Event_isCollidedWithPlayerCharacters']['call'](this,_0x5a6518,_0x1179d7);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x2e3)]=function(_0x1ca7f5,_0x53915a){const _0x2d8a90=_0x452dd7,_0x2f6bda=['',_0x2d8a90(0x2b6),_0x2d8a90(0x17a),_0x2d8a90(0x250),_0x2d8a90(0x4e8),'',_0x2d8a90(0x4d7),_0x2d8a90(0x243),'UP','UPPER\x20RIGHT'],_0x56ab7c=_0x2f6bda['indexOf'](_0x1ca7f5[_0x2d8a90(0x376)]()['trim']());if(_0x56ab7c<=0x0)return;if(_0x53915a)$gameTemp[_0x2d8a90(0x4bc)]=!![];if(this['canPass'](this['x'],this['y'],_0x56ab7c)){if(_0x53915a)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x2d8a90(0x1e5)](_0x56ab7c),this[_0x2d8a90(0x3aa)]-=0x1;}if(_0x53915a)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x26e)]=function(_0x17daed,_0x5ab1df,_0x575940){const _0x447819=_0x452dd7;this['processMoveRouteStepTo'](_0x17daed,_0x5ab1df,_0x575940);if(this['x']!==_0x17daed||this['y']!==_0x5ab1df)this[_0x447819(0x3aa)]--;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x520)]=function(_0x2c1773,_0x21218){const _0x52f9fb=_0x452dd7;if(_0x2c1773)this[_0x52f9fb(0x26e)](_0x2c1773['x'],_0x2c1773['y'],_0x21218);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x2f6)]=function(_0x2b7961,_0x469c42){const _0x561408=_0x452dd7;_0x469c42=_0x469c42||0x0;const _0x1cada6={'code':0x1,'indent':null,'parameters':[]};_0x1cada6[_0x561408(0x28a)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x2b7961],this['_moveRoute'][_0x561408(0x421)][this[_0x561408(0x3aa)]]['parameters'][0x0]='';while(_0x469c42--){this[_0x561408(0x232)][_0x561408(0x421)][_0x561408(0x359)](this[_0x561408(0x3aa)]+0x1,0x0,_0x1cada6);}},Game_Character['prototype']['processMoveRoutePatternLock']=function(_0x174942){const _0xc8dab1=_0x452dd7;this[_0xc8dab1(0x228)]=!![],this[_0xc8dab1(0x342)](_0x174942);},Game_Character[_0x452dd7(0x31a)]['processMoveRouteSelfSwitch']=function(_0x3344fb,_0x5195da){const _0x35ef35=_0x452dd7;if(this===$gamePlayer)return;const _0x6d6a8d=[this[_0x35ef35(0x2be)],this[_0x35ef35(0x208)],'A'];_0x3344fb[_0x35ef35(0x213)](/\b[ABCD]\b/i)?_0x6d6a8d[0x2]=String(_0x3344fb)[_0x35ef35(0x1b4)](0x0)[_0x35ef35(0x376)]()[_0x35ef35(0x1f8)]():_0x6d6a8d[0x2]=_0x35ef35(0x52e)['format'](_0x3344fb);switch(_0x5195da['toUpperCase']()['trim']()){case'ON':case _0x35ef35(0x3cb):$gameSelfSwitches[_0x35ef35(0x3af)](_0x6d6a8d,!![]);break;case _0x35ef35(0x360):case'FALSE':$gameSelfSwitches[_0x35ef35(0x3af)](_0x6d6a8d,![]);break;case _0x35ef35(0x185):$gameSelfSwitches['setValue'](_0x6d6a8d,!$gameSelfSwitches[_0x35ef35(0x22b)](_0x6d6a8d));break;}},Game_Character['prototype'][_0x452dd7(0x48d)]=function(_0x4c0b42,_0x513e55){const _0x143ca2=_0x452dd7;if(this===$gamePlayer)return;const _0x236604=[this[_0x143ca2(0x2be)],this[_0x143ca2(0x208)],_0x143ca2(0x297)['format'](_0x4c0b42)];$gameSelfSwitches[_0x143ca2(0x3af)](_0x236604,Number(_0x513e55));},Game_Character['prototype'][_0x452dd7(0x41c)]=function(_0x1229f8,_0x1f7bac){const _0x55d78e=_0x452dd7;this[_0x55d78e(0x48c)](_0x1229f8,_0x1f7bac);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x458)]=function(_0x50847d){const _0x5a5f04=_0x452dd7;if(_0x50847d)this[_0x5a5f04(0x41c)](_0x50847d['x'],_0x50847d['y']);},Game_Character['prototype'][_0x452dd7(0x3e6)]=function(){const _0xf979c9=_0x452dd7;switch(this[_0xf979c9(0x1c7)]()){case 0x1:this[_0xf979c9(0x39b)](0x7);break;case 0x2:this[_0xf979c9(0x39b)](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0xf979c9(0x39b)](0x2);break;case 0x7:this[_0xf979c9(0x39b)](0x9);break;case 0x8:this[_0xf979c9(0x39b)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x16f)]=function(){const _0x47296c=_0x452dd7;switch(this[_0x47296c(0x1c7)]()){case 0x1:this[_0x47296c(0x39b)](0x3);break;case 0x2:this[_0x47296c(0x39b)](0x6);break;case 0x3:this[_0x47296c(0x39b)](0x9);break;case 0x4:this[_0x47296c(0x39b)](0x2);break;case 0x6:this[_0x47296c(0x39b)](0x8);break;case 0x7:this[_0x47296c(0x39b)](0x1);break;case 0x8:this[_0x47296c(0x39b)](0x4);break;case 0x9:this[_0x47296c(0x39b)](0x7);break;}},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x33e)]=function(_0x2b5dd0,_0x1d6a5a,_0x4e0388){const _0x2d5b0d=_0x452dd7,_0x574efc=this['deltaXFrom'](_0x2b5dd0),_0x4b5a86=this[_0x2d5b0d(0x528)](_0x1d6a5a);if($gameMap[_0x2d5b0d(0x4fd)]()){if(_0x4e0388||this['isSpriteVS8dir']()){if(_0x574efc>0x0&&_0x4b5a86<0x0)return 0x1;if(_0x574efc<0x0&&_0x4b5a86<0x0)return 0x3;if(_0x574efc>0x0&&_0x4b5a86>0x0)return 0x7;if(_0x574efc<0x0&&_0x4b5a86>0x0)return 0x9;}}if(Math[_0x2d5b0d(0x4cd)](_0x574efc)>Math['abs'](_0x4b5a86))return _0x574efc>0x0?0x4:0x6;else{if(_0x4b5a86!==0x0)return _0x4b5a86>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype']['getDirectionFromPoint']=function(_0x2065df,_0x954e9b,_0x5cb4c7){const _0xdb0032=_0x452dd7,_0x4fef7e=this[_0xdb0032(0x425)](_0x2065df),_0x57957c=this['deltaYFrom'](_0x954e9b);if($gameMap[_0xdb0032(0x4fd)]()){if(_0x5cb4c7||this[_0xdb0032(0x1a2)]()){if(_0x4fef7e>0x0&&_0x57957c<0x0)return 0x9;if(_0x4fef7e<0x0&&_0x57957c<0x0)return 0x7;if(_0x4fef7e>0x0&&_0x57957c>0x0)return 0x3;if(_0x4fef7e<0x0&&_0x57957c>0x0)return 0x1;}}if(Math['abs'](_0x4fef7e)>Math['abs'](_0x57957c))return _0x4fef7e>0x0?0x6:0x4;else{if(_0x57957c!==0x0)return _0x57957c>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x3b7)]=function(_0x3e01db,_0x4ff2e6){const _0x26fc54=_0x452dd7,_0x149a81=this['getDirectionToPoint'](_0x3e01db,_0x4ff2e6,!![]);if(_0x149a81)this[_0x26fc54(0x1e5)](_0x149a81);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x321)]=function(_0x594b3d,_0x5479f5){const _0x4355fb=_0x452dd7,_0x254510=this[_0x4355fb(0x29d)](_0x594b3d,_0x5479f5,!![]);if(_0x254510)this[_0x4355fb(0x1e5)](_0x254510);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x389)]=function(_0x5d2b96,_0x29bb31){const _0x1e3487=_0x452dd7,_0x16543c=this[_0x1e3487(0x33e)](_0x5d2b96,_0x29bb31,![]);if(_0x16543c)this[_0x1e3487(0x39b)](_0x16543c);},Game_Character['prototype'][_0x452dd7(0x40b)]=function(_0x3e06de,_0x1d8112){const _0x16f771=_0x452dd7,_0x4f08ac=this[_0x16f771(0x29d)](_0x3e06de,_0x1d8112,![]);if(_0x4f08ac)this[_0x16f771(0x39b)](_0x4f08ac);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x46d)]=function(_0x14a779){const _0x5cd9ba=_0x452dd7;if(_0x14a779)this[_0x5cd9ba(0x3b7)](_0x14a779['x'],_0x14a779['y']);},Game_Character[_0x452dd7(0x31a)]['moveAwayFromCharacter']=function(_0x459d8d){const _0xb4f22f=_0x452dd7;if(_0x459d8d)this[_0xb4f22f(0x321)](_0x459d8d['x'],_0x459d8d['y']);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x356)]=function(_0xc1f4ff){const _0x3e74c4=_0x452dd7;if(_0xc1f4ff)this[_0x3e74c4(0x389)](_0xc1f4ff['x'],_0xc1f4ff['y']);},Game_Character[_0x452dd7(0x31a)][_0x452dd7(0x38d)]=function(_0x59f204){if(_0x59f204)this['turnAwayFromPoint'](_0x59f204['x'],_0x59f204['y']);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x52c)]=Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x4b0)],Game_Player['prototype']['isDashing']=function(){const _0x2b8873=_0x452dd7;if(this['_forceDashing'])return!![];return VisuMZ['EventsMoveCore'][_0x2b8873(0x52c)]['call'](this);},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x2bf)]=function(){const _0x1fcfb3=_0x452dd7;return this[_0x1fcfb3(0x4b0)]()&&(this[_0x1fcfb3(0x314)]()||this['getInputDirection']()!==0x0&&this['canPass'](this['_x'],this['_y'],this[_0x1fcfb3(0x3fd)]())||$gameTemp[_0x1fcfb3(0x358)]());},VisuMZ['EventsMoveCore'][_0x452dd7(0x397)]=Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x3fd)],Game_Player['prototype'][_0x452dd7(0x3fd)]=function(){const _0x268656=_0x452dd7;return $gameMap['isSupportDiagonalMovement']()?this['getInputDir8']():VisuMZ['EventsMoveCore'][_0x268656(0x397)][_0x268656(0x4df)](this);},Game_Player[_0x452dd7(0x31a)]['getInputDir8']=function(){const _0x372e6f=_0x452dd7;return Input[_0x372e6f(0x3e1)];},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x3d6)]=function(){const _0x26aaa9=_0x452dd7;if($gameSystem[_0x26aaa9(0x4e5)]())return 0x0;if(!this['isMoving']()&&this[_0x26aaa9(0x391)]()){let _0x4ded3a=this[_0x26aaa9(0x3fd)]();if(_0x4ded3a>0x0)$gameTemp[_0x26aaa9(0x215)]();else{if($gameTemp[_0x26aaa9(0x358)]()){const _0x7db7e9=$gameTemp[_0x26aaa9(0x469)](),_0x2a405d=$gameTemp['destinationY'](),_0x7425b9=$gameMap['isSupportDiagonalMovement'](),_0x2b6f86=$gameMap['isPassableByAnyDirection'](_0x7db7e9,_0x2a405d),_0x525861=$gameMap[_0x26aaa9(0x54d)](_0x7db7e9,_0x2a405d)[_0x26aaa9(0x36a)]<=0x0;_0x7425b9&&_0x2b6f86&&_0x525861?_0x4ded3a=this[_0x26aaa9(0x363)](_0x7db7e9,_0x2a405d):_0x4ded3a=this[_0x26aaa9(0x326)](_0x7db7e9,_0x2a405d);}}_0x4ded3a>0x0?(this[_0x26aaa9(0x271)]=this[_0x26aaa9(0x271)]||0x0,this[_0x26aaa9(0x328)]()?this[_0x26aaa9(0x39b)](_0x4ded3a):this[_0x26aaa9(0x479)](_0x4ded3a),this['_inputTime']++):this['_inputTime']=0x0;}},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x328)]=function(){const _0xb7d43e=_0x452dd7,_0x4f5b52=VisuMZ[_0xb7d43e(0x278)][_0xb7d43e(0x34e)][_0xb7d43e(0x36e)];if(!_0x4f5b52['EnableTurnInPlace'])return![];if($gameTemp[_0xb7d43e(0x358)]())return![];if(this['isDashing']()||this['isMoving']()||this[_0xb7d43e(0x371)]())return![];return this[_0xb7d43e(0x271)]<_0x4f5b52[_0xb7d43e(0x4cc)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x456)]=Game_Player['prototype'][_0x452dd7(0x479)],Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x479)]=function(_0x5b61dd){const _0x423b25=_0x452dd7;$gameMap[_0x423b25(0x4fd)]()?this[_0x423b25(0x1e5)](_0x5b61dd):VisuMZ['EventsMoveCore'][_0x423b25(0x456)][_0x423b25(0x4df)](this,_0x5b61dd);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x385)]=Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x2eb)],Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x2eb)]=function(_0x3a34a7,_0x53aa2a,_0x260c0e){const _0x35c851=_0x452dd7;if($gameMap['isRegionAllowPass'](_0x3a34a7,_0x53aa2a,_0x260c0e,_0x35c851(0x2ef)))return this[_0x35c851(0x3d2)]()&&this['vehicle']()?this[_0x35c851(0x179)]()[_0x35c851(0x2eb)](_0x3a34a7,_0x53aa2a,_0x260c0e):!![];if($gameMap[_0x35c851(0x535)](_0x3a34a7,_0x53aa2a,_0x260c0e,_0x35c851(0x2ef)))return![];return VisuMZ[_0x35c851(0x278)][_0x35c851(0x385)]['call'](this,_0x3a34a7,_0x53aa2a,_0x260c0e);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x36c)]=Game_Player[_0x452dd7(0x31a)]['checkEventTriggerHere'],Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x329)]=function(_0x39f438){const _0x278f73=_0x452dd7;VisuMZ[_0x278f73(0x278)][_0x278f73(0x36c)][_0x278f73(0x4df)](this,_0x39f438);if(this['canStartLocalEvents']()){this[_0x278f73(0x519)](_0x39f438);if(_0x39f438[_0x278f73(0x38b)](0x0)&&this['startMapCommonEventOnOKTarget']()==='standing')this[_0x278f73(0x3ac)](this['x'],this['y']);else(_0x39f438[_0x278f73(0x38b)](0x1)||_0x39f438['includes'](0x2))&&this[_0x278f73(0x471)]();}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x272)],Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x272)]=function(_0xb11087){const _0x4aa3ba=_0x452dd7;VisuMZ['EventsMoveCore'][_0x4aa3ba(0x45a)]['call'](this,_0xb11087);if(this[_0x4aa3ba(0x4c4)]()&&_0xb11087[_0x4aa3ba(0x38b)](0x0)&&this[_0x4aa3ba(0x186)]()==='front'){const _0x53ce10=this['direction'](),_0x21b886=$gameMap[_0x4aa3ba(0x4d5)](this['x'],_0x53ce10),_0x3614c6=$gameMap[_0x4aa3ba(0x4b4)](this['y'],_0x53ce10);this[_0x4aa3ba(0x3ac)](_0x21b886,_0x3614c6);}},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x519)]=function(_0x27c234){const _0x16649e=_0x452dd7;if($gameMap[_0x16649e(0x23a)]())return;if($gameMap[_0x16649e(0x2c2)]())return;const _0x2bbc06=$gameMap[_0x16649e(0x207)]();for(const _0x3ede6f of _0x2bbc06){if(!_0x3ede6f)continue;if(!_0x3ede6f[_0x16649e(0x24d)](_0x27c234))continue;if(this['meetActivationRegionConditions'](_0x3ede6f))return _0x3ede6f[_0x16649e(0x1d7)]();if(this[_0x16649e(0x28b)](_0x3ede6f))return _0x3ede6f[_0x16649e(0x1d7)]();}},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x436)]=function(_0x14da2a){const _0x355587=_0x452dd7;if($gameMap['isEventRunning']())return![];if($gameMap[_0x355587(0x2c2)]())return![];return _0x14da2a[_0x355587(0x524)]()[_0x355587(0x38b)](this[_0x355587(0x177)]());},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x28b)]=function(_0x311973){const _0x35e0e2=_0x452dd7;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x35e0e2(0x40c),'region'][_0x35e0e2(0x38b)](_0x311973[_0x35e0e2(0x350)]()))return![];const _0x126f9a=_0x311973[_0x35e0e2(0x350)](),_0x56c46e=_0x311973[_0x35e0e2(0x483)]();switch(_0x126f9a){case _0x35e0e2(0x318):const _0x2755d2=$gameMap[_0x35e0e2(0x49b)](this['x'],this['y'],_0x311973['x'],_0x311973['y']);return _0x311973[_0x35e0e2(0x483)]()>=_0x2755d2;break;case _0x35e0e2(0x42e):return _0x56c46e>=Math[_0x35e0e2(0x4cd)](_0x311973['deltaXFrom'](this['x']))&&_0x56c46e>=Math[_0x35e0e2(0x4cd)](_0x311973['deltaYFrom'](this['y']));break;case'row':return _0x56c46e>=Math[_0x35e0e2(0x4cd)](_0x311973[_0x35e0e2(0x528)](this['y']));break;case _0x35e0e2(0x375):return _0x56c46e>=Math[_0x35e0e2(0x4cd)](_0x311973[_0x35e0e2(0x425)](this['x']));break;case _0x35e0e2(0x3ba):return![];break;}},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x3ac)]=function(_0x5e6ad2,_0x151da8){const _0x5a6149=_0x452dd7;if($gameMap[_0x5a6149(0x23a)]())return;if($gameMap[_0x5a6149(0x2c2)]())return;let _0x14f95e=VisuMZ['EventsMoveCore'][_0x5a6149(0x34e)][_0x5a6149(0x282)],_0x34717a=$gameMap['regionId'](_0x5e6ad2,_0x151da8);const _0x470efc='Region%1'[_0x5a6149(0x2c4)](_0x34717a);_0x14f95e[_0x470efc]&&$gameTemp[_0x5a6149(0x248)](_0x14f95e[_0x470efc]);},Game_Player[_0x452dd7(0x31a)]['startMapCommonEventOnOKTarget']=function(){const _0x5694e2=_0x452dd7;return VisuMZ[_0x5694e2(0x278)][_0x5694e2(0x34e)][_0x5694e2(0x1e0)];},Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x471)]=function(){const _0x23c4be=_0x452dd7;if($gameMap['isEventRunning']())return;if($gameMap[_0x23c4be(0x2c2)]())return;let _0x37aa7f=VisuMZ[_0x23c4be(0x278)][_0x23c4be(0x34e)][_0x23c4be(0x544)];const _0x359aea=_0x23c4be(0x4b6)[_0x23c4be(0x2c4)](this[_0x23c4be(0x177)]());_0x37aa7f[_0x359aea]&&$gameTemp[_0x23c4be(0x248)](_0x37aa7f[_0x359aea]);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x497)]=Game_Player[_0x452dd7(0x31a)][_0x452dd7(0x3da)],Game_Player[_0x452dd7(0x31a)]['increaseSteps']=function(){const _0x1d8741=_0x452dd7;VisuMZ[_0x1d8741(0x278)]['Game_Player_increaseSteps'][_0x1d8741(0x4df)](this),VisuMZ[_0x1d8741(0x1fb)](0x0);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x432)]=Game_Follower[_0x452dd7(0x31a)]['initialize'],Game_Follower[_0x452dd7(0x31a)][_0x452dd7(0x4bb)]=function(_0x33c93c){const _0xac7ed1=_0x452dd7;VisuMZ[_0xac7ed1(0x278)][_0xac7ed1(0x432)][_0xac7ed1(0x4df)](this,_0x33c93c),this[_0xac7ed1(0x295)]=![];},Game_Follower[_0x452dd7(0x31a)][_0x452dd7(0x4b0)]=function(){const _0x3b6682=_0x452dd7;return $gamePlayer[_0x3b6682(0x4b0)]();},Game_Follower['prototype'][_0x452dd7(0x2bf)]=function(){return $gamePlayer['isDashingAndMoving']();},Game_Follower[_0x452dd7(0x31a)][_0x452dd7(0x217)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x452dd7(0x31a)]['setChaseOff']=function(_0x2e58dd){const _0x489ec6=_0x452dd7;this[_0x489ec6(0x295)]=_0x2e58dd;},VisuMZ['EventsMoveCore'][_0x452dd7(0x494)]=Game_Follower[_0x452dd7(0x31a)][_0x452dd7(0x270)],Game_Follower['prototype'][_0x452dd7(0x270)]=function(_0x3b4aae){const _0x12f70b=_0x452dd7;if(this[_0x12f70b(0x295)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ[_0x12f70b(0x278)][_0x12f70b(0x494)][_0x12f70b(0x4df)](this,_0x3b4aae);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x18f)]=Game_Vehicle[_0x452dd7(0x31a)][_0x452dd7(0x2eb)],Game_Vehicle[_0x452dd7(0x31a)]['isMapPassable']=function(_0x36177c,_0x12702d,_0x40559c){const _0x5bf010=_0x452dd7;if($gameMap[_0x5bf010(0x545)](_0x36177c,_0x12702d,_0x40559c,this[_0x5bf010(0x171)]))return!![];if($gameMap[_0x5bf010(0x535)](_0x36177c,_0x12702d,_0x40559c,this[_0x5bf010(0x171)]))return![];return VisuMZ[_0x5bf010(0x278)]['Game_Vehicle_isMapPassable']['call'](this,_0x36177c,_0x12702d,_0x40559c);},Game_Vehicle[_0x452dd7(0x31a)][_0x452dd7(0x3f2)]=function(_0x53503f,_0x422f57,_0x115a14){const _0x55286f=_0x452dd7;if($gameMap[_0x55286f(0x545)](_0x53503f,_0x422f57,_0x115a14,this['_type']))return!![];if($gameMap[_0x55286f(0x535)](_0x53503f,_0x422f57,_0x115a14,this[_0x55286f(0x171)]))return![];return VisuMZ[_0x55286f(0x278)][_0x55286f(0x500)]['call']($gamePlayer,_0x53503f,_0x422f57,_0x115a14);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x384)]=Game_Vehicle[_0x452dd7(0x31a)][_0x452dd7(0x17c)],Game_Vehicle[_0x452dd7(0x31a)][_0x452dd7(0x17c)]=function(_0x117e9f,_0x4334ab,_0xbf54a2){const _0x46345d=_0x452dd7;if($gameMap[_0x46345d(0x305)](_0x117e9f,_0x4334ab,_0xbf54a2,this['_type']))return!![];const _0x43c7a1=this[_0x46345d(0x171)][_0x46345d(0x1b4)](0x0)['toUpperCase']()+this[_0x46345d(0x171)]['slice'](0x1),_0x4e415c=_0x46345d(0x18b)[_0x46345d(0x2c4)](_0x43c7a1);return VisuMZ['EventsMoveCore']['Settings'][_0x46345d(0x27b)][_0x4e415c]?![]:VisuMZ['EventsMoveCore'][_0x46345d(0x384)][_0x46345d(0x4df)](this,_0x117e9f,_0x4334ab,_0xbf54a2);},VisuMZ['EventsMoveCore'][_0x452dd7(0x2fe)]=Game_Vehicle[_0x452dd7(0x31a)][_0x452dd7(0x32b)],Game_Vehicle['prototype'][_0x452dd7(0x32b)]=function(){const _0x3cdfd0=_0x452dd7;VisuMZ[_0x3cdfd0(0x278)][_0x3cdfd0(0x2fe)]['call'](this);const _0x519e0b=VisuMZ[_0x3cdfd0(0x278)]['Settings'][_0x3cdfd0(0x36e)];if(this[_0x3cdfd0(0x462)]()){if(_0x519e0b[_0x3cdfd0(0x3a4)])this['setMoveSpeed'](_0x519e0b[_0x3cdfd0(0x3a4)]);}else{if(this[_0x3cdfd0(0x22d)]()){if(_0x519e0b[_0x3cdfd0(0x4f3)])this[_0x3cdfd0(0x2aa)](_0x519e0b[_0x3cdfd0(0x4f3)]);}else{if(this[_0x3cdfd0(0x3a0)]()){if(_0x519e0b['AirshipSpeed'])this['setMoveSpeed'](_0x519e0b[_0x3cdfd0(0x517)]);}}}},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x2fc)]=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4bb)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4bb)]=function(_0x3c69b6,_0x2a6928){const _0x396d06=_0x452dd7;VisuMZ['EventsMoveCore'][_0x396d06(0x2fc)][_0x396d06(0x4df)](this,_0x3c69b6,_0x2a6928),this[_0x396d06(0x333)](),this[_0x396d06(0x3c4)](),this['restoreSavedEventPosition']();},Game_Map['prototype'][_0x452dd7(0x24e)]=function(_0x1d378f,_0x1bbc2d){const _0x1eba4d=_0x452dd7;return _0x1d378f===$gameMap[_0x1eba4d(0x507)]()?$dataMap['events'][_0x1bbc2d]:VisuMZ[_0x1eba4d(0x201)][_0x1d378f][_0x1eba4d(0x207)][_0x1bbc2d];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x533)]=Game_Event[_0x452dd7(0x31a)]['event'],Game_Event[_0x452dd7(0x31a)]['event']=function(){const _0x1914b6=_0x452dd7;if(this[_0x1914b6(0x252)]!==undefined){const _0xa04b7a=this['_eventMorphData'][_0x1914b6(0x507)],_0x5774cc=this['_eventMorphData'][_0x1914b6(0x53b)];return $gameMap[_0x1914b6(0x24e)](_0xa04b7a,_0x5774cc);}if(this[_0x1914b6(0x2ea)]!==undefined){const _0x25d4b=this[_0x1914b6(0x2ea)][_0x1914b6(0x507)],_0x276fb2=this[_0x1914b6(0x2ea)]['eventId'];return $gameMap[_0x1914b6(0x24e)](_0x25d4b,_0x276fb2);}if(this['_eventSpawnData']!==undefined){const _0x20413b=this[_0x1914b6(0x3fa)][_0x1914b6(0x507)],_0x370c7d=this[_0x1914b6(0x3fa)][_0x1914b6(0x53b)];return $gameMap[_0x1914b6(0x24e)](_0x20413b,_0x370c7d);}if($gameTemp[_0x1914b6(0x24c)]!==undefined){const _0x5e81b9=$gameTemp[_0x1914b6(0x24c)]['mapId'],_0x4a9667=$gameTemp['_spawnData'][_0x1914b6(0x53b)];return $gameMap[_0x1914b6(0x24e)](_0x5e81b9,_0x4a9667);}return VisuMZ[_0x1914b6(0x278)][_0x1914b6(0x533)][_0x1914b6(0x4df)](this);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x388)]=function(_0x3454a0,_0x800d3e){const _0x19e73f=_0x452dd7;if(_0x3454a0===0x0||_0x800d3e===0x0)return![];if(!VisuMZ['PreloadedMaps'][_0x3454a0]&&_0x3454a0!==$gameMap[_0x19e73f(0x507)]())return $gameTemp[_0x19e73f(0x2d2)]()&&console[_0x19e73f(0x4bd)](_0x19e73f(0x317)[_0x19e73f(0x2c4)](_0x3454a0)),![];return!![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x320)]=Game_Event[_0x452dd7(0x31a)]['start'],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x1d7)]=function(){const _0x4b0140=_0x452dd7;VisuMZ[_0x4b0140(0x278)]['Game_Event_start']['call'](this),Imported[_0x4b0140(0x4c3)]&&Input[_0x4b0140(0x401)](VisuMZ[_0x4b0140(0x2ab)]['Settings']['General'][_0x4b0140(0x539)])&&Input['clear']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x333)]=function(){const _0x5a2771=_0x452dd7,_0x22404b=this[_0x5a2771(0x1aa)]()[_0x5a2771(0x3e5)];if(_0x22404b==='')return;if(DataManager[_0x5a2771(0x346)]()||DataManager[_0x5a2771(0x265)]())return;const _0x454ccd=VisuMZ['EventsMoveCore']['Settings'][_0x5a2771(0x449)];let _0x225475=null,_0x48af6a=0x0,_0x4a3958=0x0;if(_0x22404b[_0x5a2771(0x213)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x48af6a=Number(RegExp['$1']),_0x4a3958=Number(RegExp['$2']);else{if(_0x22404b['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x48af6a=Number(RegExp['$1']),_0x4a3958=Number(RegExp['$2']);else{if(_0x22404b['match'](/<COPY EVENT:[ ](.*?)>/i)){const _0x1a76d4=String(RegExp['$1'])[_0x5a2771(0x376)]()[_0x5a2771(0x1f8)]();_0x225475=VisuMZ[_0x5a2771(0x53f)][_0x1a76d4];if(!_0x225475)return;_0x48af6a=_0x225475[_0x5a2771(0x509)],_0x4a3958=_0x225475[_0x5a2771(0x50f)];}}}if(!this[_0x5a2771(0x388)](_0x48af6a,_0x4a3958))return;_0x454ccd[_0x5a2771(0x308)][_0x5a2771(0x4df)](this,_0x48af6a,_0x4a3958,this);if(_0x225475)_0x225475['PreCopyJS'][_0x5a2771(0x4df)](this,_0x48af6a,_0x4a3958,this);this[_0x5a2771(0x2ea)]={'mapId':_0x48af6a,'eventId':_0x4a3958},this[_0x5a2771(0x16a)]=-0x2,this[_0x5a2771(0x226)](),_0x454ccd['PostCopyJS'][_0x5a2771(0x4df)](this,_0x48af6a,_0x4a3958,this);if(_0x225475)_0x225475[_0x5a2771(0x1d1)][_0x5a2771(0x4df)](this,_0x48af6a,_0x4a3958,this);$gameMap[_0x5a2771(0x22f)]();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x3c4)]=function(){const _0x5194ea=_0x452dd7,_0x3c7a4e=$gameSystem[_0x5194ea(0x41f)](this);if(!_0x3c7a4e)return;const _0x29c8f6=_0x3c7a4e['template'][_0x5194ea(0x376)]()['trim']();_0x29c8f6!==_0x5194ea(0x323)?this[_0x5194ea(0x4a0)](_0x29c8f6,!![]):this[_0x5194ea(0x3b6)](_0x3c7a4e[_0x5194ea(0x507)],_0x3c7a4e[_0x5194ea(0x53b)],!![]);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x3b6)]=function(_0x5a8254,_0x3e431d,_0x1c413e){const _0x520908=_0x452dd7;if(!this[_0x520908(0x388)](_0x5a8254,_0x3e431d))return;const _0x1c69e1=VisuMZ[_0x520908(0x278)][_0x520908(0x34e)][_0x520908(0x449)];if(!_0x1c413e)_0x1c69e1[_0x520908(0x2f7)]['call'](this,_0x5a8254,_0x3e431d,this);this[_0x520908(0x252)]={'mapId':_0x5a8254,'eventId':_0x3e431d},this[_0x520908(0x16a)]=-0x2,this[_0x520908(0x226)]();if(!_0x1c413e)_0x1c69e1[_0x520908(0x312)][_0x520908(0x4df)](this,_0x5a8254,_0x3e431d,this);$gameMap[_0x520908(0x22f)]();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4a0)]=function(_0x217990,_0x37bd30){const _0x28b245=_0x452dd7;_0x217990=_0x217990[_0x28b245(0x376)]()[_0x28b245(0x1f8)]();const _0x185a01=VisuMZ[_0x28b245(0x53f)][_0x217990];if(!_0x185a01)return;const _0x292353=_0x185a01[_0x28b245(0x509)],_0x464381=_0x185a01[_0x28b245(0x50f)];if(!this[_0x28b245(0x388)](_0x292353,_0x464381))return;if(!_0x37bd30)_0x185a01[_0x28b245(0x2f7)][_0x28b245(0x4df)](this,_0x292353,_0x464381,this);this[_0x28b245(0x3b6)](_0x292353,_0x464381,_0x37bd30);if(!_0x37bd30)_0x185a01[_0x28b245(0x312)][_0x28b245(0x4df)](this,_0x292353,_0x464381,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x422)]=function(){const _0x5aa8db=_0x452dd7;this[_0x5aa8db(0x252)]=undefined,this[_0x5aa8db(0x16a)]=-0x2,this['refresh']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4b3)]=function(_0x3fdb3d){const _0x494f4e=_0x452dd7,_0x339933=VisuMZ['EventsMoveCore'][_0x494f4e(0x34e)][_0x494f4e(0x449)],_0x4e7216=_0x3fdb3d[_0x494f4e(0x17f)][_0x494f4e(0x376)]()[_0x494f4e(0x1f8)](),_0x42315a=!['',_0x494f4e(0x323)]['includes'](_0x4e7216);let _0x24b2bb=0x0,_0x1dcbae=0x0;if(_0x42315a){const _0xc876e2=VisuMZ['EventTemplates'][_0x4e7216];if(!_0xc876e2)return;_0x24b2bb=_0xc876e2[_0x494f4e(0x509)],_0x1dcbae=_0xc876e2['EventID'];}else _0x24b2bb=_0x3fdb3d[_0x494f4e(0x507)],_0x1dcbae=_0x3fdb3d[_0x494f4e(0x53b)];if(!this[_0x494f4e(0x388)](_0x24b2bb,_0x1dcbae))return;if(_0x42315a){const _0x5f59f2=VisuMZ[_0x494f4e(0x53f)][_0x4e7216];_0x5f59f2['PreSpawnJS']['call'](this,_0x24b2bb,_0x1dcbae,this);}_0x339933[_0x494f4e(0x1fe)]['call'](this,_0x24b2bb,_0x1dcbae,this),this[_0x494f4e(0x3fa)]=_0x3fdb3d,this[_0x494f4e(0x16a)]=-0x2,this[_0x494f4e(0x2be)]=$gameMap[_0x494f4e(0x507)](),this[_0x494f4e(0x208)]=_0x3fdb3d[_0x494f4e(0x3a5)],this[_0x494f4e(0x41e)]=_0x3fdb3d[_0x494f4e(0x197)],this['locate'](_0x3fdb3d['x'],_0x3fdb3d['y']),this[_0x494f4e(0x39b)](_0x3fdb3d[_0x494f4e(0x1c7)]),this[_0x494f4e(0x226)]();if(_0x42315a){const _0x413393=VisuMZ[_0x494f4e(0x53f)][_0x4e7216];if(!_0x413393)return;_0x413393['PostSpawnJS']['call'](this,_0x24b2bb,_0x1dcbae,this);}_0x339933['PostSpawnJS'][_0x494f4e(0x4df)](this,_0x24b2bb,_0x1dcbae,this);const _0x3c0e0e=SceneManager[_0x494f4e(0x198)];if(_0x3c0e0e&&_0x3c0e0e['_spriteset'])_0x3c0e0e[_0x494f4e(0x50b)][_0x494f4e(0x364)](this);},Game_Event[_0x452dd7(0x31a)]['isSpawnedEvent']=function(){const _0x5a9420=_0x452dd7;return!!this[_0x5a9420(0x3fa)];},VisuMZ[_0x452dd7(0x278)]['Game_Event_clearPageSettings']=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x1be)],Game_Event[_0x452dd7(0x31a)]['clearPageSettings']=function(){const _0x3d9bc5=_0x452dd7;VisuMZ[_0x3d9bc5(0x278)]['Game_Event_clearPageSettings'][_0x3d9bc5(0x4df)](this),this[_0x3d9bc5(0x1ce)]();},VisuMZ[_0x452dd7(0x278)]['Game_Event_setupPageSettings']=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x426)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x426)]=function(){const _0x1db696=_0x452dd7;this[_0x1db696(0x35e)]=!![],VisuMZ['EventsMoveCore'][_0x1db696(0x49d)][_0x1db696(0x4df)](this),this[_0x1db696(0x347)](),this[_0x1db696(0x35e)]=![];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x347)]=function(){const _0x1d56e4=_0x452dd7;if(!this[_0x1d56e4(0x1aa)]())return;this[_0x1d56e4(0x1ce)](),this[_0x1d56e4(0x32d)](),this[_0x1d56e4(0x381)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x32d)]=function(){const _0x1f5e40=_0x452dd7,_0x5a47dc=this[_0x1f5e40(0x1aa)]()[_0x1f5e40(0x3e5)];if(_0x5a47dc==='')return;this[_0x1f5e40(0x3e2)](_0x5a47dc);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x381)]=function(){const _0x313b65=_0x452dd7;if(!this[_0x313b65(0x231)]())return;const _0x1e8836=this[_0x313b65(0x421)]();let _0x49d26a='';for(const _0x343e70 of _0x1e8836){if([0x6c,0x198]['includes'](_0x343e70[_0x313b65(0x28a)])){if(_0x49d26a!=='')_0x49d26a+='\x0a';_0x49d26a+=_0x343e70[_0x313b65(0x2bc)][0x0];}}this[_0x313b65(0x3e2)](_0x49d26a);},Game_Event[_0x452dd7(0x31a)]['initEventsMoveCoreEffects']=function(){const _0x59306d=_0x452dd7,_0x54f053=VisuMZ['EventsMoveCore'][_0x59306d(0x34e)];this['_activationProximity']={'type':'none','distance':0x0,'regionList':[]},this['_alwaysUpdateMove']=![],this[_0x59306d(0x418)]=![],this[_0x59306d(0x31e)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x59306d(0x2f8)]=$gameSystem[_0x59306d(0x1bf)](this),this[_0x59306d(0x3e9)]={'text':'','visibleRange':_0x54f053['Label'][_0x59306d(0x264)],'offsetX':_0x54f053['Label'][_0x59306d(0x3de)],'offsetY':_0x54f053['Label'][_0x59306d(0x3a8)]},this['_moveOnlyRegions']=[],this[_0x59306d(0x46c)]={'target':-0x1,'type':_0x59306d(0x45f),'delay':0x1},this[_0x59306d(0x19b)]=_0x54f053[_0x59306d(0x36e)][_0x59306d(0x3ff)]??0x0,this[_0x59306d(0x395)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x54f053[_0x59306d(0x36e)][_0x59306d(0x216)]},this[_0x59306d(0x27c)](),this[_0x59306d(0x304)]();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x3e2)]=function(_0xfa3c52){const _0x47f1b7=_0x452dd7;if(_0xfa3c52[_0x47f1b7(0x213)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x47f1b7(0x4f2)]['regionList']=JSON[_0x47f1b7(0x32a)]('['+RegExp['$1'][_0x47f1b7(0x213)](/\d+/g)+']'),this[_0x47f1b7(0x4f2)][_0x47f1b7(0x47e)]=_0x47f1b7(0x2a8);else _0xfa3c52['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x47f1b7(0x1f8)](),this[_0x47f1b7(0x4f2)][_0x47f1b7(0x47e)]=type,this['_activationProximity'][_0x47f1b7(0x49b)]=Number(RegExp['$2']));_0xfa3c52[_0x47f1b7(0x213)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this['_alwaysUpdateMove']=!![]);_0xfa3c52[_0x47f1b7(0x213)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x208380=_0xfa3c52[_0x47f1b7(0x213)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x208380)for(const _0x5237f5 of _0x208380){if(_0x5237f5[_0x47f1b7(0x213)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x13bc09=String(RegExp['$1'])['toLowerCase']()[_0x47f1b7(0x1f8)](),_0x23fbf0=Number(RegExp['$2']);this[_0x47f1b7(0x31e)][_0x13bc09]=_0x23fbf0;}}_0xfa3c52[_0x47f1b7(0x213)](/<ICON:[ ](\d+)>/i)&&(this[_0x47f1b7(0x2f8)][_0x47f1b7(0x463)]=Number(RegExp['$1']));_0xfa3c52[_0x47f1b7(0x213)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x47f1b7(0x526)]=Number(RegExp['$1']));_0xfa3c52['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x47f1b7(0x408)]=Number(RegExp['$1']));_0xfa3c52[_0x47f1b7(0x213)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x47f1b7(0x2f8)][_0x47f1b7(0x526)]=Number(RegExp['$1']),this[_0x47f1b7(0x2f8)]['bufferY']=Number(RegExp['$2']));if(_0xfa3c52[_0x47f1b7(0x213)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x58849f=String(RegExp['$1'])[_0x47f1b7(0x376)]()[_0x47f1b7(0x1f8)](),_0x53aadf=[_0x47f1b7(0x1e9),_0x47f1b7(0x41b),_0x47f1b7(0x283),_0x47f1b7(0x4a2)];this[_0x47f1b7(0x2f8)]['blendMode']=_0x53aadf[_0x47f1b7(0x3cc)](_0x58849f)[_0x47f1b7(0x1c2)](0x0,0x3);}_0xfa3c52[_0x47f1b7(0x213)](/<LABEL:[ ](.*?)>/i)&&(this[_0x47f1b7(0x3e9)]['text']=String(RegExp['$1'])[_0x47f1b7(0x1f8)]());_0xfa3c52[_0x47f1b7(0x213)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x47f1b7(0x3e9)][_0x47f1b7(0x484)]=String(RegExp['$1'])[_0x47f1b7(0x1f8)]());_0xfa3c52[_0x47f1b7(0x213)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x47f1b7(0x3e9)][_0x47f1b7(0x1d5)]=Number(RegExp['$1']));_0xfa3c52[_0x47f1b7(0x213)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x47f1b7(0x3e9)][_0x47f1b7(0x276)]=Number(RegExp['$1']));_0xfa3c52[_0x47f1b7(0x213)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x47f1b7(0x1d5)]=Number(RegExp['$1']),this[_0x47f1b7(0x3e9)][_0x47f1b7(0x276)]=Number(RegExp['$2']));$gameTemp[_0x47f1b7(0x4db)](this);for(;;){if(this[_0x47f1b7(0x3e9)][_0x47f1b7(0x484)][_0x47f1b7(0x213)](/\\V\[(\d+)\]/gi))this[_0x47f1b7(0x3e9)]['text']=this[_0x47f1b7(0x3e9)][_0x47f1b7(0x484)]['replace'](/\\V\[(\d+)\]/gi,(_0x446c26,_0x1a25ce)=>$gameVariables['value'](parseInt(_0x1a25ce)));else break;}$gameTemp[_0x47f1b7(0x37f)]();_0xfa3c52['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x47f1b7(0x3e9)]['visibleRange']=Number(RegExp['$1']));if(_0xfa3c52[_0x47f1b7(0x213)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a5cf3=JSON[_0x47f1b7(0x32a)]('['+RegExp['$1'][_0x47f1b7(0x213)](/\d+/g)+']');this[_0x47f1b7(0x47c)]=this[_0x47f1b7(0x47c)][_0x47f1b7(0x21a)](_0x4a5cf3),this['_moveOnlyRegions']['remove'](0x0);}if(_0xfa3c52[_0x47f1b7(0x213)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x357d65=String(RegExp['$1']);if(_0x357d65[_0x47f1b7(0x213)](/PLAYER/i))this[_0x47f1b7(0x46c)][_0x47f1b7(0x538)]=0x0;else _0x357d65[_0x47f1b7(0x213)](/EVENT[ ](\d+)/i)&&(this[_0x47f1b7(0x46c)][_0x47f1b7(0x538)]=Number(RegExp['$1']));}_0xfa3c52[_0x47f1b7(0x213)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x47f1b7(0x46c)]['type']=String(RegExp['$1'])[_0x47f1b7(0x180)]()[_0x47f1b7(0x1f8)]());_0xfa3c52[_0x47f1b7(0x213)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this['_moveSynch'][_0x47f1b7(0x3d0)]=Number(RegExp['$1']));if(_0xfa3c52[_0x47f1b7(0x213)](/<TRUE RANDOM MOVE>/i))this[_0x47f1b7(0x19b)]=0x0;else _0xfa3c52['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x47f1b7(0x19b)]=Number(RegExp['$1'])||0x0);_0xfa3c52[_0x47f1b7(0x213)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x47f1b7(0x395)]=!![]),_0xfa3c52[_0x47f1b7(0x213)](/<HIDE SHADOW>/i)&&(this[_0x47f1b7(0x266)][_0x47f1b7(0x3c1)]=![]),_0xfa3c52[_0x47f1b7(0x213)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x47f1b7(0x266)][_0x47f1b7(0x169)]=String(RegExp['$1'])),_0xfa3c52[_0x47f1b7(0x213)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1'])),_0xfa3c52[_0x47f1b7(0x213)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x47f1b7(0x4a6)]=Number(RegExp['$1'])),_0xfa3c52[_0x47f1b7(0x213)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2'])),_0xfa3c52[_0x47f1b7(0x213)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x47f1b7(0x1c1)]=String(RegExp['$1'])[_0x47f1b7(0x376)]()[_0x47f1b7(0x1f8)]());},Game_Event['prototype'][_0x452dd7(0x343)]=function(){const _0x53b165=_0x452dd7;this[_0x53b165(0x4d6)]();},Game_Event[_0x452dd7(0x31a)]['isNearTheScreen']=function(){const _0x2c2564=_0x452dd7;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x2c2564(0x31a)]['isNearTheScreen'][_0x2c2564(0x4df)](this);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x20e)]=Game_Event['prototype']['updateSelfMovement'],Game_Event['prototype'][_0x452dd7(0x37a)]=function(){const _0x5dd41a=_0x452dd7;if(this[_0x5dd41a(0x4ca)]())return;VisuMZ[_0x5dd41a(0x278)][_0x5dd41a(0x20e)][_0x5dd41a(0x4df)](this),this[_0x5dd41a(0x314)]()&&VisuMZ[_0x5dd41a(0x1fb)](this[_0x5dd41a(0x208)]);},Game_Event['prototype'][_0x452dd7(0x4ca)]=function(){const _0x18ec01=_0x452dd7,_0x5d7613=VisuMZ['EventsMoveCore']['Settings'][_0x18ec01(0x36e)];if($gameMap[_0x18ec01(0x23a)]()&&_0x5d7613[_0x18ec01(0x4aa)])return!![];if($gameMessage[_0x18ec01(0x53d)]()&&_0x5d7613[_0x18ec01(0x4fb)])return!![];if(!$gameSystem[_0x18ec01(0x1e4)]())return!![];if(this['moveSynchTarget']()>=0x0)return!![];return![];},Game_Event[_0x452dd7(0x31a)]['updateShadowChanges']=function(){const _0x499c1f=_0x452dd7,_0x552c40=SceneManager[_0x499c1f(0x198)]['_spriteset'];if(_0x552c40){const _0x188985=_0x552c40['findTargetSprite'](this);_0x188985&&_0x188985['_shadowSprite']&&_0x188985[_0x499c1f(0x3a9)][_0x499c1f(0x206)]!==this[_0x499c1f(0x3b2)]()&&(_0x188985[_0x499c1f(0x3a9)][_0x499c1f(0x206)]=this[_0x499c1f(0x3b2)](),_0x188985[_0x499c1f(0x3a9)]['bitmap']=ImageManager[_0x499c1f(0x53c)](_0x188985[_0x499c1f(0x3a9)][_0x499c1f(0x206)]));}},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x3b2)]=function(){const _0xed9810=_0x452dd7;return this[_0xed9810(0x266)][_0xed9810(0x169)];},Game_Event['prototype'][_0x452dd7(0x1f3)]=function(){const _0x210db5=_0x452dd7;if(!this[_0x210db5(0x266)]['visible'])return![];return Game_CharacterBase[_0x210db5(0x31a)][_0x210db5(0x1f3)][_0x210db5(0x4df)](this);},Game_Event[_0x452dd7(0x31a)]['labelWindowText']=function(){const _0x3eb157=_0x452dd7;return this[_0x3eb157(0x3e9)]['text'];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x214)]=function(){const _0x2ccd04=_0x452dd7;return this[_0x2ccd04(0x3e9)][_0x2ccd04(0x495)];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x2eb)]=function(_0x32aca9,_0x45b73f,_0x34954e){const _0x13b634=_0x452dd7;if(this[_0x13b634(0x501)]())return this[_0x13b634(0x196)](_0x32aca9,_0x45b73f,_0x34954e);if($gameMap['isRegionAllowPass'](_0x32aca9,_0x45b73f,_0x34954e,_0x13b634(0x1aa)))return!![];if($gameMap[_0x13b634(0x535)](_0x32aca9,_0x45b73f,_0x34954e,_0x13b634(0x1aa)))return![];return Game_Character[_0x13b634(0x31a)]['isMapPassable'][_0x13b634(0x4df)](this,_0x32aca9,_0x45b73f,_0x34954e);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x501)]=function(){const _0x1b0a1c=_0x452dd7;if(this[_0x1b0a1c(0x47c)]===undefined)this[_0x1b0a1c(0x1ce)]();return this[_0x1b0a1c(0x47c)][_0x1b0a1c(0x36a)]>0x0;},Game_Event['prototype']['isMoveOnlyRegionPassable']=function(_0x2e9843,_0x3608e5,_0x5dd9cd){const _0x522a78=_0x452dd7,_0x332781=$gameMap[_0x522a78(0x4d5)](_0x2e9843,_0x5dd9cd),_0x1ee378=$gameMap[_0x522a78(0x4b4)](_0x3608e5,_0x5dd9cd),_0x454e97=$gameMap[_0x522a78(0x177)](_0x332781,_0x1ee378);return this[_0x522a78(0x47c)][_0x522a78(0x38b)](_0x454e97);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x4e9)]=Game_Event['prototype']['findProperPageIndex'],Game_Event['prototype']['findProperPageIndex']=function(){const _0x278228=_0x452dd7;return this[_0x278228(0x1fd)]=![],this['_CPCs']=![],this[_0x278228(0x1aa)]()?VisuMZ[_0x278228(0x278)][_0x278228(0x4e9)][_0x278228(0x4df)](this):-0x1;},VisuMZ['EventsMoveCore'][_0x452dd7(0x2d9)]=Game_Event[_0x452dd7(0x31a)]['meetsConditions'],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x246)]=function(_0x4d3b79){const _0x21f442=_0x452dd7;this['checkAdvancedSwitchVariablePresent'](_0x4d3b79),$gameTemp[_0x21f442(0x4db)](this);const _0x5e6475=VisuMZ[_0x21f442(0x278)][_0x21f442(0x2d9)][_0x21f442(0x4df)](this,_0x4d3b79);return $gameTemp[_0x21f442(0x37f)](),_0x5e6475;},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x404)]=function(){const _0x5895db=_0x452dd7;return this[_0x5895db(0x1fd)];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x450)]=function(_0x51c005){const _0x301700=_0x452dd7,_0x339aa7=_0x51c005[_0x301700(0x476)];if(_0x339aa7['switch1Valid']&&DataManager[_0x301700(0x27e)](_0x339aa7[_0x301700(0x1da)]))this['_advancedSwitchVariable']=!![];else{if(_0x339aa7[_0x301700(0x2f4)]&&DataManager[_0x301700(0x27e)](_0x339aa7[_0x301700(0x1fa)]))this[_0x301700(0x1fd)]=!![];else _0x339aa7[_0x301700(0x4f0)]&&DataManager['isAdvancedVariable'](_0x339aa7[_0x301700(0x4e4)])&&(this[_0x301700(0x1fd)]=!![]);}},Game_Event[_0x452dd7(0x31a)]['hasClickTrigger']=function(){const _0x32ad7f=_0x452dd7;if(this[_0x32ad7f(0x468)])return![];return this['_clickTrigger'];},Game_Event['prototype'][_0x452dd7(0x3f1)]=function(){const _0x3801eb=_0x452dd7;$gameTemp[_0x3801eb(0x215)](),this[_0x3801eb(0x1d7)]();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x20a)]=function(_0x36102e,_0x355c0b){const _0x103d6b=_0x452dd7;return this['_addedHitbox']?this[_0x103d6b(0x441)](_0x36102e,_0x355c0b):Game_Character['prototype'][_0x103d6b(0x20a)]['call'](this,_0x36102e,_0x355c0b);},Game_Event['prototype']['posEventsMoveCore']=function(_0x16759b,_0x39f05c){const _0x2683a9=_0x452dd7;var _0x3a8148=this['x']-this[_0x2683a9(0x31e)][_0x2683a9(0x261)],_0x108047=this['x']+this['_addedHitbox'][_0x2683a9(0x4ab)],_0x2fff20=this['y']-this[_0x2683a9(0x31e)]['up'],_0x331306=this['y']+this[_0x2683a9(0x31e)]['down'];return _0x3a8148<=_0x16759b&&_0x16759b<=_0x108047&&_0x2fff20<=_0x39f05c&&_0x39f05c<=_0x331306;},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x1ea)]=function(_0x4b276f,_0x240be9,_0x27dec5){const _0x10fe30=_0x452dd7;for(let _0x3694a4=-this[_0x10fe30(0x31e)]['left'];_0x3694a4<=this['_addedHitbox'][_0x10fe30(0x4ab)];_0x3694a4++){for(let _0x54e106=-this['_addedHitbox']['up'];_0x54e106<=this[_0x10fe30(0x31e)][_0x10fe30(0x332)];_0x54e106++){if(!Game_Character[_0x10fe30(0x31a)]['canPass']['call'](this,_0x4b276f+_0x3694a4,_0x240be9+_0x54e106,_0x27dec5))return![];}}return!![];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x2a9)]=function(_0x44a9f0,_0x14d6e3){const _0x16f219=_0x452dd7;if(Imported[_0x16f219(0x2d0)]&&this[_0x16f219(0x394)]())return this['checkSmartEventCollision'](_0x44a9f0,_0x14d6e3);else{const _0x342016=$gameMap[_0x16f219(0x54d)](_0x44a9f0,_0x14d6e3)[_0x16f219(0x1e2)](_0x51d2dc=>_0x51d2dc!==this);return _0x342016[_0x16f219(0x36a)]>0x0;}},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x482)]=function(_0x2d2fd6,_0x46a79e){const _0x455be4=_0x452dd7;if(!this['isNormalPriority']())return![];else{const _0x1f0877=$gameMap[_0x455be4(0x54d)](_0x2d2fd6,_0x46a79e)['filter'](_0x278306=>_0x278306!==this&&_0x278306['isNormalPriority']());return _0x1f0877[_0x455be4(0x36a)]>0x0;}},Game_Event['prototype'][_0x452dd7(0x350)]=function(){const _0x299c18=_0x452dd7;return this[_0x299c18(0x4f2)][_0x299c18(0x47e)]||'none';},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x483)]=function(){const _0x3c62f1=_0x452dd7;return this['_activationProximity'][_0x3c62f1(0x49b)]||0x0;},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x524)]=function(){const _0x13deb2=_0x452dd7;return this[_0x13deb2(0x4f2)][_0x13deb2(0x4c9)]||[];},Game_Event[_0x452dd7(0x31a)]['increaseSteps']=function(){const _0x1f9deb=_0x452dd7;Game_Character[_0x1f9deb(0x31a)]['increaseSteps'][_0x1f9deb(0x4df)](this);if([_0x1f9deb(0x40c),'region']['includes'](this['activationProximityType']()))return;$gamePlayer[_0x1f9deb(0x519)]([0x2]);},VisuMZ[_0x452dd7(0x278)]['Game_Event_checkEventTriggerAuto']=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x25a)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x25a)]=function(){const _0x1f4c61=_0x452dd7;if(this['_trigger']!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x1f4c61(0x4c2)](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x1f4c61(0x278)][_0x1f4c61(0x336)][_0x1f4c61(0x4df)](this);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x516)]=Game_Event['prototype']['updateParallel'],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x47a)]=function(){const _0x1169bd=_0x452dd7;if(!this[_0x1169bd(0x49e)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x1169bd(0x278)][_0x1169bd(0x516)][_0x1169bd(0x4df)](this);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4c2)]=function(_0x138404){const _0x54c278=_0x452dd7;if(!_0x138404&&$gameMap[_0x54c278(0x23a)]())return![];if(!_0x138404&&$gameMap[_0x54c278(0x2c2)]())return![];if(this[_0x54c278(0x524)]()<=0x0)return!![];return $gamePlayer[_0x54c278(0x436)](this);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x382)]=function(_0x3574ff){const _0x21f20d=_0x452dd7;if(!_0x3574ff&&$gameMap[_0x21f20d(0x23a)]())return![];if(!_0x3574ff&&$gameMap[_0x21f20d(0x2c2)]())return![];if([_0x21f20d(0x40c),_0x21f20d(0x2a8)][_0x21f20d(0x38b)](this[_0x21f20d(0x350)]()))return!![];return $gamePlayer[_0x21f20d(0x28b)](this);},VisuMZ[_0x452dd7(0x1fb)]=function(_0x3e07b1){const _0x1b4168=_0x452dd7;for(const _0x3ead94 of $gameMap[_0x1b4168(0x207)]()){if(!_0x3ead94)continue;_0x3ead94[_0x1b4168(0x4f7)]()===_0x3e07b1&&_0x3ead94[_0x1b4168(0x4f1)]();}},VisuMZ[_0x452dd7(0x515)]=function(_0xd70c45){const _0x419406=_0x452dd7;if(_0xd70c45===0x0)return $gamePlayer;return $gameMap[_0x419406(0x1aa)](_0xd70c45);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4f7)]=function(){const _0x1e3ef7=_0x452dd7;return this[_0x1e3ef7(0x46c)]['target'];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x274)]=function(){const _0xb7265b=_0x452dd7;return this[_0xb7265b(0x46c)][_0xb7265b(0x47e)];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x217)]=function(){const _0x5a086f=_0x452dd7;if(this['moveSynchTarget']()>=0x0){const _0x2ba481=VisuMZ[_0x5a086f(0x515)](this[_0x5a086f(0x4f7)]());if(_0x2ba481)return _0x2ba481[_0x5a086f(0x217)]();}return Game_Character[_0x5a086f(0x31a)]['realMoveSpeed'][_0x5a086f(0x4df)](this);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4f1)]=function(){const _0x5937c4=_0x452dd7;this[_0x5937c4(0x46c)][_0x5937c4(0x174)]=this[_0x5937c4(0x46c)][_0x5937c4(0x174)]||0x0,this['_moveSynch'][_0x5937c4(0x174)]--;if(this[_0x5937c4(0x46c)][_0x5937c4(0x174)]>0x0)return;this[_0x5937c4(0x46c)][_0x5937c4(0x174)]=this['_moveSynch'][_0x5937c4(0x3d0)],this['processMoveSynch']();},Game_Event['prototype'][_0x452dd7(0x3cf)]=function(){const _0x42be27=_0x452dd7;switch(this[_0x42be27(0x274)]()){case _0x42be27(0x45f):this['processMoveSynchRandom']();break;case _0x42be27(0x2ce):this['processMoveSynchApproach']();break;case _0x42be27(0x475):this[_0x42be27(0x19a)]();break;case _0x42be27(0x2c7):this[_0x42be27(0x23d)]();break;case _0x42be27(0x455):case _0x42be27(0x52d):this['processMoveSynchMimic']();break;case _0x42be27(0x29e):case'reverse\x20copy':this['processMoveSynchReverseMimic']();break;case'mirror\x20horizontal':case _0x42be27(0x423):case _0x42be27(0x379):case _0x42be27(0x2dd):this['processMoveSynchMirrorHorz']();break;case _0x42be27(0x3ca):case _0x42be27(0x20f):case _0x42be27(0x255):case _0x42be27(0x36f):this[_0x42be27(0x288)]();break;default:this[_0x42be27(0x459)]();break;}this['update']();},Game_Event[_0x452dd7(0x31a)]['processMoveSynchRandom']=function(){const _0x341e15=_0x452dd7,_0x213238=[0x2,0x4,0x6,0x8];$gameMap[_0x341e15(0x4fd)]()&&_0x213238[_0x341e15(0x1a5)](0x1,0x3,0x7,0x9);const _0x438cbd=[];for(const _0xa29471 of _0x213238){if(this[_0x341e15(0x1ea)](this['x'],this['y'],_0xa29471))_0x438cbd[_0x341e15(0x1a5)](_0xa29471);}if(_0x438cbd[_0x341e15(0x36a)]>0x0){const _0x2d006a=_0x438cbd[Math[_0x341e15(0x2db)](_0x438cbd[_0x341e15(0x36a)])];this[_0x341e15(0x1e5)](_0x2d006a);}},Game_Event[_0x452dd7(0x31a)]['processMoveSynchApproach']=function(){const _0x29368d=_0x452dd7,_0x391df8=VisuMZ[_0x29368d(0x515)](this['moveSynchTarget']());this[_0x29368d(0x46d)](_0x391df8);},Game_Event['prototype'][_0x452dd7(0x19a)]=function(){const _0xdfeb22=_0x452dd7,_0x58329f=VisuMZ[_0xdfeb22(0x515)](this[_0xdfeb22(0x4f7)]());this[_0xdfeb22(0x1e1)](_0x58329f);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x23d)]=function(){const _0x206232=_0x452dd7;this[_0x206232(0x43a)]();},Game_Event['prototype']['processMoveSynchMimic']=function(){const _0x23772c=_0x452dd7,_0x9e49c1=VisuMZ[_0x23772c(0x515)](this['moveSynchTarget']());this[_0x23772c(0x1e5)](_0x9e49c1[_0x23772c(0x32c)]());},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x402)]=function(){const _0x5620f8=_0x452dd7,_0x5cac7b=VisuMZ[_0x5620f8(0x515)](this['moveSynchTarget']()),_0x2cbedf=this['reverseDir'](_0x5cac7b[_0x5620f8(0x32c)]());this[_0x5620f8(0x1e5)](this[_0x5620f8(0x44d)](_0x5cac7b['direction']()));},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x38f)]=function(){const _0x285b77=_0x452dd7,_0x49b56a=VisuMZ[_0x285b77(0x515)](this[_0x285b77(0x4f7)]()),_0x1e02dc=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x49b56a[_0x285b77(0x32c)]()];this[_0x285b77(0x1e5)](_0x1e02dc);},Game_Event[_0x452dd7(0x31a)]['processMoveSynchMirrorVert']=function(){const _0x1f1fa9=_0x452dd7,_0x5e5aad=VisuMZ[_0x1f1fa9(0x515)](this[_0x1f1fa9(0x4f7)]()),_0x427819=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x5e5aad[_0x1f1fa9(0x32c)]()];this[_0x1f1fa9(0x1e5)](_0x427819);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x377)]=function(){const _0x1edc43=_0x452dd7,_0x354636=$gameSystem[_0x1edc43(0x4fe)](this);if(!_0x354636)return;this[_0x1edc43(0x48c)](_0x354636['x'],_0x354636['y']),this[_0x1edc43(0x39b)](_0x354636[_0x1edc43(0x1c7)]),this['_pageIndex']===_0x354636[_0x1edc43(0x200)]&&(this['_moveRouteIndex']=_0x354636[_0x1edc43(0x1d3)]);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x51a)]=function(){const _0x3c3c99=_0x452dd7;Game_Character[_0x3c3c99(0x31a)]['updateMove']['call'](this),this[_0x3c3c99(0x4e2)]();},Game_Event[_0x452dd7(0x31a)]['isSaveEventLocation']=function(){const _0x2eb95a=_0x452dd7;if($gameMap[_0x2eb95a(0x438)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4e2)]=function(){if(!this['isSaveEventLocation']())return;this['saveEventLocation']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x550)]=function(){$gameSystem['saveEventLocation'](this);},Game_Event['prototype']['deleteEventLocation']=function(){const _0x54137a=_0x452dd7;$gameSystem[_0x54137a(0x427)](this);},Game_Event['prototype']['getEventIconData']=function(){const _0xf6c904=_0x452dd7;return $gameSystem[_0xf6c904(0x1bf)](this)?Game_Character[_0xf6c904(0x31a)]['getEventIconData'][_0xf6c904(0x4df)](this):{'iconIndex':0x0,'bufferX':settings[_0xf6c904(0x45d)]['BufferX'],'bufferY':settings[_0xf6c904(0x45d)]['BufferY'],'blendMode':settings['Icon']['BlendMode']};},Game_Event['prototype']['hasCPCs']=function(){const _0x159287=_0x452dd7;return this[_0x159287(0x34f)];},VisuMZ[_0x452dd7(0x278)]['Game_Event_meetsConditionsCPC']=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x246)],Game_Event[_0x452dd7(0x31a)]['meetsConditions']=function(_0x20059f){const _0x299c93=_0x452dd7,_0x42d950=VisuMZ[_0x299c93(0x278)][_0x299c93(0x502)][_0x299c93(0x4df)](this,_0x20059f);if(!_0x42d950)return![];return this['meetsCPC'](_0x20059f);},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x4a5)]=function(_0x4e9db1){const _0x54d373=_0x452dd7;VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x54d373(0x4f5)](_0x4e9db1),this[_0x54d373(0x34f)]=_0x4e9db1[_0x54d373(0x241)][_0x54d373(0x36a)]>0x0;_0x4e9db1['CPC']===undefined&&VisuMZ[_0x54d373(0x278)][_0x54d373(0x39a)]['loadCPC'](_0x4e9db1);if(_0x4e9db1[_0x54d373(0x241)][_0x54d373(0x36a)]>0x0)return $gameMap[_0x54d373(0x1aa)](this[_0x54d373(0x208)])&&VisuMZ[_0x54d373(0x278)][_0x54d373(0x39a)][_0x54d373(0x3cd)](_0x4e9db1[_0x54d373(0x241)],this[_0x54d373(0x208)]);return!![];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x4f9)]=Game_Troop[_0x452dd7(0x31a)]['meetsConditions'],Game_Troop[_0x452dd7(0x31a)][_0x452dd7(0x246)]=function(_0x2e9a5d){const _0x3c58dc=_0x452dd7;var _0x5e70b5=VisuMZ['EventsMoveCore'][_0x3c58dc(0x4f9)][_0x3c58dc(0x4df)](this,_0x2e9a5d);return _0x5e70b5&&this[_0x3c58dc(0x451)](_0x2e9a5d);},Game_Troop[_0x452dd7(0x31a)]['CPCsMet']=function(_0x1d323a){const _0x4b79bf=_0x452dd7;_0x1d323a[_0x4b79bf(0x241)]===undefined&&VisuMZ[_0x4b79bf(0x278)][_0x4b79bf(0x39a)]['loadCPC'](_0x1d323a);if(_0x1d323a['CPC']['length']>0x0)return VisuMZ[_0x4b79bf(0x278)]['CustomPageConditions'][_0x4b79bf(0x3cd)](_0x1d323a[_0x4b79bf(0x241)],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x452dd7(0x3b0)]=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x48c)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x48c)]=function(_0xb6b637,_0x2f2f5b){const _0x1b6f59=_0x452dd7;VisuMZ[_0x1b6f59(0x278)][_0x1b6f59(0x3b0)][_0x1b6f59(0x4df)](this,_0xb6b637,_0x2f2f5b),this['_randomHomeX']=_0xb6b637,this[_0x1b6f59(0x3c7)]=_0x2f2f5b;},VisuMZ[_0x452dd7(0x278)]['Game_Event_moveTypeRandom']=Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x322)],Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x322)]=function(){const _0x4582f0=_0x452dd7,_0x4ab2bd=$gameMap[_0x4582f0(0x49b)](this['x'],this['y'],this['_randomHomeX'],this[_0x4582f0(0x3c7)]),_0x1aa3c5=_0x4ab2bd*(this[_0x4582f0(0x19b)]||0x0);Math[_0x4582f0(0x45f)]()>=_0x1aa3c5?VisuMZ[_0x4582f0(0x278)][_0x4582f0(0x3c5)][_0x4582f0(0x4df)](this):this['moveBackToRandomHome']();},Game_Event[_0x452dd7(0x31a)][_0x452dd7(0x2e5)]=function(){const _0x1d9e93=_0x452dd7,_0x4d509c=this[_0x1d9e93(0x425)](this[_0x1d9e93(0x54c)]),_0x2e2e05=this['deltaYFrom'](this[_0x1d9e93(0x3c7)]);if(Math[_0x1d9e93(0x4cd)](_0x4d509c)>Math[_0x1d9e93(0x4cd)](_0x2e2e05))this[_0x1d9e93(0x339)](_0x4d509c>0x0?0x4:0x6),!this[_0x1d9e93(0x419)]()&&_0x2e2e05!==0x0&&this[_0x1d9e93(0x339)](_0x2e2e05>0x0?0x8:0x2);else _0x2e2e05!==0x0&&(this['moveStraight'](_0x2e2e05>0x0?0x8:0x2),!this[_0x1d9e93(0x419)]()&&_0x4d509c!==0x0&&this[_0x1d9e93(0x339)](_0x4d509c>0x0?0x4:0x6));},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x44c)]=Game_Interpreter[_0x452dd7(0x31a)]['updateWaitMode'],Game_Interpreter[_0x452dd7(0x31a)]['updateWaitMode']=function(){const _0xb85242=_0x452dd7;if(this[_0xb85242(0x335)]===_0xb85242(0x273)){if(window[this[_0xb85242(0x310)]])this[_0xb85242(0x335)]='',this[_0xb85242(0x2ed)]();else return!![];}else return VisuMZ[_0xb85242(0x278)][_0xb85242(0x44c)][_0xb85242(0x4df)](this);},VisuMZ['EventsMoveCore'][_0x452dd7(0x3ab)]=Game_Interpreter[_0x452dd7(0x31a)]['executeCommand'],Game_Interpreter[_0x452dd7(0x31a)][_0x452dd7(0x1f9)]=function(){const _0x576baf=_0x452dd7,_0x41a9de=$gameMap&&this[_0x576baf(0x208)]?$gameMap[_0x576baf(0x1aa)](this[_0x576baf(0x208)]):null;$gameTemp['registerSelfTarget'](_0x41a9de);const _0x9a3421=VisuMZ[_0x576baf(0x278)][_0x576baf(0x3ab)][_0x576baf(0x4df)](this);return $gameTemp[_0x576baf(0x37f)](),_0x9a3421;},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x3b1)]=Game_Interpreter[_0x452dd7(0x31a)][_0x452dd7(0x234)],Game_Interpreter[_0x452dd7(0x31a)][_0x452dd7(0x234)]=function(_0x1a471d){const _0x1e0b22=_0x452dd7;return $gameTemp[_0x1e0b22(0x337)](this),VisuMZ['EventsMoveCore'][_0x1e0b22(0x3b1)]['call'](this,_0x1a471d);},Game_Interpreter[_0x452dd7(0x31a)][_0x452dd7(0x4e0)]=function(_0x309c05){const _0x35b5a6=_0x452dd7;this[_0x35b5a6(0x368)]=_0x309c05;const _0x3bc324=_0x35b5a6(0x286)[_0x35b5a6(0x2c4)](_0x309c05[_0x35b5a6(0x507)][_0x35b5a6(0x324)](0x3));this[_0x35b5a6(0x310)]=_0x35b5a6(0x4d4)+Graphics[_0x35b5a6(0x302)]+'_'+this[_0x35b5a6(0x53b)](),DataManager[_0x35b5a6(0x48e)](this[_0x35b5a6(0x310)],_0x3bc324),window[this['_callEventMap']]?this[_0x35b5a6(0x2ed)]():this[_0x35b5a6(0x3a3)](_0x35b5a6(0x273));},Game_Interpreter[_0x452dd7(0x31a)]['startCallEvent']=function(){const _0x20dffc=_0x452dd7,_0x5b012a=this['_callEventData'],_0x4fc514=window[this[_0x20dffc(0x310)]],_0x30f87d=_0x4fc514['events'][_0x5b012a[_0x20dffc(0x53b)]];if(_0x30f87d&&_0x30f87d[_0x20dffc(0x4c0)][_0x5b012a['pageId']-0x1]){const _0x5a8e59=_0x30f87d[_0x20dffc(0x4c0)][_0x5b012a['pageId']-0x1][_0x20dffc(0x421)];this['setupChild'](_0x5a8e59,this[_0x20dffc(0x53b)]());}window[this['_callEventMap']]=undefined,this[_0x20dffc(0x310)]=undefined,this[_0x20dffc(0x368)]=undefined;};function Game_CPCInterpreter(){const _0x3b841d=_0x452dd7;this[_0x3b841d(0x4bb)][_0x3b841d(0x503)](this,arguments);};Game_CPCInterpreter[_0x452dd7(0x31a)]=Object[_0x452dd7(0x1b2)](Game_Interpreter[_0x452dd7(0x31a)]),Game_CPCInterpreter['prototype']['constructor']=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x452dd7(0x1af)]=function(){const _0x758886=_0x452dd7;Game_Interpreter[_0x758886(0x31a)]['clear'][_0x758886(0x4df)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x452dd7(0x31a)]['execute']=function(){const _0x1b86df=_0x452dd7;while(this['isRunning']()){this[_0x1b86df(0x1f9)]();}},Game_CPCInterpreter[_0x452dd7(0x31a)]['command108']=function(_0x439be6){const _0x56675f=_0x452dd7;return Game_Interpreter['prototype'][_0x56675f(0x3f7)][_0x56675f(0x4df)](this,_0x439be6),this[_0x56675f(0x1e7)][_0x56675f(0x2e1)](_0x25a1a5=>_0x25a1a5[_0x56675f(0x213)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map[_0x452dd7(0x31a)]['startEncounterEffect'],Scene_Map[_0x452dd7(0x31a)]['startEncounterEffect']=function(){const _0x457475=_0x452dd7;VisuMZ[_0x457475(0x278)][_0x457475(0x37e)][_0x457475(0x4df)](this),this['_spriteset']['hideShadows']();},VisuMZ[_0x452dd7(0x278)]['Scene_Load_onLoadSuccess']=Scene_Load[_0x452dd7(0x31a)]['onLoadSuccess'],Scene_Load[_0x452dd7(0x31a)][_0x452dd7(0x4b7)]=function(){const _0x735c2b=_0x452dd7;if($gameMap)$gameMap[_0x735c2b(0x22f)]();VisuMZ[_0x735c2b(0x278)][_0x735c2b(0x3d4)]['call'](this);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x2bb)]=Sprite_Character['prototype'][_0x452dd7(0x19f)],Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x19f)]=function(){const _0x56757b=_0x452dd7;VisuMZ['EventsMoveCore'][_0x56757b(0x2bb)][_0x56757b(0x4df)](this),this['initMembersEventsMoveCore'](),this[_0x56757b(0x204)]();},Sprite_Character['prototype'][_0x452dd7(0x527)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x204)]=function(){const _0x9e6e8d=_0x452dd7;this[_0x9e6e8d(0x47f)]=new Sprite(),this[_0x9e6e8d(0x47f)][_0x9e6e8d(0x24a)]=ImageManager[_0x9e6e8d(0x53c)](_0x9e6e8d(0x35c)),this['_eventIconSprite'][_0x9e6e8d(0x24a)][_0x9e6e8d(0x3bb)]=![],this['_eventIconSprite'][_0x9e6e8d(0x3bd)](0x0,0x0,0x0,0x0),this[_0x9e6e8d(0x47f)][_0x9e6e8d(0x29c)]['x']=0.5,this[_0x9e6e8d(0x47f)][_0x9e6e8d(0x29c)]['y']=0x1,this[_0x9e6e8d(0x35f)](this[_0x9e6e8d(0x47f)]);},Sprite_Character[_0x452dd7(0x31a)]['isSpriteVS8dir']=function(){return this['_characterName']&&this['_characterName']['match'](/\[VS8\]/i);},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x1e6)]=function(){const _0x4e588d=_0x452dd7;return this[_0x4e588d(0x1a2)]()&&VisuMZ[_0x4e588d(0x278)][_0x4e588d(0x34e)][_0x4e588d(0x1cb)][_0x4e588d(0x3b4)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x291)]=Sprite_Character[_0x452dd7(0x31a)]['update'],Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x510)]=function(){const _0x41ed3c=_0x452dd7;VisuMZ[_0x41ed3c(0x278)][_0x41ed3c(0x291)][_0x41ed3c(0x4df)](this),VisuMZ['EventsMoveCore'][_0x41ed3c(0x34e)][_0x41ed3c(0x36e)]['EnableDashTilt']&&this[_0x41ed3c(0x4ef)](),this[_0x41ed3c(0x3a9)]&&this['updateShadow'](),this[_0x41ed3c(0x47f)]&&this[_0x41ed3c(0x2de)]();},VisuMZ[_0x452dd7(0x278)]['Sprite_Character_setTileBitmap']=Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x1bc)],Sprite_Character['prototype']['setTileBitmap']=function(){const _0x21ad5e=_0x452dd7;VisuMZ[_0x21ad5e(0x278)][_0x21ad5e(0x54f)]['call'](this),this[_0x21ad5e(0x24a)][_0x21ad5e(0x461)](this[_0x21ad5e(0x529)][_0x21ad5e(0x465)](this));},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x53a)]=Sprite_Character['prototype'][_0x452dd7(0x39e)],Sprite_Character[_0x452dd7(0x31a)]['setCharacterBitmap']=function(){const _0x13550c=_0x452dd7;VisuMZ[_0x13550c(0x278)][_0x13550c(0x53a)]['call'](this),this[_0x13550c(0x24a)][_0x13550c(0x461)](this[_0x13550c(0x529)][_0x13550c(0x465)](this));},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x529)]=function(){const _0x44fbf8=_0x452dd7;if(!this[_0x44fbf8(0x24a)])return;this['bitmap'][_0x44fbf8(0x3bb)]=!!VisuMZ['EventsMoveCore'][_0x44fbf8(0x34e)]['Movement'][_0x44fbf8(0x453)];},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x184)]=Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x34d)],Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x34d)]=function(){const _0x52fa53=_0x452dd7;return this[_0x52fa53(0x1a2)]()?this[_0x52fa53(0x31c)]():VisuMZ[_0x52fa53(0x278)][_0x52fa53(0x184)]['call'](this);},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x31c)]=function(){const _0x56006a=_0x452dd7,_0x389fb4=this[_0x56006a(0x189)][_0x56006a(0x1c7)](),_0x805f19=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x805f19[_0x389fb4]-0x2)/0x2;},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x4ef)]=function(){const _0x54c4e7=_0x452dd7;this[_0x54c4e7(0x4de)]=0x0;if(this[_0x54c4e7(0x362)]()){const _0x59e7d6=VisuMZ['EventsMoveCore'][_0x54c4e7(0x34e)][_0x54c4e7(0x36e)],_0x4ee874=this[_0x54c4e7(0x189)][_0x54c4e7(0x1c7)]();let _0x5d4db4=0x0;if([0x1,0x4,0x7][_0x54c4e7(0x38b)](_0x4ee874))_0x5d4db4=_0x59e7d6['TiltLeft'];if([0x3,0x6,0x9][_0x54c4e7(0x38b)](_0x4ee874))_0x5d4db4=_0x59e7d6[_0x54c4e7(0x42b)];[0x2,0x8][_0x54c4e7(0x38b)](_0x4ee874)&&(_0x5d4db4=[-_0x59e7d6[_0x54c4e7(0x301)],0x0,_0x59e7d6['TiltVert']][this[_0x54c4e7(0x189)][_0x54c4e7(0x2ee)]()]);if(this[_0x54c4e7(0x405)])_0x5d4db4*=-0x1;this['rotation']=_0x5d4db4;}},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x362)]=function(){const _0x3e7379=_0x452dd7;if(this[_0x3e7379(0x374)])return![];return this[_0x3e7379(0x189)]['isDashingAndMoving']()&&!this[_0x3e7379(0x189)][_0x3e7379(0x371)]()&&!this[_0x3e7379(0x189)]['isPosing']()&&this[_0x3e7379(0x443)]()===0x0;},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x490)]=function(){const _0x1eb661=_0x452dd7;this['_shadowSprite']['x']=this[_0x1eb661(0x189)][_0x1eb661(0x21c)](),this[_0x1eb661(0x3a9)]['y']=this['_character'][_0x1eb661(0x353)](),this[_0x1eb661(0x3a9)][_0x1eb661(0x1cf)]=this[_0x1eb661(0x1cf)],this['_shadowSprite']['visible']=this['_character']['isShadowVisible'](),this[_0x1eb661(0x3a9)][_0x1eb661(0x1c3)]=this[_0x1eb661(0x1c3)],!this[_0x1eb661(0x189)][_0x1eb661(0x506)]()?(this[_0x1eb661(0x3a9)][_0x1eb661(0x4ac)]['x']=Math[_0x1eb661(0x4a3)](0x1,this[_0x1eb661(0x3a9)]['scale']['x']+0.1),this[_0x1eb661(0x3a9)][_0x1eb661(0x4ac)]['y']=Math['min'](0x1,this[_0x1eb661(0x3a9)]['scale']['y']+0.1)):(this[_0x1eb661(0x3a9)][_0x1eb661(0x4ac)]['x']=Math[_0x1eb661(0x4dd)](0x0,this['_shadowSprite']['scale']['x']-0.1),this[_0x1eb661(0x3a9)][_0x1eb661(0x4ac)]['y']=Math[_0x1eb661(0x4dd)](0x0,this[_0x1eb661(0x3a9)][_0x1eb661(0x4ac)]['y']-0.1));},Sprite_Character[_0x452dd7(0x31a)][_0x452dd7(0x2de)]=function(){const _0x450ae3=_0x452dd7,_0x1ae4f6=this[_0x450ae3(0x47f)],_0x2e803c=this['getEventIconIndex']();if(_0x2e803c<=0x0)return _0x1ae4f6[_0x450ae3(0x3bd)](0x0,0x0,0x0,0x0);else{const _0x374095=ImageManager['iconWidth'],_0x20962c=ImageManager[_0x450ae3(0x530)],_0x2fa851=_0x2e803c%0x10*_0x374095,_0x5073a5=Math[_0x450ae3(0x1eb)](_0x2e803c/0x10)*_0x20962c;_0x1ae4f6[_0x450ae3(0x3bd)](_0x2fa851,_0x5073a5,_0x374095,_0x20962c),this[_0x450ae3(0x3c1)]=!![];}const _0x5b8e06=this[_0x450ae3(0x189)][_0x450ae3(0x1bf)]();this[_0x450ae3(0x1e6)]()?this[_0x450ae3(0x2cb)](_0x1ae4f6):(_0x1ae4f6['x']=_0x5b8e06?_0x5b8e06[_0x450ae3(0x526)]:0x0,_0x1ae4f6['y']=_0x5b8e06?-this[_0x450ae3(0x193)]+_0x5b8e06[_0x450ae3(0x408)]:0x0),_0x1ae4f6[_0x450ae3(0x48b)]=_0x5b8e06?_0x5b8e06[_0x450ae3(0x48b)]:0x0,this[_0x450ae3(0x2b5)](_0x1ae4f6),this[_0x450ae3(0x35f)](_0x1ae4f6),_0x1ae4f6['rotation']=-this[_0x450ae3(0x4de)];},Sprite_Character[_0x452dd7(0x31a)]['autoEventIconBuffer']=function(_0x27401b){const _0x733dce=_0x452dd7;_0x27401b['x']=0x0,_0x27401b['y']=-this[_0x733dce(0x193)]+this['height']*0x2/0x5,this[_0x733dce(0x189)][_0x733dce(0x2ee)]()!==0x1&&(_0x27401b['y']+=0x1);},Sprite_Character[_0x452dd7(0x31a)]['getEventIconIndex']=function(){const _0xb186ea=_0x452dd7;if(!this[_0xb186ea(0x189)])return 0x0;if(this[_0xb186ea(0x189)][_0xb186ea(0x468)])return 0x0;const _0x2f4aa1=this[_0xb186ea(0x189)][_0xb186ea(0x1bf)]();return _0x2f4aa1?_0x2f4aa1['iconIndex']||0x0:0x0;},VisuMZ[_0x452dd7(0x278)]['Sprite_Balloon_setup']=Sprite_Balloon[_0x452dd7(0x31a)][_0x452dd7(0x44e)],Sprite_Balloon[_0x452dd7(0x31a)]['setup']=function(_0x4173be,_0x4155a5){const _0x18a9d7=_0x452dd7;VisuMZ[_0x18a9d7(0x278)]['Sprite_Balloon_setup'][_0x18a9d7(0x4df)](this,_0x4173be,_0x4155a5),VisuMZ[_0x18a9d7(0x278)][_0x18a9d7(0x34e)]['VS8'][_0x18a9d7(0x225)]&&this[_0x18a9d7(0x192)][_0x18a9d7(0x189)][_0x18a9d7(0x473)](_0x4155a5,this[_0x18a9d7(0x256)]);},VisuMZ['EventsMoveCore'][_0x452dd7(0x2ba)]=Sprite_Balloon[_0x452dd7(0x31a)][_0x452dd7(0x205)],Sprite_Balloon[_0x452dd7(0x31a)][_0x452dd7(0x205)]=function(){const _0x48ed7d=_0x452dd7;VisuMZ[_0x48ed7d(0x278)][_0x48ed7d(0x2ba)]['call'](this),this[_0x48ed7d(0x1ac)]();},Sprite_Balloon[_0x452dd7(0x31a)]['updateVS8BalloonOffsets']=function(){const _0xbeb0eb=_0x452dd7;this[_0xbeb0eb(0x192)][_0xbeb0eb(0x189)][_0xbeb0eb(0x1a2)]()&&(this['x']+=VisuMZ[_0xbeb0eb(0x278)][_0xbeb0eb(0x34e)][_0xbeb0eb(0x1cb)]['BalloonOffsetX'],this['y']+=VisuMZ[_0xbeb0eb(0x278)][_0xbeb0eb(0x34e)]['VS8'][_0xbeb0eb(0x34a)]);},Sprite_Timer[_0x452dd7(0x31a)][_0x452dd7(0x26d)]=function(){const _0x1ae251=_0x452dd7;this['bitmap']=new Bitmap(Math[_0x1ae251(0x313)](Graphics[_0x1ae251(0x2f0)]/0x2),0x30),this[_0x1ae251(0x24a)]['fontFace']=this[_0x1ae251(0x35b)](),this['bitmap'][_0x1ae251(0x164)]=this[_0x1ae251(0x164)](),this[_0x1ae251(0x24a)]['outlineColor']=ColorManager[_0x1ae251(0x380)]();},Sprite_Timer[_0x452dd7(0x31a)][_0x452dd7(0x41a)]=function(){const _0x3c3751=_0x452dd7,_0x2c20e8=Math[_0x3c3751(0x1eb)](this[_0x3c3751(0x488)]/0x3c/0x3c),_0x59cf95=Math[_0x3c3751(0x1eb)](this['_seconds']/0x3c)%0x3c,_0x2099fe=this[_0x3c3751(0x488)]%0x3c;let _0x263160=_0x59cf95[_0x3c3751(0x324)](0x2)+':'+_0x2099fe[_0x3c3751(0x324)](0x2);if(_0x2c20e8>0x0)_0x263160=_0x3c3751(0x3f5)[_0x3c3751(0x2c4)](_0x2c20e8,_0x263160);return _0x263160;},VisuMZ['EventsMoveCore'][_0x452dd7(0x2f9)]=Spriteset_Map['prototype'][_0x452dd7(0x29b)],Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x29b)]=function(){const _0x595eda=_0x452dd7;VisuMZ[_0x595eda(0x278)][_0x595eda(0x2f9)]['call'](this),this['createLabelWindows']();},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x1a0)]=Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x370)],Spriteset_Map['prototype'][_0x452dd7(0x370)]=function(){const _0x563e0b=_0x452dd7;VisuMZ[_0x563e0b(0x278)]['Spriteset_Map_createShadow']['call'](this),this['createShadows']();},Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x1dd)]=function(){const _0x143bda=_0x452dd7;if(!VisuMZ[_0x143bda(0x278)][_0x143bda(0x34e)][_0x143bda(0x36e)][_0x143bda(0x457)])return;for(const _0xbefee2 of this[_0x143bda(0x4af)]){this[_0x143bda(0x532)](_0xbefee2);}},Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x532)]=function(_0x34e239){const _0x38168b=_0x452dd7;_0x34e239[_0x38168b(0x3a9)]=new Sprite(),_0x34e239['_shadowSprite'][_0x38168b(0x206)]=_0x34e239['_character']['shadowFilename'](),_0x34e239[_0x38168b(0x3a9)][_0x38168b(0x24a)]=ImageManager[_0x38168b(0x53c)](_0x34e239[_0x38168b(0x3a9)][_0x38168b(0x206)]),_0x34e239[_0x38168b(0x3a9)][_0x38168b(0x29c)]['x']=0.5,_0x34e239['_shadowSprite'][_0x38168b(0x29c)]['y']=0x1,_0x34e239[_0x38168b(0x3a9)]['z']=0x0,this['_tilemap']['addChild'](_0x34e239[_0x38168b(0x3a9)]);},Spriteset_Map['prototype'][_0x452dd7(0x2a7)]=function(){const _0x1fa3d2=_0x452dd7;if(!VisuMZ[_0x1fa3d2(0x278)][_0x1fa3d2(0x34e)][_0x1fa3d2(0x36e)][_0x1fa3d2(0x457)])return;for(const _0x40eff5 of this[_0x1fa3d2(0x4af)]){this[_0x1fa3d2(0x296)][_0x1fa3d2(0x2b5)](_0x40eff5[_0x1fa3d2(0x3a9)]);}},Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x21b)]=function(){const _0x3bf2b1=_0x452dd7;this[_0x3bf2b1(0x466)]=[];for(const _0x2cdee0 of $gameMap['events']()){this[_0x3bf2b1(0x361)](_0x2cdee0);}},Spriteset_Map['prototype'][_0x452dd7(0x361)]=function(_0xaf89dc){const _0x9659fc=_0x452dd7;if(!this[_0x9659fc(0x3e4)](_0xaf89dc))return;const _0x2b4036=new Window_EventLabel(_0xaf89dc);_0x2b4036['z']=0x8,_0x2b4036[_0x9659fc(0x1c4)]=Sprite['_counter']++,this[_0x9659fc(0x296)][_0x9659fc(0x35f)](_0x2b4036),this['_labelWindows']['push'](_0x2b4036);},Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x3e4)]=function(_0x4feca4){const _0x5b9775=_0x452dd7,_0x293195=_0x4feca4[_0x5b9775(0x1aa)]();if(_0x293195[_0x5b9775(0x3e5)][_0x5b9775(0x213)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x293195[_0x5b9775(0x3e5)][_0x5b9775(0x213)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x2f795b of _0x293195['pages']){let _0x491fa0='';for(const _0x30fed3 of _0x2f795b['list']){[0x6c,0x198][_0x5b9775(0x38b)](_0x30fed3[_0x5b9775(0x28a)])&&(_0x491fa0+=_0x30fed3[_0x5b9775(0x2bc)][0x0]);}if(_0x491fa0[_0x5b9775(0x213)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x491fa0[_0x5b9775(0x213)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x452dd7(0x31a)][_0x452dd7(0x364)]=function(_0x2a5c36){const _0x38f423=_0x452dd7;this[_0x38f423(0x4af)]=this['_characterSprites']||[];const _0xfa4ae8=new Sprite_Character(_0x2a5c36);this[_0x38f423(0x4af)]['push'](_0xfa4ae8),this[_0x38f423(0x296)][_0x38f423(0x35f)](_0xfa4ae8),this[_0x38f423(0x532)](_0xfa4ae8),this[_0x38f423(0x361)](_0x2a5c36),_0xfa4ae8[_0x38f423(0x510)]();},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x20d)]=Game_Message['prototype'][_0x452dd7(0x239)],Game_Message['prototype'][_0x452dd7(0x239)]=function(_0x4b530d,_0x33685b){const _0x3a8707=_0x452dd7;this[_0x3a8707(0x28c)]=$gameTemp[_0x3a8707(0x2da)](),VisuMZ[_0x3a8707(0x278)][_0x3a8707(0x20d)][_0x3a8707(0x4df)](this,_0x4b530d,_0x33685b);},VisuMZ[_0x452dd7(0x278)][_0x452dd7(0x338)]=Window_NumberInput[_0x452dd7(0x31a)][_0x452dd7(0x1d7)],Window_NumberInput['prototype'][_0x452dd7(0x1d7)]=function(){const _0x283e12=_0x452dd7;$gameTemp['registerSelfTarget']($gameMessage[_0x283e12(0x28c)]),VisuMZ['EventsMoveCore']['Window_NumberInput_start'][_0x283e12(0x4df)](this),$gameTemp[_0x283e12(0x37f)]();},VisuMZ[_0x452dd7(0x278)]['Window_NumberInput_processOk']=Window_NumberInput[_0x452dd7(0x31a)][_0x452dd7(0x244)],Window_NumberInput[_0x452dd7(0x31a)][_0x452dd7(0x244)]=function(){const _0x3c2f13=_0x452dd7;$gameTemp[_0x3c2f13(0x4db)]($gameMessage['_selfTargetNumberInput']),VisuMZ[_0x3c2f13(0x278)][_0x3c2f13(0x4ea)][_0x3c2f13(0x4df)](this),$gameTemp[_0x3c2f13(0x37f)](),$gameMessage[_0x3c2f13(0x28c)]=undefined;},VisuMZ[_0x452dd7(0x278)]['Game_Message_setItemChoice']=Game_Message['prototype']['setItemChoice'],Game_Message[_0x452dd7(0x31a)]['setItemChoice']=function(_0x385978,_0x52454a){const _0x2777a8=_0x452dd7;this[_0x2777a8(0x2a3)]=$gameTemp[_0x2777a8(0x2da)](),VisuMZ[_0x2777a8(0x278)][_0x2777a8(0x41d)][_0x2777a8(0x4df)](this,_0x385978,_0x52454a);},VisuMZ['EventsMoveCore'][_0x452dd7(0x1d6)]=Window_EventItem[_0x452dd7(0x31a)][_0x452dd7(0x4e3)],Window_EventItem[_0x452dd7(0x31a)][_0x452dd7(0x4e3)]=function(){const _0x52b928=_0x452dd7;$gameTemp[_0x52b928(0x4db)]($gameMessage[_0x52b928(0x2a3)]),VisuMZ[_0x52b928(0x278)][_0x52b928(0x1d6)][_0x52b928(0x4df)](this),$gameTemp[_0x52b928(0x37f)](),$gameMessage[_0x52b928(0x2a3)]=undefined;},VisuMZ['EventsMoveCore']['Window_EventItem_onCancel']=Window_EventItem[_0x452dd7(0x31a)][_0x452dd7(0x349)],Window_EventItem['prototype'][_0x452dd7(0x349)]=function(){const _0x155055=_0x452dd7;$gameTemp[_0x155055(0x4db)]($gameMessage[_0x155055(0x2a3)]),VisuMZ['EventsMoveCore'][_0x155055(0x523)][_0x155055(0x4df)](this),$gameTemp[_0x155055(0x37f)](),$gameMessage[_0x155055(0x2a3)]=undefined;},VisuMZ['EventsMoveCore'][_0x452dd7(0x242)]=Window_Message[_0x452dd7(0x31a)]['startMessage'],Window_Message[_0x452dd7(0x31a)]['startMessage']=function(){const _0x40b545=_0x452dd7;$gameMessage[_0x40b545(0x537)](),VisuMZ[_0x40b545(0x278)][_0x40b545(0x242)][_0x40b545(0x4df)](this),$gameTemp[_0x40b545(0x37f)]();},VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']=Window_ScrollText[_0x452dd7(0x31a)][_0x452dd7(0x24f)],Window_ScrollText[_0x452dd7(0x31a)][_0x452dd7(0x24f)]=function(){const _0x2df037=_0x452dd7;$gameMessage[_0x2df037(0x537)](),VisuMZ['EventsMoveCore'][_0x2df037(0x211)]['call'](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x61925e=_0x452dd7;this[_0x61925e(0x4bb)](...arguments);}function _0x54f2(_0x59cc14,_0x34657b){const _0x283bd7=_0x283b();return _0x54f2=function(_0x54f262,_0x303625){_0x54f262=_0x54f262-0x163;let _0x3d9408=_0x283bd7[_0x54f262];return _0x3d9408;},_0x54f2(_0x59cc14,_0x34657b);}Window_EventLabel['prototype']=Object[_0x452dd7(0x1b2)](Window_Base[_0x452dd7(0x31a)]),Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x20b)]=Window_EventLabel,Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x4bb)]=function(_0x81cb89){const _0x2661aa=_0x452dd7;this['_event']=_0x81cb89;const _0x25975d=new Rectangle(0x0,0x0,Graphics[_0x2661aa(0x2f0)]/0x4,this['fittingHeight'](0x1));this[_0x2661aa(0x19f)](),Window_Base[_0x2661aa(0x31a)][_0x2661aa(0x4bb)]['call'](this,_0x25975d),this[_0x2661aa(0x393)]=0x0,this['setBackgroundType'](0x2),this[_0x2661aa(0x2d5)]='';},Window_EventLabel[_0x452dd7(0x31a)]['initMembers']=function(){const _0x10aaba=_0x452dd7;this['_eventErased']=![],this['_screenZoomScale']=$gameScreen['zoomScale'](),this['_eventScreenX']=this[_0x10aaba(0x2a5)][_0x10aaba(0x1df)](),this[_0x10aaba(0x281)]=this[_0x10aaba(0x2a5)][_0x10aaba(0x36b)](),this[_0x10aaba(0x514)]=this[_0x10aaba(0x2a5)][_0x10aaba(0x3e9)][_0x10aaba(0x1d5)],this[_0x10aaba(0x36d)]=this[_0x10aaba(0x2a5)][_0x10aaba(0x3e9)][_0x10aaba(0x276)],this[_0x10aaba(0x4d8)]=this['_event'][_0x10aaba(0x16a)],this[_0x10aaba(0x4f4)]=this['isLabelVisible'](),this[_0x10aaba(0x25b)]=$gameSystem[_0x10aaba(0x170)](),this[_0x10aaba(0x534)]=$gamePlayer['x'],this[_0x10aaba(0x1ee)]=$gamePlayer['y'],this[_0x10aaba(0x3dc)]=this[_0x10aaba(0x2a5)]['x'],this[_0x10aaba(0x245)]=this['_event']['y'];},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x510)]=function(){const _0x2e565c=_0x452dd7;Window_Base[_0x2e565c(0x31a)][_0x2e565c(0x510)][_0x2e565c(0x4df)](this);if(!this['needsUpdate']())return;this[_0x2e565c(0x33c)](),this['updateScale'](),this[_0x2e565c(0x205)](),this['updateOpacity']();},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x195)]=function(){const _0x46d297=_0x452dd7;if(!this[_0x46d297(0x2a5)])return![];if(!this['_event'][_0x46d297(0x3e9)])return![];if(this['_eventPageIndex']!==this['_event']['_pageIndex'])return!![];if(this[_0x46d297(0x2a5)][_0x46d297(0x468)]&&!this[_0x46d297(0x199)])return!![];if(this['_event'][_0x46d297(0x3e9)][_0x46d297(0x484)]==='')return![];if(this[_0x46d297(0x4e6)]!==$gameScreen[_0x46d297(0x218)]())return!![];if(this[_0x46d297(0x4c6)]!==this[_0x46d297(0x2a5)][_0x46d297(0x1df)]())return!![];if(this[_0x46d297(0x281)]!==this[_0x46d297(0x2a5)][_0x46d297(0x36b)]())return!![];if(this[_0x46d297(0x514)]!==this[_0x46d297(0x2a5)][_0x46d297(0x3e9)][_0x46d297(0x1d5)])return!![];if(this[_0x46d297(0x36d)]!==this[_0x46d297(0x2a5)][_0x46d297(0x3e9)][_0x46d297(0x276)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x46d297(0x3dc)]!==this['_event']['x'])return!![];if(this[_0x46d297(0x245)]!==this[_0x46d297(0x2a5)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x46d297(0x170)]())return!![];if(this['_cacheVisibility']&&this[_0x46d297(0x393)]<0xff)return!![];if(!this[_0x46d297(0x4f4)]&&this[_0x46d297(0x393)]>0x0)return!![];if(SceneManager['_scene'][_0x46d297(0x4a1)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x452dd7(0x33c)]=function(){const _0x235e10=_0x452dd7;this['_event'][_0x235e10(0x4c5)]()!==this['_text']&&(this[_0x235e10(0x2d5)]=this[_0x235e10(0x2a5)][_0x235e10(0x4c5)](),this[_0x235e10(0x226)]());},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x439)]=function(){const _0x56bc71=_0x452dd7;this['scale']['x']=0x1/$gameScreen['zoomScale'](),this[_0x56bc71(0x4ac)]['y']=0x1/$gameScreen[_0x56bc71(0x218)](),this[_0x56bc71(0x4e6)]=$gameScreen[_0x56bc71(0x218)]();},Window_EventLabel[_0x452dd7(0x31a)]['updatePosition']=function(){const _0x7fed84=_0x452dd7;if(!SceneManager[_0x7fed84(0x198)])return;if(!SceneManager[_0x7fed84(0x198)]['_spriteset'])return;const _0x2e3eee=SceneManager['_scene']['_spriteset']['findTargetSprite'](this[_0x7fed84(0x2a5)]);if(!_0x2e3eee)return;this['x']=Math[_0x7fed84(0x313)](this[_0x7fed84(0x2a5)][_0x7fed84(0x1df)]()-Math[_0x7fed84(0x1eb)](this[_0x7fed84(0x1c5)]*this[_0x7fed84(0x4ac)]['x']/0x2)),this['x']+=this['_event']['_labelWindow'][_0x7fed84(0x1d5)],this['y']=this[_0x7fed84(0x2a5)][_0x7fed84(0x36b)]()-_0x2e3eee[_0x7fed84(0x193)],this['y']+=Math[_0x7fed84(0x313)]($gameSystem[_0x7fed84(0x1b1)]()*0.5),this['y']-=Math[_0x7fed84(0x313)](this[_0x7fed84(0x193)]*this['scale']['y']),this['y']+=this[_0x7fed84(0x2a5)]['_labelWindow']['offsetY'],this[_0x7fed84(0x199)]=this[_0x7fed84(0x2a5)][_0x7fed84(0x468)],this[_0x7fed84(0x4c6)]=this[_0x7fed84(0x2a5)][_0x7fed84(0x1df)](),this[_0x7fed84(0x281)]=this[_0x7fed84(0x2a5)][_0x7fed84(0x36b)](),this[_0x7fed84(0x514)]=this['_event'][_0x7fed84(0x3e9)][_0x7fed84(0x1d5)],this[_0x7fed84(0x36d)]=this[_0x7fed84(0x2a5)][_0x7fed84(0x3e9)][_0x7fed84(0x276)],this['_eventPageIndex']=this[_0x7fed84(0x2a5)][_0x7fed84(0x16a)],this[_0x7fed84(0x199)]&&(this['contentsOpacity']=0x0);},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x3f3)]=function(){const _0x318d95=_0x452dd7;if(this[_0x318d95(0x260)]())this[_0x318d95(0x393)]+=this[_0x318d95(0x1f7)]();else SceneManager[_0x318d95(0x198)][_0x318d95(0x4a1)]>0x0?this[_0x318d95(0x393)]=0x0:this[_0x318d95(0x393)]-=this[_0x318d95(0x1f7)]();},Window_EventLabel['prototype'][_0x452dd7(0x260)]=function(){const _0x13882a=_0x452dd7;if(!$gameSystem[_0x13882a(0x170)]())return![];if(this[_0x13882a(0x2a5)]?.[_0x13882a(0x468)])return![];if(SceneManager[_0x13882a(0x198)]['_encounterEffectDuration']>0x0)return![];const _0xd74f6c=$gamePlayer['x'],_0x3a8325=$gamePlayer['y'],_0x3c2866=this[_0x13882a(0x2a5)]['x'],_0xd1e41c=this[_0x13882a(0x2a5)]['y'];if(this[_0x13882a(0x534)]===_0xd74f6c&&this[_0x13882a(0x1ee)]===_0x3a8325&&this[_0x13882a(0x3dc)]===_0x3c2866&&this['_visibleEventY']===_0xd1e41c)return this[_0x13882a(0x4f4)];this[_0x13882a(0x534)]=$gamePlayer['x'],this[_0x13882a(0x1ee)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x13882a(0x2a5)]['x'],this[_0x13882a(0x245)]=this[_0x13882a(0x2a5)]['y'];if($gameMap[_0x13882a(0x23f)](_0xd74f6c,_0x3a8325,_0x3c2866,_0xd1e41c)>this[_0x13882a(0x2a5)][_0x13882a(0x214)]())return this['_cacheVisibility']=![],![];return this[_0x13882a(0x4f4)]=!![],!![];},Window_EventLabel[_0x452dd7(0x31a)]['opacitySpeed']=function(){const _0x20c745=_0x452dd7;return VisuMZ[_0x20c745(0x278)]['Settings'][_0x20c745(0x30b)][_0x20c745(0x49c)];},Window_EventLabel['prototype']['resizeWindow']=function(){const _0x3e0a6a=_0x452dd7,_0x29f426=this[_0x3e0a6a(0x50e)](this[_0x3e0a6a(0x2d5)]);this[_0x3e0a6a(0x1c5)]=_0x29f426[_0x3e0a6a(0x1c5)]+($gameSystem[_0x3e0a6a(0x1b1)]()+this[_0x3e0a6a(0x4ba)]())*0x2,this[_0x3e0a6a(0x193)]=Math['max'](this['lineHeight'](),_0x29f426[_0x3e0a6a(0x193)])+$gameSystem[_0x3e0a6a(0x1b1)]()*0x2,this['createContents']();},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x3a2)]=function(){const _0x3f79e2=_0x452dd7;return VisuMZ['EventsMoveCore'][_0x3f79e2(0x34e)][_0x3f79e2(0x30b)][_0x3f79e2(0x547)];},Window_EventLabel[_0x452dd7(0x31a)]['resetFontSettings']=function(){const _0x51e07b=_0x452dd7;Window_Base['prototype']['resetFontSettings'][_0x51e07b(0x4df)](this),this[_0x51e07b(0x267)][_0x51e07b(0x164)]=this['defaultFontSize']();},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x17d)]=function(){const _0x1a722b=_0x452dd7;return VisuMZ[_0x1a722b(0x278)][_0x1a722b(0x34e)]['Label'][_0x1a722b(0x3d1)];},Window_EventLabel[_0x452dd7(0x31a)]['refresh']=function(){const _0x4e5024=_0x452dd7;this[_0x4e5024(0x251)](),this[_0x4e5024(0x267)][_0x4e5024(0x1af)]();const _0x4d6681=this['_text']['split'](/[\r\n]+/);let _0x37d2e3=0x0;for(const _0x11458d of _0x4d6681){const _0x21f2af=this[_0x4e5024(0x50e)](_0x11458d),_0x45e578=Math['floor']((this['innerWidth']-_0x21f2af[_0x4e5024(0x1c5)])/0x2);this[_0x4e5024(0x496)](_0x11458d,_0x45e578,_0x37d2e3),_0x37d2e3+=_0x21f2af[_0x4e5024(0x193)];}},Window_EventLabel['prototype'][_0x452dd7(0x30c)]=function(_0xa43c9d,_0x1a29c7){const _0x5bab8c=_0x452dd7;_0x1a29c7[_0x5bab8c(0x47b)]&&this['drawIcon'](_0xa43c9d,_0x1a29c7['x']+0x2,_0x1a29c7['y']),_0x1a29c7['x']+=Math[_0x5bab8c(0x4a3)](this['iconSize'](),ImageManager[_0x5bab8c(0x31f)])+0x4;},Window_EventLabel[_0x452dd7(0x31a)]['drawIcon']=function(_0x42fc35,_0x4bb4ba,_0x500fa2){const _0x19ef5b=_0x452dd7,_0x508da5=ImageManager[_0x19ef5b(0x53c)](_0x19ef5b(0x35c)),_0x3bbdb3=ImageManager[_0x19ef5b(0x31f)],_0x158baf=ImageManager['iconHeight'],_0x22b7ff=_0x42fc35%0x10*_0x3bbdb3,_0x1e7791=Math['floor'](_0x42fc35/0x10)*_0x158baf,_0x4a526f=Math[_0x19ef5b(0x4a3)](this[_0x19ef5b(0x3c0)]()),_0x3dfd85=Math['min'](this['iconSize']());this[_0x19ef5b(0x267)][_0x19ef5b(0x2a6)](_0x508da5,_0x22b7ff,_0x1e7791,_0x3bbdb3,_0x158baf,_0x4bb4ba,_0x500fa2,_0x4a526f,_0x3dfd85);},Window_EventLabel[_0x452dd7(0x31a)][_0x452dd7(0x3c0)]=function(){const _0x294cee=_0x452dd7;return VisuMZ[_0x294cee(0x278)][_0x294cee(0x34e)][_0x294cee(0x30b)][_0x294cee(0x1a4)];};