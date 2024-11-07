import { RegisterOptions } from 'react-hook-form';

interface ItemType {
  title: string;
  children: {
    name: string;
    label: string;
    component: string;
    isFull?: boolean;
    rules?: RegisterOptions;
  }[];
}

export const customerFields: ItemType[] = [
  {
    title: 'ID Card Information',
    children: [
      {
        name: 'firstName',
        label: 'First Name',
        component: 'input',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        component: 'input',
      },
      {
        name: 'fatherName',
        label: ' Father’s Name',
        component: 'input',
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        component: 'date',
      },
      {
        name: 'fin',
        label: 'FIN Code',
        component: 'input',
      },
      {
        name: 'serial',
        label: 'Serial Number',
        component: 'input',
      },
    ],
  },
  {
    title: 'Address',
    children: [
      {
        name: 'registrationAddress',
        label: 'Registration address',
        component: 'input',
        isFull: true,
      },
      {
        name: 'actualAddress',
        label: 'Actual address',
        component: 'input',
        isFull: true,
      },
    ],
  },
  {
    title: 'Contact',
    children: [
      {
        name: 'phone',
        label: 'Phone number',
        component: 'input',
      },
      {
        name: 'email',
        label: 'Email address',
        component: 'input',
      },
    ],
  },
];

export const customerJobFields = [
  {
    name: 'jobTitle',
    label: 'Job title',
    component: 'input',
  },
  {
    name: 'company',
    label: 'Company name',
    component: 'input',
  },
  {
    name: 'region',
    label: 'Region',
    component: 'input',
  },
  {
    name: 'salary',
    label: 'Salary',
    component: 'input',
  },
  {
    name: 'experienceYears',
    label: 'Years of experience',
    component: 'input',
  },
  {
    name: 'experienceMonths',
    label: 'Months of experience',
    component: 'input',
  }
];
