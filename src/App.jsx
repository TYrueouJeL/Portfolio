import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CV = {
    name: 'RÉMI GUERIN',
    title: 'Étudiant en développement',
    dateDeNaissance: '21/12/2005',
    email: 'guerinremi.pro@gmail.com',
    address: '1 Voie des Roseaux, 53440 La Chapelle au Riboul',
    profile: 'Étudiant en développement web, curieux et autonome. J’aime concevoir des sites webs, des logiciels et des jeux vidéos.',
    experiences: [
        {
            id: 'rpe',
            date: 'Avril / Mai 2024',
            place: 'Relais Petite Enfance',
            desc: 'Création d\'un site vitrine.',
            description: 'Analyse du site existant, analyse des besoins, propositions de solutions et création d\'un nouveau site vitrine avec WordPress. Rédaction d\'une documentation utilisateur pour la prise en main et la maintenance du site.',
            image: '/rpe.png',
            detailedContent: 'Pendant cette mission de deux mois, j\'ai eu l\'opportunité de mener un projet complet de refonte web. Le Relais Petite Enfance, un établissement crucial pour les familles de la région, souhaitait moderniser sa présence en ligne.',
            tasks: [
                'Analyse approfondie du site existant et identification des faiblesses',
                'Étude des besoins du client et de ses objectifs futurs',
                'Proposition de plusieurs solutions avec argumentations',
                'Développement du nouveau site vitrine avec WordPress',
                'Intégration de plugins nécessaires pour la sécurité et les performances',
                'Création d\'une documentation complète pour le client',
                'Formation du personnel à la maintenance et gestion du contenu'
            ],
            technologies: ['WordPress'],
            results: 'Le nouveau site a permis au Relais Petite Enfance de moderniser sa présence en ligne et de faciliter la navigation pour les parents. Le client est très satisfait de la documentation fournie qui lui permet de gérer de manière autonome le site.'
        },
        // {
        //     date: 'Juillet / Août 2024',
        //     place: 'Lely center Evron',
        //     desc: 'Deux mois au service informatique (préparation de PC).',
        //     description: 'Préparation de PC clients (clonage d\'une image Windows personnalisée, tests de bon fonctionnement), tri et inventaire d\'un stock de PC.',
        //     image: '/lelylogo.png'
        // },
        {
            id: 'ets-kirsch',
            date: 'Janvier / 2025',
            place: 'Ets KIRSCH',
            desc: 'Tests de développement d\'une application mobile.',
            description: 'Création de multiples prototypes fonctionnels d\'une application mobile avec .NET MAUI afin d\'une future étude comparative des technologies de développement mobile.',
            image: '/etskirsch.png',
            detailedContent: 'Chez Ets KIRSCH, j\'ai participé à un projet de migration de technologie d\'une application mobile. Mon rôle consistait à créer et tester des prototypes pour évaluer les différentes approches technologiques.',
            tasks: [
                'Étude comparative de plusieurs frameworks mobiles (React Native, Flutter, .NET MAUI)',
                'Création de prototypes fonctionnels avec .NET MAUI',
                'Tests exhaustifs des fonctionnalités implémentées',
                'Documentation des résultats et apprentissages',
                'Évaluation des performances et de l\'expérience utilisateur',
                'Présentation des conclusions au client'
            ],
            technologies: ['.NET MAUI', 'C#', 'XAML', 'Visual Studio'],
            results: 'Cette expérience m\'a permis d\'explorer le développement mobile et de contribuer à des conclusions stratégiques pour l\'entreprise concernant le choix technologique pour leurs futurs développements.'
        }
    ],
    education: [
        {date: '2020 - 2023', place: 'Lycée Réaumur Laval', desc: 'Bac STI2D option SIN'},
        {date: '2023 - 2025', place: 'Institut Informatique Appliquée Laval', desc: 'BTS SIO option SLAM (niveau BTS)'}
    ],
    skills: [
        { name: 'HTML, CSS, Javascript', status: 'Maîtrisé', stage: 'Expertise', milestoneType: 'fundamentals', description: 'Les technologies fondamentales du web permettant de construire des interfaces structurées, stylisées et interactives.' },
        { name: 'Node.js', status: 'En cours d’apprentissage', stage: 'Premier projet', milestoneType: 'project', description: 'Environnement d’exécution JavaScript orienté performance, idéal pour créer des APIs, services backend et outils en temps réel.' },
        { name: 'Adonis', status: 'En cours d’apprentissage', stage: 'Premier projet', milestoneType: 'project', description: 'Framework Node.js full-stack offrant une structure MVC solide, une gestion intégrée des bases de données et un codebase typé et organisé.' },
        { name: 'NuxtJS', status: 'En cours d’apprentissage', stage: 'Hello World', milestoneType: 'project', description: 'Framework Vue.js permettant le rendu côté serveur, la génération statique et la création d’applications front performantes.' },
        { name: 'React', status: 'Maîtrisé', stage: 'Optimisation', milestoneType: 'fundamentals', description: 'Bibliothèque JavaScript dédiée à la création d’interfaces dynamiques et modulaires grâce à un système de composants et de hooks.' },
        { name: 'PHP', status: 'Maîtrisé', stage: 'Expertise', milestoneType: 'fundamentals', description: 'Langage backend polyvalent utilisé pour développer des services web, des APIs et des applications serveur robustes.' },
        { name: 'Symfony', status: 'Maîtrisé', stage: 'Expertise', milestoneType: 'project', description: 'Framework PHP complet et structuré reposant sur des composants modulaires, idéal pour créer des applications web maintenables et sécurisées.' },
        { name: 'SQL', status: 'Maîtrisé', stage: 'Expertise', milestoneType: 'fundamentals', description: 'Langage de gestion de bases de données relationnelles permettant de modéliser, interroger et optimiser les données.' },
        { name: 'Git', status: 'Maîtrisé', stage: 'Expertise', milestoneType: 'fundamentals', description: 'Système de versioning distribué permettant de suivre l’évolution du code, travailler en équipe et maintenir un historique fiable du projet.' },
        { name: 'C#', status: 'Maîtrisé', stage: 'Projets livrés', milestoneType: 'project', description: 'Langage orienté objet moderne utilisé pour le développement d’applications .NET, de jeux vidéo et d’outils multiplateformes.' },
        { name: 'Unity', status: 'En cours d’apprentissage', stage: 'Premier projet', milestoneType: 'project', description: 'Moteur de jeu complet conçu pour créer des expériences 2D/3D interactives, avec un workflow basé sur C# et une large bibliothèque d’outils.' },
    ],
    interests: ['Développement', 'Jeux vidéos', 'Réseaux sociaux']
}

const SKILL_STATUS_STYLES = {
    'Maîtrisé': 'text-emerald-700 bg-emerald-100',
    'En cours d’apprentissage': 'text-amber-700 bg-amber-100',
}

const SKILL_MILESTONES = {
    project: ['Hello World', 'Premier projet', 'Projets livrés', 'Expertise'],
    fundamentals: ['Bases', 'Production', 'Optimisation', 'Expertise'],
}

const DEFAULT_MILESTONE_TRACK = 'project'

// ------------------------------------------------------
// ✅ HEADER avec scroll spy + animation fluide
// ------------------------------------------------------
function Header() {
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]')
        const options = { threshold: 0.5 }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, options)

        sections.forEach((section) => observer.observe(section))
        return () => sections.forEach((section) => observer.unobserve(section))
    }, [])

    const navItems = [
        { id: 'home', label: 'Accueil' },
        { id: 'competences', label: 'Compétences' },
        { id: 'experiences', label: 'Expériences' },
        { id: 'projects', label: 'Projets' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <header className="fixed w-full z-30 backdrop-blur bg-white/30 dark:bg-black/30">
            <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg tracking-wide">
                    Rémi<span className="text-indigo-500">G</span>
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`/#${item.id}`}
                            className={`relative transition-all duration-300 
                                ${activeSection === item.id 
                                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                                    : 'text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-white'}
                                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:rounded 
                                after:transition-all after:duration-300
                                ${activeSection === item.id ? 'after:bg-indigo-600' : 'after:bg-transparent hover:after:bg-indigo-300 dark:hover:after:bg-indigo-500/70'}
                            `}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}

// ------------------------------------------------------
function Hero() {
    // Calcul de l'âge basé sur la date de naissance
    const calculateAge = (birthDate) => {
        const [day, month, year] = birthDate.split('/').map(Number)
        const birth = new Date(year, month - 1, day)
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age
    }

    const age = calculateAge(CV.dateDeNaissance)

    return (
        <section className="min-h-[70vh] flex items-center" id="home">
            <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-8 items-center">
                <div data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{CV.name}</h1>
                    <p className="mt-3 text-indigo-600 font-medium">{CV.title} — {age} ans</p>
                    <p className="mt-6 text-gray-700 dark:text-gray-300">{CV.profile}</p>
                    <div className="mt-6 flex gap-3">
                        <a href="mailto:guerinremi.pro@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">Me contacter</a>
                        <a href="#competences" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:border-indigo-500 hover:bg-indigo-50 transition-colors">Voir mes compétences</a>
                    </div>
                </div>
                <div data-aos="fade-left" className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-lg dark:from-gray-800 dark:to-gray-900">
                    <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded">
                        <p className="text-sm text-gray-500">Compétences clés</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {CV.skills.map(skill => (
                                <span key={skill.name} className="px-3 py-1 text-sm border rounded-full border-gray-200 dark:border-gray-600">{skill.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Skills() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-transparent" id="competences">
            <div className="max-w-5xl mx-auto px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold">Compétences</h2>
                <p data-aos="fade-up" data-aos-delay="100" className="mt-3 text-gray-600">Langages et frameworks avec lesquels j’ai déjà travaillé.</p>
                <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {CV.skills.map((skill, idx) => (
                        <div
                            key={skill.name}
                            data-aos="zoom-in"
                            data-aos-delay={idx * 50}
                            className="relative group p-4 border rounded-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-indigo-500"
                        >
                            <div className="flex justify-between items-center gap-3">
                                <p className="font-semibold">{skill.name}</p>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${SKILL_STATUS_STYLES[skill.status] || 'text-gray-700 bg-gray-100'}`}>
                                    {skill.status}
                                </span>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Jalons</p>
                                <div className="flex flex-wrap gap-1">
                                    {(SKILL_MILESTONES[skill.milestoneType] || SKILL_MILESTONES[DEFAULT_MILESTONE_TRACK]).map((milestone, milestoneIndex) => {
                                        const currentTrack = SKILL_MILESTONES[skill.milestoneType] || SKILL_MILESTONES[DEFAULT_MILESTONE_TRACK]
                                        const currentStageIndex = currentTrack.indexOf(skill.stage)
                                        const reached = currentStageIndex >= milestoneIndex && currentStageIndex !== -1
                                        return (
                                            <span
                                                key={`${skill.name}-${milestone}`}
                                                className={`px-2 py-0.5 text-[10px] font-medium cursor-default rounded-full border ${
                                                    reached
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'text-gray-400 border-gray-200 dark:text-gray-500 dark:border-gray-700'
                                                }`}
                                            >
                                                {milestone}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            {skill.description && (
                                <div className="pointer-events-none absolute inset-x-0 bottom-4 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-200">
                                    <div className="relative mx-auto max-w-xs rounded-lg border border-indigo-100 bg-white dark:bg-gray-900 dark:border-gray-700 p-3 text-xs text-gray-600 dark:text-gray-300 shadow-lg">
                                        <p className="mt-1 leading-relaxed">{skill.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Experiences() {
    const [openIndex, setOpenIndex] = useState(null)

    function toggleExperience(index) {
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (
        <section className="py-20" id="experiences">
            <div className="max-w-5xl mx-auto px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold">Expériences</h2>
                <div className="mt-8 space-y-4">
                    {CV.experiences.map((e, i) => {
                        const expanded = openIndex === i
                        return (
                            <article
                                key={i}
                                data-aos="fade-right"
                                data-aos-delay={i * 100}
                                className="border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleExperience(i)}
                                    className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-indigo-50 transition-colors dark:hover:bg-gray-700"
                                >
                                    <div>
                                        <p className="font-semibold text-lg">{e.place}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{e.date}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">{e.desc}</p>
                                        <span
                                            className={`h-6 w-6 flex items-center justify-center rounded-full border border-indigo-200 text-indigo-600 transition-transform ${
                                                expanded ? 'rotate-180' : ''
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </div>
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-4 pt-0 sm:pt-4 flex flex-col gap-4 sm:flex-row">
                                            {e.image && (
                                                <img
                                                    src={e.image}
                                                    alt={`Illustration ${e.place}`}
                                                    className="h-48 w-full sm:w-1/3 rounded-lg object-contain"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Missions</p>
                                                <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">{e.description}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4">
                                            <Link to={`/experience/${e.id}`} className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:border-indigo-500 hover:bg-indigo-50 transition-colors">Plus de détails</Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Projects() {
    const [repos, setRepos] = useState([])
    const GITHUB_USER = 'TYrueouJeL'

    useEffect(() => {
        async function fetchRepos() {
            try {
                const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos`, {
                    headers: {
                        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // ou process.env.REACT_APP_GITHUB_TOKEN
                    },
                })
                const data = await res.json()
                const filtered = data.filter(repo => !repo.fork && repo.description)

                const reposWithDetails = await Promise.all(
                    filtered.map(async (repo) => {
                        const techs = await getTechnologiesUsed(GITHUB_USER, repo.name)
                        const image = await getPresentationImageUrl(GITHUB_USER, repo.name)
                        return { ...repo, technologies: techs, presentationImageUrl: image }
                    })
                )

                setRepos(reposWithDetails)
            } catch (err) {
                console.error('Erreur lors du chargement des dépôts GitHub :', err)
            }
        }

        fetchRepos()
    }, [])

    async function getTechnologiesUsed(user, repoName) {
        try {
            const res = await fetch(`https://api.github.com/repos/${user}/${repoName}/languages`, {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                },
            })
            const data = await res.json()
            return Object.keys(data)
        } catch {
            return []
        }
    }

    async function getPresentationImageUrl(user, repoName) {
        const candidates = ['presentation.png', 'presentation.jpg', 'assets/presentation.png', 'assets/presentation.jpg']
        for (const file of candidates) {
            const url = `https://raw.githubusercontent.com/${user}/${repoName}/main/${file}`
            try {
                const res = await fetch(url, { method: 'HEAD' })
                if (res.ok) return url
            } catch {
                continue
            }
        }
        return null
    }

    return (
        <section id="projects" className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-6 text-center">Mes Projets</h2>
                {repos.length === 0 ? (
                    <p className="text-center text-gray-500">Chargement des projets GitHub...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {repos.map(repo => (
                            <div key={repo.id} data-aos="fade-up" className="relative overflow-hidden rounded-lg shadow-lg group bg-white dark:bg-gray-800">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={repo.presentationImageUrl || `https://via.placeholder.com/600x300?text=${repo.name}`}
                                        alt={repo.name}
                                        className="w-full h-64 object-contain transition-transform duration-300 transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                                        <h3 className="text-white text-2xl font-semibold">{repo.name}</h3>
                                    </div>
                                    <div className="p-4 text-center md:text-left">
                                        <h2 className="text-2xl font-semibold mb-2">{repo.name}</h2>
                                        <p className="text-gray-700 dark:text-gray-300 mb-3">{repo.description}</p>
                                        {repo.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                                {repo.technologies.map(tech => (
                                                    <span key={tech} className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Contact() {
    return (
        <section className="py-20 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-900 dark:to-gray-900" id="contact">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 data-aos="fade-up" className="text-3xl font-bold">Contact</h2>
                <p data-aos="fade-up" data-aos-delay="100" className="mt-3 text-gray-600 dark:text-gray-300">
                    Intéressé·e par une collaboration, un stage ou une mission freelance ? Envoyez‑moi un email à <strong>{CV.email}</strong>.
                </p>
                <div data-aos="fade-up" data-aos-delay="200" className="mt-6 flex items-center justify-center gap-4">
                    <a href={`mailto:${CV.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">
                        Envoyer un email
                    </a>
                    <a href="https://github.com/TYrueouJeL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                        Voir mon GitHub
                    </a>
                </div>
            </div>
        </section>
    )
}

// PAGE DE DÉTAILS D'UNE EXPÉRIENCE
function ExperienceDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const experience = CV.experiences.find(e => e.id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!experience) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Expérience non trouvée</h1>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700">Retour à l'accueil</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <button
                onClick={() => navigate(-1)}
                className="fixed top-20 left-6 z-20 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
                ← Retour
            </button>

            <main className="pt-20">
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-6">
                        {/* En-tête */}
                        <div className="mb-12">
                            <p className="text-indigo-600 font-semibold mb-2">{experience.date}</p>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{experience.place}</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300">{experience.desc}</p>
                        </div>

                        {/* Image principale */}
                        {experience.image && (
                            <div className="mb-12">
                                <img
                                    src={experience.image}
                                    alt={experience.place}
                                    className="w-full h-96 rounded-lg object-contain shadow-lg"
                                />
                            </div>
                        )}

                        {/* Contenu détaillé */}
                        <div className="prose dark:prose-invert max-w-none mb-12">
                            <h2 className="text-2xl font-bold mb-4">À propos de cette expérience</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                {experience.detailedContent}
                            </p>
                        </div>

                        {/* Tâches principales */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Tâches principales</h2>
                            <ul className="space-y-3">
                                {experience.tasks.map((task, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                            <span className="text-indigo-600 dark:text-indigo-300 text-sm font-semibold">{idx + 1}</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technologies utilisées */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Technologies utilisées</h2>
                            <div className="flex flex-wrap gap-3">
                                {experience.technologies.map((tech, idx) => (
                                    <div
                                        key={idx}
                                        className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Résultats */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4">Résultats et apprentissages</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {experience.results}
                            </p>
                        </div>

                        {/* Lien pour retourner */}
                        <div className="mt-12 text-center">
                            <Link to="/#experiences" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                                Voir toutes les expériences
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

// Page d'accueil principale
function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            <Header />
            <main className="pt-24">
                <Hero />
                <Skills />
                <Experiences />
                <Projects />
                <Contact />
            </main>
        </div>
    )
}

// APP PRINCIPALE AVEC ROUTING
export default function PortfolioApp() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/experience/:id" element={
                    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                        <Header />
                        <ExperienceDetail />
                    </div>
                } />
            </Routes>
        </Router>
    )
}
