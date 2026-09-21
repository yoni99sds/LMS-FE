type Props = {
  title: string;
  value: string;
};

const ProgressStatCard = ({ title, value }: Props) => {
  return (
    <div className="bg-background border rounded-3xl p-6 shadow-sm">

      <p className="text-muted-foreground text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-black mt-2 text-primary">
        {value}
      </h2>

    </div>
  );
};

export default ProgressStatCard;