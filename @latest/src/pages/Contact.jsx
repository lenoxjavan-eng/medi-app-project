const contacts = [
  {
    label: 'Email',
    value: 'care@medicarehospital.com',
    href: 'mailto:care@medicarehospital.com',
  },
  {
    label: 'WhatsApp',
    value: '+254 700 000 000',
    href: 'https://wa.me/254700000000',
  },
  {
    label: 'Instagram',
    value: '@medicarehospital',
    href: 'https://instagram.com/medicarehospital',
  },
  {
    label: 'Twitter',
    value: '@MediCareHospital',
    href: 'https://twitter.com/MediCareHospital',
  },
]

function Contact() {
  return (
    <section className="contact-page" id="contact">
      <div className="contact-header">
        <p className="eyebrow">Contact us</p>
        <h1>Reach MediCare Hospital</h1>
        <p>
          Our team is available for appointment questions, consultation follow-up,
          and general patient support.
        </p>
      </div>

      <div className="contact-grid">
        {contacts.map((contact) => (
          <a className="contact-card" href={contact.href} key={contact.label}>
            <span>{contact.label}</span>
            <strong>{contact.value}</strong>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
