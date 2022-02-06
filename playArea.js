import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Sprite, useApp, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import CalculateScale from './utils/calculateScale';
import TerrainFactory from './utils/terrainFactory';
import Character from './utils/character';
import BackgroundFactory from './utils/backgroundFactory';

let charFrameAccumulator = 0, sliderFrame = 0;

// TEMP - "game over"
let stop = false;

function PlayArea(props) {

    const app = useApp();

    const sliderRef = useRef(null);

    const char = useMemo(() => new Character(), []);
    const terrainFactory = useMemo(() => new TerrainFactory(), []);
    const backgroundFactory = useMemo(() => new BackgroundFactory(), []);

    const [bgMap, setBgMap] = useState(backgroundFactory.GetInitialSetup());
    const [fieldMap, setFieldMap] = useState(terrainFactory.GetInitialSetup());
    const [character, setCharacter] = useState(char.GetValue());

    const slideLevel = useCallback((dt) => {
        sliderFrame += dt * 2;

        while (sliderFrame >= 16) {
            // If the first column is out of screen,
            // burn it and get the next column from the factory
            setFieldMap(prevValue => {
                let newVal = []
                prevValue.forEach((item, idx) => {
                    if (idx > 0) {
                        newVal.push(item);
                    }
                });

                newVal.push(terrainFactory.GetNext());
                return newVal;
            });

            sliderFrame -= 16;
        }

        // After all the calculations, update the position
        sliderRef.current.x = -sliderFrame;
    }, [terrainFactory]);

    const gameloop = useCallback((dt) => {
        if (stop) return;

        // Character animation
        charFrameAccumulator = (charFrameAccumulator + dt) % 60;

        // Compute gravity
        char.AddVerticalVelocity(0.5);
        if (char.CheckCollisions(fieldMap)) {
            stop = true;
        }

        char.UpdateFrame(charFrameAccumulator);

        setCharacter(char.GetValue());

        // Move background
        if (!stop) {
            if (sliderRef && sliderRef.current) {
                slideLevel(dt);
            }
        }
    }, [char, fieldMap, slideLevel]);

    useTick(dt => gameloop(dt));

    const resize = useCallback((containerRef) => {

        if (containerRef) {
            const fit = CalculateScale(app.view.parentNode.clientWidth, app.view.parentNode.clientHeight);

            app.renderer.resize(fit.width, fit.height);

            containerRef.scale = {
                x: fit.scale,
                y: fit.scale,
            }
        }
    },  [app.renderer, app.view.parentNode]); 

    const resizeRef = useCallback((containerRef) => {
        resize(containerRef);
    }, [resize]); 

    const handleUserKeyPress = useCallback((event) => {
        if (event.key === " ") {
            char.Jump();
        }
    }, [char]);

    const handleTap = useCallback(() => char.Jump(), [char]);

    useEffect(() => {
        window.addEventListener('resize', resize);
        window.addEventListener('keydown', handleUserKeyPress);
        window.addEventListener('pointerdown', handleTap);
  
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleUserKeyPress);
            window.removeEventListener('pointerdown', handleTap);
        }
    }, [resize, handleUserKeyPress, handleTap]);

    if (!props.loaded) {
        return(null);
    }

    return (
        <Container ref={resizeRef}>
            <Container id="bgSlider">
            {bgMap.map((col, i) =>
                col.map((tile, j) =>
                    <Sprite
                        key={i * col.length + j}
                        texture={PIXI.utils.TextureCache[`nature-paltformer-tileset-16x16${tile}.png`]}
                        x={16 * i}
                        y={16 * j}
                    />
                )
            )}
            </Container>
            <Container id="slider" ref={sliderRef}>
            {fieldMap.map((col, i) =>
                col.map((tile, j) =>
                        tile !== null ? 
                            <Sprite
                                key={i * col.length + j}
                                texture={PIXI.utils.TextureCache[`nature-paltformer-tileset-16x16${tile}.png`]}
                                x={16 * i}
                                y={16 * j}
                            />
                            : null
                )
            )}
            </Container>
            <Sprite
                key={'char'}
                texture={char.GetTexture()}
                {...character}
            />
        </Container>
    )
}

export default PlayArea;