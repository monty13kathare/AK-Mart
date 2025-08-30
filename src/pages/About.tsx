import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Heart, ChevronDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dp from "../images/dp.png"

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const stats = [
        { number: "10K+", label: "Happy Customers", icon: Users },
        { number: "500+", label: "Premium Products", icon: Award },
        { number: "50+", label: "Countries Served", icon: Globe },
        { number: "99%", label: "Customer Satisfaction", icon: Heart }
    ];

    const values = [
        {
            icon: Award,
            title: "Quality First",
            description: "We source only the finest materials and work with skilled artisans to create products that stand the test of time."
        },
        {
            icon: Users,
            title: "Customer Focused",
            description: "Your satisfaction is our priority. We listen to your needs and continuously improve our products and services."
        },
        {
            icon: Globe,
            title: "Sustainable",
            description: "We're committed to ethical sourcing and sustainable practices that benefit both people and the planet."
        },
        {
            icon: Heart,
            title: "Passionate",
            description: "Fashion is our passion. We love what we do and it shows in every product we curate and every experience we create."
        }
    ];



    const scrollToSection = (sectionId: any) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Hero Section with Parallax */}
            <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity, scale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                        alt="AK-Mart boutique"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="relative z-20 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-300" />
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            About <span className="text-amber-400">AK-Mart</span>
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                            Where luxury meets accessibility. For over a decade, we've been redefining premium fashion experiences.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button
                            size="lg"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg rounded-full"
                            onClick={() => scrollToSection('story')}
                        >
                            Our Story
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact Us
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                >
                    <ChevronDown className="w-8 h-8 text-white animate-bounce" />
                </motion.div>
            </section>

            {/* Animated Stats Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="pattern-dots pattern-blue-500 pattern-opacity-20 pattern-size-4 w-full h-full"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Customers Choose AK-Mart</h2>
                        <p className="text-slate-300 max-w-2xl mx-auto">
                            Our numbers speak for themselves. Here's what we've achieved through dedication to excellence.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                                        <IconComponent className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <div className="text-4xl lg:text-5xl font-extrabold text-amber-400 mb-2">{stat.number}</div>
                                    <div className="text-slate-300 group-hover:text-white transition-colors">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Interactive Story Section */}
            <section id="story" className="py-24 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">Our Journey</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>AK-Mart began as a small boutique with a simple mission: to make premium fashion accessible without compromising on quality or ethics.</p>
                            <p>What started as a single storefront in 2010 has grown into an international brand serving customers across 50+ countries, all while maintaining our commitment to sustainable practices and exceptional craftsmanship.</p>
                            <p>We believe that great fashion should be more than just clothes—it should tell a story, empower the wearer, and respect both people and planet.</p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button className="bg-amber-500 hover:bg-amber-600 rounded-full">
                                Read Our Blog
                            </Button>
                            <Button variant="outline" className="rounded-full">
                                View Timeline
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                                alt="Our story"
                                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="text-xl font-semibold">Our First Store</h3>
                                    <p>Paris, 2010</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1566206091558-7f218b696731?w=300&q=80"
                                alt="AK-Mart early days"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values with Interactive Cards */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">Our Core Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">These principles guide every decision we make and every interaction we have.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-500/5 to-pink-500/5 rounded-bl-full"></div>
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-tr from-amber-500 to-pink-500 text-white group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed z-10 relative">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">About Me</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">The passionate individual behind the AK-Mart experience.</p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-xl"
                        >
                            <img
                                src={dp}
                                alt="Frontend Developer"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="font-bold text-2xl">Arvind Kathare</h3>
                                    <p className="text-amber-300">Frontend Developer</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* About Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="flex-1 max-w-2xl"
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hello! I'm Arvind Kathare</h3>
                                <p className="text-gray-600 mb-4">
                                    A passionate frontend developer with expertise in creating responsive, user-friendly web applications.
                                    I specialize in modern JavaScript frameworks and have a keen eye for design and user experience.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    The AK-Mart ecommerce platform was designed and developed by me as a personal project to showcase
                                    my skills in React, Next.js, and modern UI/UX principles. Every component was carefully crafted
                                    to deliver a seamless shopping experience.
                                </p>

                                {/* Skills */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Technical Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Next.js', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design'].map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Connect With Me</h4>
                                    <div className="flex space-x-4">
                                        <a
                                            href="https://www.linkedin.com/in/arvind-kathare-01955b213/"
                                            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/mr_kathare_13/"
                                            className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.facebook.com/profile.php?id=61560968723953"
                                            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://arvindkathare13.netlify.app/"
                                            className="flex items-center justify-center px-4 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                                        >
                                            <span className="mr-2">View Portfolio</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


        </div>
    );
}