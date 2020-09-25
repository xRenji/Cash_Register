// Value of currencies in pennies
const CURRENCY = [
  ["PENNY", 1],
  ["NICKEL", 5],
  ["DIME", 10],
  ["QUARTER", 25],
  ["ONE", 100],
  ["FIVE", 500],
  ["TEN", 1000],
  ["TWENTY", 2000],
  ["ONE HUNDRED", 10000],
];

function checkCashRegister(price, cash, cid) {
  let change = (cash - price) * 100; //change in pennies
  let sum = 0; //validate that change was successful
  let give = []; //Given change, Array to return
  let counter = 0; // Counter fro transactions on single currency

  // Cash in the register, in pennies
  for (let i = 0; i < cid.length; i++) {
    cid[i][1] *= 100;
  }

  let total =
    cid[0][1] +
    cid[1][1] +
    cid[2][1] +
    cid[3][1] +
    cid[4][1] +
    cid[5][1] +
    cid[6][1] +
    cid[7][1] +
    cid[8][1];

  //console.log(change);
  //console.log(total);

  // NOT ENOUGH CHANGE
  if (change > total) {
    console.log({ status: "INSUFFICIENT_FUNDS", change: [] });
    return {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    };
    // CHANGE EQUAL TO LAST CASH IN REGISTER
  } else if (change == total) {
    //Go back to dollar
    for (let i = 0; i < cid.length; i++) {
      cid[i][1] /= 100;
    }
    console.log({ status: "CLOSED", change: cid });
    return { status: "CLOSED", change: cid };

    // GIVE CHANGE
  } else {
    // for each type of CURRENCY
    for (let i = 8; i >= 0; i--) {
      // loop while it can be divided by the bill and the money in the register are > 0
      while (change / CURRENCY[i][1] >= 1 && cid[i][1] > 0) {
        //decrement change and register
        change = change - CURRENCY[i][1];

        counter++; //count number of transactions
        cid[i][1] -= CURRENCY[i][1];
      }
      // record transactions
      if (counter > 0) {
        cid[i][1] = (counter * CURRENCY[i][1]) / 100;
        counter = 0;
        give.push(cid[i]);
        // console.log(give);
      }
    }

    //Check if change was successful, otherwise return no change available
    change = (cash - price) * 100;
    for (let i = 0; i < give.length; i++) {
      sum += give[i][1];
    }
    sum *= 100;
    // console.log(sum);
    // console.log(change);
    if (sum !== change) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return {
        status: "OPEN",
        change: give,
      };
    }
  }
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
