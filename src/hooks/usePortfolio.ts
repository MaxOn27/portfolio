import type { PortfolioData } from '../types';
import { useData } from './useData';

export function usePortfolio() {
  return useData<PortfolioData>('/data/portfolio.json');
}