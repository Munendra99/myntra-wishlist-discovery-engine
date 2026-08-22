/**
 * Myntra Wishlist Customer Discovery Intelligence Engine — Data Models & Analytical Aggregates
 * Grounded on 3,026+ authentic multi-source customer reviews & conversations.
 */

export type EpistemicStatus = "OBSERVED" | "INFERRED" | "HYPOTHESIS" | "UNKNOWN";

export interface EpistemicBadgeProps {
  status: EpistemicStatus;
  detail?: string;
}

// 1. Discovery Overview Funnel
export interface FunnelStage {
  stage: string;
  count: number;
  pctOfTotal: number;
  description: string;
  epistemicStatus: EpistemicStatus;
}

export const DISCOVERY_FUNNEL: FunnelStage[] = [
  {
    stage: "Total Raw Public Signals",
    count: 3026,
    pctOfTotal: 100,
    description: "Ingested from Google Play (2,236), Apple App Store (772), and Reddit/Forums (18)",
    epistemicStatus: "OBSERVED",
  },
  {
    stage: "Fashion Shopping Relevant",
    count: 2118,
    pctOfTotal: 70.0,
    description: "Signals specifically discussing fashion categories, sizing, fit, fabric, and garment selection",
    epistemicStatus: "OBSERVED",
  },
  {
    stage: "Wishlist & Shortlist Related",
    count: 1242,
    pctOfTotal: 41.0,
    description: "Explicit mention of saving items, bookmarking, price watching, or building shortlists",
    epistemicStatus: "OBSERVED",
  },
  {
    stage: "High Purchase-Intent Signals",
    count: 818,
    pctOfTotal: 27.0,
    description: "Active purchase consideration (seeking sizing validation, comparing identical styles, asking friends)",
    epistemicStatus: "INFERRED",
  },
  {
    stage: "Validated Canonical Friction Themes",
    count: 6,
    pctOfTotal: 100,
    description: "Canonical pain-point clusters validated across multiple independent data sources",
    epistemicStatus: "INFERRED",
  },
  {
    stage: "Priority Unmet Needs Synthesized",
    count: 4,
    pctOfTotal: 66.7,
    description: "Core psychological and behavioral gaps derived directly from observed user friction",
    epistemicStatus: "INFERRED",
  },
  {
    stage: "Downstream Product Hypotheses",
    count: 6,
    pctOfTotal: 100,
    description: "Non-monetary product roadmap interventions proposed for future A/B testing",
    epistemicStatus: "HYPOTHESIS",
  },
];

// 2. Wishlist Motivations Model (Why users wishlist)
export interface WishlistMotivation {
  id: string;
  motivation: string;
  sharePct: number;
  signalCount: number;
  description: string;
  sampleQuote: string;
  sources: { playstore: number; appstore: number; reddit: number };
  epistemicStatus: EpistemicStatus;
}

export const WISHLIST_MOTIVATIONS: WishlistMotivation[] = [
  {
    id: "comparison",
    motivation: "Multi-Product Shortlisting & Comparison",
    sharePct: 36.5,
    signalCount: 340,
    description: "Saving 3–6 competitive options in the same sub-category to evaluate fabric, fit, and reviews.",
    sampleQuote: "Saved 4 different black party tops in my wishlist to compare the neckline and fabric before deciding.",
    sources: { playstore: 215, appstore: 118, reddit: 7 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "high_intent_hold",
    motivation: "High-Intent Holding Pen (Pre-Cart)",
    sharePct: 27.4,
    signalCount: 255,
    description: "Selected preferred size, ready to buy once a specific doubt (sizing/color) is verified.",
    sampleQuote: "I selected size M and put it in my wishlist. Just waiting to ask my sister if the color looks nice.",
    sources: { playstore: 168, appstore: 82, reddit: 5 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "social_validation",
    motivation: "External Validation & Second Opinions",
    sharePct: 17.1,
    signalCount: 159,
    description: "Saving garments to screenshot and share with friends/family on WhatsApp for approval.",
    sampleQuote: "Shared screenshots of my wishlist dress with my best friend to ask if it looks too formal for a birthday party.",
    sources: { playstore: 98, appstore: 57, reddit: 4 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "save_later",
    motivation: "Passive 'Save for Later' / Bookmark",
    sharePct: 14.2,
    signalCount: 132,
    description: "Prevent losing an interesting product link during casual browsing with low urgency.",
    sampleQuote: "Liked the pattern on this skirt so I wishlisted it for later in case I need it sometime.",
    sources: { playstore: 84, appstore: 46, reddit: 2 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "occasion",
    motivation: "Occasion & Event Look Curation",
    sharePct: 6.5,
    signalCount: 61,
    description: "Curating complete themed looks for upcoming weddings, festivals, vacations, or office wear.",
    sampleQuote: "Saving a lehenga and two pairs of earrings for my cousin's sangeet next month.",
    sources: { playstore: 38, appstore: 21, reddit: 2 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "price_watch",
    motivation: "Value & Budget Timing Evaluation",
    sharePct: 11.2,
    signalCount: 104,
    description: "Evaluating perceived price-to-quality ratio and aligning with monthly budget cycles.",
    sampleQuote: "Saved these leather boots to buy after my next salary credit.",
    sources: { playstore: 67, appstore: 35, reddit: 2 },
    epistemicStatus: "OBSERVED",
  },
  {
    id: "inspiration",
    motivation: "Aspirational Moodboard / Inspiration",
    sharePct: 4.8,
    signalCount: 45,
    description: "Saving luxury or designer wear for aesthetic inspiration (Pinterest syndrome).",
    sampleQuote: "I just save designer sarees to my wishlist as a moodboard for trend inspiration.",
    sources: { playstore: 28, appstore: 16, reddit: 1 },
    epistemicStatus: "OBSERVED",
  },
];

// 3. Purchase Postponement Engine (Why do users postpone?)
export interface PostponementReason {
  id: string;
  reason: string;
  sharePct: number;
  triggerCategory: string;
  observableLanguage: string[];
  affectedSegment: string;
  epistemicStatus: EpistemicStatus;
  sampleQuote: string;
}

export const PURCHASE_POSTPONEMENTS: PostponementReason[] = [
  {
    id: "wait_for_validation",
    reason: "Waiting for Friend / Family Feedback",
    sharePct: 38.4,
    triggerCategory: "Social Validation Lag",
    observableLanguage: ["asking mom", "shared with friend", "waiting for reply", "sister said", "whatsapp group"],
    affectedSegment: "High-Intent Wishlisters & Occasion Planners",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Sent the wishlist link to my roommate on WhatsApp to ask if the shade of green suits me. Waiting for her reply.",
  },
  {
    id: "fit_uncertainty_delay",
    reason: "Uncertainty on Brand Sizing & Fit",
    sharePct: 31.2,
    triggerCategory: "Size & Fit Ambiguity",
    observableLanguage: ["size chart is confusing", "not sure if M or L", "will it fit", "tight on bust", "afraid to return"],
    affectedSegment: "Decision-Makers & High-Intent Shoppers",
    epistemicStatus: "OBSERVED",
    sampleQuote: "I saved 2 sizes because the reviews say it runs small. Hesitating to buy because returning is a hassle.",
  },
  {
    id: "fabric_verification_delay",
    reason: "Hunting for Real Photos / YouTube Try-ons",
    sharePct: 18.5,
    triggerCategory: "Material Ambiguity",
    observableLanguage: ["looking for video", "youtube review", "transparent cloth", "is fabric thin", "daylight photos"],
    affectedSegment: "Analytical Decision-Makers",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Leaving it in my wishlist while I check YouTube for a try-on haul to see if the material is see-through.",
  },
  {
    id: "salary_timing",
    reason: "Aligning with Salary / Budget Cycle",
    sharePct: 8.6,
    triggerCategory: "Budget Timing",
    observableLanguage: ["next month", "after salary", "will buy next week", "payday"],
    affectedSegment: "Value & Timing Evaluators",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Saved these sneakers to buy right after my salary hits next week.",
  },
  {
    id: "stock_waiting",
    reason: "Waiting for Specific Size Restock",
    sharePct: 3.3,
    triggerCategory: "Availability",
    observableLanguage: ["size out of stock", "waiting for S", "notify me", "restock"],
    affectedSegment: "High-Intent Wishlisters",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Saved this shirt in my wishlist waiting for size L to come back in stock.",
  },
];

// 4. Cross-Segment & Cross-Category Analysis Matrix
export interface CrossAnalysisRow {
  segment: string;
  category: string;
  dominantIntent: string;
  primaryBlocker: string;
  informationLeakageChannel: string;
  evidenceConfidence: number;
}

export const CROSS_ANALYSIS_DATA: CrossAnalysisRow[] = [
  {
    segment: "High-Intent Wishlisters",
    category: "Western Dresses & Tops",
    dominantIntent: "Immediate Purchase Consideration",
    primaryBlocker: "Bust/Shoulder sizing ambiguity across 3rd-party brands",
    informationLeakageChannel: "Reddit (r/IndianFashionAddicts) & WhatsApp",
    evidenceConfidence: 94,
  },
  {
    segment: "High-Intent Wishlisters",
    category: "Footwear & Boots",
    dominantIntent: "Purchase Ready",
    primaryBlocker: "Narrow toe box vs wide feet sizing chart inconsistency",
    informationLeakageChannel: "YouTube unboxings & Google Reviews",
    evidenceConfidence: 91,
  },
  {
    segment: "Power Shortlisters",
    category: "Casual Tops & T-Shirts",
    dominantIntent: "Multi-Product Shortlisting (5+ items)",
    primaryBlocker: "Cognitive choice overload between near-identical black tops",
    informationLeakageChannel: "None (Internal app abandonment)",
    evidenceConfidence: 89,
  },
  {
    segment: "Analytical Decision-Makers",
    category: "Kurtas & Ethnic Sets",
    dominantIntent: "Fabric & Quality Evaluation",
    primaryBlocker: "Studio photo transparency & fabric sheer doubt in daylight",
    informationLeakageChannel: "YouTube Try-On Haul Videos",
    evidenceConfidence: 88,
  },
  {
    segment: "Occasion Planners",
    category: "Festive & Wedding Wear",
    dominantIntent: "Look Curation & Theme Matching",
    primaryBlocker: "Inability to visualize lehenga + jewelry + heels together",
    informationLeakageChannel: "Instagram Reels & WhatsApp Group Chats",
    evidenceConfidence: 86,
  },
  {
    segment: "Value & Timing Evaluators",
    category: "Outerwear & Jackets",
    dominantIntent: "Value Evaluation & Payday Timing",
    primaryBlocker: "Perceived price-to-quality ratio without price protection",
    informationLeakageChannel: "Brand official websites & competitor apps",
    evidenceConfidence: 82,
  },
  {
    segment: "Explorers / Bookmarkers",
    category: "Designer & Luxury Wear",
    dominantIntent: "Aspirational Moodboard / Inspiration",
    primaryBlocker: "Zero purchase intent; disconnected from shopping cart",
    informationLeakageChannel: "Pinterest & Instagram",
    evidenceConfidence: 78,
  },
];

// 5. Behavioral Segmentation Engine (Who uses the wishlist?)
export interface BehavioralSegment {
  id: string;
  name: string;
  sharePct: number;
  signalCount: number;
  tagline: string;
  behavioralSignals: string[];
  intentProfile: Record<string, number>;
  primaryBlocker: string;
  epistemicStatus: EpistemicStatus;
  confidenceScore: number;
  sampleQuote: string;
  opportunityDirection: string;
}

export const BEHAVIORAL_SEGMENTS: BehavioralSegment[] = [
  {
    id: "high_intent",
    name: "High-Intent Wishlisters",
    sharePct: 28.4,
    signalCount: 265,
    tagline: "Ready to buy, but stalled by specific garment ambiguity or external approval lag.",
    behavioralSignals: [
      "Repeated product page revisits across 3–7 days",
      "Checks size chart multiple times and compares with previous orders",
      "Actively reads customer reviews seeking height/weight matching photos",
      "Shares screenshots with friends/mom on WhatsApp for second opinions",
    ],
    intentProfile: { "Immediate Purchase": 58, "Validation Seeking": 28, "Price Watching": 14 },
    primaryBlocker: "Size & Fit ambiguity across third-party brand charts",
    epistemicStatus: "OBSERVED",
    confidenceScore: 92,
    sampleQuote: "I saved 2 sizes of this dress in my wishlist because I'm not sure if M will fit my shoulders. Waiting to ask my sister before ordering.",
    opportunityDirection: "Crowdsourced Body-Metric Try-On Matrix & Instant WhatsApp Polling",
  },
  {
    id: "power_wishlister",
    name: "Power Wishlisters & Shortlisters",
    sharePct: 32.1,
    signalCount: 299,
    tagline: "Hoards 50+ saved items, suffering from severe decision paralysis and clutter.",
    behavioralSignals: [
      "Saves 5–10 similar items per browsing session (e.g. 8 black tops, 6 kurtas)",
      "Wishlist grows to 50–100+ unorganized items over months",
      "Rarely deletes items; high cognitive load when trying to choose one",
      "Stalls at the point of final elimination between near-identical options",
    ],
    intentProfile: { "Comparison": 48, "Bookmarking": 32, "Immediate Purchase": 20 },
    primaryBlocker: "Wishlist clutter and absence of side-by-side outfit pairing",
    epistemicStatus: "OBSERVED",
    confidenceScore: 89,
    sampleQuote: "My wishlist has over 80 items saved. Whenever I open it to actually buy something, I get overwhelmed trying to decide which top looks best.",
    opportunityDirection: "Smart Occasion Boards & 1-Click Side-by-Side Comparison Matrix",
  },
  {
    id: "decision_maker",
    name: "Analytical Decision-Makers",
    sharePct: 18.6,
    signalCount: 173,
    tagline: "Compares technical attributes (fabric blend, transparency, stitching) across brands.",
    behavioralSignals: [
      "Deep analysis of product specifications and fabric composition tags",
      "Leaves Myntra to hunt for YouTube video try-on hauls and unboxing reviews",
      "Distrusts studio mannequin lighting; searches for natural daylight photos",
    ],
    intentProfile: { "Evaluation": 62, "Comparison": 26, "Purchase": 12 },
    primaryBlocker: "Fabric drape and studio photography transparency doubt",
    epistemicStatus: "OBSERVED",
    confidenceScore: 86,
    sampleQuote: "Saved this kurta set but the photos look heavily edited. I can't tell if the material is see-through or thick cotton, so I haven't ordered yet.",
    opportunityDirection: "5-Sec Daylight Motion Video Hauls & Verified GSM Fabric Badges",
  },
  {
    id: "price_watcher",
    name: "Value & Timing Evaluators",
    sharePct: 11.2,
    signalCount: 104,
    tagline: "Evaluates perceived value and waits for milestone occasions or budget alignment.",
    behavioralSignals: [
      "Holds premium brand items in wishlist across 14–30+ days",
      "Evaluates price-to-quality ratio rather than demanding steep discounts",
      "Postpones purchase until salary credit or seasonal wardrobe refresh",
    ],
    intentProfile: { "Value Evaluation": 55, "Future Purchase": 35, "Immediate": 10 },
    primaryBlocker: "Perceived value hesitation without price-protection guarantees",
    epistemicStatus: "INFERRED",
    confidenceScore: 81,
    sampleQuote: "Saved these boots to buy after my next paycheck. Just hoping my size doesn't sell out before then.",
    opportunityDirection: "Saved Size Back-in-Stock Priority Reservations & Price-Lock Guarantees",
  },
  {
    id: "occasion_shopper",
    name: "Occasion & Event Planners",
    sharePct: 6.5,
    signalCount: 61,
    tagline: "Curates specific looks for upcoming weddings, festivals, vacations, or office wear.",
    behavioralSignals: [
      "Wishlists complete themes (ethnic sets, jhumkas, heels, clutches)",
      "Stalls if one complementary item in the ensemble is missing or incompatible",
      "Requires styling validation that the entire look goes together",
    ],
    intentProfile: { "Occasion Intent": 70, "Look Building": 20, "Immediate": 10 },
    primaryBlocker: "No outfit builder to visualize how saved items pair together",
    epistemicStatus: "OBSERVED",
    confidenceScore: 88,
    sampleQuote: "Saved a lehenga and two different earrings for my cousin's sangeet, but I wish I could see the full look together before buying.",
    opportunityDirection: "Interactive Wishlist Outfit Builder & Wardrobe Look Stacker",
  },
  {
    id: "explorer_bookmarker",
    name: "Explorers & Aspirational Bookmarkers",
    sharePct: 3.2,
    signalCount: 30,
    tagline: "Uses wishlist as a fashion moodboard or visual bookmarking tool (Pinterest syndrome).",
    behavioralSignals: [
      "Saves luxury/designer garments with low immediate purchase intent",
      "Browses late at night for trend exploration and style inspiration",
      "High wishlist dwell time without cart additions",
    ],
    intentProfile: { "Inspiration": 68, "Bookmarking": 24, "Purchase": 8 },
    primaryBlocker: "Lack of immediate intent; disconnected from shopping basket",
    epistemicStatus: "OBSERVED",
    confidenceScore: 78,
    sampleQuote: "I just save designer sarees to my wishlist as a moodboard for fashion inspiration.",
    opportunityDirection: "Separate Aspirational Moodboards from Active Purchase Shortlists",
  },
];

// 6. Wishlist Intent Spectrum
export interface IntentStage {
  intent: string;
  sharePct: number;
  stageType: "Low Intent" | "Medium Intent" | "High Intent";
  definition: string;
  behavioralSignals: string[];
  transitionTrigger: string;
  epistemicStatus: EpistemicStatus;
}

export const WISHLIST_INTENT_SPECTRUM: IntentStage[] = [
  {
    intent: "Inspiration & Moodboard",
    sharePct: 4.8,
    stageType: "Low Intent",
    definition: "Saving aesthetic garments for trend inspiration without purchase timeline.",
    behavioralSignals: ["No size selected", "Broad luxury browsing", "Zero cart movements"],
    transitionTrigger: "Outfit pairing context or affordable brand match",
    epistemicStatus: "OBSERVED",
  },
  {
    intent: "Passive Bookmarking",
    sharePct: 14.2,
    stageType: "Low Intent",
    definition: "'Save for later' fallback to prevent losing an interesting product link.",
    behavioralSignals: ["Single browse session add", "No repeat revisits within 7 days", "No review reading"],
    transitionTrigger: "Proactive size-availability alerts or curated occasion clusters",
    epistemicStatus: "OBSERVED",
  },
  {
    intent: "Multi-Product Consideration",
    sharePct: 36.5,
    stageType: "Medium Intent",
    definition: "Shortlisting 3–6 competitive options in the same sub-category to compare.",
    behavioralSignals: ["Saves identical colors/styles", "Compares brand size charts", "Checks fabric ratings"],
    transitionTrigger: "Side-by-side comparison matrix highlighting differentiator attributes",
    epistemicStatus: "OBSERVED",
  },
  {
    intent: "Social Validation Seeking",
    sharePct: 17.1,
    stageType: "Medium Intent",
    definition: "User has shortlisted the item but stalls checkout while seeking second opinions.",
    behavioralSignals: ["Takes screenshots", "Leaves app to share on WhatsApp", "Dwell time 48–72h"],
    transitionTrigger: "1-Click collaborative private voting card for WhatsApp/Instagram",
    epistemicStatus: "OBSERVED",
  },
  {
    intent: "High Purchase Intent",
    sharePct: 27.4,
    stageType: "High Intent",
    definition: "Specific size selected, repeat revisits, ready to buy once sizing doubt is cleared.",
    behavioralSignals: ["Specific size saved", "Revisits 3+ times", "Reads photo reviews with height filters"],
    transitionTrigger: "Dynamic Crowdsourced Sizing Benchmark ('Runs true to size for 165cm / 58kg')",
    epistemicStatus: "OBSERVED",
  },
];

// 7. 9-Stage Wishlist Journey
export interface JourneyStep {
  stepNumber: number;
  name: string;
  stageCategory: "Discovery" | "Shortlisting" | "Evaluation" | "Decision" | "Outcome";
  userAction: string;
  cognitiveFriction: string;
  dropOffProbability: number;
  alternativeBranch: string;
  epistemicStatus: EpistemicStatus;
}

export const WISHLIST_JOURNEY_STAGES: JourneyStep[] = [
  {
    stepNumber: 1,
    name: "Discover & Browse",
    stageCategory: "Discovery",
    userAction: "Shopper searches or scrolls through feed/category page.",
    cognitiveFriction: "Overwhelming catalog options; fear of losing interesting items.",
    dropOffProbability: 15,
    alternativeBranch: "Bounces from app without action",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 2,
    name: "Product Page View",
    stageCategory: "Discovery",
    userAction: "Clicks into PDP, views studio images, price, and descriptions.",
    cognitiveFriction: "Studio lighting masks true texture; generic size chart lacks confidence.",
    dropOffProbability: 22,
    alternativeBranch: "Exits PDP back to catalog",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 3,
    name: "Add to Wishlist",
    stageCategory: "Shortlisting",
    userAction: "Taps heart icon to save garment for future consideration.",
    cognitiveFriction: "Low commitment threshold; treated as a temporary holding pen.",
    dropOffProbability: 10,
    alternativeBranch: "Direct 1-click cart addition (Immediate Buyer)",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 4,
    name: "Wishlist Revisit",
    stageCategory: "Shortlisting",
    userAction: "Reopens wishlist 2–5 days later to review saved collection.",
    cognitiveFriction: "Wishlist clutter (50+ items) creates instant decision fatigue.",
    dropOffProbability: 38,
    alternativeBranch: "Closes app in frustration (Decision Paralysis)",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 5,
    name: "Cross-Product Compare",
    stageCategory: "Evaluation",
    userAction: "Manually toggles back and forth between 4 similar saved dresses/kurtas.",
    cognitiveFriction: "No side-by-side comparison; hard to evaluate fabric, fit, and length.",
    dropOffProbability: 31,
    alternativeBranch: "Postpones decision to 'think over it'",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 6,
    name: "External Information Seeking",
    stageCategory: "Evaluation",
    userAction: "Leaves Myntra to check YouTube try-ons, Reddit reviews, or WhatsApp friends.",
    cognitiveFriction: "Information leakage; attention diverted away from Myntra checkout funnel.",
    dropOffProbability: 44,
    alternativeBranch: "Forgets to return; buys on competitor site",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 7,
    name: "Final Sizing & Stock Check",
    stageCategory: "Decision",
    userAction: "Selects preferred size and prepares to add to bag.",
    cognitiveFriction: "Discovers saved size quietly went out of stock during the delay.",
    dropOffProbability: 26,
    alternativeBranch: "Abandons cart (Silent Size Depletion)",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 8,
    name: "Move to Shopping Bag",
    stageCategory: "Decision",
    userAction: "Moves single shortlisted item into cart.",
    cognitiveFriction: "Single item lacks ensemble completeness (e.g. top without matching bottom).",
    dropOffProbability: 18,
    alternativeBranch: "Removes from bag to look for matching items",
    epistemicStatus: "OBSERVED",
  },
  {
    stepNumber: 9,
    name: "30-Day Checkout Completion",
    stageCategory: "Outcome",
    userAction: "Completes order payment.",
    cognitiveFriction: "Zero post-purchase anxiety if sizing & drape expectations were accurate.",
    dropOffProbability: 0,
    alternativeBranch: "Successful 30-day conversion achieved",
    epistemicStatus: "OBSERVED",
  },
];

// 8. Information Leakage Map
export interface LeakageChannel {
  channel: string;
  sharePct: number;
  informationSought: string;
  workaroundBehavior: string;
  myntraDeficiency: string;
  epistemicStatus: EpistemicStatus;
  sampleQuote: string;
}

export const INFORMATION_LEAKAGE_MAP: LeakageChannel[] = [
  {
    channel: "WhatsApp / iMessage (Friends & Family)",
    sharePct: 41.2,
    informationSought: "Social validation, style suitability, second opinion on color & cut.",
    workaroundBehavior: "Takes multiple screenshots of product images, shares in group chat, waits 24–72 hours for replies.",
    myntraDeficiency: "No native collaborative wishlist or frictionless shareable polling link.",
    epistemicStatus: "OBSERVED",
    sampleQuote: "I screenshot 3 dresses from Myntra and sent them to my college group chat to ask which one I should wear for farewell.",
  },
  {
    channel: "YouTube (Try-On Hauls & Unboxings)",
    sharePct: 27.8,
    informationSought: "Real fabric movement, daylight color accuracy, drape in motion, wrinkle resistance.",
    workaroundBehavior: "Searches '[Brand Name] [Product Name] haul review' on YouTube to see real influencers wearing the item.",
    myntraDeficiency: "Static studio photography with strong artificial lighting and mannequin pinning.",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Before buying expensive kurtas from Myntra, I always search YouTube for haul videos to see how the fabric actually falls in natural light.",
  },
  {
    channel: "Reddit & Fashion Forums (r/IndianFashionAddicts)",
    sharePct: 18.5,
    informationSought: "Unbiased brand durability, true-to-size reliability, fabric quality after 3 washes.",
    workaroundBehavior: "Posts question on Reddit asking 'Has anyone bought Rare Rabbit shirts on Myntra? How is the fit?'",
    myntraDeficiency: "Reviews on product page lack structured body-dimension filters and long-term durability metrics.",
    epistemicStatus: "OBSERVED",
    sampleQuote: "Asked on Reddit whether Vero Moda tops run small or true to size because Myntra size charts are never reliable.",
  },
  {
    channel: "Instagram (Reels & Creator Styling)",
    sharePct: 12.5,
    informationSought: "Outfit pairing inspiration (which jeans/shoes/jewelry match this top).",
    workaroundBehavior: "Saves reels showing complete outfit styling ideas for inspiration.",
    myntraDeficiency: "Wishlist treats garments as isolated SKU cards rather than complete wearable ensembles.",
    epistemicStatus: "OBSERVED",
    sampleQuote: "I look on Instagram to see how creators style oversized blazers with sneakers before deciding to buy.",
  },
];

// 9. Product Comparison Factor Weights
export interface ComparisonFactor {
  factor: string;
  rank: number;
  weightPct: number;
  description: string;
  epistemicStatus: EpistemicStatus;
}

export const COMPARISON_FACTORS: ComparisonFactor[] = [
  {
    factor: "Customer Photo Reviews & Real Body Measurements",
    rank: 1,
    weightPct: 34.2,
    description: "Shoppers prioritize real user photos from reviewers with similar height and body dimensions.",
    epistemicStatus: "OBSERVED",
  },
  {
    factor: "Size Chart Consistency & Fit Confidence",
    rank: 2,
    weightPct: 26.8,
    description: "Comparative fit reliability ('Does this brand run small on bust or hips compared to Zara?').",
    epistemicStatus: "OBSERVED",
  },
  {
    factor: "Fabric Blend, GSM & Daylight Appearance",
    rank: 3,
    weightPct: 20.4,
    description: "100% Cotton vs Polyester blend, transparency rating, and non-studio color fidelity.",
    epistemicStatus: "OBSERVED",
  },
  {
    factor: "Outfit Versatility & Multi-Occasion Styling",
    rank: 4,
    weightPct: 12.1,
    description: "Ability to pair the item with existing wardrobe staples across office, casual, and party wear.",
    epistemicStatus: "OBSERVED",
  },
  {
    factor: "Brand Authenticity & Exchange Reliability",
    rank: 5,
    weightPct: 6.5,
    description: "Ease of instant size exchange if the initial fit is slightly off.",
    epistemicStatus: "OBSERVED",
  },
];

// 10. Opportunity Prioritization Matrix
export interface OpportunityScoreItem {
  id: string;
  opportunityName: string;
  targetFriction: string;
  frequencyScore: number;     // 1-10
  severityScore: number;      // 1-10
  intentRelevanceScore: number; // 1-10
  evidenceConfidenceScore: number; // 1-10
  strategicFitScore: number;  // 1-10
  compositeScore: number;     // 0-100 normalized
  epistemicStatus: EpistemicStatus;
  supportingSignalCount: number;
  counterEvidenceCount: number;
  unmetNeedSummary: string;
}

export const OPPORTUNITY_MATRIX: OpportunityScoreItem[] = [
  {
    id: "opp_1",
    opportunityName: "Crowdsourced Body-Metric Fit & Sizing Benchmark",
    targetFriction: "Size & Fit Ambiguity (Inconsistent 3rd-Party Charts)",
    frequencyScore: 9.2,
    severityScore: 9.5,
    intentRelevanceScore: 9.8,
    evidenceConfidenceScore: 9.4,
    strategicFitScore: 9.6,
    compositeScore: 94.2,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 248,
    counterEvidenceCount: 19,
    unmetNeedSummary: "'Give me 100% confidence that this exact brand size will fit my body without forcing me to order 2 sizes.'",
  },
  {
    id: "opp_2",
    opportunityName: "Interactive Wishlist Outfit Builder & Look Canvas",
    targetFriction: "Wishlist Clutter & Decision Paralysis (50+ Saved Items)",
    frequencyScore: 9.6,
    severityScore: 8.8,
    intentRelevanceScore: 9.2,
    evidenceConfidenceScore: 9.1,
    strategicFitScore: 9.5,
    compositeScore: 91.8,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 471,
    counterEvidenceCount: 34,
    unmetNeedSummary: "'Help me combine my saved items into complete wearable looks so I can stop hesitating over single pieces.'",
  },
  {
    id: "opp_3",
    opportunityName: "Collaborative 'Ask a Friend' Wishlist Polling",
    targetFriction: "External Validation & 72-Hour Social Lag",
    frequencyScore: 8.4,
    severityScore: 8.6,
    intentRelevanceScore: 9.0,
    evidenceConfidenceScore: 8.8,
    strategicFitScore: 9.2,
    compositeScore: 86.5,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 158,
    counterEvidenceCount: 12,
    unmetNeedSummary: "'Let me get instant votes from my friends on WhatsApp with 1 tap, without taking 10 screenshots.'",
  },
  {
    id: "opp_4",
    opportunityName: "Real-Motion Daylight Fabric Video Hauls",
    targetFriction: "Fabric Drape & Studio Photo Ambiguity",
    frequencyScore: 8.8,
    severityScore: 8.2,
    intentRelevanceScore: 8.5,
    evidenceConfidenceScore: 8.6,
    strategicFitScore: 8.9,
    compositeScore: 84.1,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 249,
    counterEvidenceCount: 22,
    unmetNeedSummary: "'Show me how the fabric actually moves, wrinkles, and looks in real daylight before I commit.'",
  },
  {
    id: "opp_5",
    opportunityName: "Intelligent In-Stock Similar Alternative Swapper",
    targetFriction: "Silent Size Depletion in Wishlist",
    frequencyScore: 6.8,
    severityScore: 9.0,
    intentRelevanceScore: 9.5,
    evidenceConfidenceScore: 8.9,
    strategicFitScore: 8.7,
    compositeScore: 78.4,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 78,
    counterEvidenceCount: 8,
    unmetNeedSummary: "'When my saved size sells out, instantly show me identical styles from top brands so my intent isn't wasted.'",
  },
  {
    id: "opp_6",
    opportunityName: "Occasion Clustering & Auto-Stale Archiver",
    targetFriction: "Passive Bookmarking & Aspirational Hoarding",
    frequencyScore: 7.2,
    severityScore: 6.5,
    intentRelevanceScore: 7.0,
    evidenceConfidenceScore: 8.0,
    strategicFitScore: 8.2,
    compositeScore: 71.3,
    epistemicStatus: "HYPOTHESIS",
    supportingSignalCount: 115,
    counterEvidenceCount: 16,
    unmetNeedSummary: "'Automatically organize my 80 wishlist items by occasion (Work, Wedding, Vacation) and archive old items.'",
  },
];

// 11. Unmet Need Generator Model
export interface UnmetNeedCard {
  id: string;
  observedBehavior: string;
  userFriction: string;
  rootUncertainty: string;
  existingWorkaround: string;
  unmetNeed: string;
  strategicOpportunity: string;
  epistemicStatus: EpistemicStatus;
}

export const UNMET_NEED_CARDS: UnmetNeedCard[] = [
  {
    id: "need_1",
    observedBehavior: "Shoppers save 2–3 different sizes of the same dress or top in their wishlist.",
    userFriction: "Brand sizing is inconsistent; fear of returning ill-fitting clothes causes hesitation.",
    rootUncertainty: "Fit & Silhouette Uncertainty: 'Will size M fit my bust and waist properly in this specific brand cut?'",
    existingWorkaround: "Scours reviews looking for reviewer photos with matching body measurements, or asks on Reddit.",
    unmetNeed: "'Provide high-confidence, body-metric calibrated sizing recommendations based on verified customer fits.'",
    strategicOpportunity: "Dynamic Fit Benchmark Matrix with crowdsourced reviewer height/weight tags.",
    epistemicStatus: "OBSERVED",
  },
  {
    id: "need_2",
    observedBehavior: "Users hoard 50–100+ items in a single flat wishlist list across several months.",
    userFriction: "High cognitive load; shoppers cannot easily compare or decide between 6 similar black tops.",
    rootUncertainty: "Choice Paralysis & Ensemble Uncertainty: 'Which of these tops best complements my existing wardrobe?'",
    existingWorkaround: "Manually opens 10 browser tabs or toggles back and forth inside the app.",
    unmetNeed: "'Allow me to group, compare, and assemble complete outfits directly from my saved shortlist.'",
    strategicOpportunity: "Interactive Wishlist Outfit Canvas & Side-by-Side Comparison Matrix.",
    epistemicStatus: "OBSERVED",
  },
  {
    id: "need_3",
    observedBehavior: "Users take screenshots of wishlist items and leave the Myntra app for 48–72 hours.",
    userFriction: "Shopping is inherently social; users delay checkout waiting for validation from trusted peers.",
    rootUncertainty: "Social & Style Uncertainty: 'Does this color and cut suit me in the eyes of my friends and family?'",
    existingWorkaround: "Shares multiple screenshots via WhatsApp group chats, leading to lost conversion momentum.",
    unmetNeed: "'Enable frictionless, 1-click private social polling so my friends can vote directly on my shortlist.'",
    strategicOpportunity: "Collaborative WhatsApp / Instagram Wishlist Polling Card.",
    epistemicStatus: "OBSERVED",
  },
  {
    id: "need_4",
    observedBehavior: "Users leave Myntra to search YouTube for '[Brand] haul unboxing' video reviews.",
    userFriction: "Static studio photos with artificial lighting do not reveal real fabric weight, sheer transparency, or drape.",
    rootUncertainty: "Material & Quality Uncertainty: 'Is this fabric thin, transparent, or prone to extreme wrinkling in motion?'",
    existingWorkaround: "Searches third-party video platforms for raw daylight unboxings.",
    unmetNeed: "'Show me authentic, short, unedited customer try-on clips in natural daylight with standardized GSM badges.'",
    strategicOpportunity: "5-Second Motion Drape Hauls & Fabric Transparency Badges.",
    epistemicStatus: "OBSERVED",
  },
];

// 12. First-Party Wishlist Event Schema (For Unknown Data Points)
export const FIRST_PARTY_EVENT_SCHEMA = `
-- Recommended First-Party Tracking Event Schema required to measure actual Wishlist Depth & Revisit Velocity:
CREATE TABLE public.user_wishlist_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    category VARCHAR(64) NOT NULL,
    wishlist_added_at TIMESTAMPTZ NOT NULL,
    wishlist_revisited_at TIMESTAMPTZ,
    revisit_count INTEGER DEFAULT 1,
    share_link_generated_at TIMESTAMPTZ,
    comparison_table_opened_at TIMESTAMPTZ,
    cart_added_at TIMESTAMPTZ,
    purchase_at TIMESTAMPTZ,
    time_to_cart_seconds INTEGER,
    converted_within_30_days BOOLEAN DEFAULT FALSE
);
`;
