import { Header } from "@/components/layout/header"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Terms of Service</h1>
        <div className="prose max-w-none bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Hirenup, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to these Terms of Service, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Hirenup is a professional platform that connects freelancers, entrepreneurs, companies, workers, and investors. 
              We provide tools and services to facilitate professional connections, project management, and business growth.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">3.1 Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To use certain features of our platform, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as necessary</li>
              <li>Maintain the security of your password</li>
              <li>Accept all responsibility for activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">3.2 Account Types</h3>
            <p className="text-gray-700 mb-4">
              Our platform supports multiple account types: Freelancer, Entrepreneur, Worker, Employer, and Investor. 
              Each account type has specific features and responsibilities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. User Conduct</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the platform</li>
              <li>Collect user information without consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The platform and its original content, features, and functionality are owned by Hirenup and are protected 
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              Certain features may require payment. By making a payment, you agree to our payment terms and conditions. 
              All fees are non-refundable unless otherwise stated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Hirenup shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including loss of profits, data, or other intangible losses, resulting from your use of the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe 
              violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes. 
              Your continued use of the platform constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-700">
              Email: legal@hirenup.com<br />
              Address: Hirenup Legal Team
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

