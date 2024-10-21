/* eslint-disable react/jsx-props-no-spreading */

import { DAvatar } from '@dynamic-framework/ui-react';
import { components, OptionProps } from 'react-select';

import { Contact } from '../services/interface';

type Props = OptionProps<Contact, false> & {
  data: Contact;
};

const { Option } = components;

export default function QuickTransferContactSelectOption(props: Props) {
  const { data } = props;

  return (
    <Option {...props} className="py-2">
      <div className="d-flex gap-2 align-items-center">
        <DAvatar name={data.name} />
        <p className="m-0 flex-grow-1">
          <span className="d-block m-0">
            {data.name}
          </span>
          <span className="d-block m-0 text-gray-500">
            {`*** *** ${data.accountNumber.slice(-3)}`}
          </span>
        </p>
        <span className="text-gray-500">
          {data.bank}
        </span>
      </div>
    </Option>
  );
}
