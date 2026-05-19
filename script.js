const maxGiftMoves = 6;     
let giftMoveCount = 0;      
let envelopeStage = 0; 

// قلوب الخلفية
function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 2 + 3;
    heart.style.setProperty('--duration', duration + 's');
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 300);

// 1. الهدية الهاربة
function handleGiftClick() {
    const giftContainer = document.getElementById('gift-container');
    const btn = giftContainer.querySelector('.open-btn');

    if (giftMoveCount < maxGiftMoves) {
        giftMoveCount++; 
        const randomX = Math.random() * 60 + 20; 
        const randomY = Math.random() * 60 + 20; 

        giftContainer.style.position = 'absolute'; 
        giftContainer.style.transition = 'all 0.3s ease-out'; 
        giftContainer.style.left = randomX + 'vw';
        giftContainer.style.top = randomY + 'vh';
        giftContainer.style.transform = 'translate(-50%, -50%)'; 

        if (giftMoveCount === 1) btn.innerText = "أوبس.. جربي تاني! ";
        if (giftMoveCount === 2) btn.innerText = "لسه شوية.. قربتي اهه ";
        if (giftMoveCount === 3) btn.innerText = "مش بالسهولة دي.. دوسي كمان مرة ";
        if (giftMoveCount === 4) btn.innerText = "يا بنتي اصبري هانت خلاص! ";
        if (giftMoveCount === 5) btn.innerText = "دي آخر مرة بجد خلاص.. وعد! ";
        if (giftMoveCount === maxGiftMoves) btn.innerText = "😍";

    } else {
        giftContainer.style.display = 'none';
        startCakeAnimation();
    }
}

// 🎂 2. تشغيل التورتة وظهور حبال الزينة الربع دائرية
function startCakeAnimation() {
    document.getElementById('cake-container').style.display = 'flex';
    
    document.getElementById('layer-1').classList.add('animate-layer');
    document.getElementById('layer-2').classList.add('animate-layer');
    document.getElementById('layer-3').classList.add('animate-layer');
    document.getElementById('layer-4').classList.add('animate-layer');
    document.getElementById('candle').classList.add('animate-layer');

    // تفعيل حبال الزينة فور اكتمال التورتة
    setTimeout(() => {
        document.getElementById('left-garland').classList.add('active');
        document.getElementById('right-garland').classList.add('active');
        document.getElementById('cake-next-btn').style.display = 'inline-block';
    }, 2400);
}

function goToEnvelope() {
    document.getElementById('cake-container').style.display = 'none';
    document.getElementById('envelope-container').style.display = 'flex';
}

// 💌 3. مرحلة فتح الظرف ورمي الصور
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const hintText = document.querySelector('.hint-text');

    if (envelopeStage === 0) {
        envelopeStage = 1;
        envelope.classList.add('shake', 'torn');
        setTimeout(() => { envelope.classList.remove('shake'); }, 400);
        hintText.innerText = "الفضول قاتلك عارف 😂";
    } 
    else if (envelopeStage === 1) {
        envelopeStage = 2;
        envelope.classList.add('open');
        hintText.innerText = "";
    }
}

function throwFirstPhoto(event) {
    event.stopPropagation(); 
    const step1 = document.getElementById('card-step-1');
    const step2 = document.getElementById('card-step-2');
    const hintText = document.querySelector('.hint-text');
    
    step1.classList.add('throw-left'); 
    if(step1.querySelector('.click-hint')) step1.querySelector('.click-hint').style.display = 'none';
    
    step2.style.display = 'flex'; 
    hintText.innerText = "";
}

function throwSecondPhoto(event) {
    event.stopPropagation();
    const step2 = document.getElementById('card-step-2');
    const hintText = document.querySelector('.hint-text');
    
    step2.classList.add('throw-right'); 
    if(step2.querySelector('.click-hint')) step2.querySelector('.click-hint').style.display = 'none';
    
    hintText.innerText = "كل سنة وأنتِ طيبة وفرحانة دايماً! 💌❤️";
}

function restart() {
    giftMoveCount = 0;
    envelopeStage = 0;
    
    const step1 = document.getElementById('card-step-1');
    const step2 = document.getElementById('card-step-2');
    step1.classList.remove('throw-left');
    step2.classList.remove('throw-right');
    step1.style.display = 'flex';
    step2.style.display = 'none';
    
    document.getElementById('cake-next-btn').style.display = 'none';
    document.getElementById('left-garland').classList.remove('active');
    document.getElementById('right-garland').classList.remove('active');
    
    const cakeLayers = ['layer-1', 'layer-2', 'layer-3', 'layer-4', 'candle'];
    cakeLayers.forEach(id => {
        document.getElementById(id).classList.remove('animate-layer');
    });
    document.getElementById('cake-container').style.display = 'none';

    const giftContainer = document.getElementById('gift-container');
    giftContainer.style.position = 'relative';
    giftContainer.style.left = 'auto';
    giftContainer.style.top = 'auto';
    giftContainer.style.transform = 'none';
    giftContainer.querySelector('.open-btn').innerText = "اضغطي لفتح الهدية ✨";
    
    const envelopeContainer = document.getElementById('envelope-container');
    envelopeContainer.querySelector('.envelope').classList.remove('open', 'torn', 'shake');
    envelopeContainer.querySelector('.hint-text').innerText = "Surprise😍";
    
    envelopeContainer.style.display = 'none';
    giftContainer.style.display = 'block';
}
