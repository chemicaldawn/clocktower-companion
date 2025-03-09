<svelte:options runes={true}></svelte:options>

<script lang="ts">
    import { transform } from "typescript";

    let expanded = $state(false);
    let opacity = $derived(expanded ? 1 : 0);
    let dist = 5.25;
    let offset = 0.625;

    let d : Date = new Date()

    let hourHandDefault = d.getHours() * 30 + d.getMinutes() * 0.5
    let minuteHandDefault = d.getMinutes() * 6
    let hourHandPos = $derived(expanded ? 360 : hourHandDefault)
    let minuteHandPos = $derived(expanded ? 720 : minuteHandDefault)
    
    class NavItem {

        expandedPosX = $state(0)
        expandedPosY = $state(0)
        posX = $derived(expanded ? this.expandedPosX : 0)
        posY = $derived(expanded ? this.expandedPosY : 0)

        css = $derived(`translate(${this.posX}rem, ${this.posY}rem)`)

        index : number
        image : string
        imagealt : string
        small : boolean

        class : string

        constructor(idx : number, len : number, image : string, imagealt: string, small:boolean) {

            this.index = idx
            this.image = image
            this.imagealt = imagealt
            this.small = small

            if (small) {
                this.class = "side-button"
            } else {
                this.class = "main-button"
            }

            let angle = ((this.index) / (len)) * Math.PI

            this.expandedPosX = Math.cos(angle) * dist + offset
            this.expandedPosY = -Math.sin(angle) * dist + offset
        }
    }

    let nav_items = $state([
        new NavItem(4, 4, "eye.svg", "show roles", true),
        new NavItem(3, 4, "script.svg", "script viewer", false),
        new NavItem(2, 4, "notes.svg", "game notes", false),
        new NavItem(1, 4, "setup.svg", "game setup", false),
        new NavItem(0, 4, "tag.svg", "show player names", true)
    ])
</script>

<main>
    <div id="help" class="meta-button">
        <img alt="help" src="/images/icons/help.svg">
    </div>
    <div id="central-nav">
        <div id="navigation" role="button" tabindex="0" onkeydown={() => {expanded = !expanded}} ontouchstart={() => {expanded = !expanded}}>
            <img src="/images/clock.svg" alt="clock">
            <img src="/images/minutehand.svg" style:transform="rotate({minuteHandPos}deg) scale(1)" alt="clock">
            <img src="/images/hourhand.svg" style:transform="rotate({hourHandPos}deg)" alt="clock">
            {#each nav_items as item}
                <div class={item.class} role="button" style:transform={item.css} style:opacity="{opacity}">
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