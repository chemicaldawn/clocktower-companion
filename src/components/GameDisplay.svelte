<svelte:options runes={true}></svelte:options>

<script lang="ts">
    import { handleInput, InputEvent } from "../utils/smoothInput";
    import { floorMod } from "../utils/customMath";

    class Token {

        index : number
        name : string = $state("")
        css : string
        x : number
        y : number

        characterName : string
        characterImage : string
        alignment : string

        constructor(index : number) {
            this.index = index
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

    let tokens : Token[] = $state([]);
    let defaultPlayerCount = 12;

    for (let i = 0; i < defaultPlayerCount; i++) {
        tokens.push(new Token(i))
    }

    let normalWidth = 15;
    let expandedWidth = 20;

    let inputX = 0;
    let inputY = 0;
    let inputDX = $state(0);
    let inputDY = $state(0);  

    let dragging = false;

    let scootX = $derived(-inputDX / 12);
    let scootY = $derived(inputDY / 10);

    let tilt = $state(0);
    let selected = $derived(floorMod(tilt, tokens.length));
    let selectedToken = $derived(tokens[selected]);
    let expanded = $state(false)

    let translateY = $derived(expanded ? (-100 + scootY/2) : scootY)
    let scale = $derived(expanded ? (3 - scootY / 300) : (1 - scootY / 50))
    let rotate = $derived(-tilt * ((Math.PI * 2) / tokens.length) + scootX / 75)
 
    let editScale = $derived(expanded ? 1 : 0);
    let editOpacity = $state(1)

    let animationSpeed = $state(150)
    let animation = $derived(animationSpeed > 0 ? `transform ${animationSpeed}ms` : "")

    let touchDebounce = false;
    let touchSensitivity = 50;

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
    }

    function inputDown(e : InputEvent) {
        inputX = e.inputX
        inputY = e.inputY
        dragging = true
    }

    function inputMove(e : InputEvent) {
        if (dragging) {
            animationSpeed = 0
            inputDX = e.inputX - inputX
            inputDY = e.inputY - inputY
        }
    }

    function inputEnd(e : InputEvent) {
        animationSpeed = 150

        let direction = 0
        if (Math.abs(inputDX) < Math.abs(inputDY)) {
            direction = 1
        }

        if (direction == 0 && expanded) {
            if (inputDX < -1 * touchSensitivity) {
                tilt -= 1
            } else if (inputDX > touchSensitivity) {
                tilt += 1
            }
        } else {
            if (inputDY < -1 * touchSensitivity) {
                expanded = true
            } else if (inputDY > touchSensitivity) {
                tilt = 0
                expanded = false
            }
        }

        inputDX = 0
        inputDY = 0
        dragging = false
    }

    function interactToken(i : number) {
        animationSpeed = 150
        tilt = i
        expanded = true
    }

    function generalInput(e : KeyboardEvent) {
        if (e.key === "Escape") {
            if (expanded) {
                expanded = false
            }
        }
    }

    function nameInput(e : KeyboardEvent) {
        if (e.key === "Enter") {
            tilt += 1
        }
    }

    placeTokens()
</script>

<svelte:document 
    onmousedown={handleInput(inputDown)} onmousemove={handleInput(inputMove)} onmouseup={handleInput(inputEnd)}
    ontouchstart={handleInput(inputDown)} ontouchmove={handleInput(inputMove)} ontouchend={handleInput(inputEnd)}
    onkeydown={generalInput}/>

<div id="display-container">
    <div id="grim-container">
        <div id="grim" style:transition={animation} style:transform="translateY({translateY}cqh) scale({scale}) rotate({rotate}rad)">
            {#each tokens as token}
                <div role="button" tabindex="{token.index}" class="{token.css}" onmouseup={() => {interactToken(token.index)}} ontouchend={() => {interactToken(token.index)}} style:transform="translate({token.x}cqh,{token.y}cqh)">
                    <img draggable="false" alt="token" src="/images/token.png">
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
        padding-top: 8vh;
    }

    #edit {
        font-size: 3rem;
        color: white;
        transition: all 150ms;

        #edit-name {
            background: none;
            border: none;
            border-radius: 1rem;

            color: white;
            font-family: "Sorts Mill Goudy";
            font-size: 2.5rem;

            max-width: 80%;
            text-align: center;
            
        }

        #edit-name:focus {
            border: none;
        }
    }

    #grim-container {

        user-select: none;

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

                border-radius: 0;
                aspect-ratio: 1;

                background: none;
                margin: 0;

                img {
                    height: 100%;
                    width: 100%;
                }
            }

            .token:focus {
                border: none;
            }
        }
    }
    
</style>