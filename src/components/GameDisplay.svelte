<script lang="ts">
    class Token {

        index : number
        name : string
        css : string
        x : number
        y : number

        characterName : string
        characterImage : string
        alignment : string

        constructor(index : number) {
            this.index = index
            this.name = ""
            this.x = 0
            this.y = 0

            if (index == 0) {
                this.css = "token self"
            } else {
                this.css = "token"
            }
        }

        setCharacter(character) {
            
        }
    }

    let tokens : Token[] = [];
    let defaultPlayerCount = 12;

    for (let i = 0; i < defaultPlayerCount; i++) {
        tokens.push(new Token(i))
    }

    let normalWidth = 15;
    let expandedWidth = 20;

    export let translateY = 0;
    export let scale = 0;
    export let rotate = 0;
    export let animation = "";
    export let editScale = 0;
    export let editOpacity = 1;
    let animationSpeed = "150ms"

    let mouseX = 0;
    let mouseY = 0;

    let mouseDeltaX = 0;
    let mouseDeltaY = 0;
    let dragging = false;

    let touchDebounce = false;
    let touchX = 0;
    let touchY = 0;

    let touchDeltaX = 0;
    let touchDeltaY = 0;    
    let touchSensitivity = 50;

    let selected = 0;
    let selectedToken;

    let tilt = 0;
    let expanded = false;

    /**
     * @param {number} scootTheta
     * @param {number} scootY
     */
    function placeTokens() {

        let n = tokens.length

        let startTheta = (3/2) * Math.PI
        let deltaTheta = (Math.PI * 2) / n;
        let iTheta = 0;

        let tokenWidth = normalWidth

        let xOffset = (50 - tokenWidth / 2)
        let xAngularOffset = (50 - tokenWidth)
        let yOffset = (50 - tokenWidth / 2)
        let yAngularOffset = (50 - tokenWidth)

        tokens.forEach((token) => {
            let angle = startTheta + iTheta;
            
            token.x = xOffset - Math.cos(angle) * xAngularOffset
            token.y = yOffset - Math.sin(angle) * yAngularOffset

            iTheta += deltaTheta;
        })

        selectedToken = tokens[0]
    }

    function orientTokens(scootTheta, scootY) {

        let n = tokens.length

        translateY = scootY
        scale = 1 - scootY / 50
        rotate = 0

        if (expanded) {
            translateY = -100 + scootY/2 
            scale = 3 - scootY / 300 
            rotate = scootTheta + -tilt * (360 / n)
        }
    }

    function selectToken(n : number) {

        if (expanded && selected != n) {
            flashInfo()
        } else {
            selectedToken = tokens[n]
        }

        selected = n
        tilt = n

        let circleRatio = n / tokens.length

        if (circleRatio > 0.5) {
            tilt -= tokens.length
        }
    }

    function mouseDown(e : MouseEvent) {
        if (!touchDebounce) {
            mouseX = e.clientX
            mouseY = e.clientY

            dragging = true
            setTweening(false)
        }
    }

    function mouseMove(e : MouseEvent) {
        if (!touchDebounce && dragging) {
            mouseDeltaX += e.movementX
            mouseDeltaY += e.movementY

            console.log(mouseDeltaX, mouseDeltaY)

            orientTokens(-mouseDeltaX / 12, mouseDeltaY / 12)
        }
    }

    function mouseUp(e : MouseEvent) {
        if (!touchDebounce) {
            interactionEnd(mouseDeltaX, mouseDeltaY)
            dragging = false
        }
    }

    function clickToken(i) {
        if (!touchDebounce) {
            interactToken(i)
        }
    }

    function onTouchStart(e) {
        touchDebounce = true;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        setTweening(false)
    }

    function onTouchMove(e) {
        touchDeltaX = e.touches[0].clientX - touchX
        touchDeltaY = e.touches[0].clientY - touchY

        orientTokens(-touchDeltaX / 12, touchDeltaY / 12)
    }

    function onTouchEnd(e) {
        interactionEnd(touchDeltaX, touchDeltaY)
    }

    function tapToken(i) {
        interactToken(i)
    }

    function interactToken(i : number) {
        selectToken(i)
        setExpanded(true)
    }

    function interactionEnd(deltaX : number, deltaY: number) {
        setTweening(true)

        let direction = 0
        if (Math.abs(touchDeltaY) > Math.abs(touchDeltaX)) {
            direction = 1
        }

        if (direction == 0 && expanded) {
            if (deltaX < -1 * touchSensitivity) {
                rotateGrim(-1)
            } else if (deltaX > touchSensitivity) {
                rotateGrim(1)
            }
        } else {
            if (deltaY < -1 * touchSensitivity) {
                setExpanded(true)

            } else if (deltaY > touchSensitivity) {

                console.log("yuh")
                selectToken(0)
                setExpanded(false)
            }
        }

        mouseDeltaX = 0;
        mouseDeltaY = 0;
        touchDeltaX = 0;
        touchDeltaY = 0;
        orientTokens(0, 0)
    }

    function generalInput(e : KeyboardEvent) {
        if (e.key === "Escape") {
            if (expanded) {
                setExpanded(false)
                orientTokens(0,0)
            }
        }
    }

    function nameInput(e : KeyboardEvent) {
        if (e.key === "Enter") {
            rotateGrim(-1)
            orientTokens(0,0)
        }
    }

    function rotateGrim(n : number) {
        tilt += n
        selected = floorMod(selected + n, tokens.length)
        flashInfo()
    }

    function setExpanded(val : boolean) {
        if (val) {
            expanded = true
            editScale = 1
        } else {
            expanded = false
            editScale = 0
        }
    }

    function setTweening(val : boolean) {
        if (val) {
            animation = "transform " + animationSpeed
        } else {
            animation = ""
        }
    }

    function flashInfo() {
        editOpacity = 0
        setTimeout(() => {
            selectedToken = tokens[selected]
            editOpacity = 1
        }, 150)
    }

    function floorMod(n : number, divisor : number) {
        while (n < 0) {
            n += divisor
        }

        return n % divisor
    }

    placeTokens()
    orientTokens(0, 0)
</script>

<svelte:document 
    onmousedown={mouseDown} onmousemove={mouseMove} onmouseup={mouseUp}
    ontouchstart={onTouchStart} ontouchmove={onTouchMove} ontouchend={onTouchEnd} 
    onkeydown={generalInput}/>

<div id="display-container">
    <div id="grim-container">
        <div id="grim" style:transition={animation} style:transform="translateY({translateY}cqh) scale({scale}) rotate({rotate}deg)">
            {#each tokens as token}
                <div role="button" tabindex="{token.index}" class="{token.css}" onmouseup={() => {clickToken(token.index)}} ontouchend={() => {tapToken(token.index)}} style:transform="translate({token.x}cqh,{token.y}cqh)">
                    <p class="character-name">{token.characterName}</p>
                </div>
            {/each}
        </div>
    </div>
    <div id="edit" style:opacity="{editOpacity}" style:transform="scaleY({editScale})">
        <input placeholder="enter name..." onkeydown={nameInput} bind:value={selectedToken.name} type="text" id="edit-name" name="token-name">
    </div>
</div>


<style>
    #display-container {
        width: 100%;

        margin: 0 !important;
        padding-top: 15vh;
    }

    #edit {
        font-family: "Dumbledor";
        font-size: 3rem;
        color: white;
        transition: all 150ms;

        #edit-name {
            background: none;
            border: none;
            border-radius: 1rem;

            color: white;
            font-family: "Dumbledor";
            font-size: 2.5rem;

            max-width: 80%;
            text-align: center;
            
        }

        #edit-name:focus {
            border: none;
        }
    }

    #grim-container {

        margin: 0 !important;
        width: 100%;
        height: auto;

        aspect-ratio: 1;

        container-type: size;

        #grim {
            position: absolute;
            margin: 0;

            height: 100cqh;
            width: 100cqw;

            .token {
                position: absolute;

                width: 15cqh;
                height: 15cqh;

                aspect-ratio: 1;
                border-radius: 100%;

                background-color: rgb(213, 195, 158);
                margin: 0;

                box-shadow: inset 0 0 2cqh rgb(125, 75, 22);
                transition: box-shadow 150ms;


                .character-name {
                    font-family: "Dumbledor";
                }
            }

            .token:hover {
                box-shadow: inset 0 0 4px rgb(255, 255, 255)
            }

            .token.self {
                background-color: rgb(247, 232, 202);
            }
        }
    }
    
</style>