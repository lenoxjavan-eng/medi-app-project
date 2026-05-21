import { useState } from 'react'

function AppointmentBooking({
  appointment,
  selectedService,
  paymentReceipt,
  onAppointmentChange,
  onBookAppointment,
}) {
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    onAppointmentChange({
      ...appointment,
      [name]: value,
    })
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
    const hasMissingField = requiredFields.some(
      (field) => !appointment[field]?.trim(),
    )

    if (hasMissingField) {
      setError('Please complete all required appointment details.')
      return
    }

    if (!paymentReceipt) {
      setError('Please pay the consultation fee before booking this appointment.')
      return
    }

    setError('')
    onBookAppointment()
  }

  return (
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
            value={appointment.fullName}
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
              value={appointment.email}
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
              value={appointment.phone}
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
              value={appointment.doctor}
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
              value={appointment.appointmentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="appointmentTime">Time</label>
            <input
              id="appointmentTime"
              name="appointmentTime"
              type="time"
              value={appointment.appointmentTime}
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
  )
}

export default AppointmentBooking
