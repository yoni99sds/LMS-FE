import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQPage = () => {
  const faqs = [
    {
      q: "How do I get started with EduMaster?",
      a: "Simply create an account, browse our course catalog, and enroll in any course that interests you. Many courses offer free previews so you can try before you buy."
    },
    {
      q: "Are the certificates verified?",
      a: "Yes, all our Pro certificates are verified and can be shared on your LinkedIn profile or included in your resume."
    },
    {
      q: "Can I learn at my own pace?",
      a: "Absolutely! Most of our courses are self-paced, allowing you to learn whenever and wherever it's convenient for you. You have lifetime access to the courses you enroll in."
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 30-day money-back guarantee for all course purchases. If you're not satisfied, simply request a refund within 30 days of purchase."
    },
    {
      q: "Do you offer financial aid?",
      a: "Yes, we believe education should be accessible to everyone. You can apply for financial aid on the course page of many of our premium courses."
    }
  ];

  return (
    <div className="container py-20 max-w-3xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">
          Find answers to common questions about our platform and services.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-6 bg-background shadow-sm overflow-hidden">
            <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQPage;
