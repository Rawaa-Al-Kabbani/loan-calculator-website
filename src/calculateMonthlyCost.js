function calculateMonthlyCost(loanAmount, repaymentYears, interest) {
    const months = repaymentYears * 12;
    return Math.round(loanAmount * (interest / 100) / 12 / (1 - Math.pow(1 + (interest / 100) / 12, (months * -1))));
}

export {
  calculateMonthlyCost
};
