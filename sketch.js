let kanjiTable = [['私(わたし)', 'I'], ['日(に)本(ほん)人(じん)', 'Japanese person'], ['日(に)本(ほん)人(ご)', 'Japanese Language'], ['本(ほん)人(にん)', 'the person in question; the person themselves'], ['です', 'be; is\u200b'], ['今(きょう)日', 'today; this day'], ['一(いち)', 'one'], ['国(くに)', 'country; state'], ['国(くに)語(ご)', 'national language'], ['会(かい)見(けん)', 'interview; audience; meeting; (viewing) party'], ['三(さん)人(にん)', 'three people'], ['二(ふた)人(り)', 'two persons; two people; pair; couple'], ['一(ひと)人(り)', 'one person'], ['今(こ)年(とし)', 'this year'], ['一(いち)年(ねん)', 'one year; some time ago'], ['大(おと)人(な)', 'adult'], ['大(おお)きい', 'big; large; great'], ['十(じゅう)', 'ten'], ['十(とお)日(か)', 'tenth day of the month'], ['十(じゅう)一(いち)', 'eleven; 11']];

let strokeOrders;

function preload() {
  strokeOrders = loadFont('assets/KanjiStrokeOrders_v4.004.ttf');
}

function mousePressed() {
  if (mouseY < 812 / 2) {
    k.setKanjiNumber(Math.floor(Math.random() * kanjiTable.length));
    canvas.setClean(k.getClean());
  } else {
    canvas.drawStart(mouseX, mouseY); 
  }
}

function mouseReleased() {
  canvas.drawEnd();  
}

function setup() {
  createCanvas(375, 812);
  canvas = new Canvas();
  k = new KanjiCard();
  canvas.setClean(k.getClean());
}

function draw() {
  background(230, 240, 220);
  canvas.drawUpdate(mouseX, mouseY);
  canvas.draw();
  k.draw();
}

class Canvas {
  constructor() {
    this.isDrawing = false;
    this.currentPath = [];
    this.paths = [];

    this.x = 0;
    this.y = 0;

    this.clean = "日本人";
  }

  drawStart(x, y) {
    this.isDrawing = true;
    this.currentPath = [];
    this.x = x;
    this.y = y;
    this.paths.push(this.currentPath);
  }

  drawUpdate(x, y) {
    if (this.isDrawing) {
      let point = {
        x1: this.x,
        y1: this.y,
        x2: x,
        y2: y
      }

      this.currentPath.push(point);

      this.x = mouseX;
      this.y = mouseY;
    }
  }

  setClean(clean) {
    this.clean  = clean;
  }

  drawEnd() {
    this.isDrawing = false;
    this.paths.push(this.currentPath);
  }

  draw() {
    for (let i = 0; i < this.paths.length; i++) {
    let path = this.paths[i];
    if (this.paths[i].length != 0) {
      for (let j = 0; j < path.length; j++) {
        strokeWeight(5);
        stroke(0);
        strokeCap(ROUND);
        strokeJoin(ROUND);
        line(path[j].x1, path[j].y1, path[j].x2, path[j].y2);
      }
    }
}

    push();
    textFont(strokeOrders);
    translate(375 / 2, windowHeight / 2 + 812 / 3);
    textSize(375 / 4);
    strokeWeight(0);
    stroke(0);
    fill(0, 0, 0, 50);
    textAlign(CENTER, CENTER);
    text(this.clean, 0, 0);
    pop();
  }
}

class KanjiCard {
  constructor() {
    this.x = 375 / 2;
    this.y = 812 / 2;
    this.n = 0;
    this.color = color(0);
    
    this.textSize = 65;
    
    this.d = {};
    this.clean = "";
    
    this.definition = "";
    
    this.setKanjiNumber(0);
  }

  setKanjiNumber(n) {
    this.n = n;
    this.what();
  }
  
  getClean() {
    return this.clean;
  }
  
  
  
  what() {
    let s = kanjiTable[this.n][0];
    this.definition = kanjiTable[this.n][1];
    
    let d = {};
    
    let clean = "";
    let i = 0;
    let kanji = "";
    let temp = "";
    
    while (i < s.length) {
      kanji = s[i];
      if (s[i] == '(') {
        temp = ""
        kanji = s[i - 1];

        i += 1;
        while (s[i] != ')') {
          temp += s[i];
          i += 1;
        }
        
        d[kanji] = temp;
        i += 1;
        continue;
          
      }
      
      clean += kanji;
      i += 1;
      
    }
    
  this.clean = clean;
  this.d = d;

    

  }
  
  draw() {
    push();
    
    
    strokeWeight(0);
    translate(this.x, this.y - this.y / 2);
    
    
    textAlign(CENTER, CENTER);
    // kanji
    let offsetX = (this.clean.length - 1) * this.textSize / 2;
    for (let i = 0; i < this.clean.length; i++) {
      
      if (this.clean[i] in this.d) {
        textSize(this.textSize / 2.3);
        text(this.d[this.clean[i]], this.textSize * i - offsetX, -this.textSize / 1.2);

      }

      textSize(this.textSize);
      text(this.clean[i], this.textSize * i - offsetX, 0);
      
      

    }
    
    textSize(this.textSize / 2.6);
    text(this.definition, 0, 50);
    
    pop();
  }
  
  
}
