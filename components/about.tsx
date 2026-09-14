import { Cpu, Zap, Scale, Gauge, CheckCircle2 } from "lucide-react"

const features = [
  {
    title: "AI Integration",
    description: "Our advanced AI models enhance every aspect of your software, creating intelligent systems that learn and adapt.",
    icon: <Cpu className="h-8 w-8 text-primary" />,
    benefits: [
      "Custom-trained models on your data",
      "Seamless integration with existing systems",
      "Continuous learning and improvement",
    ],
  },
  {
    title: "Intelligent Automation",
    description: "Our automated agents handle complex tasks with precision, reducing manual intervention and accelerating processes.",
    icon: <Zap className="h-8 w-8 text-primary" />,
    benefits: [
      "24/7 operation without fatigue",
      "Consistent quality and performance",
      "Rapid adaptation to changing conditions",
    ],
  },
  {
    title: "Infinite Scalability",
    description: "We build systems that grow seamlessly with your business, handling increased loads without performance degradation.",
    icon: <Scale className="h-8 w-8 text-primary" />,
    benefits: [
      "Elastic infrastructure that scales on demand",
      "Microservices architecture for flexibility",
      "Load balancing and redundancy built-in",
    ],
  },
  {
    title: "Optimized Performance",
    description: "Experience lightning-fast applications with our performance-first approach, ensuring users never experience lag.",
    icon: <Gauge className="h-8 w-8 text-primary" />,
    benefits: [
      "Sub-second response times",
      "Optimized database queries and caching",
      "Efficient resource utilization",
    ],
  },
]

export default function About() {
  return (
    <div className="w-full bg-[#0A1428] text-white py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose ZeroLag
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Transforming Ideas into <br className="hidden md:block" />
            <span className="text-primary">Intelligent Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            We combine cutting-edge AI with robust architecture to deliver software that scales effortlessly and performs with zero lag.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-950 rounded-xl border border-gray-800">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Key Benefits</h4>
                {feature.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-32 text-center max-w-2xl mx-auto bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl p-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="text-primary">Transform</span> Your Business?</h3>
          <p className="text-gray-400 mb-8">
            Partner with us to leverage cutting-edge AI and scalable architecture for your next project.
          </p>
          <a
            href="https://cal.com/zerolag/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(12,206,169,0.3)] hover:shadow-[0_0_30px_rgba(12,206,169,0.5)]"
          >
            Start Your Journey
          </a>
        </div>

      </div>
    </div>
  )
}
