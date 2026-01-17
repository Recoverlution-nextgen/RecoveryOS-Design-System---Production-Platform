/**
 * Journey Week Data
 * Complete 12-scene week data including E-R-A cues and SEED prompts
 */

export interface JourneyWeekData {
  weekNumber: number;
  title: string;
  focusPoints: string[];
  experienceCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  experienceSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  recognizeCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  recognizeSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  alignCue: {
    title: string;
    content: string[];
    heroImage: string;
  };
  alignSeed: {
    prompt: string;
    heroImage: string;
    gradient: string;
  };
  integrationQuote: {
    quote: string;
    context: string;
  };
}

export const journeyWeeksData: JourneyWeekData[] = [
  // Week 1: Foundations of Presence (Day 1 Patient)
  {
    weekNumber: 1,
    title: "Foundations of Presence",
    focusPoints: [
      "<span class='font-semibold text-white'>Identify Your Core Triggers:</span> Learn to recognize the specific cues that activate your patterns.",
      "<span class='font-semibold text-white'>Develop Initial Introspection Habit:</span> Build the practice of pausing to observe your internal state.",
      "<span class='font-semibold text-white'>Practice Conscious Response:</span> Implement your first Align Cue to shift automatic reactions.",
    ],
    experienceCue: {
      title: "The Rush",
      content: [
        `Picture this: You're standing at the threshold of something challenging. Maybe it's a difficult conversation you've been avoiding. Maybe it's opening that email you know carries weight. Maybe it's walking into a room where you're expected to show up differently than you have before.`,
        `Feel it now. That split-second surge. Your chest tightens. Your breath catches. Time seems to compress. Everything in you wants to move away from this moment.`,
        `This is The Rush, the body's lightning-fast alarm system firing before your mind can even form a thought.`,
        `Notice the sensation before the story. A tightening in your throat or chest. A flutter in your stomach. Tingling in your hands or face. A sudden urge to check your phone, leave the room, or look away.`,
        `Now comes the crucial part: Name it. Out loud or in your mind, give it one word. Tightness. Panic. Freeze. Escape. Resistance.`,
        `The moment you name the sensation, you create distance between feeling it and becoming it. You move from "I am panicking" to "I notice panic rising." That shift is everything.`,
        `This week, catch The Rush three times. Just notice. Just name. That's the work.`,
      ],
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    experienceSeed: {
      prompt: "Notice when The Rush arrives. Name the sensation before the story takes over. No fixing. Just naming.",
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      gradient: "from-rose-500/50 to-orange-500/50",
    },
    recognizeCue: {
      title: "Avoidance",
      content: [
        `The Rush has fired. Your body is screaming at you to move away. And now comes the automatic response you've practiced a thousand times without knowing it.`,
        `Watch what happens next. Within seconds, maybe milliseconds, your mind offers you an escape route. A perfectly reasonable excuse. A sudden urgent distraction. A compelling reason to do literally anything except stay here.`,
        `This is Avoidance. Your internal survival mechanism whispering: "Not now. Not yet. Maybe later when you're ready."`,
        `Avoidance doesn't announce itself. It disguises itself as productivity, as rational thinking, as "just one more thing first."`,
        `Your hand reaches for your phone. "I should just check if they replied..." You suddenly remember that other thing. "Wait, didn't I need to email them first?" Your body pivots away. "I'll grab some water. Clear my head. Come back fresh."`,
        `Here's the truth: Avoidance isn't the enemy. It's a messenger. It's showing you exactly where your growth edge lives.`,
        `When you catch The Rush, pause for three seconds and ask yourself: "What do I want to do right now to escape this feeling?"`,
        `The first thing that comes to mind? That's your Avoidance pattern. Don't judge it. Don't fix it. Just name it.`,
        `Recognition is the doorway to choice. You can't change what you can't see.`,
      ],
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    recognizeSeed: {
      prompt: "When The Rush comes, pause. Name your first impulse to escape. Go deeper: Is this thought protecting you, or just familiar?",
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      gradient: "from-purple-500/50 to-blue-500/50",
    },
    alignCue: {
      title: "Pause & Anchor",
      content: [
        `You've felt The Rush. You've spotted Avoidance creeping in. Now comes the moment that changes everything.`,
        `This is where you reclaim your power. Not through willpower. Not through forcing yourself to "just do it." But through a simple, repeatable practice that interrupts the old pattern and creates space for a new choice.`,
        `This is Pause & Anchor. Your three-step practice for returning to the present moment.`,
        `Step One: Physically stop. Whatever you're doing (reaching for your phone, turning away, starting that distracting task) freeze. Drop your shoulders. Uncross your arms. Feel your feet on the ground. All of you. Both feet. The weight of your body pressing down.`,
        `Step Two: Take three slow breaths. Not shallow chest breaths. Deep belly breaths. In through your nose, feel your stomach expand. Out through your mouth, feel it soften. Count them. One. Two. Three. Let each breath be slower than the last.`,
        `Step Three: Name your location out loud. Say it with your voice, not just in your head: "I am in the kitchen" or "I am in my office" or "I am in the car." This simple act anchors you to here. To now. To the only moment where you have any power to choose differently.`,
        `That's it. Ten seconds. Maybe fifteen. That's all the time it takes to break the automatic response and create a gap.`,
        `In that gap lives your freedom. Not freedom from The Rush or Avoidance. They'll still show up. But freedom to see them clearly and choose what happens next.`,
        `Don't wait for The Rush to practice this. Set three reminders throughout your day (morning, midday, evening) and run through Pause & Anchor when you're calm. The neural pathway you're building needs repetition. Practice in peace so it's there when you need it in chaos.`,
        `Every time you practice this, even when it feels awkward, even when you still choose avoidance afterward, you're rewiring your brain. That's the work.`,
      ],
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    alignSeed: {
      prompt: "When The Rush and Avoidance arise: Stop. Three breaths. Name where you are. In that gap, you can choose differently.",
      heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      gradient: "from-amber-500/50 to-purple-500/50",
    },
    integrationQuote: {
      quote: "Potential is practiced, not predetermined.",
      context: "Potential grows within what you practice, believe, and perceive - not within preset limits.",
    },
  },
  // Week 8: Values Clarification (Months In Patient)
  {
    weekNumber: 8,
    title: "Living Your Values",
    focusPoints: [
      "<span class='font-semibold text-white'>Identify Core Values:</span> Connect with what truly matters beyond achievement or acquisition.",
      "<span class='font-semibold text-white'>Practice Value Alignment:</span> Make small daily choices that honor who you want to be.",
      "<span class='font-semibold text-gray-900'>Build Meaning:</span> Transform emptiness into purpose through values-based living.",
    ],
    experienceCue: {
      title: "The Experience Cue: Empty Achievement",
      content: [
        `<p class="text-lg text-gray-800">You've hit the milestone. Checked the box. Done the thing everyone said would make you feel better. And yet... nothing. Or worse - a hollow sensation that whispers: "Is this it?"</p>`,
        `<p><strong class="text-gray-900">Feel it now</strong> - that strange disconnect between what <em>should</em> feel satisfying and what <em>actually</em> does. Your life might look "fine" from the outside, but inside there's a quiet ache you can't quite name.</p>`,
        `<p>This is <strong class="text-[#3E2BB8] font-semibold">Empty Achievement</strong> - the signal that you've been chasing goals instead of living values.</p>`,
        `<div class="bg-gradient-to-r from-[#F5F3FF] to-white rounded-xl p-6 border-l-4 border-[#3E2BB8] my-6">
          <p class="text-gray-900 font-semibold mb-3">🎯 The Difference</p>
          <p class="text-gray-700 mb-2"><strong>Goals</strong> are destinations - they end when you arrive.</p>
          <p class="text-gray-700 mb-2"><strong>Values</strong> are directions - they never run out because they're about <em>how</em> you travel, not <em>where</em> you end up.</p>
          <p class="text-gray-700 mt-3">When you're disconnected from your values, even success feels empty.</p>
        </div>`,
        `<p class="text-gray-800">Ask yourself: <strong>What matters so much to you that you'd do it even if no one was watching?</strong></p>`,
        `<div class="bg-[#F5F3FF] rounded-lg p-6 my-6">
          <p class="text-gray-900 font-semibold mb-2">Why This Matters:</p>
          <p class="text-gray-700">Addiction often thrives in the gap between who we are and who we want to be. Values are the bridge. They're not about being perfect - they're about choosing what kind of person you practice being, one moment at a time.</p>
        </div>`,
        `<p class="text-sm text-gray-600 italic mt-4">This week, notice when achievements feel hollow. That's your signal to reconnect with values.</p>`,
      ],
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
    },
    experienceSeed: {
      prompt: "Notice moments when life feels hollow despite external success. That emptiness? It's your values calling you home.",
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "from-emerald-500/50 to-blue-500/50",
    },
    recognizeCue: {
      title: "The Recognition Cue: Values Drift",
      content: [
        `<p class="text-lg text-gray-800">You know what matters to you - in theory. Connection. Growth. Honesty. Creativity. But when you look at how you actually spent today, this week, this month... the gap is jarring.</p>`,
        `<p><strong class="text-gray-900">Watch this pattern:</strong> Your calendar is full. Your to-do list is checked. But none of it connects to what you said mattered most. You're busy being productive instead of being <em>yourself</em>.</p>`,
        `<p>This is <strong class="text-[#5739FB] font-semibold">Values Drift</strong> - the slow fade that happens when urgency drowns out importance.</p>`,
        `<div class="bg-gradient-to-r from-[#F5F3FF] to-white rounded-xl p-6 border-l-4 border-[#5739FB] my-6">
          <p class="text-gray-900 font-semibold mb-3">🔍 Spotting the Drift</p>
          <p class="text-gray-700 mb-3">You said connection matters, but you haven't had a real conversation in days.</p>
          <p class="text-gray-700 mb-3">You said creativity matters, but you can't remember the last time you made something.</p>
          <p class="text-gray-700">You said honesty matters, but you've been performing a version of yourself that isn't quite true.</p>
        </div>`,
        `<p class="text-gray-800">Here's the hard truth: <strong>You don't drift toward your values. You have to practice them.</strong></p>`,
        `<div class="bg-[#F5F3FF] rounded-lg p-6 my-6">
          <p class="text-gray-900 font-semibold mb-2">🎯 This Week's Recognition:</p>
          <p class="text-gray-700 mb-3">Each evening, ask: "Did I honor my values today, even in small ways?"</p>
          <p class="text-gray-700">No judgment. Just data. The gap between stated values and lived values is where your growth work lives.</p>
        </div>`,
        `<p class="text-sm text-gray-600 italic">You can't align with values you haven't named. Recognition comes first.</p>`,
      ],
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
    },
    recognizeSeed: {
      prompt: "When you feel that disconnect between what you say matters and how you're actually living - pause. Name the gap. That's not failure. That's your compass recalibrating.",
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "from-purple-500/50 to-pink-500/50",
    },
    alignCue: {
      title: "Your Align Cue: One Aligned Action",
      content: [
        `<p class="text-lg text-gray-800">You've felt the hollow of Empty Achievement. You've recognized Values Drift. Now comes the practice that brings you back to yourself.</p>`,
        `<p><strong class="text-gray-900">This isn't about grand gestures.</strong> It's not about quitting your job, moving to the mountains, or overhauling your entire life. It's simpler - and harder - than that.</p>`,
        `<p>This is <strong class="text-[#7C67FF] font-semibold">One Aligned Action</strong> - choosing one small thing each day that honors your values.</p>`,
        `<div class="bg-gradient-to-br from-[#F5F3FF] to-white rounded-xl p-8 border-2 border-[#7C67FF]/30 my-6">
          <p class="text-gray-900 font-semibold mb-6 text-lg">The Daily Practice:</p>
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <span class="w-12 h-12 rounded-full bg-[#7C67FF] text-white flex items-center justify-center flex-shrink-0 font-bold">1</span>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2 text-lg">Name Your Core Value</h3>
                <p class="text-gray-700">Choose 2-3 values that resonate deeply: Connection, Growth, Honesty, Creativity, Courage, Compassion. These aren't aspirational - they're directional.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="w-12 h-12 rounded-full bg-[#7C67FF] text-white flex items-center justify-center flex-shrink-0 font-bold">2</span>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2 text-lg">Ask the Question</h3>
                <p class="text-gray-700 mb-2">Each morning: <em class="text-[#7C67FF] font-semibold">"What's one small thing I can do today that honors [value]?"</em></p>
                <p class="text-gray-700 italic">If your value is connection: Send a real text, not a like. If it's creativity: Make something, even if it's terrible. If it's honesty: Say one true thing you've been holding back.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <span class="w-12 h-12 rounded-full bg-[#7C67FF] text-white flex items-center justify-center flex-shrink-0 font-bold">3</span>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2 text-lg">Do It. Then Notice.</h3>
                <p class="text-gray-700">Take the action. Then pay attention to how it <em>feels</em> different from chasing achievements. This is your internal compass calibrating.</p>
              </div>
            </div>
          </div>
        </div>`,
        `<p class="text-gray-800">That's it. <strong>One aligned action per day.</strong> Not perfect alignment. Not life overhaul. Just one choice that says: "This is who I'm practicing being."</p>`,
        `<div class="bg-[#F5F3FF] rounded-lg p-6 my-6">
          <p class="text-gray-900 font-semibold mb-2">💡 Why Small Matters:</p>
          <p class="text-gray-700">Big changes are seductive but unsustainable. Small, consistent value-aligned actions rewire your identity at the level of habit. You become who you practice being.</p>
        </div>`,
        `<p class="text-sm text-gray-600 italic">Every aligned action is a vote for the person you're becoming. Cast your votes wisely.</p>`,
      ],
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
    },
    alignSeed: {
      prompt: "Each day, choose one small action that aligns with your values. Not for applause. Not for achievement. For alignment. That's where meaning lives.",
      heroImage: "https://images.unsplash.com/photo-1530518854704-23de978d2915",
      gradient: "from-emerald-500/50 to-cyan-500/50",
    },
    integrationQuote: {
      quote: "Who you are is who you practice being.",
      context: "Identity isn't discovered - it's cultivated through the daily choices you make about how to show up in the world.",
    },
  },
];

export function getJourneyWeekData(weekNumber: number): JourneyWeekData | null {
  return journeyWeeksData.find(week => week.weekNumber === weekNumber) || null;
}