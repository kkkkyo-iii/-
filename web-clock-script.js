let remainingTime = 0; // 残り時間（秒）
let timerInterval = null;

let isRunning = false;// タイマーが現在実行中かを示す
let isPlaying = false;// タイマーのサウンドが実行中かを示す

let currentMainSound = null;
let currentTrialSound = null;

const headDisplay = document.getElementById('titleDisplay')
const usefulExp = document.getElementById('usefulExpression');

const TMdisplay = document.getElementById('timerDisplay');
const startstopBtn = document.getElementById("startstop");
const resetBtn = document.getElementById("reset");

const tenMinBtn = document.getElementById('tenMin');
const oneMinBtn = document.getElementById('oneMin');
const tenSecBtn = document.getElementById('tenSec');


// 共通の終了音（アラーム）
const catSeBtn = document.getElementById('catSound');
const birdSeBtn = document.getElementById('birdSound');
const natureSeBtn = document.getElementById('natureSound');
const otherSeBtn = document.getElementById('otherSound');
const soundButtons = [catSeBtn, birdSeBtn, natureSeBtn, otherSeBtn];

const catTrialBtn = document.getElementById('catTrial');
const birdTrialBtn = document.getElementById('birdTrial');
const natureTrialBtn = document.getElementById('natureTrial');
const otherTrialBtn = document.getElementById('otherTrial');


const audioCat = [
  new Audio('cat-sounds/猫の鳴き声1.mp3'),
  new Audio('cat-sounds/猫の鳴き声2.mp3'),
  new Audio('cat-sounds/猫ニャーニャー.mp3'),
  new Audio('cat-sounds/猫ニャーニャー_2.mp3'),
  new Audio('cat-sounds/猫ニャーニャー_3.mp3'),
  new Audio('cat-sounds/リアルな猫の鳴き声_3.mp3')
];

const audioBird = [
  new Audio('bird-sounds/モスケミソサザイのさえずり.mp3'),
  new Audio('bird-sounds/カッコウの鳴き声.mp3'),
  new Audio('bird-sounds/オナガ.mp3'),
  new Audio('bird-sounds/キジバトのさえずり1.mp3'),
  new Audio('bird-sounds/キビタキのさえずり.mp3'),
  new Audio('bird-sounds/スズメが鳴く朝.mp3')
];

const audioNature = [
  new Audio('nature-sounds/fall_riverside_dawn.mp3'),
  new Audio('nature-sounds/たき火.mp3'),
  new Audio('nature-sounds/海岸1.mp3'),
  new Audio('nature-sounds/激しい雨.mp3'),
  new Audio('nature-sounds/風-そよ風.mp3'),
  new Audio('nature-sounds/風に揺れる草木2.mp3'),
  new Audio('nature-sounds/木枯らし・風に吹かれる落ち葉.mp3')
];

const audioOther = [
  new Audio('other-sounds/目玉焼きを焼く.mp3'),
  new Audio('other-sounds/缶を開ける.mp3'),
  new Audio('other-sounds/カーテンを開ける (1).mp3'),
  new Audio('other-sounds/缶ジュースを開ける2.mp3'),
  new Audio('other-sounds/焼きそばを焼く1.mp3'),
  new Audio('other-sounds/ふすまを閉める.mp3'),
];

const categorySoundsMap = {
  'cat': audioCat,
  'bird': audioBird,
  'nature': audioNature,
  'other': audioOther
};

function updatetitleDisplay() {

  headDisplay.textContent = formatTime(remainingTime);
};

function updateDisplayContent() {

  TMdisplay.textContent = formatTime(remainingTime);
};


function timeAdd(seconds) {

  remainingTime += seconds;
  updateDisplayContent();
};


// 時間を表示形式に整える関数
function formatTime(seconds) {

  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let sec = seconds % 60;

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(sec).padStart(2, '0')
  ].join(':');
};

// 音声選択ボタンの背景を変更する関数
function updateActiveSoundButton(activeButtonElement) {

  soundButtons.forEach(button => {
    if (button) {
      if (button === activeButtonElement) {

        button.classList.add('active-sound');
        button.classList.remove('inactive-sound');

      } else {
        button.classList.remove('active-sound');
        button.classList.add('inactive-sound');
      }
    }
  });
}

// 音声選択ボタンの背景をリセットする関数
function resetSoundButton() {

  soundButtons.forEach(button => {
    if (button) {
      button.classList.remove('active-sound');
      button.classList.remove('inactive-sound');
    }
  });
  currentMainSound = null;
}

function deleteButton() {
  tenMinBtn.style.display = 'none';
  oneMinBtn.style.display = 'none';
  tenSecBtn.style.display = 'none';
  usefulExp.style.display = 'none';
  catTrialBtn.style.display = 'none';
  birdTrialBtn.style.display = 'none';
  natureTrialBtn.style.display = 'none';
  otherTrialBtn.style.display = 'none';
}

function reviveTimeButton() {
  tenMinBtn.style.display = 'inline-block';
  oneMinBtn.style.display = 'inline-block';
  tenSecBtn.style.display = 'inline-block';
}


function displayImage(imageSource) { // 背景画像を選んだサウンド音と関連したものにする関数

  TMdisplay.style.backgroundImage = `url("${imageSource}")`;
  TMdisplay.style.backgroundSize = 'contain';
  TMdisplay.style.backgroundPosition = 'center';
}

function playRandomSound(category) {

  stopAllSounds();
  const sounds = category;
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const currentSE = sounds[randomIndex];

  if (isRunning) {
    currentSE.loop = true;
    currentSE.play();
  }
  else {
    currentSE.play();
    currentSE = null;
  }
};

function stopAllSounds() {

  Object.values(categorySoundsMap).forEach(soundsArray => {
    soundsArray.forEach(audio => {
      if (audio && typeof audio.pause === 'function') {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  });
  isPlaying = false;
}

function timeDiminishing() {

  timerInterval = setInterval(() => {
    remainingTime -= 1
    updateDisplayContent();
    updatetitleDisplay();
    if (remainingTime == 0) {
      isPlaying = true;
      clearInterval(timerInterval);
      playRandomSound(currentMainSound);
      isRunning = true;
      return
    }
  }, 1000); // 1秒ごとに実行

}

tenMinBtn.addEventListener('click', () => {
  if (!isRunning) {
    timeAdd(600);
  }
});

oneMinBtn.addEventListener('click', () => {
  if (!isRunning) {
    timeAdd(60); 
  }
});

tenSecBtn.addEventListener('click', () => {
  if (!isRunning) {
    timeAdd(10); 
  }
});

//時間を初期化する処理
resetBtn.addEventListener('click', () => {

  clearInterval(timerInterval);
  stopAllSounds();
  isRunning = false;
  currentTrialSound = null;
  currentMainSound = null;
  remainingTime = 0;


  updateDisplayContent();
  headDisplay.textContent = 'やすらぎタイマー';
  startstopBtn.textContent = 'スタート';
  startstopBtn.style.backgroundColor = '#007bff';
  TMdisplay.style.backgroundImage = 'none';
  reviveTimeButton();
  catTrialBtn.style.display = 'inline-block';
  birdTrialBtn.style.display = 'inline-block';
  natureTrialBtn.style.display = 'inline-block';
  otherTrialBtn.style.display = 'inline-block';
  usefulExp.style.display = 'block';
  resetSoundButton();
});


startstopBtn.addEventListener('click', () => {
  if (isRunning) {

    clearInterval(timerInterval);
    startstopBtn.textContent = 'スタート';
    startstopBtn.style.backgroundColor = '#007bff';
    reviveTimeButton();
    isRunning = false;
    stopAllSounds();

    if (isPlaying) {
      stopAllSounds();
      isPlaying = false;
    }
  }

  else //タイマーが止まっているとき
  {
    if (remainingTime === 0) {
      alert('時間を設定してください！');
      return;
    }

    else if (currentMainSound == null) {
      alert('音を設定してください！');
      return;
    }

    stopAllSounds();
    currentTrialSound = null;
    timeDiminishing();
    startstopBtn.textContent = 'ストップ';
    startstopBtn.style.backgroundColor = '#f44336';
    deleteButton();
    isRunning = true;
  }
});


catSeBtn.addEventListener('click', () => {
  if (!isRunning) {
    displayImage('sound-background/cutiestCat.png');
    updateActiveSoundButton(catSeBtn);
    currentMainSound = audioCat;
  }

});

birdSeBtn.addEventListener('click', () => {
  if (!isRunning) {
    displayImage('sound-background/cutiestBird.jpg');
    updateActiveSoundButton(birdSeBtn);
    currentMainSound = audioBird;
  }
});

natureSeBtn.addEventListener('click', () => {
  if (!isRunning) {
    displayImage('sound-background/relaxNature.jpg');
    updateActiveSoundButton(natureSeBtn);
    currentMainSound = audioNature;
  }
});


otherSeBtn.addEventListener('click', () => {
  if (!isRunning) {
    displayImage('sound-background/otherSound.jpg');
    updateActiveSoundButton(otherSeBtn);
    currentMainSound = audioOther;
  }
});

catTrialBtn.addEventListener('click', () => {
  if (!isRunning) {
    stopAllSounds();
    currentTrialSound = audioCat;
    playRandomSound(currentTrialSound);
  }
}
)

birdTrialBtn.addEventListener('click', () => {
  if (!isRunning) {
    stopAllSounds();
    currentTrialSound = audioBird;
    playRandomSound(currentTrialSound);
  }

}
)
natureTrialBtn.addEventListener('click', () => {
  if (!isRunning) {
    stopAllSounds();
    currentTrialSound = audioNature;
    playRandomSound(currentTrialSound);
  }

}
)
otherTrialBtn.addEventListener('click', () => {
  if (!isRunning) {
    stopAllSounds();
    currentTrialSound = audioOther;
    playRandomSound(currentTrialSound);
  }

}
)


reviveTimeButton();
usefulExp.style.display = 'block';
catTrialBtn.style.display = 'inline-block';
birdTrialBtn.style.display = 'inline-block';
natureTrialBtn.style.display = 'inline-block';
otherTrialBtn.style.display = 'inline-block';
updateDisplayContent();

