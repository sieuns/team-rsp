const readlineSync = require("readline-sync");
export const choices: string[] = ["가위", "바위", "보"];

function main(): void {
  let isPlaying = true;

  while (isPlaying) {
    process.stdout.write("새로운 게임을 시작하려면 1, 종료하려면 9를 입력하세요: ");
    const Action = readlineSync.question("");
  
    if (Action === "9") {
      console.log("게임을 종료합니다.");
      break;
    }

    console.log("");

    process.stdout.write("이름을 입력해주세요: ");
    const playerName = readlineSync.question("");

    console.log("");
    console.log("챔피언십 모드 시작 3판 2선승제로 진행됩니다.\n");

    let userWins = 0;
    let computerWins = 0;

    while(userWins < 2 && computerWins < 2){
      process.stdout.write("가위(1), 바위(2), 보(3) 중 하나를 선택하세요 : ");
      
      const userChoice = parseInt(readlineSync.question(""));
      const computerChoice = randomChoice();
  
      console.log(`컴퓨터: ${choices[computerChoice - 1]} (${computerChoice})`);

      const result = determineWinner(userChoice, computerChoice);
      
      if(result === "승리!"){
        userWins++;
      } else if(result === "패배!"){
        computerWins++;
      }

      console.log(`결과: ${result}(${userWins}:${computerWins})\n`);

    }
    
    if(userWins == 2){
      console.log(`${playerName}님이 2승을 달성하여 승리했습니다!\n`);
    } else {
      console.log(`컴퓨터가 2승을 달성하여 승리했습니다!\n`);
    }
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

main(); 