import { SiteHeader } from "@/components/(landing-page)/site-header";
import { SiteFooter } from "@/components/(landing-page)/site-footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-4">
        <div className="container mx-auto p-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <h2 className="font-semibold text-xl">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Aratuku, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, you may not use the
            platform.
          </p>

          <h2 className="font-semibold text-xl">2. Use of the Platform</h2>
          <p className="mb-4">
            Aratuku is provided for educational purposes. You agree to use the
            platform responsibly and in compliance with all applicable laws and
            regulations. You are responsible for all activity that occurs under
            your account.
          </p>

          <h2 className="font-semibold text-xl">3. Content Ownership</h2>
          <p className="mb-4">
            Students retain full ownership of any content that their teachers
            upload to Aratuku. Teachers and other parties may not use content
            published on Aratuku for purposes outside of the platform without
            their explicit consent, or permission from their legal guardian(s).
          </p>

          <h2 className="font-semibold text-xl">4. Prohibited Conduct</h2>
          <p className="mb-4">You agree not to use Aratuku to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe upon the intellectual property rights of others.</li>
            <li>
              Upload or share any harmful, offensive, or inappropriate content.
            </li>
            <li>Interfere with the operation of the platform.</li>
          </ul>

          <h2 className="font-semibold text-xl">5. Disclaimer of Warranties</h2>
          <p className="mb-4">
            Aratuku is provided &quot;as is&quot; without any warranties,
            express or implied. We do not guarantee the availability,
            reliability, or accuracy of the platform.
          </p>

          <h2 className="font-semibold text-xl">6. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, Aratuku shall not be liable
            for any damages arising from the use of the platform.
          </p>

          <h2 className="font-semibold text-xl">7. Governing Law</h2>
          <p className="mb-4">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of New Zealand.
          </p>

          <h2 className="font-semibold text-xl">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to update these Terms of Service at any time.
            You will be notified of any material changes.
          </p>

          <h2 className="font-semibold text-xl">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please
            contact us at info@aratuku.com.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
