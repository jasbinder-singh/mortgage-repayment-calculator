import { useState } from "react";
import { useForm } from "react-hook-form";
import illustration from "../src/assets/images/illustration-empty.svg";

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
          <h1 className="text-3xl font-bold text-center mb-6">Mortgage Calculator</h1>
          <h2 className="text-xl font-semibold mb-4">Enter Details</h2>

          {/* Mortgage Amount */}
          <label className="block font-medium">Mortgage Amount</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}



          <div className="flex gap-4">
            <div className="flex flex-col">
              {/* Mortgage Term */}
              <label className="block font-medium mt-4">Mortgage Term</label>
              <input
                type="number"
                {...register("term", { required: "Term is required" })}
                className="w-full p-2 border rounded mb-2"
              />
              {errors.term && <p className="text-red-500 text-sm">{errors.term.message}</p>}
            </div>

            <div className="flex flex-col">
              {/* Interest Rate */}
              <label className="block font-medium mt-4">Interest Rate</label>
              <input
                type="number"
                step="0.01"
                {...register("interest", { required: "Interest rate is required" })}
                className="w-full p-2 border rounded mb-2"
              />
              {errors.interest && <p className="text-red-500 text-sm">{errors.interest.message}</p>}
            </div>
          </div>

          {/* Mortgage Type */}
          <label className="block font-medium mt-4">Mortgage Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="repayment"
                {...register("mortgageType", { required: "Select a mortgage type" })}
                className="mr-2"
              />
              Repayment
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="interest-only"
                {...register("mortgageType", { required: "Select a mortgage type" })}
                className="mr-2"
              />
              Interest-Only
            </label>
          </div>
          {errors.mortgageType && <p className="text-red-500 text-sm">{errors.mortgageType.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
        </form>

        {/* Results Section */}
        <div className="bg-slate-800 p-12 rounded-[0px_20px_20px_88px] shadow flex flex-col items-center justify-center">

          {result ? (
            <div className="w-100 h-full flex flex-wrap flex-col gap-4">
              <h2 className="text-white font-semibold">Your Results</h2>
              <p className="text-sm text-slate-100">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again</p>
              <div className="w-100 bg-slate-900">
                <p className="text-lg text-white">Monthly Repayment: <strong>${result.monthly}</strong></p>
                <p className="text-lg text-white">Total Repayment: <strong>${result.total}</strong></p>
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
