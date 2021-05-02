'use strict';
const url = 'https://localhost:8000'; // change url when uploading to server

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
const teacherUL = document.querySelector('#teacherPics')
const studentUL = document.querySelector('#studentPics')
const userLists = document.querySelectorAll('.add-owner');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');

let gameButtonMode = 1;

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

// create media cards
const createMediaCards = (mediaPosts) => {
  // clear ul
  console.log("Creating media cards...");
  ul.innerHTML = '';

  const x =  sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {
    console.log("User stuff: " + mediaPost.visibility);
    // create li with DOM methods
    const h2 = document.createElement('h2');
    if (mediaPost.visibility ===1) {
      h2.innerHTML = "Uusi kuva:";
    } else {
      h2.innerHTML = "Jo esillä:";
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
    modButton.addEventListener('click', async(evt) => {
      evt.preventDefault();
      //getMediaPosts();
      loggedIn = true;
      teacherness = true;
      console.log("modButton clicked" + mediaPost.id)
      const inputs = modForm.querySelectorAll('input');
      inputs[0].value = 2;
      console.log(inputs[0].value);
      inputs[1].value = mediaPost.id;
      // modForm.querySelector('select').value = cat.owner;
      h2.innerHTML = "Jo esillä:";
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
        const response = await fetch(url + '/media/' + mediaPost.id, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getMediaPosts();
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
  console.log("Creating media cards...");
  ul.innerHTML = '';
  const x =  sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {
    //if (mediaPost.visibility > 1) {
      console.log("User stuff: " + mediaPost.visibility);
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
      p1.innerHTML = mediaPost.vst;
      /*
          const p2 = document.createElement('p');
          p2.innerHTML = `Weight: ${cat.weight}kg`;
          const p3 = document.createElement('p');
          p3.innerHTML = `Owner: ${cat.owner}`;
      */
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

const createMediaCardsForFrontpage = (mediaPosts) => {
  // clear ul
  console.log("Creating media cards...");
  const ulli = document.getElementById('mock');
  ulli.innerHTML = '';
  //const x =  sessionStorage.getItem('token');

  //console.log("User stuff: " + x.json.role);
  mediaPosts.forEach((mediaPost) => {

      console.log("User stuff: " + mediaPost.visibility);
      // create li with DOM methods
      const h2 = document.createElement('h2');

      const img = document.createElement('img');

      if (mediaPost.visibility !==3) {
        h2.innerHTML = "Tämän ei kuulu olla tässä."
      } else {
        h2.innerHTML = "Tämän kuuluu."
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
      /*
          const p2 = document.createElement('p');
          p2.innerHTML = `Weight: ${cat.weight}kg`;
          const p3 = document.createElement('p');
          p3.innerHTML = `Owner: ${cat.owner}`;
      */
      // add selected media's values to modify form
      /*
      const modButton = document.createElement('button');
      modButton.innerHTML = 'Modify';
      modButton.addEventListener('click', () => {
        console.log("modButton clicked" + mediaPost.id)
        const inputs = modForm.querySelectorAll('input');
        inputs[0].value = mediaPost.visibility;
        inputs[1].value = mediaPost.id;
        // modForm.querySelector('select').value = cat.owner;
      });
       */

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
        console.log("Kuvia opeille");
        createMediaCards(mediaPosts);
      } else {
        console.log("Kuvia oppilaille");
        createMediaCardsForStudent(mediaPosts);
      }
    }
    //TODO:
    /*
    if (!loggedIn) {
      console.log("Kuvia kaikille?");
      createMediaCardsForFrontpage(mediaPosts);
    }
     */
  }
  catch (e) {
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
  getMediaPosts();
});

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
    kirjaudu.innerText = "Kirjaudu ulos";
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
    kirjaudu.innerText = "Kirjaudu";
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

   if (gameButtonMode === 1) {
     pelit.innerHTML = "Etusivu";
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
   } else if (gameButtonMode ===2) {
    pelit.innerHTML = "Pelit";
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
  }else if (gameButtonMode === 3) {
    //pelit.innerHTML = "Takaisin peleihin";
     console.log(gameButtonMode);
    gameButtonMode = 2;
    button.style.display = 'none';
    pelit.innerHTML = "Etusivu";
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    //pelit.innerHTML = "Etusivu";
     game1.style.display = 'none';
     button.style.display = 'none';
     canvas.style.display = 'none';
     lives = 0;
     score = 0;
     firstReset()
    if (loggedIn) {
      main.style.display = 'none';
      if (teacherFeed.style.display === 'block') {
        teacherFeed.style.display = 'none';
        teacherDropUp.style.display = 'none';
        teacherness = true;
      }
    }
    gamesVisible = true;
  } else if(gameButtonMode === 4) {
     lives = 0;
     y = -150;
     number = 5;
     which = 1;
     pelit.innerHTML = "Peleihin";
     gameButtonMode = 3;
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
/////PELI1/////
///////////////

'use strict';
//yes yes too much repetition
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

let which = Math.floor(Math.random()*2 );
//console.log(which);

let score = 0;
let lives = 1;

let button = document.getElementById('butt');
button.style.display = "block";
button.style.margin = '10% auto';
button.style.color = `rgb(${255 - color1}, ${255 - color2}, ${255 - color3}`;
button.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, .7)`;

if (which === 1) {
  button.innerText = "KERÄÄ VAIN PARITTOMIA NUMEROITA!";
} else {
  button.innerText = "KERÄÄ VAIN PARILLISIA NUMEROITA!";
}

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

const superReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  //document.location.reload();
  canvas.style.display = 'none';
  button.style.display = 'block';
  button.style.margin = '14% auto';
  gameButton.style.visibility = 'visible';
  //
  gameButton.innerHTML = 'Peleihin';
  gameButtonMode = 3;
  //
  reset();
  which = Math.floor(Math.random()*2 );
  //console.log(which);

  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = paddleHeight;

  button.style.color = `rgb(${255 - color1}, ${255 - color2}, ${255 - color3}`;
  button.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, .7)`;
  if (which === 1) {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARITTOMIA NUMEROITA`;
  } else {
    button.innerText = `SAIT ${score} PISTETTÄ.\nKERÄÄ VAIN PARILLISIA NUMEROITA`;
  }
}

const firstReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  //document.location.reload();
  canvas.style.display = 'none';
  button.style.display = 'block';
  button.style.margin = '14% auto';
  gameButton.style.visibility = 'visible';
  reset();
  which = Math.floor(Math.random()*2 );
  //console.log(which);

  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = paddleHeight;

  button.style.color = `rgb(${255 - color1}, ${255 - color2}, ${255 - color3}`;
  button.style.backgroundColor = `rgba(${color1}, ${color2}, ${color3}, .7)`;
  if (which === 1) {
    button.innerText = "KERÄÄ VAIN PARITTOMIA NUMEROITA!";
  } else {
    button.innerText = "KERÄÄ VAIN PARILLISIA NUMEROITA!";
  }
}

//oldfashioned?
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
//oldfashioned?
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

const hittingTheBall = () => {
  //if ((x > paddleX && x < paddleX + paddleWidth) && (y > paddleY && y < paddleY + paddleHeight))
  if ((x > (paddleX - ballRadius/(3/2)) && x < paddleX + paddleWidth + ballRadius/(3/2)) &&
      (y > (paddleY - ballRadius/(3/2)) && y < paddleY + paddleHeight + ballRadius/(3/2))) {
    if ((number % 2 !== 0 && which === 1) || (number % 2 === 0 && which === 0)) {
      score++;
      reset();
    } else {
      lives--;
      if (lives < 1) {
        superReset();
        //requestAnimationFrame(dontDraw);

        //number = Math.floor(Math.random() * 9) + 1;

        //document.location.reload();
      } else {
        reset();
      }
    }
  }
};

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
  ctx.fillStyle = `rgb(${255 -color3}, ${255 - color7}, ${255 -color1}`;
  ctx.fillText("?", paddleX + paddleWidth/(6/2), paddleY + paddleHeight/(4/3));
};

const drawScore = () => {
  ctx.font = '23px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Pisteet: ', 95, canvas.height - 10);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(score, 235, canvas.height - 10);
};

//In case we want this:
const drawLives = () => {
  ctx.font = '15px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('Elämät: ', canvas.width - 85, canvas.height - 10);
  ctx.fillStyle = 'dim grey';
  ctx.fillText(lives, canvas.width - 15, canvas.height - 10);
};



const draw = () => {
  if (lives <1) {
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
  gameButton.innerHTML = "STOP";
  gameButtonMode = 4;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (lives > 0) {
    drawBall();
    drawSmallerBall();
    drawNumber(number);
    drawPaddle();
    drawSymbol()
    drawScore();
    //drawLives();
    hittingTheBall();
  }


  //hitting the x walls
  if (x > canvas.width - ballRadius || x < ballRadius) {
    dx = -dx;
  }

  //hitting the y walls
  if (y + ballRadius > canvas.height) {
    dy = -dy;
  } else if (y < 0 - ballRadius) {
    if ((number % 2 !== 0 && which === 1) || (number % 2 === 0 && which === 0)) {
      lives--;
      if (!lives) {
        superReset()
      } else {
        reset();
      }
    } else {
      score++;
      reset();
    }
  }

  //moving the paddle
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
button.addEventListener('click', draw);
//document.addEventListener("mousemove", mouseMoveHandler, false);

//draw();

///////////////////
////PELI1 LOPPUU////
///////////////////


const gameOneStarter = () => {
  //button.style.display = 'block';

  gameButtonMode = 3;
  pelit.innerHTML = "Peleihin";


  game1.style.display = 'block';
  gameView.style.display = 'none';
  gameButton.style.visibility = 'hidden';
  button.style.display = 'block';

  //
  //
  canvas.style.display = 'none';
  lives = 0;
  score = 0;
  firstReset();
};

gameButton.addEventListener('click', revealGames);

/*
if (sessionStorage.getItem('token')) {
  //loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getMediaPosts();
}
 */

//getMediaPosts();
