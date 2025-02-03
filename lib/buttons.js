// Check for modifier key(s)
k = ScriptUI.environment.keyboardState;
function alertKey() {
    k = ScriptUI.environment.keyboardState;
}



/**************************************
* Icons *******************************
***************************************/
//@include "icons.js";



/**************************************
* Define Buttons **********************
***************************************/

// General button options
var buttonOptions = {
    "alignment" : ["fill", "fill"],
    "bgColor" : "FFFFFF",
    "bgAlpha" : 0.15,
    "size" : [30,30]
}

// button1
var button1 = new Object;
    button1.group = createUIButtonGroup("button1", buttonsGroup);
    button1.helpTip = "Icon changes on hover.\nBackground box shows on hover.";
    button1.bg = createUIBox(iconButton_BG.icon, parent = button1.group, buttonOptions.bgColor, buttonOptions.size, buttonOptions.bgAlpha);
    button1.primary = createUIButton(iconButton1.icon, parent = button1.group, iconButton1.colors, buttonOptions.size, alpha = null, visible = true, button1.helpTip);
    button1.hover = createUIButton(iconButton1.hover.icon, parent = button1.group, iconButton1.hover.colors, buttonOptions.size, alpha = null, visible = false, button1.helpTip);

    // Click Functions: button1
    //groupClick(button1.group);
    button1.hover.onClick = function() {
        alert("Button clicked");
        };
    // Hover state: button1
    buttonHover(button1.primary, button1.group, button1.bg, button1.hover);

// button2
var button2 = new Object;
    button2.group = createUIButtonGroup("button2", buttonsGroup);
    button2.helpTip = "Background box shows on hover.\nIcon changes when Alt modifier key is held.";
    button2.bg = createUIBox(iconButton_BG.icon, parent = button2.group, buttonOptions.bgColor, buttonOptions.size, buttonOptions.bgAlpha);
    button2.primary = createUIButton(iconButton2.icon, parent = button2.group, iconButton2.colors, buttonOptions.size, alpha = null, visible = true, button2.helpTip);
    button2.alt = createUIButton(iconButton2.alt.icon, parent = button2.group, iconButton2.alt.colors, buttonOptions.size, alpha = null, visible = false, button2.helpTip);

    // Click Functions: button2
    //groupClick(button2.group);
    button2.primary.onClick = function() {
        alert("Button clicked without any modifier keys");
        }
    button2.alt.onClick = function() {
        alert("Button clicked with Alt modifier key");
        }
    // Hover state: button2
    buttonHover(button2.primary, button2.group, button2.bg);

// button3
var button3 = new Object;
    button3.group = createUIButtonGroup("button3", buttonsGroup);
    button3.helpTip = "Background box shows on hover.\nIcon toggles when clicked.";
    button3.bg = createUIBox(iconButton_BG.icon, parent = button3.group, buttonOptions.bgColor, buttonOptions.size, buttonOptions.bgAlpha);
    button3.primary = createUIButton(iconButton3.icon, parent = button3.group, iconButton3.colors, buttonOptions.size, alpha = null, visible = true, button3.helpTip);
    button3.toggle2 = createUIButton(iconButton3.toggle2.icon, parent = button3.group, colors = iconButton3.colors, buttonOptions.size, alpha = null, visible = false, button3.helpTip);
    button3.toggle3 = createUIButton(iconButton3.toggle3.icon, parent = button3.group, colors = iconButton3.colors, buttonOptions.size, alpha = null, visible = false, button3.helpTip);
    button3.value = 0;

    // Click Functions: button3
    //groupClick(button3.group);
    function button3_Click() {

        var toggleStates = 3; // Number of toggle states
        button3.value = (button3.value + 1) % toggleStates; // Increment the toggle value, rolling the value back to zero after it reaches the maximum number of states. 

        // Toggle State 1 (default)
        if (button3.value === 0) {
            button3.primary.visible = true;
            button3.toggle2.visible = false;
            button3.toggle3.visible = false;
        }
        // Toggle State 2
        else if (button3.value === 1) {
            button3.primary.visible = false;
            button3.toggle2.visible = true;
            button3.toggle3.visible = false;
        }
        // Toggle State 3
        else {
            button3.primary.visible = false;
            button3.toggle2.visible = false;
            button3.toggle3.visible = true;
        }

        button3.bg.visible = true;
        toggleNumber.text = button3.value;
    }
    button3.primary.onClick = function() { button3_Click(); };
    button3.toggle2.onClick = function() { button3_Click(); };
    button3.toggle3.onClick = function() { button3_Click(); };
    // Hover state: button3
    buttonHover(button3.primary, button3.group, button3.bg);

var toggleNumber = buttonsGroup.add("statictext", undefined, undefined, {name: "toggleNumber"}); 
    toggleNumber.text = button3.value;

// button4
var button4 = new Object;
    button4.group = createUIButtonGroup("button4", buttonsGroup);
    button4.helpTip = "Icon colors change based on After Effects UI appearance";
    button4.bg = createUIBox(iconButton_BG.icon, parent = button4.group, buttonOptions.bgColor, buttonOptions.size, buttonOptions.bgAlpha);
    button4.primary = createUIButton(iconButton4.icon, parent = button4.group, iconButton4.colors, buttonOptions.size, alpha = null, visible = true, button4.helpTip);
    buttonHover(button4.primary, button4.group, button4.bg);



/************************************************************
* Update button icons when modifier keys are active *********
*************************************************************/
win.addEventListener('mousemove', function(){
    alertKey(); // Listen for key modifiers

    buttonSwap(button2.primary, button2.alt);
});