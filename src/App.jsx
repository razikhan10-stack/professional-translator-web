import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, FileText, Globe, Search, BookOpen, PenTool, Scale, ChevronRight, CheckCircle, Download, MousePointerClick, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-amber-500">
              <Scale size={24} />
            </div>
            <span className="text-xl font-bold text-blue-950 tracking-tight">
              Professional <span className="text-amber-600">Translator</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors">Translations</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors">Legal Agreement</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors">Instructions</a>
            <Button variant="ghost" size="icon" className="text-slate-600">
              <Search size={20} />
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800 text-white shadow-md">
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-950 text-white pb-24 pt-32 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-950"></div>

        <div className="container relative mx-auto px-4 lg:px-8 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-8">
            <ShieldCheck size={16} />
            <span>100% Free & Secure Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white">
            Document Translation & <br className="hidden md:block" />
            <span className="text-amber-500">Legal Drafting</span> in One Place.
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Professional translations, E-Stamping, Sale/Purchase Agreements, and Affidavits made simple. All 100% FREE and easy to use, with just a few clicks.
          </p>

          <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-4xl mx-auto mb-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="text-xl md:text-2xl font-medium text-amber-400 mb-6 leading-[2.5]" dir="rtl" style={{ fontFamily: "var(--font-urdu)" }}>
              آپ کی سہولت کے لیے ڈاکومنٹس ٹرانسلیشن، نکاح نامہ، برتھ سرٹیفکیٹ وغیرہ اور لیگل ڈاکومنٹس، خرید و فروخت کے معاہدہ جات وغیرہ مفت میں دستیاب ہیں
            </p>
            <p className="text-lg text-blue-200 leading-[2.2]" dir="rtl" style={{ fontFamily: "var(--font-urdu)" }}>
              جس ڈاکومنٹس کی آپ کو ضرورت ہے اس پر کلک کریں، ایڈٹ کریں اور ڈاؤنلوڈ کر لیں
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold shadow-lg shadow-amber-500/20 w-full sm:w-auto transition-transform hover:scale-105">
              Start Drafting Now
              <ChevronRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-blue-400 text-blue-100 hover:bg-blue-900/50 w-full sm:w-auto">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Getting your documents ready is as easy as 1-2-3. Follow these simple steps to get started.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                <MousePointerClick size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">1. Select Template</h3>
              <p className="text-slate-600">Choose from our wide range of legal and translation templates tailored for your needs.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 shadow-sm group-hover:bg-amber-500 group-hover:text-blue-950 transition-all duration-300">
                <PenTool size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">2. Fill & Edit</h3>
              <p className="text-slate-600">Use our upcoming online editor or download the template to fill in your specific details.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="h-20 w-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Download size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">3. Download & Print</h3>
              <p className="text-slate-600">Once ready, download your document in PDF or Word format and it's ready for use.</p>
            </div>

            {/* Connector Lines (Hidden on mobile) */}
            <div className="hidden md:block absolute top-10 left-[25%] w-[15%] border-t-2 border-dashed border-slate-200"></div>
            <div className="hidden md:block absolute top-10 right-[25%] w-[15%] border-t-2 border-dashed border-slate-200"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-amber-400">
                  <Scale size={24} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Professional <span className="text-amber-500">Translator</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Pakistan's first 100% free digital platform for legal drafting and certified document translations. Empowering citizens with accessible legal tools.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Our Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Legal Translations</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Nikkah Nama Drafting</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Property Agreements</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Court Affidavits</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Birth Certificates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Instruction Guide</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Legal Disclaimer</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-500 shrink-0" />
                  <span>Blue Area, Islamabad, Pakistan</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-500 shrink-0" />
                  <span>+92 300 1234567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-amber-500 shrink-0" />
                  <span>info@protranslator.com.pk</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Professional Translator. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-300">Terms</a>
              <a href="#" className="hover:text-slate-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
