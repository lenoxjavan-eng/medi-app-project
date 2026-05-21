import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ConsultationServices from '../components/ConsultationServices'
import { payConsultationFee } from '../services/paymentApi'

vi.mock('../services/paymentApi', () => ({
  paymentMethods: [
    { id: 'mpesa', label: 'M-Pesa', helper: 'STK push to patient phone' },
    { id: 'paypal', label: 'PayPal', helper: 'Pay with PayPal account' },
    { id: 'visa', label: 'Visa Card', helper: 'Pay using card details' },
  ],
  payConsultationFee: vi.fn(async ({ service, method, payer }) => ({
    id: 'MPESA-TEST-123',
    status: 'paid',
    provider: method === 'mpesa' ? 'M-Pesa' : method,
    amountUsd: service.priceUsd,
    amountKsh: service.priceKsh,
    serviceName: service.name,
    paidBy: payer.fullName,
  })),
}))

const services = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    description: 'Primary consultation and diagnosis.',
    priceUsd: 20,
    priceKsh: 2600,
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    description: 'Heart health review.',
    priceUsd: 45,
    priceKsh: 5850,
  },
]

const payer = {
  fullName: 'Jane Doe',
  phone: '+254700000000',
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('ConsultationServices', () => {
  it('lets the patient select a service card', () => {
    const onSelectService = vi.fn()

    render(
      <ConsultationServices
        payer={payer}
        paymentReceipt={null}
        selectedService={services[0]}
        services={services}
        onPaymentSuccess={vi.fn()}
        onSelectService={onSelectService}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /cardiology/i }))

    expect(onSelectService).toHaveBeenCalledWith(services[1])
  })

  it('processes consultation payment and returns a receipt', async () => {
    const onPaymentSuccess = vi.fn()

    render(
      <ConsultationServices
        payer={payer}
        paymentReceipt={null}
        selectedService={services[0]}
        services={services}
        onPaymentSuccess={onPaymentSuccess}
        onSelectService={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /pay consultation fee/i }))

    await waitFor(() => {
      expect(payConsultationFee).toHaveBeenCalledWith({
        service: services[0],
        method: 'mpesa',
        payer,
      })
      expect(onPaymentSuccess).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'MPESA-TEST-123' }),
      )
    })
  })

  it('shows an existing payment receipt', () => {
    render(
      <ConsultationServices
        payer={payer}
        paymentReceipt={{ provider: 'M-Pesa', id: 'MPESA-PAID-1' }}
        selectedService={services[0]}
        services={services}
        onPaymentSuccess={vi.fn()}
        onSelectService={vi.fn()}
      />,
    )

    expect(screen.getByText(/receipt: MPESA-PAID-1/i)).toBeTruthy()
  })
})
