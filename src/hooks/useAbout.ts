import type { AboutData } from '../types';
import { useData } from './useData';

export function useAbout() {
  return useData<AboutData>('/data/about.json');
}