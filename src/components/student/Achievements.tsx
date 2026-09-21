import { Trophy } from "lucide-react";

const Achievements = () => {
  return (
    <div className="bg-background border rounded-3xl p-6">

      <h2 className="font-black text-xl mb-5">
        Achievements
      </h2>

      <div className="space-y-4">

        <Achievement
          title="React Master"
        />

        <Achievement
          title="10 Lessons Completed"
        />

        <Achievement
          title="Top Performer"
        />

      </div>

    </div>
  );
};

const Achievement = ({ title }: any) => (
  <div className="flex items-center gap-4">

    <div className="bg-primary/10 text-primary p-3 rounded-2xl">
      <Trophy />
    </div>

    <div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground">
        Badge unlocked
      </p>

    </div>

  </div>
);

export default Achievements;