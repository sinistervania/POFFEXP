(() => {
    const parameters = PluginManager.parameters('BloodkinFootstepTracker');
    const enableSteppingSounds = parameters['EnableSteppingSounds'] === 'true';

    const SUPPRESS_NOISES_MAPS = [1, 2, 5];
    const MAX_HEARING_DISTANCE = 20;
    
    const STEPPING_NOISES = {
        4: { se: 'Equip2', volume: 40, pitch: 120, pan: 0, delay: 45 },
        14: { se: 'Move4', volume: 40, pitch: 90, pan: 0, delay: 45 },
        15: { se: 'Move3', volume: 40, pitch: 120, pan: 0, delay: 45 },
        16: { se: 'Move2', volume: 40, pitch: 150, pan: 0, delay: 45 },
        17: { se: 'Move1', volume: 40, pitch: 150, pan: 0, delay: 45 },
        18: { se: 'Ice1', volume: 40, pitch: 150, pan: 0, delay: 45 },
        19: { se: 'Sword3', volume: 40, pitch: 70, pan: 0, delay: 45 },
        20: { se: 'Water2', volume: 40, pitch: 150, pan: 0, delay: 45 },
        21: { se: 'Move6', volume: 40, pitch: 130, pan: 0, delay: 90 },
        22: { se: 'Move6Cut1', volume: 40, pitch: 130, pan: 0, delay: 60 },
        28: { se: 'footsteps_grass_loudcropped', volume: 90, pitch: 100, pan: 0, delay: 45 },
        27: { se: 'Stepping_Noise_Forestbridges4', volume: 100, pitch: 70, pan: 0, delay: 45 },
        34: { se: 'Water1', volume: 40, pitch: 90, pan: 0, delay: 45 },
        35: { se: 'footstep_dirt', volume: 90, pitch: 130, pan: 0, delay: 60 },
        40: { se: 'footsteps_grass_loudcropped', volume: 90, pitch: 80, pan: 0, delay: 45 },
        46: { event: 'SteppedOnWeb', delay: 45 }
    };

    // Helper functions
    const getDistance = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const calculatePan = (sourceX, playerX) => {
        const panRange = 100;
        const maxPanDistance = 10;
        const diff = sourceX - playerX;
        const pan = Math.round((diff / maxPanDistance) * panRange);
        return Math.max(-panRange, Math.min(panRange, pan));
    };

    const calculateVolume = (distance, baseVolume) => {
        if (distance >= MAX_HEARING_DISTANCE) return 0;
        const volumeReduction = (distance / MAX_HEARING_DISTANCE);
        return Math.round(baseVolume * (1 - volumeReduction));
    };

    // Enemy footstep handling
    const Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        Game_Event_initialize.call(this, mapId, eventId);
        this._lastStepTime = 0;
    };

    Game_Event.prototype.updateFootsteps = function() {
        if (!this.event() || !this.isMoving()) return;
        if (!enableSteppingSounds) return;
        if (SUPPRESS_NOISES_MAPS.includes($gameMap.mapId())) return;
        
        // Check for SteppingNoise tag in event notes
        const hasSteppingNoise = this.event().note && this.event().note.includes('<SteppingNoise>');
        if (!hasSteppingNoise) return;

        const currentTime = Graphics.frameCount;
        const regionId = $gameMap.regionId(this.x, this.y);
        const noiseData = STEPPING_NOISES[regionId];

        if (!noiseData || !noiseData.se) return;

        const timeSinceLastStep = currentTime - this._lastStepTime;
        if (timeSinceLastStep < (noiseData.delay || 45)) return;

        const distance = getDistance(this.x, this.y, $gamePlayer.x, $gamePlayer.y);
        if (distance >= MAX_HEARING_DISTANCE) return;

        const volume = calculateVolume(distance, noiseData.volume);
        const pan = calculatePan(this.x, $gamePlayer.x);

        AudioManager.playSe({
            name: noiseData.se,
            volume: volume,
            pitch: noiseData.pitch,
            pan: pan
        });

        this._lastStepTime = currentTime;
    };

    const Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        Game_Event_update.call(this);
        this.updateFootsteps();
    };

    // Player footstep handling
    const Game_Player_initialize = Game_Player.prototype.initialize;
    Game_Player.prototype.initialize = function() {
        Game_Player_initialize.call(this);
        this._lastStepTime = 0;
    };

    Game_Player.prototype.updateFootsteps = function() {
        if (!this.isMoving()) return;
        if (!enableSteppingSounds) return;
        if (SUPPRESS_NOISES_MAPS.includes($gameMap.mapId())) return;

        const currentTime = Graphics.frameCount;
        const regionId = this.regionId();
        const noiseData = STEPPING_NOISES[regionId];

        if (!noiseData || !noiseData.se) return;
        
        const timeSinceLastStep = currentTime - this._lastStepTime;
        if (timeSinceLastStep < (noiseData.delay || 45)) return;

        AudioManager.playSe({
            name: noiseData.se,
            volume: noiseData.volume,
            pitch: noiseData.pitch,
            pan: noiseData.pan
        });

        this._lastStepTime = currentTime;
    };

    const Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        Game_Player_update.call(this, sceneActive);
        this.updateFootsteps();
    };
})();