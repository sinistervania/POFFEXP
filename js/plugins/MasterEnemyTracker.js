/*:
 * @target MZ
 * @plugindesc Implements DogAI and Skirmisher behavior for enemies with respective note tags.
 * @author Bloodkin
 * @help
 * This plugin implements custom AI behaviors:
 * - DogAI: Use <MET> and <DogAI> tags for wolf behavior
 * - Skirmisher: Use <MET> and <Skirmisher> tags for pirate skirmisher behavior
 */

(() => {
    // Store original methods
    const _Game_Event_update = Game_Event.prototype.update;
    const _Game_Event_updateParallel = Game_Event.prototype.updateParallel;
    const _Game_Event_moveStraight = Game_Event.prototype.moveStraight;
    const _Game_Event_jump = Game_Event.prototype.jump;

    // Main update method
    Game_Event.prototype.update = function() {
        _Game_Event_update.call(this);
        
        // Handle Skirmisher AI
        if (this.hasSkirmisherAI() && this.isChaseAlerted()) {
            if (!this._skirmisherState) {
                this.initializeSkirmisherState();
            }
            this.updateSkirmisherAI();
        }

        // Handle Dog AI
        if (this.hasDogAI() && this.isChaseAlerted()) {
            this.runDogAI();
        }

        // Update Dog AI switch timer
        if (this.hasDogAI()) {
            if (this._switchTimer > 0) {
                this._switchTimer--;
                if (this._switchTimer <= 0) {
                    $gameSwitches.setValue(1243, false);
                }
            }
        }
    };

    // AI Type Checks
    Game_Event.prototype.hasSkirmisherAI = function() {
        const eventData = this.event();
        return eventData && eventData.note && eventData.note.includes('<MET>') && eventData.note.includes('<Skirmisher>');
    };

    Game_Event.prototype.hasDogAI = function() {
        const eventData = this.event();
        return eventData && eventData.note && eventData.note.includes('<MET>') && eventData.note.includes('<DogAI>');
    };

    // Dog AI Implementation
    Game_Event.prototype.runDogAI = function() {
        if (this._dogAIState) return;
        this._dogAIState = true;
        this._dogAISequence = 0;
        this._dogAITimer = 0;
        this._originalMoveSpeed = this.moveSpeed();
    };

    Game_Event.prototype.updateParallel = function() {
        _Game_Event_updateParallel.call(this);
        if (this._dogAIState) {
            this._dogAITimer++;
            switch (this._dogAISequence) {
                case 0:
                    if (this._dogAITimer >= 120) {
                        this.requestAnimation(416);
                        this.setMoveSpeed(3);
                        this._dogAISequence++;
                        this._dogAITimer = 0;
                    }
                    break;
                case 1:
                    if (this._dogAITimer >= 180) {
                        this.performWolfJump();
                        this._dogAISequence++;
                        this._dogAITimer = 0;
                    }
                    break;
                case 2:
                    if (this._dogAITimer >= 180) {
                        this._dogAIState = false;
                        this.setMoveSpeed(this._originalMoveSpeed);
                        this._dogAITimer = 0;
                        this.runDogAI();
                    }
                    break;
            }
        }
    };

    Game_Event.prototype.performWolfJump = function() {
        const playerX = $gamePlayer.x;
        const playerY = $gamePlayer.y;
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const distance = Math.min(4, Math.sqrt(dx * dx + dy * dy));
        const angle = Math.atan2(dy, dx);
        const jumpX = Math.round(this.x + Math.cos(angle) * distance);
        const jumpY = Math.round(this.y + Math.sin(angle) * distance);
        
        this.jump(jumpX - this.x, jumpY - this.y);
        this.requestAnimation(37);
        this.setMoveSpeed(3);
        
        $gameSwitches.setValue(1243, true);
        this._switchTimer = 60;
    };

    Game_Event.prototype.jump = function(xPlus, yPlus) {
        _Game_Event_jump.call(this, xPlus, yPlus);
    };

    // Skirmisher AI Implementation
    Game_Event.prototype.initializeSkirmisherState = function() {
        this._skirmisherState = true;
        this._skirmisherPhase = 'startup';
        this._skirmisherTimer = 180;
        this._isAttacking = false;
        this._savedSpeed = this.moveSpeed();
        this._moveCounter = 0;
        this._lastDirection = 0;
        this._slowPeriod = false;
        this._slowTimer = 0;
        this._attackTimer = 0;
        this._sequenceCounter = 0;
        this.playStartupAnimation();
    };

    Game_Event.prototype.playStartupAnimation = function() {
        $gameTemp.requestAnimation([this], 153);
    };

    Game_Event.prototype.updateSkirmisherAI = function() {
        if (!this._skirmisherState) return;

        if (this._slowTimer > 0) {
            this._slowTimer--;
            if (this._slowTimer <= 0) {
                this._slowPeriod = false;
                this._moveCounter = 0;
                this._lastDirection = 0;
            }
        }

        if (this._skirmisherTimer > 0) {
            this._skirmisherTimer--;
        }

        switch (this._skirmisherPhase) {
            case 'startup':
                this.forceMoveSpeed(0);
                if (this._skirmisherTimer <= 0) {
                    this._skirmisherPhase = 'attack';
                    this._skirmisherTimer = 300;
                    this._isAttacking = true;
                }
                break;

            case 'attack':
                this.forceMoveSpeed(this._slowPeriod ? 1 : 4);
                
                if (!this._slowPeriod && this._skirmisherTimer % 30 === 0) {
                    this.processAttackEffects();
                }
                
                if (this._attackSprite && !this._slowPeriod) {
                    this._attackTimer++;
                }
                
                if (this._slowPeriod && this._attackSprite) {
                    this.clearAttackSprites();
                    this._attackTimer = 0;
                }

                if (this._slowTimer === 1) {
                    this._sequenceCounter++;
                    this._soundPlayed = false;
                    
                    if (this._sequenceCounter < 3) {
                        this.playStartupAnimation();
                    }
                    
                    this._moveCounter = 0;
                    this._lastDirection = 0;
                }
                
                if (this._sequenceCounter >= 3) {
                    this._skirmisherPhase = 'cooldown';
                    this._skirmisherTimer = 300;
                    this._isAttacking = false;
                    this._lastDirection = 0;
                    this._moveCounter = 0;
                    this._slowPeriod = false;
                    this._slowTimer = 0;
                    this._attackTimer = 0;
                    this._sequenceCounter = 0;
                    this._soundPlayed = false;
                    this.clearAttackSprites();
                }
                break;

            case 'cooldown':
                this.forceMoveSpeed(2);
                if (this._skirmisherTimer <= 0) {
                    this._skirmisherPhase = 'startup';
                    this._skirmisherTimer = 180;
                    this.playStartupAnimation();
                }
                break;
        }
    };

    Game_Event.prototype.forceMoveSpeed = function(speed) {
        this._moveSpeed = speed;
    };

    Game_Event.prototype.moveStraight = function(d) {
        if (this._skirmisherState && this._skirmisherPhase === 'attack') {
            if (this._lastDirection === 0) {
                this._lastDirection = d;
            } else if (this._lastDirection !== d) {
                d = this._lastDirection;
            }

            _Game_Event_moveStraight.call(this, d);
            
            if (!this._slowPeriod) {
                this._moveCounter++;
                if (this._moveCounter >= 3) {
                    if (!this._attackSprite || this._attackTimer >= 60) {
                        this._slowPeriod = true;
                        this._slowTimer = 60;
                    }
                }
            }
        } else {
            _Game_Event_moveStraight.call(this, d);
        }
    };

    Game_Event.prototype.processAttackEffects = function() {
        if (!this._attackSprite) {
            if (!this._soundPlayed) {
                AudioManager.playSe({
                    name: "Sword6",
                    volume: 20,
                    pitch: 120,
                    pan: 0
                });
                this._soundPlayed = true;
            }
            
            this._attackSprite = new Sprite_SkirmisherAttack(this);
            this._attackSprite2 = new Sprite_SkirmisherAttack(this, true);
            SceneManager._scene._spriteset.addChild(this._attackSprite);
            SceneManager._scene._spriteset.addChild(this._attackSprite2);
            this._attackTimer = 0;
        }
    };

    Game_Event.prototype.clearAttackSprites = function() {
        if (this._attackSprite) {
            SceneManager._scene._spriteset.removeChild(this._attackSprite);
            SceneManager._scene._spriteset.removeChild(this._attackSprite2);
            this._attackSprite = null;
            this._attackSprite2 = null;
        }
    };

    // Skirmisher Attack Sprite
    function Sprite_SkirmisherAttack() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SkirmisherAttack.prototype = Object.create(Sprite.prototype);
    Sprite_SkirmisherAttack.prototype.constructor = Sprite_SkirmisherAttack;

    Sprite_SkirmisherAttack.prototype.initialize = function(event, isDelayed) {
        Sprite.prototype.initialize.call(this);
        this._event = event;
        this._isDelayed = isDelayed;
        this._delayCounter = 0;
        this.createBitmap();
        this.updatePosition();
        this._animationCount = 0;
        this._pattern = 0;
    };

    Sprite_SkirmisherAttack.prototype.createBitmap = function() {
        this._characterName = '$Attack_Skirmisher';
        this._characterIndex = 0;
        this.bitmap = ImageManager.loadCharacter(this._characterName);
        this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
        this.updateCharacterFrame();
    };

    Sprite_SkirmisherAttack.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updatePosition();
        this.updateAnimation();
        this.checkCollision();
    };

    Sprite_SkirmisherAttack.prototype.updatePosition = function() {
        if (this._isDelayed) {
            this._delayCounter++;
            if (this._delayCounter < 15) return;
        }

        const event = this._event;
        const direction = event.direction();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        
        const screenX = $gameMap.adjustX(event.x);
        const screenY = $gameMap.adjustY(event.y);
        
        let offsetX = 0;
        let offsetY = 0;
        
        switch (direction) {
            case 2: offsetY = 1; break;
            case 4: offsetX = -1; break;
            case 6: offsetX = 1; break;
            case 8: offsetY = -1; break;
        }
        
        this.x = (screenX + offsetX) * tileWidth + tileWidth / 2;
        this.y = (screenY + offsetY) * tileHeight - tileHeight;
        this.z = event.screenZ() + (this._isDelayed ? 2 : 1);
    };

    Sprite_SkirmisherAttack.prototype.updateAnimation = function() {
        this._animationCount++;
        if (this._animationCount >= 18) {
            this._pattern = (this._pattern + 1) % 4;
            this._animationCount = 0;
            this.updateCharacterFrame();
        }
    };

    Sprite_SkirmisherAttack.prototype.updateCharacterFrame = function() {
        const pw = this.patternWidth();
        const ph = this.patternHeight();
        const sx = (this._pattern * pw) + (this._characterIndex % 4 * pw * 3);
        const sy = 0;
        this.setFrame(sx, sy, pw, ph);
    };

    Sprite_SkirmisherAttack.prototype.patternWidth = function() {
        return this._isBigCharacter ? this.bitmap.width / 3 : this.bitmap.width / 12;
    };

    Sprite_SkirmisherAttack.prototype.patternHeight = function() {
        return this._isBigCharacter ? this.bitmap.height / 4 : this.bitmap.height / 8;
    };

    Sprite_SkirmisherAttack.prototype.checkCollision = function() {
        const dx = Math.abs($gamePlayer.screenX() - this.x);
        const dy = Math.abs($gamePlayer.screenY() - this.y);
        
        if (dx < 24 && dy < 24) {
            $gameSwitches.setValue(1246, true);
            $gamePlayer.setThrough(true);
            
            setTimeout(() => {
                $gameSwitches.setValue(1246, false);
                $gamePlayer.setThrough(false);
            }, 1000);
        }
    };
})();