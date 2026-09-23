/**
 * Page copy and illustrative numbers.
 * Metrics here are early-stage / internal-pilot figures — keep them modest
 * and clearly labelled as preliminary wherever they appear.
 */

export const heroStats = [
  { value: "1,200+", label: "hours of egocentric video processed in pilot" },
  { value: "40+", label: "skill primitives in our taxonomy" },
  { value: "9", label: "annotation layers per frame" },
];

export const domains = [
  "Automotive repair",
  "Industrial maintenance",
  "Food preparation",
  "Electronics assembly",
  "Surgical training",
  "Warehouse logistics",
  "Machining",
  "Construction trades",
  "Lab automation",
  "Home services",
];

export type Expert = {
  key: string;
  role: string;
  task: string;
  image: string;
  /** Short structured caption revealed on hover. */
  demo: string[];
  /** Bounding box for the overlay, in % of the image [x, y, w, h]. */
  box: [number, number, number, number];
  boxLabel: string;
};

export const experts: Expert[] = [
  {
    key: "mechanic",
    role: "Mechanic",
    task: "Repairing an engine",
    image: "/images/expert-mechanic.jpg",
    demo: ["locate valve cover", "grasp rocker arm", "seat & align", "verify clearance"],
    box: [0, 2, 38, 50],
    boxLabel: "hand_R · grasp",
  },
  {
    key: "technician",
    role: "Technician",
    task: "Servicing industrial equipment",
    image: "/images/expert-technician.jpg",
    demo: ["pick up caliper", "open jaws", "measure bore", "log reading"],
    box: [30, 20, 45, 55],
    boxLabel: "caliper · 0.94",
  },
  {
    key: "chef",
    role: "Chef",
    task: "Preparing a meal",
    image: "/images/expert-chef.jpg",
    demo: ["stabilize produce", "position blade", "slice ×12", "transfer to tray"],
    box: [12, 45, 40, 32],
    boxLabel: "knife · 0.98",
  },
  {
    key: "assembler",
    role: "Assembler",
    task: "Assembling a product",
    image: "/images/expert-assembly.jpg",
    demo: ["pick component", "orient to pad", "insert", "solder & inspect"],
    box: [38, 12, 40, 50],
    boxLabel: "iron_tip · 0.92",
  },
  {
    key: "surgeon",
    role: "Surgeon",
    task: "Performing a procedure",
    image: "/images/expert-surgeon.jpg",
    demo: ["request instrument", "handoff", "precision grip", "return"],
    box: [36, 30, 40, 38],
    boxLabel: "forceps · 0.95",
  },
];

export const representations = [
  { key: "tasks", title: "Tasks & subtasks", body: "Hierarchical segmentation of long-horizon work into goals and steps." },
  { key: "objects", title: "Objects & tools", body: "Open-vocabulary detection and tracking of every tool and part in play." },
  { key: "hands", title: "Hand & body motion", body: "21-point hand pose and full-body kinematics, per frame." },
  { key: "interactions", title: "Object interactions", body: "Contact events, grasp types and force-bearing moments." },
  { key: "temporal", title: "Temporal sequences", body: "Ordered action graphs with timing, pauses and retries." },
  { key: "skills", title: "Actions & skills", body: "Reusable skill primitives mapped to a shared taxonomy." },
  { key: "trajectories", title: "3D trajectories", body: "Metric 6-DoF paths of hands and tools lifted from monocular video." },
  { key: "outcomes", title: "Success & failure", body: "Labeled outcomes, including the mistakes experts recover from." },
];

export const pipeline = [
  { title: "Expert Video", body: "Head-mounted and body-worn footage from people doing real work." },
  { title: "Perception", body: "Hands, bodies, objects and depth, reconstructed from every frame." },
  { title: "Tasks & Skills", body: "Long videos segmented into goals, subtasks and skill primitives." },
  { title: "Actions & Interactions", body: "Contacts, grasps and state changes grounded in 3D." },
  { title: "Structured Demonstrations", body: "Robot-ready trajectories in standard learning formats." },
  { title: "Robot Training", body: "Policies and world models pre-trained on human experience." },
];

/** Illustrative, order-of-magnitude comparison. Shown with a disclaimer. */
export const comparison = {
  robot: {
    title: "Robot teleoperation",
    points: ["Limited in scale", "Expensive to collect", "Tied to specific hardware & environments"],
  },
  human: {
    title: "Human expert video",
    points: ["Massive in scale", "Naturally diverse", "Captured across environments, tools & tasks"],
  },
  bars: [
    { metric: "Cost per hour of demonstration", robot: 100, human: 4, robotLabel: "$100–$200", humanLabel: "< $5", lowerIsBetter: true },
    { metric: "Distinct environments per 1k hrs", robot: 8, human: 100, robotLabel: "~10", humanLabel: "1,000+", lowerIsBetter: false },
    { metric: "Hours collectable per month", robot: 6, human: 100, robotLabel: "~1k", humanLabel: "100k+", lowerIsBetter: false },
  ],
};

export const skillSteps = [
  "identifies the correct fastener",
  "reaches for a screwdriver",
  "grasps it",
  "positions it against the fastener",
  "applies torque",
  "verifies the result",
  "moves to the next step",
];

export const skillVerbs = ["Pick up", "Align", "Insert", "Rotate", "Connect", "Tighten", "Inspect", "Assemble", "Repair"];

/** Preliminary internal-pilot results. */
export const results = {
  stats: [
    { value: 1200, suffix: "+", label: "Hours of egocentric video processed", note: "Internal pilot across 6 task domains" },
    { value: 40, suffix: "+", label: "Skill primitives in our taxonomy", note: "Grasp, align, insert, rotate, fasten…" },
    { value: 91, suffix: "%", label: "Subtask segmentation F1", note: "Internal benchmark, 150 held-out clips" },
    { value: 14, suffix: " mm", label: "Mean 3D hand-pose error", note: "Monocular, vs. motion-capture ground truth" },
  ],
  benchmark: {
    title: "Internal benchmark · 150 held-out expert clips",
    ours: "ElectricAI pipeline (v0.3)",
    baseline: "Off-the-shelf VLM baseline",
    rows: [
      { metric: "Subtask segmentation F1", ours: 91, baseline: 64 },
      { metric: "Tool identification accuracy", ours: 94, baseline: 78 },
      { metric: "Contact-event recall", ours: 87, baseline: 52 },
      { metric: "Grasp-type classification", ours: 82, baseline: 49 },
    ],
  },
};

export const faqs = [
  {
    q: "Who is this for?",
    a: "Robotics teams and physical-AI labs that need large, diverse demonstration data to pre-train manipulation policies and world models — without standing up a fleet of teleoperated robots.",
  },
  {
    q: "Where does the video come from?",
    a: "From consented partners: skilled workers, training programs and enterprises that already record first-person footage for safety, training or QA. We add the pipeline that turns that footage into structured data.",
  },
  {
    q: "How do you handle privacy and consent?",
    a: "Every hour of footage is collected under explicit contributor consent. Faces, screens and identifying details are automatically redacted before anything leaves our pipeline, and contributors are compensated for their data.",
  },
  {
    q: "How is this different from teleoperation data?",
    a: "Teleoperation is precise but tied to one robot, one lab and a small number of hours. Human video is embodiment-agnostic and orders of magnitude more abundant. We see them as complementary: pre-train on humans, fine-tune on robots.",
  },
  {
    q: "What stage are you at?",
    a: "We're a pre-seed research team. We have a working prototype pipeline, early benchmark results, and are onboarding our first design partners on both the data-supply and robotics sides.",
  },
];

export const imageCredits = [
  { label: "Hero — mechanic at work", href: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e" },
  { label: "Ratchet on engine bay", href: "https://images.unsplash.com/photo-1775590766345-c117265f0c1b" },
  { label: "Engine valve train", href: "https://images.unsplash.com/photo-1633990308758-b26aada5804e" },
  { label: "Caliper measurement", href: "https://unsplash.com/photos/esuJmhwbPls" },
  { label: "Chef slicing", href: "https://images.unsplash.com/photo-1492739159057-7d1896b3c63f" },
  { label: "Circuit board soldering", href: "https://images.unsplash.com/photo-1733749130045-c8777fd49509" },
  { label: "Surgical handoff", href: "https://images.unsplash.com/photo-1685997179880-6449203a053e" },
  { label: "Robotic hand", href: "https://unsplash.com/photos/jIBMSMs4_kA" },
  { label: "Soldering wires", href: "https://images.unsplash.com/photo-1562941995-17dc31eaaf6d" },
];
