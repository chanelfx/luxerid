import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msgs = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    msgs.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem("contactMessages", JSON.stringify(msgs));
    setSent(true);
    setName(""); setEmail(""); setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Get In <span className="gold-text">Touch</span></h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="glass-card p-8">
            {sent && <div className="bg-green-500/10 text-green-400 text-sm px-4 py-2 rounded-lg mb-4">Message sent successfully!</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your Message" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full h-32 resize-none focus:ring-2 focus:ring-primary outline-none text-foreground" />
              <button type="submit" className="gold-gradient text-primary-foreground w-full py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: "Phone", value: "+250 792 737 675", href: "tel:+250792737675" },
              { icon: MessageCircle, title: "WhatsApp", value: "Chat with us", href: "https://wa.me/250792737675" },
              { icon: Mail, title: "Email", value: "chanelvibes0@gmail.com", href: "mailto:chanelvibes0@gmail.com" },
              { icon: MapPin, title: "Location", value: "Kigali, Rwanda", href: "#" },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="glass-card-hover p-5 flex items-center gap-4 block">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Business Hours */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Hours</p>
                  <p className="font-medium">Open Daily</p>
                </div>
              </div>
              <div className="ml-15 space-y-1 text-sm text-muted-foreground pl-[60px]">
                <p>Mon - Fri: 8:00 AM – 8:00 PM</p>
                <p>Saturday: 9:00 AM – 6:00 PM</p>
                <p>Sunday: 10:00 AM – 4:00 PM</p>
              </div>
            </div>

            {/* Map */}
            <div className="glass-card overflow-hidden rounded-2xl h-48">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772082!2d29.8!3d-1.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0xf32b36a5411d0bc8!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2s!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
