function playSound(audio) {
    var sound = document.getElementById(audio);
    // console.log(audio)
    sound.play();
}


document.getElementsByClassName("hscon")[0].style.display = "none";



var mode;


var high_scores = document.getElementsByClassName("highscore")
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let later = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
let lvl2 = [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];

var seq = 1;
let lseq = 0;
var actv = 20;
shuffleArray(cards);

function shuffleArray(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}
console.log(cards);

function selector(e) {
    mode = e.value;
    if (mode==2){

        later.push.apply(later,lvl2);
        console.log(later)
    }
    document.getElementById("selector").style.display = "none";
    document.getElementById("game").style.display = "table";
    layout();


}

function done(e) {
//            console.log(e)



    switch (mode) {
        case '1':
            if (e.innerHTML == seq) {
                playSound("right")


                if (e.innerHTML == 1) {
                    start()
                } else if (e.innerHTML == 40) {
                    e.style.backgroundColor = "white";
                    e.className = "tapped";
                    e.innerHTML = '';
                    stop()
                }
                if (e.innerHTML > 20) {
                    e.className = "tapped";
                    e.style.backgroundColor = "white";
                    e.innerHTML = '';
                } else {

                    e.innerHTML = later[lseq];
                    e.className = "square " + later[lseq];
                    e.style.backgroundColor = "rgb(" + (200 - 4 * later[lseq]) + "," + (200 - 4 * later[lseq]) + "," + (200 - 4 * later[lseq]) + ")";
                    lseq++;
                }
                seq++;
            } else {
                playSound("wrong")

            }
            break;
        case '2':
            if (e.innerHTML == seq) {
                playSound("right")


                if (e.innerHTML == 1) {
                    start()
                } else if (e.innerHTML == 60) {
                    e.style.backgroundColor = "white";
                    e.className = "tapped";
                    e.innerHTML = '';
                    stop()
                }
                if (e.innerHTML > 40) {
                    e.className = "tapped";
                    e.style.backgroundColor = "white";
                    e.innerHTML = '';
                } else {

                    e.innerHTML = later[lseq];
                    e.className = "square " + later[lseq];
                    e.style.backgroundColor = "rgb(" + (200 - 3 * later[lseq]) + "," + (200 - 3 * later[lseq]) + "," + (200 - 3 * later[lseq]) + ")";
                    lseq++;
                }
                seq++;
            } else {
                playSound("wrong")

            }
            break;

    }







}

// console.log(document.getElementsByClassName("square"));
// var box = document.getElementsByClassName("square");
// console.log(box);
var j;


function layout() {
    for (var i = 0; i < 20; i++) {
        j = Math.floor(i / 5);
        var shade = 200 - 4 * cards[i];
        var node = document.createElement("td");
        var divnode = document.createElement("div");
        var textnode = document.createTextNode(cards[i]);

        divnode.className = "square " + cards[i];
        // divnode.addEventListener('click',done(this),false);
        // console.log(divnode.onclick)

        divnode.style.backgroundColor = "rgb(" + shade + "," + shade + "," + shade + ")";

        divnode.appendChild(textnode);
        node.appendChild(divnode);

        document.getElementsByClassName("rows")[j].appendChild(node);
        // document.getElementsByClassName('square')[i].addEventListener('onclick',done(this),false);
        // document.getElementsByClassName("square")[i].addEventListener("onclick", function(){done(this)});
        divnode.onclick = function() {
            done(this)

        }




        // document.getElementsByClassName("square")[i].innerHTML = cards[i];
        // document.getElementsByClassName("square")[i].className = "square "+cards[i];
        // document.getElementsByClassName("square")[i].style.backgroundColor = "rgb("+shade+","+shade+","+shade+")";
        //

    }


}



var sec = 0;
var min = 0;
var myTimer;

function tick() {

    if (sec == 59) {
        min++;
        sec = -1
    }
    if (sec > 59) {
        min++;
        sec = sec % 60;
    }

    sec++;
    if (min.toString().length < 2) {
        min = '0' + min.toString()
    }
    if (sec.toString().length < 2) {
        sec = '0' + sec.toString()
    }
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
    parseInt(sec)
    parseInt(min)
}

function start() {

    myTimer = setInterval(tick, 1000);
}

function stop() {
    clearInterval(myTimer);
    UpdateScore();
    document.getElementById("game").style.display = "none";
    document.getElementsByClassName("hscon")[0].style.display = "block";

}



function UpdateScore() {
    switch (mode) {


        case '1':
            if (typeof(Storage) !== "undefined") {
                var current = 60 * parseInt(min) + parseInt(sec);

                var scores = false;
                if (localStorage["high-scores1"]) {

                    scores = JSON.parse(localStorage["high-scores1"]);
                    scores = scores.sort(function(a, b) {
                        return parseInt(a) - parseInt(b)
                    });

                    for (var i = 0; i < 5; i++) {
                        var s = parseInt(scores[i]);

                        var val = (!isNaN(s) ? s : 10000);
                        if (current < val) {
                            val = current;
                            scores.splice(i, 0, parseInt(current));
                            break;
                        }
                    }

                    scores.length = 5;
                    localStorage["high-scores1"] = JSON.stringify(scores);

                } else {
                    var scores = new Array();
                    scores[0] = current;
                    localStorage["high-scores1"] = JSON.stringify(scores);
                }

                highsc()
            }
            break;

        case '2':
            if (typeof(Storage) !== "undefined") {
                var current = 60 * parseInt(min) + parseInt(sec);

                var scores = false;
                if (localStorage["high-scores2"]) {

                    scores = JSON.parse(localStorage["high-scores2"]);
                    scores = scores.sort(function(a, b) {
                        return parseInt(a) - parseInt(b)
                    });

                    for (var i = 0; i < 5; i++) {
                        var s = parseInt(scores[i]);

                        var val = (!isNaN(s) ? s : 10000);
                        if (current < val) {
                            val = current;
                            scores.splice(i, 0, parseInt(current));
                            break;
                        }
                    }

                    scores.length = 5;
                    localStorage["high-scores2"] = JSON.stringify(scores);

                } else {
                    var scores = new Array();
                    scores[0] = current;
                    localStorage["high-scores2"] = JSON.stringify(scores);
                }

                highsc()
            }

    }


}

function highsc() {
    var hs = document.getElementsByClassName("highscore")[0];
    var tempp = ''
    console.log(typeof localStorage["high-scores1"])
    console.log(typeof localStorage["high-scores2"])

    if (localStorage["high-scores1"] !== undefined) {
        // console.log("hi")
        var f = (JSON.parse(localStorage["high-scores1"]));
        tempp += "<strong>Difficulty 1:</strong><br><ol>";
        for (i = 0; i < 5; i++) {
            if (f[i] || f[i] == 0) {
                var mi = Math.floor(f[i] / 60);
                var se = f[i] % 60;
                if (mi.toString().length < 2) {
                    mi = '0' + mi.toString()
                }
                if (se.toString().length < 2) {
                    se = '0' + se.toString()
                }
                // console.log(hs);
                tempp += "<li>" + mi + ":" + se + "</li>";
            }
        }
        tempp += "</ol>"
        // console.log(tempp)
    }
    if (localStorage["high-scores2"]) {
        var s = (JSON.parse(localStorage["high-scores2"]));

        tempp += "<strong>Difficulty 2:</strong><br><ol>"
        for (i = 0; i < 5; i++) {
            if (s[i] || s[i] == 0) {
                var mi = Math.floor(s[i] / 60);
                var se = s[i] % 60;
                if (mi.toString().length < 2) {
                    mi = '0' + mi.toString()
                }
                if (se.toString().length < 2) {
                    se = '0' + se.toString()
                }
                // console.log(hs);
                tempp += "<li>" + mi + ":" + se + "</li>";
            }
        }

    }
    hs.innerHTML = tempp + "</ol>";
}
