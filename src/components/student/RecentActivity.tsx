const RecentActivity = () => {
  return (
    <div className="bg-background border rounded-3xl p-6">

      <h2 className="font-black text-xl mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">

        <Item
          title="Completed React Lesson"
          time="2 hours ago"
          color="bg-green-500"
        />

        <Item
          title="Started Node.js Module"
          time="Yesterday"
          color="bg-blue-500"
        />

        <Item
          title="Reached 70% Progress"
          time="2 days ago"
          color="bg-primary"
        />

      </div>

    </div>
  );
};

const Item = ({ title, time, color }: any) => (
  <div className="flex gap-4">

    <div className={`w-3 h-3 rounded-full mt-2 ${color}`} />

    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">
        {time}
      </p>
    </div>

  </div>
);

export default RecentActivity;