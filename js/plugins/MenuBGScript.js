(function() {
    var _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        _Scene_Map_updateScene.call(this);
        if (!SceneManager.isSceneChanging() && this.isMenuCalled()) {
            this.callMenu();
        }
    };

    Scene_Map.prototype.callMenu = function() {
        $gameTemp.reserveCommonEvent(493); // Trigger Common Event 493
        SceneManager.push(Scene_Menu);
        Input.update();
    };

    Scene_Map.prototype.isMenuCalled = function() {
        return Input.isTriggered('menu') || TouchInput.isCancelled();
    };
})();
