import type { ContactsData } from '../types';
import { useData } from './useData';

export function useContacts() {
  return useData<ContactsData>('/data/contacts.json');
}