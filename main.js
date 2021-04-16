$(document).ready(function () {
    // confetti.speed = 1;
    // confetti.alpha = 0.5;
    // confetti.maxCount = 10;
    // confetti.start(0, 20);

    let questions = [
        null,
        "In che anno siamo andate in vacanza in Grecia Tu,Vale, Giusy, Lig e Manu?",
        "Tu che te ne intendi... Pepsi o Coca-Cola: quale ricetta contiene più zuccheri?",
        "In zona arancione posso andare da Zara dentro un centro commerciale di sabato?",
        "Hey, canta una canzone di Gigi d’Alessio",
        "Ok, vivi a Bologna ma quanto ne sai? Come si chiama il sindaco?",
        "Manu's question: chi sono Corallo e Turrò?",
        "Come si dice “amiche“ in turco?",
        "Facci vedere cosa sai fare con le tue manine senza commuoverti. Taglia una cipolla.",
        "Quali sono gli ingredienti per fare la maionese?",
        "Cosa ha perso Luke Skywalker nella sua lotta con Darth Vader?",
        "Se fai un buco che attraversa tutta la Terra passando dal centro, partendo da Wellington in Nuova Zelanda, in quale paese europeo esci?",
        "Giusy's question: qual era e quale sarà la data del matrimonio di Peppina?",
        "Chi muore nella seconda battaglia di Hogwarts?",
        "4 + 5 * 3 + 3 / 6 = ?",
        "Con quali stati confina l’Italia? Elenca.",
        "Chi era il detective nei libri di Agatha Christie?",
        "Improvvisa un ballo sexy e convincici a darti il punto.",
        "Elenca 4 professori del liceo e associa una caratteristica.",
        "Lig's question: come riconoscere un messaggio WhatsApp di Liguori?",
        "Completa i seguenti detti: ogni scarrafone... - chi chiagne fott.... - l’amico è comm ‘o ombrello: quann chiove... - chi parla areto... ",
        "Vale's question: come si chiamava il primo motorino di Valeria? Gli hai fatto anche il funerale allo specchietto.",
        "Nomina le province della terra natìa di tuo papà.",
        "Più la tiri più s'accorcia...",
        "Ad ogni nome rispondi il soprannome: Antonio Ruocco - Lorenzo - Massimo de Vivo - Claudio Materiale.",
        "Fai un discorso sentimentale su cosa significa avere 30 anni.",
        "Chi ha inventato la parola vomito?",
        "Cosa ha lanciato dalla finestra Lorenzo Sanrè al ginnasio? E chi lo ha recuperato?",
        "La camera dei segreti è stata aperta, temete nemici... Completa.",
        "Traduci dall’arabo: اذهب وخذ القرف ونظف الحمام بعد ذلك (adhhab wakhudh alqarf wanizaf alhamam baed dhlk).",
    ];
    // ----Set Game size----
    let width = $(".grid-container").width();
    $(".grid-container").css({ height: width + "px" });
    $(window).resize(function () {
        let width = $(".grid-container").width();
        $(".grid-container").css({ height: width + "px" });
    });

    // Aggiunta testo in caselle (numero casella)
    for (let i = 1; i <= 30; i++) {
        $(".c" + i).append("<p>" + i + "</p>");
    }

    // ------Game-------
    let position = 0;
    let canPlay = true;
    let gameFinished = false;
    let correct;
    let wrong;
    let numCasella;
    let sound = true;

    $("#start").on("click", function () {
        $("h1").removeClass("invisible");
        $(".grid-container").removeClass("invisible");
        $("#istruzioni").addClass("hidden");
        $("#rollDice").removeClass("invisible");
        $("#reload-btn").removeClass("invisible");
    });

    $("#rollDice").on("click", function () {
        rollDice();
    });

    $(".casella").on("click", function () {
        $(".buttons-imprevisto").addClass("hidden");

        numCasella = $(this).attr("n");
        correct = $(this).attr("correct");
        wrong = $(this).attr("wrong");
        $(this).addClass("visited");
        if ($(this).hasClass("imprevisto")) {
            showImprevisto(numCasella);
        } else {
            showQuestion(numCasella);
        }
    });

    $("#correct").click(function () {
        if (sound) {
            let up = document.getElementById("up");
            up.load();
            up.play();
        }
        setTimeout(function () {
            goToCasella(correct);
        }, 500);
    });
    $("#wrong").click(function () {
        if (sound) {
            let down = document.getElementById("down");
            down.load();
            down.play();
        }
        setTimeout(function () {
            goToCasella(wrong);
        }, 500);
    });

    $("#final-stage").click(function () {
        $("#final-message").addClass("hidden");
        $(".casella").css("pointer-events", "auto");
        $(".casella").css("cursor", "pointer");
    });

    // user settings game

    $("#sound-switch").on("click", function () {
        let el = $(this);
        soundSwitch(el);
    });

    $("#reload-btn").on("click", function () {
        $("#modale-reload").removeClass("hidden");
        $("#box-question").addClass("hidden");
        $("#final-message").addClass("hidden");
        $("#close-qst").addClass("hidden");
    });
    $("#confirm-reload").on("click", function () {
        position = 0;
        $("#pedina").css("grid-area", "c0");
        $(".visited").removeClass("visited");
        $("#modale-reload").addClass("hidden");
        $("#rollDice").removeClass("invisible");
        $(".casella").css("pointer-events", "none");
        $(".casella").css("cursor", "none");
    });
    $("#abort-reload").on("click", function () {
        $("#modale-reload").addClass("hidden");
    });

    $("#close-qst").on("click", function () {
        $("#box-question").addClass("hidden");
        $(".buttons-imprevisto").addClass("hidden");
    });

    /* =====FUNZIONI======
    ====================== */

    function showImprevisto(numCasella) {
        $("#box-question .question").text(questions[numCasella]);
        $("#box-question .titolo-casella").text("Imprevisto");
        $("#box-question").removeClass("hidden");
        $(".titolo-casella").css("color", "darkred");
        $(".numero").text(numCasella);
        $(".numero").css("color", "darkred");
        $(".buttons-imprevisto").removeClass("hidden");
        $(".text-imprevisto").text(
            "Se fai bene voli alla casella " +
                correct +
                ", altrimenti torni alla " +
                wrong
        );
        if (sound) {
            bell.load();
            bell.play();
        }
    }

    function showQuestion(numCasella) {
        $("#box-question .question").text(questions[numCasella]);
        $("#box-question .titolo-casella").text("Domanda");
        $("#box-question").removeClass("hidden");
        $(".titolo-casella").css("color", "#1d1d1d");
        $(".numero").text(numCasella);
        $(".numero").css("color", "#1d1d1d");
        if (sound) {
            let bell = document.getElementById("bell");
            bell.load();
            bell.play();
        }
    }

    function goToCasella(nuovaCasella) {
        $("#box-question").addClass("hidden");
        // $("#box-question").fadeOut();

        $("#pedina").css("grid-area", "c" + nuovaCasella);

        position = parseInt(nuovaCasella);
        enableCasella(position);
    }

    function rollDice() {
        // Dado magico (1 e 2 escono più di frequente)
        if (canPlay) {
            // canPlay = false;
            $("#box-question").addClass("hidden");

            let number = getRandomNumber(1, 9);
            if (number == 7 || number == 8) {
                number = 1;
            }
            if (number == 9) {
                number = 2;
            }

            $("#estrazione").removeClass("hidden");

            let time = 70;
            setTimeout(function () {
                $("#estrazione p").text(number > 3 ? number - 1 : number + 1);
            }, time * 1);
            setTimeout(function () {
                $("#estrazione p").text(number > 3 ? number - 2 : number + 2);
            }, time * 2);
            setTimeout(function () {
                $("#estrazione p").text(number > 4 ? number - 3 : number);
            }, time * 3);
            setTimeout(function () {
                $("#estrazione p").text(number < 5 ? number + 2 : number - 1);
            }, time * 4);
            setTimeout(function () {
                $("#estrazione p").text(number < 3 ? number + 3 : number);
            }, time * 5);
            setTimeout(function () {
                $("#estrazione p").text(number > 1 ? number - 1 : number + 4);
            }, time * 5);
            setTimeout(function () {
                $("#estrazione p").text(number);
            }, time * 6);
            setTimeout(function () {
                $("#estrazione").addClass("hidden");
            }, time * 20);
            setTimeout(function () {
                let destination = position + number;
                // console.log(destination);
                if (destination >= 30) {
                    // VITTORIA----------------------------------------------------
                    destination = 30;
                    // canPlay = false;
                    gameFinished = true;
                    $("#rollDice").addClass("invisible");

                    setTimeout(function () {
                        $("#final-message").removeClass("hidden");
                        if (sound) {
                            let tada = document.getElementById("tada");
                            tada.load();
                            tada.play();
                        }
                        $("#close-qst").removeClass("hidden");
                    }, 3000);
                }

                movePedina(position, destination);
                position = destination;
            }, time * 25);
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
            // let casella = $(".c" + i);
            // let randomRotation = getRandomNumber(-45, 45);
            function timer() {
                setTimeout(function () {
                    $("#pedina").css("grid-area", "c" + i);
                    if (sound) {
                        let ping = document.getElementById("ping");
                        ping.load();
                        ping.play();
                    }
                    // $("#pedina img").css("rotate", randomRotation + "deg");
                }, t * 700);
                t++;
            }

            timer();
        }

        enableCasella(destination);
    }

    function enableCasella(numCasella) {
        $(".buttons-imprevisto").addClass("hidden");
        $(".casella").removeClass("enabled");
        $(".c" + numCasella).addClass("enabled");
    }

    function soundSwitch(el) {
        if (sound) {
            sound = false;
            $("#audio-info-msg").text("Audio disattivato");
        } else {
            $("#audio-info-msg").text("Audio attivato");
            sound = true;
        }
        el.children("img").toggleClass("hidden");
        $("#audio-info-msg").fadeIn();
        setTimeout(function () {
            $("#audio-info-msg").fadeOut();
        }, 1300);
    }

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        // return 24;
        return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
    }

    //     function getRandomNumber(min, max) {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         return 29; //Il max è incluso e il min è incluso
    //     }
});
