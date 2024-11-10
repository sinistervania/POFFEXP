var minuteVariableId = 48; // Minute variable ID
var hourVariableId = 47;  // Hour variable ID
var minutesToAddId = 49;  // Variable ID that holds the number of minutes to add

var minutesToAdd = $gameVariables.value(minutesToAddId); // Fetching the number of minutes to add
var currentMinutes = $gameVariables.value(minuteVariableId);
var newMinutes = currentMinutes + minutesToAdd;
var hoursToAdd = Math.floor(newMinutes / 60);
newMinutes %= 60;

var currentHours = $gameVariables.value(hourVariableId);
var newHours = (currentHours + hoursToAdd) % 24;

$gameVariables.setValue(minuteVariableId, newMinutes);
$gameVariables.setValue(hourVariableId, newHours);
