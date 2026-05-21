function Home() {
  return (
    <section className="home-page" id="home">
      <header className="home-hero">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            MediCare Hospital
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
            Welcome to MediCare Hospital
          </h1>
          <p className="home-intro">
            We provide patient-centered medical care with online appointments,
            advance consultation payment, and a simple way to share symptoms
            before your visit.
          </p>
        </div>

      </header>

      <div className="home-info-grid">
        <article className="home-info-card">
          <p className="eyebrow">About us</p>
          <h2>Quality care for families and individuals.</h2>
          <p>
            MediCare Hospital supports patients with preventive care, diagnosis,
            specialist consultations, follow-up visits, and coordinated treatment
            plans. Our goal is to make healthcare easier to access, understand,
            and manage.
          </p>
        </article>

        <article className="home-info-card">
          <p className="eyebrow">Location</p>
          <h2>Ngong Lane Plaza, Ngong Road</h2>
          <p>
            Visit us at Ngong Lane Plaza along Ngong Road. Patients can book
            appointments online before arrival to reduce waiting time and help
            the care team prepare.
          </p>
        </article>
      </div>

      <section className="home-services">
        <div className="services-heading">
          <p className="eyebrow">Services offered</p>
          <h2>Care across major departments</h2>
        </div>

        <div className="home-service-list">
          <span>General Medicine</span>
          <span>Cardiology</span>
          <span>Neurology</span>
          <span>Pediatrics</span>
          <span>Dermatology</span>
          <span>Orthopedics</span>
        </div>
      </section>
    </section>
  )
}

export default Home
