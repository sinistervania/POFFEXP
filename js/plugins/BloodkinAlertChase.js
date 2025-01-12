/*:
 * @target MZ
 * @plugindesc Bloodkin Alert Chase - Simple detection and chase system for RPG Maker MZ events.
 * @author Bloodkin
 * 
 * @param AlertSoundEffect
 * @text Alert Sound Effect
 * @desc Sound effect to play when an event detects the player
 * @default Attack1
 * @type file
 * @dir audio/se/
 * 
 * @param AlertBalloon
 * @text Alert Balloon ID
 * @desc Balloon animation ID to show when event detects player
 * @type number
 * @min 1
 * @max 15
 * @default 1
 * 
 * @param InitialAlertDelay
 * @text Alert to Chase Delay
 * @desc Frames to wait between detection and chase start
 * @type number
 * @min 1
 * @default 30
 * 
 * @param GiveUpBalloon
 * @text Give Up Balloon ID
 * @desc Balloon animation ID to show when event loses player
 * @type number
 * @min 1
 * @max 15
 * @default 8
 * 
 * @help
 * BloodkinAlertChase.js
 * 
 * Available notetags:
 * <BAlert>               - Enable alert/chase behavior
 * <BAlertDistance:X>     - Set detection range in tiles
 * <BChaseSpeed:X>        - Set chase movement speed (1-6)
 * <BChaseDuration:X>     - Set chase duration in frames
 * <BVisionAngle:X>       - Set vision cone angle (1-360)
 * <BBlockSightRegion>    - Make region ID 4 block sight
 * <BShowVisionCone>      - Show the vision cone
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinAlertChase');
    const alertSoundEffect = parameters['AlertSoundEffect'] || '';
    const alertBalloon = Number(parameters['AlertBalloon'] || 1);
    const initialAlertDelay = Number(parameters['InitialAlertDelay'] || 30);
    const giveUpBalloon = Number(parameters['GiveUpBalloon'] || 2);

    //-----------------------------------------------------------------------------
    // Sprite_VisionCone
    //
    function Sprite_VisionCone() {
        this.initialize(...arguments);
    }

    Sprite_VisionCone.prototype = Object.create(Sprite.prototype);
    Sprite_VisionCone.prototype.constructor = Sprite_VisionCone;

    Sprite_VisionCone.prototype.initialize = function(event) {
        Sprite.prototype.initialize.call(this);
        this._event = event;
        this.bitmap = new Bitmap(Graphics.width, Graphics.height);
        this.opacity = 128;
        this.z = 1;
        this.blendMode = 1;
    };

    Sprite_VisionCone.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._event && this._event._bShowVisionCone) {
            this.updatePosition();
            this.redrawCone();
        }
    };

    Sprite_VisionCone.prototype.updatePosition = function() {
        this.x = 0;
        this.y = 0;
    };

    Sprite_VisionCone.prototype.redrawCone = function() {
        const event = this._event;
        if (!event) return;
        
        this.bitmap.clear();
        
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const scrolledX = event.scrolledX() * tileWidth;
        const scrolledY = event.scrolledY() * tileHeight;
        const radius = event._bAlertDistance * tileWidth;
        
        // Convert direction to proper angle in radians
        let baseAngle;
        switch(event.direction()) {
            case 2: // Down
                baseAngle = Math.PI / 2;
                break;
            case 4: // Left
                baseAngle = Math.PI;
                break;
            case 6: // Right
                baseAngle = 0;
                break;
            case 8: // Up
                baseAngle = -Math.PI / 2;
                break;
            default:
                baseAngle = 0;
        }
        
        const halfConeAngle = (event._bVisionAngle / 2) * (Math.PI / 180);
        
        this.bitmap.context.save();
        this.bitmap.context.beginPath();
        this.bitmap.context.moveTo(scrolledX, scrolledY);
        this.bitmap.context.arc(scrolledX, scrolledY, radius, 
            baseAngle - halfConeAngle, 
            baseAngle + halfConeAngle);
        this.bitmap.context.lineTo(scrolledX, scrolledY);
        this.bitmap.context.fillStyle = 'rgba(255, 255, 0, 0.2)';
        this.bitmap.context.fill();
        this.bitmap.context.restore();
    };

    //-----------------------------------------------------------------------------
    // Game_Event
    //
    const alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        alias_Game_Event_initMembers.call(this);
        this._bAlertEnabled = false;
        this._bAlertDistance = 3;
        this._bChaseSpeed = 4;
        this._bChaseDuration = 300;
        this._bVisionAngle = 90;
        this._bChaseCounter = 0;
        this._bChasing = false;
        this._bBlockSightRegion = false;
        this._bShowVisionCone = false;
        this._bAlertDelay = initialAlertDelay;
        this._bAlertCooldown = 0;
    };

    const alias_Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        alias_Game_Event_setupPageSettings.call(this);
        if (this.page()) {
            this.processBChaseNotetags();
        }
    };

    Game_Event.prototype.processBChaseNotetags = function() {
        if (!this.event().note) return;
        
        const notes = this.event().note.split(/[\r\n]+/);
        notes.forEach(note => {
            if (note.match(/<BAlert>/i)) {
                this._bAlertEnabled = true;
                console.log(`Event ${this.eventId()}: Alert enabled`);
            }
            if (note.match(/<BAlertDistance:(\d+)>/i)) {
                this._bAlertDistance = parseInt(RegExp.$1);
                console.log(`Event ${this.eventId()}: Alert distance set to ${this._bAlertDistance}`);
            }
            if (note.match(/<BChaseSpeed:(\d+)>/i)) {
                this._bChaseSpeed = parseInt(RegExp.$1);
                console.log(`Event ${this.eventId()}: Chase speed set to ${this._bChaseSpeed}`);
            }
            if (note.match(/<BChaseDuration:(\d+)>/i)) {
                this._bChaseDuration = parseInt(RegExp.$1);
                console.log(`Event ${this.eventId()}: Chase duration set to ${this._bChaseDuration}`);
            }
            if (note.match(/<BVisionAngle:(\d+)>/i)) {
                this._bVisionAngle = parseInt(RegExp.$1);
                console.log(`Event ${this.eventId()}: Vision angle set to ${this._bVisionAngle}`);
            }
            if (note.match(/<BBlockSightRegion>/i)) {
                this._bBlockSightRegion = true;
                console.log(`Event ${this.eventId()}: Block sight enabled`);
            }
            if (note.match(/<BShowVisionCone>/i)) {
                this._bShowVisionCone = true;
                console.log(`Event ${this.eventId()}: Vision cone display enabled`);
            }
        });
    };

    Game_Event.prototype.updateChase = function() {
        if (!this._bAlertEnabled) return;

        // Update chase state
        if (this._bChasing) {
            this._bChaseCounter--;
            const distance = this.distanceToPlayer();
            console.log(`Event ${this.eventId()}: Chasing - Counter: ${this._bChaseCounter}, Distance: ${distance}`);
            
            if (this._bChaseCounter <= 0 || distance > this._bAlertDistance * 1.5) {
                this.endChase();
            } else {
                this.moveTowardPlayer();
            }
        } else {
            // Check for player detection
            if (this.canSeePlayer()) {
                console.log(`Event ${this.eventId()}: Player spotted!`);
                if (this._bAlertCooldown <= 0) {
                    this.startAlert();
                }
            }
        }
        
        // Update alert cooldown
        if (this._bAlertCooldown > 0) {
            this._bAlertCooldown--;
            if (this._bAlertCooldown <= 0) {
                this.startChase();
            }
        }
    };

    Game_Event.prototype.startAlert = function() {
        console.log(`Event ${this.eventId()}: Starting alert`);
        this._bAlertCooldown = this._bAlertDelay;
        this._originalMoveSpeed = this.moveSpeed();
        this.requestBalloon(alertBalloon);
        if (alertSoundEffect) {
            AudioManager.playSe({
                name: alertSoundEffect,
                volume: 90,
                pitch: 100,
                pan: 0
            });
        }
    };

    Game_Event.prototype.startChase = function() {
        console.log(`Event ${this.eventId()}: Starting chase`);
        this._bChasing = true;
        this._bChaseCounter = this._bChaseDuration;
        this.setMoveSpeed(this._bChaseSpeed);
    };

    Game_Event.prototype.endChase = function() {
        console.log(`Event ${this.eventId()}: Ending chase`);
        this._bChasing = false;
        this.requestBalloon(giveUpBalloon);
        this.setMoveSpeed(this._originalMoveSpeed || 3);
        this._bAlertCooldown = 0;
    };

    Game_Event.prototype.canSeePlayer = function() {
        const inCone = this.isPlayerInVisionCone();
        if (!inCone) return false;  // Player must be within the vision cone
    
        const sightBlocked = this.isSightBlocked();
        console.log(`Event ${this.eventId()}: Sight blocked: ${sightBlocked}`);
        if (sightBlocked) return false;
    
        console.log(`Event ${this.eventId()}: Player detected!`);
        return true;
    };    

    Game_Event.prototype.distanceToPlayer = function() {
        const dx = this.x - $gamePlayer.x;
        const dy = this.y - $gamePlayer.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    Game_Event.prototype.isPlayerInVisionCone = function() {
        const dx = $gamePlayer.x - this.x;
        const dy = $gamePlayer.y - this.y;
        
        const angleToPlayer = Math.atan2(dy, dx);
        
        let facingAngle;
        switch(this.direction()) {
            case 2: // Down
                facingAngle = Math.PI / 2;
                break;
            case 4: // Left
                facingAngle = Math.PI;
                break;
            case 6: // Right
                facingAngle = 0;
                break;
            case 8: // Up
                facingAngle = -Math.PI / 2;
                break;
            default:
                facingAngle = 0;
        }
        
        let angleDiff = Math.abs(angleToPlayer - facingAngle);
        if (angleDiff > Math.PI) {
            angleDiff = Math.PI * 2 - angleDiff;
        }
        
        const halfVisionAngle = (this._bVisionAngle / 2) * (Math.PI / 180);
        return angleDiff <= halfVisionAngle;
    };

    Game_Event.prototype.isSightBlocked = function() {
        if (!this._bBlockSightRegion) return false;
        
        const dx = $gamePlayer.x - this.x;
        const dy = $gamePlayer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(distance * 2);
        
        for (let i = 1; i < steps; i++) {
            const x = Math.round(this.x + dx * i / steps);
            const y = Math.round(this.y + dy * i / steps);
            if ($gameMap.regionId(x, y) === 4) return true;
        }
        
        return false;
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //
    const alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        alias_Spriteset_Map_createLowerLayer.call(this);
        this.createVisionCones();
    };

    Spriteset_Map.prototype.createVisionCones = function() {
        this._visionConeSprites = [];
        for (const event of $gameMap.events()) {
            if (event._bShowVisionCone) {
                const sprite = new Sprite_VisionCone(event);
                this._visionConeSprites.push(sprite);
                this._tilemap.addChild(sprite);
            }
        }
    };

    const alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        alias_Spriteset_Map_update.call(this);
        this.updateVisionCones();
    };

    Spriteset_Map.prototype.updateVisionCones = function() {
        this._visionConeSprites.forEach(sprite => sprite.update());
    };
})();