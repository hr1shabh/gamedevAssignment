    let paddle, ball;
    let bricks = [];
    let brickRows = 4;
    let brickCols = 10;
    let brickWidth, brickHeight;
    let lives = 3;
    let score = 0;

    function setup() {
      createCanvas(800, 600);
      brickWidth = width / brickCols;
      brickHeight = 30;

      paddle = createVector(width / 2, height - 20);
      ball = createVector(width / 2, height / 2);
      ball.velocity = createVector(random(-5, 5), random(-5, 5));

      for (let i = 0; i < brickRows; i++) {
        for (let j = 0; j < brickCols; j++) {
          bricks.push(createVector(j * brickWidth, i * brickHeight));
        }
      }
    }

    function draw() {
      background(0);
      displayPaddle();
      displayBall();
      displayBricks();
      movePaddle();
      moveBall();
      checkCollisions();
      displayScoreLives();
    }

    function displayPaddle() {
      fill(255);
      rectMode(CENTER);
      rect(paddle.x, paddle.y, 100, 15);
    }

    function displayBall() {
      fill(255);
      ellipse(ball.x, ball.y, 20, 20);
    }

    function displayBricks() {
      for (let brick of bricks) {
        fill(255, 0, 0);
        rect(brick.x + brickWidth / 2, brick.y + brickHeight / 2, brickWidth, brickHeight);
      }
    }

    function movePaddle() {
      if (keyIsDown(LEFT_ARROW)) {
        paddle.x -= 5;
      } else if (keyIsDown(RIGHT_ARROW)) {
        paddle.x += 5;
      }

      paddle.x = constrain(paddle.x, 50, width - 50);
    }

    function moveBall() {
      ball.x += ball.velocity.x;
      ball.y += ball.velocity.y;

      if (ball.x <= 10 || ball.x >= width - 10) {
        ball.velocity.x *= -1;
      }

      if (ball.y <= 10) {
        ball.velocity.y *= -1;
      }
    }

    function checkCollisions() {
      if (ball.x >= paddle.x - 50 && ball.x <= paddle.x + 50 && ball.y >= height - 30) {
        ball.velocity.y *= -1;
      }

      for (let i = bricks.length - 1; i >= 0; i--) {
        let brick = bricks[i];
        if (ball.x >= brick.x && ball.x <= brick.x + brickWidth && ball.y >= brick.y && ball.y <= brick.y + brickHeight) {
          ball.velocity.y *= -1;
          bricks.splice(i, 1);
          score += 10;
        }
      }

      if (ball.y > height) {
        ball = createVector(width / 2, height / 2);
        ball.velocity = createVector(random(-5, 5), random(-5, 5));
        lives--;
      }
    }

    function displayScoreLives() {
      fill(255);
      textSize(20);
      text(`Score: ${score}`, 10, 30);
      text(`Lives: ${lives}`, width - 100, 30);

      if (lives === 0) {
        fill(255);
        textSize(40);
        text("Game Over", width / 2 - 80, height / 2);
        noLoop();
      }
    }

