/*:
 * @target MZ
 * @plugindesc Displays a small black window with custom text if a switch and variable are set, positioned based on cursor location. 
 * @author Bloodkin
 * @help Tooltip.js
 * 
 * @param switchId
 * @text Switch ID
 * @desc The ID of the switch that must be ON to display the window.
 * @type switch
 * @default 892
 * 
 * @param variableId
 * @text Variable ID
 * @desc The ID of the variable that determines the displayed text.
 * @type variable
 * @default 627
 * 
 * @param defaultText
 * @text Default Text
 * @desc The default text to display in the window.
 * @type string
 * @default Default Tooltip Text
 */

(() => {
    const parameters = PluginManager.parameters('Tooltip');
    const switchId = Number(parameters['switchId'] || 892);
    const variableId = Number(parameters['variableId'] || 627);
    const defaultText = String(parameters['defaultText'] || 'Default Tooltip Text');

    const tooltipTexts = {
        1: 'Lavandar: Grants 25% Atk/Def buff and Restores all stats',
        2: 'Bohemica Shroom: Increases Magic Damage by 20%',
        3: 'Tipsy: Increases Evasion by 30%, Lowers Accuracy by 15%',
        4: 'Anti-Magic Candle: Increases Magic Def by 30%',
        5: 'Lantern Active: Brightens extremely dark Areas',
        6: 'Golden Apple: Gain 10% health regen',
        7: 'Yellow Herb: Gain Temporary Max 10 HP',
        8: 'Eyecap: Increase Accuracy by 20%',
        9: 'Sickly Sweet: Gain Skill, Lovebite',
        10: 'Fairy Protection: A fairy is watching over you',
        11: 'Mysterious Atk Buff: Gain 300% Attack and M.Attack',
        12: 'Flowstate: Basic attacks grant 5% evasion. Stacks 4 times. Lose stacks when hit.',
        13: 'Mysterious Def Buff: Gain 300% Def and M.def',
        14: 'Poisoned Arms: Basic Attacks apply poison',
        15: 'Evade: Gain 50% Evasion',
        16: 'Grappling: In the middle of grappling an opponent',
        17: 'Bleed Expert: Your bleed attacks apply 3 stacks of bleed',
        18: 'Preperation: Gain an extra action point',
        19: 'Hold the line!: Gain 25% mitigation, 50% stun resist, 50% AGI down resist',
        20: 'Charge Guard: Gain 200% Damage',
        21: 'Heroic Charge!: Deathstrike deals 300% more damage',
        22: 'Quick Footed: Cast Evade at the start of the turn',
        23: 'Heroic Entry Buff: Gain 50% crit',
        24: 'Keen Eye: Increases crit chance by 30%',
        25: 'Twirling Kick buff: NIU NIU NIU NIU',
        26: 'Devilblade: Gain +1 Atk for every Rezlo Level',
        27: 'Overwhelming Presence: Automatically cast your presence at the end of each turn',
        28: 'Thrill of the Hunt!: Gain 15% Accuracy, Evasion, and Crit Chance',
        29: 'Grit: Gain 10% mitigation per stack, up to 30%',
        30: 'Greater Ocarina: Playing it grants a greater buff',
        31: 'Lesser Ocarina: Playing it grants a lesser buff',
        32: 'Greater Ocarina Accuracy: Gain 25% Accuracy',
        33: 'Lesser Ocarina Accuracy: Gain 15% Accuracy',
        34: 'Greater Ocarina Def: Gain 40% Mitigation',
        35: 'Lesser Ocarina Def: Gain 25% Mitigation',
        36: 'Greater Ocarina Atk: Gain 40% Damage',
        37: 'Lesser Ocarina Atk: Gain 20% Damage',
        38: 'Shrug it off available: Cleanse all lesser debuffs.',
        39: 'Bleeding: You will take bleed damage at the end of the turn',
        40: 'Enviornmental Blind: Your accuracy has been reduced by 50%',
        41: 'Blinded: Your accuracy has been reduced by 50%',
        42: 'Toxic!: You will take toxic damage at the end of the turn',
        43: 'Poisoned: You will take poison damage at the end of the turn',
        44: 'Frostblood Arrow: Can not cast Frostblood skills',
        45: 'Ice Lanced: The bloody spear is hindering your action points',
        46: 'Entangled: You have been entangled for next turn(-1 action point)',
        47: 'Hamstring Shot: The arrow is hindering your action points.',
        48: 'Silenced: Can not cast weapon skills',
        49: 'Stunned: Can not take any actions',
        50: 'Leg Injury: Enemies will take their turn before you',
        51: 'Lost Intiative: Enemies will take their turn before you',
        52: 'Exhausted: You do 50% less damage',
        53: 'Overseer Flame Debuff: Your Magic Def has been reduced by 50%',
        54: 'Overseer Physical Debuff: Your Physical Def has been reduced by 50%',
        55: 'Being Grappled: An enemy is grappling you! You cannot take normal actions',
        56: 'Seduced: Cannot take any actions',
        57: 'Bounded: Bounded to an enemy',
        58: 'Marked: You cannot evade any attacks',
        59: 'The Yellow Flame: You will take true damage at the end of the turn',
        60: 'Consumables Buffs',
        61: 'Combat Buffs',
        62: 'Combat Debuffs',
        63: 'Equipped Gear',
        64: 'Adaptive Handle: Transforming Icebreaker refunds frostblood',
        65: 'Guiding Blade: You have 100% Accuracy',
        66: 'Ghost Cloak: You have 100% Evasion and Magic Avoidance',
        67: 'Assasins Path: You do 100% Bonus damage',
        68: 'Icebreaker Armor: Gain 300% Defence/M.Defence and Immunity to lesser debuffs',
        69: 'Riposte: Deflect all physical damage and return an auto attack.',
        70: 'Monarchs Domain: Gain 25% Mitigation and 100% Accuracy',
        71: 'Icy Mists: Gain 25% Evasion and 25% Magic Avoidance',
        72: 'Current Transformation: Daggers',
        73: 'Current Transformation: Gauntlets',
        74: 'Current Transformation: Spear',
        75: 'Current Transformation: Rapier',
        76: 'Current Transformation: Greatsword',
        77: 'Current Transformation: Arming Sword',
        78: 'Haymaker Def buff: Raise Defence by 20%',
        79: 'Twirling Kick Crit buff: Raise crit chance by 100%',
        80: 'Thrill: Gain Accuracy, Evasion, and Crit Chance each turn. Values are 1/2/5/7/15%',
        81: 'Frostblood Gauge: Resource for Frostblood Abilities',
        82: 'Energy Gauge: Resource for Normal Abilities. Gain +20 per turn by default',
        83: 'The Plague: You have -50% Max Energy',
        84: 'Flat Guard: Gain 75% mitigation, 75% Grab resist, 75% Stun resist, 50% bleed resist',
        85: 'Guard: Gain 50% mitigation, 50% Grab resist, 50% Stun resist, 50% bleed resist',
        86: 'Death resist: Cannot die',
        87: 'Demonic: You do 20% more damage',
        88: 'The Lotus Flower: Your health and family symbol.',
        89: 'Signature rose: Your special technique, honed over many adventures.',
        90: 'The Clock: Every turn costs 1 minute',
        91: 'Action Points: The amount of actions you can make per turn',
        92: 'Situational Skill: You have learned a special skill for the current situation',
        93: 'Imprisonment: If you are fully chained you will become his pet',
        94: 'Toxic meter',
        95: 'Dragon buff: Energy Regen increased by 20%',
        96: 'Broken Arm: You deal 25% less damage. Cleanse by full healing',
        97: 'Broken Leg: Lose 1 action point. Clease by Full Healing',
        98: 'Ruptured Organs: Lose 50% Max HP. Lasts 3 turns',
        99: 'Gear Slot',
        100: 'Webbed: You are being covered in web and will be cacooned at 4 stacks',
        101: 'Cacooned: Can not make any actions until you break free!',
        102: 'Drowsy: You are about to fall asleep, certain items may keep you awake',
        103: 'Asleep: You have been put to sleep, enabling enemy dream spells',
        104: 'Bloodshield: Gain 70% Mitigation and prevent Poison/Bleed/Stun Application',
        105: 'Insectian DNA: Gain Immunity to Poisons and Diseases',
        106: 'Elven DNA: Gain Immunity to Bleeding',
        107: 'Bloodkin DNA: Gain Immunity to Blind',
        108: 'Lustful: Basic Attacks against the victim heals you.(Scales with ATK stat)',
        109: 'Obsessive: Deal more damage to anyone that is not the victim',
        110: 'Violent: Deal more damage to the victim',
        111: 'Exploitive: Basic Attacks Daze the victim',
        112: 'Power Ring: Gain 20 Attack and can break out of binds much easier',
        113: 'Cursed: Frostblood abilities sealed, -100% Evasion',
        114: 'Dazed: -15% Evasion, -100% Grab and Stun Resist',
        // Add more mappings here
        // Add hundreds of more mappings as needed
    };

    function getTooltipText(variableValue) {
        return tooltipTexts[variableValue] || defaultText;
    }

    class Window_CursorText extends Window_Base {
        constructor() {
            const width = Window_CursorText.calculateWidth(defaultText);
            const height = Window_CursorText.calculateHeight(defaultText);
            super(new Rectangle(0, 0, width, height));
            this.opacity = 192;
            this.contents.fontSize = 18; // Adjust font size
            this.refresh();
        }

        static calculateWidth(text) {
            const tempWindow = new Window_Base(new Rectangle(0, 0, 1, 1));
            tempWindow.contents.fontSize = 18; // Adjust font size
            const textWidth = tempWindow.textWidth(text) + 40; // Add padding
            tempWindow.destroy();
            return Math.max(200, textWidth); // Ensure minimum width
        }

        static calculateHeight(text) {
            const tempWindow = new Window_Base(new Rectangle(0, 0, 1, 1));
            tempWindow.contents.fontSize = 18; // Adjust font size
            const textHeight = tempWindow.fittingHeight(1);
            tempWindow.destroy();
            return textHeight;
        }

        refresh() {
            const variableValue = $gameVariables.value(variableId);
            const text = getTooltipText(variableValue);
            this.contents.clear();
            this.drawText(text, 0, 0, this.contentsWidth(), 'left');
        }

        update() {
            super.update();
            this.x = TouchInput.x;
            this.y = TouchInput.y - this.height;
            this.visible = $gameSwitches.value(switchId) && $gameVariables.value(variableId) !== 0;
            if (this.visible) {
                const variableValue = $gameVariables.value(variableId);
                const text = getTooltipText(variableValue);
                this.width = Window_CursorText.calculateWidth(text);
                this.height = Window_CursorText.calculateHeight(text);
                this.createContents(); // Create contents with the new size
                this.refresh(); // Refresh the content if the window is visible
            }
        }
    }

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this._cursorTextWindow = new Window_CursorText();
        this.addWindow(this._cursorTextWindow);
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (this._cursorTextWindow) {
            this._cursorTextWindow.update();
        }
    };
})();