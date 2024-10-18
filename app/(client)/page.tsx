"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Image from "next/image"
import Logo from "@/assets/logo/logo.svg"
import { useRouter } from "next/navigation"

export default function PricingPage() {
	const router = useRouter()

  const plans = [
    {
      name: "Basic",
      price: "$9",
      description: "Essential features for small teams",
      features: ["Up to 5 users", "5GB storage", "Basic support", "Core features"],
    },
    {
      name: "Pro",
      price: "$29",
      description: "Advanced features for growing businesses",
      features: ["Up to 20 users", "50GB storage", "Priority support", "Advanced features", "API access"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations",
      features: ["Unlimited users", "Unlimited storage", "24/7 dedicated support", "Custom integrations", "On-premise options"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 flex flex-col items-center">
				<Image
					src={Logo}
					className="rounded-full"
					alt="Pricing"
					width={124}
					height={124}
				/>
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">Choose the plan that's right for your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-xl font-normal text-muted-foreground">{plan.price !== "Custom" && "/month"}</span></div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
								className="w-full"
								onClick={() => router.push('/signup')}
							>
								{plan.price === "Custom" ? "Contact Sales" : "Get Started"}
							</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I change my plan later?</h3>
            <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is there a free trial available?</h3>
            <p className="text-muted-foreground">Yes, we offer a 14-day free trial for our Basic and Pro plans. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  )
}