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
  }else if (gameButtonMode ===3) {
    //pelit.innerHTML = "Takaisin peleihin";
     console.log(gameButtonMode);
    gameButtonMode = 2;
    pelit.innerHTML = "Etusivu";
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


const gameOneStarter = () => {
  //button.style.display = 'block';
  gameButtonMode = 3;
  pelit.innerHTML = "Takaisin peleihin";
  firstReset();
  game1.style.display = 'block';
  gameView.style.display = 'none';
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
