import { useState } from 'react'
import Navbar from './components/Navbar'
import BookAppointment from './pages/BookAppointment'
import Contact from './pages/Contact'
import Home from './pages/Home'
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

        <Home page={page} />

        <BookAppointment
          appointment={appointment}
          page={page}
          patientCase={patientCase}
          paymentReceipt={paymentReceipt}
          selectedService={selectedService}
          services={consultationServices}
          onBack={() => setPage('booking')}
          onBookAppointment={handleAppointmentBooked}
          onPaymentSuccess={setPaymentReceipt}
          onSelectService={handleSelectService}
          onStartOver={handleStartOver}
          onSubmitSymptoms={handleSymptomsSubmitted}
        />

        <Contact />
      </section>
    </main>
  )
}

export default App
