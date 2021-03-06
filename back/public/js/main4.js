'use strict';
//const url = 'https://localhost:8000'; // change url when uploading to server
const url = 'https://10.114.32.88/app'; // change url when uploading to server

// select existing html elements
const helloAntero = document.querySelector('#helloSirpa');
const kirjaudu = document.getElementById('kirjaudu');
const pelit = document.getElementById('pelit');
const logOut = document.querySelector('#log-out');
const main = document.querySelector('main');
const loginForm = document.querySelector('#login-form');
const addUserForm = document.querySelector('#add-user-form');
const addForm = document.querySelector('#add-cat-form');
const modForm = document.querySelector('#mod-cat-form');
const ul = document.querySelector('#ul');
const imageModal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#image-modal img');
const close = document.querySelector('#image-modal a');
//Game button control stuff
let gameButtonMode = 1;
let stopMode = 0;
//Display stuff
const mockFeed = document.querySelector('#mockFeed');
const teacherFeed = document.querySelector('#teacherFeed');
const success = document.getElementById('success');
success.style.display = 'none';
const dropDownTwo = document.querySelector('#addMedia');
dropDownTwo.style.display = 'none';
const dropDownThree = document.querySelector('#addUser');
dropDownThree.style.display = 'none';
const teacherDropUp = document.querySelector('#choose');
//For controling different user views
let loggedIn = false;
let gamesVisible = false;
let teacherness = false;

const gameButton = document.querySelector('.buttonDown');
const gameView = document.querySelector('#gameView');
const game1 = document.querySelector('#game1');
const game2 = document.querySelector('#game2');

const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');

///////////////////////////////////////
//Creates media cards for teacherview//
///////////////////////////////////////
const createMediaCards = (mediaPosts, comments) => {
  // clear ul
  console.log('Creating media cards...');
  ul.innerHTML = '';
  mediaPosts.forEach((mediaPost) => {
    // create li with DOM methods
    const cardTop = document.createElement('p');
    cardTop.className = 'cardTop';
    cardTop.innerHTML = mediaPost.classid + ' - Herttoniemen Ala-aste';
    const cardTopP = document.createElement('p');
    let t = (mediaPost.vst).split(/[- :TZ]/);
    cardTopP.innerHTML = t[2] + '.' + t[1] + '.' + t[0] + ' klo: ' + t[3] +
        ':' +
        t[4];
    cardTopP.style.textAlign = 'center';
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + mediaPost.mediafilename;
    img.alt = 'Miss?? kuva?';
    img.classList.add('resp');
    // open large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + mediaPost.mediafilename;
      imageModal.alt = 'Miss?? kuva?';
      imageModal.classList.toggle('hide');
    });

    const figure = document.createElement('figure').appendChild(img);
    const cardDescription = document.createElement('p');
    const cardDescUsername = document.createElement('span');
    const cardDescText = document.createElement('span');
    //To implement who posted the picture:
    //cardDescUsername.innerHTML = 'Kuvan postasi ' + mediaPost.username;
    //cardDescText.innerHTML = ': ' + mediaPost.mediadesc;
    cardDescUsername.innerHTML = mediaPost.username;
    cardDescText.innerHTML = ' ' + mediaPost.mediadesc;
    cardDescription.appendChild(cardDescUsername);
    cardDescription.appendChild(cardDescText);

// Creating a popup comment form with dom elements
    const openCommentFormButton = document.createElement('button');
    const commentPopup = document.createElement('div');
    const commentPopupX = document.createElement('p');
    const commentForm = document.createElement('form');
    const commentInput = document.createElement('textarea');
    const mediaId = document.createElement('input');
    const userId = document.createElement('input');
    const commentButton = document.createElement('button');

    commentPopup.className = 'commentPopup';
    commentButton.innerText = 'L??het??';
    commentForm.className = 'commentForm';
    commentPopupX.className = 'close2';
    commentPopupX.innerHTML = '&#10006';
    commentPopup.appendChild(commentPopupX);

    commentInput.id = 'commentInput';
    commentInput.name = 'comment';
    commentInput.minLength = 3;
    commentInput.className = "inPut";
    mediaId.name = 'mediaid';
    mediaId.type = 'hidden';
    mediaId.className = "inPut";
    userId.name = 'userid';
    userId.type = 'hidden';
    userId.className = "inPut";

    openCommentFormButton.className = 'openCommentFormButton';
    openCommentFormButton.innerText = 'Kommentoi';

    commentButton.className = 'commentButton';
    commentButton.type = 'submit';
    commentForm.appendChild(commentInput);
    commentForm.appendChild(mediaId);
    commentForm.appendChild(userId);
    commentForm.appendChild(commentButton);
    commentPopup.appendChild(commentForm);

    //Add selected media's values to modify form
    const modButton = document.createElement('button');
    modButton.innerHTML = 'Luokkan??kym????n';
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
      getMediaPosts();
      // const json = await response.json();
      //console.log('modify response', json);
    });

    //Deletes (archives) selected media
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
        const json = await response.text();
        console.log('delete response', json);
        getMediaPosts();
      } catch (e) {
        console.log(e.message());
      }
    });

    const li = document.createElement('li');
    li.className = 'mediaCard';
    //Puts the card together
    li.appendChild(cardTop);
    li.appendChild(cardTopP);
    li.appendChild(figure);
    li.appendChild(cardDescription);
    //Handles the comment part of the card
    const commentContainer = document.createElement('div');
    commentContainer.className = 'commentcontainer';
    comments.forEach((comment) => {
      if (comment.mediaid === mediaPost.id) {
        const commentPost = document.createElement('p');
        const commentUsername = document.createElement('span');
        const commentText = document.createElement('span');
        const commentDelete = document.createElement('span');
        const commentApprove = document.createElement('span');

        commentPost.className = 'commentPost';
        commentUsername.innerHTML = comment.username;
        commentText.innerHTML = ' ' + comment.commenttext + ' ';
        commentDelete.className = 'deleteCommentButton';
        commentDelete.innerText = ' Poista ';
        commentApprove.className = 'approveCommentButton';
        commentApprove.innerText = ' Hyv??ksy ';
        commentPost.appendChild(commentUsername);
        commentPost.appendChild(commentText);

        commentApprove.addEventListener('click', async () => {
          document.querySelector(
              '.approveCommentButton').style.display = 'hidden';
          const fetchOptions = {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
          };
          try {
            console.log('Testing comment approval ' + comment.id);
            const response = await fetch(url + '/comment/' + comment.id,
                fetchOptions);
            const json = await response.json();
            //console.log('approval response', json);
          } catch (e) {
            getMediaPosts();
            //console.log(e.message());
          }
        });
        if (comment.visibility === 1) {
          commentPost.appendChild(commentApprove);
        }
        commentDelete.addEventListener('click', async () => {
          const fetchOptions = {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
          };
          try {
            console.log('Testing comment delete ' + comment.id);
            const response = await fetch(url + '/comment/' + comment.id,
                fetchOptions);
            console.log('Testing comment delete ' + comment.id);
            const json = await response.text();
            console.log('delete response', json);
          } catch (e) {
            getMediaPosts();
            console.log('Error in deleye comment',e);
          }
          getMediaPosts();
        });
        commentPost.appendChild(commentDelete);
        commentContainer.appendChild(commentPost);
      }
    });

    if (commentContainer.hasChildNodes()) {
      li.appendChild(commentContainer);
    }
    li.appendChild(openCommentFormButton);
    li.appendChild(commentPopup);
    if (mediaPost.visibility === 1) {
      li.appendChild(modButton);
    }
    li.appendChild(delButton);
    ul.appendChild(li);
    //Event listeners for commenting
    openCommentFormButton.addEventListener('click', () => {
      document.querySelector('.commentPopup').style.visibility = 'visible';
      console.log('commentButton clicked' + mediaPost);
      const inputs = commentForm.querySelectorAll('.inPut');
      inputs[0].value = '';
      inputs[1].value = mediaPost.id;
      inputs[2].value = mediaPost.userid;
    });

    commentPopupX.addEventListener('click', function() {
      this.parentElement.style.visibility = 'hidden';
    });

    commentForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const commentCheck = document.querySelector('#commentInput');
      const commentForm = document.querySelector('.commentForm');
      if (commentCheck.value.length !== 0) {
        const data = serializeJson(commentForm);
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        };

        console.log(fetchOptions);
        const response = await fetch(url + '/comment', fetchOptions);
        //const json = await response.json();
        //console.log('comment response', json);
        document.querySelector('.commentPopup').style.visibility = 'hidden';
        getMediaPosts();
      } else {
        alert('Kommenttikentt?? on tyhj??');
      }
    });
  });
};

///////////////////////////////////////
//Creates mediacards for student view//
///////////////////////////////////////

//This is basically the same as for teacher but without dlete and accept buttons
//and all content is already approved by the teacher
const createMediaCardsForStudent = (mediaPosts, comments) => {
  // clear ul
  console.log('Creating media cards...');
  ul.innerHTML = '';
  mediaPosts.forEach((mediaPost) => {
    //console.log('Media post: ' + JSON.stringify(mediaPost));

    // create li with DOM methods
    const cardTop = document.createElement('p');
    cardTop.className = 'cardTop';
    cardTop.innerHTML = mediaPost.classid + ' - Herttoniemen Ala-aste';
    const cardTopP = document.createElement('p');
    let t = (mediaPost.vst).split(/[- :TZ]/);
    cardTopP.innerHTML = t[2] + '.' + t[1] + '.' + t[0] + ' klo: ' + t[3] +
        ':' +
        t[4];
    cardTopP.style.textAlign = 'center';
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + mediaPost.mediafilename;
    img.alt = 'Miss?? kuva?';
    img.classList.add('resp');

    //Opens large image when clicking image
    img.addEventListener('click', () => {
      modalImage.src = url + '/' + mediaPost.mediafilename;
      imageModal.alt = 'Miss?? kuva?';
      imageModal.classList.toggle('hide');
    });

    const figure = document.createElement('figure').appendChild(img);
    const cardDescription = document.createElement('p');
    const cardDescUsername = document.createElement('span');
    const cardDescText = document.createElement('span');
    cardDescUsername.innerHTML = mediaPost.username;
    cardDescText.innerHTML = ' ' + mediaPost.mediadesc;
    cardDescription.appendChild(cardDescUsername);
    cardDescription.appendChild(cardDescText);

// Creating a popup comment form with dom elements
    const openCommentFormButton = document.createElement('button');
    const commentPopup = document.createElement('div');
    const commentPopupX = document.createElement('p');
    const commentForm = document.createElement('form');
    const commentInput = document.createElement('textarea');
    const mediaId = document.createElement('input');
    const userId = document.createElement('input');
    const commentButton = document.createElement('button');

    commentPopup.className = 'commentPopup';
    commentPopupX.className = 'close2';
    commentPopupX.innerHTML = 'x';
    commentPopup.appendChild(commentPopupX);
    commentButton.innerText = 'L??het??';
    commentForm.className = 'commentForm';
    commentInput.id = 'commentInput';
    commentInput.name = 'comment';
    commentInput.rows = "4";
    commentInput.className = "inPut";
    mediaId.name = 'mediaid';
    mediaId.type = 'hidden';
    mediaId.className = "inPut";
    userId.name = 'userid';
    userId.type = 'hidden';
    userId.className = "inPut";

    openCommentFormButton.className = 'openCommentFormButton';
    openCommentFormButton.innerText = 'Kommentoi';
    commentButton.className = 'commentButton';
    commentButton.type = 'submit';

    commentForm.appendChild(commentInput);
    commentForm.appendChild(mediaId);
    commentForm.appendChild(userId);
    commentForm.appendChild(commentButton);
    commentPopup.appendChild(commentForm);

    const li = document.createElement('li');
    li.className = 'mediaCard';

    li.appendChild(cardTop);
    li.appendChild(cardTopP);
    li.appendChild(figure);
    li.appendChild(cardDescription);
    const commentContainer = document.createElement('div');
    commentContainer.className = 'commentcontainer';

    comments.forEach((comment) => {
      if (comment.mediaid === mediaPost.id) {
        const commentPost = document.createElement('p');
        const commentUsername = document.createElement('span');
        const commentText = document.createElement('span');

        commentPost.className = 'commentPost';
        commentUsername.innerHTML = comment.username;
        commentText.innerHTML = ' ' + comment.commenttext + ' ';
        commentPost.appendChild(commentUsername);
        commentPost.appendChild(commentText);

        commentContainer.appendChild(commentPost);
      }
    });
    if (commentContainer.hasChildNodes()) {
      li.appendChild(commentContainer);
    }
    li.appendChild(openCommentFormButton);
    li.appendChild(commentPopup);
    ul.appendChild(li);

    openCommentFormButton.addEventListener('click', () => {
      document.querySelector('.commentPopup').style.visibility = 'visible';
      console.log('commentButton clicked at mediaPost ' + mediaPost.id);
      const inputs = commentForm.querySelectorAll('.inPut');
      inputs[0].value = '';
      inputs[1].value = mediaPost.id;
      inputs[2].value = mediaPost.userid;
      console.log("Uutta touhua: " + mediaPost.id);
    });

    commentPopupX.addEventListener('click', function() {
      this.parentElement.style.visibility = 'hidden';
    });

    commentForm.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const commentCheck = document.querySelector('#commentInput');
      const commentForm = document.querySelector('.commentForm');
      if (commentCheck.value.length !== 0) {
        const data = serializeJson(commentForm);
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        };

        console.log(fetchOptions);
        const response = await fetch(url + '/comment', fetchOptions);
        const json = await response.json();
        console.log('comment response', json);
        document.querySelector('.commentPopup').style.visibility = 'hidden';
        getMediaPosts();
      } else {
        alert('Kommenttikentt?? on tyhj??');
      }
    });
  });
};

//Get comments
const getComments = async () => {
  console.log('getComments token ', sessionStorage.getItem('token'));
  try {
    const options = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    console.log('getComments testing');
    const response = await fetch(url + '/comment', options);
    const comments = await response.json();
    console.log(comments);
    return comments;
  } catch (e) {
    console.log(e.message);
  }
};

//Close modal
close.addEventListener('click', (evt) => {
  evt.preventDefault();
  imageModal.classList.toggle('hide');
});

//AJAX call
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
    const comments = await getComments();
    if (loggedIn) {
      if (teacherness) {
        console.log('Kuvia opeille');
        createMediaCards(mediaPosts, comments);
      } else {
        console.log('Kuvia oppilaille');
        createMediaCardsForStudent(mediaPosts, comments);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Submit add media post form
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
  addForm.reset();
  console.log('add response', json);
  getMediaPosts();
});

//Submit modify form
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

//Login - creates different elements for different users
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  loginForm.value = '';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  loginForm.reset();
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
    helloAntero.innerText = `Moi ${json.user.firstname}!`;

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
  }
});

//Logsout
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
    //Removes token
    sessionStorage.removeItem('token');
    //alert('You have logged out');
    // show/hide forms + cats
    loginForm.style.display = 'block';
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
    helloAntero.innerHTML = '';
    teacherness = false;

  } catch (e) {
    console.log(e.message);
  }
  document.getElementById('password').placeholder = 'Salasana';
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
  const json = await response.text();
  addUserForm.reset();
  togbutton2();
  //console.log('user add response', json);
});

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
    button.style.display = 'none';
    gameView.style.display = 'none';
    if (loggedIn) {
      if (teacherness) {
        teacherFeed.style.display = 'block';
        //teacherDropUp.style.display = 'flex';
      }
      main.style.display = 'block';
    } else {
      mockFeed.style.display = 'block';
    }
    gamesVisible = false;
  } else if (gameButtonMode === 3) {
    console.log(gameButtonMode);
    gameButtonMode = 2;
    button.style.display = 'none';
    pelit.innerHTML = 'Etusivu';
    gameView.style.display = 'block';
    mockFeed.style.display = 'none';
    game1.style.display = 'none';
    game2.style.display = 'none';
    button.style.display = 'none';
    canvas.style.display = 'none';
    lives = 0;
    score = 0;
    firstReset();
    nav.style.visibility = 'visible';
    navToggle.style.visibility = 'visible';
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
  }
};

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

//Random colors for game elements
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
button.className = "buttonG1";
button.style.display = 'block';
button.style.margin = '10% auto';
button.style.color = `ghostwhite`;
button.style.backgroundColor = `gray`;

if (which === 1) {
  button.innerText = 'KER???? VAIN PARITTOMIA NUMEROITA!';
} else {
  button.innerText = 'KER???? VAIN PARILLISIA NUMEROITA!';
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
};

//Big reset
const superReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
  canvas.style.display = 'none';
  button.style.display = 'block';
  button.style.margin = '14% auto';
  gameButton.style.visibility = 'visible';
  gameButton.innerHTML = 'Peleihin';
  reset();
  which = Math.floor(Math.random() * 2);
  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = paddleHeight;
  button.style.color = `ghostwhite`;
  button.style.backgroundColor = `gray`;
  //Game button text
  console.log('GameButtonMode: ' + gameButtonMode);
  if (which === 1 && stopMode === 0) {
    button.innerText = `SAIT ${score} PISTETT??.\nKER???? VAIN PARITTOMIA NUMEROITA`;
  } else if (which === 1 && stopMode === 1) {
    button.innerText = `KER???? VAIN PARITTOMIA NUMEROITA`;
  } else if (which === 0 && stopMode === 0) {
    button.innerText = `SAIT ${score} PISTETT??.\nKER???? VAIN PARILLISIA NUMEROITA`;
  } else if (which === 0 && stopMode === 1) {
    button.innerText = `KER???? VAIN PARILLISIA NUMEROITA`;
  }
  gameButtonMode = 3;
  stopMode = 0;

};
//For first game
const firstReset = () => {
  number = Math.floor(Math.random() * 9) + 1;
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

  if (which === 1) {
    button.innerText = 'KER???? VAIN PARITTOMIA NUMEROITA!';
  } else {
    button.innerText = 'KER???? VAIN PARILLISIA NUMEROITA!';
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
  if (255 - color4 < 50) {
    color4 -= 100;
  }
  if (255 - color5 < 50) {
    color5 -= 100;
  }
  if (255 - color6 < 50) {
    color6 -= 100;
  }
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
  if (255 - color3 < 50) {
    color3 -= 100;
  }
  if (255 - color7 < 50) {
    color7 -= 100;
  }
  if (255 - color1 < 50) {
    color1 -= 100;
  }
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
//Displays lives, but currently just one life so this is not used
const drawLives = () => {
  ctx.font = '15px Monaco';
  ctx.fillStyle = 'grey';
  ctx.fillText('El??m??t: ', canvas.width - 85, canvas.height - 10);
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
  leftButton.innerText = 'K????nn??n aluksen poisp??in aukosta.';
  rightButton.innerText = 'En usko silmi??ni.';
  const pStory = document.getElementById('storyP');
  pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edess??si yht??kki?? musta aukko. Mit?? teet?';
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
      'Huokaiset helpotuksesta. V??ltit mustan aukon. Samassa kojelautaan syttyy v??lkkyv?? valo. Mit?? teet?',
      'Painan sen vieress?? olevaa nappia.', 'En ole huomaavinani valoa.', 1],
    [
      'Painat nappia ja valo sammuu. Ehdit h??din tuskin hymyill?? ennen kuin valo syttyy uudestaan. ' +
      'Kaiken lis??ksi ??rsytt??v?? h??lytys????ni p??r??ht???? soimaan. Mit?? teet?',
      'Painan nappia viel?? kerran',
      'Etsin kuulosuojat',
      3],
    [
      'Varovaisesti ohjaat aluksesi suuren juustopalan l??heisyyteen. Mit?? teet?',
      'Ammun juustopalaa.', 'Avaan radioyhteyden.', 5],
    [
      'Alus r??j??ht???? palasiksi. Onneksi h??t??pelastussuojakentt?? kietoutuu ymp??rillesi ja selvi??t hengiss??. ' +
      'Sinun ei auta muuta kuin rauhassa odottaa ett?? sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Radioyhteys ei toimi. Samassa iso tuntematon alus nielaisee sinun aluksesi sisuksiinsa. Mit?? teet?',
      'Ammun alukseni kaikilla tykeill??.',
      'Odotan mit?? tuleman pit????.',
      8],
    [
      'Ammut juustopalaa. Se v??l??ht???? kirkkaasti paljastaen hurjan n??k??isen avaruusaluksen. Mit?? teet?',
      'L??hden karkuun.', 'Pyyd??n anteeksi.', 9],
    [
      'Nukahdat. N??et unta ??itisi tekem??st?? appelsiinit??ytekakusta. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Alus r??j??ht???? palasiksi. Onneksi h??t??suojakentt?? kietoutuu ymp??rillesi ja selvi??t hengiss??. ' +
      'Sinun ei auta muuta kuin rauhassa odottaa ett?? sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Voi voi! Kummatkin alukset r??j??ht??v??t palasiksi. Onneksi lempe?? suojakentt?? ymp??r??i sinut ja vihaisen avaruusolennon ja selvi??tte ' +
      'hengiss?? kunnes teid??t pelastetaan. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
    [
      'L??hdet karkuun. Heti kohta tajuat ett?? se on raukkamaista ja p????t??t palata pyyt??m????n anteeksi. Ison aluksen omistaja onkin ' +
      'mukava avaruusolio ja antaa anteeksi. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
  ];
  //Story when right button pushed
  let rights = [
    [
      'Suljet silm??si. Kun avaat ne uudestaan huomaat ett?? musta aukko onkin juustonpalalta ' +
      'n??ytt??v?? avaruusalus. Mit?? teet?',
      'P????t??n l??hesty?? alusta.',
      'En viel??k????n usko silmi??ni.',
      2],
    [
      'Et kiinnit?? valoon mit????n huomiota ja jatkat matkaa. Sy??t voileiv??n ja pari keksi?? ja ' +
      'sitten aluksesi moottori r??j??ht????. Mit?? teet?',
      'Otan yhteytt?? tukikohtaan ja pyyd??n apua.',
      'Voivottelen.',
      4],
    [
      'Nyt juustopala ' +
      'onkin j??ttim??inen appelsiini. Mit?? ihmett???',
      'Suljen viel?? kerran silm??ni.',
      'K????nn??n aluksen ymp??ri.',
      6],
    [
      'Muistat ettei sinulla ' +
      'ole kuulosuojia. Ennen kuin ehdit mietti?? ett?? mit?? tekisit alus t??r??ht???? voimakkaasti. On syyt?? ehk?? toimia nopeasti. Mit?? teet?',
      'Painan nappia uudestaan.', 'Huudan pelosta.', 7],
    [
      'Sinun surkutellessa suuri alus imaisee sinun aluksesi ja lempe?? ????ni sanoo ' +
      'pelastavansa sinut ja viev??ns?? sinut takaisin tukikohtaasi. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Otat radioyhteyden. Mutta mit?? ihmett?? sanoa juustolle? Ennen kuin ehdit sanoa mit????n ottaa komentajasi yhteytt?? ' +
      'ja kertoo ett?? sinulle on uusi teht??v??. Aurinkokuntaan on saapunut avaruusolento, joka sinun pit???? vastaanottaa. Aluksen tunnistat siit??, ' +
      'ett?? se vaikutta tietyss?? valossa joko mustalta aukolta, juustolta tai appelsiinilta. Loppu!',
      'Jos haluat,',
      'palaa alkuun.',
      null],
    [
      'Ennen kuin ehdit tehd?? niin saat viestin komentajaltasi jossa kerrotaan ett?? sinulle on uusi teht??v??. Aurinkokuntaan on ' +
      'saapunut avaruusolento, joka sinun pit???? vastaanottaa. Aluksen tunnistat siit?? ett?? se vaikuttaa tietyss?? valossa joko mustalta aukolta, ' +
      'juustolta tai appelsiinilta. Loppu!', 'Jos haluat,',
      'palaa alkuun.', null],
    [
      'Alus r??j??ht???? palasiksi. Onneksi h??t??pelastussuojakentt?? kietoutuu ymp??rillesi ja selvi??t hengiss??. Sinun ei auta muuta ' +
      'kuin rauhassa odottaa ett?? sinut tullaan pelastamaan. Loppu!',
      'Jos haluat,',
      'palaa alkuun',
      null],
    [
      'Leppoisa avaruusolento kertoo huomanneensa ett?? aluksesi oli rikki ja siksi nappasi sinut ennen kuin aluksesi ehti r??j??ht????. Loppu!',
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
      pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edess??si yht??kki?? musta aukko. Mit?? teet?';
      leftButton.innerText = 'K????nn??n aluksen poisp??in aukosta.';
      rightButton.innerText = 'En usko silmi??ni';
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
      pStory.innerText = 'Olet avaruusaluksen kapteeni. Kesken rutiinilennon Jupiteriin on edess??si yht??kki?? musta aukko. Mit?? teet?';
      leftButton.innerText = 'K????nn??n aluksen poisp??in aukosta.';
      rightButton.innerText = 'En usko silmi??ni';
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
  nav.style.visibility = 'hidden';
  navToggle.style.visibility = 'hidden';
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
  nav.style.visibility = 'hidden';
  navToggle.style.visibility = 'hidden';
  gameButtonMode = 3;
  pelit.innerHTML = 'Peleihin';
  game2.style.display = 'block';
  gameView.style.display = 'none';
  button.style.display = 'block';
  gameTwo();
};

//Gamebutton listener
gameButton.addEventListener('click', revealGames);


(function() {

  let hamburger = {
    nav: document.querySelector('#nav'),
    navToggle: document.querySelector('.nav-toggle'),

    initialize() {
      this.navToggle.addEventListener('click', () => { this.toggle(); });
    },

    toggle() {
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    },
  };

  hamburger.initialize();
}());

function togbutton() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function togbutton2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}
function togbutton3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}
function togbutton4() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//We decided not to use this:
// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
/*
if (sessionStorage.getItem('token')) {
  loginWrapper.style.display = 'none';
  logOut.style.display = 'block';
  main.style.display = 'block';
  getMedia();
}*/
