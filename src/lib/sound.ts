// Helper de sons synthétisés en Web Audio API pour éviter d'importer des fichiers MP3 volumineux

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    // @ts-expect-error - support for older browsers
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playSound(type: "click" | "correct" | "incorrect" | "win" | "levelup") {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Reprendre le contexte s'il a été suspendu par le navigateur (protection autoplay)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;

  switch (type) {
    case "click": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
      break;
    }
    case "correct": {
      // Un double bip ascendant joyeux
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(523.25, now); // Do5 (C5)
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // Mi5 (E5)

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);
      break;
    }
    case "incorrect": {
      // Un son descendant plus grave et sourd
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now); // La3
      osc.frequency.linearRampToValueAtTime(110, now + 0.25); // La2

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      // Filtre passe-bas pour adoucir le bruit de scie
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }
    case "win": {
      // Arpège de victoire majeur C-E-G-C
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const duration = 0.12;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * duration);

        gain.gain.setValueAtTime(0.1, now + idx * duration);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * duration + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * duration);
        osc.stop(now + idx * duration + 0.25);
      });
      break;
    }
    case "levelup": {
      // Balayage ascendant magique
      const duration = 0.5;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.exponentialRampToValueAtTime(1567.98, now + duration); // G6

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
      break;
    }
  }
}

// Fonction de synthèse vocale pour raconter les leçons aux plus petits (3-5 ans)
export function speakText(text: string, callback?: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    if (callback) callback();
    return;
  }

  // Stopper toute lecture en cours
  window.speechSynthesis.cancel();

  // Nettoyer le texte des emojis pour la prononciation
  const cleanText = text.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "");

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = "fr-FR";
  
  // Essayer de trouver une voix française douce s'il y en a
  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang.startsWith("fr"));
  if (frVoice) {
    utterance.voice = frVoice;
  }

  utterance.pitch = 1.2; // Un ton légèrement plus haut et enfantin / chaleureux
  utterance.rate = 0.95; // Un peu plus lent pour les enfants

  if (callback) {
    utterance.onend = () => callback();
    utterance.onerror = () => callback();
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
