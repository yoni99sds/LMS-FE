type Props = {
  title: string;
  description: string;
};

const SettingsCard = ({
  title,
  description,
}: Props) => {
  return (
    <div className="bg-background border rounded-3xl p-6 shadow-sm">

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2">
        {description}
      </p>

    </div>
  );
};

export default SettingsCard;