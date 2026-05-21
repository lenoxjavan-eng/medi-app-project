import { useState } from 'react'
import AppointmentBooking from './components/AppointmentBooking'
import Navbar from './components/Navbar'
import SymptomsForm from './components/SymptomsForm'
import { consultationServices } from './services/serviceCatalog'

const initialAppointment = {
  fullName: '',
  email: '',
  phone: '',
  department: 'General Medicine',
  doctor: '',
  appointmentDate: '',
  appointmentTime: '',
}

function App() {
  const [page, setPage] = useState('booking')
  const [appointment, setAppointment] = useState(initialAppointment)
  const [patientCase, setPatientCase] = useState(null)
  const [selectedService, setSelectedService] = useState(consultationServices[0])
  const [paymentReceipt, setPaymentReceipt] = useState(null)

  function handleAppointmentBooked(bookingDetails) {
    setAppointment({
      ...bookingDetails,
      department: selectedService.name,
      consultationFee: {
        usd: selectedService.priceUsd,
        ksh: selectedService.priceKsh,
      },
      paymentReceipt,
    })
    setPage('symptoms')
  }

  function handleSelectService(service) {
    setSelectedService(service)
    setPaymentReceipt(null)
  }

  function handleSymptomsSubmitted(symptomDetails) {
    setPatientCase({
      appointment,
      symptoms: symptomDetails,
      submittedAt: new Date().toISOString(),
    })
  }

  function handleStartOver() {
    setAppointment(initialAppointment)
    setPatientCase(null)
    setSelectedService(consultationServices[0])
    setPaymentReceipt(null)
    setPage('booking')
  }

  function handleLogout() {
    handleStartOver()
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 md:px-8">
        <Navbar userName={appointment.fullName || 'Patient'} onLogout={handleLogout} />

        <header
          id="home"
          className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 text-left md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              MediCare Hospital
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
              Patient appointment portal
            </h1>
          </div>
          <div className="flex gap-2 text-sm font-medium">
            <span className={page === 'booking' ? 'step step-active' : 'step'}>
              1. Booking
            </span>
            <span className={page === 'symptoms' ? 'step step-active' : 'step'}>
              2. Symptoms
            </span>
          </div>
        </header>

        {page === 'booking' ? (
          <div id="book-appointment">
            <AppointmentBooking
              appointment={appointment}
              services={consultationServices}
              selectedService={selectedService}
              paymentReceipt={paymentReceipt}
              onBookAppointment={handleAppointmentBooked}
              onPaymentSuccess={setPaymentReceipt}
              onSelectService={handleSelectService}
            />
          </div>
        ) : (
          <SymptomsForm
            appointment={appointment}
            patientCase={patientCase}
            onSubmitSymptoms={handleSymptomsSubmitted}
            onBack={() => setPage('booking')}
            onStartOver={handleStartOver}
          />
        )}

        <footer className="contact-footer" id="contact">
          <span>Contact: +254 700 000 000</span>
          <span>Email: care@medicarehospital.com</span>
        </footer>
      </section>
    </main>
  )
}

export default App
