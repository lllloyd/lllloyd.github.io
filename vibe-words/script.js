// Dictionary data
const dictionary = {
    // Common verbs
    "accept": "To receive or take something offered willingly",
    "achieve": "To successfully reach a goal through effort",
    "adapt": "To change to suit different conditions or needs",
    "begin": "To start or commence something",
    "build": "To construct or create something",
    "change": "To make or become different",
    "create": "To bring something into existence",
    "decide": "To make a choice or judgment",
    "develop": "To grow or cause to grow gradually",
    "explore": "To travel through or investigate an unfamiliar area",

    // Common nouns
    "air": "The invisible gaseous substance surrounding the earth",
    "animal": "A living organism that feeds on organic matter",
    "book": "A written or printed work consisting of pages",
    "city": "A large town with many buildings and people",
    "computer": "An electronic device for storing and processing data",
    "door": "A hinged barrier used to close off an entrance",
    "earth": "The planet on which we live",
    "food": "Any nutritious substance eaten to maintain life",
    "friend": "A person with whom one has a bond of mutual affection",
    "garden": "A piece of ground used to grow plants",

    // Technology terms
    "algorithm": "A process or set of rules to be followed in calculations",
    "browser": "A program used to access and navigate the internet",
    "cloud": "A network of remote servers for storing and accessing data",
    "code": "Instructions written in a programming language",
    "data": "Facts and statistics collected for reference or analysis",
    "email": "Messages distributed by electronic means",
    "hardware": "The physical components of a computer system",
    "internet": "A global computer network providing information",
    "keyboard": "A panel of keys for operating a computer",
    "network": "A group of interconnected computers or devices",

    // Adjectives
    "amazing": "Causing great surprise or astonishment",
    "beautiful": "Pleasing the senses or mind aesthetically",
    "careful": "Making sure of avoiding potential danger",
    "different": "Not the same as another or each other",
    "easy": "Achieved without great effort; presenting few difficulties",
    "fast": "Moving or capable of moving at high speed",
    "good": "Of high quality or an acceptable standard",
    "happy": "Feeling or showing pleasure or contentment",
    "important": "Of great significance or value",
    "kind": "Having or showing a gentle nature",

    // Science terms
    "atom": "The smallest unit of a chemical element",
    "biology": "The study of living organisms",
    "chemistry": "The study of substances and their interactions",
    "energy": "The strength and vitality required for activity",
    "force": "Strength or energy as an attribute of action",
    "gravity": "The force that attracts objects toward earth",
    "light": "The natural agent that stimulates sight",
    "matter": "Physical substance in general",
    "physics": "The study of matter, energy, and their interactions",
    "science": "The systematic study of the structure of the natural world",

    // Everyday objects
    "bag": "A container made of flexible material with an opening",
    "chair": "A separate seat for one person with a back",
    "desk": "A piece of furniture with a flat surface for writing",
    "glass": "A hard, transparent substance used for windows and containers",
    "lamp": "A device for giving light",
    "paper": "Material manufactured in thin sheets from wood pulp",
    "phone": "A device for transmitting sound over distances",
    "table": "A piece of furniture with a flat top and legs",
    "watch": "A small timepiece worn on the wrist",
    "window": "An opening in a wall or vehicle to let in light",

    // Nature
    "beach": "A sandy or pebbly shore by the ocean",
    "cloud": "A visible mass of water droplets in the atmosphere",
    "flower": "The seed-bearing part of a plant",
    "forest": "A large area covered chiefly with trees",
    "grass": "Green plants with narrow leaves growing from the ground",
    "mountain": "A large natural elevation of earth's surface",
    "ocean": "A very large expanse of sea",
    "river": "A large natural stream of water flowing to the sea",
    "tree": "A woody perennial plant with a single main stem",
    "water": "A clear, colorless liquid essential for life",

    // Actions
    "breathe": "To take air into and expel it from the lungs",
    "drink": "To take liquid into the mouth and swallow",
    "eat": "To put food into the mouth and swallow it",
    "jump": "To push oneself off a surface and into the air",
    "laugh": "To make sounds expressing amusement",
    "move": "To change position or go from one place to another",
    "run": "To move at a speed faster than walking",
    "sleep": "To be in a state of rest with closed eyes",
    "talk": "To speak in order to give information or express ideas",
    "walk": "To move on foot at a regular pace",

    // Emotions
    "anger": "A strong feeling of annoyance or displeasure",
    "fear": "An unpleasant emotion caused by threat of danger",
    "joy": "A feeling of great pleasure and happiness",
    "love": "An intense feeling of deep affection",
    "peace": "Freedom from disturbance; tranquility",
    "pride": "A feeling of deep pleasure from achievements",
    "sad": "Feeling or showing sorrow; unhappy",
    "smile": "Form one's features into a pleased expression",
    "stress": "A state of mental or emotional strain",
    "worry": "Feel or cause to feel anxious about something",

    // Original dictionary entries
    "hello": "A greeting used to welcome someone or initiate a conversation",
    "world": "The earth and all life upon it",
    "python": "A high-level programming language known for its simplicity and readability",
    "swipe": "To move your finger or hand quickly across a surface",
    "dictionary": "A book or digital resource that lists words and their definitions",
    "program": "A set of instructions that tell a computer what to do",
    "test": "A procedure to check the quality, performance, or reliability of something",
    "example": "A representative instance or sample used to explain something",
    "simple": "Easily understood or done; not complex or complicated",
    "input": "What is put in, taken in, or operated on by any process or system",
    "output": "The information produced by a computer program or process"
};

class SwipeKeyboard {
    constructor() {
        this.keyboard = document.getElementById('keyboard');
        this.wordElement = document.getElementById('word');
        this.definitionElement = document.getElementById('definition');
        this.currentWord = '';
        this.lastX = null;
        this.columnWidth = 60;
        
        // Fixed sizes for different letter states
        this.letterBaseHeight = 20;  // Base size for normal letters
        this.letterActiveHeight = 48; // Size for active letter
        this.letterNearbyHeight = 32; // Size for nearby letters
        this.nearbyLetterRange = 2;   // How many letters above/below to enlarge
        
        this.createColumns();
        this.createFloatingLetters();
        this.setupEventListeners();
        
        window.addEventListener('resize', () => this.adjustLetterSizes());
        this.adjustLetterSizes();
    }
    
    createColumns() {
        this.leftColumn = document.createElement('div');
        this.rightColumn = document.createElement('div');
        this.leftColumn.className = 'letter-column left';
        this.rightColumn.className = 'letter-column right';
        
        // Set initial positions centered in the keyboard
        const centerX = this.keyboard.offsetWidth / 2;
        const initialLeftX = centerX - this.columnWidth;
        this.leftColumn.style.left = `${initialLeftX}px`;
        this.rightColumn.style.left = `${initialLeftX + this.columnWidth}px`;
        
        'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
            [this.leftColumn, this.rightColumn].forEach(column => {
                const letterDiv = document.createElement('div');
                letterDiv.className = 'letter';
                letterDiv.textContent = letter;
                column.appendChild(letterDiv);
            });
        });
        
        this.keyboard.append(this.leftColumn, this.rightColumn);
    }

    createFloatingLetters() {
        this.floatingLetters = document.createElement('div');
        this.floatingLetters.className = 'floating-letters';
        this.keyboard.appendChild(this.floatingLetters);
    }
    
    setupEventListeners() {
        const events = {
            mouse: ['mousedown', 'mousemove', 'mouseup'],
            touch: ['touchstart', 'touchmove', 'touchend']
        };
        
        Object.entries(events).forEach(([type, eventNames]) => {
            const target = type === 'mouse' ? this.keyboard : document;
            eventNames.forEach(eventName => {
                target.addEventListener(eventName, e => {
                    if (eventName.includes('start')) this.startSwipe(e);
                    else if (eventName.includes('move')) this.duringSwipe(e);
                    else this.endSwipe();
                });
            });
        });
    }
    
    startSwipe(e) {
        e.preventDefault();
        this.currentWord = '';
        this.lastX = null;
        this.floatingLetters.innerHTML = '';
        this.updateDisplay();
        this.duringSwipe(e);
    }
    
    duringSwipe(e) {
        e.preventDefault();
        const pos = this.getEventPosition(e);
        const { leftX, rightX } = this.getColumnPositions();
        
        // Update column positions if cursor is outside bounds
        if (pos.x < leftX - this.columnWidth/2 || pos.x > rightX + this.columnWidth/2) {
            this.updateColumnPositions(pos.x);
        }
        
        // Handle letter selection
        this.handleLetterSelection(pos);
        
        this.lastX = pos.x;
        this.updateActiveLetters(pos);
    }
    
    getColumnPositions() {
        const centerX = this.keyboard.offsetWidth / 2;
        return {
            leftX: parseFloat(this.leftColumn.style.left) || (centerX - this.columnWidth),
            rightX: parseFloat(this.rightColumn.style.left) || (centerX)
        };
    }
    
    updateColumnPositions(cursorX) {
        const { leftX, rightX } = this.getColumnPositions();
        let newLeftX, newRightX;
        
        if (cursorX < leftX - this.columnWidth/2) {
            newLeftX = cursorX + this.columnWidth/2;
            newRightX = newLeftX + this.columnWidth;
        } else {
            newRightX = cursorX - this.columnWidth/2;
            newLeftX = newRightX - this.columnWidth;
        }
        
        // Keep columns within keyboard bounds
        const maxX = this.keyboard.offsetWidth - this.columnWidth;
        if (newLeftX < 0) {
            newLeftX = 0;
            newRightX = this.columnWidth;
        } else if (newRightX > maxX) {
            newRightX = maxX;
            newLeftX = maxX - this.columnWidth;
        }
        
        this.leftColumn.style.left = `${newLeftX}px`;
        this.rightColumn.style.left = `${newRightX}px`;
    }
    
    handleLetterSelection(pos) {
        const { leftX } = this.getColumnPositions();
        const midpoint = leftX + this.columnWidth/2;
        const isLeftOfMid = pos.x < midpoint;
        
        if (this.lastX !== null) {
            const wasLeftOfMid = this.lastX < midpoint;
            if (wasLeftOfMid !== isLeftOfMid) {
                const letter = this.findClosestLetter(pos, wasLeftOfMid ? this.rightColumn : this.leftColumn);
                if (letter) {
                    this.currentWord += letter.textContent;
                    this.addFloatingLetter(letter.textContent);
                    this.updateDisplay();
                }
            }
        }
    }
    
    updateActiveLetters(pos) {
        // Determine which column to highlight based on cursor position
        const { leftX } = this.getColumnPositions();
        const midpoint = leftX + this.columnWidth/2;
        const isLeftOfMid = pos.x < midpoint;
        
        // Reset all letters to base size
        [this.leftColumn, this.rightColumn].forEach(column => {
            column.querySelectorAll('.letter').forEach(l => {
                l.classList.remove('active', 'nearby');
                l.style.height = `${this.letterBaseHeight}px`;
                l.style.lineHeight = `${this.letterBaseHeight}px`;
                l.style.fontSize = `${Math.max(12, this.letterBaseHeight * 0.7)}px`;
            });
        });
        
        // Only get the letter for the active column
        const activeColumn = isLeftOfMid ? this.leftColumn : this.rightColumn;
        const activeLetter = this.findClosestLetter(pos, activeColumn);
        
        // Enlarge letters only in the active column
        if (activeLetter) {
            const letterIndex = Array.from(activeLetter.parentNode.children).indexOf(activeLetter);
            const letters = activeLetter.parentNode.children;
            
            // Set sizes for nearby letters
            for (let i = Math.max(0, letterIndex - this.nearbyLetterRange); 
                 i <= Math.min(25, letterIndex + this.nearbyLetterRange); i++) {
                const currentLetter = letters[i];
                if (i === letterIndex) {
                    // Active letter
                    currentLetter.classList.add('active');
                    currentLetter.style.height = `${this.letterActiveHeight}px`;
                    currentLetter.style.lineHeight = `${this.letterActiveHeight}px`;
                    currentLetter.style.fontSize = `${Math.max(24, this.letterActiveHeight * 0.7)}px`;
                } else {
                    // Nearby letters
                    currentLetter.classList.add('nearby');
                    currentLetter.style.height = `${this.letterNearbyHeight}px`;
                    currentLetter.style.lineHeight = `${this.letterNearbyHeight}px`;
                    currentLetter.style.fontSize = `${Math.max(16, this.letterNearbyHeight * 0.7)}px`;
                }
            }
        }
    }
    
    adjustLetterSizes() {
        // Apply base sizes to all letters
        [this.leftColumn, this.rightColumn].forEach(column => {
            column.querySelectorAll('.letter').forEach(letter => {
                letter.style.height = `${this.letterBaseHeight}px`;
                letter.style.lineHeight = `${this.letterBaseHeight}px`;
                letter.style.fontSize = `${Math.max(12, this.letterBaseHeight * 0.7)}px`;
            });
        });
    }
    
    findClosestLetter(pos, column) {
        if (!column) return null;
        
        // Get column's relative position
        const columnRect = column.getBoundingClientRect();
        const keyboardRect = this.keyboard.getBoundingClientRect();
        const relativeY = pos.y;  // pos.y is already relative to keyboard
        
        // Calculate which letter we're closest to based on relative position
        const letterHeight = columnRect.height / 26;  // 26 letters
        const letterIndex = Math.floor(relativeY / letterHeight);
        
        // Ensure we stay within bounds
        if (letterIndex >= 0 && letterIndex < 26) {
            return column.children[letterIndex];
        }
        return null;
    }
    
    endSwipe() {
        [this.leftColumn, this.rightColumn].forEach(column => {
            column.querySelectorAll('.letter.active').forEach(l => l.classList.remove('active'));
        });
        this.floatingLetters.innerHTML = '';
        this.updateDisplay();
    }
    
    getEventPosition(e) {
        const rect = this.keyboard.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }
    
    addFloatingLetter(letter) {
        const letterElement = document.createElement('div');
        letterElement.className = 'floating-letter';
        letterElement.textContent = letter;
        this.floatingLetters.appendChild(letterElement);
    }
    
    updateDisplay() {
        this.wordElement.textContent = this.currentWord;
        this.definitionElement.textContent = dictionary[this.currentWord.toLowerCase()] || '';
    }
}

// Initialize the keyboard when the page loads
document.addEventListener('DOMContentLoaded', () => new SwipeKeyboard()); 