import StudentLayout from "@/layouts/StudentLayout";
import { Award } from "lucide-react";

const CertificatesPage = () => {
  return (
    <StudentLayout>

      <h1 className="text-4xl font-black mb-10">
        Certificates
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="border rounded-3xl p-8 bg-background">

          <Award className="text-primary mb-5" size={50} />

          <h2 className="text-2xl font-bold">
            React Mastery Certificate
          </h2>

          <p className="text-muted-foreground mt-2">
            Issued March 2026
          </p>

          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-2xl">
            Download
          </button>

        </div>

      </div>

    </StudentLayout>
  );
};

export default CertificatesPage;