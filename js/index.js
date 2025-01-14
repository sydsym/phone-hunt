const searchBtn = document.getElementById("search-btn");

const toggleSpinner = (isLoading) => {
  if (isLoading) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};

const handleSearch = async () => {
  toggleSpinner(true);
  const searchText = document.getElementById("search-box").value;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const json = await response.json();
  const data = json.data;
  let filtered;

  if (data.length > 12) {
    filtered = data.splice(0, 12);
  } else {
    filtered = data;
  }
  const phoneContainer = document.getElementById("phone-container");

  filtered.forEach((phone) => {
    phoneContainer.innerHTML += `
        <div class="border-gray-400 rounded-xl shadow-md p-5 text-center space-y-3" >
            <img
              src="${phone.image}"
              class="w-full block m-auto p-20 rounded-xl bg-[#0d6dfd11]"
              alt="${phone?.phone_name}"
            />
            <h3 class="text-4xl font-bold">${phone?.phone_name}</h3>
            <p class="text-gray-400">
              There are many variations of passages of available, but the
              majority have suffered
            </p>
            <p class="text-2xl font-bold">$999</p>
            <button class="btn btn-primary">Show Details</button>
        </div>
    `;
  });
  toggleSpinner(false);
};

searchBtn.addEventListener("click", handleSearch);
