<script lang="ts">
    import { State, themeColors, tiers } from "./SuikaController.svelte";
    import GameOverMenu from "./GameOverMenu.svelte";
    import Matter from "matter-js";
    import { onMount } from "svelte";

    const particle1 = "/suika/particles/particle1.png",
        particle2 = "/suika/particles/particle2.png";

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Events = Matter.Events,
        World = Matter.World;

    interface stageParams {
        updateLeaderboard: () => void;
        updateScore: (pts: number) => void;
    }

    const CAT_LEGIBLE = "#00FF00";
    const CAT_ILLEGIBLE = "#FF0000";

    const PARTICLES = 0x001;
    const OBJ = 0x002;
    const ENV = 0x004;

    const debug = false;
    var gameMode: State = $state(State.playing);

    let { updateLeaderboard, updateScore }: stageParams = $props();

    const circleFactor = 0.2;
    const originalWidth = 600;
    const originalHeight = 1000;

    let winWidth = $state(0);
    let gameScale = $derived(winWidth > 450 ? 1 : winWidth > 375 ? 0.8 : 0.7);

 
    let stageWidth = $derived(originalWidth * gameScale);
    let stageHeight = $derived(originalHeight * gameScale);
    let maxCircleSize = $derived(circleFactor * stageWidth) ;

    const spawnY = 110;
    let spawnX = $derived(stageWidth / 2)
    let fieldSize = $derived((stageWidth * 3) / 4);
    let rBound = $derived(stageWidth - Math.floor((stageWidth - fieldSize) / 2));
    let lBound = $derived(Math.floor((stageWidth - fieldSize) / 2));

    let mousePosX = $derived(spawnX);
    let cooldownLock = false;

    let canvas: HTMLElement;
    let nextInLine: Matter.Body;

    let points = $state(0);

    let engine = Engine.create();

    let render: Matter.Render | undefined = undefined;

    onMount(() => {
        render = Render.create({
            element: canvas,
            engine: engine,
            options: {
                width: stageWidth,
                height: stageHeight,
                wireframes: false,
                background: "#00000000",
            },
        });
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        setGameMode(State.playing);

        // run the renderer
        Render.run(render);
    });

    $effect(() => {
        render!.options.width = stageWidth;
        render!.options.height = stageHeight;
    });

    const startFreshGame = () => {
        points = 0;
        updateScore(0);
        //game boundaries
        const groundThickness = stageHeight * 0.1;
        var ground = Bodies.rectangle(
            Math.floor(stageWidth / 2),
            Math.floor(stageHeight - groundThickness),
            Math.floor(stageWidth + 100),
            Math.floor(groundThickness / 2),
            {
                isStatic: true,
                render: {
                    fillStyle: "invisible",
                },
                collisionFilter: {
                    category: ENV,
                },
            },
        );
        var sensor = Bodies.rectangle(
            Math.floor(stageWidth / 2),
            0.2 * stageHeight,
            Math.floor(stageWidth + 100),
            40,
            {
                label: "gameover",
                isStatic: true,
                isSensor: true,
                render: {
                    opacity: 0,
                },
                collisionFilter: {
                    category: ENV,
                },
            },
        );
        var rWall = Bodies.rectangle(rBound + 25, Math.floor(stageHeight / 2), 50, stageHeight, {
            isStatic: true,
            render: {
                opacity: 0,
                fillStyle: "#000000",
            },
            collisionFilter: {
                category: ENV,
            },
        });
        var lWall = Bodies.rectangle(lBound - 25, Math.floor(stageHeight / 2), 50, stageHeight, {
            isStatic: true,
            render: {
                opacity: 0,
                fillStyle: "#000000",
            },
            collisionFilter: {
                category: ENV,
            },
        });

        let visualStageWidth = stageWidth - lBound * 2;
        var boundary = Bodies.rectangle(
            Math.floor(stageWidth / 2),
            0.23 * stageHeight,
            visualStageWidth,
            2,
            {
                label: "warning",
                isStatic: true,
                isSensor: true,
                render: {
                    fillStyle: themeColors.theme,
                },
                collisionFilter: {
                    category: ENV,
                },
            },
        );

        var bounds = Bodies.rectangle(
            stageWidth / 2,
            stageHeight / 2 + 40,
            visualStageWidth,
            stageHeight * 0.67,
            {
                label: "warning",
                isStatic: true,
                isSensor: true,
                render: {
                    fillStyle: "transparent",
                    strokeStyle: themeColors.theme,
                    lineWidth: 2,
                },
                collisionFilter: {
                    category: ENV,
                },
            },
        );

        // add all of the bodies to the world
        Composite.add(engine.world, [ground, lWall, rWall, sensor, boundary, bounds]);
        prepareNextTarget();
    };

    function addPoints(amt: number) {
        points += amt;
        updateScore(points);
    }

    Events.on(engine, "collisionStart", (event) => {
        if (gameMode !== State.playing) {
            return;
        }
        event.pairs.forEach(({ bodyA, bodyB }) => {
            if (bodyA.label === "particle") {
                return;
            }
            if (
                (bodyA.label === "gameover" || bodyB.label === "gameover") &&
                (bodyA.render.fillStyle == CAT_LEGIBLE || bodyB.render.fillStyle == CAT_LEGIBLE)
            ) {
                endGame(bodyA.label === "gameover" ? bodyB : bodyA);
            }
            if (bodyA.label !== bodyB.label || debug) {
                if (bodyA.render.fillStyle == CAT_ILLEGIBLE) {
                    bodyA.render.fillStyle = CAT_LEGIBLE;
                }
                if (bodyB.render.fillStyle == CAT_ILLEGIBLE) {
                    bodyB.render.fillStyle = CAT_LEGIBLE;
                }
                return;
            }
            let x = bodyA.position.x,
                y = bodyA.position.y,
                idx = parseInt(bodyA.label);
            addPoints(tiers[idx].points);
            idx++;
            World.remove(engine.world, [bodyA, bodyB]);
            if (idx < tiers.length) {
                spawnCircle(x, y, idx, false, true);
            }
            particleExplosion(x, y, 1, false);
        });
    });

    const endGame = (loser: Matter.Body) => {
        gameMode = State.losing;
        const flash = setInterval(() => {
            loser.render.opacity = 1 - (loser.render.opacity ?? 1);
        }, 100);
        loser.isStatic = true;
        loser.isSensor = true;

        const cashInObj = (obj: Matter.Body) => {
            World.remove(engine.world, obj);
            let idx = parseInt(obj.label);
            particleExplosion(obj.position.x, obj.position.y, idx, false);
            addPoints(tiers[idx].points);
        };
        const cashIn = (objs: Array<Matter.Body>, finisher: Function) => {
            let obj = objs.pop();
            if (!obj) {
                return;
            }
            cashInObj(obj);
            if (objs.length > 0) {
                setTimeout(() => {
                    cashIn(objs, finisher);
                }, 200);
            } else {
                finisher();
            }
        };
        let collectable: Array<Matter.Body> = [];
        Composite.allBodies(engine.world).forEach((body) => {
            if (
                body.id == loser.id ||
                body.collisionFilter.category == ENV ||
                body.label == "particle" ||
                body.render.fillStyle == CAT_ILLEGIBLE
            ) {
                return;
            }
            collectable.push(body);
        });

        const finisher = () => {
            clearInterval(flash);
            cashInObj(loser);
            setTimeout(() => {
                setGameMode(State.endScreen);
            }, 1500);
        };

        setTimeout(() => {
            cashIn(collectable, finisher);
        }, 1000);
    };

    function getSafeX(idx: number) {
        let x = mousePosX;
        let evo = tiers[idx];

        let size = evo.size * maxCircleSize;
        let sizeConsideration = 10 * gameScale + size;

        const lMargin = lBound + sizeConsideration;
        const rMargin = rBound - sizeConsideration;
        if (x < lMargin) {
            x = lMargin;
        } else if (x > rMargin) {
            x = rMargin;
        }
        return x;
    }

    function moveWithMouse(e: MouseEvent) {
        mousePosX = e.layerX;
        if (cooldownLock || gameMode !== State.playing) {
            return;
        }
        let x = getSafeX(parseInt(nextInLine.label));

        Body.setPosition(nextInLine, { x: x, y: spawnY });
    }

    function dropTarget(e: MouseEvent) {
        if (cooldownLock || gameMode !== State.playing) {
            return;
        }
        let posX = nextInLine.position.x;
        let id = parseInt(nextInLine.label);
        cooldownLock = true;
        World.remove(engine.world, [nextInLine]);

        spawnCircle(posX, spawnY, id);
        setTimeout(() => {
            prepareNextTarget();
            cooldownLock = false;
        }, 500);
    }

    function prepareNextTarget() {
        const idx = Math.floor(Math.random() * 5);
        let x = spawnX;
        x = getSafeX(idx);

        nextInLine = spawnCircle(x, spawnY, idx, true);
    }

    function spawnCircle(
        x: number,
        y: number,
        idx: number,
        staticState: boolean = false,
        legible = false,
    ) {
        let c = Math.floor(100 * (1 - idx / tiers.length) + 155);

        let evo = tiers[idx];
        var ball = Bodies.circle(x, y, evo.size * maxCircleSize, {
            label: idx + "",
            render: {
                // fillStyle: "#FF" + returnHex2(c) + "FF",
                fillStyle: legible == true ? CAT_LEGIBLE : CAT_ILLEGIBLE,
                sprite: {
                    texture: evo.icon,
                    xScale: evo.size * 2 * (maxCircleSize / evo.originalSize),
                    yScale: evo.size * 2 * (maxCircleSize / evo.originalSize),
                },
            },
            isStatic: staticState,
            isSensor: staticState,
            collisionFilter: {
                category: OBJ,
                mask: OBJ | ENV,
            },
        });

        Composite.add(engine.world, ball);

        return ball;
    }

    const particleExplosion = (x: number, y: number, num: number, collision: boolean = false) => {
        let parts = [];
        for (var i = 0; i < num * 3 + 20; i++) {
            parts.push(spawnParticle(x, y, collision));
        }

        Composite.add(engine.world, parts);
    };

    const spawnParticle = (x: number, y: number, collision: boolean) => {
        const texture = Math.random() > 0.5 ? particle1 : particle2;

        var particle = Bodies.circle(x, y, 5, {
            label: "particle",
            mass: 0.0001,
            friction: 0.01,
            density: 0.001,
            isSensor: !collision,
            render: {
                // fillStyle: c
                sprite: {
                    texture: texture,
                    xScale: 0.15,
                    yScale: 0.15,
                },
            },
            collisionFilter: {
                category: PARTICLES,
                mask: PARTICLES | ENV,
            },
        });

        const angle = Math.random() * Math.PI + Math.PI;
        const spd = Math.random() * 10 + 2;
        Body.setVelocity(particle, {
            x: (Math.cos(angle) * spd) / 2,
            y: Math.sin(angle) * spd,
        });

        const removalTimer = (p: Matter.Body) => {
            setTimeout(
                () => {
                    World.remove(engine.world, p);
                },
                !collision ? 5000 : 10000 + 10000 * Math.random(),
            );
        };

        removalTimer(particle);

        return particle;
    };

    function setGameMode(mode: State) {
        gameMode = mode;

        switch (mode) {
            case State.playing:
                World.clear(engine.world, false);
                updateLeaderboard();
                startFreshGame();
                break;
            case State.losing:
                break;
            case State.endScreen:
                closePopup();
                break;
        }
    }

    function playAgain() {
        setGameMode(State.playing);
    }

    const popupOptions = {
        none: 0,
        leaderboard: 1,
        evo: 2,
    };

    let popUpMode = $state(popupOptions.none);

    function closePopup() {
        popUpMode = popupOptions.none;
        popupComponent.setPopupMode(popUpMode);
    }

    let popupComponent: GameOverMenu;

</script>

<svelte:window bind:innerWidth={winWidth} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div id="game">
    {#if winWidth <= 950}
        <p id="scorePts">{points}</p>
    {/if}
    <div id="suika" bind:this={canvas} onclick={dropTarget} onmousemove={moveWithMouse}></div>
    {#if winWidth <= 950}
        <div id="mobileBtns">
            <button
                onclick={() => {
                    if (gameMode != State.endScreen) {
                        popUpMode = popupOptions.leaderboard;
                        popupComponent.setPopupMode(popUpMode);
                    }
                }}
            >
                <img src="./suika/trophy.svg" />
            </button>
            <button
                onclick={() => {
                    if (gameMode != State.endScreen) {
                        popUpMode = popupOptions.evo;
                        popupComponent.setPopupMode(popUpMode);
                    }
                }}
            >
                <img src="./suika/i symbol.svg" />
            </button>
        </div>
    {/if}
    <div
        id="gameOverContainer"
        class:hide={gameMode != State.endScreen && popUpMode == popupOptions.none}
    >
        <GameOverMenu
            resetGame={playAgain}
            {points}
            closeWindow={closePopup}
            bind:this={popupComponent}
        />
    </div>
</div>

<style>
    #game {
        --grey: var(--surge-grey);
        transition: opacity 1s;

        width: 100dvw;
        max-width: 600px;
        height: 1000px;
        overflow: clip;
        overflow-x: clip;

        height: 1000px;
        z-index: 2;
    }

    #gameOverContainer {
        width: 100%;
        height: 100%;
        position: relative;
        top: -1000px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hide {
        visibility: collapse !important;
    }

    #scorePts {
        font-weight: 600;
        font-size: 1.5rem;
        color: white;
        width: 89%;
        margin-left: auto;
        padding-left: 0px;
    }

    #mobileBtns {
        width: 100%;
        margin-top: -30px;
        padding-left: 50px;
        display: flex;
        justify-content: space-between;
    }

    @media only screen and (max-width: 1200px) {
        #mobileBtns {
            margin-top: -100px;
            width: 80%;
            margin-left: 5%;
        }
    }

    @media only screen and (max-width: 500px) {
        #game {
            width: 100dvw;
            margin-left: -10%;
        }

        #scorePts {
            padding-left: 5%;
        }

        #gameOverContainer {
            margin-left: 9%;
            top: -850px;
            width: 95%;
        }

        #mobileBtns {
            margin-top: -30px;
            width: 95%;
            margin-left: 2%;
        }
    }

    @media only screen and (max-width: 400px) {
        #gameOverContainer {
            width: 90%;
        }
    }

    @media only screen and (max-width: 350px) {
        #game {
            width: 120dvw;
            margin-left: -10%;
        }

        #mobileBtns {
            width: 95%;
        }
    }
</style>
