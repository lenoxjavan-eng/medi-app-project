const departments = [
  {
    name: 'General Medicine',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    expertise:
      'First-contact care for common illnesses, checkups, diagnosis, prescriptions, and long-term health guidance.',
    services: ['General consultation', 'Lab referrals', 'Follow-up care'],
  },
  {
    name: 'Cardiology',
    image:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80',
    expertise:
      'Heart and circulation care for chest pain, blood pressure, palpitations, and preventive cardiac screening.',
    services: ['Blood pressure care', 'Heart review', 'Cardiac risk checks'],
  },
  {
    name: 'Neurology',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Brain_scan_%2815962375199%29.jpg/960px-Brain_scan_%2815962375199%29.jpg',
    expertise:
      'Specialist support for headaches, seizures, dizziness, nerve pain, weakness, and memory concerns.',
    services: ['Headache review', 'Nerve assessment', 'Seizure consultation'],
  },
  {
    name: 'Pediatrics',
    image:
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=900&q=80',
    expertise:
      'Child-focused care for growth, fever, nutrition, immunization guidance, and childhood illnesses.',
    services: ['Child wellness', 'Fever care', 'Growth checks'],
  },
  {
    name: 'Dermatology',
    image:
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=80',
    expertise:
      'Skin, hair, nail, allergy, acne, rash, and infection consultations with practical treatment plans.',
    services: ['Skin review', 'Acne care', 'Allergy consultation'],
  },
  {
    name: 'Orthopedics',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    expertise:
      'Bone, joint, back pain, sports injury, fracture review, and mobility-focused treatment support.',
    services: ['Joint pain care', 'Injury review', 'Back pain consultation'],
  },
]

function Department() {
  return (
    <section className="department-page">
      <div className="department-header">
        <p className="eyebrow">Hospital expertise</p>
        <h1>Departments and specialist fields</h1>
        <p>
          MediCare Hospital brings together experienced clinicians across key
          medical departments, helping patients receive focused care from the
          right team.
        </p>
      </div>

      <div className="department-grid">
        {departments.map((department) => (
          <article className="department-card" key={department.name}>
            <img src={department.image} alt={`${department.name} department`} />
            <div className="department-card-body">
              <h2>{department.name}</h2>
              <p>{department.expertise}</p>
              <div className="department-tags">
                {department.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Department
