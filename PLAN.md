# Plan de Landing Page TAFAQUH – Spécifications

## Introduction

La création d’une landing page pour le projet **TAFAQUH** requiert une approche à la fois technique et esthétique, respectant les principes de l’art islamique tout en intégrant les meilleures pratiques du développement web moderne. Ce plan exhaustif détaille la structure, les composants, les animations, la gestion multilingue (arabe, français, anglais), l’accessibilité, la conformité légale, la sécurité, et les instructions techniques pour une intégration optimale dans un fichier `plan.md` compatible Gemini CLI. L’objectif est de fournir une feuille de route claire et opérationnelle pour une landing page à la fois élégante, performante, inclusive et conforme aux valeurs islamiques.

---

## 1. Choix de la Stack Technique

### 1.1. Framework Node.js

Pour une landing page moderne, performante et facilement déployable, le choix du framework s’oriente vers **Next.js** (v14+), qui offre :

- **Rendu côté serveur (SSR)** et **génération statique (SSG)** pour un SEO optimal et des temps de chargement rapides.
- **App Router** pour une organisation modulaire et une gestion avancée des routes.
- **Support natif TypeScript** pour la robustesse du code.
- **Intégration facilitée de Tailwind CSS** pour un design réactif et personnalisable.
- **Déploiement simplifié sur Vercel** (ou Netlify, DigitalOcean, PM2 pour auto-hébergement).

### 1.2. Bibliothèques et outils complémentaires

- **Framer Motion** ou **GSAP** pour les animations complexes (SVG, logo, transitions).
- **i18next** pour l’internationalisation (i18n) côté Node.js/React.
- **Nodemailer** pour la gestion des emails du formulaire de contact.
- **reCAPTCHA v3** (ou honeypot) pour la protection anti-spam du formulaire.
- **Amiri** (Naskh) et **Noto Naskh Arabic** pour la typographie arabe.
- **SVGator** ou outils similaires pour la génération d’animations SVG calligraphiques.
- **Pattern Monster**, **Vecteezy**, **Freepik** pour les motifs géométriques SVG libres de droits.

---

## 2. Arborescence des Fichiers

L’organisation des fichiers est pensée pour la clarté, la modularité et la compatibilité Gemini CLI :

```markdown
/
├── plan.md
├── package.json
├── next.config.js
├── public/
│   ├── images/
│   │   ├── logo-tafaquh.svg
│   │   ├── motifs/
│   │   │   ├── motif1.svg
│   │   │   └── motif2.svg
│   │   └── calligraphie/
│   │       └── bismillah.svg
│   ├── fonts/
│   │   ├── Amiri-Regular.ttf
│   │   └── NotoNaskhArabic-Regular.ttf
│   └── lottie/
│       └── loading.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts
│   │   └── [lang]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Axes.tsx
│   │   ├── LoadingAnimation.tsx
│   │   ├── LogoAnimation.tsx
│   │   ├── ContactForm.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── Footer.tsx
│   ├── locales/
│   │   ├── ar.json
│   │   ├── fr.json
│   │   └── en.json
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       └── validation.ts
├── .env.example
├── README.md
└── vercel.json (si déploiement Vercel)
```

Cette structure sépare clairement les composants, les assets (images, polices, SVG, animations), les fichiers de traduction, et les routes API. Elle facilite la maintenance, l’évolutivité et la conformité aux standards modernes.

---

## 3. Composants UI et Structure de la Page

### 3.1. Liste des composants principaux

- **Header** : Logo animé, sélecteur de langue, navigation minimale.
- **Hero** : Section d’introduction (nom du projet, slogan, phrase "à suivre"), animation de chargement islamique.
- **About** : Présentation du projet et des 5 axes (المحاور).
- **Axes** : Détail des 5 axes avec icônes/motifs géométriques.
- **LoadingAnimation** : Animation SVG/Lottie inspirée de la calligraphie et des motifs islamiques.
- **LogoAnimation** : Animation du logo TAFAQUH (SVG, GSAP/Framer Motion).
- **ContactForm** : Formulaire de contact sécurisé (nom, email, message, reCAPTCHA/honeypot).
- **LanguageSelector** : Sélecteur de langue (ar/fr/en), support RTL.
- **Footer** : Liens réseaux sociaux, mentions légales, message de sincérité.

### 3.2. Schéma de la page

```markdown
[Header]
  ├── Logo animé
  └── Sélecteur de langue

[Hero]
  ├── Animation de chargement (calligraphie/motifs)
  ├── Nom du projet
  ├── Slogan
  └── Phrase "à suivre"

[About]
  ├── Présentation du projet
  └── [Axes]
        ├── Axe 1 : الأسس (Fondements)
        ├── Axe 2 : الدين (Religion)
        ├── Axe 3 : البحث (Recherche)
        ├── Axe 4 : الكتابة (Écriture)
        └── Axe 5 : الأثر والتوسّع (Impact & Expansion)

[ContactForm]
  ├── Nom
  ├── Email
  ├── Message
  ├── reCAPTCHA/honeypot
  └── Bouton d’envoi

[Footer]
  ├── Réseaux sociaux
  ├── Mentions légales
  └── Message de sincérité
```

Chaque composant est conçu pour être réutilisable, accessible, et facilement personnalisable selon la langue et la direction du texte (RTL/LTR).

---

## 4. Animations : Techniques et Outils

### 4.1. Animation de chargement islamique

- **SVG animé** : Utilisation de `stroke-dasharray` et `stroke-dashoffset` pour simuler le tracé de la calligraphie ou la formation de motifs géométriques.
- **Lottie** : Pour des animations vectorielles complexes exportées depuis After Effects.
- **GSAP/Framer Motion** : Pour orchestrer les timelines, morphings, et effets de lumière douce.

**Exemple d’animation de calligraphie :**
- Le mot "تفقه" se dessine progressivement, accompagné de motifs étoilés ou entrelacés.
- Effet de lumière dorée (dégradé radial, opacité animée) pour rappeler l’or (#C5A96A).

### 4.2. Animation du logo TAFAQUH

- **SVG vectoriel** : Logo découpé en paths pour permettre l’animation du tracé et des remplissages.
- **GSAP DrawSVGPlugin** : Animation du tracé, apparition des éléments, morphing si besoin.
- **Framer Motion** : Pour les transitions d’état, hover, ou apparition/disparition.

### 4.3. Motifs géométriques

- **SVG patterns** : Générés via Pattern Monster, Vecteezy, ou SVGator, intégrés en background ou en éléments décoratifs.
- **CSS** : Utilisation de `background-image: url('motif.svg')` ou `mask-image` pour des effets subtils.

### 4.4. Performance et accessibilité

- **Animations composited** : Privilégier les propriétés CSS transform et opacity pour garantir la fluidité (60fps) et éviter les recalculs de layout.
- **Préférences utilisateur** : Respecter `prefers-reduced-motion` pour désactiver ou simplifier les animations si nécessaire.

---

## 5. Internationalisation (i18n) et Multilinguisme

### 5.1. Outils et implémentation

- **i18next** : Gestion des traductions via fichiers JSON, détection automatique de la langue, fallback, interpolation de variables.
- **Support RTL** : Détection de la langue arabe pour appliquer `dir="rtl"` et charger les polices arabes.
- **Sélecteur de langue** : Composant accessible, compatible clavier et screen reader, avec labels localisés.

### 5.2. Structure des fichiers de traduction

```markdown
src/locales/
  ├── ar.json
  ├── fr.json
  └── en.json
```

Chaque fichier contient les clés/valeurs pour tous les textes affichés sur la page.

### 5.3. Textes exacts à afficher (ar/fr/en)

#### 5.3.1. Section d’introduction (Hero)

| Clé             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| project_name    | تفقه                                       | TAFAQUH                                  | TAFAQUH                           |
| slogan          | نحو فهمٍ أعمق للعلم والدين                 | Vers une compréhension profonde du savoir et de la religion | Towards a deeper understanding of knowledge and faith |
| to_be_continued | ...يتبع                                    | ...à suivre                              | ...to be continued                |

#### 5.3.2. À propos du projet

| Clé             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| about_title     | عن المشروع                                 | À propos du projet                       | About the project                 |
| about_text      | مشروع تفقه منصة تجمع بين العلم والدين، البحث والكتابة، وتسعى إلى الأثر والتوسّع. | TAFAQUH est une plateforme qui relie science, religion, recherche, écriture, et vise l’impact et l’expansion. | TAFAQUH is a platform bridging knowledge, faith, research, writing, and aims for impact and expansion. |

#### 5.3.3. Les 5 axes (المحاور)

| Axe             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| foundations     | الأسس<br>الركائز التي يقوم عليها المشروع   | Les fondements<br>Les bases du projet    | Foundations<br>The pillars of the project |
| religion        | الدين<br>المرجعية الشرعية والقيم           | La religion<br>Référence et valeurs      | Religion<br>Reference and values  |
| research        | البحث<br>منهجية الاستقصاء والتدقيق         | La recherche<br>Méthodologie et rigueur  | Research<br>Methodology and rigor |
| writing         | الكتابة<br>التعبير والتوثيق                | L’écriture<br>Expression et documentation| Writing<br>Expression and documentation |
| impact          | الأثر والتوسّع<br>نشر الفائدة وتوسيع الدائرة| Impact & expansion<br>Diffusion et rayonnement | Impact & expansion<br>Diffusion and outreach |

#### 5.3.4. Formulaire de contact

| Clé             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| contact_title   | تواصل معنا                                 | Contactez-nous                           | Contact us                        |
| name_label      | الاسم                                      | Nom                                      | Name                              |
| email_label     | البريد الإلكتروني                           | Email                                    | Email                             |
| message_label   | الرسالة                                    | Message                                  | Message                           |
| submit_button   | إرسال                                      | Envoyer                                  | Send                              |
| success_msg     | تم إرسال رسالتك بنجاح. سنعود إليك قريبًا.   | Votre message a été envoyé avec succès. Nous vous répondrons bientôt. | Your message has been sent successfully. We will get back to you soon. |
| error_msg       | حدث خطأ أثناء الإرسال. حاول مرة أخرى.       | Une erreur est survenue. Veuillez réessayer. | An error occurred. Please try again. |

#### 5.3.5. Pied de page

| Clé             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| legal_mentions  | الشروط والخصوصية                           | Mentions légales                         | Legal notice                      |
| sincerity_msg   | نسأل الله الإخلاص والقبول                   | Nous demandons à Dieu sincérité et acceptation | We ask God for sincerity and acceptance |

#### 5.3.6. Réseaux sociaux

| Clé             | Arabe                                      | Français                                 | Anglais                           |
|-----------------|--------------------------------------------|------------------------------------------|-----------------------------------|
| follow_us       | تابعنا على الشبكات الاجتماعية               | Suivez-nous sur les réseaux sociaux      | Follow us on social media         |

---

## 6. Accessibilité et Support RTL

### 6.1. Prise en charge du RTL

- **`dir="rtl"`** appliqué automatiquement pour la langue arabe, `dir="ltr"` pour fr/en.
- **CSS logiques** : Utilisation de propriétés comme `margin-inline-start`, `padding-inline-end`, `border-inline-start` pour garantir la compatibilité RTL/LTR.
- **Typographie** : Polices arabes adaptées (Amiri, Noto Naskh Arabic), tailles de police augmentées pour l’arabe (18px min), line-height ≥ 1.7, jamais de letter-spacing sur l’arabe.
- **Icônes et motifs** : Les flèches, chevrons, et éléments directionnels sont inversés en RTL ; les icônes universelles (loupe, maison, etc.) ne sont pas inversées.

### 6.2. Accessibilité (WCAG)

- **Contraste élevé** : Palette testée pour un ratio ≥ 4.5:1 (vert foncé #1F4D36, or #C5A96A, fond crème/blanc).
- **Navigation clavier** : Tous les éléments interactifs (boutons, liens, sélecteur de langue, formulaire) sont accessibles au clavier.
- **ARIA** : Labels localisés (`aria-label` dans la langue courante), landmarks (`role="main"`, `role="navigation"`, etc.).
- **Formulaires** : Champs avec labels visibles, indications d’erreur textuelles et visuelles, messages d’aide, focus visible.
- **Images** : `alt` localisé, images décoratives avec `role="presentation"`.

### 6.3. Tests et validation

- **Audit Lighthouse** et **axe-core** sur chaque langue pour garantir l’accessibilité.
- **Checklist** : RTL, typographie, navigation, formulaires, couleurs, médias, ARIA, etc.

---

## 7. Design Islamique : Principes et Ressources

### 7.1. Principes esthétiques

- **Pas de visages ni d’êtres vivants** : Respect de l’aniconisme islamique.
- **Motifs géométriques** : Utilisation de motifs étoilés, entrelacés, zellij, girih, etc. pour décorer les backgrounds, séparateurs, encadrements.
- **Calligraphie** : Utilisation de la calligraphie arabe (Naskh, Thuluth) pour les titres, slogans, animations.
- **Couleurs sobres** : Vert foncé (#1F4D36), or (#C5A96A), fond blanc/crème, accentuation douce, lumière diffuse.
- **Effets de lumière** : Dégradés radiaux, ombres douces, halos pour rappeler la spiritualité.

### 7.2. Ressources graphiques

- **SVG libres** : Pattern Monster, Vecteezy, Freepik pour motifs géométriques.
- **Polices** : Amiri (Naskh, licence libre), Noto Naskh Arabic, Montserrat/Inter pour le latin.
- **Inspiration** : The Pilgrim, LaunchGood, Noor Ramadan Landing Page, Qudra, Dribbble, Behance.

---

## 8. Palette de Couleurs et Styles

| Élément         | Couleur principale | Couleur secondaire | Fond           | Accent           |
|-----------------|-------------------|--------------------|----------------|------------------|
| Vert foncé      | #1F4D36           |                    |                |                  |
| Or              | #C5A96A           |                    |                |                  |
| Fond            |                   |                    | #FFFFFF / #FAF7F0 |                |
| Texte principal | #1F4D36           |                    |                |                  |
| Texte secondaire| #555555           |                    |                |                  |
| Erreur          | #dc3545           |                    |                |                  |

- **Contraste** : Tous les textes sur fond crème/blanc ou vert foncé respectent un ratio ≥ 4.5:1.
- **Effets** : Dégradés subtils, ombres portées douces, transitions fluides.

---

## 9. Formulaire de Contact : Backend, Sécurité et RGPD

### 9.1. Backend Node.js

- **API route** : `/api/contact` (POST), gérée par Next.js App Router.
- **Validation** : Vérification des champs (nom, email, message), regex pour l’email, longueur minimale/maximale.
- **Envoi d’email** : Nodemailer (SMTP ou service tiers), variables d’environnement pour les credentials.

### 9.2. Sécurité

- **reCAPTCHA v3** : Intégration côté client et vérification côté serveur pour bloquer les robots.
- **Honeypot** : Champ caché pour piéger les bots.
- **Rate limiting** : Limitation du nombre de requêtes par IP.
- **Sanitization** : Nettoyage des entrées pour éviter les injections.

### 9.3. RGPD et mentions légales

- **Consentement** : Message d’information sur la collecte des données, lien vers la politique de confidentialité.
- **Mentions légales** : Page dédiée avec identité, coordonnées, hébergeur, droits, etc..
- **Droits utilisateurs** : Droit d’accès, de rectification, d’effacement, information sur la durée de conservation.

---

## 10. SEO et Métadonnées Multilingues

### 10.1. Balises SEO

- **Balises title et meta description** localisées pour chaque langue.
- **Balises Open Graph** : `og:title`, `og:description`, `og:image` pour le partage sur les réseaux sociaux.
- **Balises Twitter Card** : `twitter:title`, `twitter:description`, `twitter:image`.

### 10.2. Hreflang

- **Implémentation** : Balises `<link rel="alternate" hreflang="ar" href="...">` pour chaque version linguistique.
- **Canonical** : Balise `<link rel="canonical" href="...">` pour éviter le contenu dupliqué.

### 10.3. Accessibilité SEO

- **Structure sémantique** : Titres hiérarchisés (`<h1>`, `<h2>`, ...), balises `<nav>`, `<main>`, `<footer>`.
- **Texte alternatif** : `alt` localisé pour toutes les images.

---

## 11. Déploiement, CI/CD et Optimisation

### 11.1. Déploiement

- **Vercel** : Déploiement en un clic, CDN mondial, preview URLs, intégration Git, SSL automatique.
- **Alternatives** : Netlify, DigitalOcean, PM2 pour auto-hébergement.

### 11.2. CI/CD

- **Tests automatiques** : Linting, tests d’accessibilité (axe-core), tests de performance (Lighthouse).
- **Optimisation** : Compression des images/SVG, lazy-loading, minification CSS/JS, budgets de performance.

### 11.3. Budgets de performance

- **LCP < 1.5s**, **CLS < 0.1**, **TBT < 100ms**.
- **Fonts** : WOFF2, subset, preload, font-display: swap.
- **SVG** : Optimisés, inlinés ou en assets, pas de surpoids.

---

## 12. Fichiers et Dépendances Recommandées

### 12.1. package.json (extrait)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "i18next": "^23.0.0",
    "react-i18next": "^13.0.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0",
    "nodemailer": "^8.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

### 12.2. .env.example

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your_user
SMTP_PASS=your_password
EMAIL_FROM=contact@tafaquh.org
EMAIL_TO=admin@tafaquh.org
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

---

## 13. Instructions de Style et d’Intégration

### 13.1. Intégration des polices

- **Amiri** et **Noto Naskh Arabic** hébergées localement dans `/public/fonts/`.
- **@font-face** dans `globals.css` :

```css
@font-face {
  font-family: 'Amiri';
  src: url('/fonts/Amiri-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Noto Naskh Arabic';
  src: url('/fonts/NotoNaskhArabic-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

- **Sélecteur CSS** : `[lang="ar"] { font-family: 'Amiri', 'Noto Naskh Arabic', serif; }`

### 13.2. Utilisation des motifs SVG

- **Background** : `background-image: url('/images/motifs/motif1.svg');`
- **Décorations** : `<svg>` inliné dans les composants, couleurs adaptables via CSS variables.

### 13.3. Responsive et mobile

- **Tailwind CSS** : Breakpoints pour mobile, tablette, desktop.
- **Flexbox/Grid** : Pour la disposition des axes, formulaire, footer.

### 13.4. Animation SVG

- **Calligraphie** : SVG exporté avec paths séparés, animation via GSAP ou CSS (`stroke-dasharray`, `stroke-dashoffset`).
- **Logo** : Animation orchestrée avec Framer Motion ou GSAP, morphing possible pour transitions.

---

## 14. Exemples de Contenu Multilingue (ar/fr/en)

### 14.1. ar.json

```json
{
  "project_name": "تفقه",
  "slogan": "نحو فهمٍ أعمق للعلم والدين",
  "to_be_continued": "...يتبع",
  "about_title": "عن المشروع",
  "about_text": "مشروع تفقه منصة تجمع بين العلم والدين، البحث والكتابة، وتسعى إلى الأثر والتوسّع.",
  "axes": {
    "foundations": "الأسس\nالركائز التي يقوم عليها المشروع",
    "religion": "الدين\nالمرجعية الشرعية والقيم",
    "research": "البحث\nمنهجية الاستقصاء والتدقيق",
    "writing": "الكتابة\nالتعبير والتوثيق",
    "impact": "الأثر والتوسّع\nنشر الفائدة وتوسيع الدائرة"
  },
  "contact_title": "تواصل معنا",
  "name_label": "الاسم",
  "email_label": "البريد الإلكتروني",
  "message_label": "الرسالة",
  "submit_button": "إرسال",
  "success_msg": "تم إرسال رسالتك بنجاح. سنعود إليك قريبًا.",
  "error_msg": "حدث خطأ أثناء الإرسال. حاول مرة أخرى.",
  "legal_mentions": "الشروط والخصوصية",
  "sincerity_msg": "نسأل الله الإخلاص والقبول",
  "follow_us": "تابعنا على الشبكات الاجتماعية"
}
```

### 14.2. fr.json

```json
{
  "project_name": "TAFAQUH",
  "slogan": "Vers une compréhension profonde du savoir et de la religion",
  "to_be_continued": "...à suivre",
  "about_title": "À propos du projet",
  "about_text": "TAFAQUH est une plateforme qui relie science, religion, recherche, écriture, et vise l’impact et l’expansion.",
  "axes": {
    "foundations": "Les fondements\nLes bases du projet",
    "religion": "La religion\nRéférence et valeurs",
    "research": "La recherche\nMéthodologie et rigueur",
    "writing": "L’écriture\nExpression et documentation",
    "impact": "Impact & expansion\nDiffusion et rayonnement"
  },
  "contact_title": "Contactez-nous",
  "name_label": "Nom",
  "email_label": "Email",
  "message_label": "Message",
  "submit_button": "Envoyer",
  "success_msg": "Votre message a été envoyé avec succès. Nous vous répondrons bientôt.",
  "error_msg": "Une erreur est survenue. Veuillez réessayer.",
  "legal_mentions": "Mentions légales",
  "sincerity_msg": "Nous demandons à Dieu sincérité et acceptation",
  "follow_us": "Suivez-nous sur les réseaux sociaux"
}
```

### 14.3. en.json

```json
{
  "project_name": "TAFAQUH",
  "slogan": "Towards a deeper understanding of knowledge and faith",
  "to_be_continued": "...to be continued",
  "about_title": "About the project",
  "about_text": "TAFAQUH is a platform bridging knowledge, faith, research, writing, and aims for impact and expansion.",
  "axes": {
    "foundations": "Foundations\nThe pillars of the project",
    "religion": "Religion\nReference and values",
    "research": "Research\nMethodology and rigor",
    "writing": "Writing\nExpression and documentation",
    "impact": "Impact & expansion\nDiffusion and outreach"
  },
  "contact_title": "Contact us",
  "name_label": "Name",
  "email_label": "Email",
  "message_label": "Message",
  "submit_button": "Send",
  "success_msg": "Your message has been sent successfully. We will get back to you soon.",
  "error_msg": "An error occurred. Please try again.",
  "legal_mentions": "Legal notice",
  "sincerity_msg": "We ask God for sincerity and acceptance",
  "follow_us": "Follow us on social media"
}
```

---

## 15. Instructions Techniques et Bonnes Pratiques

### 15.1. Installation et démarrage

```bash
git clone https://github.com/tafaquh/landing-page.git
cd landing-page
npm install
npm run dev
```

### 15.2. Déploiement Vercel

- Connecter le repo à Vercel.
- Configurer les variables d’environnement.
- Déployer via l’interface ou `vercel` CLI.

### 15.3. Ajout d’une langue

- Ajouter un fichier `xx.json` dans `src/locales/`.
- Ajouter la langue dans le sélecteur et la configuration i18next.

### 15.4. Ajout d’un motif ou d’une animation

- Générer le SVG via Pattern Monster ou SVGator.
- Placer le fichier dans `/public/images/motifs/` ou `/public/lottie/`.
- Importer et intégrer dans le composant concerné.

### 15.5. RGPD et conformité

- Compléter la page des mentions légales avec les informations requises (identité, hébergeur, droits, etc.).
- Ajouter une politique de confidentialité accessible depuis le footer.

---

## 16. Synthèse et Recommandations

Ce plan vise à garantir que la landing page TAFAQUH soit :

- **Esthétiquement islamique** : motifs géométriques, calligraphie, couleurs sobres, sans éléments interdits.
- **Multilingue et inclusif** : support complet de l’arabe (RTL), du français et de l’anglais, accessibilité WCAG.
- **Sécurisé et conforme** : formulaire protégé, RGPD, mentions légales.
- **Performant et optimisé** : animations fluides, assets légers, SEO multilingue, responsive.
- **Facile à maintenir** : structure modulaire, fichiers de traduction séparés, assets organisés.

En suivant ce plan, l’équipe de développement pourra livrer une landing page à la fois moderne, respectueuse des valeurs islamiques, et exemplaire sur le plan technique et UX.

