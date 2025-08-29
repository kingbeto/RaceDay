// Simplified tooltip composable - no interactive behaviors
export function useTooltips() {
  const explainActivity = (training: string): string => {
    const t = training.toLowerCase()
    const parts: string[] = []

    if (t.includes('off')) parts.push('Rest day. Optional gentle mobility 10–15 min. Hydrate.')
    if (t.includes('hills')) parts.push('Uphill work: Z2–Z3 steady or repeats. Power hike steeper grades; run easy on flats/downs. Focus on posture and poles.')
    if (t.includes('stair')) parts.push('Stairs: repeats or continuous climbing. Tall posture, short steps; use handrail for balance only. Walk descents easy to protect knees.')
    if (t.includes('run‑walk') || t.includes('run-walk') || t.includes('runwalk') || t.includes('run walk')) {
      parts.push('Run‑walk method: alternate short jogs with short walks to keep Z2 and reduce impact.')
    }

    if (t.includes('easy')) parts.push('Easy Z2 aerobic walk/jog on soft surfaces. Conversational pace.')
    if (t.includes('long z2')) parts.push('Long aerobic run‑walk: mostly brisk walk when needed; jog easy when comfortable. Practice fueling: 60–90 g carbs/h, 500–750 ml fluids/h, 400–800 mg sodium/h.')
    if (t.includes('z2 hike')) parts.push('Easy Z2 hike only: keep effort relaxed; focus on technique and recovery.')
    if (t.includes('descents')) parts.push('Downhill technique: short, light steps; increase cadence; avoid hard braking.')
    if (t.includes('stage sim')) parts.push('Stage simulation: practice 2–4 h Z2 back-to-back days with full race kit and fueling. Focus on pacing and feet care.')
    if (t.includes('pack') || t.includes('poles')) parts.push('Use race kit: pack fit, poles deploy/collapse, check chafe points.')
    if (t.includes('strides')) parts.push('Strides: 4–6×10 s fast-but-relaxed on flat, full recovery between.')
    if (t.includes('shakeout')) parts.push('Shakeout: very easy 20–30 min to stay loose; stop if legs feel heavy.')
    if (t.includes('kit check')) parts.push('Kit check: run with full mandatory gear to validate comfort and pockets.')
    if (t.includes('gym lower')) parts.push('Gym Lower (hard): squat/hinge, step-ups, lunges, calves; leave 1–2 reps in reserve.')
    if (t.includes('gym upper/core')) parts.push('Gym Upper/Core: pull/push/press + anti-rotation, planks, dead bug.')
    if (t.includes('maintenance') || t.includes('prehab')) parts.push('Gym Maintenance/Prehab: lighter full-body + calves, hips, feet, tibialis, mobility.')

    if (parts.length === 0) parts.push('Z2 aerobic emphasis. Keep it comfortable.')

    return parts.join(' ')
  }

  return {
    explainActivity
  }
}
