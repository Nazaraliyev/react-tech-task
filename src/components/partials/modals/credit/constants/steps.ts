import CreditExperience from "../components/experience";
import CreditAmount from "../components/amount";
import CreditGuarantor from "../components/guarantors";
import CreditCalculator from "../components/calculator";
import CreditComplete from "../components/complete";

export const steps = [
    {
      label: 'Experience',
      component: CreditExperience,
    },
    {
      label: 'Credit',
      component: CreditAmount,
    },
    {
      label: 'Guarantor',
      component: CreditGuarantor,
    },
    {
      label: 'Calculator',
      component: CreditCalculator,
    },
    {
      label: 'Confirmation',
      component: CreditComplete,
    },
  ];