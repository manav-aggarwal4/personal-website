import type { Metadata } from 'next'
import { getWritingBySlug } from '../../data/writings'

const piece = getWritingBySlug('updating-your-priors')!

export const metadata: Metadata = {
  title: `${piece.title} · Manav Aggarwal`,
  description: piece.teaser,
}

export default function UpdatingYourPriorsPage() {
  return (
    <div className="writing-page">
      <div className="grain" aria-hidden="true" />
      <div className="marble-veins" aria-hidden="true" />
      <article className="writing-article">
        <p className="label writing-kicker">{piece.date}</p>
        <h1 className="writing-title writing-essay-title">{piece.title}</h1>
        <div className="writing-body writing-essay">
          <p>Ironically, I am a major proponent of formal education. I like to compare school ≤ college to the pre-training stage of LLM development. We train on a broad data distribution of coursework and experiences, learn internal representations across domains, and develop generalizable capabilities.</p>

          <p>As established in the <a href="https://arxiv.org/abs/2005.14165">research</a>, lots of an LLM’s downstream capabilities emerge during pre-training. I’d even argue that pre-training matters as much (if not more) than post-training. An amazing pre-train base can <a href="https://proceedings.neurips.cc/paper_files/paper/2023/file/ec6413875e4ab08d7bc4d8e225263398-Paper-Datasets_and_Benchmarks.pdf">perform better</a> than a post-trained model built off a bad base.</p>

          <p>If a model, or you, has a bad prior, then there’s only so much post-training you can do to improves its capabilities. Education allows you to build a strong prior.</p>

          <p>Successful pre-training is essential for alignment, too! This is a formative period of an LLM’s learned representation of morality, ethics, and its own persona (ode to the <a href="https://alignment.anthropic.com/2026/psm/"><strong>Persona Selection Model</strong></a>). Our teachers and peers give us examples of what honesty and responsibility look like in practice, which help shape our sense of right and wrong and the kind of person we want to become.</p>

          <p>In order to have a successful pre-training run, you need significantly more time and compute compared with the other phases of model training. College is a unique period where you have an unfathomable amount of time to think and learn. You can afford to spend an entire day on a hard problem set, which is rarer to come by when working full-time. Those hard problems are where the most informative gradient updates come from, too.</p>

          <p>I think of a full-time job as post-training yourself on a narrower task distribution. Most of your practice goes toward the skills your job demands, and some of what you learn carries over to other fields. Trying to dedicate substantial time to learning unrelated skills leaves you with the worst of both worlds. You won’t be able to learn as effectively, and will have less focus to give to your work.</p>

          <p>Unrelated, but taking factual recall-based classes nowadays is not important. Memorizing internet protocols is not important as it used to be because Claude can tell me the difference between UDP and TCP (and probably rebuild them both from first principles) in a single prompt. However, it can’t give you the ability to think critically. You get that through working through hard problems by yourself. Particularly, math is exceptional at building critical thinking skills. When I went back to Berkeley after working full-time at xAI, I decided to spend the rest of undergrad taking the hardest math classes I can.</p>

          <p>Here’s the guide to have a successful pre-training run:</p>
          <ol>
            <li><strong>Take as many math and statistics classes as possible.</strong></li>
            <li><strong>Take 1 non-STEM class per semester.</strong> These classes give you a break from your technical courseload and expose you to different ways of thinking (and distribution of people). I’ve found rhetoric classes really helpful for improving my clarity of thought. I also took Computational Photography because I really enjoy photography as a hobby, but I didn’t expect that learning about geometric projections and homographies would give me a much better intuition for linear algebra , which has in turn made me a better researcher.</li>
            <li><strong>Study very hard, and don’t let AI handicap your learning.</strong> I use AI to teach me concepts, but there’s a fine line between using it as a tool and letting it think for you.</li>
          </ol>

          <p>College is not just for studies, though. It’ll never be easier to say ‘Yes!’ to things than it is now. I’ll make another writing about the beauty and importance of serendipity, but I’ll just say that college is the most conveniently serendipitous time in our lives. It takes significant effort outside of college to achieve the average level of spontaneity of a day in college.</p>

          <p>I’ve met a lot of people who dropped out and went back to school feeling like they “lost.” I think this is the wrong framing. Working full-time made me realize how rare it is to have dedicated time to pre-train. Having this dedicated time is worth it.</p>
        </div>
      </article>
    </div>
  )
}
