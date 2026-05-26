/* ==========================================================================
   ROMANTIC APOLOGY WEBSITE INTERACTIVE SCRIPT — CUTE REDESIGN
   Synthesized Audio (Meows & Pops) · Mobile Haptics · Heart & Bubble Physics
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. Synthesized Audio (Web Audio API)
// --------------------------------------------------------------------------
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

/**
 * Synthesizes cute sound effects dynamically to guarantee offline zero-asset playback.
 */
function playSound(type) {
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Resume context if suspended (browser security autoplay policies)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'bubble') {
      // Juicy high-speed bubble pop sound
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      // Pitch sweeps rapidly from low to high to mimic a bubble expanding and snapping
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.09);

    } else if (type === 'meow') {
      // Adorable Synthesized Kitten "Mew" call!
      // Uses additive synthesis with high triangle wave, sliding pitch, and vibrato.
      const carrier = audioCtx.createOscillator();
      const modulator = audioCtx.createOscillator();
      const modulationGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();
      const gainNode = audioCtx.createGain();

      carrier.type = 'triangle';
      modulator.type = 'sine';

      // Mew starting pitch, sweeping up, then falling down
      const baseFreq = 780; // High baby kitten pitch
      carrier.frequency.setValueAtTime(baseFreq, now);
      // Sweeps up to peak "meee-"
      carrier.frequency.exponentialRampToValueAtTime(1050, now + 0.12);
      // Falls off to "-ow"
      carrier.frequency.exponentialRampToValueAtTime(680, now + 0.38);

      // Vibrato frequency (rapid cute wiggle)
      modulator.frequency.setValueAtTime(6, now);
      modulationGain.gain.setValueAtTime(18, now);

      // Cute bandpass vocal chamber centering around formants
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(1000, now + 0.38);
      filter.Q.setValueAtTime(1.8, now);

      // Volume envelope: soft start, swell, gentle taper
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.18, now + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      // Connections
      modulator.connect(modulationGain);
      modulationGain.connect(carrier.frequency); // frequency modulation

      carrier.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      modulator.start(now);
      carrier.start(now);

      modulator.stop(now + 0.4);
      carrier.stop(now + 0.4);

    } else if (type === 'harp') {
      // Shimmering fairy pentatonic chime arpeggio
      const freqs = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // E4, G4, C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        
        gainNode.gain.setValueAtTime(0, now + idx * 0.07);
        gainNode.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.2);
      });

    } else if (type === 'bell') {
      // Shimmering sweet high chime for hearts
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);
      
      gainNode.gain.setValueAtTime(0.14, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.3);

    } else if (type === 'stamp') {
      // Wood-like double thud with quick damping
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.35, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (e) {
    console.warn("Web Audio synthesis error:", e);
  }
}

// --------------------------------------------------------------------------
// 2. Mobile Haptic Vibration
// --------------------------------------------------------------------------
/**
 * Safely triggers vibration patterns on mobile devices.
 */
function triggerVibration(pattern) {
  try {
    if ('vibrate' in navigator) {
      if (pattern === 'light') {
        navigator.vibrate(40); // 40ms soft tick
      } else if (pattern === 'double') {
        navigator.vibrate([30, 40, 30]); // Playful double tap
      } else if (pattern === 'stamp') {
        navigator.vibrate([60, 30, 40]); // Satisfying stamp impact
      } else if (pattern === 'success') {
        navigator.vibrate([100, 50, 100, 50, 250]); // Joyful rhythm flourish
      }
    }
  } catch (e) {
    console.log("Vibration API blocked or not supported on this platform.");
  }
}

// --------------------------------------------------------------------------
// 3. Canvas Particles Engine (Hearts + Glossy Bubbles)
// --------------------------------------------------------------------------
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let maxParticles = 50; // Balanced for smooth mobile frames

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
  resizeCanvas();
  if (typeof resizeCatcherCanvas === 'function') {
    resizeCatcherCanvas();
  }
});
resizeCanvas();

class CuteParticle {
  constructor(isExplosion = false, x = null, y = null, type = null) {
    this.isExplosion = isExplosion;
    this.x = x !== null ? x : Math.random() * canvas.width;
    this.y = y !== null ? y : (isExplosion ? y : canvas.height + 40);
    
    // Choose particle type (heart or bubble)
    this.type = type !== null ? type : (Math.random() > 0.45 ? 'heart' : 'bubble');
    
    // Size distribution
    this.size = Math.random() * (isExplosion ? 16 : 14) + 8;
    
    // Speeds & Forces
    this.speedX = isExplosion ? (Math.random() - 0.5) * 11 : (Math.random() - 0.5) * 1.8;
    this.speedY = isExplosion ? (Math.random() - 0.75) * 12 : -(Math.random() * 1.8 + 0.8);
    this.gravity = isExplosion ? 0.22 : 0;
    
    // Aesthetics
    const heartHues = [340, 350, 355, 10, 325]; // Romantic pastel pinks, peaches, light purple
    this.hue = heartHues[Math.floor(Math.random() * heartHues.length)];
    this.alpha = Math.random() * 0.4 + 0.4;
    this.fade = isExplosion ? Math.random() * 0.015 + 0.01 : Math.random() * 0.002 + 0.001;
    this.swaySpeed = Math.random() * 0.02 + 0.006;
    this.swayAmount = Math.random() * 2 + 1;
    this.swayOffset = Math.random() * 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    
    if (!this.isExplosion) {
      // Horizontal swaying movement
      this.x += Math.sin(this.swayOffset) * this.swayAmount * 0.6;
      this.swayOffset += this.swaySpeed;
    }
    
    this.alpha -= this.fade;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    
    if (this.type === 'heart') {
      // 💖 Symmetrical Bezier Heart Drawing
      ctx.fillStyle = `hsl(${this.hue}, 95%, 78%)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${this.hue}, 90%, 70%)`;
      
      ctx.beginPath();
      const x = this.x;
      const y = this.y;
      const size = this.size;
      
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.7, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size * 0.5, y + size * 0.7, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.closePath();
      ctx.fill();

    } else {
      // 🫧 Glossy pastel bubble drawing
      ctx.fillStyle = 'rgba(255, 230, 238, 0.4)';
      ctx.strokeStyle = 'rgba(255, 122, 144, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 204, 213, 0.5)';
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Shiny highlight reflection
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// Populate initial ambient particles
function initParticles() {
  for (let i = 0; i < maxParticles; i++) {
    const p = new CuteParticle();
    p.y = Math.random() * canvas.height; // scatter across heights
    particles.push(p);
  }
}
initParticles();

// Trigger a splash/fountain of particles
function explodeParticles(count, startX, startY, forcedType = null) {
  for (let i = 0; i < count; i++) {
    particles.push(new CuteParticle(true, startX, startY, forcedType));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    
    // Cull faded/offscreen particles
    if (p.alpha <= 0 || p.y < -50 || p.x < -50 || p.x > canvas.width + 50) {
      particles.splice(i, 1);
      
      // Top up ambient flow if culled
      if (!p.isExplosion && particles.filter(pt => !pt.isExplosion).length < maxParticles) {
        particles.push(new CuteParticle());
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);

// --------------------------------------------------------------------------
// 4. Stage 1: Envelope Opening Logic
// --------------------------------------------------------------------------
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const overlay = document.getElementById('envelopeOverlay');
  const mainContainer = document.getElementById('mainContainer');
  
  if (envelope.classList.contains('open')) return;
  
  // 1. Play magical arpeggio & trigger haptics
  playSound('harp');
  triggerVibration('success');
  
  // 2. Open 3D flap
  envelope.classList.add('open');
  
  // 3. Fade out overlay and bring in cute dashboard
  setTimeout(() => {
    overlay.classList.add('fade-out');
    mainContainer.style.display = 'flex';
    
    // Confetti splash from the center
    explodeParticles(45, window.innerWidth / 2, window.innerHeight / 2);
    
    // Delayed resize to allow browser styling and layout reflow to complete
    setTimeout(() => {
      if (typeof resizeCatcherCanvas === 'function') {
        resizeCatcherCanvas();
      }
    }, 150);
    
    setTimeout(() => {
      mainContainer.classList.add('fade-in');
    }, 80);
  }, 1300);
}

// --------------------------------------------------------------------------
// 5. Widget 1: Love Note Jar
// --------------------------------------------------------------------------
const loveNotes = [
  "Every single mile between us is just proof of how strong and special our love is. You are worth every count down. 🌌💖",
  "I count down the hours and days until I can finally hold your real hand instead of just holding my phone. 📱💞",
  "Even though we look up at different parts of the sky, our hearts beat in perfect harmony. 🐾💕",
  "I love how we can talk for hours and hours and never run out of sweet things to say. You make miles vanish. 💬✨",
  "Your smile on my screen is the absolute best part of my day. It completely lights up my entire life. 🤳🌸",
  "No matter how many miles separate us, you are my home, my safest place, and my favorite adventure. 🐾🏡",
  "Your warm, sweet voice is my favorite sound in the world, and it completely melts my heart every single time. 📞🍯",
  "The thought of the moment we finally reunite and I can hug you in person is what keeps me going. ✈️👩‍❤️‍👨"
];

let remainingNotes = [...loveNotes];

function drawLoveNote() {
  // Play sound & vibration
  playSound('meow');
  triggerVibration('light');
  
  // Add quick visual squash & stretch animation to the clay jar
  const jar = document.querySelector('.glass-jar');
  jar.style.transform = 'scale(0.85) rotate(8deg)';
  
  setTimeout(() => {
    jar.style.transform = 'scale(1.1) rotate(-5deg)';
    setTimeout(() => {
      jar.style.transform = '';
    }, 200);
  }, 150);
  
  // Emit bubble splash out of the jar opening
  const jarRect = jar.getBoundingClientRect();
  explodeParticles(8, jarRect.left + 60, jarRect.top + 30, 'bubble');

  // Refill deck if empty
  if (remainingNotes.length === 0) {
    remainingNotes = [...loveNotes];
  }
  
  // Draw random unique note
  const randIndex = Math.floor(Math.random() * remainingNotes.length);
  const selectedNote = remainingNotes.splice(randIndex, 1)[0];
  
  // Display note in modal
  const noteModal = document.getElementById('noteModal');
  const noteModalText = document.getElementById('noteModalText');
  noteModalText.textContent = selectedNote;
  
  setTimeout(() => {
    noteModal.classList.add('open');
  }, 220);

  // Update prompt text
  const jarPrompt = document.querySelector('.jar-tap-prompt');
  jarPrompt.textContent = "Pull Another Note! 💌";
}

function closeNoteModal() {
  playSound('bubble');
  const noteModal = document.getElementById('noteModal');
  noteModal.classList.remove('open');
}

// --------------------------------------------------------------------------
// 6. Widget 2: Playful Forgiveness Runaway Button
// --------------------------------------------------------------------------
let isForgiven = false;

function runawayButton(btn) {
  if (isForgiven) return;
  
  // Play rapid cute escaping bubble
  playSound('bubble');
  triggerVibration('double');
  
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;
  
  // Viewport boundaries
  const maxX = window.innerWidth - btnWidth - 40;
  const maxY = window.innerHeight - btnHeight - 40;
  
  // Generate random coordinate locations
  const newX = Math.max(20, Math.random() * maxX);
  const newY = Math.max(20, Math.random() * maxY);
  
  // Snap position absolutely
  btn.style.position = 'fixed';
  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;
  
  // Fun wiggling text prompts
  const prompts = ["Nope! 😜", "Try again! 🏃‍♀️", "Too slow! 🐾", "Click YES! 💕", "Over here! 🤫", "Catch me! 🐈"];
  btn.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  
  // Bubble splash near escaping button
  const btnRect = btn.getBoundingClientRect();
  explodeParticles(6, btnRect.left + btnWidth/2, btnRect.top + btnHeight/2, 'bubble');
}

// --------------------------------------------------------------------------
// 7. Celebration Screen Success
// --------------------------------------------------------------------------
function forgiveSuccess() {
  isForgiven = true;
  
  // Play magical harp & long vibration
  playSound('harp');
  triggerVibration('success');
  
  // Hide runaway button
  const btnNo = document.getElementById('btnNo');
  btnNo.style.display = 'none';
  
  // Giant center confetti explosion
  explodeParticles(90, window.innerWidth / 2, window.innerHeight / 2);
  
  // Launch success overlay modal
  const successModal = document.getElementById('successModal');
  setTimeout(() => {
    successModal.classList.add('open');
  }, 250);
}

function closeSuccessModal() {
  playSound('bubble');
  const successModal = document.getElementById('successModal');
  successModal.classList.remove('open');
}

// --------------------------------------------------------------------------
// 8. Coupon Stamp System
// --------------------------------------------------------------------------
function redeemCoupon(couponId) {
  const coupon = document.getElementById(couponId);
  
  if (coupon.classList.contains('redeemed')) return;
  
  // Play stamp & trigger vibration
  playSound('stamp');
  triggerVibration('stamp');
  
  // Redeem visually
  coupon.classList.add('redeemed');
  
  // Coupon explosion particles
  const couponRect = coupon.getBoundingClientRect();
  explodeParticles(15, couponRect.left + couponRect.width/2, couponRect.top + couponRect.height/2);
}

// --------------------------------------------------------------------------
// 9. "Catch My Love!" Catcher Game Logic
// --------------------------------------------------------------------------
let gameScore = 0;
let isCatcherGameActive = false;
let gameItems = [];
let catcherX = 150;
let catcherY = 320;
const catcherWidth = 84;
const catcherHeight = 44;
let targetCatcherX = 150;
let animationFrameId = null;
let lastSpawnTime = 0;
const spawnInterval = 800; // spawn items every 800ms
let activeMove = null;

const itemTypes = [
  { char: '🧴', type: 'skincare', points: 5, weight: 0.15 },
  { char: '🎭', type: 'skincare', points: 5, weight: 0.15 },
  { char: '💄', type: 'skincare', points: 5, weight: 0.10 },
  { char: '🧪', type: 'skincare', points: 5, weight: 0.10 },
  { char: '🐱', type: 'cat', points: 5, weight: 0.25 },
  { char: '💖', type: 'heart', points: 5, weight: 0.15 },
  { char: '💝', type: 'heart', points: 5, weight: 0.10 }
];

let catcherCanvas = document.getElementById('catcherCanvas');
let catcherCtx = catcherCanvas ? catcherCanvas.getContext('2d') : null;

function resizeCatcherCanvas() {
  if (!catcherCanvas) {
    catcherCanvas = document.getElementById('catcherCanvas');
    if (!catcherCanvas) return;
    catcherCtx = catcherCanvas.getContext('2d');
  }
  
  let w = catcherCanvas.clientWidth;
  let h = catcherCanvas.clientHeight;
  
  // Reflow fallback: if container is display none initially, get bounding client rect or fallback
  if (w === 0 || h === 0) {
    const rect = catcherCanvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
  }
  
  if (w === 0) w = 320;
  if (h === 0) h = 350;
  
  catcherCanvas.width = w;
  catcherCanvas.height = h;
  catcherY = h - 35;
  
  if (!isCatcherGameActive && gameScore === 0) {
    catcherX = w / 2;
    targetCatcherX = w / 2;
    drawStartScene();
  }
}

function drawStartScene() {
  if (!catcherCanvas) return;
  catcherCtx.clearRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  const grad = catcherCtx.createLinearGradient(0, 0, 0, catcherCanvas.height);
  grad.addColorStop(0, '#fffbfd');
  grad.addColorStop(1, '#ffeef2');
  catcherCtx.fillStyle = grad;
  catcherCtx.fillRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  drawCatcher(catcherCtx, catcherCanvas.width / 2, catcherCanvas.height - 35);
}

class FallingItem {
  constructor(canvasWidth) {
    const rand = Math.random();
    let cumulative = 0;
    let selectedType = itemTypes[itemTypes.length - 1];
    for (const item of itemTypes) {
      cumulative += item.weight;
      if (rand <= cumulative) {
        selectedType = item;
        break;
      }
    }
    
    this.char = selectedType.char;
    this.type = selectedType.type;
    this.points = selectedType.points;
    this.size = 28;
    this.x = Math.random() * (canvasWidth - 50) + 25;
    this.y = -30;
    this.speedY = Math.random() * 1.8 + 2.2; // Speed varies for fun dynamics
    this.angle = Math.random() * Math.PI * 2;
    this.spinSpeed = (Math.random() - 0.5) * 0.04;
  }
  
  update() {
    this.y += this.speedY;
    this.angle += this.spinSpeed;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (this.type === 'heart') {
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 77, 109, 0.6)';
    } else if (this.type === 'cat') {
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 171, 145, 0.5)';
    }
    
    ctx.fillText(this.char, 0, 0);
    ctx.restore();
  }
}

function drawCatcher(ctx, x, y) {
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(255, 122, 144, 0.4)';
  
  // Left Ear
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ff7a90';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x - 28, y - 8);
  ctx.lineTo(x - 38, y - 28);
  ctx.lineTo(x - 18, y - 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Inner Left Ear
  ctx.fillStyle = '#ffccd5';
  ctx.beginPath();
  ctx.moveTo(x - 27, y - 9);
  ctx.lineTo(x - 34, y - 23);
  ctx.lineTo(x - 20, y - 12);
  ctx.closePath();
  ctx.fill();
  
  // Right Ear
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x + 28, y - 8);
  ctx.lineTo(x + 38, y - 28);
  ctx.lineTo(x + 18, y - 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Inner Right Ear
  ctx.fillStyle = '#ffccd5';
  ctx.beginPath();
  ctx.moveTo(x + 27, y - 9);
  ctx.lineTo(x + 34, y - 23);
  ctx.lineTo(x + 20, y - 12);
  ctx.closePath();
  ctx.fill();
  
  // Basket tub
  const basketGrad = ctx.createLinearGradient(x - 42, y, x + 42, y + 25);
  basketGrad.addColorStop(0, '#ffeef2');
  basketGrad.addColorStop(1, '#ffccd5');
  ctx.fillStyle = basketGrad;
  ctx.strokeStyle = '#ff7a90';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x - 42, y - 8, 84, 34, [10, 10, 20, 20]);
  ctx.fill();
  ctx.stroke();
  
  // Decorative weaves
  ctx.strokeStyle = 'rgba(255, 122, 144, 0.3)';
  ctx.lineWidth = 1.5;
  for (let i = -30; i <= 30; i += 15) {
    ctx.beginPath();
    ctx.moveTo(x + i - 3, y - 8);
    ctx.quadraticCurveTo(x + i, y + 9, x + i + 3, y + 26);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x - 38, y + 2);
  ctx.lineTo(x + 38, y + 2);
  ctx.moveTo(x - 35, y + 14);
  ctx.lineTo(x + 35, y + 14);
  ctx.stroke();
  
  // Cat face details
  ctx.fillStyle = '#3a2535';
  ctx.beginPath();
  ctx.arc(x - 12, y + 4, 3, 0, Math.PI * 2);
  ctx.arc(x + 12, y + 4, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Soft cheeks
  ctx.fillStyle = 'rgba(255, 77, 109, 0.45)';
  ctx.beginPath();
  ctx.arc(x - 18, y + 9, 4, 0, Math.PI * 2);
  ctx.arc(x + 18, y + 9, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Mouth
  ctx.strokeStyle = '#3a2535';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(x - 2, y + 8, 2, Math.PI, 0, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 2, y + 8, 2, Math.PI, 0, true);
  ctx.stroke();
  
  ctx.restore();
}

let scorePopups = [];
function addScorePopup(x, y, text) {
  scorePopups.push({
    x: x,
    y: y,
    text: text,
    alpha: 1.0,
    speedY: -1.2
  });
}

function updateScorePopups() {
  for (let i = scorePopups.length - 1; i >= 0; i--) {
    const popup = scorePopups[i];
    popup.y += popup.speedY;
    popup.alpha -= 0.022;
    
    if (popup.alpha <= 0) {
      scorePopups.splice(i, 1);
    } else {
      catcherCtx.save();
      catcherCtx.globalAlpha = popup.alpha;
      catcherCtx.fillStyle = '#ff4d6d';
      catcherCtx.strokeStyle = '#ffffff';
      catcherCtx.lineWidth = 3;
      catcherCtx.font = "bold 16px 'Fredoka', sans-serif";
      catcherCtx.textAlign = 'center';
      catcherCtx.strokeText(popup.text, popup.x, popup.y);
      catcherCtx.fillText(popup.text, popup.x, popup.y);
      catcherCtx.restore();
    }
  }
}

function startGameLoop() {
  initAudio();
  
  const startOverlay = document.getElementById('gameStartOverlay');
  if (startOverlay) startOverlay.classList.add('hide');
  
  gameScore = 0;
  isCatcherGameActive = true;
  gameItems = [];
  scorePopups = [];
  
  const scoreVal = document.getElementById('catcherScore');
  if (scoreVal) scoreVal.textContent = "0";
  
  const statusLabel = document.getElementById('gameStatusText');
  if (statusLabel) statusLabel.textContent = "Catch everything! 🧺💖";
  
  resizeCatcherCanvas();
  
  if (catcherCanvas) {
    catcherX = catcherCanvas.width / 2;
    targetCatcherX = catcherCanvas.width / 2;
  }
  
  const victoryLock = document.getElementById('victoryLock');
  if (victoryLock) victoryLock.classList.remove('unlocked');
  
  const stampBox = document.getElementById('victoryPassStamp');
  if (stampBox) stampBox.classList.remove('redeemed');
  
  lastSpawnTime = performance.now();
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  gameLoop();
}

function gameLoop() {
  if (!isCatcherGameActive || !catcherCanvas) return;
  
  const now = performance.now();
  
  catcherCtx.clearRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  const grad = catcherCtx.createLinearGradient(0, 0, 0, catcherCanvas.height);
  grad.addColorStop(0, '#fffbfd');
  grad.addColorStop(1, '#ffeef2');
  catcherCtx.fillStyle = grad;
  catcherCtx.fillRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  
  // Spawn falling objects
  if (now - lastSpawnTime > spawnInterval) {
    gameItems.push(new FallingItem(catcherCanvas.width));
    lastSpawnTime = now;
  }
  
  // Move catcher smoothly using interpolation
  catcherX += (targetCatcherX - catcherX) * 0.24;
  
  // Active button clicks holding movement
  if (activeMove === 'left') {
    targetCatcherX = Math.max(42, targetCatcherX - 7.5);
  } else if (activeMove === 'right') {
    targetCatcherX = Math.min(catcherCanvas.width - 42, targetCatcherX + 7.5);
  }
  
  catcherX = Math.max(42, Math.min(catcherCanvas.width - 42, catcherX));
  
  drawCatcher(catcherCtx, catcherX, catcherY);
  
  for (let i = gameItems.length - 1; i >= 0; i--) {
    const item = gameItems[i];
    item.update();
    item.draw(catcherCtx);
    
    // Check basket captures
    const dx = Math.abs(item.x - catcherX);
    const dy = Math.abs(item.y - catcherY);
    
    if (dy < 18 && dx < 46) {
      gameScore += item.points;
      
      const scoreVal = document.getElementById('catcherScore');
      if (scoreVal) scoreVal.textContent = gameScore;
      
      if (item.type === 'skincare') {
        playSound('bubble');
        triggerVibration('light');
        addScorePopup(item.x, item.y, "+5 🧴");
      } else if (item.type === 'cat') {
        playSound('meow');
        triggerVibration('double');
        addScorePopup(item.x, item.y, "Yay! +5 🐱");
      } else if (item.type === 'heart') {
        playSound('bell');
        triggerVibration('light');
        addScorePopup(item.x, item.y, "Love! +5 💖");
      }
      
      gameItems.splice(i, 1);
      explodeParticles(5, item.x, catcherY - 5, 'bubble');
      
      if (gameScore >= 100) {
        winGame();
        return;
      }
      continue;
    }
    
    // Dropped heart penalty
    if (item.y > catcherCanvas.height + 20) {
      if (item.type === 'heart') {
        gameScore = Math.max(0, gameScore - 2);
        const scoreVal = document.getElementById('catcherScore');
        if (scoreVal) scoreVal.textContent = gameScore;
        
        addScorePopup(item.x, catcherCanvas.height - 15, "-2 Heart! 😿");
        triggerVibration('light');
      }
      gameItems.splice(i, 1);
    }
  }
  
  updateScorePopups();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function winGame() {
  isCatcherGameActive = false;
  cancelAnimationFrame(animationFrameId);
  
  catcherCtx.clearRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  const grad = catcherCtx.createLinearGradient(0, 0, 0, catcherCanvas.height);
  grad.addColorStop(0, '#fffbfd');
  grad.addColorStop(1, '#ffeef2');
  catcherCtx.fillStyle = grad;
  catcherCtx.fillRect(0, 0, catcherCanvas.width, catcherCanvas.height);
  
  drawCatcher(catcherCtx, catcherCanvas.width / 2, catcherCanvas.height / 2 + 10);
  
  catcherCtx.fillStyle = '#ff4d6d';
  catcherCtx.font = "bold 20px 'Fredoka', sans-serif";
  catcherCtx.textAlign = 'center';
  catcherCtx.fillText("🎉 VICTORY! 🎉", catcherCanvas.width / 2, catcherCanvas.height / 2 - 45);
  catcherCtx.font = "bold 14px 'Fredoka', sans-serif";
  catcherCtx.fillStyle = '#83677b';
  catcherCtx.fillText("Love fully captured! 💖🐾", catcherCanvas.width / 2, catcherCanvas.height / 2 - 25);
  
  playSound('harp');
  triggerVibration('success');
  
  const scoreVal = document.getElementById('catcherScore');
  if (scoreVal) scoreVal.textContent = "100+";
  
  const statusLabel = document.getElementById('gameStatusText');
  if (statusLabel) statusLabel.textContent = "OMG You Won! 🐾🏆";
  
  explodeParticles(70, catcherCanvas.width / 2, catcherCanvas.height / 2 + 10);
  
  const victoryLock = document.getElementById('victoryLock');
  if (victoryLock) victoryLock.classList.add('unlocked');
  
  const rewardCard = document.getElementById('victoryRewardCard');
  if (rewardCard) {
    rewardCard.style.animation = 'heartPulse 1.2s ease-in-out';
    setTimeout(() => {
      rewardCard.style.animation = '';
    }, 1200);
  }
}

function stampVictoryPass() {
  const stampBox = document.getElementById('victoryPassStamp');
  if (!stampBox || stampBox.classList.contains('redeemed')) return;
  
  playSound('stamp');
  triggerVibration('stamp');
  stampBox.classList.add('redeemed');
  
  const stampRect = stampBox.getBoundingClientRect();
  explodeParticles(25, stampRect.left + stampRect.width/2, stampRect.top + stampRect.height/2);
}

function initCatcherControls() {
  if (!catcherCanvas) return;
  const container = document.getElementById('gameArenaContainer');
  if (!container) return;
  
  catcherCanvas.style.touchAction = 'none';
  container.style.touchAction = 'none';
  
  let isDragging = false;
  
  function getRelativeX(e) {
    const rect = catcherCanvas.getBoundingClientRect();
    const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const relX = clientX - rect.left;
    return relX * (catcherCanvas.width / rect.width);
  }
  
  container.addEventListener('pointerdown', (e) => {
    if (!isCatcherGameActive) return;
    isDragging = true;
    try {
      container.setPointerCapture(e.pointerId);
    } catch(err) {}
    targetCatcherX = getRelativeX(e);
  });
  
  container.addEventListener('pointermove', (e) => {
    if (!isCatcherGameActive || !isDragging) return;
    targetCatcherX = getRelativeX(e);
  });
  
  container.addEventListener('pointerup', (e) => {
    isDragging = false;
    try {
      container.releasePointerCapture(e.pointerId);
    } catch(err) {}
  });
  
  const leftBtn = document.getElementById('btnLeft');
  const rightBtn = document.getElementById('btnRight');
  
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      activeMove = 'left';
      playSound('bubble');
      triggerVibration('light');
    });
    
    rightBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      activeMove = 'right';
      playSound('bubble');
      triggerVibration('light');
    });
    
    const stopArrowMove = () => {
      activeMove = null;
    };
    
    leftBtn.addEventListener('pointerup', stopArrowMove);
    rightBtn.addEventListener('pointerup', stopArrowMove);
    leftBtn.addEventListener('pointerleave', stopArrowMove);
    rightBtn.addEventListener('pointerleave', stopArrowMove);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const allButtons = document.querySelectorAll('.btn, .btn-redeem, .wax-seal');
  allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('btn-yes') && 
          !btn.classList.contains('btn-no') && 
          !btn.classList.contains('btn-redeem') &&
          btn.id !== 'waxSeal' &&
          btn.id !== 'btnLeft' &&
          btn.id !== 'btnRight') {
        playSound('bubble');
        triggerVibration('light');
      }
    });
  });
  
  catcherCanvas = document.getElementById('catcherCanvas');
  catcherCtx = catcherCanvas ? catcherCanvas.getContext('2d') : null;
  
  resizeCatcherCanvas();
  initCatcherControls();
});
