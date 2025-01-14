# BattleButtons
This is a pared-down re-purpose of [Adam Plouff's BattleStyle toolkit](https://github.com/adamplouff/scriptui-battlestyle) for creating straight-line vector, resolution independent icons buttons without the need for local files.

This builds on that project, in allowing for multi-color icons, as well as methods to swap out icons – for instance, when hovering over an icon or when holding down a modifier key. It also concerns itself only with icon buttons – the text buttons and icon/text buttons from the original have been omitted.

![BattleButtons - Demo 01 - 640](https://github.com/user-attachments/assets/e5ae4e45-afcd-4e6c-9375-eef05d9e12a8)

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

### Defining click functions

- Before specifying `.onClick` events, use the `groupClick()` function - this will trigger the `.onClick` event only on the top-most visible button in the button group.
- You can then define the click functions for each button state.

### Defining hover states

- Use the `buttonHover()` function to enable the hover 'hit box' on a button. You can also optionally define a replacement hover icon for the default button.

## Coordinates
Copy the raw coordinates from an SVG file into an array of text strings. You can also copy a vector illustration from Adobe Illustrator and paste directly into a text document – each set of co-ordinates in the <polygon> objects should be an item in the icon's array.

![coords](https://cloud.githubusercontent.com/assets/8580225/25320447/27efbc8c-2875-11e7-8719-184651ce4033.png)

```
var icon = vecToPoints([
  "21. 9.44 26.3 8.84 22.2 11.2 24.9 16.4 33.7 16.4 38.6 11.9 10.0 33.5 12. 30 11.2 32.0 8.82 36.3 8.84 47 13 36 21 21 21 13 13 20 4 38 2 47 13 44.1 12.6 37.1 4.10 21. 5.92 16.9 11.3"
  ])
```

## Issues
When toggle buttons are clicked, the hover background does not remain visible - it only shows again when the mouse is moved. (When the button visibility changes, this is registered as a 'mouseout' on the button's group.)

## Credits
Based on [Adam Plouff's BattleStyle](https://github.com/adamplouff/scriptui-battlestyle).

Originally based on a super old post for drawing colored text buttons.
[[JS CS3/4] ScriptUI How to color a button ?][799ff023]

  [799ff023]: https://forums.adobe.com/thread/509131 "[JS CS3/4] ScriptUI How to color a button ?"

## License
Apache 2.0
