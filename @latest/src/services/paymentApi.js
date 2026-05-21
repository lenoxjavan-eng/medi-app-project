const paymentLabels = {
  mpesa: 'M-Pesa',
  paypal: 'PayPal',
  visa: 'Visa Card',
}

function createReference(method) {
  const timestamp = Date.now().toString(36).toUpperCase()
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `${method.toUpperCase()}-${timestamp}-${randomCode}`
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

export async function payConsultationFee({ service, method, payer }) {
  if (!service || !method || !payer?.fullName || !payer?.phone) {
    throw new Error('Payment needs a selected service, payment method, name, and phone.')
  }

  await wait(650)

  return {
    id: createReference(method),
    status: 'paid',
    provider: paymentLabels[method],
    amountUsd: service.priceUsd,
    amountKsh: service.priceKsh,
    serviceId: service.id,
    serviceName: service.name,
    paidBy: payer.fullName,
    paidAt: new Date().toISOString(),
  }
}

export const paymentMethods = [
  { id: 'mpesa', label: 'M-Pesa', helper: 'STK push to patient phone' },
  { id: 'paypal', label: 'PayPal', helper: 'Pay with PayPal account' },
  { id: 'visa', label: 'Visa Card', helper: 'Pay using card details' },
]
