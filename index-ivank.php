<html>
<head>
	<meta charset="UTF-8">
	<title>Ivank</title>
</head>
<body>
    <body onload="setup();"><canvas id="c"></canvas></body>
    <script src="vendor/ivank-1.2.js"></script>
    <script type="text/javascript">
           var stage = new Stage("c");
           var s = new Sprite();

          function setup()
          {
               stage.addChild(s);
            var color = Math.floor(Math.random()*0xffffff);
            s.graphics.beginFill(color, 0.6);
            s.graphics.drawRect(20, 20, 70, 70);
            s.graphics.endFill();

            console.log(s)
            loop()
          }

          function loop() {
            console.log('hi')
              window.requestAnimationFrame(loop)
          }
    </script>
</body>
</html>
