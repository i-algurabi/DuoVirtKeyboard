<img align="right" src="https://i-algurabi.github.io/DuoVirtKeyboard/css/logo.png" />

[**DuoVirtKeyboard**](https://i-algurabi.github.io/DuoVirtKeyboard/DuoVirtKeyboard.user.js) is an extension that allows you to use a virtual onscreen keyboard with customizable layouts. Adding
 automatic keyboard layout switching to both virtual and physical keyboards

Current version: **0.0.41**

# Table of Content

- [**Description**](#description)
- [**Installation**](#installation)
- [**Functionality**](#what-do-you-get)
  - [**Keyboard**](#keyboard)
  - [**Sidepanel**](#sidepanel)
- [**Acknowledgements**](#acknowledgements)

# Description

**DuoVirtKeyboard** is an addon\extension developed to make it easier to use different keyboards layouts.
The default list of currently supported languages and respected layouts is as follows:
* English
* Russian
* Arabic
* Swedish (Finland)
* *French* is maped to English QUERTY layout without accented letters

The script is tested to work under Chrome 58.0.3029.110 and FF53.0.2


# Installation

To use this userscript first you need to install a [TamperMonkey](https://tampermonkey.net/) addon for you browser.
After instaling it, go to TamperMonkey Dashboard, paste URL

    https://rawgit.com/i-algurabi/DuoVirtKeyboard/develop/DuoVirtKeyboard.user.js

and click Import, to import this userscript.

# What do you get

## Keyboard

The virtual keyboard added by this addon is visible only when the text input field is shown and has focus. By default it
 shows the active course languages on the upper part. The left language tag shows the language you are learning from, 
 the right tag shows the language you are learning.
The corresponding key characters for each *supported* language are shown on respected keys of the virtual keyboard.
When you enter the text, it will be automaticly replaced with characters of the language shown on the left tag.

You can switch the right tag to match your native language (if avilable). 
**Switching the left tag affects the autoreplacement functionality**

## Sidepanel

With this userscript\addon installed, each time you visit duolingo.com you'll have a sidepanel with a list of all your 
courses. Each course section may include two fields. One contains the skills you need to strengthen, and the other the 
new skills you can learn.
However, only one section with the current course will be active at a time. Clicking on other courses will turn active 
the course you clicked on.

# Acknowledgements

**DuoVirtKeyboard** started in summer 2016 with code refactoring of 
[Dinar aka Lifeshade's](https://github.com/Lifeshade/duolingo) userscript.

OnScreen keyboard design inspired by [Attila's Hajzer](https://codepen.io/attilahajzer) codepen [HTML and CSS keyboard](https://codepen.io/attilahajzer/pen/kydqJ)
