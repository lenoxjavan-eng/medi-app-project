import { useState } from 'react'

const severityOptions = ['Mild', 'Moderate', 'Severe']

function SymptomsForm({
  appointment,
  patientCase,
  onSubmitSymptoms,
  onBack,
  onStartOver,
}) {
  const [symptoms, setSymptoms] = useState({
    mainSymptom: '',
    duration: '',
    severity: 'Mild',
    notes: '',
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setSymptoms((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!symptoms.mainSymptom.trim() || !symptoms.duration.trim()) {
      setError('Please add your main symptom and how long you have felt it.')
      return
    }

    setError('')
    onSubmitSymptoms(symptoms)
  }

  if (patientCase) {
    return (
      <section className="confirmation-panel">
        <p className="eyebrow">Request submitted</p>
        <h2>Thank you, {patientCase.appointment.fullName}.</h2>
        <p>
          Your appointment for {patientCase.appointment.department} on{' '}
          {patientCase.appointment.appointmentDate} at{' '}
          {patientCase.appointment.appointmentTime} has been saved with your
          symptom description.
        </p>
        <p>
          Consultation fee paid: ${patientCase.appointment.consultationFee.usd} /
          KSh {patientCase.appointment.consultationFee.ksh.toLocaleString()}.
        </p>

        <div className="summary-box">
          <strong>Main symptom:</strong> {patientCase.symptoms.mainSymptom}
          <br />
          <strong>Duration:</strong> {patientCase.symptoms.duration}
          <br />
          <strong>Severity:</strong> {patientCase.symptoms.severity}
          <br />
          <strong>Payment receipt:</strong>{' '}
          {patientCase.appointment.paymentReceipt.id}
        </div>

        <button className="primary-button" type="button" onClick={onStartOver}>
          Book another appointment
        </button>
      </section>
    )
  }

  return (
    <div className="portal-grid">
      <aside className="appointment-summary">
        <p className="eyebrow">Appointment booked</p>
        <h2>{appointment.fullName}</h2>
        <p>{appointment.department}</p>
        <p>
          {appointment.appointmentDate} at {appointment.appointmentTime}
        </p>
        {appointment.consultationFee ? (
          <p>
            Fee: ${appointment.consultationFee.usd} / KSh{' '}
            {appointment.consultationFee.ksh.toLocaleString()}
          </p>
        ) : null}
        {appointment.paymentReceipt ? (
          <p>Receipt: {appointment.paymentReceipt.id}</p>
        ) : null}
        {appointment.doctor ? <p>Doctor: {appointment.doctor}</p> : null}
      </aside>

      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="mainSymptom">Main symptom</label>
          <input
            id="mainSymptom"
            name="mainSymptom"
            type="text"
            value={symptoms.mainSymptom}
            onChange={handleChange}
            placeholder="Headache, fever, chest pain..."
          />
        </div>

        <div className="split-row">
          <div className="form-row">
            <label htmlFor="duration">How long?</label>
            <input
              id="duration"
              name="duration"
              type="text"
              value={symptoms.duration}
              onChange={handleChange}
              placeholder="2 days"
            />
          </div>

          <div className="form-row">
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              name="severity"
              value={symptoms.severity}
              onChange={handleChange}
            >
              {severityOptions.map((severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="notes">Additional details</label>
          <textarea
            id="notes"
            name="notes"
            value={symptoms.notes}
            onChange={handleChange}
            placeholder="Describe what you are feeling, medicines taken, allergies, or anything important."
            rows="5"
          />
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="button-row">
          <button className="secondary-button" type="button" onClick={onBack}>
            Back
          </button>
          <button className="primary-button" type="submit">
            Submit symptoms
          </button>
        </div>
      </form>
    </div>
  )
}

export default SymptomsForm
