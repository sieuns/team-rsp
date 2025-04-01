import { choice } from "./data";
const readlineSync = require("readline-sync");

function main(): void {
  console.log("가위 바위 보 게임을 시작합니다!");

  let isPlaying = true;
  while (isPlaying) {
    process.stdout.write("가위(1), 바위(2), 보(3) 중 하나를 선택하세요 : ");

    const userChoice = parseInt(readlineSync.question(""));
    const computerChoice = randomChoice();

    console.log(`컴퓨터: ${choice[computerChoice - 1]} (${computerChoice})`);
    console.log(`결과: ${determineWinner(userChoice, computerChoice)}!\n`);

    process.stdout.write(
      "새로운 게임을 시작하려면 1, 종료하려면 9를 입력하세요: "
    );

    const Action = readlineSync.question("");

    if (Action === "9") {
      console.log("게임을 종료합니다.");
      isPlaying = false;
    } else {
      continue;
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