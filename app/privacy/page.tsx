import { HeaderLayout } from '@/components/layouts/header-layout'

export default async function PrivacyPage() {
  return (
    <HeaderLayout>
      <div className="p-10 overflow-auto flex-1 w-full">
        <article className="prose prose-slate max-w-prose dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:no-underline dark:prose-p:text-white/70 dark:prose-a:text-blue-500">
          <h1>Introduction</h1>
          <p>
            101 School (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed
            to protecting the privacy of our users. This Privacy Policy outlines how we
            collect, use, store, and disclose your personal information when you use our
            package manager for OpenAPI specifications. By using our Service, you agree to
            the collection and use of your information in accordance with this Privacy
            Policy.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you register for an account, we may collect the following types of
            personal information: Your name, Email address, Username
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the personal information we collect from you to: Provide, maintain, and
            improve the Service Communicate with you, including responding to your
            requests, inquiries, and sending important notices Personalize your experience
            with the Service Protect the security and integrity of the Service Enforce our
            Terms of Service and comply with applicable laws Data Retention We retain logs
            related to your use of the Service for 30 days. We will retain your personal
            information for as long as necessary to fulfill the purposes for which it was
            collected, comply with our legal obligations, resolve disputes, and enforce
            our agreements.
          </p>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties
            for their marketing purposes. We may disclose your personal information in the
            following cases:
          </p>
          <ul>
            <li>
              To comply with a legal obligation, such as a court order, subpoena, or
              government request
            </li>
            <li>
              To protect the rights, property, or safety of 101 School, our users, or
              others
            </li>
            <li>
              In connection with a merger, acquisition, or sale of assets of 101 School,
              in which case the acquiring company will be subject to the terms of this
              Privacy Policy
            </li>
          </ul>

          <h2>Security</h2>
          <p>
            We take reasonable precautions to protect your personal information from
            unauthorized access, use, or disclosure. However, no method of transmission
            over the internet or electronic storage is 100% secure. Therefore, we cannot
            guarantee the absolute security of your personal information.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We are not responsible
            for the content or privacy practices of those websites. We encourage you to
            review the privacy policies of any third-party websites you visit.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any time
            without prior notice. Your continued use of the Service after such changes
            constitutes your acceptance of the revised Privacy Policy. It is your
            responsibility to regularly review this Privacy Policy to stay informed of any
            changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data
            practices, please contact us at{' '}
            <a href="mailto:privacy@101.school">privacy@101.school</a>
          </p>
        </article>
      </div>
    </HeaderLayout>
  )
}
