import ConsultationServices from '../components/ConsultationServices'

function Department({
  appointment,
  paymentReceipt,
  selectedService,
  services,
  onPaymentSuccess,
  onSelectService,
}) {
  return (
    <ConsultationServices
      payer={appointment}
      paymentReceipt={paymentReceipt}
      selectedService={selectedService}
      services={services}
      onPaymentSuccess={onPaymentSuccess}
      onSelectService={onSelectService}
    />
  )
}

export default Department
