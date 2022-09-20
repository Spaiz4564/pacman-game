'use strict'

const PACMAN = '🐱‍👤';
var gPacman;
var foodCount = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === SUPERFOOD) {
        if (nextCell === SUPERFOOD && gPacman.isSuper) {
            return false
        } else {

            gPacman.isSuper = true
            for (let i = 0; i < gGhosts.length; i++) {
                gGhosts[i].color = "#ffcc66"
            }

            setTimeout(() => {
                gPacman.isSuper = false
                for (let i = 0; i < gGhosts.length; i++) {
                    gGhosts[i].color = getRandomColor()

                }
                for (let i = 0; i < gDeadGhosts.length; i++) {
                    gGhosts.push(gDeadGhosts[i])
                }

            }, 5000)
        }
    }

    if (nextCell === FOOD) {
        foodCount += 1
        updateScore(1)
        if (foodCount === 56) {
            gameWon()
        }

    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for (let k = 0; k < gGhosts.length; k++) {
                const currGhost = gGhosts[k];
                if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
                    var deadGhost = gGhosts.splice(k, 1)[0]
                    gDeadGhosts.push(deadGhost)
                }
            }
            console.log('is super');
        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}