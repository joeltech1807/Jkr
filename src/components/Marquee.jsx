const ITEMS = [
  'LASER CUTTING', 'FABRICATION', 'POWDER COATING', 'UPVC',
  'ALUMINIUM', 'SHEET METAL', 'FACADE DESIGN', 'TRADING',
  'GI STEEL DOORS', 'WINDOWS',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <section className="marquee-section" data-theme="light">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item}
            <span className="dot" />
          </div>
        ))}
      </div>
    </section>
  );
}
