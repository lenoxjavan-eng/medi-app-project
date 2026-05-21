import { useState } from 'react'
import { paymentMethods, payConsultationFee } from '../services/paymentApi'

function ConsultationServices({
  services,
  selectedService,
  payer,
  paymentReceipt,
  onSelectService,
  onPaymentSuccess,
}) {
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [isPaying, setIsPaying] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  async function handlePay() {
    try {
      setIsPaying(true)
      setPaymentError('')
      const receipt = await payConsultationFee({
        service: selectedService,
        method: paymentMethod,
        payer,
      })
      onPaymentSuccess(receipt)
    } catch (error) {
      setPaymentError(error.message)
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <section className="services-section" id="departments">
      <div className="services-heading">
        <p className="eyebrow">Consultation fees</p>
        <h2>Select a service and pay in advance</h2>
      </div>

      <div className="service-card-grid">
        {services.map((service) => (
          <button
            className={
              selectedService.id === service.id
                ? 'service-card service-card-active'
                : 'service-card'
            }
            key={service.id}
            type="button"
            onClick={() => onSelectService(service)}
          >
            <span>{service.name}</span>
            <strong>
              ${service.priceUsd} / KSh {service.priceKsh.toLocaleString()}
            </strong>
            <small>{service.description}</small>
          </button>
        ))}
      </div>

      <div className="payment-panel">
        <div>
          <p className="eyebrow">Advance payment</p>
          <h3>{selectedService.name}</h3>
          <p>
            Pay ${selectedService.priceUsd} or KSh{' '}
            {selectedService.priceKsh.toLocaleString()} before confirming the
            appointment.
          </p>
        </div>

        <div className="payment-methods" role="radiogroup" aria-label="Payment method">
          {paymentMethods.map((method) => (
            <label
              className={
                paymentMethod === method.id
                  ? 'payment-method payment-method-active'
                  : 'payment-method'
              }
              key={method.id}
            >
              <input
                checked={paymentMethod === method.id}
                name="paymentMethod"
                type="radio"
                value={method.id}
                onChange={() => setPaymentMethod(method.id)}
              />
              <span>{method.label}</span>
              <small>{method.helper}</small>
            </label>
          ))}
        </div>

        {paymentReceipt ? (
          <p className="payment-success">
            Paid with {paymentReceipt.provider}. Receipt: {paymentReceipt.id}
          </p>
        ) : (
          <button
            className="primary-button"
            disabled={isPaying}
            type="button"
            onClick={handlePay}
          >
            {isPaying ? 'Processing payment...' : 'Pay consultation fee'}
          </button>
        )}

        {paymentError ? <p className="form-error">{paymentError}</p> : null}
      </div>
    </section>
  )
}

export default ConsultationServices
