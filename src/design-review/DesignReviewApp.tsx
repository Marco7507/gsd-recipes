import { useState } from 'react'
import { Foundations } from './foundations/Foundations'
import { ComponentGallery } from './components/ComponentGallery'
import './tokens.css'
import styles from './review.module.css'

export function DesignReviewApp() {
  const [stage, setStage] = useState<'foundations' | 'components'>('components')
  return <>
    <a className={styles.skip} href="#content">Aller au contenu</a>
    <header className={styles.chrome}>
      <div className={styles.chromeInner}><strong>Atelier de design — données de démonstration</strong><span>{stage === 'foundations' ? 'F01 · Fondations validées' : 'C01 · Composants à discuter'}</span></div>
    </header>
    <main id="content" className={styles.page}>
      <nav aria-label="Étapes de la revue" className={styles.stageNavigation}><button type="button" aria-current={stage === 'foundations' ? 'step' : undefined} onClick={() => setStage('foundations')}>01 · Fondations · validées</button><button type="button" aria-current={stage === 'components' ? 'step' : undefined} onClick={() => setStage('components')}>02 · Composants</button><span>03 · Compositions · à venir</span><span>04 · Écrans · à venir</span></nav>
      {stage === 'foundations' ? <Foundations /> : <ComponentGallery />}
      <footer className={styles.reviewNote}><h2>À vous de mettre votre grain de sel.</h2><p>{stage === 'foundations' ? 'Miam ! et les fondations F01 ont été validés. Les trois noms restent visibles pour garder la trace des propositions.' : 'Essayez les composants, leurs états et leur navigation au clavier. Partagez vos remarques dans la conversation en citant C01 et les largeurs regardées.'}</p><p>Vos essais ici ne valident aucune décision. La comparaison des trois compositions suivra la validation des composants.</p></footer>
    </main>
  </>
}
