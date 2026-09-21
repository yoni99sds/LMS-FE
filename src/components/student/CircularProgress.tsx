const CircularProgress = () => {
  return (
    <div className="bg-background border rounded-3xl p-8 text-center">

      <h2 className="font-black text-xl mb-8">
        Overall Progress
      </h2>

      <div className="relative w-40 h-40 mx-auto">

        <svg className="rotate-[-90deg]">

          <circle
            cx="80"
            cy="80"
            r="65"
            stroke="#ececec"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r="65"
            stroke="#7c3aed"
            strokeWidth="12"
            strokeDasharray="408"
            strokeDashoffset="102"
            fill="none"
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center">

          <div>

            <h1 className="text-4xl font-black">
              75%
            </h1>

            <p className="text-sm text-muted-foreground">
              Completed
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CircularProgress;