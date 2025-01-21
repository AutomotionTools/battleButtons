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
var button_Alignment = ["fill", "fill"];
var button_BG_Color = "FFFFFF";
var button_BG_Alpha = 0.15;
var button_Size = [30,30];

// button1
var button1_Group = createUIButtonGroup("button1", buttonsGroup);
var button1_HelpTip = "Icon changes on hover.\nBackground box shows on hover.";
var button1_BG = createUIBox(icon = iconButton_BG, parent = button1_Group, color = button_BG_Color, size = button_Size, alpha = button_BG_Alpha);
var button1 = createUIButton(icon = iconButton1, parent = button1_Group, colors = iconButton1_Colors, size = button_Size, alpha = null, visible = true, helpTip = button1_HelpTip);
var button1_Hover = createUIButton(icon = iconButton1_Hover, parent = button1_Group, colors = iconButton1_Hover_Colors, size = button_Size, alpha = null, visible = false, helpTip = button1_HelpTip);

    // Click Functions: button1
    groupClick(button1_Group);
    button1_Hover.onClick = function() {
        alert("Button clicked");
        };
    // Hover state: button1
    buttonHover(button1, button1_Group, button1_BG, button1_Hover);

// button2
var button2_Group = createUIButtonGroup("button2", buttonsGroup);
var button2_HelpTip = "Background box shows on hover.\nIcon changes when Alt modifier key is held.";
var button2_BG = createUIBox(icon = iconButton_BG, parent = button2_Group, color = button_BG_Color, size = button_Size, alpha = button_BG_Alpha);
var button2 = createUIButton(icon = iconButton2, parent = button2_Group, colors = iconButton2_Colors, size = button_Size, alpha = null, visible = true, helpTip = button2_HelpTip);
var button2_Alt = createUIButton(icon = iconButton2_Alt, parent = button2_Group, colors = iconButton2_Alt_Colors, size = button_Size, alpha = null, visible = false, helpTip = button2_HelpTip);

    // Click Functions: button2
    groupClick(button2_Group);
    button2.onClick = function() {
        alert("Button clicked without any modifier keys");
        }
    button2_Alt.onClick = function() {
        alert("Button clicked with Alt modifier key");
        }
    // Hover state: button2
    buttonHover(button2, button2_Group, button2_BG);

// button3
var button3_Group = createUIButtonGroup("button3", buttonsGroup);
var button3_HelpTip = "Background box shows on hover.\nIcon toggles when clicked.";
var button3_BG = createUIBox(icon = iconButton_BG, parent = button3_Group, color = button_BG_Color, size = button_Size, alpha = button_BG_Alpha);
var button3 = createUIButton(icon = iconButton3, parent = button3_Group, colors = iconButton3_Colors, size = button_Size, alpha = null, visible = true, helpTip = button3_HelpTip);
var button3_Toggle2 = createUIButton(icon = iconButton3_Toggle2, parent = button3_Group, colors = iconButton3_Toggle2_Colors, size = button_Size, alpha = null, visible = false, helpTip = button3_HelpTip);
var button3_Toggle3 = createUIButton(icon = iconButton3_Toggle3, parent = button3_Group, colors = iconButton3_Toggle3_Colors, size = button_Size, alpha = null, visible = false, helpTip = button3_HelpTip);
    button3.value = 0;

    // Click Functions: button3
    groupClick(button3_Group);
    function button3_Click() {
        var toggleStates = 3; // Number of toggle states
        button3.value = (button3.value + 1) % toggleStates; // Increment the toggle value, rolling the value back to zero after it reaches the maximum number of states. 

        // Toggle State 1 (default)
        if (button3.value === 0) {
            button3.visible = true;
            button3_Toggle2.visible = false;
            button3_Toggle3.visible = false;
        }
        // Toggle State 2
        else if (button3.value === 1) {
            button3.visible = false;
            button3_Toggle2.visible = true;
            button3_Toggle3.visible = false;
        }
        // Toggle State 3
        else {
            button3.visible = false;
            button3_Toggle2.visible = false;
            button3_Toggle3.visible = true;
        }
        
    }
    button3.onClick = function() { button3_Click() };
    button3_Toggle2.onClick = function() { button3_Click() };
    button3_Toggle3.onClick = function() { button3_Click() };
    // Hover state: button3
    buttonHover(button3, button3_Group, button3_BG);

// button4
var button4_Group = createUIButtonGroup("button4", buttonsGroup);
var button4_HelpTip = "Icon colors change based on After Effects UI appearance";
var button4_BG = createUIBox(icon = iconButton_BG, parent = button4_Group, color = button_BG_Color, size = button_Size, alpha = button_BG_Alpha);
var button4 = createUIButton(icon = iconButton4, parent = button4_Group, colors = iconButton4_Colors, size = button_Size, alpha = null, visible = true, helpTip = button4_HelpTip);
    buttonHover(button4, button4_Group, button4_BG);



/************************************************************
* Update button icons when modifier keys are active *********
*************************************************************/
win.addEventListener('mousemove', function(){
    alertKey(); // Listen for key modifiers

    buttonSwap(button2, button2_Alt);
});