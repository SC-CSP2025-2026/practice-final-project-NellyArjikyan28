let calorieHistory = [];

const calculateBtn = document.querySelector("#calculate-btn");
const resultDiv = document.querySelector("#result");
const listGroup = document.querySelector(".list-group");

async function getCalories() {
  const activity = document.querySelector("#activity-input").value.trim();

  if (activity === "") {
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

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    const data = json.data;

    if (!data || data.length === 0) {
      resultDiv.innerHTML = "No results found.";
      return;
    }

    calorieHistory.push(data[0]);

    resultDiv.innerHTML =
      "<strong>" +
      data[0].name +
      "</strong> burns <strong>" +
      data[0].calories_per_hour +
      "</strong> calories per hour.";

    listGroup.innerHTML = "";
    for (let i = 0; i < calorieHistory.length; i++) {
      listGroup.innerHTML +=
        "<li class='list-group-item'>" +
        calorieHistory[i].name +
        " - " +
        calorieHistory[i].calories_per_hour +
        " cal/hr</li>";
    }
  } catch (error) {
    console.log(error);
    resultDiv.innerHTML = "Error loading data.";
  }
}

calculateBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getCalories();
});
