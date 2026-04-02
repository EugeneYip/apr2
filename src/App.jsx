
import React, { useMemo, useState } from "react";

const PATHS = {
  spark: "M12 2l1.9 4.9L19 9l-5.1 2.1L12 16l-1.9-4.9L5 9l5.1-2.1L12 2z",
  compass: "M12 3a9 9 0 100 18 9 9 0 000-18zm3.8 5.2l-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1z",
  layers: "M12 3l8 4.5-8 4.5-8-4.5L12 3zm-8 8.5L12 16l8-4.5M4 15.5L12 20l8-4.5",
  people: "M9 11a3 3 0 100-6 3 3 0 000 6zm6 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM4 19a5 5 0 0110 0M13 19a4 4 0 018 0",
  chat: "M4 5h16v10H8l-4 4V5z",
  chart: "M5 18V6M11 18V10M17 18V3M3 20h18",
  scale: "M12 4v2m0 0l6 3m-6-3L6 9m6 0v9m-8-5h6l-3-5-3 5zm10 0h6l-3-5-3 5M7 20h10",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zm-6.8 8h13.6M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9z",
  book: "M5 4.5A2.5 2.5 0 017.5 2H20v16H7.5A2.5 2.5 0 005 20.5V4.5zm0 0V18m3-10h8",
  briefcase: "M3 7h18v11H3V7zm5 0V5h8v2",
  check: "M5 12l4 4 10-10",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  target: "M12 5v14M5 12h14M12 12l5-5M12 12l-5 5M12 12l5 5M12 12L7 7",
  filter: "M4 5h16l-6 7v5l-4 2v-7L4 5z",
  alert: "M12 4l8 14H4L12 4zm0 5v4m0 3h.01",
  box: "M12 3l8 4.5V16.5L12 21l-8-4.5V7.5L12 3z",
  link: "M10 14l4-4m-5.5 7.5H7a4 4 0 010-8h3m2 0h3a4 4 0 010 8h-1.5",
  phone: "M7 3h10v18H7V3zm3 15h4",
  rocket: "M13 4c2.5.2 4.8 2.5 5 5-.6 2.5-2 4.5-4.2 6.2L9 20l1.8-4.8C8.8 13 7.4 11 7 8.5 8.8 6.4 10.7 5 13 4zM8 16l-4 4 1-5 3 1z",
  grid: "M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z",
};

const COMPANY_STRIP = [
  { en: "Computron", zh: "Computron" },
  { en: "Sephora", zh: "Sephora" },
  { en: "Biocon", zh: "Biocon" },
  { en: "NFLK", zh: "NFLK" },
  { en: "Petite Playthings", zh: "Petite Playthings" },
  { en: "Liberty Mutual", zh: "Liberty Mutual" },
  { en: "Suruga Bank", zh: "Suruga Bank" },
  { en: "Microsoft Copilot", zh: "Microsoft Copilot" },
];

const QUICK_RECALL = [
  {
    en: "Marketing = delivering value to the customer.",
    zh: "行銷的核心 = delivering value to the customer。",
  },
  {
    en: "Case discussion = case facts only. No hindsight. No outside facts.",
    zh: "案例討論 = 只能用案例當下事實。不能用 hindsight，也不能帶外部資訊。",
  },
  {
    en: "Flow: 3Cs → SWOT → STP → 4Ps → implement → assess.",
    zh: "流程：3Cs → SWOT → STP → 4Ps → 執行 → 評估。",
  },
  {
    en: "Consumer behavior drives communication strategy.",
    zh: "消費者行為驅動溝通策略。",
  },
  {
    en: "Arbitrary markups do not make sense.",
    zh: "任意加成沒有意義。",
  },
  {
    en: "Digital tools never replace strategy.",
    zh: "數位工具不能取代策略。",
  },
  {
    en: "Ethics is a decision filter, not a final-page appendix.",
    zh: "倫理是決策濾鏡，不是最後才補上的附錄。",
  },
  {
    en: "In enterprise AI, adoption is usually harder than the technology itself.",
    zh: "在企業 AI 場景裡，採用往往比技術本身更難。",
  },
];

const DEFINITIONS = [
  {
    termEn: "Segmentation",
    termZh: "區隔",
    en: "Grouping prospective customers so members share needs and respond similarly to marketing action.",
    zh: "把潛在顧客分組，讓同組成員具有相近需求，且會對行銷作法有相似反應。",
  },
  {
    termEn: "Targeting",
    termZh: "目標市場選擇",
    en: "Choosing the segment or segments most likely to respond favorably.",
    zh: "選擇最可能正向回應的區隔。",
  },
  {
    termEn: "Positioning",
    termZh: "定位",
    en: "Designing the offering so it occupies a meaningful and distinct place in the target customer’s mind. Professor Sultan’s short formula is perceptions plus preferences.",
    zh: "設計提供物，使其在目標顧客心中相對競爭者占有有意義且清楚不同的位置。Sultan 教授的短公式是 perceptions 加 preferences。",
  },
  {
    termEn: "Customer lifetime value",
    termZh: "顧客終生價值",
    en: "The net present value of the future profit stream expected from the customer relationship.",
    zh: "一段顧客關係在未來可帶來利潤流的淨現值。",
  },
  {
    termEn: "CRM",
    termZh: "顧客關係管理",
    en: "Managing detailed customer information and touch points in order to build loyalty and long-term value.",
    zh: "管理顧客資訊與接觸點，以建立忠誠與長期價值。",
  },
  {
    termEn: "Value",
    termZh: "價值",
    en: "The course repeatedly treats customer value as quality, service, and price together rather than any one of them alone.",
    zh: "這門課反覆把顧客價值看成 quality、service、price 的合成，而不是只看其中一項。",
  },
  {
    termEn: "Satisfaction",
    termZh: "滿意度",
    en: "Perceived performance relative to expectations.",
    zh: "知覺表現相對於期待的結果。",
  },
];

const FLOW_BOXES = [
  {
    stepEn: "Situation analysis",
    stepZh: "情勢分析",
    detailEn: "Start with customer, company, and competition. Add SWOT, environment, research, constraints, and the decision context.",
    detailZh: "先看 customer、company、competition，再補 SWOT、環境、研究、限制與決策情境。",
  },
  {
    stepEn: "Strategy",
    stepZh: "策略",
    detailEn: "Choose the segment, target, and position. Then specify the marketing mix through product, price, promotion, and place.",
    detailZh: "選定 segment、target、position，再透過 product、price、promotion、place 具體化。",
  },
  {
    stepEn: "Implementation",
    stepZh: "執行",
    detailEn: "Who does what, when, at what cost, and through which channel, media, or sales system.",
    detailZh: "誰做甚麼、何時做、花多少、透過哪個 channel、media 或 sales system 來做。",
  },
  {
    stepEn: "Assessment",
    stepZh: "評估",
    detailEn: "Use metrics, control logic, breakeven, market share, and outcome evidence to see whether the plan actually worked.",
    detailZh: "用 metrics、control、breakeven、市占與結果證據去檢查計畫是否真的有效。",
  },
];

const BUYING_PROCESS = [
  ["Problem recognition", "問題認知", "Something creates a gap between the current state and a desired state.", "顧客意識到現況與理想狀態之間有落差。"],
  ["Information search", "資訊搜尋", "The buyer looks for options, cues, and trusted sources.", "顧客開始找選項、線索與可信來源。"],
  ["Evaluation of alternatives", "比較替代方案", "Choice criteria, risk, involvement, and brand perceptions begin to matter.", "評估標準、風險、涉入程度與品牌認知開始發揮作用。"],
  ["Purchase decision", "購買決策", "The customer chooses, but availability, timing, price, and interpersonal influence still matter.", "顧客做出選擇，但供貨、時機、價格與他人影響仍然重要。"],
  ["Post-purchase behavior", "購後行為", "Usage, satisfaction, re-evaluation, repeat purchase, and influence on others.", "使用、滿意、重新評估、重複購買，以及對其他人的影響。"],
];

const SIX_MS = [
  ["Mission or motive", "為何而做"],
  ["Market", "對誰說"],
  ["Message", "說甚麼"],
  ["Medium", "在哪裡說"],
  ["Money", "花多少"],
  ["Measurement", "如何衡量"],
];

const PRICING_FORMULAS = [
  ["Breakeven volume = Fixed costs ÷ (Selling price − Variable cost)", "損益兩平數量 = 固定成本 ÷（售價 − 變動成本）"],
  ["Contribution = Selling price − Variable cost", "貢獻 = 售價 − 變動成本"],
  ["PCM = (Revenue − Variable costs) ÷ Revenue", "PCM =（營收 − 變動成本）÷ 營收"],
  ["Dollar breakeven = Fixed costs ÷ PCM", "金額損益兩平 = 固定成本 ÷ PCM"],
];

const CASES = [
  {
    titleEn: "Computron",
    titleZh: "Computron",
    metaEn: "Pricing",
    metaZh: "定價",
    icon: "scale",
    en: "The central lesson is that price must be justified through customer value, competitor context, and company constraints. Arbitrary markups are not strategy.",
    zh: "核心教訓是，價格必須由顧客價值、競爭情境與公司限制共同支撐。任意加成不是策略。",
    bullets: [
      ["A useful reference point is a normal quoted figure of about $1.245M versus a likely rival around $872K.", "一個很有用的參考點，是常態報價大約 $1.245M，而競爭者可能約 $872K。"],
      ["König only considered bids within a narrow range of the low bid.", "König 只考慮與最低價差距有限的報價。"],
      ["Use breakeven and channel arithmetic only after clarifying the decision logic.", "先把決策邏輯講清楚，再使用損益兩平與通路算術。"],
    ],
  },
  {
    titleEn: "Sephora Direct",
    titleZh: "Sephora Direct",
    metaEn: "IMC and digital",
    metaZh: "IMC 與數位",
    icon: "chat",
    en: "The main lesson is simple and easy to forget: strategy first, media second. Start from the decision-making stage you want to influence, then allocate budget.",
    zh: "最重要的一句話其實很簡單，也最容易忘記，就是 strategy first, media second。先看你要影響哪個決策階段，再談預算配置。",
    bullets: [
      ["Use the 6Ms to organize the recommendation.", "建議可用 6Ms 來組織。"],
      ["In a digital context, post-purchase behavior can trigger advocacy and influence on other customers.", "在數位情境裡，購後行為會延伸成 advocate，還會進一步影響其他顧客。"],
      ["Attribution is difficult but still needs to be confronted rather than ignored.", "Attribution 很難，但不能因此跳過。"],
    ],
  },
  {
    titleEn: "Biocon",
    titleZh: "Biocon",
    metaEn: "Global new product launch",
    metaZh: "全球新產品上市",
    icon: "rocket",
    en: "Biocon forces you to connect launch timing, evidence quality, pricing, target selection, channels, sales force design, and ethics. The hard part is keeping them logically linked.",
    zh: "Biocon 迫使你把上市時機、證據品質、定價、目標市場、通路、銷售團隊設計與倫理一起看。真正困難的是要讓這些決策彼此連得起來。",
    bullets: [
      ["Pricing frame: economic value ceiling versus cost floor.", "定價框架：economic value ceiling 對上 cost floor。"],
      ["Timing frame: launch now versus wait for stronger evidence.", "時機框架：現在上還是等更多證據再上。"],
      ["Healthcare innovation makes ethics and access impossible to separate from pricing.", "醫療創新讓 ethics 與 access 無法和 pricing 分開。"],
    ],
  },
  {
    titleEn: "NFLK",
    titleZh: "NFLK",
    metaEn: "Social advocacy",
    metaZh: "社會倡議",
    icon: "people",
    en: "A zero-budget parent group changed government policy by using marketing logic on a public problem: segmentation, message clarity, stakeholder mapping, and channel discipline.",
    zh: "一群沒有預算的家長，把行銷邏輯用在公共問題上，最後真的推動了政策改變，也就是區隔、訊息清晰度、利害關係人盤點與通路紀律。",
    bullets: [
      ["Major campaigns included Baby Names, Paper Airplane, 100,000 Cities, Day on the Hill, and letter writing.", "主要 campaign 包括 Baby Names、Paper Airplane、100,000 Cities、Day on the Hill 與 letter writing。"],
      ["A key outcome was 2018 federal budget funding for a redress system.", "一個關鍵結果是 2018 聯邦預算為 redress system 撥款。"],
      ["The big transferable lesson is channel discipline plus sequence discipline.", "最可移植的教訓是通路紀律與節奏紀律。"],
    ],
  },
  {
    titleEn: "Petite Playthings",
    titleZh: "Petite Playthings",
    metaEn: "Sales ethics and judgment",
    metaZh: "銷售倫理與判斷",
    icon: "briefcase",
    en: "The case sits at the intersection of key account management, commission incentives, professional boundaries, and sales-force judgment.",
    zh: "這個案例位在 key account management、佣金誘因、專業界線與業務判斷的交叉點上。",
    bullets: [
      ["The case context centers on a roughly $200K account with about an 8K commission implication.", "案例情境圍繞一個大約 $200K 的客戶，牽涉約 8K 的 commission。"],
      ["The wider territory had shipped more than $1.75M the prior year.", "整個區域前一年出貨超過 $1.75M。"],
      ["Personal selling is not just persuasion. It is also ethics, listening, and judgment under ambiguity.", "Personal selling 不只是說服，也包括倫理、傾聽與在模糊情境下的判斷。"],
    ],
  },
];

const AI_BLOCKS = [
  {
    titleEn: "Benevolent mobile apps",
    titleZh: "善意 mobile apps",
    en: "The trust framework is competence, confidence, and benevolence. The core argument is not that all apps are good. It is that benevolent apps can measurably increase trust and preference when they are genuinely useful.",
    zh: "trust framework 包含 competence、confidence 與 benevolence。核心主張不是所有 app 都好，而是當 app 真正有用時，benevolent apps 能實際提升 trust 與 preference。",
  },
  {
    titleEn: "Liberty Mutual",
    titleZh: "Liberty Mutual",
    en: "Consideration moved from 5.4 to 6.7, purchase intent from 2.9 to 3.3, and preference share from 9.2% to 17%.",
    zh: "consideration 從 5.4 升到 6.7，purchase intent 從 2.9 升到 3.3，preference share 從 9.2% 升到 17%。",
  },
  {
    titleEn: "Suruga Bank",
    titleZh: "Suruga Bank",
    en: "Trust increased 2.26 times and preference rose from 0.99 to 3.04.",
    zh: "trust 提升到 2.26 倍，preference 從 0.99 提升到 3.04。",
  },
  {
    titleEn: "Gen AI in marketing",
    titleZh: "Gen AI 與行銷",
    en: "The strategic questions are fit and governance questions. Decide analytical AI versus generative AI, general versus custom inputs, and the amount of human review.",
    zh: "真正的策略問題是 fit 與 governance。先決定 analytical AI 與 generative AI、general 與 custom inputs，以及 human review 的程度。",
  },
  {
    titleEn: "Microsoft Copilot adoption",
    titleZh: "Microsoft Copilot 採用",
    en: "Adoption was not automatic. A repeated lesson was that peer learning, clearer use cases, and staged adoption support mattered more than the initial hype.",
    zh: "採用不會自動發生。反覆出現的教訓是，peer learning、較清楚的 use case 與分階段採用支援，比一開始的 hype 更重要。",
  },
];

const RESEARCH_POINTS = [
  ["Exploratory research", "探索性研究", "Used to size up the situation, identify variables, and learn the customer’s language.", "用來先理解情況、辨認關鍵變數，也學顧客怎麼說。"],
  ["Descriptive research", "描述性研究", "Answers who, what, when, where, and how.", "回答 who、what、when、where、how。"],
  ["Experimental research", "實驗研究", "Used for causal questions by manipulating variables.", "操弄變數來看因果關係。"],
];

const COLD_CALLS = [
  ["What is marketing?", "甚麼是行銷？", "Creating, communicating, delivering, and exchanging offerings that have value. In this course, the practical core is delivering value to the customer rather than pushing products.", "行銷是創造、溝通、傳遞與交換對顧客有價值的提供物。這門課最實際的核心是 delivering value to the customer，而不是推產品。"],
  ["Walk me through the process.", "請走一次整個流程。", "Situation analysis, then strategy, then implementation, then assessment. In practice: 3Cs and SWOT first, then STP and 4Ps, then execution, then metrics and control.", "先做 situation analysis，再做 strategy，接著 implementation，最後 assessment。實際上就是先 3Cs 與 SWOT，再 STP 與 4Ps，然後執行與衡量控制。"],
  ["What did Computron teach?", "Computron 教了甚麼？", "Price has to reflect customer value, competition, and company constraints. Arbitrary markups are not strategy.", "價格必須反映顧客價值、競爭狀況與公司限制。任意加成不是策略。"],
  ["What did Sephora teach?", "Sephora 教了甚麼？", "Start with the marketing objective and the decision-making stage you want to influence. Only then decide digital media and spending.", "先定要影響哪一個決策階段與哪一個行銷目標，再決定數位媒體與資源配置。"],
  ["How should we think about AI in marketing?", "該怎麼看 AI 與行銷？", "As a fit-and-governance question, not a hype question. Decide analytical versus generative AI, general versus custom inputs, and the degree of human review.", "應把它看成 fit 與 governance 的問題，而不是 hype 的問題。先決定 analytical 與 generative AI、general 與 custom inputs，以及 human review 的程度。"],
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function Icon({ name, className = "h-5 w-5", stroke = 1.9 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name] || PATHS.spark} />
    </svg>
  );
}

function t(mode, en, zh) {
  if (mode === "zh") return zh;
  if (mode === "bi") {
    return (
      <>
        <div>{en}</div>
        <div className="mt-1 text-[color:var(--sub)]">{zh}</div>
      </>
    );
  }
  return en;
}

function Card({ children, className = "" }) {
  return (
    <div className={cx("rounded-[24px] border border-[color:var(--line)] bg-white/85 shadow-[0_12px_36px_rgba(30,41,59,0.06)] backdrop-blur", className)}>
      {children}
    </div>
  );
}

function PillButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
          : "border-[color:var(--line)] bg-white/80 text-[color:var(--ink)] hover:border-[color:var(--accent)]"
      )}
    >
      {children}
    </button>
  );
}

function MetaBadge({ children }) {
  return (
    <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--wash)] px-3 py-1 text-[11px] font-medium text-[color:var(--sub)]">
      {children}
    </span>
  );
}

function SectionTitle({ mode, icon, eyebrowEn, eyebrowZh, titleEn, titleZh, summaryEn, summaryZh }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-2xl border border-[color:var(--line)] bg-white/80 p-2 text-[color:var(--accent)] shadow-sm">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--sub)]">
          {mode === "zh" ? eyebrowZh : mode === "bi" ? `${eyebrowEn} / ${eyebrowZh}` : eyebrowEn}
        </div>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-[color:var(--ink)] sm:text-[30px]">
          {mode === "zh" ? titleZh : mode === "bi" ? `${titleEn} / ${titleZh}` : titleEn}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--sub)] sm:text-[15px]">
          {t(mode, summaryEn, summaryZh)}
        </p>
      </div>
    </div>
  );
}

function CaseCard({ mode, item }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--wash)] p-2.5 text-[color:var(--accent)]">
          <Icon name={item.icon} className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[color:var(--ink)]">
            {mode === "zh" ? item.titleZh : mode === "bi" ? `${item.titleEn} / ${item.titleZh}` : item.titleEn}
          </h3>
          <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--sub)]">
            {mode === "zh" ? item.metaZh : mode === "bi" ? `${item.metaEn} / ${item.metaZh}` : item.metaEn}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-[color:var(--sub)]">{t(mode, item.en, item.zh)}</p>
      <div className="mt-4 space-y-2">
        {item.bullets.map(([en, zh]) => (
          <div key={en} className="flex gap-3 rounded-2xl bg-[color:var(--wash)] px-4 py-3 text-sm leading-7 text-[color:var(--ink)]">
            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" />
            <div>{t(mode, en, zh)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DefinitionRow({ mode, item }) {
  return (
    <div className="grid gap-3 border-t border-[color:var(--line)] px-4 py-4 sm:grid-cols-[220px,1fr] sm:px-5">
      <div>
        <div className="font-semibold text-[color:var(--ink)]">
          {mode === "zh" ? item.termZh : mode === "bi" ? `${item.termEn} / ${item.termZh}` : item.termEn}
        </div>
      </div>
      <div className="text-sm leading-7 text-[color:var(--sub)]">{t(mode, item.en, item.zh)}</div>
    </div>
  );
}

export default function CourseReviewInfrastructure() {
  const [mode, setMode] = useState("en");

  const nav = useMemo(() => {
    if (mode === "zh") {
      return [
        ["overview", "課程鏡頭"],
        ["flow", "核心流程"],
        ["definitions", "關鍵名詞"],
        ["behavior", "顧客與 IMC"],
        ["pricing", "定價"],
        ["cases", "案例"],
        ["ai", "善意 App 與 AI"],
        ["research", "研究"],
        ["cold", "課堂應答"],
      ];
    }
    return [
      ["overview", "Course lens"],
      ["flow", "Core flow"],
      ["definitions", "Key terms"],
      ["behavior", "Customer and IMC"],
      ["pricing", "Pricing"],
      ["cases", "Cases"],
      ["ai", "Apps and AI"],
      ["research", "Research"],
      ["cold", "Cold-call prep"],
    ];
  }, [mode]);

  return (
    <div
      className="min-h-screen bg-[color:var(--bg)] text-[color:var(--ink)]"
      style={{
        "--bg": "#FCFAF2",
        "--wash": "rgba(46,92,110,0.06)",
        "--accent": "#2E5C6E",
        "--accent-soft": "rgba(46,92,110,0.12)",
        "--plum": "#622954",
        "--ink": "#1F2937",
        "--sub": "#52606D",
        "--line": "rgba(46,92,110,0.16)",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 xl:grid-cols-[1.4fr,0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <MetaBadge>MKTG 6200</MetaBadge>
                <MetaBadge>Spring 2026</MetaBadge>
                <MetaBadge>{mode === "zh" ? "複習介面" : mode === "bi" ? "Review interface / 複習介面" : "Review interface"}</MetaBadge>
              </div>
              <h1 className="mt-4 text-[32px] font-semibold leading-tight text-[color:var(--ink)] sm:text-[46px]">
                {mode === "zh" ? "Course Review" : mode === "bi" ? "Course Review / 課程總複習" : "Course Review"}
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[color:var(--sub)] sm:text-[17px]">
                {t(
                  mode,
                  "A reader-facing study infrastructure for fast review, deeper understanding, and stronger classroom response. English is the default reading mode. Chinese and bilingual modes are available when you want them.",
                  "這是一份面向讀者的學習介面，目的是讓你更快複習、更深理解，也更能應對課堂提問。英文是預設閱讀模式，若需要，也可以切換到純中文或中英同步。"
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {COMPANY_STRIP.map((item) => (
                  <div key={item.en} className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-2 text-xs font-medium text-[color:var(--ink)]">
                    {mode === "zh" ? item.zh : item.en}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(46,92,110,0.08),rgba(98,41,84,0.06))] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--sub)]">
                    {mode === "zh" ? "閱讀模式" : mode === "bi" ? "Reading mode / 閱讀模式" : "Reading mode"}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:var(--sub)]">
                    {t(
                      mode,
                      "Use the switch below when you want the same page in Chinese-only or bilingual reading.",
                      "如果你想把同一份頁面切成純中文，或改成中英同步閱讀，可以用下面的切換鍵。"
                    )}
                  </div>
                </div>
                <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-2 text-[color:var(--plum)]">
                  <Icon name="book" className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <PillButton active={mode === "en"} onClick={() => setMode("en")}>EN</PillButton>
                <PillButton active={mode === "zh"} onClick={() => setMode("zh")}>中文</PillButton>
                <PillButton active={mode === "bi"} onClick={() => setMode("bi")}>EN + 中文</PillButton>
              </div>
              <div className="mt-6 rounded-[22px] border border-[color:var(--line)] bg-white/85 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-[color:var(--accent-soft)] p-2 text-[color:var(--accent)]">
                    <Icon name="spark" className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--sub)]">
                      {mode === "zh" ? "核心一句" : mode === "bi" ? "The one thing / 核心一句" : "The one thing"}
                    </div>
                    <div className="mt-2 text-lg font-semibold leading-8 text-[color:var(--ink)]">
                      {t(mode, "Marketing = delivering value to the customer.", "Marketing = delivering value to the customer。")}
                    </div>
                    <div className="mt-2 text-sm leading-7 text-[color:var(--sub)]">
                      {t(
                        mode,
                        "Not promotion. Not selling. The course keeps returning to Theodore Levitt’s distinction: selling focuses on the seller’s needs, while marketing focuses on the buyer’s needs.",
                        "它不是 promotion，也不只是 selling。整門課反覆回到 Theodore Levitt 的區分，也就是 selling 看的是 seller 的 needs，marketing 看的是 buyer 的 needs。"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr,300px]">
          <div className="min-w-0 space-y-6">
            <Card className="px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-2 text-[color:var(--accent)]">
                  <Icon name="grid" className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-[color:var(--ink)]">
                  {mode === "zh" ? "快速導航" : mode === "bi" ? "Quick navigation / 快速導航" : "Quick navigation"}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {nav.map(([id, label], idx) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-2 text-xs font-medium text-[color:var(--sub)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                  >
                    {idx + 1}. {label}
                  </a>
                ))}
              </div>
            </Card>

            <section id="overview">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="compass"
                  eyebrowEn="Course lens"
                  eyebrowZh="課程鏡頭"
                  titleEn="What the course keeps grading"
                  titleZh="這門課反覆在評分的東西"
                  summaryEn="Class participation is 25% of the grade and the class is treated like a business meeting. The professor is not rewarding noise. She is rewarding preparation, evidence, structure, relevance, and professionalism."
                  summaryZh="課堂參與占總成績 25%，而且整堂課被當成 business meeting 看待。教授要的不是熱鬧，而是準備、證據、結構、相關性與 professionalism。"
                />
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-[color:var(--ink)]">
                      {mode === "zh" ? "5 Ps" : mode === "bi" ? "The 5 Ps / 5 Ps" : "The 5 Ps"}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                      {[
                        ["Presence", "出席"],
                        ["Punctuality", "準時"],
                        ["Preparedness", "準備"],
                        ["Participation", "參與"],
                        ["Professionalism", "專業"],
                      ].map(([en, zh]) => (
                        <div key={en} className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--wash)] px-3 py-3 text-center font-medium text-[color:var(--ink)]">
                          {mode === "zh" ? zh : mode === "bi" ? `${en} / ${zh}` : en}
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-[color:var(--ink)]">
                      {mode === "zh" ? "高品質發言的樣子" : mode === "bi" ? "What good participation sounds like / 高品質發言的樣子" : "What good participation sounds like"}
                    </div>
                    <div className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--sub)]">
                      {[
                        ["Shows the case has been read.", "讓人一聽就知道你真的讀過案例。"],
                        ["Uses qualitative and quantitative evidence from the case.", "能用 case 裡的 qual 與 quant 證據支持觀點。"],
                        ["Responds to what others already said instead of repeating it.", "能接住別人的話，而不是重複。"],
                        ["Pushes the discussion forward and links back to marketing principles.", "能把討論往前推，並且連回行銷原理。"],
                      ].map(([en, zh]) => (
                        <div key={en} className="flex gap-3 rounded-2xl bg-[color:var(--wash)] px-4 py-3">
                          <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" />
                          <div>{t(mode, en, zh)}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>
            </section>

            <section id="flow">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="layers"
                  eyebrowEn="Core flow"
                  eyebrowZh="核心流程"
                  titleEn="The master logic of the course"
                  titleZh="整門課的總邏輯"
                  summaryEn="Most sessions keep returning to the same management sequence. The labels shift a little by topic, but the logic stays stable."
                  summaryZh="大多數課堂最後都會回到同一條管理邏輯。雖然各週主題不同，標籤會微調，但基本順序很穩。"
                />
                <div className="mt-6 flex flex-col gap-3 xl:flex-row">
                  {FLOW_BOXES.map((box, idx) => (
                    <React.Fragment key={box.stepEn}>
                      <div className="min-w-[220px] flex-1 rounded-[22px] border border-[color:var(--line)] bg-white/90 p-4 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--sub)]">
                          {mode === "zh" ? box.stepZh : mode === "bi" ? `${box.stepEn} / ${box.stepZh}` : box.stepEn}
                        </div>
                        <div className="mt-3 text-sm leading-7 text-[color:var(--ink)]">{t(mode, box.detailEn, box.detailZh)}</div>
                      </div>
                      {idx < FLOW_BOXES.length - 1 && (
                        <div className="hidden items-center justify-center xl:flex">
                          <Icon name="arrowRight" className="h-5 w-5 text-[color:var(--sub)]" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Card>
            </section>

            <section id="definitions">
              <Card className="overflow-hidden pt-5 sm:pt-8">
                <div className="px-5 sm:px-8">
                  <SectionTitle
                    mode={mode}
                    icon="book"
                    eyebrowEn="Key terms"
                    eyebrowZh="關鍵名詞"
                    titleEn="Definitions you should be able to say cleanly"
                    titleZh="你應該能清楚說出的名詞"
                    summaryEn="This section is meant for fast drilling. Each definition is trimmed to what is most usable in class discussion and short written work."
                    summaryZh="這一區是給你快速記憶與抽答使用。每個定義都只保留最能直接用在課堂討論與短文裡的部分。"
                  />
                </div>
                <div className="mt-6 border-t border-[color:var(--line)]">
                  {DEFINITIONS.map((item) => (
                    <DefinitionRow key={item.termEn} mode={mode} item={item} />
                  ))}
                </div>
              </Card>
            </section>

            <section id="behavior">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="chat"
                  eyebrowEn="Customer and IMC"
                  eyebrowZh="顧客與 IMC"
                  titleEn="Consumer behavior is the base layer of communication strategy"
                  titleZh="消費者行為是溝通策略的底層"
                  summaryEn="Do not choose media first and invent a strategy later. First understand the customer, the decision process, the involvement level, and the role of each touch point."
                  summaryZh="不要先選 media，再回頭硬湊策略。應該先理解顧客、決策過程、涉入程度，以及每個 touch point 的角色。"
                />
                <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-[color:var(--ink)]">
                      {mode === "zh" ? "五階段購買流程" : mode === "bi" ? "Five-stage buying process / 五階段購買流程" : "Five-stage buying process"}
                    </div>
                    <div className="mt-4 space-y-3">
                      {BUYING_PROCESS.map(([en, zh, noteEn, noteZh], idx) => (
                        <div key={en} className="flex gap-3 rounded-2xl border border-[color:var(--line)] bg-white/80 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">{idx + 1}</div>
                          <div>
                            <div className="font-semibold text-[color:var(--ink)]">{t(mode, en, zh)}</div>
                            <div className="mt-1 text-sm leading-7 text-[color:var(--sub)]">{t(mode, noteEn, noteZh)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <div className="space-y-4">
                    <Card className="p-5">
                      <div className="text-sm font-semibold text-[color:var(--ink)]">6Ms</div>
                      <div className="mt-4 space-y-3">
                        {SIX_MS.map(([en, zh]) => (
                          <div key={en} className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] pb-3 last:border-b-0 last:pb-0">
                            <div className="font-medium text-[color:var(--ink)]">{en}</div>
                            <div className="text-right text-sm text-[color:var(--sub)]">{mode === "zh" ? zh : mode === "bi" ? `${en} = ${zh}` : zh}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    <Card className="p-5">
                      <div className="text-sm font-semibold text-[color:var(--ink)]">
                        {mode === "zh" ? "Push 與 Pull" : mode === "bi" ? "Push versus pull / Push 與 Pull" : "Push versus pull"}
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-4">
                          <div className="font-semibold text-[color:var(--ink)]">{mode === "zh" ? "低涉入" : mode === "bi" ? "Low involvement / 低涉入" : "Low involvement"}</div>
                          <div className="mt-2 text-sm leading-7 text-[color:var(--sub)]">
                            {t(mode, "Often leans toward pull tools such as advertising and mass communication.", "通常較偏向 pull 工具，例如 advertising 與 mass communication。")}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-4">
                          <div className="font-semibold text-[color:var(--ink)]">{mode === "zh" ? "高涉入" : mode === "bi" ? "High involvement / 高涉入" : "High involvement"}</div>
                          <div className="mt-2 text-sm leading-7 text-[color:var(--sub)]">
                            {t(mode, "Often needs more push through personal selling or direct engagement.", "通常更需要透過 personal selling 或 direct engagement 來 push。")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            </section>

            <section id="pricing">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="scale"
                  eyebrowEn="Pricing"
                  eyebrowZh="定價"
                  titleEn="Pricing is arithmetic plus judgment"
                  titleZh="定價是算術，也是判斷"
                  summaryEn="Computron and Biocon make the same deeper point from two different directions. Pricing is never only a formula and never only a feeling."
                  summaryZh="Computron 與 Biocon 從不同方向說了同一件更深的事，也就是 pricing 既不能只靠公式，也不能只靠感覺。"
                />
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-[color:var(--ink)]">
                      {mode === "zh" ? "常用公式" : mode === "bi" ? "Core formulas / 常用公式" : "Core formulas"}
                    </div>
                    <div className="mt-4 rounded-[18px] border border-[color:var(--line)] bg-white/80 p-4">
                      {PRICING_FORMULAS.map(([en, zh], idx) => (
                        <div key={en} className={cx("py-3 text-sm leading-7 text-[color:var(--ink)]", idx !== 0 && "border-t border-[color:var(--line)]")}>
                          {t(mode, en, zh)}
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-5">
                    <div className="text-sm font-semibold text-[color:var(--ink)]">
                      {mode === "zh" ? "兩個重要提醒" : mode === "bi" ? "Two reminders / 兩個重要提醒" : "Two reminders"}
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Arbitrary markups do not make sense.", "任意加成沒有意義。"],
                        ["Do not stop at the formula. Convert the answer into a managerial question such as required market share or market realism.", "不要停在公式本身。要把答案再轉成管理問題，例如需要的 market share 是否合理，或市場條件是否撐得住。"],
                      ].map(([en, zh]) => (
                        <div key={en} className="rounded-2xl bg-[color:var(--wash)] px-4 py-4 text-sm leading-7 text-[color:var(--sub)]">
                          {t(mode, en, zh)}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>
            </section>

            <section id="cases">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="briefcase"
                  eyebrowEn="Cases"
                  eyebrowZh="案例"
                  titleEn="Five cases, five recurrent managerial habits"
                  titleZh="五個案例，五種反覆出現的管理習慣"
                  summaryEn="The cases are not random. Together, they train you to connect analysis, evidence, action, trade-offs, and ethics under imperfect information."
                  summaryZh="這五個案例不是隨便湊在一起的。把它們放在一起看，你會發現它們都在訓練同一件事，也就是在資訊不完美下，把分析、證據、行動、trade-offs 與倫理連起來。"
                />
                <div className="mt-6 grid gap-4 xl:grid-cols-2">
                  {CASES.map((item) => (
                    <CaseCard key={item.titleEn} mode={mode} item={item} />
                  ))}
                </div>
              </Card>
            </section>

            <section id="ai">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="phone"
                  eyebrowEn="Apps and AI"
                  eyebrowZh="善意 App 與 AI"
                  titleEn="Trust-building apps and AI strategy both reward disciplined fit"
                  titleZh="善意 App 與 AI 策略，真正獎勵的是紀律化的 fit"
                  summaryEn="Good marketing technology is not just about capability. It is about fit, trust, adoption, and governance."
                  summaryZh="好的行銷科技不只是 capability，而是 fit、trust、adoption 與 governance。"
                />
                <div className="mt-6 grid gap-4 xl:grid-cols-2">
                  {AI_BLOCKS.map((item) => (
                    <Card key={item.titleEn} className="p-5">
                      <div className="font-semibold text-[color:var(--ink)]">
                        {mode === "zh" ? item.titleZh : mode === "bi" ? `${item.titleEn} / ${item.titleZh}` : item.titleEn}
                      </div>
                      <div className="mt-3 text-sm leading-7 text-[color:var(--sub)]">{t(mode, item.en, item.zh)}</div>
                    </Card>
                  ))}
                </div>
              </Card>
            </section>

            <section id="research">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="filter"
                  eyebrowEn="Research"
                  eyebrowZh="研究"
                  titleEn="Marketing research is useful only when it changes a real decision"
                  titleZh="行銷研究只有在能幫助真正決策時才有意義"
                  summaryEn="The research material teaches you when to gather more information, what kind to gather, and how badly your answers can be distorted by design choices."
                  summaryZh="研究這一塊重要，不只是因為要背名詞，而是因為它教你甚麼時候應該多收集資訊、要收甚麼資訊，以及你的結論會多容易被設計選擇扭曲。"
                />
                <div className="mt-6 grid gap-4 xl:grid-cols-3">
                  {RESEARCH_POINTS.map(([en, zh, noteEn, noteZh]) => (
                    <Card key={en} className="p-5">
                      <div className="font-semibold text-[color:var(--ink)]">{t(mode, en, zh)}</div>
                      <div className="mt-3 text-sm leading-7 text-[color:var(--sub)]">{t(mode, noteEn, noteZh)}</div>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-[color:var(--wash)] px-4 py-4 text-sm leading-7 text-[color:var(--sub)]">
                  {t(
                    mode,
                    "A useful caution from the debrief is that big-data pattern mining without rigorous causal testing should be treated as pre-scientific insight rather than final proof.",
                    "一個很有用的提醒是，big-data pattern mining 如果沒有嚴格 causal testing，就只能算是 pre-scientific insight，而不是最後定論。"
                  )}
                </div>
              </Card>
            </section>

            <section id="cold">
              <Card className="p-5 sm:p-8">
                <SectionTitle
                  mode={mode}
                  icon="target"
                  eyebrowEn="Cold-call prep"
                  eyebrowZh="課堂應答"
                  titleEn="What to say under time pressure"
                  titleZh="在時間壓力下該怎麼回答"
                  summaryEn="Use this section when you want compact answer rehearsal just before class."
                  summaryZh="這一區適合在上課前做快速口頭回答練習。"
                />
                <div className="mt-6 grid gap-4 xl:grid-cols-2">
                  {COLD_CALLS.map(([qEn, qZh, aEn, aZh]) => (
                    <Card key={qEn} className="p-5">
                      <div className="text-sm font-semibold text-[color:var(--ink)]">
                        {mode === "zh" ? qZh : mode === "bi" ? `${qEn} / ${qZh}` : qEn}
                      </div>
                      <div className="mt-3 rounded-2xl bg-[color:var(--wash)] px-4 py-4 text-sm leading-7 text-[color:var(--sub)]">
                        {t(mode, aEn, aZh)}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </section>

            <Card className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-2 text-[color:var(--accent)]">
                  <Icon name="book" className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[color:var(--ink)]">
                    {mode === "zh" ? "Source basis" : mode === "bi" ? "Source basis / 來源基礎" : "Source basis"}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-[color:var(--sub)]">
                    {t(
                      mode,
                      "Accessible course files, lecture slides, case debrief materials, textbook-aligned concepts, required article notes, and the pasted review draft provided as the base input.",
                      "可取得的課程檔案、lecture slides、case debrief materials、與教科書對齊的概念、required article notes，以及你貼上的 review draft。"
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[color:var(--line)] bg-white/80 p-2 text-[color:var(--accent)]">
                  <Icon name="spark" className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-[color:var(--ink)]">
                  {mode === "zh" ? "Quick recall" : mode === "bi" ? "Quick recall / 快速記憶" : "Quick recall"}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {QUICK_RECALL.map((item, idx) => (
                  <div key={idx} className="flex gap-3 rounded-2xl bg-[color:var(--wash)] px-4 py-3 text-sm leading-7 text-[color:var(--ink)]">
                    <Icon name="arrowRight" className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" />
                    <div>{t(mode, item.en, item.zh)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
