import { HeaderLayout } from '@/components/layouts/header-layout'

export default async function TermsPage() {
  return (
    <HeaderLayout>
      <div className="p-10 overflow-auto flex-1 w-full">
        <article className=" prose prose-slate max-w-prose dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:no-underline dark:prose-p:text-white/70 dark:prose-a:text-blue-500">
          <h1>Terms of Service</h1>
          <p>
            <strong>Acceptance of Terms:</strong> By accessing and using the{' '}
            <a href="https://101.school">101.school</a> website (&quot;Service&quot;), you
            agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not
            agree with any part of these Terms, you must not use the Service.
          </p>
          <p>
            <strong>Description of Service:</strong> 101 School is AI course generator.
            Users can create an outline of a course and 101 School will generate a course
            based on the outline using GPT technology.
          </p>
          <p>
            <strong>User Accounts:</strong> In order to access certain features of the
            Service, you must register for a user account. You are responsible for
            maintaining the confidentiality of your account password and for all
            activities that occur under your account. 101 School reserves the right to
            suspend or terminate your account at any time for any reason, including, but
            not limited to, violation of these Terms.
          </p>
          <p>
            <strong>Data Collection, Usage, and Storage:</strong> 101 School retains logs
            related to your use of the Service for 30 days. By using the Service, you
            consent to such data collection, usage, and storage.
          </p>
          <p>
            <strong>Restrictions and Limitations:</strong> By using the Service, you agree
            not to engage in any hacking, spamming, or any other activities that may
            disrupt or interfere with the Service or its users. 101 School reserves the
            right to take any necessary actions, including legal actions, against users
            who violate these restrictions.
          </p>
          <p>
            <strong>User-Generated Content and Intellectual Property Rights:</strong> By
            uploading course descriptions or any other content to the Service, you agree
            to license such content under the{' '}
            <a href="https://opensource.org/licenses/MIT">MIT license</a>. You represent
            and warrant that you have the necessary rights to license your content in this
            manner.
          </p>
          <p>
            <strong>Termination and Suspension:</strong> 101 School reserves the right to
            terminate or suspend your access to the Service, with or without notice, for
            any reason, including but not limited to, violation of these Terms.
          </p>
          <p>
            <strong>Disclaimers and Liability Limitations:</strong> The Service is
            provided &quot;as is&quot; and &quot;as available&quot; without any warranties
            of any kind, express or implied, including, but not limited to, implied
            warranties of merchantability, fitness for a particular purpose, or
            non-infringement. 101 School does not warrant that the Service will be
            uninterrupted, error-free, or completely secure. 101 School makes no guarantee
            that the generated course will be accurate or complete. The generated course
            is for informational purposes only and should not be relied upon for any
            purpose. Courses are provided &quot;as is&quot; without warranty of any kind,
            either express or implied, including without limitation any warranties
            concerning the availability, accuracy or content of information, products or
            services.
          </p>
          <p>
            To the extent permitted by law, 101 School shall not be liable for any direct,
            indirect, incidental, consequential, or exemplary damages, including but not
            limited to, damages for loss of profits, goodwill, use, data, or other
            intangible losses, arising out of or in connection with the use or inability
            to use the Service.
          </p>
          <p>
            <strong>Governing Law and Jurisdiction:</strong> These Terms shall be governed
            by and construed in accordance with the laws of the State of Delaware, USA,
            without regard to its conflict of law provisions. You agree to submit to the
            personal and exclusive jurisdiction of the courts located in Delaware, USA,
            for any disputes arising out of or relating to the use of the Service or these
            Terms.
          </p>
          <p>
            <strong>Changes to Terms of Service:</strong> 101 School reserves the right to
            update or modify these Terms at any time without prior notice. Your continued
            use of the Service after such changes constitutes your acceptance of the
            revised Terms. It is your responsibility to regularly review these Terms to
            stay informed of any changes.
          </p>

          <p>Last updated: 2023-08-17</p>
        </article>
      </div>
    </HeaderLayout>
  )
}
