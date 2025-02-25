/*:
 * @target MZ
 * @plugindesc Displays all state icons for all party members with tooltips, animations, and image overlays.
 * @author Bloodkin (Modified)
 */

(() => {
    const parameters = PluginManager.parameters('BloodkinPlayerIcons');
    const tooltipUpdateInterval = Number(parameters['Tooltip Update Interval'] || 10);
    
    const negativeStates = [
        1, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 32, 37, 45, 57, 58, 59, 60, 61, 88, 100, 
        104, 115, 118, 122, 140, 142, 143, 145, 146, 164, 165, 166, 167, 170, 171, 172, 
        211, 227, 228, 229, 236, 237, 241, 367, 370, 411, 412, 416, 418, 420, 452, 501, 
        534, 594, 597, 613, 634, 664, 665, 666, 671, 672, 684, 685
    ];
    
    const memberOffsets = [
        { x: -25, y: +161 },
        { x: -410, y: +161 },
        { x: -610, y: +161 },
        { x: -810, y: +161 }
    ];


    // Define state descriptions here
    const stateDescriptions = {
        454: "Example State 454: This is another example description.",
        // Continue adding descriptions for other states
            1: " Dead ",
            2: "",
            3: "",
            4: " Poisoned: -10% Hp per turn ",
            5: " Blinded: Accuracy Reduced by 50% ",
            6: " Silenced: Can not cast skills ",
            7: "",
            8: "",
            9: " Charmed: Can not take action ",
            10: " Sleeping: Can not take action ",
            11: " Paralysis: Can not take action ",
            12: " Siren Charmed: Can not take action ",
            13: " Stunned: Can not take action ",
            14: " Stunned: Can not take action, -100% Evasion ",
            15: " ",
            16: "",
            17: "",
            18: "",
            19: "",
            20: "",
            21: "",
            22: " Counter Attack: Attack back when struck ",
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
            33: " Water Shield: Increases Def by 350% and grants 50% energy regen ",
            34: " Dance of Phantoms: Icebreaker's Spear form ",
            35: " Dance of Death: Icebreaker's Arming Blade form ",
            36: "",
            37: "",
            38: " Ice Shield: +33% MP Regeneration and +300% Physical Def ",
            39: "",
            40: "",
            41: "",
            42: "",
            43: "",
            44: "",
            45: "",
            46: " Enhanced Stealth ",
            47: " Supreme Evasion: +90% Evasion ",
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
            59: " Overseer Flame Debuff: -50% M.Def for 99 turns ",
            60: " Overseer Physical Debuff: -50% Def for 99 turns ",
            61: " Enviornmental Blind: -50% Accuracy ",
            62: "",
            63: "",
            64: "",
            65: "",
            66: "",
            67: "",
            68: "",
            69: "",
            70: " Taking Cover: Taking Cover from projectiles ",
            71: " Icebreaker Armor: Grants 500% Def/M.Def and immunity to most statuses ",
            72: " Stealth ",
            73: " Evade: Grants 50% Physical Evasion ",
            74: " Dance of blades: Icebreaker's Rapier Form",
            75: " Riposte: Strike back an enemy who struck you ",
            76: " Leech: Grants lifesteal off normal attacks ",
            77: " Prowlers: Can not be targetted, 30% dmg bonus on next attack ",
            78: " Dance of the Drunk: Icebreaker's Gauntlet form ",
            79: " Tipsy: Physical evasion +30%, Accuracy -15% ",
            80: " Mystery Bonus: Def/M.Def + 300% ",
            81: " Mystery Bonus: Dmg + 300% ",
            82: " Mystery Bonus: Death Resist ",
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
            93: " Locking on: Guarantees the next hit, can be interupted ",
            94: " Boarding Pass: grants signature ability ",
            95: " Salt Shield: +200% Def/M.Def, grants immunity to Poison/Bleed/Stun ",
            96: " Stormsurge: Powerful unavoidable Magic ability ",
            97: "",
            98: "",
            99: "",
            100: "",
            101: "",
            102: "",
            103: " Plague Claws: Grants ability Nasty Scratch ",
            104: " The Plague: -50% Max Energy ",
            105: "",
            106: "",
            107: " Meteor Incoming ",
            108: "",
            109: "",
            110: "",
            111: "",
            112: "",
            113: " Eye the Blade: If uncontrolled, Blade Dance will follow ",
            114: " Riposte: if hit, will return an auto attack ",
            115: " Lost Initiative: The enemy will act before you ",
            116: " Guard: +300% Def, +50% Mitigation ",
            117: " Supreme Agility: +300% Turn speed ",
            118: " Posture Broken: -50% Def/M.Def ",
            119: " Posture Up: +125% Def ",
            120: "",
            121: "",
            122: " Leg Injury: Enemies will act before you ",
            123: "",
            124: " Overseer's Hatred: +200% Att/M.Att ",
            125: " Overseer's Love: +200% Def/M.Def ",
            126: "",
            127: "",
            128: "",
            129: "",
            130: " Lantern Active: Lighting up the area  ",
            131: " Lavendar: All Dmg/Defences + 15% ",
            132: " Anti-Magic Candle: M.Def + 30% ",
            133: "",
            134: "",
            135: "",
            136: "",
            137: "",
            138: "",
            139: "",
            140: " Bleeding: Taking damage each turn ",
            141: "",
            142: " Bull Kicked: Armor reduced to 0% ",
            143: " Icebreaker Stolen: Icebreaker has been taken from you! ",
            144: "",
            145: " Poisoned: Taking Poison damage each turn ",
            146: " Toxic: Taking heavy poison damage each turn ",
            147: "",
            148: "",
            149: "",
            150: "",
            151: "",
            152: " Shrouded: +90% Evasion/M.Evasion ",
            153: "",
            154: "",
            155: "",
            156: " Frosted Armor: +300% Def/M.Def, grants immunity to Stun ",
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
            176: " Icebreaker Bullwark: Increases Defences by 500% and gain immunity to most status ",
            177: " Magic Toy 1 stack: +10% Magic Dmg ",
            178: " Magic Toy 2 stack: +20% Magic Dmg ",
            179: " Magic Toy 3 stack: +30% Magic Dmg ",
            180: " Magic Toy 4 stack: +40% Magic Dmg ",
            181: " Magic Toy 5 stack: +50% Magic Dmg ",
            182: " Magic Toy 6 stack: +60% Magic Dmg ",
            183: " Magic Toy 7 stack: +70% Magic Dmg ",
            184: " Magic Toy 8 stack: +80% Magic Dmg ",
            185: " Magic Toy 9 stack: +90% Magic Dmg ",
            186: " Magic Toy Full power: +100% Magic Dmg ",
            187: " Dance of Daggers: Icebreaker's Daggerform ",
            188: " Dance of Monarchs: Icebreaker's Greatsword form ",
            189: "",
            190: " Preperation: Gain 1 AP ",
            191: " Minor Evasion: 25% physical evasion ",
            192: " ",
            193: "",
            194: "",
            195: "",
            196: " Flat Guard: +50% Damage Reduction, Poise resist, petrify resist ",
            197: "",
            198: "",
            199: "",
            200: "",
            201: "",
            202: " Trichodermia Branch: Toxic Immunity ",
            203: "",
            204: "",
            205: "",
            206: " Offensive Orders: +30% Accuracy, +200% Physical Dmg ",
            207: " Defensive Orders: +200% Def, +30% Evasion/M.Evasion ",
            208: "",
            209: " Perfect Form: +15% Evasion, 200% Atk/Def/M.Def ",
            210: " Decent Form: +5% Evasion, 90% Atk/Def/M.Def ",
            211: " Weak Form: -50% Evasion/M.Evasion, 80% Atk/Def/M.Def ",
            212: " Windrider: +25% Evasion ",
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
            238: " Grappling: Grappling an enemy! ",
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
            251: " Being Grappled: -100% Evasion rate, limited actions ",
            252: " Grappler: Grants Signature Grappling Ability ",
            253: "",
            254: "",
            255: "",
            256: "",
            257: " Gravis' Gaze: +15% Accuracy ",
            258: " Gravis' Grasp: +20% physical Def ",
            259: " Gravis' Rage: +20% physical Att",
            260: " Hold the line!: +25% Mitigation, 50% stun resist, 50% Limb protection ",
            261: " Heroic Charge: Next deathstrike deals 300% damage ",
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
            280: "Bloodhunt: About to cast 'Go for throat' ",
            281: "",
            282: "",
            283: "Unstoppable Skirmish: immune to Stun/Grab/Challenge ",
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
            302: " Lesser Ocarina: +20% Damage ",
            303: " Lesser Ocarina: +25% Defences ",
            304: " Lesser Ocarina: +15% Accuracy ",
            305: "",
            306: " Greater Ocarina: +40% Damage",
            307: " Greater Ocarina: +40% Defences ",
            308: " Greater Ocarina: +25% Accuracy ",
            309: "",
            310: " Lavendar Buff: ",
            311: " Magic Shroom: +20% Magic Damage ",
            312: "",
            313: " GoldenAppleRegen: +10% HPRegen ",
            314: " YellowHerbMaxHealth: +10 Max HP ",
            315: " EyeCap: +20% Accuracy, Blind Immunity ",
            316: " SicklySweet: Gain 'Lovebite', Seal 'Guard' ",
            317: " HarpOfSoundDominance: Counters sound effects ",
            318: " FairyProtection: Protects against death ",
            319: " GhostCloakProc: Omni Evasion: +100% , M.Def +300% ",
            320: "",
            321: "",
            322: "",
            323: " Weakness Spotted: Being hit by an Exploitative Move will inflict Stun ",
            324: " IcyMists: 25% evasion/M.Evasion ",
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
            342: " Monarch's Domain: +100% Accuracy, +25% Dmg mitigation ",
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
            357: " Devil Acceleration: Grants two actions ",
            358: " Blood Claw: Allows for a bleed attack ",
            359: " Venom Claw: Allows for a poison attack ",
            360: "",
            361: "",
            362: "",
            363: "",
            364: "",
            365: " Flying: Grants +30% Evasion, immune to ground based skill effects ",
            366: " Taunt: Forces all incoming attacks to target them, +50% mitigation ",
            367: " Seduced: Can not make actions and open to exploitation ",
            368: "",
            369: "",
            370: " Lovebitten: temporarily sated from your love ",
            371: " LoveUnbitten: Angered and wants nothing more to do with you ",
            372: " Waiting for Love: desires to be romantically sated ",
            373: " Angered: Can no longer be romantically sated ",
            374: "",
            375: " Hold Fast: Holding for dear life ",
            376: "",
            377: " HarpyWife: its using Energy/Mana to keep you both above the clouds ",
            378: " Thunderclaw: grants a very powerful stunning attack ",
            379: " About to sing: Grants Seduction ability unless interupted ",
            380: "",
            381: " Jealousy: Grants jealousy ability, which grants MP to your harpy ",
            382: " Impatient: growing impatient for reciprocation ",
            383: "",
            384: "",
            385: " Electrified: Allows Signature ability ",
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
            411: " Hamstring Shot: -1 AP (due to impalment) ",
            412: " Entangled: -1 AP ",
            413: " Ice Lanced: -1 AP (due to impalement) ",
            414: "",
            415: "",
            416: "",
            417: "",
            418: " Frostblood Arrow: -1 AP (due to impalement) ",
            419: " Bracing: Stun Immune ",
            420: " Cursed: Frostblood Sealed, -100% Evasion ",
            421: " ",
            422: "",
            423: "",
            424: " Barkskin: +50% physical mitigation, immune to ground based abilities ",
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
            441: " Summoning Scroll: Will attempt to summon an ally ",
            442: " Tome of Wind: Will grant troop dodge buff ",
            443: " Tome of Wrath: Will grant troop attack buff ",
            444: " Razer Seed: grants razer root attack ",
            445: " Mana Crystal: will grant the troop Mana ",
            446: " Healing Fairy: will heal the troop ",
            447: " Bomb: Holding a bomb with a lit fuse! ",
            448: "",
            449: " Wind Tome Evasion: +30% Evasion/M.Evasion",
            450: " Wrath Tome Power: +50% Atk/M.Atk",
            451: "",
            452: " Marked: -100% Evasion ",
            453: " ",
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
            497: " Vulpes' Healing ",
            498: " Vulpes' Energy ",
            499: " Vulpes' Wrath ",
            500: "",
            501: " Yellow Flame ",
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
            552: " DemonicLowHPPassive: +20% DMG",
            553: " ChargeGuardDamage: +100% DMG ",
            554: " HeroicEntryCritBuff: +50% crit chance ",
            555: " ",
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
            566: " Quick Footed: Prompt for evade at the start of the turn ",
            567: " Assasin's Path: Gain +50% Damage ",
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
            579: " Grit: +10% Defences ",
            580: " Grit2: +20% Defences ",
            581: " Grit3: +30% Defences ",
            582: "",
            583: " Flowstate1: 5% Omni Evasion ",
            584: " Flowstate2: 10% Omni Evasion ",
            585: " Flowstate3: 15% Omni Evasion ",
            586: " Flowstate3: 20% Omni Evasion ",
            587: "",
            588: "",
            589: "",
            590: "",
            591: "",
            592: " KeenEye: +30% Crit Chance ",
            593: " GuidingBlade: +300% Accuracy ",
            594: " MarkedForDeath: -50% Defences ",
            595: "",
            596: "",
            597: "Dazed: Next Daze will stun, -100% Grab/Stun Resist ",
            598: "",
            599: "",
            600: "",
            601: "",
            602: "",
            603: " Unstopp_Charge(player): Immune to stun, +50% defences, cannot guard  ",
            604: " ",
            605: "",
            606: "",
            607: "",
            608: " Power Ring: +100% Physical Damage ",
            609: " Lustful ",
            610: " Obsessive ",
            611: " Violent ",
            612: " Exploitive ",
            613: " VICTIM OF SIN ",
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
            624: " Twirling Crit1: +25% Crit chance ",
            625: " Twirling Crit2: +50% Crit chance ",
            626: " Twirling Crit3: +75% Crit chance ",
            627: " Twirling Crit4: +100% Crit chance ",
            628: "",
            629: "",
            630: "",
            631: "",
            632: "",
            633: "",
            634: " Exhausted: -50% Damage  ",
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
            664: " Leg Petrified: - 1 AP (Leg Injury) ",
            665: " Arm Petrified: -25% Damage (Arm Injury) ",
            666: " Chest Petrified: -50% Max HP (Chest Injury) ",
            667: "",
            668: "",
            669: "",
            670: "",
            671: " Webbed: 4 stacks of web will bind you ",
            672: " Caccooned: Can not take action until breaking free ",
            673: " Poison Resist: Absorbs the next poison application ",
            674: "",
            675: "",
            676: "",
            677: "",
            678: "",
            679: "",
            680: "",
            681: " Living Nightmare: Grants Nightmare DMG attack ",
            682: " Living Dream: Grants Dream resource siphon ",
            683: "",
            684: " Drowsy: Another sleep application will put you to sleep ",
            685: " Asleep: susceptible to dream spells ",
            686: "",
            687: " Dark Shield: +500 Physical Def, Immune to Stun/Blind/Poison/Bleed. Removes with damage ",
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
            707: "Striking Posture: Will cast 'Allira's Pincer', even mid-air ",
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
            727: " BloodShield: + 70% mitigation ",
            728: " Insectian D.N.A: Grants Poison Immunity ",
            729: " Elven D.N.A: Grants Bleed Immunity ",
            730: " Bloodkin D.N.A: Grants Blind Immunity ",
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

    class Sprite_PlayerStateIcons extends Sprite {
        constructor(battler, index) {
            super();
            this.initialize_StateIcons(battler, index);
        }

        initialize_StateIcons(battler, index) {
            this._battler = battler;
            this._stateIconSprites = [];
            this._tooltipUpdateFrame = 0;
            this._index = index;
            this._lastIconCount = 0;
            this._durationSprites = [];
            this._overlayBitmaps = {
                positive: ImageManager.loadBitmap('img/IconOverlay/', 'BuffPositive2'),
                negative: ImageManager.loadBitmap('img/IconOverlay/', 'BuffNegative2')
            };

            const offset = memberOffsets[index] || memberOffsets[0];
            this.x = Math.round(Graphics.width / 2 + offset.x);
            this.y = Math.round(Graphics.height / 2 + offset.y);
        }

        createOverlaySprite(isNegative) {
            const sprite = new Sprite();
            sprite.bitmap = this._overlayBitmaps[isNegative ? 'negative' : 'positive'];
            sprite.scale.set(1.5, 1.5); // Scale overlay by 1.5
            sprite.y = 0;
            return sprite;
        }

        update() {
            super.update();
            if (this._battler) {
                this.updateStateIcons();
                this.updateMouseoverTooltip();
                this.updateDurations();
            }
        }

        updateStateIcons() {
            if (!this._battler) return;
        
            const states = this._battler.states().filter(state => {
                const iconIndex = state?.iconIndex;
                return iconIndex && iconIndex !== 0;
            });
            const icons = states.map(state => state.iconIndex);
        
            if (this._lastIconCount === icons.length &&
                this._stateIconSprites.length > 0 &&
                this._stateIconSprites[0]?.iconIndex === icons[0]) {
                this._stateIconSprites.forEach((sprite, i) => {
                    if (sprite) {
                        const targetX = this.calculateIconX(i);
                        const distance = targetX - sprite.x;
                        sprite.x = Math.round(sprite.x + distance * 0.2);
                        if (sprite.overlay) sprite.overlay.x = sprite.x;
                        if (this._durationSprites[i]) this._durationSprites[i].x = sprite.x;
                    }
                });
                return;
            }
        
            this._lastIconCount = icons.length;
            const iconWidth = ImageManager.iconWidth * 1.5; // Scale by 1.5
            const iconHeight = ImageManager.iconHeight * 1.5; // Scale by 1.5
            const padding = 3;
        
            while (this._stateIconSprites.length > icons.length) {
                const sprite = this._stateIconSprites.pop();
                if (sprite) {
                    if (sprite.overlay) this.removeChild(sprite.overlay);
                    this.removeChild(sprite);
                }
                const durationSprite = this._durationSprites.pop();
                if (durationSprite) this.removeChild(durationSprite);
            }
        
            const totalWidth = icons.length * (iconWidth + padding) - padding;
            const startX = Math.round(-totalWidth / 2);
        
            states.forEach((state, i) => {
                const iconIndex = state.iconIndex;
                let sprite = this._stateIconSprites[i];
        
                if (!sprite) {
                    // Add sound effect when a new icon appears
                    AudioManager.playSe({ name: "sword-scrape", volume: 90, pitch: 50, pan: 0 });
        
                    sprite = new Sprite();
                    sprite.bitmap = new Bitmap(iconWidth, iconHeight);
                    sprite.x = -Graphics.width;
                    sprite.y = 0;
                    sprite.pixelPerfect = true;
                    sprite.isNew = true;
                    sprite.stateId = state.id;
                    this.addChild(sprite);
                    this._stateIconSprites[i] = sprite;
        
                    const isNegative = negativeStates.includes(state.id);
                    const overlay = this.createOverlaySprite(isNegative);
                    overlay.x = sprite.x;
                    overlay.overlayType = isNegative ? 'negative' : 'positive';
                    this.addChild(overlay);
                    sprite.overlay = overlay;
        
                    const durationSprite = new Sprite();
                    durationSprite.bitmap = new Bitmap(iconWidth, iconHeight);
                    durationSprite.y = 0;
                    this.addChild(durationSprite);
                    this._durationSprites[i] = durationSprite;
                }
        
                if (sprite.iconIndex !== iconIndex || sprite.stateId !== state.id) {
                    sprite.bitmap.clear();
                    const bitmap = ImageManager.loadSystem("IconSet");
                    const pw = ImageManager.iconWidth;
                    const ph = ImageManager.iconHeight;
                    const sx = (iconIndex % 16) * pw;
                    const sy = Math.floor(iconIndex / 16) * ph;
                    sprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0, iconWidth, iconHeight);
                    sprite.iconIndex = iconIndex;
                    sprite.stateId = state.id;
        
                    const isNegative = negativeStates.includes(state.id);
                    const currentType = sprite.overlay.overlayType;
                    const newType = isNegative ? 'negative' : 'positive';
        
                    if (currentType !== newType) {
                        sprite.overlay.bitmap = this._overlayBitmaps[newType];
                        sprite.overlay.overlayType = newType;
                    }
        
                    if (sprite.isNew) {
                        sprite.x = -Graphics.width;
                        if (sprite.overlay) sprite.overlay.x = sprite.x;
                        if (this._durationSprites[i]) this._durationSprites[i].x = sprite.x;
                        sprite.isNew = false;
                    }
                }
        
                const targetX = Math.round(startX + i * (iconWidth + padding));
                const distance = targetX - sprite.x;
                sprite.x = Math.round(sprite.x + distance * 0.2);
                if (sprite.overlay) sprite.overlay.x = sprite.x;
                if (this._durationSprites[i]) this._durationSprites[i].x = sprite.x;
            });
        }
        

        updateDurations() {
            this._stateIconSprites.forEach((sprite, i) => {
                if (!sprite || !this._durationSprites[i]) return;

                const durationSprite = this._durationSprites[i];
                const state = this._battler.states().find(s => s.id === sprite.stateId);
                if (!state) return;

                const turns = this._battler._stateTurns[state.id];

                durationSprite.bitmap.clear();

                if (turns && turns > 0 && state.autoRemovalTiming !== 0) {
                    durationSprite.bitmap.fontSize = 14;
                    durationSprite.bitmap.textColor = '#ffffff';
                    durationSprite.bitmap.outlineColor = 'rgba(0, 0, 0, 0.8)';
                    durationSprite.bitmap.outlineWidth = 3;
                    durationSprite.bitmap.drawText(
                        turns.toString(),
                        0,
                        0,
                        ImageManager.iconWidth * 1.5,
                        ImageManager.iconHeight * 1.5,
                        'center'
                    );
                }
            });
        }

        calculateIconX(index) {
            const iconWidth = ImageManager.iconWidth * 1.5;
            const padding = 3;
            const totalWidth = this._stateIconSprites.length * (iconWidth + padding) - padding;
            const startX = -totalWidth / 2;
            return Math.round(startX + index * (iconWidth + padding));
        }
    

        getScreenX() {
            let x = this.x;
            let node = this;
            while (node.parent) {
                node = node.parent;
                x += node.x;
            }
            return x;
        }

        getScreenY() {
            let y = this.y;
            let node = this;
            while (node.parent) {
                node = node.parent;
                y += node.y;
            }
            return y;
        }

        updateMouseoverTooltip() {
            this._tooltipUpdateFrame++;
            if (this._tooltipUpdateFrame < tooltipUpdateInterval) return;
            this._tooltipUpdateFrame = 0;

            if (!SceneManager._scene._activeTooltipSprite || 
                SceneManager._scene._activeTooltipSprite === this) {
                const mouseX = TouchInput.x;
                const mouseY = TouchInput.y;
                let isOverIcon = false;

                for (const sprite of this._stateIconSprites) {
                    if (!sprite) continue;

                    const globalX = this.getScreenX() + sprite.x;
                    const globalY = this.getScreenY() + sprite.y;

                    const iconWidth = ImageManager.iconWidth;
                    const iconHeight = ImageManager.iconHeight;

                    if (mouseX >= globalX &&
                        mouseX <= globalX + iconWidth &&
                        mouseY >= globalY &&
                        mouseY <= globalY + iconHeight) {
                        const description = stateDescriptions[sprite.stateId] || "No description available.";
                        SceneManager._scene.showTooltip(description, globalX, globalY);
                        SceneManager._scene._activeTooltipSprite = this;
                        isOverIcon = true;
                        break;
                    }
                }

                if (!isOverIcon && SceneManager._scene._activeTooltipSprite === this) {
                    SceneManager._scene.hideTooltip();
                    SceneManager._scene._activeTooltipSprite = null;
                }
            }
        }
    }

    class Window_StateTooltip extends Window_Base {
        initialize() {
            const rect = new Rectangle(0, 0, 1, 1);
            super.initialize(rect);
            this.opacity = 255;
            this.contents.fontSize = 20;
            this.deactivate();
            this.hide();
        }

        showTooltip(description, x, y) {
            const textWidth = this.textSizeEx(description).width;
            const textHeight = this.textSizeEx(description).height;
            const padding = this.padding * 2;
            
            const width = textWidth + padding + 32;
            const height = textHeight + padding;
            
            let tooltipX = x;
            let tooltipY = y - height - 8;
            
            if (tooltipX + width > Graphics.width) {
                tooltipX = Graphics.width - width;
            }
            if (tooltipY < 0) {
                tooltipY = y + 32;
            }
            
            this.move(tooltipX, tooltipY, width, height);
            this.createContents();
            this.drawTextEx(description, 0, 0, width);
            this.show();
            this.activate();
        }

        hide() {
            super.hide();
            this.deactivate();
        }

        padding() {
            return 8;
        }
    }

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.call(this);
        this._stateTooltipWindow = new Window_StateTooltip();
        this._activeTooltipSprite = null;
        this.addChild(this._stateTooltipWindow);
        this._partyIcons = new Map();
        this.createPartyStateIcons();
    };

    Scene_Battle.prototype.createPartyStateIcons = function() {
        const party = $gameParty.battleMembers();
        const currentActorIds = new Set(party.map(member => member.actorId()));
        
        for (const [actorId, sprite] of this._partyIcons) {
            if (!currentActorIds.has(actorId)) {
                this._spriteset.removeChild(sprite);
                this._partyIcons.delete(actorId);
            }
        }
        
        party.forEach((member, index) => {
            if (!member) return;
            
            const actorId = member.actorId();
            let spriteIcons = this._partyIcons.get(actorId);
            
            if (!spriteIcons) {
                spriteIcons = new Sprite_PlayerStateIcons(member, index);
                this._spriteset.addChild(spriteIcons);
                spriteIcons.z = -5;
                this._partyIcons.set(actorId, spriteIcons);
            } else {
                spriteIcons._index = index;
                const offset = memberOffsets[index] || memberOffsets[0];
                spriteIcons.x = Math.round(Graphics.width / 2 + offset.x);
                spriteIcons.y = Math.round(Graphics.height / 2 + offset.y);
            }
        });
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        
        const party = $gameParty.battleMembers();
        const currentActorIds = new Set(party.map(member => member.actorId()));
        
        let needsUpdate = false;
        for (const actorId of this._partyIcons.keys()) {
            if (!currentActorIds.has(actorId)) {
                needsUpdate = true;
                break;
            }
        }
        
        if (needsUpdate || party.length !== this._partyIcons.size) {
            this.createPartyStateIcons();
        }
        
        for (const sprite of this._partyIcons.values()) {
            if (sprite) {
                sprite.update();
            }
        }
    };

    Scene_Battle.prototype.showTooltip = function(description, x, y) {
        if (this._stateTooltipWindow) {
            this._stateTooltipWindow.showTooltip(description, x, y);
        }
    };

    Scene_Battle.prototype.hideTooltip = function() {
        if (this._stateTooltipWindow) {
            this._stateTooltipWindow.hide();
            this._activeTooltipSprite = null;
        }
    };
})();