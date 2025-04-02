const readlineSync = require("readline-sync");
export const choices: string[] = ["가위", "바위", "보"];

let recentChoice: number[] = [];  
let max = 5;
let min = 3;

interface playerRecord{
  name : string;
  wins : number;
  losses : number;
}

const playerRecords : playerRecord[] = [];

function main(): void { 
  let isPlaying = true;
  while (isPlaying) {
    process.stdout.write("게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9를 입력하세요: ");
    const action = readlineSync.question("");

    if (action === "1") {
      startGame();
    } else if (action === "2") {
      showRankings();
    } else if (action === "9") {
      console.log("게임을 종료합니다.");
      isPlaying = false;
    }
  }
}

function startGame () : void {
  process.stdout.write("이름을 입력해주세요: ");
  const playerName = readlineSync.question("");

  console.log("\n챔피언십 모드 시작! 3판 2선승제로 진행됩니다.\n");

  let userWins = 0;
  let computerWins = 0;

  while (userWins < 2 && computerWins < 2) {
    process.stdout.write("가위(1), 바위(2), 보(3) 중 하나를 선택하세요: ");
    const userChoice = parseInt(readlineSync.question(""));
    recentChoice.push(userChoice);

    if(recentChoice.length > max) {
      recentChoice.shift(); 
    }

    const computerChoice = randomChoice();
    console.log(`컴퓨터: ${choices[computerChoice - 1]} (${computerChoice})`);
    const result = determineWinner(userChoice, computerChoice);

    if (result === "승리!") userWins++;
    else if (result === "패배!") computerWins++;

    console.log(`결과: ${result} (${userWins}:${computerWins})\n`);

    checkPattern();

    console.log("");
    
  }

  if (userWins === 2) {
    console.log(`${playerName}님이 2승을 달성하여 승리했습니다!\n`);
    updatePlayerRecord(playerName, true);
  } else {
    console.log(`컴퓨터가 2승을 달성하여 승리했습니다!\n`);
    updatePlayerRecord(playerName, false);
  }
}

function randomChoice(): number {
  return Math.floor(Math.random() * 3 + 1);
}

function determineWinner(userChoice: number, computerChoice: number): string {
  if (userChoice === computerChoice) {
    return "무승부";
  }
  if (
    (userChoice === 1 && computerChoice === 3) ||
    (userChoice === 2 && computerChoice === 1) ||
    (userChoice === 3 && computerChoice === 2)
  ) {
    return "승리!";
  }
  return "패배!";
}

function checkPattern () : void {
  if(recentChoice.length < min){
    return;
  }

  const frequency : Record <number, number> = {1 : 0, 2 : 0, 3 : 0};

  recentChoice.forEach((choice) => {
    frequency[choice]++
    });

  for(const [choice, count] of Object.entries(frequency)){
    if(count >= 3) {
      console.log(`AI가 패턴을 감지했습니다: 당신은 '${choices[parseInt(choice) - 1]}(${choice})'를 자주 선택합니다. \n`);
    } 
  }
}

function updatePlayerRecord(name : string, won : boolean) : void {
  let player = playerRecords.find(p=> p.name === name);
  if(!player){
    player = { name, wins:0, losses:0 };
    playerRecords.push(player);
  }
 if(won){
  player.wins++;
 } else{
  player.losses++;
 }
}

function showRankings() : void{
  console.log("\n[승률 랭킹]");
  const sortedRecords = [...playerRecords].sort((a,b)=>{
    const winRateA = Math.floor((a.wins/(a.wins+a.losses || 1))* 100);
    const winRateB = Math.floor((b.wins/(b.wins+b.losses || 1))* 100);

    return winRateB - winRateA;
  });

  sortedRecords.forEach((player,index)=>{
    const winRate = Math.floor((player.wins/(player.wins + player.losses || 1))* 100);
    console.log(`${index+1}.${player.name} - ${winRate}% (${player.wins}승 ${player.losses}패)`)
  });
  
  console.log("");
}
 
main();