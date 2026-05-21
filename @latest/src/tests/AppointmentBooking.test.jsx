import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AppointmentBooking from '../components/AppointmentBooking'

const selectedService = {
  id: 'cardiology',
  name: 'Cardiology',
  priceUsd: 45,
  priceKsh: 5850,
}

const completeAppointment = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+254700000000',
  department: 'Cardiology',
  doctor: '',
  appointmentDate: '2026-06-15',
  appointmentTime: '10:30',
}

afterEach(() => {
  cleanup()
})

describe('AppointmentBooking', () => {
  it('shows an error when required appointment fields are missing', () => {
    render(
      <AppointmentBooking
        appointment={{ ...completeAppointment, fullName: '' }}
        paymentReceipt={{ id: 'MPESA-123' }}
        selectedService={selectedService}
        onAppointmentChange={vi.fn()}
        onBookAppointment={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }))

    expect(
      screen.getByText(/please complete all required appointment details/i),
    ).toBeTruthy()
  })

  it('requires consultation payment before booking', () => {
    render(
      <AppointmentBooking
        appointment={completeAppointment}
        paymentReceipt={null}
        selectedService={selectedService}
        onAppointmentChange={vi.fn()}
        onBookAppointment={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }))

    expect(
      screen.getByText(/please pay the consultation fee before booking/i),
    ).toBeTruthy()
  })

  it('submits a complete paid appointment', () => {
    const onBookAppointment = vi.fn()

    render(
      <AppointmentBooking
        appointment={completeAppointment}
        paymentReceipt={{ id: 'MPESA-123' }}
        selectedService={selectedService}
        onAppointmentChange={vi.fn()}
        onBookAppointment={onBookAppointment}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }))

    expect(onBookAppointment).toHaveBeenCalledTimes(1)
  })
})
