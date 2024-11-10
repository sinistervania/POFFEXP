/*:
 * @target MZ
 * @plugindesc Displays all state icons above enemies' HP bars side by side, growing to the right, with the oldest icon on the left and the newest icon on the right. Tooltip descriptions are displayed when hovering over icons.
 * @author Bloodkin
 * 
 * @param Default Icon Offset X
 * @text Default Icon Offset X
 * @type number
 * @min -1000
 * @max 1000
 * @desc The default horizontal offset for the state icons relative to the HP bar. Default: 0
 * @default 0
 * 
 * @param Default Icon Offset Y
 * @text Default Icon Offset Y
 * @type number
 * @min -1000
 * @max 1000
 * @desc The default vertical offset for the state icons relative to the HP bar. Default: -32
 * @default -32
 * 
 * @param Tooltip Update Interval
 * @text Tooltip Update Interval
 * @type number
 * @min 1
 * @max 60
 * @desc The interval (in frames) at which the tooltip checks are updated. Default: 10
 * @default 10
 * 
 * @help
 * This plugin displays all state icons above enemies' HP bars side by side, growing to the right, with the oldest icon on the left and the newest icon on the right. Tooltip descriptions are displayed when hovering over icons.
 * 
 * You can customize the descriptions of each state directly within the plugin script.
 * 
 * Note Tags:
 * <IconOffsetX: x> - Offset the icons horizontally by x pixels.
 * <IconOffsetY: y> - Offset the icons vertically by y pixels.
 * <DetectionOffsetX: x> - Offset the detection area horizontally by x pixels.
 * <DetectionOffsetY: y> - Offset the detection area vertically by y pixels.
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinEnemyIconExtension');
    const defaultIconOffsetX = Number(parameters['Default Icon Offset X'] || 0);
    const defaultIconOffsetY = Number(parameters['Default Icon Offset Y'] || -32);
    const tooltipUpdateInterval = Number(parameters['Tooltip Update Interval'] || 10);

    // Define state descriptions here
    const stateDescriptions = {
        454: "Example State 454: This is another example description.",
        // Continue adding descriptions for other states
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
            10: "Sleeping: Can not take action ",
            11: "",
            12: "",
            13: "",
            14: "Stunned: Can not take action, -100% Evasion ",
            15: "",
            16: "",
            17: "",
            18: "",
            19: "",
            20: "",
            21: "",
            22: "",
            23: "",
            24: "",
            25: "",
            26: "",
            27: "",
            28: "",
            29: "",
            30: "",
            31: "",
            32: "",
            33: "",
            34: "",
            35: "",
            36: "",
            37: "",
            38: "Ice Shield: +33% MP Regeneration and +300% Physical Def ",
            39: "",
            40: "",
            41: "",
            42: "",
            43: "",
            44: "",
            45: "",
            46: "",
            47: "Supreme Evasion: +90% Evasion ",
            48: "",
            49: "",
            50: "",
            51: "",
            52: "",
            53: "",
            54: "",
            55: "",
            56: "",
            57: "",
            58: "",
            59: "Overseer Flame Debuff: -50% M.Def for 99 turns ",
            60: "Overseer Physical Debuff: -50% Def for 99 turns ",
            61: "Enviornmental Blind: -50% Accuracy ",
            62: "",
            63: "",
            64: "",
            65: "",
            66: "",
            67: "",
            68: "",
            69: "",
            70: "",
            71: "",
            72: "",
            73: "",
            74: "",
            75: "",
            76: "",
            77: "",
            78: "",
            79: "",
            80: "",
            81: "",
            82: "",
            83: "",
            84: "",
            85: "",
            86: "",
            87: "",
            88: "",
            89: "",
            90: "",
            91: "",
            92: "",
            93: "Locking on: Guarantees the next hit, can be interupted ",
            94: "Boarding Pass: grants signature ability ",
            95: "Salt Shield: +200% Def/M.Def, grants immunity to Poison/Bleed/Stun ",
            96: "Stormsurge: Powerful unavoidable Magic ability ",
            97: "",
            98: "",
            99: "",
            100: "",
            101: "",
            102: "",
            103: "Plague Claws: Grants ability Nasty Scratch ",
            104: "The Plague: -50% Max HP ",
            105: "",
            106: "",
            107: "",
            108: "",
            109: "",
            110: "",
            111: "",
            112: "",
            113: "Eye the Blade: If uncontrolled, Blade Dance will follow ",
            114: "Riposte: if hit, will return an auto attack ",
            115: "",
            116: "Guard: +300% Def, +50% Mitigation ",
            117: "Supreme Agility: +300% Turn speed ",
            118: "Posture Broken: -50% Def/M.Def ",
            119: "Posture Up: +125% Def ",
            120: "",
            121: "",
            122: "",
            123: "",
            124: "Overseer's Hatred: +200% Att/M.Att ",
            125: "Overseer's Love: +200% Def/M.Def ",
            126: "",
            127: "",
            128: "",
            129: "",
            130: "Lantern Active: Prevents Enviornmental Blind ",
            131: "",
            132: "",
            133: "",
            134: "",
            135: "",
            136: "",
            137: "",
            138: "",
            139: "",
            140: "",
            141: "",
            142: "",
            143: "",
            144: "",
            145: "",
            146: "",
            147: "",
            148: "",
            149: "",
            150: "",
            151: "",
            152: "Shrouded: +90% Evasion/M.Evasion ",
            153: "",
            154: "",
            155: "",
            156: "Frosted Armor: +300% Def/M.Def, grants immunity to Stun ",
            157: "",
            158: "",
            159: "",
            160: "",
            161: "",
            162: "",
            163: "",
            164: "",
            165: "Bleeding 1: Taking 1 stack of Bleed DMG per turn(Scales w Att) ",
            166: "Bleeding 2: Taking 2 stacks of Bleed DMG per turn(Scales w Att) ",
            167: "Bleeding 3: Taking 3 stacks of Bleed DMG per turn(Scales w Att) ",
            168: "",
            169: "",
            170: "Poisoned: Taking poison damage every turn(Scales w M.Att) ",
            171: "Toxic: Taking great poison damage every turn(scales w M.Att) ",
            172: "Blinded: -50% Accuracy ",
            173: "",
            174: "",
            175: "",
            176: "",
            177: "",
            178: "",
            179: "",
            180: "",
            181: "",
            182: "",
            183: "",
            184: "",
            185: "",
            186: "",
            187: "",
            188: "",
            189: "",
            190: "",
            191: "",
            192: "",
            193: "",
            194: "",
            195: "",
            196: "",
            197: "",
            198: "",
            199: "",
            200: "",
            201: "",
            202: "",
            203: "",
            204: "",
            205: "",
            206: "Offensive Orders: +30% Accuracy, +200% Physical Dmg ",
            207: "Defensive Orders: +200% Def, +30% Evasion/M.Evasion ",
            208: "",
            209: "Perfect Form: +15% Evasion, 200% Atk/Def/M.Def ",
            210: "Decent Form: +5% Evasion, 90% Atk/Def/M.Def ",
            211: "Weak Form: -50% Evasion/M.Evasion, 80% Atk/Def/M.Def ",
            212: "Windrider: +25% Evasion ",
            213: "",
            214: "",
            215: "",
            216: "",
            217: "",
            218: "",
            219: "",
            220: "",
            221: "",
            222: "",
            223: "",
            224: "",
            225: "Taunt Immune: Can not be goaded ",
            226: "",
            227: "Stunned: Can not take action, -100% Evasion ",
            228: "Blinded: -30% Accuracy ",
            229: "Cowering: -30% Evasion/M.Evasion, -25% Atk/M.Atk ",
            230: "Enraged: +50% Atk/M.Atk ",
            231: "",
            232: "",
            233: "",
            234: "",
            235: "",
            236: "Fracture Poise: -100% Grab Resist ",
            237: "Fracture Armor: -50% Def ",
            238: "",
            239: "",
            240: "",
            241: "Grapple Target: Currently in a grapple with this enemy! ",
            242: "",
            243: "",
            244: "",
            245: "",
            246: "",
            247: "",
            248: "",
            249: "",
            250: "",
            251: "",
            252: "Grappler: Grants Signature Grappling Ability ",
            253: "",
            254: "",
            255: "",
            256: "",
            257: "",
            258: "",
            259: "",
            260: "",
            261: "",
            262: "",
            263: "",
            264: "Canine Evasion: +50% Evasion/M.Evasion ",
            265: "Wolf Charge: Grants signature ability ",
            266: "",
            267: "",
            268: "",
            269: "",
            270: "",
            271: "",
            272: "",
            273: "",
            274: "",
            275: "",
            276: "Mortis(Inerva): Inerva has become faster than death itself ",
            277: "Mortis(Espada): Espada has clawed out of the abyss ",
            278: "Mortis(Overseer): Galleon has gained a devil whip ",
            279: "Mortis(Alpha): The alpha is fixated on your throat ",
            280: "Bloodhunt: Allows Signature Ability ",
            281: "",
            282: "",
            283: "Unstoppable Skirmish: About to Skirmish, grants immunity to Stun/Grab/Challenge ",
            284: "",
            285: "Porta Mortis: Grants a second chance, along with a desperation ability ",
            286: "Sees your Weakness: Grants ability Penetrating Thrust ",
            287: "",
            288: "Loaded Piece: Ready to fire piece ",
            289: "Open Mouth: The mouth opens unnaturally revealing a parasite. ",
            290: "",
            291: "",
            292: "Eye the step: The swordplay game, respond or guard ",
            293: "Eye the step: The swordplay game, respond or guard ",
            294: "",
            295: "",
            296: "",
            297: "",
            298: "",
            299: "",
            300: "",
            301: "",
            302: "",
            303: "",
            304: "",
            305: "",
            306: "",
            307: "",
            308: "",
            309: "",
            310: "",
            311: "",
            312: "",
            313: "",
            314: "",
            315: "",
            316: "",
            317: "",
            318: "",
            319: "",
            320: "",
            321: "",
            322: "",
            323: "Weakness Spotted: Being hit by an Exploitative Move will inflict Stun ",
            324: "",
            325: "",
            326: "",
            327: "",
            328: "",
            329: "",
            330: "",
            331: "",
            332: "",
            333: "",
            334: "",
            335: "",
            336: "",
            337: "",
            338: "",
            339: "",
            340: "",
            341: "",
            342: "",
            343: "",
            344: "",
            345: "",
            346: "",
            347: "",
            348: "",
            349: "",
            350: "",
            351: "",
            352: "",
            353: "",
            354: "",
            355: "",
            356: "",
            357: "Devil Acceleration: Grants two actions ",
            358: "Blood Claw: Allows for a bleed attack ",
            359: "Venom Claw: Allows for a poison attack ",
            360: "",
            361: "",
            362: "",
            363: "",
            364: "",
            365: "Flying: Grants +30% Evasion, immune to ground based skill effects ",
            366: "Taunt: Forces all incoming attacks to target them, +50% mitigation ",
            367: "",
            368: "",
            369: "",
            370: "Lovebitten: temporarily sated from your love ",
            371: "LoveUnbitten: Angered and wants nothing more to do with you ",
            372: "Waiting for Love: desires to be romantically sated ",
            373: "Angered: Can no longer be romantically sated ",
            374: "",
            375: "",
            376: "",
            377: "HarpyWife: its using Energy/Mana to keep you both above the clouds ",
            378: "Thunderclaw: grants a very powerful stunning attack ",
            379: "About to sing: Grants Seduction ability unless interupted ",
            380: "",
            381: "Jealousy: Grants jealousy ability, which grants MP to your harpy ",
            382: "Impatient: growing impatient for reciprocation ",
            383: "",
            384: "",
            385: "",
            386: "",
            387: "",
            388: "",
            389: "",
            390: "",
            391: "",
            392: "",
            393: "",
            394: "",
            395: "",
            396: "Blood Arrow: Grants bleeding arrow ",
            397: "Venom Arrow: Grants Poisoned arrow ",
            398: "Thunder Arrow: Grants stunning arrow ",
            399: "Frostblood Arrow: Grants Frost sealing arrow ",
            400: "",
            401: "",
            402: "",
            403: "",
            404: "",
            405: "Charge: Grants the ability tackle ",
            406: "",
            407: "",
            408: "",
            409: "",
            410: "",
            411: "",
            412: "",
            413: "",
            414: "",
            415: "",
            416: "",
            417: "",
            418: "",
            419: "",
            420: "",
            421: "",
            422: "",
            423: "",
            424: "Barkskin: +50% physical mitigation, immune to ground based abilities ",
            425: "",
            426: "",
            427: "",
            428: "",
            429: "",
            430: "",
            431: "",
            432: "",
            433: "",
            434: "",
            435: "",
            436: "",
            437: "",
            438: "",
            439: "",
            440: "",
            441: "Summoning Scroll: Will attempt to summon an ally ",
            442: "Tome of Wind: Will grant troop dodge buff ",
            443: "Tome of Wrath: Will grant troop attack buff ",
            444: "Razer Seed: grants razer root attack ",
            445: "Mana Crystal: will grant the troop Mana ",
            446: "Healing Fairy: will heal the troop ",
            447: "Bomb: Holding a bomb with a lit fuse! ",
            448: "",
            449: "Wind Tome Evasion: +30% Evasion/M.Evasion",
            450: "Wrath Tome Power: +50% Atk/M.Atk",
            451: "",
            452: "",
            453: "",
            454: "",
            455: "",
            456: "",
            457: "",
            458: "",
            459: "",
            460: "",
            461: "",
            462: "",
            463: "",
            464: "",
            465: "",
            466: "",
            467: "",
            468: "",
            469: "",
            470: "",
            471: "",
            472: "",
            473: "Charged Heal: About to cast an AOE heal ",
            474: "Charged Laser: About to cast a laser beam ",
            475: "Charging Mana: About to give the troop mana ",
            476: "",
            477: "",
            478: "",
            479: "",
            480: "",
            481: "",
            482: "",
            483: "",
            484: "",
            485: "",
            486: "",
            487: "",
            488: "",
            489: "",
            490: "",
            491: "",
            492: "",
            493: "",
            494: "",
            495: "Fallen Family: +50% Physical Damage ",
            496: "",
            497: "",
            498: "",
            499: "",
            500: "",
            501: "",
            502: "",
            503: "Mortis(YellowKing): The king has gained 300% Mana Regen ",
            504: "",
            505: "",
            506: "",
            507: "",
            508: "",
            509: "",
            510: "",
            511: "",
            512: "",
            513: "",
            514: "",
            515: "",
            516: "",
            517: "",
            518: "",
            519: "",
            520: "",
            521: "",
            522: "",
            523: "",
            524: "",
            525: "",
            526: "",
            527: "",
            528: "",
            529: "",
            530: "",
            531: "",
            532: "3rd Eye Open: Grants Laser beam, which is certain hit ",
            533: "",
            534: "Permanent Blind: -50% Accuracy ",
            535: "",
            536: "",
            537: "",
            538: "",
            539: "",
            540: "",
            541: "",
            542: "",
            543: "",
            544: "",
            545: "",
            546: "",
            547: "",
            548: "",
            549: "",
            550: "",
            551: "",
            552: "",
            553: "",
            554: "",
            555: "",
            556: "",
            557: "",
            558: "",
            559: "",
            560: "",
            561: "",
            562: "",
            563: "",
            564: "",
            565: "",
            566: "",
            567: "",
            568: "",
            569: "",
            570: "",
            571: "",
            572: "",
            573: "",
            574: "",
            575: "",
            576: "",
            577: "",
            578: "",
            579: "",
            580: "",
            581: "",
            582: "",
            583: "",
            584: "",
            585: "",
            586: "",
            587: "",
            588: "",
            589: "",
            590: "",
            591: "",
            592: "",
            593: "",
            594: "",
            595: "",
            596: "",
            597: "Dazed: -100% Grab/Stun Resist ",
            598: "",
            599: "",
            600: "",
            601: "",
            602: "",
            603: "",
            604: "",
            605: "",
            606: "",
            607: "",
            608: "",
            609: "",
            610: "",
            611: "",
            612: "",
            613: "",
            614: "",
            615: "",
            616: "",
            617: "",
            618: "",
            619: "",
            620: "",
            621: "",
            622: "",
            623: "",
            624: "",
            625: "",
            626: "",
            627: "",
            628: "",
            629: "",
            630: "",
            631: "",
            632: "",
            633: "",
            634: "",
            635: "",
            636: "",
            637: "",
            638: "",
            639: "",
            640: "",
            641: "",
            642: "",
            643: "",
            644: "",
            645: "",
            646: "",
            647: "",
            648: "",
            649: "",
            650: "",
            651: "",
            652: "",
            653: "",
            654: "",
            655: "",
            656: "",
            657: "",
            658: "",
            659: "",
            660: "",
            661: "Stone Form: +75% Physical mitigation, -100% Evasion, +10% HP Regen, Status Immunity ",
            662: "",
            663: "",
            664: "",
            665: "",
            666: "",
            667: "",
            668: "",
            669: "",
            670: "",
            671: "",
            672: "",
            673: "Poison Resist: Absorbs the next poison application ",
            674: "",
            675: "",
            676: "",
            677: "",
            678: "",
            679: "",
            680: "",
            681: "Living Nightmare: Grants Nightmare DMG attack ",
            682: "Living Dream: Grants Dream resource siphon ",
            683: "",
            684: "",
            685: "",
            686: "",
            687: "Dark Shield: +500 Physical Def, Immune to Stun/Blind/Poison/Bleed. Removes with damage ",
            688: "",
            689: "",
            690: "",
            691: "",
            692: "",
            693: "",
            694: "",
            695: "",
            696: "",
            697: "",
            698: "",
            699: "",
            700: "",
            701: "",
            702: "",
            703: "",
            704: "",
            705: "",
            706: "",
            707: "Striking Posture: Will cast Allira's Pincer, even mid-air ",
            708: "Channeled Destruction: about to cast a high damaging beam ",
            709: "Channeled Summon: About to summon more spiderlings ",
            710: "Channeled Hex: about to cast a mark on you ",
            711: "",
            712: "",
            713: "Stun Resist: Absorbs 1 Stun ",
            714: "",
            715: "Motherly Wrath: +200% Atk/M.Atk, remove by incapacitating Xilla ",
            716: "",
            717: "",
            718: "",
            719: "",
            720: "",
            721: "Xilla' Venom: Xilla has prepared a special venom for you ",
            722: "",
            723: "",
            724: "",
            725: "",
            726: "",
            727: "",
            728: "",
            729: "",
            730: "",
            731: "",
            732: "",
            733: "",
            734: "",
            735: "",
            736: "",
            737: "",
            738: "",
            739: "",
            740: "",
            741: "",
            742: "Channeling Poison: About to cast a poison ability ",
            743: "Channeling Blled: About to cast a bleeding ability ",
            744: "Channeling Blind: About to cast a blinding ability ",
            745: "",
            746: "Mortis(Xilla): Gained ability, Dimmensional bite ",
            747: "",
            748: "",
            749: "",
            750: "",
            751: "",
            752: "",
            753: "Bleed Resist: Absorbs 1 Bleed effect ",
            754: "Blind Resist: Absorbs 1 Blind effect ",
            755: "",
            756: "",
            757: "",
            758: "Artificer's Kill Orders: Raises all stats by 50% when against 'Snow Regalia' ",
            759: "Artificer's Curse: Raises all stats by 100%",
            760: "",
        
        
    };

    // Initialize the state icon sprite correctly
    const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);
        this._stateIconSprites = []; // Array to hold individual icon sprites
        this._tooltipUpdateFrame = 0; // Frame counter for tooltip updates
    };

    // Override the method to draw all icons side by side
    Sprite_Enemy.prototype.updateCustomStateIcons = function() {
        const icons = this._battler.allIcons().filter(icon => icon !== 0); // Filter out any non-visible icons
        const iconWidth = ImageManager.iconWidth;
        const iconHeight = ImageManager.iconHeight;

        // Remove old icon sprites if they exceed the current icons count
        while (this._stateIconSprites.length > icons.length) {
            this.removeChild(this._stateIconSprites.pop());
        }

        // Add new sprites if they are less than the current icons count
        while (this._stateIconSprites.length < icons.length) {
            const sprite = new Sprite();
            this.addChild(sprite);
            this._stateIconSprites.push(sprite);
        }

        // Get custom offsets from note tags or use default values
        const customOffsetX = this._battler.enemy().meta.IconOffsetX ? Number(this._battler.enemy().meta.IconOffsetX) : defaultIconOffsetX;
        const customOffsetY = this._battler.enemy().meta.IconOffsetY ? Number(this._battler.enemy().meta.IconOffsetY) : defaultIconOffsetY;

        // Get custom detection offsets from note tags or use default values
        const detectionOffsetX = this._battler.enemy().meta.DetectionOffsetX ? Number(this._battler.enemy().meta.DetectionOffsetX) : 0;
        const detectionOffsetY = this._battler.enemy().meta.DetectionOffsetY ? Number(this._battler.enemy().meta.DetectionOffsetY) : 0;

        // Draw each icon, growing to the right
        for (let i = 0; i < icons.length; i++) {
            const iconIndex = icons[i];
            const sprite = this._stateIconSprites[i];
            sprite.bitmap = new Bitmap(iconWidth, iconHeight);
            const bitmap = ImageManager.loadSystem("IconSet");
            const pw = iconWidth;
            const ph = iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);

            // Attach the icons to the top of the HP bar
            if (this._battler.hpBarPosition) {
                const hpBarPosition = this._battler.hpBarPosition();
                sprite.x = hpBarPosition.x + customOffsetX + i * iconWidth;
                sprite.y = hpBarPosition.y + customOffsetY;
            } else {
                // Fallback in case the HP bar position isn't available
                sprite.x = customOffsetX + i * iconWidth;
                sprite.y = -this.bitmap.height - iconHeight + customOffsetY;
            }

            // Store the state ID and detection offset for hover detection, only if the state has an icon
            const state = this._battler.states().find(state => state.iconIndex === iconIndex);
            sprite.stateId = state ? state.id : null;
            sprite.detectionOffsetX = detectionOffsetX;
            sprite.detectionOffsetY = detectionOffsetY;
        }
    };

    // Call updateCustomStateIcons instead of updateStateSprite
    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateCustomStateIcons();
        this.updateMouseoverTooltip();
    };

    // Detect hover over state icons and display tooltip with throttling
    Sprite_Enemy.prototype.updateMouseoverTooltip = function() {
        this._tooltipUpdateFrame++;
        if (this._tooltipUpdateFrame < tooltipUpdateInterval) return;
        this._tooltipUpdateFrame = 0;

        // Do not show tooltip if enemy is dead or hiding
        if (this._battler.isDead() || this._battler.isHidden()) {
            this._battler.tooltipWindow.hide();
            return;
        }

        const mouseX = TouchInput.x;
        const mouseY = TouchInput.y;
        let tooltipShown = false;

        for (const sprite of this._stateIconSprites) {
            if (
                sprite &&
                sprite.stateId !== null && // Ensure the state ID exists and is not null
                mouseX >= sprite.x + this.x + sprite.detectionOffsetX &&
                mouseX <= sprite.x + this.x + sprite.detectionOffsetX + sprite.bitmap.width &&
                mouseY >= sprite.y + this.y + sprite.detectionOffsetY &&
                mouseY <= sprite.y + this.y + sprite.detectionOffsetY + sprite.bitmap.height
            ) {
                const stateId = sprite.stateId;
                const description = stateDescriptions[stateId] || "No description available.";
                console.log(`Mouse is over icon at index ${sprite.stateId}, State ID: ${stateId}`);
                this._battler.tooltipWindow.showTooltip(description, mouseX, mouseY);
                tooltipShown = true;
                break;
            }
        }

        if (!tooltipShown) {
            this._battler.tooltipWindow.hide();
        }
    };

    // Extend Scene_Battle to create the tooltip windows for each enemy
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createEnemyTooltipWindows();
    };

    Scene_Battle.prototype.createEnemyTooltipWindows = function() {
        this._spriteset._enemySprites.forEach(enemySprite => {
            enemySprite._battler.tooltipWindow = new Window_StateTooltip();
            this.addChild(enemySprite._battler.tooltipWindow);  // Add the tooltip window to the scene's display list
        });
    };

    // Define the tooltip window
    class Window_StateTooltip extends Window_Base {
        initialize() {
            super.initialize(new Rectangle(0, 0, 0, 0));
            this.openness = 0;
            this.backOpacity = 192; // Set the background opacity to 192
            this.contents.fontSize = 18; // Set the font size to 18
        }

        showTooltip(description, x, y) {
            this.contents.clear();
            const textWidth = this.textWidth(description) + this.padding * 2;
            const textHeight = this.fittingHeight(1);
            this.move(x, y - textHeight, textWidth, textHeight);

            // Adjust position to keep tooltip within screen bounds
            if (this.x < 0) this.x = 0;
            if (this.y < 0) this.y = 0;
            if (this.x + this.width > Graphics.width) this.x = Graphics.width - this.width;
            if (this.y + this.height > Graphics.height) this.y = Graphics.height - this.height;

            this.createContents();
            this.drawTextEx(description, this.textPadding(), 0); // Draw text with padding
            this.open();
        }

        hide() {
            this.close();
        }
    }

    // Ensure the tooltips are being updated for all enemies in battle
    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.call(this);
        this.updateAllEnemyTooltips();
    };

    Spriteset_Battle.prototype.updateAllEnemyTooltips = function() {
        this._enemySprites.forEach(enemySprite => {
            if (enemySprite._battler.tooltipWindow) {
                enemySprite.updateMouseoverTooltip();
            }
        });
    };

})();
