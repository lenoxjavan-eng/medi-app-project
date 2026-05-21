import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './pages/Auth'
import BookAppointment from './pages/BookAppointment'
import Contact from './pages/Contact'
import Department from './pages/Department'
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
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [page, setPage] = useState('booking')
  const [appointment, setAppointment] = useState(initialAppointment)
  const [patientCase, setPatientCase] = useState(null)
  const [selectedService, setSelectedService] = useState(consultationServices[0])
  const [paymentReceipt, setPaymentReceipt] = useState(null)
  const [bookingSession, setBookingSession] = useState(0)

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
    navigate('/book-appointment')
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
    setBookingSession((current) => current + 1)
    setPage('booking')
    navigate('/book-appointment')
  }

  function resetBooking() {
    setAppointment(initialAppointment)
    setPatientCase(null)
    setSelectedService(consultationServices[0])
    setPaymentReceipt(null)
    setBookingSession((current) => current + 1)
    setPage('booking')
  }

  function handleLogin(email) {
    setUserEmail(email)
    setIsAuthenticated(true)
    navigate('/')
  }

  function handleLogout() {
    resetBooking()
    setUserEmail('')
    setIsAuthenticated(false)
    navigate('/')
  }

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 md:px-8">
        <Navbar
          userName={appointment.fullName || userEmail || 'Patient'}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Department />} />
          <Route
            path="/book-appointment"
            element={
              <BookAppointment
                appointment={appointment}
                key={bookingSession}
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
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </main>
  )
}

export default App
