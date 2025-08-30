import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    ArrowRight,
    MessageCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [confetti, setConfetti] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSuccess(true);
        setConfetti(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset confetti & success
        setTimeout(() => setConfetti(false), 3000);
        setTimeout(() => setSuccess(false), 5000);
    };

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            info: "Gondwara , Raipur Chhattisgarh, India, IN 493221",
            color: "from-blue-500 to-cyan-400",
        },
        {
            icon: Phone,
            title: "Phone",
            info: "+91 0000123456",
            color: "from-green-500 to-emerald-400",
        },
        {
            icon: Mail,
            title: "Email",
            info: "hello@ak-mart.com",
            color: "from-rose-500 to-pink-400",
        },
        {
            icon: Clock,
            title: "Hours",
            info: "Mon-Fri: 9:00 AM - 6:00 PM\nSat-Sun: 10:00 AM - 4:00 PM",
            color: "from-amber-500 to-orange-400",
        },
    ];

    const faqs = [
        {
            question: "What is your return policy?",
            answer:
                "We offer a 30-day return policy for all unused items in original condition. Simply contact us to initiate a return.",
        },
        {
            question: "How long does shipping take?",
            answer:
                "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee.",
        },
        {
            question: "Do you ship internationally?",
            answer:
                "Yes! We ship to over 50 countries worldwide. Shipping costs and times vary by destination.",
        },
        {
            question: "Are your products authentic?",
            answer:
                "Absolutely. We work directly with brands and authorized distributors to ensure all products are 100% authentic.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-cyan-50/30 py-16 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-amber-200/10 to-cyan-200/10 -skew-y-3 -translate-y-32"></div>

            {/* Confetti animation */}
            <AnimatePresence>
                {confetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
                    >
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    background: ["#f59e0b", "#06b6d4", "#ec4899", "#10b981"][
                                        Math.floor(Math.random() * 4)
                                    ],
                                }}
                                initial={{
                                    y: 0,
                                    x: 0,
                                    opacity: 1,
                                    scale: 0,
                                }}
                                animate={{
                                    y: [0, -100 - Math.random() * 200],
                                    x: [-50 + Math.random() * 100, -100 + Math.random() * 200],
                                    opacity: [1, 0],
                                    scale: [0, 1, 0.5],
                                    rotate: Math.random() * 360,
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 1,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-6">
                        <MessageCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">
                        Let's Connect
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Have a question, suggestion, or just want to say hello? We'd love to
                        hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.2 },
                                }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 transition-all hover:shadow-xl group cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        whileHover={{ rotate: 5 }}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.color} text-white flex-shrink-0 group-hover:shadow-lg transition-shadow`}
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-semibold mb-1 text-gray-900 group-hover:text-gray-800 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm whitespace-pre-line group-hover:text-gray-700 transition-colors">
                                            {item.info}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="rounded-2xl shadow-xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <Send className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold">
                                            Send us a Message
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <AnimatePresence>
                                        {success && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, y: -20, height: 0 }}
                                                className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg"
                                            >
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-5 h-5 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Thank you for your message! We'll get back to you
                                                    within 24 hours.
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <Label
                                                    htmlFor="name"
                                                    className="text-gray-700 mb-2 block"
                                                >
                                                    Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        handleInputChange("name", e.target.value)
                                                    }
                                                    placeholder="Your name"
                                                    className="focus:ring-amber-400 focus:border-amber-400 border-gray-300 rounded-xl py-3 px-4 transition-all"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <Label
                                                    htmlFor="email"
                                                    className="text-gray-700 mb-2 block"
                                                >
                                                    Email *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        handleInputChange("email", e.target.value)
                                                    }
                                                    placeholder="you@example.com"
                                                    className="focus:ring-amber-400 focus:border-amber-400 border-gray-300 rounded-xl py-3 px-4 transition-all"
                                                />
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <Label
                                                htmlFor="subject"
                                                className="text-gray-700 mb-2 block"
                                            >
                                                Subject *
                                            </Label>
                                            <Input
                                                id="subject"
                                                required
                                                value={formData.subject}
                                                onChange={(e) =>
                                                    handleInputChange("subject", e.target.value)
                                                }
                                                placeholder="How can we help?"
                                                className="focus:ring-amber-400 focus:border-amber-400 border-gray-300 rounded-xl py-3 px-4 transition-all"
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <Label
                                                htmlFor="message"
                                                className="text-gray-700 mb-2 block"
                                            >
                                                Message *
                                            </Label>
                                            <Textarea
                                                id="message"
                                                required
                                                value={formData.message}
                                                onChange={(e) =>
                                                    handleInputChange("message", e.target.value)
                                                }
                                                placeholder="Tell us more about your inquiry..."
                                                rows={5}
                                                className="focus:ring-amber-400 focus:border-amber-400 border-gray-300 rounded-xl py-3 px-4 transition-all min-h-[120px]"
                                            />
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                ease: "linear",
                                                            }}
                                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message <ArrowRight className="w-5 h-5" />
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* FAQ */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Quick answers to questions you may have
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + idx * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 rounded-2xl"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {faq.question}
                                    </h3>
                                    {activeFaq === idx ? (
                                        <ChevronUp className="w-5 h-5 text-amber-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-amber-500" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {activeFaq === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6">
                                                <p className="text-gray-600 mt-5">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
