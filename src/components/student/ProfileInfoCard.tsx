import { Camera, Mail, User, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileInfoCard = () => {
  return (
 <div className="bg-background border rounded-2xl p-6 shadow-sm">

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

    {/* USER INFO */}
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">

      {/* AVATAR */}
      <div className="relative">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=student"
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border object-cover"
        />

        <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md hover:scale-105 transition">
          <Camera size={14} />
        </button>
      </div>

      {/* BASIC INFO */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold">John Doe</h2>

        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground mt-1">
          <Mail size={14} />
          <span>johndoe@email.com</span>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground mt-1">
          <MapPin size={14} />
          <span>Addis Ababa, Ethiopia</span>
        </div>
      </div>

    </div>

    {/* BUTTON */}
    <Button
      variant="outline"
      className="rounded-full w-full sm:w-auto"
    >
      Edit Profile
    </Button>

  </div>

  {/* DIVIDER */}
  <div className="my-6 border-t" />

  {/* DETAILS GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    <div className="p-4 rounded-xl bg-muted/30">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <User size={14} />
        Role
      </div>
      <p className="font-bold mt-1">Student</p>
    </div>

    <div className="p-4 rounded-xl bg-muted/30">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Calendar size={14} />
        Joined
      </div>
      <p className="font-bold mt-1">Jan 2025</p>
    </div>

    <div className="p-4 rounded-xl bg-muted/30">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <User size={14} />
        Status
      </div>
      <p className="font-bold mt-1 text-green-500">Active</p>
    </div>

  </div>

</div>
  );
};

export default ProfileInfoCard;