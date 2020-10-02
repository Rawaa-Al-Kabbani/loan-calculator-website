<template>
  <form class="form">
    <div class="monthly-cost">
      <div class="monthly-cost-label">
        <h3>{{monthlyCostLabel}}</h3>
      </div>
      <div class="monthly-cost-value">{{toPayMonthly}} {{monthlyCostSuffix}}</div>
    </div>
    <div>
      <div class="amount-label">
        <h3>{{loanAmountLabel}}</h3>
      </div>
      <div class="flex-container">
        <button class="calculator-button" type="button" v-on:click="decreaseLoanAmount">
          <span>-</span>
        </button>

        <input
          class="amount-value"
          type="number"
          v-model.number.lazy="loanAmount"
          :min="minLoanAmount"
          :max="maxLoanAmount"
          :step="loanAmountStep"
        />

        <button class="calculator-button" type="button" v-on:click="increaseLoanAmount">
          <span>+</span>
        </button>
      </div>
    </div>

    <div class="years-label">
      <div>
        <h3>{{repaymentYearsLabel}}</h3>
      </div>

      <div class="flex-container">
        <button
          class="calculator-button calculator-button-minus"
          type="button"
          v-on:click="decreaseRepaymentYears"
        >
          <span>-</span>
        </button>

        <input
          class="repayment-value"
          type="number"
          v-model.number.lazy="repaymentYears"
          :min="minRepaymentYears"
          :max="maxRepaymentYears"
        />
        <button class="calculator-button" type="button" v-on:click="increaseRepaymentYears">
          <span>+</span>
        </button>
      </div>
    </div>

    <div class="flex-container-submit">
      <button class="submit-button">
        {{ctaLabel}}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="currentColor"
          class="arrow"
        >
          <path
            d="M16.01 11H5c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35V11z"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script>
import calculatorContent from "../calculatorContent";
import { calculateMonthlyCost } from "../calculateMonthlyCost";

export default {
  name: "Calculator",
  data() {
    return {
      ...calculatorContent,
      loanAmount: 250000,
      repaymentYears: 14,
      toPayMonthly: calculateMonthlyCost(250000, 14, 5.77),
    };
  },
  methods: {
    decreaseLoanAmount() {
      this.loanAmount -= this.loanAmountStep;
    },
    increaseLoanAmount() {
      this.loanAmount += this.loanAmountStep;
    },
    decreaseRepaymentYears() {
      this.repaymentYears--;
    },
    increaseRepaymentYears() {
      this.repaymentYears++;
    },
    updateMonthlyPayment() {
      this.toPayMonthly = calculateMonthlyCost(
        this.loanAmount,
        this.repaymentYears,
        this.interest
      );
    },
  },
  watch: {
    repaymentYears: function () {
      if (this.repaymentYears < 1) {
        this.repaymentYears = 1;
      } else if (this.repaymentYears > this.maxRepaymentYears) {
        this.repaymentYears = this.maxRepaymentYears;
      }
      this.updateMonthlyPayment();
    },
    loanAmount: function () {
      if (this.loanAmount < this.minLoanAmount) {
        this.loanAmount = this.minLoanAmount;
      } else if (this.loanAmount >= this.maxLoanAmount) {
        this.loanAmount = this.maxLoanAmount;
      } else if (this.loanAmount % this.loanAmountStep != 0) {
        this.remainder = this.loanAmount % this.loanAmountStep;
        this.loanAmount -= this.remainder;
      }
      this.updateMonthlyPayment();
    },
  },
};
</script>

<style scoped>
.monthly-cost,
.years-label {
  text-align: left;
}
.amount-label {
  text-align: left;
  margin-top: 40px;
}
.monthly-cost-value {
  font-style: italic;
  font-size: 24px;
  line-height: 0.1px;
}
.flex-container {
  display: flex;
}
.form {
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  padding-left: 15px;
  padding-right: 15px;
}
.amount-value,
.repayment-value {
  background: #fff;
  border-radius: 0.25rem;
  border: 1px solid grey;
  color: #201c46;
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  padding: 0.75rem 1rem;
}
.calculator-button {
  border: none;
  line-height: 1;
  overflow: hidden;
  display: inline-block;
  width: 44px;
  height: 44px;
  content: "";
  font-size: 40px;
  color: white;
  background: #61d5a7;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: lighter;
}
.calculator-button-minus {
  padding-bottom: 4px;
}
.flex-container-submit {
  display: flex;
  margin-bottom: 30px;
  margin-top: 30px;
}
.submit-button {
  background: #61d5a7;
  border-radius: 40px;
  border: 1px solid grey;
  color: white;
  flex-grow: 1;
  font-style: italic;
  height: 44px;
  margin-top: 2.5px;
  padding-left: 20px;
  position: relative;
  text-align: left;
}
.arrow {
  height: 100%;
  margin-top: -22px;
  position: absolute;
  right: 10px;
  top: 50%;
}
</style>
