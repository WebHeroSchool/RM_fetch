let url = window.location.toString();

let nameFromUrl = (url) => {
    let nameArr = url.split('=');
    let userName = nameArr[1];
    if (userName === undefined) {
        userName = 'mariarykova';
    }
    return userName;
}

let nameUser = nameFromUrl(url);

fetch ('https://api.github.com/users/' + nameUser)
  .then(res => res.json())
  .then(json => {
    let avatar = json.avatar_url;
    let name = json.name;
    let bio = json.bio;
    let profile = json.html_url;
    if (nameUser) {

    let createAvatar = () => {
      let newAvatar = document.createElement('img');
      newAvatar.src = avatar;
      document.body.append(newAvatar);
  };

      let createBio = () => {
      let newBio = document.createElement('p');
      newBio.innerHTML = bio;
      document.body.append(newBio);
    };

      let createProfile = () => {
      let elementLink = document.createElement('a');
      let elementName = document.createElement('h1');
      elementName.innerText = name;
      elementLink.href = profile;
      document.body.append(elementLink);
      elementLink.append(elementName);
    };

      createProfile();
      createAvatar();
      createBio();
    } else {
      let createError = () => {
        let errorElement = document.createElement('h1');
        errorElement.innerText = ' Информация о данном пользователе не найдена ';
        document.body.append(errorElement);
      };
      createError();
  }
})
