import StudentLayout from "@/layouts/StudentLayout";

const SettingsPage = () => {
  return (
    <StudentLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-black">
          Settings
        </h1>

        <div className="bg-background border rounded-3xl p-8 max-w-3xl space-y-6">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-2xl">
            Save Changes
          </button>

        </div>

      </div>

    </StudentLayout>
  );
};

export default SettingsPage;