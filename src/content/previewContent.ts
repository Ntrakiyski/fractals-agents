export type PreviewSectionId =
  | 'hero'
  | 'statement'
  | 'proof'
  | 'agency'
  | 'foundation'
  | 'flywheel'
  | 'philosophy'

export type PreviewServiceKey = 'assistant' | 'operator' | 'builder'

export type PreviewAspectIcon =
  | 'book-text'
  | 'message-square'
  | 'calendar-check'
  | 'laptop-minimal-check'
  | 'message-circle'
  | 'waypoints'
  | 'chart-line'
  | 'refresh-cw'
  | 'graduation-cap'

export interface PreviewAspect {
  icon: PreviewAspectIcon
  label: string
  text: string
}

export interface PreviewServiceDetail {
  title: string
  copy: string
  aspects: PreviewAspect[]
}

export interface PreviewService {
  key: PreviewServiceKey
  index: string
  title: string
  summary: string
  detail: PreviewServiceDetail
}

export const previewContent = {
  navLinks: [
    { id: 'statement' as PreviewSectionId, label: 'Why' },
    { id: 'proof' as PreviewSectionId, label: 'What' },
    { id: 'agency' as PreviewSectionId, label: 'Agency' },
    { id: 'foundation' as PreviewSectionId, label: 'How' },
    { id: 'flywheel' as PreviewSectionId, label: 'What next' },
  ],
  hero: {
    eyebrow: 'Not an agency',
    title: 'Automate everything.',
    body: 'Stop being good at doing. Start being good at directing.',
    primaryCta: { href: '#proof', label: 'See it in action' },
    secondaryCta: { href: '#philosophy', label: 'Book a free call' },
  },
  statement: {
    eyebrow: 'Positioning',
    title: 'Fractals builds AI systems and teaches teams how to direct them.',
    body: 'The point is not to drop in a tool and disappear. The point is to build what the business actually needs, challenge the habits keeping work manual, and help the team become better at teaching systems what good work looks like.',
    subsectionTitle: 'What changes',
    subsectionBody:
      'We start with one repeated bottleneck. We build the first working layer. Then we teach the team how to delegate clearly, direct better, and keep evolving the system without waiting on us for every move.',
  },
  proof: {
    eyebrow: 'foundation',
    title: 'Core Systems',
    body: 'Connected company knowledge, autonomous execution, and systems that keep getting better.',
    services: [
      {
        key: 'assistant',
        index: '01',
        title: 'Company AI Assistant',
        summary:
          'Connected to company knowledge, inboxes, docs, and apps for on-demand and scheduled work.',
        detail: {
          title: 'One place to ask, assign, and schedule',
          copy: 'This assistant connects to the company knowledge your team already lives in, then handles both on-demand requests and repeated scheduled work across the tools you already use.',
          aspects: [
            {
              icon: 'book-text',
              label: 'Company knowledge',
              text: 'It can work across SharePoint, Outlook, Teams, Google Workspace, and the social tools your company already depends on.',
            },
            {
              icon: 'message-square',
              label: 'On-demand asks',
              text: 'The team can ask for answers, drafts, summaries, and actions whenever the work shows up.',
            },
            {
              icon: 'calendar-check',
              label: 'Scheduled / repeated jobs',
              text: 'Repeated jobs can run every day, every other day, or on whatever rhythm the business actually needs.',
            },
          ],
        },
      },
      {
        key: 'operator',
        index: '02',
        title: 'Autonomous Operator',
        summary:
          'A proactive digital teammate that can do the work a person would normally carry.',
        detail: {
          title: 'A proactive digital teammate',
          copy: 'This operator can do what the company assistant can do, but it goes further: it can work like a real person on the team, live on a server or Mac mini, and keep moving toward goals, milestones, and tasks with far more autonomy.',
          aspects: [
            {
              icon: 'laptop-minimal-check',
              label: 'Full digital teammate',
              text: 'It can work across the same systems a person would touch, not just answer questions from a knowledge base.',
            },
            {
              icon: 'message-circle',
              label: 'Telegram / WhatsApp / Slack',
              text: 'You can direct it through familiar messaging channels instead of supervising every step inside the tools themselves.',
            },
            {
              icon: 'waypoints',
              label: 'Goals, milestones, tasks',
              text: 'Its job is to keep moving the work forward, escalate when needed, and pursue outcomes instead of waiting for constant prompts.',
            },
          ],
        },
      },
      {
        key: 'builder',
        index: '03',
        title: 'Self learning capabilities',
        summary:
          'The feedback loop that helps the operator improve itself and helps the team improve its direction.',
        detail: {
          title: 'Self learning capabilities',
          copy: 'This is the feedback mechanism around the operator itself: it stores how it worked, studies the feedback people give it, and proposes improvements for both itself and the team so less time is spent on guidance and repeated instruction.',
          aspects: [
            {
              icon: 'chart-line',
              label: 'Weekly review / analysis',
              text: 'The operator reviews how it worked, where it got stuck, and which tasks still depend too heavily on people.',
            },
            {
              icon: 'refresh-cw',
              label: 'Self-improvement loop',
              text: 'It can propose practical improvements for its own workflows, prompts, memory, and capabilities based on what actually happened.',
            },
            {
              icon: 'graduation-cap',
              label: 'Teaches the user',
              text: 'It can also highlight where the team itself could give better direction so the system needs less guidance over time.',
            },
          ],
        },
      },
    ] satisfies PreviewService[],
  },
  agency: {
    eyebrow: 'Agency',
    title: 'Knowledge. Capabilities. Skills.',
    body: 'A Fractals agent is not a chatbot. It is a system built from three layers — what it knows about your business, what tools it can use, and what it has learned to do well. Together, they make something more reliable than a person doing it from memory.',
    pillars: [
      {
        index: '01',
        title: 'Knowledge',
        label: 'Knows your business',
        body: 'Who your clients are, how you talk, what they need, how you do what you do. The agent works from the same context your best person would.',
      },
      {
        index: '02',
        title: 'Capabilities',
        label: 'Uses your tools',
        body: 'It can browse the web, send emails, schedule meetings, update documents — anything the business already runs on.',
      },
      {
        index: '03',
        title: 'Skills',
        label: 'Gets good at the work',
        body: 'It does not just execute steps. It builds skill — writing proposals, finding leads, following up — and gets sharper the more it practices.',
      },
    ],
  },
  foundation: {
    eyebrow: 'Method',
    title: 'Every agent starts the same. What makes it yours is where it goes.',
    body: 'The foundation is identical for every agent. The difference is your business — how you use it, what you need it to learn, and where it earns its freedom.',
    steps: [
      {
        title: '01 Onboard and configure',
        body: 'We set up the agent\'s knowledge, connect its tools, and align it with how your team actually works.',
      },
      {
        title: '02 Delegate one thing at a time',
        body: 'We hand off tasks and workflows individually — each one tested before the next begins.',
      },
      {
        title: '03 Test and refine',
        body: 'This is where your business shapes the agent. We adjust based on real results, not assumptions.',
      },
      {
        title: '04 Give it freedom to learn',
        body: 'Once the foundation holds, the agent starts exploring, self-correcting, and improving without waiting for instructions.',
      },
    ],
  },
  flywheel: {
    eyebrow: 'What next',
    title: 'Repetition. Evaluation. Improvement.',
    body: 'Once the agent is running, we layer in a second system: one that watches the work, measures what is working, and improves it automatically. Once self-improvement is in place, new possibilities start showing up that nobody planned for.',
  },
  closing: {
    eyebrow: 'Next step',
    title: 'See it in action.',
    body: 'We can show you what this looks like in your actual business context. The point is not just to demo a tool. The point is to show how the work can be delegated, directed, and taught into a system.',
    primaryCta: { href: '#proof', label: 'See it in action' },
    secondaryCta: { href: '#hero', label: 'Book a free call' },
  },
  footer: {
    tagline: 'Fractals Solutions. Builds systems. Teaches direction.',
    links: [
      { id: 'proof' as PreviewSectionId, label: 'Services' },
      { id: 'foundation' as PreviewSectionId, label: 'Method' },
      { id: 'philosophy' as PreviewSectionId, label: 'Contact' },
    ],
  },
}
