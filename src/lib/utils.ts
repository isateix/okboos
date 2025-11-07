export const formatPrice = (price: number | null) => {
  if (!price) return 'Kz 0.00';

  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
  }).format(price);
};
