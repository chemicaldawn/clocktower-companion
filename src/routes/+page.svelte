<script>
    import GameDisplay from "../GameDisplay.svelte";


</script>

<main>
    <div id="content">
        <div id="display">
            <GameDisplay />
        </div>
        <div id="context">
            <div id="editor">
                <div id="setup">
                    <span>Script <select name="scripts" id="scripts">
                        <option value="tb">Trouble Brewing</option>
                        <option value="bmr">Bad Moon Rising</option>
                        <option value="snv">Sects & Violets</option>
                        <option value="custom">Custom Script</option>
                        </select>
                    </span>
                    <span>Player Count <div class="pip" id="minus">-</div><div id="counter">12</div><div class="pip" id="plus">+</div></span>
                </div> 
            </div>
            <div id="navigation">
                <div class="nav-icon"></div>
                <div class="nav-icon"></div>
            </div>
        </div>
    </div>
</main>

<style>
    :global(html), :global(body) {
        margin: 0;
        overflow: hidden;
    }

    :global(body) {
        position: relative;
        background-color: rgb(91 43 99);

        width: 100vw;
        height: 100vh;
    }

    main {
        height: 100%;
    }

    @font-face {
        font-family: "Trade Gothic LT Std";
        src: url("/font/tradegothic.woff2") format("woff2"),
            url("/font/tradegothic.woff") format("woff");
    }

    @font-face {
        font-family: "Dumbledor";
        src: url("/font/dumbledor.woff2") format("woff2"),
            url("/font/dumbledor.woff") format("woff");
    }

    @media only screen and (min-width: 786px) {
        
        #content {
            margin-left: 20vw;
            margin-right: 20vw;
            width: 60vw !important;

            #display {
                #token-display {
                    width: auto !important;
                    height: 100% !important;
                }
            }
        }
    }

    #content {
        display: flex;
        flex-direction: column;

        width: 100vw;
        height: 100%;

        div {
            margin: 1rem;
            border-radius: 1rem;
        }

        #display {
            background-color: rgb(0, 0, 0);

            display: flex;
            flex-grow: 1;

            clip: rect(0, 100%, 0, 100%);

            padding: 0;
            text-align: center;

            overflow: hidden;
            position: relative;
        }
        #context {

            display: flex;
            flex-direction: row;
            flex-grow: 0;
            flex-basis: 30vh;
            gap: 1rem;

            margin: 0 1rem 1rem 1rem;
            padding: 0;

            #editor {
                background-color: rgb(247, 232, 202);;
        
                margin: 0;
        
                padding: 1rem;
        
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                flex-grow: 1;

                div {
                    margin: 0;
                    display: none;
                    opacity: 0;
                }

                .shown {
                    display: flex !important;
                    opacity: 1 !important;
                }
            }

            #navigation {
                display: flex;
                flex-direction: column;

                border-radius: 1.5rem;
                background: #4e2055;
                flex-grow: 0;

                width: 3rem;

                margin: 0;

                .nav-icon {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 1;

                    border-radius: 1.5rem;
                    background: #301135;

                    margin: 0;
                }
            }
        }
    }

    span {
        font-family: "Trade Gothic LT Std";
        font-size: 1.5rem;
        color: #5C1F22;

        width: 100%;

        display: flex;
        flex-direction: row;

        gap: 0.5rem;
    }

    #scripts {
        flex-grow: 1;
        border-radius: 1rem;
    }

    #counter, .pip {
        margin: 0 !important
    }

    .pip {
        color: white;

        width: 2rem;
        text-align: center;
    }

    .pip#minus {
        background-color: rgb(205, 83, 83);
    }

    .pip#plus {
        background-color: rgb(96, 189, 96);
    }

    p {
        font-family: "Trade Gothic LT Std";
    }

    h1, h2, h3 {
        font-family: "Dumbledor";
        font-size: 1.75rem;
        color: #7C6659;

        margin: 0.5rem 0 0.5rem 0
    }
</style>