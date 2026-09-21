import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Basic",
      price: isAnnual ? "$0" : "$0",
      description: "Get started with our free courses and resources.",
      features: ["Access to 50+ free courses", "Community forum access", "Standard support", "Mobile app access"],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: isAnnual ? "$19" : "$29",
      description: "Everything you need to master professional skills.",
      features: ["Unlimited access to all courses", "Verified certificates", "Priority support", "Offline viewing", "Career resources"],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Team",
      price: isAnnual ? "$49" : "$59",
      description: "Upskill your entire team with our business tools.",
      features: ["Admin dashboard", "Team analytics", "Single sign-on (SSO)", "Custom learning paths", "LMS integration"],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="container py-20 flex flex-col items-center gap-12">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Choose the plan that&apos;s right for you. All plans include a 7-day free trial.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className={isAnnual ? "text-muted-foreground" : "font-bold"}>Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={isAnnual ? "font-bold" : "text-muted-foreground"}>
          Annual <span className="text-primary text-xs bg-primary/10 px-2 py-0.5 rounded-full">Save 30%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col p-8 rounded-3xl border ${plan.highlight ? 'border-primary ring-1 ring-primary shadow-xl scale-105' : 'bg-background shadow-sm'} transition-all`}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant={plan.highlight ? "default" : "outline"} className="w-full h-12 rounded-xl font-bold text-lg">
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
