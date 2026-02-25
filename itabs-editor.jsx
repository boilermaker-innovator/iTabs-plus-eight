import { useState, useRef, useEffect } from "react";

const INITIAL_DATA = {
  title: "Celebrating Ian Haigh",
  subtitle: "Snr. Director of Customer Experience @ Guesty",
  slug: "ian",
  cards: [
    {
      id: 1,
      emoji: "🎉",
      label: "PROUD MOMENT",
      headline: "Go Ian! Big Moves Happening",
      summary: "Your step-brother is smashing it! Ian Haigh, Senior Director of Customer Experience at Guesty, just announced he's building an entirely new Automations & Integrations team from the ground up.",
      iButtons: [
        { type: "context", term: "Guesty", content: "Guesty is a leading property management platform that helps hospitality businesses manage their operations. They serve property managers, hospitality brands, and enterprise clients across the globe." },
        { type: "why-it-matters", term: "Why it matters", content: "Building a brand new team from scratch is a huge vote of confidence from the company. It means Ian has demonstrated the leadership and vision to be trusted with defining the direction of a whole new department." }
      ]
    },
    {
      id: 2,
      emoji: "🚀",
      label: "THE OPPORTUNITY",
      headline: "Building a New Team From Scratch",
      summary: "Ian's launching a brand new Automations & Integrations team at Guesty. He's hiring two key roles: a CX Automations and Project Lead, and an Automation and Integration Engineer. This is leadership in action!",
      iButtons: [
        { type: "definition", term: "CX Automations", content: "Customer Experience Automations — building automated systems and workflows that improve how customers interact with and are supported by a company. This includes things like automated onboarding, smart routing, and proactive support triggers." },
        { type: "context", term: "The Roles", content: "Ian is hiring two positions: a CX Automations and Project Lead to drive strategy and manage projects, and an Automation and Integration Engineer to build the technical systems. Both roles are based in Metro Cebu (Hybrid)." }
      ]
    },
    {
      id: 3,
      emoji: "💡",
      label: "THE VISION",
      headline: "Latest Tech, Real Impact",
      summary: "Ian's pitching this as an opportunity to work with cutting-edge technology while making a visible difference. The focus on automations and integrations means his team will be streamlining operations across the entire customer experience.",
      iButtons: [
        { type: "why-it-matters", term: "Why it matters", content: "Automation and integration engineering is one of the hottest areas in tech right now. Companies that nail their CX automation see massive improvements in customer satisfaction and operational efficiency. Ian's positioning his team right at the centre of this." },
        { type: "definition", term: "Integration Engineering", content: "The practice of connecting different software systems so they work together seamlessly. In a CX context, this means connecting support tools, CRM systems, communication platforms, and internal databases to create unified customer experiences." }
      ]
    },
    {
      id: 4,
      emoji: "🏆",
      label: "CAREER MILESTONE",
      headline: "Senior Director Energy 💪",
      summary: "Senior Director of Customer Experience is a seriously impressive title. Ian's not just managing — he's directing the strategic vision of how an entire company engages with its customers, and now expanding that scope with a whole new team.",
      iButtons: [
        { type: "context", term: "Leadership Level", content: "Senior Director typically sits just below VP level in most tech companies. It means Ian is responsible for large-scale strategy, team building, budget allocation, and cross-functional leadership. Building a new team is often a stepping stone to VP." },
        { type: "why-it-matters", term: "Why it matters", content: "Getting the green light to build a new team is one of the strongest signals of trust from a company. It means the executive team believes in Ian's vision and is investing real resources to make it happen. That's massive!" }
      ]
    },
    {
      id: 5,
      emoji: "👨‍👩‍👦",
      label: "FROM THE FAMILY",
      headline: "Family Pride 🇦🇺",
      summary: "From all of us back in Perth — we're proud of you, Ian! Watching you grow, lead, and now build something brand new is incredible. Keep smashing it, brother! 🎊",
      iButtons: [
        { type: "context", term: "The Haigh Family", content: "This iTabs was built by Jon, Ian's step-brother, using AI-powered tools from Perth, Western Australia. Because when your brother is out there making big moves, you celebrate it! 🎉" },
        { type: "why-it-matters", term: "Why it matters", content: "Family support matters. Whether you're building teams in tech or working shutdowns in the mines, backing each other up is what it's all about. Go Ian! 🙌" }
      ]
    }
  ]
};

const EMOJIS = ["🎉", "🚀", "💡", "🏆", "👨‍👩‍👦", "⭐", "🔥", "💪", "🎯", "❤️", "🌟", "👏", "🎊", "💼", "🛠️"];

const GRADIENTS = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #3b82f6)",
  "linear-gradient(135deg, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #06b6d4, #3b82f6)",
];

export default function ITAbsEditor() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeCard, setActiveCard] = useState(0);
  const [view, setView] = useState("edit"); // "edit" or "preview"
  const [previewCard, setPreviewCard] = useState(0);
  const [modalOpen, setModalOpen] = useState(null);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateCard = (cardIndex, field, value) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === cardIndex ? { ...c, [field]: value } : c)
    }));
  };

  const updateIButton = (cardIndex, btnIndex, field, value) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === cardIndex ? {
        ...c,
        iButtons: c.iButtons.map((b, j) => j === btnIndex ? { ...b, [field]: value } : b)
      } : c)
    }));
  };

  const addIButton = (cardIndex) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === cardIndex ? {
        ...c,
        iButtons: [...c.iButtons, { type: "context", term: "New Item", content: "Add details here..." }]
      } : c)
    }));
  };

  const removeIButton = (cardIndex, btnIndex) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === cardIndex ? {
        ...c,
        iButtons: c.iButtons.filter((_, j) => j !== btnIndex)
      } : c)
    }));
  };

  const addCard = () => {
    const newId = Math.max(...data.cards.map(c => c.id)) + 1;
    setData(prev => ({
      ...prev,
      cards: [...prev.cards, {
        id: newId,
        emoji: "⭐",
        label: "NEW CARD",
        headline: "New Card Title",
        summary: "Add your content here...",
        iButtons: []
      }]
    }));
    setActiveCard(data.cards.length);
  };

  const removeCard = (index) => {
    if (data.cards.length <= 1) return;
    setData(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
    if (activeCard >= data.cards.length - 1) setActiveCard(Math.max(0, data.cards.length - 2));
  };

  const moveCard = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= data.cards.length) return;
    setData(prev => {
      const cards = [...prev.cards];
      [cards[index], cards[newIndex]] = [cards[newIndex], cards[index]];
      return { ...prev, cards };
    });
    setActiveCard(newIndex);
  };

  const handlePublish = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const card = data.cards[activeCard];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0c0f",
      color: "#e4e4e7",
      fontFamily: "'Söhne', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Top Bar */}
      <div style={{
        borderBottom: "1px solid #1e1e24",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#111116",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#f59e0b" }}>i</span>Tabs
          </span>
          <span style={{ color: "#52525b", fontSize: 13 }}>Editor</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setView(view === "edit" ? "preview" : "edit")}
            style={{
              background: view === "preview" ? "#f59e0b" : "#1e1e24",
              color: view === "preview" ? "#000" : "#a1a1aa",
              border: "none",
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {view === "edit" ? "👁 Preview" : "✏️ Edit"}
          </button>
          <button
            onClick={handlePublish}
            style={{
              background: saved ? "#10b981" : "linear-gradient(135deg, #f59e0b, #ef4444)",
              color: "#000",
              border: "none",
              padding: "7px 20px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {saved ? "✓ Ready!" : "Publish →"}
          </button>
        </div>
      </div>

      {view === "edit" ? (
        <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", gap: 0, minHeight: "calc(100vh - 53px)" }}>
          {/* Left: General + Card List */}
          <div style={{
            width: 260,
            borderRight: "1px solid #1e1e24",
            padding: "16px 12px",
            overflowY: "auto",
            flexShrink: 0,
          }}>
            {/* General Settings */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Page Settings</div>
              <input
                value={data.title}
                onChange={e => updateField("title", e.target.value)}
                placeholder="Title"
                style={{
                  width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6,
                  padding: "8px 10px", color: "#e4e4e7", fontSize: 13, marginBottom: 6, outline: "none",
                }}
              />
              <input
                value={data.subtitle}
                onChange={e => updateField("subtitle", e.target.value)}
                placeholder="Subtitle"
                style={{
                  width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6,
                  padding: "8px 10px", color: "#e4e4e7", fontSize: 13, marginBottom: 6, outline: "none",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#52525b", fontSize: 12 }}>itabs.ai/</span>
                <input
                  value={data.slug}
                  onChange={e => updateField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="slug"
                  style={{
                    flex: 1, background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6,
                    padding: "8px 10px", color: "#f59e0b", fontSize: 13, fontWeight: 600, outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Card List */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              Cards ({data.cards.length})
            </div>
            {data.cards.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setActiveCard(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 10px", marginBottom: 4, borderRadius: 8,
                  background: i === activeCard ? "#1e1e24" : "transparent",
                  border: i === activeCard ? "1px solid #2a2a30" : "1px solid transparent",
                  cursor: "pointer", transition: "all 0.1s",
                }}
              >
                <span style={{ fontSize: 18 }}>{c.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.headline}
                  </div>
                  <div style={{ fontSize: 10, color: "#52525b" }}>{c.label}</div>
                </div>
                <span style={{ fontSize: 10, color: "#3f3f46" }}>#{i + 1}</span>
              </div>
            ))}
            <button
              onClick={addCard}
              style={{
                width: "100%", padding: "10px", marginTop: 8, background: "none",
                border: "1px dashed #2a2a30", borderRadius: 8, color: "#52525b",
                fontSize: 12, cursor: "pointer", fontWeight: 600,
              }}
            >
              + Add Card
            </button>
          </div>

          {/* Right: Card Editor */}
          <div style={{ flex: 1, padding: "20px 28px", overflowY: "auto" }}>
            {card && (
              <>
                {/* Card controls */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: 1 }}>
                    Editing Card {activeCard + 1}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => moveCard(activeCard, -1)} disabled={activeCard === 0}
                      style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "4px 10px", color: activeCard === 0 ? "#2a2a30" : "#a1a1aa", fontSize: 12, cursor: "pointer" }}>↑</button>
                    <button onClick={() => moveCard(activeCard, 1)} disabled={activeCard === data.cards.length - 1}
                      style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "4px 10px", color: activeCard === data.cards.length - 1 ? "#2a2a30" : "#a1a1aa", fontSize: 12, cursor: "pointer" }}>↓</button>
                    <button onClick={() => removeCard(activeCard)} disabled={data.cards.length <= 1}
                      style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "4px 10px", color: data.cards.length <= 1 ? "#2a2a30" : "#ef4444", fontSize: 12, cursor: "pointer" }}>✕</button>
                  </div>
                </div>

                {/* Emoji Picker */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 11, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 6 }}>Emoji</label>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {EMOJIS.map(e => (
                      <button key={e} onClick={() => updateCard(activeCard, "emoji", e)}
                        style={{
                          width: 36, height: 36, fontSize: 18, background: card.emoji === e ? "#2a2a30" : "transparent",
                          border: card.emoji === e ? "2px solid #f59e0b" : "1px solid #1e1e24",
                          borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{e}</button>
                    ))}
                  </div>
                </div>

                {/* Label */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Label</label>
                  <input value={card.label} onChange={e => updateCard(activeCard, "label", e.target.value)}
                    style={{ width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "8px 10px", color: "#e4e4e7", fontSize: 13, outline: "none", textTransform: "uppercase", letterSpacing: 0.5 }} />
                </div>

                {/* Headline */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Headline</label>
                  <input value={card.headline} onChange={e => updateCard(activeCard, "headline", e.target.value)}
                    style={{ width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "10px", color: "#e4e4e7", fontSize: 16, fontWeight: 700, outline: "none" }} />
                </div>

                {/* Summary */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 11, color: "#71717a", fontWeight: 600, display: "block", marginBottom: 4 }}>Summary</label>
                  <textarea value={card.summary} onChange={e => updateCard(activeCard, "summary", e.target.value)} rows={4}
                    style={{ width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "10px", color: "#e4e4e7", fontSize: 14, lineHeight: 1.6, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                </div>

                {/* i-Buttons */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <label style={{ fontSize: 11, color: "#71717a", fontWeight: 600 }}>
                      <span style={{ color: "#f59e0b", fontStyle: "italic", fontWeight: 800 }}>i</span> Buttons ({card.iButtons.length})
                    </label>
                    <button onClick={() => addIButton(activeCard)}
                      style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "4px 12px", color: "#a1a1aa", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                      + Add
                    </button>
                  </div>
                  {card.iButtons.map((btn, bi) => (
                    <div key={bi} style={{ background: "#14141a", border: "1px solid #1e1e24", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                        <select value={btn.type} onChange={e => updateIButton(activeCard, bi, "type", e.target.value)}
                          style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "6px 8px", color: "#a1a1aa", fontSize: 12, outline: "none" }}>
                          <option value="context">Context</option>
                          <option value="definition">Definition</option>
                          <option value="why-it-matters">Why it matters</option>
                          <option value="related">Related</option>
                        </select>
                        <input value={btn.term} onChange={e => updateIButton(activeCard, bi, "term", e.target.value)} placeholder="Button label"
                          style={{ flex: 1, background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "6px 8px", color: "#e4e4e7", fontSize: 12, outline: "none" }} />
                        <button onClick={() => removeIButton(activeCard, bi)}
                          style={{ background: "none", border: "none", color: "#ef4444", fontSize: 14, cursor: "pointer", padding: "2px 6px" }}>✕</button>
                      </div>
                      <textarea value={btn.content} onChange={e => updateIButton(activeCard, bi, "content", e.target.value)} rows={3}
                        style={{ width: "100%", background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 6, padding: "8px", color: "#a1a1aa", fontSize: 12, lineHeight: 1.5, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* PREVIEW MODE */
        <div style={{ display: "flex", justifyContent: "center", padding: "24px 16px", minHeight: "calc(100vh - 53px)", background: "#0c0c0f" }}>
          <div style={{
            width: 390, background: "#0a0a0a", borderRadius: 20, overflow: "hidden",
            border: "1px solid #1e1e24", position: "relative",
            display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 100px)",
          }}>
            {/* Progress */}
            <div style={{ display: "flex", gap: 3, padding: "14px 14px 8px" }}>
              {data.cards.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i === previewCard ? "#f59e0b" : i < previewCard ? "#fff" : "rgba(255,255,255,0.2)",
                }} />
              ))}
            </div>

            {/* Header */}
            <div style={{ padding: "8px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700,
              }}>🎉</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{data.title}</div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{data.subtitle}</div>
              </div>
            </div>

            {/* Card Preview */}
            {data.cards[previewCard] && (() => {
              const pc = data.cards[previewCard];
              const grad = GRADIENTS[previewCard % GRADIENTS.length];
              return (
                <div style={{ flex: 1, padding: "0 12px 12px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <div style={{ background: "#1a1a1a", borderRadius: 14, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{
                      background: grad, aspectRatio: "16/9", display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 56 }}>{pc.emoji}</span>
                    </div>
                    <div style={{ padding: 16, flex: 1, overflow: "auto" }}>
                      <div style={{ fontSize: 10, color: "#10b981", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                        {pc.label} — {previewCard + 1} of {data.cards.length}
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>{pc.headline}</div>
                      <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 12 }}>{pc.summary}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {pc.iButtons.map((btn, bi) => (
                          <button key={bi}
                            onClick={() => setModalOpen({ term: btn.term, type: btn.type, content: btn.content })}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 5,
                              background: "#2a2a2a", border: "none", padding: "6px 12px", borderRadius: 16,
                              fontSize: 12, fontWeight: 500, color: "#e4e4e7", cursor: "pointer",
                            }}>
                            <span style={{
                              width: 18, height: 18, background: "#f59e0b", color: "#000",
                              borderRadius: "50%", fontSize: 10, fontWeight: 800, fontStyle: "italic",
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                            }}>i</span>
                            {btn.term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Nav */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "10px 0 14px" }}>
              <button onClick={() => setPreviewCard(Math.max(0, previewCard - 1))} disabled={previewCard === 0}
                style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 8, padding: "6px 20px", color: previewCard === 0 ? "#2a2a30" : "#e4e4e7", fontSize: 13, cursor: "pointer" }}>← Prev</button>
              <button onClick={() => setPreviewCard(Math.min(data.cards.length - 1, previewCard + 1))} disabled={previewCard === data.cards.length - 1}
                style={{ background: "#1a1a1f", border: "1px solid #2a2a30", borderRadius: 8, padding: "6px 20px", color: previewCard === data.cards.length - 1 ? "#2a2a30" : "#e4e4e7", fontSize: 13, cursor: "pointer" }}>Next →</button>
            </div>

            <div style={{ textAlign: "center", fontSize: 10, color: "#3f3f46", paddingBottom: 10 }}>
              Built with ❤️ using <span style={{ color: "#3b82f6" }}>iTabs</span> · itabs.ai/{data.slug}
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <div onClick={() => setModalOpen(null)} style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div onClick={e => e.stopPropagation()} style={{
                background: "#1a1a1f", borderRadius: 16, padding: 24, maxWidth: 360, width: "90%",
                border: "1px solid #2a2a30",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{modalOpen.term}</span>
                    <span style={{ fontSize: 10, background: "#2a2a30", padding: "2px 8px", borderRadius: 8, color: "#71717a" }}>{modalOpen.type}</span>
                  </div>
                  <button onClick={() => setModalOpen(null)} style={{ background: "none", border: "none", color: "#71717a", fontSize: 20, cursor: "pointer" }}>×</button>
                </div>
                <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7 }}>{modalOpen.content}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
