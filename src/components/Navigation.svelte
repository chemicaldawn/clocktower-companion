<script lang="ts">
    import { transform } from "typescript";


    let expanded = false;
    let opacity = 0;
    let dist = 5;

    let d : Date = new Date()

    let hourHandPos = 0;
    let minuteHandPos = 0;

    let hourHandDefault = 0;
    let minuteHandDefault = 0;

    function getClockPositions() {
        console.log(d.getHours(), d.getMinutes())

        hourHandDefault = d.getHours() * 30 + d.getMinutes() * 0.5
        minuteHandDefault = d.getMinutes() * 6

        hourHandPos = hourHandDefault;
        minuteHandPos = minuteHandDefault;
    }

    getClockPositions()
    
    class NavItem {
        index : number
        image : string
        position : string

        constructor(idx : number) {
            this.index = idx
            this.image = ""
            this.resetPosition()
        }

        togglePosition() {
            if (expanded) { 
                this.setPosition()
            } else {
                this.resetPosition()
            }
        }

        resetPosition() {
            this.position = "translate(0,0)"
        }

        setPosition() {
            let angle = ((this.index + 1) / (nav_items.length + 1)) * Math.PI
            this.position = `translate(${Math.cos(angle) * dist}rem, ${-Math.sin(angle) * dist}rem)`
            console.log(this.position)
        }
    }

    function toggleExpansion(e) {
        console.log("dig")
        expanded = !expanded

        if (expanded) {
            opacity = 1
            hourHandPos = 360
            minuteHandPos = 720
        } else {
            opacity = 0
            getClockPositions()
        }

        let delay = 0;
        nav_items.forEach((item) => {
            item.togglePosition()
        })
    }

    let nav_items = [
        new NavItem(0),
        new NavItem(1),
        new NavItem(2)
    ]
</script>

<main>
    <div class="side-button">

    </div>
    <div id="navigation" role="button" tabindex="0" onkeydown={toggleExpansion} ontouchstart={toggleExpansion}>
        <img src="/images/clock.svg" alt="clock">
        <img src="/images/minutehand.svg" style:transform="rotate({minuteHandPos}deg) scale(1)" alt="clock">
        <img src="/images/hourhand.svg" style:transform="rotate({hourHandPos}deg)" alt="clock">
        {#each nav_items as item}
            <div class="nav-item" role="button" style:transform={item.position} style:opacity="{opacity}"></div>
        {/each}
    </div>
    <div class="side-button">

    </div>
</main>

<style>

    main {
        display: flex;
        gap: 2.5rem;
    }

    .side-button {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;

        margin: auto;

        background-color: aqua;
    }

    #navigation {
        pointer-events: all;

        width: 4.5rem;
        height: 4.5rem;
        border-radius: 100%;
        margin-top: auto;

        z-index: 2;
        background-color: rgb(117, 53, 145);

        container-type: size;

        display: flex;
        flex-direction: column;
        gap: 0;

        img {
            position: absolute;
            width: 100cqw;

            transition: transform 500ms ease-in-out;
        }

        .nav-item {
            position: absolute;
            pointer-events: all;

            z-index: 1;
            background-color: rgb(68, 18, 94);
            border-radius: 50%;

            width: 3.25rem;
            height: 3.25rem;

            transition: transform 150ms, opacity 180ms;
            transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);

        }
    }
</style>