function changeWindowSkin(filename) {
    ImageManager.loadSystem(filename);
    Window_Base.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem(filename);
    };
    const windows = SceneManager._scene._windowLayer.children;
    windows.forEach(window => {
        if (window instanceof Window) {
            window.loadWindowskin();
            window.refresh();
        }
    });
}
