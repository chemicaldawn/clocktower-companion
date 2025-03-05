<script lang="ts">
    import { transform } from "typescript";

    let expanded = false;
    let opacity = 0;
    let dist = 5.25;
    let offset = 0.625;

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
        imagealt : string
        position : string

        constructor(idx : number, image : string, imagealt: string) {
            this.index = idx
            this.image = image
            this.imagealt = imagealt
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
            this.position = `translate(${Math.cos(angle) * dist + offset}rem, ${-Math.sin(angle) * dist + offset}rem)`
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
        new NavItem(2, "setup.svg", "game setup"),
        new NavItem(1, "notes.svg", "game notes"),
        new NavItem(0, "settings.svg", "app settings")
    ]
</script>

<main>
    <div class="side-button">
        <img alt="show roles" src="/images/icons/eye.svg">
    </div>
    <div id="navigation" role="button" tabindex="0" onkeydown={toggleExpansion} ontouchstart={toggleExpansion}>
        <img src="/images/clock.svg" alt="clock">
        <img src="/images/minutehand.svg" style:transform="rotate({minuteHandPos}deg) scale(1)" alt="clock">
        <img src="/images/hourhand.svg" style:transform="rotate({hourHandPos}deg)" alt="clock">
        {#each nav_items as item}
            <div class="nav-item" role="button" style:transform={item.position} style:opacity="{opacity}">
                <img alt={item.imagealt} src="/images/icons/{item.image}">
            </div>
        {/each}
    </div>
    <div class="side-button">
        <img alt="show names" src="/images/icons/tag.svg">
    </div>
</main>

<style>

    main {
        display: flex;
        gap: 1.5rem;
    }

    .side-button {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;

        margin: auto;

        background-color: rgb(117, 53, 145);

        img {
            box-sizing: border-box;
            margin: 20%;
            width: 60%
        }
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

            container-type: size;

            transition: transform 150ms, opacity 180ms;
            transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);

            img {
                box-sizing: border-box;
                margin: 17.5%;
                width: 65%
            }

        }
    }
</style>