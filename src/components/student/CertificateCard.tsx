import { Award, Download } from "lucide-react";

type Props = {
  title: string;
  date: string;
};

const CertificateCard = ({ title, date }: Props) => {
  return (
    <div className="bg-background rounded-3xl border p-6 shadow-sm hover:shadow-xl transition">

      <div className="flex justify-between">

        <div className="flex gap-4">

          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Award size={30} />
          </div>

          <div>
            <h3 className="font-bold text-lg">
              {title}
            </h3>

            <p className="text-muted-foreground text-sm">
              Issued {date}
            </p>
          </div>

        </div>

        <button className="text-primary">
          <Download />
        </button>

      </div>

    </div>
  );
};

export default CertificateCard;