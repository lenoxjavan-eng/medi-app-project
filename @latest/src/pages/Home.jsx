function Home({ page }) {
  return (
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
  )
}

export default Home
