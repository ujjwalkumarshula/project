export interface OnboardingData {
  id: number;
  image: string;
  heading: string;
  subHeading: string;
  buttonText: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    image: require("/assets/onboarding/onboarding1.png"),
    heading: "Easy way to confirm your attendance",
    subHeading:
      "Confirm your attendance effortlessly with a simple click or reply to a meeting invitation.",
    buttonText: "Next",
  },
  {
    id: 2,
    image: require("/assets/onboarding/onboarding2.png"),
    heading: "Disciplinary in your hand",
    subHeading:
      "Handle disciplinary matters efficiently and fairly to maintain a productive work environment.",
    buttonText: "Next",
  },
  {
    id: 3,
    image: require("/assets/onboarding/onboarding1.png"),
    heading: "Reduce the workload of HR Management",
    subHeading:
      "Automate routine tasks and streamline processes to reduce HR Management workload.",
    buttonText: "Login",
  },
];

export default data;
