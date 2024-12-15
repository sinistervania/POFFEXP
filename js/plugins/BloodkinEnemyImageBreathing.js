/*:
 * @target MZ
 * @plugindesc Adds breathing effect and targeting crosshair to hovered enemies in combat.
 * @author Bloodkin (Enhanced by Assistant)
 * 
 * @param Scale Factor
 * @text Scale Factor
 * @type number
 * @decimals 3
 * @min 1.00
 * @max 1.02
 * @desc The maximum scale factor for the breathing effect. Default: 1.01 (1% increase)
 * @default 1.01
 * 
 * @param Breathing Speed
 * @text Breathing Speed
 * @type number
 * @min 20
 * @max 240
 * @desc The speed of the breathing effect in frames. Set between 20 and 240.
 * @default 120
 * 
 * @param Base Movement Range
 * @text Base Movement Range
 * @type number
 * @min 10
 * @desc Base pixel range for crosshair movement. Will be modified by accuracy.
 * @default 20
 * 
 * @param Max Movement Range
 * @text Max Movement Range
 * @type number
 * @min 20
 * @desc Maximum pixel range for crosshair movement at 0% accuracy.
 * @default 100
 * 
 * @param Crosshair Scale
 * @text Crosshair Scale
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 5.0
 * @desc Scale factor for the crosshair size. Default: 1.0
 * @default 1.0
 * 
 * @help
 * This plugin adds:
 * 1. A subtle breathing animation to hovered enemy sprites
 * 2. A rotating and moving crosshair overlay on hovered enemies
 * 3. Crosshair movement range varies based on active actor's accuracy
 * 4. Perfect accuracy (100% or more) shows a special stable crosshair
 * 5. Displays hit rate percentage when below 100%
 * 6. Different crosshair for physical and magical attacks
 * 7. Adjustable crosshair size via plugin parameters
 * 
 * Required Images:
 * - img/pictures/TargettingCrosshair50x50 (normal physical crosshair)
 * - img/pictures/TargettingCrosshair50x50Perfect (perfect accuracy crosshair)
 * - img/pictures/TargettingCrosshair50x50Magic (magical attack crosshair)
 * 
 * Note Tags (add to enemy in database):
 * <crosshairOffsetX:30>  // Moves crosshair 30 pixels right
 * <crosshairOffsetX:-30> // Moves crosshair 30 pixels left
 * <crosshairOffsetY:30>  // Moves crosshair 30 pixels down
 * <crosshairOffsetY:-30> // Moves crosshair 30 pixels up
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinEnemyImageBreathing');
    const scaleFactor = parseFloat(parameters['Scale Factor'] || '1.01');
    const breathingSpeed = Number(parameters['Breathing Speed'] || 120);
    const baseMovementRange = Number(parameters['Base Movement Range'] || 20);
    const maxMovementRange = Number(parameters['Max Movement Range'] || 100);
    const crosshairScale = Number(parameters['Crosshair Scale'] || 1.0);

    let lastHoveredEnemy = null;
    let frameCounter = 0;
    let lastSelectedSkill = null;  // Stores the last selected skill
    
    //-----------------------------------------------------------------------------
    // Note Tag Processing
    //
    const getCrosshairOffset = (enemy) => {
        const noteData = enemy.enemy().note;
        const offsetX = noteData.match(/<crosshairOffsetX:(-?\d+)>/);
        const offsetY = noteData.match(/<crosshairOffsetY:(-?\d+)>/);
        
        return {
            x: offsetX ? parseInt(offsetX[1]) : 0,
            y: offsetY ? parseInt(offsetY[1]) : 0
        };
    };

    //-----------------------------------------------------------------------------
    // Accuracy Calculations
    //
    const getActiveActorAccuracy = () => {
        const scene = SceneManager._scene;
        if (scene && scene instanceof Scene_Battle) {
            const actor = BattleManager.actor();
            if (actor) {
                return actor.hit;
            }
        }
        return 1;
    };

    const getSelectedSkill = () => {
        const scene = SceneManager._scene;
        if (!(scene instanceof Scene_Battle)) return null;
        
        // Check if windows exist and are active
        if (scene._actorCommandWindow && scene._actorCommandWindow.active) {
            if (scene._actorCommandWindow.currentSymbol() === 'attack') {
                lastSelectedSkill = scene._actorCommandWindow._actor ? 
                    $dataSkills[scene._actorCommandWindow._actor.attackSkillId()] : null;
                return lastSelectedSkill;
            }
        }
        
        if (scene._skillWindow && scene._skillWindow.active && scene._skillWindow.item()) {
            lastSelectedSkill = scene._skillWindow.item();
            return lastSelectedSkill;
        }
        
        // Default to the last selected skill if no active selection window
        if (lastSelectedSkill) {
            return lastSelectedSkill;
        }
        
        // If no skill has been selected yet, default to normal attack
        if (BattleManager.actor()) {
            lastSelectedSkill = $dataSkills[BattleManager.actor().attackSkillId()];
            return lastSelectedSkill;
        }
        
        return null;
    };

    const isPhysicalAttack = (skill) => {
        if (!skill) return true; // Default to physical if no skill
        return skill.hitType === Game_Action.HITTYPE_PHYSICAL;
    };

    const isMagicalAttack = (skill) => {
        if (!skill) return false;
        return skill.hitType === Game_Action.HITTYPE_MAGICAL;
    };

    const isCertainHit = (skill) => {
        if (!skill) return false;
        return skill.hitType === Game_Action.HITTYPE_CERTAIN;
    };

    const getTargetEvasion = (target) => {
        if (!target) return 0;

        const skill = getSelectedSkill();
        if (!skill) return target.eva;

        switch (skill.hitType) {
            case Game_Action.HITTYPE_MAGICAL:
                return target.mev; // Magic Evasion
            case Game_Action.HITTYPE_PHYSICAL:
                return target.eva; // Physical Evasion
            case Game_Action.HITTYPE_CERTAIN:
                return 0; // Certain hit ignores evasion
            default:
                return target.eva; // Default to physical evasion
        }
    };

    const calculateHitChance = (accuracy, evasion) => {
        return Math.max(0, Math.min(1, accuracy * (1 - evasion)));
    };

    const calculateMovementRange = (hitChance) => {
        // No maximum limit on movement range
        return baseMovementRange + ((1 - hitChance) * baseMovementRange * 10);
    };
    
    //-----------------------------------------------------------------------------
    // Sprite_AccuracyText
    //
    function Sprite_AccuracyText() {
        this.initialize(...arguments);
    }

    Sprite_AccuracyText.prototype = Object.create(Sprite.prototype);
    Sprite_AccuracyText.prototype.constructor = Sprite_AccuracyText;

    Sprite_AccuracyText.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(48, 24);
        this.anchor.x = 0;
        this.anchor.y = 0.5;
        this.visible = false;
    };

    Sprite_AccuracyText.prototype.updateAccuracy = function(accuracy, parentRotation) {
        this.visible = accuracy < 1;
        if (this.visible) {
            this.bitmap.clear();
            this.bitmap.fontSize = 14;
            this.bitmap.textColor = '#ffffff';
            this.bitmap.outlineColor = 'rgba(0, 0, 0, 0.8)';
            this.bitmap.outlineWidth = 3;
            const hitRate = Math.floor(accuracy * 100);
            this.bitmap.drawText(`${hitRate}%`, 0, 0, 48, 24, 'left');
            
            // Calculate position to always be on the right
            const radius = 25; // Distance from center of crosshair
            this.x = Math.cos(-parentRotation) * radius;
            this.y = Math.sin(-parentRotation) * radius;
            
            // Counter-rotate to stay upright
            this.rotation = -parentRotation;
        }
    };
    
    //-----------------------------------------------------------------------------
    // Sprite_TargetingCrosshair
    //
    function Sprite_TargetingCrosshair() {
        this.initialize(...arguments);
    }

    Sprite_TargetingCrosshair.prototype = Object.create(Sprite.prototype);
    Sprite_TargetingCrosshair.prototype.constructor = Sprite_TargetingCrosshair;

    Sprite_TargetingCrosshair.prototype.loadCrosshairBitmaps = function() {
        this.normalBitmap = ImageManager.loadPicture('TargettingCrosshair50x50');
        this.magicBitmap = ImageManager.loadPicture('TargettingCrosshair50x50Magic');
        this.perfectBitmap = ImageManager.loadPicture('TargettingCrosshair50x50Perfect');
        this.bitmap = this.normalBitmap; // Default to normal bitmap initially
    };

    Sprite_TargetingCrosshair.prototype.createAccuracyText = function() {
        this._accuracyText = new Sprite_AccuracyText();
        this._accuracyText.x = 25;
        this.addChild(this._accuracyText);
    };

    Sprite_TargetingCrosshair.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.loadCrosshairBitmaps();
        this.createAccuracyText();
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.frameCount = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.baseOffsetX = 0;
        this.baseOffsetY = 0;
        this.movementRange = baseMovementRange;
        this.isPerfectAccuracy = false;
        this._currentRotation = 0;
        this._targetBattler = null;
        this._lastSkillType = null;
        
        // Apply crosshair scale from parameters
        this.scale.set(crosshairScale, crosshairScale);
    };

    Sprite_TargetingCrosshair.prototype.setTargetBattler = function(battler) {
        this._targetBattler = battler;
    };

    Sprite_TargetingCrosshair.prototype.getCurrentHitChance = function() {
        const accuracy = getActiveActorAccuracy();
        const skill = getSelectedSkill();
        
        // Certain hit skills always hit
        if (skill && isCertainHit(skill)) {
            return 1;
        }

        const evasion = getTargetEvasion(this._targetBattler);
        return calculateHitChance(accuracy, evasion);
    };

    Sprite_TargetingCrosshair.prototype.update = function() {
        Sprite.prototype.update.call(this);
        const hitChance = this.getCurrentHitChance();
        this.updateAccuracyState(hitChance);
        this.updateCrosshairType();
        
        if (!this.isPerfectAccuracy) {
            this.movementRange = calculateMovementRange(hitChance);
            this.updateRotation();
            this.updatePosition();
            this._accuracyText.updateAccuracy(hitChance, this._currentRotation);
        } else {
            // Perfect accuracy - stay still at base offset
            this.rotation = 0;
            this._currentRotation = 0;
            this.x = this.baseOffsetX;
            this.y = this.baseOffsetY;
            this._accuracyText.visible = false;
        }
    };

    Sprite_TargetingCrosshair.prototype.updateCrosshairType = function() {
        const skill = getSelectedSkill();
    
        if (this.isPerfectAccuracy || (skill.hitType === Game_Action.HITTYPE_CERTAIN)) {
            this.bitmap = this.perfectBitmap;
            
        } else if (skill.hitType === Game_Action.HITTYPE_MAGICAL) {
            this.bitmap = this.magicBitmap;
            
        } else {
            this.bitmap = this.normalBitmap;
            
        }
    };

    Sprite_TargetingCrosshair.prototype.updateAccuracyState = function(accuracy) {
        const wasPerfect = this.isPerfectAccuracy;
        this.isPerfectAccuracy = accuracy >= 1;
        
        if (wasPerfect !== this.isPerfectAccuracy) {
            this.updateCrosshairType();
        }
    };

    Sprite_TargetingCrosshair.prototype.updateRotation = function() {
        this._currentRotation = (this.frameCount % 60) * (Math.PI * 2 / 60);
        this.rotation = this._currentRotation;
    };

    Sprite_TargetingCrosshair.prototype.updatePosition = function() {
        if (this.frameCount % 60 === 0) {
            const range = this.movementRange;
            this.targetOffsetX = Math.random() * range * 2 - range;
            this.targetOffsetY = Math.random() * range * 2 - range;
        }
        
        this.offsetX += (this.targetOffsetX - this.offsetX) * 0.1;
        this.offsetY += (this.targetOffsetY - this.offsetY) * 0.1;
        
        this.x = this.offsetX + this.baseOffsetX;
        this.y = this.offsetY + this.baseOffsetY;
        
        this.frameCount++;
    };

    Sprite_TargetingCrosshair.prototype.reset = function() {
        this.frameCount = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.targetOffsetX = 0;
        this.targetOffsetY = 0;
        this.rotation = 0;
        this._currentRotation = 0;
        const accuracy = getActiveActorAccuracy();
        this.isPerfectAccuracy = accuracy >= 1;
        this.updateCrosshairType();
    };

    Sprite_TargetingCrosshair.prototype.setBaseOffset = function(x, y) {
        this.baseOffsetX = x;
        this.baseOffsetY = y;
    };

    //-----------------------------------------------------------------------------
    // Sprite_Enemy modifications

    const _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
    Sprite_Enemy.prototype.initialize = function(battler) {
        _Sprite_Enemy_initialize.call(this, battler);
        this.createTargetingCrosshair();
    };

    Sprite_Enemy.prototype.createTargetingCrosshair = function() {
        this._targetingCrosshair = new Sprite_TargetingCrosshair();
        this.addChild(this._targetingCrosshair);
    };

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateBreathingAndTargeting();
    };

    Sprite_Enemy.prototype.updateBreathingAndTargeting = function() {
        const hoveredEnemy = this.getHoveredEnemy();
        
        if (this._battler === hoveredEnemy) {
            if (this._battler !== lastHoveredEnemy) {
                frameCounter = 0;
                this._targetingCrosshair.reset();
                this._targetingCrosshair.setTargetBattler(this._battler);
                
                const offset = getCrosshairOffset(this._battler);
                this._targetingCrosshair.setBaseOffset(offset.x, offset.y);
                
                lastHoveredEnemy = this._battler;
            }
            const scale = 1 + (Math.sin(frameCounter / breathingSpeed) * (scaleFactor - 1));
            this.scale.set(scale, scale);
            
            this._targetingCrosshair.visible = true;
            
            frameCounter++;
        } else {
            this.scale.set(1, 1);
            this._targetingCrosshair.visible = false;
            
            if (this._battler === lastHoveredEnemy) {
                lastHoveredEnemy = null;
            }
        }
    };

    Sprite_Enemy.prototype.getHoveredEnemy = function() {
        const enemyWindow = SceneManager._scene._enemyWindow;
        if (enemyWindow && enemyWindow.active) {
            return enemyWindow.enemy();
        }
        return null;
    };

})();