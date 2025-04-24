export const paymentMethodFunction = (type: string) => {
  if (type === 'STRIPE') {
    return 'Stripe'
  } else if (type === 'PAYPAL') {
    return 'PayPal'
  } else if (type === 'CREDIT_CARD') {
    return 'Credit Card'
  }

  return ''
}
