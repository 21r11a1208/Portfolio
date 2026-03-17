import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";

export const metadata: Metadata = {
  title: "LinkedIn DAU Drop RCA — B Anish",
  description: "A structured root cause analysis for a hypothetical 15% LinkedIn DAU drop in India.",
};

const project = {
  title: "LinkedIn DAU Drop",
  type: "RCA" as const,
  status: "Conceptual" as const,
  description: "A structured RCA for a hypothetical 15% LinkedIn DAU drop in India over two weeks — root cause analysis from first principles.",
};

export default function LinkedInRCAPage() {
  return (
    <CaseStudyLayout project={project} readTime="6 min read">
      <h2>The Scenario</h2>
      <p>
        LinkedIn&apos;s DAU in India drops 15% over a two-week period. You are the PM responsible for engagement. What do you do?
      </p>

      <h2>Step 1: Clarify the Signal</h2>
      <p>
        Before investigating, get precise about what the metric is telling you:
      </p>
      <ul>
        <li><strong>Which users?</strong> Is the drop uniform across segments or concentrated? (New vs. retained, mobile vs. desktop, specific city or demographic)</li>
        <li><strong>Which actions?</strong> Is it total logins that dropped, or is it specific actions — posting, commenting, job applications?</li>
        <li><strong>Which platform?</strong> Is the drop specific to Android, iOS, or web?</li>
        <li><strong>When exactly?</strong> Is it a gradual decline or a step-change at a specific date?</li>
      </ul>
      <p>
        A 15% DAU drop that is uniform, gradual, and cross-platform tells a different story than one that appeared overnight on Android only.
      </p>

      <h2>Step 2: Internal Checks</h2>
      <ul>
        <li>Was there a product deployment or infrastructure change in the two weeks prior? Check the deployment log.</li>
        <li>Did any A/B test go live that could have affected retention or notification flows for a subset of Indian users?</li>
        <li>Were there any changes to the feed algorithm or content ranking?</li>
        <li>Are there any error rate spikes, latency increases, or crash reports from India that correlate with the drop window?</li>
        <li>Did any notification type (job alert, connection request, content recommendation) change in frequency or format?</li>
      </ul>

      <h2>Step 3: External Checks</h2>
      <ul>
        <li>Did a competitor (Naukri, Unstop, Internshala, Discord) launch something significant or go viral in India during this period?</li>
        <li>Was there news coverage, controversy, or a public incident that could have affected perception of LinkedIn in India? (e.g., data privacy, layoffs, recruiter behaviour backlash)</li>
        <li>Are there internet connectivity issues in a specific region during this window?</li>
        <li>Is this a seasonal effect? (semester end, exam season, holiday period — does the same pattern appear in previous years?)</li>
      </ul>

      <h2>Step 4: Funnel Analysis</h2>
      <p>
        Break the DAU decline into acquisition, activation, and retention:
      </p>
      <ul>
        <li><strong>Acquisition:</strong> Are new user signups down? Is organic discovery via search or social reduced?</li>
        <li><strong>Activation:</strong> Are newly signed-up users completing profile setup or making their first connection?</li>
        <li><strong>Retention:</strong> Are previously active users returning less frequently? Is the drop concentrated in users who were active 1-7 days ago or users who were active 30+ days ago?</li>
        <li><strong>Resurrection:</strong> Are dormant users being re-engaged less effectively?</li>
      </ul>

      <h2>Top Hypotheses, Ranked by Likelihood</h2>
      <ol>
        <li><strong>Algorithm or notification change reduced re-engagement triggers</strong> — notification-driven DAU is high; a reduction in job alert volume or relevance directly reduces daily return rates</li>
        <li><strong>Seasonal effect</strong> — exam season or a major holiday reduces professional activity across the board; historical data should confirm or eliminate this quickly</li>
        <li><strong>Competitor activity</strong> — a viral moment or feature launch by a competing platform pulled attention</li>
        <li><strong>Technical regression</strong> — a performance degradation or bug on the Android app (dominant in India) that reduced session completion</li>
        <li><strong>Perception/trust issue</strong> — negative press or social media backlash reduced brand affinity temporarily</li>
      </ol>

      <h2>Recommended Validation Steps</h2>
      <ul>
        <li>Pull DAU by platform (Android/iOS/web) for India — isolate if device-specific</li>
        <li>Check notification delivery and open rates in India for the two-week window</li>
        <li>Cross-reference deployment log with the start date of the decline</li>
        <li>Compare this year&apos;s two-week window to the same window in the previous two years — rule out seasonality</li>
        <li>Run a sentiment analysis on LinkedIn-related social content in India from the period</li>
        <li>If internal checks come up clean, run a survey to a random sample of India users who were active and then lapsed — ask directly what changed</li>
      </ul>
    </CaseStudyLayout>
  );
}
