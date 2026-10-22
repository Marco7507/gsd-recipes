import { Foundations } from './foundations/Foundations'
import './tokens.css'
import styles from './review.module.css'

export function DesignReviewApp() {
  return <>
    <a className={styles.skip} href="#content">Aller au contenu</a>
    <header className={styles.chrome}>
      <div className={styles.chromeInner}><strong>Atelier de design — données de démonstration</strong><span>F01 · Proposition à discuter</span></div>
    </header>
    <main id="content" className={styles.page}>
      <nav aria-label="Étapes de la revue" className={styles.stages}><span aria-current="step">01 · Fondations</span><span>02 · Composants · à venir</span><span>03 · Compositions · à venir</span><span>04 · Écrans · à venir</span></nav>
      <Foundations />
      <footer className={styles.reviewNote}><h2>À vous de mettre votre grain de sel.</h2><p>Couleurs, nom, rondeur des titres, photos : partagez vos préférences dans la conversation en citant F01 et les largeurs regardées. Vos essais ici ne valident aucune décision.</p><p>La revue des composants suivra votre validation des fondations.</p></footer>
    </main>
  </>
}
