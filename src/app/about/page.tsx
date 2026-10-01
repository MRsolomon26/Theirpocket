import { Container } from '@/components/layout/container';

export default function AboutPage() {
  return (
    <Container className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Theirpocket</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Theirpocket was founded with a simple mission: to make quality fashion accessible to everyone. 
              We believe that looking good shouldn't cost a fortune, and everyone deserves to express their 
              unique style without breaking the bank.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <p className="text-muted-foreground mb-4">
              We curate the latest trends in clothing, shoes, watches, bags, and accessories from around the world. 
              Our team carefully selects each item to ensure it meets our high standards for quality and style.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground mb-4">
              We're committed to providing exceptional customer service, fast shipping, and a seamless shopping 
              experience. Your satisfaction is our top priority, and we're always here to help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              Have questions? We'd love to hear from you. Visit our contact page or reach out to us directly.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
