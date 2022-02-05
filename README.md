# endless-runner-js
A javascript-based endless runner meant to be imported as a React submodule

_by Romeo Graifenberg_

## Description
React component embedding a simple endless runner.

## How to use
Import it as a submodule on git / import the code in the project.
Use it as a component.

## Required libraries
PIXI.js
@inlet/react-pixi

## Work that still needs to be done
1. polish
    + refine random generation of upcoming terrain
    + the game should start with the character being idle until the user "jumps"
    + game over animation
    + game over screen that should let the player restart
2. controls and balancing
    + tap for start/jump on mobile
    + game over for falling out of bounds
    + the check for land is too forgiving
    + is the jump high enough?
    + is the speed correct?
    + do the tiles need to be bigger?
3. score
    + coins?
    + distance count
4. think of extra mechanics
    + double jump? tap vs hold for higher jump?

## Issues
The assets are saved inside the */assets* folder, but React.js needs them to be in the public folder.
In order to achieve that one should edit webpack's config, but that needs more study with Create-React-App.

## Credits for the assets
Map tiles taken from https://rottingpixels.itch.io/nature-platformer-tileset
Credits to https://twitter.com/PixelsRotting

Character taken from https://opengameart.org/content/classic-hero-and-baddies-pack
Credits to https://opengameart.org/users/grafxkid        