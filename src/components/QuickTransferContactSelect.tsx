import { DSelect } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import type { Contact } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getContacts, getSelectedContact } from '../store/selectors';
import { setSelectedContact } from '../store/slice';

import QuickTransferContactSelectOption from './QuickTransferContactSelectOption';
import QuickTransferContactSelectValue from './QuickTransferContactSelectValue';

export default function QuickTransferContactSelect() {
  const { t } = useTranslation();
  const contacts = useAppSelector(getContacts);
  const selectedContact = useAppSelector(getSelectedContact);
  const dispatch = useAppDispatch();

  if (!selectedContact) {
    return null;
  }

  return (
    <DSelect
      id="selectAccountFrom"
      label={t('transfer.target')}
      getOptionLabel={({ name }) => name}
      getOptionValue={({ id }) => id}
      options={contacts}
      value={selectedContact}
      onChange={(contact) => dispatch(setSelectedContact(contact as Contact))}
      classNames={{ menu: () => 'mt-2' }}
      searchable={false}
      components={{
        SingleValue: QuickTransferContactSelectValue,
        Option: QuickTransferContactSelectOption,
      }}
    />
  );
}
