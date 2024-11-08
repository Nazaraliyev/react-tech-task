import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useCreditDataContext } from '../context/data';
import { CreditDataType } from '../types';
import { RootState } from '@/store';
import { useParams } from 'react-router-dom';
import { CreditType } from '@/types/credit';
import dayjs from 'dayjs';
import { addCredit } from '@/store/slices/credits';
import { updateCustomer } from '@/store/slices/customers';

const useCreditCreator = () => {
  // Store
  const { data, onClose } = useCreditDataContext();
  const { fullName } = useSelector((state: RootState) => state.user);

  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const create = (reason: string | null = null) => {
    const credit = createCredit({ ...data, reason, creator: fullName! });
    const { experience } = data || {};

    dispatch(addCredit(credit));
    dispatch(updateCustomer({ job: experience, fin: id }));

    enqueueSnackbar(`Credit ${data.status === 'declined' ? 'declined' : 'confirmed'} successfully`, { variant: 'success' });
    onClose();
  };

  return { create };
};

export default useCreditCreator;

const createCredit = (data: CreditDataType & { reason: string | null; creator: string }): CreditType => ({
  customer: data.customer?.fin!,
  guarantors: data.guarantors,
  currency: data.amount.currency,
  amount: data.amount.amount,
  goal: data.amount.goal,
  duration: data.amount.duration,
  interest: data.amount.interest,
  status: data.status === 'pending' ? 'approved' : 'declined',
  declineReason: data.reason,
  statusUpdatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  createdBy: data.creator,
});
