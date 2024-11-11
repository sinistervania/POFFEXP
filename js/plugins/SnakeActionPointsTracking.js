/*:
 * @target MZ
 * @plugindesc Manages action points based on target confirmations in battle, ensuring correct timing for deductions and refunds.
 * @author SnakekillerX
 * 
 * @help This plugin updates variables to track action points based on target confirmations. 
 * It deducts points only after target confirmation for targeted actions and updates immediately for consumable items.
 *
 * Variables:
 * - Variable 592: Tracks remaining actions based on input index.
 * - Variable 343: Tracks the total number of actions available.
 *
 * Plugin Name: SnakeActionPointsTracking
 */

(() => {

  const Alias_AP_Display_Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
      Alias_AP_Display_Scene_Battle_update.call(this);
  
      //update current AP index
      if($gameParty.battleMembers()[0]){
        $gameVariables.setValue(592, $gameParty.battleMembers()[0]._actions.length - $gameParty.battleMembers()[0]._actionInputIndex)
      }
      if($gameParty.battleMembers()[1]){
        $gameVariables.setValue(593, $gameParty.battleMembers()[1]._actions.length - $gameParty.battleMembers()[1]._actionInputIndex)
      }
      if($gameParty.battleMembers()[2]){
        $gameVariables.setValue(594, $gameParty.battleMembers()[2]._actions.length - $gameParty.battleMembers()[2]._actionInputIndex)
      }
  
      //display total AP available
      if($gameParty.battleMembers()[0]){
        $gameVariables.setValue(343, $gameParty.battleMembers()[0]._actions.length)
      }
      if($gameParty.battleMembers()[1]){
        $gameVariables.setValue(346, $gameParty.battleMembers()[1]._actions.length)
      }
      if($gameParty.battleMembers()[2]){
        $gameVariables.setValue(347, $gameParty.battleMembers()[2]._actions.length)
      }
  };
})();
