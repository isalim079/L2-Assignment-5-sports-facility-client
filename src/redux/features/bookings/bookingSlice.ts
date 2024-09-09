import { RootState } from "@/redux/store"
import { TBooking } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"

type TBookingState = {
    bookingData: null | TBooking
}

const initialState: TBookingState = {
    bookingData: null
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookings: (state, action) => {
            const {bookingData} = action.payload;
            state.bookingData = bookingData
        }
    }
})

export const {setBookings} = bookingSlice.actions

export default bookingSlice.reducer

export const bookingsData = (state: RootState) => state.booking.bookingData