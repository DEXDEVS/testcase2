import React from "react";
import { Controller, useForm } from "react-hook-form";
import detailsIcon from "../../assets/icons/details.svg";
import cn from "../../lib/cn";
import { commonInputStyle, formLabelStyle } from "../../lib/commonStyles";
import { productsTypes, statuses } from "../../lib/staticData";
import Dropdown from "../Dropdown/DropDown";
import Grid from "../Grid/Grid";
import InputDatePicker from "../InputDatePicker/InputDatePicker";

const OrderAddForm = ({ data, setData, addorder }) => {
  const {
    orderNumber,
    status,
    dueDate,
    orderDate,
    productType,
    client,
    address,
  } = data || {};
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState,
    setValue,
  } = useForm({
    defaultValues: {
      status: status || "ממתין למפעל",
      dueDate: dueDate,
      orderDate: orderDate,
      productType: productType,
      client: {
        name: client?.name,
        phone1: client?.phone1,
        phone2: client?.phone2,
      },
      address: {
        street: address?.street,
        city: address?.city,
        apartment: address?.apartment,
        floor: address?.floor,
      },
    },
  });
  const { errors: forromError } = formState;
  const handleCloseModal = () => {
    document.getElementById("orderAddModal").close();
    setData(null);
  };
  const handleOnsubmit = (formData) => {
    addorder({
      ...formData,
      orderNumber: orderNumber,
      client: { ...formData.client, name: client.name },
    });
    handleCloseModal();
    reset();
  };

  return (
    <>
      <form method="dialog" dir="rtl" onSubmit={handleSubmit(handleOnsubmit)}>
        <div className="flex justify-between">
          <h3 className="text-[#2E2C34] font-semibold text-[28px]">
            {orderNumber}
          </h3>
          <span
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost text-xl text-[#84818A] "
          >
            ✕
          </span>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 mt-8"></hr>
        <h2 className="text-lg text-[#2E2C34] font-semibold mb-6">
          {client?.name}
        </h2>
        <div className="flex gap-3 mb-8">
          <img src={detailsIcon} alt="details" />
          <span className="text-sm font-semibold">פרטים</span>
        </div>
        <Grid className="grid-cols-1 mb-28 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>סטטוס</span>
            </div>
            <Dropdown
              fieldName="status"
              fieldItems={statuses}
              getValues={getValues}
              setValue={setValue}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>
                דדליין להתקנה{" "}
              </span>
            </div>
            <Controller
              name="dueDate"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <InputDatePicker
                  labelTxt=""
                  onChange={field.onChange}
                  value={field.value}
                  className="bg-[#F2F9FD] focus:bg-white"
                  minDate={new Date(getValues().orderDate)}
                  dateFormat="dd.MM.YYYY"
                />
              )}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>
                תאריך הזמנה
              </span>
            </div>
            <Controller
              name="orderDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputDatePicker
                  labelTxt="תאריך הזמנה"
                  onChange={field.onChange}
                  value={field.value}
                  className="bg-[#F2F9FD] focus:bg-white"
                  disabled={true}
                />
              )}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>סוּג</span>
            </div>
            <Dropdown
              fieldName="productType"
              fieldItems={productsTypes}
              getValues={getValues}
              setValue={setValue}
            />
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>
                מספר טלפון 1
              </span>
            </div>
            <input
              dir="ltr"
              type="text"
              className={cn(
                commonInputStyle,
                "input input-bordered w-full max-w-xs text-right",
                {
                  "border-red-300 focus:border-red-300 ":
                    forromError?.client?.phone1,
                }
              )}
              {...register("client.phone1", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+972|0)(?:5[0248]-?\d{7})$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {forromError.client?.phone1?.message && (
              <span className="text-sm text-red-300 mt-2">
                {forromError.client?.phone1?.message}
              </span>
            )}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className={cn(formLabelStyle, "label-text")}>
                מספר טלפון 2
              </span>
            </div>
            <input
              dir="ltr"
              type="text"
              className={cn(
                commonInputStyle,
                "input input-bordered  w-full max-w-xs text-right",
                {
                  "border-red-300 focus:border-red-300 ":
                    forromError?.client?.phone2,
                }
              )}
              {...register("client.phone2", {
                pattern: {
                  value: /^(?:\+972|0)(?:5[0248]-?\d{7})$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {forromError.client?.phone2?.message && (
              <span className="text-sm text-red-300 mt-2">
                {forromError.client?.phone2?.message}
              </span>
            )}
          </label>

          <div className="col-span-3">
            <p className={cn(formLabelStyle, "uppercase")}>כתובת לקוח</p>
            <div className="flex gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className={cn(formLabelStyle, "label-text")}>רחוב</span>
                </div>
                <input
                  type="text"
                  className={cn(
                    commonInputStyle,
                    "input input-bordered w-full max-w-xs text-right",
                    {
                      "border-red-300 focus:border-red-300 ":
                        forromError?.address?.street,
                    }
                  )}
                  {...register("address.street", { required: true })}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className={cn(formLabelStyle, "label-text")}>עיר</span>
                </div>
                <input
                  type="text"
                  className={cn(
                    commonInputStyle,
                    "input input-bordered w-full max-w-xs text-right"
                  )}
                  {...register("address.city")}
                />
              </label>
              <label className="form-control w-full max-w-24">
                <div className="label">
                  <span className={cn(formLabelStyle, "label-text")}>דירה</span>
                </div>
                <input
                  dir="ltr"
                  type="text"
                  className={cn(
                    commonInputStyle,
                    "input input-bordered w-full max-w-xs text-right",
                    {
                      "border-red-300 focus:border-red-300 ":
                        forromError?.address?.apartment,
                    }
                  )}
                  {...register("address.apartment", {
                    validate: (value) => {
                      if (value === "") return true;
                      const number = parseFloat(value);
                      return (
                        (Number.isInteger(number) && number >= 1) ||
                        "Number must be an integer equal to or greater than 1"
                      );
                    },
                  })}
                />
              </label>
              <label className="form-control w-full max-w-24">
                <div className="label">
                  <span className={cn(formLabelStyle, "label-text")}>קומה</span>
                </div>
                <input
                  dir="ltr"
                  type="text"
                  className={cn(
                    commonInputStyle,
                    "input input-bordered w-full max-w-xs text-right",
                    {
                      "border-red-300 focus:border-red-300 ":
                        forromError?.address?.floor,
                    }
                  )}
                  {...register("address.floor", {
                    validate: (value) => {
                      if (value === "") return true;
                      const number = parseFloat(value);
                      return (
                        (Number.isInteger(number) && number >= 1) ||
                        "Number must be an integer equal to or greater than 1"
                      );
                    },
                  })}
                />
              </label>
            </div>
          </div>
        </Grid>
        <div className="rtl:text-left">
          <button
            className="btn px-12 btn-primary text-white text-sm font-semibold drawer-button"
            type="submit"
          >
            שמור שינויים
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderAddForm;
