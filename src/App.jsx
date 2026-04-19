import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, FileText, Globe, Search, BookOpen, PenTool, Scale, ChevronRight } from "lucide-react"

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

          <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-4xl mx-auto mb-12 shadow-2xl">
            <p className="text-xl md:text-2xl font-medium text-amber-400 mb-4" dir="rtl" style={{fontFamily: "'Noto Nastaliq Urdu', serif"}}>
              آپ کی سہولت کے لیے ڈاکومنٹس ٹرانسلیشن، نکاح نامہ، برتھ سرٹیفکیٹ وغیرہ اور لیگل ڈاکومنٹس، خرید و فروخت کے معاہدہ جات وغیرہ مفت میں دستیاب ہیں
            </p>
            <p className="text-lg text-blue-200" dir="rtl" style={{fontFamily: "'Noto Nastaliq Urdu', serif"}}>
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

      {/* Main Services / Ads Layout */}
      <section className="py-24 bg-slate-50 relative -mt-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Core Content Area (70%) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Featured Services</h2>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  View All <ChevronRight size={16} className="ml-1" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Card 1 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow bg-white overflow-hidden group cursor-pointer">
                  <div className="h-2 bg-blue-900"></div>
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Translation</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">Certified translation of legal documents between English and Urdu with 100% accuracy.</p>
                    <Button variant="ghost" className="text-blue-900 font-semibold p-0 hover:bg-transparent hover:text-blue-700">
                      Translate Now <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Card 2 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow bg-white overflow-hidden group cursor-pointer">
                  <div className="h-2 bg-amber-500"></div>
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Legal Drafting</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">Sale Deeds, Power of Attorney, Affidavits and more. Drafted by experts.</p>
                    <Button variant="ghost" className="text-amber-600 font-semibold p-0 hover:bg-transparent hover:text-amber-700">
                      Create Document <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Card 3 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow bg-white overflow-hidden group cursor-pointer">
                  <div className="h-2 bg-emerald-600"></div>
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <BookOpen size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Nikah Nama & Family</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">Marriage certificates, birth certificates, and family registration documents.</p>
                    <Button variant="ghost" className="text-emerald-600 font-semibold p-0 hover:bg-transparent hover:text-emerald-700">
                      View Templates <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Card 4 */}
                <Card className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow bg-white overflow-hidden group cursor-pointer border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mb-4 mx-auto">
                      <PenTool size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Document Editor App</h3>
                    <p className="text-slate-500 text-sm mb-4">Edit documents directly in your browser. Coming soon.</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                      Phase 2
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Banner/Ad Space (30%) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Sponsored / Announcements</h3>
                
                {/* Ad Slot 1 */}
                <div className="w-full h-64 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center p-6 mb-6 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 opacity-90 transition-opacity group-hover:opacity-100"></div>
                  <div className="relative z-10 text-white">
                    <Scale size={40} className="mx-auto mb-4 text-amber-400" />
                    <h4 className="font-bold text-xl mb-2">Need Expert Legal Advice?</h4>
                    <p className="text-sm text-blue-100 mb-4">Connect with top lawyers in Pakistan instantly.</p>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold w-full">
                      Book Consultation
                    </Button>
                  </div>
                </div>

                {/* Ad Slot 2 */}
                <div className="w-full h-32 bg-slate-100 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                  <span className="text-sm font-medium">Banner Ad Space (300x100)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
