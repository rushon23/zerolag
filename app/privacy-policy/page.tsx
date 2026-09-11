export default function PrivacyPolicyPage() {
    return (
      <div className="bg-[#13222E] text-gray-300 min-h-screen font-sans">
        <div className="container mx-auto max-w-4xl py-24 px-6">
          <header className="mb-12 border-b border-gray-800 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
            <p className="text-gray-500 mt-2">Effective Date: June 19, 2025</p>
          </header>
  
          <div className="space-y-10 text-lg leading-relaxed">
            <p>
              At Zerolag Technologies Pvt. Ltd., we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, zerolag.tech.
            </p>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li><strong className="text-gray-300">Personal Information:</strong> Name, email address, phone number (when you fill out a form or contact us).</li>
                <li><strong className="text-gray-300">Usage Data:</strong> Browser type, IP address, referring pages, and pages visited (via cookies and analytics tools).</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Respond to your inquiries.</li>
                <li>Improve our services and website.</li>
                <li>Communicate relevant updates or offers, if you opt-in.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies</h2>
              <p>We use cookies to enhance user experience. You can control cookie settings through your browser.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
              <p className="mb-3">We do not sell your data. We may share it with:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Trusted service providers who help us run our business.</li>
                <li>Legal authorities if required by law.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
              <p>We implement appropriate security measures to protect your data, but no method is 100% secure.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="mb-3">You may:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Request access to your personal data.</li>
                <li>Ask us to delete or update your information.</li>
                <li>Opt-out of communications at any time.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Links</h2>
              <p>Our website may contain links to other websites. We are not responsible for their privacy practices.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p>For any privacy-related concerns, contact us at: <a href="mailto:privacy@zerolag.tech" className="text-blue-400 hover:underline">privacy@zerolag.tech</a></p>
            </section>
          </div>
        </div>
      </div>
    );
  }
  