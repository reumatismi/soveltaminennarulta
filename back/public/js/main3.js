'use strict';
const url = 'https://localhost:8000'; // change url when uploading to server

// select existing html elements
//const loginWrapper = document.querySelector('#login-wrapper');
const loginWrapper = document.getElementById('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-cat-form');
const modForm = document.querySelector('#mod-cat-form');
const ul = document.querySelector('ul');
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

const mockFeed = document.querySelector('#mockFeed');
const teacherFeed = document.querySelector('#teacherFeed');
const success = document.getElementById('success_asshole');
success.style.display = 'none';
const dropDownTwo = document.querySelector('#addMedia');
dropDownTwo.style.display = 'none';
const dropDownThree = document.querySelector('#addUser');
dropDownThree.style.display = 'none';

let loggedIn = false;
let gamesVisible = false;
let teacherness = false;

const gameButton = document.querySelector('.buttonDown');
const gameView = document.querySelector('#gameView');
const game1 = document.querySelector('#game1');

// create cat cards
/*
const createCatCards = (cats) => {
  // clear ul
  ul.innerHTML = '';
  cats.forEach((cat) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + cat.filename;
    img.alt = cat.name;
    img.classList.add('resp');

    // open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + cat.filename;
      imageModal.alt = cat.name;
      imageModal.classList.toggle('hide');
      try {
        const coords = JSON.parse(cat.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
    });

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = cat.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Age: ${cat.age}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Weight: ${cat.weight}kg`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Owner: ${cat.owner}`;

    // add selected cat's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Modify';
    modButton.addEventListener('click', () => {
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = cat.name;
      inputs[1].value = cat.age;
      inputs[2].value = cat.weight;
      inputs[3].value = cat.cat_id;
      modForm.querySelector('select').value = cat.owner;
    });

    // delete selected cat
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      try {
        const response = await fetch(url + '/cat/' + cat.cat_id, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getCat();
      }
      catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};
*/

// close modal
/*
close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});

 */

// AJAX call

const getMedia = async () => {
  console.log('getMedia token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/media', options);
    const pics = await response.json();
    //console.log(pics);
    //createmediaCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};

//getMedia();

// create user options to <select>

const createUserOptions = (users) => {
  userLists.forEach((list) => {
    // clear user list
    list.innerHTML = '';
    users.forEach((user) => {
      // create options with DOM methods
      const option = document.createElement('option');
      option.value = user.user_id;
      option.innerHTML = user.name;
      option.classList.add('light-border');
      list.appendChild(option);
    });
  });
};
/*
// get users to form options
const getUsers = async () => {
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const users = await response.json();
    createUserOptions(users);
  }
  catch (e) {
    console.log(e.message);
  }
};
*/

// submit add media post form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/media', fetchOptions);
  const json = await response.json();
  console.log('add response', json);
  //getCat();
});

/*
// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/cat', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  getCat();
});
*/
// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    // show/hide forms + cats
    loginForm.style.display = 'none';
    logOut.style.display = 'block';
    userInfo.innerHTML = `Hello ${json.user.firstname}!`;
    if (!gamesVisible) {
      main.style.display = 'block';
      success.style.display = 'block';
      mockFeed.style.display = 'none';
      if (json.user.role === 2) {
        teacherFeed.style.display = 'block';
      }
    }
    dropDownTwo.style.display = 'inline-block';
    if (json.user.role === 2) {
      dropDownThree.style.display = 'inline-block';
    }
    loggedIn = true;
    // getCat();
    //getUsers();
  }
});

// logout
logOut.addEventListener('click', async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/auth/logout', options);
    const json = await response.json();
    console.log(json);
    // remove token
    sessionStorage.removeItem('token');
    //alert('You have logged out');
    // show/hide forms + cats
    loginForm.style.display = 'block';

    //loginWrapper.style.display = 'flex';
    loggedIn = false;
    logOut.style.display = 'none';
    main.style.display = 'none';
    success.style.display = 'none';
    if (!gamesVisible) {
      mockFeed.style.display = 'block';
    }
    dropDownTwo.style.display = 'none';
    dropDownThree.style.display = 'none';
    teacherFeed.style.display = 'none';
    userInfo.innerHTML = '';

  } catch (e) {
    console.log(e.message);
  }
});

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();
  console.log('user add response', json);
  //console.log('user add response', json);
  // save token
  //sessionStorage.setItem('token', json.token);
  /*
  // show/hide forms + cats
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  userInfo.innerHTML = `Hello ${json.user.FName}`;
  // getCat();
  //getUsers();

   */
});

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
/*
if (sessionStorage.getItem('token')) {
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  // getCat();
  //getUsers();
}*/
//getMedia();

const revealGames = () => {
  //game1.style.display = 'none';
  if (!gamesVisible) {
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else {
    if (button.style.display === 'block') {
      button.style.display = 'none';
    }
    button.style.display = 'none';
    gameView.style.display = 'none';
    if (loggedIn) {
      if (teacherness) {
        teacherFeed.style.display = 'block';
      }
      main.style.display = 'block';
    } else {
      mockFeed.style.display = 'block';
    }
    gamesVisible = false;
  }
};

const gameOneStarter = () => {
  //button.style.display = 'block';
  firstReset();
  game1.style.display = 'block';
  gameView.style.display = 'none';
};

gameButton.addEventListener('click', revealGames);