//Total action+ trait value
getTotalAPValue = function(actor){
    totalValue = 1
    for(let i = 0; i < actor.traits(61).length; i++){
        totalValue += actor.traits(61)[i].value;
    }
    return totalValue;
}

//Makes sure _actionInputIndex is incremented after using your last action
Game_Actor.prototype.selectNextCommand = function() {
    if (this._actionInputIndex < this.numActions() - 1) {
        this._actionInputIndex++;
        return true;
    } else {
        this._actionInputIndex++; //added increment
        return false;
    }
};