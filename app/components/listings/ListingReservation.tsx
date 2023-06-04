"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
    price: number | undefined;
    dateRange: Range;
    totalPrice: number | undefined;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {
  return (
    <div
        className="
            bg-white rounded-xl overflow-hidden
            border-[1px] border-neutral-200
        "
    >
        <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">
                $ {price}
            </div>
            <div className="font-light text-neutral-600">
                night
            </div>
        </div>
        <hr />
        <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4">
            <Button 
                disabled={disabled}
                label="Reserve"
                onClick={onSubmit}
            />
        </div>
        <div
            className="
                p-4 flex flex-row items-center
                justify-between font-semibold
                text-lg 
            "
        >
            <div>
                Total
            </div>
            <div>
                $ {totalPrice}
            </div>
        </div>
    </div>
  )
}

export default ListingReservation;