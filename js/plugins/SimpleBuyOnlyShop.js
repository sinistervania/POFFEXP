/*:
 * @target MZ
 * @plugindesc Simple Buy-Only Shop Plugin
 * @author Bloodkin
 *
 * @param Shop Items
 * @text Shop Items
 * @desc List of items available in the shop. Format: Item ID, Item ID, ...
 * @default 1,2,3
 *
 * @param Currency Item
 * @text Currency Item
 * @desc The item ID used as currency.
 * @default 4
 *
 * @help This plugin creates a simple shop where the player can only buy items.
 *
 * -- Plugin Command --
 * OpenShop: Opens the shop window.
 */

(function () {
    const pluginName = 'SimpleBuyOnlyShop';
    const parameters = PluginManager.parameters(pluginName);
    const shopItems = parameters['Shop Items'].split(',').map(Number);
    const currencyItemID = Number(parameters['Currency Item']);

    // Define a custom plugin command to open the shop
    PluginManager.registerCommand(pluginName, "OpenShop", args => {
        SceneManager.push(Scene_SimpleShop);
    });

    // Extend the Scene_Shop class to create a buy-only shop scene
    class Scene_SimpleShop extends Scene_Shop {
        constructor() {
            super();
        }

        create() {
            super.create();
            this.prepareBuyOnlyShop();
        }

        prepareBuyOnlyShop() {
            this._goods = [];
            for (const itemId of shopItems) {
                if (itemId > 0) {
                    const item = $dataItems[itemId];
                    if (item) {
                        const price = item.price;
                        const enabled = $gameParty.gold() >= price;
                        this._goods.push({ item, price, enabled });
                    }
                }
            }
            this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
            this._commandWindow.setHandler("cancel", this.popScene.bind(this));
            this._buyWindow.setMoney(currencyItemID);
            this._buyWindow.setup(this._goods, currencyItemID);
        }
    }

    // Modify the buy window to show the currency item
    Window_ShopBuy.prototype.currencyUnit = function () {
        return $dataItems[currencyItemID].name;
    };

    // Override the standard Scene_Shop with our custom Scene_SimpleShop
    Scene_Shop.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createNumberWindow();
        this.createStatusWindow();
    };

    Scene_Shop.prototype.createDummyWindow = function () {
        const rect = this.dummyWindowRect();
        this._dummyWindow = new Window_Base(rect);
        this.addWindow(this._dummyWindow);
    };

    // Expose functions for other plugins or events
    window.isItemInShop = function (itemId) {
        return shopItems.includes(itemId);
    };

    window.getCurrencyItemID = function () {
        return currencyItemID;
    };
})();
