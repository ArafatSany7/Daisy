import FadeIn from '@/components/animations/FadeIn';
import ContactForm from '@/components/forms/ContactForm';
import { phoneHref, site } from '@/lib/site';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <FadeIn><h1 className="text-5xl font-bold text-center mb-12">Contact Us</h1></FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <FadeIn delay={0.1}>
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
                <p className="text-foreground/60">Gulshan, Dhaka 1212, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">📞</div>
              <div>
                <h4 className="font-bold">Call Us</h4>
                <a href={phoneHref} className="text-foreground/60 hover:text-primary">{site.phone}</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">✉️</div>
              <div>
                <h4 className="font-bold">Email Us</h4>
                <a href={`mailto:${site.email}`} className="text-foreground/60 hover:text-primary">{site.email}</a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="bg-secondary/30 p-8 rounded-lg border border-secondary">
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
