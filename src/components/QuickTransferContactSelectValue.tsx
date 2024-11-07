/* eslint-disable react/jsx-props-no-spreading */

import { DAvatar } from '@dynamic-framework/ui-react';
import { components, SingleValueProps } from 'react-select';

import { Contact } from '../services/interface';

type Props = SingleValueProps<Contact, false> & {
  data: Contact;
};

const { SingleValue } = components;

export default function QuickTransferContactSelectValue(props: Props) {
  const { data } = props;

  return (
    <SingleValue {...props}>
      <div className="d-flex gap-2 align-items-center">
        <DAvatar
          name={data.name}
          size="sm"
        />
        <p className="m-0 flex-grow-1">
          <span className="d-block m-0">
            {`${data.name} *** ${data.accountNumber.slice(-3)}`}
          </span>
        </p>
      </div>
    </SingleValue>
  );
}
