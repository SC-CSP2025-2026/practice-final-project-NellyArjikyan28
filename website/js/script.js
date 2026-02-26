const calculateButton = document.querySelector("#calculate-btn");
const searchInput = document.querySelector("#activity-input");
const activitiesList = document.querySelector(".list-group");

const loadActivitiesbySearch = async (searchTerm) => {
  activitiesList.innerHTML = ""; // clear old results

  const url = `https://student-api-proxy.onrender.com/api/calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${searchTerm}`;

  const options = {
    method: "GET",
    headers: {
      "X-API-Key":
        "12aacd9450f7c18f63bfe35e14b826df779dcfcdbfa9a4c45777513fd8ff059a",
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();

  const activities = result.data;

  if (!activities || activities.length === 0) {
    activitiesList.innerHTML =
      "<li class='list-group-item'>No results found</li>";
    return;
  }

  activities.forEach((activity) => {
    const listItem = `
      <li class="list-group-item">
        <strong>${activity.name}</strong><br>
        Calories burned per hour: ${activity.calories_per_hour}
      </li>
    `;
    activitiesList.insertAdjacentHTML("beforeend", listItem);
  });
};

calculateButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    loadActivitiesbySearch(searchTerm);
  }
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      loadActivitiesbySearch(searchTerm);
    }
  }
});
