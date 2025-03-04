<script lang="ts">

    let expanded = false;
    let display = "0rem";
    let margin = "0rem";
    let opacity = 0;

    class NavItem {
        index : number
        image : string

        constructor(idx : number) {
            this.index = idx
            this.image = ""
        }
    }

    function toggleExpansion(e) {
        console.log("yuh")
        expanded = !expanded

        if (expanded) {
            display = "2.5rem"
            margin = "0.25rem"
            opacity = 1
        } else {
            display = "0rem"
            margin = "0rem"
            opacity = 0
        }
    }

    let nav_items = [
        new NavItem(0),
        new NavItem(1),
        new NavItem(2)
    ]
</script>

<div id="right-navigation">
    <div class="expand-button" role="button" tabindex="0" onkeydown={toggleExpansion} ontouchstart={toggleExpansion}></div>
    {#each nav_items as item}
        <div class="nav-item" role="button" style:height={display} style:margin-bottom={margin} style:opacity="{opacity}"></div>
    {/each}
</div>

<style>
    #right-navigation {
        width: 3rem;
        border-radius: 1.5rem;
        margin-top: auto;
        background-color: rgb(117, 53, 145);

        display: flex;
        flex-direction: column;
        gap: 0;

        .expand-button {
            pointer-events: all;
            z-index: 1;

            border-radius: 1.25rem;

            width: 2.5rem;
            height: 2.5rem;

            margin: 0.25rem;

            background-color: rgb(178, 96, 216);
        }

        .nav-item {
            pointer-events: all;
            z-index: 1;
            background-color: rgb(68, 18, 94);
            border-radius: 1.25rem;

            width: 2.5rem;
            height: 0rem;

            margin-left: 0.25rem;
            margin-right: 0.25rem;

            transition: height 180ms, margin 180ms, opacity 180ms;

        }
    }
</style>