$(document).ready(function () {
    // ----Set Game size----
    let width = $(".grid-container").width();
    $(".grid-container").css({ height: width + "px" });
    $(window).resize(function () {
        let width = $(".grid-container").width();
        $(".grid-container").css({ height: width + "px" });
    });

    // Aggiunta testo in caselle
    for (let i = 1; i <= 30; i++) {
        $(".c" + i).append("<p>" + i + "</p>");
    }

    // ------Game-------
    let position = 0;
    let canPlay = true;
    let gameFinished = false;

    $("#rollDice").on("click", function () {
        rollDice();
    });

    function rollDice() {
        if (canPlay) {
            // canPlay = false;
            let number = getRandomNumber(1, 6);
            let destination = position + number;
            console.log(position);
            console.log(destination);
            if (destination >= 30) {
                destination = 30;
                canPlay = false;
                gameFinished = true;
                $("#rollDice").addClass("invisible");
            }

            movePedina(position, destination);
        } else {
            $("#info-message").text(
                "Attendi. Questo turno di gioco non è concluso."
            );
        }
    }

    function movePedina(position, destination) {
        let t = 0;
        let stop = false;
        let = pedina;

        for (let i = position + 1; i <= destination; i++) {
            let casella = $(".c" + i);
            if (!casella.attr("imprevisto")) {
                async function timer() {
                    let promise2 = new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            $("#pedina").css("grid-area", "c" + i);
                            pedina = document.getElementById("pedina");
                            resolve(getComputedStyle(pedina));
                        }, t * 700);
                        t++;
                    });
                    let style = await promise2;
                    position = parseInt(style.gridColumnStart.substring(1));
                    console.log("->" + position);
                }
                timer();
            } else {
                async function timer() {
                    let promise1 = new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            $("#pedina").css("grid-area", "c" + i);
                            pedina = document.getElementById("pedina");
                            resolve(getComputedStyle(pedina));
                        }, t * 700);
                    });
                    let style = await promise1;
                    position = parseInt(style.gridColumnStart.substring(1));
                    console.log("->>>" + position);
                }
                timer();

                return false;
            }
        }
    }

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
    }
});
