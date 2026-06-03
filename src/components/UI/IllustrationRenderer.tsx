"use client";

import React from "react";
import { motion } from "framer-motion";

interface IllustrationRendererProps {
  name: string; // L'emoji ou la clé représentant l'icône
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const IllustrationRenderer: React.FC<IllustrationRendererProps> = ({
  name,
  size = 100,
  className = "",
  animate = true,
}) => {
  // Animation helpers are defined directly on JSX tags below

  // Dictionnaire des illustrations SVG personnalisées (remplace les emojis classiques)
  const renderSVGContent = () => {
    switch (name) {
      // ==========================================
      // 1. ICÔNES DES UNIVERS D'APPRENTISSAGE
      // ==========================================
      case "animals":
      case "🦁":
        return (
          <g id="illustration-lion">
            <defs>
              <linearGradient id="maneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E67E22" />
                <stop offset="100%" stopColor="#D35400" />
              </linearGradient>
              <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1C40F" />
                <stop offset="100%" stopColor="#F39C12" />
              </linearGradient>
            </defs>
            {/* Crinière */}
            <circle cx="50" cy="50" r="38" fill="url(#maneGrad)" className="drop-shadow" />
            <path d="M 50 12 Q 38 2 28 15 Q 18 28 28 38 Q 38 48 50 38 Q 62 48 72 38 Q 82 28 72 15 Q 62 2 50 12 Z" fill="#D35400" opacity="0.3" />
            
            {/* Oreilles */}
            <circle cx="28" cy="28" r="8" fill="url(#maneGrad)" />
            <circle cx="28" cy="28" r="4.5" fill="#FFC0CB" />
            <circle cx="72" cy="28" r="8" fill="url(#maneGrad)" />
            <circle cx="72" cy="28" r="4.5" fill="#FFC0CB" />
            
            {/* Visage */}
            <circle cx="50" cy="53" r="25" fill="url(#faceGrad)" />
            
            {/* Yeux */}
            <circle cx="41" cy="48" r="3.5" fill="#2C3E50" />
            <circle cx="42" cy="46" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="48" r="3.5" fill="#2C3E50" />
            <circle cx="58" cy="46" r="1" fill="#FFFFFF" />
            
            {/* Joues roses */}
            <circle cx="34" cy="55" r="2.5" fill="#FFA3B1" opacity="0.6" />
            <circle cx="66" cy="55" r="2.5" fill="#FFA3B1" opacity="0.6" />

            {/* Museau blanc */}
            <ellipse cx="50" cy="59" rx="7.5" ry="5.5" fill="#FFFFFF" />
            <polygon points="46,55 54,55 50,59" fill="#2C3E50" />
            <path d="M 50 59 L 50 63" stroke="#2C3E50" strokeWidth="1.5" />
          </g>
        );

      case "nature":
      case "🌳":
        return (
          <g id="illustration-leaf">
            <defs>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2ECC71" />
                <stop offset="100%" stopColor="#27AE60" />
              </linearGradient>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#70D6FF" />
                <stop offset="100%" stopColor="#3F88C5" />
              </linearGradient>
            </defs>
            {/* Fond rond bleu ciel */}
            <circle cx="50" cy="50" r="42" fill="url(#skyGrad)" opacity="0.15" />

            {/* Petite tige */}
            <path d="M 50 82 Q 52 75 42 60" fill="none" stroke="#795548" strokeWidth="4.5" strokeLinecap="round" />

            {/* Feuille principale oblique */}
            <motion.path
              d="M 50 78 C 75 75 82 50 70 30 C 50 15 28 35 34 60 C 38 78 50 78 50 78 Z"
              fill="url(#leafGrad)"
              className="drop-shadow-md"
              animate={animate ? { rotate: [0, 5, -5, 0] } : undefined}
              transition={animate ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
              style={{ originX: "50px", originY: "78px" }}
            />
            {/* Rainure centrale */}
            <path d="M 42 66 Q 52 50 64 36" fill="none" stroke="#229F55" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Petite goutte de rosée brillante */}
            <circle cx="62" cy="46" r="3.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="63" cy="44.5" r="1" fill="#FFFFFF" />
          </g>
        );

      case "body":
      case "🧠":
        return (
          <g id="illustration-brain">
            <defs>
              <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF70A6" />
                <stop offset="100%" stopColor="#EE5253" />
              </linearGradient>
            </defs>
            {/* Cerveau cartoon brillant */}
            <circle cx="50" cy="50" r="42" fill="#FFE3ED" opacity="0.6" />

            {/* Dessin du cerveau gauche & droit */}
            <g className="drop-shadow-md" fill="url(#brainGrad)">
              {/* Cerveau Gauche */}
              <path d="M 46 72 C 34 72 24 64 24 50 C 24 38 34 30 46 30 Q 48 30 48 50 Q 48 72 46 72 Z" />
              {/* Cerveau Droit */}
              <path d="M 54 72 C 66 72 76 64 76 50 C 76 38 66 30 54 30 Q 52 30 52 50 Q 52 72 54 72 Z" />
            </g>

            {/* Plis du cerveau en rose clair */}
            <path d="M 32 46 C 30 52 38 56 44 48 M 68 46 C 70 52 62 56 56 48" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 34 38 Q 42 38 42 44 M 66 38 Q 58 38 58 44" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M 34 60 Q 42 62 44 56 M 66 60 Q 58 62 56 56" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

            {/* Yeux mignons sur le cerveau */}
            <circle cx="40" cy="50" r="2.5" fill="#2C3E50" />
            <circle cx="60" cy="50" r="2.5" fill="#2C3E50" />
            {/* Petit sourire */}
            <path d="M 48 54 Q 50 56 52 54" fill="none" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case "space":
      case "🚀":
        return (
          <g id="illustration-rocket">
            <defs>
              <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#DDE6ED" />
              </linearGradient>
              <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF9F43" />
                <stop offset="100%" stopColor="#FF3838" />
              </linearGradient>
            </defs>
            {/* Espace sombre en fond */}
            <circle cx="50" cy="50" r="42" fill="#1E1E2F" />
            
            {/* Étoiles qui brillent */}
            <circle cx="28" cy="28" r="1.5" fill="#FFD166" />
            <circle cx="70" cy="32" r="1.2" fill="#70D6FF" />
            <circle cx="68" cy="68" r="1" fill="#FFFFFF" />
            <circle cx="34" cy="64" r="1.5" fill="#FF70A6" />

            <g transform="translate(0, -5) rotate(15 50 50)">
              {/* Flammes */}
              <motion.path
                d="M 44 74 Q 50 92 56 74 Z"
                fill="url(#fireGrad)"
                animate={{ scaleY: [1, 1.2, 1], y: [0, 2, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="origin-top"
              />
              <path d="M 47 74 Q 50 82 53 74 Z" fill="#FFD166" />

              {/* Ailerons latéraux */}
              <path d="M 32 68 L 36 50 L 44 60 Z" fill="#EA2027" />
              <path d="M 68 68 L 64 50 L 56 60 Z" fill="#EA2027" />
              <path d="M 50 72 L 46 64 L 54 64 Z" fill="#EA2027" /> {/* Aileron central */}

              {/* Corps Fusée */}
              <path d="M 38 68 L 38 40 Q 38 20 50 14 Q 62 20 62 40 L 62 68 Z" fill="url(#rocketGrad)" className="drop-shadow" />

              {/* Nez rouge */}
              <path d="M 39.5 30 Q 50 14 60.5 30 Z" fill="#EA2027" />

              {/* Hublot */}
              <circle cx="50" cy="46" r="6" fill="#70D6FF" stroke="#A5A5A5" strokeWidth="2" />
              <circle cx="52" cy="44" r="1.5" fill="#FFFFFF" />
            </g>
          </g>
        );

      case "maths":
      case "🔢":
        return (
          <g id="illustration-math">
            <defs>
              <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9F43" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
            {/* Fond orange géométrique */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#mathGrad)" className="drop-shadow-md" />

            {/* Symboles Mathématiques style 3D cartoon */}
            {/* Signe PLUS */}
            <g fill="#FFFFFF" className="drop-shadow">
              <rect x="25" y="32" width="14" height="4" rx="2" />
              <rect x="30" y="27" width="4" height="14" rx="2" />
            </g>

            {/* Signe ÉGAL */}
            <g fill="#FFFFFF" className="drop-shadow">
              <rect x="58" y="30" width="14" height="3" rx="1.5" />
              <rect x="58" y="36" width="14" height="3" rx="1.5" />
            </g>

            {/* Chiffre 1 */}
            <text x="32" y="74" fill="#FFFFFF" fontSize="28" fontWeight="bold" fontFamily="Fredoka" textAnchor="middle" className="drop-shadow">
              1
            </text>

            {/* Chiffre 2 */}
            <text x="66" y="74" fill="#FFFFFF" fontSize="28" fontWeight="bold" fontFamily="Fredoka" textAnchor="middle" className="drop-shadow">
              2
            </text>
          </g>
        );

      case "geography":
      case "🌍":
        return (
          <g id="illustration-globe">
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#54A0FF" />
                <stop offset="100%" stopColor="#2E86DE" />
              </linearGradient>
            </defs>
            {/* Océan */}
            <circle cx="50" cy="50" r="38" fill="url(#oceanGrad)" className="drop-shadow-lg" />
            
            {/* Reflet de lumière sur le globe */}
            <path d="M 18 30 A 38 38 0 0 1 82 30 A 36 36 0 0 0 18 30 Z" fill="#FFFFFF" opacity="0.2" />

            {/* Continents (Amérique, Europe, Afrique) simplifiés */}
            {/* Amérique du Nord/Sud gauche */}
            <path d="M 20 32 Q 28 32 26 42 Q 22 46 24 56 Q 28 62 26 72 Q 20 78 18 68 Q 14 56 16 42 Z" fill="#2ECC71" />
            
            {/* Europe/Afrique droite */}
            <path d="M 54 26 Q 66 22 72 32 Q 74 44 66 48 Q 58 50 62 64 Q 68 76 60 78 Q 48 76 50 60 Q 46 54 50 42 Z" fill="#2ECC71" />

            {/* Petit avion en papier qui tourne */}
            <g transform="translate(10, -5)">
              <polygon points="68,44 80,48 70,52 68,48" fill="#FFFFFF" className="drop-shadow" />
              <polygon points="68,44 70,52 68,52" fill="#E0E0E0" />
              <path d="M 64 54 Q 58 56 50 54" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2" opacity="0.8" />
            </g>
          </g>
        );

      case "french":
      case "🔤":
        return (
          <g id="illustration-letters">
            <circle cx="50" cy="50" r="42" fill="#F3E5F5" opacity="0.6" />

            {/* Lettre A rouge */}
            <g transform="translate(-8, -6)">
              <rect x="22" y="22" width="22" height="26" rx="6" fill="#FF7675" className="drop-shadow" />
              <text x="33" y="42" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="Fredoka" textAnchor="middle">
                A
              </text>
            </g>

            {/* Lettre B bleue en premier plan */}
            <g transform="translate(12, 10) scale(1.1)">
              <rect x="22" y="22" width="22" height="26" rx="6" fill="#54A0FF" className="drop-shadow-lg" />
              <text x="33" y="41" fill="#FFFFFF" fontSize="17" fontWeight="bold" fontFamily="Fredoka" textAnchor="middle">
                B
              </text>
            </g>

            {/* Lettre C jaune */}
            <g transform="translate(-14, 20)">
              <rect x="22" y="22" width="22" height="26" rx="6" fill="#FECA57" className="drop-shadow" />
              <text x="33" y="41" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="Fredoka" textAnchor="middle">
                C
              </text>
            </g>
          </g>
        );

      case "arts":
      case "🎨":
        return (
          <g id="illustration-palette">
            <defs>
              <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5CD79" />
                <stop offset="100%" stopColor="#E67E22" />
              </linearGradient>
            </defs>
            {/* Palette en bois d'artiste */}
            <path
              d="M 24 64 C 14 54 16 32 32 24 C 48 16 78 20 82 38 C 86 54 74 72 58 76 C 44 78 32 72 24 64 Z"
              fill="url(#woodGrad)"
              className="drop-shadow-lg"
            />
            {/* Trou pour le pouce */}
            <ellipse cx="34" cy="38" rx="4" ry="6" fill="#e0f2fe" stroke="#E67E22" strokeWidth="1" />

            {/* Taches de couleurs de peinture */}
            <circle cx="52" cy="32" r="5" fill="#FF7675" />
            <circle cx="68" cy="38" r="4.5" fill="#54A0FF" />
            <circle cx="72" cy="52" r="5" fill="#FECA57" />
            <circle cx="62" cy="64" r="4.5" fill="#2ECC71" />
            <circle cx="44" cy="62" r="5" fill="#9B5DE5" />

            {/* Pinceau posé dessus */}
            <g transform="translate(-5, 0) rotate(25 50 50)">
              <rect x="48" y="16" width="4" height="55" rx="1.5" fill="#795548" />
              <rect x="48" y="14" width="4" height="3" fill="#D3D3D3" />
              {/* Poils avec tache de peinture rouge */}
              <path d="M 48 14 Q 50 6 52 14 Z" fill="#FF7675" />
            </g>
          </g>
        );

      // ==========================================
      // 1.5 ICÔNES DE BADGES ET RÉCOMPENSES
      // ==========================================
      case "🐾":
        return (
          <g id="badge-paw">
            <circle cx="50" cy="50" r="42" fill="#FFEAA7" opacity="0.4" />
            <g fill="#D35400" className="drop-shadow-sm">
              <path d="M 50 48 C 42 48 38 56 38 64 C 38 72 44 76 50 76 C 56 76 62 72 62 64 C 62 56 58 48 50 48 Z" />
              <ellipse cx="32" cy="42" rx="4.5" ry="6" transform="rotate(-30 32 42)" />
              <ellipse cx="42" cy="34" rx="5" ry="6.5" />
              <ellipse cx="58" cy="34" rx="5" ry="6.5" />
              <ellipse cx="68" cy="42" rx="4.5" ry="6" transform="rotate(30 68 42)" />
            </g>
          </g>
        );

      case "🌲":
        return (
          <g id="badge-pine">
            <circle cx="50" cy="50" r="42" fill="#D5F5E3" opacity="0.5" />
            <rect x="46" y="66" width="8" height="14" rx="2" fill="#795548" />
            <polygon points="50,18 24,48 76,48" fill="#27AE60" className="drop-shadow-sm" />
            <polygon points="50,32 28,58 72,58" fill="#2ECC71" className="drop-shadow-sm" />
            <polygon points="50,46 32,68 68,68" fill="#58D68D" className="drop-shadow-sm" />
          </g>
        );

      case "🦅":
        return (
          <g id="badge-eagle">
            <circle cx="50" cy="50" r="42" fill="#FDEBD0" opacity="0.5" />
            <g fill="#E67E22" className="drop-shadow-sm">
              <path d="M 50 46 C 30 32 20 40 18 56 C 24 50 36 48 50 54 C 64 48 76 50 82 56 C 80 40 70 32 50 46 Z" />
              <ellipse cx="50" cy="54" rx="7" ry="12" />
              <circle cx="50" cy="40" r="8" fill="#FFFFFF" />
              <polygon points="48,40 52,40 50,47" fill="#F1C40F" />
              <circle cx="47" cy="38" r="1" fill="#2C3E50" />
              <circle cx="53" cy="38" r="1" fill="#2C3E50" />
            </g>
          </g>
        );

      case "🌸":
        return (
          <g id="badge-flower">
            <circle cx="50" cy="50" r="42" fill="#FDEDEC" opacity="0.6" />
            <g fill="#FF7675" className="drop-shadow-sm">
              <circle cx="50" cy="30" r="9.5" />
              <circle cx="69" cy="44" r="9.5" />
              <circle cx="62" cy="66" r="9.5" />
              <circle cx="38" cy="66" r="9.5" />
              <circle cx="31" cy="44" r="9.5" />
            </g>
            <circle cx="50" cy="50" r="8" fill="#F1C40F" stroke="#FFF" strokeWidth="1.5" className="drop-shadow-sm" />
          </g>
        );

      case "🌱":
        return (
          <g id="badge-sprout">
            <circle cx="50" cy="50" r="42" fill="#E8F8F5" opacity="0.5" />
            <path d="M 50 78 Q 48 50 54 36" fill="none" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
            <path d="M 53 38 Q 66 30 68 40 Q 56 46 53 38 Z" fill="#2ECC71" className="drop-shadow-sm" />
            <path d="M 51 46 Q 36 40 38 48 Q 48 54 51 46 Z" fill="#27AE60" className="drop-shadow-sm" />
          </g>
        );

      case "🌈":
        return (
          <g id="badge-rainbow">
            <circle cx="50" cy="50" r="42" fill="#EBF5FB" opacity="0.5" />
            <circle cx="50" cy="58" r="26" fill="none" stroke="#E74C3C" strokeWidth="4" />
            <circle cx="50" cy="58" r="22" fill="none" stroke="#F1C40F" strokeWidth="4" />
            <circle cx="50" cy="58" r="18" fill="none" stroke="#2ECC71" strokeWidth="4" />
            <circle cx="50" cy="58" r="14" fill="none" stroke="#3498DB" strokeWidth="4" />
            <rect x="15" y="58" width="70" height="24" fill="#EBF5FB" opacity="0.9" />
            <circle cx="28" cy="58" r="7.5" fill="#FFFFFF" className="drop-shadow-sm" />
            <circle cx="36" cy="58" r="6" fill="#FFFFFF" className="drop-shadow-sm" />
            <circle cx="64" cy="58" r="7.5" fill="#FFFFFF" className="drop-shadow-sm" />
            <circle cx="72" cy="58" r="6" fill="#FFFFFF" className="drop-shadow-sm" />
          </g>
        );

      case "👟":
        return (
          <g id="badge-shoe">
            <circle cx="50" cy="50" r="42" fill="#FDEDEC" opacity="0.5" />
            <g transform="translate(14, 18) scale(0.9)" className="drop-shadow-sm">
              <path d="M 6 42 Q 26 48 54 42 L 56 46 Q 26 52 4 44 Z" fill="#EBF3F9" stroke="#BDC3C7" strokeWidth="1" />
              <path d="M 6 42 C 2 30 10 24 20 22 C 30 20 42 34 50 36 C 54 36 54 42 54 42 Z" fill="#E74C3C" />
              <path d="M 6 42 C 4 36 8 32 12 36 Z" fill="#FFFFFF" />
              <line x1="24" y1="23" x2="30" y2="28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="28" y1="21" x2="34" y2="26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        );

      case "👁️":
        return (
          <g id="badge-eye">
            <circle cx="50" cy="50" r="42" fill="#EAECEE" opacity="0.5" />
            <path d="M 16 50 Q 50 24 84 50 Q 50 76 16 50 Z" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="1.5" className="drop-shadow-sm" />
            <circle cx="50" cy="50" r="14" fill="#3498DB" />
            <circle cx="50" cy="50" r="7.5" fill="#2C3E50" />
            <circle cx="53" cy="47" r="2.5" fill="#FFFFFF" />
          </g>
        );

      case "🥼":
        return (
          <g id="badge-flask">
            <circle cx="50" cy="50" r="42" fill="#E8F8F5" opacity="0.5" />
            <g className="drop-shadow-sm">
              <path d="M 28 66 L 72 66 C 72 66 66 52 56 46 L 56 28 L 44 28 L 44 46 C 34 52 28 66 28 66 Z" fill="#00DEC9" opacity="0.4" />
              <path d="M 29 65 Q 50 68 71 65 L 63 56 Q 50 58 37 56 Z" fill="#00DEC9" />
              <path d="M 44 22 L 56 22 M 45 22 L 45 46 C 35 52 28 68 28 68 L 72 68 C 72 68 65 52 55 46 L 55 22" fill="none" stroke="#7F8C8D" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="50" cy="42" r="2" fill="#00DEC9" />
              <circle cx="46" cy="32" r="1.5" fill="#00DEC9" />
              <circle cx="54" cy="24" r="1" fill="#00DEC9" />
            </g>
          </g>
        );

      case "⭐":
        return (
          <g id="badge-star">
            <circle cx="50" cy="50" r="42" fill="#FEF9E7" opacity="0.5" />
            <polygon
              points="50,15 63,40 90,42 68,60 75,87 50,72 25,87 32,60 10,42 37,40"
              fill="#FECA57"
              stroke="#F1C40F"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            <polygon
              points="50,22 58,40 50,48 42,40"
              fill="#FFFFFF"
              opacity="0.5"
            />
          </g>
        );

      case "🌑":
        return (
          <g id="badge-moon">
            <circle cx="50" cy="50" r="42" fill="#EAECEE" opacity="0.5" />
            <circle cx="50" cy="50" r="22" fill="#BDC3C7" className="drop-shadow-sm" />
            <circle cx="42" cy="42" r="3.5" fill="#95A5A6" opacity="0.6" />
            <circle cx="58" cy="46" r="4.5" fill="#95A5A6" opacity="0.6" />
            <circle cx="48" cy="62" r="2.5" fill="#95A5A6" opacity="0.6" />
            <path d="M 50 28 A 22 22 0 0 0 50 72 A 22 22 0 0 1 50 28 Z" fill="#7F8C8D" opacity="0.25" />
          </g>
        );

      // ==========================================
      // 2. MASCOTTES / IMAGES DES LEÇONS & QUIZ
      // ==========================================
      case "🐱": // Chat mignon
        return (
          <g id="illustration-cat">
            <circle cx="50" cy="50" r="42" fill="#FFF2E6" />
            {/* Oreilles */}
            <polygon points="25,42 20,18 38,30" fill="#FF9F43" />
            <polygon points="27,39 23,23 35,31" fill="#FFC0CB" />
            <polygon points="75,42 80,18 62,30" fill="#FF9F43" />
            <polygon points="73,39 77,23 65,31" fill="#FFC0CB" />
            {/* Tête */}
            <circle cx="50" cy="50" r="28" fill="#FF9F43" className="drop-shadow-md" />
            <ellipse cx="50" cy="53" rx="24" ry="20" fill="#FF9F43" />
            {/* Tache blanche museau */}
            <ellipse cx="50" cy="58" rx="12" ry="8" fill="#FFFFFF" />
            {/* Yeux */}
            <circle cx="39" cy="46" r="3.5" fill="#2C3E50" />
            <circle cx="39.5" cy="44.5" r="1" fill="#FFFFFF" />
            <circle cx="61" cy="46" r="3.5" fill="#2C3E50" />
            <circle cx="60.5" cy="44.5" r="1" fill="#FFFFFF" />
            {/* Nez & Bouche */}
            <polygon points="47,54 53,54 50,57" fill="#FF8093" />
            <path d="M 46 60 Q 50 62 54 60" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
            {/* Moustaches */}
            <line x1="22" y1="52" x2="34" y2="53" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="21" y1="58" x2="33" y2="57" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="78" y1="52" x2="66" y2="53" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="79" y1="58" x2="67" y2="57" stroke="#5D4037" strokeWidth="1.5" />
          </g>
        );

      case "🐸": // Grenouille rigolote
        return (
          <g id="illustration-frog">
            <circle cx="50" cy="50" r="42" fill="#E8F8F5" />
            
            {/* Bras / Pieds */}
            <circle cx="28" cy="74" r="6" fill="#2ECC71" />
            <circle cx="72" cy="74" r="6" fill="#2ECC71" />

            {/* Corps */}
            <ellipse cx="50" cy="62" rx="26" ry="20" fill="#2ECC71" className="drop-shadow-md" />
            <ellipse cx="50" cy="65" rx="16" ry="14" fill="#A3E4D7" />

            {/* Yeux globuleux en haut */}
            <circle cx="36" cy="38" r="8" fill="#2ECC71" />
            <circle cx="36" cy="38" r="6" fill="#FFFFFF" />
            <circle cx="36" cy="38" r="3" fill="#2C3E50" />
            <circle cx="37.5" cy="36.5" r="1" fill="#FFFFFF" />

            <circle cx="64" cy="38" r="8" fill="#2ECC71" />
            <circle cx="64" cy="38" r="6" fill="#FFFFFF" />
            <circle cx="64" cy="38" r="3" fill="#2C3E50" />
            <circle cx="62.5" cy="36.5" r="1" fill="#FFFFFF" />

            {/* Joues roses */}
            <circle cx="30" cy="54" r="3" fill="#FF8093" opacity="0.6" />
            <circle cx="70" cy="54" r="3" fill="#FF8093" opacity="0.6" />

            {/* Grand sourire de grenouille */}
            <path d="M 38 56 Q 50 68 62 56" fill="none" stroke="#239B56" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case "🐬": // Dauphin sautant dans l'eau
        return (
          <g id="illustration-dolphin">
            <defs>
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#70D6FF" />
                <stop offset="100%" stopColor="#3F88C5" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#seaGrad)" opacity="0.2" />

            {/* Vagues au fond */}
            <path d="M 12 70 Q 30 65 50 70 Q 70 75 88 70 L 88 90 L 12 90 Z" fill="#54A0FF" opacity="0.6" />
            <path d="M 12 76 Q 30 72 50 76 Q 70 80 88 76 L 88 90 L 12 90 Z" fill="#2E86DE" />

            {/* Corps du dauphin bleu-gris sautant */}
            <g transform="translate(5, -5) rotate(-15 50 50)">
              <path d="M 22 62 Q 35 30 65 34 Q 78 40 82 52 L 68 46 Q 50 36 34 56 Z" fill="#54A0FF" className="drop-shadow-md" />
              {/* Queue */}
              <path d="M 24 61 L 14 66 L 18 56 Z" fill="#54A0FF" />
              {/* Nageoire dorsale */}
              <path d="M 48 38 Q 45 26 38 28 Q 44 34 46 39 Z" fill="#3F88C5" />
              {/* Nageoire latérale */}
              <path d="M 52 50 Q 56 60 50 62 Q 48 54 50 49 Z" fill="#3F88C5" />
              {/* Ventre clair */}
              <path d="M 36 54 Q 50 43 62 48" fill="none" stroke="#EBF3F9" strokeWidth="1.5" />
              {/* Œil */}
              <circle cx="68" cy="40" r="1.5" fill="#2C3E50" />
            </g>
          </g>
        );

      case "🪐": // Planète Saturne avec ses anneaux
        return (
          <g id="illustration-saturn">
            <defs>
              <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEAA7" />
                <stop offset="100%" stopColor="#DF8C3F" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F1C40F" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E67E22" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F1C40F" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#1C1C3A" />
            {/* Petites étoiles de fond */}
            <circle cx="24" cy="24" r="1" fill="#FFF" />
            <circle cx="76" cy="28" r="1.5" fill="#FFEAA7" />
            <circle cx="28" cy="72" r="1.2" fill="#70D6FF" />

            <g transform="rotate(-15 50 50)">
              {/* Partie arrière de l'anneau */}
              <ellipse cx="50" cy="50" rx="34" ry="7" fill="url(#ringGrad)" clipPath="url(#backRingClip)" />
              
              {/* Planète Saturne */}
              <circle cx="50" cy="50" r="21" fill="url(#satGrad)" className="drop-shadow-md" />
              
              {/* Bandes sur la planète */}
              <path d="M 30 46 C 40 49 60 49 70 46" fill="none" stroke="#D35400" strokeWidth="1.5" opacity="0.3" />
              <path d="M 29 52 C 40 55 60 55 71 52" fill="none" stroke="#D35400" strokeWidth="2.5" opacity="0.2" />

              {/* Partie avant de l'anneau (superposée pour l'effet 3D) */}
              <path d="M 16 50 A 34 7 0 0 0 84 50 A 34 5.5 0 0 1 16 50 Z" fill="url(#ringGrad)" />
            </g>
          </g>
        );

      case "🦴": // Squelette de dinosaure / os
        return (
          <g id="illustration-bone">
            <circle cx="50" cy="50" r="42" fill="#FADBD8" opacity="0.5" />
            <g transform="translate(10, 10) rotate(45 40 40)" fill="#FFFFFF" stroke="#E6B0AA" strokeWidth="2.5" className="drop-shadow">
              {/* Le corps de l'os */}
              <rect x="22" y="36" width="36" height="8" rx="2" />
              {/* Jointures gauche */}
              <circle cx="22" cy="33" r="6" />
              <circle cx="22" cy="47" r="6" />
              {/* Jointures droite */}
              <circle cx="58" cy="33" r="6" />
              <circle cx="58" cy="47" r="6" />
            </g>
          </g>
        );

      case "💧": // Goutte d'eau joyeuse (cycle de l'eau)
        return (
          <g id="illustration-waterdrop">
            <defs>
              <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#74B9FF" />
                <stop offset="100%" stopColor="#0984E3" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#E1F5FE" opacity="0.5" />
            {/* Goutte d'eau */}
            <motion.path
              d="M 50 18 Q 66 50 66 62 A 16 16 0 0 1 34 62 Q 34 50 50 18 Z"
              fill="url(#dropGrad)"
              className="drop-shadow-md"
              animate={animate ? { y: [0, -4, 0] } : undefined}
              transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
            {/* Reflet de lumière blanc */}
            <path d="M 45 46 Q 38 52 38 60 A 12 12 0 0 1 45 46 Z" fill="#FFFFFF" opacity="0.35" />
            {/* Yeux mignons */}
            <circle cx="46" cy="58" r="2.5" fill="#FFFFFF" />
            <circle cx="54" cy="58" r="2.5" fill="#FFFFFF" />
            <circle cx="46.5" cy="57.5" r="0.8" fill="#2C3E50" />
            <circle cx="53.5" cy="57.5" r="0.8" fill="#2C3E50" />
            {/* Petit sourire */}
            <path d="M 49 61 Q 50 62 51 61" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          </g>
        );

      // Si aucune illustration spécifique n'est définie, on affiche un joli cercle coloré avec l'émoji original dedans.
      // Cela évite de planter l'application et garantit un rendu propre pour toutes les fiches.
      default:
        return (
          <g id="illustration-fallback">
            <defs>
              <linearGradient id="fallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
            {/* Sphère 3D douce */}
            <circle cx="50" cy="50" r="44" fill="url(#fallbackGrad)" stroke="#E0F2FE" strokeWidth="3" className="drop-shadow" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="3,3" />
            
            {/* Emoji text centré */}
            <text
              x="50"
              y="62"
              textAnchor="middle"
              fontSize="44"
              style={{
                fontFamily: "Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif",
                userSelect: "none"
              }}
            >
              {name}
            </text>
          </g>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderSVGContent()}
      </svg>
    </div>
  );
};
