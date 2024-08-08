import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import detailsIcon from '../../assets/icons/details.svg';
import { useEditCardMutation } from '../../features/cards/cardsApi';
import { removeEditCardData } from '../../features/cards/cardsSlice';
import cn from '../../lib/cn';
import { commonInputStyle, formLabelStyle } from '../../lib/commonStyles';
import { statuses } from '../../lib/staticData';
import { useDrawer } from '../Drawer/Drawer';
import Dropdown from '../Dropdown/DropDown';
import Grid from '../Grid/Grid';
import InputDatePicker from '../InputDatePicker/InputDatePicker';
import DeleteOrder from './DeleteOrder';
import MoveToArchiveOrder from './MoveToArchiveOrder';

const productsTypes = ['מטבח', 'ארון קיר', 'ארון רחצה', 'חיפוי קיר', 'מזנון'];

export default function ProductEditForm({ isModal }) {
  const { handleDrawerClose } = useDrawer() || {};
  const editCardData = useSelector((state) => state.cards.editingCard);
  const [editcard, { isLoading }] = useEditCardMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      status: '',
      dueDate: '',
      orderDate: '',
      type: {
        name: '',
        typeID: '',
        sID: '',
      },
      client: {
        name: '',
        phone1: '',
        phone2: '',
      },
      address: {
        street: '',
        city: '',
        apartment: '',
        floor: '',
      },
    },
  });
  const { errors: forromError } = formState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (editCardData) {
      reset({
        status: editCardData.status,
        dueDate: editCardData.dueDate,
        orderDate: editCardData.orderDate,
        type: editCardData.type,
        client: editCardData?.client,
        address: editCardData?.address,
      });
    }
  }, [editCardData, reset]);

  const handleDispatch = () => {
    dispatch(removeEditCardData());
    document.getElementById('productEditModal').close();
  };
  const handleOnsubmit = (data) => {
    const updatedData = {
      status: data.status,
      dueDate: data.dueDate.toString(),
      type: data.type,
      client: data.client,
      address: data.address,
    };
    editcard({
      id: editCardData.id,
      data: updatedData,
    });
    reset();
    document.getElementById('productEditModal').close();
    if (!isModal) handleDrawerClose();
  };

  return (
    <form method='dialog' dir='rtl' onSubmit={handleSubmit(handleOnsubmit)}>
      <div className='flex gap-6 pb-4 items-center'>
        <DeleteOrder
          isModal={isModal}
          handleDrawerClose={handleDrawerClose}
          cardID={editCardData?.id}
        />
        <MoveToArchiveOrder
          isModal={isModal}
          handleDrawerClose={handleDrawerClose}
          cardID={editCardData?.id}
        />
      </div>
      <div className='flex justify-between'>
        <h3 className='text-[#2E2C34] font-semibold text-[28px]'>
          {`${editCardData?.orderNumber} (${editCardData?.type?.name} ${editCardData?.type?.typeID})`}
        </h3>
        {isModal ? (
          <span
            onClick={handleDispatch}
            className='btn btn-sm btn-circle btn-ghost text-xl text-[#84818A] '
          >
            ✕
          </span>
        ) : (
          <span
            onClick={handleDrawerClose}
            className='btn btn-sm btn-circle btn-ghost text-xl text-[#84818A] '
          >
            ✕
          </span>
        )}
      </div>
      <hr className='h-px my-8 bg-gray-200 border-0 mt-8'></hr>
      <h2 className='text-lg text-[#2E2C34] font-semibold mb-6'>
        {editCardData?.client?.name}
      </h2>
      <div className='flex gap-4 mb-8'>
        <img src={detailsIcon} alt='details' />
        <span className='text-sm font-semibold text-[#2E2C34]'>פרטים</span>
      </div>
      <Grid className='grid-cols-1 mb-28 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[#040415]'>
        <div className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>סטטוס</span>
          </div>
          <Dropdown
            isModal={isModal}
            fieldName='status'
            fieldItems={statuses}
            getValues={getValues}
            setValue={setValue}
          />
        </div>

        <div className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>
              דדליין להתקנה
            </span>
          </div>
          <Controller
            name='dueDate'
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <InputDatePicker
                labelTxt=''
                onChange={field.onChange}
                value={field.value}
                className='bg-[#F2F9FD] focus:bg-white'
                minDate={new Date(getValues().orderDate)}
                dateFormat='dd.MM.YYYY'
              />
            )}
          />
        </div>
        <div className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>
              תאריך הזמנה
            </span>
          </div>
          <Controller
            name='orderDate'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputDatePicker
                labelTxt='תאריך הזמנה'
                onChange={field.onChange}
                value={field.value}
                disabled={true}
              />
            )}
          />
        </div>
        <div className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>סוּג</span>
          </div>
          <Dropdown
            isModal={isModal}
            fieldName='type'
            fieldItems={productsTypes}
            getValues={getValues}
            setValue={setValue}
          />
        </div>

        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>
              מספר טלפון 1
            </span>
          </div>
          <input
            dir='ltr'
            type='text'
            className={cn(
              commonInputStyle,
              'input input-bordered w-full max-w-xs text-right',
              {
                'border-red-300 focus:border-red-300 ':
                  forromError?.client?.phone1,
              }
            )}
            {...register('client.phone1', {
              required: 'Phone number is required',
              // pattern: {
              //   value: /^(?:\+972|0)(?:5[0248]-?\d{7})$/,
              //   message: 'Invalid phone number',
              // },
            })}
          />
          {forromError.client?.phone1?.message && (
            <span className='text-sm text-red-300 mt-2'>
              {forromError.client?.phone1?.message}
            </span>
          )}
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className={cn(formLabelStyle, 'label-text')}>
              מספר טלפון 2
            </span>
          </div>
          <input
            dir='ltr'
            type='text'
            className={cn(
              commonInputStyle,
              'input input-bordered  w-full max-w-xs text-right',
              {
                'border-red-300 focus:border-red-300 ':
                  forromError?.client?.phone2,
              }
            )}
            {...register('client.phone2', {
              pattern: {
                value: /^(?:\+972|0)(?:5[0248]-?\d{7})$/,
                message: 'Invalid phone number',
              },
            })}
          />
          {forromError.client?.phone2?.message && (
            <span className='text-sm text-red-300 mt-2'>
              {forromError.client?.phone2?.message}
            </span>
          )}
        </label>
        <div className='col-span-3'>
          <p className={cn(formLabelStyle, 'uppercase text-sm')}>כתובת לקוח</p>
          <div className='flex gap-4'>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className={cn(formLabelStyle, 'label-text')}>רחוב</span>
              </div>
              <input
                type='text'
                className={cn(
                  commonInputStyle,
                  'input input-bordered w-full max-w-xs text-right'
                )}
                {...register('address.street', {
                  required: true,
                })}
              />
            </label>
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className={cn(formLabelStyle, 'label-text')}>עיר</span>
              </div>
              <input
                type='text'
                className={cn(
                  commonInputStyle,
                  'input input-bordered w-full max-w-xs text-right'
                )}
                {...register('address.city')}
              />
            </label>
            <label className='form-control w-full max-w-24'>
              <div className='label'>
                <span className={cn(formLabelStyle, 'label-text')}>דירה</span>
              </div>
              <input
                dir='ltr'
                type='text'
                className={cn(
                  commonInputStyle,
                  'input input-bordered w-full max-w-xs text-right'
                )}
                {...register('address.apartment', {
                  validate: (value) => {
                    if (value === '') return true;
                    const number = parseFloat(value);
                    return (
                      (Number.isInteger(number) && number >= 1) ||
                      'Number must be an integer equal to or greater than 1'
                    );
                  },
                })}
              />
            </label>
            <label className='form-control w-full max-w-24'>
              <div className='label'>
                <span className={cn(formLabelStyle, 'label-text')}>קומה</span>
              </div>
              <input
                dir='ltr'
                type='text'
                className={cn(
                  commonInputStyle,
                  'input input-bordered w-full max-w-xs text-right'
                )}
                {...register('address.floor', {
                  validate: (value) => {
                    if (value === '') return true;
                    const number = parseFloat(value);
                    return (
                      (Number.isInteger(number) && number >= 1) ||
                      'Number must be an integer equal to or greater than 1'
                    );
                  },
                })}
              />
            </label>
          </div>
        </div>
      </Grid>
      <div className='rtl:text-left'>
        <button
          disabled={isLoading}
          className='btn px-12 btn-primary text-white text-sm font-semibold drawer-button'
          type='submit'
        >
          שמור שינויים
        </button>
      </div>
    </form>
  );
}
