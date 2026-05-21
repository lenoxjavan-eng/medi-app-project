import AppointmentBooking from '../components/AppointmentBooking'
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
    <div id="book-appointment">
      <AppointmentBooking
        appointment={appointment}
        paymentReceipt={paymentReceipt}
        selectedService={selectedService}
        services={services}
        onBookAppointment={onBookAppointment}
        onPaymentSuccess={onPaymentSuccess}
        onSelectService={onSelectService}
      />
    </div>
  )
}

export default BookAppointment
