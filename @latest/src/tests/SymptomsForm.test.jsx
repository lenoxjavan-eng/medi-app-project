import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SymptomsForm from '../components/SymptomsForm'

const appointment = {
  fullName: 'Jane Doe',
  department: 'Neurology',
  appointmentDate: '2026-06-15',
  appointmentTime: '10:30',
  consultationFee: { usd: 50, ksh: 6500 },
  paymentReceipt: { id: 'MPESA-123' },
}

afterEach(() => {
  cleanup()
})

describe('SymptomsForm', () => {
  it('shows an error when symptom details are missing', () => {
    render(
      <SymptomsForm
        appointment={appointment}
        patientCase={null}
        onBack={vi.fn()}
        onStartOver={vi.fn()}
        onSubmitSymptoms={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /submit symptoms/i }))

    expect(
      screen.getByText(/please add your main symptom and how long/i),
    ).toBeTruthy()
  })

  it('submits completed symptom details', () => {
    const onSubmitSymptoms = vi.fn()

    render(
      <SymptomsForm
        appointment={appointment}
        patientCase={null}
        onBack={vi.fn()}
        onStartOver={vi.fn()}
        onSubmitSymptoms={onSubmitSymptoms}
      />,
    )

    fireEvent.change(screen.getByLabelText(/main symptom/i), {
      target: { value: 'Headache' },
    })
    fireEvent.change(screen.getByLabelText(/how long/i), {
      target: { value: '2 days' },
    })
    fireEvent.change(screen.getByLabelText(/severity/i), {
      target: { value: 'Severe' },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit symptoms/i }))

    expect(onSubmitSymptoms).toHaveBeenCalledWith(
      expect.objectContaining({
        mainSymptom: 'Headache',
        duration: '2 days',
        severity: 'Severe',
      }),
    )
  })

  it('renders the submitted case confirmation', () => {
    render(
      <SymptomsForm
        appointment={appointment}
        patientCase={{
          appointment,
          symptoms: {
            mainSymptom: 'Headache',
            duration: '2 days',
            severity: 'Moderate',
          },
        }}
        onBack={vi.fn()}
        onStartOver={vi.fn()}
        onSubmitSymptoms={vi.fn()}
      />,
    )

    expect(screen.getByText(/thank you, jane doe/i)).toBeTruthy()
    expect(screen.getByText(/payment receipt:/i)).toBeTruthy()
    expect(screen.getByText(/MPESA-123/i)).toBeTruthy()
  })
})
