import { Header } from "@/components/layout/header"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Cookie Policy</h1>
        <div className="prose max-w-none bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. What Are Cookies</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">We use cookies for the following purposes:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">2.1 Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as 
              security, network management, and accessibility.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">2.2 Performance Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting 
              information anonymously. This helps us improve the way our website works.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">2.3 Functionality Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies allow the website to remember choices you make and provide enhanced, personalized features.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">2.4 Targeting Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies may be set through our site by our advertising partners to build a profile of your interests 
              and show you relevant content on other sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
              of the service, deliver advertisements, and so on.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting 
              cookies may impact your experience on our website. You can:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Delete all cookies from your browser</li>
              <li>Block all cookies from being set</li>
              <li>Set your browser to notify you when a cookie is being set</li>
              <li>Block third-party cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Cookie Consent</h2>
            <p className="text-gray-700 mb-4">
              By continuing to use our website, you consent to our use of cookies as described in this policy. 
              You can withdraw your consent at any time by adjusting your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p className="text-gray-700">
              Email: privacy@hirenup.com<br />
              Address: Hirenup Privacy Team
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

