import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import styles from '../review.module.css'

export type PreviewState = 'default' | 'hover' | 'focus' | 'selected' | 'disabled' | 'loading' | 'error'
type Filters = { cuisine: string; difficulty: string; maximumTime: string }
const emptyFilters: Filters = { cuisine: '', difficulty: '', maximumTime: '' }
const recipeName = 'Pâtes à la tomate et au basilic frais'

function Icon({ name }: { name: 'heart' | 'recipes' | 'create' }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'heart' ? <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /> : name === 'create' ? <><path d="M12 5v14M5 12h14" /><circle cx="12" cy="12" r="10" /></> : <><path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3v18M17 3c-4 4-4 9 0 9" /></>}
  </svg>
}

export function FavoriteButton({ name, selected, onToggle, disabled = false }: { name: string; selected: boolean; onToggle: () => void; disabled?: boolean }) {
  return <button type="button" className={styles.favorite} aria-label={`${selected ? 'Retirer' : 'Ajouter'} ${name} ${selected ? 'des' : 'aux'} favoris`} aria-pressed={selected} disabled={disabled} onClick={onToggle}><Icon name="heart" /><span>{selected ? 'Enregistrée' : 'Enregistrer'}</span></button>
}

export function RecipeCard({ name = recipeName, imageMissing = false, disabled = false, onOpen }: { name?: string; imageMissing?: boolean; disabled?: boolean; onOpen: () => void }) {
  const [selected, setSelected] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  return <article className={styles.recipeCard}>
    <div className={styles.cardImage}>{imageMissing || imageFailed ? <span>Photo indisponible</span> : <img src="/design-review/pasta.jpg" alt="Pâtes à la tomate et au basilic" onError={() => setImageFailed(true)} />}</div>
    <div className={styles.cardBody}><p>35 min <span aria-hidden="true">·</span> Cuisine italienne</p><h3><a href="#recipe-preview" onClick={event => { event.preventDefault(); onOpen() }}>{name}</a></h3><FavoriteButton name={name} selected={selected} disabled={disabled} onToggle={() => setSelected(!selected)} /></div>
  </article>
}

export function NavigationSpecimen({ mobile = false }: { mobile?: boolean }) {
  const [current, setCurrent] = useState('Recettes')
  const items = [{ label: 'Recettes', icon: 'recipes' }, { label: 'Favoris', icon: 'heart' }, { label: 'Créer une recette', icon: 'create' }] as const
  return <div className={styles.navigationSpecimen}>
    {!mobile && <strong className={styles.brand}>Miam !</strong>}
    <nav aria-label={mobile ? 'Navigation mobile de démonstration' : 'Navigation bureau de démonstration'} className={mobile ? styles.mobileNavigation : styles.desktopNavigation}>
      {items.map(item => <a key={item.label} href="#navigation-preview" aria-current={current === item.label ? 'page' : undefined} onClick={event => { event.preventDefault(); setCurrent(item.label) }}><Icon name={item.icon} /><span>{item.label}</span></a>)}
    </nav><p role="status" className={styles.navigationStatus}>Aperçu : {current}</p>
  </div>
}

function FilterSelects({ value, onChange, prefix }: { value: Filters; onChange: (value: Filters) => void; prefix: string }) {
  return <div className={styles.filterFields}>
    <label className={styles.field} htmlFor={`${prefix}-cuisine`}>Cuisine<select id={`${prefix}-cuisine`} value={value.cuisine} onChange={event => onChange({ ...value, cuisine: event.target.value })}><option value="">Toutes les cuisines</option><option>Italienne</option><option>Française</option><option>Indienne</option></select></label>
    <label className={styles.field} htmlFor={`${prefix}-difficulty`}>Difficulté<select id={`${prefix}-difficulty`} value={value.difficulty} onChange={event => onChange({ ...value, difficulty: event.target.value })}><option value="">Toutes les difficultés</option><option>Facile</option><option>Moyenne</option></select></label>
    <label className={styles.field} htmlFor={`${prefix}-time`}>Temps total maximum<select id={`${prefix}-time`} value={value.maximumTime} onChange={event => onChange({ ...value, maximumTime: event.target.value })}><option value="">Sans limite</option><option value="30">30 min</option><option value="60">60 min</option></select></label>
  </div>
}

export function FilterSpecimen() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [applied, setApplied] = useState(emptyFilters)
  const [draft, setDraft] = useState(emptyFilters)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const prefix = useId()
  const active = (Object.entries(applied) as [keyof Filters, string][]).filter(([, value]) => value)
  function updateApplied(value: Filters) { setApplied(value); setPage(1) }
  function close() { setDraft(applied); dialog.current?.close() }
  return <div className={styles.specimenStack}>
    <label className={styles.field}>Rechercher une recette<input type="search" value={search} placeholder="Pizza, soupe, poulet…" onChange={event => { setSearch(event.target.value); setPage(1) }} /></label>
    <div className={styles.buttonRow}><button ref={trigger} type="button" className={styles.secondary} onClick={() => { setDraft({ ...applied }); dialog.current?.showModal() }}>Ouvrir les filtres</button><span>Les changements du panneau restent des brouillons jusqu’à application.</span></div>
    <div className={styles.buttonRow} aria-label="Filtres appliqués">{active.length ? active.map(([key, value]) => <button type="button" key={key} className={styles.chip} aria-label={`Retirer le filtre ${key === 'cuisine' ? 'Cuisine' : key === 'difficulty' ? 'Difficulté' : 'Temps total maximum'} : ${value}${key === 'maximumTime' ? ' min' : ''}`} onClick={() => updateApplied({ ...applied, [key]: '' })}>{value}{key === 'maximumTime' ? ' min' : ''} <span aria-hidden="true">×</span></button>) : <p>Aucun filtre appliqué</p>}{active.length > 0 && <button type="button" className={styles.textButton} onClick={() => updateApplied(emptyFilters)}>Réinitialiser les filtres</button>}</div>
    <Pagination page={page} onChange={setPage} />
    <dialog ref={dialog} className={styles.filterDialog} aria-labelledby={`${prefix}-title`} onCancel={() => setDraft(applied)} onClose={() => trigger.current?.focus()}>
      <div className={styles.specimenStack}><div className={styles.dialogHeading}><h3 id={`${prefix}-title`}>Filtrer les recettes</h3><button type="button" autoFocus className={styles.secondary} onClick={close}>Fermer les filtres</button></div>
        <FilterSelects value={draft} onChange={setDraft} prefix={prefix} />
        <button type="button" className={styles.textButton} onClick={() => setDraft(emptyFilters)}>Réinitialiser les filtres</button>
        <button type="button" className={styles.primaryButton} onClick={() => { updateApplied(draft); dialog.current?.close() }}>Voir les recettes</button>
      </div>
    </dialog>
  </div>
}

export function Pagination({ page, onChange }: { page: number; onChange: (page: number) => void }) {
  return <nav className={styles.pagination} aria-label="Pagination de démonstration"><button type="button" disabled={page === 1} onClick={() => onChange(page - 1)}>Page précédente</button><div className={styles.buttonRow}>{[1, 2, 3].map(value => <button type="button" key={value} aria-label={`Aller à la page ${value}`} aria-current={page === value ? 'page' : undefined} onClick={() => onChange(value)}>{value}</button>)}</div><button type="button" disabled={page === 3} onClick={() => onChange(page + 1)}>Page suivante</button></nav>
}

type Row = { id: number; text: string }
export function RecipeRows({ kind }: { kind: 'ingredient' | 'step' }) {
  const prefix = useId()
  const nextId = useRef(2)
  const [rows, setRows] = useState<Row[]>([{ id: 1, text: '' }])
  const [removed, setRemoved] = useState<{ row: Row; index: number } | null>(null)
  const [focusTarget, setFocusTarget] = useState<{ id: number } | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const isIngredient = kind === 'ingredient'
  const label = isIngredient ? 'Ingrédient' : 'Étape'
  useLayoutEffect(() => { if (focusTarget) document.getElementById(`${prefix}-${focusTarget.id}`)?.focus() }, [focusTarget, prefix])
  function add() {
    const row = { id: nextId.current++, text: '' }
    setRows([...rows, row]); setRemoved(null); setFocusTarget({ id: row.id }); setAnnouncement(`${label} ajouté.`)
  }
  function remove(index: number) {
    if (rows.length <= 1) return
    const row = rows[index]!
    setRemoved(row.text.trim() ? { row, index } : null)
    const remaining = rows.filter((_, position) => position !== index)
    setRows(remaining); setFocusTarget({ id: remaining[Math.min(index, remaining.length - 1)]!.id }); setAnnouncement(`${label} retiré.`)
  }
  function restore() {
    if (!removed) return
    const updated = [...rows]; updated.splice(removed.index, 0, removed.row)
    setRows(updated); setFocusTarget({ id: removed.row.id }); setRemoved(null); setAnnouncement(`${label} restauré.`)
  }
  return <div className={styles.specimenStack}><h3>{isIngredient ? 'Ingrédients' : 'Préparation'}</h3><p>Une ligne minimum. Une ligne remplie peut être restaurée jusqu’à la prochaine modification.</p>
    <ol className={styles.rows}>{rows.map((row, index) => <li key={row.id}><label className={styles.field} htmlFor={`${prefix}-${row.id}`}>{label} {index + 1}{isIngredient ? <input id={`${prefix}-${row.id}`} value={row.text} onChange={event => { setRows(rows.map(item => item.id === row.id ? { ...item, text: event.target.value } : item)); setRemoved(null) }} /> : <textarea id={`${prefix}-${row.id}`} rows={3} value={row.text} onChange={event => { setRows(rows.map(item => item.id === row.id ? { ...item, text: event.target.value } : item)); setRemoved(null) }} />}</label><button type="button" className={styles.removeButton} disabled={rows.length === 1} aria-label={`Retirer ${isIngredient ? 'l’ingrédient' : 'l’étape'} ${index + 1}`} onClick={() => remove(index)}>Retirer</button></li>)}</ol>
    <div className={styles.buttonRow}><button type="button" className={styles.secondary} onClick={add}>{isIngredient ? 'Ajouter un ingrédient' : 'Ajouter une étape'}</button>{removed && <button type="button" className={styles.secondary} onClick={restore}>{isIngredient ? 'Restaurer l’ingrédient' : 'Restaurer l’étape'}</button>}</div><p role="status">{announcement}</p>
  </div>
}

type FormValues = { name: string; preparation: string; cooking: string; servings: string }
type FieldKey = keyof FormValues
const fields: { key: FieldKey; label: string; minimum?: number }[] = [
  { key: 'name', label: 'Nom de la recette' }, { key: 'preparation', label: 'Temps de préparation (min)', minimum: 0 },
  { key: 'cooking', label: 'Temps de cuisson (min)', minimum: 0 }, { key: 'servings', label: 'Nombre de portions', minimum: 1 },
]

export function FormSpecimen() {
  const prefix = useId()
  const summary = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<FormValues>({ name: '', preparation: '', cooking: '', servings: '' })
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [submission, setSubmission] = useState<'idle' | 'pending' | 'failure' | 'success'>('idle')
  const [outcome, setOutcome] = useState<'success' | 'failure' | 'pending'>('success')
  const [attempt, setAttempt] = useState(0)
  const lock = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useLayoutEffect(() => { if (Object.keys(errors).length) summary.current?.focus() }, [errors])
  function finish(result: 'success' | 'failure') { setSubmission(result); lock.current = false }
  function submit(event: FormEvent) {
    event.preventDefault()
    if (lock.current) return
    const nextErrors: Partial<Record<FieldKey, string>> = {}
    fields.forEach(field => {
      const value = values[field.key].trim()
      if (!value) nextErrors[field.key] = `Renseignez ${field.label.toLocaleLowerCase('fr')}.`
      else if (field.minimum !== undefined && (!Number.isInteger(Number(value)) || Number(value) < field.minimum)) nextErrors[field.key] = field.key === 'servings' ? 'Saisissez un nombre entier de portions supérieur ou égal à 1.' : 'Saisissez un nombre entier de minutes supérieur ou égal à 0.'
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setSubmission('idle'); return }
    lock.current = true; setAttempt(attempt + 1); setSubmission('pending')
    if (outcome !== 'pending') timer.current = setTimeout(() => finish(outcome), 700)
  }
  return <div className={styles.specimenStack}>
    <div className={styles.scenarioControls}><p>Simulation : aucun envoi réel</p><label className={styles.field}>Réponse à simuler<select value={outcome} disabled={submission === 'pending'} onChange={event => setOutcome(event.target.value as typeof outcome)}><option value="success">Réussite après attente</option><option value="failure">Échec après attente</option><option value="pending">Attente prolongée</option></select></label>{submission === 'pending' && outcome === 'pending' && <div className={styles.buttonRow}><button type="button" className={styles.secondary} onClick={() => finish('success')}>Simuler la réussite</button><button type="button" className={styles.secondary} onClick={() => finish('failure')}>Simuler l’échec</button></div>}<p>Envois simulés : {attempt}</p></div>
    <form noValidate onSubmit={submit} className={styles.specimenStack}>
      {Object.keys(errors).length > 0 && <div ref={summary} tabIndex={-1} className={styles.errorSummary} role="alert"><h3>Vérifiez les champs indiqués avant d’envoyer votre recette.</h3><ul>{fields.filter(field => errors[field.key]).map(field => <li key={field.key}><a href={`#${prefix}-${field.key}`} onClick={event => { event.preventDefault(); document.getElementById(`${prefix}-${field.key}`)?.focus() }}>{field.label} : {errors[field.key]}</a></li>)}</ul></div>}
      <div className={styles.formGrid}>{fields.map(field => <label key={field.key} className={styles.field} htmlFor={`${prefix}-${field.key}`}>{field.label} (obligatoire)<input id={`${prefix}-${field.key}`} type={field.key === 'name' ? 'text' : 'number'} min={field.minimum} step={field.minimum === undefined ? undefined : 1} required value={values[field.key]} disabled={submission === 'pending'} aria-invalid={!!errors[field.key]} aria-describedby={`${prefix}-${field.key}-${errors[field.key] ? 'error' : 'hint'}`} onChange={event => setValues({ ...values, [field.key]: event.target.value })} />{errors[field.key] ? <span id={`${prefix}-${field.key}-error`} className={styles.error}>{errors[field.key]}</span> : <span id={`${prefix}-${field.key}-hint`}>{field.key === 'name' ? 'Un nom complet, même s’il est long.' : field.key === 'servings' ? 'Un entier supérieur ou égal à 1.' : 'Un entier supérieur ou égal à 0.'}</span>}</label>)}</div>
      <button className={styles.primaryButton} type="submit" disabled={submission === 'pending'}>{submission === 'pending' ? 'Envoi de la recette…' : submission === 'failure' ? 'Réessayer l’envoi' : 'Envoyer la recette'}</button>
      <div role="status" aria-live="polite">{submission === 'pending' && 'Envoi de la recette…'}{submission === 'success' && <><h3>Recette envoyée</h3><p>L’API de démonstration a accepté votre recette. Cet ajout n’est pas conservé dans le catalogue.</p><p>Simulation : aucun envoi réel</p></>}</div>
      {submission === 'failure' && <p role="alert" className={styles.error}>La recette n’a pas pu être envoyée. Vos informations sont conservées. Réessayez.</p>}
    </form>
  </div>
}

function Section({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className={styles.section}><div className={styles.sectionHeading}><span>{number}</span><h2>{title}</h2></div>{children}</section>
}

export function ComponentGallery() {
  const [preview, setPreview] = useState<PreviewState>('default')
  const [feedback, setFeedback] = useState('loaded')
  const [longText, setLongText] = useState(false)
  const [imageMissing, setImageMissing] = useState(false)
  const [openedRecipe, setOpenedRecipe] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const action = useRef<HTMLButtonElement>(null)
  return <div className={styles.componentGallery} data-preview={preview}>
    <div className={styles.componentIntro}><p className={styles.eyebrow}>Miam ! · Le carnet de direction · 02 / 04</p><h1>Les petits gestes<br />qui changent tout.</h1><p>Des composants à toucher, à parcourir au clavier et à mettre à l’épreuve. Les fondations F01 sont validées ; place aux interactions.</p></div>
    <div className={styles.scenarioControls}><p>Atelier de design — données de démonstration · C01</p><div className={styles.controls}><label className={styles.field}>État à examiner<select value={preview} onChange={event => setPreview(event.target.value as PreviewState)}><option value="default">Par défaut</option><option value="hover">Survol</option><option value="focus">Focus visible</option><option value="selected">Sélectionné</option><option value="disabled">Désactivé</option><option value="loading">Chargement</option><option value="error">Erreur</option></select></label><label className={styles.check}><input type="checkbox" checked={longText} onChange={event => setLongText(event.target.checked)} /> Textes longs</label><label className={styles.check}><input type="checkbox" checked={imageMissing} onChange={event => setImageMissing(event.target.checked)} /> Photo indisponible</label></div><p>Le sélecteur compare les apparences. Les états réels s’essaient aussi avec Tab, la souris et les commandes de chaque section. Aucune interaction n’enregistre d’approbation.</p></div>
    <Section number="01" title="Inviter à agir"><div className={styles.buttonRow}><button ref={action} className={styles.primaryButton} disabled={preview === 'disabled' || preview === 'loading'} type="button" onClick={() => setOpenedRecipe(true)}>{preview === 'loading' ? 'Chargement des recettes…' : longText ? 'Découvrir les recettes généreuses à partager avec toute la tablée' : 'Découvrir les recettes'}</button><button className={styles.secondary} type="button" onClick={() => action.current?.focus()}>Examiner le focus réel</button><a className={styles.textLink} href="#fields">Explorer les champs</a><button className={styles.secondary} type="button" disabled>Action désactivée</button></div>{preview === 'error' && <p role="alert" className={styles.error}>Les recettes n’ont pas pu être chargées. Réessayez pour les afficher.</p>}</Section>
    <Section number="02" title="Trouver sa prochaine envie"><FilterSpecimen /></Section>
    <Section number="03" title="Lire, aimer, retrouver"><div className={styles.cardGrid}><RecipeCard imageMissing={imageMissing} disabled={preview === 'disabled'} name={longText ? 'Pâtes généreuses à la tomate, au basilic fraîchement cueilli et aux souvenirs des grandes tablées ensoleillées' : recipeName} onOpen={() => setOpenedRecipe(true)} /><div className={styles.specimenStack}><h3>Un cœur, deux états</h3><FavoriteButton name={recipeName} selected={favorite} onToggle={() => setFavorite(!favorite)} disabled={preview === 'disabled'} /><p>Le favori est temporaire. Appuyez à nouveau pour revenir à l’état précédent.</p><div id="recipe-preview" className={styles.panel}><p role="status">{openedRecipe ? 'Aperçu ouvert : Pâtes à la tomate et au basilic frais. L’écran complet sera présenté après le choix de composition.' : 'Ouvrez le titre de la carte pour essayer sa cible, distincte du favori.'}</p></div></div></div></Section>
    <Section number="04" title="Toujours savoir où aller"><div className={styles.specimenStack}><h3>Sur grand écran</h3><NavigationSpecimen /><h3>Barre mobile · icônes et libellés</h3><NavigationSpecimen mobile /><p>La barre est présentée dans son cadre de démonstration. Son placement en bas d’écran et le dégagement du contenu seront vérifiés dans les maquettes complètes.</p></div></Section>
    <Section number="05" title="Des lignes qui suivent vos idées"><div className={styles.rowGrid}><RecipeRows kind="ingredient" /><RecipeRows kind="step" /></div></Section>
    <div id="fields"><Section number="06" title="Des champs qui vous accompagnent"><FormSpecimen /></Section></div>
    <Section number="07" title="Toujours une réponse claire"><div className={styles.specimenStack}><label className={styles.field}>État du contenu<select value={feedback} onChange={event => setFeedback(event.target.value)}><option value="loaded">Contenu disponible</option><option value="loading">Chargement</option><option value="empty">Aucun résultat</option><option value="error">Échec et réessai</option><option value="success">Réussite simulée</option></select></label><div className={styles.feedback}>
      {feedback === 'loaded' && <p>1 recette · Votre prochaine idée est prête à être découverte.</p>}
      {feedback === 'loading' && <><div className={styles.skeleton} aria-hidden="true" /><p role="status">Chargement des recettes…</p></>}
      {feedback === 'empty' && <><h3>Aucune recette ne correspond à votre recherche</h3><p>Essayez un autre nom ou retirez des filtres pour découvrir d’autres recettes.</p><button type="button" className={styles.secondary} onClick={() => setFeedback('loaded')}>Effacer la recherche et les filtres</button></>}
      {feedback === 'error' && <><p role="alert" className={styles.error}>Les recettes n’ont pas pu être chargées. Réessayez pour les afficher.</p><button type="button" className={styles.secondary} onClick={() => setFeedback('loaded')}>Recharger les recettes</button></>}
      {feedback === 'success' && <div role="status"><h3>Recette envoyée</h3><p>Simulation : aucun envoi réel</p></div>}
    </div></div></Section>
  </div>
}
