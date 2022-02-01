//////////
// STUB:
//////////
//
// The character is to be considered as a finite-state machine, with every state being linked to a specific animation.
//
// IDLE (frames 0 to 3)
// This will be the state of the character up until the start of the run.
//
// RUN (frames 4 to 6)
// Standard run animation → when running on solid surfaces.
//
// JUMP (frame 7)
// Upward jump → negative vertical velocity: the character is gaining height.
//
// FALL (frame 8)
// Downward fall → positive vertical velocity: the character is losing height.
//
// COLLISION (frame 9)
// The character has collided with an obstacle and the game is over.

//         ┌────────────┐
//         ↓            ↑
// IDLE → RUN → JUMP → FALL
//         └──────┬─────┘
//                ↓
//            COLLISION → GAME OVER