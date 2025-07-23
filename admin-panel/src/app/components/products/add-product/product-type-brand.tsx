
import React from "react";
import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import ErrorMsg from "../../common/error-msg";

// prop type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  default_value?: {
    unit: string;
  };
};

const ProductUnit = ({
  register,
  errors,
  default_value,
}: IPropType) => {
  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6">
        <div className="mb-5">
          <p className="mb-0 text-base text-black">
            Unit <span className="text-red">*</span>
          </p>
          <input
            id="unit"
            {...register("unit", { required: `unit is required!` })}
            defaultValue={default_value?.unit}
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            type="text"
            placeholder="Product unit"
          />
          <ErrorMsg msg={errors?.unit?.message as string} />
          <span className="text-tiny leading-4">Set the unit of product.</span>
        </div>
      </div>
    </div>
  );
};

export default ProductUnit;