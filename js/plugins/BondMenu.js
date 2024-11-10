/*:
 * @target MZ
 * @plugindesc Skill Purchase and Tracking System for RPG Maker MZ
 * @author Bloodkin
 *
 * @param Currency Item ID
 * @text Currency Item ID
 * @type number
 * @desc The item ID used as currency for purchasing skills.
 * @default 4
 *
 * @param Purchase Count Variable ID
 * @text Purchase Count Variable ID
 * @type number
 * @desc The game variable ID that tracks the number of purchases.
 * @default 229
 *
 * @help BondMenu.js
 * This plugin manages a skill purchase and tracking system.
 *
 * It allows players to buy skills that they have unlocked through gameplay,
 * using a specific item as currency. Skills once bought will be marked as unlocked
 * and will not be available for repurchase. A reset function allows reverting all purchases.
 */

(() => {
    const pluginName = "BondMenu";
    let parameters = PluginManager.parameters(pluginName);
    let currencyItemId = Number(parameters['Currency Item ID'] || 4);
    let purchaseCountVarId = Number(parameters['Purchase Count Variable ID'] || 229);

    const skills = [
    { id: 484, name: "Transform: Daggers", cost: 0, isRoot: true, position: { x: 11, y: -1 }, connections: [681], unlocked: false },
    { id: 248, name: "Transform: Spear", cost: 0, isRoot: true, position: { x: 9, y: -1 }, connections: [594], unlocked: false },
    { id: 312, name: "Transform: Gauntlets", cost: 0, isRoot: true, position: { x: 7, y: -1 }, connections: [586], unlocked: false },
    { id: 485, name: "Transform: Greatsword", cost: 0, isRoot: true, position: { x: 4, y: -1 }, connections: [606], unlocked: false },
    { id: 249, name: "Transform: Arming Sword", cost: 0, isRoot: true, position: { x: 2, y: -1 }, connections: [600], unlocked: false },
    { id: 309, name: "Transform: Rapier", cost: 0, isRoot: true, position: { x: 0, y: -1 }, connections: [310], unlocked: false },
    { id: 606, name: "Monarch's Domain", cost: 1, isRoot: false, position: { x: 4, y: -2 }, connections: [949, 485, 490, 931], unlocked: false },
    { id: 949, name: "Charge Guard", cost: 1, isRoot: false, position: { x: 4, y: -3 }, connections: [606, 491], unlocked: false },
    { id: 490, name: "Bleed Expert", cost: 1, isRoot: false, position: { x: 3, y: -2 }, connections: [606, 600], unlocked: false },
    { id: 600, name: "Spinning Blade", cost: 1, isRoot: false, position: { x: 2, y: -2 }, connections: [249, 490, 503, 489], unlocked: false },
    { id: 503, name: "Demonic", cost: 1, isRoot: false, position: { x: 1, y: -2 }, connections: [310, 600], unlocked: false },
    { id: 489, name: "Heroic Entry", cost: 1, isRoot: false, position: { x: 2, y: -3 }, connections: [600, 948], unlocked: false },
    { id: 948, name: "I.B.S Slash", cost: 1, isRoot: false, position: { x: 2, y: -4 }, connections: [489, 937, 933, 945], unlocked: false },
    { id: 491, name: "Second Wind", cost: 1, isRoot: false, position: { x: 4, y: -4 }, connections: [949, 933, 954, 944], unlocked: false },
    { id: 944, name: "Overwhelming Presence", cost: 1, isRoot: false, position: { x: 4, y: -5 }, connections: [491], unlocked: false },
    { id: 945, name: "Plot Armor", cost: 1, isRoot: false, position: { x: 2, y: -5 }, connections: [948], unlocked: false },
    { id: 501, name: "Guiding Blade", cost: 1, isRoot: false, position: { x: 2, y: -6 }, connections: [946, 945, 944], unlocked: false },
    { id: 937, name: "EnergyUpgrade3", cost: 1, isRoot: false, position: { x: 1, y: -4 }, connections: [948, 960], unlocked: false },
    { id: 933, name: "HealthUpgrade3", cost: 1, isRoot: false, position: { x: 3, y: -4 }, connections: [948, 491], unlocked: false },
    { id: 931, name: "HealthUpgrade1", cost: 1, isRoot: false, position: { x: 5, y: -2 }, connections: [606, 951], unlocked: false },
    { id: 951, name: "Pacifying Blow", cost: 1, isRoot: false, position: { x: 5, y: -3 }, connections: [931, 950, 954], unlocked: false },
    { id: 954, name: "Standing Kickoff", cost: 1, isRoot: false, position: { x: 5, y: -4 }, connections: [951, 491], unlocked: false },
    { id: 950, name: "Flow State", cost: 1, isRoot: false, position: { x: 6, y: -3 }, connections: [951, 935, 952], unlocked: false },
    { id: 952, name: "Brawler's Agility", cost: 1, isRoot: false, position: { x: 6, y: -4 }, connections: [950, 953], unlocked: false },
    { id: 935, name: "EnergyUpgrade1", cost: 1, isRoot: false, position: { x: 6, y: -2 }, connections: [586, 950], unlocked: false },
    { id: 586, name: "Weapon art: Command Grab", cost: 1, isRoot: false, position: { x: 7, y: -2 }, connections: [312, 502, 935, 496], unlocked: false },
    { id: 496, name: "Grit", cost: 1, isRoot: false, position: { x: 7, y: -3 }, connections: [586, 953], unlocked: false },
    { id: 953, name: "Ground Pound", cost: 1, isRoot: false, position: { x: 7, y: -4 }, connections: [952, 496, 932, 943], unlocked: false },
    { id: 943, name: "Shrug it off", cost: 1, isRoot: false, position: { x: 7, y: -5 }, connections: [953], unlocked: false },
    { id: 932, name: "HealthUpgrade2", cost: 1, isRoot: false, position: { x: 8, y: -4 }, connections: [953, 656], unlocked: false },
    { id: 502, name: "Thrill of the hunt", cost: 1, isRoot: false, position: { x: 8, y: -2 }, connections: [586, 594], unlocked: false },
    { id: 594, name: "Weapon Art: Icy Mists", cost: 1, isRoot: false, position: { x: 9, y: -2 }, connections: [248, 502, 495, 494], unlocked: false },
    { id: 494, name: "Quick Footed", cost: 1, isRoot: false, position: { x: 9, y: -3 }, connections: [594, 656], unlocked: false },
    { id: 656, name: "Sage Meditation", cost: 1, isRoot: false, position: { x: 9, y: -4 }, connections: [932, 494, 936, 947], unlocked: false },
    { id: 947, name: "Summon Companion", cost: 1, isRoot: false, position: { x: 9, y: -5 }, connections: [656], unlocked: false },
    { id: 500, name: "Adaptive Handle", cost: 1, isRoot: false, position: { x: 9, y: -6 }, connections: [943, 947, 682], unlocked: false },
    { id: 495, name: "Poisoned Armaments", cost: 1, isRoot: false, position: { x: 10, y: -2 }, connections: [594, 681], unlocked: false },
    { id: 681, name: "Weapon Art: Assasin's Dagger", cost: 1, isRoot: false, position: { x: 11, y: -2 }, connections: [484, 495, 955, 497], unlocked: false },
    { id: 497, name: "Serrated Armaments", cost: 1, isRoot: false, position: { x: 11, y: -3 }, connections: [681, 959], unlocked: false },
    { id: 959, name: "Coin of fixed luck", cost: 1, isRoot: false, position: { x: 11, y: -4 }, connections: [497, 936, 957, 682], unlocked: false },
    { id: 682, name: "Always Prepared", cost: 1, isRoot: false, position: { x: 11, y: -5 }, connections: [959], unlocked: false },
    { id: 936, name: "EnergyUpgrade2", cost: 1, isRoot: false, position: { x: 10, y: -4 }, connections: [656, 959], unlocked: false },
    { id: 955, name: "Assasin's path", cost: 1, isRoot: false, position: { x: 12, y: -2 }, connections: [681, 956], unlocked: false },
    { id: 956, name: "Devilblade", cost: 1, isRoot: false, position: { x: 12, y: -3 }, connections: [955, 957], unlocked: false },
    { id: 957, name: "Consume Soul", cost: 1, isRoot: false, position: { x: 12, y: -4 }, connections: [956, 959], unlocked: false },
    { id: 310, name: "Weapon Art: Perfect Riposte", cost: 1, isRoot: false, position: { x: 0, y: -2 }, connections: [309, 492], unlocked: false },
    { id: 492, name: "Dance Fatale", cost: 1, isRoot: false, position: { x: 0, y: -3 }, connections: [310, 960], unlocked: false },
    { id: 960, name: "Keen Eye", cost: 1, isRoot: false, position: { x: 0, y: -4 }, connections: [492, 937, 946], unlocked: false },
    { id: 946, name: "Marked For Death", cost: 1, isRoot: false, position: { x: 0, y: -5 }, connections: [960], unlocked: false },

    ];

    function updateRootSkillUnlockedStatus() {
        skills.filter(skill => skill.isRoot).forEach(skill => {
            let playerHasLearnedSkill = $gameActors.actor(1).hasSkill(skill.id);
            skill.unlocked = playerHasLearnedSkill;
        });
    }

    function refreshSkills() {
        updateRootSkillUnlockedStatus();
        skills.forEach(skill => {
            if (!skill.isRoot) {
                skill.availableForPurchase = skill.connections.some(id => skills.find(s => s.id === id).unlocked);
            }
        });
    }

    function getCurrentSkill(cursorX, cursorY) {
        return skills.find(skill => skill.position.x === cursorX && skill.position.y === cursorY);
    }

    function canPurchase(skill) {
        return skill && !skill.unlocked && skill.availableForPurchase && $gameParty.numItems($dataItems[currencyItemId]) > 0;
    }

    function attemptPurchase() {
        const cursorX = $gameVariables.value(227);
        const cursorY = $gameVariables.value(228);
        let skill = getCurrentSkill(cursorX, cursorY);
        if (!skill) {
            // If no skill is found, play the buzzer sound
            AudioManager.playSe({name: "Buzzer3", volume: 90, pitch: 100, pan: 0});
            console.error("No skill found at cursor position");
            return;
        }
        if (canPurchase(skill)) {
            $gameParty.loseItem($dataItems[currencyItemId], 1);
            skill.unlocked = true;
            $gameActors.actor(1).learnSkill(skill.id);
            $gameVariables.setValue(purchaseCountVarId, $gameVariables.value(purchaseCountVarId) + 1);
            // Play Ice1 sound effect on successful purchase
            AudioManager.playSe({name: "Ice1", volume: 100, pitch: 50, pan: 0});
            console.log("Purchase successful: " + skill.name);
        } else {
            if (!skill.unlocked) {
                // Play Buzzer3 sound effect only if the purchase failed for reasons other than the skill already being unlocked
                AudioManager.playSe({name: "Buzzer3", volume: 90, pitch: 100, pan: 0});
            }
            console.log("Purchase failed: " + skill.name);
        }
    }
    

    function resetSkills() {
        skills.forEach(skill => {
            if (skill.unlocked && !skill.isRoot) {
                $gameActors.actor(1).forgetSkill(skill.id);
                $gameParty.gainItem($dataItems[currencyItemId], 1);
                skill.unlocked = false;
            }
        });
        $gameVariables.setValue(purchaseCountVarId, 0);
    }

    window.BondMenu = {
        attemptPurchase,
        resetSkills,
        refreshSkills
    };

})();
