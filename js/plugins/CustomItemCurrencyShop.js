/*:
 * @target MZ
 * @plugindesc Allows opening a shop that uses a specific item as currency.
 *
 * @param shopItems
 * @text Shop Items
 * @type struct<ItemPrice>[]
 * @desc Define items and their prices in Soul Coins.
 *
 * @command openCustomShop
 * @text Open Shop
 * @desc Opens the custom shop window.
 *
 */

/*~struct~ItemPrice:
 * @param itemId
 * @type number
 * @desc The ID of the item to sell.
 *
 * @param price
 * @type number
 * @desc The price of the item in Soul Coins.
 */

(() => {
    const pluginName = 'CustomItemCurrencyShop';
    const parameters = PluginManager.parameters(pluginName);
    const shopItems = JSON.parse(parameters['shopItems']).map(item => JSON.parse(item));

    PluginManager.registerCommand(pluginName, "openCustomShop", args => {
        const goods = shopItems.map(item => {
            return [0, parseInt(item.itemId), parseInt(item.price), 0];
        });
        SceneManager.push(Scene_Shop);
        SceneManager.prepareNextScene(goods, true);
        console.log("Custom shop opened with Soul Coin currency.");
    });

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        if (this._buyWindow && typeof this._buyWindow.setCurrencyUnit === 'function') {
            this._buyWindow.setCurrencyUnit('Soul Coin');
            this._buyWindow.setPriceList(shopItems);
            console.log("Shop window created with custom currency and price list.");
        } else {
            console.error('setCurrencyUnit method not found in _buyWindow');
        }
    };

    Window_ShopBuy.prototype.setPriceList = function(priceList) {
        this._priceList = {};
        priceList.forEach(item => {
            this._priceList[item.itemId] = item.price;
        });
    };

    Window_ShopBuy.prototype.price = function(item) {
        if (this._priceList && item && this._priceList[item.id] !== undefined) {
            return this._priceList[item.id];
        } else {
            console.error(`Item ID ${item ? item.id : 'undefined'} not found in price list.`);
            return 0; // Fallback price
        }
    };

    Window_ShopBuy.prototype.isCurrentItemEnabled = function() {
        const item = this.item();
        const price = this.price(item);
        const currencyAmount = $gameParty.numItems($dataItems[3]); // Assuming 3 is the ID for 'Soul Coins'
        return currencyAmount >= price;
        };
    

    Window_ShopBuy.prototype.drawItem = function(index) {
        const item = this._data[index];
        const rect = this.itemRect(index);
        const price = this.price(item);
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - this.priceWidth());
        this.drawText(price + ' Soul Coins', rect.x, rect.y, rect.width, 'right');
        this.changePaintOpacity(1);
    };
})();
