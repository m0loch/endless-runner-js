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
// IDLE
// This will be the state of the character up until the start of the run.
//
// RUNNING
// Standard run animation → when running on solid surfaces.
//
// JUMPING
// Upward jump → negative vertical velocity: the character is gaining height.
//
// FALLING
// Downward fall → positive vertical velocity: the character is losing height.
//
// HIT
// The character has collided with an obstacle and the game is over.

const CharState = {
    Idle: [0, 1, 2, 3],
    Running: [4, 5, 6],
    Jumping: [7],
    Falling: [8],
    Hit: [9],
}

//         ┌────────────┐
//         ↓            ↑
// IDLE → RUN → JUMP → FALL
//         └──────┬─────┘
//                ↓
//            COLLISION → GAME OVER

class Character {
    constructor() {
        this.x = 16;
        this.y = 160;
        this.frame = 0;
        this.vVel = 0;
        this.state = CharState.Idle;
        this.hit = false;
    }

    GetTexture() {
        return PIXI.utils.TextureCache[`Standard sprites upd${this.state[this.frame % this.state.length]}.png`];
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
        if (this.state === CharState.Running) {
            this.vVel -= 8;
        }
    }

    Land() {
        if (this.vVel > 0) {
            this.vVel = 0.0;
        }
    }

    // PHYSICS
    AddVerticalVelocity(value) {
        this.vVel = Clamp(-50, this.vVel + value, 5);
    }

    CheckCollisions(objectsMap) {
        if (objectsMap.length === 0) {
            return;
        }

        this.y = this.y + this.vVel;

        const baseX = Math.floor(this.x / 16);
        const baseY = Math.floor(this.y / 16);

        // Pitfall
        if (baseY >= 11) {
            this.hit = true;
        }

        // Vertical check
        if ((objectsMap[baseX][baseY+1] != null) || (objectsMap[baseX+1][baseY+1] != null)) {
            this.y = baseY * 16;
            this.Land();
        }

        // Obstacles collision
        if (objectsMap[baseX+1][baseY] != null) {
            this.hit = true;
        }

        // Check state
        if (this.hit) {
            this.state = CharState.Hit;
        } else if (this.vVel === 0.0) {
            this.state = CharState.Running;
        } else if (this.vVel < 0) {
            this.state = CharState.Jumping;
        } else {
            this.state = CharState.Falling;
        }

        return this.hit;
    }
}

export default Character;