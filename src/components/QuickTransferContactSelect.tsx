import { useTranslation } from 'react-i18next';
import { DPopover, DQuickActionButton } from '@dynamic-framework/ui-react';

import { useState } from 'react';

import type { Contact } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getContacts, getSelectedContact } from '../store/selectors';
import { setSelectedContact } from '../store/slice';

export default function QuickTransferContactSelect() {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const contacts = useAppSelector(getContacts);
  const selectedContact = useAppSelector(getSelectedContact);
  const dispatch = useAppDispatch();

  const handleSelect = (contact: Contact) => {
    setToggle(false);
    dispatch(setSelectedContact(contact));
  };

  if (!selectedContact) {
    return null;
  }

  return (
    <div className="d-flex flex-column gap-2">
      <small className="fw-bold text-gray-500 px-2 d-inline-flex">{t('transfer.target')}</small>
      <div className="contact-selector">
        <DPopover
          isOpen={toggle}
          setEventIsOpen={setToggle}
          adjustContentToRender
          renderComponent={() => (
            <DQuickActionButton
              line1={selectedContact.name}
              line2={`${selectedContact.bank} ${selectedContact.accountNumber.slice(-3)}`}
              representativeImage={selectedContact.image}
              actionIcon={toggle ? 'chevron-up' : 'chevron-down'}
            />
          )}
        >
          <div className="rounded overflow-hidden drop-contact">
            {contacts.map((contact: Contact) => (
              <DQuickActionButton
                key={contact.id}
                line1={contact.name}
                line2={`${contact.bank} ${contact.accountNumber.slice(-3)}`}
                className={selectedContact?.id === contact.id ? 'selected' : undefined}
                representativeImage={contact.image}
                onClick={() => handleSelect(contact)}
              />
            ))}
          </div>
        </DPopover>
      </div>
    </div>
  );
}
