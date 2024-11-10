//==========================================================================
// EliMZ_ButtonCommonEvents.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.0♦ Bind common events to keyboard/gamepad buttons!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-button-common-events-for-rpg-maker-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Bind common events to keyboard keys or gamepad buttons.
● Remove common events from these keys/buttons.
● Can do it through plugin parameters or plugin commands.
● The changes stay on the save file.

============================================================================
How to use
============================================================================

You can bind the common events into a key either by plugin parameters or 
plugin command.

In this process, either by plugin parameters or plugin command, you will 
find a huge dropdown list of keys(mostly for the keyboard). You can then, 
pick the key you want on that list. If you don't want to search/scroll 
the dropdown list, you can use the text field to put the key there. 
It's not case sensitive but has to match the keys in the dropdown list.

Here is a list of the default keys of RPG Maker(Keyboard/Gamepad):

"tab",      ■ Keyboard: tab
"ok",       ■ Keyboard: enter, space, Z ■ Gamepad: A
"shift",    ■ Keyboard: shift ■ Gamepad: X
"control",  ■ Keyboard: control, alt
"escape",   ■ Keyboard: escape, numpad0, insert, x
"pageup",   ■ Keyboard: Q, pageup ■ Gamepad: LB
"pagedown", ■ Keyboard: W, pagedown ■ Gamepad: RB
"left",     ■ Keyboard: left arrow, numpad4 ■ Gamepad: D-pad left
"up",       ■ Keyboard: up arrow, numpad8 ■ Gamepad: D-pad up
"right",    ■ Keyboard: right arrow, numpad6 ■ Gamepad: D-pad right
"down",     ■ Keyboard: down arrow, numpad2 ■ Gamepad: D-pad down
"debug"     ■ Keyboard: F9
"cancel"    ■ Gamepad: B
"menu"      ■ Gamepad: Y

Some observations:

Escape is the button that calls the menu and also can quit/cancel. As you 
can see, it does not exist on the Gamepad.
On Gamepad, you have the MENU and CANCEL. Which is the escape button 
divided with proper functions: One to call menu and other to cancel/quit 
the menu

You can overwrite them by changing the plugin parameter.

============================================================================
Update Log
============================================================================

https://tinyurl.com/buttonCommonEventsLog

============================================================================

@param presetKeys
@text Button Common Events
@type struct<presetKeysSt>[]
@desc Set here all your default keys/common events.
@default 

@param presetKeysGamePad
@text Button Common Events(Game Pad)
@type struct<presetGamePadKeysSt>[]
@desc Set here all your default keys/common events.
(Game Pad)
@default 

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default false

@command assign
@text Assign
@desc Assing a common event to a key.

    @arg key
    @text Keyboard button
    @type select
    @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
    @desc Type here the keyboard key you want to use. It is not case sensitive.
    @default a

    @arg commonEvent
    @text Common Event Id
    @type common_event
    @desc The common event Id to assign to that key.
    @default 0

@command remove
@text Remove
@desc Remove a common event of a key.

    @arg key
    @text Keyboard button
    @type select
    @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
    @desc Choose your key.
    @default a

@command assignGamePad
@text Assign (Game Pad)
@desc Assing a common event to a game pad key.

    @arg key
    @text Game pad button
    @type select
    @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right

    @arg commonEvent
    @text Common Event Id
    @type common_event
    @desc The common event Id to assign to that game pad key.
    @default 0

@command removeGamePad
@text Remove (Game Pad)
@desc Remove a common event of a key.

    @arg key
    @text Game pad button
    @type select
    @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right

*/

/* ------------------------------ KEYBOARD KEYS ----------------------------- */
{
/*~struct~presetKeysSt:

@param key
@text Keyboard Key
@type select
@option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc The keyboard key. It's not case sensitive.
@default a

@param id
@text Common Event Id
@type common_event
@desc The common event Id.
@default 0

*/
}

/* ------------------------------ GAMEPAD KEYS ------------------------------ */
{
/*~struct~presetGamePadKeysSt:

@param key
@text Game pad button
@type select
@option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right

@param id
@text Common Event Id
@type common_event
@desc The common event Id.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ButtonCommonEvents = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ButtonCommonEvents = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-button-common-events-for-rpg-maker-mz",
    parameters: {
        overwrite: false,
        presetKeys: [{key: "", id: 0}],
        presetKeysGamePad: [{key: "", id: 0}],
    },
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = ["assign", "remove", "assignGamePad", "removeGamePad"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    createInitialData(){
        const keyboardData = {}
        const gamepadData = {}

        for(const data of this.param().presetKeys){
            const key = String(data.key).toLowerCase()
            keyboardData[key] = data.id
            this.addToKeyMapper(data.key)
        }

        for(const data of this.param().presetKeysGamePad){
            const key = String(data.key).toLowerCase()
            gamepadData[key] = data.id
            this.addToGamePadMapper(data.key)
        }
        

        return [keyboardData, gamepadData]
    },

    getKeyboardData(){
        return $eliData.buttonCommonEvents()
    },

    getGamepadData(){
        return $eliData.gamePadCommonEvents()
    },

    setKeyboardData(keyName, commonEventId){
        $eliData.buttonCommonEvents()[keyName] = commonEventId
    },

    setGamepadData(keyName, commonEventId){
        $eliData.gamePadCommonEvents()[keyName] = commonEventId
    },

    isValidKey(keyName){
        return $eliData.buttonCommonEvents().hasOwnProperty(keyName)
    },

    addToKeyMapper(keyName){
        const keyValue = String(keyName).toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyValue]

        if(this.parameters.overwrite){
            Input.keyMapper[keyCode] = keyValue

        }else if(!Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = keyValue
        }
    },

    addToGamePadMapper(keyName){
        const keyValue = String(keyName).toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyValue]

        if(this.parameters.overwrite){
            Input.gamepadMapper[keyCode] = keyValue

        }else if(!Eli.KeyCodes.isDefaultGamepad(keyCode)){
            Input.gamepadMapper[keyCode] = keyValue
        }
    },

    loadKeyMapperChanges(){
        for(let keyName in this.getKeyboardData()){
            Plugin.addToKeyMapper(keyName)
        }
        for(let keyName in this.getGamepadData(true)){
            Plugin.addToGamePadMapper(keyName)
        }
    },

    updateGamePad(){
        const index = Input._gamepadStates[0].indexOf(true)

        if(index !== -1){
            const key = Input.gamepadMapper[index]
            const commonEventId = this.getGamepadData()[key]

            if(commonEventId){
                $gameTemp.reserveCommonEvent(commonEventId)
                Input._gamepadStates[0].fill(false)
            }

        }
    },

    updateKeyboard(){
        const commonEventId = this.getKeyboardData()[Input._latestButton]
        $gameTemp.reserveCommonEvent(commonEventId)
        Input._latestButton = null
    },

    update(){
        if(!$gameMap.isEventRunning()){
            if(this.isValidKey(Input._latestButton)){
                this.updateKeyboard()
            }
            if(Input._gamepadStates.length > 0){
                this.updateGamePad()
            }
        }

        
    },
/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
    assign(args){
        const keyName = args.key.toLowerCase()
        const commonEventId = Number(args.commonEvent)
        this.addToKeyMapper(keyName)
        this.setKeyboardData(keyName, commonEventId)
    },

    remove(args){
        const keyName = args.key.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        delete Input.keyMapper[keyCode]
        delete this.getKeyboardData()[keyName]
    },

    assignGamePad(args){
        const keyName = String(args.key).toLowerCase()
        const commonEventId = Number(args.commonEvent)

        this.addToGamePadMapper(keyName)
        this.setGamepadData(keyName, +commonEventId)
    },

    removeGamePad(args){
        const keyName = String(args.key).toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        delete Input.gamepadMapper[keyCode]
        delete this.getGamepadData()[keyName]
    },

}

const Alias = Eli.ButtonCommonEvents.alias
const Plugin = Eli.ButtonCommonEvents

Plugin.initialize()

/* -------------------------------- SAVE DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.createButtonCommonEventData()
}

Eli_SavedContents.prototype.createButtonCommonEventData = function(){
    const [keyboardData, gamepadData] = Plugin.createInitialData()
    this.contents.buttonCommonEvents = keyboardData
    this.contents.gamePadCommonEvents = gamepadData
}

Eli_SavedContents.prototype.buttonCommonEvents = function(){
    return this.contents.buttonCommonEvents
}

Eli_SavedContents.prototype.gamePadCommonEvents = function(){
    return this.contents.gamePadCommonEvents
}

}

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractSaveContents = DataManager.extractSaveContents
DataManager.extractSaveContents = function(contents) {
    Alias.DataManager_extractSaveContents.call(this, contents)
    Plugin.loadKeyMapperChanges()
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function(){
    Alias.Scene_Map_update.call(this)
    Plugin.update()
}

}

}