///////////////////////////
// thisEvent Declaration //
///////////////////////////

// Alias Event Game Interpreter Setup
const Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_setup = Game_Interpreter.prototype.setup;
Game_Interpreter.prototype.setup = function(list, eventId) {
	if(SceneManager._scene.constructor === Scene_Map){
		window.thisEvent = $gameMap.event(eventId);  //had to use window to make it global, couldn't get this working otherwise.
	}
    Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_setup.call(this, list, eventId);
};
	
// Alias Conditional Branch Command
const Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function(params) {
    if (SceneManager._scene.constructor === Scene_Map) {
        window.thisEvent = $gameMap.event(this._eventId);  // Ensure global reference for thisEvent
    }
    return Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command111.call(this, params);
};

// Custom script block handler
const Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
    if(SceneManager._scene.constructor === Scene_Map){
        const interpreter = this;
        window.thisEvent = $gameMap.event(this._eventId);
        
        let script = this.currentCommand().parameters[0];
        let index = this._index + 1;
        while (this._list[index] && this._list[index].code === 655) {
            script += '\n' + this._list[index].parameters[0];
            index++;
        }
        
        try {
            // Create a function that preserves the interpreter context
            (function() {
                const self = interpreter;
                eval(script);
            }).call(this);
            
            this._index = index - 1;
            return true;
        } catch (e) {
            console.warn('Script Execution Error:', e);
            return true;
        }
    }else{
        return Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command355.call(this);
    }
};


/*     //Keep As Backup Incase Error Occur From Newer Version
// Custom script block handler
const Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command355 = Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
	if(SceneManager._scene.constructor === Scene_Map){

		window.thisEvent = $gameMap.event(this._eventId);
		
		let script = this.currentCommand().parameters[0];
		let index = this._index + 1;
		while (this._list[index] && this._list[index].code === 655) {
			script += '\n' + this._list[index].parameters[0];
			index++;
		}
		
		try {
			// Create a context object to safely pass thisEvent
			const context = {
				event: thisEvent,
				// Add other potentially useful context properties
				map: $gameMap,
				party: $gameParty,
				troop: $gameTroop
			};

			// Use Function constructor for safer evaluation
			const scriptFunction = new Function('context', 
				'window.thisEvent = context.event;' + 
				script
			);

			scriptFunction(context);
			this._index = index - 1;
			return true;
		} catch (e) {
			// Only log if it's not a simple "undefined" error
			if (!(e instanceof TypeError && e.message.includes('undefined'))) {
				console.warn('Script Execution Warning:', e);
			}
			return true;
		}
	}else{
		return  Alias_X_SNK_ThisEvent_Shortcut_Game_Interpreter_command355.call(this);
	}
};
*/


/////////////////////////
// Additional Features //
/////////////////////////

//Save Event Id To Array
const Alias_X_SKN_SaveEventToArray_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	//Create $eventsArray if it does not yet exist
	if(!$eventsArray[this._mapId]){
		$eventsArray[this._mapId] = []
	}
	
	for(let i = 1; i < $gameMap._events.length; i++){
		//Save Event Array Data Before Updating New Map Data If ._saveEventData Is Found
		if(this._events[i] && this._events[i].saveEventData == true){
			$eventsArray[this._mapId][i] = JsonEx.makeDeepCopy(this._events[i])
		}
		//Clear Global NickNames Before Loading New Map if ._nickName Is Found
        if (this._events[i] && this._events[i]._nickName != null) {
            delete window[this._events[i]._nickName];
        }
	}

	Alias_X_SKN_SaveEventToArray_Game_Map_setup.call(this, mapId);
};

//Load Event Id From Array
const Alias_X_SNK_LoadEventFromArray_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {        
	Alias_X_SNK_LoadEventFromArray_Game_Map_setupEvents.call(this);
	
	if($eventsArray[this._mapId]){
		for(let i = 1; i < $gameMap._events.length; i++){
			if($eventsArray[this._mapId][i] && $eventsArray[this._mapId][i].saveEventData){
				this._events[i] = JsonEx.makeDeepCopy($eventsArray[this._mapId][i])
				if(this._events[i].saveXYLocation == false){
					this._events[i]._realX = JsonEx.makeDeepCopy(this._events[i].originX)
					this._events[i]._realY = JsonEx.makeDeepCopy(this._events[i].originY)
				}
			}
		}
	}
};


//Update Event Nicknames On Map Load
const Alias_X_SNK_UpdateEventNickNames_Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {        
	Alias_X_SNK_UpdateEventNickNames_Game_Map_setupEvents.call(this);
	
	if($eventsArray[this._mapId]){
		for(let i = 1; i < $gameMap._events.length; i++){
			if($eventsArray[this._mapId][i] && $eventsArray[this._mapId][i]._nickName){
				//window[$eventsArray[this._mapId][i]._nickName] = $eventsArray[this._mapId][i];
                Object.defineProperty(window, $eventsArray[this._mapId][i]._nickName, {
                    get: () => $gameMap.event(i),
                    configurable: true //Allows Reassignment Later
                });
			}
		}
	}
};


//Use Custom Move Route 
Game_Event.prototype.customMoveRoute = function() {
	if (this._customMoveRoute) {
		eval(this._customMoveRoute);
	}
};

//Complete Init And Assign NickName As Global Variable
Game_Event.prototype.completeInit = function() {
	if (this._nickName != null) {
		//window[this._nickName] = this;
		Object.defineProperty(window, this._nickName, {
			get: () => $gameMap.event(this.eventId()),
			configurable: true //Allows Reassignment Later
		});
	}
	this._initComplete = true;
};




////////////////////////
// Manage Object Data //
////////////////////////

//New Game
const Alias_X_SNK_SaveEvents_DataArray_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	Alias_X_SNK_SaveEvents_DataArray_DataManager_createGameObjects.call(this)
	$eventsArray = [];
};

//File Save
const Alias_X_SNK_SaveEvents_DataArray_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	const contents = Alias_X_SNK_SaveEvents_DataArray_DataManager_makeSaveContents.call(this);
	contents.eventsArray = $eventsArray;
	return contents;
};

//File Load
const Alias_X_SNK_LoadEvents_DataArray_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	Alias_X_SNK_LoadEvents_DataArray_DataManager_extractSaveContents.call(this, contents);
	contents.eventsArray ? $eventsArray = contents.eventsArray : console.warn("Could not load Core Settings data!");
};