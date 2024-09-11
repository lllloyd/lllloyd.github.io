let numTurns = 6;
let puzzleName = "DIYdle";
const winString = `wow good job&nbsp;`;
const loseOptionString = `do you want to lose&nbsp;`;
const loseString = `ok you lose&nbsp;`;
let copyString = "copy to clipboard";
let copiedString = "copied!";
//const keyboardString = "tap for phone keyboard...change this in index.html";

let params = new URLSearchParams(location.search);
let answer = params.get("q");

const internalGrey = 'º';
const internalGreen = '¹';
const internalYellow = '²';
const internalRed = '³';
let colorCode;
let clipBoard = "";
let guess = "";
let guessNo = 0;
let clipboardLine;

if (!answer) {
    diy();
}
else {
    answer = atob(answer).toLowerCase();
    word(answer);
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function replaceChar(index, char, string) {
    string = string.split('');
    string[index] = char;
    string = string.join('');
    return string;
}

function copyButtonTemplate(clipBoardString, buttonID, buttonString, copiedString) {
    let copyButton = document.createElement("button");
    copyButton.id = buttonID;
    copyButton.onclick = function () {
        navigator.clipboard.writeText(clipBoardString)
            .then(function () {
                document.getElementById(buttonID).innerHTML = copiedString;
            }, function (err) {
                document.getElementById(buttonID).innerHTML = err;
            });
    };
    copyButton.appendChild(document.createTextNode(buttonString));
    return copyButton;
}

function gridTemplateStyle(direction, number) {
    if (direction === 'x') {
        game.style.setProperty("grid-template-columns", `repeat(${number}, 1fr)`);
        game.style.setProperty("width", `${number}0vmin`);
    }
    else if (direction === 'y') {
        game.style.setProperty("grid-template-rows", `repeat(${number}, 1fr)`);
        game.style.setProperty("height", `${number}0vmin`);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function diyKey(char) {
    let title = document.getElementById("title");
    let game = document.getElementById("game");
    let x = game.childElementCount;
    if (char.length === 1 && (char !== ' ' || guess[guess.length - 1] !== ' ')) {
        let span = document.createElement("span");
        if (char === ' ') {
            span.classList.add("black");
        }
        guess += char.toLowerCase();
        span.innerHTML = char.toLowerCase();
        span.id = (`0${x}`);
        game.appendChild(span);
        gridTemplateStyle('x', x + 1);
    }
    else if (char === "Backspace") {
        guess = guess.slice(0, -1);
        game.removeChild(document.getElementById(`0${x - 1}`))
        gridTemplateStyle('x', x - 1);
    }
    let titleText = document.createElement("span");
    titleText.innerHTML = `${puzzleName}?q=${btoa(guess.trim())}&nbsp;`;
    title.replaceChildren(titleText);

    let clipboardString = `${window.location.href.split('?')[0]}?q=${btoa(guess.trim())}`
    title.appendChild(copyButtonTemplate(clipboardString, "copyURL", "copy URL to clipboard", "copied!"));
}

function diy() {
    document.getElementById("title").innerHTML = "type some stuff";
    gridTemplateStyle('y', 1);
    document.addEventListener("keydown", function onPress(event) {
        diyKey(event.key);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function buildRow(answer, y) {
    let game = document.getElementById("game");
    gridTemplateStyle('y', y + 1);
    for (let x = 0; x < answer.length; x++) {
        let span = document.createElement("span");
        if (answer[x] === ' ') {
            span.classList.add("black");
        }
        span.id = (`${y}${x}`);
        game.appendChild(span);
    }
}

function buildBoard(answer) {
    gridTemplateStyle('x', answer.length);
    for (let y = 0; y < numTurns; y++) {
        buildRow(answer, y);
    }
}

function clipboardEmojiString() {
    let feb17 = new Date(2024, 1, 17);
    let today = new Date();
    let daysSinceFeb17 = 1 + Math.round(Math.abs((feb17 - today) / (24 * 60 * 60 * 1000)));
    let emojiClipBoard = "";
    for (c of clipBoard) {
        switch (c) {
            case internalGreen:
                emojiClipBoard += '🟩';
                break;
            case internalYellow:
                emojiClipBoard += '🟨';
                break;
            case internalRed:
                emojiClipBoard += '🟥';
                break;
            case ' ':
                emojiClipBoard += '  ';
                break;
            case '\n':
                emojiClipBoard += '\n';
                break;
            default:
                emojiClipBoard += '⬛';
                break;
        }
    }
    return `${puzzleName} #${daysSinceFeb17} ${guessNo}/${numTurns}\n\n${emojiClipBoard}\n\n${window.location.href}`;
}

function paintBoard(string, row) {
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case internalGreen:
                document.getElementById(`${row}${i}`).classList.add("green");
                break;
            case internalYellow:
                document.getElementById(`${row}${i}`).classList.add("yellow");
                break;
            case internalRed:
                document.getElementById(`${row}${i}`).classList.add("red");
                break;
            case ' ':
                document.getElementById(`${row}${i}`).classList.add("black");
                break;
            default:
                document.getElementById(`${row}${i}`).classList.add("grey");
                break;
        }
    }
}

function gameOver(win) {
    let copyButton = copyButtonTemplate(clipboardEmojiString(), "copyEmoji", "share", "copied results to clipboard!");
    let title = document.getElementById("title");
    if (win) {
        title.innerHTML = winString;
        title.appendChild(copyButton);
    }
    else {
        title.innerHTML = loseOptionString;
        let dieButton = document.createElement("button");
        let span = document.createElement("span");
        let liveButton = document.createElement("button");
        dieButton.appendChild(document.createTextNode("yes"));
        liveButton.appendChild(document.createTextNode("no"));
        title.appendChild(dieButton);
        title.appendChild(span);
        title.appendChild(liveButton);
        dieButton.onclick = function () {
            title.innerHTML = loseString;
            title.appendChild(copyButton);
        };
        liveButton.onclick = function () {
            buildRow(answer, numTurns);
            numTurns++;
        };
    }
}

function wordKey(char) {
    if (char.length === 1 && char !== ' ') {
        if (guess.length < answer.length) {
            document.getElementById(`${guessNo.toString()}${guess.length.toString()}`).innerHTML = char.toLowerCase();
            guess += char.toLowerCase();
        }
        for (i = 0; i < answer.length; i++) {
            if (answer[i] === ' ' && guess.length === i) {
                guess += ' ';
            }
        }
    }
    else if (char === "Backspace") {
        guess = guess.slice(0, -1);
        for (i = 0; i < answer.length; i++) {
            if (answer[i] === ' ' && guess.length === i) {
                guess = guess.slice(0, -1);
            }
        }
        document.getElementById(`${guessNo.toString()}${guess.length}`).innerHTML = '';
    }
    else if (char === "Enter") {
        if (guess.length === answer.length) {
            let guessSplit = guess.split(' ');
            let answerCopy = answer;
            let answerCopySplit = answerCopy.split(' ');
            let clipBoardLineCopy = clipBoardLine;
            let clipBoardLineCopySplit = clipBoardLineCopy.split(' ');

            // green
            for (let word = 0; word < guessSplit.length; word++) {
                for (let letter = 0; letter < guessSplit[word].length; letter++) {
                    if (guessSplit[word][letter] === answerCopySplit[word][letter] && guessSplit[word][letter] !== ' ') {
                        guessSplit[word] = replaceChar(letter, internalGreen, guessSplit[word]);
                        answerCopySplit[word] = replaceChar(letter, internalGreen, answerCopySplit[word]);
                        clipBoardLineCopySplit[word] = replaceChar(letter, internalGreen, clipBoardLineCopySplit[word]);
                    }
                }
            }

            // red
            for (let word = 0; word < guessSplit.length; word++) {
                for (let guessLetter = 0; guessLetter < guessSplit[word].length; guessLetter++) {
                    if (guessSplit[word][guessLetter] !== ' ' && guessSplit[word][guessLetter] !== internalGreen)
                        for (let answerLetter = 0; answerLetter < answerCopySplit[word].length; answerLetter++) {
                            if (guessSplit[word][guessLetter] === answerCopySplit[word][answerLetter]) {
                                guessSplit[word] = replaceChar(guessLetter, internalYellow, guessSplit[word]);
                                answerCopySplit[word] = replaceChar(answerLetter, internalYellow, answerCopySplit[word]);
                                clipBoardLineCopySplit[word] = replaceChar(guessLetter, internalYellow, clipBoardLineCopySplit[word]);
                                break;
                            }
                        }
                }
            }

            guess = guessSplit.join(' ');
            answerCopy = answerCopySplit.join(' ');
            clipBoardLineCopy = clipBoardLineCopySplit.join(' ');

            // yellow
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] !== ' ' && guess[i] !== internalGreen && guess[i] !== internalYellow)
                    for (let j = 0; j < answerCopy.length; j++) {
                        if (guess[i] === answerCopy[j]) {
                            guess = replaceChar(i, internalRed, guess);
                            answerCopy = replaceChar(j, internalRed, answerCopy);
                            clipBoardLineCopy = replaceChar(i, internalRed, clipBoardLineCopy);
                            break;
                        }
                    }
            }
            paintBoard(clipBoardLineCopy, guessNo.toString());
            clipBoard += `${clipBoardLineCopy}\n`;
            guessNo++;

            if (guess === colorCode) {
                gameOver(true);
            }
            else if (guessNo === numTurns) {
                gameOver(false);
            };
            guess = "";
        }
    }
}

function word(answer) {
    buildBoard(answer, numTurns);
    puzzleName = `${'?'.repeat(answer.length)}le`;
    colorCode = internalGreen.repeat(answer.length);
    clipBoardLine = internalGrey.repeat(answer.length);
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === ' ') {
            puzzleName = replaceChar(i, ' ', puzzleName);
            colorCode = replaceChar(i, ' ', colorCode);
            clipBoardLine = replaceChar(i, ' ', clipBoardLine);
        }
    }
    document.getElementById("title").innerHTML = puzzleName;

    document.addEventListener("keydown", function onPress(event) {
        wordKey(event.key);
    });
}