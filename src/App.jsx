import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CV = {
    name: 'RÉMI GUERIN',
    title: 'Étudiant en développement',
    age: '19 ans',
    phone: '07 67 60 39 98',
    email: 'guerinremi.pro@gmail.com',
    address: '1 Voie des Roseaux, 53440 La Chapelle au Riboul',
    profile: 'Étudiant en développement web, curieux et autonome. J’aime concevoir des sites modernes et performer côté front-end.',
    experiences: [
        {date: '2024', place: 'Lely center Evron', desc: 'Deux mois au service informatique (préparation de PC).'},
        {date: '2024', place: 'Relais Petite Enfance - Le manège des 7 lieux', desc: 'Création d’un site vitrine (8 avril / 7 juin).'},
        {date: '2025', place: 'Ets KIRSCH', desc: 'Tests de développement d’une application mobile (15 janvier / 28 février).'}
    ],
    education: [
        {date: '2020 - 2023', place: 'Lycée Réaumur Laval', desc: 'Bac STI2D option SIN'},
        {date: '2023 - 2025', place: 'Institut Informatique Appliquée Laval', desc: 'BTS SIO option SLAM (niveau BTS)'}
    ],
    skills: [
        { name: 'HTML, CSS, Javascript', level: 100 },
        { name: 'Node.js', level: 75 },
        { name: 'Adonis', level: 10 },
        { name: 'NuxtJS', level: 80 },
        { name: 'React', level: 100 },
        { name: 'PHP', level: 100 },
        { name: 'Symfony', level: 100 },
        { name: 'SQL', level: 100 },
        { name: 'Git', level: 100 },
        { name: 'C#', level: 100 },
        { name: 'Unity', level: 40 },
    ],
    interests: ['Développement', 'Jeux vidéos', 'Réseaux sociaux']
}

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
                            href={`#${item.id}`}
                            className={`relative transition-all duration-300 
                                ${activeSection === item.id ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-500'}
                                after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:rounded 
                                after:transition-all after:duration-300
                                ${activeSection === item.id ? 'after:bg-indigo-600' : 'after:bg-transparent hover:after:bg-indigo-300'}
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
    return (
        <section className="min-h-[70vh] flex items-center" id="home">
            <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-8 items-center">
                <div data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{CV.name}</h1>
                    <p className="mt-3 text-indigo-600 font-medium">{CV.title} — {CV.age}</p>
                    <p className="mt-6 text-gray-700 dark:text-gray-300">{CV.profile}</p>
                    <div className="mt-6 flex gap-3">
                        <a href="mailto:guerinremi.pro@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">Contacte-moi</a>
                        <a href="#competences" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:border-indigo-500 transition-colors">Voir mes compétences</a>
                    </div>
                </div>
                <div data-aos="fade-left" className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-lg">
                    <div className="bg-white/60 p-4 rounded">
                        <p className="text-sm text-gray-500">Compétences clés</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {CV.skills.map(skill => (
                                <span key={skill.name} className="px-3 py-1 text-sm border rounded-full">{skill.name}</span>
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
                            className="p-4 border rounded-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-400"
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">{skill.name}</p>
                                <span className="text-sm text-gray-500">{skill.level}%</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 rounded-full transition-[width] duration-700 ease-in-out"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Experiences() {
    return (
        <section className="py-20" id="experiences">
            <div className="max-w-5xl mx-auto px-6">
                <h2 data-aos="fade-up" className="text-3xl font-bold">Expériences</h2>
                <div className="mt-8 space-y-4">
                    {CV.experiences.map((e, i) => (
                        <article
                            key={i}
                            data-aos="fade-right"
                            data-aos-delay={i * 100}
                            className="p-4 border rounded-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-400"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{e.place}</p>
                                    <p className="text-sm text-gray-500">{e.date}</p>
                                </div>
                                <p className="text-sm text-gray-600">{e.desc}</p>
                            </div>
                        </article>
                    ))}
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
                console.log(data);                const filtered = data.filter(repo => !repo.fork && repo.description)

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
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <section className="py-20 bg-gradient-to-r from-white to-indigo-50" id="contact">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 data-aos="fade-up" className="text-3xl font-bold">Contact</h2>
                <p data-aos="fade-up" data-aos-delay="100" className="mt-3 text-gray-600">Tu peux me contacter directement :</p>
                <div className="mt-6 space-y-2">
                    <p className="text-lg font-medium">📞 {CV.phone}</p>
                    <p className="text-lg font-medium">📧 {CV.email}</p>
                </div>
            </div>
        </section>
    )
}

// ------------------------------------------------------
function Footer() {
    return (
        <footer className="py-8 border-t mt-12">
            <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Rémi Guerin — Portfolio
            </div>
        </footer>
    )
}

// ------------------------------------------------------
export default function PortfolioApp() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <Router>
            <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                <Header />
                <main className="pt-24">
                    <Hero />
                    <Skills />
                    <Experiences />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </Router>
    )
}
