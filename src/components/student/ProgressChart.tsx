import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", progress: 20 },
  { name: "Tue", progress: 40 },
  { name: "Wed", progress: 60 },
  { name: "Thu", progress: 80 },
  { name: "Fri", progress: 90 },
];

const ProgressChart = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      setWidth(ref.current?.offsetWidth || 0);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);

    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-[300px] bg-background border rounded-2xl p-4"
    >
      <h3 className="font-bold mb-4">Weekly Progress</h3>

      {width > 0 && (
        <LineChart width={width} height={220} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#4f46e5"
            strokeWidth={2}
          />
        </LineChart>
      )}
    </div>
  );
};

export default ProgressChart;