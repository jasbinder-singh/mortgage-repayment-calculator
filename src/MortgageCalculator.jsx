import { useState } from "react";
import { useForm } from "react-hook-form";
import illustration from "../src/assets/images/illustration-empty.svg";
import btnico from "../src/assets/images/icon-calculator.svg";

const MortgageCalculator = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = (data) => {
    const principal = parseFloat(data.amount);
    const years = parseInt(data.term);
    const rate = parseFloat(data.interest) / 100;
    const months = years * 12;
    let monthlyPayment = 0;
    let totalPayment = 0;

    if (data.mortgageType === "repayment") {
      const monthlyRate = rate / 12;
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      totalPayment = monthlyPayment * months;
    } else {
      monthlyPayment = (principal * rate) / 12;
      totalPayment = principal + monthlyPayment * months;
    }

    setResult({
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-[20px_20px_20px_20px]">

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-12 rounded-[20px_0px_0px_20px]">
          <div className="flex gap-4 items-center flex-wrap content-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800 text-center">Mortgage Calculator</h1>
            {/* <a href="" className=" text-slate-700 underline ml-auto">Clear All</a> */}
          </div>

          {/* Mortgage Amount */}
          <label className="block text-slate-700 font-medium">Mortgage Amount</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.amount && <p className="text-red text-sm">{errors.amount.message}</p>}

          <div className="flex gap-4">
            <div className="flex flex-col">
              {/* Mortgage Term */}
              <label className="block text-slate-700 font-medium mt-4">Mortgage Term</label>
              <input
                type="number"
                {...register("term", { required: "Term is required" })}
                className="w-full p-2 border rounded mb-2"
              />
              {errors.term && <p className="text-red text-sm">{errors.term.message}</p>}
            </div>

            <div className="flex flex-col">
              {/* Interest Rate */}
              <label className="block text-slate-700 font-medium mt-4">Interest Rate</label>
              <input
                type="number"
                step="0.01"
                {...register("interest", { required: "Interest rate is required" })}
                className="w-full p-2 border rounded mb-2"
              />
              {errors.interest && <p className="text-red text-sm">{errors.interest.message}</p>}
            </div>
          </div>

          {/* Mortgage Type */}
          <label className="block text-slate-700 font-medium mt-4">Mortgage Type</label>
          <div className="flex gap-4">
            <label className="text-md font-bold text-slate-800 flex items-center">
              <input
                type="radio"
                value="repayment"
                {...register("mortgageType", { required: "Select a mortgage type" })}
                className="mr-2"
              />
              Repayment
            </label>
            <label className="text-md font-bold text-slate-800 flex items-center">
              <input
                type="radio"
                value="interest-only"
                {...register("mortgageType", { required: "Select a mortgage type" })}
                className="mr-2"
              />
              Interest-Only
            </label>
          </div>
          {errors.mortgageType && <p className="text-red text-sm">{errors.mortgageType.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="text-md font-semibold bg-lime text-slate-800 mt-6 w-aut pl-6 pr-6 pt-3 pb-3 rounded-[30px] flex items-center gap-2"
          >
            <span><img src={btnico} alt="" /></span>
            <span>
              Calculate Repayments
            </span>
          </button>
        </form>

        {/* Results Section */}
        <div className="bg-slate-800 p-12 rounded-[0px_20px_20px_88px] shadow flex flex-col items-center justify-center">

          {result ? (
            <div className="w-100 h-full flex flex-wrap flex-col gap-4">
              <h2 className="text-white font-semibold">Your Results</h2>
              <p className="text-sm text-slate-100">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again</p>
              <div className="w-100 bg-slate-900 min-h-[200px] rounded-lg flex flex-col items-start justify-between gap-4 p-6 border-lime border-t-4">
                <div className="w-full flex flex-col h-auto justify-between gap-2 border-slate-800 border-b-2 pb-2">
                  <p className="text-sm text-slate-300">Your monthly repayments</p>
                  <h2 className="text-lime text-5xl mb-6"><strong>${result.monthly}</strong></h2>
                </div>
                <div className="flex flex-col h-auto justify-between gap-2 mt-2">
                  <p className="text-sm text-slate-300">Total you'll repay over the term</p>
                  <p className="text-md text-white"><strong>${result.total}</strong></p>
                </div>

              </div>
            </div>
          ) : (
            <div className="w-100">
              <img src={illustration} alt="Results Icon" className="w-100 h-100 mx-auto mb-4" />
              <h4 className="text-center text-white font-semibold mb-4">Results shown here</h4>
              <p className="text-sm text-center text-slate-100">Complete the form and click 'Calculate Repayments' to see what your monthly repayments would be</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
