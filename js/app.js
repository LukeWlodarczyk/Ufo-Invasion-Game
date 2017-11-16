document.addEventListener("DOMContentLoaded", event => {
  const ufos = document.querySelectorAll('.ufo');
  const cows = document.querySelectorAll('.cow');
  const wrappers = document.querySelectorAll('.wrapper');
  const startBtn = document.querySelector('button');
  const easyBtn = document.querySelector('#easy');
  const mediumBtn = document.querySelector('#medium');
  const hardBtn = document.querySelector('#hard');
  const scoreBox = document.querySelector('.score');
  let minNumAnimals = 3;
  let abducted = [];
  let lastCow;
  let score = 0;
  let bestScore = 0;
  let rndNum;
  let interval = null;
  easyBtn.addEventListener('click', easyLevel);
  mediumBtn.addEventListener('click', mediumLevel);
  hardBtn.addEventListener('click', hardLevel);
  startBtn.addEventListener('click', function() {
    startAbduction();
  })

  function easyLevel() {
    wrappers.forEach(w => {
      w.classList.remove('medium');
      w.classList.remove('hard');
    })
    bestScore = 0;
    minNumAnimals = 3;
    startAbduction();
  }

  function mediumLevel() {
    wrappers.forEach(w => {
      w.classList.remove('hard');
      w.classList.add('medium');
    })
    bestScore = 0;
    minNumAnimals = 4;
    startAbduction();
  }

  function hardLevel() {
    wrappers.forEach(w => {
      w.classList.add('hard');
    })
    bestScore = 0;
    minNumAnimals = 5;
    startAbduction();
  }


  function startAbduction() {
    clearInterval(interval);
    wrappers.forEach(w => {
      w.classList.remove('abduction');
    })
    cows.forEach(cow => {
      cow.classList.remove('visible');
    })
    cows.forEach(cow => {
      cow.classList.add('visible');
    })
    abducted = [];
    score = 0;
    scoreBox.textContent = `Min animals: ${minNumAnimals} / Score: ${score} / Best: ${bestScore}`;

    interval = setInterval(abduct, 1300);
    let timeout = null;

    function abduct() {
      if (abducted.length === (cows.length - minNumAnimals)) {
        console.log('clear')
        clearInterval(interval);
        return;
      }

      rndNum = Math.floor(Math.random() * cows.length)
      if (abducted.includes(rndNum) || rndNum === lastCow) {
        console.log('include')
        abduct();
        return;
      }
      lastCow = rndNum
      cows[rndNum].parentElement.classList.add('abduction');
      console.log('addClass')
      abducted.push(rndNum);
    }


  }

  ufos.forEach(ufo => ufo.addEventListener('click', shoot));

  function shoot() {
    score++;
    (score > bestScore) ? bestScore = score: bestScore = bestScore;
    scoreBox.textContent = `Min animals: ${minNumAnimals} / Score: ${score} / Best: ${bestScore}`;
    this.parentElement.classList.remove('abduction');
    this.classList.add('hit');
    let index = abducted.indexOf(rndNum);
    abducted.splice(index, 1);
    setTimeout(() => {
      this.classList.remove('hit');
    }, 650)
  }
});
