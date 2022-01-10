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
1. implement run animation
2. implement jump animation
3. controls
    + double jump? tap vs hold for higher jump?
4. score
    + coins?
    + distance count
5. think of extra mechanics

## Issues
The assets are saved inside the */assets* folder, but React.js needs them to be in the public folder.
In order to achieve that one should edit webpack's config, but that needs more study with Create-React-App.

## Credits for the assets
Map tiles taken from https://rottingpixels.itch.io/nature-platformer-tileset
Credits to https://twitter.com/PixelsRotting

Character taken from https://opengameart.org/content/classic-hero-and-baddies-pack
Credits to https://opengameart.org/users/grafxkid        