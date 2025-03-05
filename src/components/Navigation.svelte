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
        small : boolean

        class : string

        constructor(idx : number, image : string, imagealt: string, small:boolean) {
            this.index = idx
            this.image = image
            this.imagealt = imagealt
            this.small = small

            if (small) {
                this.class = "side-button"
            } else {
                this.class = "main-button"
            }

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
            let angle = ((this.index) / (nav_items.length - 1)) * Math.PI
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
        new NavItem(4, "eye.svg", "show roles", true),
        new NavItem(3, "setup.svg", "game setup", false),
        new NavItem(2, "notes.svg", "game notes", false),
        new NavItem(1, "settings.svg", "app settings", false),
        new NavItem(0, "tag.svg", "show player names", true)
    ]
</script>

<main>
    <div id="help" class="meta-button">
        <img alt="help" src="/images/icons/help.svg">
    </div>
    <div id="central-nav">
        <div id="navigation" role="button" tabindex="0" onkeydown={toggleExpansion} ontouchstart={toggleExpansion}>
            <img src="/images/clock.svg" alt="clock">
            <img src="/images/minutehand.svg" style:transform="rotate({minuteHandPos}deg) scale(1)" alt="clock">
            <img src="/images/hourhand.svg" style:transform="rotate({hourHandPos}deg)" alt="clock">
            {#each nav_items as item}
                <div class={item.class} role="button" style:transform={item.position} style:opacity="{opacity}">
                    <img alt={item.imagealt} src="/images/icons/{item.image}">
                </div>
            {/each}
        </div>
    </div>
    <div id="settings" class="meta-button">
        <img alt="app settings" src="/images/icons/settings.svg">
    </div>
</main>

<style>

    main {
        display: flex;
        justify-content: space-between;
        gap: 2.5rem;

        width: 100%;
    }

    #central-nav {
        display: flex;
        gap: 1.5rem;
    }

    .meta-button {
        pointer-events: all;

        z-index: 1;
        background-color: rgb(68, 18, 94);
        border-radius: 50%;
        container-type: size;

        width: 3.25rem;
        height: 3.25rem;

        margin-top: auto;
        margin-bottom: auto;

        img {
            box-sizing: border-box;
            margin: 17.5%;
            width: 65%
        }
    }

    .meta-button#help {
        background-color: rgb(53, 145, 124) !important;
    }

    .meta-button#settings {
        background-color: rgb(73, 69, 70) !important;
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

        .main-button {
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

        .side-button {
            position: absolute;

            width: 2.5rem;
            min-height: 2.5rem;

            border-radius: 50%;
            margin: 0.375rem;

            background-color: rgb(117, 53, 145);
            transition: transform 150ms, opacity 180ms;

            img {
                box-sizing: border-box;
                margin: 20%;
                width: 60%
            }
        }
    }
</style>