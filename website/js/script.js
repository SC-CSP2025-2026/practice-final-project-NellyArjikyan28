let calorieHistory = [];

const calculateBtn = document.querySelector("#calculate-btn");
const resultDiv = document.querySelector("#result");

const loadCaloriesByActivity = (activity) => {
  if (!activity) {
    alert("Please enter an activity");
    return;
  }

  const url = `https://student-api-proxy.onrender.com/api/calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${activity}`;

  const options = {
    method: "GET",
    headers: {
      "X-API-Key":
        "12aacd9450f7c18f63bfe35e14b826df779dcfcdbfa9a4c45777513fd8ff059a",
    },
  };

  resultDiv.innerHTML = "Loading...";

  fetch(url, options)
    .then((response) =>
      response.json().then((result) => {
        const data = result.data || result;

        if (!data || data.length === 0) {
          resultDiv.innerHTML = "No results found.";
          return;
        }

        calorieHistory.push(data[0]);

        resultDiv.innerHTML =
          `<strong>${data[0].name}</strong><br>` +
          `Calories burned per hour: ${data[0].calories_per_hour}`;
      }),
    )
    .catch((error) => {
      console.log(error);
      resultDiv.innerHTML = "Error loading data.";
    });
};

calculateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const activity = document.querySelector("#activity-input").value.trim();
  loadCaloriesByActivity(activity);
});
