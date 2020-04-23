let url = window.location.toString();

let nameFromUrl = (url) => {
    let nameArr = url.split('=');
    let userName = nameArr[1];
    if (userName == undefined){
        userName = 'mariarykova';
    }
    return userName;
}

let name = nameFromUrl(url);

let getDate = new Promise((resolve, reject) => {
  let currentDate = new Date();
  setTimeout(() => currentDate ? resolve(currentDate) : reject('Ошибка загрузки времени'), 3000)
});

let getUserInfo = fetch ('https://api.github.com/users/' + name)

Promise.all([getUserInfo, getDate])
.then(([request, date]) => {
      requestInfo = request;
      requestDate = date;
  })

  .then(res => requestInfo.json())
  .then(userInfo => {
    let avatar = userInfo.avatar_url;
    let name = userInfo.login;
    let bio = userInfo.bio;
    let profile = userInfo.html_url;
    if (name) {

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
    }

    let createDate = () => {
      let elementDate = document.createElement('p');
      elementDate.innerHTML = requestDate;
      document.body.append(elementDate);
    }

    let elementPreloader = document.getElementById('preloader');
    elementPreloader.classList.add('hidden');

      createProfile();
      createAvatar();
      createBio();
      createDate();
    }
    else {
      alert(' Информация о данном пользователе не найдена ');
    }
})

.catch(err => alert(err + ' Информация о данном пользователе не найдена'));
