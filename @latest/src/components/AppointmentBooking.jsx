import { useState } from 'react'
import ConsultationServices from './ConsultationServices'

function AppointmentBooking({
  appointment,
  services,
  selectedService,
  paymentReceipt,
  onBookAppointment,
  onPaymentSuccess,
  onSelectService,
}) {
  const [formData, setFormData] = useState({
    ...appointment,
    department: selectedService.name,
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSelectService(service) {
    setFormData((current) => ({
      ...current,
      department: service.name,
    }))
    onSelectService(service)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const requiredFields = [
      'fullName',
      'email',
      'phone',
      'department',
      'appointmentDate',
      'appointmentTime',
    ]
    const hasMissingField = requiredFields.some((field) => !formData[field].trim())

    if (hasMissingField) {
      setError('Please complete all required appointment details.')
      return
    }

    if (!paymentReceipt) {
      setError('Please pay the consultation fee before booking this appointment.')
      return
    }

    setError('')
    onBookAppointment({
      ...formData,
      department: selectedService.name,
    })
  }

  return (
    <div className="booking-stack">
      <ConsultationServices
        payer={formData}
        paymentReceipt={paymentReceipt}
        selectedService={selectedService}
        services={services}
        onPaymentSuccess={onPaymentSuccess}
        onSelectService={handleSelectService}
      />

      <div className="portal-grid">
        <article className="intro-panel">
          <p className="eyebrow">Book care faster</p>
          <h2>Choose your visit details, then tell the care team what you feel.</h2>
          <p>
            Patients first reserve a time with the hospital. After booking, they
            continue to a separate symptoms page so clinicians can prepare before
            the visit.
          </p>
        </article>

        <form className="form-panel" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
          />
        </div>

        <div className="split-row">
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
            />
          </div>
        </div>

        <div className="split-row">
          <div className="form-row">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              readOnly
              type="text"
              value={selectedService.name}
            />
          </div>

          <div className="form-row">
            <label htmlFor="doctor">Preferred doctor</label>
            <input
              id="doctor"
              name="doctor"
              type="text"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="split-row">
          <div className="form-row">
            <label htmlFor="appointmentDate">Date</label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="appointmentTime">Time</label>
            <input
              id="appointmentTime"
              name="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="submit">
          Book appointment
        </button>
        </form>
      </div>
    </div>
  )
}

export default AppointmentBooking
