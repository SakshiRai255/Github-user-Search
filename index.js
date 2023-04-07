const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let APIURL = "https://api.github.com/users/";

// function to fetch user details using username;
async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();
  // console.log("responseDatea", respData);
  createUserCard(respData);

  getRepos(username);
}

// fetchig user's repositories to
async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

// creating card to show user details on UI part dynamically;
function createUserCard(user) {
  console.log("user.......", user);
  const cardHTML = `
        <div class="card">
            ${
              user.name
                ? `<div>
                    <img class="pic" src="${user.avatar_url}" alt="${
                    user.name
                  }" />
                </div>
                <div class="user-details">
                    ${
                      user.name
                        ? `<span style="font-size: 26px">${user.name}</span> <br>`
                        : ""
                    }
                    ${
                      user.location
                        ? `<span style="font-size: 26px">${user.location}</span> <br>`
                        : ""
                    }
                    ${
                      user.bio
                        ? `<span style="font-size: 26px">${user.bio}</span> <br>`
                        : ""
                    }
                        <ul class="info">
                            <li style="margin:10px">${
                              user.followers != null ? user.followers : ""
                            }<b> Followers</b></li>
                            <li style="margin:10px">${
                              user.following != null ? user.following : ""
                            }<b> Following</b></li>
                            <li style="margin:10px">${
                              user.public_repos != null ? user.public_repos : ""
                            }<b> Public Repositories</b></li>
                        </ul>
                    <div id="repos"></div>
                </div>`
                : `<span style="font-size: 26px">User doesn't exist. <br> Please try again...</span>`
            } 
        </div>`;
  main.innerHTML = cardHTML;
}

// adding repositories to card
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
}

// calling getUser function after submitting form;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
