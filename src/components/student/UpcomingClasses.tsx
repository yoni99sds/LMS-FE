const UpcomingClasses = () => {
  return (
    <div className="bg-background border rounded-3xl p-6">

      <h2 className="font-black text-xl mb-5">
        Upcoming Classes
      </h2>

      <div className="space-y-4">

        <Card
          title="React Hooks"
          time="10:00 AM"
        />

        <Card
          title="Express APIs"
          time="2:00 PM"
        />

        <Card
          title="MongoDB"
          time="6:00 PM"
        />

      </div>

    </div>
  );
};

const Card = ({ title, time }: any) => (
  <div className="bg-muted rounded-2xl p-4">

    <h3 className="font-bold">
      {title}
    </h3>

    <p className="text-sm text-muted-foreground mt-1">
      {time}
    </p>

  </div>
);

export default UpcomingClasses;