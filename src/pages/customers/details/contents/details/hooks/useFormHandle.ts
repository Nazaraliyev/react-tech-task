import { updateCustomer } from '@/store/slices/customers';
import { customerFields, customerJobFields } from '@/utils/constants/customer';
import { useDelay } from '@/utils/hooks';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const useFormHandle = (data: any) => {
  // Hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { getDelay, delaying } = useDelay();
  const { control: controlInfo, reset: resetInfo, trigger: triggerInfo, getValues: getInfoValues } = useForm({ defaultValues: generateInfoValues(data) }); // prettier-ignore
  const { control: controlExperience, reset: resetExperience, trigger: triggerExperience, getValues: getExperienceValues } = useForm({ values: generateExperienceValue(data) }); // prettier-ignore

  // Effects
  React.useEffect(() => {
    if (data) {
      resetInfo(generateInfoValues(data));
      resetExperience(generateExperienceValue(data?.job));
    }
  }, [data]);

  // Functions
  const onSubmit = async () => {
    const isValidInfo = await triggerInfo();
    const isValidExperience = await triggerExperience();

    if (!isValidInfo || !isValidExperience) return;

    const dataInfo: any = getInfoValues();
    const dataExperience: any = getExperienceValues();

    getDelay(() => {
      dispatch(updateCustomer({ fin: data?.fin, personal: dataInfo, job: dataExperience }));
      enqueueSnackbar('Customer updated successfully', { variant: 'success' });
    });
  };

  return { onSubmit, loading: delaying, controlInfo, controlExperience };
};

export default useFormHandle;

const generateExperienceValue = (data: any) => customerJobFields.reduce((acc, curr) => ({ ...acc, [curr?.name]: data?.[curr.name] }), {});
const generateInfoValues = (data: any) => {
  const fields = customerFields.flatMap((item) => item.children);
  return fields.reduce((acc, curr) => ({ ...acc, [curr.name]: data?.[curr.name] || '' }), {} as any);
};

