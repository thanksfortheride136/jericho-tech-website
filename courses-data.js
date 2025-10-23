// courses-data.js
// Expose COURSES globally so both pages can use it.
window.COURSES = [
  {
    title: "Robotics 3",
    slug: "robotics-3",        // must be unique (or generate from title)
    cat: "robot",
    img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    text: "Design process, rapid prototyping, CAD fundamentals, laser cutting, and 3D printing.",
    long: `
      <p>In Robotics 3 students learn the engineering design process through quick-build
      mechanisms and rapid prototyping. We cover CAD basics, laser safety, and 3D printing
      workflows, then finish with a mini design challenge.</p>
      <ul>
        <li>Unit 1: Design process + sketching</li>
        <li>Unit 2: CAD & laser cutting</li>
        <li>Unit 3: 3D printing & iteration</li>
      </ul>
    `,
    syllabus: "files/robotics3-syllabus.pdf",
    supplies: "files/robotics3-supplies.pdf",
    projects: [
      { src: "https://images.unsplash.com/photo-1553028826-ccdfc006d9b5?q=80&w=800&auto=format&fit=crop", alt: "Laser-cut chassis" },
      { src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop", alt: "Mechanism prototype" },
      { src: "https://images.unsplash.com/photo-1581091215367-59ab6dcef1b1?q=80&w=800&auto=format&fit=crop", alt: "3D print iteration" }
    ]
  },

  // …repeat for other courses…
];
