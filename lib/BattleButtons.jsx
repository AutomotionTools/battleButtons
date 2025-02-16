/** ====== About Script ===========
ScriptUI functions for creating BattleButtons

-- Created by Rob Barrett (rob-barrett.com), modified from BattleStyle by Adam Plouff (battleaxe.co)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

-- http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

/*****************************************************************************************************
 Naming conventions for button variables - in this example, the main button variable is: buttonExample

// Each button in the UI is contained within a group. This group contains a stack of buttons that are shown/hidden depending on hover or toggle states.
// For the group variable, suffix the main variable with "_Group".
var buttonExample_Group = createUIButtonGroup("buttonExample", parent);

// If defining a helptip for the button, define it before creating any buttons within the group.
// Suffix the main variable with "_HelpTip".
var buttonExample_HelpTip = "This is an example button.";

// If the button should show a 'hit box' behind it on hover, define this next.
// Suffix the main variable with "_BG".
var buttonExample_BG = createUIBox(icon, parent, color, size, alpha);

// Create the main (default state) button. Ensure that this is visible at initiation.
var buttonExample = createUIButton(icon, parent, colors, size, alpha, visible = true, helpTip);

// Create any additional button states (eg. toggle or hover states). Ensure that this is not visible at initiation.
var buttonExample_Toggle = createUIButton(icon, parent, colors, size, alpha, visible = false, helpTip);

// If using the button as a toggle, give the button a 'value' of zero.
buttonExample.value = 0;

// Call the buttonHover() function to swap visible states for icons and/or backgrounds on hover
buttonHover("buttonExample", buttonExample_BG);

******************************************************************************************************/

/*****************************************************************************************************

NEW FEATURES:

- The color arrays are now more robust: If the number of colors specified doesn't match the number of paths,
  the last-defined color will be used for the remainder of paths that don't have assigned colors.

- The issue with the hover background not remaining visible when toggle buttons are clicked has been fixed.
  No code changes should be required by the user for this to work.

- Icon example structure changed to use objects instead of a series of arrays.
  This will break existing code, so ensure that icons are updated to use this new structure:

  iconName.icon // The default icon
  iconName.colors // The default colors
  iconName.[state].icon // The icon for a state (this could be "hover", "alt" or "altshift", for example)
  iconName.[state].colors // The colors for the state. If not defined, the default colors will be used.
  iconName.colors.darkest,
  iconName.colors.dark,
  iconName.colors.light,
  iconName.colors.legacy // Optional colors for specific After Effects UI appearances. Any not defined will use the default colors.
  iconName.colors = appearanceColors(iconName); // If specifying any appearance colors as above, include this function as the last defined color, even if you've already defined iconName.colors.

/*****************************************************************************************************



/**************************************
* Functions ***************************
***************************************/

/** Convert a hex color string to a normalized RGBA color array
@param {hexString} - string - hex string
*/
function hexToArray(hexString, alpha) {
    var hexColor = hexString.replace('#', '');
    var r = parseInt(hexColor.slice(0, 2), 16) / 255;
    var g = parseInt(hexColor.slice(2, 4), 16) / 255;
    var b = parseInt(hexColor.slice(4, 6), 16) / 255;
    var a = (alpha) ? alpha : 1;
    return [r, g, b, a];
}

/** Convert co-ordinates to vector points
@param {vecCoord} - array - SVG polygon co-ordinates
*/
function vecToPoints(vecCoord) {
    var points = [];
    var n;
    for (var i = 0; i < vecCoord.length; i++) {
        var eachNum = vecCoord[i].split(/[\s,]/);
        var coordinates = [];
        var sets = [];
        for (var k = 0; k < eachNum.length; k += 2) {
            sets.push(eachNum[k] + "," + eachNum[k + 1]);
        }
        for (var j = 0; j < sets.length; j++) {
            n = sets[j].split(",");
            coordinates[j] = n;
            coordinates[j][0] = (parseFloat(coordinates[j][0]));
            coordinates[j][1] = (parseFloat(coordinates[j][1]));
        }
        points.push(coordinates);
    }
    return points;
}

// Create the vector button
function vectorButtonDraw() {

    // If the color array contains fewer than the required number of values, use the last defined value for all missing ones
    if (this.color instanceof Array && this.color.length < this.coord.length) {
        for (var i = this.color.length - 1; i < this.coord.length; i++) {
            this.color.push(this.color[this.color.length - 1]);
        }
    }

    with (this) {
        this.graphics.drawOSControl();

        try {
            for (var i = 0; i < this.coord.length; i++) {
                var line = this.coord[i];
                var lineAlpha = (this.alpha) ? this.alpha : 1;
                // If an array of colors is specified:
                if (this.color instanceof Array) {
                    var lineColor = this.color[i];

                    // If a specified color is define as an array of color and alpha, utilize this – otherwise utilize the alpha for the icon
                    lineColor = (lineColor instanceof Array) ? hexToArray(lineColor[0], lineColor[1]) : hexToArray(lineColor, lineAlpha);
                }
                // If a single color is specified
                else {
                    lineColor = hexToArray(this.color, lineAlpha);
                }
                this.graphics.newPath();
                this.graphics.moveTo(line[0][0], line[0][1]);

                for (var j = 0; j < line.length; j++) {
                    this.graphics.lineTo(line[j][0] + (this.size[0] / 2 - this.iconSize[0] / 2),
                    line[j][1] + (this.size[1] / 2 - this.iconSize[1] / 2));
                }
                this.graphics.fillPath(this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, lineColor));
            }
        } catch (e) {
            // Fail silently
        }
    }
}

/** Draw a colored icon button - returns a button object
@param {parentGroup} - object - ScriptUI panel or group
@param {iconVec} - array of strings - SVG co-ordinates as string
@param {iconColor} - string, or array of strings - of hex colors for each of the above SVG paths. An array with a single value will use that value for all paths
@param {iconSize} - array - size of the icon artwork
@param {iconAlpha} - string - alpha value for icon color(s)
*/
function vectorButton(parentGroup, iconVec, iconColor, iconSize, iconAlpha) {
    var btn = parentGroup.add("button", [0, 0, iconSize[0], iconSize[1]]);
        btn.coord = iconVec;
        btn.color = iconColor;
        btn.iconSize = iconSize;
        btn.alpha = iconAlpha;
        btn.onDraw = vectorButtonDraw;
    return btn;
}

/** Define the co-ordinates for a rounded rectangle
@param {size} - array - box size: [width, height]
@param {radius} - number - corner radius
*/
function roundedRectVertices(size, radius) {

    var polygon = "1 0 9 0 9.31 .05 9.59 .19 9.81 .41 9.95 .69 10 1 10 9 9.95 9.31 9.81 9.59 9.59 9.81 9.31 9.95 9 10 1 10 .69 9.95 .41 9.81 .19 9.59 .05 9.31 0 9 0 1 .05 .69 .19 .41 .41 .19 .69 .05 1 0";
    var polygonVertices = polygon.split(" ");

    // Scale the box to adjust the corner radius
    for (var i = 0; i < polygonVertices.length; i++) {
        polygonVertices[i] *= radius;
    }

    function splitPairs(arr) {
        var pairs = [];
        for (var i = 0; i < arr.length; i += 2) {
            if (arr[i + 1] !== undefined) {
                pairs.push ([arr[i], arr[i + 1]]);
            } else {
                pairs.push ([arr[i]]);
            }
        }
        return pairs;
    };
    var polygonVertices = splitPairs(polygonVertices);

    // Adjust widths (base width is 10px * radius)
    for (var i = 1; i <= 12; i++) {
        var vertex = polygonVertices[i];
        vertex[0] = parseFloat(vertex[0]);
        vertex[0] += (size[0] - (10 * radius));
        polygonVertices[i] = [vertex[0], vertex[1]];
    }

    // Adjust heights (base height is 10px * radius)
    for (var i = 7; i <= 18; i++) {
        var vertex = polygonVertices[i];
        vertex[1] = parseFloat(vertex[1]);
        vertex[1] += (size[1] - (10 * radius));
        polygonVertices[i] = [vertex[0], vertex[1]];
    }

    // Rejoin each vertex as spaced values
    for (var i = 0; i < polygonVertices.length; i++) {
        var vertex = polygonVertices[i];
        polygonVertices[i] = vertex.join(" ");
    }
    // Rejoin all vertices as spaced values
    polygonVertices = polygonVertices.join(" ")

    return [polygonVertices];

};

/** Draw a square with rounded corners - returns a button object
@param {parentGroup} - object - ScriptUI panel or group
@param {iconVec} - array of strings - SVG co-ordinates as string
@param {iconSize} - array - size of the icon artwork
@param {iconColor} - string - icon color when static
@param {iconAlpha} - string - alpha value for icon color(s)
*/
function vectorBox(parentGroup, iconVec, iconColor, iconSize, iconAlpha) {
    var btn = parentGroup.add("button", [0, 0, iconSize[0], iconSize[1]]);
        btn.coord = iconVec;
        btn.color = iconColor;
        btn.iconSize = iconSize;
        btn.alpha = iconAlpha;
        btn.onDraw = vectorButtonDraw;
    return btn;
}

/** Swap button icons if modifier keys are held
@param {button} - object - button object
@param {buttonAlt} - object - button object (optional: replace with null if not used)
@param {buttonCtrl} - object - button object (optional: replace with null if not used)
@param {buttonShift} - object - button object (optional: replace with null if not used)
@param {buttonAltCtrl} - object - button object (optional: replace with null if not used)
@param {buttonAltShift} - object - button object (optional: replace with null if not used)
@param {buttonCtrlShift} - object - button object (optional: replace with null if not used)
@param {buttonAltCtrlShift} - object - button object (optional: replace with null if not used)
*/
function buttonSwap(button, buttonAlt, buttonCtrl, buttonShift, buttonAltCtrl, buttonAltShift, buttonCtrlShift, buttonAltCtrlShift) {

    var buttonsArray = [button, buttonAlt, buttonCtrl, buttonShift, buttonAltCtrl, buttonAltShift, buttonCtrlShift, buttonAltCtrlShift];

    if (buttonAltCtrlShift && k.altKey && k.ctrlKey && k.shiftKey) {
        var buttonActive = buttonAltCtrlShift;
    }
    else if (buttonCtrlShift && !k.altKey && k.ctrlKey && k.shiftKey) {
        buttonActive = buttonCtrlShift;
    }
    else if (buttonAltShift && k.altKey && !k.ctrlKey && k.shiftKey) {
        buttonActive = buttonAltShift;
    }
    else if (buttonAltCtrl && k.altKey && k.ctrlKey && !k.shiftKey) {
        buttonActive = buttonAltCtrl;
    }
    else if (buttonAlt && k.altKey && !k.ctrlKey && !k.shiftKey) {
        buttonActive = buttonAlt;
    }
    else if (buttonCtrl && !k.altKey && k.ctrlKey && !k.shiftKey) {
        buttonActive = buttonCtrl;
    }
    else if (buttonShift && !k.altKey && !k.ctrlKey && k.shiftKey) {
        buttonActive = buttonShift;
    }
    else {
        buttonActive = button;
    }

    for (var i = 0; i < buttonsArray.length; i++) {
        var thisButton = buttonsArray[i];
        if (thisButton) thisButton.visible = (thisButton === buttonActive) ? true : false;
    }
}

/** Create a vector rounded rectangle
@param {icon} - array - background box icon
@param {parent} - object - parent object
@param {color} - string - background box color
@param {size} - array - background box size: [width, height]
@param {alpha} - number - background color alpha: value from 0 to 1
*/
function createUIBox(icon, parent, color, size, alpha) {
    var button = vectorBox(
        parent, // parentGroup
        icon, // iconVec
        color, // iconColor
        size, // iconSize,
        alpha // iconAlpha
    );
    button.visible = false;
    button.alignment = button_Alignment;
    return button;
}

/** Create a vector icon button
@param {icon} - array - button icon
@param {parent} - object - parent object
@param {colors} - array - button colors
@param {size} - array - button size: [width, height];
@param {alpha} - number - color alpha: value from 0 to 1
@param {visible} - boolean - button visibility
@param {helpTip} - string - helpTip/tooltip text
*/
function createUIButton(icon, parent, colors, size, alpha, visible, helpTip) {
    var button = vectorButton(
        parent, // parentGroup
        icon, // iconVec
        colors, // iconColors
        size, // iconSize
        alpha // iconAlpha
    );
    button.visible = visible;
    button.helpTip = helpTip;
    button.alignment = button_Alignment;
    return button;
};

/** Create a group to contain stacked icons for a single button
@param {icon} - string - name of the default button
@param {parent} - object - the parent object
*/
function createUIButtonGroup(icon, parent) {
    var groupName = icon + "_Group";
    var group = parent.add("group", undefined, {name: groupName});
        group.orientation = "stack";
        group.alignChildren = ["left", "center"];
    return group;
}

/** Return the click function for the top-most visible button in the group
@param {groupName} - object - button group
*/
function groupClick(groupName) {
    groupName.onClick = function() {
        for (var i = 0; i < groupName.children.length; i++) {
            var child = groupName.children[i];
            if (child.visible) {
                // Trigger the corresponding button's action
                child.onClick();
                break;
            }
        }
    };
};

/** Swap visible states for button icon and button BGs on mouseover/mouseout
@param {button} - object - the default button
@param {button_Group} - object - the button group
@param {button_BG} - object - the background box button (optional)
@param {button_Hover} - object - the hover state button (optional)
*/
function buttonHover(button, button_Group, button_BG, button_Hover) {

    var toggleClick;

    button_Group.addEventListener("mousedown", function() {
        toggleClick = true;
        button_BG.visible = true;
    });
    button_Group.addEventListener("mouseover", function () {
        if (button_Hover) {
            button.visible = false;
            button_Hover.visible = true;
        }
        button_BG.visible = true;
    });
    button_Group.addEventListener("mouseout", function () {
        if (button_Hover) {
            button.visible = true;
            button_Hover.visible = false;
        };
        if (toggleClick) {
            toggleClick = false;
        } else {
            button_BG.visible = false;
        }
    });
}

/** Swap color palette for icons based on After Effects' UI appearance
@param {darkest} - array - color scheme for the 'Darkest' appearance, and the default color scheme if another isn't defined (required)
@param {dark} - array - color scheme for the 'Dark' appearance (optional)
@param {light} - array - color scheme for the 'Light' appearance (optional)
@param {legacy} - array - color scheme for versions of After Effects before CC 2025 (optional)
@param {testMode} - string - set to 'darkest', 'dark', 'light' or 'legacy' to set icon colors regardless of AE's appearance settings
*/
function appearanceColors(icon, testMode) {
    // Check for AE theme (if AE 2025 or over)
    var appTheme = app.getAppTheme; // light, dark, darkest
    if (appTheme !== undefined) {
        if ((appTheme === "dark" || testMode == "dark") && icon.colors.dark) {
            iconColors = icon.colors.dark;
        }
        else if ((appTheme === "light" || testMode === "light") && icon.colors.light) {
            iconColors = icon.colors.light;
        }
        else if (testMode === "legacy" && icon.colors.legacy) {
            iconColors = icon.colors.legacy;
        }
        else if (icon.colors.darkest) {
            iconColors = icon.colors.darkest;
        }
        else if (icon.colors) {
            iconColors = icon.colors;
        }
        else {
            iconColors = ["FFFFFF"];
        }
    } else {
        if (icon.colors.legacy) {
            iconColors = icon.colors.legacy;
        }
        else if (icon.colors) {
            iconColors = icon.colors;
        }
        else if (icon.colors.darkest) {
            iconColors = icon.colors.darkest;
        }
        else if (icon.colors.dark) {
            iconColors = icon.colors.dark;
        }
        else if (icon.colors.light) {
            iconColors = icon.colors.light;
        } else {
            iconColors = ["FFFFFF"];
        }
    }
    return iconColors;
};