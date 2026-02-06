import { appConfig } from '@/constants'
import React from 'react'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="w-full bg-denary text-white pt-10 pb-8 ">
            <div className="max-w-6xl mx-auto flex flex-col gap-7 px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                    {/* Brand and tagline */}
                    <div className="flex flex-col gap-3 min-w-[220px]">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl font-zalando">{appConfig.APP_SHORT_NAME}</span>
                            <span className="text-xs text-white/50">|</span>
                            <span className="text-md">Viral videos with AI.</span>
                        </div>
                        <p className="text-xs text-white/60 mt-1 max-w-md">
                            Passionate about delivering the best digital experiences for everyone. Our platform is designed for growth, creativity, and impact.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="https://twitter.com/" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://github.com/" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener" className="text-white/60 hover:text-white transition">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links column */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 w-full justify-items-start">
                        <div>
                            <h3 className="font-semibold mb-2 text-sm uppercase text-white/90 tracking-wider">Company</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="/about" className="hover:underline">About</a></li>
                                <li><a href="/careers" className="hover:underline">Careers</a></li>
                                <li><a href="/blog" className="hover:underline">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-sm uppercase text-white/90 tracking-wider">Support</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="/contact" className="hover:underline">Contact</a></li>
                                <li><a href="/help" className="hover:underline">Help Center</a></li>
                                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2 text-sm uppercase text-white/90 tracking-wider">Legal</h3>
                            <ul className="space-y-1 text-sm">
                                <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                                <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter (optional demonstration) */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <form className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                        <label htmlFor="newsletter" className="sr-only">Sign up for our newsletter</label>
                        <input
                            type="email"
                            id="newsletter"
                            placeholder="Email address"
                            className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring focus:border-white/40 text-sm placeholder:text-white/40"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-senary rounded text-white font-semibold text-sm hover:opacity-90 transition max-sm:w-full"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="text-xs text-white/60 mt-2 sm:mt-0 text-center sm:text-right w-full sm:w-auto">
                        &copy; {new Date().getFullYear()} {appConfig.APP_NAME}. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer