const ufo = require('./ufo');
const fs = require('fs');
var yesno = require('yesno');
const readlineSync = require('readline-sync')

function inArr(arr, val){
    for (let a = 0; a < arr.length; a++ ){
        if(arr[a].letter==val){
            return a 
        }
    }
    return -1;
}

function checkPos(obj, word){
    var cnt=0;
    for (let i = 0; i < obj.length ; i++ )
    {
        cnt=0;
        for(var x = 0 ;x < obj[i].position.length ; x++){
            
            if(word.charAt(obj[i].position[x]) == obj[i].letter) cnt++;
        }
        if(cnt != obj[i].position.length) return false;
    }

    if(cnt == obj[obj.length-1].position.length) return true;
    else return false;
}

try {
    // let temp = []
    //////Get the text in nouns.txt//////
    const data = fs.readFileSync('nouns.txt', 'utf8')
    //////Tranfer to Array//////
    var newdata = data.replace(/\n/g,'\t');
    var newestdata = newdata.replace(/[^\w\s]|_/g, "");
    var res = newestdata.split('\t');///---> dictionary array
   
    //////Get random value from array / Transfer to uppercase / Transfer to array//////
    var rand = res[Math.floor(Math.random() * res.length)];
    var upperRand = rand.toUpperCase();
    var rand_arr = upperRand.split('')///---> random word array
    var match_l = rand_arr.length;
    console.log(rand_arr)
    console.log(match_l)
    var match_w = 0;
    var k = 0;
    var word = []; //Codeword
    var another_word = [];
    var guess_arr=[];
   
    var temp = [];
    ////// Interface //////
    console.log('UFO: The Game')
    console.log('Instruction: save us from alien abduction by guessing letters in the codeword.')
    console.log(ufo[k])
    console.log('Incorrect Guesses')
    console.log('None');
    var Incorrect = '' ////// Incorrect guesses
    
    console.log('Codeword:')

    for(let i =0; i < rand_arr.length; i++){
      word[i] = '_ ' ///use array!!!!!!!
      another_word[i]== '_';
    }
    console.log(word.toString().replace(/,/g, '')); ////// The Codeword array ////// 
    let blank_letter = 0 ;
    let attempt = true;
    let input_arr = []

    ///Start///
    while(attempt){
      blank_letter = 0 ;

      //////count how many time user get correct
      for(let j = 0; j<word.length; j++){
        if(word[j]== '_ '){
          blank_letter++
        }else{
        }
      }
      if(blank_letter>0){ ////// Haven't finished yet (Condition is )//////
        let input = readlineSync.question("Please enter your guess: ");
        let Upper_input=input.toUpperCase();
        if(Upper_input.length>1){ ////// If input more than one letter //////
          console.log('I cannot understand your input. Please guess a single letter.')
        }else if(Upper_input.length==0){ ////// If input more than one letter //////
          console.log('I cannot understand your input. Please guess a single letter.')
        }else if(input_arr.indexOf(Upper_input)>-1){ ////// If input more than once //////
          console.log('You can only guess that letter once, please try again.')
        }else{////// Input is correct //////

///////////////////////////// Correct///////////////////////////////// 
          if(rand_arr.indexOf(Upper_input)>-1){ ////// If input exist
            
            for(let j = 0; j < word.length; j++){////// find the order in the array and replace '_'
              if(rand_arr[j]==Upper_input){
                word[j]=Upper_input+ ' '
                another_word[j]=Upper_input
                if(guess_arr.length>0){
                    let k = inArr(guess_arr, Upper_input);
                        if (k != -1) {
                            guess_arr[k].position.push(j)                     
                        }else{
                            guess_arr.push({letter:Upper_input,position:[j]})                                        
                        }  
                }else{
                    guess_arr.push({letter:Upper_input,position:[j]})
                }
                console.log(guess_arr)
              }else{
              }
            }
            
            for (let b = 0; b<res.length; b++){
                if(match_l == res[b].length){
                   
                    
                       
                        if(checkPos(guess_arr, res[b].toUpperCase())){                          
                           temp.push(res[b])
                        }else{

                        }
                    
                }
            }
          
            console.log(temp)
            console.log(another_word)
            console.log('Correct! You are closer to cracking the codeword.')
            console.log(ufo[k])
            console.log('Incorrect Guesses:')
            console.log(Incorrect)
            console.log('Codeword')
            console.log(word.toString().replace(/,/g, ''))
            console.log('Number of dictionary matches: '+ temp.length)
           
            input_arr.push(Upper_input);////// put input into array
            temp = [];
           
          }else{

///////////////////////////// Incorrect/////////////////////////////////            
            ////// Leave game or not //////
            if(k>4){////// if user have guessed wrong more than 6 times
              console.log('Incorrect! The tractor beam has pulled the person :( ')
              console.log(ufo[k+1])
              console.log('Incorrect Guesses:')
              Incorrect = Incorrect + Upper_input + " "
              console.log(Incorrect)
              console.log('Codeword')
              console.log(word.toString().replace(/,/g, ''))
              let ans = readlineSync.question('Would you like to play again (Y/N)?').toLowerCase()
              
              if (ans == 'n') {
                console.log('Goodbye!');
                attempt = false
              }else if(ans == 'y'){
                
                // Reset all arguement
                rand = res[Math.floor(Math.random() * res.length)];
                upperRand = rand.toUpperCase();
                rand_arr = upperRand.split('')
                match_l = rand_arr.length;
                console.log(rand_arr);///The original Codeword array
                k = 0;
                word = []; //Codeword
                console.log('UFO: The Game')
                console.log('Instruction: save us from alien abduction by guessing letters in the codeword.')
                console.log(ufo[k])
                console.log('Incorrect Guesses')
                console.log('None');
                Incorrect = '' ////// Incorrect guesses
                console.log('Codeword:')
                for(let i =0; i < rand_arr.length; i++){
                  word[i] = '_ ' ///use array!!!!!!!
                }
                console.log(word.toString().replace(/,/g, '')); ////// The Codeword array ////// 
                blank_letter = 0 ;
                attempt = true;
                input_arr = []
                guess_arr=[]
                another_word=[]
              }else{
                console.log('Please input Y or YES or N or NO and Goodbye!:)')
                attempt = false
                
              }
            }else{

              k++
              console.log('Incorrect! The tractor beam pulls the person in further.')
              console.log(ufo[k])
              console.log('Incorrect Guesses:')
              Incorrect = Incorrect + Upper_input + " "
              console.log(Incorrect)
              console.log('Codeword')
              console.log(word.toString().replace(/,/g, ''))
              console.log('Number of dictionary matches: '+ temp.length)
              input_arr.push(Upper_input);////// put input into array

            }
            
            
          }
        }
      }else{ ////// Finish!!! Leave game or not //////
        console.log('Correct! You saved the person and earned a medal of honor!')
        console.log('The codeword is:'+ word.toString().replace(/\s+,/g, ''))
        let ans = readlineSync.question('Would you like to play again (Y/N)?').toLowerCase()
        if (ans == 'n') {
          // `N` key was pressed.
          console.log('Goodbye!');
          attempt = false
        }else if(ans == 'y'){
      
          // Reset all arguement
          rand = res[Math.floor(Math.random() * res.length)];
          upperRand = rand.toUpperCase();
          rand_arr = upperRand.split('')
          match_l = rand_arr.length;
          console.log(rand_arr);///The original Codeword array
          k = 0;
          word = []; //Codeword
          console.log('UFO: The Game')
          console.log('Instruction: save us from alien abduction by guessing letters in the codeword.')
          console.log(ufo[k])
          console.log('Incorrect Guesses')
          console.log('None');
          Incorrect = '' ////// Incorrect guesses
          console.log('Codeword:')
          for(let i =0; i < rand_arr.length; i++){
            word[i] = '_ ' ///use array!!!!!!!
          }
          console.log(word.toString().replace(/,/g, '')); ////// The Codeword array ////// 
          blank_letter = 0 ;
          attempt = true;
          input_arr = []
          guess_arr = []
          another_word=[]
        }else{
          console.log('Please input Y or YES or N or NO and Goodbye!:)')
          attempt = false
          }
        }
    }

    //////Get the input from user//////
    
  } catch (err) {
    console.error(err)
  }
  