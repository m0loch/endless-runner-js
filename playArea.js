import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Sprite, useApp, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import CalculateScale from './utils/calculateScale';
import TerrainFactory from './utils/terrainFactory';

let charFrameDeltaT = 0, sliderFrame = 0;

function PlayArea(props) {

    const getCharTexture = (vVel) => {
        if (vVel === 0) {
            return PIXI.utils.TextureCache[`Standard sprites upd${charRunFRame}.png`];
        } else if (vVel < 0) {
            return PIXI.utils.TextureCache[`Standard sprites upd${7}.png`];
        } else {
            return PIXI.utils.TextureCache[`Standard sprites upd${8}.png`];
        }
    }

    const app = useApp();

    const sliderRef = useRef(null);

    const [charRunFRame, setCharRunFrame] = useState(4);
    const [fieldMap, setFieldMap] = useState(Array(17).fill(TerrainFactory.GetBase()));
    const [character, setCharacter] = useState({
        x: 3,
        y: 16*10,
        vVel: 0,
    });

    const gameloop = useCallback((dt) => {
        // Character animation
        charFrameDeltaT += dt;
        setCharRunFrame(4 + (Math.floor(charFrameDeltaT / 5) % 3));

        // Move background
        if (sliderRef && sliderRef.current) {
            sliderFrame += dt;

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

                    newVal.push(TerrainFactory.GetNext());
                    return newVal;
                });

                sliderFrame -= 16;
            }

            // After all the calculations, update the position
            sliderRef.current.x = -sliderFrame;
        }
    }, []);

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
            if (character.vVel === 0) {
                setCharacter({
                    x: character.x,
                    y: character.y,
                    vVel: character.vVel - 10,
                });
            } else {
                setCharacter({
                    x: character.x,
                    y: character.y,
                    vVel: 0,
                });
            }
        }
    }, [character]);

    useEffect(() => {
        window.addEventListener('resize', resize);
        window.addEventListener('keydown', handleUserKeyPress);
  
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleUserKeyPress);
        }
    }, [resize, handleUserKeyPress]);

    if (!props.loaded) {
        return(null);
    }

    return (
        <Container ref={resizeRef}>
            <Container id="slider" ref={sliderRef}>
            {fieldMap.map((col, i) =>
                col.map((tile, j) =>
                        tile ? 
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
                texture={getCharTexture(character.vVel)}
                {...character}
            />
        </Container>
    )
}

export default PlayArea;