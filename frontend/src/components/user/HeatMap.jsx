import HeatMap from "@uiw/react-heat-map";

const value = Array.from({ length: 365 }, (_, i) => ({
  date: `2024/${String(Math.floor(i / 30) + 1).padStart(2, "0")}/${String(
    (i % 30) + 1
  ).padStart(2, "0")}`,
  count: Math.floor(Math.random() * 5),
}));

const HeatMapProfile = () => {
  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        value={value}
        width="100%"
        style={{ color: "#8b949e" }}
        startDate={new Date("2024/01/01")}
        panelColors={{
          0: "#161b22",
          1: "#0e4429",
          2: "#006d32",
          3: "#26a641",
          4: "#39d353",
        }}
      />
    </div>
  );
};

export default HeatMapProfile;
