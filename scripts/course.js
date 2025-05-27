const courses = [
    { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming With Functions", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming With Classes", credits: 2, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Front-End Dev", credits: 2, completed: false }
  ];
  
  const container = document.getElementById("course-container");
  const totalEl = document.getElementById("totalCredits");
  
  function renderCourses(filter) {
    let filtered = courses;
    if (filter !== "all") {
      filtered = courses.filter(c => c.code.startsWith(filter));
    }
  
    container.innerHTML = "";
    let total = 0;
  
    filtered.forEach(course => {
      const div = document.createElement("div");
      div.className = `course ${course.completed ? "completed" : "incomplete"}`;
      div.textContent = `${course.code}: ${course.name}`;
      container.appendChild(div);
      total += course.credits;
    });
  
    totalEl.textContent = total;
  }

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      renderCourses(btn.dataset.filter);
    });
  });
  
  renderCourses("all");
  
  
  function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();
    
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });
  }

  
  courseDiv.addEventListener('click', () => {
        displayCourseDetails(course);
      });