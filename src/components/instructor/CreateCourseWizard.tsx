import { Check } from "lucide-react";

type Step = {
  number: number;
  title: string;
};

type Props = {
  currentStep: number;
  steps?: Step[];
  children?: React.ReactNode;
};

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Basic Information",
  },
  {
    number: 2,
    title: "Course Content",
  },
  {
    number: 3,
    title: "Pricing",
  },
  {
    number: 4,
    title: "Publish",
  },
];

const CreateCourseWizard = ({
  currentStep,
  steps = defaultSteps,
  children,
}: Props) => {
  return (
    <div className="w-full">
      {/* STEPS */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex min-w-max items-center">
          {steps.map((step, index) => {
            const completed = currentStep > step.number;
            const active = currentStep === step.number;

            return (
              <div key={step.number} className="flex items-center">
                {/* STEP */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-full border-2 text-sm font-bold transition-all
                      ${
                        completed
                          ? "border-primary bg-primary text-primary-foreground"
                          : active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }
                    `}
                  >
                    {completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>

                  <div className="hidden sm:block">
                    <p
                      className={`text-sm font-semibold ${
                        active || completed
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>

                {/* CONNECTOR */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      mx-4 h-[2px] w-10 sm:w-16 md:w-24 transition-colors
                      ${
                        completed
                          ? "bg-primary"
                          : "bg-muted-foreground/20"
                      }
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      {children && (
        <div className="rounded-2xl border bg-background p-6 shadow-sm md:p-8">
          {children}
        </div>
      )}
    </div>
  );
};

export default CreateCourseWizard;