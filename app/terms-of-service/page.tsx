export default function TermsOfServicePage() {
    return (
      <div className="bg-[#13222E] text-gray-300 min-h-screen font-sans">
        <div className="container mx-auto max-w-4xl py-24 px-6">
          <header className="mb-12 border-b border-gray-800 pb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">Terms & Conditions</h1>
              <p className="text-gray-500 mt-2">Effective Date: June 19, 2025</p>
          </header>
  
          <div className="space-y-10 text-lg leading-relaxed">
            <p>
              Welcome to Zerolag Technologies Pvt. Ltd. ("we", "our", or "us"). By accessing our website zerolag.tech, you agree to the following terms.
            </p>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Use of Website</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                <li>Use our website only for lawful purposes.</li>
                <li>Not use the site in a way that damages or impairs its performance.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property</h2>
              <p>All content, including text, graphics, logos, and code, is the property of Zerolag or its licensors and is protected by copyright and trademark laws.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimers</h2>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                  <li>Our website is provided “as is” without warranties of any kind.</li>
                  <li>We are not liable for any damages arising from use or inability to use the site.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
              <p>In no event shall Zerolag be liable for any indirect, incidental, or consequential damages arising from your use of the website.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. External Links</h2>
              <p>We are not responsible for the content or accuracy of third-party sites linked from our website.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to Terms</h2>
              <p>We reserve the right to update these terms at any time. Continued use of the website after changes implies your acceptance.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
              <p>These terms are governed by the laws of India.</p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
              <p>For questions about these Terms & Conditions, contact us at: <a href="mailto:contact@zerolag.tech" className="text-blue-400 hover:underline">contact@zerolag.tech</a></p>
            </section>
          </div>
        </div>
      </div>
    );
  }