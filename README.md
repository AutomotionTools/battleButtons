# BattleButtons
This is a pared-down re-purpose of [Adam Plouff's BattleStyle toolkit](https://github.com/adamplouff/scriptui-battlestyle) for creating straight-line vector, resolution independent icons buttons without the need for local files.

This builds on that project, in allowing for multi-color icons, as well as methods to swap out icons – for instance, when hovering over an icon or when holding down a modifier key. It also concerns itself only with icon buttons – the text buttons and icon/text buttons from the original have been omitted.

![BattleButtons - Demo 01 - v02 - 640](https://github.com/user-attachments/assets/576e4fc2-a234-44a4-999a-97cd092b504d)


## Installation
Download and drop it into AE's `Scripts/ScriptUI Panels` folder to test out the system with your own coordinates.


## Usage
Include `BattleButtons.jsx` in your own project to use its functions. You should also include a JSON2 library in your script.


### Defining buttons

Each 'button' in the UI is a group containing a number of button elements which are shown/hidden depending on hover and/or modifier key states.

- First, define a button group with `createUIButtonGroup()`.
- If you would like to show a 'hit box' behind the button when hovering on it, next define a background button with `createUIBox()`.
- Next, define the default state of the button with `createUIButton()`.
- Next, define any additional states of the button (ie. hover states, modifier key states) with `createUIButton()`.


### Defining hover states

- Use the `buttonHover()` function to enable the hover 'hit box' on a button. You can also optionally define a replacement hover icon for the default button.


## Coordinates and Colors

Use the **`Convert_Illustrator_To_Arrays.html`** page in this toolkit to convert vector icons from Adobe Illustrator into compatible arrays. The HTML page contains further instructions on how to do this.

Once converted, use these arrays to define your icons:

```jsx
var iconName = {
  "icon" : vecToPoints( PASTE_VECTOR_PATH_ARRAY_HERE ),
  "colors" : PASTE_COLOR_ARRAY_HERE;
}
```

**NOTE:** The video below was recorded before I updated the `icons.js` file to define each icon set in an object instead of a series of arrays. Make sure to follow the examples in that file instead of taking the video instructions verbatim. If you are already using BattleButtons, you will need to update your code. I'll try to re-record the video soon.

```jsx
iconName.icon // The default icon
iconName.colors // The default colors
iconName.[state].icon // The icon for a state (this could be "hover", "alt" or "altshift", for example)
iconName.[state].colors // The colors for the state. If not defined, the default colors will be used
iconName.colors.darkest,
iconName.colors.dark,
iconName.colors.light,
iconName.colors.legacy // Optional colors for specific After Effects UI appearances. Any not defined will use the default colors.
iconName.colors = appearanceColors(iconName); // If specifying any appearance colors as above, include this function as the last defined color, even if you've already defined iconName.colors.
```

https://github.com/user-attachments/assets/be36f6e1-707e-4e2e-9abb-4a9474822a42

## Testing UI Background Appearance

In the **`BattleButtonsTest.jsx`** file, you can use values of the `backgroundColor` object to change the background color to match that of the legacy (pre-2025) UI, or the 'Darkest'/'Dark'/'Light' color schemes of the new Spectrum UI.

```jsx
var backgroundColor = {
  "legacy" : "272727",
  "darkest" : "1D1D1D",
  "dark" : "323232",
  "light" : "F8F8F8"
};
setBackgroundColor(
  win, // group
  backgroundColor.darkest, // color
  1 // alpha
);
```

## Issues
~~When toggle buttons are clicked, the hover background does not remain visible - it only shows again when the mouse is moved. (When the button visibility changes, this is registered as a 'mouseout' on the button's group.)~~
Fixed.


## Credits
Based on [Adam Plouff's BattleStyle](https://github.com/adamplouff/scriptui-battlestyle).

Originally based on a super old post for drawing colored text buttons.
[[JS CS3/4] ScriptUI How to color a button ?][799ff023]

  [799ff023]: https://forums.adobe.com/thread/509131 "[JS CS3/4] ScriptUI How to color a button ?"


## License
Apache 2.0
