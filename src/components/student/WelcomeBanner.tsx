const WelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-violet-600 text-white rounded-[32px] p-10 flex justify-between items-center">

      <div>

        <h1 className="text-4xl font-black">
          Welcome Back 👋
        </h1>

        <p className="mt-4 text-white/80">
          Continue learning and achieve your goals.
        </p>

        <button className="mt-8 bg-white text-primary px-7 py-3 rounded-2xl font-bold">
          Resume Learning
        </button>

      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        className="hidden lg:block w-48"
      />

    </div>
  );
};

export default WelcomeBanner;