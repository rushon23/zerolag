import { ArrowRight } from "lucide-react"
import { CircuitPattern, DataFlowPattern, WavePattern } from "./animated-backgrounds"
import CardAnimation from "./card-animation"

export default function Blog() {
  const articles = [
    {
      title: "The Future of AI in Software Development",
      excerpt:
        "Explore how artificial intelligence is transforming the software development lifecycle and what it means for businesses.",
      date: "April 5, 2025",
      category: "AI",
      image: "/placeholder.svg?height=300&width=500",
      pattern: <CircuitPattern />,
    },
    {
      title: "Building Scalable Systems: Architecture Patterns",
      excerpt:
        "Learn about the latest architecture patterns that enable software to scale seamlessly from thousands to millions of users.",
      date: "March 22, 2025",
      category: "Architecture",
      pattern: <DataFlowPattern />,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Intelligent Agents: The Next Evolution in Automation",
      excerpt:
        "Discover how intelligent agents are revolutionizing business processes and creating new opportunities for efficiency.",
      date: "March 10, 2025",
      category: "Automation",
      pattern: <WavePattern />,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Latest <span className="text-primary">Insights</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Stay updated with our latest thoughts on AI, scalability, and software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <CardAnimation key={index} index={index}>
              <div className="bg-secondary/30 border border-gray-700 rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:translate-y-[-5px] group relative">
                <div className="relative">
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 z-0">
                    {article.pattern}
                  </div>
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover relative z-10"
                  />
                </div>

                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-400 text-sm">{article.date}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                  <p className="text-gray-400 mb-6">{article.excerpt}</p>

                  <button className="button button--telesto">
                    <span>
                      <span>
                        Read More <ArrowRight className="ml-2 h-4 w-4 inline" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </CardAnimation>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-secondary/50 border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
              <CircuitPattern />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300 mb-6">
                Get the latest insights on AI, automation, and scalable software development delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="button button--skoll">
                  <span>
                    <span>Subscribe</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
