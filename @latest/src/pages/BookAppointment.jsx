import { useState } from 'react'
import AppointmentBooking from '../components/AppointmentBooking'
import ConsultationServices from '../components/ConsultationServices'
import SymptomsForm from '../components/SymptomsForm'

function BookAppointment({
  appointment,
  page,
  patientCase,
  paymentReceipt,
  selectedService,
  services,
  onBack,
  onBookAppointment,
  onPaymentSuccess,
  onSelectService,
  onStartOver,
  onSubmitSymptoms,
}) {
  const [draftAppointment, setDraftAppointment] = useState({
    ...appointment,
    department: selectedService.name,
  })

  function handleSelectService(service) {
    setDraftAppointment((current) => ({
      ...current,
      department: service.name,
    }))
    onSelectService(service)
  }

  function handleBookAppointment() {
    onBookAppointment({
      ...draftAppointment,
      department: selectedService.name,
    })
  }

  if (page === 'symptoms') {
    return (
      <SymptomsForm
        appointment={appointment}
        patientCase={patientCase}
        onBack={onBack}
        onStartOver={onStartOver}
        onSubmitSymptoms={onSubmitSymptoms}
      />
    )
  }

  return (
    <div className="booking-stack" id="book-appointment">
      <ConsultationServices
        payer={draftAppointment}
        paymentReceipt={paymentReceipt}
        selectedService={selectedService}
        services={services}
        onPaymentSuccess={onPaymentSuccess}
        onSelectService={handleSelectService}
      />

      <AppointmentBooking
        appointment={draftAppointment}
        paymentReceipt={paymentReceipt}
        selectedService={selectedService}
        onAppointmentChange={setDraftAppointment}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  )
}

export default BookAppointment
