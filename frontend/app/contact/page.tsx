import { Mail, MapPin, Phone } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import ContactForm from '@/components/forms/ContactForm';
import { phoneHref, site } from '@/lib/site';

export default function Contact() {
  return (
    <div className="pt-16 md:pt-20 pb-24 container mx-auto px-4 sm:px-6">
      <FadeIn><h1 className="font-display text-5xl md:text-6xl text-center mb-12">Contact us</h1></FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <FadeIn delay={0.1}>
          <h2 className="font-display text-3xl mb-6">Get in touch</h2>
          <p className="text-muted mb-12 leading-relaxed">
            Have a question about our products, your order, or just want to say hello? 
            Send us a message and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-well rounded-full flex items-center justify-center text-accent"><MapPin size={20} aria-hidden="true" /></div>
              <div>
                <h4 className="font-bold">Visit Us</h4>
                <p className="text-muted">Gulshan, Dhaka 1212, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-well rounded-full flex items-center justify-center text-accent"><Phone size={20} aria-hidden="true" /></div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <a href={phoneHref} className="text-muted hover:text-accent">{site.phone}</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-well rounded-full flex items-center justify-center text-accent"><Mail size={20} aria-hidden="true" /></div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <a href={`mailto:${site.email}`} className="text-muted hover:text-accent">{site.email}</a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="bg-white p-8 rounded-3xl border border-line">
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
