import React, { useCallback, useEffect } from 'react';
import { Container, Sprite, useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import CalculateScale from './utils/calculateScale';

const tempArea = [
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

function PlayArea(props) {

    const app = useApp();

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

        return () => window.removeEventListener('resize', resize);

    }, [resize]);

    if (!props.loaded) {
        return(null);
    }

    return (
        <Container ref={resizeRef}>
            {tempArea.map((row, i) =>
                row.map((tile, j) =>
                        tile ? 
                            <Sprite
                                key={i * row.length + j}
                                texture={PIXI.utils.TextureCache[`nature-paltformer-tileset-16x16${tile}.png`]}
                                x={16 * j}
                                y={16 * i}
                            />
                            : null
                )
            )}
        </Container>
    )
}

export default PlayArea;