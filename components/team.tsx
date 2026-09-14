"use client"

import { useState, useEffect, useRef } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Github, Twitter, Instagram, Globe } from "lucide-react"

interface Skill {
  name: string
}

interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  instagram?: string
  website?: string
}

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  photoUrl: string
  skills: Skill[]
  socialLinks: SocialLinks
  email?: string
}

function TeamMember({
  name,
  role,
  bio,
  photoUrl,
  skills,
  socialLinks,
}: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Handle image loading error
  const handleImageError = () => {
    console.warn(`Failed to load image for team member: ${name}, URL: ${photoUrl}. Using fallback.`)
    setImageError(true)
  }

  // Handle successful image load
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Generate a fallback image as a data URI with the person's initials
  const getInitials = () => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const initials = getInitials()
  const fallbackDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='Arial' fontWeight='bold' fontSize='120' fill='%230CCEA9'%3E${initials}%3C/text%3E%3C/svg%3E`

  // Ensure the photoUrl is valid and has a proper fallback
  const safePhotoUrl = photoUrl || fallbackDataUri

  return (
    <div
      ref={cardRef}
      className="relative bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 flex flex-col w-full h-full"
    >
      {/* Card content that's always visible */}
      <div className="flex flex-col h-full">
        {/* Photo with error handling - fixed height */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-700">
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Actual image using Next.js Image for reliable loading */}
          {!imageError && (
            <NextImage
              src={safePhotoUrl}
              alt={`${name || "Team member"}`}
              fill
              className={`object-cover object-center transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority
              unoptimized
            />
          )}

          {/* Fallback for error - using data URI with initials */}
          {imageError && (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div
                className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary"
                style={{
                  backgroundImage: `url(${fallbackDataUri})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

          {/* Name and role */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white mb-1">{name || "Team Member"}</h3>
            <p className="text-primary">{role || "Role"}</p>
          </div>
        </div>

        {/* Basic content - with improved spacing and overflow handling */}
        <div className="p-3 flex-grow flex flex-col justify-between space-y-3">
          {/* Bio with proper overflow handling */}
          <div className="overflow-hidden">
            <p className={`text-gray-400 text-sm`}>{bio}</p>
          </div>

          {/* Skills with proper spacing */}
          <div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-md mb-2"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links with proper spacing */}
          <div className="flex space-x-3 text-gray-400 h-8 items-center">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={`${name}'s GitHub profile`}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={`${name}'s LinkedIn profile`}
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={`${name}'s Twitter profile`}
                onClick={(e) => e.stopPropagation()}
              >
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={`${name}'s Instagram profile`}
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram size={18} />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={`${name}'s website`}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const teamMembers: TeamMemberProps[] = [
    {
      name: "Samrudh Jain",
      role: "Backend Developer",
      bio: "Samrudh is a technical genius with deep expertise in scalable architectures and AI integration. He oversees all technical aspects of ZeroLag's projects and ensures optimal performance.",
      photoUrl: "/images/team/samrudh.jpg",
      skills: [
        { name: "System Architecture" },
        { name: "AI Integration" },
        { name: "Performance Optimization" },
      ],
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/sam-wiz/",
        github: "https://github.com/Sam-wiz",
        website: "https://samrudh.me/",
        twitter: "https://x.com/Samrudh_Vand_05",
      },
      email: "samrudhvvandakudri2005@gmail.com",
    },
    {
      name: "Suhas Kembhavi",
      role: "Front-end Developer",
      bio: "Suhas is a talented front-end developer with expertise in responsive web design and database management systems. He's currently working on GradeSense, an AI-powered grading assistant.",
      photoUrl: "/images/team/suhas-kembhavi.jpg",
      skills: [
        { name: "Front-end Development" },
        { name: "DBMS" },
        { name: "React" },
      ],
      socialLinks: {
        github: "https://github.com/Suhassk205",
        twitter: "https://x.com/suhassk2005",
        linkedin: "https://www.linkedin.com/in/suhas-kembhavi/",
        website: "https://suhaskembhavi.me/",
      },
      email: "suhassk2005@gmail.com",
    },
    {
      name: "Sukrut Manu",
      role: "Creative Director & Ops Lead",
      bio: "Sukrut drives project execution and team coordination at ZeroLag. With a strong background in operations and his past role at Viir Trading, he brings strategic insight and executional strength to every project.",
      photoUrl: "/images/team/sukrut.jpg",
      skills: [
        { name: "Operations Management" },
        { name: "Project Execution" },
        { name: "Creative Direction" },
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/sukrut-manu-330a79371/",
      },
      email: "sukrut@zerolag.tech",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-20 md:py-28 relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(12,206,169,0.2)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(12,206,169,0.15)_0%,transparent_60%)]"></div>
        <div className="absolute w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="team-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#0CCEA9" strokeWidth="0.2" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-950 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent opacity-80"></div>
      </div>

      {/* Bottom gradient for smooth transition to contact section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Meet Our <span className="text-primary">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Our team of experts combines deep technical knowledge with creative problem-solving to deliver exceptional
            results for our clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Flip card styles */}
      <style jsx global>{`
        .flip-card-container {
          perspective: 1000px;
        }
        
        .flip-card {
          position: relative;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .flip-card-container:hover .flip-card {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          overflow: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
