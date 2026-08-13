export default function Contact() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <h1 className="text-5xl font-bold text-center mb-12">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-foreground/80 mb-12 leading-relaxed">
            Have a question about our products, your order, or just want to say hello? 
            Fill out the form below and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">📍</div>
              <div>
                <h4 className="font-bold">Visit Us</h4>
                <p className="text-foreground/60">123 Fashion Avenue, NY 10001, USA</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">📞</div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <p className="text-foreground/60">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <p className="text-foreground/60">hello@bhuselle.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 p-8 rounded-lg border border-secondary">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent" required />
              </div>
              <div>
                <label className="block font-medium mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent" required />
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Email Address</label>
              <input type="email" className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent" required />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent" required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-background py-4 rounded-full font-bold hover:bg-accent hover:text-primary transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
