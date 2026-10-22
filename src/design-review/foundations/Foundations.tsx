import { useState } from 'react'
import styles from '../review.module.css'

const colors = [
  { name: 'Crème', value: '#FFF8ED', role: 'La toile de fond' },
  { name: 'Encre', value: '#241A16', role: 'Les mots et les contours' },
  { name: 'Tomate', value: '#B52A18', role: 'L’action principale' },
  { name: 'Rose', value: '#FFD6E2', role: 'Une touche de douceur' },
  { name: 'Citron', value: '#F4E66A', role: 'Un peu de peps' },
  { name: 'Bordeaux', value: '#8C1740', role: 'Les erreurs et retraits' },
]
const pairs = [
  ['Encre / crème', '#241A16', '#FFF8ED'], ['Encre / rose', '#241A16', '#FFD6E2'],
  ['Encre / citron', '#241A16', '#F4E66A'], ['Crème / tomate', '#FFF8ED', '#B52A18'],
  ['Bordeaux / crème', '#8C1740', '#FFF8ED'], ['Bordeaux / rose', '#8C1740', '#FFD6E2'],
  ['Encre / tomate (focus)', '#241A16', '#B52A18'],
]
function luminance(hex: string) {
  const values = hex.slice(1).match(/../g)!.map(value => {
    const channel = parseInt(value, 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return values[0]! * 0.2126 + values[1]! * 0.7152 + values[2]! * 0.0722
}
function contrast(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return ((values[0]! + 0.05) / (values[1]! + 0.05)).toFixed(2)
}

export function Foundations() {
  const [name, setName] = useState('')
  const [fallbackFont, setFallbackFont] = useState(false)
  const [imageState, setImageState] = useState('photo')
  const [imageFailed, setImageFailed] = useState(false)
  const [crop, setCrop] = useState('responsive')
  const [reviewState, setReviewState] = useState('ready')
  return <>
    <section className={styles.intro}>
      <div><p className={styles.eyebrow}>Le carnet de direction · 01 / 04</p><h1>Du caractère.<br />De la couleur.<br /><span>Et de l’appétit.</span></h1><p>Une direction pop gourmande, pensée comme un magazine qu’on dévore. Voici les premiers ingrédients de notre identité.</p><a className={styles.primary} href="#names">Explorer les fondations <span aria-hidden="true">↓</span></a></div>
      <div className={styles.cover}>{imageFailed ? <div className={styles.coverFallback}>Photo indisponible</div> : <img src="/design-review/pasta.jpg" alt="Pâtes à la tomate garnies de basilic" onError={() => setImageFailed(true)} />}<div className={styles.coverCaption}><span>Nom retenu</span><strong>Miam !</strong><p>Les bonnes idées se cuisinent.</p></div><span className={styles.sticker}>À savourer<br />ensemble</span></div>
    </section>
    <section id="names" className={styles.section}><div className={styles.sectionHeading}><span>01</span><div><h2>Comment on s’appelle ?</h2><p>Miam ! a été retenu. Retrouvez ici les trois propositions et leur traitement initial.</p></div></div>
      <div className={styles.grid}>{['Miam !', 'À table !', 'Zeste'].map((item, index) => <button key={item} type="button" className={styles.nameCard} aria-pressed={name === item} onClick={() => setName(name === item ? '' : item)}><span>{index === 0 ? 'Nom retenu' : 'Proposition archivée'}</span><strong>{item}</strong><span>Les bonnes idées se cuisinent.</span><span>{name === item ? '✓ Aperçu choisi' : 'Essayer ce nom'}</span></button>)}</div><p aria-live="polite" className={styles.note}>{name ? `Aperçu : ${name} — choix temporaire, à confirmer dans la conversation.` : 'Miam ! est le nom retenu par votre validation de F01. Les autres noms restent disponibles en aperçu.'}</p>
    </section>
    <section className={styles.section}><div className={styles.sectionHeading}><span>02</span><div><h2>La palette du garde-manger</h2><p>Une base crème et encre. Du rose et du citron pour les grands aplats. La tomate pour inviter à agir.</p></div></div><div className={styles.palette}>{colors.map(color => <div key={color.name}><div className={styles.swatch} style={{ background: color.value }} /><h3>{color.name}</h3><p>{color.value}</p><p>{color.role}</p></div>)}</div>
      <details className={styles.details}><summary>Contrastes mesurés et règles d’usage</summary><p>Texte courant : 4,5:1 minimum. Grands titres et contours essentiels : 3:1 minimum. Le focus utilise une séparation crème ; aucun texte n’est posé directement sur la photo.</p><ul>{pairs.map(([label, foreground, background]) => <li key={label}>{label} : <strong>{contrast(foreground!, background!)}:1</strong>{Number(contrast(foreground!, background!)) < 4.5 ? ' — sous 4,5:1 ; contour uniquement, avec séparation crème.' : ' — conforme au seuil du texte courant.'}</li>)}</ul></details>
    </section>
    <section className={styles.section}><div className={styles.sectionHeading}><span>03</span><div><h2>Des titres qui ont du goût</h2><p>Fredoka 700 pour la générosité. Une police système sobre pour lire confortablement.</p></div></div><label className={styles.check}><input type="checkbox" checked={fallbackFont} onChange={event => setFallbackFont(event.target.checked)} /> Afficher la police de secours</label><div className={styles.typePanel} style={{ fontFamily: fallbackFont ? 'ui-rounded, system-ui, sans-serif' : 'var(--font-display)' }}><p className={styles.eyebrow}>{fallbackFont ? 'Secours · police arrondie du système' : 'Fredoka · graisse 700'}</p><p className={styles.display}>On passe à table ?</p><p className={styles.compact}>Une pincée de curiosité.</p><h3>La cuisine des jours heureux</h3><p className={styles.bodySpecimen}>Des recettes généreuses, des ingrédients simples et le plaisir de prendre son temps. À déguster été comme hiver, à deux ou avec toute la tablée.</p><p className={styles.bodySpecimen}>Corps 16 / 24 · titres 24, 32 et 48 · graisses 400 et 700</p></div><div className={styles.panel}><h3 style={{ fontFamily: 'ui-rounded, system-ui, sans-serif' }}>On passe à table ?</h3><p>Comparaison permanente : police de secours arrondie du système. Son dessin dépend de votre appareil.</p></div></section>
    <section className={styles.section}><div className={styles.sectionHeading}><span>04</span><div><h2>De l’espace pour respirer</h2><p>Des formes souples, des repères francs et une échelle d’espacement commune.</p></div></div><div className={styles.spacing}>{[4, 8, 16, 24, 32, 48, 64].map(size => <div key={size}><span>{size} px</span><div style={{ width: size, height: size }} /></div>)}</div><div className={styles.grid}><div className={styles.panel}><h3>Douceur</h3><p>Panneau : rayon 16 px.</p></div><label className={styles.field}>Un champ à essayer<input placeholder="Une envie de saison…" /></label><div className={styles.panel}><a href="#photography" className={styles.primary}>Voir les photos</a><p>Action en pilule · cible 44 px minimum.</p></div></div><p className={styles.note}>Survolez l’action puis utilisez Tab pour voir le focus. Réponse couleur : 160 ms. La préférence « réduire les animations » supprime les transitions.</p></section>
    <section id="photography" className={styles.section}><div className={styles.sectionHeading}><span>05</span><div><h2>La photo ouvre l’appétit</h2><p>Des images généreuses. Un cadrage qui s’adapte. Une alternative soignée quand la photo manque.</p></div></div><div className={styles.controls}><label>État de l’image<select value={imageState} onChange={event => setImageState(event.target.value)}><option value="photo">Photo disponible</option><option value="missing">Photo indisponible</option><option value="loading">Chargement</option></select></label><label>Cadrage<select value={crop} onChange={event => setCrop(event.target.value)}><option value="responsive">Adaptatif · mobile 4:3 / large 16:9</option><option value="card">Carte · 4:3</option></select></label></div><figure className={styles.figure}><div className={`${styles.photo} ${crop === 'card' ? styles.cardCrop : ''}`}>{imageState === 'photo' && !imageFailed ? <img src="/design-review/pasta.jpg" alt="Pâtes à la tomate et au basilic dans une assiette blanche" onError={() => setImageFailed(true)} /> : <div className={styles.fallback} role="status">{imageState === 'loading' ? 'Chargement de la photo…' : 'Photo indisponible'}</div>}</div><figcaption><h3>Pâtes à la tomate, basilic frais et envie de partager un très grand repas ensoleillé</h3><p>35 min · Cuisine italienne · Exemple de texte long</p></figcaption></figure><p className={styles.note}>Photo : <a href="https://www.pexels.com/photo/cooked-pasta-on-white-plate-1279330/">Lisa Fotios / Pexels</a> · <a href="https://www.pexels.com/license/">Licence Pexels</a>. Police : <a href="https://github.com/google/fonts/tree/main/ofl/fredoka">Fredoka / Google Fonts</a>, licence SIL OFL, fichiers servis localement.</p></section>
    <section className={styles.section}><div className={styles.sectionHeading}><span>06</span><div><h2>Quand tout ne va pas comme prévu</h2><p>Des états de revue distincts, avec de vrais mots et une mise en page qui laisse le texte respirer.</p></div></div><label className={styles.field}>Scénario de démonstration<select value={reviewState} onChange={event => setReviewState(event.target.value)}><option value="ready">Contenu disponible</option><option value="empty">Vide</option><option value="loading">Chargement</option><option value="error">Erreur</option><option value="long">Texte très long</option></select></label><div className={styles.panel}>
      {reviewState === 'ready' && <p>Les fondations sont disponibles pour votre revue.</p>}
      {reviewState === 'empty' && <p>Aucune remarque pour le moment. Partagez vos premières impressions dans la conversation.</p>}
      {reviewState === 'loading' && <><div className={styles.skeleton} aria-hidden="true" /><p role="status">Chargement de la revue…</p></>}
      {reviewState === 'error' && <><p role="alert" className={styles.error}>La revue n’a pas pu être affichée. Réessayez pour découvrir les fondations.</p><button type="button" onClick={() => setReviewState('ready')}>Recharger la revue</button></>}
      {reviewState === 'long' && <p>À l’heure du déjeuner, les généreuses préparations méditerranéennes s’accompagnent d’ingrédients fraîchement cueillis et d’une très longue conversation autour de la table. Repère sans espace : fondationsgourmandesàpartageraveclatabléeetlesinvitésdetouteslessaisons.</p>}
    </div></section>
  </>
}
