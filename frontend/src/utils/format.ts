import { CURRENCIES, CurrencyCode } from '../types';

export const formatPrice = (priceInUsd: number, currency: CurrencyCode = 'USD'): string => {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = priceInUsd * config.rate;
  if (currency === 'INR') {
    return `${config.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toFixed(2)}`;
};
