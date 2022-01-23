import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Stage } from '@inlet/react-pixi';
import PlayArea from './playArea';

function EndlessRunner(props) {

    const mainRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        const loader = PIXI.Loader.shared;

        if (!PIXI.utils.TextureCache['img']) {
            loader
                .reset()
                .add('char', `${props.assetsFolder}/nature-paltformer-tileset-16x16.json`)
                .add('tiles', `${props.assetsFolder}/Standard sprites upd.json`)
                .load(() => {
                    setLoaded(true);
                });
        }
    }, [props])


    return (
        <div style={{position: "relative", margin: "auto", width: "100%", height: "100%", display: "flex", alignContent: "center", justifyContent: "center"}} ref={mainRef}>
                <Stage
                    style={{margin:"auto"}}
                    options={{
                        antialias: false,
                        backgroundAlpha: 1,
                        backgroundColor: 0x303030,
                    }}
                >
                    <PlayArea loaded={loaded}/>
                </Stage>
        </div>
    );
}

export default EndlessRunner;