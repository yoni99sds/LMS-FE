import StudentLayout from "@/layouts/StudentLayout";
import ProfileInfoCard from "@/components/student/ProfileInfoCard";

const ProfilePage = () => {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-black">Profile</h1>

        <ProfileInfoCard />
      </div>
    </StudentLayout>
  );
};

export default ProfilePage;