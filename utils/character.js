import * as PIXI from 'pixi.js';

function Clamp(min, current, max) {
    if (current < min) return min;
    if (current > max) return max;
    return current;
}

//////////
// STUB:
//////////
//
// The character is to be considered as a finite-state machine, with every state being linked to a specific animation.
//
// IDL
// This will be the state of the character up until the start of the run.
//
// RUN
// Standard run animation → when running on solid surfaces.
//
// JUMP
// Upward jump → negative vertical velocity: the character is gaining height.
//
// FALL
// Downward fall → positive vertical velocity: the character is losing height.
//
// COLLISION
// The character has collided with an obstacle and the game is over.

// const CharState = {
//     Idle: [0, 1, 2, 3],
//     Walking: [4, 5, 6],
//     Jumping: [7],
//     Falling: [8],
//     Hit: [9],
// }

//         ┌────────────┐
//         ↓            ↑
// IDLE → RUN → JUMP → FALL
//         └──────┬─────┘
//                ↓
//            COLLISION → GAME OVER

class Character {
    constructor() {
        this.x = 3;
        this.y = 160; // TEMP
        this.frame = 0;
        this.vVel = 0;
    }

    GetTexture() {
        if (this.y === 160) {
            // RUN
            return PIXI.utils.TextureCache[`Standard sprites upd${4 + (this.frame % 3)}.png`];
        } else if (this.vVel < 0) {
            // JUMP
            return PIXI.utils.TextureCache[`Standard sprites upd${7}.png`];
        } else {
            // FALL
            return PIXI.utils.TextureCache[`Standard sprites upd${8}.png`];
        }
    }

    GetValue() {
        return {
            x: this.x,
            y: this.y,
            frame: this.frame,
            vVel: this.vVel,
        };
    };

    UpdateFrame(accumulator) {
        // Division by 5 in order to regulate the animation's speed
        this.frame = Math.floor(accumulator / 5);
    }

    // CHARACTER INPUTS
    Jump() {
        this.vVel -= 11;
    }

    Land() {
        this.vVel = 0;
    }

    // PHYSICS
    AddVerticalVelocity(value) {
        this.vVel = Clamp(-50, this.vVel + value, 5);
    }

    // TEMP: just checks a "static" ground value
    CheckCollisions() {
        this.y = ((this.y + this.vVel) > 160) ? 160 : this.y + this.vVel;
    }
}

export default Character;