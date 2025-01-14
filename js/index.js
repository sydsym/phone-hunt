const searchBtn = document.getElementById("search-btn");
const phoneContainer = document.getElementById("phone-container");

const showPhone = (phones) => {
  let filtered;

  if (!phones.length) {
    phoneContainer.innerHTML += `<p class="text-red-500 text-center col-span-3 text-xl mb-5">No results found with your keywords or Network Error. Try Again...!!</p>`;
    toggleSpinner(false);
    return;
  }
  if (phones.length > 12) {
    filtered = phones.splice(0, 12);
  } else {
    filtered = phones;
  }

  filtered.forEach((phone) => {
    const showPhone = `
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
    phoneContainer.innerHTML += showPhone;
  });
};

const toggleSpinner = (isLoading) => {
  if (isLoading) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadData = (data) => {
  const phones = data.data;
  toggleSpinner(false);
  showPhone(phones);
};

const fetchData = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  loadData(data);
};

const handleSearch = () => {
  phoneContainer.textContent = "";
  toggleSpinner(true);
  const searchText = document.getElementById("search-box").value;
  fetchData(searchText);
};

searchBtn.addEventListener("click", handleSearch);
