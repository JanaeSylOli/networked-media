let userId = localStorage.getItem('dinoId')
let dino = {}
let animatedEnergy = 0
let animatedHappiness = 0
let animatedBoredom = 0
let lifetime = 0

function randomType() {
    const types = ['cute', 'fierce', 'sleepy']
    return types[Math.floor(Math.random() * types.length)]
}

function randomColor() {
    const colors = ['green', 'blue', 'pink', 'gold', 'purple']
    return colors[Math.floor(Math.random() * colors.length)]
}

// Load dino on page load
window.onload = () => {
    fetch(`/loadDino?id=${userId || ''}`)
        .then(res => res.json())
        .then(data => {
            if (!data.id) {
                userId = crypto.randomUUID()
                dino = {
                    id: userId,
                    type: randomType(),
                    color: randomColor(),
                    stage: 1,
                    energy: 10,
                    happiness: 5,
                    boredom: 20,
                    dead: false
                }
                localStorage.setItem('dinoId', userId)
                saveDino()
            } else {
                userId = data.id
                dino = {
                    ...data,
                    boredom: data.boredom ?? 0,
                    dead: data.dead ?? false,
                    color: data.color ?? randomColor()
                }
            }
            updateUI()

            // Decay + time evolution loop
            setInterval(() => {
                if (!dino.dead) {
                    dino.energy = Math.max(0, dino.energy - 1)
                    dino.happiness = Math.max(0, dino.happiness - 1)
                    dino.boredom = Math.min(100, dino.boredom + 1)
                    lifetime += 10

                    // Death check
                    if (dino.energy <= 0 && dino.happiness <= 0 && dino.boredom >= 100) {
                        dino.dead = true
                    }

                    // Evolve over time
                    if (lifetime > 60 && dino.stage < 3) {
                        dino.stage += 1
                    }

                    maybeEvolve()
                    updateUI()
                    saveDino()
                }
            }, 10000)
        })
}

function updateUI() {
    const dinoDisplay = document.getElementById('dinoDisplay')
    dinoDisplay.innerHTML = ''
    const img = document.createElement('img')
    img.src = getDinoImagePath()
    img.alt = 'dino'
    img.style.width = '150px'
    dinoDisplay.appendChild(img)

    document.getElementById('type').innerText = dino.type
    document.getElementById('stage').innerText = dino.stage
    document.getElementById('energy').innerText = dino.energy
    document.getElementById('happiness').innerText = dino.happiness
}

function getDinoImagePath() {
    if (dino.dead) return `/assets/dinos/${dino.type}_${dino.color}_dead.png`

    let mood = 'happy'
    if (dino.energy < 30) mood = 'tired'
    else if (dino.boredom > 70) mood = 'bored'

    return `/assets/dinos/${dino.color}_${mood}.png`
}

function feedDino() {
    if (dino.dead) return
    dino.energy = Math.min(100, dino.energy + 10)
    dino.happiness = Math.min(100, dino.happiness + 2)
    dino.boredom = Math.max(0, dino.boredom - 5)
    maybeEvolve()
    saveDino()
    updateUI()
}

function playWithDino() {
    if (dino.dead) return
    dino.happiness = Math.min(100, dino.happiness + 10)
    dino.energy = Math.max(0, dino.energy - 5)
    dino.boredom = Math.max(0, dino.boredom - 10)
    maybeEvolve()
    saveDino()
    updateUI()
}

function restDino() {
    if (dino.dead) return
    dino.energy = Math.min(100, dino.energy + 15)
    dino.happiness = Math.min(100, dino.happiness + 5)
    dino.boredom = Math.min(100, dino.boredom + 5)
    maybeEvolve()
    saveDino()
    updateUI()
}

function maybeEvolve() {
    if (dino.energy > 80 && dino.happiness > 80 && dino.stage < 3 && !dino.dead) {
        dino.stage += 1
    }
}

function saveDino() {
    const params = new URLSearchParams(dino).toString()
    fetch(`/saveDino?${params}`, { method: 'POST' })
}

// ==== p5.js visual meters ====

function setup() {
    let canvas = createCanvas(300, 140)
    canvas.parent('stats')
}

function draw() {
    clear() // make canvas background transparent

    animatedEnergy = lerp(animatedEnergy, dino.energy, 0.1)
    animatedHappiness = lerp(animatedHappiness, dino.happiness, 0.1)
    animatedBoredom = lerp(animatedBoredom, dino.boredom, 0.1)

    fill('#4CAF50')
    rect(20, 20, animatedEnergy * 2, 20)
    fill(0)
    textSize(12)
    text('Energy', 20, 15)

    fill('#FF9800')
    rect(20, 60, animatedHappiness * 2, 20)
    fill(0)
    text('Happiness', 20, 55)

    fill('#9C27B0')
    rect(20, 100, animatedBoredom * 2, 20)
    fill(0)
    text('Boredom', 20, 95)
}
