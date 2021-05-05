'use strict';
const url = 'https://localhost:8000'; // change url when uploading to server
//const url = 'https://10.114.32.88/app'; // change url when uploading to server

// select existing html elements
//const loginWrapper = document.querySelector('#login-wrapper');
//const loginWrapper = document.getElementById('#login-wrapper');
const userInfo = document.querySelector('#user-info');
const kirjaudu = document.getElementById('kirjaudu');
const pelit = document.getElementById('pelit');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-cat-form');
const modForm = document.querySelector('#mod-cat-form');
const ul = document.querySelector('#ul');
const teacherUL = document.querySelector('#teacherPics');
const studentUL = document.querySelector('#studentPics');
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

let gameButtonMode = 1;
let stopMode = 0;

const mockFeed = document.querySelector('#mockFeed');
const teacherFeed = document.querySelector('#teacherFeed');
const success = document.getElementById('success_asshole');
success.style.display = 'none';
const dropDownTwo = document.querySelector('#addMedia');
dropDownTwo.style.display = 'none';
const dropDownThree = document.querySelector('#addUser');
dropDownThree.style.display = 'none';
const teacherDropUp = document.querySelector('#choose');

let loggedIn = false;
let gamesVisible = false;
let teacherness = false;

const gameButton = document.querySelector('.buttonDown');
const gameView = document.querySelector('#gameView');
const game1 = document.querySelector('#game1');
const game2 = document.querySelector('#game2');

const header = document.getElementById('headerDiv');

// create media cards for teacherview
const createMediaCards = (mediaPosts) => {
  // clear ul
  console.log('Creating media cards...');
  ul.innerHTML = '';

  const x = sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {
    console.log('User stuff: ' + mediaPost.visibility);
    // create li with DOM methods
    const h2 = document.createElement('h2');
    if (mediaPost.visibility === 1) {
      h2.innerHTML = 'Uusi kuva:';
    } else {
      h2.innerHTML = 'Jo esillä:';
    }
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + mediaPost.mediafilename;
    img.alt = mediaPost.vst;
    img.classList.add('resp');

    // open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + mediaPost.mediafilename;
      imageModal.alt = mediaPost.vst;
      imageModal.classList.toggle('hide');
      /*
      try {
        const coords = JSON.parse(cat.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
       */
    });

    const figure = document.createElement('figure').appendChild(img);

    //const h2 = document.createElement('h2');
    //h2.innerHTML = mediaPost.vst;

    const p1 = document.createElement('p');
    p1.innerHTML = mediaPost.mediadesc;
    /*
        const p2 = document.createElement('p');
        p2.innerHTML = `Weight: ${cat.weight}kg`;
        const p3 = document.createElement('p');
        p3.innerHTML = `Owner: ${cat.owner}`;
    */
    // add selected media's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Luokkanäkymään';
    modButton.addEventListener('click', async (evt) => {
      evt.preventDefault();
      //getMediaPosts();
      loggedIn = true;
      teacherness = true;
      console.log('modButton clicked' + mediaPost.id);
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = 2;
      console.log(inputs[0].value);
      inputs[1].value = mediaPost.id;
      // modForm.querySelector('select').value = cat.owner;
      h2.innerHTML = 'Jo esillä:';
      const data = serializeJson(modForm);
      console.log(data);
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url + '/media', fetchOptions);
      const json = await response.json();
      console.log('modify response', json);
      //getMediaPosts();
    });
    //TODO?
    /*
    const modButton2 = document.createElement('button');
    modButton2.innerHTML = 'Etusivulle';
    modButton2.addEventListener('click', async(evt) => {
      console.log("modButton clicked" + mediaPost.id)
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = 3;
      inputs[1].value = mediaPost.id;
      // modForm.querySelector('select').value = cat.owner;
      evt.preventDefault();
      const data = serializeJson(modForm);
      console.log(data);
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      };
      try {
        const response = await fetch(url + '/media', fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getMediaPosts();
      }
      catch (e) {
        console.log(e.message());
      }

     */
    //TODO?
    /*
    const response = await fetch(url + '/media', fetchOptions);
    const json = await response.json();
    console.log('modify response', json);
    getMediaPosts();

  });
     */

    // delete selected media
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Poista';
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      try {
        const response = await fetch(url + '/media/' + mediaPost.id,
            fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getMediaPosts();
      } catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);

    //li.appendChild(p2);
    //li.appendChild(p3);
    li.appendChild(modButton);
    //li.appendChild(modButton2);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};

const createMediaCardsForStudent = (mediaPosts) => {
  // clear ul
  console.log('Creating media cards...');
  ul.innerHTML = '';
  const x = sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {
    //if (mediaPost.visibility > 1) {
    console.log('User stuff: ' + mediaPost.visibility);
    // create li with DOM methods
    const h2 = document.createElement('h2');

    /*
    if (mediaPost.visibility ===1) {
      h2.innerHTML = "Tämän ei kuulu olla tässä."
    } else {
      h2.innerHTML = "Tämän kuuluu."
    }
     */

    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + mediaPost.mediafilename;
    img.alt = mediaPost.vst;
    img.classList.add('resp');

    // open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + mediaPost.mediafilename;
      imageModal.alt = mediaPost.vst;
      imageModal.classList.toggle('hide');
      /*
      try {
        const coords = JSON.parse(cat.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
       */
    });

    const figure = document.createElement('figure').appendChild(img);

    //const h2 = document.createElement('h2');
    h2.innerHTML = mediaPost.mediadesc;

    const p1 = document.createElement('p');
    // Split timestamp into [ Y, M, D, h, m, s ]
    let t = (mediaPost.vst).split(/[- :TZ]/);

    // Apply each element to the Date function
    //let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4]), t[5]);
    p1.innerHTML = t[2] + '.' + t[1] + '.' + t[0] + ' klo: ' + t[3] + ':' +
        t[4];
    //p1.innerHTML = mediaPost.vst;

    // add selected media's values to modify form
    /*
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Modify';
    modButton.addEventListener('click', () => {
      console.log("modButton clicked" + mediaPost.id)
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = mediaPost.visibility;
      inputs[1].value = mediaPost.id;
    });
     */

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    //li.appendChild(modButton);
    ul.appendChild(li);

    //}

    //end...
  });
};

//Not in use
const createMediaCardsForFrontpage = (mediaPosts) => {
  // clear ul
  console.log('Creating media cards...');
  const ulli = document.getElementById('mock');
  ulli.innerHTML = '';
  //const x =  sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {

    console.log('User stuff: ' + mediaPost.visibility);
    // create li with DOM methods
    const h2 = document.createElement('h2');
    const img = document.createElement('img');

    if (mediaPost.visibility !== 3) {
      h2.innerHTML = 'Tämän ei kuulu olla tässä.';
    } else {
      h2.innerHTML = 'Tämän kuuluu.';
    }
    img.src = url + '/thumbnails/' + mediaPost.mediafilename;
    img.alt = mediaPost.vst;
    img.classList.add('resp');

    // open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + mediaPost.mediafilename;
      imageModal.alt = mediaPost.vst;
      imageModal.classList.toggle('hide');
      /*
      try {
        const coords = JSON.parse(cat.coords);
        // console.log(coords);
        addMarker(coords);
      }
      catch (e) {
      }
       */
    });

    const figure = document.createElement('figure').appendChild(img);

    //const h2 = document.createElement('h2');
    //h2.innerHTML = mediaPost.vst;

    const p1 = document.createElement('p');
    p1.innerHTML = mediaPost.mediadesc;

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);

    //li.appendChild(p2);
    //li.appendChild(p3);
    //li.appendChild(modButton);
    //li.appendChild(delButton);
    ulli.appendChild(li);

  });
};

// close modal

close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});

// AJAX call
const getMediaPosts = async () => {
  console.log('getMediaPosts token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/media', options);
    const mediaPosts = await response.json();
    if (loggedIn) {
      if (teacherness) {
        console.log('Kuvia opeille');
        createMediaCards(mediaPosts);
      } else {
        console.log('Kuvia oppilaille');
        createMediaCardsForStudent(mediaPosts);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
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

// Submit add media post form
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
  getMediaPosts();
});

// Submit modify form
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
  const response = await fetch(url + '/media', fetchOptions);
  const json = await response.json();
  console.log('modify response', json);
  getMediaPosts();
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

// Login
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
    kirjaudu.innerText = 'Kirjaudu ulos';
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
        //teacherDropUp.style.display = 'flex';
        teacherness = true;
      }
    }
    dropDownTwo.style.display = 'inline-block';
    if (json.user.role === 2) {
      dropDownThree.style.display = 'inline-block';
    }
    loggedIn = true;
    getMediaPosts();
    // getCat();
    //getUsers();
  }
});

// Logout
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
    kirjaudu.innerText = 'Kirjaudu';
    logOut.style.display = 'none';
    main.style.display = 'none';
    ul.innerHTML = '';
    success.style.display = 'none';
    teacherDropUp.style.display = 'none';
    if (!gamesVisible) {
      mockFeed.style.display = 'block';
    }
    dropDownTwo.style.display = 'none';
    dropDownThree.style.display = 'none';
    teacherFeed.style.display = 'none';
    userInfo.innerHTML = '';
    teacherness = false;

  } catch (e) {
    console.log(e.message);
  }
  getMediaPosts();
});

// Submit register form
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

//Controls the main view
const revealGames = () => {
  //game1.style.display = 'none';
  if (gameButtonMode === 1) {
    pelit.innerHTML = 'Etusivu';
    gameButtonMode = 2;
    console.log(gameButtonMode);
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    //pelit.innerHTML = "Etusivu";
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherDropUp.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else if (gameButtonMode === 2) {
    pelit.innerHTML = 'Pelit';
    gameButtonMode = 1;
    button.style.display = 'none';
    console.log(gameButtonMode);
    if (button.style.display === 'block') {
      button.style.display = 'none';
    }
    //pelit.innerHTML = "Pelit";
    button.style.display = 'none';
    gameView.style.display = 'none';
    if (loggedIn) {
      if (teacherness) {
        teacherFeed.style.display = 'block';
        teacherDropUp.style.display = 'flex';
      }
      main.style.display = 'block';
    } else {
      mockFeed.style.display = 'block';
    }
    gamesVisible = false;
  } else if (gameButtonMode === 3) {
    //pelit.innerHTML = "Takaisin peleihin";
    console.log(gameButtonMode);
    gameButtonMode = 2;
    button.style.display = 'none';
    pelit.innerHTML = 'Etusivu';
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    //pelit.innerHTML = "Etusivu";
    game1.style.display = 'none';
    game2.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'none';
    lives = 0;
    score = 0;
    firstReset();
    header.style.visibility = 'visible';
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherDropUp.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else if (gameButtonMode === 4) {
    lives = 0;
    y = -150;
    number = 5;
    which = 1;
    pelit.innerHTML = 'Peleihin';
    game2.style.display = 'none';
    stopMode = 1;
    //gameButtonMode = 3;
    /*
    lives = 0;
    game1.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'none';
    pelit.innerHTML = "Etusivu";
    gameView.style.display = 'block';

    gameButtonMode = 2;
     */
  }

  /*
  if (!gamesVisible) {
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    pelit.innerHTML = "Etusivu";
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherDropUp.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else {
    if (button.style.display === 'block') {
      button.style.display = 'none';
    }
    pelit.innerHTML = "Pelit";
    button.style.display = 'none';
    gameView.style.display = 'none';
    if (loggedIn) {
      if (teacherness) {
        teacherFeed.style.display = 'block';
        teacherDropUp.style.display = 'flex';
      }
      main.style.display = 'block';
    } else {
      mockFeed.style.display = 'block';
    }
    gamesVisible = false;
  }

   */
};

/*
//original
const revealGames = () => {
  //game1.style.display = 'none';
  if (!gamesVisible) {
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    pelit.innerHTML = "Etusivu";
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherDropUp.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else {
    if (button.style.display === 'block') {
      button.style.display = 'none';
    }
    pelit.innerHTML = "Pelit";
    button.style.display = 'none';
    gameView.style.display = 'none';
    if (loggedIn) {
      if (teacherness) {
        teacherFeed.style.display = 'block';
        teacherDropUp.style.display = 'flex';
      }
      main.style.display = 'block';
    } else {
      mockFeed.style.display = 'block';
    }
    gamesVisible = false;
  }
};
 */

///////////////
/////GAME1/////
///////////////

//Creating canvas etc.
const canvas = document.getElementById('myCanvas');
canvas.style.display = 'none';
const ctx = canvas.getContext('2d');
const ballRadius = 50;
let x = canvas.width / 4;
let y = canvas.height - 195;
let dx = Math.floor(Math.random() * 3) + 2;
let dy = (Math.floor(Math.random() * 3) + 2);
const paddleHeight = 75;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = paddleHeight;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//Random colors for button other game elements

let number = Math.floor(Math.random() * 9) + 1;
let color1 = Math.floor(Math.random() * 256);
let color2 = Math.floor(Math.random() * 256);
let color3 = Math.floor(Math.random() * 256);
let color4 = Math.floor(Math.random() * 256);
let color5 = Math.floor(Math.random() * 256);
let color6 = Math.floor(Math.random() * 256);
let color7 = Math.floor(Math.random() * 256);
let color8 = Math.floor(Math.random() * 256);
let color9 = Math.floor(Math.random() * 256);

//Odd or even
let which = Math.floor(Math.random() * 2);

let score = 0;
let lives = 1;

//Game start button
let button = document.getElementById('butt');
button.style.display = 'block';
button.style.margin = '10% auto';
button.style.color = `ghostwhite`;
button.style.backgroundColor = `gray`;

if (which === 1) {
  button.innerText = 'KERÄÄ VAIN PARITTOMIA NUMEROITA!';
} else {
  button.innerText = 'KERÄÄ VAIN PARILLISIA NUMEROITA!';
}

//Small reset
const reset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  color1 = Math.floor(Math.random() * 256);
  color2 = Math.floor(Math.random() * 256);
  color3 = Math.floor(Math.random() * 256);
  color4 = Math.floor(Math.random() * 256);
  color5 = Math.floor(Math.random() * 256);
  color6 = Math.floor(Math.random() * 256);
  color7 = Math.floor(Math.random() * 256);
  color8 = Math.floor(Math.random() * 256);
  color9 = Math.floor(Math.random() * 256);
  x = canvas.width / 4;
  y = canvas.height - 195;
  dx = Math.floor(Math.random() * 3) + 2;
  dy = (Math.floor(Math.random() * 3) + 2);
  //paddleX = (canvas.width - paddleWidth) / 2;
  //paddleY = paddleHeight;
};

//Big reset
const superReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  //document.location.reload();
  canvas.style.display = 'none';
  button.style.display = 'block';
  button.style.margin = '14% auto';
  gameButton.style.visibility = 'visible';
  //
  gameButton.innerHTML = 'Peleihin';
  //gameButtonMode = 3;
  //
  reset();
  which = Math.floor(Math.random() * 2);
  //console.log(which);

  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = paddleHeight;

  button.style.color = `ghostwhite`;
  button.style.backgroundColor = `gray`;
  //ORIGINAL:
  /*
  if (which === 1) {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARITTOMIA NUMEROITA`;
  } else {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARILLISIA NUMEROITA`;
  }
   */
  //Game button text
  console.log('GameButtonMode: ' + gameButtonMode);
  if (which === 1 && stopMode === 0) {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARITTOMIA NUMEROITA`;
  } else if (which === 1 && stopMode === 1) {
    button.innerText = `KERÄÄ VAIN PARITTOMIA NUMEROITA`;
  } else if (which === 0 && stopMode === 0) {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARILLISIA NUMEROITA`;
  } else if (which === 0 && stopMode === 1) {
    button.innerText = `KERÄÄ VAIN PARILLISIA NUMEROITA`;
  }
  gameButtonMode = 3;
  stopMode = 0;

};
//For first game
const firstReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  //document.location.reload();
  canvas.style.display = 'none';
  button.style.display = 'block';
  button.style.margin = '14% auto';
  gameButton.style.visibility = 'visible';
  reset();
  which = Math.floor(Math.random() * 2);
  //console.log(which);

  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = paddleHeight;

  button.style.color = `ghostwhite`;
  button.style.backgroundColor = `gray`;
  /*
    button.style.color = `rgb(${255 - color1}, ${255 - color2}, ${255 - color3}`;
    button.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, 1)`;
  */

    if (which === 1) {
      button.innerText = 'KERÄÄ VAIN PARITTOMIA NUMEROITA!';
    } else {
      button.innerText = 'KERÄÄ VAIN PARILLISIA NUMEROITA!';
    }
  };

  //Handling keys (yes yes if really mobile should have touch functionality)
  const keyDownHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      downPressed = true;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      upPressed = true;
    }
  };
  const keyUpHandler = (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      downPressed = false;
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      upPressed = false;
    }
  };
  //For mouse
  /*
  const mouseMoveHandler = (e)  => {
    const relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
    const relativeY = e.clientY - canvas.offsetTop;
    if(relativeY > 0 && relativeY < canvas.height) {
      paddleY = relativeY - paddleWidth/2;
    }
  }
   */

//Paddle hits the ball
const hittingTheBall = () => {
  //if ((x > paddleX && x < paddleX + paddleWidth) && (y > paddleY && y < paddleY + paddleHeight))
  if ((x > (paddleX - ballRadius / (3 / 2)) && x < paddleX + paddleWidth +
      ballRadius / (3 / 2)) &&
      (y > (paddleY - ballRadius / (3 / 2)) && y < paddleY + paddleHeight +
          ballRadius / (3 / 2))) {
    if ((number % 2 !== 0 && which === 1) ||
        (number % 2 === 0 && which === 0)) {
      score++;
      reset();
    } else {
      lives--;
      if (lives < 1) {
        superReset();
      } else {
        reset();
      }
    }
  }
};

//Draws number ball
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${color1}, ${color2}, ${color3}`;
  ctx.fill();
  ctx.closePath();
};
const drawSmallerBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius - 13, 0, Math.PI * 2);
  ctx.fillStyle = `rgb(${color4}, ${color5}, ${color6}`;
  ctx.fill();
  ctx.closePath();
};
const drawNumber = (number) => {
  ctx.font = '50px Monaco';
  ctx.fillStyle = `rgb(${255 - color4}, ${255 - color5}, ${255 - color6}`;
  ctx.fillText(number, x - ballRadius / 3, y + ballRadius / 3);
};

//Draws paddle
const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = `rgb(${color3}, ${color7}, ${color1}`;
  ctx.strokeStyle = `rgb(${color7}, ${color8}, ${color9}`;
  ctx.lineWidth = 7;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};
const drawSymbol = () => {
  ctx.font = '50px Monaco';
  ctx.fillStyle = `rgb(${255 - color3}, ${255 - color7}, ${255 - color1}`;
  ctx.fillText('?', paddleX + paddleWidth / (6 / 2),
      paddleY + paddleHeight / (4 / 3));
};

//Displays score
const drawScore = () => {
  ctx.font = '23px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Pisteet: ', 95, canvas.height - 13);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(score, 235, canvas.height - 13);
};
//Displays lives, but currently just one life
const drawLives = () => {
  ctx.font = '15px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Elämät: ', canvas.width - 85, canvas.height - 10);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(lives, canvas.width - 15, canvas.height - 10);
};

//Handles the game
const draw = () => {

  if (lives < 1) {
    score = 0;
    lives = 1;
  }
  canvas.style.display = 'block';
  button.style.display = 'none';
  ///////////////////////
  //gamebutton is here://
  ///////////////////////
  //gameButton.style.visibility = 'hidden';
  gameButton.style.visibility = 'visible';
  gameButton.innerHTML = 'STOP';
  gameButtonMode = 4;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (lives > 0) {
    drawBall();
    drawSmallerBall();
    drawNumber(number);
    drawPaddle();
    drawSymbol();
    drawScore();
    //drawLives();
    hittingTheBall();
  }
  //Hitting the x walls
  if (x > canvas.width - ballRadius || x < ballRadius) {
    dx = -dx;
  }
  //Hitting the y walls
  if (y + ballRadius > canvas.height) {
    dy = -dy;
  } else if (y < 0 - ballRadius) {
    if ((number % 2 !== 0 && which === 1) ||
        (number % 2 === 0 && which === 0)) {
      lives--;
      if (!lives) {
        superReset();
      } else {
        reset();
      }
    } else {
      score++;
      reset();
    }
  }
  //Moving the paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  } else if (upPressed && paddleY > 0) {
    paddleY -= 7;
  } else if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 7;
  }
  x += dx;
  y += dy;

  if (lives > 0) {
    requestAnimationFrame(draw);
  }
};
//Listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
button.addEventListener('click', draw);
//document.addEventListener("mousemove", mouseMoveHandler, false);
//draw();

////////////////////
////GAME 1 ENDS/////
////////////////////

////////////////////
///GAME 2 STARTS////
////////////////////

const gameTwo = () => {

  const leftButton = document.getElementById('vaihtoehto1');
  const rightButton = document.getElementById('vaihtoehto2');
  const pStory = document.getElementById('storyP');
  pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';
  //Tells in which part of the story we are
  let situation = 0;

  //Left (top) button chosen
  const leftChoice = () => {
    storyContinuesLeft(situation);
  };
  //Right (top) button chosen
  const rightChoice = () => {
    storyContinuesRight(situation);
  };

  //Story when left button pushed
  let lefts = [
    [
      'Huokaiset helpotuksesta. Vältit mustan aukon. Samassa kojelautaan syttyy välkkyvä valo. Mitä teet?',
      'Painan sen vieressä olevaa nappia.', 'En ole huomaavinani valoa.', 1],
    [
      'Painat nappia ja valo sammuu. Ehdit hädin tuskin hymyillä ennen kuin valo syttyy uudestaan. ' +
      'Kaiken lisäksi ärsyttävä hälytysääni pärähtää soimaan. Mitä teet?',
      'Painan nappia vielä kerran',
      'Etsin kuulosuojat',
      3],
    [
      'Varovaisesti ohjaat aluksesi suuren juustopalan läheisyyteen. Mitä teet?',
      'Ammun juustopalaa.', 'Avaan radioyhteyden.', 5],
    [
      'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. ' +
      'Sinun ei auta muuta kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Radioyhteys ei toimi. Samassa iso tuntematon alus nielaisee sinun aluksesi sisuksiinsa. Mitä teet?',
      'Ammun alukseni kaikilla tykeillä.',
      'Odotan mitä tuleman pitää.',
      8],
    [
      'Ammut juustopalaa. Se välähtää kirkkaasti paljastaen hurjan näköisen avaruusaluksen. Mitä teet?',
      'Lähden karkuun.', 'Pyydän anteeksi.', 9],
    [
      'Nukahdat. Näet unta äitisi tekemästä appelsiinitäytekakusta. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. ' +
      'Sinun ei auta muuta kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Voi voi! Kummatkin alukset räjähtävät palasiksi. Onneksi suojakenttä ympäröi sinut ja vihaisen avaruusolennon ja selviätte ' +
      'hengissä kunnes teidät pelastetaan. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
    [
      'Lähdet karkuun. Heti kohta tajuat että se on raukkamaista ja päätät palata pyytämään anteeksi. Ison aluksen omistaja onkin ' +
      'mukava avaruusolio ja antaa anteeksi. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
  ];
  //Story when right button pushed
  let rights = [
    [
      'Suljet silmäsi. Kun avaat ne uudestaan huomaat että musta aukko onkin juustonpalalta ' +
      'näyttävä avaruusalus. Mitä teet?',
      'Päätän lähestyä alusta.',
      'En vieläkään usko silmiäni.',
      2],
    [
      'Et kiinnitä valoon mitään huomiota ja jatkat matkaa. Syöt voileivän ja pari keksiä ja ' +
      'sitten aluksesi moottori räjähtää. Mitä teet?',
      'Otan yhteyttä tukikohtaan ja pyydän apua.',
      'Voivottelen.',
      4],
    [
      'Nyt juustopala ' +
      'onkin jättimäinen appelsiini. Mitä ihmettä?',
      'Suljen vielä kerran silmäni.',
      'Käännän aluksen ympäri.',
      6],
    [
      'Muistat ettei sinulla ' +
      'ole kuulosuojia. Ennen kuin ehdit miettiä että mitä tekisit alus tärähtää voimakkaasti. On syytä ehkä toimia nopeasti. Mitä teet?',
      'Painan nappia uudestaan.', 'Huudan pelosta.', 7],
    [
      'Sinun surkutellessa suuri alus imaisee sinun aluksesi ja lempeä ääni sanoo ' +
      'pelastavansa sinut ja vievänsä sinut takaisin tukikohtaasi. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Otat radioyhteyden. Mutta mitä ihmettä sanoa juustolle? Ennen kuin ehdit sanoa mitään ottaa komentajasi yhteyttä ' +
      'ja kertoo että sinulle on uusi tehtävä. Aurinkokuntaan on saapunut avaruusolento, joka sinun pitää vastaanottaa. Aluksen tunnistat siitä, ' +
      'että se vaikutta tietyssä valossa joko mustalta aukolta, juustolta tai appelsiinilta. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Ennen kuin ehdit tehdä niin saat viestin komentajaltasi jossa kerrotaan että sinulle on uusi tehtävä. Aurinkokuntaan on ' +
      'saapunut avaruusolento, joka sinun pitää vastaanottaa. Aluksen tunnistat siitä että se vaikutta tietyssä valossa joko mustalta aukolta, ' +
      'juustolta tai appelsiinilta. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
    [
      'Alus räjähtää palasiksi. Onneksi hätäpelastussuojakenttä kietoutuu ympärillesi ja selviät hengissä. Sinun ei auta muuta ' +
      'kuin rauhassa odottaa että sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun',
      null],
    [
      'Leppoisa avaruusolento kertoo huomanneensa että aluksesi oli rikki ja siksi nappasi sinut ennen kuin aluksesi ehti räjähtää. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Mukavista mukavin avaruusolento antaa sinulle anteeksi! Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
  ];
  //Handles left (top) button push functionality
  const storyContinuesLeft = (number) => {
    if (number === null) {
      pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';
      leftButton.innerText = 'Käännän aluksen poispäin aukosta.';
      rightButton.innerText = 'En usko silmiäni';
      situation = 0;
    } else {
      pStory.innerText = lefts[number][0];
      leftButton.innerText = lefts[number][1];
      rightButton.innerText = lefts[number][2];
      situation = lefts[number][3];
    }
    // Helps the story maker to keep track
    console.log(situation);
  };
  //Handles right (lower) button push functionality
  const storyContinuesRight = (number) => {
    if (number === null) {
      pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edessäsi yhtäkkiä musta aukko. Mitä teet?';
      leftButton.innerText = 'Käännän aluksen poispäin aukosta.';
      rightButton.innerText = 'En usko silmiäni';
      situation = 0;
    } else {
      pStory.innerText = rights[number][0];
      leftButton.innerText = rights[number][1];
      rightButton.innerText = rights[number][2];
      situation = rights[number][3];
    }
    // Helps the story maker to keep track
    console.log(situation);
  };

  //Button listening
  leftButton.addEventListener('click', leftChoice);
  rightButton.addEventListener('click', rightChoice);
};

////////////////////
////GAME 2 ENDS/////
////////////////////

//Starts game one from the moon
const gameOneStarter = () => {
  //button.style.display = 'block';
  header.style.visibility = 'hidden';
  gameButtonMode = 3;
  pelit.innerHTML = 'Peleihin';
  game1.style.display = 'block';
  gameView.style.display = 'none';
  gameButton.style.visibility = 'hidden';
  button.style.display = 'block';

  canvas.style.display = 'none';
  lives = 0;
  score = 0;
  firstReset();
};
//Starts game one from the space capsule
const gameTwoStarter = () => {
  header.style.visibility = 'hidden';
  gameButtonMode = 3;
  pelit.innerHTML = 'Peleihin';
  game2.style.display = 'block';
  gameView.style.display = 'none';
  //gameButton.style.visibility = 'hidden';
  button.style.display = 'block';
  gameTwo();
};

//Gamebutton listener
gameButton.addEventListener('click', revealGames);

/*
if (sessionStorage.getItem('token')) {
  //loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getMediaPosts();
}
 */
