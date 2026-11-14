import type { Metadata } from 'next'
import { getWritingBySlug } from '../../data/writings'

const piece = getWritingBySlug('life-as-an-rl-run')!

export const metadata: Metadata = {
  title: `${piece.title} · Manav Aggarwal`,
  description: piece.teaser,
}

export default function LifeAsAnRLRunPage() {
  return (
    <div className="writing-page">
      <div className="grain" aria-hidden="true" />
      <div className="marble-veins" aria-hidden="true" />
      <article className="writing-article">
        <p className="label writing-kicker">{piece.tag} · {piece.date}</p>
        <h1 className="writing-title writing-essay-title">{piece.title}</h1>
        <div className="writing-body writing-essay">
          <p>{'Here’s my take on viewing your life as a reinforcement learning run, and why you should do your own rollouts.'}</p>

          <h2>Reinforcement learning 101:</h2>
          <ul>
            <li>{'There is a policy model which takes actions and receives rewards based on these actions. The policy model is YOU in our analogy.'}</li>
            <li>{'A rollout or trajectory is a set of actions. For example, we can say all the decisions and actions you take on a given Monday to be a rollout.'}</li>
            <li>{'Reward is the quantity of positive feedback we provide to the policy. A reward function takes in a set of actions (rollout) as input and outputs a quantity of “yes, do this more”.'}</li>
          </ul>
          <p>{'The policy model conducts a rollout, receives feedback via the reward function, and [ slightly ] changes its behavior to receive more reward next time.'}</p>
          <p>{'For example, let’s say you study for an exam and get a C+. The rollout was the discussion worksheets you did, lectures you reviewed, and the total time you spent studying. Your reward was a C+, provided by your teacher as the reward function. Given this low reward, you would go into the next test trying a slightly different strategy - studying for longer, taking practice exams instead of reviewing lecture, etc. If you received an A+, you would probably do the exact same study techniques as you did before. This introduces the idea of exploration vs exploitation.'}</p>
          <p>{'In one sentence, exploration is trying a different strategy in hopes of receiving a higher reward and exploitation is continuing to follow the same strategy as it has been successful in previous rollouts.'}</p>
          <p>{'As we grow older (and in an RL run), we (typically) shift our strategy from entirely exploratory to quite exploitative. Once you find a strategy that works, it makes sense to use it more often. But what does it mean for a strategy to “work” in your life?'}</p>

          <h2>What are you optimizing for?</h2>
          <p>{'A persons ‘meaning of life’ is their reward function. For people who only care about status, their reward function is entirely based on a proxy model’s (society) opinion of them [PPO]. But for most, its a continuous function that changes as you experience life. Here’s a basic example life reward function:'}</p>
          <pre><code>{'reward_fn = 0.5 * [financial support] +\n            0.5 [time with family]'}</code></pre>
          <p>{'the [ — ] are your ‘tenets’ and the hyperparameters (0.5, 0.5) are how much you value those tenets in comparison to every other one. Obviously this is ever-changing over the course of one’s life. Here are some more examples:'}</p>
          <pre><code>{'reward_fn = (1) * [society’s opinion of you] → “Yuppies”'}</code></pre>
          <pre><code>{'reward_fn = 0.5 * [trying new foods] + 0.5 * [traveling to new places] → “Adventurer”'}</code></pre>
          <pre><code>{'reward_fn = 0.1 * [society’s opinion of you] + 0.2 * [traveling to new places] + 0.3 * [volunteering] + 0.4 * [making money] → more realistic case'}</code></pre>
          <p>{'Living life optimizing under this objective function determines how you act. Your reward function determines the actions you take. Maybe you take a job that pays well, but doesn’t allow you to travel as much or spend time with family. Depending on how much your reward function weights money versus WLB, the decision you make changes.'}</p>

          <h2>Why you should do your down rollouts</h2>
          <p>{'Imitation learning is exactly what it sounds like. We find our strategy to maximize rewards by imitating a stronger model’s behaviors. In LLM training, this is especially useful initially when our model’s capabilities are significantly weak and can be rapidly improved by training on the output of others.'}</p>
          <p>{'There is a time for imitation learning in ones life like in grade school. We imitate stronger models (adults) to learn what is acceptable to do / not do.'}</p>
          <p>{'It feels incredibly natural to continue to imitate those you look up to. But as we grow older, the issue with viewing life as an imitation learning problem is that:'}</p>
          <ul>
            <li>{'You can only become as successful as the model, or person, your distilling from.'}</li>
            <li>{'Your reward function is NEVER the same as the model, or person, you’re imitating.'}</li>
          </ul>
          <p>{'Thus you will never earn your maximal reward if you’re copying actions made based on someone else’s reward function.'}</p>
          <p>{'Contrast this with RL where you do your own rollouts. Exploring or exploiting strategies optimized against your own defined meaning of success allows you to both surpass any teacher model and discover new strategies that may work even better in your specific circumstances.'}</p>
          <p>{'My key takeaway is that you should explore your environment enough to understand what you value, and then optimize the set of actions you take to maximize your reward instead of copying other’s actions. You’re solving your own MDP :) !'}</p>
        </div>
      </article>
    </div>
  )
}
