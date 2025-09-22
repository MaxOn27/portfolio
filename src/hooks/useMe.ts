import type { MeData } from '../types';
import { useData } from './useData';

export function useMe() {
  return useData<MeData>('/data/me.json');
}