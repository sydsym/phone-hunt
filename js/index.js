const searchBtn = document.getElementById("search-btn");
const phoneContainer = document.getElementById("phone-container");
const showallBtn = document.getElementById("showall-btn");

const results = (data) => {
  data.forEach((phone) => {
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
            <button class="btn btn-primary" onclick="handleDetails('${phone.slug}'); showDetailsModal.showModal()">Show Details</button>
        </div>
    `;
    phoneContainer.innerHTML += showPhone;
  });
};

const showPhone = (phones) => {
  let filtered;

  if (!phones.length) {
    phoneContainer.innerHTML += `<p class="text-red-500 text-center col-span-3 text-xl mb-5">No results found with your keywords or Network Error. Try Again...!!</p>`;
    toggleSpinner(false);
    return;
  }
  if (phones.length > 12) {
    filtered = phones.splice(0, 12);
    showallBtn.classList.remove("hidden");
  } else {
    filtered = phones;
  }
  results(filtered);
};

const toggleSpinner = (isLoading) => {
  if (isLoading) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};
const toggleModalSpinner = (isLoading) => {
  if (isLoading) {
    document.getElementById("modalSpinner").classList.remove("hidden");
  } else {
    document.getElementById("modalSpinner").classList.add("hidden");
  }
};

let allPhones;
const loadData = (data) => {
  const phones = data.data;
  toggleSpinner(false);
  showPhone(phones);
  allPhones = phones;
  console.log(allPhones);
};

const fetchData = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  loadData(data);
};

const loadSingleData = async (slug) => {
  toggleModalSpinner(true);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const singleData = await response.json();
  const phone = singleData.data;
  console.log(phone);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
  <div class="p-5 space-y-3">
        <img
          src="${phone.image}"
          class="p-5 w-2/3 block m-auto"
          alt=""
        />
        <p class="font-bold">${phone.name}</p>
        <p class="text-gray-400 text-sm">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Storage:</span> ${
            phone.storage ? phone.storage : "No records found"
          }
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Display Size:</span> ${
            phone.displaySize ? phone.displaySize : "No records found"
          }
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Chipset:</span> ${
            phone.chipSet ? phone.chipSet : "No records found"
          }
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Memory:</span> ${
            phone.memory ? phone.memory : "No records found"
          }
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Slug:</span> ${phone.slug}
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Release Date:</span> ${
            phone.releaseDate ? phone.releaseDate : "No records found"
          }
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Brand:</span> ${phone.brand}
        </p>
        <p class="text-gray-400">
          <span class="font-bold text-black">Gps:</span> ${
            phone.others.GPS ? phone.others.GPS : "No records found"
          }
        </p>
      </div>
  `;
  toggleModalSpinner(false);
};

const handleSearch = () => {
  phoneContainer.textContent = "";
  toggleSpinner(true);
  const searchText = document.getElementById("search-box").value;
  fetchData(searchText);
};

const handleShowAll = () => {
  phoneContainer.textContent = "";
  toggleSpinner(true);
  results(allPhones);
  toggleSpinner(false);
  showallBtn.classList.add("hidden");
};

const handleDetails = (id) => {
  loadSingleData(id);
};

searchBtn.addEventListener("click", handleSearch);
showallBtn.addEventListener("click", handleShowAll);
