import React from 'react';
import { useCreditDataContext } from '../context/data';
import dayjs from 'dayjs';
import { CreditTable } from '@/components/partials';

const CreditCalculator = () => {
  // Store
  const { data, onChange } = useCreditDataContext();

  // Memos
  const table = React.useMemo(() => {
    if(!!data.calendar.length) return data.calendar;
    else {
      const table = generate(data.amount);
      onChange('calendar', table);
      return table;
    }
  }, [data.amount, data.calendar]);

  return <CreditTable {...{ data: table, currency: data.amount.currency, interest: data.amount.interest, duration: data.amount.duration }} />;
};

export default CreditCalculator;

const generate = (data: any) => {
  const monthlyInterest = data.interest / 100 / 12;
  const monthlyAmount = (data.amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -data.duration));
  const totalAmount = monthlyAmount * data.duration;

  const table = [];
  const date = dayjs();
  for (let i = 1; i <= data.duration; i++) {
    table.push({
      month: date.add(i, 'month').format('MMMM'),
      amount: monthlyAmount.toFixed(1),
      remaining: (totalAmount - monthlyAmount * i).toFixed(2),
    });
  }

  return table;
};
