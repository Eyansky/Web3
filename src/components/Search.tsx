import React, { useState } from "react";
import { useForm } from "react-hook-form";
import web3 from "web3";
import { getDaiBalance } from "../utils";

interface Props {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setBalance: (balance: string) => void;
}

const Search: React.FC<Props> = (props: Props) => {
  // destructure props
  const { loading, setLoading, setBalance } = props;
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ address }: any) => {
    setLoading(true);
    try {
      const result = await getDaiBalance(address);
      if (result.status) {
        setBalance(result.data);
        setLoading(false);
        setError("");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="mt-20 bg-gray-100 rounded-lg p-10">
      <div className="font-semibold	text-center text-4xl py-6">Welcome</div>
      <div className="text-center antialiased p-2">
        Enter a valid Etherium Address to check the balance 
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading... " : "Check Balance"}
              </button>
            </div>
            <input
              className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
              {...register("address", {
                required: true,
                validate: (value) => web3.utils.isAddress(value),
              })}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="text-red-400">
          {errors.address?.type === "required" && "Address is required"}
          {errors.address?.type === "validate" && "Invalid Address"}
          {error && error}
        </div>
      </form>
    </div>
  );
};

export default Search;
