import React, { useEffect, useRef } from 'react';
import * as PIXI from 'PIXI';
import * as TRAVISO from 'TRAVISO';
import '!file-loader?name=[name].[ext]!./img/img_app.png';
import '!file-loader?name=[name].[ext]!./img/img_switcher_ingress.png';
import '!file-loader?name=[name].[ext]!./img/img_fw.png';
import '!file-loader?name=[name].[ext]!./img/img_switcher_hub.png';
import '!file-loader?name=[name].[ext]!./img/img_switcher_victim.png';
import '!file-loader?name=[name].[ext]!./img/img_switcher_normal.png';
import '!file-loader?name=[name].[ext]!./img/img_host_normal.png';
import '!file-loader?name=[name].[ext]!./img/img_host_victim.png';
import '!file-loader?name=[name].[ext]!./img/img_switch.png';
import '!file-loader?name=[name].[ext]!./img/img_host_guard.png';
import '!file-loader?name=[name].[ext]!./img/img_switcher_fall.png';
import '!file-loader?name=[name].[ext]!./img/img_center.png';
import '!file-loader?name=[name].[ext]!./img/topu.png';
import '!file-loader?name=[name].[ext]!./img/img_cloud.png';
import '!file-loader?name=[name].[ext]!./mapData.json';

const Topology = () => {
    const canvas = useRef(null);
    useEffect(() => {
        if (canvas.current) {
            const pixiRoot = new PIXI.Application(700, 470, {
                backgroundColor: 0x000000,
                transparent: true,
            });
            canvas.current.appendChild(pixiRoot.view);
            const instanceConfig = {
                tileHeight: 28,
                mapDataPath: '/mapData.json',
                initialPositionFrame: { x: 335, y: 230 },
                assetsToLoad: [
                    '/img_app.png',
                    '/img_switcher_ingress.png',
                    '/img_switcher_hub.png',
                    '/img_switcher_victim.png',
                    '/img_switcher_normal.png',
                    '/img_host_normal.png',
                    '/img_host_victim.png',
                    '/img_host_guard.png',
                    '/img_switch.png',
                    '/img_fw.png',
                    '/img_center.png',
                    '/topu.png',
                    '/img_cloud.png',
                    '/img_switcher_fall.png',
                ],
            };
            const engine = TRAVISO.getEngineInstance(instanceConfig);
            pixiRoot.stage.addChild(engine);
        }
    }, [canvas]);
    return (
        <div
            ref={canvas}
            style={{
                margin: 0,
                padding: 0,
                position: 'absolute',
                cursor: 'pointer',
            }}
        />
    );
};
export default Topology;
