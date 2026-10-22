import { useState } from 'react'

export default function App() {
  const [name, setName] = useState('')
  return <><a href="#content">Aller au contenu</a><header>Atelier de design — données de démonstration</header><main id="content"><p>Révision F01 · Proposition</p><h1>Les fondations gourmandes</h1><label>Nom à essayer <select value={name} onChange={event => setName(event.target.value)}><option value="">Comparer les noms</option>{['Miam !', 'À table !', 'Zeste'].map(item => <option key={item}>{item}</option>)}</select></label><p>{name || 'Aucun nom sélectionné'}</p></main></>
}
