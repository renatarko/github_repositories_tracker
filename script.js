const form = document.getElementById("form");
const username = document.querySelector(".username");
const input = document.querySelector("input");
const notFound = document.querySelector(".user-not-found");
const empty = document.querySelector(".empty");
const sectionListRepo = document.getElementById("list-repos");

const repository = [];

function cleanAll() {
  repository.length = 0;
  const ul = document.getElementById("list-repo-gb");
  // ul && sectionListRepo.removeChild(ul);
  if (ul) {
    sectionListRepo.removeChild(ul);
  }

  const divNotFound = document.querySelector(".user-not-found");
  if (divNotFound) {
    divNotFound.classList.add("nf-visible");
  }

  const divEmpty = document.querySelector(".empty");
  if (divEmpty) {
    divEmpty.classList.add("em-visible");
  }

  const imgClear = document.querySelector("img");
  if (imgClear) {
    imgClear.remove("img");
  }
}

const getResult = async (event) => {
  event.preventDefault();
  cleanAll();

  inputValue = input.value;
  const url = `https://api.github.com/users/${inputValue}/repos`;

  if (isUsernameEmpty()) {
    return;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (isRepositoryEmpty(data)) {
    return;
  }

  const arrRepo = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      url: item.html_url,
      avatar: item.avatar_url,
    };
  });
  repository.push(...arrRepo);

  createListRepository();
  createUserAvatar(data);
};

form.addEventListener("submit", getResult);

function isUsernameEmpty() {
  inputValue = input.value;

  if (inputValue === "") {
    notFound.classList.remove("nf-visible");
    return true;
  }
  return false;
}

function isRepositoryEmpty(data) {
  if (data.length === 0) {
    empty.classList.remove("em-visible");
    return true;
  }
  return false;
}

function createListRepository() {
  const ul = document.createElement("ul");
  ul.id = "list-repo-gb";

  repository.forEach((element) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("target", "_blanck");

    a.href = element.url;
    a.innerHTML = element.name;

    li.appendChild(a);
    ul.appendChild(li);
  });

  sectionListRepo.appendChild(ul);
}

function createUserAvatar(data) {
  const head = document.querySelector(".head");
  const img = document.createElement("img");
  img.classList.add("avatar");

  img.src = data[0].owner.avatar_url;
  head.appendChild(img);
}
