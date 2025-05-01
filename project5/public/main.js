let userId = localStorage.getItem('dinoId')
let dino = {}

function randomType() {
    const types = ['cute', 'fierce', 'sleepy']
    return types[Math.floor(Math.random() * types.length)]
}

// Load dino on page load
window.onload = () => {
    fetch(`/loadDino?id=${userId || ''}`)
        .then(res => res.json())
        .then(data => {
            if (!data.id) {
                // First-time visitor
                userId = crypto.randomUUID()
                dino = {
                    id: userId,
                    type: randomType(),
                    stage: 1,
                    energy: 50,
                    happiness: 50
                }
                localStorage.setItem('dinoId', userId)
                saveDino()
            } else {
                userId = data.id
                dino = data
            }
            updateUI()
        })
}

function updateUI() {
    document.getElementById('dinoDisplay').innerText = getDinoEmoji()
    document.getElementById('type').innerText = dino.type
    document.getElementById('stage').innerText = dino.stage
    document.getElementById('energy').innerText = dino.energy
    document.getElementById('happiness').innerText = dino.happiness
}

function getDinoEmoji() {
    if (dino.type === 'cute') return '🦕'
    if (dino.type === 'fierce') return '🦖'
    return '🛌' // sleepy
}

function feedDino() {
    dino.energy += 10
    dino.happiness += 2
    maybeEvolve()
    saveDino()
    updateUI()
}

function playWithDino() {
    dino.happiness += 10
    dino.energy -= 5
    maybeEvolve()
    saveDino()
    updateUI()
}

function maybeEvolve() {
    if (dino.energy > 80 && dino.happiness > 80 && dino.stage < 3) {
        dino.stage += 1
    }
}

function saveDino() {
    const params = new URLSearchParams(dino).toString()
    fetch(`/saveDino?${params}`, { method: 'POST' })
}

function setup() {
    let canvas = createCanvas(300, 100)
    canvas.parent('stats') // attach to your stat section
}

function draw() {
    background(255)

    // Draw energy bar
    fill('#4CAF50')
    rect(20, 20, dino.energy * 2, 20)
    fill(0)
    textSize(12)
    text('Energy', 20, 15)

    // Draw happiness bar
    fill('#FF9800')
    rect(20, 60, dino.happiness * 2, 20)
    fill(0)
    text('Happiness', 20, 55)
}
