import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Sprite, useApp, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import CalculateScale from './utils/calculateScale';

const fieldMap = [];

let charFrameDeltaT = 0;

function PlayArea(props) {

    const app = useApp();

    const sliderRef = useRef(null);

    const [charRunFRame, setCharRunFrame] = useState(4);

    useTick(dt => {
        // Character animation
        charFrameDeltaT += dt;
        setCharRunFrame(4 + (Math.floor(charFrameDeltaT / 5) % 3));

        // Move background
        if (sliderRef && sliderRef.current) {
            sliderRef.current.x = -(Math.floor(charFrameDeltaT) % 16);
        }
    });

    const resize = useCallback((containerRef) => {

        const fit = CalculateScale(app.view.parentNode.clientWidth, app.view.parentNode.clientHeight);

        app.renderer.resize(fit.width, fit.height);

        containerRef.scale = {
            x: fit.scale,
            y: fit.scale,
        }

    },  [app.renderer, app.view.parentNode]); 

    const resizeRef = useCallback((containerRef) => {

        resize(containerRef);

        window.addEventListener('resize', () => resize(containerRef));

        return () => window.removeEventListener('resize');
        
    }, [resize]); 

    useEffect(() => {

        window.addEventListener('resize', resize);

        // TEMP: init field
        for (let i = 0; i < 17; i++) {
            fieldMap.push([null,null,null,null,null,null,null,null,null,null,null,1]);
        }

        return () => window.removeEventListener('resize', resize);

    }, [resize]);

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
                texture={PIXI.utils.TextureCache[`Standard sprites upd${charRunFRame}.png`]}
                x={3}
                y={16*10}
            />
        </Container>
    )
}

export default PlayArea;